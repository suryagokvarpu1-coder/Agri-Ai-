# 🌾 Agri-AI — AI-Powered Agriculture Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/suryagokvarpu1-coder/Agri-Ai-)

A production-ready web application for precision farming with AI-powered yield predictions, soil analysis, growth monitoring, and carbon tracking.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs at http://localhost:3000
```

## 📋 Features

| Feature | Description |
|---------|-------------|
| **Yield Prediction** | AI-powered crop yield prediction using soil, irrigation, and fertilizer data |
| **Soil Analysis** | Upload soil photos for texture classification (Sandy / Loamy / Clay) |
| **Growth Monitoring** | Track crops from germination to harvest with countdown timers |
| **Carbon Tracking** | Calculate carbon sequestration and estimated carbon credit earnings |
| **Satellite Intelligence** | Leaflet.js + Esri World Imagery for professional agricultural visualization |

## 🔬 Prediction Engine

The yield prediction uses scientifically-backed parameters:

- **Base yields**: FAO crop-specific averages (kg/acre)
- **Soil multipliers**: Loam (1.0), Clay (0.88), Sandy (0.72), Silt (0.95), etc.
- **Irrigation factors**: Drip (+20%), Sprinkler (+10%), Rainfed (-25%)
- **Fertilizer impact**: High (+18%), Medium (baseline), Organic (+5%), Low (-18%)
- **Harvest estimation**: Crop-specific days-to-maturity (wheat 120d, rice 130d, sugarcane 330d)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js (zero-dependency server)
- **Styling**: Custom CSS with glassmorphism + agriculture theme
- **3D Effects**: Three.js particle system with organic firefly/pollen animations
- **Charts**: Chart.js for carbon projections
- **Maps**: Leaflet.js with Esri World Imagery (High-Res)
- **Auth**: Session-based with localStorage persistence

## 📁 Project Structure

```
├── index.html              # Splash/landing page
├── login.html              # Authentication
├── signup.html             # New user registration
├── overview.html           # Main dashboard
├── predict.html            # Yield prediction
├── soil-analysis.html      # AI soil texture analysis
├── growth-monitoring.html  # Crop growth tracker
├── carbon-tracking.html    # Carbon footprint calculator
├── satellite-tool.html     # High-resolution satellite map viewer
├── technology.html         # Platform technology info
├── impact.html             # Environmental impact
├── feedback.html           # User feedback forms
├── settings.html           # User preferences
├── simple-server.js        # Production Node.js server
├── ui-theme.css            # Design system (colors, fonts, animations)
├── page-shell.css          # Page layout components
├── 3d-theme.css            # 3D effects and particles
├── 3d-animations.js        # Three.js background engine
├── sidebar-navigation.js   # Navigation system
├── auth.js                 # Authentication logic
├── translations.js         # Multi-language support
└── assets/images/          # Generated hero images
```

## 🔒 Firebase Integration & Setup

Agri-AI integrates **Firebase Authentication** for secure Google Sign-In and **Cloud Firestore** to store user profiles and history.

### 1. Firebase Setup Instructions
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** in the project, and add **Google** as a Sign-in Provider.
3. Enable **Cloud Firestore** database.
4. Go to Project Settings and create a Web App to get your configuration keys.
5. Apply the Firestore Security Rules from the `firestore.rules` file in the root of the project to your database.

### 2. Environment Variables Configuration
Create a `.env` file in the root directory of the project (this file is ignored by Git). Add your Firebase Web App credentials as follows:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id
```

### 3. Firestore Collections Schema
The application creates and manages the following Firestore collections:
- **`users`**: Stores user profiles.
  - Document ID: `uid`
  - Fields: `uid`, `username`, `fullName`, `email`, `photoURL`, `role`, `createdAt`, `lastLogin`, `loginCount`
- **`soil_analyses`**: Stores detailed soil classification runs.
  - Fields: `uid`, `dominantType`, `percentages` (sandy/loamy/clay/organic), `confidence`, `timestamp`
- **`yield_predictions`**: Stores crop yield prediction inputs and outputs.
  - Fields: `uid`, `crop`, `location`, `fieldSize`, `predictedYield`, `totalProduction`, `confidence`, `factors` (soil, irrigation, elevation), `timestamp`
- **`saved_reports`**: A unified reports collection to display historical data on the farm dashboard history panel.
  - Fields: `uid`, `type` (soil_analysis/yield_prediction), `title`, `summary`, `timestamp`, `details` (full structured results)

---

## 🌐 Deployment

### Render
Already configured — just connect your GitHub repo, define your Environment Variables in the Render Dashboard matching the keys in `.env`, and deploy. See `render.yaml`.

### Any Node.js Host
```bash
# Copy env template and fill out credentials
cp .env.example .env
nano .env

# Install dependencies and start
npm install
npm start
```

## 📜 License

MIT
