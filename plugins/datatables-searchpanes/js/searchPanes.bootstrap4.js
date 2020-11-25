(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net-bs4', 'datatables.net-searchpanes'], function ($) {
            return factory($, window, document);
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }
            if (!$ || !$.fn.dataTable) {
                $ = require('datatables.net-bs4')(root, $).$;
            }
            console.log($.fn.dataTable);
            if (!$.fn.dataTable.SearchPanes) {
                console.log("not present");
                require('datatables.net-searchpanes')(root, $);
            }
            return factory($, root, root.document);
        };
    }
    else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document) {
    'use strict';
    var DataTable = $.fn.dataTable;
    $.extend(true, DataTable.SearchPane.classes, {
        buttonGroup: 'btn-group col justify-content-end',
        disabledButton: 'disabled',
        dull: '',
        narrow: 'col',
        pane: {
            container: 'table'
        },
        paneButton: 'btn btn-light',
        pill: 'pill badge badge-pill badge-secondary',
        search: 'col-sm form-control search',
        searchCont: 'input-group col-sm',
        searchLabelCont: 'input-group-append',
        subRow1: 'dtsp-subRow1',
        subRow2: 'dtsp-subRow2',
        table: 'table table-sm table-borderless',
        topRow: 'dtsp-topRow row'
    });
    $.extend(true, DataTable.SearchPanes.classes, {
        clearAll: 'dtsp-clearAll col-auto btn btn-light',
        container: 'dtsp-searchPanes',
        panes: 'dtsp-panes dtsp-container',
        title: 'dtsp-title col',
        titleRow: 'dtsp-titleRow row'
    });
    return DataTable.searchPanes;
}));
