"Moono" Skin
====================

This skin has been chosen for the **default skin** of CKEditor 4.x.x (replaced by "Moono-lisa" skin since CKEditor 4.6.0),
elected from the CKEditor [skin contest](https://ckeditor.com/blog/CKEditor-4-Skin-Contest-Winner/) and further shaped by
the CKEditor team. "Moono" is maintained by the core developers.

For more information about skins, please check the [CKEditor Skin SDK](https://ckeditor.com/docs/ckeditor4/latest/guide/skin_sdk_intro.html)
documentation.

Features
-------------------
"Moono" is a monochromatic skin, which offers a modern look coupled with gradients and transparency.
It comes with the following features:

- Chameleon feature with brightness,
- high-contrast compatibility,
- graphics source provided in SVG.

Directory Structure
-------------------

CSS parts:
- **editor.css**: the main CSS file. It's simply loading several other files, for easier maintenance,
- **mainui.css**: the file contains styles of entire editor outline structures,
- **toolbar.css**: the file contains styles of the editor toolbar space (top),
- **richcombo.css**: the file contains styles of the rich combo ui elements on toolbar,
- **panel.css**: the file contains styles of the rich combo drop-down, it's not loaded
until the first panel open up,
- **elementspath.css**: the file contains styles of the editor elements path bar (bottom),
- **menu.css**: the file contains styles of all editor menus including context menu and button drop-down,
it's not loaded until the first menu open up,
- **dialog.css**: the CSS files for the dialog UI, it's not loaded until the first dialog open,
- **reset.css**: the file defines the basis of style resets among all editor UI spaces,
- **preset.css**: the file defines the default styles of some UI elements reflecting the skin preference,
- **editor_XYZ.css** and **dialog_XYZ.css**: browser specific CSS hacks.

Other parts:
- **skin.js**: the only JavaScript part of the skin that registers the skin, its browser specific files and its icons and defines the Chameleon feature,
- **icons/**: contains all skin defined icons,
- **images/**: contains a fill general used images,
- **dev/**: contains SVG source of the skin icons.

License
-------

Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.

For licensing, see LICENSE.md or [https://ckeditor.com/legal/ckeditor-oss-license](https://ckeditor.com/legal/ckeditor-oss-license)
