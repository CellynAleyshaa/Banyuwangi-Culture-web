/* ============================================
   SEARCH FUNCTIONALITY - UPDATED
   ============================================ */

const Search = {
    init() {
        this.toggle = document.getElementById('search-toggle');
        this.overlay = document.getElementById('search-overlay');
        this.close = document.getElementById('search-close');
        this.input = document.getElementById('search-input');
        this.results = document.getElementById('search-results');
        
        if (!this.toggle) return;
        
        // Event listeners
        this.toggle.addEventListener('click', () => this.open());
        this.close?.addEventListener('click', () => this.closeSearch());
        this.input?.addEventListener('input', Utils.debounce((e) => this.search(e.target.value), 300));
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay?.classList.contains('active')) {
                this.closeSearch();
            }
        });
        
        // Close on backdrop click
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeSearch();
            }
        });
    },
    
    open() {
        if (!this.overlay) return;
        this.overlay.classList.add('active');
        setTimeout(() => this.input?.focus(), 100);
        document.body.style.overflow = 'hidden';
    },
    
    closeSearch() {
        if (!this.overlay) return;
        this.overlay.classList.remove('active');
        if (this.input) this.input.value = '';
        if (this.results) this.results.innerHTML = '';
        document.body.style.overflow = '';
    },
    
    search(query) {
        if (!this.results) return;
        
        if (!query || query.length < 2) {
            this.results.innerHTML = '';
            return;
        }
        
        // Data budaya yang lengkap - SESUAIKAN DENGAN FILE YANG ADA
        const searchData = [
            // RITUAL & TRADISI
            { title: 'Kebo-Keboan', category: 'Ritual & Tradisi', url: window.location.origin + '/pages/kebo-keboan.html', desc: 'Tradisi warga berdandan seperti kerbau di Alasmalang' },
            { title: 'Petik Laut', category: 'Ritual & Tradisi', url: window.location.origin + '/pages/petik-laut.html', desc: 'Tradisi syukur nelayan dengan larung sesaji' },
            { title: 'Barong Ider Bumi', category: 'Ritual & Tradisi', url: window.location.origin + '/pages/barong-ider-bumi.html', desc: 'Upacara tolak bala tertua di Kemiren' },
            { title: 'Tumpeng Sewu', category: 'Ritual & Tradisi', url: window.location.origin + '/pages/tumpeng-sewu.html', desc: 'Tradisi seribu tumpeng' },
            { title: 'Selametan Osing', category: 'Ritual & Tradisi', url: window.location.origin + '/pages/selametan-osing.html', desc: 'Doa bersama masyarakat Osing' },
            
            // TARI & SENI
            { title: 'Gandrung', category: 'Tari & Seni', url: window.location.origin + '/pages/gandrung.html', desc: 'Tarian ikonik Banyuwangi' },
            { title: 'Seblang', category: 'Tari & Seni', url: window.location.origin + '/pages/seblang.html', desc: 'Ritual trance masyarakat Osing' },
            { title: 'Jaranan Buto', category: 'Tari & Seni', url: window.location.origin + '/pages/jaranan-buto.html', desc: 'Tari dengan kuda kepang raksasa' },
            { title: 'Barong Using', category: 'Tari & Seni', url: window.location.origin + '/pages/barong-using.html', desc: 'Kesenian tradisional khas Using' },
            { title: 'Angklung Caruk', category: 'Tari & Seni', url: window.location.origin + '/pages/angklung-caruk.html', desc: 'Adu kreativitas angklung' },
            { title: 'Kendang Kempul', category: 'Tari & Seni', url: window.location.origin + '/pages/kendang-kempul.html', desc: 'Musik pop-etnik khas Osing' },
            
            // BUDAYA OSING
            { title: 'Bahasa Osing', category: 'Budaya Osing', url: window.location.origin + '/pages/bahasa-osing.html', desc: 'Bahasa identitas masyarakat Banyuwangi' },
            { title: 'Rumah Adat Osing', category: 'Budaya Osing', url: window.location.origin + '/pages/rumah-adat-osing.html', desc: 'Arsitektur tradisional Osing' },
            { title: 'Musik Patrol', category: 'Budaya Osing', url: window.location.origin + '/pages/musik-patrol.html', desc: 'Musik dari kentongan bambu' },
            { title: 'Upacara Adat Osing', category: 'Budaya Osing', url: window.location.origin + '/pages/upacara-adat-osing.html', desc: 'Tradisi sakral turun-temurun' },
            
            // BATIK
            { title: 'Batik Gajah Oling', category: 'Batik', url: window.location.origin + '/pages/batik-gajah-oling.html', desc: 'Motif batik ikonik dengan filosofi eling' },
            { title: 'Batik Modern', category: 'Batik', url: window.location.origin + '/pages/batik-modern.html', desc: 'Perpaduan tradisi dan modernitas' },
            { title: 'Batik Kopi Pecah', category: 'Batik', url: window.location.origin + '/pages/batik-kopi-pecah.html', desc: 'Motif terinspirasi biji kopi' },
            
            // CERITA RAKYAT
            { title: 'Legenda Gandrung', category: 'Cerita Rakyat', url: window.location.origin + '/pages/legenda-gandrung.html', desc: 'Kisah asal-usul tarian Gandrung' },
            { title: 'Damarwulan vs Minakjinggo', category: 'Cerita Rakyat', url: window.location.origin + '/pages/damarwulan-vs-minakjinggo.html', desc: 'Pertarungan kebaikan dan kejahatan' },
            { title: 'Sri Tanjung', category: 'Cerita Rakyat', url: window.location.origin + '/pages/sri-tanjung.html', desc: 'Legenda asal-usul nama Banyuwangi' }
        ];

        // Filter hasil pencarian
        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayResults(filtered, query);
    },
    
    displayResults(results, query) {
        if (!this.results) return;
        
        if (results.length === 0) {
            this.results.innerHTML = `
                <div style="text-align: center; padding: 3rem 2rem; color: var(--color-text-secondary);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">😕</div>
                    <p style="font-size: 1.125rem;">Tidak ada hasil ditemukan untuk "<strong>${this.escapeHtml(query)}</strong>"</p>
                    <p style="font-size: 0.875rem; margin-top: 0.5rem;">Coba kata kunci lain seperti "gandrung", "batik", atau "ritual"</p>
                </div>
            `;
            return;
        }
        
        this.results.innerHTML = `
            <div style="padding: 1rem 1.5rem; background: var(--color-bg-secondary); border-bottom: 1px solid var(--color-border);">
                <p style="margin: 0; color: var(--color-text-secondary); font-size: 0.875rem;">
                    Ditemukan <strong>${results.length}</strong> hasil untuk "<strong>${this.escapeHtml(query)}</strong>"
                </p>
            </div>
        `;
        
        results.forEach(item => {
            const resultItem = document.createElement('a');
            resultItem.href = item.url;
            resultItem.className = 'search-result-item';
            resultItem.style.cssText = `
                display: block;
                padding: 1.5rem;
                background: var(--color-bg-secondary);
                border-bottom: 1px solid var(--color-border);
                transition: all 0.3s ease;
                text-decoration: none;
                color: inherit;
            `;
            
            resultItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; color: var(--color-text-primary); font-size: 1.125rem;">${this.highlight(item.title, query)}</h4>
                    <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--color-accent-primary); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">${item.category}</span>
                </div>
                <p style="margin: 0; color: var(--color-text-secondary); font-size: 0.9375rem;">${item.desc}</p>
            `;
            
            // Hover effect
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.background = 'var(--color-bg-tertiary)';
                resultItem.style.transform = 'translateX(8px)';
            });
            
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.background = 'var(--color-bg-secondary)';
                resultItem.style.transform = 'translateX(0)';
            });
            
            this.results.appendChild(resultItem);
        });
    },
    
    highlight(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${this.escapeHtml(query)})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--color-accent-secondary); padding: 0 4px; border-radius: 3px; color: var(--color-text-primary);">$1</mark>');
    },
    
    escapeHtml(text) {
        if (!text) return '';
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Search.init());
window.Search = Search;