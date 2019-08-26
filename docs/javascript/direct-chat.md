---
layout: page
title: Direct Chat Plugin
---

The direct chat plugin provides simple functionality to the direct chat component. 

##### Usage
This plugin can be activated as a jQuery plugin or using the data api. 

###### Data API
{: .text-bold }
Add `data-widget="chat-pane-toggle"` to a button to activate the plugin. 
```html
<button class="btn btn-primary" data-widget="chat-pane-toggle">Toggle Chat Pane</button>
``` 

###### jQuery
{: .text-bold }
The jQuery API provides more customizable options that allows the developer to handle checking and unchecking the todo list checkbox events. 
```js
$('#chat-pane-toggle').DirectChat('toggle')
```


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|toggle | Toggles the state of the chat pane between hidden and visible.
{: .table .table-bordered .bg-light}

Example: `$('#chat-pane-toggle').DirectChat('toggle')`


##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|toggled.lte.directchat | Triggered after a direct chat contacts pane is toggled.
{: .table .table-bordered .bg-light}

Example: `$('#toggle-button').on('toggled.lte.directchat', handleToggledEvent)`
