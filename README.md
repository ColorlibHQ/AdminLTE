**I apologize to everyone for my slow rate of response and development recently.** This is my final semester and I am very busy. Although I usually work on AdminLTE a few hours a week, there are weeks full of exams and assignments. Thanks for your understanding.

Introduction
============

![Bower version](https://img.shields.io/bower/v/adminlte.svg)
[![npm version](https://img.shields.io/npm/v/admin-lte.svg)](https://www.npmjs.com/package/admin-lte)
[![Packagist](https://img.shields.io/packagist/v/almasaeed2010/adminlte.svg)](https://packagist.org/packages/almasaeed2010/adminlte)

**AdminLTE** -- is a fully responsive admin template. Based on **[Bootstrap 3](https://github.com/twbs/bootstrap)** framework. Highly customizable and easy to use. Fits many screen resolutions from small mobile devices to large desktops. Check out the live preview now and see for yourself.

**Download & Preview on [Almsaeed Studio](https://almsaeedstudio.com)**

Looking for Premium Templates?
------------------------------
**Almsaeed studio just opened a new premium templates page. Hand picked to insure the best quality and the most affordable prices. Visit https://almsaeedstudio.com/premium for more information.**


!["AdminLTE Presentation"] (https://almsaeedstudio.com/AdminLTE2.png "AdminLTE Presentation")

**AdminLTE** has been carefully coded with clear comments in all of its JS, LESS and HTML files. LESS has been used to increase code customizability.

Installation
------------
There are multiple ways to install AdminLTE.

####Download:

Download from Github or [visit Almsaeed Studio](https://almsaeedstudio.com) and download the latest release.

####Using The Command Line:

**Github**

- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
- Clone to your machine
```
git clone https://github.com/YOUR_USERNAME/AdminLTE.git
```

**Bower**

```
bower install admin-lte
```

**npm**

```
npm install --save admin-lte
```

**Composer**

```
composer require "almasaeed2010/adminlte=~2.0"
```

Documentation
-------------
Visit the [online documentation](https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html) for the most
updated guide. Information will be added on a weekly basis.

Browser Support
---------------
- IE 9+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)

Contribution
------------
Contribution are always **welcome and recommended**! Here is how:

- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
- Clone to your machine ```git clone https://github.com/YOUR_USERNAME/AdminLTE.git```
- Make your changes
- Create a pull request

#### Contribution Requirements:

- When you contribute, you agree to give a non-exclusive license to Almsaeed Studio to use that contribution in any context as we (Almsaeed Studio) see appropriate.
- If you use content provided by another party, it must be appropriately licensed using an [open source](http://opensource.org/licenses) license.
- Contributions are only accepted through Github pull requests.
- Finally, contributed code must work in all supported browsers (see above for browser support).

License
-------
AdminLTE is an open source project by [Almsaeed Studio](https://almsaeedstudio.com) that is licensed under [MIT](http://opensource.org/licenses/MIT). Almsaeed Studio
reserves the right to change the license of future releases.

Todo List
---------
- ~~Light sidebar colors~~ (Done v2.1.0)
- ~~Right sidebar~~ (Done v2.1.0)
- ~~Minified main-sidebar~~ (Done v2.1.0)
- Right to left support
- ~~Custom pace style~~ (Done v2.3.1)

Legacy Releases
----------------
AdminLTE 1.x can be easily upgraded to 2.x using [this guide](https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html#upgrade), but if you intend to keep using AdminLTE 1.x, you can download the latest release from the [releases](https://github.com/almasaeed2010/AdminLTE/releases) section above.

Change log
----------

**For the most recent change log, visit the [releases page](https://github.com/almasaeed2010/AdminLTE/releases).** We will add a detailed release notes to each new release. 

**v2.3.1:**
- Fix sidebar issue #676
- Fix BootLint warnings and errors
- Minor bug fixes and code reformat
- Added Pace page

**v2.3.0:**
- Added social widgets (found in the widgets page)
- Added profile page
- Fix issue #430 (requires ```.hold-transition``` to be added to ```<body>```)
- Fix issue #578
- Fix issue #579

**v2.2.1:**
- Bug Fixes
- Removed many ```!important``` statements in css
- Activate boxWidget automatically when created after the page has loaded
- Activate sidebar menu treeview links automatically when created after the page has loaded
- Updated Font Awesome thanks to @Dennis14e
- Added JSHint to Grunt tasks (Find JS errors)
- Added CSSLint to Grunt tasks (Find CSS errors)
- Added Image to Grunt tasks (compress images)
- Added Clean to Grunt tasks (remove unwanted files like uncompressed images)
- Updated Bootstrap to 3.3.5

**v2.2.0:**
- Bug fixes
- Added support for [Select2](https://select2.github.io/)
- Updated ChartJS

**v2.1.2:**
- Added explicit BoxWidget activation function issue #450
- Crushed some bugs

**v2.1.1:**
- Fix version error

**v2.1.0:**
- Update Ion Icons
- Added right sidebar ```.control-sidebar```
- Control sidebar has 2 open effects: slide over content and push content
- Control sidebar converts to always slide over content on small screens
- Added 6 new light sidebar skins
- Updated demo menu
- Added ChartJS preview page
- Fixed some minor bugs
- Added light control sidebar skin
- Added expand on hover option for sidebar mini
- Added fixed control sidebar layout

**v2.0.5:**
- Fixed issue #288

**v2.0.4:**
- Fixed bower.json to pick up newest release.

**v2.0.3**
- Bug fixes
- Fixed extra page when printing issue #264
- Updated documentation and fixed links scrolling issue
- Created print.less file (this makes it easier if you want to create a seperate CSS file for printing)
- Fixed sidebar stretching issue #275
- Fixed checkbox out of bounds issue in WYSIHTML5 editor.

**v2.0.2:**
- Solved issue with hidden arrow in select inputs.

**v2.0.1:**
- Updated README.md
- Fixed versioning issue in CSS, LESS, and JS
- Updated box-shadow for boxes
- Updated docs

**v2.0.0:**

- Major layout bug fixes
- Change in layout mark up
- Added transitions to the sidebar
- New skins and modified previous skins
- Change in color scheme to a more complementing scheme
- Added footer support
- Removed pace.js from the main app.js
- Added support for collapsed sidebar as an initial state (add .sidebar-collapse to the body tag)
- Added boxed layout (.layout-boxed)
- Enhanced consistency in padding and margining
- Updated Bootstrap to 3.3.2
- Fixed navbar dropdown menu on small screens positioning issues.
- Updated Ion Icons to 2.0.0
- Updated FontAwesome to 4.3.0
- Added ChartJS 1.0.1
- Removed iCheck dependency
- Created Dashboard 2.0
- Created new Chat widget (DirectChat)
- Added transitions to DirectChat
- Added contacts pane to DirectChat
- Changed .right-side to .content-wrapper
- Changed .navbar-right to .navbar-custom-menu
- Removed unused files
- Updated lockscreen style (HTML markup changed!)
- Updated Login & Registration pages (HTML markup changed!)
- Updated buttons style.
- Enhanced border-radius consistency
- Added mailbox: inbox, read, and compose pages
- Bootstrap & jQuery are now hosted locally
- Created documentation.

**ver 1.2.0:**

- Fixed the sidebar scroll issue when using the fixed layout.
- Added [Bootstrap Social Buttons](http://lipis.github.io/bootstrap-social/ "Bootstrap Social") plugin.
- Fixed RequireJS bug. Thanks to [StaticSphere](https://github.com/StaticSphere "github user").

**ver 1.1.0:**

- Added new skin. class: .skin-black
- Added [pace](http://github.hubspot.com/pace/docs/welcome/ "pace") plugin.

Image Credits
-------------
[Pixeden](http://www.pixeden.com/psd-web-elements/flat-responsive-showcase-psd)

[Graphicsfuel](http://www.graphicsfuel.com/2013/02/13-high-resolution-blur-backgrounds/)

[Pickaface](http://pickaface.net/)

[Unsplash](https://unsplash.com/)

[Uifaces](http://uifaces.com/)

Donations
---------
Donations are **greatly appreciated!**

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif "AdminLTE Presentation")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=629XCUSXBHCBC "Donate")
