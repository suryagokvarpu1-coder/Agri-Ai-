const fs = require('fs');

const enTexts = [
    'Dashboard', 'Overview', 'Technology', 'Map Tool', 'Predict Yield', 'Impact',
    'Settings', 'Soil Analysis', 'Growth Monitor', 'Carbon Tracking', 'Feedback',
    'OVERVIEW', 'TECHNOLOGY', 'MAP TOOL', 'YIELD PREDICTOR', 'GLOBAL IMPACT',
    'AI-Powered Predictions', 'Global Coverage', 'Real-time Analytics',
    'Expert Recommendations', 'Historical Analysis', 'Mobile Friendly',
    'Prediction Accuracy', 'Farmers Served', 'Countries Covered', 'Support Available',
    'Cutting-Edge AI Technology', 'Machine Learning', 'Satellite Imagery',
    'Weather Analytics', 'Big Data Processing', 'IoT Integration',
    'Our Technology Stack', 'Environmental Sustainability', 'Economic Growth',
    'Food Security', 'Digital Inclusion', 'Knowledge Transfer', 'Community Impact',
    'Success Stories', 'Real farmers, real results from around the world',
    'Language & Region', 'Language', 'Units', 'Notifications', 'Prediction Updates',
    'Get notified when new predictions are available', 'Weather Alerts',
    'Receive alerts for severe weather conditions', 'System Updates',
    'Get notified about system maintenance and updates', 'Privacy & Data',
    'Analytics & Usage Data', 'Help improve our service by sharing anonymous usage data',
    'Data Sharing', 'Share anonymized data with agricultural research institutions',
    'Performance', 'Animation Level', 'No Animations', 'Reduced Animations',
    'Normal Animations', 'Enhanced Animations', 'Account & Data', 'Export Data',
    'Import Data', 'Need Help?', '24/7 Help Line', 'Call for immediate assistance',
    'India:', 'International:', 'WhatsApp:', 'Available 24/7 • Multilingual Support',
    'Send Feedback', 'Report issues or suggestions', 'Metric (kg, hectares)',
    'Imperial (lbs, acres)', 'Crop Type', 'Location', 'Field Size (acres)',
    'Planting Date', 'Soil Type', 'Irrigation System', 'Fertilizer Usage',
    'Previous Year Yield (tons/acre)', 'Additional Notes & Comments',
    'Generate Prediction', 'Select Crop Type', 'Select Soil Type',
    'Select Irrigation Type', 'Select Fertilizer Level', 'Upload Soil Sample Photo',
    'Drop your soil photo here', 'or click to browse files', 'Choose File',
    'Photography Tips for Best Results', 'Sandy Soil', 'Loamy Soil', 'Clay Soil',
    'Primary Soil Type Detected', 'Recommended Crops for Your Soil',
    'Soil Improvement Tips', 'Analyzing Soil Texture...', 'Add New Crop to Monitor',
    'Crop Name', 'Variety', 'Field Location', 'Start Monitoring Crop',
    'No Crops Being Monitored', 'Crop Details', 'Carbon Sequestered',
    'Available Credits', 'Estimated Value', 'Sell Credits',
    'Calculate Carbon Sequestration', 'Farm Size (acres)', 'Primary Crop Type',
    'Farming Method', 'Calculate Carbon Impact', 'Carbon Impact Analysis',
    'Carbon Credits Marketplace', 'Request Verification', 'List Credits for Sale',
    'General Feedback', 'Report a Bug', 'Get Support', 'Your Name', 'Email Address',
    'Category', 'Your Feedback', 'Submit Feedback', 'Bug Title', 'Priority Level',
    'Page/Feature Affected', 'Detailed Description', 'Report Bug', 'Subject',
    'Detailed Message', 'Submit Support Request', 'Clear Form', 'Email Support',
    'Live Chat', 'Documentation', 'Get help via email', 'Chat with our team',
    'Browse our help docs', 'Start Chat', 'View Docs', 'Interactive Agricultural Map',
    'Map Controls & Filters', 'Region', 'Data Layer', 'Time Period', 'Apply Filters',
    'Reset Filters', 'Global View', 'North America', 'South America', 'Europe',
    'Asia', 'Africa', 'Oceania', 'All Crops', 'Satellite View', 'Weather Data',
    'Soil Health', 'Yield Predictions', 'Historical Data', 'Terrain', 'Current',
    'Last 7 Days', 'Last 30 Days', 'Last Season', 'Last Year', 'Last 5 Years',
    'Sign In', 'Create Account', 'Full Name', 'Username', 'Email (Optional)',
    'Password', 'Confirm Password', "Don't have an account?", 'Already have an account?',
    'Sign up here', 'Sign in here', 'By signing up, you agree to our Terms of Service'
];

async function translate(text, lang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data[0].map(item => item[0]).join('');
    } catch(e) {
        console.error("Error translating", text, e);
        return text;
    }
}

async function run() {
    const hiMap = {};
    const taMap = {};
    const knMap = {};
    
    console.log(`Translating ${enTexts.length} items...`);
    for (let i = 0; i < enTexts.length; i++) {
        const text = enTexts[i];
        hiMap[text] = await translate(text, 'hi');
        taMap[text] = await translate(text, 'ta');
        knMap[text] = await translate(text, 'kn');
        if (i % 10 === 0) console.log(`Progress: ${i}/${enTexts.length}`);
    }
    
    fs.writeFileSync('maps_generated.json', JSON.stringify({hi: hiMap, ta: taMap, kn: knMap}, null, 2));
    console.log("Done. Saved to maps_generated.json");
}
run();
