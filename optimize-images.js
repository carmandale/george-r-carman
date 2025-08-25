const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create optimized images directory
const outputDir = 'optimized-images';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Image processing options
const options = {
    quality: 85,
    format: 'webp', // Modern, highly compressed format
    maxWidth: 1200,
    maxHeight: 1200
};

async function optimizeImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = metadata;
        if (width > options.maxWidth || height > options.maxHeight) {
            const ratio = Math.min(options.maxWidth / width, options.maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
        }
        
        await image
            .rotate() // Auto-rotate based on EXIF orientation
            .resize(width, height, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: options.quality })
            .toFile(outputPath);
            
        console.log(`✅ Optimized: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        return true;
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return false;
    }
}

async function processAllImages() {
    const picsDir = 'pics';
    const files = fs.readdirSync(picsDir);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.heic'].includes(ext);
    });
    
    console.log(`Found ${imageFiles.length} images to process...`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const file of imageFiles) {
        const inputPath = path.join(picsDir, file);
        const baseName = path.parse(file).name;
        const outputPath = path.join(outputDir, `${baseName}.webp`);
        
        const success = await optimizeImage(inputPath, outputPath);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }
    
    console.log(`\n🎉 Processing complete!`);
    console.log(`✅ Success: ${successCount} images`);
    console.log(`❌ Failed: ${failCount} images`);
    console.log(`📁 Optimized images saved to: ${outputDir}/`);
}

// Run the optimization
processAllImages().catch(console.error);
