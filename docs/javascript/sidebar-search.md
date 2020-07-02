---
layout: page
title: Sidebar Search Plugin
---

The sidebar search plugin provides the functionality to search menu items from the sidebar menu entries. 

##### Usage

This plugin can be activated as a jQuery plugin or using the data API. 

###### Data API
{: .text-bold }

Activate the plugin by adding the following data-attribue `data-widget="sidebar-search"` to a input-group inside the sidebar. You can use the HTML Markup below for a quick start.


###### jQuery
{: .text-bold }

The jQuery API provides more customizable options that allows the developer to pre-process the request before rendering and post-process it after rendering. 

```js
("[data-widget="sidebar-search"]").SidebarSearch(options)
```

##### HTML Markup
Place this HTML Markup after `div.user-panel`.
```html
<div class="form-inline">
  <div class="input-group" data-widget="sidebar-search">
    <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
    <div class="input-group-append">
      <button class="btn btn-sidebar">
        <i class="fas fa-search fa-fw"></i>
      </button>
    </div>
  </div>
</div>
```

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
| arrowSign | String | '->' | Arrow Sign between the menu item path.
| minLength | Number | 3 | Min search query length.
| maxResults | Number | 7 | Max search results to display.
| highlightName | Boolean | TRUE | Whether to highlight menu item name.
| highlightPath | Boolean | FALSE  | Whether to highlight menu item path.
| highlightClass | String | 'text-light' | Hightlight class.
| notFoundText | String | 'No element found! | Response text if no menu item found.
{: .table .table-bordered .bg-light}


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|init | Init's the SidebarSearch Plugin and registers all visible menu items.
|toggle | Toggles the search dropdown list.
|close | Closes the search dropdown list.
|open | Opens the search dropdown list.
|search | Triggers a search.
{: .table .table-bordered .bg-light}

Example: `$('[data-widget="sidebar-search"]').SidebarSearch('toggle')`
