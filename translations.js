// Multilanguage Translation System for Agri-AI
class TranslationSystem {
    constructor() {
        this.currentLanguage = (typeof localStorage !== 'undefined' ? localStorage.getItem('agri-ai-language') : null) || 'en-in';
        this.translations = {
            // English (India)
            'en-in': {
                // Common Navigation
                'nav_overview': 'Overview',
                'nav_technology': 'Technology',
                'nav_map': 'Map Tool',
                'nav_predict': 'Predict Yield',
                'nav_impact': 'Impact',
                'nav_settings': 'Settings',
                'nav_logout': 'Logout',
                
                // Common Elements
                'site_title': 'Agri-AI Yield Optimizer',
                'welcome': 'Welcome',
                'loading': 'Loading...',
                'save': 'Save',
                'cancel': 'Cancel',
                'submit': 'Submit',
                'reset': 'Reset',
                'login': 'Login',
                'signup': 'Sign Up',
                'logout': 'Logout',
                
                // Common Form Elements
                'select_option': 'Select Option',
                'enter_value': 'Enter Value',
                'optional': 'Optional',
                'required': 'Required',
                'minimum': 'Minimum',
                'maximum': 'Maximum',
                'choose_file': 'Choose File',
                'browse_files': 'Browse Files',
                'drag_drop': 'Drag and drop files here',
                'or_click': 'or click to browse',
                'supports_formats': 'Supports',
                'max_size': 'Max size',
                
                // Common Buttons
                'generate': 'Generate',
                'calculate': 'Calculate',
                'analyze': 'Analyze',
                'upload': 'Upload',
                'download': 'Download',
                'export': 'Export',
                'import': 'Import',
                'add': 'Add',
                'edit': 'Edit',
                'delete': 'Delete',
                'view': 'View',
                'close': 'Close',
                'back': 'Back',
                'next': 'Next',
                'previous': 'Previous',
                'continue': 'Continue',
                'finish': 'Finish',
                
                // Common Status
                'success': 'Success',
                'error': 'Error',
                'warning': 'Warning',
                'info': 'Information',
                'processing': 'Processing',
                'completed': 'Completed',
                'failed': 'Failed',
                'pending': 'Pending',
                'active': 'Active',
                'inactive': 'Inactive',
                
                // Units and Measurements
                'acres': 'acres',
                'tons': 'tons',
                'tons_per_acre': 'tons per acre',
                'total_tons': 'total tons',
                'percentage': 'percentage',
                'confidence': 'Confidence',
                'accuracy': 'Accuracy',
                
                // Overview Page
                'overview_title': 'Revolutionizing Agriculture with AI',
                'overview_subtitle': 'Our advanced AI system combines satellite imagery, weather data, and machine learning to provide accurate yield predictions for farmers worldwide.',
                'feature_ai_title': 'AI-Powered Predictions',
                'feature_ai_desc': 'Advanced machine learning algorithms analyze multiple data sources to provide highly accurate yield predictions with up to 95% accuracy.',
                'feature_global_title': 'Global Coverage',
                'feature_global_desc': 'Our system works worldwide, providing localized predictions based on regional climate patterns, soil conditions, and agricultural practices.',
                'feature_realtime_title': 'Real-time Analytics',
                'feature_realtime_desc': 'Get instant insights with real-time data processing, allowing farmers to make informed decisions quickly and efficiently.',
                
                // Technology Page
                'tech_title': 'Cutting-Edge AI Technology',
                'tech_subtitle': 'Our platform leverages the latest advances in artificial intelligence, machine learning, and satellite technology to deliver unprecedented accuracy in agricultural predictions.',
                'tech_ml_title': 'Machine Learning',
                'tech_ml_desc': 'Advanced neural networks trained on millions of data points to recognize patterns in crop growth, weather conditions, and soil health for accurate yield predictions.',
                'tech_satellite_title': 'Satellite Imagery',
                'tech_satellite_desc': 'High-resolution satellite data from multiple sources provides real-time monitoring of crop health, growth stages, and environmental conditions across vast agricultural areas.',
                
                // Map Tool Page
                'map_title': 'Interactive Agricultural Map',
                'map_subtitle': 'Explore agricultural regions worldwide with our interactive map tool. View real-time satellite imagery, weather patterns, and crop distribution data.',
                'map_satellite_title': 'Satellite Imagery',
                'map_weather_title': 'Weather Overlay',
                'map_analytics_title': 'Crop Analytics',
                
                // Predict Page
                'predict_title': 'AI-Powered Yield Prediction',
                'predict_subtitle': 'Get accurate crop yield predictions using advanced machine learning algorithms. Enter your farm details below to receive personalized insights.',
                'predict_crop_type': 'Crop Type',
                'predict_location': 'Location',
                'predict_field_size': 'Field Size (acres)',
                'predict_planting_date': 'Planting Date',
                'predict_soil_type': 'Soil Type',
                'predict_irrigation': 'Irrigation System',
                'predict_fertilizer': 'Fertilizer Usage',
                'predict_previous_yield': 'Previous Year Yield (tons/acre)',
                'predict_generate': 'Generate Prediction',
                'predict_processing': 'Analyzing data and generating prediction...',
                'predict_additional_notes': 'Additional Notes & Comments',
                'predict_notes_placeholder': 'Enter any additional information about your farm, soil conditions, weather patterns, or specific concerns...',
                'predict_notes_help': 'Optional: Provide any additional context that might help improve prediction accuracy',
                'predict_results_title': 'Yield Prediction Results',
                'predict_yield_label': 'Predicted Yield',
                'predict_total_production': 'Total Production',
                'predict_confidence_level': 'Confidence Level',
                'predict_factors_title': 'Key Factors',
                'predict_weather': 'Weather',
                'predict_soil': 'Soil',
                'predict_irrigation_factor': 'Irrigation',
                'predict_crop_type_label': 'Crop Type',
                'predict_location_label': 'Location',
                'predict_field_size_label': 'Field Size',
                'predict_recommendations_title': 'Recommendations',
                'predict_select_crop': 'Select Crop Type',
                'predict_select_soil': 'Select Soil Type',
                'predict_select_irrigation': 'Select Irrigation Type',
                'predict_select_fertilizer': 'Select Fertilizer Level',
                'predict_minimum_acres': 'Minimum: 0.1 acres',
                'predict_planting_help': 'When did you plant or plan to plant?',
                'predict_yield_help': 'Optional: Helps improve prediction accuracy',
                
                // Impact Page
                'impact_title': 'Transforming Agriculture Worldwide',
                'impact_subtitle': 'Our AI-powered platform is making a real difference in agricultural communities around the globe, helping farmers increase yields, reduce waste, and build sustainable farming practices.',
                'impact_farmers': 'Farmers Helped',
                'impact_yield': 'Yield Increase',
                'impact_countries': 'Countries Served',
                'impact_savings': 'Resource Savings',
                
                // Settings Page
                'settings_title': 'Settings',
                'settings_subtitle': 'Customize your Agri-AI experience with personalized settings for theme, language, notifications, and more.',
                'settings_theme': 'Theme Settings',
                'settings_language': 'Language & Region',
                'settings_notifications': 'Notifications',
                'settings_privacy': 'Privacy & Data',
                'settings_performance': 'Performance',
                'settings_account': 'Account & Data',
                'settings_save': 'Save Settings',
                'settings_reset': 'Reset to Defaults',
                'settings_export': 'Export Data',
                'settings_import': 'Import Data',
                
                // Navigation - New Features
                'nav_soil_analysis': 'Soil Analysis',
                'nav_growth_monitoring': 'Growth Monitor',
                'nav_carbon_tracking': 'Carbon Tracking',
                
                // Soil Analysis Page
                'soil_analysis_title': 'AI Soil Texture Analysis',
                'soil_analysis_subtitle': 'Upload a macro photograph of your soil sample and let our AI analyze the texture to determine soil type and recommend the best crops for optimal yield.',
                'soil_upload_title': 'Upload Soil Sample',
                'soil_upload_subtitle': 'Drag and drop your soil macro photograph or click to browse',
                'soil_analyzing': 'Analyzing soil texture...',
                'soil_results_title': 'Analysis Results',
                'soil_type_detected': 'Soil Type Detected',
                'soil_recommendations': 'Crop Recommendations',
                'soil_tips': 'Growing Tips',
                'soil_sandy': 'Sandy Soil',
                'soil_loamy': 'Loamy Soil',
                'soil_clay': 'Clay Soil',
                
                // Growth Monitoring Page
                'growth_monitoring_title': 'Growth Stage Monitoring',
                'growth_monitoring_subtitle': 'Track your crops from germination to harvest with AI-powered growth stage detection and precise "Days to Maturity" countdown timers.',
                'growth_add_crop': 'Add New Crop',
                'growth_crop_name': 'Crop Name',
                'growth_variety': 'Variety',
                'growth_planting_date': 'Planting Date',
                'growth_expected_harvest': 'Expected Harvest',
                'growth_current_stage': 'Current Stage',
                'growth_days_to_maturity': 'Days to Maturity',
                'growth_progress': 'Progress',
                'growth_care_tips': 'Care Tips',
                'growth_stage_germination': 'Germination',
                'growth_stage_seedling': 'Seedling',
                'growth_stage_vegetative': 'Vegetative',
                'growth_stage_flowering': 'Flowering',
                'growth_stage_fruiting': 'Fruiting',
                'growth_stage_harvest': 'Harvest Ready',
                
                // Carbon Tracking Page
                'carbon_tracking_title': 'Carbon Footprint Tracking',
                'carbon_tracking_subtitle': 'Monitor your farm\'s carbon sequestration, track environmental impact, and earn carbon credits through sustainable farming practices.',
                'carbon_sequestered': 'Carbon Sequestered',
                'carbon_available_credits': 'Available Credits',
                'carbon_estimated_value': 'Estimated Value',
                'carbon_sell_credits': 'Sell Credits',
                'carbon_calculate_title': 'Calculate Carbon Sequestration',
                'carbon_farm_size': 'Farm Size (acres)',
                'carbon_crop_type': 'Primary Crop Type',
                'carbon_farming_method': 'Farming Method',
                'carbon_soil_management': 'Soil Management',
                'carbon_additional_practices': 'Additional Practices',
                'carbon_calculate_impact': 'Calculate Carbon Impact',
                'carbon_impact_analysis': 'Carbon Impact Analysis',
                'carbon_sequestration_projection': 'Carbon Sequestration Projection',
                'carbon_credits_ready': 'carbon credits ready to sell',
                'carbon_tons_co2': 'tons CO₂ this year',
                'carbon_marketplace_title': 'Carbon Credits Marketplace',
                'carbon_verification_title': 'Verification & Certification',
                
                // Authentication
                'auth_login_title': 'Welcome Back',
                'auth_login_subtitle': 'Sign in to your account to access the yield predictor',
                'auth_signup_title': 'Join Agri-AI',
                'auth_signup_subtitle': 'Create your account to access the yield predictor',
                'auth_username': 'Username',
                'auth_password': 'Password',
                'auth_email': 'Email',
                'auth_full_name': 'Full Name',
                'auth_confirm_password': 'Confirm Password',
                'auth_have_account': 'Already have an account?',
                'auth_no_account': "Don't have an account?",
                'auth_signin_here': 'Sign in here',
                'auth_signup_here': 'Sign up here'
            },
            
            // Telugu
            'te': {
                // Common Navigation
                'nav_overview': 'అవలోకనం',
                'nav_technology': 'సాంకేతికత',
                'nav_map': 'మ్యాప్ టూల్',
                'nav_predict': 'దిగుబడి అంచనా',
                'nav_impact': 'ప్రభావం',
                'nav_settings': 'సెట్టింగ్స్',
                'nav_logout': 'లాగ్ అవుట్',
                
                // Common Elements
                'site_title': 'వ్యవసాయ-AI దిగుబడి ఆప్టిమైజర్',
                'welcome': 'స్వాగతం',
                'loading': 'లోడ్ అవుతోంది...',
                'save': 'సేవ్ చేయండి',
                'cancel': 'రద్దు చేయండి',
                'submit': 'సమర్పించండి',
                'reset': 'రీసెట్',
                'login': 'లాగిన్',
                'signup': 'సైన్ అప్',
                'logout': 'లాగ్ అవుట్',
                
                // Overview Page
                'overview_title': 'AIతో వ్యవసాయంలో విప్లవం',
                'overview_subtitle': 'మా అధునాతన AI సిస్టమ్ సాటిలైట్ ఇమేజరీ, వాతావరణ డేటా మరియు మెషిన్ లెర్నింగ్‌ను కలిపి ప్రపంచవ్యాప్తంగా రైతులకు ఖచ్చితమైన దిగుబడి అంచనాలను అందిస్తుంది।',
                'feature_ai_title': 'AI-శక్తితో కూడిన అంచనాలు',
                'feature_ai_desc': 'అధునాతన మెషిన్ లెర్నింగ్ అల్గోరిథమ్‌లు అనేక డేటా మూలాలను విశ్లేషించి 95% వరకు ఖచ్చితత్వంతో అత్యంత ఖచ్చితమైన దిగుబడి అంచనాలను అందిస్తాయి।',
                'feature_global_title': 'గ్లోబల్ కవరేజ్',
                'feature_global_desc': 'మా సిస్టమ్ ప్రపంచవ్యాప్తంగా పనిచేస్తుంది, ప్రాంతీయ వాతావరణ నమూనాలు, మట్టి పరిస్థితులు మరియు వ్యవసాయ పద్ధతుల ఆధారంగా స్థానికీకరించిన అంచనాలను అందిస్తుంది।',
                'feature_realtime_title': 'రియల్-టైమ్ అనలిటిక్స్',
                'feature_realtime_desc': 'రియల్-టైమ్ డేటా ప్రాసెసింగ్‌తో తక్షణ అంతర్దృష్టులను పొందండి, రైతులు త్వరగా మరియు సమర్థవంతంగా సమాచార ఆధారిత నిర్ణయాలు తీసుకోవడానికి అనుమతిస్తుంది।',
                
                // Technology Page
                'tech_title': 'అత్యాధునిక AI టెక్నాలజీ',
                'tech_subtitle': 'మా ప్లాట్‌ఫారమ్ కృత్రిమ మేధస్సు, మెషిన్ లెర్నింగ్ మరియు సాటిలైట్ టెక్నాలజీలో తాజా పురోగతిని ఉపయోగించి వ్యవసాయ అంచనాలలో అపూర్వమైన ఖచ్చితత్వాన్ని అందిస్తుంది।',
                'tech_ml_title': 'మెషిన్ లెర్నింగ్',
                'tech_ml_desc': 'లక్షలాది డేటా పాయింట్లపై శిక్షణ పొందిన అధునాతన న్యూరల్ నెట్‌వర్క్‌లు పంట పెరుగుదల, వాతావరణ పరిస్థితులు మరియు మట్టి ఆరోగ్యంలో నమూనాలను గుర్తించి ఖచ్చితమైన దిగుబడి అంచనాలను అందిస్తాయి।',
                'tech_satellite_title': 'సాటిలైట్ ఇమేజరీ',
                'tech_satellite_desc': 'అనేక మూలాల నుండి అధిక-రిజల్యూషన్ సాటిలైట్ డేటా విస్తృత వ్యవసాయ ప్రాంతాలలో పంట ఆరోగ్యం, పెరుగుదల దశలు మరియు పర్యావరణ పరిస్థితుల రియల్-టైమ్ పర్యవేక్షణను అందిస్తుంది।',
                
                // Map Tool Page
                'map_title': 'ఇంటరాక్టివ్ వ్యవసాయ మ్యాప్',
                'map_subtitle': 'మా ఇంటరాక్టివ్ మ్యాప్ టూల్‌తో ప్రపంచవ్యాప్తంగా వ్యవసాయ ప్రాంతాలను అన్వేషించండి. రియల్-టైమ్ సాటిలైట్ ఇమేజరీ, వాతావరణ నమూనాలు మరియు పంట పంపిణీ డేటాను చూడండి।',
                'map_satellite_title': 'సాటిలైట్ ఇమేజరీ',
                'map_weather_title': 'వాతావరణ ఓవర్‌లే',
                'map_analytics_title': 'పంట అనలిటిక్స్',
                'map_controls_title': 'మ్యాప్ నియంత్రణలు',
                'map_active_filters': 'క్రియాశీల ఫిల్టర్లు',
                'map_apply_filters': 'ఫిల్టర్లను వర్తింపజేయండి',
                'map_reset_filters': 'ఫిల్టర్లను రీసెట్ చేయండి',
                'map_layer_label': 'లేయర్',
                'map_region_label': 'ప్రాంతం',
                'map_crop_label': 'పంట',
                'map_time_label': 'సమయం',
                'map_data_info': 'డేటా సమాచారం',
                
                // Predict Page
                'predict_title': 'AI-శక్తితో కూడిన దిగుబడి అంచనా',
                'predict_subtitle': 'అధునాతన మెషిన్ లెర్నింగ్ అల్గోరిథమ్‌లను ఉపయోగించి ఖచ్చితమైన పంట దిగుబడి అంచనాలను పొందండి. వ్యక్తిగతీకరించిన అంతర్దృష్టులను పొందడానికి దిగువన మీ వ్యవసాయ వివరాలను నమోదు చేయండి।',
                'predict_crop_type': 'పంట రకం',
                'predict_location': 'స్థానం',
                'predict_field_size': 'పొలం పరిమాణం (ఎకరాలు)',
                'predict_planting_date': 'విత్తన తేదీ',
                'predict_soil_type': 'మట్టి రకం',
                'predict_irrigation': 'నీటిపారుదల వ్యవస్థ',
                'predict_fertilizer': 'ఎరువుల వాడకం',
                'predict_previous_yield': 'గత సంవత్సర దిగుబడి (టన్నులు/ఎకరం)',
                'predict_generate': 'అంచనా రూపొందించండి',
                'predict_processing': 'డేటాను విశ్లేషించి అంచనా రూపొందిస్తోంది...',
                'predict_additional_notes': 'అదనపు గమనికలు మరియు వ్యాఖ్యలు',
                'predict_minimum_acres': 'కనిష్టం: 0.1 ఎకరాలు',
                'predict_planting_help': 'మీరు ఎప్పుడు నాటారు లేదా నాటాలని అనుకుంటున్నారు?',
                'predict_yield_help': 'ఐచ్ఛికం: అంచనా ఖచ్చితత్వాన్ని మెరుగుపరచడంలో సహాయపడుతుంది',
                'predict_notes_help': 'ఐచ్ఛికం: అంచనా ఖచ్చితత్వాన్ని మెరుగుపరచడంలో సహాయపడే ఏదైనా అదనపు సందర్భాన్ని అందించండి',
                'predict_results_title': 'దిగుబడి అంచనా ఫలితాలు',
                
                // Impact Page
                'impact_title': 'ప్రపంచవ్యాప్తంగా వ్యవసాయాన్ని మార్చడం',
                'impact_subtitle': 'మా AI-శక్తితో కూడిన ప్లాట్‌ఫారమ్ ప్రపంచవ్యాప్తంగా వ్యవసాయ సమాజాలలో నిజమైన మార్పును తీసుకువస్తోంది, రైతులకు దిగుబడిని పెంచడం, వ్యర్థాలను తగ్గించడం మరియు స్థిరమైన వ్యవసాయ పద్ధతులను నిర్మించడంలో సహాయం చేస్తోంది।',
                'impact_farmers': 'రైతులకు సహాయం చేసింది',
                'impact_yield': 'దిగుబడి పెరుగుదల',
                'impact_countries': 'దేశాలలో సేవలు',
                'impact_savings': 'వనరుల ఆదా',
                
                // Settings Page
                'settings_title': 'సెట్టింగ్స్',
                'settings_subtitle': 'థీమ్, భాష, నోటిఫికేషన్లు మరియు మరిన్నింటి కోసం వ్యక్తిగతీకరించిన సెట్టింగ్లతో మీ వ్యవసాయ-AI అనుభవాన్ని అనుకూలీకరించండి।',
                'settings_language': 'భాష మరియు ప్రాంతం',
                
                // Navigation - New Features
                'nav_soil_analysis': 'మట్టి విశ్లేషణ',
                'nav_growth_monitoring': 'వృద్ధి పర్యవేక్షణ',
                'nav_carbon_tracking': 'కార్బన్ ట్రాకింగ్',
                
                // Soil Analysis Page
                'soil_analysis_title': 'AI మట్టి ఆకృతి విశ్లేషణ',
                'soil_analysis_subtitle': 'మీ మట్టి నమూనా యొక్క మాక్రో ఫోటోగ్రాఫ్‌ను అప్‌లోడ్ చేయండి మరియు మా AI ఆకృతిని విశ్లేషించి మట్టి రకాన్ని నిర్ణయించి మరియు అనుకూల దిగుబడి కోసం ఉత్తమ పంటలను సిఫార్సు చేయనివ్వండి।',
                'soil_upload_title': 'మట్టి నమూనాను అప్‌లోడ్ చేయండి',
                'soil_upload_subtitle': 'మీ మట్టి మాక్రో ఫోటోగ్రాఫ్‌ను లాగి వదలండి లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
                'soil_analyzing': 'మట్టి ఆకృతిని విశ్లేషిస్తోంది...',
                'soil_results_title': 'విశ్లేషణ ఫలితాలు',
                'soil_type_detected': 'మట్టి రకం గుర్తించబడింది',
                'soil_recommendations': 'పంట సిఫార్సులు',
                'soil_tips': 'పెరుగుట చిట్కాలు',
                'soil_sandy': 'ఇసుక మట్టి',
                'soil_loamy': 'లోమీ మట్టి',
                'soil_clay': 'బంకమట్టి',
                
                // Growth Monitoring Page
                'growth_monitoring_title': 'వృద్ధి దశ పర్యవేక్షణ',
                'growth_monitoring_subtitle': 'AI-శక్తితో కూడిన వృద్ధి దశ గుర్తింపు మరియు ఖచ్చితమైన "పరిపక్వత వరకు రోజులు" కౌంట్‌డౌన్ టైమర్‌లతో మొలకెత్తడం నుండి కోత వరకు మీ పంటలను ట్రాక్ చేయండి।',
                'growth_add_crop': 'కొత్త పంటను జోడించండి',
                'growth_crop_name': 'పంట పేరు',
                'growth_variety': 'రకం',
                'growth_planting_date': 'విత్తన తేదీ',
                'growth_expected_harvest': 'ఆశించిన కోత',
                'growth_current_stage': 'ప్రస్తుత దశ',
                'growth_days_to_maturity': 'పరిపక్వత వరకు రోజులు',
                'growth_progress': 'పురోగతి',
                'growth_care_tips': 'సంరక్షణ చిట్కాలు',
                'growth_stage_germination': 'మొలకెత్తడం',
                'growth_stage_seedling': 'మొలక',
                'growth_stage_vegetative': 'వృక్షసంబంధ',
                'growth_stage_flowering': 'పుష్పించడం',
                'growth_stage_fruiting': 'ఫలించడం',
                'growth_stage_harvest': 'కోత సిద్ధం',
                
                // Carbon Tracking Page
                'carbon_tracking_title': 'కార్బన్ పాదముద్ర ట్రాకింగ్',
                'carbon_tracking_subtitle': 'మీ వ్యవసాయ క్షేత్రం యొక్క కార్బన్ సీక్వెస్ట్రేషన్‌ను పర్యవేక్షించండి, పర్యావరణ ప్రభావాన్ని ట్రాక్ చేయండి మరియు స్థిరమైన వ్యవసాయ పద్ధతుల ద్వారా కార్బన్ క్రెడిట్‌లను సంపాదించండి।',
                'carbon_sequestered': 'కార్బన్ సీక్వెస్టర్డ్',
                'carbon_available_credits': 'అందుబాటులో ఉన్న క్రెడిట్‌లు',
                'carbon_estimated_value': 'అంచనా విలువ',
                'carbon_sell_credits': 'క్రెడిట్‌లను అమ్మండి',
                'carbon_calculate_title': 'కార్బన్ సీక్వెస్ట్రేషన్‌ను లెక్కించండి',
                'carbon_farm_size': 'వ్యవసాయ పరిమాణం (ఎకరాలు)',
                'carbon_crop_type': 'ప్రాథమిక పంట రకం',
                'carbon_farming_method': 'వ్యవసాయ పద్ధతి',
                'carbon_soil_management': 'మట్టి నిర్వహణ',
                'carbon_additional_practices': 'అదనపు పద్ధతులు',
                'carbon_calculate_impact': 'కార్బన్ ప్రభావాన్ని లెక్కించండి',
                'carbon_impact_analysis': 'కార్బన్ ప్రభావ విశ్లేషణ',
                'carbon_sequestration_projection': 'కార్బన్ సీక్వెస్ట్రేషన్ ప్రొజెక్షన్',
                'carbon_credits_ready': 'కార్బన్ క్రెడిట్‌లు అమ్మడానికి సిద్ధం',
                'carbon_tons_co2': 'టన్నుల CO₂ ఈ సంవత్సరం',
                'carbon_marketplace_title': 'కార్బన్ క్రెడిట్‌ల మార్కెట్‌ప్లేస్',
                'carbon_verification_title': 'ధృవీకరణ మరియు ప్రమాణీకరణ',
                
                'auth_login_subtitle': 'దిగుబడి అంచనా వేయడానికి మీ ఖాతాలోకి సైన్ ఇన్ చేయండి',
                'auth_login_title': 'తిరిగి స్వాగతం',
                'auth_signup_title': 'వ్యవసాయ-AIలో చేరండి',
                'auth_signup_subtitle': 'దిగుబడి అంచనా వేయడానికి మీ ఖాతాను సృష్టించండి',
                'auth_username': 'వినియోగదారు పేరు',
                'auth_password': 'పాస్‌వర్డ్',
                'auth_email': 'ఇమెయిల్',
                'auth_full_name': 'పూర్తి పేరు',
                'auth_confirm_password': 'పాస్‌వర్డ్ నిర్ధారించండి',
                'auth_have_account': 'ఇప్పటికే ఖాతా ఉందా?',
                'auth_no_account': 'ఖాతా లేదా?',
                'auth_signin_here': 'ఇక్కడ సైన్ ఇన్ చేయండి',
                'auth_signup_here': 'ఇక్కడ సైన్ అప్ చేయండి'
            }
        };
        
        this.init();
    }
    
