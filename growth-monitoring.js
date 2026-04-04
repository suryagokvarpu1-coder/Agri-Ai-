/**
 * Growth Stage Monitoring System
 * Tracks crop lifecycle from germination to harvest with countdown timers
 */

class GrowthMonitoringSystem {
    constructor() {
        this.crops = [];
        this.storageKey = 'agri-ai-crops';
        
        // Comprehensive crop database with growth stages and timelines
        this.cropDatabase = {
            tomatoes: {
                name: 'Tomatoes',
                icon: '🍅',
                varieties: {
                    determinate: { name: 'Determinate', daysToMaturity: 75, description: 'Compact, bush-type plants' },
                    indeterminate: { name: 'Indeterminate', daysToMaturity: 85, description: 'Vining plants, continuous harvest' },
                    cherry: { name: 'Cherry', daysToMaturity: 65, description: 'Small, sweet fruits' },
                    beefsteak: { name: 'Beefsteak', daysToMaturity: 90, description: 'Large, meaty fruits' },
                    roma: { name: 'Roma', daysToMaturity: 80, description: 'Paste tomatoes, oval shape' },
                    heirloom: { name: 'Heirloom', daysToMaturity: 85, description: 'Traditional varieties' }
                },
                stages: [
                    {
                        name: 'Germination',
                        duration: 7,
                        description: 'Seeds sprouting and first leaves emerging',
                        icon: '🌱',
                        color: '#22c55e',
                        tips: ['Keep soil moist but not waterlogged', 'Maintain temperature 70-80°F', 'Provide indirect light']
                    },
                    {
                        name: 'Seedling',
                        duration: 14,
                        description: 'True leaves developing, stem strengthening',
                        icon: '🌿',
                        color: '#3b82f6',
                        tips: ['Gradually increase light exposure', 'Begin light fertilization', 'Monitor for pests']
                    },
                    {
                        name: 'Vegetative',
                        duration: 28,
                        description: 'Rapid leaf and stem growth, root development',
                        icon: '🌳',
                        color: '#10b981',
                        tips: ['Increase watering frequency', 'Provide support structures', 'Prune suckers if needed']
                    },
                    {
                        name: 'Flowering',
                        duration: 14,
                        description: 'Flower clusters forming and blooming',
                        icon: '🌸',
                        color: '#f59e0b',
                        tips: ['Ensure consistent watering', 'Hand pollinate if needed', 'Monitor for blossom end rot']
                    },
                    {
                        name: 'Fruit Set',
                        duration: 7,
                        description: 'Small fruits beginning to develop',
                        icon: '🟢',
                        color: '#ef4444',
                        tips: ['Maintain consistent moisture', 'Increase potassium fertilization', 'Support heavy branches']
                    },
                    {
                        name: 'Fruit Development',
                        duration: 21,
                        description: 'Fruits growing and maturing',
                        icon: '🍅',
                        color: '#a855f7',
                        tips: ['Reduce nitrogen, increase phosphorus', 'Monitor for fruit diseases', 'Begin harvest preparation']
                    },
                    {
                        name: 'Harvest',
                        duration: 30,
                        description: 'Fruits ready for harvest',
                        icon: '🧺',
                        color: '#8b5cf6',
                        tips: ['Harvest when fruits show color', 'Pick regularly to encourage production', 'Store properly']
                    }
                ]
            },
            lettuce: {
                name: 'Lettuce',
                icon: '🥬',
                varieties: {
                    butterhead: { name: 'Butterhead', daysToMaturity: 55, description: 'Soft, buttery leaves' },
                    romaine: { name: 'Romaine', daysToMaturity: 70, description: 'Crisp, upright leaves' },
                    iceberg: { name: 'Iceberg', daysToMaturity: 75, description: 'Dense, crunchy heads' },
                    leafy: { name: 'Leaf Lettuce', daysToMaturity: 45, description: 'Loose, tender leaves' }
                },
                stages: [
                    { name: 'Germination', duration: 5, description: 'Seeds sprouting', icon: '🌱', color: '#22c55e', tips: ['Keep soil cool and moist', 'Provide shade in hot weather'] },
                    { name: 'Seedling', duration: 10, description: 'First true leaves', icon: '🌿', color: '#3b82f6', tips: ['Thin seedlings for spacing', 'Begin light fertilization'] },
                    { name: 'Vegetative', duration: 25, description: 'Leaf development', icon: '🥬', color: '#10b981', tips: ['Consistent watering', 'Cool weather preferred'] },
                    { name: 'Head Formation', duration: 15, description: 'Heads forming and filling', icon: '🥬', color: '#f59e0b', tips: ['Avoid overwatering', 'Monitor for bolting'] },
                    { name: 'Harvest', duration: 14, description: 'Ready for harvest', icon: '🧺', color: '#8b5cf6', tips: ['Harvest in cool morning', 'Cut at base of plant'] }
                ]
            },
            carrots: {
                name: 'Carrots',
                icon: '🥕',
                varieties: {
                    nantes: { name: 'Nantes', daysToMaturity: 70, description: 'Cylindrical, sweet roots' },
                    chantenay: { name: 'Chantenay', daysToMaturity: 75, description: 'Short, broad roots' },
                    imperator: { name: 'Imperator', daysToMaturity: 80, description: 'Long, tapered roots' },
                    paris: { name: 'Paris Market', daysToMaturity: 60, description: 'Small, round roots' }
                },
                stages: [
                    { name: 'Germination', duration: 14, description: 'Slow seed germination', icon: '🌱', color: '#22c55e', tips: ['Keep soil consistently moist', 'Be patient - slow to germinate'] },
                    { name: 'Seedling', duration: 21, description: 'Feathery leaves emerging', icon: '🌿', color: '#3b82f6', tips: ['Thin seedlings carefully', 'Avoid disturbing roots'] },
                    { name: 'Vegetative', duration: 35, description: 'Root development and leaf growth', icon: '🥕', color: '#10b981', tips: ['Deep, loose soil important', 'Consistent moisture needed'] },
                    { name: 'Root Maturation', duration: 21, description: 'Roots sizing up', icon: '🥕', color: '#f59e0b', tips: ['Reduce watering frequency', 'Monitor root size'] },
                    { name: 'Harvest', duration: 30, description: 'Roots ready for harvest', icon: '🧺', color: '#8b5cf6', tips: ['Harvest before hard frost', 'Store in cool, humid conditions'] }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.loadCrops();
        this.setupEventListeners();
        this.renderCrops();
        this.startCountdownUpdates();
        console.log('🌱 Growth Monitoring System initialized');
    }

    setupEventListeners() {
        // Add crop form submission
        const addCropForm = document.getElementById('add-crop-form');
        if (addCropForm) {
            addCropForm.addEventListener('submit', (e) => this.handleAddCrop(e));
        }

        // Crop name input change - update variety options
        const cropNameInput = document.getElementById('crop-name');
        if (cropNameInput) {
            cropNameInput.addEventListener('input', (e) => this.updateVarietyOptions(e.target.value));
        }

        // Set default planting date to today
        const plantingDateInput = document.getElementById('planting-date');
        if (plantingDateInput) {
            plantingDateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    updateVarietyOptions(cropName) {
        const varietySelect = document.getElementById('crop-variety');
        if (!varietySelect) return;

        const normalizedName = cropName.toLowerCase().replace(/s$/, ''); // Remove plural 's'
        const cropData = this.cropDatabase[normalizedName];

        // Clear existing options
        varietySelect.innerHTML = '<option value="">Select Variety</option>';

        if (cropData && cropData.varieties) {
            Object.entries(cropData.varieties).forEach(([key, variety]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = variety.name;
                varietySelect.appendChild(option);
            });
        } else {
            // Generic varieties for unknown crops
            const genericVarieties = ['Standard', 'Early Season', 'Late Season', 'Hybrid'];
            genericVarieties.forEach(variety => {
                const option = document.createElement('option');
                option.value = variety.toLowerCase().replace(' ', '-');
                option.textContent = variety;
                varietySelect.appendChild(option);
            });
        }
    }

    handleAddCrop(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const cropData = {
            id: Date.now().toString(),
            name: document.getElementById('crop-name').value,
            variety: document.getElementById('crop-variety').value,
            plantingDate: new Date(document.getElementById('planting-date').value),
            location: document.getElementById('field-location').value,
            createdAt: new Date(),
            currentStage: 0,
            stageStartDate: new Date(document.getElementById('planting-date').value)
        };

        // Get crop database info
        const normalizedName = cropData.name.toLowerCase().replace(/s$/, '');
        const dbCrop = this.cropDatabase[normalizedName];
        
        if (dbCrop) {
            cropData.cropInfo = dbCrop;
            cropData.varietyInfo = dbCrop.varieties[cropData.variety] || { daysToMaturity: 75, description: 'Standard variety' };
        } else {
            // Default crop info for unknown crops
            cropData.cropInfo = {
                name: cropData.name,
                icon: '🌱',
                stages: this.getDefaultStages()
            };
            cropData.varietyInfo = { daysToMaturity: 75, description: 'Standard variety' };
        }

        this.crops.push(cropData);
        this.saveCrops();
        this.renderCrops();
        
        // Reset form
        e.target.reset();
        document.getElementById('planting-date').value = new Date().toISOString().split('T')[0];
        
        this.showNotification(`${cropData.name} added to monitoring!`, 'success');
    }

    getDefaultStages() {
        return [
            { name: 'Germination', duration: 7, description: 'Seeds sprouting', icon: '🌱', color: '#22c55e', tips: ['Keep soil moist', 'Provide warmth'] },
            { name: 'Seedling', duration: 14, description: 'Early growth', icon: '🌿', color: '#3b82f6', tips: ['Provide light', 'Begin fertilization'] },
            { name: 'Vegetative', duration: 28, description: 'Rapid growth', icon: '🌳', color: '#10b981', tips: ['Regular watering', 'Support if needed'] },
            { name: 'Flowering', duration: 14, description: 'Flower development', icon: '🌸', color: '#f59e0b', tips: ['Consistent care', 'Monitor pollination'] },
            { name: 'Fruiting', duration: 21, description: 'Fruit development', icon: '🍎', color: '#ef4444', tips: ['Increase nutrients', 'Support branches'] },
            { name: 'Harvest', duration: 30, description: 'Ready for harvest', icon: '🧺', color: '#8b5cf6', tips: ['Harvest at peak ripeness', 'Store properly'] }
        ];
    }

    renderCrops() {
        const cropsGrid = document.getElementById('crops-grid');
        const emptyState = document.getElementById('empty-state');

        if (this.crops.length === 0) {
            cropsGrid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        
        cropsGrid.innerHTML = this.crops.map(crop => this.createCropCard(crop)).join('');
    }

    createCropCard(crop) {
        const currentStage = crop.cropInfo.stages[crop.currentStage];
        const daysPlanted = Math.floor((new Date() - new Date(crop.plantingDate)) / (1000 * 60 * 60 * 24));
        const daysToHarvest = crop.varietyInfo.daysToMaturity - daysPlanted;
        const progressPercentage = Math.min((daysPlanted / crop.varietyInfo.daysToMaturity) * 100, 100);

        return `
            <div class="crop-card ${crop.currentStage === crop.cropInfo.stages.length - 1 ? 'active' : ''}" onclick="openCropModal('${crop.id}')">
                <!-- Crop Header -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="text-3xl">${crop.cropInfo.icon}</div>
                        <div>
                            <h3 class="text-xl font-bold text-white">${crop.name}</h3>
                            <p class="text-sm text-gray-400">${crop.varietyInfo.name} • ${crop.location}</p>
                        </div>
                    </div>
                    <div class="status-badge status-${currentStage.name.toLowerCase().replace(' ', '-')}">
                        ${currentStage.name}
                    </div>
                </div>

                <!-- Days to Harvest Countdown -->
                <div class="countdown-timer mb-6">
                    <div class="countdown-number">${Math.max(daysToHarvest, 0)}</div>
                    <div class="text-sm opacity-90">
                        ${daysToHarvest > 0 ? 'Days to Harvest' : 'Ready for Harvest!'}
                    </div>
                </div>

                <!-- Growth Progress -->
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-300">Growth Progress</span>
                        <span class="text-sm text-gray-400">${Math.round(progressPercentage)}%</span>
                    </div>
                    <div class="stage-progress">
                        <div class="stage-progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>

                <!-- Current Stage Info -->
                <div class="bg-gray-800 rounded-lg p-4 mb-4">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">${currentStage.icon}</span>
                        <span class="font-semibold text-white">${currentStage.name} Stage</span>
                    </div>
                    <p class="text-sm text-gray-300">${currentStage.description}</p>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">Planted:</span>
                        <div class="font-medium text-white">${new Date(crop.plantingDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <span class="text-gray-400">Days Planted:</span>
                        <div class="font-medium text-white">${daysPlanted} days</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2 mt-6">
                    <button onclick="event.stopPropagation(); updateStage('${crop.id}')" class="btn-secondary flex-1 text-sm">
                        Update Stage
                    </button>
                    <button onclick="event.stopPropagation(); deleteCrop('${crop.id}')" class="btn-secondary text-red-400 hover:text-red-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    openCropModal(cropId) {
        const crop = this.crops.find(c => c.id === cropId);
        if (!crop) return;

        const modal = document.getElementById('crop-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        modalTitle.textContent = `${crop.name} - Growth Details`;
        modalContent.innerHTML = this.createModalContent(crop);
        modal.classList.remove('hidden');
    }

    createModalContent(crop) {
        const daysPlanted = Math.floor((new Date() - new Date(crop.plantingDate)) / (1000 * 60 * 60 * 24));
        const daysToHarvest = crop.varietyInfo.daysToMaturity - daysPlanted;

        return `
            <!-- Crop Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gray-800 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-white mb-4">Crop Information</h4>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Variety:</span>
                            <span class="text-white">${crop.varietyInfo.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Location:</span>
                            <span class="text-white">${crop.location}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Planted:</span>
                            <span class="text-white">${new Date(crop.plantingDate).toLocaleDateString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Days to Maturity:</span>
                            <span class="text-white">${crop.varietyInfo.daysToMaturity} days</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-white mb-4">Current Status</h4>
                    <div class="text-center">
                        <div class="text-4xl mb-2">${crop.cropInfo.icon}</div>
                        <div class="text-2xl font-bold text-white mb-2">${Math.max(daysToHarvest, 0)}</div>
                        <div class="text-sm text-gray-400">
                            ${daysToHarvest > 0 ? 'Days to Harvest' : 'Ready for Harvest!'}
                        </div>
                        <div class="mt-4">
                            <div class="status-badge status-${crop.cropInfo.stages[crop.currentStage].name.toLowerCase().replace(' ', '-')}">
                                ${crop.cropInfo.stages[crop.currentStage].name} Stage
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Growth Stages Timeline -->
            <div class="mb-8">
                <h4 class="text-lg font-semibold text-white mb-6">Growth Stages Timeline</h4>
                <div class="space-y-4">
                    ${crop.cropInfo.stages.map((stage, index) => `
                        <div class="growth-stage ${index < crop.currentStage ? 'completed' : index === crop.currentStage ? 'current' : 'upcoming'}">
                            <div class="flex items-center gap-4">
                                <div class="text-3xl">${stage.icon}</div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h5 class="text-lg font-semibold text-white">${stage.name}</h5>
                                        <span class="text-sm text-gray-400">${stage.duration} days</span>
                                        ${index < crop.currentStage ? '<span class="text-green-400 text-sm">✓ Completed</span>' : 
                                          index === crop.currentStage ? '<span class="text-yellow-400 text-sm">● Current</span>' : 
                                          '<span class="text-gray-500 text-sm">○ Upcoming</span>'}
                                    </div>
                                    <p class="text-gray-300 mb-3">${stage.description}</p>
                                    <div class="bg-gray-700 rounded-lg p-3">
                                        <h6 class="text-sm font-medium text-gray-300 mb-2">Care Tips:</h6>
                                        <ul class="text-sm text-gray-400 space-y-1">
                                            ${stage.tips.map(tip => `<li>• ${tip}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
                <button onclick="updateStage('${crop.id}'); closeCropModal();" class="btn-primary">
                    Advance to Next Stage
                </button>
                <button onclick="closeCropModal()" class="btn-secondary">
                    Close
                </button>
            </div>
        `;
    }

    updateStage(cropId) {
        const crop = this.crops.find(c => c.id === cropId);
        if (!crop) return;

        if (crop.currentStage < crop.cropInfo.stages.length - 1) {
            crop.currentStage++;
            crop.stageStartDate = new Date();
            this.saveCrops();
            this.renderCrops();
            
            const stageName = crop.cropInfo.stages[crop.currentStage].name;
            this.showNotification(`${crop.name} advanced to ${stageName} stage!`, 'success');
        } else {
            this.showNotification(`${crop.name} is already at harvest stage!`, 'info');
        }
    }

    deleteCrop(cropId) {
        if (confirm('Are you sure you want to remove this crop from monitoring?')) {
            this.crops = this.crops.filter(c => c.id !== cropId);
            this.saveCrops();
            this.renderCrops();
            this.showNotification('Crop removed from monitoring', 'info');
        }
    }

    startCountdownUpdates() {
        // Update countdowns every hour
        setInterval(() => {
            this.renderCrops();
        }, 3600000); // 1 hour

        // Update every minute for more responsive UI
        setInterval(() => {
            this.updateCountdowns();
        }, 60000); // 1 minute
    }

    updateCountdowns() {
        const cropCards = document.querySelectorAll('.crop-card');
        cropCards.forEach((card, index) => {
            const crop = this.crops[index];
            if (!crop) return;

            const daysPlanted = Math.floor((new Date() - new Date(crop.plantingDate)) / (1000 * 60 * 60 * 24));
            const daysToHarvest = crop.varietyInfo.daysToMaturity - daysPlanted;
            
            const countdownNumber = card.querySelector('.countdown-number');
            const countdownText = card.querySelector('.countdown-timer .text-sm');
            
            if (countdownNumber) {
                countdownNumber.textContent = Math.max(daysToHarvest, 0);
            }
            if (countdownText) {
                countdownText.textContent = daysToHarvest > 0 ? 'Days to Harvest' : 'Ready for Harvest!';
            }
        });
    }

    loadCrops() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.crops = JSON.parse(saved).map(crop => ({
                    ...crop,
                    plantingDate: new Date(crop.plantingDate),
                    createdAt: new Date(crop.createdAt),
                    stageStartDate: new Date(crop.stageStartDate)
                }));
            }
        } catch (error) {
            console.error('Failed to load crops:', error);
            this.crops = [];
        }
    }

    saveCrops() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.crops));
        } catch (error) {
            console.error('Failed to save crops:', error);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global functions for HTML onclick handlers
function openCropModal(cropId) {
    if (window.growthMonitoringSystem) {
        window.growthMonitoringSystem.openCropModal(cropId);
    }
}

function updateStage(cropId) {
    if (window.growthMonitoringSystem) {
        window.growthMonitoringSystem.updateStage(cropId);
    }
}

function deleteCrop(cropId) {
    if (window.growthMonitoringSystem) {
        window.growthMonitoringSystem.deleteCrop(cropId);
    }
}

function closeCropModal() {
    document.getElementById('crop-modal').classList.add('hidden');
}

// Initialize growth monitoring system
function initializeGrowthMonitoring() {
    window.growthMonitoringSystem = new GrowthMonitoringSystem();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GrowthMonitoringSystem;
}