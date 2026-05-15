// Sidebar Navigation System
// This script provides a reusable sidebar navigation for all pages

class SidebarNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'overview.html';
        return page.replace('.html', '');
    }

    init() {
        this.createSidebarHTML();
        this.setupEventListeners();
        this.updateActiveState();
        this.updateUserInfo();
    }

    createSidebarHTML() {
        const sidebarHTML = `
            <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-60 z-40 hidden" onclick="toggleSidebar()" style="backdrop-filter:blur(4px)"></div>
            <nav id="sidebar" class="fixed left-0 top-0 h-full w-[85vw] max-w-xs sm:w-72 transform -translate-x-full transition-transform duration-300 ease-in-out z-50 overflow-y-auto" style="background:rgba(4,4,10,.97);border-right:1px solid rgba(255,255,255,.07);box-shadow:4px 0 40px rgba(0,0,0,.8)">
                <div class="p-5">
                    <div class="flex items-center gap-2.5 mb-8">
                        <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#8b5cf6);display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px rgba(34,197,94,.4)">
                            <svg width="16" height="16" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <span style="font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:1.2rem;letter-spacing:-.04em;background:linear-gradient(135deg,#22c55e,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Agri-AI</span>
                    </div>
                    <div class="space-y-1" id="sidebar-menu">
                        ${this.generateMenuItems()}
                    </div>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
                    
    generateMenuItems() {
        const menuItems = [
            {
                id: 'overview',
                href: 'overview.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>`,
                translationKey: 'nav_overview',
                defaultText: 'Overview'
            },
            {
                id: 'technology',
                href: 'technology.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>`,
                translationKey: 'nav_technology',
                defaultText: 'Technology'
            },
            {
                id: 'maptool',
                href: 'maptool.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>`,
                translationKey: 'nav_map',
                defaultText: 'Map Tool'
            },
            {
                id: 'predict',
                href: 'predict.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`,
                translationKey: 'nav_predict',
                defaultText: 'Predict Yield'
            },
            {
                id: 'soil-analysis',
                href: 'soil-analysis.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>`,
                translationKey: 'nav_soil_analysis',
                defaultText: 'Soil Analysis'
            },
            {
                id: 'growth-monitoring',
                href: 'growth-monitoring.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>`,
                translationKey: 'nav_growth_monitoring',
                defaultText: 'Growth Monitor'
            },
            {
                id: 'carbon-tracking',
                href: 'carbon-tracking.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
                translationKey: 'nav_carbon_tracking',
                defaultText: 'Carbon Tracking'
            },
            {
                id: 'impact',
                href: 'impact.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>`,
                translationKey: 'nav_impact',
                defaultText: 'Impact'
            },

            {
                id: 'settings',
                href: 'settings.html',
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
                translationKey: 'nav_settings',
                defaultText: 'Settings'
            }
        ];

        let menuHTML = '';
        
        menuItems.forEach(item => {
            const isActive = this.currentPage === item.id;
            const activeClass = isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
            
            menuHTML += `
                <a href="${item.href}" data-i18n="${item.translationKey}" class="flex items-center space-x-3 px-4 py-3.5 rounded-lg ${activeClass} font-medium transition-all duration-200 min-h-[48px]">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${item.icon}
                    </svg>
                    <span>${item.defaultText}</span>
                </a>
            `;
        });

        // Add logout button
        menuHTML += `
            <button onclick="logout()" data-i18n="nav_logout" class="flex items-center space-x-3 px-4 py-3.5 rounded-lg text-red-300 hover:bg-red-600 hover:text-white font-medium transition-all duration-200 w-full text-left min-h-[48px]">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Logout</span>
            </button>
        `;

        return menuHTML;
    }

    setupEventListeners() {
        // Close sidebar when clicking outside
        document.addEventListener('click', (event) => {
            const sidebar = document.getElementById('sidebar');
            const toggleButton = event.target.closest('button[onclick="toggleSidebar()"]');
            
            if (!sidebar.contains(event.target) && !toggleButton && !sidebar.classList.contains('-translate-x-full')) {
                this.closeSidebar();
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                if (!sidebar.classList.contains('-translate-x-full')) {
                    this.closeSidebar();
                }
            }
        });
    }

    updateActiveState() {
        // Update active state based on current page
        const menuItems = document.querySelectorAll('#sidebar-menu a');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            const pageId = href.replace('.html', '');
            
            if (pageId === this.currentPage) {
                item.className = item.className.replace('text-gray-300 hover:bg-gray-700 hover:text-white', 'bg-blue-600 text-white');
            }
        });
    }

    updateUserInfo() {
        // Update header with user info if elements exist
        const user = JSON.parse(localStorage.getItem('agri-ai-user') || '{}');
        const usernameElement = document.getElementById('header-username');
        const avatarElement = document.getElementById('header-avatar');
        
        if (user.username && usernameElement && avatarElement) {
            usernameElement.textContent = `Welcome, ${user.username}`;
            avatarElement.textContent = user.username.charAt(0).toUpperCase();
        }
    }

    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    toggle() {
        const sidebar = document.getElementById('sidebar');
        
        if (sidebar.classList.contains('-translate-x-full')) {
            this.openSidebar();
        } else {
            this.closeSidebar();
        }
    }
}

// Global toggle function
function toggleSidebar() {
    if (window.sidebarNav) {
        window.sidebarNav.toggle();
    }
}

// Global logout function
function logout() {
    localStorage.removeItem('agri-ai-token');
    localStorage.removeItem('agri-ai-user');
    window.location.href = 'login.html';
}

// Initialize sidebar navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarNav = new SidebarNavigation();
    
    // Apply translations if translation system is available
    if (window.translationSystem) {
        setTimeout(() => {
            window.translationSystem.applyTranslations();
        }, 100);
    }
    
    // Listen for language changes to update sidebar content
    document.addEventListener('languageChanged', () => {
        if (window.translationSystem) {
            setTimeout(() => {
                window.translationSystem.applyTranslations();
            }, 50);
        }
    });
});