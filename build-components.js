/*
==========================================================================
                        COMPONENT BUILDER SCRIPT
                     Combines HTML components into single file
==========================================================================
*/

const fs = require('fs');
const path = require('path');

// Component configuration in loading order
const components = [
    { file: 'components/hero.html', placeholder: '<!-- HERO_COMPONENT -->' },
    { file: 'components/about.html', placeholder: '<!-- ABOUT_COMPONENT -->' },
    { file: 'components/services.html', placeholder: '<!-- SERVICES_COMPONENT -->' },
    { file: 'components/technology.html', placeholder: '<!-- TECHNOLOGY_COMPONENT -->' },
    { file: 'components/eye-model.html', placeholder: '<!-- EYE_MODEL_COMPONENT -->' },
    { file: 'components/testimonials.html', placeholder: '<!-- TESTIMONIALS_COMPONENT -->' },
    { file: 'components/contact.html', placeholder: '<!-- CONTACT_COMPONENT -->' },
    { file: 'components/footer.html', placeholder: '<!-- FOOTER_COMPONENT -->' }
];

// Template HTML structure
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisionCare Optics - Premium Eye Care Solutions</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <!-- 3D Model Viewer -->
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
</head>
<body>
    <!--
    ==========================================================================
                            COMPONENT-BASED WEBSITE
                        Built from modular components
    ==========================================================================
    -->
    
    <!-- Navigation -->
    <nav class="navbar glass">
        <div class="nav-container">
            <div class="nav-logo">
                <i class="fas fa-eye"></i>
                <span>VisionCare</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#technology" class="nav-link">Technology</a></li>
                <li><a href="#eye-model" class="nav-link">3D Model</a></li>
                <li><a href="#testimonials" class="nav-link">Testimonials</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="theme-toggle">
                <button id="toggleTheme" class="theme-btn">
                    <i class="fas fa-moon" id="theme-icon"></i>
                </button>
            </div>
            <div class="mobile-nav-toggle">
                <button id="mobileMenuBtn" class="theme-btn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile Navigation -->
    <div class="mobile-nav-overlay"></div>
    <div class="mobile-nav-drawer">
        <div class="mobile-nav-header">
            <div class="nav-logo">
                <i class="fas fa-eye"></i>
                <span>VisionCare</span>
            </div>
            <button id="closeMobileMenuBtn" class="theme-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <ul class="mobile-nav-menu">
            <li><a href="#home" class="mobile-nav-link">Home</a></li>
            <li><a href="#about" class="mobile-nav-link">About</a></li>
            <li><a href="#services" class="mobile-nav-link">Services</a></li>
            <li><a href="#technology" class="mobile-nav-link">Technology</a></li>
            <li><a href="#eye-model" class="mobile-nav-link">3D Model</a></li>
            <li><a href="#testimonials" class="mobile-nav-link">Testimonials</a></li>
            <li><a href="#contact" class="mobile-nav-link">Contact</a></li>
        </ul>
        <div class="mobile-theme-toggle">
            <button id="mobileToggleTheme" class="theme-btn">
                <i class="fas fa-moon" id="mobile-theme-icon"></i>
            </button>
            <span>Toggle Theme</span>
        </div>
    </div>

    <!-- MAIN CONTENT SECTIONS -->
    <!-- HERO_COMPONENT -->
    <!-- ABOUT_COMPONENT -->
    <!-- SERVICES_COMPONENT -->
    <!-- TECHNOLOGY_COMPONENT -->
    <!-- EYE_MODEL_COMPONENT -->
    <!-- TESTIMONIALS_COMPONENT -->
    <!-- CONTACT_COMPONENT -->
    <!-- FOOTER_COMPONENT -->

    <!-- Decorative Elements -->
    <div class="gradient-circle circle1"></div>
    <div class="gradient-circle circle2"></div>
    <div class="gradient-circle circle3"></div>
    <div class="gradient-circle circle4"></div>

    <!-- JavaScript -->
    <script src="script.js"></script>
</body>
</html>`;

// Function to clean component content (remove comment headers)
function cleanComponentContent(content) {
    // Remove the comment header section
    const lines = content.split('\n');
    const startIndex = lines.findIndex(line => 
        line.includes('<section') || line.includes('<div id="eyeTestModal') || line.includes('<footer')
    );
    
    if (startIndex !== -1) {
        return lines.slice(startIndex).join('\n');
    }
    
    return content;
}

// Function to build the final HTML file
function buildHTML() {
    let finalHTML = template;
    
    console.log('🔨 Building HTML from components...');
    
    // Load and insert each component
    for (const component of components) {
        try {
            const componentPath = path.join(__dirname, component.file);
            
            if (fs.existsSync(componentPath)) {
                const content = fs.readFileSync(componentPath, 'utf-8');
                const cleanContent = cleanComponentContent(content);
                
                finalHTML = finalHTML.replace(component.placeholder, cleanContent);
                console.log(`✅ Loaded: ${component.file}`);
            } else {
                console.warn(`⚠️  Component not found: ${component.file}`);
                finalHTML = finalHTML.replace(component.placeholder, `<!-- Component ${component.file} not found -->`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${component.file}:`, error.message);
            finalHTML = finalHTML.replace(component.placeholder, `<!-- Error loading ${component.file} -->`);
        }
    }
    
    // Write the final HTML file
    const outputPath = path.join(__dirname, 'index-built.html');
    fs.writeFileSync(outputPath, finalHTML, 'utf-8');
    
    console.log('🎉 Build complete! Generated: index-built.html');
    console.log('📁 File size:', Math.round(fs.statSync(outputPath).size / 1024), 'KB');
}

// Run the build if this script is executed directly
if (require.main === module) {
    buildHTML();
}

module.exports = { buildHTML };