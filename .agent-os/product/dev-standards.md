# Development Standards - George R. Carman Memorial Website

> Version: 1.0.0
> Last Updated: 2025-08-26
> Scope: Project-specific development guidelines

## Code Style & Formatting

### HTML Standards
- **DOCTYPE**: Always use HTML5 `<!DOCTYPE html>`
- **Semantic Elements**: Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`)
- **Accessibility**: Include proper `alt` attributes, `lang` attributes, and ARIA labels
- **Meta Tags**: Include viewport meta tag for responsive design
- **Indentation**: Use tabs (4-space visual width)

### CSS Standards
- **Embedded Styles**: Keep CSS embedded in HTML for simplicity (single-file deployment)
- **Modern Features**: Leverage CSS3 features (flexbox, grid, gradients, transforms)
- **Mobile-First**: Design for mobile first, enhance for desktop
- **Color Palette**: Use consistent color scheme reflecting memorial theme
- **Typography**: Georgia serif font for elegant, readable memorial content

### JavaScript Standards
- **ES6+**: Use modern JavaScript features (arrow functions, const/let, template literals)
- **Vanilla JS**: No external frameworks - keep dependencies minimal
- **Error Handling**: Graceful fallbacks for image loading failures
- **Memory Management**: Clean up event listeners and intervals appropriately

## File Naming Conventions

### Source Images (`pics/` folder)
- **Preserve Original Names**: Keep camera/phone generated filenames
- **Contributor Attribution**: Add contributor name when known (e.g., "IMG_5081 Hilaire.jpg")
- **Format Support**: Accept JPG, PNG, HEIC formats as received from family

### Processed Images (`optimized-images/` folder)
- **WebP Extension**: All processed images use `.webp` extension
- **Name Preservation**: Maintain original filename structure for easy correlation
- **Consistent Naming**: Processed images match source names except for extension

### Code Files
- **Descriptive Names**: Use clear, descriptive filenames
- **Hyphen Separation**: Use hyphens for multi-word filenames
- **Purpose Clarity**: Filename should indicate file purpose (e.g., `robust-image-processor.js`)

## Image Processing Standards

### Quality Settings
- **WebP Quality**: 85% - optimal balance of file size and visual quality
- **Maximum Dimensions**: 1200x1200px - maintains quality while reducing file size
- **Aspect Ratio**: Always preserve original aspect ratio
- **Orientation**: Correct orientation using EXIF data and validation

### Processing Workflow
```bash
# Standard workflow for adding photos
1. npm install                    # Ensure dependencies installed
2. cp /path/to/photos/* pics/     # Copy new photos to pics folder
3. npm run robust-process         # Process all new images
4. git add .                      # Stage all changes
5. git commit -m "Add [X] new photos - description"
6. git push origin main           # Deploy to GitHub Pages
```

### Error Handling
- **Continue Processing**: Never stop batch processing due to single image failure
- **Detailed Logging**: Log success/failure for each image processed
- **Progress Reporting**: Show progress during batch processing
- **Graceful Degradation**: Skip problematic images, continue with rest

## Version Control Standards

### Commit Messages
```bash
# Format: Action type: Description - counts/details
"Add 12 new photos - gallery now has 180 optimized images total"
"Fix gallery navigation bug in mobile view"
"Update memorial text - add birth/death dates"
"Optimize image processor - improve HEIC handling"
```

### Branching Strategy
- **Main Branch**: Production-ready code, auto-deploys to GitHub Pages
- **Feature Branches**: For significant changes, merge via pull request
- **Hotfix**: Direct commits to main for urgent fixes (broken images, typos)

### What to Commit
- **Always Include**: Source images in `pics/`, processed images in `optimized-images/`
- **Code Changes**: Any HTML, CSS, JavaScript modifications
- **Documentation**: README updates, configuration changes
- **Dependencies**: package.json and package-lock.json changes

## Testing Standards

### Manual Testing Checklist
- [ ] **Image Processing**: Verify new images process correctly
- [ ] **Gallery Functionality**: Test slideshow, navigation, modal close
- [ ] **Mobile Responsiveness**: Check layout on phone/tablet
- [ ] **Performance**: Verify reasonable loading times
- [ ] **Accessibility**: Check keyboard navigation, screen reader compatibility

### Browser Testing
- **Primary**: Modern Chrome, Safari, Firefox
- **Mobile**: iOS Safari, Android Chrome
- **Legacy**: Basic functionality in older browsers

### Deployment Testing
- **GitHub Pages**: Verify site deploys correctly after push
- **Image Display**: Check that new images appear in gallery
- **Responsive Layout**: Test on various screen sizes

## Performance Standards

### Image Optimization Goals
- **File Size Reduction**: Target 70-90% reduction from original size
- **Processing Speed**: 2-5 seconds per image (acceptable for batch processing)
- **Memory Usage**: Process images individually to avoid memory issues
- **Error Rate**: <5% processing failures acceptable

### Web Performance Goals
- **Initial Load**: Memorial page loads in under 3 seconds
- **Gallery Open**: Gallery modal opens within 1 second
- **Image Transitions**: Smooth transitions between gallery images
- **Mobile Performance**: Maintain performance on slower mobile connections

## Accessibility Standards

### Memorial Page Requirements
- **Alt Text**: Descriptive alt text for hero image
- **Headings**: Proper heading hierarchy (h1, h2, h3)
- **Focus Management**: Keyboard navigation support
- **Color Contrast**: Ensure sufficient contrast for text readability
- **Font Sizing**: Readable font sizes across devices

### Gallery Requirements
- **Keyboard Navigation**: Arrow keys for image navigation, ESC to close
- **Screen Reader**: Image descriptions and navigation instructions
- **Focus Trapping**: Keep focus within modal when open
- **Close Options**: Multiple ways to close gallery (X button, ESC key, outside click)

## Maintenance Standards

### Regular Tasks
- **Monthly**: Review site functionality, check for broken images
- **As Needed**: Process new photos from family contributions
- **Annually**: Review dependencies for security updates
- **Ongoing**: Monitor GitHub Pages deployment status

### Family Member Guidelines
- **Photo Sharing**: Email photos to maintainer or use shared folder
- **Quality**: Any photo quality acceptable - processor handles optimization
- **Format**: JPG, PNG, HEIC all supported
- **Naming**: Original filenames preserved, contributor attribution helpful

---

*These standards ensure the memorial website remains a beautiful, functional tribute while being maintainable by family members with varying technical expertise.*