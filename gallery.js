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
        await this.loadImages();
        this.createGallery();
        this.setupEventListeners();
        this.startSlideshow();
    }

    async loadImages() {
        // Complete list of all 165 optimized images
        const imageFiles = [
            '0168.webp',
            '091F0767-73EA-4A5F-87A0-67D94FEA9088 Hilaire.webp',
            '115624B2-5452-4624-8014-32E7AF9F67C7 Hilaire.webp',
            '20191116_111901 Hilaire.webp',
            '20191116_121759 Hilaire.webp',
            '20200510_120713 Hilaire.webp',
            '20200829_130857 Hilaire.webp',
            '286EC91C-A386-4C57-B475-637AD206546B Hilaire.webp',
            '3346AF04-8A0A-471C-AB23-4740062D4CC2 Hilaire.webp',
            '3688766505329979379 Stephanie Brewster.webp',
            '4119302F-68E5-4CD4-B296-DF500CC8D6AE Hilaire.webp',
            '4329 Stephanie Brewster.webp',
            '4625159627498159918 Stephanie Brewster.webp',
            '48410750-18D6-4EF8-B92F-B0425664BC4E Hilaire.webp',
            '5012 Stephanie Brewster.webp',
            '5019 Stephanie Brewster.webp',
            '5020 Stephanie Brewster.webp',
            '5740782D-C091-4EE7-8722-88D00E5A8EE8 Hilaire.webp',
            '5BEDEB06-D1CB-4278-BCBA-DD2F32C9A193 Stephanie Brewster.webp',
            '755046866632746124 Stephanie Brewster.webp',
            '79D66342-21E0-4866-8487-5C9C892FBA3E Hilaire.webp',
            '81B2F106-6970-4179-B49F-12C90302C7A6 Hilaire.webp',
            '85B956F0-010D-4AED-913D-215EB733115C Hilaire.webp',
            '86A5D8C1-802B-4569-B253-E8D7CAE04E5E Hilaire.webp',
            'A14BBF8F-1283-4728-B082-4EC635F78A0C Hilaire.webp',
            'B7AC28D4-F668-4D0D-BE52-2DC4726F6635 Hilaire.webp',
            'BC1D63CD-0649-420C-BE35-339CC343F7A1 Hilaire.webp',
            'C15FC055-326F-433C-ABAA-EC0A28697669 Hilaire.webp',
            'CC579621-5E68-4B87-85BB-2E272AB315D1 Hilaire.webp',
            'CE118AA6-4255-48A6-9AFF-E3A54D1AB02A Hilaire.webp',
            'D9CA6A1D-C892-448B-88A6-5D729591D22C Hilaire.webp',
            'DCC0BEBA-14E4-405E-BA3A-80EBE3E8E10D Hilaire.webp',
            'dads-poem.webp',
            'DSC00146.webp',
            'DSC_0244.webp',
            'E289276D-B8D1-41E2-BE78-2F744EC91A4A Hilaire.webp',
            'E5814037-C768-4FA2-92CB-3ED78995FBF4 Hilaire.webp',
            'E5FC6CD2-3E90-48F9-9AB7-09B7744EAF85 Hilaire.webp',
            'EAC0DAFE-13BF-4F86-A41B-D8AD7401E644 Hilaire.webp',
            'EDB03C03-E606-4E06-82FE-C16DD17661DF Hilaire.webp',
            'FBD319A8-F448-4B20-83D2-555F48C7E9BA Hilaire.webp',
            'FullSizeRender Stephanie Brewster.webp',
            'IMG_0040.webp',
            'IMG_0052.webp',
            'IMG_0053.webp',
            'IMG_0055.webp',
            'IMG_0058.webp',
            'IMG_0210.webp',
            'IMG_0212.webp',
            'IMG_0218.webp',
            'IMG_0229.webp',
            'IMG_0230.webp',
            'IMG_0270.webp',
            'IMG_0275.webp',
            'IMG_0327.webp',
            'IMG_0405.webp',
            'IMG_0706.webp',
            'IMG_0714.webp',
            'IMG_0931 (1).webp',
            'IMG_0931.webp',
            'IMG_1388.webp',
            'IMG_1487.webp',
            'IMG_1504.webp',
            'IMG_1607 Hanna.webp',
            'IMG_1608 Hanna.webp',
            'IMG_1922.webp',
            'IMG_20180714_170123 Hilaire.webp',
            'IMG_2103 Caitlin.webp',
            'IMG_2105 Caitlin.webp',
            'IMG_2106 Caitlin.webp',
            'IMG_2107 Caitlin.webp',
            'IMG_2110 Caitlin.webp',
            'IMG_2111 Caitlin.webp',
            'IMG_2112 Caitlin.webp',
            'IMG_2113 Caitlin.webp',
            'IMG_2114 Caitlin.webp',
            'IMG_2115 Caitlin.webp',
            'IMG_2285.webp',
            'IMG_2330.webp',
            'IMG_2701.webp',
            'IMG_2702.webp',
            'IMG_2743.webp',
            'IMG_2787.webp',
            'IMG_3014.webp',
            'IMG_3284.webp',
            'IMG_3302 Stephanie Brewster.webp',
            'IMG_3304 Stephanie Brewster.webp',
            'IMG_3556.webp',
            'IMG_3937 Stephanie Brewster.webp',
            'IMG_3939 Stephanie Brewster.webp',
            'IMG_3940 Stephanie Brewster.webp',
            'IMG_4046.webp',
            'IMG_4143.webp',
            'IMG_4180.webp',
            'IMG_4497.webp',
            'IMG_4649.webp',
            'IMG_4858.webp',
            'IMG_5148.webp',
            'IMG_5206 Caitlin.webp',
            'IMG_5977.webp',
            'IMG_7702 Hilaire.webp',
            'IMG_7751 Hilaire.webp',
            'IMG_7753 Hanna.webp',
            'IMG_7753 Hilaire.webp',
            'IMG_7754 Hanna.webp',
            'IMG_7755 Hanna.webp',
            'IMG_7756 Hanna.webp',
            'IMG_7756 Hilaire.webp',
            'IMG_7757 Hanna.webp',
            'IMG_7760 Hilaire.webp',
            'IMG_7761 Hilaire.webp',
            'IMG_7762 Hilaire.webp',
            'IMG_7763 Hilaire.webp',
            'IMG_7764 Hilaire.webp',
            'IMG_7765 Hilaire.webp',
            'IMG_7766 Hilaire.webp',
            'IMG_7767 Hilaire.webp',
            'IMG_7768 Hilaire.webp',
            'IMG_7769 Hilaire.webp',
            'IMG_7770 Hilaire.webp',
            'IMG_7771 Hilaire.webp',
            'IMG_7772 Hilaire.webp',
            'IMG_7773 Hilaire.webp',
            'IMG_7774 Hilaire.webp',
            'IMG_7775 Hilaire.webp',
            'IMG_7776 Hilaire.webp',
            'IMG_7777 Hilaire.webp',
            'IMG_7778 Hilaire.webp',
            'IMG_7779 Hilaire.webp',
            'IMG_7780 Hilaire.webp',
            'IMG_7782 Hilaire.webp',
            'IMG_7784 Hilaire.webp',
            'IMG_7785 Hilaire.webp',
            'IMG_7786 Hilaire.webp',
            'IMG_7787 Hilaire.webp',
            'IMG_7788 Hilaire.webp',
            'IMG_7789 Hilaire.webp',
            'IMG_7790 Hilaire.webp',
            'IMG_7791 Hilaire.webp',
            'IMG_7792 Hilaire.webp',
            'IMG_8882 Hilaire.webp',
            'IMG_8889 Caitlin.webp',
            'IMG_8889.webp',
            'IMG_9072 Caitlin.webp',
            'IMG_9680.webp',
            'MVIMG_20180304_180134 Hilaire.webp',
            'PICTURE 176-1.webp',
            'Picture 019.webp',
            'Picture 027.webp',
            'Picture 155.webp',
            'Picture 185.webp',
            'Picture 213.webp',
            'Picture 228.webp',
            'Picture 266.webp'
        ];

        this.images = imageFiles.map(filename => ({
            src: `optimized-images/${filename}`,
            alt: filename.replace('.webp', '').replace(/_/g, ' '),
            title: filename.replace('.webp', '').replace(/_/g, ' ')
        }));
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
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemorialGallery();
});
