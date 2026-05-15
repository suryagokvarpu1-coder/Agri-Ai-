// Multilanguage Translation System for Agri-AI
class TranslationSystem {
    constructor() {
        this.currentLanguage = (typeof localStorage !== 'undefined' ? localStorage.getItem('agri-ai-language') : null) || 'en-in';
        this.translations = {

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH (India)
// ─────────────────────────────────────────────────────────────────────────────
'en-in': {
    'nav_overview':'Overview','nav_technology':'Technology','nav_map':'Map Tool',
    'nav_predict':'Predict Yield','nav_impact':'Impact','nav_settings':'Settings',
    'nav_logout':'Logout','nav_soil_analysis':'Soil Analysis',
    'nav_growth_monitoring':'Growth Monitor','nav_carbon_tracking':'Carbon Tracking',
    'site_title':'Agri-AI Yield Optimizer','welcome':'Welcome','loading':'Loading...',
    'save':'Save','cancel':'Cancel','submit':'Submit','reset':'Reset',
    'login':'Login','signup':'Sign Up','logout':'Logout',
    'overview_title':'Revolutionizing Agriculture with AI',
    'overview_subtitle':'Our advanced AI system combines satellite imagery, weather data, and machine learning to provide accurate yield predictions for farmers worldwide.',
    'feature_ai_title':'AI-Powered Predictions',
    'feature_ai_desc':'Advanced machine learning algorithms analyze multiple data sources to provide highly accurate yield predictions with up to 95% accuracy.',
    'feature_global_title':'Global Coverage',
    'feature_global_desc':'Our system works worldwide, providing localized predictions based on regional climate patterns, soil conditions, and agricultural practices.',
    'feature_realtime_title':'Real-time Analytics',
    'feature_realtime_desc':'Get instant insights with real-time data processing, allowing farmers to make informed decisions quickly and efficiently.',
    'tech_title':'Cutting-Edge AI Technology',
    'tech_subtitle':'Our platform leverages the latest advances in artificial intelligence, machine learning, and satellite technology to deliver unprecedented accuracy in agricultural predictions.',
    'tech_ml_title':'Machine Learning','tech_satellite_title':'Satellite Imagery',
    'map_title':'Interactive Agricultural Map',
    'map_subtitle':'Explore agricultural regions worldwide with our interactive map tool.',
    'map_satellite_title':'Satellite Imagery','map_weather_title':'Weather Overlay',
    'map_analytics_title':'Crop Analytics','map_controls_title':'Map Controls & Filters',
    'map_apply_filters':'Apply Filters','map_reset_filters':'Reset Filters',
    'map_region_label':'Region','map_crop_label':'Crop Type',
    'map_layer_label':'Data Layer','map_time_label':'Time Period',
    'map_active_filters':'Active Filters','map_data_info':'Map Data Information',
    'predict_title':'AI-Powered Yield Prediction',
    'predict_subtitle':'Get accurate crop yield predictions using advanced machine learning algorithms.',
    'predict_crop_type':'Crop Type','predict_location':'Location',
    'predict_field_size':'Field Size (acres)','predict_planting_date':'Planting Date',
    'predict_soil_type':'Soil Type','predict_irrigation':'Irrigation System',
    'predict_fertilizer':'Fertilizer Usage','predict_previous_yield':'Previous Year Yield (tons/acre)',
    'predict_generate':'Generate Prediction',
    'predict_processing':'Analyzing data and generating prediction...',
    'predict_additional_notes':'Additional Notes & Comments',
    'predict_minimum_acres':'Minimum: 0.1 acres',
    'predict_planting_help':'When did you plant or plan to plant?',
    'predict_yield_help':'Optional: Helps improve prediction accuracy',
    'predict_notes_help':'Optional: Provide any additional context',
    'predict_results_title':'Yield Prediction Results',
    'impact_title':'Transforming Agriculture Worldwide',
    'impact_subtitle':'Our AI-powered platform is making a real difference in agricultural communities around the globe.',
    'impact_farmers':'Farmers Helped','impact_yield':'Yield Increase',
    'impact_countries':'Countries Served','impact_savings':'Resource Savings',
    'settings_title':'Settings',
    'settings_subtitle':'Customize your Agri-AI experience with personalized settings.',
    'settings_language':'Language & Region',
    'soil_analysis_title':'AI Soil Texture Analysis',
    'soil_analysis_subtitle':'Upload a macro photograph of your soil sample and let our AI analyze the texture.',
    'soil_upload_title':'Upload Soil Sample Photo',
    'soil_upload_subtitle':'Drop your soil photo here',
    'soil_results_title':'Soil Texture Analysis Results',
    'soil_sandy':'Sandy Soil','soil_loamy':'Loamy Soil','soil_clay':'Clay Soil',
    'growth_monitoring_title':'Growth Stage Monitoring',
    'growth_monitoring_subtitle':'Track your crops from germination to harvest with AI-powered growth stage detection.',
    'growth_add_crop':'Add New Crop to Monitor','growth_crop_name':'Crop Name',
    'growth_variety':'Variety',
    'growth_stage_germination':'Germination','growth_stage_seedling':'Seedling',
    'growth_stage_vegetative':'Vegetative','growth_stage_flowering':'Flowering',
    'growth_stage_fruiting':'Fruiting','growth_stage_harvest':'Harvest Ready',
    'carbon_tracking_title':'Carbon Footprint Tracking',
    'carbon_tracking_subtitle':'Monitor your farm\'s carbon sequestration and earn carbon credits.',
    'carbon_sequestered':'Carbon Sequestered','carbon_available_credits':'Available Credits',
    'carbon_sell_credits':'Sell Credits','carbon_calculate_title':'Calculate Carbon Sequestration',
    'carbon_farm_size':'Farm Size (acres)','carbon_crop_type':'Primary Crop Type',
    'carbon_farming_method':'Farming Method','carbon_tons_co2':'tons CO₂ this year',
    'carbon_credits_ready':'carbon credits ready to sell',
    'feedback_title':'Feedback & Support',
    'feedback_subtitle':'We value your feedback and are here to help.',
    // Section badges
    'badge_overview':'OVERVIEW','badge_technology':'TECHNOLOGY','badge_map':'MAP TOOL',
    'badge_predictor':'YIELD PREDICTOR','badge_impact':'GLOBAL IMPACT',
    // Settings section headings
    'settings_notifications':'Notifications','settings_privacy':'Privacy & Data',
    'settings_performance':'Performance','settings_account':'Account & Data',
    'settings_need_help':'Need Help?',
    // Notification toggle labels
    'notif_predictions':'Prediction Updates',
    'notif_predictions_desc':'Get notified when new predictions are available',
    'notif_weather':'Weather Alerts',
    'notif_weather_desc':'Receive alerts for severe weather conditions',
    'notif_system':'System Updates',
    'notif_system_desc':'Get notified about system maintenance and updates',
    // Privacy toggle labels
    'privacy_analytics':'Analytics & Usage Data',
    'privacy_analytics_desc':'Help improve our service by sharing anonymous usage data',
    'privacy_sharing':'Data Sharing',
    'privacy_sharing_desc':'Share anonymized data with agricultural research institutions',
    'auth_login_title':'Welcome Back','auth_login_subtitle':'Sign in to your Agri-AI account',
    'auth_signup_title':'Join Agri-AI','auth_signup_subtitle':'Create your account to access the yield predictor',
    'auth_username':'Username','auth_password':'Password','auth_email':'Email (Optional)',
    'auth_full_name':'Full Name','auth_confirm_password':'Confirm Password',
    'auth_have_account':'Already have an account?','auth_no_account':"Don't have an account?",
    'auth_signin_here':'Sign in here','auth_signup_here':'Sign up here'
},

// ─────────────────────────────────────────────────────────────────────────────
// TELUGU
// ─────────────────────────────────────────────────────────────────────────────
'te': {
    'nav_overview':'అవలోకనం','nav_technology':'సాంకేతికత','nav_map':'మ్యాప్ టూల్',
    'nav_predict':'దిగుబడి అంచనా','nav_impact':'ప్రభావం','nav_settings':'సెట్టింగ్స్',
    'nav_logout':'లాగ్ అవుట్','nav_soil_analysis':'మట్టి విశ్లేషణ',
    'nav_growth_monitoring':'వృద్ధి పర్యవేక్షణ','nav_carbon_tracking':'కార్బన్ ట్రాకింగ్',
    'site_title':'వ్యవసాయ-AI దిగుబడి ఆప్టిమైజర్','welcome':'స్వాగతం','loading':'లోడ్ అవుతోంది...',
    'save':'సేవ్ చేయండి','cancel':'రద్దు చేయండి','submit':'సమర్పించండి','reset':'రీసెట్',
    'login':'లాగిన్','signup':'సైన్ అప్','logout':'లాగ్ అవుట్',
    'overview_title':'AIతో వ్యవసాయంలో విప్లవం',
    'overview_subtitle':'మా అధునాతన AI సిస్టమ్ సాటిలైట్ ఇమేజరీ, వాతావరణ డేటా మరియు మెషిన్ లెర్నింగ్‌ను కలిపి ప్రపంచవ్యాప్తంగా రైతులకు ఖచ్చితమైన దిగుబడి అంచనాలను అందిస్తుంది.',
    'feature_ai_title':'AI-శక్తితో కూడిన అంచనాలు',
    'feature_ai_desc':'అధునాతన మెషిన్ లెర్నింగ్ అల్గోరిథమ్‌లు అనేక డేటా మూలాలను విశ్లేషించి 95% వరకు ఖచ్చితత్వంతో దిగుబడి అంచనాలను అందిస్తాయి.',
    'feature_global_title':'గ్లోబల్ కవరేజ్',
    'feature_global_desc':'మా సిస్టమ్ ప్రపంచవ్యాప్తంగా పనిచేస్తుంది, ప్రాంతీయ వాతావరణ నమూనాలు మరియు మట్టి పరిస్థితుల ఆధారంగా స్థానికీకరించిన అంచనాలను అందిస్తుంది.',
    'feature_realtime_title':'రియల్-టైమ్ అనలిటిక్స్',
    'feature_realtime_desc':'రియల్-టైమ్ డేటా ప్రాసెసింగ్‌తో తక్షణ అంతర్దృష్టులను పొందండి.',
    'tech_title':'అత్యాధునిక AI టెక్నాలజీ',
    'tech_subtitle':'మా ప్లాట్‌ఫారమ్ కృత్రిమ మేధస్సు మరియు మెషిన్ లెర్నింగ్‌లో తాజా పురోగతిని ఉపయోగిస్తుంది.',
    'tech_ml_title':'మెషిన్ లెర్నింగ్','tech_satellite_title':'సాటిలైట్ ఇమేజరీ',
    'map_title':'ఇంటరాక్టివ్ వ్యవసాయ మ్యాప్',
    'map_subtitle':'మా ఇంటరాక్టివ్ మ్యాప్ టూల్‌తో ప్రపంచవ్యాప్తంగా వ్యవసాయ ప్రాంతాలను అన్వేషించండి.',
    'map_satellite_title':'సాటిలైట్ ఇమేజరీ','map_weather_title':'వాతావరణ ఓవర్‌లే',
    'map_analytics_title':'పంట అనలిటిక్స్','map_controls_title':'మ్యాప్ నియంత్రణలు',
    'map_apply_filters':'ఫిల్టర్లను వర్తింపజేయండి','map_reset_filters':'ఫిల్టర్లను రీసెట్ చేయండి',
    'map_region_label':'ప్రాంతం','map_crop_label':'పంట రకం',
    'map_layer_label':'డేటా లేయర్','map_time_label':'సమయ వ్యవధి',
    'map_active_filters':'క్రియాశీల ఫిల్టర్లు','map_data_info':'మ్యాప్ డేటా సమాచారం',
    'predict_title':'AI-శక్తితో కూడిన దిగుబడి అంచనా',
    'predict_subtitle':'అధునాతన మెషిన్ లెర్నింగ్ అల్గోరిథమ్‌లను ఉపయోగించి ఖచ్చితమైన పంట దిగుబడి అంచనాలను పొందండి.',
    'predict_crop_type':'పంట రకం','predict_location':'స్థానం',
    'predict_field_size':'పొలం పరిమాణం (ఎకరాలు)','predict_planting_date':'విత్తన తేదీ',
    'predict_soil_type':'మట్టి రకం','predict_irrigation':'నీటిపారుదల వ్యవస్థ',
    'predict_fertilizer':'ఎరువుల వాడకం','predict_previous_yield':'గత సంవత్సర దిగుబడి (టన్నులు/ఎకరం)',
    'predict_generate':'అంచనా రూపొందించండి',
    'predict_processing':'డేటాను విశ్లేషించి అంచనా రూపొందిస్తోంది...',
    'predict_additional_notes':'అదనపు గమనికలు మరియు వ్యాఖ్యలు',
    'predict_minimum_acres':'కనిష్టం: 0.1 ఎకరాలు',
    'predict_planting_help':'మీరు ఎప్పుడు నాటారు లేదా నాటాలని అనుకుంటున్నారు?',
    'predict_yield_help':'ఐచ్ఛికం: అంచనా ఖచ్చితత్వాన్ని మెరుగుపరచడంలో సహాయపడుతుంది',
    'predict_notes_help':'ఐచ్ఛికం: అదనపు సందర్భాన్ని అందించండి',
    'predict_results_title':'దిగుబడి అంచనా ఫలితాలు',
    'impact_title':'ప్రపంచవ్యాప్తంగా వ్యవసాయాన్ని మార్చడం',
    'impact_subtitle':'మా AI-శక్తితో కూడిన ప్లాట్‌ఫారమ్ ప్రపంచవ్యాప్తంగా వ్యవసాయ సమాజాలలో నిజమైన మార్పును తీసుకువస్తోంది.',
    'impact_farmers':'రైతులకు సహాయం చేసింది','impact_yield':'దిగుబడి పెరుగుదల',
    'impact_countries':'దేశాలలో సేవలు','impact_savings':'వనరుల ఆదా',
    'settings_title':'సెట్టింగ్స్',
    'settings_subtitle':'థీమ్, భాష, నోటిఫికేషన్లు మరియు మరిన్నింటి కోసం మీ అనుభవాన్ని అనుకూలీకరించండి.',
    'settings_language':'భాష మరియు ప్రాంతం',
    'soil_analysis_title':'AI మట్టి ఆకృతి విశ్లేషణ',
    'soil_analysis_subtitle':'మీ మట్టి నమూనా యొక్క మాక్రో ఫోటోగ్రాఫ్‌ను అప్‌లోడ్ చేయండి.',
    'soil_upload_title':'మట్టి నమూనా ఫోటో అప్‌లోడ్ చేయండి',
    'soil_upload_subtitle':'మీ మట్టి ఫోటోను ఇక్కడ వదలండి',
    'soil_results_title':'మట్టి ఆకృతి విశ్లేషణ ఫలితాలు',
    'soil_sandy':'ఇసుక మట్టి','soil_loamy':'లోమీ మట్టి','soil_clay':'బంకమట్టి',
    'growth_monitoring_title':'వృద్ధి దశ పర్యవేక్షణ',
    'growth_monitoring_subtitle':'AI-శక్తితో కూడిన వృద్ధి దశ గుర్తింపుతో మొలకెత్తడం నుండి కోత వరకు మీ పంటలను ట్రాక్ చేయండి.',
    'growth_add_crop':'పర్యవేక్షించడానికి కొత్త పంటను జోడించండి','growth_crop_name':'పంట పేరు',
    'growth_variety':'రకం',
    'growth_stage_germination':'మొలకెత్తడం','growth_stage_seedling':'మొలక',
    'growth_stage_vegetative':'వృక్షసంబంధ','growth_stage_flowering':'పుష్పించడం',
    'growth_stage_fruiting':'ఫలించడం','growth_stage_harvest':'కోత సిద్ధం',
    'carbon_tracking_title':'కార్బన్ పాదముద్ర ట్రాకింగ్',
    'carbon_tracking_subtitle':'మీ వ్యవసాయ క్షేత్రం యొక్క కార్బన్ సీక్వెస్ట్రేషన్‌ను పర్యవేక్షించండి మరియు కార్బన్ క్రెడిట్‌లను సంపాదించండి.',
    'carbon_sequestered':'కార్బన్ సీక్వెస్టర్డ్','carbon_available_credits':'అందుబాటులో ఉన్న క్రెడిట్‌లు',
    'carbon_sell_credits':'క్రెడిట్‌లను అమ్మండి','carbon_calculate_title':'కార్బన్ సీక్వెస్ట్రేషన్‌ను లెక్కించండి',
    'carbon_farm_size':'వ్యవసాయ పరిమాణం (ఎకరాలు)','carbon_crop_type':'ప్రాథమిక పంట రకం',
    'carbon_farming_method':'వ్యవసాయ పద్ధతి',
    'carbon_tons_co2':'టన్నుల CO₂ ఈ సంవత్సరం','carbon_credits_ready':'కార్బన్ క్రెడిట్‌లు అమ్మడానికి సిద్ధం',
    'feedback_title':'అభిప్రాయం మరియు మద్దతు',
    'feedback_subtitle':'మేము మీ అభిప్రాయాన్ని విలువైనదిగా భావిస్తాము మరియు సహాయం చేయడానికి ఇక్కడ ఉన్నాము.',
    'badge_overview':'అవలోకనం','badge_technology':'సాంకేతికత','badge_map':'మ్యాప్ టూల్',
    'badge_predictor':'దిగుబడి అంచనా','badge_impact':'గ్లోబల్ ప్రభావం',
    'settings_notifications':'నోటిఫికేషన్లు','settings_privacy':'గోప్యత మరియు డేటా',
    'settings_performance':'పనితీరు','settings_account':'ఖాతా మరియు డేటా',
    'settings_need_help':'సహాయం కావాలా?',
    'notif_predictions':'అంచనా నవీకరణలు',
    'notif_predictions_desc':'కొత్త అంచనాలు అందుబాటులో ఉన్నప్పుడు తెలియజేయండి',
    'notif_weather':'వాతావరణ హెచ్చరికలు',
    'notif_weather_desc':'తీవ్రమైన వాతావరణ పరిస్థితులకు హెచ్చరికలు అందుకోండి',
    'notif_system':'సిస్టమ్ నవీకరణలు',
    'notif_system_desc':'సిస్టమ్ నిర్వహణ మరియు నవీకరణల గురించి తెలియజేయండి',
    'privacy_analytics':'అనలిటిక్స్ మరియు వినియోగ డేటా',
    'privacy_analytics_desc':'అనామక వినియోగ డేటాను పంచుకోవడం ద్వారా మా సేవను మెరుగుపరచడంలో సహాయం చేయండి',
    'privacy_sharing':'డేటా భాగస్వామ్యం',
    'privacy_sharing_desc':'వ్యవసాయ పరిశోధన సంస్థలతో అనామకీకరించిన డేటాను పంచుకోండి',
    'auth_login_title':'తిరిగి స్వాగతం','auth_login_subtitle':'దిగుబడి అంచనా వేయడానికి మీ ఖాతాలోకి సైన్ ఇన్ చేయండి',
    'auth_signup_title':'వ్యవసాయ-AIలో చేరండి','auth_signup_subtitle':'దిగుబడి అంచనా వేయడానికి మీ ఖాతాను సృష్టించండి',
    'auth_username':'వినియోగదారు పేరు','auth_password':'పాస్‌వర్డ్','auth_email':'ఇమెయిల్ (ఐచ్ఛికం)',
    'auth_full_name':'పూర్తి పేరు','auth_confirm_password':'పాస్‌వర్డ్ నిర్ధారించండి',
    'auth_have_account':'ఇప్పటికే ఖాతా ఉందా?','auth_no_account':'ఖాతా లేదా?',
    'auth_signin_here':'ఇక్కడ సైన్ ఇన్ చేయండి','auth_signup_here':'ఇక్కడ సైన్ అప్ చేయండి'
},

// ─────────────────────────────────────────────────────────────────────────────
// HINDI
// ─────────────────────────────────────────────────────────────────────────────
'hi': {
    'nav_overview':'अवलोकन','nav_technology':'प्रौद्योगिकी','nav_map':'मैप टूल',
    'nav_predict':'उपज अनुमान','nav_impact':'प्रभाव','nav_settings':'सेटिंग्स',
    'nav_logout':'लॉग आउट','nav_soil_analysis':'मिट्टी विश्लेषण',
    'nav_growth_monitoring':'विकास निगरानी','nav_carbon_tracking':'कार्बन ट्रैकिंग',
    'site_title':'कृषि-AI उपज अनुकूलक','welcome':'स्वागत है','loading':'लोड हो रहा है...',
    'save':'सहेजें','cancel':'रद्द करें','submit':'जमा करें','reset':'रीसेट',
    'login':'लॉगिन','signup':'साइन अप','logout':'लॉग आउट',
    'overview_title':'AI के साथ कृषि में क्रांति',
    'overview_subtitle':'हमारा उन्नत AI सिस्टम सैटेलाइट इमेजरी, मौसम डेटा और मशीन लर्निंग को मिलाकर दुनिया भर के किसानों को सटीक उपज अनुमान प्रदान करता है।',
    'feature_ai_title':'AI-संचालित अनुमान',
    'feature_ai_desc':'उन्नत मशीन लर्निंग एल्गोरिदम कई डेटा स्रोतों का विश्लेषण करके 95% तक सटीकता के साथ उपज अनुमान प्रदान करते हैं।',
    'feature_global_title':'वैश्विक कवरेज',
    'feature_global_desc':'हमारा सिस्टम दुनिया भर में काम करता है, क्षेत्रीय जलवायु पैटर्न और मिट्टी की स्थितियों के आधार पर स्थानीयकृत अनुमान प्रदान करता है।',
    'feature_realtime_title':'रियल-टाइम एनालिटिक्स',
    'feature_realtime_desc':'रियल-टाइम डेटा प्रोसेसिंग के साथ तत्काल अंतर्दृष्टि प्राप्त करें।',
    'tech_title':'अत्याधुनिक AI प्रौद्योगिकी',
    'tech_subtitle':'हमारा प्लेटफॉर्म कृत्रिम बुद्धिमत्ता और मशीन लर्निंग में नवीनतम प्रगति का उपयोग करता है।',
    'tech_ml_title':'मशीन लर्निंग','tech_satellite_title':'सैटेलाइट इमेजरी',
    'map_title':'इंटरएक्टिव कृषि मानचित्र',
    'map_subtitle':'हमारे इंटरएक्टिव मैप टूल से दुनिया भर के कृषि क्षेत्रों का अन्वेषण करें।',
    'map_satellite_title':'सैटेलाइट इमेजरी','map_weather_title':'मौसम ओवरले',
    'map_analytics_title':'फसल एनालिटिक्स','map_controls_title':'मैप नियंत्रण और फ़िल्टर',
    'map_apply_filters':'फ़िल्टर लागू करें','map_reset_filters':'फ़िल्टर रीसेट करें',
    'map_region_label':'क्षेत्र','map_crop_label':'फसल प्रकार',
    'map_layer_label':'डेटा परत','map_time_label':'समय अवधि',
    'map_active_filters':'सक्रिय फ़िल्टर','map_data_info':'मैप डेटा जानकारी',
    'predict_title':'AI-संचालित उपज अनुमान',
    'predict_subtitle':'उन्नत मशीन लर्निंग एल्गोरिदम का उपयोग करके सटीक फसल उपज अनुमान प्राप्त करें।',
    'predict_crop_type':'फसल प्रकार','predict_location':'स्थान',
    'predict_field_size':'खेत का आकार (एकड़)','predict_planting_date':'बुवाई तिथि',
    'predict_soil_type':'मिट्टी का प्रकार','predict_irrigation':'सिंचाई प्रणाली',
    'predict_fertilizer':'उर्वरक उपयोग','predict_previous_yield':'पिछले वर्ष की उपज (टन/एकड़)',
    'predict_generate':'अनुमान उत्पन्न करें',
    'predict_processing':'डेटा का विश्लेषण और अनुमान उत्पन्न हो रहा है...',
    'predict_additional_notes':'अतिरिक्त नोट्स और टिप्पणियां',
    'predict_minimum_acres':'न्यूनतम: 0.1 एकड़',
    'predict_planting_help':'आपने कब बोया या बोने की योजना है?',
    'predict_yield_help':'वैकल्पिक: अनुमान सटीकता में सुधार करने में मदद करता है',
    'predict_notes_help':'वैकल्पिक: कोई भी अतिरिक्त संदर्भ प्रदान करें',
    'predict_results_title':'उपज अनुमान परिणाम',
    'impact_title':'दुनिया भर में कृषि को बदलना',
    'impact_subtitle':'हमारा AI-संचालित प्लेटफॉर्म दुनिया भर के कृषि समुदायों में वास्तविक बदलाव ला रहा है।',
    'impact_farmers':'किसानों की मदद की','impact_yield':'उपज वृद्धि',
    'impact_countries':'देशों में सेवाएं','impact_savings':'संसाधन बचत',
    'settings_title':'सेटिंग्स',
    'settings_subtitle':'थीम, भाषा, सूचनाओं और अधिक के लिए अपने अनुभव को अनुकूलित करें।',
    'settings_language':'भाषा और क्षेत्र',
    'soil_analysis_title':'AI मिट्टी बनावट विश्लेषण',
    'soil_analysis_subtitle':'अपने मिट्टी के नमूने की मैक्रो फोटोग्राफ अपलोड करें।',
    'soil_upload_title':'मिट्टी नमूना फोटो अपलोड करें',
    'soil_upload_subtitle':'अपनी मिट्टी की फोटो यहाँ छोड़ें',
    'soil_results_title':'मिट्टी बनावट विश्लेषण परिणाम',
    'soil_sandy':'रेतीली मिट्टी','soil_loamy':'दोमट मिट्टी','soil_clay':'चिकनी मिट्टी',
    'growth_monitoring_title':'विकास चरण निगरानी',
    'growth_monitoring_subtitle':'AI-संचालित विकास चरण पहचान के साथ अंकुरण से कटाई तक अपनी फसलों को ट्रैक करें।',
    'growth_add_crop':'निगरानी के लिए नई फसल जोड़ें','growth_crop_name':'फसल का नाम',
    'growth_variety':'किस्म',
    'growth_stage_germination':'अंकुरण','growth_stage_seedling':'पौधा',
    'growth_stage_vegetative':'वानस्पतिक','growth_stage_flowering':'फूलना',
    'growth_stage_fruiting':'फलना','growth_stage_harvest':'कटाई के लिए तैयार',
    'carbon_tracking_title':'कार्बन फुटप्रिंट ट्रैकिंग',
    'carbon_tracking_subtitle':'अपने खेत के कार्बन सीक्वेस्ट्रेशन की निगरानी करें और कार्बन क्रेडिट अर्जित करें।',
    'carbon_sequestered':'कार्बन सीक्वेस्टर्ड','carbon_available_credits':'उपलब्ध क्रेडिट',
    'carbon_sell_credits':'क्रेडिट बेचें','carbon_calculate_title':'कार्बन सीक्वेस्ट्रेशन की गणना करें',
    'carbon_farm_size':'खेत का आकार (एकड़)','carbon_crop_type':'प्राथमिक फसल प्रकार',
    'carbon_farming_method':'खेती की विधि',
    'carbon_tons_co2':'टन CO₂ इस वर्ष','carbon_credits_ready':'कार्बन क्रेडिट बेचने के लिए तैयार',
    'feedback_title':'प्रतिक्रिया और समर्थन',
    'feedback_subtitle':'हम आपकी प्रतिक्रिया को महत्व देते हैं और मदद के लिए यहाँ हैं।',
    'badge_overview':'अवलोकन','badge_technology':'प्रौद्योगिकी','badge_map':'मैप टूल',
    'badge_predictor':'उपज अनुमान','badge_impact':'वैश्विक प्रभाव',
    'settings_notifications':'सूचनाएं','settings_privacy':'गोपनीयता और डेटा',
    'settings_performance':'प्रदर्शन','settings_account':'खाता और डेटा',
    'settings_need_help':'मदद चाहिए?',
    'notif_predictions':'अनुमान अपडेट',
    'notif_predictions_desc':'जब नए अनुमान उपलब्ध हों तो सूचित करें',
    'notif_weather':'मौसम अलर्ट',
    'notif_weather_desc':'गंभीर मौसम स्थितियों के लिए अलर्ट प्राप्त करें',
    'notif_system':'सिस्टम अपडेट',
    'notif_system_desc':'सिस्टम रखरखाव और अपडेट के बारे में सूचित करें',
    'privacy_analytics':'एनालिटिक्स और उपयोग डेटा',
    'privacy_analytics_desc':'अनाम उपयोग डेटा साझा करके हमारी सेवा को बेहतर बनाने में मदद करें',
    'privacy_sharing':'डेटा साझाकरण',
    'privacy_sharing_desc':'कृषि अनुसंधान संस्थानों के साथ अनामीकृत डेटा साझा करें',
    'auth_login_title':'वापस स्वागत है','auth_login_subtitle':'उपज अनुमान के लिए अपने खाते में साइन इन करें',
    'auth_signup_title':'कृषि-AI में शामिल हों','auth_signup_subtitle':'उपज अनुमान के लिए अपना खाता बनाएं',
    'auth_username':'उपयोगकर्ता नाम','auth_password':'पासवर्ड','auth_email':'ईमेल (वैकल्पिक)',
    'auth_full_name':'पूरा नाम','auth_confirm_password':'पासवर्ड की पुष्टि करें',
    'auth_have_account':'पहले से खाता है?','auth_no_account':'खाता नहीं है?',
    'auth_signin_here':'यहाँ साइन इन करें','auth_signup_here':'यहाँ साइन अप करें'
},

// ─────────────────────────────────────────────────────────────────────────────
// TAMIL
// ─────────────────────────────────────────────────────────────────────────────
'ta': {
    'nav_overview':'கண்ணோட்டம்','nav_technology':'தொழில்நுட்பம்','nav_map':'வரைபட கருவி',
    'nav_predict':'விளைச்சல் கணிப்பு','nav_impact':'தாக்கம்','nav_settings':'அமைப்புகள்',
    'nav_logout':'வெளியேறு','nav_soil_analysis':'மண் பகுப்பாய்வு',
    'nav_growth_monitoring':'வளர்ச்சி கண்காணிப்பு','nav_carbon_tracking':'கார்பன் கண்காணிப்பு',
    'site_title':'வேளாண்-AI விளைச்சல் மேம்படுத்தி','welcome':'வரவேற்கிறோம்','loading':'ஏற்றுகிறது...',
    'save':'சேமி','cancel':'ரத்து செய்','submit':'சமர்ப்பி','reset':'மீட்டமை',
    'login':'உள்நுழை','signup':'பதிவு செய்','logout':'வெளியேறு',
    'overview_title':'AI மூலம் விவசாயத்தில் புரட்சி',
    'overview_subtitle':'எங்கள் மேம்பட்ட AI அமைப்பு செயற்கைக்கோள் படங்கள், வானிலை தரவு மற்றும் இயந்திர கற்றலை இணைத்து உலகெங்கும் உள்ள விவசாயிகளுக்கு துல்லியமான விளைச்சல் கணிப்புகளை வழங்குகிறது.',
    'feature_ai_title':'AI-இயக்கப்படும் கணிப்புகள்',
    'feature_ai_desc':'மேம்பட்ட இயந்திர கற்றல் வழிமுறைகள் பல தரவு மூலங்களை பகுப்பாய்வு செய்து 95% வரை துல்லியத்துடன் விளைச்சல் கணிப்புகளை வழங்குகின்றன.',
    'feature_global_title':'உலகளாவிய கவரேஜ்',
    'feature_global_desc':'எங்கள் அமைப்பு உலகெங்கும் செயல்படுகிறது, பிராந்திய காலநிலை வடிவங்கள் மற்றும் மண் நிலைமைகளின் அடிப்படையில் உள்ளூர்மயமாக்கப்பட்ட கணிப்புகளை வழங்குகிறது.',
    'feature_realtime_title':'நிகழ்நேர பகுப்பாய்வு',
    'feature_realtime_desc':'நிகழ்நேர தரவு செயலாக்கத்துடன் உடனடி நுண்ணறிவுகளைப் பெறுங்கள்.',
    'tech_title':'அதிநவீன AI தொழில்நுட்பம்',
    'tech_subtitle':'எங்கள் தளம் செயற்கை நுண்ணறிவு மற்றும் இயந்திர கற்றலில் சமீபத்திய முன்னேற்றங்களை பயன்படுத்துகிறது.',
    'tech_ml_title':'இயந்திர கற்றல்','tech_satellite_title':'செயற்கைக்கோள் படங்கள்',
    'map_title':'ஊடாடும் வேளாண் வரைபடம்',
    'map_subtitle':'எங்கள் ஊடாடும் வரைபட கருவியுடன் உலகெங்கும் உள்ள வேளாண் பகுதிகளை ஆராயுங்கள்.',
    'map_satellite_title':'செயற்கைக்கோள் படங்கள்','map_weather_title':'வானிலை மேலடுக்கு',
    'map_analytics_title':'பயிர் பகுப்பாய்வு','map_controls_title':'வரைபட கட்டுப்பாடுகள்',
    'map_apply_filters':'வடிப்பான்களை பயன்படுத்து','map_reset_filters':'வடிப்பான்களை மீட்டமை',
    'map_region_label':'பிராந்தியம்','map_crop_label':'பயிர் வகை',
    'map_layer_label':'தரவு அடுக்கு','map_time_label':'காலகட்டம்',
    'map_active_filters':'செயலில் உள்ள வடிப்பான்கள்','map_data_info':'வரைபட தரவு தகவல்',
    'predict_title':'AI-இயக்கப்படும் விளைச்சல் கணிப்பு',
    'predict_subtitle':'மேம்பட்ட இயந்திர கற்றல் வழிமுறைகளைப் பயன்படுத்தி துல்லியமான பயிர் விளைச்சல் கணிப்புகளைப் பெறுங்கள்.',
    'predict_crop_type':'பயிர் வகை','predict_location':'இடம்',
    'predict_field_size':'வயல் அளவு (ஏக்கர்)','predict_planting_date':'நடவு தேதி',
    'predict_soil_type':'மண் வகை','predict_irrigation':'நீர்ப்பாசன அமைப்பு',
    'predict_fertilizer':'உர பயன்பாடு','predict_previous_yield':'கடந்த ஆண்டு விளைச்சல் (டன்/ஏக்கர்)',
    'predict_generate':'கணிப்பை உருவாக்கு',
    'predict_processing':'தரவை பகுப்பாய்வு செய்து கணிப்பை உருவாக்குகிறது...',
    'predict_additional_notes':'கூடுதல் குறிப்புகள் மற்றும் கருத்துகள்',
    'predict_minimum_acres':'குறைந்தபட்சம்: 0.1 ஏக்கர்',
    'predict_planting_help':'நீங்கள் எப்போது நட்டீர்கள் அல்லது நடவு செய்ய திட்டமிட்டுள்ளீர்கள்?',
    'predict_yield_help':'விருப்பமானது: கணிப்பு துல்லியத்தை மேம்படுத்த உதவுகிறது',
    'predict_notes_help':'விருப்பமானது: கூடுதல் சூழலை வழங்கவும்',
    'predict_results_title':'விளைச்சல் கணிப்பு முடிவுகள்',
    'impact_title':'உலகெங்கும் விவசாயத்தை மாற்றுதல்',
    'impact_subtitle':'எங்கள் AI-இயக்கப்படும் தளம் உலகெங்கும் உள்ள வேளாண் சமூகங்களில் உண்மையான மாற்றத்தை ஏற்படுத்துகிறது.',
    'impact_farmers':'விவசாயிகளுக்கு உதவியது','impact_yield':'விளைச்சல் அதிகரிப்பு',
    'impact_countries':'நாடுகளில் சேவைகள்','impact_savings':'வள சேமிப்பு',
    'settings_title':'அமைப்புகள்',
    'settings_subtitle':'தீம், மொழி, அறிவிப்புகள் மற்றும் பலவற்றிற்கான தனிப்பயனாக்கப்பட்ட அமைப்புகளுடன் உங்கள் அனுபவத்தை தனிப்பயனாக்கவும்.',
    'settings_language':'மொழி மற்றும் பிராந்தியம்',
    'soil_analysis_title':'AI மண் அமைப்பு பகுப்பாய்வு',
    'soil_analysis_subtitle':'உங்கள் மண் மாதிரியின் மேக்ரோ புகைப்படத்தை பதிவேற்றவும்.',
    'soil_upload_title':'மண் மாதிரி புகைப்படத்தை பதிவேற்று',
    'soil_upload_subtitle':'உங்கள் மண் புகைப்படத்தை இங்கே இழுத்து விடுங்கள்',
    'soil_results_title':'மண் அமைப்பு பகுப்பாய்வு முடிவுகள்',
    'soil_sandy':'மணல் மண்','soil_loamy':'களிமண் கலந்த மண்','soil_clay':'களிமண்',
    'growth_monitoring_title':'வளர்ச்சி நிலை கண்காணிப்பு',
    'growth_monitoring_subtitle':'AI-இயக்கப்படும் வளர்ச்சி நிலை கண்டறிதலுடன் முளைப்பிலிருந்து அறுவடை வரை உங்கள் பயிர்களை கண்காணிக்கவும்.',
    'growth_add_crop':'கண்காணிக்க புதிய பயிரை சேர்க்கவும்','growth_crop_name':'பயிர் பெயர்',
    'growth_variety':'வகை',
    'growth_stage_germination':'முளைப்பு','growth_stage_seedling':'நாற்று',
    'growth_stage_vegetative':'தாவர வளர்ச்சி','growth_stage_flowering':'பூக்கும் நிலை',
    'growth_stage_fruiting':'காய்க்கும் நிலை','growth_stage_harvest':'அறுவடைக்கு தயார்',
    'carbon_tracking_title':'கார்பன் தடம் கண்காணிப்பு',
    'carbon_tracking_subtitle':'உங்கள் பண்ணையின் கார்பன் சேகரிப்பை கண்காணித்து கார்பன் கிரெடிட்களை சம்பாதிக்கவும்.',
    'carbon_sequestered':'கார்பன் சேகரிக்கப்பட்டது','carbon_available_credits':'கிடைக்கும் கிரெடிட்கள்',
    'carbon_sell_credits':'கிரெடிட்களை விற்கவும்','carbon_calculate_title':'கார்பன் சேகரிப்பை கணக்கிடுங்கள்',
    'carbon_farm_size':'பண்ணை அளவு (ஏக்கர்)','carbon_crop_type':'முதன்மை பயிர் வகை',
    'carbon_farming_method':'விவசாய முறை',
    'carbon_tons_co2':'டன் CO₂ இந்த ஆண்டு','carbon_credits_ready':'கார்பன் கிரெடிட்கள் விற்பனைக்கு தயார்',
    'feedback_title':'கருத்து மற்றும் ஆதரவு',
    'feedback_subtitle':'நாங்கள் உங்கள் கருத்தை மதிக்கிறோம் மற்றும் உதவ இங்கே இருக்கிறோம்.',
    'badge_overview':'கண்ணோட்டம்','badge_technology':'தொழில்நுட்பம்','badge_map':'வரைபட கருவி',
    'badge_predictor':'விளைச்சல் கணிப்பு','badge_impact':'உலகளாவிய தாக்கம்',
    'settings_notifications':'அறிவிப்புகள்','settings_privacy':'தனியுரிமை மற்றும் தரவு',
    'settings_performance':'செயல்திறன்','settings_account':'கணக்கு மற்றும் தரவு',
    'settings_need_help':'உதவி வேண்டுமா?',
    'notif_predictions':'கணிப்பு புதுப்பிப்புகள்',
    'notif_predictions_desc':'புதிய கணிப்புகள் கிடைக்கும்போது அறிவிக்கவும்',
    'notif_weather':'வானிலை எச்சரிக்கைகள்',
    'notif_weather_desc':'கடுமையான வானிலை நிலைமைகளுக்கு எச்சரிக்கைகளைப் பெறுங்கள்',
    'notif_system':'கணினி புதுப்பிப்புகள்',
    'notif_system_desc':'கணினி பராமரிப்பு மற்றும் புதுப்பிப்புகள் பற்றி அறிவிக்கவும்',
    'privacy_analytics':'பகுப்பாய்வு மற்றும் பயன்பாட்டு தரவு',
    'privacy_analytics_desc':'அநாமதேய பயன்பாட்டு தரவை பகிர்வதன் மூலம் எங்கள் சேவையை மேம்படுத்த உதவுங்கள்',
    'privacy_sharing':'தரவு பகிர்வு',
    'privacy_sharing_desc':'வேளாண் ஆராய்ச்சி நிறுவனங்களுடன் அநாமதேயமாக்கப்பட்ட தரவை பகிரவும்',
    'auth_login_title':'மீண்டும் வரவேற்கிறோம்','auth_login_subtitle':'விளைச்சல் கணிப்புக்கு உங்கள் கணக்கில் உள்நுழையவும்',
    'auth_signup_title':'வேளாண்-AIல் சேரவும்','auth_signup_subtitle':'விளைச்சல் கணிப்புக்கு உங்கள் கணக்கை உருவாக்கவும்',
    'auth_username':'பயனர் பெயர்','auth_password':'கடவுச்சொல்','auth_email':'மின்னஞ்சல் (விருப்பமானது)',
    'auth_full_name':'முழு பெயர்','auth_confirm_password':'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'auth_have_account':'ஏற்கனவே கணக்கு உள்ளதா?','auth_no_account':'கணக்கு இல்லையா?',
    'auth_signin_here':'இங்கே உள்நுழையவும்','auth_signup_here':'இங்கே பதிவு செய்யவும்'
},

// ─────────────────────────────────────────────────────────────────────────────
// KANNADA
// ─────────────────────────────────────────────────────────────────────────────
'kn': {
    'nav_overview':'ಅವಲೋಕನ','nav_technology':'ತಂತ್ರಜ್ಞಾನ','nav_map':'ನಕ್ಷೆ ಸಾಧನ',
    'nav_predict':'ಇಳುವರಿ ಅಂದಾಜು','nav_impact':'ಪ್ರಭಾವ','nav_settings':'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav_logout':'ಲಾಗ್ ಔಟ್','nav_soil_analysis':'ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ',
    'nav_growth_monitoring':'ಬೆಳವಣಿಗೆ ಮೇಲ್ವಿಚಾರಣೆ','nav_carbon_tracking':'ಕಾರ್ಬನ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    'site_title':'ಕೃಷಿ-AI ಇಳುವರಿ ಆಪ್ಟಿಮೈಜರ್','welcome':'ಸ್ವಾಗತ','loading':'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'save':'ಉಳಿಸಿ','cancel':'ರದ್ದು ಮಾಡಿ','submit':'ಸಲ್ಲಿಸಿ','reset':'ಮರುಹೊಂದಿಸಿ',
    'login':'ಲಾಗಿನ್','signup':'ಸೈನ್ ಅಪ್','logout':'ಲಾಗ್ ಔಟ್',
    'overview_title':'AI ಮೂಲಕ ಕೃಷಿಯಲ್ಲಿ ಕ್ರಾಂತಿ',
    'overview_subtitle':'ನಮ್ಮ ಸುಧಾರಿತ AI ವ್ಯವಸ್ಥೆ ಉಪಗ್ರಹ ಚಿತ್ರಣ, ಹವಾಮಾನ ಡೇಟಾ ಮತ್ತು ಯಂತ್ರ ಕಲಿಕೆಯನ್ನು ಸಂಯೋಜಿಸಿ ವಿಶ್ವಾದ್ಯಂತ ರೈತರಿಗೆ ನಿಖರ ಇಳುವರಿ ಅಂದಾಜುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    'feature_ai_title':'AI-ಚಾಲಿತ ಅಂದಾಜುಗಳು',
    'feature_ai_desc':'ಸುಧಾರಿತ ಯಂತ್ರ ಕಲಿಕೆ ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಅನೇಕ ಡೇಟಾ ಮೂಲಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ 95% ವರೆಗೆ ನಿಖರತೆಯೊಂದಿಗೆ ಇಳುವರಿ ಅಂದಾಜುಗಳನ್ನು ಒದಗಿಸುತ್ತವೆ.',
    'feature_global_title':'ಜಾಗತಿಕ ವ್ಯಾಪ್ತಿ',
    'feature_global_desc':'ನಮ್ಮ ವ್ಯವಸ್ಥೆ ವಿಶ್ವಾದ್ಯಂತ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಪ್ರಾದೇಶಿಕ ಹವಾಮಾನ ಮಾದರಿಗಳು ಮತ್ತು ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ಥಳೀಯ ಅಂದಾಜುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    'feature_realtime_title':'ರಿಯಲ್-ಟೈಮ್ ವಿಶ್ಲೇಷಣೆ',
    'feature_realtime_desc':'ರಿಯಲ್-ಟೈಮ್ ಡೇಟಾ ಸಂಸ್ಕರಣೆಯೊಂದಿಗೆ ತಕ್ಷಣದ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'tech_title':'ಅತ್ಯಾಧುನಿಕ AI ತಂತ್ರಜ್ಞಾನ',
    'tech_subtitle':'ನಮ್ಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಯಂತ್ರ ಕಲಿಕೆಯಲ್ಲಿ ಇತ್ತೀಚಿನ ಪ್ರಗತಿಯನ್ನು ಬಳಸಿಕೊಳ್ಳುತ್ತದೆ.',
    'tech_ml_title':'ಯಂತ್ರ ಕಲಿಕೆ','tech_satellite_title':'ಉಪಗ್ರಹ ಚಿತ್ರಣ',
    'map_title':'ಸಂವಾದಾತ್ಮಕ ಕೃಷಿ ನಕ್ಷೆ',
    'map_subtitle':'ನಮ್ಮ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ ಸಾಧನದೊಂದಿಗೆ ವಿಶ್ವಾದ್ಯಂತ ಕೃಷಿ ಪ್ರದೇಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    'map_satellite_title':'ಉಪಗ್ರಹ ಚಿತ್ರಣ','map_weather_title':'ಹವಾಮಾನ ಓವರ್‌ಲೇ',
    'map_analytics_title':'ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ','map_controls_title':'ನಕ್ಷೆ ನಿಯಂತ್ರಣಗಳು',
    'map_apply_filters':'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ','map_reset_filters':'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    'map_region_label':'ಪ್ರದೇಶ','map_crop_label':'ಬೆಳೆ ವಿಧ',
    'map_layer_label':'ಡೇಟಾ ಪದರ','map_time_label':'ಸಮಯ ಅವಧಿ',
    'map_active_filters':'ಸಕ್ರಿಯ ಫಿಲ್ಟರ್‌ಗಳು','map_data_info':'ನಕ್ಷೆ ಡೇಟಾ ಮಾಹಿತಿ',
    'predict_title':'AI-ಚಾಲಿತ ಇಳುವರಿ ಅಂದಾಜು',
    'predict_subtitle':'ಸುಧಾರಿತ ಯಂತ್ರ ಕಲಿಕೆ ಅಲ್ಗಾರಿದಮ್‌ಗಳನ್ನು ಬಳಸಿ ನಿಖರ ಬೆಳೆ ಇಳುವರಿ ಅಂದಾಜುಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'predict_crop_type':'ಬೆಳೆ ವಿಧ','predict_location':'ಸ್ಥಳ',
    'predict_field_size':'ಹೊಲದ ಗಾತ್ರ (ಎಕರೆ)','predict_planting_date':'ಬಿತ್ತನೆ ದಿನಾಂಕ',
    'predict_soil_type':'ಮಣ್ಣಿನ ವಿಧ','predict_irrigation':'ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ',
    'predict_fertilizer':'ಗೊಬ್ಬರ ಬಳಕೆ','predict_previous_yield':'ಹಿಂದಿನ ವರ್ಷದ ಇಳುವರಿ (ಟನ್/ಎಕರೆ)',
    'predict_generate':'ಅಂದಾಜು ರಚಿಸಿ',
    'predict_processing':'ಡೇಟಾ ವಿಶ್ಲೇಷಿಸಿ ಅಂದಾಜು ರಚಿಸಲಾಗುತ್ತಿದೆ...',
    'predict_additional_notes':'ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಕಾಮೆಂಟ್‌ಗಳು',
    'predict_minimum_acres':'ಕನಿಷ್ಠ: 0.1 ಎಕರೆ',
    'predict_planting_help':'ನೀವು ಯಾವಾಗ ಬಿತ್ತಿದ್ದೀರಿ ಅಥವಾ ಬಿತ್ತಲು ಯೋಜಿಸಿದ್ದೀರಿ?',
    'predict_yield_help':'ಐಚ್ಛಿಕ: ಅಂದಾಜು ನಿಖರತೆಯನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ',
    'predict_notes_help':'ಐಚ್ಛಿಕ: ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಸಂದರ್ಭವನ್ನು ಒದಗಿಸಿ',
    'predict_results_title':'ಇಳುವರಿ ಅಂದಾಜು ಫಲಿತಾಂಶಗಳು',
    'impact_title':'ವಿಶ್ವಾದ್ಯಂತ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸುವುದು',
    'impact_subtitle':'ನಮ್ಮ AI-ಚಾಲಿತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ವಿಶ್ವಾದ್ಯಂತ ಕೃಷಿ ಸಮುದಾಯಗಳಲ್ಲಿ ನಿಜವಾದ ಬದಲಾವಣೆಯನ್ನು ತರುತ್ತಿದೆ.',
    'impact_farmers':'ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಲಾಗಿದೆ','impact_yield':'ಇಳುವರಿ ಹೆಚ್ಚಳ',
    'impact_countries':'ದೇಶಗಳಲ್ಲಿ ಸೇವೆಗಳು','impact_savings':'ಸಂಪನ್ಮೂಲ ಉಳಿತಾಯ',
    'settings_title':'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'settings_subtitle':'ಥೀಮ್, ಭಾಷೆ, ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಅನುಭವವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ.',
    'settings_language':'ಭಾಷೆ ಮತ್ತು ಪ್ರದೇಶ',
    'soil_analysis_title':'AI ಮಣ್ಣು ವಿನ್ಯಾಸ ವಿಶ್ಲೇಷಣೆ',
    'soil_analysis_subtitle':'ನಿಮ್ಮ ಮಣ್ಣಿನ ಮಾದರಿಯ ಮ್ಯಾಕ್ರೋ ಫೋಟೋಗ್ರಾಫ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    'soil_upload_title':'ಮಣ್ಣಿನ ಮಾದರಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'soil_upload_subtitle':'ನಿಮ್ಮ ಮಣ್ಣಿನ ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ',
    'soil_results_title':'ಮಣ್ಣು ವಿನ್ಯಾಸ ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು',
    'soil_sandy':'ಮರಳು ಮಣ್ಣು','soil_loamy':'ಲೋಮಿ ಮಣ್ಣು','soil_clay':'ಜೇಡಿ ಮಣ್ಣು',
    'growth_monitoring_title':'ಬೆಳವಣಿಗೆ ಹಂತ ಮೇಲ್ವಿಚಾರಣೆ',
    'growth_monitoring_subtitle':'AI-ಚಾಲಿತ ಬೆಳವಣಿಗೆ ಹಂತ ಪತ್ತೆಯೊಂದಿಗೆ ಮೊಳಕೆಯಿಂದ ಕೊಯ್ಲಿನವರೆಗೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    'growth_add_crop':'ಮೇಲ್ವಿಚಾರಣೆಗೆ ಹೊಸ ಬೆಳೆ ಸೇರಿಸಿ','growth_crop_name':'ಬೆಳೆ ಹೆಸರು',
    'growth_variety':'ತಳಿ',
    'growth_stage_germination':'ಮೊಳಕೆ','growth_stage_seedling':'ಸಸಿ',
    'growth_stage_vegetative':'ಸಸ್ಯ ಬೆಳವಣಿಗೆ','growth_stage_flowering':'ಹೂಬಿಡುವಿಕೆ',
    'growth_stage_fruiting':'ಫಲ ಬಿಡುವಿಕೆ','growth_stage_harvest':'ಕೊಯ್ಲಿಗೆ ಸಿದ್ಧ',
    'carbon_tracking_title':'ಕಾರ್ಬನ್ ಹೆಜ್ಜೆಗುರುತು ಟ್ರ್ಯಾಕಿಂಗ್',
    'carbon_tracking_subtitle':'ನಿಮ್ಮ ಜಮೀನಿನ ಕಾರ್ಬನ್ ಸೀಕ್ವೆಸ್ಟ್ರೇಶನ್ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಗಳಿಸಿ.',
    'carbon_sequestered':'ಕಾರ್ಬನ್ ಸೀಕ್ವೆಸ್ಟರ್ಡ್','carbon_available_credits':'ಲಭ್ಯ ಕ್ರೆಡಿಟ್‌ಗಳು',
    'carbon_sell_credits':'ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಮಾರಿ','carbon_calculate_title':'ಕಾರ್ಬನ್ ಸೀಕ್ವೆಸ್ಟ್ರೇಶನ್ ಲೆಕ್ಕ ಹಾಕಿ',
    'carbon_farm_size':'ಜಮೀನಿನ ಗಾತ್ರ (ಎಕರೆ)','carbon_crop_type':'ಪ್ರಾಥಮಿಕ ಬೆಳೆ ವಿಧ',
    'carbon_farming_method':'ಕೃಷಿ ವಿಧಾನ',
    'carbon_tons_co2':'ಟನ್ CO₂ ಈ ವರ್ಷ','carbon_credits_ready':'ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳು ಮಾರಾಟಕ್ಕೆ ಸಿದ್ಧ',
    'feedback_title':'ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಬೆಂಬಲ',
    'feedback_subtitle':'ನಾವು ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಮೌಲ್ಯಯುತವಾಗಿ ಪರಿಗಣಿಸುತ್ತೇವೆ ಮತ್ತು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ.',
    'badge_overview':'ಅವಲೋಕನ','badge_technology':'ತಂತ್ರಜ್ಞಾನ','badge_map':'ನಕ್ಷೆ ಸಾಧನ',
    'badge_predictor':'ಇಳುವರಿ ಅಂದಾಜು','badge_impact':'ಜಾಗತಿಕ ಪ್ರಭಾವ',
    'settings_notifications':'ಅಧಿಸೂಚನೆಗಳು','settings_privacy':'ಗೌಪ್ಯತೆ ಮತ್ತು ಡೇಟಾ',
    'settings_performance':'ಕಾರ್ಯಕ್ಷಮತೆ','settings_account':'ಖಾತೆ ಮತ್ತು ಡೇಟಾ',
    'settings_need_help':'ಸಹಾಯ ಬೇಕೇ?',
    'notif_predictions':'ಅಂದಾಜು ನವೀಕರಣಗಳು',
    'notif_predictions_desc':'ಹೊಸ ಅಂದಾಜುಗಳು ಲಭ್ಯವಾದಾಗ ತಿಳಿಸಿ',
    'notif_weather':'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
    'notif_weather_desc':'ತೀವ್ರ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ',
    'notif_system':'ಸಿಸ್ಟಮ್ ನವೀಕರಣಗಳು',
    'notif_system_desc':'ಸಿಸ್ಟಮ್ ನಿರ್ವಹಣೆ ಮತ್ತು ನವೀಕರಣಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ',
    'privacy_analytics':'ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಬಳಕೆ ಡೇಟಾ',
    'privacy_analytics_desc':'ಅನಾಮಧೇಯ ಬಳಕೆ ಡೇಟಾ ಹಂಚಿಕೊಳ್ಳುವ ಮೂಲಕ ನಮ್ಮ ಸೇವೆಯನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡಿ',
    'privacy_sharing':'ಡೇಟಾ ಹಂಚಿಕೆ',
    'privacy_sharing_desc':'ಕೃಷಿ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಗಳೊಂದಿಗೆ ಅನಾಮಧೇಯ ಡೇಟಾ ಹಂಚಿಕೊಳ್ಳಿ',
    'auth_login_title':'ಮತ್ತೆ ಸ್ವಾಗತ','auth_login_subtitle':'ಇಳುವರಿ ಅಂದಾಜಿಗಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'auth_signup_title':'ಕೃಷಿ-AIಗೆ ಸೇರಿ','auth_signup_subtitle':'ಇಳುವರಿ ಅಂದಾಜಿಗಾಗಿ ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಿ',
    'auth_username':'ಬಳಕೆದಾರ ಹೆಸರು','auth_password':'ಪಾಸ್‌ವರ್ಡ್','auth_email':'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)',
    'auth_full_name':'ಪೂರ್ಣ ಹೆಸರು','auth_confirm_password':'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    'auth_have_account':'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?','auth_no_account':'ಖಾತೆ ಇಲ್ಲವೇ?',
    'auth_signin_here':'ಇಲ್ಲಿ ಸೈನ್ ಇನ್ ಮಾಡಿ','auth_signup_here':'ಇಲ್ಲಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ'
}

        }; // end translations

        this.init();
    }

