---
layout: page
title: Plugins
---
AdminLTE comes with color overrides & extras for the following plugins.

### Bootstrap Slider
You can override the color for bootstrap slider tracks with the following classes:
- `.slider-*`

Example:
```html
<div class="slider-red">
  <input type="text" value="" class="slider form-control" data-slider...>
</div>
```

You can also change the layout of the slider with the following classes:

- `.slider-vertical`
- `.slider-horizontal`

Example:
```html
<div class="slider-red">
  <input type="text" value="" class="slider slider-vertical form-control" data-slider...>
</div>
```


### iCheck Bootstrap
You can override the color of a iCheck checkbox/radio input, add the following class:
- `.icheck-*`

Example:
```html
<div class="icheck-primary">
  <input type="checkbox" id="checkbox1">
  <label for="checkbox1">
    Checkbox Label
  </label>
</div>
```


### Pace
You can override the color for all pace themes, load your desired theme and add one the following classes to `body`:

- `.pace-*`
  - barber-shop
  - flat-top
  - minimal
- `.pace-big-counter-*`
  - big-counter
- `.pace-bounce-*`
  - bounce
- `pace-center-atom-*`
  - center-atom
- `pace-center-circle-*`
  - center-circle
- `pace-center-radar-*`
  - center-radar
- `pace-center-simple-*`
  - center-simple
- `pace-corner-indicator-*`
  - corner-indicator
- `.pace-flash-*`
  - flash
- `.pace-fill-left-*`
  - fill-left
- `.pace-loading-bar-*`
  - loading-bar
- `.pace-material-*`
  - material
- `.pace-mac-osx-*`
  - mac-osx

Example: `<body class="pace-success">`


### SweetAlert
If you use SweetAlert and load the SweetAlert CSS before AdminLTE's CSS, then the colors of any icon changes to AdminLTE's default colors.


### Toastr
If you use Toastr and load the Toastr CSS before AdminLTE's CSS, then the background colors changes to AdminLTE's default colors.
