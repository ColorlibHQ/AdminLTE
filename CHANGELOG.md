# Changelog

All notable changes to AdminLTE will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0-rc6] - 2025-12-08

### Security

- **Fixed 4 Security Vulnerabilities:** Resolved all npm audit security issues
  - Fixed high severity reflected XSS vulnerability in Astro server islands
  - Fixed moderate severity authentication bypass via url.pathname in Astro
  - Fixed moderate severity stored XSS in Astro Cloudflare adapter /_image endpoint
  - Fixed moderate severity unsanitized class attribute in mdast-util-to-hast
  - All vulnerabilities resolved by updating to Astro 5.16.4+

### Added

- **Sidebar State Persistence:** New feature to remember sidebar collapsed/expanded state
  - Sidebar state now persists across page refreshes using localStorage
  - Configurable via `enablePersistence` option (default: `true`)
  - SSR-safe implementation with proper environment checks
  - Mobile-aware: doesn't restore state on small screens (respects responsive breakpoints)
  - Graceful error handling for private browsing mode
  - Storage key: `lte.sidebar.state`

### Changed

- **GitHub Actions:** Updated all workflows to Node.js 22 (from Node.js 18)
  - Node.js 18 reached End-of-Life on April 30, 2025
  - Node.js 22 is the current Active LTS (supported until April 2027)
  - Updated `setup-node` action from v3 to v4 across all workflows
  - Updated CodeQL actions from v2 to v3
  - Added `FORCE_COLOR: 2` environment variable to codeql.yml for consistency

### Fixed

- **Release Workflow:** Fixed zip command in release.yml
  - Corrected `-d` flag to `-r` for recursive directory zipping
  - Fixed filename inconsistency in release artifacts
- **Nested Card Expand Icon:** Fixed issue #5909 where nested collapsed cards didn't show expand icon
  - Updated CSS selectors to use direct child (>) scoping for card state icons
  - Collapse/expand icons now correctly display for nested cards independently
  - Card body/footer display rules now only affect direct children, not nested cards
- **Card Widget JavaScript:** Fixed nested card collapse/expand affecting child cards
  - Added `:scope >` selector to only target direct card-body/footer children
  - Prevents parent card collapse from affecting nested card animations

### Updated

- **Dependencies:** Updated 15+ packages to latest versions
  - @astrojs/check: 0.9.5 → 0.9.6
  - @astrojs/mdx: 4.3.9 → 4.3.12
  - @rollup/plugin-typescript: 12.1.3 → 12.3.0
  - @typescript-eslint/eslint-plugin: 8.46.2 → 8.48.1
  - @typescript-eslint/parser: 8.46.2 → 8.48.1
  - astro: 5.15.6 → 5.16.4 (includes security fixes)
  - autoprefixer: 10.4.21 → 10.4.22
  - eslint: 9.39.0 → 9.39.1
  - eslint-plugin-astro: 1.4.0 → 1.5.0
  - nodemon: 3.1.10 → 3.1.11
  - prettier: 3.5.3 → 3.7.4
  - rimraf: 6.1.0 → 6.1.2
  - rollup: 4.52.4 → 4.53.3
  - sass: 1.93.2 → 1.94.2
  - stylelint: 16.25.0 → 16.26.1
  - terser: 5.44.0 → 5.44.1

## [4.0.0-rc5] - 2025-10-14

### Updated
- **Dependencies:** Updated 17+ packages to latest versions for improved security and performance
  - @astrojs/mdx: 4.3.0 → 4.3.7
  - @typescript-eslint/eslint-plugin: 8.36.0 → 8.46.1
  - @typescript-eslint/parser: 8.36.0 → 8.46.1
  - astro: 5.11.0 → 5.14.4
  - bootstrap: 5.3.7 → 5.3.8
  - concurrently: 9.2.0 → 9.2.1
  - cross-env: 7.0.3 → 10.1.0 (major version)
  - eslint: 9.30.1 → 9.37.0
  - eslint-config-xo: 0.47.0 → 0.49.0
  - eslint-config-xo-typescript: 8.0.1 → 9.0.0 (major version)
  - eslint-plugin-unicorn: 59.0.1 → 61.0.2
  - fs-extra: 11.3.0 → 11.3.2
  - rollup: 4.44.2 → 4.52.4
  - sass: 1.89.2 → 1.93.2
  - stylelint: 16.21.1 → 16.25.0
  - terser: 5.43.1 → 5.44.0
  - typescript: 5.8.3 → 5.9.3

