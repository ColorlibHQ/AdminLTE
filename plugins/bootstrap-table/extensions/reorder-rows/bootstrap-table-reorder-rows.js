/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.0.0
 */

!function ($) {

    'use strict';

    var isSearch = false;

    var rowAttr = function (row, index) {
        return {
            id: 'customId_' + index
        };
    };

    $.extend($.fn.bootstrapTable.defaults, {
        reorderableRows: false,
        onDragStyle: null,
        onDropStyle: null,
        onDragClass: "reorder_rows_onDragClass",
        dragHandle: null,
        useRowAttrFunc: false,
        onReorderRowsDrag: function (table, row) {
            return false;
        },
        onReorderRowsDrop: function (table, row) {
            return false;
        },
        onReorderRow: function (newData) {
             return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'reorder-row.bs.table': 'onReorderRow'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.init = function () {

        if (!this.options.reorderableRows) {
            return;
        }

        var that = this;
        if (this.options.useRowAttrFunc) {
            this.options.rowAttributes = rowAttr;
        }

        var onPostBody = this.options.onPostBody;
        this.options.onPostBody = function () {
            setTimeout(function () {
                that.makeRowsReorderable();
                onPostBody.apply();
            }, 1);
        };

        _init.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.reorderableRows) {
            return;
        }

        //Known issue after search if you reorder the rows the data is not display properly
        //isSearch = true;
    };

    BootstrapTable.prototype.makeRowsReorderable = function () {
        if (this.options.cardView) {
            return;
        }

        var that = this;
        this.$el.tableDnD({
            onDragStyle: that.options.onDragStyle,
            onDropStyle: that.options.onDropStyle,
            onDragClass: that.options.onDragClass,
            onDrop: that.onDrop,
            onDragStart: that.options.onReorderRowsDrag,
            dragHandle: that.options.dragHandle
        });
    };

    BootstrapTable.prototype.onDrop = function (table, droppedRow) {
        var tableBs = $(table),
            tableBsData = tableBs.data('bootstrap.table'),
            tableBsOptions = tableBs.data('bootstrap.table').options,
            row = null,
            newData = [];

        for (var i = 0; i < table.tBodies[0].rows.length; i++) {
            row = $(table.tBodies[0].rows[i]);
            newData.push(tableBsOptions.data[row.data('index')]);
            row.data('index', i).attr('data-index', i);
        }

        tableBsOptions.data = newData;

        //Call the user defined function
        tableBsOptions.onReorderRowsDrop.apply(table, [table, droppedRow]);

        //Call the event reorder-row
        tableBsData.trigger('reorder-row', newData);
    };
}(jQuery);