# Tech Stack - George R. Carman Memorial Website

> Version: 1.0.0
> Last Updated: 2025-08-26
> Project: George R. Carman Memorial Website

## Current Architecture

### Frontend
- **Language**: Vanilla JavaScript (ES6+)
- **Markup**: HTML5 with semantic structure
- **Styling**: CSS3 with modern features (flexbox, grid, gradients)
- **No Framework**: Intentionally lightweight for memorial site simplicity

### Backend/Processing
- **Runtime**: Node.js 18+
- **Package Manager**: npm
- **Image Processing**: Sharp library for WebP conversion and optimization

### Deployment
- **Platform**: GitHub Pages
- **CI/CD**: GitHub Actions (automatic deployment on push to main)
- **Domain**: GitHub subdomain (carmandale.github.io/george-r-carman)

### Development Environment
- **Version Control**: Git with GitHub
- **IDE**: Any text editor/IDE
- **Local Server**: Live Server extension or similar for development

## Dependencies

### Production Dependencies
```json
{
  "sharp": "^0.33.0"
}
```

### Scripts
```json
{
  "optimize-images": "node optimize-images.js",
  "robust-process": "node robust-image-processor.js",
  "build": "node robust-image-processor.js"
}
```

## File Structure

```
/
├── .agent-os/              # Agent OS configuration
├── .github/workflows/      # GitHub Pages deployment
├── pics/                   # Source images (JPG, PNG, HEIC)
├── optimized-images/       # Processed WebP images  
├── index.html             # Redirect to memorial page
├── memorial-george-carman.html  # Main memorial page
├── gallery.js             # Gallery functionality
├── robust-image-processor.js    # Image processing pipeline
├── package.json           # Node.js dependencies
└── README.md             # Documentation
```

## Image Processing Pipeline

### Input Formats Supported
- `.jpg`, `.jpeg` - Standard JPEG images
- `.png` - PNG images with transparency support
- `.heic`, `.heif` - Modern iPhone/device formats

### Processing Steps
1. **EXIF Analysis**: Read camera orientation metadata
2. **Auto-Rotation**: Apply Sharp's built-in orientation correction
3. **Manual Correction**: Additional rotation if auto-rotation insufficient
4. **WebP Conversion**: Convert to modern web format
5. **Quality Optimization**: 85% quality for size/quality balance
6. **Dimension Resize**: Max 1200px maintaining aspect ratio

### Output Specifications
- **Format**: WebP
- **Quality**: 85% (good balance of file size and visual quality)
- **Max Dimensions**: 1200x1200px (maintains original aspect ratio)
- **Typical Size Reduction**: 70-90% smaller than original files

## Performance Characteristics

### Image Processing
- **Speed**: 2-5 seconds per image (depends on original size)
- **Memory Usage**: Processes one image at a time to avoid memory issues
- **Batch Processing**: Handles 1000+ images efficiently
- **Error Handling**: Continues processing if individual images fail

### Web Performance
- **Image Loading**: WebP format for modern browsers
- **Responsive Design**: CSS media queries for mobile optimization
- **Lazy Loading**: Not implemented (could be future enhancement)
- **Caching**: Browser caching via GitHub Pages

## Development Workflow

### Adding New Photos
1. **Drop Images**: Place new photos in `pics/` folder
2. **Process**: Run `npm run robust-process`
3. **Review**: Check output in `optimized-images/` folder
4. **Deploy**: Commit and push to GitHub for automatic deployment

### Local Development
```bash
# Install dependencies
npm install

# Process images
npm run robust-process

# Serve locally (using any local server)
# Example with Live Server extension in VS Code
# Or python -m http.server 8000
```

## Future Considerations

### Potential Enhancements
- **Modern Framework**: Consider React/Vue for enhanced interactivity
- **CDN Integration**: Cloudflare or similar for global performance
- **Database**: Store photo metadata (dates, descriptions, people)
- **CMS Integration**: Allow family members to upload via web interface
- **Advanced Gallery**: Filtering, search, categories by year/event

### Technical Debt
- **Testing**: No automated tests currently
- **Monitoring**: No error tracking or analytics
- **Backup Strategy**: Relies on Git history for source images
- **Mobile Performance**: Could benefit from progressive loading

---

*This tech stack prioritizes simplicity and reliability for a memorial website that family members can easily maintain.*