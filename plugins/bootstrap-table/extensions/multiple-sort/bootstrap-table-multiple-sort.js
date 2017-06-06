/**
 * @author Nadim Basalamah <dimbslmh@gmail.com>
 * @version: v1.0.0
 * https://github.com/dimbslmh/bootstrap-table/tree/master/src/extensions/multiple-sort/bootstrap-table-multiple-sort.js
 */

(function($) {
    'use strict';

    var isSingleSort = false;

    var sort_order = {
        asc: 'Ascending',
        desc: 'Descending'
    };

    var showSortModal = function(that) {
        var _selector = that.$sortModal.selector,
            _id = _selector.substr(1);

        if (!$(_id).hasClass("modal")) {
            var sModal = '  <div class="modal fade" id="' + _id + '" tabindex="-1" role="dialog" aria-labelledby="' + _id + 'Label" aria-hidden="true">';
            sModal += '         <div class="modal-dialog">';
            sModal += '             <div class="modal-content">';
            sModal += '                 <div class="modal-header">';
            sModal += '                     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            sModal += '                     <h4 class="modal-title" id="' + _id + 'Label">' + that.options.formatMultipleSort() + '</h4>';
            sModal += '                 </div>';
            sModal += '                 <div class="modal-body">';
            sModal += '                     <div class="bootstrap-table">';
            sModal += '                         <div class="fixed-table-toolbar">';
            sModal += '                             <div class="bars">';
            sModal += '                                 <div id="toolbar">';
            sModal += '                                     <button id="add" type="button" class="btn btn-default"><i class="' + that.options.iconsPrefix + ' ' + that.options.icons.plus + '"></i> ' + that.options.formatAddLevel() + '</button>';
            sModal += '                                     <button id="delete" type="button" class="btn btn-default" disabled><i class="' + that.options.iconsPrefix + ' ' + that.options.icons.minus + '"></i> ' + that.options.formatDeleteLevel() + '</button>';
            sModal += '                                 </div>';
            sModal += '                             </div>';
            sModal += '                         </div>';
            sModal += '                         <div class="fixed-table-container">';
            sModal += '                             <table id="multi-sort" class="table">';
            sModal += '                                 <thead>';
            sModal += '                                     <tr>';
            sModal += '                                         <th></th>';
            sModal += '                                         <th><div class="th-inner">' + that.options.formatColumn() + '</div></th>';
            sModal += '                                         <th><div class="th-inner">' + that.options.formatOrder() + '</div></th>';
            sModal += '                                     </tr>';
            sModal += '                                 </thead>';
            sModal += '                                 <tbody></tbody>';
            sModal += '                             </table>';
            sModal += '                         </div>';
            sModal += '                     </div>';
            sModal += '                 </div>';
            sModal += '                 <div class="modal-footer">';
            sModal += '                     <button type="button" class="btn btn-default" data-dismiss="modal">' + that.options.formatCancel() + '</button>';
            sModal += '                     <button type="button" class="btn btn-primary">' + that.options.formatSort() + '</button>';
            sModal += '                 </div>';
            sModal += '             </div>';
            sModal += '         </div>';
            sModal += '     </div>';

            $("body").append($(sModal));

            that.$sortModal = $(_selector);
            var $rows = that.$sortModal.find("tbody > tr");

            that.$sortModal.off('click', '#add').on('click', '#add', function() {
                var total = that.$sortModal.find('.multi-sort-name:first option').length,
                    current = that.$sortModal.find('tbody tr').length;

                if (current < total) {
                    current++;
                    that.addLevel();
                    that.setButtonStates();
                }
            });

            that.$sortModal.off('click', '#delete').on('click', '#delete', function() {
                var total = that.$sortModal.find('.multi-sort-name:first option').length,
                    current = that.$sortModal.find('tbody tr').length;

                if (current > 1 && current <= total) {
                    current--;
                    that.$sortModal.find('tbody tr:last').remove();
                    that.setButtonStates();
                }
            });

            that.$sortModal.off('click', '.btn-primary').on('click', '.btn-primary', function() {
                var $rows = that.$sortModal.find("tbody > tr"),
                    $alert = that.$sortModal.find('div.alert'),
                    fields = [],
                    results = [];


                that.options.sortPriority = $.map($rows, function(row) {
                    var $row = $(row),
                        name = $row.find('.multi-sort-name').val(),
                        order = $row.find('.multi-sort-order').val();

                    fields.push(name);

                    return {
                        sortName: name,
                        sortOrder: order
                    };
                });

                var sorted_fields = fields.sort();

                for (var i = 0; i < fields.length - 1; i++) {
                    if (sorted_fields[i + 1] == sorted_fields[i]) {
                        results.push(sorted_fields[i]);
                    }
                }

                if (results.length > 0) {
                    if ($alert.length === 0) {
                        $alert = '<div class="alert alert-danger" role="alert"><strong>' + that.options.formatDuplicateAlertTitle() + '</strong> ' + that.options.formatDuplicateAlertDescription() + '</div>';
                        $($alert).insertBefore(that.$sortModal.find('.bars'));
                    }
                } else {
                    if ($alert.length === 1) {
                        $($alert).remove();
                    }

                    that.options.sortName = "";
                    that.onMultipleSort();
                    that.$sortModal.modal('hide');
                }
            });

            if (that.options.sortPriority === null || that.options.sortPriority.length === 0) {
                if (that.options.sortName) {
                    that.options.sortPriority = [{
                        sortName: that.options.sortName,
                        sortOrder: that.options.sortOrder
                    }];
                }
            }

            if (that.options.sortPriority !== null && that.options.sortPriority.length > 0) {
                if ($rows.length < that.options.sortPriority.length && typeof that.options.sortPriority === 'object') {
                    for (var i = 0; i < that.options.sortPriority.length; i++) {
                        that.addLevel(i, that.options.sortPriority[i]);
                    }
                }
            } else {
                that.addLevel(0);
            }

            that.setButtonStates();
        }
    };

    $.extend($.fn.bootstrapTable.defaults, {
        showMultiSort: false,
        sortPriority: null,
        onMultipleSort: function() {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.defaults.icons, {
        sort: 'glyphicon-sort',
        plus: 'glyphicon-plus',
        minus: 'glyphicon-minus'
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'multiple-sort.bs.table': 'onMultipleSort'
    });

    $.extend($.fn.bootstrapTable.locales, {
        formatMultipleSort: function() {
            return 'Multiple Sort';
        },
        formatAddLevel: function() {
            return "Add Level";
        },
        formatDeleteLevel: function() {
            return "Delete Level";
        },
        formatColumn: function() {
            return "Column";
        },
        formatOrder: function() {
            return "Order";
        },
        formatSortBy: function() {
            return "Sort by";
        },
        formatThenBy: function() {
            return "Then by";
        },
        formatSort: function() {
            return "Sort";
        },
        formatCancel: function() {
            return "Cancel";
        },
        formatDuplicateAlertTitle: function() {
            return "Duplicate(s) detected!";
        },
        formatDuplicateAlertDescription: function() {
            return "Please remove or change any duplicate column.";
        }
    });

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar;

    BootstrapTable.prototype.initToolbar = function() {
        this.showToolbar = true;
        var that = this,
            sortModalId = '#sortModal_' + this.$el.attr('id');
        this.$sortModal = $(sortModalId);

        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showMultiSort) {
            var $btnGroup = this.$toolbar.find('>.btn-group').first(),
                $multiSortBtn = this.$toolbar.find('div.multi-sort');

            if (!$multiSortBtn.length) {
                $multiSortBtn = '  <button class="multi-sort btn btn-default' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + '" type="button" data-toggle="modal" data-target="' + sortModalId + '" title="' + this.options.formatMultipleSort() + '">';
                $multiSortBtn += '     <i class="' + this.options.iconsPrefix + ' ' + this.options.icons.sort + '"></i>';
                $multiSortBtn += '</button>';

                $btnGroup.append($multiSortBtn);

                showSortModal(that);
            }

            this.$el.on('sort.bs.table', function() {
                isSingleSort = true;
            });

            this.$el.on('multiple-sort.bs.table', function() {
                isSingleSort = false;
            });

            this.$el.on('load-success.bs.table', function() {
                if (!isSingleSort && that.options.sortPriority !== null && typeof that.options.sortPriority === 'object') {
                    that.onMultipleSort();
                }
            });

            this.$el.on('column-switch.bs.table', function(field, checked) {
                for (var i = 0; i < that.options.sortPriority.length; i++) {
                    if (that.options.sortPriority[i].sortName === checked) {
                        that.options.sortPriority.splice(i, 1);
                    }
                }

                that.assignSortableArrows();
                that.$sortModal.remove();
                showSortModal(that);
            });

            this.$el.on('reset-view.bs.table', function() {
                if (!isSingleSort && that.options.sortPriority !== null && typeof that.options.sortPriority === 'object') {
                    that.assignSortableArrows();
                }
            });
        }
    };

    BootstrapTable.prototype.onMultipleSort = function() {
        var that = this;

        var cmp = function(x, y) {
            return x > y ? 1 : x < y ? -1 : 0;
        };

        var arrayCmp = function(a, b) {
            var arr1 = [],
                arr2 = [];

            for (var i = 0; i < that.options.sortPriority.length; i++) {
                var order = that.options.sortPriority[i].sortOrder === 'desc' ? -1 : 1,
                    aa = a[that.options.sortPriority[i].sortName],
                    bb = b[that.options.sortPriority[i].sortName];

                if (aa === undefined || aa === null) {
                    aa = '';
                }
                if (bb === undefined || bb === null) {
                    bb = '';
                }
                if ($.isNumeric(aa) && $.isNumeric(bb)) {
                    aa = parseFloat(aa);
                    bb = parseFloat(bb);
                }
                if (typeof aa !== 'string') {
                    aa = aa.toString();
                }

                arr1.push(
                    order * cmp(aa, bb));
                arr2.push(
                    order * cmp(bb, aa));
            }

            return cmp(arr1, arr2);
        };

        this.data.sort(function(a, b) {
            return arrayCmp(a, b);
        });

        this.initBody();
        this.assignSortableArrows();
        this.trigger('multiple-sort');
    };

    BootstrapTable.prototype.addLevel = function(index, sortPriority) {
        var text = index === 0 ? this.options.formatSortBy() : this.options.formatThenBy();

        this.$sortModal.find('tbody')
            .append($('<tr>')
                .append($('<td>').text(text))
                .append($('<td>').append($('<select class="form-control multi-sort-name">')))
                .append($('<td>').append($('<select class="form-control multi-sort-order">')))
        );

        var $multiSortName = this.$sortModal.find('.multi-sort-name').last(),
            $multiSortOrder = this.$sortModal.find('.multi-sort-order').last();

        $.each(this.columns, function (i, column) {
            if (column.sortable === false || column.visible === false) {
                return true;
            }
            $multiSortName.append('<option value="' + column.field + '">' + column.title + '</option>');
        });

        $.each(sort_order, function(value, order) {
            $multiSortOrder.append('<option value="' + value + '">' + order + '</option>');
        });

        if (sortPriority !== undefined) {
            $multiSortName.find('option[value="' + sortPriority.sortName + '"]').attr("selected", true);
            $multiSortOrder.find('option[value="' + sortPriority.sortOrder + '"]').attr("selected", true);
        }
    };

    BootstrapTable.prototype.assignSortableArrows = function() {
        var that = this,
            headers = that.$header.find('th');

        for (var i = 0; i < headers.length; i++) {
            for (var c = 0; c < that.options.sortPriority.length; c++) {
                if ($(headers[i]).data('field') === that.options.sortPriority[c].sortName) {
                    $(headers[i]).find('.sortable').removeClass('desc asc').addClass(that.options.sortPriority[c].sortOrder);
                }
            }
        }
    };

    BootstrapTable.prototype.setButtonStates = function() {
        var total = this.$sortModal.find('.multi-sort-name:first option').length,
            current = this.$sortModal.find('tbody tr').length;

        if (current == total) {
            this.$sortModal.find('#add').attr('disabled', 'disabled');
        }
        if (current > 1) {
            this.$sortModal.find('#delete').removeAttr('disabled');
        }
        if (current < total) {
            this.$sortModal.find('#add').removeAttr('disabled');
        }
        if (current == 1) {
            this.$sortModal.find('#delete').attr('disabled', 'disabled');
        }
    };
})(jQuery);
