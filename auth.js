/**
 * Client-Side Auth System for Agri-AI
 * Works completely without a server — stores users in localStorage.
 * Falls back gracefully whether opened via file://, localhost, or production.
 */

(function () {

    const USERS_KEY   = 'agri-ai-users';
    const TOKEN_KEY   = 'agri-ai-token';
    const USER_KEY    = 'agri-ai-user';

    // ── Seed default accounts on first load ──────────────────────────────────
    function seedDefaultUsers() {
        if (localStorage.getItem(USERS_KEY)) return;
        const defaults = [
            { id: 1, username: 'admin',       password: 'admin123',   fullName: 'Administrator', email: 'admin@agri-ai.com', role: 'admin', isActive: true, createdAt: new Date().toISOString(), lastLogin: null, loginCount: 0 },
            { id: 2, username: 'gyaswanth',   password: '123654Tt@',  fullName: 'G Yaswanth',    email: null,                role: 'user',  isActive: true, createdAt: new Date().toISOString(), lastLogin: null, loginCount: 0 },
            { id: 3, username: 'testuser123', password: 'testpass123',fullName: 'Test User',      email: 'test@example.com',  role: 'user',  isActive: true, createdAt: new Date().toISOString(), lastLogin: null, loginCount: 0 },
            { id: 4, username: 'dinesh',      password: 'dinesh123',  fullName: 'Dinesh',         email: null,                role: 'user',  isActive: true, createdAt: new Date().toISOString(), lastLogin: null, loginCount: 0 }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
    }

    function getUsers() {
        try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
        catch { return []; }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function generateToken(username) {
        return 'token-' + username + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
    }

    // ── Public API ────────────────────────────────────────────────────────────
    window.AuthSystem = {

        /** Login — returns { success, message, token, user } or { success:false, error } */
        login(username, password) {
            if (!username || !password) return { success: false, error: 'Please fill in all fields' };

            const users = getUsers();

            // admin shortcut
            if (username === 'admin' && password === 'admin123') {
                const token = generateToken('admin');
                const user  = { username: 'admin', fullName: 'Administrator', email: 'admin@agri-ai.com', role: 'admin' };
                localStorage.setItem(TOKEN_KEY, token);
                localStorage.setItem(USER_KEY,  JSON.stringify(user));
                return { success: true, message: 'Welcome back, Administrator!', token, user };
            }

            const found = users.find(u => u.username === username);
            if (!found)                return { success: false, error: 'Username not found' };
            if (!found.isActive)       return { success: false, error: 'Account is deactivated' };
            if (found.password !== password) return { success: false, error: 'Invalid password' };

            // update login stats
            found.lastLogin  = new Date().toISOString();
            found.loginCount = (found.loginCount || 0) + 1;
            saveUsers(users);

            const token = generateToken(username);
            const user  = { username: found.username, fullName: found.fullName, email: found.email, role: found.role || 'user', lastLogin: found.lastLogin, loginCount: found.loginCount };
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY,  JSON.stringify(user));
            return { success: true, message: `Welcome back, ${found.fullName}!`, token, user };
        },

        /** Register — returns { success, message } or { success:false, error } */
        register(username, password, fullName, email) {
            if (!username || !password || !fullName) return { success: false, error: 'Username, password and full name are required' };
            if (username.length < 3)  return { success: false, error: 'Username must be at least 3 characters' };
            if (password.length < 6)  return { success: false, error: 'Password must be at least 6 characters' };

            const users = getUsers();
            if (username === 'admin' || users.find(u => u.username === username))
                return { success: false, error: 'Username already exists' };
            if (email && users.find(u => u.email === email))
                return { success: false, error: 'Email already registered' };

            const newUser = {
                id: users.length + 2,
                username, password, fullName,
                email: email || null,
                role: 'user',
                isActive: true,
                createdAt: new Date().toISOString(),
                lastLogin: null,
                loginCount: 0
            };
            users.push(newUser);
            saveUsers(users);
            return { success: true, message: 'Account created! Please log in.' };
        },

        /** Social Login/Signup — signs up if user doesn't exist, then logs in */
        socialLogin(provider, profile) {
            if (!profile || !profile.email) return { success: false, error: 'Invalid social profile' };

            const users = getUsers();
            let user = users.find(u => u.email === profile.email);

            if (!user) {
                // Sign up new user
                user = {
                    id: users.length + 2,
                    username: profile.email.split('@')[0],
                    password: 'social-auth-' + Math.random().toString(36).slice(2),
                    fullName: profile.name || profile.email.split('@')[0],
                    email: profile.email,
                    role: 'user',
                    isActive: true,
                    provider: provider,
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    loginCount: 1
                };
                users.push(user);
                saveUsers(users);
            } else {
                // Update existing user
                user.lastLogin = new Date().toISOString();
                user.loginCount = (user.loginCount || 0) + 1;
                saveUsers(users);
            }

            const token = generateToken(user.username);
            const sessionUser = {
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                role: user.role || 'user',
                provider: provider, // Track which provider was used
                lastLogin: user.lastLogin,
                loginCount: user.loginCount
            };
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
            return { success: true, message: `Welcome, ${user.fullName}!`, token, user: sessionUser };
        },

        /** Logout */
        logout() {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            window.location.href = 'login.html';
        },

        /** Returns current user object or null */
        getCurrentUser() {
            try { return JSON.parse(localStorage.getItem(USER_KEY)); }
            catch { return null; }
        },

        /** Returns true if a session token exists */
        isLoggedIn() {
            return !!localStorage.getItem(TOKEN_KEY);
        },

        /**
         * Call on every protected page.
         * Redirects to login.html if not authenticated.
         */
        requireAuth() {
            if (!this.isLoggedIn()) {
                window.location.href = 'login.html';
                return false;
            }
            // Populate header username / avatar if elements exist
            const user = this.getCurrentUser();
            if (user) {
                const el = document.getElementById('header-username');
                const av = document.getElementById('header-avatar');
                if (el) el.textContent = 'Welcome, ' + user.username;
                if (av) av.textContent = user.username.charAt(0).toUpperCase();
            }
            return true;
        }
    };

    // Seed on load
    seedDefaultUsers();

    // Expose logout globally (sidebar uses it)
    window.logout = function () { window.AuthSystem.logout(); };

})();
