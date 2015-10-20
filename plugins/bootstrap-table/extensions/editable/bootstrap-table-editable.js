/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/vitalets/x-editable
 */

!function ($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        editable: true,
        onEditableInit: function () {
            return false;
        },
        onEditableSave: function (field, row, oldValue, $el) {
            return false;
        },
        onEditableShown: function (field, row, $el, editable) {
            return false;
        },
        onEditableHidden: function (field, row, $el, reason) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'editable-init.bs.table': 'onEditableInit',
        'editable-save.bs.table': 'onEditableSave',
        'editable-shown.bs.table': 'onEditableShown',
        'editable-hidden.bs.table': 'onEditableHidden'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function () {
        var that = this;
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable) {
                return;
            }

            var _formatter = column.formatter;
            column.formatter = function (value, row, index) {
                var result = _formatter ? _formatter(value, row, index) : value;

                return ['<a href="javascript:void(0)"',
                    ' data-name="' + column.field + '"',
                    ' data-pk="' + row[that.options.idField] + '"',
                    ' data-value="' + result + '"',
                    '>' + '</a>'
                ].join('');
            };
        });
    };

    BootstrapTable.prototype.initBody = function () {
        var that = this;
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable) {
                return;
            }

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('save').on('save', function (e, params) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index],
                        oldValue = row[column.field];

                    row[column.field] = params.submitValue;
                    that.trigger('editable-save', column.field, row, oldValue, $(this));
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('shown').on('shown', function (e, editable) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];
                    
                    that.trigger('editable-shown', column.field, row, $(this), editable);
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('hidden').on('hidden', function (e, reason) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];
                    
                    that.trigger('editable-hidden', column.field, row, $(this), reason);
                });
        });
        this.trigger('editable-init');
    };

}(jQuery);
