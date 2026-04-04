/**
 * Carbon Footprint Tracking System
 * Advanced carbon sequestration calculator and credits marketplace
 */

class CarbonTrackingSystem {
    constructor() {
        this.carbonData = {
            sequestered: 0,
            credits: 0,
            value: 0,
            projections: []
        };
        
        // Carbon sequestration rates (tons CO2/acre/year)
        this.sequestrationRates = {
            cropTypes: {
                wheat: 0.5,
                corn: 0.7,
                rice: 0.3,
                soybeans: 0.8,
                cotton: 0.4,
                sugarcane: 1.2,
                vegetables: 0.6,
                fruits: 0.9,
                legumes: 1.0
            },
            farmingMethods: {
                conventional: 1.0,
                organic: 1.3,
                regenerative: 1.8,
                'no-till': 1.5,
                'cover-crop': 1.6,
                agroforestry: 2.2
            },
            practices: {
                coverCrops: 0.3, // per % coverage
                treeCoverage: 0.5, // per % coverage
                composting: {
                    none: 0,
                    low: 0.2,
                    medium: 0.4,
                    high: 0.6
                }
            }
        };
        
        this.marketPrice = 35; // USD per credit
        this.priceRange = { min: 25, max: 45 };
        
        this.initializeEventListeners();
        this.loadSavedData();
    }

