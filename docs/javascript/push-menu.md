---
layout: page
title: Push Menu Plugin
---

The PushMenu plugin controls the toggle button of the main sidebar. 

##### Usage
This plugin can be activated as a jQuery plugin or using the data api. 

###### Data API
{: .text-bold }
Add `data-widget="pushmenu"` to a button to activate the plugin. 
```html
<button class="btn btn-primary" data-widget="pushmenu">Toggle Sidebar</button>
```

###### jQuery
{: .text-bold }
```js
$('.sidebar-toggle-btn').PushMenu(options)
```

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
|autoCollapseSize | Boolean/Number | FALSE | Screen width in pixels to trigger auto collapse sidebar
|enableRemember | Boolean | FALSE | Remember sidebar state and set after page refresh.
|noTransitionAfterReload | Boolean | TRUE | Hold Transition after page refresh.
{: .table .table-bordered .bg-light}

> ##### Tip!
> You can use any option via the data-attributes like this to enable auto collapse sidebar on 768 pixels width.
> ```html
> <button class="btn btn-primary" data-widget="pushmenu" data-auto-collapse-size="768">Toggle Sidebar</button>
> ```
{: .quote-info}


##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|collapsed.lte.pushmenu | Fired when the sidebar collapsed.
|shown.lte.pushmenu | Fired when the sidebar shown.
{: .table .table-bordered .bg-light}

Example: `$(document).on('shown.lte.pushmenu', handleExpandedEvent)`


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|toggle | Toggles the state of the menu between expanded and collapsed.
{: .table .table-bordered .bg-light}

Example: `$('[data-widget="pushmenu"]').PushMenu('toggle')`
