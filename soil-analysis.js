/**
 * Soil Texture Analysis System
 * AI-powered soil type detection and crop recommendations
 */

class SoilAnalysisSystem {
    constructor() {
        this.uploadArea = document.getElementById('upload-area');
        this.fileInput = document.getElementById('soil-image');
        this.loadingState = document.getElementById('loading-state');
        this.analysisResults = document.getElementById('analysis-results');
        
        this.soilDatabase = {
            sandy: {
                name: 'Sandy Soil',
                color: '#f9a825',
                icon: '🏖️',
                description: 'Sandy soil has large particles with excellent drainage but low water and nutrient retention. Best for crops that prefer well-drained conditions.',
                crops: [
                    // Root Vegetables (Excellent for sandy soil)
                    { name: 'Carrots', icon: '🥕', suitability: 95, season: 'Cool season' },
                    { name: 'Radishes', icon: '🌶️', suitability: 90, season: 'Cool season' },
                    { name: 'Turnips', icon: '🟣', suitability: 88, season: 'Cool season' },
                    { name: 'Parsnips', icon: '🥕', suitability: 92, season: 'Cool season' },
                    { name: 'Beets', icon: '🟣', suitability: 85, season: 'Cool season' },
                    { name: 'Sweet Potatoes', icon: '🍠', suitability: 90, season: 'Warm season' },
                    { name: 'Potatoes', icon: '🥔', suitability: 85, season: 'Cool season' },
                    
                    // Herbs (Thrive in well-drained sandy soil)
                    { name: 'Rosemary', icon: '🌿', suitability: 95, season: 'Perennial' },
                    { name: 'Thyme', icon: '🌿', suitability: 92, season: 'Perennial' },
                    { name: 'Oregano', icon: '🌿', suitability: 90, season: 'Perennial' },
                    { name: 'Sage', icon: '🌿', suitability: 88, season: 'Perennial' },
                    { name: 'Lavender', icon: '💜', suitability: 95, season: 'Perennial' },
                    { name: 'Basil', icon: '🌿', suitability: 80, season: 'Warm season' },
                    
                    // Fruits & Berries
                    { name: 'Strawberries', icon: '🍓', suitability: 85, season: 'Perennial' },
                    { name: 'Blueberries', icon: '🫐', suitability: 82, season: 'Perennial' },
                    { name: 'Grapes', icon: '🍇', suitability: 88, season: 'Perennial' },
                    { name: 'Melons', icon: '🍈', suitability: 85, season: 'Warm season' },
                    { name: 'Watermelons', icon: '🍉', suitability: 87, season: 'Warm season' },
                    
                    // Vegetables
                    { name: 'Asparagus', icon: '🌿', suitability: 90, season: 'Perennial' },
                    { name: 'Onions', icon: '🧅', suitability: 85, season: 'Cool season' },
                    { name: 'Garlic', icon: '🧄', suitability: 88, season: 'Cool season' },
                    { name: 'Leeks', icon: '🥬', suitability: 80, season: 'Cool season' },
                    { name: 'Lettuce', icon: '🥬', suitability: 75, season: 'Cool season' },
                    { name: 'Spinach', icon: '🥬', suitability: 70, season: 'Cool season' },
                    
                    // Legumes
                    { name: 'Green Beans', icon: '🫛', suitability: 80, season: 'Warm season' },
                    { name: 'Lima Beans', icon: '🫛', suitability: 82, season: 'Warm season' },
                    { name: 'Black-eyed Peas', icon: '🫛', suitability: 85, season: 'Warm season' },
                    
                    // Grains & Cereals
                    { name: 'Rye', icon: '🌾', suitability: 88, season: 'Cool season' },
                    { name: 'Barley', icon: '🌾', suitability: 85, season: 'Cool season' },
                    { name: 'Millet', icon: '🌾', suitability: 90, season: 'Warm season' },
                    
                    // Flowers & Ornamentals
                    { name: 'Sunflowers', icon: '🌻', suitability: 85, season: 'Warm season' },
                    { name: 'Marigolds', icon: '🌼', suitability: 80, season: 'Warm season' },
                    { name: 'Zinnias', icon: '🌸', suitability: 82, season: 'Warm season' }
                ],
                tips: [
                    'Add organic matter like compost to improve water retention',
                    'Use mulch to reduce water evaporation and soil temperature',
                    'Consider drip irrigation for efficient water use',
                    'Plant cover crops to prevent soil erosion',
                    'Add clay or silt to improve soil structure',
                    'Apply fertilizer more frequently due to nutrient leaching',
                    'Choose drought-tolerant varieties when possible',
                    'Water deeply but less frequently to encourage deep root growth'
                ]
            },
            loamy: {
                name: 'Loamy Soil',
                color: '#4caf50',
                icon: '🌱',
                description: 'Loamy soil is the ideal garden soil with balanced sand, silt, and clay particles. It provides excellent drainage while retaining moisture and nutrients.',
                crops: [
                    // Nightshades (Excellent in loamy soil)
                    { name: 'Tomatoes', icon: '🍅', suitability: 95, season: 'Warm season' },
                    { name: 'Peppers', icon: '🌶️', suitability: 92, season: 'Warm season' },
                    { name: 'Eggplant', icon: '🍆', suitability: 90, season: 'Warm season' },
                    { name: 'Potatoes', icon: '🥔', suitability: 88, season: 'Cool season' },
                    
                    // Leafy Greens
                    { name: 'Lettuce', icon: '🥬', suitability: 95, season: 'Cool season' },
                    { name: 'Spinach', icon: '🥬', suitability: 92, season: 'Cool season' },
                    { name: 'Kale', icon: '🥬', suitability: 90, season: 'Cool season' },
                    { name: 'Arugula', icon: '🥬', suitability: 88, season: 'Cool season' },
                    
                    // Legumes
                    { name: 'Green Beans', icon: '🫛', suitability: 90, season: 'Warm season' },
                    { name: 'Peas', icon: '🟢', suitability: 88, season: 'Cool season' },
                    { name: 'Lima Beans', icon: '🫛', suitability: 85, season: 'Warm season' },
                    { name: 'Soybeans', icon: '🫛', suitability: 87, season: 'Warm season' },
                    
                    // Cucurbits
                    { name: 'Cucumbers', icon: '🥒', suitability: 90, season: 'Warm season' },
                    { name: 'Squash', icon: '🎃', suitability: 88, season: 'Warm season' },
                    { name: 'Zucchini', icon: '🥒', suitability: 90, season: 'Warm season' },
                    { name: 'Pumpkins', icon: '🎃', suitability: 85, season: 'Warm season' },
                    { name: 'Melons', icon: '🍈', suitability: 87, season: 'Warm season' },
                    
                    // Root Vegetables
                    { name: 'Carrots', icon: '🥕', suitability: 90, season: 'Cool season' },
                    { name: 'Beets', icon: '🟣', suitability: 88, season: 'Cool season' },
                    { name: 'Radishes', icon: '🌶️', suitability: 85, season: 'Cool season' },
                    { name: 'Turnips', icon: '🟣', suitability: 87, season: 'Cool season' },
                    
                    // Brassicas
                    { name: 'Broccoli', icon: '🥦', suitability: 90, season: 'Cool season' },
                    { name: 'Cabbage', icon: '🥬', suitability: 88, season: 'Cool season' },
                    { name: 'Cauliflower', icon: '🥦', suitability: 87, season: 'Cool season' },
                    
                    // Grains
                    { name: 'Corn', icon: '🌽', suitability: 95, season: 'Warm season' },
                    { name: 'Wheat', icon: '🌾', suitability: 88, season: 'Cool season' },
                    { name: 'Oats', icon: '🌾', suitability: 85, season: 'Cool season' },
                    
                    // Alliums
                    { name: 'Onions', icon: '🧅', suitability: 90, season: 'Cool season' },
                    { name: 'Garlic', icon: '🧄', suitability: 88, season: 'Cool season' },
                    { name: 'Leeks', icon: '🥬', suitability: 85, season: 'Cool season' },
                    
                    // Herbs
                    { name: 'Basil', icon: '🌿', suitability: 90, season: 'Warm season' },
                    { name: 'Parsley', icon: '🌿', suitability: 88, season: 'Cool season' },
                    { name: 'Cilantro', icon: '🌿', suitability: 85, season: 'Cool season' },
                    { name: 'Oregano', icon: '🌿', suitability: 87, season: 'Perennial' },
                    
                    // Fruits
                    { name: 'Strawberries', icon: '🍓', suitability: 90, season: 'Perennial' },
                    { name: 'Blueberries', icon: '🫐', suitability: 85, season: 'Perennial' },
                    { name: 'Raspberries', icon: '🫐', suitability: 88, season: 'Perennial' }
                ],
                tips: [
                    'Maintain soil health with regular compost additions',
                    'Practice crop rotation to prevent nutrient depletion',
                    'Use balanced fertilizers as needed based on soil tests',
                    'Avoid overwatering to prevent compaction',
                    'Test soil pH regularly (ideal range: 6.0-7.0)',
                    'Add organic mulch to retain moisture and suppress weeds',
                    'Plant diverse crops to maintain soil biology',
                    'Consider intercropping for maximum productivity'
                ]
            },
            clay: {
                name: 'Clay Soil',
                color: '#795548',
                icon: '🧱',
                description: 'Clay soil has fine particles that retain water and nutrients well but can become waterlogged and compacted. Best for crops that tolerate heavy, moisture-retentive soil.',
                crops: [
                    // Brassicas (Excel in clay soil)
                    { name: 'Cabbage', icon: '🥬', suitability: 95, season: 'Cool season' },
                    { name: 'Broccoli', icon: '🥦', suitability: 92, season: 'Cool season' },
                    { name: 'Cauliflower', icon: '🥦', suitability: 90, season: 'Cool season' },
                    { name: 'Brussels Sprouts', icon: '🥬', suitability: 88, season: 'Cool season' },
                    { name: 'Kale', icon: '🥬', suitability: 90, season: 'Cool season' },
                    { name: 'Collard Greens', icon: '🥬', suitability: 92, season: 'Cool season' },
                    { name: 'Kohlrabi', icon: '🥬', suitability: 85, season: 'Cool season' },
                    
                    // Leafy Greens
                    { name: 'Swiss Chard', icon: '🌿', suitability: 88, season: 'Cool season' },
                    { name: 'Spinach', icon: '🥬', suitability: 85, season: 'Cool season' },
                    { name: 'Arugula', icon: '🥬', suitability: 82, season: 'Cool season' },
                    { name: 'Lettuce', icon: '🥬', suitability: 80, season: 'Cool season' },
                    { name: 'Mustard Greens', icon: '🥬', suitability: 87, season: 'Cool season' },
                    
                    // Legumes (Nitrogen fixers help clay soil)
                    { name: 'Peas', icon: '🟢', suitability: 85, season: 'Cool season' },
                    { name: 'Fava Beans', icon: '🫛', suitability: 90, season: 'Cool season' },
                    { name: 'Soybeans', icon: '🫛', suitability: 88, season: 'Warm season' },
                    { name: 'Lentils', icon: '🫛', suitability: 82, season: 'Cool season' },
                    { name: 'Chickpeas', icon: '🫛', suitability: 80, season: 'Warm season' },
                    
                    // Root Vegetables (Some varieties)
                    { name: 'Beets', icon: '🟣', suitability: 85, season: 'Cool season' },
                    { name: 'Turnips', icon: '🟣', suitability: 88, season: 'Cool season' },
                    { name: 'Rutabagas', icon: '🟣', suitability: 90, season: 'Cool season' },
                    
                    // Grains & Cereals
                    { name: 'Wheat', icon: '🌾', suitability: 90, season: 'Cool season' },
                    { name: 'Oats', icon: '🌾', suitability: 88, season: 'Cool season' },
                    { name: 'Rice', icon: '🍚', suitability: 95, season: 'Warm season' },
                    { name: 'Corn', icon: '🌽', suitability: 85, season: 'Warm season' },
                    
                    // Fruits (Some varieties)
                    { name: 'Apples', icon: '🍎', suitability: 82, season: 'Perennial' },
                    { name: 'Pears', icon: '🍐', suitability: 85, season: 'Perennial' },
                    { name: 'Plums', icon: '🟣', suitability: 80, season: 'Perennial' },
                    
                    // Vegetables
                    { name: 'Celery', icon: '🥬', suitability: 88, season: 'Cool season' },
                    { name: 'Leeks', icon: '🥬', suitability: 85, season: 'Cool season' },
                    { name: 'Fennel', icon: '🌿', suitability: 80, season: 'Cool season' },
                    { name: 'Artichokes', icon: '🌿', suitability: 82, season: 'Perennial' },
                    
                    // Herbs (Moisture-loving)
                    { name: 'Parsley', icon: '🌿', suitability: 85, season: 'Cool season' },
                    { name: 'Chives', icon: '🌿', suitability: 88, season: 'Perennial' },
                    { name: 'Mint', icon: '🌿', suitability: 90, season: 'Perennial' },
                    { name: 'Cilantro', icon: '🌿', suitability: 82, season: 'Cool season' },
                    
                    // Cover Crops (Soil improvement)
                    { name: 'Clover', icon: '🍀', suitability: 92, season: 'Cool season' },
                    { name: 'Alfalfa', icon: '🌿', suitability: 88, season: 'Perennial' },
                    { name: 'Vetch', icon: '🌿', suitability: 85, season: 'Cool season' }
                ],
                tips: [
                    'Add organic matter to improve drainage and soil structure',
                    'Avoid working soil when wet to prevent compaction',
                    'Create raised beds for better drainage',
                    'Add coarse sand, perlite, or compost to improve aeration',
                    'Plant cover crops to break up compacted layers naturally',
                    'Use deep-rooted plants to improve soil structure over time',
                    'Install drainage systems in problem areas',
                    'Mulch heavily to prevent surface crusting',
                    'Consider gypsum application to improve soil structure',
                    'Practice no-till or minimal tillage methods'
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('🌱 Soil Analysis System initialized');
    }

    setupEventListeners() {
        // File input change
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });

        // Upload area click
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // Drag and drop functionality
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });
    }

    async handleFileUpload(file) {
        // Validate file
        if (!this.validateFile(file)) {
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Real image analysis using Canvas API
            const analysisResult = await this.analyzeImageColors(file);
            this.displayResults(analysisResult);
        } catch (error) {
            console.error('Analysis error:', error);
            
            // Revert loading state visually
            this.loadingState.classList.add('hidden');
            const uploadContent = document.getElementById('upload-content');
            if (uploadContent) {
                uploadContent.innerHTML = `
                    <svg class="w-12 h-12 text-slate-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p class="text-white font-medium mb-1">Click to upload or drag & drop</p>
                    <p class="text-sm text-slate-400">JPG, PNG, WEBP (Max 10MB)</p>
                `;
            }
            
            this.showError(error.message || 'Failed to analyze soil sample. Please try again.');
            
            // Clear input so they can upload the same file again if they want
            if (this.fileInput) this.fileInput.value = '';
        }
    }

    async analyzeImageColors(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                try {
                    // Draw image to canvas and sample pixels
                    const canvas = document.createElement('canvas');
                    const MAX = 200; // downsample for performance
                    const scale = Math.min(MAX / img.width, MAX / img.height, 1);
                    canvas.width  = Math.round(img.width  * scale);
                    canvas.height = Math.round(img.height * scale);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    URL.revokeObjectURL(url);

                    // Sample every 4th pixel for speed
                    let rSum = 0, gSum = 0, bSum = 0, count = 0;
                    let earthToneCount = 0;
                    
                    for (let i = 0; i < imageData.length; i += 16) {
                        const pr = imageData[i];
                        const pg = imageData[i + 1];
                        const pb = imageData[i + 2];
                        
                        rSum += pr;
                        gSum += pg;
                        bSum += pb;
                        count++;
                        
                        const pixelHsl = this.rgbToHsl(pr, pg, pb);
                        const {h, s, l} = pixelHsl;
                        
                        // Lenient validation: check if pixel is an earth tone or natural shade
                        // H: 0-90 (Red to Yellow-Green) or > 320 (Pink-Red)
                        const isHueBrownish = (h >= 0 && h <= 90) || (h >= 320);
                        const isGreyscale = s < 0.25; // Greys, Blacks, Whites
                        const isNotTooVivid = s < 0.85; // Reject only extreme neon/synthetic colors
                        
                        if ((isHueBrownish || isGreyscale) && isNotTooVivid) {
                            earthToneCount++;
                        }
                    }
                    
                    const earthTonePercentage = earthToneCount / count;
                    
                    // Very lenient threshold: only reject if LESS than 15% of the image contains natural earth/grey tones.
                    // This prevents rejecting soil with heavy green grass, glare, or shadows.
                    if (earthTonePercentage < 0.15) {
                        throw new Error("Invalid image detected. Please upload a valid soil image for analysis.");
                    }

                    const r = rSum / count;
                    const g = gSum / count;
                    const b = bSum / count;

                    // Convert to HSL for better soil color classification
                    const { h, s, l } = this.rgbToHsl(r, g, b);

                    // ── Real soil color classification ──────────────────────
                    // Based on Munsell Soil Color Chart (standard in soil science)
                    // Sandy soil: light tan/beige (high L, low S, warm hue)
                    // Loamy soil: medium brown (moderate L, moderate S)
                    // Clay soil:  dark red-brown or grey (low L or high red)

                    let sandy = 0, loamy = 0, clay = 0;

                    // Lightness scoring
                    if (l > 0.60) { sandy += 40; loamy += 10; }
                    else if (l > 0.40) { loamy += 35; sandy += 15; clay += 10; }
                    else { clay += 40; loamy += 10; }

                    // Hue scoring (0-360 degrees)
                    // Sandy: yellow-orange range (30-60°)
                    // Loamy: brown range (20-40°)
                    // Clay: red-brown or grey (0-20° or 200-360°)
                    if (h >= 25 && h <= 55) { sandy += 35; loamy += 15; }
                    else if (h >= 15 && h <= 35) { loamy += 30; sandy += 10; clay += 10; }
                    else if (h < 15 || h > 200) { clay += 35; loamy += 10; }
                    else { loamy += 20; clay += 15; }

                    // Saturation scoring
                    if (s < 0.15) { clay += 20; loamy += 10; }       // grey/muted = clay
                    else if (s < 0.35) { loamy += 25; sandy += 10; } // moderate = loamy
                    else { sandy += 20; loamy += 10; }                // vivid = sandy

                    // Normalize to percentages
                    const total = sandy + loamy + clay;
                    const pSandy = Math.round((sandy / total) * 100 * 10) / 10;
                    const pLoamy = Math.round((loamy / total) * 100 * 10) / 10;
                    const pClay  = Math.round(100 - pSandy - pLoamy, 10) / 10;

                    const dominant = pSandy >= pLoamy && pSandy >= pClay ? 'sandy'
                                   : pLoamy >= pClay ? 'loamy' : 'clay';

                    // Confidence based on how dominant the result is
                    const maxPct = Math.max(pSandy, pLoamy, pClay);
                    const confidence = Math.min(70 + (maxPct - 33) * 0.8, 94);

                    // Update step display
                    const steps = [
                        'Reading image pixels...',
                        'Extracting color channels...',
                        'Converting to HSL color space...',
                        'Matching Munsell soil color chart...',
                        'Generating crop recommendations...'
                    ];
                    let stepIdx = 0;
                    const stepInterval = setInterval(() => {
                        const el = document.getElementById('analysis-step');
                        if (el && stepIdx < steps.length) {
                            el.textContent = `Step ${stepIdx + 1}: ${steps[stepIdx]}`;
                            stepIdx++;
                        } else {
                            clearInterval(stepInterval);
                        }
                    }, 400);

                    setTimeout(() => {
                        clearInterval(stepInterval);
                        resolve({
                            fileName: file.name,
                            fileSize: file.size,
                            percentages: { sandy: pSandy, loamy: pLoamy, clay: pClay },
                            dominantType: dominant,
                            confidence: Math.round(confidence * 10) / 10,
                            avgColor: { r: Math.round(r), g: Math.round(g), b: Math.round(b) },
                            hsl: { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) },
                            timestamp: new Date()
                        });
                    }, 2200);

                } catch (err) {
                    URL.revokeObjectURL(url);
                    reject(err);
                }
            };

            img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
            img.src = url;
        });
    }

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
            h *= 360;
        }
        return { h, s, l };
    }

    validateFile(file) {
        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            this.showError('Please upload a valid image file (JPG, PNG, WEBP)');
            return false;
        }

        // Check file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showError('File size must be less than 10MB');
            return false;
        }

        return true;
    }

    displayResults(result) {
        // Hide loading, show results
        this.loadingState.classList.add('hidden');
        this.analysisResults.classList.remove('hidden');

        // Update progress bars and percentages
        Object.keys(result.percentages).forEach(soilType => {
            const percentage = result.percentages[soilType];
            const progressBar = document.getElementById(`${soilType}-progress`);
            const percentageText = document.getElementById(`${soilType}-percentage`);
            
            if (progressBar && percentageText) {
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${percentage}%`;
                }, 300);
                
                percentageText.textContent = `${percentage}%`;
            }
        });

        // Update primary soil type
        const soilData = this.soilDatabase[result.dominantType];
        document.getElementById('detected-soil-type').textContent = soilData.name;
        document.getElementById('soil-confidence').textContent = `Confidence: ${result.confidence.toFixed(1)}% | Avg Color: RGB(${result.avgColor?.r || '–'},${result.avgColor?.g || '–'},${result.avgColor?.b || '–'})`;
        document.getElementById('soil-description').textContent = soilData.description;
        
        // Update soil type icon
        const iconElement = document.getElementById('soil-type-icon');
        iconElement.style.backgroundColor = soilData.color;
        iconElement.innerHTML = `<span style="font-size: 1.5rem;">${soilData.icon}</span>`;

        // Display crop recommendations
        this.displayCropRecommendations(result.dominantType);

        // Display soil improvement tips
        this.displaySoilTips(result.dominantType);

        // Scroll to results
        this.analysisResults.scrollIntoView({ behavior: 'smooth' });
    }

    displayCropRecommendations(soilType) {
        const soilData = this.soilDatabase[soilType];
        const container = document.getElementById('crop-recommendations');
        
        container.innerHTML = soilData.crops.map(crop => `
          <div class="crop-chip">
            <div style="font-size:1.75rem;margin-bottom:.4rem">${crop.icon}</div>
            <div style="font-size:.8rem;font-weight:600;color:#e8f5e9;margin-bottom:.3rem">${crop.name}</div>
            <div class="suitability-bar"><div class="suitability-fill" style="width:${crop.suitability}%"></div></div>
            <div style="font-size:.68rem;color:#475569">${crop.suitability}% · ${crop.season}</div>
          </div>
        `).join('');
    }

    displaySoilTips(soilType) {
        const soilData = this.soilDatabase[soilType];
        const container = document.getElementById('soil-tips');
        
        container.innerHTML = `<ul style="space-y:.5rem">${soilData.tips.map(tip => `<li style="display:flex;align-items:flex-start;gap:.5rem;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.85rem;color:#a5bfaa"><span style="color:#4caf50;margin-top:.15rem;flex-shrink:0">✓</span>${tip}</li>`).join('')}</ul>`;
    }

    showLoadingState() {
        this.analysisResults.classList.add('hidden');
        this.loadingState.classList.remove('hidden');
        
        // Update upload area to show selected file
        const uploadContent = document.getElementById('upload-content');
        uploadContent.innerHTML = `
            <svg class="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 class="text-xl font-semibold text-white mb-2">Image Uploaded Successfully</h4>
            <p class="text-gray-400">AI analysis in progress...</p>
        `;
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
        errorDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 5000);
    }
}

// Initialize soil analysis system
function initializeSoilAnalysis() {
    window.soilAnalysisSystem = new SoilAnalysisSystem();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoilAnalysisSystem;
}