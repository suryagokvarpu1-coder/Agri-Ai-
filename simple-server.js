#!/usr/bin/env node

/**
 * Simple Agri-AI Server - Minimal Dependencies Version
 * This version runs with minimal dependencies for quick testing
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

class SimpleServer {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || '0.0.0.0';  // bind to all interfaces for cloud hosting
        this.dataFile = './users-data.json';
        
        // Load existing user data or initialize empty
        this.users = this.loadUserData();
        this.sessions = new Map();
        
        console.log('🌾 Starting Simple Agri-AI Server...');
        console.log(`📊 Loaded ${this.users.length} existing users from storage`);
        this.startServer();
    }

    loadUserData() {
        try {
            if (fs.existsSync(this.dataFile)) {
                const data = fs.readFileSync(this.dataFile, 'utf8');
                const parsedData = JSON.parse(data);
                console.log('✅ User data loaded from file');
                return parsedData.users || [];
            }
        } catch (error) {
            console.log('⚠️  Could not load user data, starting fresh');
        }
        return [];
    }

    saveUserData() {
        try {
            const data = {
                users: this.users,
                lastUpdated: new Date().toISOString(),
                totalUsers: this.users.length
            };
            fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
            console.log(`💾 User data saved (${this.users.length} users)`);
        } catch (error) {
            console.error('❌ Failed to save user data:', error.message);
        }
    }

    startServer() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, this.host, () => {
            console.log('✅ Simple Agri-AI Server Started Successfully!');
            console.log('================================');
            console.log(`🌐 Server running at: http://${this.host}:${this.port}`);
            console.log(`📱 Main Website: http://${this.host}:${this.port}/`);
            console.log(`🔧 Admin Dashboard: http://${this.host}:${this.port}/admin`);
            console.log('================================');
            console.log('📝 Note: This is a simplified version for testing');
            console.log('   Install full dependencies for production features');
            console.log('================================\n');
        });

        server.on('error', (err) => {
            console.error('❌ Server Error:', err.message);
        });
    }

    handleRequest(req, res) {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        console.log(`${method} ${pathname}`);

        // Route handling
        if (pathname === '/' || pathname === '/index.html') {
            this.serveFile(res, 'index.html', 'text/html');
        } else if (pathname.startsWith('/api/')) {
            this.handleAPI(req, res, pathname, method);
        } else if (pathname.endsWith('.html')) {
            this.serveFile(res, pathname.substring(1), 'text/html');
        } else if (pathname.endsWith('.js')) {
            this.serveFile(res, pathname.substring(1), 'application/javascript');
        } else if (pathname.endsWith('.css')) {
            this.serveFile(res, pathname.substring(1), 'text/css');
        } else if (pathname.endsWith('.json')) {
            this.serveFile(res, pathname.substring(1), 'application/json');
        } else if (pathname.endsWith('.png')) {
            this.serveFile(res, pathname.substring(1), 'image/png');
        } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
            this.serveFile(res, pathname.substring(1), 'image/jpeg');
        } else if (pathname.endsWith('.gif')) {
            this.serveFile(res, pathname.substring(1), 'image/gif');
        } else if (pathname.endsWith('.svg')) {
            this.serveFile(res, pathname.substring(1), 'image/svg+xml');
        } else if (pathname.endsWith('.webp')) {
            this.serveFile(res, pathname.substring(1), 'image/webp');
        } else if (pathname.endsWith('.ico')) {
            this.serveFile(res, pathname.substring(1), 'image/x-icon');
        } else {
            this.send404(res);
        }
    }

    serveFile(res, filename, contentType) {
        const filePath = path.join(__dirname, filename);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`❌ File not found: ${filename}`);
                this.send404(res);
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }

    handleAPI(req, res, pathname, method) {
        // Simple API responses for testing
        const response = {
            success: true,
            message: 'Simple server API response',
            timestamp: new Date().toISOString()
        };

        if (pathname === '/api/auth/login') {
            if (method === 'POST') {
                this.handleLogin(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/auth/register') {
            if (method === 'POST') {
                this.handleRegister(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/auth/logout') {
            if (method === 'POST') {
                this.handleLogout(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/users/list') {
            if (method === 'GET') {
                this.handleListUsers(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/predict') {
            if (method === 'POST') {
                this.handlePredict(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/user/profile') {
            if (method === 'GET') {
                this.handleGetProfile(req, res);
            } else if (method === 'PUT') {
                this.handleUpdateProfile(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/user/predictions') {
            if (method === 'GET') {
                this.handleGetUserPredictions(req, res);
            } else {
                this.sendJSON(res, { error: 'Method not allowed' }, 405);
            }
        } else if (pathname === '/api/admin/stats') {
            this.sendJSON(res, {
                success: true,
                data: {
                    totalUsers: this.users.length || 5,
                    totalPredictions: 42,
                    securityAlerts: 0,
                    uptime: '99.9%',
                    failedLogins: 0,
                    blockedIPs: 0,
                    securityScore: '98%',
                    userActivity: [12, 19, 15, 25, 22, 18, 24],
                    securityEventsByLevel: [45, 25, 15, 5]
                }
            });
        } else if (pathname === '/api/admin/recent-activity') {
            this.sendJSON(res, {
                success: true,
                activities: [
                    {
                        description: 'User Registration',
                        user: this.users.length > 0 ? this.users[this.users.length - 1].username : 'guest',
                        timestamp: new Date().toISOString()
                    },
                    {
                        description: 'System Started',
                        user: 'System',
                        timestamp: new Date().toISOString()
                    }
                ]
            });
        } else if (pathname === '/api/admin/users') {
            this.sendJSON(res, {
                success: true,
                users: [
                    {
                        id: 1,
                        username: 'admin',
                        full_name: 'Administrator',
                        email: 'admin@example.com',
                        role: 'admin',
                        is_active: true,
                        last_login: new Date().toISOString(),
                        created_at: new Date().toISOString()
                    },
                    ...this.users.map((user, index) => ({
                        id: index + 2,
                        username: user.username,
                        full_name: user.fullName,
                        email: user.email,
                        role: 'user',
                        is_active: true,
                        last_login: user.lastLogin || null,
                        created_at: user.createdAt
                    }))
                ]
            });
        } else if (pathname === '/api/admin/security-events') {
            this.sendJSON(res, {
                success: true,
                events: [
                    {
                        id: 1,
                        event_type: 'LOGIN_SUCCESS',
                        risk_level: 'LOW',
                        user_id: 1,
                        ip_address_encrypted: '***.***.***',
                        details: 'Admin login successful',
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 2,
                        event_type: 'USER_REGISTERED',
                        risk_level: 'LOW',
                        user_id: null,
                        ip_address_encrypted: '***.***.***',
                        details: 'New user registration',
                        created_at: new Date().toISOString()
                    }
                ]
            });
        } else if (pathname === '/api/security/dashboard') {
            this.sendJSON(res, {
                success: true,
                data: {
                    totalUsers: this.users.length + 1,
                    totalPredictions: 42,
                    securityAlerts: 0,
                    failedLogins: 0,
                    blockedIPs: 0,
                    securityScore: 98
                }
            });
        } else {
            this.sendJSON(res, { error: 'API endpoint not found' }, 404);
        }
    }

    handleLogin(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { username, password } = JSON.parse(body);
                
                // Validate input
                if (!username || !password) {
                    this.sendJSON(res, { error: 'Username and password are required' }, 400);
                    return;
                }

                // Check admin credentials
                if (username === 'admin' && password === 'admin123') {
                    const token = 'admin-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                    this.sessions.set(token, { 
                        username, 
                        role: 'admin',
                        loginTime: new Date().toISOString()
                    });
                    
                    console.log(`🔑 Admin login successful: ${username}`);
                    
                    this.sendJSON(res, {
                        success: true,
                        message: 'Admin login successful!',
                        token: token,
                        user: {
                            username: username,
                            fullName: 'Administrator',
                            email: 'admin@agri-ai.com',
                            role: 'admin'
                        }
                    });
                    return;
                }
                
                // Check regular user credentials
                const user = this.users.find(u => u.username === username && u.password === password);
                if (user) {
                    // Check if user is active
                    if (!user.isActive) {
                        this.sendJSON(res, { error: 'Account is deactivated. Please contact administrator.' }, 403);
                        return;
                    }

                    const token = 'user-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                    this.sessions.set(token, { 
                        username, 
                        role: 'user',
                        loginTime: new Date().toISOString()
                    });
                    
                    // Update user login info
                    user.lastLogin = new Date().toISOString();
                    user.loginCount = (user.loginCount || 0) + 1;
                    
                    // Save updated user data
                    this.saveUserData();
                    
                    console.log(`🔑 User login successful: ${username} (${user.fullName})`);
                    
                    this.sendJSON(res, {
                        success: true,
                        message: `Welcome back, ${user.fullName}!`,
                        token: token,
                        user: {
                            username: user.username,
                            fullName: user.fullName,
                            email: user.email,
                            role: 'user',
                            lastLogin: user.lastLogin,
                            loginCount: user.loginCount
                        }
                    });
                } else {
                    // Check if username exists but password is wrong
                    const userExists = this.users.find(u => u.username === username);
                    if (userExists) {
                        console.log(`❌ Failed login attempt for existing user: ${username}`);
                        this.sendJSON(res, { error: 'Invalid password' }, 401);
                    } else {
                        console.log(`❌ Failed login attempt for non-existent user: ${username}`);
                        this.sendJSON(res, { error: 'Username not found' }, 401);
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                this.sendJSON(res, { error: 'Invalid login data' }, 400);
            }
        });
    }

    handleRegister(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { username, password, fullName, email } = JSON.parse(body);
                
                // Validate required fields
                if (!username || !password || !fullName) {
                    this.sendJSON(res, { error: 'Username, password, and full name are required' }, 400);
                    return;
                }

                // Validate username length
                if (username.length < 3) {
                    this.sendJSON(res, { error: 'Username must be at least 3 characters long' }, 400);
                    return;
                }

                // Validate password strength
                if (password.length < 6) {
                    this.sendJSON(res, { error: 'Password must be at least 6 characters long' }, 400);
                    return;
                }

                // Check if username already exists
                if (username === 'admin' || this.users.find(u => u.username === username)) {
                    this.sendJSON(res, { error: 'Username already exists' }, 409);
                    return;
                }

                // Check if email already exists (if provided)
                if (email && this.users.find(u => u.email === email)) {
                    this.sendJSON(res, { error: 'Email already registered' }, 409);
                    return;
                }

                // Create new user
                const newUser = {
                    id: this.users.length + 2,
                    username,
                    password, // In production, this should be hashed
                    fullName,
                    email: email || null,
                    role: 'user',
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    loginCount: 0,
                    predictions: []
                };

                this.users.push(newUser);
                
                // Save to persistent storage
                this.saveUserData();

                console.log(`✅ New user registered: ${username} (${fullName})`);

                // Don't auto-login, just return success
                this.sendJSON(res, {
                    success: true,
                    message: 'Account created successfully! Please login with your credentials.',
                    user: {
                        username: newUser.username,
                        fullName: newUser.fullName,
                        email: newUser.email
                    }
                });
            } catch (error) {
                console.error('Registration error:', error);
                this.sendJSON(res, { error: 'Invalid registration data' }, 400);
            }
        });
    }

    handlePredict(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const d = JSON.parse(body);
                
                // Scientifically-backed base yields (kg/acre) — FAO averages
                const baseYields = {
                    wheat: 1800, corn: 4000, rice: 2200, soybeans: 1100,
                    cotton: 700, barley: 1600, oats: 1400, sugarcane: 35000
                };
                // Soil type multipliers — based on agronomic research
                const soilMultipliers = {
                    loam: 1.00, clay: 0.88, silt: 0.95,
                    sandy: 0.72, peat: 0.80, chalk: 0.75
                };
                // Irrigation efficiency multipliers
                const irrigMultipliers = {
                    drip: 1.20, sprinkler: 1.10, 'center-pivot': 1.12,
                    flood: 0.95, rainfed: 0.75
                };
                // Fertilizer impact multipliers
                const fertMultipliers = {
                    high: 1.18, medium: 1.00, organic: 1.05,
                    low: 0.82, none: 0.60
                };

                const crop = d.crop || 'wheat';
                const bY = baseYields[crop] || 1800;
                const sM = soilMultipliers[d.soilType] || 1.0;
                const iM = irrigMultipliers[d.irrigation] || 0.85;
                const fM = fertMultipliers[d.fertilizer] || 1.0;
                const fieldSize = parseFloat(d.fieldSize) || 1;
                const prevYield = parseFloat(d.previousYield) || 0;
                
                // Historical adjustment factor
                let histAdj = 1;
                if (prevYield > 0) {
                    const ratio = (prevYield * 1000) / bY;
                    histAdj = 0.7 + (ratio * 0.3);
                }
                
                // Calculate yield (clamped to realistic range)
                const predictedYield = Math.round(
                    Math.max(bY * 0.4, Math.min(bY * 1.5, bY * sM * iM * fM * histAdj))
                );
                const totalProduction = Math.round(predictedYield * fieldSize);
                
                // Confidence based on data completeness
                const confidence = Math.min(94,
                    72 + (prevYield > 0 ? 8 : 0) +
                    (d.soilType ? 4 : 0) +
                    (d.irrigation !== 'rainfed' ? 4 : 0) +
                    (d.fertilizer ? 3 : 0)
                );
                
                // Factor ratings
                const soilRating = sM >= 0.95 ? 'Excellent' : sM >= 0.85 ? 'Good' : sM >= 0.75 ? 'Moderate' : 'Poor';
                const irrigRating = iM >= 1.10 ? 'Optimal' : iM >= 1.0 ? 'Adequate' : iM >= 0.85 ? 'Moderate' : 'Limited';
                const fertRating = fM >= 1.10 ? 'High' : fM >= 0.95 ? 'Standard' : fM >= 0.75 ? 'Low' : 'None';
                
                // Actionable recommendations
                const recs = [];
                if (sM < 0.85) recs.push(`${d.soilType} soil reduces yield by ~${Math.round((1 - sM) * 100)}%. Add organic matter and compost to improve soil structure.`);
                if (iM < 1.0) recs.push('Upgrade to drip or sprinkler irrigation to increase yield efficiency by 15–25%.');
                if (fM < 1.0) recs.push(`Current fertilizer level reduces potential yield by ${Math.round((1 - fM) * 100)}%. Consider increasing to medium or high.`);
                if (recs.length === 0) recs.push('Your inputs are well-optimized. Maintain current practices and monitor for pest/disease pressure.');
                
                // Harvest date estimate (crop-specific days to maturity)
                const daysToHarvest = { wheat: 120, corn: 90, rice: 130, soybeans: 100, cotton: 150, barley: 100, oats: 90, sugarcane: 330 };
                const plantDate = d.plantingDate ? new Date(d.plantingDate) : new Date();
                const harvestDate = new Date(plantDate.getTime() + (daysToHarvest[crop] || 120) * 86400000);
                recs.push(`Expected harvest around ${harvestDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.`);

                this.sendJSON(res, {
                    success: true,
                    prediction: {
                        crop,
                        location: d.location || 'Unknown',
                        fieldSize,
                        predictedYield,
                        totalProduction,
                        confidence,
                        factors: { soil: soilRating, irrigation: irrigRating, fertilizer: fertRating },
                        recommendations: recs
                    },
                    message: 'Prediction completed successfully!'
                });

            } catch (error) {
                this.sendJSON(res, { error: 'Invalid prediction data' }, 400);
            }
        });
    }

    handleGetProfile(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token || !this.sessions.has(token)) {
            this.sendJSON(res, { error: 'Unauthorized' }, 401);
            return;
        }

        const session = this.sessions.get(token);
        const user = this.users.find(u => u.username === session.username);
        
        if (user) {
            this.sendJSON(res, {
                success: true,
                user: {
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    createdAt: user.createdAt,
                    lastLogin: user.lastLogin
                }
            });
        } else if (session.username === 'admin') {
            this.sendJSON(res, {
                success: true,
                user: {
                    username: 'admin',
                    fullName: 'Administrator',
                    email: 'admin@example.com',
                    role: 'admin'
                }
            });
        } else {
            this.sendJSON(res, { error: 'User not found' }, 404);
        }
    }

    handleUpdateProfile(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                
                if (!token || !this.sessions.has(token)) {
                    this.sendJSON(res, { error: 'Unauthorized' }, 401);
                    return;
                }

                const session = this.sessions.get(token);
                const user = this.users.find(u => u.username === session.username);
                const updateData = JSON.parse(body);
                
                if (user) {
                    // Update user data
                    if (updateData.fullName) user.fullName = updateData.fullName;
                    if (updateData.email) user.email = updateData.email;
                    
                    this.sendJSON(res, {
                        success: true,
                        message: 'Profile updated successfully!',
                        user: {
                            username: user.username,
                            fullName: user.fullName,
                            email: user.email
                        }
                    });
                } else {
                    this.sendJSON(res, { error: 'User not found' }, 404);
                }
            } catch (error) {
                this.sendJSON(res, { error: 'Invalid JSON' }, 400);
            }
        });
    }

    handleGetUserPredictions(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token || !this.sessions.has(token)) {
            this.sendJSON(res, { error: 'Unauthorized' }, 401);
            return;
        }

        // Mock prediction history
        const mockPredictions = [
            {
                id: 1,
                crop: 'Wheat',
                location: 'Field A',
                predictedYield: 4500,
                confidence: 85,
                timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            },
            {
                id: 2,
                crop: 'Corn',
                location: 'Field B',
                predictedYield: 6200,
                confidence: 92,
                timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            }
        ];

        this.sendJSON(res, {
            success: true,
            predictions: mockPredictions
        });
    }

    handleLogout(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token && this.sessions.has(token)) {
            const session = this.sessions.get(token);
            this.sessions.delete(token);
            console.log(`🚪 User logged out: ${session.username}`);
            
            this.sendJSON(res, {
                success: true,
                message: 'Logged out successfully'
            });
        } else {
            this.sendJSON(res, {
                success: true,
                message: 'Already logged out'
            });
        }
    }

    handleListUsers(req, res) {
        // Public endpoint to show registered users (without sensitive data)
        const publicUsers = this.users.map(user => ({
            username: user.username,
            fullName: user.fullName,
            createdAt: user.createdAt,
            loginCount: user.loginCount || 0
        }));

        this.sendJSON(res, {
            success: true,
            users: publicUsers,
            totalUsers: this.users.length
        });
    }

    sendJSON(res, data, statusCode = 200) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data, null, 2));
    }

    send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Not Found</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #e2e8f0; }
                    h1 { color: #ef4444; }
                    a { color: #3b82f6; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The requested page could not be found.</p>
                <p><a href="/">← Back to Home</a> | <a href="/admin">Admin Dashboard</a></p>
            </body>
            </html>
        `);
    }
}

// Start the server
new SimpleServer();

module.exports = SimpleServer;