# jQuery Mouse Wheel Plugin

A [jQuery](http://jquery.com/) plugin that adds cross-browser mouse wheel support with delta normalization.

In order to use the plugin, simply bind the `mousewheel` event to an element.

It also provides two helper methods called `mousewheel` and `unmousewheel`
that act just like other event helper methods in jQuery.

The event object is updated with the normalized `deltaX` and `deltaY` properties.
In addition there is a new property on the event object called `deltaFactor`. Multiply
the `deltaFactor` by `deltaX` or `deltaY` to get the scroll distance that the browser
has reported.

Here is an example of using both the bind and helper method syntax:

```js
// using on
$('#my_elem').on('mousewheel', function(event) {
    console.log(event.deltaX, event.deltaY, event.deltaFactor);
});

// using the event helper
$('#my_elem').mousewheel(function(event) {
    console.log(event.deltaX, event.deltaY, event.deltaFactor);
});
```

The old behavior of adding three arguments (`delta`, `deltaX`, and `deltaY`) to the
event handler is now deprecated and will be removed in later releases.


## The Deltas...

The combination of Browsers, Operating Systems, and Devices offer a huge range of possible delta values. In fact if the user
uses a trackpad and then a physical mouse wheel the delta values can differ wildly. This plugin normalizes those
values so you get a whole number starting at +-1 and going up in increments of +-1 according to the force or
acceleration that is used. This number has the potential to be in the thousands depending on the device.
Check out some of the data collected from users [here](http://mousewheeldatacollector.herokuapp.com/).

### Getting the scroll distance

In some use-cases we prefer to have the normalized delta but in others we want to know how far the browser should
scroll based on the users input. This can be done by multiplying the `deltaFactor` by the `deltaX` or `deltaY`
event property to find the scroll distance the browser reported.

The `deltaFactor` property was added to the event object in 3.1.5 so that the actual reported delta value can be
extracted. This is a non-standard property.


## Using with [Browserify](http://browserify.org)

Support for browserify is baked in.

```bash
npm install jquery-mousewheel
npm install jquery-browserify
```

In your server-side node.js code:

```js
var express = require('express');
var app = express.createServer();

app.use(require('browserify')({
    require : [ 'jquery-browserify', 'jquery-mousewheel' ]
}));
```

In your browser-side javascript:

```js
var $ = require('jquery-browserify');
require('jquery-mousewheel')($);
```
