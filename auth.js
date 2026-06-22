/**
 * Client-Side Auth System for Agri-AI (Firebase & Firestore Edition)
 * Manages Firebase Authentication sessions and Firestore synchronization.
 */

(function () {
    const TOKEN_KEY = 'agri-ai-token';
    const USER_KEY  = 'agri-ai-user';

    function getLocalUser() {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY));
        } catch {
            return null;
        }
    }

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
        overlay.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
        overlay.style.backdropFilter = 'blur(20px)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '99999';
        overlay.style.color = '#ffffff';
        overlay.style.fontFamily = "'Inter', sans-serif";
        overlay.style.transition = 'opacity 0.3s ease';

        overlay.innerHTML = `
            <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 3rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; max-width: 400px; width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4); text-align: center; backdrop-filter: blur(10px);">
                <div style="position: relative; width: 64px; height: 64px; display: flex; items-center; justify-content: center;">
                    <!-- Outer glowing ring -->
                    <div style="position: absolute; inset: -4px; border-radius: 50%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); opacity: 0.15; filter: blur(8px);"></div>
                    <!-- Spinner -->
                    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" style="animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.25, 1) infinite;">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.05)" stroke-width="3"></circle>
                        <path stroke="url(#spinner-grad)" stroke-width="3" stroke-linecap="round" d="M12 2a10 10 0 0110 10"></path>
                        <defs>
                            <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#10b981" />
                                <stop offset="100%" stop-color="#059669" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div>
                    <h2 style="font-weight: 700; letter-spacing: -0.025em; font-size: 1.35rem; margin: 0 0 0.5rem; background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Authenticating with Agri-AI</h2>
                    <p style="font-size: 0.875rem; color: #94a3b8; margin: 0; line-height: 1.5;">Verifying secure session with Firebase</p>
                </div>
                <button id="auth-bypass-btn" style="margin-top: 1rem; padding: 0.75rem 1.5rem; font-size: 0.8125rem; font-weight: 600; color: #10b981; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.2s; outline: none;">
                    Proceed in Offline Mode
                </button>
            </div>
            <style>
                @keyframes spin { to { transform: rotate(360deg); } }
            </style>
        `;
        document.body.appendChild(overlay);

        // Bind click event to the bypass button
        const bypassBtn = overlay.querySelector('#auth-bypass-btn');
        if (bypassBtn) {
            bypassBtn.addEventListener('click', () => {
                triggerFallback('User bypassed auth screen');
            });
            bypassBtn.addEventListener('mouseover', () => {
                bypassBtn.style.background = 'rgba(16, 185, 129, 0.15)';
                bypassBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                bypassBtn.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.2)';
            });
            bypassBtn.addEventListener('mouseout', () => {
                bypassBtn.style.background = 'rgba(16, 185, 129, 0.08)';
                bypassBtn.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                bypassBtn.style.boxShadow = 'none';
            });
        }
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

    let isAuthResolved = false;
    let firebaseCheckTimer = null;
    let authTimeoutTimer = null;

    // Check if page actually loads the firebase script
    const hasFirebaseScript = Array.from(document.scripts).some(s => s.src.includes('firebase.js'));

    // Toast notification helper
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'auth-toast';
        
        toast.style.position = 'fixed';
        toast.style.top = '24px';
        toast.style.right = '24px';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '12px';
        toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)';
        toast.style.zIndex = '999999';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '10px';
        toast.style.color = '#ffffff';
        toast.style.fontFamily = "'Inter', sans-serif";
        toast.style.fontSize = '0.875rem';
        toast.style.fontWeight = '500';
        toast.style.transform = 'translateX(120%)';
        toast.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        let bgColor = '#10b981'; // success (emerald)
        let iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
        
        if (type === 'error') {
            bgColor = '#ef4444'; // error (red)
            iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        } else if (type === 'warning') {
            bgColor = '#f59e0b'; // warning (amber)
            iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
        }
        
        toast.style.backgroundColor = bgColor;
        toast.style.border = `1px solid rgba(255, 255, 255, 0.1)`;
        
        toast.innerHTML = `
            ${iconSvg}
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 50);
        
        // Remove toast
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
    }

    // Trigger fallback when Firebase Auth is slow or fails
    function triggerFallback(reason = "Timeout") {
        if (isAuthResolved) return;
        isAuthResolved = true;
        
        console.warn(`[Auth Fallback] Triggered due to: ${reason}`);
        
        if (firebaseCheckTimer) {
            clearTimeout(firebaseCheckTimer);
            firebaseCheckTimer = null;
        }
        if (authTimeoutTimer) {
            clearTimeout(authTimeoutTimer);
            authTimeoutTimer = null;
        }

        const cachedUser = getLocalUser();
        if (cachedUser) {
            resolveAuthReady(cachedUser);
            hideAuthLoadingOverlay();
            updatePageHeader(cachedUser);
            showToast("Firebase taking too long. Running in offline/fallback mode.", "warning");
        } else {
            hideAuthLoadingOverlay();
            if (isCurrentPageProtected()) {
                window.location.href = 'login.html';
            } else {
                resolveAuthReady(null);
            }
        }
    }

    let firebaseLoadAttempts = 0;
    const maxFirebaseLoadAttempts = 60; // 60 * 50ms = 3000ms (3 seconds)

    // Auth state changed listener
    function initAuthListener() {
        if (window.firebase === null) {
            console.error("Firebase SDK failed to initialize.");
            triggerFallback("Firebase SDK initialization failed");
            return;
        }
        if (!window.firebase || !window.firebase.auth) {
            firebaseLoadAttempts++;
            if (firebaseLoadAttempts >= maxFirebaseLoadAttempts) {
                console.error("Firebase SDK failed to load within 3 seconds.");
                triggerFallback("Firebase SDK missing/failed to load");
                return;
            }
            firebaseCheckTimer = setTimeout(initAuthListener, 50);
            return;
        }

        const { onAuthStateChanged } = window.firebase.authMethods;
        onAuthStateChanged(window.firebase.auth, async (fbUser) => {
            // Once we get a response from Firebase, clear our global timeout timer
            if (authTimeoutTimer) {
                clearTimeout(authTimeoutTimer);
                authTimeoutTimer = null;
            }

            const path = window.location.pathname;
            const page = path.split('/').pop() || 'index.html';

            if (fbUser) {
                let userProfile = null;
                try {
                    const { doc, getDoc, setDoc } = window.firebase.firestoreMethods;
                    const userDocRef = doc(window.firebase.db, 'users', fbUser.uid);
                    
                    // Race Firestore query against a 2.5s timeout
                    const userDocSnap = await Promise.race([
                        getDoc(userDocRef),
                        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore query timeout")), 2500))
                    ]);

                    if (userDocSnap.exists()) {
                        userProfile = userDocSnap.data();
                        // Update last login timestamp in Firestore (non-blocking)
                        setDoc(userDocRef, {
                            lastLogin: new Date().toISOString()
                        }, { merge: true }).catch(err => console.warn("Could not update lastLogin in Firestore:", err));
                        
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
                    // Use local cache as fallback if Firestore fails, otherwise create basic profile
                    const cached = getLocalUser();
                    userProfile = cached || {
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

                if (!isAuthResolved) {
                    isAuthResolved = true;
                    resolveAuthReady(userProfile);
                    hideAuthLoadingOverlay();
                    updatePageHeader(userProfile);
                } else {
                    // Fallback was already triggered, but now we got actual auth details.
                    // Just update header and local cache.
                    updatePageHeader(userProfile);
                }

                // If on login/signup page, redirect to overview
                if (page === 'login.html' || page === 'signup.html') {
                    window.location.href = 'overview.html';
                }
            } else {
                // Not authenticated
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);

                if (!isAuthResolved) {
                    isAuthResolved = true;
                    resolveAuthReady(null);
                    hideAuthLoadingOverlay();
                }

                if (isCurrentPageProtected()) {
                    window.location.href = 'login.html';
                }
            }
        });
    }

    // Initialize listener based on page requirement
    if (hasFirebaseScript) {
        initAuthListener();
        authTimeoutTimer = setTimeout(() => {
            triggerFallback("Authentication Verification Timeout");
        }, 3500);
    } else {
        // Immediate resolve for static pages that do not load Firebase (e.g. index.html)
        const cachedUser = getLocalUser();
        resolveAuthReady(cachedUser);
        isAuthResolved = true;
    }

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
            return getLocalUser();
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
