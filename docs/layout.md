---
layout: page
title: Layout
---

> ##### Tip!
> The [starter page](https://adminlte.io/themes/v3/starter.html) is a good place to start building your app if you'd like to start from scratch.
{: .quote-info .mt-0}

The layout consists of four major parts:

- Wrapper `.wrapper`. A div that wraps the whole site.
- Main Header `.main-header`. Contains the logo and navbar.
- Sidebar `.sidebar-wrapper`. Contains the user panel and sidebar menu.
- Content `.content-wrapper`. Contains the page header and content.

#### Layout Options
{: .mt-4}

> ##### Note!
> You cannot use both layout-boxed and layout-navbar-fixed or layout-footer-fixed at the same time. Anything else can be mixed together.
{: .quote-danger}

AdminLTE 3.0 provides a set of options to apply to your main layout. Each one of these classes can be added to the body tag to get the desired goal.

- Fixed Sidebar: use the class `.layout-fixed` to get a fixed sidebar.
- Fixed Navbar: use the class `.layout-navbar-fixed` to get a fixed navbar.
- Fixed Footer: use the class `.layout-footer-fixed` to get a fixed footer.
- Collapsed Sidebar: use the class `.sidebar-collapse` to have a collapsed sidebar upon loading.
- Boxed Layout: use the class `.layout-boxed` to get a boxed layout that stretches only to 1250px.
- Top Navigation: use the class `.layout-top-nav` to remove the sidebar and have your links at the top navbar.


##### Responsive Variations

You can also use the following classes for responsive changes with placing

- Fixed Navbar: 
  - use the class `.layout-*-navbar-fixed` to get a fixed navbar.
  - use the class `.layout-*-navbar-not-fixed` to get a not fixed navbar.
- Fixed Footer: 
  - use the class `.layout-*-footer-fixed` to get a fixed footer.
  - use the class `.layout-*-footer-not-fixed` to get a not fixed footer.

> ##### Tip!
> If you want to use anchors with a fixed navbar, you need to add `.anchor` to you hidden anchor, e.g. `<a id="testAnchor" class="anchor"></a>`. 
> 
> To get a smooth scrolling to the anchor you need to add `.scroll-smooth` to your HTML tag like this `<html class="scroll-smooth">` otherwise it jumps directly to your anchor, `.scroll-smooth` can cause issues with a Chrome extension called ScrollAnywhere.
{: .quote-info}


#### Color Variations

AdminLTE 3.0 provides a set of color variations to apply to your sidebar (light & dark) & navbar. You can combine any available color with these class prefixes:

- `.navbar-*`
- `.sidebar-dark-*`
- `.sidebar-light-*`
- `.accent-*`

> ###### New
> You can use override the link/accent color in AdminLTE, you can add `.accent-*` to `body`.
{: .quote-info}

> ###### Info
> You can combine `.navbar-*` with `.navbar-light` or `.navbar-dark`.
{: .quote-info}

The following colors are available:

##### Theme Colors

<div class="row">
  <div class="col-sm-4 col-lg-3 p-3 bg-primary"> Primary (primary) / Blue (blue)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-secondary"> Secondary (secondary)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-success"> Success (success) / Green (green)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-info"> Info (info) / Cyan (cyan)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-warning"> Warning (warning) / Yellow (yellow)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-danger"> Danger (danger) / Red (red)</div>
</div>

##### Black/White Nuances
{: .mt-4}

<div class="row">
  <div class="col-sm-4 col-lg-3 p-3 bg-black"> Black (black)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-gray-dark"> Gray Dark (gray-dark)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-gray"> Gray (gray)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-light"> Light (light)</div>
</div>

##### Colors
{: .mt-4}

<div class="row">
  <div class="col-sm-4 col-lg-3 p-3 bg-indigo"> Indigo (indigo)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-navy"> Navy (navy)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-purple"> Purple (purple)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-fuchsia"> Fuchsia (fuchsia)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-pink"> Pink (pink)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-maroon"> Maroon (maroon)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-orange"> Orange (orange)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-lime"> Lime (lime)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-teal"> Teal (teal)</div>
  <div class="col-sm-4 col-lg-3 p-3 bg-olive"> Olive (olive)</div>
</div>

> ##### Tip!
> You can use these color variations even with `.text-*`, `.bg-*` & much more.
{: .quote-info}


##### Custom Range / Switch

For custom colored custom-checkbox & custom-radio you can add this classes:

- `.custom-control-input-*`

You can also change the look to outlined checkbox & radio with adding the `.custom-control-input-outline` on the custom control input.

For custom colored custom-range you can add this classes:

- `.custom-range-*`

For custom colored custom-range you can add this classes:

- `.custom-range-*`

For custom colored custom-switch you can add this classes:

- `.custom-switch-off-*` (for custom switch off)
- `.custom-switch-on-*` (for custom switch on)

##### Toasts

You can also use `bg-*` beside the `.toast` to get a nice colored toast.

##### Plugin Support

You can use the all the colors above with these plugins:

- Bootstrap Slider
  - `.slider-*` (wrapped around the slider)
- iCheck-Bootstrap
  - `.icheck-*`
