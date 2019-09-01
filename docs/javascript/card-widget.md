---
layout: page
title: Card Widget Plugin
---

The card widget plugin provides the functionality for collapsing, expanding and removing a card. 

##### Usage
This plugin can be activated as a jQuery plugin or using the data api. 

###### Data API
{: .text-bold }

This plugin provides two data-api attributes. Any element using one of the following attributes should be placed within the `.card-tools` div, which is usually in the card header. For more information about the [card HTML structure]({% link components/cards.md %}), visit the card component documentation 

`data-card-widget="collapse"`
<br />
This attribute, when attached to a button, allows the box to be collapsed/expanded when clicked. 
<div class="row">
  <div class="col-12 col-md-4">
     <div class="card">
      <div class="card-header">
        <h3 class="card-title">Collapsible Card Example</h3>
        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
        </div>
      </div>
      <div class="card-body">
        The body of the card
      </div>
    </div>
  </div>
  <div class="col-12 col-md-8" markdown="1">
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Collapsible Card Example</h3>
    <div class="card-tools">
      <!-- Collapse Button -->
      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->
```
{: .max-height-300}
  </div>
</div>

`data-card-widget="remove"`
<br />
This attribute, when attached to a button, allows the box to be removed when clicked. 
<div class="row">
  <div class="col-12 col-md-4">
     <div class="card">
      <div class="card-header">
        <h3 class="card-title">Removable Card Example</h3>
        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <div class="card-body">
        The body of the card
      </div>
    </div>
  </div>
  <div class="col-12 col-md-8" markdown="1">
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Removable Card Example</h3>
    <div class="card-tools">
      <!-- Remove Button -->
      <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->
```
{: .max-height-300}
  </div>
</div>

`data-card-widget="maximize"`
<br />
This attribute, when attached to a button, allows the box to be maximize/minimize when clicked. 
<div class="row">
  <div class="col-12 col-md-4">
     <div class="card">
      <div class="card-header">
        <h3 class="card-title">Maximizable Card Example</h3>
        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-card-widget="maximize"><i class="fas fa-expand"></i></button>
        </div>
      </div>
      <div class="card-body">
        The body of the card
      </div>
    </div>
  </div>
  <div class="col-12 col-md-8" markdown="1">
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Maximizable Card Example</h3>
    <div class="card-tools">
      <!-- Maximize Button -->
      <button type="button" class="btn btn-tool" data-card-widget="maximize"><i class="fas fa-expand"></i></button>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->
```
{: .max-height-300}
  </div>
</div>


###### jQuery
{: .text-bold }
To activate any button using jQuery, you must provide the removeTrigger and collapseTrigger options. Otherwise, the plugin will assume the default `data-card-widget` selectors. 

```js
$('#my-card').CardWidget(options)
```

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
|animationSpeed | Number | 300 | Speed of slide down/up animation in milliseconds.
|collapseTrigger | String | `[data-card-widget="remove"]` | jQuery selector to the element responsible for collapsing the box.
|removeTrigger | String | `[data-card-widget="collapse"]` | jQuery selector to the element responsible for removing the box.
|maximizeTrigger | String | `[data-card-widget="maximize"]` | jQuery selector to the element responsible for maximizing the box.
{: .table .table-bordered .bg-light}

> ##### Tip!
> You can use any option via the data-attributes like this.
> ```html
> <button type="button" class="btn btn-tool" data-card-widget="collapse" data-animation-speed="1000"><i class="fas fa-minus"></i></button>
> ```
{: .quote-info}

##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|expanded.lte.cardwidget | Triggered after a card expanded.
|collapsed.lte.cardwidget | Triggered after a card collapsed.
|maximized.lte.cardwidget | Triggered after a card maximized.
|minimized.lte.cardwidget | Triggered after a card minimized.
|removed.lte.cardwidget | Triggered after a card removed.
{: .table .table-bordered .bg-light}

Example: `$('#my-card').on('expanded.lte.cardwidget', handleExpandedEvent)`


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|collapse | Collapses the card
|expand | Expands the card
|remove | Removes the card
|toggle | Toggles the state of the card between expanded and collapsed
|maximize | Maximizes the card
|minimize | Minimizes the card
|toggleMaximize | Toggles the state of the card between maximized and minimized
{: .table .table-bordered .bg-light}

Example: `$('#my-card-widget').CardWidget('toggle')` or `$('#my-card').CardWidget('toggle')`
