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
| **Interactive Map** | Google Maps integration for agricultural region visualization |

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
- **Maps**: Google Maps Embed API
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
├── maptool.html            # Agricultural map viewer
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

## 🌐 Deployment

### Render
Already configured — just connect your GitHub repo and deploy. See `render.yaml`.

### Any Node.js Host
```bash
npm install
NODE_ENV=production PORT=3000 node simple-server.js
```

## 📜 License

MIT
