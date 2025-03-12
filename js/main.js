/**
 * File: main.js
 * Description: Main JavaScript file for the social media agency website.
 * Contains functionality for navigation, animations, sliders, FAQ toggles,
 * form validation, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initFaqToggles();
    initTestimonialCarousel();
    initCaseStudiesSlider();
    initScrollAnimations();
    initContactForm();
});

/**
 * Navigation functionality
 * Handles navbar scrolling effect, mobile menu toggle, and smooth scrolling
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            // Only prevent default for internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * FAQ accordion functionality
 */
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-toggle i').classList.remove('fa-minus');
                    otherItem.querySelector('.faq-toggle i').classList.add('fa-plus');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.querySelector('.faq-toggle i').classList.remove('fa-plus');
                item.querySelector('.faq-toggle i').classList.add('fa-minus');
            } else {
                answer.style.maxHeight = '0';
                item.querySelector('.faq-toggle i').classList.remove('fa-minus');
                item.querySelector('.faq-toggle i').classList.add('fa-plus');
            }
        });
    });
}

/**
 * Testimonial carousel functionality
 */
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Initialize dots click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate testimonials
    function autoRotate() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Set interval for auto-rotation (every 5 seconds)
    let testimonialInterval = setInterval(autoRotate, 5000);
    
    // Pause auto-rotation when hovering over testimonials
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(autoRotate, 5000);
    });
}

/**
 * Case studies slider functionality
 */
function initCaseStudiesSlider() {
    const caseStudies = document.querySelectorAll('.case-study');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Hide all slides except the first one
    caseStudies.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    function showSlide(index) {
        caseStudies.forEach(slide => {
            slide.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        caseStudies[index].style.display = 'flex';
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next button click event
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % caseStudies.length;
        showSlide(currentSlide);
    });
    
    // Previous button click event
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + caseStudies.length) % caseStudies.length;
        showSlide(currentSlide);
    });
    
    // Dots click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

/**
 * Scroll animations
 * Animates elements as they come into view during scrolling
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    // Check elements on initial load
    checkScroll();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('consultation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // For demonstration purposes - in a real implementation, 
            // this would be an API call to your backend
            console.log('Form submitted:', formValues);
            
            // Show success message
            showFormMessage('Thanks for reaching out! We\'ll contact you shortly.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Insert message after form
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

/**
 * Utility function to add parallax effect to elements
 * @param {string} selector - CSS selector for elements to apply parallax to
 * @param {number} speed - Speed of the parallax effect (default: 0.5)
 */
function addParallaxEffect(selector, speed = 0.5) {
    const elements = document.querySelectorAll(selector);
    
    window.addEventListener('scroll', () => {
        elements.forEach(element => {
            const distance = window.scrollY;
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    });
}

/**
 * Utility function to create a typing effect for text
 * @param {string} selector - CSS selector for the element to apply typing effect to
 * @param {string[]} texts - Array of texts to type
 * @param {number} speed - Typing speed in milliseconds
 */
function createTypingEffect(selector, texts, speed = 100) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = speed;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = speed / 2;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = speed;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause at the end of typing
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500; // Pause before typing next text
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}