    initializeEventListeners() {
        const form = document.getElementById('carbon-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateCarbonImpact();
            });
        }
    }

    loadSavedData() {
        try {
            const saved = localStorage.getItem('carbon-tracking-data');
            if (saved) {
                this.carbonData = JSON.parse(saved);
                this.updateDashboard();
            }
        } catch (error) {
            console.log('No saved carbon data found');
        }
    }

    saveData() {
        localStorage.setItem('carbon-tracking-data', JSON.stringify(this.carbonData));
    }

    calculateCarbonImpact() {
        const formData = new FormData(document.getElementById('carbon-form'));
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!this.validateForm(data)) {
            return;
        }
        
        // Calculate carbon sequestration
        const results = this.performCalculation(data);
        
        // Update carbon data
        this.carbonData = {
            ...this.carbonData,
            ...results,
            lastCalculated: new Date().toISOString(),
            farmData: data
        };
        
        // Save and display results
        this.saveData();
        this.displayResults(results);
        this.updateDashboard();
        this.createChart(results.projections);
        
        // Show success message
        this.showToast('Carbon impact calculated successfully!');
        
        // Scroll to results
        document.getElementById('results-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    validateForm(data) {
        const required = ['farmSize', 'cropType', 'farmingMethod'];
        const missing = required.filter(field => !data[field] || data[field].trim() === '');
        
        if (missing.length > 0) {
            this.showToast('Please fill in all required fields', 'error');
            return false;
        }
        
        if (parseFloat(data.farmSize) <= 0) {
            this.showToast('Farm size must be greater than 0', 'error');
            return false;
        }
        
        return true;
    }

    performCalculation(data) {
        const farmSize = parseFloat(data.farmSize);
        const cropType = data.cropType;
        const farmingMethod = data.farmingMethod;
        const coverCrops = parseFloat(data.coverCrops || 0);
        const treeCoverage = parseFloat(data.treeCoverage || 0);
        const composting = data.composting || 'none';
        
        // Base sequestration calculation
        let baseRate = this.sequestrationRates.cropTypes[cropType] || 0.5;
        let methodMultiplier = this.sequestrationRates.farmingMethods[farmingMethod] || 1.0;
        
        // Calculate additional sequestration from practices
        let practiceBonus = 0;
        practiceBonus += (coverCrops / 100) * this.sequestrationRates.practices.coverCrops;
        practiceBonus += (treeCoverage / 100) * this.sequestrationRates.practices.treeCoverage;
        practiceBonus += this.sequestrationRates.practices.composting[composting] || 0;
        
        // Total annual sequestration
        const annualSequestration = farmSize * (baseRate * methodMultiplier + practiceBonus);
        
        // Calculate carbon credits (1 credit = 1 ton CO2)
        const credits = Math.floor(annualSequestration * 0.8); // 80% conversion rate
        const estimatedValue = credits * this.marketPrice;
        
        // Generate 5-year projections
        const projections = this.generateProjections(annualSequestration, 5);
        
        // Calculate environmental impact metrics
        const metrics = this.calculateMetrics(annualSequestration, farmSize, data);
        
        return {
            sequestered: annualSequestration,
            credits: credits,
            value: estimatedValue,
            projections: projections,
            metrics: metrics,
            breakdown: {
                baseRate: baseRate,
                methodMultiplier: methodMultiplier,
                practiceBonus: practiceBonus,
                farmSize: farmSize
            }
        };
    }

    generateProjections(annualRate, years) {
        const projections = [];
        let cumulative = 0;
        
        for (let year = 1; year <= years; year++) {
            // Account for soil saturation (diminishing returns)
            const yearlyRate = annualRate * (1 - (year - 1) * 0.05);
            cumulative += Math.max(yearlyRate, annualRate * 0.7);
            
            projections.push({
                year: new Date().getFullYear() + year - 1,
                annual: yearlyRate,
                cumulative: cumulative,
                credits: Math.floor(cumulative * 0.8),
                value: Math.floor(cumulative * 0.8) * this.marketPrice
            });
        }
        
        return projections;
    }

    calculateMetrics(sequestration, farmSize, data) {
        return {
            sequestrationPerAcre: sequestration / farmSize,
            equivalentTrees: Math.floor(sequestration * 16), // 1 ton CO2 = ~16 trees
            carsOffRoad: Math.floor(sequestration / 4.6), // Average car emits 4.6 tons CO2/year
            householdsPowered: Math.floor(sequestration / 7.5), // Average household 7.5 tons CO2/year
            sustainabilityScore: this.calculateSustainabilityScore(data)
        };
    }

    calculateSustainabilityScore(data) {
        let score = 50; // Base score
        
        // Farming method bonus
        const methodScores = {
            conventional: 0,
            organic: 15,
            regenerative: 25,
            'no-till': 20,
            'cover-crop': 22,
            agroforestry: 30
        };
        score += methodScores[data.farmingMethod] || 0;
        
        // Practice bonuses
        score += Math.min(parseFloat(data.coverCrops || 0) / 4, 15); // Max 15 points
        score += Math.min(parseFloat(data.treeCoverage || 0) / 5, 10); // Max 10 points
        
        const compostingScores = { none: 0, low: 5, medium: 10, high: 15 };
        score += compostingScores[data.composting] || 0;
        
        return Math.min(Math.round(score), 100);
    }

    displayResults(results) {
        const resultsSection = document.getElementById('results-section');
        const impactResults = document.getElementById('impact-results');
        
        // Show results section
        resultsSection.classList.remove('hidden');
        
        // Display impact metrics
        impactResults.innerHTML = `
            <div class="bg-green-900/30 p-6 rounded-xl border border-green-500/30 text-center">
                <div class="text-3xl font-bold text-green-400 mb-2">${results.sequestered.toFixed(1)}</div>
                <div class="text-sm text-green-300">Tons CO₂ Sequestered/Year</div>
            </div>
            
            <div class="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30 text-center">
                <div class="text-3xl font-bold text-blue-400 mb-2">${results.credits}</div>
                <div class="text-sm text-blue-300">Carbon Credits Available</div>
            </div>
            
            <div class="bg-yellow-900/30 p-6 rounded-xl border border-yellow-500/30 text-center">
                <div class="text-3xl font-bold text-yellow-400 mb-2">$${results.value.toLocaleString()}</div>
                <div class="text-sm text-yellow-300">Estimated Annual Value</div>
            </div>
            
            <div class="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30 text-center">
                <div class="text-3xl font-bold text-purple-400 mb-2">${results.metrics.sustainabilityScore}</div>
                <div class="text-sm text-purple-300">Sustainability Score</div>
            </div>
        `;
        
        // Update marketplace values
        document.getElementById('credits-available').textContent = `${results.credits} credits`;
        document.getElementById('credits-value').textContent = `$${results.value.toLocaleString()}`;
        document.getElementById('potential-earnings').textContent = `$${results.value.toLocaleString()}`;
    }

    updateDashboard() {
        document.getElementById('carbon-sequestered').textContent = this.carbonData.sequestered?.toFixed(1) || '0';
        document.getElementById('available-credits').textContent = this.carbonData.credits || '0';
        document.getElementById('estimated-value').textContent = `$${(this.carbonData.value || 0).toLocaleString()}`;
    }

    createChart(projections) {
        const ctx = document.getElementById('carbonChart');
        if (!ctx || !projections) return;
        
        // Destroy existing chart if it exists
        if (window.carbonChart) {
            window.carbonChart.destroy();
        }
        
        const years = projections.map(p => p.year);
        const cumulativeData = projections.map(p => p.cumulative.toFixed(1));
        const creditsData = projections.map(p => p.credits);
        
        window.carbonChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Cumulative CO₂ Sequestered (tons)',
                        data: cumulativeData,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Carbon Credits',
                        data: creditsData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: { color: '#94a3b8' },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('success-toast');
        const messageEl = document.getElementById('toast-message');
        
        if (!toast || !messageEl) return;
        
        messageEl.textContent = message;
        
        // Update colors based on type
        toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        } text-white`;
        
        // Show toast
        toast.classList.remove('translate-x-full');
        
        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
        }, 4000);
    }
}

// Marketplace functions
function sellCredits() {
    const system = window.carbonTrackingSystem;
    if (!system || !system.carbonData.credits) {
        showToast('No credits available for sale. Please calculate your carbon impact first.', 'error');
        return;
    }
    
    showToast('Credit sale feature coming soon! Your credits will be listed on the marketplace.', 'info');
}

function requestVerification() {
    showToast('Verification request submitted! You will receive an email with next steps within 24 hours.', 'success');
}

function listCredits() {
    const system = window.carbonTrackingSystem;
    if (!system || !system.carbonData.credits) {
        showToast('No credits available to list. Please calculate your carbon impact first.', 'error');
        return;
    }
    
    showToast('Credits listed on marketplace! Buyers will be able to see your verified credits.', 'success');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('success-toast');
    const messageEl = document.getElementById('toast-message');
    
    if (!toast || !messageEl) return;
    
    messageEl.textContent = message;
    
    // Update colors based on type
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        type === 'info' ? 'bg-blue-600' :
        'bg-yellow-600'
    } text-white`;
    
    // Show toast
    toast.classList.remove('translate-x-full');
    
    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 4000);
}

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.carbonTrackingSystem = new CarbonTrackingSystem();
});