    init() {
        this.applyTranslations();
        
        // Setup language selectors after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupLanguageSelector();
        }, 100);
        
        // Re-apply translations when new content is added to the page
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver((mutations) => {
                let shouldReapply = false;
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any added nodes have data-i18n attributes
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                if (node.hasAttribute && node.hasAttribute('data-i18n') || 
                                    node.querySelector && node.querySelector('[data-i18n]')) {
                                    shouldReapply = true;
                                }
                            }
                        });
                    }
                });
                
                if (shouldReapply) {
                    this.applyTranslations();
                    this.setupLanguageSelector();
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    translate(key) {
        const translation = this.translations[this.currentLanguage];
        return translation && translation[key] ? translation[key] : key;
    }
    
    setLanguage(languageCode) {
        // Validate language code
        if (!this.translations[languageCode]) {
            console.warn(`Language '${languageCode}' not supported. Falling back to 'en-in'.`);
            languageCode = 'en-in';
        }
        
        this.currentLanguage = languageCode;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('agri-ai-language', languageCode);
        }
        this.applyTranslations();
        
        // Trigger a custom event for other components to listen to
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: languageCode } 
            }));
        }
    }
    
    applyTranslations() {
        // Only apply translations if document exists (browser environment)
        if (typeof document === 'undefined') return;
        
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'password')) {
                element.placeholder = translation;
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update page title if it has data-i18n
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            titleElement.textContent = this.translate(key);
        }
        
        // Update document language attribute
        document.documentElement.lang = this.currentLanguage;
        
        console.log(`🌐 Translations applied for language: ${this.currentLanguage}`);
    }
    
    setupLanguageSelector() {
        // Only setup selectors if document exists (browser environment)
        if (typeof document === 'undefined') return;
        
        // Update language selectors if they exist
        const selectors = document.querySelectorAll('#language-select, .language-selector');
        selectors.forEach(selector => {
            if (selector) {
                // Populate with available languages
                this.populateLanguageSelector(selector);
                
                // Remove existing event listeners to prevent duplicates
                const newSelector = selector.cloneNode(true);
                selector.parentNode.replaceChild(newSelector, selector);
                
                // Add new event listener
                newSelector.addEventListener('change', (e) => {
                    this.setLanguage(e.target.value);
                });
            }
        });
        
        // Listen for language changes from other components
        document.addEventListener('languageChanged', (e) => {
            const newLanguage = e.detail.language;
            // Update all selectors to reflect the change
            const allSelectors = document.querySelectorAll('#language-select, .language-selector');
            allSelectors.forEach(selector => {
                if (selector.value !== newLanguage) {
                    selector.value = newLanguage;
                }
            });
        });
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
    
    getLanguageDisplayName(languageCode) {
        const displayNames = {
            'en-in': 'English (India)',
            'te': 'తెలుగు (Telugu)'
        };
        return displayNames[languageCode] || languageCode;
    }
    
    populateLanguageSelector(selector) {
        if (!selector) return;
        
        // Clear existing options
        selector.innerHTML = '';
        
        // Add options for all available languages
        this.getAvailableLanguages().forEach(langCode => {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = this.getLanguageDisplayName(langCode);
            if (langCode === this.currentLanguage) {
                option.selected = true;
            }
            selector.appendChild(option);
        });
    }
}

// Initialize translation system when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.translationSystem = new TranslationSystem();
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationSystem;
}