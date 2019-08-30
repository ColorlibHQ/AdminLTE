---
layout: page
title: Control Sidebar Plugin
---

The control sidebar component is part of AdminLTE's layout as the right sidebar. 

##### Usage
This plugin can be activated as a jQuery plugin or using the data api. To activate the plugin, you must first add the HTML markup to your layout, then create the toggle button as shown below. 

###### HTML Markup
{: .text-bold }
```html
<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
  <!-- Control sidebar content goes here -->
</aside>
<!-- /.control-sidebar -->
```

###### Data api
{: .text-bold }
Add `data-widget="control-sidebar"` to any button or a element to activate the plugin.

```html
<a href="#" data-widget="control-sidebar">Toggle Control Sidebar</a>
```

###### jQuery
{: .text-bold }
Just like all other AdminLTE plugins, you can also activate the toggle button using jQuery by running the following example. 
```js
$("#my-toggle-button").ControlSidebar('toggle');
```

##### Options

|---
| Name | Type | Default | Description
|-|-|-|-
|controlsidebarSlide | Boolean | TRUE | Whether the sidebar should slide over the content or push the content to make space for itself.
|scrollbarTheme | Boolean | `os-theme-light` | Scrollbar Theme used while SideBar Fixed
|scrollbarAutoHide | Boolean | `l` | Scrollbar auto-hide trigger
{: .table .table-bordered .bg-light}

> ##### Tip!
> You can use any option via the data-attributes like this to enable auto collapse sidebar on 768 pixels width.
> ```html
> <a href="#" data-widget="control-sidebar" data-controlsidebar-slide="false">Toggle Control Sidebar</a>
> ```
{: .quote-info}

##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|expanded.lte.controlsidebar | Triggered after a control sidebar expands.
|collapsed.lte.controlsidebar | Triggered after a control sidebar collapses.
{: .table .table-bordered .bg-light}

Example: `$('#toggle-button').on('expanded.lte.controlsidebar', handleExpandedEvent)`
