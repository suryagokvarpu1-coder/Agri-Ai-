/**
 * Client-Side Auth System for Agri-AI (Firebase & Firestore Edition)
 * Manages Firebase Authentication sessions and Firestore synchronization.
 */

(function () {
    const TOKEN_KEY = 'agri-ai-token';
    const USER_KEY  = 'agri-ai-user';

    let resolveAuthReady;
    const authReadyPromise = new Promise(resolve => {
        resolveAuthReady = resolve;
    });

    // Helper: list of protected pages
    function isCurrentPageProtected() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        const protectedPages = [
            'overview.html',
            'predict.html',
            'soil-analysis.html',
            'satellite-tool.html',
            'growth-monitoring.html',
            'carbon-tracking.html',
            'feedback.html',
            'settings.html',
            'profile.html',
            'impact.html'
        ];
        return protectedPages.includes(page);
    }

    // Helper: show a beautiful premium loading overlay
    function showAuthLoadingOverlay() {
        if (document.getElementById('auth-loading-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'auth-loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        overlay.style.backdropFilter = 'blur(16px)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '99999';
        overlay.style.color = '#ffffff';
        overlay.style.fontFamily = "'Inter', sans-serif";

        overlay.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
                <svg width="50" height="50" fill="none" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" stroke-width="4"></circle>
                    <path fill="#10b981" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div style="font-weight: 700; letter-spacing: -0.025em; font-size: 1.25rem;">Authenticating with Agri-AI...</div>
                <div style="font-size: 0.875rem; color: #94a3b8;">Verifying secure session with Firebase</div>
            </div>
            <style>
                @keyframes spin { to { transform: rotate(360deg); } }
            </style>
        `;
        document.body.appendChild(overlay);
    }

    function hideAuthLoadingOverlay() {
        const overlay = document.getElementById('auth-loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.25s ease';
            setTimeout(() => overlay.remove(), 250);
        }
    }

    // Helper: update page header with name and avatar
    function updatePageHeader(user) {
        if (!user) return;
        const el = document.getElementById('header-username');
        const av = document.getElementById('header-avatar');
        if (el) el.textContent = 'Welcome, ' + (user.fullName || user.username || 'User');
        if (av) {
            av.style.cursor = 'pointer';
            av.title = 'View Profile';
            av.onclick = () => window.location.href = 'profile.html';

            if (user.photoURL) {
                av.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            } else {
                const displayName = user.fullName || user.username || 'U';
                av.textContent = displayName.charAt(0).toUpperCase();
            }
        }
    }

    // Auth state changed listener
    function initAuthListener() {
        if (!window.firebase || !window.firebase.auth) {
            setTimeout(initAuthListener, 50);
            return;
        }

        const { onAuthStateChanged } = window.firebase.authMethods;
        onAuthStateChanged(window.firebase.auth, async (fbUser) => {
            const path = window.location.pathname;
            const page = path.split('/').pop() || 'index.html';

            if (fbUser) {
                let userProfile = null;
                try {
                    const { doc, getDoc, setDoc } = window.firebase.firestoreMethods;
                    const userDocRef = doc(window.firebase.db, 'users', fbUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        userProfile = userDocSnap.data();
                        // Update last login timestamp in Firestore
                        await setDoc(userDocRef, {
                            lastLogin: new Date().toISOString()
                        }, { merge: true });
                        // Update local object
                        userProfile.lastLogin = new Date().toISOString();
                    } else {
                        // Create profile if missing
                        userProfile = {
                            uid: fbUser.uid,
                            username: fbUser.email ? fbUser.email.split('@')[0] : 'user_' + fbUser.uid.substring(0, 5),
                            fullName: fbUser.displayName || fbUser.email.split('@')[0],
                            email: fbUser.email || '',
                            photoURL: fbUser.photoURL || '',
                            role: 'user',
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString(),
                            loginCount: 1
                        };
                        await setDoc(userDocRef, userProfile);
                    }
                } catch (err) {
                    console.error("Firestore user sync error:", err);
                    userProfile = {
                        uid: fbUser.uid,
                        username: fbUser.email ? fbUser.email.split('@')[0] : 'user',
                        fullName: fbUser.displayName || 'Farmer',
                        email: fbUser.email || '',
                        photoURL: fbUser.photoURL || '',
                        role: 'user'
                    };
                }

                // Cache credentials
                localStorage.setItem(TOKEN_KEY, fbUser.accessToken || 'firebase-session');
                localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

                resolveAuthReady(userProfile);
                hideAuthLoadingOverlay();
                updatePageHeader(userProfile);

                // If on login/signup page, redirect to overview
                if (page === 'login.html' || page === 'signup.html') {
                    window.location.href = 'overview.html';
                }
            } else {
                // Not authenticated
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);

                resolveAuthReady(null);
                hideAuthLoadingOverlay();

                if (isCurrentPageProtected()) {
                    window.location.href = 'login.html';
                }
            }
        });
    }

    // Initialize listener
    initAuthListener();

    // Exported AuthSystem API
    window.AuthSystem = {
        authReady: authReadyPromise,

        /** Google Sign-In */
        async loginWithGoogle() {
            if (!window.firebase || !window.firebase.auth) {
                throw new Error("Firebase SDK not initialized");
            }
            const { signInWithPopup } = window.firebase.authMethods;
            const { auth, googleProvider } = window.firebase;
            
            const result = await signInWithPopup(auth, googleProvider);
            return { success: true, user: result.user };
        },

        /** Email/Password Sign-In */
        async login(email, password) {
            if (!window.firebase || !window.firebase.auth) {
                return { success: false, error: "Firebase SDK not initialized" };
            }
            const { signInWithEmailAndPassword } = window.firebase.authMethods;
            try {
                const result = await signInWithEmailAndPassword(window.firebase.auth, email, password);
                return { success: true, user: result.user };
            } catch (err) {
                return { success: false, error: this.formatAuthError(err.code) };
            }
        },

        /** Email/Password Registration */
        async register(username, password, fullName, email) {
            if (!window.firebase || !window.firebase.auth) {
                return { success: false, error: "Firebase SDK not initialized" };
            }
            const { createUserWithEmailAndPassword } = window.firebase.authMethods;
            const { doc, setDoc } = window.firebase.firestoreMethods;
            const { db } = window.firebase;

            try {
                // 1. Create authentication credentials
                const result = await createUserWithEmailAndPassword(window.firebase.auth, email, password);
                const uid = result.user.uid;

                // 2. Create User Profile document in Firestore
                const userProfile = {
                    uid: uid,
                    username: username.toLowerCase().trim(),
                    fullName: fullName.trim(),
                    email: email.trim(),
                    photoURL: '',
                    role: 'user',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    loginCount: 1
                };
                await setDoc(doc(db, 'users', uid), userProfile);

                return { success: true, message: 'Account created successfully! Logging you in...' };
            } catch (err) {
                return { success: false, error: this.formatAuthError(err.code) };
            }
        },

        /** Logout */
        async logout() {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            if (window.firebase && window.firebase.auth) {
                const { signOut } = window.firebase.authMethods;
                await signOut(window.firebase.auth);
            }
            window.location.href = 'login.html';
        },

        /** Returns current cached user details */
        getCurrentUser() {
            try {
                return JSON.parse(localStorage.getItem(USER_KEY));
            } catch {
                return null;
            }
        },

        /** Synchronous check if token exists in storage */
        isLoggedIn() {
            return !!localStorage.getItem(TOKEN_KEY);
        },

        /** Protected route validation */
        requireAuth() {
            if (!this.isLoggedIn()) {
                window.location.href = 'login.html';
                return false;
            }

            // Show temporary loading overlay while Firebase initializes and verifies session
            showAuthLoadingOverlay();

            // Populate header username / avatar if cached profile exists
            const user = this.getCurrentUser();
            if (user) {
                updatePageHeader(user);
            }
            return true;
        },

        /** User-friendly error message formatter */
        formatAuthError(code) {
            switch (code) {
                case 'auth/invalid-email':
                    return 'Invalid email address format.';
                case 'auth/user-disabled':
                    return 'This user account has been disabled.';
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    return 'Incorrect email or password.';
                case 'auth/email-already-in-use':
                    return 'Email address is already registered.';
                case 'auth/weak-password':
                    return 'Password is too weak. Must be at least 6 characters.';
                case 'auth/operation-not-allowed':
                    return 'Sign-in provider is disabled in Firebase.';
                case 'auth/popup-closed-by-user':
                    return 'Sign-in popup closed before completion.';
                default:
                    return 'Authentication failed. Please try again.';
            }
        }
    };

    // Expose global logout callback
    window.logout = function () { window.AuthSystem.logout(); };

})();
