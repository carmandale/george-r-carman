# George R. Carman Memorial - Photo Gallery

A memorial website with an interactive photo gallery that automatically handles image optimization and orientation correction.

## 🚀 Features

- **Responsive Design**: Mobile-optimized memorial page
- **Interactive Gallery**: Click hero photo to view all images
- **Automatic Slideshow**: Gallery cycles through photos automatically
- **Smart Image Processing**: Automatic orientation detection and correction
- **Optimized Images**: WebP format with compression for fast loading

## 📸 Adding New Photos

### 1. **Simple Method (Recommended)**
```bash
# Just drop photos in the pics/ folder
# Then run the robust processor
npm run robust-process
```

### 2. **What the Robust Processor Does Automatically**
- ✅ **Converts** JPG, PNG, HEIC → WebP
- ✅ **Optimizes** quality to 85% (good balance of size/quality)
- ✅ **Resizes** to max 1200x1200px (maintains aspect ratio)
- ✅ **Detects** image orientation using multiple methods:
  - EXIF data analysis
  - Sharp's auto-rotation
  - Dimension analysis (landscape vs portrait)
  - Automatic correction if needed
- ✅ **Handles** thousands of photos reliably

### 3. **Supported Formats**
- **Input**: `.jpg`, `.jpeg`, `.png`, `.heic`, `.heif`
- **Output**: `.webp` (optimized, web-ready)

## 🛠️ Development

### Setup
```bash
npm install
```

### Process Images
```bash
# Use the robust processor (recommended)
npm run robust-process

# Or use the basic processor
npm run optimize-images
```

### Build & Deploy
```bash
npm run build
git add .
git commit -m "Update photos"
git push origin main
```

## 🔧 How the Robust Processor Works

The `robust-image-processor.js` uses a **4-method approach** to ensure correct orientation:

1. **EXIF Analysis**: Reads camera orientation data
2. **Auto-Rotation**: Applies Sharp's built-in rotation
3. **Dimension Validation**: Checks if result makes sense
4. **Smart Correction**: Applies manual rotation if auto-rotation failed

This eliminates the need for manual rotation fixes and handles edge cases automatically.

## 📁 File Structure
```
├── pics/                    # Drop new photos here
├── optimized-images/        # Processed WebP images (auto-generated)
├── memorial-george-carman.html  # Main memorial page
├── gallery.js              # Gallery functionality
├── robust-image-processor.js   # Smart image processor
└── .github/workflows/      # GitHub Pages deployment
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Live Site**: https://carmandale.github.io/george-r-carman/

## 💡 Tips for Large Photo Collections

1. **Batch Processing**: The robust processor handles thousands of photos efficiently
2. **Memory Efficient**: Processes one image at a time to avoid memory issues
3. **Error Handling**: Continues processing even if individual images fail
4. **Progress Tracking**: Shows real-time progress and success/failure counts

## 🚨 Troubleshooting

### Images Still Rotated?
The robust processor should handle 99% of cases automatically. If issues persist:
1. Check the original photo orientation in the `pics/` folder
2. Ensure the photo isn't corrupted
3. Try running `npm run robust-process` again

### HEIC Files Not Processing?
Some HEIC files may have compatibility issues. The processor will skip problematic files and continue with the rest.

## 📊 Performance

- **Image Count**: Handles 1000+ photos efficiently
- **Processing Speed**: ~2-5 seconds per image (depending on size)
- **Output Size**: Typically 70-90% smaller than original
- **Quality**: Maintains visual quality while optimizing file size
