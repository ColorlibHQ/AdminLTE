# [AdminLTE - Bootstrap 5 Admin Dashboard](https://adminlte.io)

[![npm version](https://img.shields.io/npm/v/admin-lte/latest.svg)](https://www.npmjs.com/package/admin-lte)
[![Packagist](https://img.shields.io/packagist/v/almasaeed2010/adminlte.svg)](https://packagist.org/packages/almasaeed2010/adminlte)
[![cdn version](https://data.jsdelivr.com/v1/package/npm/admin-lte/badge)](https://www.jsdelivr.com/package/npm/admin-lte)
[![Discord Invite](https://img.shields.io/badge/discord-join%20now-green)](https://discord.gg/jfdvjwFqfz)
[![Netlify Status](https://api.netlify.com/api/v1/badges/1277b36b-08f3-43fa-826a-4b4d24614b3c/deploy-status)](https://app.netlify.com/sites/adminlte-v4/deploys)

**AdminLTE** is a fully responsive administration template. Based on **[Bootstrap 5](https://getbootstrap.com/)** framework and also the JavaScript plugins.
Highly customizable and easy to use. Fits many screen resolutions from small mobile devices to large desktops.

## What's New in v4.0.0-rc6

**Security & Feature Release** - Important security fixes and new sidebar persistence feature:

- **Security Fixes** - Resolved 4 vulnerabilities (XSS in Astro, auth bypass, unsanitized attributes)
- **Sidebar State Persistence** - Sidebar now remembers collapsed/expanded state across page refreshes
- **Node.js 22** - Updated all GitHub Actions workflows to Node.js 22 LTS (supported until 2027)
- **Latest Dependencies** - 15+ packages updated including Astro 5.16.4, Prettier 3.7.4, Rollup 4.53.3
- **CI/CD Improvements** - Updated CodeQL actions to v3, fixed release workflow bugs

**Key Improvements:**

- ✅ Zero security vulnerabilities - all npm audit issues resolved
- ✅ Sidebar state persists in localStorage (configurable, SSR-safe, mobile-aware)
- ✅ GitHub Actions use Node.js 22 (Active LTS until April 2027)
- ✅ CodeQL security scanning updated to latest v3 actions
- ✅ Release workflow fixed for proper asset packaging

**Install the latest:**
```bash
npm install admin-lte@4.0.0-rc6
```

See the [CHANGELOG.md](CHANGELOG.md) for complete details.

## Looking for Premium Templates?

AdminLTE.io just opened a new premium templates page. Hand picked to ensure the best quality and the most affordable
prices. Visit <https://adminlte.io/premium> for more information.

!["AdminLTE Presentation"](https://adminlte.io/AdminLTE3.png "AdminLTE Presentation")

**AdminLTE** has been carefully coded with clear comments in all of its JS, SCSS and HTML files.
SCSS has been used to increase code customizability.

## Quick start

### Development

To start developing with AdminLTE:

1. **Install dependencies:** `npm install`
2. **Start development server:** `npm start` *(opens browser at http://localhost:3000)*
3. **Start coding!** Files auto-compile and refresh on changes

### Production Build

To build for production:

1. **Full production build:** `npm run production` *(includes linting and optimization)*
2. **Quick build:** `npm run build` *(faster for development/testing)*

### Available Scripts

- `npm start` - Start development server with file watching
- `npm run build` - Build all assets for development
- `npm run production` - Full production build with linting and bundlewatch
- `npm run lint` - Run all linters (JS, CSS, docs, lockfile)
- `npm run css` - Build CSS only
- `npm run js` - Build JavaScript only

## Browser Support

AdminLTE supports all modern browsers with the latest Bootstrap 5.3.7:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Platform Support

AdminLTE v4 build scripts work cross-platform:
- **Windows** - Command Prompt, PowerShell, Git Bash
- **macOS** - Terminal, iTerm2
- **Linux** - Bash, Zsh, and other Unix shells

All npm scripts use cross-platform utilities to ensure consistent behavior across different operating systems.

## Security & Production Deployment

### Important Security Notice

AdminLTE is a **UI template** - when deploying to production, follow these critical guidelines:

**What to Deploy:**
- Only compiled production assets: `dist/js/adminlte.min.js` and `dist/css/adminlte.min.css`
- Your application-specific files

**What NOT to Deploy:**
- `node_modules/` directory
- Demo/example HTML files (index.html, index2.html, index3.html, etc.)
- Source files (`src/` directory)
- Development configuration files

**CVE-2021-36471 Notice:**
This CVE is **disputed** and does not represent a vulnerability in AdminLTE. It refers to demo pages being accessible when developers incorrectly deploy example files to production. AdminLTE v4 has a clear separation between development demos and production assets. See [SECURITY.md](SECURITY.md) for complete details.

**Production Build:**
```bash
npm run production  # Builds optimized assets in dist/
```

For detailed security guidelines, authentication requirements, and best practices, see [SECURITY.md](SECURITY.md).

## Sponsorship

Support AdminLTE development by becoming a sponsor or donor.

<p align="center">
  <a href="https://github.com/sponsors/danny007in">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor on GitHub" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.paypal.me/daniel007in">
    <img src="https://img.shields.io/static/v1?label=Donate&message=%E2%9D%A4&logo=PayPal&color=%2300457C" alt="Donate via PayPal" />
  </a>
</p>

## Our Sponsors

<p align="center">
  <a href="https://github.com/spizzo14"><img src="https://unavatar.io/github/spizzo14?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: spizzo14" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/tomhappyblock"><img src="https://unavatar.io/github/tomhappyblock?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: tomhappyblock" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/stefanmorderca"><img src="https://unavatar.io/github/stefanmorderca?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: stefanmorderca" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/tito10047"><img src="https://unavatar.io/github/tito10047?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: tito10047" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/sitchi"><img src="https://unavatar.io/github/sitchi?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: sitchi" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/npreee"><img src="https://unavatar.io/github/npreee?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: npreee" loading="lazy" /></a>&nbsp;&nbsp;
  <a href="https://github.com/isaacmorais"><img src="https://unavatar.io/github/isaacmorais?fallback=https%3A%2F%2Fraw.githubusercontent.com%2FJamesIves%2Fgithub-sponsors-readme-action%2Fdev%2F.github%2Fassets%2Fplaceholder.png" width="50" height="50" alt="User avatar: isaacmorais" loading="lazy" /></a>&nbsp;&nbsp;
</p>

<p align="center">
  <a href="https://github.com/sponsors/danny007in">Your avatar here? Become a sponsor</a>
</p>

## Contributing

- Highly welcome.
- For your extra reference check [AdminLTE v4 Contribution Guide](https://github.com/ColorlibHQ/AdminLTE#contributing)
- First thing first, you should have bit knowledge about NodeJS.
- Github Knowledge.
- Install NodeJS LTS version.
- Clone this Repository to your machine and change to `master` branch.
- Go to Cloned Folder.
- In cli/bash run `npm install` it will install dependency from `package.json`.
- After installation completes, run `npm start`
- Cool, Send your changes in PR to `master` branch.


## License

AdminLTE is an open source project by [AdminLTE.io](https://adminlte.io) that is licensed under [MIT](https://opensource.org/licenses/MIT).
AdminLTE.io reserves the right to change the license of future releases.

## Image Credits

- [Pixeden](http://www.pixeden.com/psd-web-elements/flat-responsive-showcase-psd)
- [Graphicsfuel](https://www.graphicsfuel.com/2013/02/13-high-resolution-blur-backgrounds/)
- [Pickaface](https://pickaface.net/)
- [Unsplash](https://unsplash.com/)
- [Uifaces](http://uifaces.com/)
- [Unavatar](https://unavatar.io/)