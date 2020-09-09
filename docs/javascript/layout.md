---
layout: page
title: Layout Plugin
---

The layout plugin manages the layout in case of css failure to reset the height or width of the content. 

##### Usage
This plugin is activated automatically upon window load. 

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
|scrollbarTheme | Boolean | `os-theme-light` | Scrollbar Theme used while SideBar Fixed
|scrollbarAutoHide | Boolean | `l` | Scrollbar auto-hide trigger
|panelAutoHeight | Boolean\|Numeric | true | Panel Height Correction (`true` = default correction on load/resize; numeric = offset the correction on load/resize)
|loginRegisterAutoHeight | Boolean\|Integer | true | Login & Register Height Correction (`true` = single correction on load; integer = correction with a interval based on the interger)
|---
{: .table .table-bordered .bg-light}

> ##### Tip!
> You can use any option via the data-attributes like this.
> ```html
> <body data-scrollbar-auto-hide="n">...</body>
> ```
{: .quote-info}

##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|fixLayoutHeight | Fix the content / control sidebar height and activates OverlayScrollbars for sidebar / control sidebar
|fixLoginRegisterHeight | Fix the login & register body height
{: .table .table-bordered .bg-light}

Example: `$('body').Layout('fixLayoutHeight')`
