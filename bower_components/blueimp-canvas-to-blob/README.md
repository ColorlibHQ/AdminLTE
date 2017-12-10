# JavaScript Canvas to Blob

## Description
Canvas to Blob is a polyfill for the standard JavaScript
[canvas.toBlob](http://www.w3.org/TR/html5/scripting-1.html#dom-canvas-toblob)
method.

It can be used to create
[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
objects from an HTML
[canvas](https://developer.mozilla.org/en-US/docs/HTML/Canvas) element.

## Usage
Include the (minified) JavaScript Canvas to Blob script in your HTML markup:

```html
<script src="js/canvas-to-blob.min.js"></script>
```

Then use the *canvas.toBlob()* method in the same way as the native
implementation:

```js
var canvas = document.createElement('canvas');
/* ... your canvas manipulations ... */
if (canvas.toBlob) {
    canvas.toBlob(
        function (blob) {
            // Do something with the blob object,
            // e.g. creating a multipart form for file uploads:
            var formData = new FormData();
            formData.append('file', blob, fileName);
            /* ... */
        },
        'image/jpeg'
    );
}
```

## Requirements
The JavaScript Canvas to Blob function has zero dependencies.

However, Canvas to Blob is a very suitable complement to the
[JavaScript Load Image](https://github.com/blueimp/JavaScript-Load-Image)
function.

## API
In addition to the **canvas.toBlob** polyfill, the JavaScript Canvas to Blob
script provides one additional function called **dataURLtoBlob**, which is added
to the global window object, unless the library is loaded via a module loader
like RequireJS, Browserify or webpack:

```js
// 80x60px GIF image (color black, base64 data):
var b64Data = 'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
        'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
        'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7',
    imageUrl = 'data:image/gif;base64,' + b64Data,
    blob = window.dataURLtoBlob && window.dataURLtoBlob(imageUrl);
```

E.g. Via Npm/Browserify:
```shell
npm i blueimp-canvas-to-blob
```

Requiring loads the dataURLtoBlob function.
```js
var dataURLtoBlob = require('blueimp-canvas-to-blob');

// 80x60px GIF image (color black, base64 data):
var b64Data = 'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
        'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
        'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7',
    imageUrl = 'data:image/gif;base64,' + b64Data,
    blob = dataURLtoBlob(imageURL);
```

## Browsers
The following browsers support either the native or the polyfill
*canvas.toBlob()* method:

### Desktop browsers

* Google Chrome (see [Chromium issue #67587](https://code.google.com/p/chromium/issues/detail?id=67587))
* Apple Safari 6.0+ (see [Mozilla issue #648610](https://bugzilla.mozilla.org/show_bug.cgi?id=648610))
* Mozilla Firefox 4.0+
* Microsoft Internet Explorer 10.0+

### Mobile browsers

* Apple Safari Mobile on iOS 6.0+
* Google Chrome on iOS 6.0+
* Google Chrome on Android 4.0+

## Test
[JavaScript Canvas to Blob Test](https://blueimp.github.io/JavaScript-Canvas-to-Blob/test/)

## License
The JavaScript Canvas to Blob script is released under the
[MIT license](https://opensource.org/licenses/MIT).
