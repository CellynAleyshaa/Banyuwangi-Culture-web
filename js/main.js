/* ============================================
   BANYUWANGI OSING CULTURE ARCHIVE
   Main JavaScript File
   ============================================ */

// === DOM CONTENT LOADED ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    LoadingScreen.init();
    Navbar.init();
    MobileMenu.init();
    SmoothScroll.init();
    BackToTop.init();
    CounterAnimation.init();
});

// === LOADING SCREEN ===
const LoadingScreen = {
    init() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progress = this.loadingScreen?.querySelector('.loading-progress');
        
        if (this.loadingScreen) {
            this.simulateLoading();
        }
    },
    
    simulateLoading() {
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.hide();
            }
        }, 200);
    },
    
    hide() {
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            // Trigger initial animations
            setTimeout(() => {
                ScrollAnimations.init();
            }, 500);
        }, 500);
    }
};

// === NAVBAR ===
const Navbar = {
    init() {
        this.navbar = document.getElementById('navbar');
        if (!this.navbar) return;
        
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    },
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
};

// === MOBILE MENU ===
const MobileMenu = {
    init() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.menu = document.getElementById('nav-menu');
        this.links = this.menu?.querySelectorAll('.nav-link');
        
        if (!this.toggle || !this.menu) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.links?.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },
    
    toggleMenu() {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
        document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu() {
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// === SMOOTH SCROLL ===
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// === BACK TO TOP ===
const BackToTop = {
    init() {
        this.button = document.getElementById('back-to-top');
        if (!this.button) return;
        
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    handleScroll() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// === COUNTER ANIMATION ===
const CounterAnimation = {
    init() {
        this.counters = document.querySelectorAll('.stat-number');
        if (!this.counters.length) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => this.observer.observe(counter));
    },
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
};

// === UTILITY FUNCTIONS ===
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
};

// Slideshow Functionality
let slideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slideshow-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
    clearInterval(slideInterval);
    slideIndex += n;
    showSlide(slideIndex);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n;
    showSlide(slideIndex);
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000); // Ganti gambar setiap 5 detik
}

// Start slideshow when page loads
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
    startAutoSlide();
});

// Smooth scroll to section
function scrollToSection(section) {
    const sectionMap = {
        'ritual': 'ritual-section',
        'dance': 'dance-section',
        'osing': 'osing-section',
        'batik': 'batik-section'
    };
    
    const targetId = sectionMap[section];
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect
        targetElement.style.transition = 'all 0.5s ease';
        targetElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            targetElement.style.transform = 'scale(1)';
        }, 500);
    }
}

// Export for use in other modules
window.Utils = Utils;