/**
 * Global Settings System for Agri-AI Website
 * Applies theme, performance, and other settings across all pages
 */

class GlobalSettings {
    constructor() {
        this.settings = {
            theme: 'auto',
            language: 'en-in',
            units: 'metric',
            notifications: {
                predictions: true,
                weather: true,
                system: false
            },
            privacy: {
                analytics: true,
                sharing: false
            },
            performance: {
                animations: 'normal'
            }
        };
        
        this.init();
    }

    init() {
        // Load settings from localStorage
        this.loadSettings();
        
        // Apply settings immediately
        this.applyAllSettings();
        
        // Listen for settings changes from other tabs/windows
        window.addEventListener('storage', (event) => {
            if (event.key === 'agri-ai-settings') {
                this.loadSettings();
                this.applyAllSettings();
            }
        });
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
                if (this.settings.theme === 'auto') {
                    this.applyTheme('auto');
                }
            });
        }
        
        console.log('🌐 Global Settings System initialized');
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('agri-ai-settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Map unified settings keys to internal structure
                if (parsed.language) this.settings.language = parsed.language;
                if (parsed.units)    this.settings.units    = parsed.units;
                if (parsed.animation) this.settings.performance.animations = parsed.animation;
                if (parsed.notif_predictions !== undefined) this.settings.notifications.predictions = parsed.notif_predictions;
                if (parsed.notif_weather     !== undefined) this.settings.notifications.weather     = parsed.notif_weather;
                if (parsed.notif_system      !== undefined) this.settings.notifications.system      = parsed.notif_system;
                if (parsed.privacy_analytics !== undefined) this.settings.privacy.analytics         = parsed.privacy_analytics;
                if (parsed.privacy_sharing   !== undefined) this.settings.privacy.sharing           = parsed.privacy_sharing;
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
        }
    }

    saveSettings() {
        try {
            // Read current unified settings object
            let current = {};
            try { current = JSON.parse(localStorage.getItem('agri-ai-settings')) || {}; } catch {}
            // Merge internal state back
            current.language  = this.settings.language;
            current.units     = this.settings.units;
            current.animation = this.settings.performance.animations;
            current.notif_predictions = this.settings.notifications.predictions;
            current.notif_weather     = this.settings.notifications.weather;
            current.notif_system      = this.settings.notifications.system;
            current.privacy_analytics = this.settings.privacy.analytics;
            current.privacy_sharing   = this.settings.privacy.sharing;
            localStorage.setItem('agri-ai-settings', JSON.stringify(current));
        } catch (error) {
            console.warn('Failed to save settings:', error);
        }
    }

    applyAllSettings() {
        this.applyTheme(this.settings.theme);
        this.applyPerformance(this.settings.performance);
        this.applyLanguage(this.settings.language);
        this.applyUnits(this.settings.units);
    }

    applyTheme(theme) {
        const body = document.body;
        
        // Remove existing theme classes
        body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
        
        let actualTheme = theme;
        
        if (theme === 'auto') {
            // Detect system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            actualTheme = prefersDark ? 'dark' : 'light';
            body.classList.add('theme-auto');
        }
        
        body.classList.add(`theme-${actualTheme}`);
        
        if (actualTheme === 'light') {
            this.applyLightTheme();
        } else {
            this.applyDarkTheme();
        }
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(actualTheme);
        
        console.log(`🎨 Theme applied: ${theme} (${actualTheme})`);
    }

    applyLightTheme() {
        const root = document.documentElement;
        
        // Update CSS custom properties for light theme
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--bg-tertiary', '#f1f5f9');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#4b5563');
        root.style.setProperty('--text-tertiary', '#6b7280');
        root.style.setProperty('--border-primary', '#e5e7eb');
        root.style.setProperty('--border-secondary', '#d1d5db');
        
        // Apply light theme styles
        document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)';
        document.body.style.color = '#1f2937';
        
        // Update header if exists
        const header = document.querySelector('header');
        if (header) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        // Update cards and containers
        this.updateElementStyles('.bg-gray-900', {
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
            color: '#1f2937'
        });
        
        this.updateElementStyles('.bg-gray-800', {
            backgroundColor: '#f9fafb',
            borderColor: '#d1d5db',
            color: '#1f2937'
        });
        
        this.updateElementStyles('.text-white', {
            color: '#1f2937'
        });
        
        this.updateElementStyles('.text-gray-300', {
            color: '#4b5563'
        });
        
        this.updateElementStyles('.text-gray-400', {
            color: '#6b7280'
        });
    }

    applyDarkTheme() {
        const root = document.documentElement;
        
        // Update CSS custom properties for dark theme
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#1f2937');
        root.style.setProperty('--bg-tertiary', '#374151');
        root.style.setProperty('--text-primary', '#e2e8f0');
        root.style.setProperty('--text-secondary', '#cbd5e1');
        root.style.setProperty('--text-tertiary', '#9ca3af');
        root.style.setProperty('--border-primary', '#374151');
        root.style.setProperty('--border-secondary', '#4b5563');
        
        // Apply dark theme styles
        document.body.style.background = '#000000';
        document.body.style.color = '#e2e8f0';
        
        // Update header if exists
        const header = document.querySelector('header');
        if (header) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        // Reset any light theme overrides
        this.resetElementStyles('.bg-gray-900');
        this.resetElementStyles('.bg-gray-800');
        this.resetElementStyles('.text-white');
        this.resetElementStyles('.text-gray-300');
        this.resetElementStyles('.text-gray-400');
    }

    applyPerformance(performance) {
        const animationLevel = performance.animations || 'normal';
        
        // Remove existing animation classes
        document.body.classList.remove('animations-none', 'animations-reduced', 'animations-normal', 'animations-enhanced');
        
        // Apply animation level
        document.body.classList.add(`animations-${animationLevel}`);
        
        // Update or create performance styles
        this.updatePerformanceStyles(animationLevel);
        
        console.log(`⚡ Performance applied: ${animationLevel} animations`);
    }

    updatePerformanceStyles(level) {
        // Remove existing performance styles
        const existingStyle = document.getElementById('global-performance-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = 'global-performance-styles';
        
        let css = '';
        
        switch (level) {
            case 'none':
                css = `
                    *, *::before, *::after {
                        animation-duration: 0s !important;
                        animation-delay: 0s !important;
                        transition-duration: 0s !important;
                        transition-delay: 0s !important;
                    }
                    @keyframes backgroundShift { 0%, 100% { transform: none; } }
                `;
                break;
                
            case 'reduced':
                css = `
                    *, *::before, *::after {
                        animation-duration: 0.15s !important;
                        transition-duration: 0.15s !important;
                    }
                    @keyframes backgroundShift {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(10px, -10px) scale(1.02); }
                    }
                `;
                break;
                
            case 'enhanced':
                css = `
                    *, *::before, *::after {
                        animation-duration: 0.6s !important;
                        transition-duration: 0.6s !important;
                    }
                    
                    /* Enhanced hover effects */
                    nav a:hover {
                        transform: translateY(-3px) scale(1.05) !important;
                    }
                    
                    button:hover {
                        transform: translateY(-2px) scale(1.02) !important;
                    }
                    
                    .theme-option:hover,
                    .bg-gray-800:hover,
                    .bg-gray-900:hover {
                        transform: translateY(-2px) !important;
                    }
                    
                    @keyframes backgroundShift {
                        0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
                        25% { transform: translate(20px, -20px) scale(1.05) rotate(2deg); opacity: 0.9; }
                        50% { transform: translate(-15px, 25px) scale(0.95) rotate(-1deg); opacity: 0.95; }
                        75% { transform: translate(25px, 15px) scale(1.02) rotate(1deg); opacity: 0.92; }
                    }
                `;
                break;
                
            default: // normal
                css = `
                    /* Normal animations - default behavior */
                `;
                break;
        }
        
        style.textContent = css;
        document.head.appendChild(style);
    }

    applyLanguage(language) {
        // Use the language saved by translations.js (agri-ai-language key takes priority)
        const savedLang = localStorage.getItem('agri-ai-language');
        const langToApply = savedLang || language;

        const applyLanguageChange = () => {
            if (window.translationSystem && typeof window.translationSystem.setLanguage === 'function') {
                if (window.translationSystem.getCurrentLanguage() !== langToApply) {
                    window.translationSystem.setLanguage(langToApply);
                }
                console.log(`🌐 Language applied: ${langToApply}`);
            } else {
                setTimeout(applyLanguageChange, 50);
            }
        };
        applyLanguageChange();
    }

    applyUnits(units) {
        // Store units preference for use in forms and displays
        document.documentElement.setAttribute('data-units', units);
        console.log(`📏 Units applied: ${units}`);
    }

    updateMetaThemeColor(theme) {
        let themeColor = theme === 'light' ? '#ffffff' : '#000000';
        
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = themeColor;
    }

    updateElementStyles(selector, styles) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            Object.assign(element.style, styles);
        });
    }

    resetElementStyles(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Reset specific styles that might have been overridden
            element.style.backgroundColor = '';
            element.style.borderColor = '';
            element.style.color = '';
        });
    }

    // Public methods for updating settings
    updateSetting(key, value) {
        if (key.includes('.')) {
            // Handle nested keys like 'performance.animations'
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

    getAllSettings() {
        return { ...this.settings };
    }

    resetToDefaults() {
        this.settings = {
            theme: 'auto',
            language: 'en-in',
            units: 'metric',
            notifications: {
                predictions: true,
                weather: true,
                system: false
            },
            privacy: {
                analytics: true,
                sharing: false
            },
            performance: {
                animations: 'normal'
            }
        };
        
        this.saveSettings();
        this.applyAllSettings();
    }
}

// Initialize global settings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.globalSettings = new GlobalSettings();
    injectGlobalMobileStyles();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    window.globalSettings = new GlobalSettings();
    injectGlobalMobileStyles();
}

