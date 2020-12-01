# Introduction

[![npm version](https://img.shields.io/npm/v/admin-lte/latest.svg)](https://www.npmjs.com/package/admin-lte)
[![Packagist](https://img.shields.io/packagist/v/almasaeed2010/adminlte.svg)](https://packagist.org/packages/almasaeed2010/adminlte)
[![CDNJS](https://img.shields.io/cdnjs/v/admin-lte.svg)](https://cdnjs.com/libraries/admin-lte)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

**AdminLTE** is a fully responsive administration template. Based on **[Bootstrap 4.5](https://getbootstrap.com/)** framework and also the JS/jQuery plugin.
Highly customizable and easy to use. Fits many screen resolutions from small mobile devices to large desktops.

**Preview on [AdminLTE.io](https://adminlte.io/themes/v3)**

## Looking for Premium Templates?

AdminLTE.io just opened a new premium templates page. Hand picked to ensure the best quality and the most affordable
prices. Visit <https://adminlte.io/premium> for more information.

!["AdminLTE Presentation"](https://adminlte.io/AdminLTE3.png "AdminLTE Presentation")

**AdminLTE** has been carefully coded with clear comments in all of its JS, SCSS and HTML files.
SCSS has been used to increase code customizability.

## Installation

There are multiple ways to install AdminLTE.

### Download & Changelog:

Download from GitHub latest release [AdminLTE 3](https://github.com/ColorlibHQ/AdminLTE/latest).
Visit the [releases](https://github.com/ColorlibHQ/AdminLTE/releases) page to view the changelog.
Legacy Releases are [AdminLTE 2](https://github.com/ColorlibHQ/AdminLTE/releases/tag/v2.4.18) / [AdminLTE 1](https://github.com/ColorlibHQ/AdminLTE/releases/tag/1.3.1).

### Using The Command Line:

_**Important Note**: To install it via npm/Yarn, you need at least Node.js 10 or higher._

- **Via npm**

    ```bash
    npm install admin-lte@^3.0 --save
    ```

- **Via Yarn**

    ```bash
    yarn add admin-lte@^3.0
    ```

- **Via Composer**

    ```bash
    composer require "almasaeed2010/adminlte=~3.0"
    ```

- **Via Git**

    Clone to your machine

    ```bash
    git clone https://github.com/ColorlibHQ/AdminLTE.git
    ```

## Documentation

Visit the [online documentation](https://adminlte.io/docs/3.1/) for the most
updated guide. Information will be added on a weekly basis.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## How to Contribute

Contributions are always **welcome and recommended**! Here is how for beginner's: [Get started with open source click here](https://youtu.be/GbqSvJs-6W4)

1. Contribution Requirements : 
    * When you contribute, you agree to give a non-exclusive license to AdminLTE.io to use that contribution in any context as we (AdminLTE.io) see appropriate. 
    * If you use content provided by another party, it must be appropriately licensed using an [open source](https://opensource.org/licenses) license.
    * Contributions are only accepted through GitHub pull requests.
    * Finally, contributed code must work in all supported browsers (see above for browser support).
2. Installation :
    * Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
    * Clone to your machine

    ```bash
    git clone https://github.com/YOUR_USERNAME/AdminLTE.git
    ```
    * Create a new branch
3. Compile dist files (Development) :
    * To compile the dist files you need Node.js 10 or higher/npm (node package manager)
    * Delete ./package-lock.json file
    * `npm install` (install npm deps)
    * `npm run dev` (developer mode, autocompile with browsersync support for live demo)
    * Make your changes only in ./buid Folder OR package.json OR ./dist/js/demo.js OR in any html files which nessary to contribute
    * Do not changes in ./dist/css/ AND ./dist/js/ Because its compiled files
    * `npm run production` (compile css/js files and test every pages are perfectly working fine, before creating pull request)
4. Create a pull request

### Online one-click setup for contributing

You can use Gitpod(an online IDE which is free for Open Source) for working on issues or making Prs. With a single click it will launch a workspace and automatically:

- clone the `AdminLTE` repo.
- install the dependencies.
- run `yarn dev` to start the server.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

### Compile dist files

To compile the dist files you need Node.js/npm, clone/download the repo then:

1. `npm install` (install npm deps)
2. _Optional:_ `npm run dev` (developer mode, autocompile with browsersync support for live demo)
3. `npm run production` (compile css/js files)

## License

AdminLTE is an open source project by [AdminLTE.io](https://adminlte.io) that is licensed under [MIT](https://opensource.org/licenses/MIT).
AdminLTE.io reserves the right to change the license of future releases.

## Image Credits

- [Pixeden](http://www.pixeden.com/psd-web-elements/flat-responsive-showcase-psd)
- [Graphicsfuel](https://www.graphicsfuel.com/2013/02/13-high-resolution-blur-backgrounds/)
- [Pickaface](https://pickaface.net/)
- [Unsplash](https://unsplash.com/)
- [Uifaces](http://uifaces.com/)
