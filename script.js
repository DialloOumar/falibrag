// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
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
}

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
const currentLangSpan = languageButton ? languageButton.querySelector('.current-lang') : null;

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
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLanguage.toUpperCase();
    }
    
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
    if (languageDropdown) {
        languageDropdown.classList.remove('open');
    }
}

// Toggle dropdown
if (languageButton && languageDropdown) {
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('open');
    });
}

// Handle language option clicks
if (languageOptions) {
    languageOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('language-option')) {
            const selectedLang = e.target.getAttribute('data-lang');
            switchLanguage(selectedLang);
        }
    });
}

// Close dropdown when clicking outside
if (languageDropdown) {
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('open');
    });
}

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
            if (!mobileDeck) return;
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
        if (mobileDeck) {
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
        }
    } else {
        // Show desktop cards, hide mobile deck
        if (mobileDeck) mobileDeck.style.display = 'none';
        if (desktopRow) desktopRow.style.display = 'grid';
    }
}

// Actualities Carousel functionality
function initActualitiesCarousel() {
    const carousel = document.getElementById('actualitiesCarousel');
    if (!carousel) return; // Exit if carousel doesn't exist on this page

    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function updateCarousel() {
        // Remove active classes
        items.forEach(item => {
            item.classList.remove('active', 'prev');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Add active class to current slide
        items[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Add prev class to previous slide for animation
        const prevSlide = currentSlide === 0 ? items.length - 1 : currentSlide - 1;
        items[prevSlide].classList.add('prev');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % items.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = currentSlide === 0 ? items.length - 1 : currentSlide - 1;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000); // Change every 6 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - prev slide
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }
    
    // Initialize
    updateCarousel();
    startAutoSlide();
}

// Project Filter functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter project cards
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Lightbox Gallery functionality
function initLightboxGallery() {
    console.log('=== Initializing Lightbox Gallery ===');
    const modal = document.getElementById('lightboxModal');
    const modalImage = document.getElementById('lightboxImage');
    const modalCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const thumbnailGrid = document.getElementById('lightboxThumbnails');

    console.log('Modal element:', modal);
    console.log('Gallery items found:', document.querySelectorAll('.gallery-item').length);

    let currentGallery = [];
    let currentIndex = 0;
    let currentGalleryName = '';
    
    // Function to open lightbox with specific image
    function openLightbox(galleryName, imageIndex) {
        console.log('Opening lightbox for gallery:', galleryName, 'index:', imageIndex);
        // Get all images from the same gallery
        currentGallery = Array.from(document.querySelectorAll(`[data-gallery="${galleryName}"]`));
        console.log('Found', currentGallery.length, 'images in gallery');
        currentIndex = imageIndex;
        currentGalleryName = galleryName;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update image and counter
        updateLightboxImage();
        updateLightboxThumbnails();
    }
    
    // Function to update lightbox image
    function updateLightboxImage() {
        if (currentGallery.length === 0) return;
        
        const currentImg = currentGallery[currentIndex];
        modalImage.src = currentImg.src;
        modalImage.alt = currentImg.alt;
        
        // Update counter
        if (modalCounter) {
            modalCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
        
        // Update navigation button states
        prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        nextBtn.style.opacity = currentIndex < currentGallery.length - 1 ? '1' : '0.5';
        
        // Update active thumbnail
        updateActiveThumbnail();
    }
    
    // Function to update lightbox thumbnails
    function updateLightboxThumbnails() {
        if (!thumbnailGrid) return;
        
        thumbnailGrid.innerHTML = '';
        
        currentGallery.forEach((img, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img.src;
            thumbnail.alt = img.alt;
            thumbnail.className = 'lightbox-thumbnail';
            thumbnail.dataset.index = index;
            
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                updateLightboxImage();
            });
            
            thumbnailGrid.appendChild(thumbnail);
        });
    }
    
    // Function to update active thumbnail
    function updateActiveThumbnail() {
        if (!thumbnailGrid) return;
        
        const thumbnails = thumbnailGrid.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Function to close lightbox
    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentGallery = [];
        currentIndex = 0;
        currentGalleryName = '';
    }
    
    // Function to go to next image
    function nextImage() {
        if (currentIndex < currentGallery.length - 1) {
            currentIndex++;
            updateLightboxImage();
        }
    }
    
    // Function to go to previous image
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxImage();
        }
    }
    
    // Event listeners for gallery items
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-item')) {
            console.log('Gallery item clicked!', e.target);
            console.log('Gallery name:', e.target.dataset.gallery);
            console.log('Image index:', e.target.dataset.index);
            e.preventDefault();
            const galleryName = e.target.dataset.gallery;
            const imageIndex = parseInt(e.target.dataset.index);
            openLightbox(galleryName, imageIndex);
        }
    });
    
    // Event listeners for lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Close lightbox when clicking on modal background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextImage();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleLightboxSwipe();
    });
    
    function handleLightboxSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - prev image
                prevImage();
            }
        }
    }
}

// Animated Statistics Counter
function animateStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length === 0) return;

    const animateCount = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
                element.classList.add('counted');
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Create intersection observer to trigger animation when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px' });

    // Observe each stat number
    statNumbers.forEach(stat => {
        observer.observe(stat);

        // If stat is already visible on page load, animate immediately
        const rect = stat.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight && !stat.classList.contains('counted')) {
            setTimeout(() => animateCount(stat), 300); // Small delay for effect
        }
    });
}

// Smooth Scroll Animations
function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const sections = document.querySelectorAll('.services-overview, .why-choose-us, .process-timeline, .activities-preview, .featured-projects, .testimonials-home, .partners-home');

    const cards = document.querySelectorAll('.service-preview-card, .why-card, .timeline-step, .activity-card, .project-preview-card, .testimonial-card-home, .partner-card-home');

    const headers = document.querySelectorAll('.section-header');

    // Combine all elements
    const allElements = [...sections, ...cards, ...headers];

    if (allElements.length === 0) {
        console.log('No elements found for scroll animation');
        return;
    }

    console.log(`Found ${allElements.length} elements to animate`);

    // Create intersection observer
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -10px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay before adding the class for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 50);
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements
    allElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    console.log('Scroll animations initialized');
}

// Initialize mobile partner cycling, carousel, lightbox, and filters after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cycleMobilePartners();
    initActualitiesCarousel();
    initProjectFilters();
    initLightboxGallery();
    animateStatCounters();
    initScrollAnimations();
});
window.addEventListener('resize', cycleMobilePartners);