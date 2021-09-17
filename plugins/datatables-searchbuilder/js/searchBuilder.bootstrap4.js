(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net-bs4', 'datatables.net-searchbuilder'], function ($) {
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
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                $ = require('datatables.net-bs4')(root, $).$;
            }
            if (!$.fn.dataTable.searchBuilder) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('datatables.net-searchbuilder')(root, $);
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
    var dataTable = $.fn.dataTable;
    $.extend(true, dataTable.SearchBuilder.classes, {
        clearAll: 'btn btn-light dtsb-clearAll'
    });
    $.extend(true, dataTable.Group.classes, {
        add: 'btn btn-light dtsb-add',
        clearGroup: 'btn btn-light dtsb-clearGroup',
        logic: 'btn btn-light dtsb-logic'
    });
    $.extend(true, dataTable.Criteria.classes, {
        condition: 'form-control dtsb-condition',
        data: 'form-control dtsb-data',
        "delete": 'btn btn-light dtsb-delete',
        left: 'btn btn-light dtsb-left',
        right: 'btn btn-light dtsb-right',
        value: 'form-control dtsb-value'
    });
    return dataTable.searchPanes;
}));
