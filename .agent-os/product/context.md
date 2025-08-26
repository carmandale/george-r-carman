# Product Context - George R. Carman Memorial Website

> Last Updated: 2025-08-26
> Product Version: 1.0.0

## Codebase Overview

This is a memorial website for George Ronald Carman that combines a static memorial page with an interactive photo gallery. The architecture prioritizes simplicity and reliability while providing powerful image processing capabilities.

## Key Components

### Core Files

#### `memorial-george-carman.html`
- **Purpose**: Main memorial page with biographical information and hero photo
- **Features**: Responsive design, elegant styling, gallery trigger
- **Styling**: Embedded CSS with modern features (gradients, flexbox, shadows)
- **Functionality**: Click hero photo to open gallery modal

#### `gallery.js` 
- **Purpose**: Interactive photo gallery with slideshow functionality
- **Features**: Modal overlay, automatic slideshow, manual navigation
- **Image Loading**: Dynamically loads WebP images from `optimized-images/`
- **Controls**: Previous/next buttons, automatic progression, close functionality

#### `robust-image-processor.js`
- **Purpose**: Advanced image processing pipeline with orientation correction
- **Capabilities**: 
  - EXIF data analysis for proper orientation
  - Sharp library integration for WebP conversion
  - Batch processing with error handling
  - Progress tracking and detailed logging
- **Input**: Multiple formats (JPG, PNG, HEIC, HEIF) from `pics/` folder
- **Output**: Optimized WebP images in `optimized-images/` folder

### Supporting Files

#### `index.html`
- Simple redirect to the main memorial page
- Ensures visitors land on the correct page regardless of entry point

#### `package.json`
- Node.js project configuration
- Dependencies: Sharp for image processing
- Scripts for image optimization workflows

#### Directory Structure

```
├── pics/                   # Source images (not served to web)
├── optimized-images/       # Processed WebP images (web-served)
├── pics002/, pics003/      # Additional source image directories
├── node_modules/          # npm dependencies
└── README.md             # Comprehensive documentation
```

## Data Flow

### Image Processing Workflow
1. **Input**: Family members add photos to `pics/` folder
2. **Processing**: `npm run robust-process` executes the processing pipeline
3. **Optimization**: Images converted to WebP, resized, orientation-corrected
4. **Output**: Web-optimized images saved to `optimized-images/`
5. **Deployment**: Commit and push triggers GitHub Pages deployment

### Gallery Display Workflow
1. **Page Load**: Memorial page loads with hero image
2. **Gallery Trigger**: User clicks hero photo or gallery button
3. **Image Loading**: JavaScript dynamically loads all WebP images
4. **Slideshow**: Automatic progression through photos with manual controls
5. **Navigation**: Users can browse, pause, or close gallery

## Technical Patterns

### Image Processing Strategy
- **Four-Method Approach**: EXIF analysis → Auto-rotation → Validation → Manual correction
- **Memory Management**: Process one image at a time to avoid memory issues
- **Error Recovery**: Continue processing even if individual images fail
- **Quality Balance**: 85% WebP quality for optimal size/quality ratio

### Frontend Architecture
- **Vanilla JavaScript**: No frameworks for maximum compatibility and simplicity
- **CSS3 Modern Features**: Flexbox, grid, gradients, transforms
- **Responsive Design**: Mobile-first approach with media queries
- **Progressive Enhancement**: Works without JavaScript for basic viewing

## Content Management

### Photo Organization
- **Source Storage**: Original photos maintained in `pics/` directories
- **Web Assets**: Optimized versions in `optimized-images/` for serving
- **Naming**: Preserves original filenames with WebP extension
- **Metadata**: Photo contributors preserved in filenames (e.g., "IMG_5081 Hilaire.webp")

### Content Updates
- **Photo Addition**: Drop images in `pics/`, run processor, commit changes
- **Text Updates**: Edit `memorial-george-carman.html` directly
- **Styling Changes**: Modify embedded CSS in memorial page
- **Gallery Logic**: Update `gallery.js` for functionality changes

## Performance Considerations

### Image Optimization
- **WebP Format**: Modern format with excellent compression
- **Dimension Limits**: 1200px maximum maintains quality while reducing file size
- **Batch Processing**: Efficient handling of large photo collections (1000+ images)
- **File Size Reduction**: Typically 70-90% smaller than original files

### Web Performance
- **Static Hosting**: GitHub Pages provides fast, reliable hosting
- **Minimal Dependencies**: No external JavaScript libraries or CSS frameworks
- **Image Loading**: Gallery loads images on-demand when opened
- **Caching**: Browser caching leveraged for repeat visits

## Development Environment

### Setup Requirements
- **Node.js**: Required for image processing (version 18+)
- **npm**: Package manager for dependencies
- **Git**: Version control and deployment trigger
- **Text Editor**: Any editor for HTML/CSS/JavaScript editing

### Development Workflow
1. **Local Testing**: Use any local server for development
2. **Image Processing**: Test with `npm run robust-process`
3. **Version Control**: Commit all changes including processed images
4. **Deployment**: Push to GitHub main branch for automatic deployment

## Family Usage Patterns

### Typical User Actions
- **Photo Contributors**: Family members adding memories from phones/cameras
- **Site Visitors**: Viewing memorial and browsing photo gallery
- **Site Maintainer**: Processing photos and managing technical updates

### Common Scenarios
- **Birthday/Anniversary**: Adding celebration photos to commemorate special dates
- **Family Gatherings**: Batch uploading photos from family events
- **Mobile Viewing**: Family sharing site link for mobile viewing during gatherings

---

*This memorial website balances technical sophistication with family-friendly simplicity, ensuring it can be maintained and updated by family members while providing a beautiful tribute to George Ronald Carman.*