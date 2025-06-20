# Changelog

All notable changes to AdminLTE will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0-rc1] - 2024-12-20

### 🎉 Major Modernization Release

This release represents a complete modernization of the AdminLTE codebase, bringing it up to current standards with the latest tooling, dependencies, and best practices.

### 🔧 **Infrastructure & Tooling**

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

### 📦 **Dependencies**

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

### 🛡️ **Security & Quality**

#### Fixed
- **Resolved all npm security vulnerabilities** (0 vulnerabilities remaining)
- **Updated browserslist database** to latest browser compatibility data
- **Fixed all deprecation warnings** from SASS and other build tools

#### Improved
- **Code quality:** Zero linting errors across JavaScript, TypeScript, CSS, and Astro files
- **Bundle optimization:** All assets pass bundlewatch size thresholds
- **Build reliability:** Complete production build pipeline works end-to-end

### 🧹 **Code Cleanup**

#### Removed
- **Technical debt cleanup:**
  - Removed incomplete TODO comments and dead code
  - Cleaned up unused variables and imports
  - Standardized code formatting across all files

#### Fixed
- **ESLint configuration conflicts** between different rule sets
- **Module import issues** with JSON imports in ES modules
- **Circular dependency warnings** in build tools

### 📋 **Development Experience**

#### Enhanced
- **Faster development startup** with optimized watch tasks
- **Cleaner build output** with suppressed non-critical warnings
- **Better error reporting** with modern linting tools
- **Improved script organization** with consistent naming conventions

### 💻 **Browser & Platform Support**

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