#!/usr/bin/env node

/**
 * Database Setup Script for Agri-AI Secure Database
 * Initializes the secure database with default admin user and configuration
 */

const DatabaseManager = require('./database-manager');
const readline = require('readline');

class DatabaseSetup {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        console.log('🔐 Agri-AI Secure Database Setup');
        console.log('=================================\n');
    }

    async run() {
        try {
            console.log('Initializing secure database...\n');
            
            // Initialize database manager
            this.dbManager = new DatabaseManager({
                dbPath: './secure-data'
            });
            
            // Check if admin user already exists
            const adminExists = await this.checkAdminExists();
            
            if (adminExists) {
                console.log('✅ Admin user already exists');
                const recreate = await this.askQuestion('Do you want to recreate the admin user? (y/N): ');
                
                if (recreate.toLowerCase() !== 'y' && recreate.toLowerCase() !== 'yes') {
                    console.log('Setup completed - using existing admin user');
                    this.close();
                    return;
                }
            }
            
            // Create admin user
            await this.createAdminUser();
            
            // Display setup summary
            this.displaySummary();
            
            this.close();
            
        } catch (error) {
            console.error('❌ Setup failed:', error.message);
            this.close();
            process.exit(1);
        }
    }

    async checkAdminExists() {
        try {
            const users = this.dbManager.db.readCollection('users');
            return users.some(user => user.role === 'admin');
        } catch (error) {
            return false;
        }
    }

    async createAdminUser() {
        console.log('Creating admin user...\n');
        
        // Get admin details
        const username = await this.askQuestion('Admin username (default: admin): ') || 'admin';
        const fullName = await this.askQuestion('Admin full name (default: Administrator): ') || 'Administrator';
        const email = await this.askQuestion('Admin email (default: admin@agri-ai.com): ') || 'admin@agri-ai.com';
        
        let password;
        let confirmPassword;
        
        do {
            password = await this.askQuestion('Admin password (min 8 chars, mixed case, numbers, symbols): ', true);
            
            if (password.length < 8) {
                console.log('❌ Password must be at least 8 characters long');
                continue;
            }
            
            confirmPassword = await this.askQuestion('Confirm password: ', true);
            
            if (password !== confirmPassword) {
                console.log('❌ Passwords do not match');
            }
        } while (password !== confirmPassword || password.length < 8);
        
        // Create admin user
        const adminData = {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            role: 'admin'
        };
        
        const result = await this.dbManager.registerUser(adminData);
        
        if (result.success) {
            console.log('\n✅ Admin user created successfully!');
            this.adminUser = result.user;
        } else {
            throw new Error(`Failed to create admin user: ${result.error}`);
        }
    }

    displaySummary() {
        console.log('\n🎉 Database Setup Complete!');
        console.log('============================\n');
        
        console.log('📊 Setup Summary:');
        console.log(`   • Database Path: ./secure-data`);
        console.log(`   • Encryption: AES-256-GCM`);
        console.log(`   • Admin User: ${this.adminUser.username}`);
        console.log(`   • Admin Email: ${this.adminUser.email}`);
        console.log(`   • User ID: ${this.adminUser.id}`);
        
        console.log('\n🔐 Security Features:');
        console.log('   • Password hashing with PBKDF2 (100,000 rounds)');
        console.log('   • Data encryption at rest');
        console.log('   • Session management with secure tokens');
        console.log('   • Rate limiting and audit logging');
        console.log('   • Automated backups and maintenance');
        
        console.log('\n🚀 Next Steps:');
        console.log('   1. Start the secure server: node secure-server.js');
        console.log('   2. Access the website: http://localhost:3000');
        console.log('   3. Login with your admin credentials');
        console.log('   4. Test all functionality');
        
        console.log('\n📁 Database Files Created:');
        console.log('   • secure-data/users.json (encrypted)');
        console.log('   • secure-data/sessions.json (encrypted)');
        console.log('   • secure-data/predictions.json (encrypted)');
        console.log('   • secure-data/audit.json (encrypted)');
        console.log('   • secure-data/settings.json (encrypted)');
        console.log('   • secure-data/backups/ (backup directory)');
        
        console.log('\n⚠️  Important Security Notes:');
        console.log('   • Keep your admin credentials secure');
        console.log('   • Regular backups are created automatically');
        console.log('   • Monitor audit logs for security events');
        console.log('   • Use HTTPS in production');
        
        console.log('\n✅ Your secure database is ready to use!');
    }

    askQuestion(question, hidden = false) {
        return new Promise((resolve) => {
            if (hidden) {
                // Hide password input
                this.rl.question(question, (answer) => {
                    resolve(answer);
                });
                this.rl.stdoutMuted = true;
                this.rl._writeToOutput = function _writeToOutput(stringToWrite) {
                    if (this.stdoutMuted) {
                        this.output.write('*');
                    } else {
                        this.output.write(stringToWrite);
                    }
                };
            } else {
                this.rl.question(question, (answer) => {
                    resolve(answer);
                });
            }
        });
    }

    close() {
        if (this.dbManager) {
            this.dbManager.close();
        }
        this.rl.close();
    }
}

// Run setup if called directly
if (require.main === module) {
    const setup = new DatabaseSetup();
    setup.run().catch(error => {
        console.error('Setup error:', error);
        process.exit(1);
    });
}

module.exports = DatabaseSetup;