/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

const ScrollAnimations = {
    init() {
        this.elements = document.querySelectorAll(
            '.reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in'
        );
        
        if (!this.elements.length) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
};

// Parallax Effect
const ParallaxEffect = {
    init() {
        this.elements = document.querySelectorAll('.parallax');
        if (!this.elements.length) return;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 16));
    },
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
};

// Initialize on load
window.ScrollAnimations = ScrollAnimations;
window.ParallaxEffect = ParallaxEffect;