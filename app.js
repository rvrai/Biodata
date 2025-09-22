// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initProjectFiltering();
    initScrollAnimations();
    initTypingAnimation();
    initCounterAnimations();
    initSkillBars();
    initContactForm();
    initParticles();
    initSmoothScroll();
    
    // Remove loading screen if exists
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 500);
        }
    }, 1000);
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar background on scroll
    function updateNavBackground() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateNavBackground();
    });
    
    // Initial call
    updateActiveNav();
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburgerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileMenus.forEach(menu => {
                menu.classList.toggle('hidden');
                menu.classList.toggle('active');
            });
        });
    });
    
    // Close mobile menu when clicking on nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenus.forEach(menu => {
                menu.classList.add('hidden');
                menu.classList.remove('active');
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
            mobileMenus.forEach(menu => {
                menu.classList.add('hidden');
                menu.classList.remove('active');
            });
        }
    });
}

// Project filtering functionality
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('achievement-card')) {
                    animateCounter(entry.target.querySelector('.counter'));
                }
                
                if (entry.target.classList.contains('skills-category')) {
                    animateSkills(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    document.querySelectorAll('section, .achievement-card, .project-card, .skills-category').forEach(el => {
        observer.observe(el);
    });
}

// Typing animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Experienced Android Developer',
        'Mobile App Architect',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1000);
}

// Counter animations
function initCounterAnimations() {
    function animateCounter(counter) {
        if (counter.dataset.animated) return;
        
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
        
        counter.dataset.animated = 'true';
    }
    
    // Make animateCounter globally accessible
    window.animateCounter = animateCounter;
}

// Skill bar animations
function initSkillBars() {
    function animateSkills(skillsSection) {
        if (skillsSection.dataset.animated) return;
        
        const skillItems = skillsSection.querySelectorAll('.skill-item');
        const skillProgresses = skillsSection.querySelectorAll('.skill-progress');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200);
        });
        
        skillProgresses.forEach((progress, index) => {
            setTimeout(() => {
                const width = progress.dataset.width;
                progress.style.width = width + '%';
            }, index * 200 + 500);
        });
        
        skillsSection.dataset.animated = 'true';
    }
    
    // Make animateSkills globally accessible
    window.animateSkills = animateSkills;
}

// Contact form handling
function initContactForm() {
    const contactForms = document.querySelectorAll('.contact-form form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Form field animations
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-content');
            } else {
                input.parentElement.classList.remove('has-content');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Particle system
function initParticles() {
    const particleContainers = document.querySelectorAll('.floating-particles');
    
    particleContainers.forEach(container => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(168, 85, 247, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            container.appendChild(particle);
        }
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection.style) {
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!', 'success');
    });
}

// Theme switcher (if needed)
function initThemeSwitch() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Performance optimization - Intersection Observer for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Easter egg - Konami code
function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate special effect
                document.body.style.animation = 'rainbow 2s infinite';
                showNotification('🎉 Easter egg activated!', 'success');
                konamiIndex = 0;
                
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const allFocusableElements = document.querySelectorAll(focusableElements);
    
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenus = document.querySelectorAll('.mobile-menu');
            mobileMenus.forEach(menu => {
                menu.classList.add('hidden');
                menu.classList.remove('active');
            });
        }
        
        // Arrow keys for section navigation
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            navigateSection('next');
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            navigateSection('prev');
        }
    });
}

function navigateSection(direction) {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    let currentIndex = Array.from(sections).findIndex(section => 
        section.getAttribute('id') === currentSection
    );
    
    if (direction === 'next' && currentIndex < sections.length - 1) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }
    
    const targetSection = sections[currentIndex];
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    return current;
}

// Add click handlers for project links
document.addEventListener('click', (e) => {
    // Handle email click
    if (e.target.href && e.target.href.includes('mailto:')) {
        copyToClipboard('rvrai1998@gmail.com');
    }
    
    // Handle phone click
    if (e.target.href && e.target.href.includes('tel:')) {
        copyToClipboard('+91 8423914735');
    }
    
    // Handle project card clicks
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        const link = card.querySelector('a[href*="play.google.com"]');
        if (link && !e.target.closest('a')) {
            window.open(link.href, '_blank');
        }
    }
});

// Add rainbow animation for easter egg
const rainbowKeyframes = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rainbowKeyframes;
document.head.appendChild(styleSheet);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initLazyLoading();
    initEasterEgg();
    initKeyboardNavigation();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        });
    }
}

logPerformance();