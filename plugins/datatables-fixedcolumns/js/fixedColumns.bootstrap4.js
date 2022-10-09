/*! Bootstrap 4 integration for DataTables' FixedColumns
 * ©2016 SpryMedia Ltd - datatables.net/license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net-bs4', 'datatables.net-fixedcolumns'], function ($) {
            return factory($);
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
            if (!$.fn.dataTable.SearchPanes) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('datatables.net-fixedcolumns')(root, $);
            }
            return factory($);
        };
    }
    else {
        // Browser
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var dataTable = $.fn.dataTable;
    return dataTable.fixedColumns;
}));