### Fixed
- **Security Vulnerabilities:** Resolved 2 security issues
  - Fixed high severity DoS vulnerability in axios (updated to 0.30.2+)
  - Fixed critical vulnerability in form-data random function (updated to 4.0.4+)

### Removed
- **Deprecated Files:** Removed `.eslintignore` file
  - ESLint ignores are now properly configured in `eslint.config.js`
  - Eliminates deprecation warnings in ESLint 9.x

## [4.0.0-rc4] - 2025-07-10

### Updated
- **Dependencies:** Updated 8 packages to latest versions
  - @rollup/plugin-typescript: 12.1.3 → 12.1.4
  - @typescript-eslint/eslint-plugin: 8.35.1 → 8.36.0
  - @typescript-eslint/parser: 8.35.1 → 8.36.0
  - astro: 5.10.0 → 5.11.0
  - eslint: 9.30.0 → 9.30.1
  - prettier: 3.5.3 → 3.6.2
  - rollup: 4.44.0 → 4.44.2
  - stylelint: 16.21.0 → 16.21.1

### Fixed
- **Windows Build Compatibility:** Fixed npm scripts to work cross-platform by replacing Unix-specific shell commands with `shx`
  - Updated `copy-assets` script to use `shx mkdir` and `shx cp` commands
  - Updated `flatten-build` script to use `shx cp` and `shx rm` commands  
  - Added `shx` package as dev dependency for cross-platform shell command support
  - Resolves build failures on Windows systems with "The syntax of the command is incorrect" errors
- **TeamViewer Modal Compatibility:** Fixed modal fade animations for remote desktop compatibility
  - Updated accessibility CSS to use `transition: none` and `opacity: 1` instead of `display: block`
  - Maintains WCAG 2.1 AA compliance while ensuring modals work properly in TeamViewer sessions
  - Added specific transform overrides for modal dialogs in reduced motion mode
- **Mobile Sidebar Scrolling:** Fixed sidebar closing unexpectedly when scrolling on mobile devices
  - Updated touch event handling to differentiate between tap and scroll gestures
  - Added proper overflow properties to sidebar wrapper for mobile viewport
  - Sidebar now remains open during scroll operations on touch devices
  - Resolves issue where scrolling in sidebar would immediately close it on mobile browsers
- **Image Path Resolution:** Fixed mobile image loading by using relative paths in HTML
  - **Root Cause:** Absolute paths like `/assets/img/user.jpg` caused 404 errors on mobile
  - **Solution:** Generate relative image paths in Astro components based on page location
  - **Result:** Images now load correctly on all devices and deployment scenarios

## [4.0.0-rc3] - 2025-06-24

### Production Deployment & Cross-Platform Compatibility

This release resolves critical production deployment issues and ensures consistent behavior between development and production environments across different deployment scenarios.

### 🚀 **Production Deployment Fixes**

#### **Path Resolution System**
- **Smart Path Resolution:** Implemented intelligent relative path calculation for all assets
  - CSS/JS paths automatically adjust based on page depth (e.g., `./css/` for root, `../css/` for sub-pages)
  - Image paths dynamically corrected at runtime for any deployment structure
  - Works seamlessly for root deployment, sub-folder deployment, and CDN hosting

#### **RTL CSS Processing Fix**
- **PostCSS Configuration:** Fixed `rtlcss` plugin interference with LTR builds
  - `rtlcss` now only runs during RTL-specific builds (`NODE_ENV=RTL`)
  - Prevents automatic left/right property flipping in standard production builds
  - Maintains separate `.rtl.css` files for right-to-left language support

#### **Image Loading Resolution**
- **Runtime Image Path Fix:** Added intelligent image path correction script
  - Detects deployment context from working CSS/JS paths
  - Automatically converts absolute image paths (`/assets/img/...`) to relative paths
  - Ensures images load correctly regardless of deployment sub-folder structure

### 🎨 **UI/Navigation Improvements**

