/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.1.0
 */

!function ($) {

    'use strict';

    var originalRowAttr,
        dataTTId = 'data-tt-id',
        dataTTParentId = 'data-tt-parent-id',
        obj = {},
        parentId = undefined;

    var getParentRowId = function (that, id) {
        var parentRows = that.$body.find('tr').not('[' + 'data-tt-parent-id]');

        for (var i = 0; i < parentRows.length; i++) {
            if (i === id) {
                return $(parentRows[i]).attr('data-tt-id');
            }
        }

        return undefined;
    };

    var sumData = function (that, data) {
        var sumRow = {};
        $.each(data, function (i, row) {
            if (!row.IsParent) {
                for (var prop in row) {
                    if (!isNaN(parseFloat(row[prop]))) {
                        if (that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, prop)].groupBySumGroup) {
                            if (sumRow[prop] === undefined) {
                                sumRow[prop] = 0;
                            }
                            sumRow[prop] += +row[prop];
                        }
                    }
                }
            }
        });
        return sumRow;
    };

    var rowAttr = function (row, index) {
        //Call the User Defined Function
        originalRowAttr.apply([row, index]);

        obj[dataTTId.toString()] = index;

        if (!row.IsParent) {
            obj[dataTTParentId.toString()] = parentId === undefined ? index : parentId;
        } else {
            parentId = index;
            delete obj[dataTTParentId.toString()];
        }

        return obj;
    };

    var setObjectKeys = function () {
        // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
        Object.keys = function (o) {
            if (o !== Object(o)) {
                throw new TypeError('Object.keys called on a non-object');
            }
            var k = [],
                p;
            for (p in o) {
                if (Object.prototype.hasOwnProperty.call(o, p)) {
                    k.push(p);
                }
            }
            return k;
        }
    };

    var getDataArrayFromItem = function (that, item) {
        var itemDataArray = [];
        for (var i = 0; i < that.options.groupByField.length; i++) {
            itemDataArray.push(item[that.options.groupByField[i]]);
        }

        return itemDataArray;
    };

    var getNewRow = function (that, result, index) {
        var newRow = {};
        for (var i = 0; i < that.options.groupByField.length; i++) {
            newRow[that.options.groupByField[i].toString()] = result[index][0][that.options.groupByField[i]];
        }

        newRow.IsParent = true;

        return newRow;
    };

    var groupBy = function (array, f) {
        var groups = {};
        $.each(array, function (i, o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };

    var makeGrouped = function (that, data) {
        var newData = [],
            sumRow = {};

        var result = groupBy(data, function (item) {
            return getDataArrayFromItem(that, item);
        });

        for (var i = 0; i < result.length; i++) {
            result[i].unshift(getNewRow(that, result, i));
            if (that.options.groupBySumGroup) {
                sumRow = sumData(that, result[i]);
                if (!$.isEmptyObject(sumRow)) {
                    result[i].push(sumRow);
                }
            }
        }

        newData = newData.concat.apply(newData, result);

        if (!that.options.loaded && newData.length > 0) {
            that.options.loaded = true;
            that.options.originalData = that.options.data;
            that.options.data = newData;
        }

        return newData;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        groupBy: false,
        groupByField: [],
        groupBySumGroup: false,
        groupByInitExpanded: undefined, //node, 'all'
        //internal variables
        loaded: false,
        originalData: undefined
    });

    $.fn.bootstrapTable.methods.push('collapseAll', 'expandAll', 'refreshGroupByField');

    $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
        groupBySumGroup: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initData = BootstrapTable.prototype.initData;

    BootstrapTable.prototype.init = function () {
        //Temporal validation
        if (!this.options.sortName) {
            if ((this.options.groupBy) && (this.options.groupByField.length > 0)) {
                var that = this;

                // Compatibility: IE < 9 and old browsers
                if (!Object.keys) {
                    setObjectKeys();
                }

                //Make sure that the internal variables are set correctly
                this.options.loaded = false;
                this.options.originalData = undefined;

                originalRowAttr = this.options.rowAttributes;
                this.options.rowAttributes = rowAttr;
                this.$el.on('post-body.bs.table', function () {
                    that.$el.treetable({
                        expandable: true,
                        onNodeExpand: function () {
                            if (that.options.height) {
                                that.resetHeader();
                            }
                        },
                        onNodeCollapse: function () {
                            if (that.options.height) {
                                that.resetHeader();
                            }
                        }
                    }, true);

                    if (that.options.groupByInitExpanded !== undefined) {
                        if (typeof that.options.groupByInitExpanded === 'number') {
                            that.expandNode(that.options.groupByInitExpanded);
                        } else if (that.options.groupByInitExpanded.toLowerCase() === 'all') {
                            that.expandAll();
                        }
                    }
                });
            }
        }
        _init.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.initData = function (data, type) {
        //Temporal validation
        if (!this.options.sortName) {
            if ((this.options.groupBy) && (this.options.groupByField.length > 0)) {

                this.options.groupByField = typeof this.options.groupByField === 'string' ?
                    this.options.groupByField.replace('[', '').replace(']', '')
                        .replace(/ /g, '').toLowerCase().split(',') : this.options.groupByField;

                data = makeGrouped(this, data ? data : this.options.data);
            }
        }
        _initData.apply(this, [data, type]);
    };

    BootstrapTable.prototype.expandAll = function () {
        this.$el.treetable('expandAll');
    };

    BootstrapTable.prototype.collapseAll = function () {
        this.$el.treetable('collapseAll');
    };

    BootstrapTable.prototype.expandNode = function (id) {
        id = getParentRowId(this, id);
        if (id !== undefined) {
            this.$el.treetable('expandNode', id);
        }
    };

    BootstrapTable.prototype.refreshGroupByField = function (groupByFields) {
        if (!$.fn.bootstrapTable.utils.compareObjects(this.options.groupByField, groupByFields)) {
            this.options.groupByField = groupByFields;
            this.load(this.options.originalData);
        }
    };
}(jQuery);
