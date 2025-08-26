const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class RobustImageProcessor {
    constructor() {
        this.outputDir = 'optimized-images';
        this.options = {
            quality: 85,
            format: 'webp',
            maxWidth: 1200,
            maxHeight: 1200
        };
        this.processedImages = [];
        
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir);
        }
    }

    async detectAndFixOrientation(inputPath) {
        try {
            // Method 1: Try to get metadata and check if rotation is needed
            const metadata = await sharp(inputPath).metadata();
            
            // Method 2: Use sharp's auto-rotation (handles EXIF orientation)
            const autoRotated = await sharp(inputPath)
                .rotate() // Auto-rotate based on EXIF
                .webp({ quality: this.options.quality });
            
            // Method 3: Create a test image to check if auto-rotation worked
            const testBuffer = await autoRotated.toBuffer();
            const testImage = sharp(testBuffer);
            const testMetadata = await testImage.metadata();
            
            // Method 4: If dimensions suggest wrong orientation, apply manual rotation
            let finalImage = autoRotated;
            
            // Check if image dimensions suggest it's still sideways
            if (metadata.width && metadata.height) {
                const isLandscape = metadata.width > metadata.height;
                const isPortrait = metadata.height > metadata.width;
                
                // If original was landscape but result is portrait (or vice versa), 
                // and the difference is significant, apply manual rotation
                if (Math.abs(metadata.width - metadata.height) > 100) {
                    if (isLandscape && testMetadata.height > testMetadata.width) {
                        // Original was landscape, result is portrait - needs 90° rotation
                        finalImage = await sharp(inputPath)
                            .rotate(90)
                            .webp({ quality: this.options.quality });
                        console.log(`🔄 Applied 90° rotation to ${path.basename(inputPath)}`);
                    } else if (isPortrait && testMetadata.width > testMetadata.height) {
                        // Original was portrait, result is landscape - needs 90° rotation
                        finalImage = await sharp(inputPath)
                            .rotate(90)
                            .webp({ quality: this.options.quality });
                        console.log(`🔄 Applied 90° rotation to ${path.basename(inputPath)}`);
                    }
                }
            }
            
            return finalImage;
            
        } catch (error) {
            console.error(`❌ Error detecting orientation for ${inputPath}:`, error.message);
            // Fallback: just process without rotation
            return sharp(inputPath).webp({ quality: this.options.quality });
        }
    }

    async processImage(inputPath, outputPath) {
        try {
            // Get original dimensions
            const originalMetadata = await sharp(inputPath).metadata();
            let { width, height } = originalMetadata;
            
            // Resize if needed
            if (width > this.options.maxWidth || height > this.options.maxHeight) {
                const ratio = Math.min(this.options.maxWidth / width, this.options.maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }
            
            // Process with orientation detection and correction
            const processedImage = await this.detectAndFixOrientation(inputPath);
            
            // Apply final resize and save
            await processedImage
                .resize(width, height, { fit: 'inside', withoutEnlargement: true })
                .toFile(outputPath);
            
            console.log(`✅ Processed: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
            return true;
            
        } catch (error) {
            console.error(`❌ Error processing ${inputPath}:`, error.message);
            return false;
        }
    }

    extractContributor(filename) {
        const contributors = [
            'Hilaire', 'Caitlin', 'Hanna', 'Stephanie Brewster'
        ];
        
        for (const contributor of contributors) {
            if (filename.includes(contributor)) {
                return contributor;
            }
        }
        return '';
    }

    generateManifest() {
        const manifest = {
            images: this.processedImages.map(img => ({
                filename: img.filename,
                contributor: this.extractContributor(img.filename),
                processedAt: img.processedAt,
                originalName: img.originalName
            })),
            count: this.processedImages.length,
            generated: new Date().toISOString(),
            version: '1.0.0'
        };
        
        return manifest;
    }

    async writeManifest() {
        try {
            const manifest = this.generateManifest();
            const manifestPath = path.join(this.outputDir, 'manifest.json');
            
            await fs.promises.writeFile(
                manifestPath, 
                JSON.stringify(manifest, null, 2), 
                'utf8'
            );
            
            console.log(`📝 Generated manifest: ${manifestPath}`);
            console.log(`📊 Manifest contains ${manifest.count} images`);
            return true;
        } catch (error) {
            console.error('❌ Error writing manifest:', error.message);
            return false;
        }
    }

    async processAllImages() {
        const picsDir = 'pics';
        const files = fs.readdirSync(picsDir);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.heic', '.heif'].includes(ext);
        });
        
        console.log(`🔄 Found ${imageFiles.length} images to process...`);
        console.log('🔧 Using robust orientation detection and correction...');
        
        let successCount = 0;
        let failCount = 0;
        
        for (const file of imageFiles) {
            const inputPath = path.join(picsDir, file);
            const baseName = path.parse(file).name;
            const outputPath = path.join(this.outputDir, `${baseName}.webp`);
            
            const success = await this.processImage(inputPath, outputPath);
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        }
        
        console.log(`\n🎉 Processing complete!`);
        console.log(`✅ Success: ${successCount} images`);
        console.log(`❌ Failed: ${failCount} images`);
        console.log(`📁 Optimized images saved to: ${this.outputDir}/`);
        console.log(`🔧 All images processed with automatic orientation correction`);
    }
}

// Run the robust processor
const processor = new RobustImageProcessor();
processor.processAllImages().catch(console.error);
