/**
 * Global Settings System for Agri-AI (Normal UI Mode)
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
        // Fixed to light theme for "Normal UI"
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

// Initialize global settings
document.addEventListener('DOMContentLoaded', () => {
    window.globalSettings = new GlobalSettings();
});

if (document.readyState !== 'loading') {
    window.globalSettings = new GlobalSettings();
}