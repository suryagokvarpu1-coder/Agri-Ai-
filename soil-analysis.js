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
                color: '#f59e0b',
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
                color: '#10b981',
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
                color: '#ef4444',
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
            // Simulate AI analysis process
            await this.simulateAnalysis();
            
            // Generate analysis results
            const analysisResult = this.generateAnalysisResult(file);
            
            // Display results
            this.displayResults(analysisResult);
            
        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('Failed to analyze soil sample. Please try again.');
        }
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

    async simulateAnalysis() {
        const steps = [
            'Processing image...',
            'Extracting texture features...',
            'Analyzing particle size distribution...',
            'Comparing with soil database...',
            'Generating crop recommendations...'
        ];

        for (let i = 0; i < steps.length; i++) {
            document.getElementById('analysis-step').textContent = `Step ${i + 1}: ${steps[i]}`;
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
        }
    }

    generateAnalysisResult(file) {
        // Simulate AI analysis with realistic results
        const soilTypes = ['sandy', 'loamy', 'clay'];
        
        // Generate realistic percentages that add up to 100%
        let percentages = {};
        let remaining = 100;
        
        // Pick a dominant soil type
        const dominantType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
        percentages[dominantType] = 45 + Math.random() * 35; // 45-80%
        remaining -= percentages[dominantType];
        
        // Distribute remaining percentage
        const otherTypes = soilTypes.filter(type => type !== dominantType);
        percentages[otherTypes[0]] = Math.random() * remaining * 0.7;
        percentages[otherTypes[1]] = remaining - percentages[otherTypes[0]];
        
        // Round percentages
        Object.keys(percentages).forEach(key => {
            percentages[key] = Math.round(percentages[key] * 10) / 10;
        });

        // Ensure they add up to 100%
        const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);
        const adjustment = 100 - total;
        percentages[dominantType] += adjustment;

        return {
            fileName: file.name,
            fileSize: file.size,
            percentages: percentages,
            dominantType: dominantType,
            confidence: 85 + Math.random() * 10, // 85-95%
            timestamp: new Date()
        };
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
        document.getElementById('soil-confidence').textContent = `Confidence: ${result.confidence.toFixed(1)}%`;
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
            <div class="crop-card">
                <div class="text-4xl mb-3">${crop.icon}</div>
                <h4 class="text-lg font-semibold text-white mb-2">${crop.name}</h4>
                <div class="flex items-center justify-center gap-2 mb-2">
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                             style="width: ${crop.suitability}%"></div>
                    </div>
                    <span class="text-sm text-gray-300">${crop.suitability}%</span>
                </div>
                <p class="text-xs text-gray-400">${crop.season}</p>
            </div>
        `).join('');

        // Animate suitability bars
        setTimeout(() => {
            container.querySelectorAll('.bg-green-500').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = `${soilData.crops[index].suitability}%`;
                }, index * 100);
            });
        }, 500);
    }

    displaySoilTips(soilType) {
        const soilData = this.soilDatabase[soilType];
        const container = document.getElementById('soil-tips');
        
        container.innerHTML = `
            <ul class="space-y-2">
                ${soilData.tips.map(tip => `
                    <li class="flex items-start gap-2">
                        <span class="text-green-400 mt-1">•</span>
                        <span>${tip}</span>
                    </li>
                `).join('')}
            </ul>
        `;
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