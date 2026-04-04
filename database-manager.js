#!/usr/bin/env node

/**
 * Database Manager for Agri-AI Secure Database
 * High-level interface for database operations with additional security features
 */

const SecureDatabase = require('./secure-database');
const crypto = require('crypto');

class DatabaseManager {
    constructor(options = {}) {
        this.db = new SecureDatabase(options);
        this.rateLimiter = new Map(); // Simple rate limiting
        this.maxLoginAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        
        // Start periodic maintenance
        this.startMaintenance();
        
        console.log('🛡️  Database Manager initialized with security features');
    }

    // Rate limiting for login attempts
    checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
        const now = Date.now();
        const key = `rate_limit_${identifier}`;
        
        if (!this.rateLimiter.has(key)) {
            this.rateLimiter.set(key, { attempts: 1, firstAttempt: now });
            return true;
        }
        
        const record = this.rateLimiter.get(key);
        
        // Reset if window has passed
        if (now - record.firstAttempt > windowMs) {
            this.rateLimiter.set(key, { attempts: 1, firstAttempt: now });
            return true;
        }
        
        // Check if limit exceeded
        if (record.attempts >= maxAttempts) {
            return false;
        }
        
        // Increment attempts
        record.attempts++;
        return true;
    }

    // Enhanced user registration with validation
    async registerUser(userData) {
        try {
            // Validate input data
            this.validateUserData(userData);
            
            // Check password strength
            this.validatePasswordStrength(userData.password);
            
            // Create user
            const user = this.db.createUser(userData);
            
            // Create initial session if requested
            if (userData.createSession) {
                const session = this.db.createSession(user.id, {
                    ipAddress: userData.ipAddress,
                    userAgent: userData.userAgent
                });
                user.sessionToken = session.token;
            }
            
            return {
                success: true,
                user: user,
                message: 'User registered successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Registration failed'
            };
        }
    }

    // Enhanced user login with rate limiting
    async loginUser(credentials) {
        try {
            const { username, password, ipAddress, userAgent } = credentials;
            
            // Check rate limiting
            if (!this.checkRateLimit(username, this.maxLoginAttempts, this.lockoutDuration)) {
                throw new Error('Too many login attempts. Please try again later.');
            }
            
            // Authenticate user
            const user = this.db.authenticateUser(username, password);
            
            // Create session
            const session = this.db.createSession(user.id, {
                ipAddress: ipAddress,
                userAgent: userAgent
            });
            
            // Clear rate limit on successful login
            this.rateLimiter.delete(`rate_limit_${username}`);
            
            return {
                success: true,
                user: user,
                token: session.token,
                expiresAt: session.expiresAt,
                message: 'Login successful'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Login failed'
            };
        }
    }

    // Validate session token
    async validateSession(token) {
        try {
            const session = this.db.validateSession(token);
            
            if (!session) {
                return {
                    success: false,
                    message: 'Invalid or expired session'
                };
            }
            
            // Get user data
            const users = this.db.readCollection('users');
            const user = users.find(u => u.id === session.userId);
            
            if (!user || !user.isActive) {
                return {
                    success: false,
                    message: 'User account not found or disabled'
                };
            }
            
            // Return user without sensitive data
            const { passwordHash, passwordSalt, ...safeUser } = user;
            
            return {
                success: true,
                user: safeUser,
                session: session
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Session validation failed'
            };
        }
    }

    // Logout user (invalidate session)
    async logoutUser(token) {
        try {
            const sessions = this.db.readCollection('sessions');
            const sessionIndex = sessions.findIndex(s => s.token === token);
            
            if (sessionIndex !== -1) {
                sessions[sessionIndex].isActive = false;
                sessions[sessionIndex].loggedOutAt = new Date().toISOString();
                this.db.writeCollection('sessions', sessions);
                
                this.db.logAuditEvent('SESSION', 'USER_LOGOUT', { 
                    sessionId: sessions[sessionIndex].id 
                });
            }
            
            return {
                success: true,
                message: 'Logged out successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Logout failed'
            };
        }
    }

    // Store prediction with user validation
    async storePrediction(token, predictionData) {
        try {
            // Validate session
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                throw new Error('Invalid session');
            }
            
            // Store prediction
            const prediction = this.db.storePrediction(sessionResult.user.id, predictionData);
            
            return {
                success: true,
                prediction: prediction,
                message: 'Prediction stored successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to store prediction'
            };
        }
    }

    // Get user predictions
    async getUserPredictions(token) {
        try {
            // Validate session
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                throw new Error('Invalid session');
            }
            
            // Get predictions
            const predictions = this.db.getUserPredictions(sessionResult.user.id);
            
            return {
                success: true,
                predictions: predictions,
                count: predictions.length
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to retrieve predictions'
            };
        }
    }

    // Get user profile
    async getUserProfile(token) {
        try {
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                return sessionResult;
            }
            
            return {
                success: true,
                user: sessionResult.user
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get user profile'
            };
        }
    }

    // Update user profile
    async updateUserProfile(token, updateData) {
        try {
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                throw new Error('Invalid session');
            }
            
            const users = this.db.readCollection('users');
            const userIndex = users.findIndex(u => u.id === sessionResult.user.id);
            
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            
            // Update allowed fields only
            const allowedFields = ['fullName', 'email'];
            const user = users[userIndex];
            
            for (const field of allowedFields) {
                if (updateData[field] !== undefined) {
                    user[field] = updateData[field];
                }
            }
            
            user.updatedAt = new Date().toISOString();
            users[userIndex] = user;
            this.db.writeCollection('users', users);
            
            this.db.logAuditEvent('USER', 'PROFILE_UPDATED', { 
                userId: user.id,
                updatedFields: Object.keys(updateData)
            });
            
            // Return user without sensitive data
            const { passwordHash, passwordSalt, ...safeUser } = user;
            
            return {
                success: true,
                user: safeUser,
                message: 'Profile updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update profile'
            };
        }
    }

    // Get database statistics (admin only)
    async getDatabaseStats(token) {
        try {
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                throw new Error('Invalid session');
            }
            
            if (sessionResult.user.role !== 'admin') {
                throw new Error('Admin access required');
            }
            
            const stats = this.db.getStatistics();
            
            return {
                success: true,
                statistics: stats
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get database statistics'
            };
        }
    }

    // Create database backup (admin only)
    async createBackup(token) {
        try {
            const sessionResult = await this.validateSession(token);
            if (!sessionResult.success) {
                throw new Error('Invalid session');
            }
            
            if (sessionResult.user.role !== 'admin') {
                throw new Error('Admin access required');
            }
            
            const backupPath = this.db.createBackup();
            
            return {
                success: true,
                backupPath: backupPath,
                message: 'Backup created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create backup'
            };
        }
    }

    // Validate user data
    validateUserData(userData) {
        const required = ['username', 'password', 'fullName'];
        const missing = required.filter(field => !userData[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        // Username validation
        if (userData.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
            throw new Error('Username can only contain letters, numbers, and underscores');
        }
        
        // Email validation (if provided)
        if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            throw new Error('Invalid email format');
        }
        
        // Full name validation
        if (userData.fullName.length < 2) {
            throw new Error('Full name must be at least 2 characters long');
        }
    }

    // Validate password strength
    validatePasswordStrength(password) {
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
        
        if (strength < 3) {
            throw new Error('Password must contain at least 3 of: uppercase, lowercase, numbers, special characters');
        }
    }

    // Start periodic maintenance tasks
    startMaintenance() {
        // Cleanup expired sessions every hour
        setInterval(() => {
            try {
                const expiredCount = this.db.cleanupExpiredSessions();
                if (expiredCount > 0) {
                    console.log(`🧹 Cleaned up ${expiredCount} expired sessions`);
                }
            } catch (error) {
                console.error('Maintenance error:', error.message);
            }
        }, 60 * 60 * 1000); // 1 hour
        
        // Create daily backup
        setInterval(() => {
            try {
                this.db.createBackup();
                console.log('📦 Daily backup created');
            } catch (error) {
                console.error('Backup error:', error.message);
            }
        }, 24 * 60 * 60 * 1000); // 24 hours
        
        // Clear rate limiter every hour
        setInterval(() => {
            this.rateLimiter.clear();
            console.log('🔄 Rate limiter cleared');
        }, 60 * 60 * 1000); // 1 hour
    }

    // Close database
    close() {
        this.db.close();
        console.log('🛡️  Database Manager closed');
    }
}

module.exports = DatabaseManager;