    init() {
        // Apply translations as soon as possible — before DOMContentLoaded if DOM is ready
        if (typeof document !== 'undefined') {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this._initAfterDOM());
            } else {
                this._initAfterDOM();
            }
        }
    }

    _initAfterDOM() {
        // First pass — translate data-i18n elements immediately
        this.applyTranslations();

        // Second pass after a short delay — catches sidebar and any late-injected content
        setTimeout(() => {
            this.applyTranslations();
            this.setupLanguageSelector();
        }, 80);

        // Third pass after sidebar fully renders
        setTimeout(() => {
            this.applyTranslations();
            this.setupLanguageSelector();
        }, 300);

        // Watch for dynamically added content (sidebar, modals, etc.)
        if (typeof MutationObserver !== 'undefined') {
            let debounceTimer = null;
            const observer = new MutationObserver(() => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.applyTranslations();
                    this.setupLanguageSelector();
                }, 50);
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    translate(key) {
        const t = this.translations[this.currentLanguage];
        if (t && t[key]) return t[key];
        // fallback to English
        const en = this.translations['en-in'];
        return (en && en[key]) ? en[key] : key;
    }

    setLanguage(languageCode) {
        if (!this.translations[languageCode]) {
            console.warn(`Language '${languageCode}' not supported. Falling back to 'en-in'.`);
            languageCode = 'en-in';
        }
        this.currentLanguage = languageCode;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('agri-ai-language', languageCode);
        }

        // Clear previously translated markers so DOM walker re-runs fresh
        if (typeof document !== 'undefined') {
            document.querySelectorAll('[data-translated]').forEach(el => {
                el.removeAttribute('data-translated');
            });
        }

        this.applyTranslations();
        this.setupLanguageSelector();

        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: languageCode } }));
        }
        console.log(`🌐 Language changed to: ${languageCode}`);
    }

    applyTranslations() {
        if (typeof document === 'undefined') return;

        // 1. Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (element.tagName === 'INPUT' && ['text','email','password','number'].includes(element.type)) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // 2. Translate page title
        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) titleEl.textContent = this.translate(titleEl.getAttribute('data-i18n'));

        // 3. Fix impact.html duplicate key bug — stat numbers must stay as numbers
        this._fixImpactStats();

        // 4. Smart DOM translation for hardcoded text (non-English languages only)
        if (this.currentLanguage !== 'en-in') {
            this._translateHardcodedText();
        }

        // 5. Update document language attribute
        document.documentElement.lang = this.currentLanguage;
        console.log(`🌐 Translations applied: ${this.currentLanguage}`);
    }

    _fixImpactStats() {
        // impact.html uses same data-i18n key on both the number and the label
        // Fix: restore the stat numbers which get overwritten
        const statNumbers = {
            'impact_farmers': '50K+',
            'impact_yield': '25%',
            'impact_countries': '100+',
            'impact_savings': '30%'
        };
        const statLabels = {
            'impact_farmers': { 'en-in':'Farmers Helped','te':'రైతులకు సహాయం','hi':'किसानों की मदद','ta':'விவசாயிகளுக்கு உதவி','kn':'ರೈತರಿಗೆ ಸಹಾಯ' },
            'impact_yield':   { 'en-in':'Yield Increase','te':'దిగుబడి పెరుగుదల','hi':'उपज वृद्धि','ta':'விளைச்சல் அதிகரிப்பு','kn':'ಇಳುವರಿ ಹೆಚ್ಚಳ' },
            'impact_countries':{ 'en-in':'Countries Served','te':'దేశాలలో సేవలు','hi':'देशों में सेवाएं','ta':'நாடுகளில் சேவைகள்','kn':'ದೇಶಗಳಲ್ಲಿ ಸೇವೆಗಳು' },
            'impact_savings': { 'en-in':'Resource Savings','te':'వనరుల ఆదా','hi':'संसाधन बचत','ta':'வள சேமிப்பு','kn':'ಸಂಪನ್ಮೂಲ ಉಳಿತಾಯ' }
        };
        Object.keys(statNumbers).forEach(key => {
            const els = document.querySelectorAll(`[data-i18n="${key}"]`);
            if (els.length >= 2) {
                els[0].textContent = statNumbers[key]; // first = number, keep as-is
                const lang = this.currentLanguage;
                els[1].textContent = (statLabels[key][lang] || statLabels[key]['en-in']);
            }
        });
    }

    _translateHardcodedText() {
        const lang = this.currentLanguage;
        const map = this._getHardcodedTextMap(lang);
        if (!map) return;

        // Walk all text nodes and translate matching strings
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    // Skip script, style, and already-translated nodes
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName;
                    if (['SCRIPT','STYLE','NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
                    if (parent.hasAttribute('data-i18n')) return NodeFilter.FILTER_REJECT;
                    if (parent.hasAttribute('data-translated')) return NodeFilter.FILTER_REJECT;
                    const text = node.textContent.trim();
                    if (!text) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodesToTranslate = [];
        let node;
        while ((node = walker.nextNode())) {
            nodesToTranslate.push(node);
        }

        nodesToTranslate.forEach(textNode => {
            const original = textNode.textContent.trim();
            if (map[original]) {
                textNode.textContent = textNode.textContent.replace(original, map[original]);
                if (textNode.parentElement) {
                    textNode.parentElement.setAttribute('data-translated', 'true');
                }
            }
        });

        // Also translate select option text
        document.querySelectorAll('select option').forEach(opt => {
            const text = opt.textContent.trim();
            if (map[text]) opt.textContent = map[text];
        });

        // Translate placeholder attributes not covered by data-i18n
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            if (el.hasAttribute('data-i18n')) return;
            const ph = el.getAttribute('placeholder');
            if (ph && map[ph]) el.setAttribute('placeholder', map[ph]);
        });
    }

    _getHardcodedTextMap(lang) {
        const maps = {
            'te': {
                // Header page labels
                'Dashboard': 'డాష్‌బోర్డ్', 'Overview': 'అవలోకనం', 'Technology': 'సాంకేతికత',
                'Map Tool': 'మ్యాప్ టూల్', 'Predict Yield': 'దిగుబడి అంచనా', 'Impact': 'ప్రభావం',
                'Settings': 'సెట్టింగ్స్', 'Soil Analysis': 'మట్టి విశ్లేషణ',
                'Growth Monitor': 'వృద్ధి పర్యవేక్షణ', 'Carbon Tracking': 'కార్బన్ ట్రాకింగ్',
                'Feedback': 'అభిప్రాయం',
                // Section badges
                'OVERVIEW': 'అవలోకనం', 'TECHNOLOGY': 'సాంకేతికత', 'MAP TOOL': 'మ్యాప్ టూల్',
                'YIELD PREDICTOR': 'దిగుబడి అంచనా', 'GLOBAL IMPACT': 'గ్లోబల్ ప్రభావం',
                // Overview page
                'AI-Powered Predictions': 'AI-శక్తితో కూడిన అంచనాలు',
                'Global Coverage': 'గ్లోబల్ కవరేజ్', 'Real-time Analytics': 'రియల్-టైమ్ అనలిటిక్స్',
                'Expert Recommendations': 'నిపుణుల సిఫార్సులు', 'Historical Analysis': 'చారిత్రక విశ్లేషణ',
                'Mobile Friendly': 'మొబైల్ ఫ్రెండ్లీ',
                'Prediction Accuracy': 'అంచనా ఖచ్చితత్వం', 'Farmers Served': 'రైతులకు సేవ',
                'Countries Covered': 'కవర్ చేసిన దేశాలు', 'Support Available': 'మద్దతు అందుబాటులో',
                // Technology page
                'Cutting-Edge AI Technology': 'అత్యాధునిక AI టెక్నాలజీ',
                'Machine Learning': 'మెషిన్ లెర్నింగ్', 'Satellite Imagery': 'సాటిలైట్ ఇమేజరీ',
                'Weather Analytics': 'వాతావరణ అనలిటిక్స్', 'Soil Analysis': 'మట్టి విశ్లేషణ',
                'Big Data Processing': 'బిగ్ డేటా ప్రాసెసింగ్', 'IoT Integration': 'IoT ఇంటిగ్రేషన్',
                'Our Technology Stack': 'మా టెక్నాలజీ స్టాక్',
                // Impact page
                'Environmental Sustainability': 'పర్యావరణ స్థిరత్వం',
                'Economic Growth': 'ఆర్థిక వృద్ధి', 'Food Security': 'ఆహార భద్రత',
                'Digital Inclusion': 'డిజిటల్ చేర్పు', 'Knowledge Transfer': 'జ్ఞాన బదిలీ',
                'Community Impact': 'సమాజ ప్రభావం', 'Success Stories': 'విజయ గాథలు',
                'Real farmers, real results from around the world': 'ప్రపంచవ్యాప్తంగా నిజమైన రైతులు, నిజమైన ఫలితాలు',
                // Settings page
                'Language & Region': 'భాష మరియు ప్రాంతం', 'Language': 'భాష', 'Units': 'యూనిట్లు',
                'Notifications': 'నోటిఫికేషన్లు', 'Prediction Updates': 'అంచనా నవీకరణలు',
                'Get notified when new predictions are available': 'కొత్త అంచనాలు అందుబాటులో ఉన్నప్పుడు తెలియజేయండి',
                'Weather Alerts': 'వాతావరణ హెచ్చరికలు',
                'Receive alerts for severe weather conditions': 'తీవ్రమైన వాతావరణ పరిస్థితులకు హెచ్చరికలు అందుకోండి',
                'System Updates': 'సిస్టమ్ నవీకరణలు',
                'Get notified about system maintenance and updates': 'సిస్టమ్ నిర్వహణ మరియు నవీకరణల గురించి తెలియజేయండి',
                'Privacy & Data': 'గోప్యత మరియు డేటా',
                'Analytics & Usage Data': 'అనలిటిక్స్ మరియు వినియోగ డేటా',
                'Help improve our service by sharing anonymous usage data': 'అనామక వినియోగ డేటాను పంచుకోవడం ద్వారా మా సేవను మెరుగుపరచడంలో సహాయం చేయండి',
                'Data Sharing': 'డేటా భాగస్వామ్యం',
                'Share anonymized data with agricultural research institutions': 'వ్యవసాయ పరిశోధన సంస్థలతో అనామకీకరించిన డేటాను పంచుకోండి',
                'Performance': 'పనితీరు', 'Animation Level': 'యానిమేషన్ స్థాయి',
                'No Animations': 'యానిమేషన్లు లేవు', 'Reduced Animations': 'తగ్గించిన యానిమేషన్లు',
                'Normal Animations': 'సాధారణ యానిమేషన్లు', 'Enhanced Animations': 'మెరుగైన యానిమేషన్లు',
                'Account & Data': 'ఖాతా మరియు డేటా', 'Export Data': 'డేటా ఎగుమతి',
                'Import Data': 'డేటా దిగుమతి', 'Need Help?': 'సహాయం కావాలా?',
                '24/7 Help Line': '24/7 సహాయ లైన్',
                'Call for immediate assistance': 'తక్షణ సహాయం కోసం కాల్ చేయండి',
                'India:': 'భారతదేశం:', 'International:': 'అంతర్జాతీయ:', 'WhatsApp:': 'వాట్సాప్:',
                'Available 24/7 • Multilingual Support': '24/7 అందుబాటులో • బహుభాషా మద్దతు',
                'Send Feedback': 'అభిప్రాయం పంపండి',
                'Report issues or suggestions': 'సమస్యలు లేదా సూచనలు నివేదించండి',
                'Metric (kg, hectares)': 'మెట్రిక్ (కిలో, హెక్టార్లు)',
                'Imperial (lbs, acres)': 'ఇంపీరియల్ (పౌండ్లు, ఎకరాలు)',
                // Predict page
                'Crop Type': 'పంట రకం', 'Location': 'స్థానం', 'Field Size (acres)': 'పొలం పరిమాణం (ఎకరాలు)',
                'Planting Date': 'విత్తన తేదీ', 'Soil Type': 'మట్టి రకం',
                'Irrigation System': 'నీటిపారుదల వ్యవస్థ', 'Fertilizer Usage': 'ఎరువుల వాడకం',
                'Previous Year Yield (tons/acre)': 'గత సంవత్సర దిగుబడి (టన్నులు/ఎకరం)',
                'Additional Notes & Comments': 'అదనపు గమనికలు మరియు వ్యాఖ్యలు',
                'Generate Prediction': 'అంచనా రూపొందించండి',
                'Select Crop Type': 'పంట రకాన్ని ఎంచుకోండి',
                'Select Soil Type': 'మట్టి రకాన్ని ఎంచుకోండి',
                'Select Irrigation Type': 'నీటిపారుదల రకాన్ని ఎంచుకోండి',
                'Select Fertilizer Level': 'ఎరువుల స్థాయిని ఎంచుకోండి',
                // Soil analysis
                'Upload Soil Sample Photo': 'మట్టి నమూనా ఫోటో అప్‌లోడ్ చేయండి',
                'Drop your soil photo here': 'మీ మట్టి ఫోటోను ఇక్కడ వదలండి',
                'or click to browse files': 'లేదా ఫైళ్లను బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
                'Choose File': 'ఫైల్ ఎంచుకోండి',
                'Photography Tips for Best Results': 'ఉత్తమ ఫలితాల కోసం ఫోటోగ్రఫీ చిట్కాలు',
                'Sandy Soil': 'ఇసుక మట్టి', 'Loamy Soil': 'లోమీ మట్టి', 'Clay Soil': 'బంకమట్టి',
                'Primary Soil Type Detected': 'ప్రాథమిక మట్టి రకం గుర్తించబడింది',
                'Recommended Crops for Your Soil': 'మీ మట్టికి సిఫార్సు చేయబడిన పంటలు',
                'Soil Improvement Tips': 'మట్టి మెరుగుదల చిట్కాలు',
                'Analyzing Soil Texture...': 'మట్టి ఆకృతిని విశ్లేషిస్తోంది...',
                // Growth monitoring
                'Add New Crop to Monitor': 'పర్యవేక్షించడానికి కొత్త పంటను జోడించండి',
                'Crop Name': 'పంట పేరు', 'Variety': 'రకం', 'Field Location': 'పొలం స్థానం',
                'Start Monitoring Crop': 'పంట పర్యవేక్షణ ప్రారంభించండి',
                'No Crops Being Monitored': 'పర్యవేక్షించబడుతున్న పంటలు లేవు',
                'Crop Details': 'పంట వివరాలు',
                // Carbon tracking
                'Carbon Sequestered': 'కార్బన్ సీక్వెస్టర్డ్',
                'Available Credits': 'అందుబాటులో ఉన్న క్రెడిట్‌లు',
                'Estimated Value': 'అంచనా విలువ', 'Sell Credits': 'క్రెడిట్‌లను అమ్మండి',
                'Calculate Carbon Sequestration': 'కార్బన్ సీక్వెస్ట్రేషన్‌ను లెక్కించండి',
                'Farm Size (acres)': 'వ్యవసాయ పరిమాణం (ఎకరాలు)',
                'Primary Crop Type': 'ప్రాథమిక పంట రకం', 'Farming Method': 'వ్యవసాయ పద్ధతి',
                'Calculate Carbon Impact': 'కార్బన్ ప్రభావాన్ని లెక్కించండి',
                'Carbon Impact Analysis': 'కార్బన్ ప్రభావ విశ్లేషణ',
                'Carbon Credits Marketplace': 'కార్బన్ క్రెడిట్‌ల మార్కెట్‌ప్లేస్',
                'Request Verification': 'ధృవీకరణ అభ్యర్థించండి',
                'List Credits for Sale': 'అమ్మకానికి క్రెడిట్‌లను జాబితా చేయండి',
                // Feedback page
                'General Feedback': 'సాధారణ అభిప్రాయం', 'Report a Bug': 'బగ్ నివేదించండి',
                'Get Support': 'మద్దతు పొందండి', 'Your Name': 'మీ పేరు',
                'Email Address': 'ఇమెయిల్ చిరునామా', 'Category': 'వర్గం',
                'Your Feedback': 'మీ అభిప్రాయం', 'Submit Feedback': 'అభిప్రాయం సమర్పించండి',
                'Bug Title': 'బగ్ శీర్షిక', 'Priority Level': 'ప్రాధాన్యత స్థాయి',
                'Page/Feature Affected': 'ప్రభావిత పేజీ/ఫీచర్',
                'Detailed Description': 'వివరణాత్మక వివరణ', 'Report Bug': 'బగ్ నివేదించండి',
                'Subject': 'విషయం', 'Detailed Message': 'వివరణాత్మక సందేశం',
                'Submit Support Request': 'మద్దతు అభ్యర్థన సమర్పించండి',
                'Clear Form': 'ఫారమ్ క్లియర్ చేయండి',
                'Email Support': 'ఇమెయిల్ మద్దతు', 'Live Chat': 'లైవ్ చాట్',
                'Documentation': 'డాక్యుమెంటేషన్', 'Get help via email': 'ఇమెయిల్ ద్వారా సహాయం పొందండి',
                'Chat with our team': 'మా బృందంతో చాట్ చేయండి',
                'Browse our help docs': 'మా సహాయ డాక్స్ బ్రౌజ్ చేయండి',
                'Start Chat': 'చాట్ ప్రారంభించండి', 'View Docs': 'డాక్స్ చూడండి',
                // Map page
                'Interactive Agricultural Map': 'ఇంటరాక్టివ్ వ్యవసాయ మ్యాప్',
                'Map Controls & Filters': 'మ్యాప్ నియంత్రణలు మరియు ఫిల్టర్లు',
                'Region': 'ప్రాంతం', 'Crop Type': 'పంట రకం', 'Data Layer': 'డేటా లేయర్',
                'Time Period': 'సమయ వ్యవధి', 'Apply Filters': 'ఫిల్టర్లను వర్తింపజేయండి',
                'Reset Filters': 'ఫిల్టర్లను రీసెట్ చేయండి',
                'Global View': 'గ్లోబల్ వ్యూ', 'North America': 'ఉత్తర అమెరికా',
                'South America': 'దక్షిణ అమెరికా', 'Europe': 'యూరప్', 'Asia': 'ఆసియా',
                'Africa': 'ఆఫ్రికా', 'Oceania': 'ఓషియానియా',
                'All Crops': 'అన్ని పంటలు', 'Satellite View': 'సాటిలైట్ వ్యూ',
                'Weather Data': 'వాతావరణ డేటా', 'Soil Health': 'మట్టి ఆరోగ్యం',
                'Yield Predictions': 'దిగుబడి అంచనాలు', 'Historical Data': 'చారిత్రక డేటా',
                'Terrain': 'భూభాగం', 'Current': 'ప్రస్తుత',
                'Last 7 Days': 'చివరి 7 రోజులు', 'Last 30 Days': 'చివరి 30 రోజులు',
                'Last Season': 'చివరి సీజన్', 'Last Year': 'చివరి సంవత్సరం',
                'Last 5 Years': 'చివరి 5 సంవత్సరాలు',
                // Auth pages
                'Sign In': 'సైన్ ఇన్', 'Create Account': 'ఖాతా సృష్టించండి',
                'Full Name': 'పూర్తి పేరు', 'Username': 'వినియోగదారు పేరు',
                'Email (Optional)': 'ఇమెయిల్ (ఐచ్ఛికం)', 'Password': 'పాస్‌వర్డ్',
                'Confirm Password': 'పాస్‌వర్డ్ నిర్ధారించండి',
                "Don't have an account?": 'ఖాతా లేదా?',
                'Already have an account?': 'ఇప్పటికే ఖాతా ఉందా?',
                'Sign up here': 'ఇక్కడ సైన్ అప్ చేయండి',
                'Sign in here': 'ఇక్కడ సైన్ ఇన్ చేయండి',
                'By signing up, you agree to our Terms of Service': 'సైన్ అప్ చేయడం ద్వారా, మీరు మా సేవా నిబంధనలకు అంగీకరిస్తున్నారు',
            }
        };

        // For Hindi, Tamil, Kannada — build from the same English keys using translation lookup
        ['hi','ta','kn'].forEach(l => {
            if (!maps[l]) {
                maps[l] = {};
                // Reuse the Telugu map structure but with the correct language translations
                const enKeys = Object.keys(maps['te']);
                enKeys.forEach(enText => {
                    // Try to find a matching translation key
                    const t = this.translations[l];
                    if (!t) return;
                    // Find the key whose English value matches enText
                    const enT = this.translations['en-in'];
                    const matchKey = Object.keys(enT).find(k => enT[k] === enText);
                    if (matchKey && t[matchKey]) {
                        maps[l][enText] = t[matchKey];
                    }
                });
            }
        });

        return maps[lang] || null;
    }

    setupLanguageSelector() {
        if (typeof document === 'undefined') return;

        const selectors = document.querySelectorAll('#language-select, .language-selector');
        selectors.forEach(selector => {
            if (!selector || selector.dataset.listenerAttached) return;

            // Populate options
            this.populateLanguageSelector(selector);

            // Attach listener once
            selector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
            selector.dataset.listenerAttached = 'true';
        });

        // Sync all selectors to current language
        document.querySelectorAll('#language-select, .language-selector').forEach(s => {
            if (s.value !== this.currentLanguage) s.value = this.currentLanguage;
        });
    }

    getCurrentLanguage() { return this.currentLanguage; }
    getAvailableLanguages() { return Object.keys(this.translations); }

    getLanguageDisplayName(code) {
        const names = {
            'en-in': '🇮🇳 English',
            'te':    '🇮🇳 తెలుగు',
            'hi':    '🇮🇳 हिंदी',
            'ta':    '🇮🇳 தமிழ்',
            'kn':    '🇮🇳 ಕನ್ನಡ'
        };
        return names[code] || code;
    }

    populateLanguageSelector(selector) {
        if (!selector) return;
        selector.innerHTML = '';
        this.getAvailableLanguages().forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = this.getLanguageDisplayName(code);
            if (code === this.currentLanguage) option.selected = true;
            selector.appendChild(option);
        });
    }
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.translationSystem = new TranslationSystem();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationSystem;
}
