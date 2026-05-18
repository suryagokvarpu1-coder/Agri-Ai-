/**
 * Global Settings System for Zakri (Normal UI Mode)
 * Manages user preferences like language and units.
 */

// ── Inject Core Styles ──────────────────────────────────────────────────
(function injectStyles() {
    const sheets = [
        { id: 'agri-ui-theme',    href: 'ui-theme.css' },
        { id: 'agri-page-shell',  href: 'page-shell.css' },
    ];
    sheets.forEach(({ id, href }) => {
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id; link.rel = 'stylesheet'; link.href = href;
        document.head.appendChild(link);
    });
    
    // Core Font: Inter
    if (!document.getElementById('agri-fonts')) {
        const f = document.createElement('link');
        f.id = 'agri-fonts'; f.rel = 'stylesheet';
        f.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        document.head.appendChild(f);
    }
})();

class GlobalSettings {
    constructor() {
        this.settings = {
            theme: 'light', // Fixed to light for "Normal UI"
            language: 'en-in',
            units: 'metric',
            notifications: { predictions: true, weather: true, system: false },
            privacy: { analytics: true, sharing: false },
            performance: { animations: 'normal' }
        };
        this.init();
    }

    init() {
        this.loadSettings();
        this.applyAllSettings();
        this.setupLogoRefresh();
        this.scrubLegacyMaps();
        
        window.addEventListener('storage', (event) => {
            if (event.key === 'agri-ai-settings') {
                this.loadSettings();
                this.applyAllSettings();
            }
        });
        
        console.log('🌐 Global Settings initialized (Normal UI)');
    }

    setupLogoRefresh() {
        document.addEventListener('click', (e) => {
            const logo = e.target.closest('.page-header-logo');
            if (logo) {
                window.location.reload();
            }
        });
    }

    scrubLegacyMaps() {
        /**
         * EMERGENCY SCRUBBER: Removes any Google Maps iframes that might be injected 
         * by stale caches, browser extensions, or legacy scripts.
         */
        const scrub = () => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const src = iframe.src || '';
                if (src.includes('google.com/maps') || src.includes('pb=')) {
                    console.warn('🛡️ Agri-AI: Blocked legacy Google Maps component to prevent "pb" error.');
                    iframe.remove();
                }
            });
        };

        // Run immediately
        scrub();

        // Also run when DOM changes (handles late injection)
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(scrub);
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('agri-ai-settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.language) this.settings.language = parsed.language;
                if (parsed.units)    this.settings.units    = parsed.units;
                if (parsed.animation) this.settings.performance.animations = parsed.animation;
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
        }
    }

    saveSettings() {
        try {
            let current = {};
            try { current = JSON.parse(localStorage.getItem('agri-ai-settings')) || {}; } catch {}
            current.language  = this.settings.language;
            current.units     = this.settings.units;
            current.animation = this.settings.performance.animations;
            localStorage.setItem('agri-ai-settings', JSON.stringify(current));
        } catch (error) {
            console.warn('Failed to save settings:', error);
        }
    }

    applyAllSettings() {
        document.body.classList.add('theme-light');
        this.applyLanguage(this.settings.language);
        this.applyUnits(this.settings.units);
    }

    applyLanguage(language) {
        const savedLang = localStorage.getItem('agri-ai-language');
        const langToApply = savedLang || language;

        const applyLanguageChange = () => {
            if (window.translationSystem && typeof window.translationSystem.setLanguage === 'function') {
                if (window.translationSystem.getCurrentLanguage() !== langToApply) {
                    window.translationSystem.setLanguage(langToApply);
                }
            } else {
                setTimeout(applyLanguageChange, 50);
            }
        };
        applyLanguageChange();
    }

    applyUnits(units) {
        document.documentElement.setAttribute('data-units', units);
    }

    updateSetting(key, value) {
        if (key.includes('.')) {
            const keys = key.split('.');
            let current = this.settings;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
        } else {
            this.settings[key] = value;
        }
        this.saveSettings();
        this.applyAllSettings();
    }

    getSetting(key) {
        if (key.includes('.')) {
            const keys = key.split('.');
            let current = this.settings;
            for (const k of keys) {
                current = current[k];
                if (current === undefined) return undefined;
            }
            return current;
        }
        return this.settings[key];
    }
}

// Global Location Manager
class LocationManager {
    constructor() {
        this.init();
    }

    init() {
        // Run only after DOM is fully loaded to ensure styles and body are ready
        setTimeout(() => {
            const path = window.location.pathname.toLowerCase();
            if (path.includes('login') || path.includes('signup') || path.includes('index')) return;

            const locStatus = localStorage.getItem('agri_location_status');
            if (!locStatus) {
                this.showLocationModal();
            }
        }, 500);
    }

