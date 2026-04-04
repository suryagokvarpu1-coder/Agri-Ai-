#!/usr/bin/env node

/**
 * Secure Server for Agri-AI with Enterprise Database Integration
 * Features: JWT authentication, rate limiting, audit logging, secure database
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const DatabaseManager = require('./database-manager');

class SecureServer {
    constructor() {
        this.port = process.env.PORT || 3001;
        this.host = process.env.HOST || 'localhost';
        
        // Initialize secure database
        this.dbManager = new DatabaseManager({
            dbPath: './secure-data'
        });
        
        // Rate limiting
        this.rateLimiter = new Map();
        this.maxRequestsPerMinute = 60;
        
        console.log('🔐 Starting Secure Agri-AI Server with Enterprise Database...');
        this.startServer();
    }

    startServer() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, this.host, () => {
            console.log('✅ Secure Agri-AI Server Started Successfully!');
            console.log('================================');
            console.log(`🌐 Server running at: http://${this.host}:${this.port}`);
            console.log(`🔒 Database: Secure encrypted storage`);
            console.log(`🛡️  Security: Enterprise-grade protection`);
            console.log(`📊 Features: Rate limiting, audit logging, session management`);
            console.log('================================\n');
        });

        server.on('error', (err) => {
            console.error('❌ Server Error:', err.message);
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🔄 Shutting down server gracefully...');
            this.dbManager.close();
            server.close(() => {
                console.log('✅ Server shut down successfully');
                process.exit(0);
            });
        });
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        // Set security headers
        this.setSecurityHeaders(res);

        // Handle CORS preflight
        if (method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Rate limiting
        if (!this.checkRateLimit(this.getClientIP(req))) {
            this.sendJSON(res, { error: 'Rate limit exceeded' }, 429);
            return;
        }

        console.log(`${method} ${pathname} - ${this.getClientIP(req)}`);

        // Route handling
        if (pathname === '/' || pathname === '/index.html') {
            this.serveFile(res, 'overview.html', 'text/html');
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
        } else {
            this.send404(res);
        }
    }

    setSecurityHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:;");
    }

    checkRateLimit(clientIP) {
        const now = Date.now();
        const windowMs = 60 * 1000; // 1 minute
        
        if (!this.rateLimiter.has(clientIP)) {
            this.rateLimiter.set(clientIP, { requests: 1, resetTime: now + windowMs });
            return true;
        }
        
        const record = this.rateLimiter.get(clientIP);
        
        if (now > record.resetTime) {
            record.requests = 1;
            record.resetTime = now + windowMs;
            return true;
        }
        
        if (record.requests >= this.maxRequestsPerMinute) {
            return false;
        }
        
        record.requests++;
        return true;
    }

    getClientIP(req) {
        return req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress ||
               'unknown';
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

    async handleAPI(req, res, pathname, method) {
        try {
            if (pathname === '/api/auth/register') {
                if (method === 'POST') {
                    await this.handleRegister(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/auth/login') {
                if (method === 'POST') {
                    await this.handleLogin(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/auth/logout') {
                if (method === 'POST') {
                    await this.handleLogout(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/user/profile') {
                if (method === 'GET') {
                    await this.handleGetProfile(req, res);
                } else if (method === 'PUT') {
                    await this.handleUpdateProfile(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/predict') {
                if (method === 'POST') {
                    await this.handlePredict(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/user/predictions') {
                if (method === 'GET') {
                    await this.handleGetPredictions(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/admin/stats') {
                if (method === 'GET') {
                    await this.handleAdminStats(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else if (pathname === '/api/admin/backup') {
                if (method === 'POST') {
                    await this.handleCreateBackup(req, res);
                } else {
                    this.sendJSON(res, { error: 'Method not allowed' }, 405);
                }
            } else {
                this.sendJSON(res, { error: 'API endpoint not found' }, 404);
            }
        } catch (error) {
            console.error('API Error:', error);
            this.sendJSON(res, { error: 'Internal server error' }, 500);
        }
    }

    async handleRegister(req, res) {
        const body = await this.getRequestBody(req);
        
        try {
            const userData = JSON.parse(body);
            userData.ipAddress = this.getClientIP(req);
            userData.userAgent = req.headers['user-agent'] || 'unknown';
            
            const result = await this.dbManager.registerUser(userData);
            
            if (result.success) {
                console.log(`✅ User registered: ${userData.username}`);
                this.sendJSON(res, {
                    success: true,
                    message: result.message,
                    user: result.user
                });
            } else {
                console.log(`❌ Registration failed: ${result.error}`);
                this.sendJSON(res, {
                    success: false,
                    error: result.error,
                    message: result.message
                }, 400);
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.sendJSON(res, { error: 'Invalid registration data' }, 400);
        }
    }

    async handleLogin(req, res) {
        const body = await this.getRequestBody(req);
        
        try {
            const credentials = JSON.parse(body);
            credentials.ipAddress = this.getClientIP(req);
            credentials.userAgent = req.headers['user-agent'] || 'unknown';
            
            const result = await this.dbManager.loginUser(credentials);
            
            if (result.success) {
                console.log(`✅ User logged in: ${credentials.username}`);
                this.sendJSON(res, {
                    success: true,
                    message: result.message,
                    token: result.token,
                    user: result.user,
                    expiresAt: result.expiresAt
                });
            } else {
                console.log(`❌ Login failed: ${result.error}`);
                this.sendJSON(res, {
                    success: false,
                    error: result.error,
                    message: result.message
                }, 401);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.sendJSON(res, { error: 'Invalid login data' }, 400);
        }
    }

    async handleLogout(req, res) {
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const result = await this.dbManager.logoutUser(token);
            this.sendJSON(res, result);
        } catch (error) {
            console.error('Logout error:', error);
            this.sendJSON(res, { error: 'Logout failed' }, 500);
        }
    }

    async handleGetProfile(req, res) {
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const result = await this.dbManager.getUserProfile(token);
            
            if (result.success) {
                this.sendJSON(res, result);
            } else {
                this.sendJSON(res, result, 401);
            }
        } catch (error) {
            console.error('Get profile error:', error);
            this.sendJSON(res, { error: 'Failed to get profile' }, 500);
        }
    }

    async handleUpdateProfile(req, res) {
        const body = await this.getRequestBody(req);
        
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const updateData = JSON.parse(body);
            const result = await this.dbManager.updateUserProfile(token, updateData);
            
            if (result.success) {
                this.sendJSON(res, result);
            } else {
                this.sendJSON(res, result, 400);
            }
        } catch (error) {
            console.error('Update profile error:', error);
            this.sendJSON(res, { error: 'Failed to update profile' }, 500);
        }
    }

    async handlePredict(req, res) {
        const body = await this.getRequestBody(req);
        
        try {
            const token = this.extractToken(req);
            const predictionData = JSON.parse(body);
            
            // Generate mock prediction (in production, this would use ML models)
            const mockPrediction = {
                crop: predictionData.crop || 'Unknown',
                location: predictionData.location || 'Unknown',
                fieldSize: predictionData.fieldSize || 0,
                predictedYield: Math.floor(Math.random() * 5000) + 2000,
                confidence: Math.floor(Math.random() * 30) + 70,
                factors: {
                    weather: ['Favorable', 'Good', 'Moderate', 'Challenging'][Math.floor(Math.random() * 4)],
                    soil: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
                    irrigation: ['Optimal', 'Adequate', 'Limited'][Math.floor(Math.random() * 3)]
                },
                recommendations: [
                    'Consider increasing nitrogen fertilizer by 10%',
                    'Monitor soil moisture levels weekly',
                    'Apply pest control measures in 2 weeks',
                    'Optimize irrigation schedule based on weather forecast'
                ].slice(0, Math.floor(Math.random() * 3) + 2),
                timestamp: new Date().toISOString()
            };
            
            // Store prediction if user is authenticated
            if (token) {
                const storeResult = await this.dbManager.storePrediction(token, mockPrediction);
                if (storeResult.success) {
                    mockPrediction.id = storeResult.prediction.id;
                }
            }
            
            // Simulate processing delay
            setTimeout(() => {
                this.sendJSON(res, {
                    success: true,
                    prediction: mockPrediction,
                    message: 'Prediction completed successfully!'
                });
            }, 2000);
            
        } catch (error) {
            console.error('Prediction error:', error);
            this.sendJSON(res, { error: 'Invalid prediction data' }, 400);
        }
    }

    async handleGetPredictions(req, res) {
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const result = await this.dbManager.getUserPredictions(token);
            this.sendJSON(res, result);
        } catch (error) {
            console.error('Get predictions error:', error);
            this.sendJSON(res, { error: 'Failed to get predictions' }, 500);
        }
    }

    async handleAdminStats(req, res) {
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const result = await this.dbManager.getDatabaseStats(token);
            
            if (result.success) {
                this.sendJSON(res, result);
            } else {
                this.sendJSON(res, result, 403);
            }
        } catch (error) {
            console.error('Admin stats error:', error);
            this.sendJSON(res, { error: 'Failed to get statistics' }, 500);
        }
    }

    async handleCreateBackup(req, res) {
        try {
            const token = this.extractToken(req);
            if (!token) {
                this.sendJSON(res, { error: 'No token provided' }, 401);
                return;
            }
            
            const result = await this.dbManager.createBackup(token);
            
            if (result.success) {
                this.sendJSON(res, result);
            } else {
                this.sendJSON(res, result, 403);
            }
        } catch (error) {
            console.error('Backup error:', error);
            this.sendJSON(res, { error: 'Failed to create backup' }, 500);
        }
    }

    extractToken(req) {
        const authHeader = req.headers['authorization'];
        return authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    }

    getRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', reject);
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
                <p><a href="/">← Back to Home</a></p>
            </body>
            </html>
        `);
    }
}

// Start the secure server
new SecureServer();

module.exports = SecureServer;