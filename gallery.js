// Gallery functionality for George R. Carman memorial page
class MemorialGallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.slideshowInterval = null;
        this.slideshowSpeed = 3000; // 3 seconds
        this.init();
    }

    async init() {
        // Show loading state
        this.showLoadingState();
        
        await this.loadImages();
        
        // Hide loading state
        this.hideLoadingState();
        
        if (this.images.length === 0) {
            console.warn('⚠️ No images loaded - gallery will be empty');
            return;
        }
        
        this.createGallery();
        this.setupEventListeners();
        this.startSlideshow();
    }

    async loadImages() {
        try {
            console.log('🔄 Loading gallery images from manifest...');
            const response = await fetch('optimized-images/manifest.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const manifest = await response.json();
            console.log(`📊 Loaded manifest with ${manifest.count} images`);
            
            this.images = manifest.images.map(item => ({
                src: `optimized-images/${item.filename}`,
                alt: item.filename.replace('.webp', '').replace(/_/g, ' '),
                title: item.contributor ? 
                       `Photo by ${item.contributor}` : 
                       item.filename.replace('.webp', '').replace(/_/g, ' '),
                contributor: item.contributor || '',
                processedAt: item.processedAt,
                originalName: item.originalName
            }));
            
            console.log(`✅ Gallery ready with ${this.images.length} images!`);
            
        } catch (error) {
            console.error('❌ Failed to load image manifest:', error);
            
            // Show user-friendly error message
            this.showErrorMessage('Unable to load gallery images. Please try refreshing the page.');
            
            // Fallback to empty array
            this.images = [];
        }
    }

    createGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) return;

        // Create gallery grid
        const galleryGrid = document.createElement('div');
        galleryGrid.className = 'gallery-grid';
        galleryGrid.id = 'gallery-grid';

        // Create modal for full-size view
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.id = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image" id="modal-image" src="" alt="">
                <div class="modal-nav">
                    <button class="nav-btn prev-btn">&lt;</button>
                    <button class="nav-btn next-btn">&gt;</button>
                </div>
                <div class="modal-info">
                    <span id="modal-counter"></span>
                </div>
            </div>
        `;

        // Create slideshow container
        const slideshowContainer = document.createElement('div');
        slideshowContainer.className = 'slideshow-container';
        slideshowContainer.id = 'slideshow-container';
        
        // Add first image to slideshow
        if (this.images.length > 0) {
            const firstImage = document.createElement('img');
            firstImage.src = this.images[0].src;
            firstImage.alt = this.images[0].alt;
            slideshowContainer.appendChild(firstImage);
        }

        // Add to page
        galleryContainer.appendChild(slideshowContainer);
        galleryContainer.appendChild(galleryGrid);
        document.body.appendChild(modal);

        // Populate gallery grid
        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" title="${image.title}" 
                     data-index="${index}" class="gallery-image">
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    setupEventListeners() {
        // Hero photo click
        const heroPhoto = document.getElementById('hero-photo');
        if (heroPhoto) {
            heroPhoto.addEventListener('click', () => {
                this.openModal(0); // Open first image
            });
        }
        
        // Gallery item click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('gallery-image')) {
                const index = parseInt(e.target.dataset.index);
                this.openModal(index);
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || e.target.classList.contains('gallery-modal')) {
                this.closeModal();
            }
        });

        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('prev-btn')) {
                this.previousImage();
            } else if (e.target.classList.contains('next-btn')) {
                this.nextImage();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            } else if (e.key === 'ArrowLeft') {
                this.previousImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        });
    }

    openModal(index) {
        this.currentIndex = index;
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalCounter = document.getElementById('modal-counter');

        modalImage.src = this.images[index].src;
        modalImage.alt = this.images[index].alt;
        modalCounter.textContent = `${index + 1} of ${this.images.length}`;
        
        modal.style.display = 'block';
        this.pauseSlideshow();
    }

    closeModal() {
        const modal = document.getElementById('gallery-modal');
        modal.style.display = 'none';
        this.startSlideshow();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModalImage();
    }

    previousImage() {
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateModalImage();
    }

    updateModalImage() {
        const modalImage = document.getElementById('modal-image');
        const modalCounter = document.getElementById('modal-counter');
        
        modalImage.src = this.images[this.currentIndex].src;
        modalImage.alt = this.images[this.currentIndex].alt;
        modalCounter.textContent = `${this.currentIndex + 1} of ${this.images.length}`;
    }

    startSlideshow() {
        if (this.slideshowInterval) return;
        
        this.slideshowInterval = setInterval(() => {
            this.nextSlideshowImage();
        }, this.slideshowSpeed);
    }

    pauseSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }
    }

    nextSlideshowImage() {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (!slideshowContainer) return;

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        
        // Create fade effect
        slideshowContainer.style.opacity = '0';
        
        setTimeout(() => {
            const img = slideshowContainer.querySelector('img');
            if (img) {
                img.src = this.images[this.currentIndex].src;
                img.alt = this.images[this.currentIndex].alt;
            }
            slideshowContainer.style.opacity = '1';
        }, 300);
    }

    showLoadingState() {
        // Add loading indicator to the gallery container if it exists
        const galleryContainer = document.getElementById('gallery-container');
        if (galleryContainer) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'gallery-loading';
            loadingDiv.style.cssText = `
                text-align: center;
                padding: 40px;
                color: #666;
                font-style: italic;
            `;
            loadingDiv.innerHTML = '🔄 Loading gallery images...';
            galleryContainer.appendChild(loadingDiv);
        }
    }

    hideLoadingState() {
        const loadingDiv = document.getElementById('gallery-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    showErrorMessage(message) {
        const galleryContainer = document.getElementById('gallery-container');
        if (galleryContainer) {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'gallery-error';
            errorDiv.style.cssText = `
                text-align: center;
                padding: 40px;
                color: #d32f2f;
                background-color: #ffebee;
                border: 1px solid #ffcdd2;
                border-radius: 8px;
                margin: 20px 0;
            `;
            errorDiv.innerHTML = `❌ ${message}`;
            galleryContainer.appendChild(errorDiv);
        }
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemorialGallery();
});
