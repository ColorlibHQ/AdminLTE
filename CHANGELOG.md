# Changelog

All notable changes to AdminLTE will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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