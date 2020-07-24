---
layout: page
title: Additional Styles / Custom Skin
---

If you want to create additional styles like a company specific color for buttons, the background utility or something else you can simply create your own subversion of AdminLTE with the following SCSS template.

In this example we create a custom button class called `.btn-custom-color` with an extra button style and a custom class called `.my-custom-style`.

```scss
// Bootstrap
// ---------------------------------------------------
@import '~bootstrap/scss/functions';
@import '~admin-lte/build/scss/bootstrap-variables';

// Custom Theme Color START
$custom-color: #00FF00;
$theme-colors: map-merge((
    'custom-color': $custom-color,
), $theme-colors);
// Custom Theme Color END

// Variables and Mixins
// ---------------------------------------------------
@import '~admin-lte/build/scss/variables';
@import '~admin-lte/build/scss/mixins';

@import '~bootstrap/scss/bootstrap';

@import '~admin-lte/build/scss/parts/core';
@import '~admin-lte/build/scss/parts/components';
@import '~admin-lte/build/scss/parts/extra-components';
@import '~admin-lte/build/scss/parts/pages';
@import '~admin-lte/build/scss/parts/plugins';
@import '~admin-lte/build/scss/parts/miscellaneous';

// Custom Style START
.my-custom-style {
  background-color: $custom-color;
  padding: .5rem 0;
}
// Custom Style END
```
{: .max-height-300}

You can also create a skin on top of AdminLTE with the following SCSS template.

In this example we create a custom class called `.btn-custom-color` with a extra button style.

```scss
// Bootstrap
// ---------------------------------------------------
@import '~bootstrap/scss/functions';
@import '~admin-lte/build/scss/bootstrap-variables';
@import '~bootstrap/scss/mixins';

$custom-color: #00FF00;

.btn-custom-color {
    @include button-variant($custom-color, $custom-color);
}
```


> ##### Warning!
> These examples are only raw SCSS templates, you will still need a SCSS -> CSS build script to compile the SCSS to CSS!
{: .quote-warning}
