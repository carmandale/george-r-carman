# George R. Carman Memorial Website

> Version: 1.0.0
> Last Updated: 2025-08-26
> Status: Active

## Overview

A memorial website honoring George Ronald Carman featuring an interactive photo gallery with automatic image optimization and orientation correction. The site provides a loving tribute with over 180 family photos that are automatically processed and optimized for web viewing.

## Purpose

This memorial website serves to:
- Honor and remember George Ronald Carman's life
- Share cherished family memories through photos
- Provide an accessible way for family and friends to view and remember
- Maintain a lasting digital tribute that can be easily updated with new memories

## Key Features

### Current Implementation
- **Responsive Memorial Page**: Mobile-optimized design with elegant styling
- **Interactive Photo Gallery**: Click-to-view gallery with automatic slideshow
- **Smart Image Processing**: Robust image processor handles orientation correction
- **Optimized Performance**: WebP conversion with 85% quality for fast loading
- **Automatic Deployment**: GitHub Pages integration for seamless updates

### Technical Capabilities
- Processes multiple image formats (JPG, PNG, HEIC, HEIF)
- Handles thousands of photos efficiently
- Memory-optimized batch processing
- EXIF data analysis for proper orientation
- Automatic resizing to 1200px maximum dimension

## User Experience

### Primary Users
- **Family Members**: Adding new photos and memories
- **Website Visitors**: Viewing the memorial and photo gallery
- **Site Maintainer**: Managing content and technical updates

### Core User Flows
1. **Photo Addition**: Drop images in `pics/` folder → Run processor → Auto-deploy
2. **Gallery Viewing**: Visit memorial page → Click hero photo → Browse slideshow
3. **Mobile Experience**: Responsive design works across all devices

## Business Context

### Project Goals
- Create a lasting digital memorial
- Make photo sharing simple for family members
- Ensure fast, accessible viewing experience
- Maintain technical sustainability with minimal maintenance

### Success Metrics
- Family engagement and photo contributions
- Site performance (load times, mobile usability)
- Technical reliability (successful image processing)
- Deployment success rate

## Technical Architecture

### Current Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Image Processing**: Node.js with Sharp library
- **Deployment**: GitHub Pages
- **Version Control**: Git with GitHub

### Key Components
- `memorial-george-carman.html` - Main memorial page
- `gallery.js` - Interactive gallery functionality  
- `robust-image-processor.js` - Smart image optimization
- `optimized-images/` - Processed WebP gallery images
- `pics/` - Source image directory for new uploads

## Development Workflow

### Adding New Photos
1. Place images in `pics/` directory
2. Run `npm run robust-process`
3. Commit and push changes
4. GitHub Pages auto-deploys updates

### Image Processing Pipeline
1. **Input**: Multiple formats (JPG, PNG, HEIC, HEIF)
2. **Processing**: EXIF analysis, orientation correction, WebP conversion
3. **Optimization**: 85% quality, 1200px max dimension
4. **Output**: Web-optimized gallery images

## Maintenance & Support

### Regular Tasks
- Monitor image processing success rates
- Review site performance metrics
- Update dependencies when needed
- Backup source images

### Technical Debt
- Consider migrating to modern frontend framework for enhanced features
- Implement automated testing for image processing pipeline
- Add photo metadata management (dates, descriptions)
- Consider CDN integration for faster global access

---

*This memorial website serves as a loving tribute to George Ronald Carman, maintained with care by family members.*