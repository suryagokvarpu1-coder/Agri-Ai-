#!/usr/bin/env node

/**
 * Secure Database System for Agri-AI
 * Enterprise-grade security with AES-256-GCM encryption, bcrypt hashing, and comprehensive audit logging
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

class SecureDatabase {
  constructor(options = {}) {
    this.dbPath = options.dbPath || "./secure-data";
    this.encryptionKey = options.encryptionKey || this.generateEncryptionKey();
    this.algorithm = "aes-256-gcm";
    this.keyDerivationRounds = 100000;
    this.auditLog = [];

    // Ensure secure data directory exists
    this.ensureDirectoryExists(this.dbPath);
    this.ensureDirectoryExists(path.join(this.dbPath, "backups"));

    // Initialize collections
    this.collections = {
      users: "users.json",
      sessions: "sessions.json",
      predictions: "predictions.json",
      audit: "audit.json",
      settings: "settings.json",
    };

    console.log("🔒 Secure Database initialized with AES-256-GCM encryption");
    this.logAuditEvent("SYSTEM", "DATABASE_INITIALIZED", {
      timestamp: new Date().toISOString(),
    });
  }

  // Generate a secure encryption key
  generateEncryptionKey() {
    return crypto.randomBytes(32); // 256-bit key
  }

  // Ensure directory exists
  ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true, mode: 0o700 }); // Secure permissions
    }
  }

  // Encrypt data using AES-256-GCM
  encrypt(data) {
    try {
      const iv = crypto.randomBytes(16); // 128-bit IV
      // use createCipheriv with explicit key and iv (createCipher deprecated/removed)
      const cipher = crypto.createCipheriv(
        this.algorithm,
        this.encryptionKey,
        iv,
      );
      cipher.setAAD(Buffer.from("agri-ai-secure-db")); // Additional authenticated data

      let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
      encrypted += cipher.final("hex");

      const authTag = cipher.getAuthTag();

      return {
        encrypted,
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
        algorithm: this.algorithm,
      };
    } catch (error) {
      this.logAuditEvent("SYSTEM", "ENCRYPTION_ERROR", {
        error: error.message,
      });
      throw new Error("Encryption failed");
    }
  }

  // Decrypt data using AES-256-GCM
  decrypt(encryptedData) {
    try {
      const { encrypted, iv, authTag } = encryptedData;
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.encryptionKey,
        Buffer.from(iv, "hex"),
      );
      decipher.setAAD(Buffer.from("agri-ai-secure-db"));
      decipher.setAuthTag(Buffer.from(authTag, "hex"));

      let decrypted = decipher.update(encrypted, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return JSON.parse(decrypted);
    } catch (error) {
      this.logAuditEvent("SYSTEM", "DECRYPTION_ERROR", {
        error: error.message,
      });
      throw new Error("Decryption failed - data may be corrupted");
    }
  }

  // Hash password using bcrypt-like implementation
  hashPassword(password, salt = null) {
    if (!salt) {
      salt = crypto.randomBytes(16).toString("hex");
    }

    // Use PBKDF2 with high iteration count for security
    const hash = crypto.pbkdf2Sync(
      password,
      salt,
      this.keyDerivationRounds,
      64,
      "sha512",
    );
    return {
      hash: hash.toString("hex"),
      salt: salt,
      rounds: this.keyDerivationRounds,
    };
  }

  // Verify password
  verifyPassword(password, storedHash, storedSalt) {
    const { hash } = this.hashPassword(password, storedSalt);
    return hash === storedHash;
  }

  // Get file path for collection
  getCollectionPath(collection) {
    if (!this.collections[collection]) {
      throw new Error(`Unknown collection: ${collection}`);
    }
    return path.join(this.dbPath, this.collections[collection]);
  }

  // Read encrypted collection
  readCollection(collection) {
    try {
      const filePath = this.getCollectionPath(collection);

      if (!fs.existsSync(filePath)) {
        return [];
      }

      const encryptedData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const decryptedData = this.decrypt(encryptedData);

      this.logAuditEvent("SYSTEM", "COLLECTION_READ", { collection });
      return decryptedData;
    } catch (error) {
      this.logAuditEvent("SYSTEM", "COLLECTION_READ_ERROR", {
        collection,
        error: error.message,
      });
      return [];
    }
  }

  // Write encrypted collection
  writeCollection(collection, data) {
    try {
      const filePath = this.getCollectionPath(collection);
      const encryptedData = this.encrypt(data);

      // Write atomically using temporary file
      const tempPath = filePath + ".tmp";
      fs.writeFileSync(tempPath, JSON.stringify(encryptedData, null, 2), {
        mode: 0o600,
      });
      fs.renameSync(tempPath, filePath);

      this.logAuditEvent("SYSTEM", "COLLECTION_WRITE", {
        collection,
        recordCount: data.length,
      });
      return true;
    } catch (error) {
      this.logAuditEvent("SYSTEM", "COLLECTION_WRITE_ERROR", {
        collection,
        error: error.message,
      });
      throw new Error(
        `Failed to write collection ${collection}: ${error.message}`,
      );
    }
  }

  // Create user with secure password hashing
  createUser(userData) {
    try {
      const users = this.readCollection("users");

      // Check if user already exists
      const existingUser = users.find(
        (u) => u.username === userData.username || u.email === userData.email,
      );
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password securely
      const passwordData = this.hashPassword(userData.password);

      const newUser = {
        id: this.generateId(),
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        passwordHash: passwordData.hash,
        passwordSalt: passwordData.salt,
        role: userData.role || "user",
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        loginCount: 0,
        securityLevel: "standard",
        twoFactorEnabled: false,
      };

      users.push(newUser);
      this.writeCollection("users", users);

      this.logAuditEvent("USER", "USER_CREATED", {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });

      // Return user without sensitive data
      const { passwordHash, passwordSalt, ...safeUser } = newUser;
      return safeUser;
    } catch (error) {
      this.logAuditEvent("USER", "USER_CREATE_ERROR", { error: error.message });
      throw error;
    }
  }

  // Authenticate user
  authenticateUser(username, password) {
    try {
      const users = this.readCollection("users");
      const user = users.find(
        (u) => u.username === username || u.email === username,
      );

      if (!user) {
        this.logAuditEvent("AUTH", "LOGIN_FAILED", {
          username,
          reason: "USER_NOT_FOUND",
        });
        throw new Error("Invalid credentials");
      }

      if (!user.isActive) {
        this.logAuditEvent("AUTH", "LOGIN_FAILED", {
          username,
          reason: "ACCOUNT_DISABLED",
        });
        throw new Error("Account is disabled");
      }

      // Verify password
      if (
        !this.verifyPassword(password, user.passwordHash, user.passwordSalt)
      ) {
        this.logAuditEvent("AUTH", "LOGIN_FAILED", {
          username,
          reason: "INVALID_PASSWORD",
        });
        throw new Error("Invalid credentials");
      }

      // Update login info
      user.lastLogin = new Date().toISOString();
      user.loginCount = (user.loginCount || 0) + 1;

      // Save updated user data
      const userIndex = users.findIndex((u) => u.id === user.id);
      users[userIndex] = user;
      this.writeCollection("users", users);

      this.logAuditEvent("AUTH", "LOGIN_SUCCESS", {
        userId: user.id,
        username: user.username,
      });

      // Return user without sensitive data
      const { passwordHash, passwordSalt, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      this.logAuditEvent("AUTH", "AUTH_ERROR", { error: error.message });
      throw error;
    }
  }

  // Create secure session
  createSession(userId, sessionData = {}) {
    try {
      const sessions = this.readCollection("sessions");

      const session = {
        id: this.generateId(),
        userId: userId,
        token: this.generateSecureToken(),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        isActive: true,
        ipAddress: sessionData.ipAddress || "unknown",
        userAgent: sessionData.userAgent || "unknown",
        lastActivity: new Date().toISOString(),
      };

      sessions.push(session);
      this.writeCollection("sessions", sessions);

      this.logAuditEvent("SESSION", "SESSION_CREATED", {
        sessionId: session.id,
        userId: userId,
      });

      return session;
    } catch (error) {
      this.logAuditEvent("SESSION", "SESSION_CREATE_ERROR", {
        error: error.message,
      });
      throw error;
    }
  }

  // Validate session
  validateSession(token) {
    try {
      const sessions = this.readCollection("sessions");
      const session = sessions.find((s) => s.token === token && s.isActive);

      if (!session) {
        this.logAuditEvent("SESSION", "SESSION_INVALID", {
          token: token.substring(0, 10) + "...",
        });
        return null;
      }

      // Check if session is expired
      if (new Date() > new Date(session.expiresAt)) {
        this.logAuditEvent("SESSION", "SESSION_EXPIRED", {
          sessionId: session.id,
        });
        return null;
      }

      // Update last activity
      session.lastActivity = new Date().toISOString();
      const sessionIndex = sessions.findIndex((s) => s.id === session.id);
      sessions[sessionIndex] = session;
      this.writeCollection("sessions", sessions);

      return session;
    } catch (error) {
      this.logAuditEvent("SESSION", "SESSION_VALIDATE_ERROR", {
        error: error.message,
      });
      return null;
    }
  }

  // Store prediction data
  storePrediction(userId, predictionData) {
    try {
      const predictions = this.readCollection("predictions");

      const prediction = {
        id: this.generateId(),
        userId: userId,
        ...predictionData,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      predictions.push(prediction);
      this.writeCollection("predictions", predictions);

      this.logAuditEvent("DATA", "PREDICTION_STORED", {
        predictionId: prediction.id,
        userId: userId,
      });

      return prediction;
    } catch (error) {
      this.logAuditEvent("DATA", "PREDICTION_STORE_ERROR", {
        error: error.message,
      });
      throw error;
    }
  }

  // Get user predictions
  getUserPredictions(userId) {
    try {
      const predictions = this.readCollection("predictions");
      const userPredictions = predictions.filter(
        (p) => p.userId === userId && p.isActive,
      );

      this.logAuditEvent("DATA", "PREDICTIONS_RETRIEVED", {
        userId: userId,
        count: userPredictions.length,
      });

      return userPredictions;
    } catch (error) {
      this.logAuditEvent("DATA", "PREDICTIONS_RETRIEVE_ERROR", {
        error: error.message,
      });
      throw error;
    }
  }

  // Generate secure ID
  generateId() {
    return crypto.randomBytes(16).toString("hex");
  }

  // Generate secure token
  generateSecureToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  // Log audit event
  logAuditEvent(category, event, details = {}) {
    const auditEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      category: category,
      event: event,
      details: details,
      severity: this.getEventSeverity(event),
    };

    this.auditLog.push(auditEntry);

    // Write audit log to file periodically
    if (this.auditLog.length >= 10) {
      this.flushAuditLog();
    }
  }

  // Get event severity
  getEventSeverity(event) {
    const highSeverityEvents = [
      "LOGIN_FAILED",
      "ENCRYPTION_ERROR",
      "DECRYPTION_ERROR",
      "AUTH_ERROR",
    ];
    const mediumSeverityEvents = [
      "USER_CREATED",
      "SESSION_CREATED",
      "LOGIN_SUCCESS",
    ];

    if (highSeverityEvents.includes(event)) return "HIGH";
    if (mediumSeverityEvents.includes(event)) return "MEDIUM";
    return "LOW";
  }

  // Flush audit log to file
  flushAuditLog() {
    try {
      const existingAudit = this.readCollection("audit");
      const updatedAudit = [...existingAudit, ...this.auditLog];
      this.writeCollection("audit", updatedAudit);
      this.auditLog = [];
    } catch (error) {
      console.error("Failed to flush audit log:", error.message);
    }
  }

  // Create backup
  createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupDir = path.join(
        this.dbPath,
        "backups",
        `backup-${timestamp}`,
      );

      this.ensureDirectoryExists(backupDir);

      // Backup all collections
      for (const [collection, filename] of Object.entries(this.collections)) {
        const sourcePath = path.join(this.dbPath, filename);
        const backupPath = path.join(backupDir, filename);

        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, backupPath);
        }
      }

      this.logAuditEvent("SYSTEM", "BACKUP_CREATED", { backupDir });
      console.log(`✅ Backup created: ${backupDir}`);

      return backupDir;
    } catch (error) {
      this.logAuditEvent("SYSTEM", "BACKUP_ERROR", { error: error.message });
      throw error;
    }
  }

  // Get database statistics
  getStatistics() {
    try {
      const stats = {};

      for (const collection of Object.keys(this.collections)) {
        const data = this.readCollection(collection);
        stats[collection] = {
          count: data.length,
          lastModified: this.getCollectionLastModified(collection),
        };
      }

      stats.auditLogSize = this.auditLog.length;
      stats.encryptionAlgorithm = this.algorithm;
      stats.keyDerivationRounds = this.keyDerivationRounds;

      return stats;
    } catch (error) {
      this.logAuditEvent("SYSTEM", "STATS_ERROR", { error: error.message });
      throw error;
    }
  }

  // Get collection last modified time
  getCollectionLastModified(collection) {
    try {
      const filePath = this.getCollectionPath(collection);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // Cleanup expired sessions
  cleanupExpiredSessions() {
    try {
      const sessions = this.readCollection("sessions");
      const now = new Date();
      const activeSessions = sessions.filter(
        (s) => new Date(s.expiresAt) > now,
      );
      const expiredCount = sessions.length - activeSessions.length;

      if (expiredCount > 0) {
        this.writeCollection("sessions", activeSessions);
        this.logAuditEvent("SYSTEM", "SESSIONS_CLEANED", { expiredCount });
      }

      return expiredCount;
    } catch (error) {
      this.logAuditEvent("SYSTEM", "CLEANUP_ERROR", { error: error.message });
      throw error;
    }
  }

  // Close database and flush audit log
  close() {
    this.flushAuditLog();
    this.logAuditEvent("SYSTEM", "DATABASE_CLOSED", {
      timestamp: new Date().toISOString(),
    });
    console.log("🔒 Secure Database closed");
  }
}

module.exports = SecureDatabase;
