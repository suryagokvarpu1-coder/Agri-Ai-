/**
 * Smart Location Picker System
 * Provides an advanced, map-based location search and selection experience.
 */

class SmartLocationPicker {
    constructor() {
        this.map = null;
        this.marker = null;
        this.targetInput = null;
        this.searchTimeout = null;
        
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.injectDependencies();
        this.createModalHTML();
        this.attachGlobalListeners();
        console.log("🌍 Smart Location Picker Initialized");
    }

    injectDependencies() {
        // Inject Leaflet CSS if not present
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }
        
        // Inject Leaflet JS if not present
        if (!window.L && !document.getElementById('leaflet-js')) {
            const script = document.createElement('script');
            script.id = 'leaflet-js';
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            document.head.appendChild(script);
        }
    }

    createModalHTML() {
        if (document.getElementById('smart-location-modal')) return;

        const modalHTML = `
        <div id="smart-location-modal" class="fixed inset-0 z-[9999] hidden items-center justify-center bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 opacity-0">
            <div class="relative w-full max-w-3xl mx-4 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform scale-95 transition-transform duration-300" id="smart-loc-content">
                
                <!-- Header -->
                <div class="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                        <svg width="20" height="20" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                        Select Location
                    </h3>
                    <button id="close-smart-loc" class="text-slate-400 hover:text-white transition-colors">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <!-- Search & Actions -->
                <div class="p-4 flex flex-col gap-3 relative z-10">
                    <div class="flex gap-2">
                        <div class="relative flex-1">
                            <input type="text" id="smart-loc-search" placeholder="Search village, city, district, or landmark..." 
                                class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 pl-10 transition-colors">
                            <svg class="absolute left-3 top-3.5 text-slate-400" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <button id="smart-loc-current" class="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors whitespace-nowrap">
                            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span class="hidden sm:inline">Use Current</span>
                        </button>
                    </div>
                    
                    <!-- Autocomplete Suggestions Dropdown -->
                    <div id="smart-loc-suggestions" class="absolute top-[60px] left-4 right-[130px] bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto hidden">
                        <!-- Items injected here -->
                    </div>
                </div>

                <!-- Map Container -->
                <div class="flex-1 relative min-h-[300px] border-y border-white/5 bg-slate-900" id="smart-loc-map">
                    <!-- Leaflet map goes here -->
                </div>

                <!-- Footer details & Confirmation -->
                <div class="p-4 bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-1">Selected Location</p>
                        <p id="smart-loc-display" class="text-white text-sm font-medium truncate">No location selected</p>
                    </div>
                    <button id="smart-loc-confirm" class="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-bold transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Confirm Selection
                    </button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind internal modal events
        document.getElementById('close-smart-loc').addEventListener('click', () => this.closeModal());
        document.getElementById('smart-location-modal').addEventListener('click', (e) => {
            if (e.target.id === 'smart-location-modal') this.closeModal();
        });

        document.getElementById('smart-loc-current').addEventListener('click', () => this.detectCurrentLocation());
        document.getElementById('smart-loc-search').addEventListener('input', (e) => this.handleSearchInput(e.target.value));
        document.getElementById('smart-loc-confirm').addEventListener('click', () => this.confirmSelection());
    }

    attachGlobalListeners() {
        document.addEventListener('click', (e) => {
            // Check if user clicked the input, or the map icon button
            const trigger = e.target.closest('.smart-location-input, #open-map-picker');
            if (trigger) {
                e.preventDefault();
                // Always target the actual text input for filling data
                this.targetInput = document.getElementById('location');
                this.openModal();
            }
            
            // Also intercept the "Auto-Detect" buttons next to location inputs if they exist
            const autoBtn = e.target.closest('#auto-locate-btn');
            if (autoBtn) {
                e.preventDefault();
                this.targetInput = document.getElementById('location');
                this.openModal();
                this.detectCurrentLocation();
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#smart-loc-suggestions') && !e.target.closest('#smart-loc-search')) {
                const sugg = document.getElementById('smart-loc-suggestions');
                if (sugg) sugg.classList.add('hidden');
            }
        });
    }

    openModal() {
        const modal = document.getElementById('smart-location-modal');
        const content = document.getElementById('smart-loc-content');
        
        modal.classList.remove('hidden');
        // Trigger animation frame for transition
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
        });

        // Initialize map if not already done
        if (!this.map) {
            setTimeout(() => this.initMap(), 300); // Wait for transition
        } else {
            // Fix map sizing issues if it was hidden
            setTimeout(() => this.map.invalidateSize(), 300);
        }

        // If target input has value, pre-fill search
        if (this.targetInput && this.targetInput.value) {
            const val = this.targetInput.value;
            if (val !== "Location found (Coordinates)" && val !== "Detecting securely...") {
                document.getElementById('smart-loc-search').value = val;
                document.getElementById('smart-loc-display').textContent = val;
                document.getElementById('smart-loc-confirm').disabled = false;
                
                // Optional: Fire a silent search to place pin, or just rely on existing pin
            }
        }
        
        document.getElementById('smart-loc-search').focus();
    }

    closeModal() {
        const modal = document.getElementById('smart-location-modal');
        const content = document.getElementById('smart-loc-content');
        
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    initMap() {
        if (!window.L) {
            console.warn("Leaflet not loaded yet, retrying in 200ms...");
            setTimeout(() => this.initMap(), 200);
            return;
        }

        // Default to India coordinates if none stored
        let defaultLat = 20.5937;
        let defaultLng = 78.9629;
        let defaultZoom = 5;

        // Try to get saved coords
        const savedLoc = localStorage.getItem('agri_user_location');
        if (savedLoc) {
            try {
                const parsed = JSON.parse(savedLoc);
                if (parsed.lat && parsed.lon) {
                    defaultLat = parsed.lat;
                    defaultLng = parsed.lon;
                    defaultZoom = 12;
                }
            } catch(e) {}
        }

        this.map = L.map('smart-loc-map', { zoomControl: false, maxZoom: 22 }).setView([defaultLat, defaultLng], defaultZoom);
        
        // Add HD Satellite Layer (High-Resolution)
        L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy; Google',
            maxZoom: 22,
            maxNativeZoom: 21,
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }).addTo(this.map);
        
        // Add HD Boundaries, Roads & Village Labels
        L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
            attribution: '',
            maxZoom: 22,
            maxNativeZoom: 21,
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }).addTo(this.map);

        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // Click on map to set pin
        this.map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            this.setPinAndReverseGeocode(lat, lng);
        });

        // Initial pin if we had saved location
        if (defaultZoom === 12) {
            this.updateMarker(defaultLat, defaultLng);
        }
    }

    updateMarker(lat, lng) {
        if (this.marker) {
            this.marker.setLatLng([lat, lng]);
        } else {
            // Custom Leaflet Icon matching UI
            const icon = L.divIcon({
                className: 'custom-pin',
                html: `<div style="width:24px;height:24px;background:#10b981;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            this.marker = L.marker([lat, lng], { icon }).addTo(this.map);
        }
        this.map.flyTo([lat, lng], 14, { duration: 1 });
    }

    async setPinAndReverseGeocode(lat, lng) {
        this.updateMarker(lat, lng);
        document.getElementById('smart-loc-display').innerHTML = '<span class="animate-pulse">Fetching details...</span>';
        
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            
            if (data && data.address) {
                const parts = [
                    data.address.village || data.address.town || data.address.city || data.address.county,
                    data.address.state,
                    data.address.country
                ].filter(Boolean);
                
                const fullAddress = parts.join(", ");
                document.getElementById('smart-loc-display').textContent = fullAddress;
                document.getElementById('smart-loc-search').value = fullAddress;
                
                // Store full object temporarily
                this.currentSelectedData = {
                    address: fullAddress,
                    lat: lat,
                    lon: lng,
                    details: data.address
                };
                
                document.getElementById('smart-loc-confirm').disabled = false;
            } else {
                this.fallbackCoords(lat, lng);
            }
        } catch (err) {
            console.error(err);
            this.fallbackCoords(lat, lng);
        }
    }

    fallbackCoords(lat, lng) {
        const text = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        document.getElementById('smart-loc-display').textContent = text;
        document.getElementById('smart-loc-search').value = text;
        this.currentSelectedData = { address: text, lat, lon: lng };
        document.getElementById('smart-loc-confirm').disabled = false;
    }

    detectCurrentLocation() {
        const btn = document.getElementById('smart-loc-current');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span class="hidden sm:inline">Detecting...</span>`;
        btn.disabled = true;

        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            this.resetBtn(btn, originalHtml);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.resetBtn(btn, originalHtml);
                this.setPinAndReverseGeocode(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
                this.resetBtn(btn, originalHtml);
                alert("Location access denied. Please search manually.");
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }

    resetBtn(btn, html) {
        btn.innerHTML = html;
        btn.disabled = false;
    }

    handleSearchInput(query) {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        const sugg = document.getElementById('smart-loc-suggestions');
        
        if (!query || query.length < 3) {
            sugg.classList.add('hidden');
            return;
        }

        this.searchTimeout = setTimeout(async () => {
            try {
                // nominatim search
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
                const data = await res.json();
                
                if (data && data.length > 0) {
                    sugg.innerHTML = '';
                    data.forEach(item => {
                        const name = item.display_name;
                        const div = document.createElement('div');
                        div.className = 'px-4 py-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-0 flex flex-col transition-colors';
                        
                        // Bold the main part
                        const mainPart = name.split(',')[0];
                        const rest = name.substring(mainPart.length + 1);
                        
                        div.innerHTML = `
                            <span class="text-white font-medium">${mainPart}</span>
                            <span class="text-slate-400 text-xs truncate">${rest}</span>
                        `;
                        
                        div.onclick = () => {
                            sugg.classList.add('hidden');
                            this.setPinAndReverseGeocode(parseFloat(item.lat), parseFloat(item.lon));
                        };
                        sugg.appendChild(div);
                    });
                    sugg.classList.remove('hidden');
                } else {
                    sugg.classList.add('hidden');
                }
            } catch(e) {
                console.error(e);
            }
        }, 400); // 400ms debounce
    }

    confirmSelection() {
        if (!this.currentSelectedData) return;
        
        // Update input
        if (this.targetInput) {
            this.targetInput.value = this.currentSelectedData.address;
            
            // Dispatch native change event so other scripts (like form validation) catch it
            const event = new Event('change', { bubbles: true });
            this.targetInput.dispatchEvent(event);
        }

        // Global sync
        localStorage.setItem('agri_user_location', JSON.stringify({
            address: this.currentSelectedData.address,
            lat: this.currentSelectedData.lat,
            lon: this.currentSelectedData.lon
        }));
        
        // Fire custom event
        window.dispatchEvent(new CustomEvent('agriLocationUpdated', {
            detail: this.currentSelectedData
        }));

        this.closeModal();
    }
}

// Instantiate globally
window.smartLocationPicker = new SmartLocationPicker();
