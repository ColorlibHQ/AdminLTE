---
layout: page
title: Toasts Plugin
---

The toasts plugin provides simple functionality to create easily a bootstrap toast.

##### Usage
This plugin can be activated as a jQuery plugin.

###### jQuery
{: .text-bold }
The jQuery API provides more customizable options that allows the developer to handle checking and unchecking the todo list checkbox events. 
```js
$(document).Toasts('create', {
  title: 'Toast Title',
  body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
})
```


##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
|position | String | Position.TOP_RIGHT | Position of the toast, available options: `topRight`, `topLeft`, `bottomRight` & `bottomLeft`
|fixed | Boolean | true | Whether to set toasts container fixed.
|autohide | Boolean | false | Whether to auto hide toast
|autoremove | Boolean | true | Whether to auto remove toast after closing 
|delay | Integer | 1000 | Auto Hide delay
|fade | Boolean | true | Whether to fade toast
|icon | String | null | Icon class (e.g. `fas fa-exclamation-triangle`)
|image | String | null | Image url
|imageAlt | String | null | Image alt
|imageHeight | String | '25px' | Image size of toast
|title | String | null | Title of toast
|subtitle | String | null | Subtitle of toast
|close | Boolean | true | Whether to add close button to toast
|body | String | null | Body of toast
|class | String | null | Additional classes for the toast
|---
{: .table .table-bordered .bg-light}


##### Events
{: .mt-4}
All event are sent to `body`.

|---
| Event Type | Description
|-|-
|init.lte.toasts | Fired when constructor is done
|created.lte.toasts | Fired when the toast is created
|removed.lte.toasts | Fired when the toast is removed
{: .table .table-bordered .bg-light}

Example: `$('body').on('created.lte.toast', handleCreateEvent)`


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|create | Creates a toast
{: .table .table-bordered .bg-light}

Example: `$(document).Toasts('create', {title: 'Toast Title'})`
