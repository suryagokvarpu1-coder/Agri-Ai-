# Agri-AI Yield Optimizer

A modern agricultural AI platform with separate pages for optimal user experience. Features AI-powered yield predictions, interactive maps, technology showcase, and comprehensive settings management.

## 🌾 Features

### Core Pages
- **Landing Page**: Welcome and authentication flow
- **Overview**: Feature showcase and platform capabilities
- **Technology**: AI technology and tech stack information
- **Map Tool**: Interactive agricultural mapping with controls
- **Predict Yield**: AI-powered crop yield prediction form
- **Impact**: Global impact metrics and success stories
- **Settings**: Comprehensive user preferences and data management

### Key Functionality
- **AI Predictions**: Advanced machine learning yield forecasting
- **Interactive Maps**: Global agricultural data visualization
- **Multi-language Support**: 13+ languages including Indian languages
- **Dark Theme**: Premium modern interface
- **Responsive Design**: Works on all devices
- **Authentication**: Secure user login and registration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)

### Installation & Setup

1. **Start the server**
   ```bash
   node simple-server.js
   ```

2. **Access the application**
   - Main Application: `http://localhost:3000` (redirects to signup for new users)
   - Signup (Primary): `http://localhost:3000/signup.html`
   - Login (Existing users): `http://localhost:3000/login.html`

### Default Credentials
- **Admin**: username: `admin`, password: `admin123`
- **Or create a new user account via signup**

## 📁 Project Structure

```
agri-ai-yield-optimizer/
├── index.html              # Landing page (redirects to signup/overview)
├── login.html              # User login
├── signup.html             # User registration (primary entry point)
├── overview.html           # Platform overview (main dashboard)
├── technology.html         # Technology showcase
├── maptool.html           # Interactive map tool
├── predict.html           # Yield prediction form
├── impact.html            # Global impact metrics
├── settings.html          # User settings management
├── simple-server.js       # Main server with API endpoints
├── users-data.json        # User data storage
├── package.json           # Dependencies
└── README.md             # This file
```

## 🔧 Server Configuration

The `simple-server.js` provides:
- **Port**: 3001 (configurable via PORT env var)
- **Authentication**: JWT-based session management
- **Data Storage**: JSON file-based user storage
- **API Endpoints**: RESTful API for all functionality

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Predictions
- `POST /api/predict` - Generate yield prediction
- `GET /api/user/predictions` - Get prediction history

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🌍 Multi-language Support

Supported languages:
- English (US/India)
- Hindi (हिन्दी)
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Gujarati (ગુજરાતી)
- Marathi (मराठी)
- Bengali (বাংলা)
- Punjabi (ਪੰਜਾਬੀ)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)

## 🧪 Testing the Application

1. **Start Server**: `node simple-server.js`
2. **Open Browser**: Go to `http://localhost:3000`
3. **Test Flow**:
   - Login or create account
   - Navigate through all pages
   - Test prediction form
   - Adjust settings
   - Test logout

## 📱 Features by Page

### Overview Page
- 6 feature cards with animations
- Platform statistics
- Key capabilities showcase

### Technology Page
- AI technology explanations
- Tech stack visualization
- Innovation highlights

### Map Tool Page
- Interactive Google Maps
- Agricultural data layers
- Filter controls and options

### Predict Yield Page
- Comprehensive prediction form
- Real-time processing
- Results with recommendations

### Impact Page
- Global impact statistics
- Success stories
- Environmental benefits

### Settings Page
- Theme selection (Light/Dark/Auto)
- Language preferences
- Notification controls
- Data export/import
- Privacy settings

## 🛡️ Security Features

- JWT-based authentication
- Token validation on all protected pages
- Secure logout functionality
- Input validation and sanitization
- Session management

## 📄 Documentation

- `SEPARATE_PAGES_COMPLETE.md` - Detailed implementation guide
- Inline code comments for maintenance
- API endpoint documentation in server file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Modern Agricultural AI Platform - Built for Farmers Worldwide** 🌾