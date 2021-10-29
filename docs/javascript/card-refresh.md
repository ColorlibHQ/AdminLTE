---
layout: page
title: Card Refresh Plugin
---

The card refresh plugin provides the functionality for loading ajax content into the card. 

##### Usage

This plugin can be activated as a jQuery plugin or using the data API. 

###### Data API
{: .text-bold }

Activate the plugin by adding a button with `data-card-widget="card-refresh"` to the card and provide the required `data-source="/URL-TO-CONTENT"` option. By doing that, the plugin will automatically create a GET request to the provided URL and render the returned response the `.card-body` section of the card. If you need to process the returned response before rendering, you should use the jQuery API, which provides hooks to deal with the response. 


###### jQuery
{: .text-bold }

The jQuery API provides more customizable options that allows the developer to pre-process the request before rendering and post-process it after rendering. 

```js
("#my-card").refreshBox(options)
```

##### Options
{: .mt-4}

|---
| Name | Type | Default | Description
|-|-|-|-
| source | String | '' | The URL to the source.
| sourceSelector | String | '' | A selector to get return only the content of the selector.
| params | Object | {} | GET query paramaters (example: {search_term: 'layout'}, which renders to URL/?search_term=layout)
| trigger | String | `[data-card-widget="card-refresh"]` | The CSS selector to the refresh button
| content | String | `.card-body` | The CSS selector to the target where the content should be rendered. This selector should exist within the card.
| loadInContent | Boolean | TRUE | Whether to automatically render the content.
| loadOnInit | Boolean | TRUE | Init plugin on page load.
| loadErrorTemplate | Boolean | TRUE | Whether to append the `errorTemplate` to the card when an ajax error occurs.
| responseType | String | '' | Response type (example: 'json' or 'html')
| overlayTemplate | String | TRUE | The HTML template for the ajax spinner
| errorTemplate | String | `'<span class="text-danger"></span>'` | The HTML template for an ajax error message
| onLoadStart | Function | Anonymous Function | Called before the ajax request is made
| onLoadDone | Function | Anonymous Function | Called after the ajax request is made. A `response` parameter is passed to the function that hold the server response. 
| onLoadFail | Function | Anonymous Function | Called if the ajax request fails. `jqXHR`, `textStatus` and `errorThrown` parameters are passed to the function. 
{: .table .table-bordered .bg-light}

##### Events
{: .mt-4}

|---
| Event Type | Description
|-|-
|loaded.lte.cardrefresh | Triggered after a card is refreshed.
|overlay.added.lte.cardrefresh | Triggered after the overlay added to the card.
|overlay.removed.lte.cardrefresh | Triggered after the overlay removed from the card.
{: .table .table-bordered .bg-light}

Example: `$('#my-card [data-card-widget="card-refresh"]').on('loaded.lte.cardrefresh', handleLoadedEvent)`


##### Methods
{: .mt-4}

|---
| Method | Description
|-|-
|load | Reloads the content and runs the `onLoadStart` and `onLoadDone` hooks
{: .table .table-bordered .bg-light}

Example: `$('#my-card-widget').Widget('toggle')`
