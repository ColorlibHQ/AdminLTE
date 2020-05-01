![ion.rangeSlider](_tmp/logo-ion-range-slider.png)

Ion.RangeSlider. Is an easy, flexible and responsive range slider with tons of options.

***

* Version: 2.3.1 | *Version 3.x is under development now*
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/">Project page and demos</a>
* <a href="https://github.com/IonDen/ion.rangeSlider/archive/2.3.1.zip">Download ZIP</a>

## Description
* Ion.RangeSlider — cool, comfortable, responsive and easily customizable range slider
* Supports events and public methods, has flexible settings, can be completely altered with CSS
* Cross-browser: Google Chrome, Mozilla Firefox 3.6+, Opera 12+, Safari 5+, Internet Explorer 8+
* Ion.RangeSlider supports touch-devices (iPhone, iPad, Nexus, etc.).
* Ion.RangeSlider freely distributed under terms of <a href="http://ionden.com/a/plugins/licence.html" target="_blank">MIT licence</a>.
* With this plugin you will be able to build beautiful range sliders, like this:

![ion.rangeSlider](http://ionden.com/a/plugins/ion.rangeSlider/static/img/ion-range-slider.png)

## Key features
* Skin support. (6 skins included)
* Any number of sliders at one page without conflicts and big performance problems
* Two slider types single (1 slider) and double (2 sliders)
* Support of negative and fractional values
* Ability to set custom step and snap grid to step
* Support of custom values diapason
* Customisable grid of values
* Ability to disable UI elements (min and max, current value, grid)
* Postfixes and prefixes for your numbers ($20, 20 &euro; etc.)
* Additional postfix for maximum value (eg. $0 — $100<b>+</b>)
* Ability to prettify large numbers (eg. 10000000 -> 10 000 000 or 10.000.000)
* Slider writes its value right into input value field. This makes it easy to use in any html form
* Any slider value can be set through input data-attribute (eg. data-min="10")
* Slider supports disable param. You can set it true to make slider inactive
* Slider supports external methods (update, reset and remove) to control it after creation
* For advanced users slider has callbacks (onStart, onChange, onFinish, onUpdate). Slider pastes all its params to callback first argument as object
* Slider supports date and time


## Demos

* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo.html" class="switch__item">Basic demo</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_advanced.html" class="switch__item">Advanced demo</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_interactions.html" class="switch__item">Interactions demo</a>


## Dependencies

* <a href="http://jquery.com/" target="_blank">jQuery 1.8.x+</a>


## Usage

Add the following libraries to the page:
* jQuery
* ion.rangeSlider.min.js

Add the following stylesheets to the page:
* ion.rangeSlider.min.css



## CDN

Use [CDNjs](https://cdnjs.com/libraries/ion-rangeslider) or [JSdelivr](https://www.jsdelivr.com/package/npm/ion-rangeslider) to get latest version of plugin and jQuery.
```html
<!--Plugin CSS file with desired skin-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css"/>

<!--jQuery-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!--Plugin JavaScript file-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"></script>   
``` 



## Install with NPM

Use [NPM](https://www.npmjs.com/package/ion-rangeslider) to download latest version of a plugin and install it directly in to your project. 

* npm install ion-rangeslider



## Install with Bower

Use [Bower](https://bower.io/) to download latest version of a plugin and install it directly in to your project. 

* bower install ion-rangeslider



## Install with Yarn

Use [Yarn](https://yarnpkg.com/en/package/ion-rangeslider) to download latest version of a plugin and install it directly in to your project. 

* yarn add ion-rangeslider


## Initialisation

The slider overrides a native text <code>input</code> element.
```html
<input type="text" id="example_id" name="example_name" value="" />
```

To initialise the slider, call ionRangeSlider on the element:
```javascript
$("#example_id").ionRangeSlider();
```


## <a href="https://jsfiddle.net/IonDen/uqs7njp9/" target="_blank">Experiments playground</a>

Here you can find bunch of advanced JSFIDDLE demos with different, non-standard use cases:
* [Custom marks on slider](https://jsfiddle.net/IonDen/tdvxs3zL/)
* [1 handle bind to 1 input](https://jsfiddle.net/IonDen/khngpw3m/)
* [2 handles bind to 2 inputs](https://jsfiddle.net/IonDen/avcm6wpj/)
* [2 sliders connected to each other](https://jsfiddle.net/IonDen/1hnvxsg5/)
* [2 dependant sliders](https://jsfiddle.net/IonDen/f1t6qpx0/)
* [1st slider disables/enables 2nd slider](https://jsfiddle.net/IonDen/kqwm1294/)
* [Non-linear slider](https://jsfiddle.net/IonDen/5f2730ds/)
* [Plus and Minus buttons](https://jsfiddle.net/IonDen/e9as5k2m/)
* [Calculating sum](https://jsfiddle.net/IonDen/dfcmryn2/)
* [Adding one more diapazon on 1 slider](https://jsfiddle.net/IonDen/ckwrqv75/)
* [Live editing of Min and Max values](https://jsfiddle.net/IonDen/wgfv76je/)
* [Prettify and transform values at the same time](https://jsfiddle.net/IonDen/kc0tzreu/)
* [Rendering money value n.nn](https://jsfiddle.net/IonDen/a0rghmd7/)
* [Changing step live](https://jsfiddle.net/IonDen/5ptjgm6h/)
* [Toggle slider](https://jsfiddle.net/IonDen/7m4otxwp/)
* [Skip some values](https://jsfiddle.net/IonDen/bqyw1e7k/)
* [Values array + prettify](https://jsfiddle.net/IonDen/p9gu71sL/)


## Settings


| Option | Data-Attr | Defaults | Type | Description |
| --- | --- | --- | --- | --- |
| `skin` | `data-skin` | `flat` | string | Choose UI skin to use (flat, big, modern, round, sharp, square) |
| `type` | `data-type` | `single` | string | Choose slider type, could be `single` - for one handle, or `double` for two handles |
| `min` | `data-min` | `10` | number | Set slider minimum value |
| `max` | `data-max` | `100` | number | Set slider maximum value |
| `from` | `data-from` | `min` | number | Set start position for left handle (or for single handle) |
| `to` | `data-to` | `max` | number | Set start position for right handle |
| `step` | `data-step` | `1` | number | Set sliders step. Always > 0. Could be fractional |
| `min_interval` | `data-min-interval` | `-` | number | Set minimum diapason between sliders. Only for **double** type |
| `max_interval` | `data-max-interval` | `-` | number | Set minimum maximum between sliders. Only for **double** type |
| `drag_interval` | `data-drag-interval` | `false` | boolean | Allow user to drag whole range. Only for **double** type |
| `values` | `data-values` | `[]` | array | Set up your own array of possible slider values. They could be numbers or strings. If the values array is set up, min, max and step param, can no longer be changed |
| `from_fixed` | `data-from-fixed` | `false` | boolean | Fix position of left (or single) handle |
| `from_min` | `data-from-min` | `min` | number | Set minimum limit for left (or single) handle |
| `from_max` | `data-from-max` | `max` | number | Set maximum limit for left (or single) handle |
| `from_shadow` | `data-from-shadow` | `false` | boolean | Highlight the limits for left handle |
| `to_fixed` | `data-to-fixed` | `false` | boolean | Fix position of right handle |
| `to_min` | `data-to-min` | `min` | number | Set minimum limit for right handle |
| `to_max` | `data-to-max` | `max` | number | Set maximum limit for right handle |
| `to_shadow` | `data-to-shadow` | `false` | boolean | Highlight the right handle |
| `prettify_enabled` | `data-prettify-enabled` | `true` | boolean | Improve readability of long numbers: 10000000 &rarr; 10 000 000 |
| `prettify_separator` | `data-prettify-separator` | ` ` | string | Set up your own separator for long numbers: 10000000 &rarr; 10,000,000 etc. |
| `prettify` | `-` | `null` | function | Set up your own prettify function. Can be anything. For example, you can set up unix time as slider values and than transform them to cool looking dates |
| `force_edges` | `data-force-edges` | `false` | boolean | Sliders handles and tooltips will be always inside it's container |
| `keyboard` | `data-keyboard` | `true` | boolean | Activates keyboard controls. Move left: &larr;, &darr;, A, S. Move right: &rarr;, &uarr;, W, D. |
| `grid` | `data-grid` | `true` | boolean | Enables grid of values above the slider |
| `grid_margin` | `data-grid-margin` | `true` | boolean | Set left and right grid gaps |
| `grid_num` | `data-grid-num` | `4` | number | Number of grid units |
| `grid_snap` | `data-grid-snap` | `false` | boolean | Snap grid to sliders step (step param). If activated, grid_num will not be used. Max steps = 50 |
| `hide_min_max` | `data-hide-min-max` | `false` | boolean | Hides **min** and **max** labels |
| `hide_from_to` | `data-hide-from-to` | `false` | boolean | Hides **from** and **to** labels |
| `prefix` | `data-prefix` | `` | string | Set prefix for values. Will be set up right before the number: **$**100 |
| `postfix` | `data-postfix` | `` | string | Set postfix for values. Will be set up right after the number: 100**k** |
| `max_postfix` | `data-max-postfix` | `` | string | Special postfix, used only for maximum value. Will be showed after handle will reach maximum right position. For example **0 — 100+** |
| `decorate_both` | `data-decorate-both` | `true` | boolean | Used for **double** type and only if prefix or postfix was set up. Determine how to decorate close values. For example: **$10k — $100k** or **$10 — 100k** |
| `values_separator` | `data-decorate-both` | ` - ` | string | Set your own separator for close values. Used for **double** type. Default: **10 — 100**. Or you may set: **10 to 100, 10 + 100, 10 &rarr; 100** etc. |
| `input_values_separator` | `data-input-values-separator` | ` ; ` | string | Separator for **double** values in input value property. `<input value="25;42">` |
| `disable` | `data-disable` | `false` | boolean | Locks slider and makes it inactive. Input is disabled too. Invisible to forms |
| `block` | `data-blokc` | `false` | boolean | Locks slider and makes it inactive. Input is NOT disabled. Can be send with forms |
| `extra_classes` | `data-extra-classes` | `—` | string | Traverse extra CSS-classes to sliders container |
| `scope` | `-` | `null` | object | Scope for callbacks. Pass any object |
| `onStart` | `-` | `null` | function | Callback. Is called on slider start. Gets all slider data as a 1st attribute |
| `onChange` | `-` | `null` | function | Callback. IS called on each values change. Gets all slider data as a 1st attribute |
| `onFinish` | `-` | `null` | function | Callback. Is called when user releases handle. Gets all slider data as a 1st attribute |
| `onUpdate` | `-` | `null` | function | Callback. Is called when slider is modified by external methods `update` or `reset` |



## Description of data passed to callbacks (onChange and etc.)
Result is object type and passed to callback as first argument:
```javascript
Obj: {
    "input": object,            // jQuery-link to input
    "slider": object,           // jQuery-link to sliders container
    "min": 1000,                // MIN value
    "max": 100000,              // MAX values
    "from": 10000,              // FROM value
    "from_percent": 10,         // FROM value in percents
    "from_value": 0,            // FROM index in values array (if used)
    "to": 90000,                // TO value
    "to_percent": 90,           // TO value in percents
    "to_value": 0,              // TO index in values array (if used)
    "min_pretty": "1 000",      // MIN prettified (if used)
    "max_pretty": "100 000",    // MAX prettified (if used)
    "from_pretty": "10 000",    // FROM prettified (if used)
    "to_pretty": "90 000"       // TO prettified (if used)
}
```

## Creating slider (all params)
An example of a customised slider:
```javascript
$("#example").ionRangeSlider({
    skin: "big",
    min: 0,
    max: 10000,
    from: 1000,
    to: 9000,
    type: 'double',
    prefix: "$",
    grid: true,
    grid_num: 10
});
```

You can also initialise slider with <code>data-*</code> attributes of input tag:
```html
data-min="0"
data-max="10000"
data-from="1000"
data-to="9000"
data-type="double"
data-prefix="$"
data-grid="true"
data-grid-num="10"
```

## Public methods

To use public methods, at first you must save slider instance to variable:
```javascript
// Launch plugin
$("#range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1000,
    from: 200,
    to: 500,
    grid: true
});

// Saving it's instance to var
var slider = $("#range").data("ionRangeSlider");

// Fire public method
slider.reset();
```

There are 3 public methods:
```javascript
// UPDATE - updates slider to any new values
slider.update({
    from: 300,
    to: 400
});

// RESET - reset slider to it's first values
slider.reset();

// DESTROY - destroys slider and restores original input field
slider.destroy();
```


## One more look on demos

* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo.html" class="switch__item">Basic demo</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_advanced.html" class="switch__item">Advanced demo</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_interactions.html" class="switch__item">Interactions demo</a>

All plugins options are covered in demos.


### <a href="history.md">Update history</a>

***

#### Support Ion-series plugins development:

* [Support the plugin on Patreon](https://www.patreon.com/IonDen)

* Donate direct to my Paypal account: https://www.paypal.me/IonDen
