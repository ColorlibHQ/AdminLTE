---
layout: page
title: Navbar Search Plugin
---

The navbar search plugin provides the functionality to show/hide a search input across the whole header. 

##### Usage

This plugin can be activated as a jQuery plugin or using the data API. 

###### Data API
{: .text-bold }

Activate the plugin by adding the following data-attribue `data-widget="navbar-search"` to the `.navbar-search-block` inside the header. You can use the HTML Markup below for a quick start.

###### jQuery
{: .text-bold }

The jQuery API provides more customizable options that allows the developer to pre-process the request before rendering and post-process it after rendering. 

```js
("[data-widget="navbar-search"]").SiteSearch(options)
```

##### HTML Markup
Place this HTML Markup after inside the header.
```html
<a data-widget="navbar-search" href="#" role="button">
  <i class="fas fa-search"></i>
</a>
<div class="navbar-search-block">
  <form class="form-inline">
    <div class="input-group input-group-sm">
      <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
      <div class="input-group-append">
        <button class="btn btn-navbar" type="submit">
          <i class="fas fa-search"></i>
        </button>
        <button class="btn btn-navbar" type="button" data-widget="navbar-search">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </form>
</div>
```

Or you can place the search button inside the navbar as nav-item with this markup:
```html
<li class="nav-item">
  <a class="nav-link" data-widget="navbar-search" href="#" role="button">
    <i class="fas fa-search"></i>
  </a>
  <div class="navbar-search-block">
    <form class="form-inline">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
          <button class="btn btn-navbar" type="button" data-widget="navbar-search">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</li>
```

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
| resetOnClose | Boolean | false | Reset Input on Close/Hide.
|target | String | `.navbar-search-block` | Target navbar-search-block to handle multiple navbar-search-blocks.
{: .table .table-bordered .bg-light}


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|toggle | Toggles the search block.
|close | Closes the search block.
|open | Opens the search block.
{: .table .table-bordered .bg-light}

Example: `$('[data-widget="navbar-search"]').SiteSearch('toggle')`
