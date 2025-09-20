# Vercel Deployment for VisionCare Optics

## 🚀 Deployment Configuration

This project is configured for seamless deployment on Vercel with the following setup:

### 📁 Build Process
```bash
npm run build
```
- Combines all components into `public/index.html`
- Copies `styles.css` and `script.js` to `public/`
- Generates production-ready files

### ⚙️ Vercel Settings
- **Framework**: Static Site
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

### 🌐 File Structure After Build
```
public/
├── index.html      # Combined components file
├── styles.css      # Stylesheet
└── script.js       # JavaScript modules
```

### 🔧 Configuration Files
- `vercel.json` - Vercel deployment configuration
- `package.json` - Build scripts and dependencies
- `build-components.js` - Component compilation script

### 📋 Deployment Steps
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel automatically detects configuration
4. Build process combines components
5. Site deploys from `public/` directory

### 🛠️ Local Development
```bash
# Build and serve locally
npm run start

# Just build (no server)
npm run build

# Clean build files
npm run clean
```

### 🎯 Features
- Component-based architecture
- Automatic build process
- Static file optimization
- Security headers configured
- Cache control for assets

---

**Live Site**: Your Vercel deployment URL will appear here after deployment
**Repository**: https://github.com/prthamesh-pr/Optical-Shop