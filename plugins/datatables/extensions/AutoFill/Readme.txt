# AutoFill

AutoFill gives an Excel like option to a DataTable to click and drag over multiple cells, filling in information over the selected cells and incrementing numbers as needed. Key features include:

* Click and drag cell content insertion
* Automatic incrementing of numeric information
* Enable and disable on any column
* Detailed callback functions for customisation
* Support for both DataTables and browser window scrolling


# Installation

To use AutoFill, first download DataTables ( http://datatables.net/download ) and place the unzipped AutoFill package into a `extensions` directory in the DataTables package. This will allow the pages in the examples to operate correctly. To see the examples running, open the `examples` directory in your web-browser.


# Basic usage

AutoFill is initialised using the `$.fn.dataTable.AutoFill` constructor. For example:

```js
$(document).ready( function () {
    var table = $('#example').dataTable();
    new $.fn.dataTable.AutoFill( table );
} );
```


# Documentation / support

* Documentation: http://datatables.net/extensions/autofill/
* DataTables support forums: http://datatables.net/forums


# GitHub

If you fancy getting involved with the development of AutoFill and help make it better, please refer to its GitHub repo: https://github.com/DataTables/AutoFill

