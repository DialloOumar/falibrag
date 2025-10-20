// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header background on scroll and section highlighting
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollPosition = window.scrollY + 200; // Offset for better highlighting
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Special case for hero section (when at top)
    if (window.scrollY < 200) {
        navLinks.forEach(link => link.classList.remove('active'));
    }
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInRight 0.6s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Language dropdown functionality
let currentLanguage = 'en';
const languageDropdown = document.getElementById('languageDropdown');
const languageButton = document.getElementById('languageButton');
const languageOptions = document.getElementById('languageOptions');
const currentLangSpan = languageButton.querySelector('.current-lang');

// Language translations for form validation messages
const translations = {
    en: {
        requiredFields: 'Please fill in all required fields.',
        invalidEmail: 'Please enter a valid email address.',
        sending: 'Sending...',
        thankYou: 'Thank you for your message! We will get back to you within 24 hours.',
        sendMessage: 'Send Message'
    },
    fr: {
        requiredFields: 'Veuillez remplir tous les champs requis.',
        invalidEmail: 'Veuillez entrer une adresse e-mail valide.',
        sending: 'Envoi en cours...',
        thankYou: 'Merci pour votre message ! Nous vous répondrons dans les 24 heures.',
        sendMessage: 'Envoyer le Message'
    }
};

function switchLanguage(newLanguage) {
    currentLanguage = newLanguage;
    
    // Update html lang attribute for CSS targeting
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Update current language display
    currentLangSpan.textContent = currentLanguage.toUpperCase();
    
    // Update all elements with data attributes
    const elementsToTranslate = document.querySelectorAll('[data-en][data-fr]');
    elementsToTranslate.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update submit button text
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = translations[currentLanguage].sendMessage;
    }
    
    // Store language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Close dropdown
    languageDropdown.classList.remove('open');
}

// Toggle dropdown
languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('open');
});

// Handle language option clicks
languageOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('language-option')) {
        const selectedLang = e.target.getAttribute('data-lang');
        switchLanguage(selectedLang);
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    languageDropdown.classList.remove('open');
});

// Initialize language from localStorage or default to English
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage && savedLanguage === 'fr') {
    switchLanguage('fr');
} else {
    // Set initial lang attribute for English
    document.documentElement.setAttribute('lang', 'en');
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Basic validation
        const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!formObject[field] || formObject[field].trim() === '') {
                input.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });

        if (!isValid) {
            alert(translations[currentLanguage].requiredFields);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            alert(translations[currentLanguage].invalidEmail);
            return;
        }

        // Simulate form submission (replace with actual backend integration)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = translations[currentLanguage].sending;
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(translations[currentLanguage].thankYou);
            this.reset();
            submitBtn.textContent = translations[currentLanguage].sendMessage;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Mobile partner cycling
let partnerInterval;

function cycleMobilePartners() {
    // Clear existing interval
    if (partnerInterval) {
        clearInterval(partnerInterval);
    }
    
    const mobileDeck = document.getElementById('mobile-partner-deck');
    const desktopRow = document.querySelector('.partners-row');
    
    if (window.innerWidth <= 768) {
        // Show mobile deck, hide desktop cards
        if (mobileDeck) mobileDeck.style.display = 'block';
        if (desktopRow) desktopRow.style.display = 'none';
        
        function cycleDeck() {
            const cards = Array.from(mobileDeck.querySelectorAll('.deck-card'));
            if (cards.length < 3) return;
            
            // Smoothly animate the top card out
            const topCard = cards[0];
            topCard.style.transform = 'translateX(100%) rotateZ(10deg) scale(0.8)';
            topCard.style.opacity = '0';
            
            // Move other cards forward
            cards[1].style.transform = 'translateX(0px) translateY(0px) rotateZ(0deg) scale(1)';
            cards[1].style.opacity = '1';
            cards[1].style.zIndex = '3';
            
            if (cards[2]) {
                cards[2].style.transform = 'translateX(-8px) translateY(4px) rotateZ(-2deg) scale(0.96)';
                cards[2].style.opacity = '0.8';
                cards[2].style.zIndex = '2';
            }
            
            // After animation, rearrange DOM
            setTimeout(() => {
                // Move the top card to the end and reset its position
                mobileDeck.appendChild(topCard);
                topCard.style.transform = 'translateX(-16px) translateY(8px) rotateZ(-4deg) scale(0.92)';
                topCard.style.opacity = '0.6';
                topCard.style.zIndex = '1';
                
                // Force reflow to apply changes immediately
                mobileDeck.offsetHeight;
            }, 800);
        }
        
        // Start the cycling
        partnerInterval = setInterval(cycleDeck, 4000);
        
        // Add click handlers for manual cycling
        const cards = mobileDeck.querySelectorAll('.deck-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Only allow clicks on the front card
                if (card === mobileDeck.querySelector('.deck-card:nth-child(1)')) {
                    // Clear auto interval temporarily
                    if (partnerInterval) {
                        clearInterval(partnerInterval);
                    }
                    
                    // Trigger cycle
                    cycleDeck();
                    
                    // Restart auto interval after a delay
                    setTimeout(() => {
                        partnerInterval = setInterval(cycleDeck, 4000);
                    }, 4000);
                }
            });
        });
    } else {
        // Show desktop cards, hide mobile deck
        if (mobileDeck) mobileDeck.style.display = 'none';
        if (desktopRow) desktopRow.style.display = 'grid';
    }
}

// Initialize mobile partner cycling after DOM is loaded
document.addEventListener('DOMContentLoaded', cycleMobilePartners);
window.addEventListener('resize', cycleMobilePartners);