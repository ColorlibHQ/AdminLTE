# CKEditor 4 [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20CKEditor%204%20on%20npm&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fckeditor)

[![GitHub tag](https://img.shields.io/github/tag/ckeditor/ckeditor-releases.svg)](https://github.com/ckeditor/ckeditor-releases)
[![Dependencies](https://img.shields.io/david/ckeditor/ckeditor-dev.svg)](https://david-dm.org/ckeditor/ckeditor-dev)
[![Dev dependencies](https://img.shields.io/david/dev/ckeditor/ckeditor-dev.svg)](https://david-dm.org/ckeditor/ckeditor-dev?type=dev)

[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/c3zRPr)
[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/ckeditor)

A highly configurable WYSIWYG HTML editor with hundreds of features, from creating rich text content with captioned images, videos, tables, or media embeds to pasting from Word and drag&drop image upload.

Supports a broad range of browsers, including legacy ones.

![CKEditor 4 screenshot](https://c.cksource.com/a/1/img/npm/ckeditor4.png)

## Getting Started

```
npm install --save ckeditor
```

Use it on your website:

```html
<div id="editor">
    <p>This is the editor content.</p>
</div>
<script src="./node_modules/ckeditor/ckeditor.js"></script>
<script>
    CKEDITOR.replace( 'editor' );
</script>
```

You can also load CKEditor 4 using [CDN](https://cdn.ckeditor.com/#ckeditor4).

## Features

* Over 500 plugins in the [Add-ons Repository](https://ckeditor.com/cke4/addons).
* Pasting from Microsoft Word and Excel.
* Drag&drop image uploads.
* Media embeds to insert videos, tweets, maps, slideshows.
* Powerful clipboard integration.
* Content quality control with Advanced Content Filter.
* Extensible widget system.
* Custom table selection.
* Accessibility conforming to WCAG and Section 508.
* Over 60 localizations available with full RTL support.

## Presets

The CKEditor 4 npm package comes in the `standard-all` preset, so it includes all official CKEditor plugins, with those from the [standard package](https://sdk.ckeditor.com/samples/standardpreset.html) active by default.

## Further Resources

* [CKEditor 4 demo](https://ckeditor.com/ckeditor-4/)
* [Documentation](https://ckeditor.com/docs/ckeditor4/latest/)
* [API documentation](https://ckeditor.com/docs/ckeditor4/latest/api/index.html)
* [Configuration reference](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html)
* [CKEditor SDK with more samples](https://sdk.ckeditor.com/)

If you are looking for CKEditor 5, here's a link to the relevant npm package: <https://www.npmjs.com/package/ckeditor5>

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome (Android) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE8, IE9, IE10, IE11, Edge| latest version| latest version| latest version| latest version| latest version| latest version

Find out more in the [Browser Compatibility guide](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_browsers.html#officially-supported-browsers).

## Contribute

If you would like to help maintain the project, follow the [Contribution instructions](https://github.com/ckeditor/ckeditor-dev/blob/master/.github/CONTRIBUTING.md).

## License

Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

For licensing, see LICENSE.md or <https://ckeditor.com/legal/ckeditor-oss-license>
