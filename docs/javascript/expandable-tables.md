---
layout: page
title: Expandable Table Plugin
---

The expandable table plugin provides simple functionality to create expandable tables. 

##### Example Code
```html
<table class="table table-bordered table-hover">
  <tbody>
    <tr data-widget="expandable-table" aria-expanded="false">
      <td>183</td>
    </tr>
    <tr class="expandable-body">
      <td>
        <p>
          <!-- YOUR EXPANDABLE TABLE BODY HERE -->
        </p>
      </td>
    </tr>
    <tr data-widget="expandable-table" aria-expanded="true">
      <td>219</td>
    </tr>
    <tr class="expandable-body">
      <td>
        <p>
          <!-- YOUR EXPANDABLE TABLE BODY HERE -->
        </p>
      </td>
    </tr>
    <tr data-widget="expandable-table" aria-expanded="true">
      <td>657</td>
    </tr>
    <tr class="expandable-body">
      <td>
        <p>
          <!-- YOUR EXPANDABLE TABLE BODY HERE -->
        </p>
      </td>
    </tr>
  </tbody>
</table>
```
{: .max-height-300}


> ##### Tip!
> You can control the default visibility with ` aria-expanded="false"`/` aria-expanded="true"` via the expandable table header.
{: .quote-info}


##### Usage
This plugin can be activated as a jQuery plugin or using the data api. 

###### Data API
{: .text-bold }
Add `data-widget="expandable-table"` to a table row to activate the plugin and place a new table row below with the `.expandable-body`-class.
```html
<tr data-widget="expandable-table" aria-expanded="true">
  <td>657</td>
</tr>
<tr class="expandable-body">
  <td>
    <p>
    </p>
  </td>
</tr>
``` 

> ##### Tip!
> To get the correct slide up/down animation place a `div` or `p`-tag inside your expandable table body.
{: .quote-info}


###### jQuery
{: .text-bold }
The jQuery API provides more customizable options that allows the developer to toggle the visibilty state of one table row. 
```js
$('#expandable-table-header-row').ExpandableTable('toggleRow')
```


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|toggleRow | Toggles the state of the expandable table body between hidden and visible.
{: .table .table-bordered .bg-light}

Example: `$('#expandable-table-header-row').ExpandableTable('toggleRow')`


##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|expanded.lte.expandableTable | Triggered after a expandable table body is expanded.
|collapsed.lte.expandableTable | Triggered after a expandable table body is collapsed.
{: .table .table-bordered .bg-light}

Example: `$('#expandable-table-header-row').on('expanded.lte.expandableTable', handleToggledEvent)`
