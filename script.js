/*
==========================================================================
                          Sangam Website
                         Interactive JavaScript Controller
==========================================================================
*/

/*
==========================================================================
                            DOM ELEMENT CACHE
==========================================================================
*/

// Theme Management Elements
const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('theme-icon');
const mobileToggleBtn = document.getElementById('mobileToggleTheme');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');

// Navigation Elements
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Form & Service Elements
const contactForm = document.getElementById('contact-form');
const serviceCards = document.querySelectorAll('.service-card');

// Testimonials Carousel Elements
const testimonialsContainer = document.querySelector('.testimonials-container');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Eye Test Modal Elements
const eyeTestModal = document.getElementById('eyeTestModal');
const lineButtons = document.querySelectorAll('.line-btn');
const testResult = document.getElementById('testResult');
const resultText = document.getElementById('resultText');

/*
==========================================================================
                           THEME MANAGEMENT MODULE
==========================================================================
*/

/**
 * Initialize theme based on user preference or system setting
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        savedTheme === 'dark' ? enableDarkMode() : enableLightMode();
    } else if (prefersDark) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

/**
 * Enable dark theme mode
 */
function enableDarkMode() {
    body.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
    if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
}

/**
 * Enable light theme mode
 */
function enableLightMode() {
    body.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
    if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    body.classList.contains('dark') ? enableLightMode() : enableDarkMode();
}

/*
==========================================================================
                        SMOOTH SCROLLING MODULE
==========================================================================
*/

/**
 * Smooth scroll to specific section
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(link.getAttribute('href').substring(1));
        });
    });
}

/*
==========================================================================
                        SCROLL ANIMATIONS MODULE
==========================================================================
*/

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass, .feature, .team-member, .tech-item, .stat-item, .action-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/*
==========================================================================
                         NAVBAR SCROLL MODULE
==========================================================================
*/

/**
 * Initialize navbar scroll behavior - adds/removes scrolled class
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/*
==========================================================================
                         SERVICE CARDS MODULE
==========================================================================
*/

/**
 * Initialize service card toggle functionality
 */
function initServiceCards() {
    serviceCards.forEach(card => {
        card.querySelector('.service-btn').addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
}

/*
==========================================================================
                      TESTIMONIALS CAROUSEL MODULE
==========================================================================
*/

// Carousel state
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');
const totalSlides = slides.length;

/**
 * Update carousel display based on current slide
 */
function updateCarousel() {
    testimonialsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/**
 * Navigate to next slide
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

/**
 * Navigate to previous slide
 */
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

/**
 * Initialize testimonials carousel functionality
 */
function initTestimonialsCarousel() {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.dataset.slide);
            updateCarousel();
        });
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

/*
==========================================================================
                         EYE TEST MODAL MODULE
==========================================================================
*/

/**
 * Open the eye test modal
 */
function openEyeTest() {
    eyeTestModal.style.display = 'block';
}

/**
 * Close the eye test modal and hide results
 */
function closeEyeTest() {
    eyeTestModal.style.display = 'none';
    testResult.style.display = 'none';
}

/**
 * Initialize eye test modal functionality
 */
function initEyeTestModal() {
    lineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const line = parseInt(button.dataset.line);
            let result;
            
            if (line >= 6) {
                result = "Your vision seems good, but regular check-ups are important.";
            } else if (line >= 4) {
                result = "You may have some vision difficulty. We recommend a professional exam.";
            } else {
                result = "It seems you have significant vision difficulty. Please book an appointment for a comprehensive eye exam.";
            }
            
            resultText.textContent = result;
            testResult.style.display = 'block';
        });
    });

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target == eyeTestModal) {
            closeEyeTest();
        }
    }
}

/*
==========================================================================
                        FORM VALIDATION MODULE
==========================================================================
*/

/**
 * Initialize contact form validation and WhatsApp integration
 */
function initFormValidation() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        // Get form data
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const preferredDate = document.getElementById('preferredDate').value;
        const preferredTime = document.getElementById('preferredTime').value;
        const message = document.getElementById('message').value.trim();

        // Validate required fields
        if (!firstName || !lastName || !email || !service) {
            alert('Please fill in all required fields (*).');
            return;
        }

        // Format message for WhatsApp
        const fullMessage = `
Hello Sangam, I would like to book an appointment.

*Name:* ${firstName} ${lastName}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Service:* ${service}
*Preferred Date:* ${preferredDate || 'Not specified'}
*Preferred Time:* ${preferredTime || 'Not specified'}
*Additional Info:* ${message || 'None'}
        `.trim().replace(/\n\s*\n/g, '\n'); // Clean up extra blank lines

        // Open WhatsApp
        const whatsappNumber = '919999999999'; // The user-provided WhatsApp number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

        window.open(whatsappUrl, '_blank');
        
        alert('You will be redirected to WhatsApp to send your appointment request. Please press send in WhatsApp.');
        contactForm.reset();
    });
}

/*
==========================================================================
                       MOBILE NAVIGATION MODULE
==========================================================================
*/

/**
 * Open mobile navigation menu
 */
function openMobileMenu() {
    if (mobileNavOverlay && mobileNavDrawer) {
        mobileNavOverlay.classList.add('active');
        mobileNavDrawer.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

/**
 * Close mobile navigation menu
 */
function closeMobileMenu() {
    if (mobileNavOverlay && mobileNavDrawer) {
        mobileNavOverlay.classList.remove('active');
        mobileNavDrawer.classList.remove('active');
        body.style.overflow = '';
    }
}

/**
 * Initialize mobile navigation functionality
 */
function initMobileNavigation() {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleTheme);
    }

    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
                scrollToSection(link.getAttribute('href').substring(1));
            });
        });
    }
}

/*
==========================================================================
                      APPLICATION INITIALIZATION
==========================================================================
*/

/**
 * Initialize all application modules when DOM is loaded
 */
function initializeApp() {
    // Core functionality
    initTheme();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    
    // Interactive features
    initServiceCards();
    initTestimonialsCarousel();
    initEyeTestModal();
    initFormValidation();
    initMobileNavigation();
    
    // Initial UI state
    updateCarousel();
    
    // Theme toggle event listeners
    toggleBtn.addEventListener('click', toggleTheme);
}

/*
==========================================================================
                          EVENT LISTENERS
==========================================================================
*/

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