    showLocationModal() {
        if (document.getElementById('global-location-modal')) return;

        const modalHtml = `
        <div id="global-location-modal" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);opacity:0;transition:opacity 0.4s ease;">
            <div style="background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:2.5rem;max-width:460px;width:90%;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);text-align:center;transform:scale(0.95);transition:transform 0.4s ease;" id="loc-modal-content">
                <div style="width:64px;height:64px;background:rgba(16,185,129,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#10b981;margin:0 auto 1.5rem;border:1px solid rgba(16,185,129,0.2);">
                    <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 style="font-family:'Inter',sans-serif;font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:1rem;text-shadow:0 2px 10px rgba(0,0,0,0.5);">Enable Location Intelligence</h3>
                <p style="font-family:'Inter',sans-serif;font-size:0.95rem;color:#94a3b8;line-height:1.6;margin-bottom:2rem;">Agri-AI requires your location to deliver hyper-accurate weather analysis, precision crop predictions, and automated farm boundary mapping. Your data is processed securely.</p>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    <button id="loc-btn-allow" style="background:#10b981;color:#fff;font-family:'Inter',sans-serif;font-weight:700;font-size:1rem;padding:1rem;border-radius:12px;border:none;cursor:pointer;transition:all 0.2s;box-shadow:0 0 15px rgba(16,185,129,0.3);">Allow Location Access</button>
                    <button id="loc-btn-deny" style="background:transparent;color:#94a3b8;font-family:'Inter',sans-serif;font-weight:600;font-size:0.9rem;padding:0.75rem;border-radius:12px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;transition:all 0.2s;">Not Now (Set Manually)</button>
                </div>
                <p id="loc-modal-status" style="margin-top:1rem;font-size:0.85rem;color:#10b981;display:none;"></p>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        if (!document.getElementById('spin-keyframes')) {
            document.head.insertAdjacentHTML('beforeend', '<style id="spin-keyframes">@keyframes locspin { to { transform: rotate(360deg); } }</style>');
        }

        setTimeout(() => {
            document.getElementById('global-location-modal').style.opacity = '1';
            document.getElementById('loc-modal-content').style.transform = 'scale(1)';
        }, 50);

        document.getElementById('loc-btn-allow').addEventListener('click', () => {
            const btn = document.getElementById('loc-btn-allow');
            const status = document.getElementById('loc-modal-status');
            btn.innerHTML = `<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:locspin 1s linear infinite;margin-right:8px;vertical-align:middle;"></span>Detecting securely...`;
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                            const data = await response.json();
                            
                            let addressStr = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                            if (data && data.address) {
                                const city = data.address.city || data.address.town || data.address.county || "";
                                const state = data.address.state || "";
                                const country = data.address.country || "";
                                addressStr = [city, state, country].filter(Boolean).join(", ");
                            }
                            
                            localStorage.setItem('agri_location_status', 'granted');
                            localStorage.setItem('agri_user_location', JSON.stringify({lat, lon, address: addressStr}));
                            
                            status.style.display = 'block';
                            status.innerText = `Detected: ${addressStr}`;
                            
                            window.dispatchEvent(new CustomEvent('agriLocationUpdated', { detail: {lat, lon, address: addressStr} }));

                            setTimeout(() => this.closeLocationModal(), 1500);

                        } catch (err) {
                            console.error("Geocoding failed", err);
                            this.closeLocationModal('error');
                        }
                    },
                    (error) => {
                        this.closeLocationModal('denied');
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            } else {
                this.closeLocationModal('unsupported');
            }
        });

        document.getElementById('loc-btn-deny').addEventListener('click', () => {
            localStorage.setItem('agri_location_status', 'denied');
            this.closeLocationModal();
        });
    }

    closeLocationModal(reason) {
        const modal = document.getElementById('global-location-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 400);
        }
        if (reason === 'denied' || reason === 'error' || reason === 'unsupported') {
            localStorage.setItem('agri_location_status', 'denied');
            this.showToast('Location access denied. You can still enter your location manually.');
        } else if (!reason) {
            this.showToast('Location successfully synced!');
        }
    }
    
    showToast(msg) {
        const t = document.createElement('div');
        t.innerText = msg;
        t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.95);color:#fff;padding:12px 24px;border-radius:99px;font-family:'Inter',sans-serif;font-size:0.85rem;z-index:10000;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 25px rgba(0,0,0,0.5);opacity:0;transition:opacity 0.3s;";
        document.body.appendChild(t);
        setTimeout(() => t.style.opacity = '1', 10);
        setTimeout(() => { t.style.opacity = '0'; setTimeout(()=>t.remove(),300); }, 4000);
    }
}

// Initialize global settings & Location Manager
document.addEventListener('DOMContentLoaded', () => {
    window.globalSettings = new GlobalSettings();
    window.locationManager = new LocationManager();
});

if (document.readyState !== 'loading') {
    window.globalSettings = new GlobalSettings();
    window.locationManager = new LocationManager();
}

// ── Firebase Initialization ────────────────────────────────────────────────
// Dynamically imported to support ES Modules in a standard script context
(async function initFirebase() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
        const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js");
        
        const firebaseConfig = {
            apiKey: "AIzaSyDa4sh85YNzidrw7stFLgEWsLzZyP3BIKw",
            authDomain: "agri-ai-ca82f.firebaseapp.com",
            projectId: "agri-ai-ca82f",
            storageBucket: "agri-ai-ca82f.firebasestorage.app",
            messagingSenderId: "949311311156",
            appId: "1:949311311156:web:72f7a02466182afbc0a961",
            measurementId: "G-Y37LKY1W8X"
        };
        
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        console.log("🔥 Firebase Application & Analytics Initialized Successfully");
    } catch(err) {
        console.error("🔥 Firebase initialization failed:", err);
    }
})();