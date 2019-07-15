---
layout: page
title: Layout
---

> ##### Tip!
> The starter page is a good place to start building your app if you'd like to start from scratch.
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
- Fixed Navbar: use the class `.layout-navbar-fixed` to get a navbar navbar.
- Fixed Footer: use the class `.layout-footer-fixed` to get a navbar footer.
- Collapsed Sidebar: use the class `.sidebar-collapse` to have a collapsed sidebar upon loading.
- Boxed Layout: use the class `.layout-boxed` to get a boxed layout that stretches only to 1250px.
- Top Navigation: use the class `.layout-top-nav` to remove the sidebar and have your links at the top navbar.

#### Color Variations

AdminLTE 3.0 provides a set of color variations to apply to your sidebar (light & dark) & navbar. You can combine any available color with these class prefixes:

- navbar-*
- sidebar-dark-*
- sidebar-light-*

> ###### Info
> You can combine navbar-* with navbar-light or navbar-dark.

The following colors are available:


<div class="row">
  <div class="col-sm-6">
    <ul>
      <li><i class="fas fa-square-full text-primary fa-lg"></i> Primary (primary) / Blue (blue)</li>
      <li><i class="fas fa-square-full text-secondary fa-lg"></i> Secondary (secondary) / Gray (gray)</li>
      <li><i class="fas fa-square-full text-success fa-lg"></i> Success (success) / Green (green)</li>
      <li><i class="fas fa-square-full text-info fa-lg"></i> Info (info) / Cyan (cyan)</li>
      <li><i class="fas fa-square-full text-warning fa-lg"></i> Warning (warning) / Yellow (yellow)</li>
      <li><i class="fas fa-square-full text-danger fa-lg"></i> Danger (danger) / Red (red)</li>
      <li><i class="fas fa-square-full text-light fa-lg"></i> Light (light)</li>
      <li><i class="fas fa-square-full text-dark fa-lg"></i> Dark (dark) / Gray Dark (gray-dark)</li>
    </ul>
  </div>
  <div class="col-sm-6">
    <ul>
      <li><i class="fas fa-square-full text-indigo fa-lg"></i> Indigo (indigo)</li>
      <li><i class="fas fa-square-full text-purple fa-lg"></i> Purple (purple)</li>
      <li><i class="fas fa-square-full text-pink fa-lg"></i> Pink (pink)</li>
      <li><i class="fas fa-square-full text-orange fa-lg"></i> Orange (orange)</li>
      <li><i class="fas fa-square-full text-teal fa-lg"></i> Teal (teal)</li>
      <li><i class="fas fa-square-full text-white fa-lg"></i> White (white)</li>
    </ul>
  </div>
</div>
