/* ============================================
   GALLERY MODAL
   ============================================ */

const Gallery = {
    init() {
        this.modal = document.getElementById('gallery-modal');
        this.modalImage = document.getElementById('modal-image');
        this.closeBtn = document.getElementById('modal-close');
        this.prevBtn = document.getElementById('modal-prev');
        this.nextBtn = document.getElementById('modal-next');
        
        this.galleryItems = document.querySelectorAll('.gallery-item, .culture-image img, .folklore-image img');
        this.currentIndex = 0;
        this.currentGallery = [];
        
        if (!this.galleryItems.length) return;
        
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => this.open(e, index));
        });
        
        this.closeBtn?.addEventListener('click', () => this.close());
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal?.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Close on backdrop click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    },
    
    open(e, index) {
        const target = e.currentTarget;
        const parent = target.closest('.gallery-grid, .culture-grid, .folklore-grid');
        
        if (parent) {
            this.currentGallery = Array.from(parent.querySelectorAll('img'));
            this.currentIndex = this.currentGallery.indexOf(target);
        } else {
            this.currentGallery = [target];
            this.currentIndex = 0;
        }
        
        this.updateImage();
        this.modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal?.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    updateImage() {
        if (!this.modalImage || !this.currentGallery[this.currentIndex]) return;
        
        const img = this.currentGallery[this.currentIndex];
        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
    },
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateImage();
        }
    },
    
    next() {
        if (this.currentIndex < this.currentGallery.length - 1) {
            this.currentIndex++;
            this.updateImage();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Gallery.init());
window.Gallery = Gallery;