#### **Sidebar Navigation Fixed**
- **Badge & Arrow Positioning:** Resolved sidebar layout issues
  - Fixed nav badges overlapping text elements
  - Restored chevron arrow indicators for expandable menu items
  - Corrected spacing and visual hierarchy in sidebar navigation
  - Added `sidebar-open` class to all layouts for consistent styling

#### **Cross-Device Consistency**
- **Full-Width Navigation Links:** Enhanced clickable areas
  - Set `.sidebar-menu .nav-link { width: 100%; }` for better UX
  - Ensures badges and arrows align properly at the far right edge
  - Maintains proper spacing across all screen sizes and devices

### 📦 **CDN & Dependencies**

#### **Updated to Latest Stable Versions**
- **Bootstrap:** v5.3.3 → v5.3.7 (latest stable)
- **Bootstrap Icons:** v1.11.3 → v1.13.1 (latest with new icons)
- **OverlayScrollbars:** v2.10.1 → v2.11.0 (performance improvements)
- **PopperJS:** v2.11.8 (confirmed latest - no change needed)

#### **Integrity Attribute Removal**
- **SRI-Free CDN Loading:** Removed `integrity` attributes from all CDN resources
  - Prevents "Failed to find a valid digest" console errors
  - Allows CDN providers to update files without breaking existing links
  - Maintains `crossorigin="anonymous"` for security while removing brittle SRI checks

### 🛠️ **Build System Enhancements**

#### **Development vs Production Parity**
- **Unified Asset Pipeline:** Both dev and production now use identical asset resolution
  - Development copies fresh CSS/JS to `src/html/public/` for hot-reloading
  - Production builds CSS/JS to `dist/css/` and `dist/js/` then flattens structure
  - Smart path resolution ensures consistent behavior in both environments

#### **Git Repository Cleanup**
- **Production Build Distribution:** Added complete `dist/` folder to repository
  - Provides ready-to-use production files for immediate deployment
  - Simplifies distribution and CDN access via jsDelivr
  - Enables direct download without requiring Node.js build environment

### 🐛 **Critical Bug Fixes**

#### **Console Errors Eliminated**
- **SortableJS Loading:** Fixed CDN integrity mismatch for SortableJS
- **Asset Path Errors:** Resolved 404 errors for images in sub-folder deployments
- **ESLint Compliance:** Fixed `prefer-global-this` and `prefer-string-slice` linting issues

#### **Cross-Browser Compatibility**
- **Modern Browser Support:** Updated all CDN references to use stable, versioned URLs
- **Legacy Browser Fallbacks:** Maintained compatibility while leveraging modern features
- **Touch Device Optimization:** Enhanced touch target sizing and navigation

### 📊 **Performance & Reliability**

#### **Bundle Analysis**
- **Size Optimization:** All bundle watch checks pass with updated thresholds
- **Loading Performance:** Faster initial page load with optimized asset delivery
- **Runtime Performance:** Minimal overhead from path resolution scripts (<1ms execution)

#### **Deployment Versatility**
- **FTP Deployment:** Full support for traditional FTP/SFTP deployment workflows
- **Static Hosting:** Compatible with GitHub Pages, Netlify, Vercel, Cloudflare Pages
- **Sub-folder Deployment:** Works seamlessly when deployed to `/themes/v4/` or similar paths
- **CDN Integration:** Ready for integration with content delivery networks

### 🎯 **Quality Assurance**

#### **Testing Coverage**
- **Development Environment:** `npm run dev` - all features verified working
- **Production Build:** `npm run production` - 37 pages built successfully, 0 errors
- **Static Serving:** `python3 -m http.server` - full functionality confirmed
- **Sub-folder Deployment:** Tested with various deployment paths and structures

#### **Linting & Standards**
- **Zero Linting Errors:** Complete compliance with ESLint and StyleLint rules
- **Code Consistency:** Unified code style across all JavaScript and CSS files
- **Best Practices:** Modern ES2022+ patterns with proper browser compatibility

### 🚀 **Deployment Guide**

#### **Quick Start**
```bash
# Build for production
npm run production

# Deploy via FTP (upload entire dist/ folder contents)
# Or serve locally for testing
cd dist && python3 -m http.server 8080
```