/**
 * Inject global mobile-responsive and toggle-switch styles into every page
 */
function injectGlobalMobileStyles() {
    if (document.getElementById('global-mobile-styles')) return;

    const style = document.createElement('style');
    style.id = 'global-mobile-styles';
    style.textContent = `
        /* ===== TOGGLE SWITCH ===== */
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
            flex-shrink: 0;
            cursor: pointer;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
        }
        .toggle-switch .slider {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.15);
            border-radius: 28px;
            transition: background 0.3s ease;
            border: 2px solid rgba(255,255,255,0.2);
        }
        .toggle-switch .slider::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            left: 2px;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .toggle-switch input:checked + .slider {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-color: rgba(102,126,234,0.5);
        }
        .toggle-switch input:checked + .slider::before {
            transform: translateY(-50%) translateX(24px);
        }

        /* ===== GLOBAL MOBILE FIXES ===== */

        /* Ensure header hamburger button has a good touch target */
        header button[onclick="toggleSidebar()"] {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Prevent card hover lift on touch devices */
        @media (hover: none) {
            .soil-type-card:hover,
            .crop-card:hover,
            .growth-stage:hover,
            .bg-gray-800:hover,
            .bg-gray-900:hover {
                transform: none !important;
            }
        }

        /* Notification toast: keep inside viewport on mobile */
        @media (max-width: 640px) {
            .fixed.top-4.right-4 {
                right: 0.75rem;
                left: 0.75rem;
                max-width: calc(100vw - 1.5rem);
                transform: none !important;
            }
        }

        /* Ensure all section headings scale down gracefully */
        @media (max-width: 480px) {
            h2.text-4xl, h2.text-5xl {
                font-size: 1.75rem !important;
                line-height: 1.2 !important;
            }
            h3.text-2xl, h3.text-3xl {
                font-size: 1.35rem !important;
            }
        }

        /* Prevent horizontal overflow from animations */
        #app-content {
            overflow-x: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalSettings;
}