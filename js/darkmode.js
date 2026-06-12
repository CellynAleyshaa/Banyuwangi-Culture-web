/* ============================================
   DARK MODE TOGGLE
   ============================================ */

const DarkMode = {
    init() {
        this.toggle = document.getElementById('theme-toggle');
        this.body = document.body;
        
        if (!this.toggle) return;
        
        // Check localStorage
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'dark') {
            this.enableDarkMode();
        }
        
        // Check system preference
        if (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.enableDarkMode();
        }
        
        this.toggle.addEventListener('click', () => this.toggleMode());
    },
    
    toggleMode() {
        if (this.body.classList.contains('dark-mode')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    },
    
    enableDarkMode() {
        this.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    },
    
    disableDarkMode() {
        this.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => DarkMode.init());
window.DarkMode = DarkMode;