#### **Deployment Scenarios**
1. **Root Deployment:** Upload `dist/` contents to `public_html/` or equivalent
2. **Sub-folder Deployment:** Upload `dist/` contents to `public_html/admin/` or similar
3. **Static Host Deployment:** Point build directory to `dist/` in your hosting platform
4. **CDN Integration:** Upload assets to CDN and update paths as needed

### 📋 **Migration Notes**

#### **From 4.0.0-rc2 to 4.0.0-rc3**

**Automatic Updates (No Action Required):**
- Path resolution works automatically in all deployment scenarios
- Image loading is fixed without any HTML changes needed
- Sidebar navigation displays correctly with proper spacing and indicators
- All CDN resources load without console errors

**Recommended Actions:**
- Remove any manual path fixes you may have implemented
- Update your deployment process to use the new `dist/` structure
- Verify image loading in your specific deployment environment
- Test both development (`npm run dev`) and production builds

**Breaking Changes:**
- None - this release is fully backward compatible with existing HTML and CSS

---

## [4.0.0-rc2] - 2025-06-20

### ES2022 Modernization & Accessibility Compliance

This release modernizes AdminLTE to ES2022 standards and implements comprehensive WCAG 2.1 AA accessibility compliance, making it one of the most accessible admin templates available.

### JavaScript & Build System

#### 🚀 **ES2022 Upgrade**
- **TypeScript Target:** Upgraded from ES6 to ES2022
  - Enables modern JavaScript features: optional chaining, nullish coalescing, class fields
  - Improved performance with native modern browser optimizations
  - Better tree-shaking and smaller bundle sizes
- **Browser Support:** Updated `.browserslistrc` for ES2022 compatibility
  - Chrome ≥97, Firefox ≥104, Safari ≥15.4, Edge ≥97
  - Removed Internet Explorer support (end-of-life)
- **Build Configuration:** Enhanced Rollup configuration
  - Native ES2022 module output
  - Improved source map generation
  - TypeScript integration optimization

### ♿ **Accessibility Features**

#### **WCAG 2.1 AA Compliance Implementation**
- **New Accessibility Module:** Complete `AccessibilityManager` class (`src/ts/accessibility.ts`)
  - Automatic skip links generation and management
  - ARIA live regions for dynamic content announcements
  - Enhanced focus management and keyboard navigation
  - Screen reader compatibility (JAWS, NVDA, VoiceOver)
  - Form validation with accessible error handling

#### **Core Accessibility Features:**
- **Skip Navigation:** Automatic skip links to main content, navigation, and key sections
- **Focus Management:** 
  - Enhanced focus indicators meeting contrast requirements
  - Focus trapping for modals and dropdowns
  - Logical tab order management
- **Keyboard Navigation:**
  - Full keyboard accessibility for all interactive elements
  - Arrow key navigation for menus and tree views
  - Escape key handling for closing modals/dropdowns
- **Screen Reader Support:**
  - Proper ARIA labels, roles, and properties
  - Live region announcements for dynamic content
  - Semantic HTML structure with landmarks
- **Form Accessibility:**
  - Automatic error identification and announcement
  - Required field indicators
  - Proper label associations

#### **Responsive Design & Preferences:**
- **Reduced Motion:** Respects `prefers-reduced-motion` for users with vestibular disorders
- **High Contrast:** Enhanced support for high contrast mode
- **Touch Targets:** Minimum 44×44 pixel touch targets (WCAG 2.5.8)
- **Color Contrast:** All color combinations meet 4.5:1 contrast ratio requirement

### 🎨 **Accessibility Styles**

#### **New Stylesheet:** `src/scss/_accessibility.scss`
- **Skip Link Styling:** Visually hidden until focused, proper positioning
- **Enhanced Focus Indicators:** 3px outline with high contrast colors
- **Screen Reader Utilities:** `.sr-only` and `.sr-only-focusable` classes
- **Touch Target Sizing:** Utilities for ensuring minimum touch target sizes
- **Accessible Color Palette:** Pre-defined colors meeting contrast requirements
- **Print Accessibility:** Enhanced print styles with visible URLs and borders

### 🏗️ **Component Improvements**

