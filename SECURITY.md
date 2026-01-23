# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in AdminLTE, please report it by emailing the maintainers or opening a private security advisory on GitHub. We take security seriously and will respond promptly.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 4.x     | :white_check_mark: |
| 3.x     | :x:                |
| < 3.0   | :x:                |

## Security Best Practices

AdminLTE is a frontend admin dashboard template. When deploying applications built with AdminLTE, follow these security best practices:

### 1. Production Deployment

- **Never expose `node_modules` directory** in production environments
- **Remove demo/example files** (like `index2.html`, `index3.html`) from production builds
- **Use a proper build process** that only includes necessary production assets
- **Configure web server properly** to prevent directory traversal attacks

### 2. Build Process

When deploying to production:

```bash
# Build only production assets
npm run production

# Deploy only the dist/ directory contents you need
# Typically: dist/js/adminlte.min.js and dist/css/adminlte.min.css
```

### 3. What NOT to Deploy

Do not deploy these to production:
- `node_modules/` directory
- Example/demo HTML files (`index.html`, `index2.html`, `index3.html`, etc.)
- Source files (`src/` directory)
- Development configuration files
- Documentation files

## Known CVE Issues

### CVE-2021-36471 (Disputed)

**Status**: This CVE is **disputed** and does not represent a vulnerability in AdminLTE itself.

**Issue**: CVE-2021-36471 claims AdminLTE 3.1.0 has a "Directory Traversal vulnerability" that allows remote attackers to view demo pages via `/admin/index2.html` and `/admin/index3.html`.

**Clarification**:
- The `index2.html` and `index3.html` files are **example/demo pages** intended for developer reference during development
- This is **not a vulnerability in AdminLTE** - it is a **deployment misconfiguration** by website developers
- The issue occurs when developers incorrectly deploy:
  - Their entire `node_modules` folder publicly
  - Demo/example files in production environments
  - Without proper web server configuration

**Resolution**:
- AdminLTE 4.x has restructured the project architecture with clear separation between development demos and production assets
- Follow the production deployment best practices above
- Only deploy the compiled production assets from `dist/js/` and `dist/css/`
- The original CVE researcher acknowledged this should be classified as low/info severity, not critical

**For More Information**:
- [GitHub Issue #4948](https://github.com/ColorlibHQ/AdminLTE/issues/4948)
- [CVE Record](https://www.cve.org/CVERecord?id=CVE-2021-36471) (marked as disputed)

## Secure Development

### Content Security Policy (CSP)

When implementing AdminLTE in your application, consider adding appropriate Content Security Policy headers to prevent XSS attacks.

### Authentication & Authorization

AdminLTE is a **UI template only** and does not include authentication or authorization. You must:
- Implement proper authentication in your backend
- Secure all API endpoints
- Use HTTPS in production
- Implement proper session management
- Follow OWASP security guidelines

### Dependencies

- Keep AdminLTE and its dependencies up to date
- Regularly run `npm audit` to check for vulnerabilities
- Review security advisories for Bootstrap and other dependencies

## Contact

For security concerns, please contact the maintainers through:
- GitHub Issues (for general questions)
- GitHub Security Advisories (for sensitive security issues)
- Project maintainer email (check package.json)
