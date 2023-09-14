---
layout: page
title: 
---

# Contributing to AdminLTE

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
    * To compile the dist files you need Node.js 14 or higher/npm (node package manager)
    * Delete ./package-lock.json file
    * `npm install` (install npm deps)
    * `npm run dev` (developer mode, autocompile with browsersync support for live demo)
    * Make your changes only in ./build Folder OR package.json OR ./dist/js/demo.js OR package-lock.json OR ./dist/js/pages/ OR ./docs OR in any html files which are necessary for contribution
    * Do not make changes in ./dist/css/ AND ./dist/js/ AND ./plugins Because it contains compiled files and do not include in PR (Pull Request)
    * `npm run production` (compile css/js files and test all pages are perfectly working fine, before creating a pull request)
4. Create a pull request

## Online one-click setup for contributing

You can use Gitpod(an online IDE which is free for Open Source) for working on issues or making PRs (Pull Requests). With a single click it will launch a workspace and automatically:

- clone the `AdminLTE` repo.
- install the dependencies.
- run `npm run dev` to start the server.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)