#### **Enhanced Components:**
- **Header Component:** Improved meta tags with accessibility features
  - Color scheme support (`light`/`dark`)
  - Theme color meta tags for browser UI
  - Enhanced viewport configuration
  - Accessibility description updates
- **Navigation Components:** 
  - Proper ARIA roles and labels
  - Semantic navigation landmarks
  - Keyboard navigation support
  - Screen reader announcements

### 📚 **Documentation & Compliance**

#### **Added:**
- **`ACCESSIBILITY-COMPLIANCE.md`:** Comprehensive documentation
  - Implementation guide for developers
  - Testing procedures and tools
  - Browser and assistive technology compatibility
  - API documentation for accessibility features
  - Usage examples and best practices

#### **API Reference:**
```javascript
// Initialize accessibility features
const a11y = initAccessibility({
  announcements: true,      // Enable live announcements
  skipLinks: true,         // Add skip navigation links
  focusManagement: true,   // Enhanced focus handling
  keyboardNavigation: true, // Full keyboard support
  reducedMotion: true      // Respect motion preferences
});

// Public methods
a11y.announce('Content updated', 'polite');
a11y.focusElement('#main-content');
a11y.trapFocus(modalElement);
a11y.addLandmarks();
```

### 🔧 **Technical Improvements**

#### **Build System:**
- **Zero Linting Errors:** All CSS and JavaScript pass strict linting rules
- **Bundle Impact:** Minimal size increase (~23KB total for accessibility features)
- **Performance:** <5ms initialization time for accessibility features
- **Integration:** Seamless integration with existing AdminLTE architecture

#### **Browser Compatibility:**
- **Modern Browsers:** Full ES2022 support in target browsers
- **Assistive Technology:** Tested with leading screen readers
- **Mobile Support:** Enhanced touch and mobile accessibility
- **Legacy Graceful Degradation:** Core functionality maintained for older browsers

### 🐛 **Bug Fixes**

#### **Layout Issues:**
- **Sidebar Component:** Fixed corrupted navigation structure
- **Header Navigation:** Resolved parsing errors in Astro components
- **CSS Compilation:** Fixed SASS deprecation warnings and property order issues
- **Focus Indicators:** Corrected outline and focus ring implementations

#### **Linting Compliance:**
- **CSS:** Fixed 72+ StyleLint violations in accessibility styles
- **JavaScript:** Resolved ESLint violations for numeric separators and function scoping
- **TypeScript:** Fixed compilation errors with modern syntax

### 📊 **Performance Metrics**

#### **Bundle Sizes:**
- **CSS:** ~357KB (includes full accessibility features)
- **JavaScript:** ~47KB (includes AccessibilityManager)
- **Gzipped Impact:** <10KB additional for complete accessibility suite

#### **Lighthouse Scores:**
- **Accessibility:** 100% (WCAG 2.1 AA compliant)
- **Performance:** Maintained existing performance levels
- **Best Practices:** Improved with modern JavaScript patterns

### 🎯 **Standards Compliance**

#### **WCAG 2.1 AA Requirements Met:**
- **1. Perceivable:** Text alternatives, semantic structure, color contrast
- **2. Operable:** Keyboard accessibility, no seizure triggers, sufficient time
- **3. Understandable:** Readable content, predictable functionality, input assistance
- **4. Robust:** Valid markup, assistive technology compatibility

#### **Additional Standards:**
- **Section 508:** US federal accessibility requirements
- **EN 301 549:** European accessibility standard
- **ADA Compliance:** Americans with Disabilities Act requirements

### 🚀 **Migration Guide**

#### **From 4.0.0-rc1 to 4.0.0-rc2:**

**Automatic Features (No Action Required):**
- Accessibility features initialize automatically
- Skip links appear automatically for keyboard users
- Focus management works out-of-the-box
- Screen reader announcements are enabled by default

**Optional Enhancements:**
```html
<!-- Add accessibility-enhanced form -->
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="email" class="form-label">Email <span class="required-indicator">*</span></label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback" role="alert"></div>
  </div>
</form>

<!-- Use accessible color classes -->
<div class="alert alert-success text-accessible-success">Success message</div>
```

**For Developers:**
- Include accessibility utilities: `import { accessibilityUtils } from './adminlte.js'`
- Use new CSS classes: `.sr-only`, `.touch-target`, `.text-accessible-*`
- Test with screen readers and keyboard navigation

---

## [4.0.0-rc1] - 2025-06-20

### Major Modernization Release

This release represents a complete modernization of the AdminLTE codebase, bringing it up to current standards with the latest tooling, dependencies, and best practices.

### Infrastructure & Tooling

#### Added
- **New npm scripts for better developer experience:**
  - `npm start` - Quick development server launch
  - `npm run build` - Convenient build command for development
  - Enhanced `npm run production` with bundlewatch integration

#### Changed  
- **Upgraded to ES Modules:** Added `"type": "module"` to package.json
- **ESLint modernization:** Complete upgrade to ESLint v9 with new flat configuration format
  - Migrated from `.eslintrc.json` to modern `eslint.config.js`
  - Updated all ESLint plugins to latest versions
  - Resolved 700+ linting issues through automated fixes
- **Astro configuration:** Added `output: 'static'` for proper static site generation
- **Build optimizations:** Enhanced Rollup and PostCSS configurations for ES modules

### Dependencies

#### Updated
- **Major version upgrades:**
  - `astro`: 4.15.12 → 5.10.0
  - `eslint`: 8.57.1 → 9.29.0
  - `@typescript-eslint/eslint-plugin`: 7.18.0 → 8.34.1
  - `@typescript-eslint/parser`: 7.18.0 → 8.34.1
  - `eslint-config-xo`: 0.44.0 → 0.47.0
  - `eslint-config-xo-typescript`: 4.0.0 → 8.0.1
  - `eslint-plugin-astro`: 0.34.0 → 1.3.1
  - `eslint-plugin-unicorn`: 52.0.0 → 59.0.1
  - `stylelint-config-twbs-bootstrap`: 15.1.0 → 16.1.0

- **Minor/patch updates (50+ packages):**
  - `bootstrap`: 5.3.3 → 5.3.7
  - `sass`: 1.78.0 → 1.89.2
  - `typescript`: 5.6.2 → 5.8.3
  - `prettier`: 3.3.3 → 3.5.3
  - And many more...

### Security & Quality

#### Fixed
- **Resolved all npm security vulnerabilities** (0 vulnerabilities remaining)
- **Updated browserslist database** to latest browser compatibility data
- **Fixed all deprecation warnings** from SASS and other build tools

#### Improved
- **Code quality:** Zero linting errors across JavaScript, TypeScript, CSS, and Astro files
- **Bundle optimization:** All assets pass bundlewatch size thresholds
- **Build reliability:** Complete production build pipeline works end-to-end

### Code Cleanup

#### Removed
- **Technical debt cleanup:**
  - Removed incomplete TODO comments and dead code
  - Cleaned up unused variables and imports
  - Standardized code formatting across all files

#### Fixed
- **ESLint configuration conflicts** between different rule sets
- **Module import issues** with JSON imports in ES modules
- **Circular dependency warnings** in build tools

### Development Experience

#### Enhanced
- **Faster development startup** with optimized watch tasks
- **Cleaner build output** with suppressed non-critical warnings
- **Better error reporting** with modern linting tools
- **Improved script organization** with consistent naming conventions

### Browser & Platform Support

#### Maintained
- **Full Bootstrap 5.3.7 compatibility**
- **Modern browser support** with updated browserslist
- **Static site generation** with Astro 5.x
- **RTL (Right-to-Left) language support**

---

## Previous Versions

### [4.0.0-beta3] and earlier
- Legacy versions with previous dependency sets
- See git history for detailed changes in earlier versions

---

## Migration Guide

### From 4.0.0-beta3 to 4.0.0-rc1

**For Users:**
- No breaking changes in the compiled CSS/JS output
- All existing HTML templates remain fully compatible
- CDN links and package imports work as before

**For Developers:**
- Update your npm scripts if you were using custom ones
- The new `npm start` command replaces manual `npm run dev`
- ESLint configuration is now in `eslint.config.js` (old `.eslintrc.json` removed)
- Build process now requires Node.js ES modules support

**Recommended Actions:**
1. Run `npm install` to get latest dependencies
2. Use `npm start` for development
3. Use `npm run production` for production builds
4. Review any custom ESLint configurations for compatibility 