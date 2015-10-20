/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.0.0
 */

!function ($) {

    'use strict';

    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    var addOptionToSelectControl = function (selectControl, value, text) {
        selectControl = $(selectControl.get(selectControl.length - 1));
        if (existsOptionInSelectControl(selectControl, value)) {
            selectControl.append($("<option></option>")
                .attr("value", value)
                .text($('<div />').html(text).text()));

            // Sort it. Not overly efficient to do this here
            var $opts = selectControl.find('option:gt(0)');
            $opts.sort(function (a, b) {
                a = $(a).text().toLowerCase();
                b = $(b).text().toLowerCase();
                if ($.isNumeric(a) && $.isNumeric(b)) {
                    // Convert numerical values from string to float.
                    a = parseFloat(a);
                    b = parseFloat(b);
                }
                return a > b ? 1 : a < b ? -1 : 0;
            });

            selectControl.find('option:gt(0)').remove();
            selectControl.append($opts);
        }
    };

    var existsOptionInSelectControl = function (selectControl, value) {
        var options = selectControl.get(selectControl.length - 1).options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].value === value.toString()) {
                //The value is nor valid to add
                return false;
            }
        }

        //If we get here, the value is valid to add
        return true;
    };

    var fixHeaderCSS = function (that) {
        that.$tableHeader.css('height', '77px');
    };

    var getCurrentHeader = function (that) {
        var header = that.$header;
        if (that.options.height) {
            header = that.$tableHeader;
        }

        return header;
    };

    var getCurrentSearchControls = function (that) {
        var searchControls = 'select, input';
        if (that.options.height) {
            searchControls = 'table select, table input';
        }

        return searchControls;
    };

    var copyValues = function (that) {
        var header = getCurrentHeader(that),
            searchControls = getCurrentSearchControls(that);

        that.options.values = [];

        header.find(searchControls).each(function () {
            that.options.values.push(
                {
                    field: $(this).parent().parent().parent().data('field'),
                    value: $(this).val()
                });
        });
    };

    var setValues = function(that) {
        var field = null,
            result = [],
            header = getCurrentHeader(that),
            searchControls = getCurrentSearchControls(that);

        if (that.options.values.length > 0) {
            header.find(searchControls).each(function (index, ele) {
                field = $(this).parent().parent().parent().data('field');
                result = $.grep(that.options.values, function (valueObj) {
                    return valueObj.field === field;
                });

                if (result.length > 0) {
                    $(this).val(result[0].value);
                }
            });
        }
    };

    var createControls = function (that, header) {
        var addedFilterControl = false,
            isVisible,
            html,
            timeoutId = 0;

        $.each(that.columns, function (i, column) {
            isVisible = 'hidden';
            html = [];

            if (!column.visible) {
                return;
            }

            if (!column.filterControl) {
                html.push('<div style="height: 34px;"></div>');
            } else {
                html.push('<div style="margin: 0px 2px 2px 2px;" class="filterControl">');

                if (column.filterControl && column.searchable) {
                    addedFilterControl = true;
                    isVisible = 'visible'
                }
                switch (column.filterControl.toLowerCase()) {
                    case 'input' :
                        html.push(sprintf('<input type="text" class="form-control" style="width: 100%; visibility: %s">', isVisible));
                        break;
                    case 'select':
                        html.push(sprintf('<select class="%s form-control" style="width: 100%; visibility: %s"></select>',
                            column.field, isVisible))
                        break;
                    case 'datepicker':
                        html.push(sprintf('<input type="text" class="date-filter-control %s form-control" style="width: 100%; visibility: %s">',
                            column.field, isVisible));
                        break;
                }
            }

            $.each(header.children().children(), function (i, tr) {
                tr = $(tr);
                if (tr.data('field') === column.field) {
                    tr.find('.fht-cell').append(html.join(''));
                    return false;
                }
            });
            if (column.filterData !== undefined && column.filterData.toLowerCase() !== 'column') {
                var filterDataType = column.filterData.substring(0, 3);
                var filterDataSource = column.filterData.substring(4, column.filterData.length);
                var selectControl = $('.' + column.field);
                addOptionToSelectControl(selectControl, '', '');

                switch (filterDataType) {
                    case 'url':
                        $.ajax({
                            url: filterDataSource,
                            dataType: 'json',
                            success: function (data) {
                                $.each(data, function (key, value) {
                                    addOptionToSelectControl(selectControl, key, value);
                                });
                            }
                        });
                        break;
                    case 'var':
                        var variableValues = window[filterDataSource];
                        for (var key in variableValues) {
                            addOptionToSelectControl(selectControl, key, variableValues[key]);
                        }
                        break;
                }
            }
        });

        if (addedFilterControl) {
            header.off('keyup', 'input').on('keyup', 'input', function (event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });

            header.off('change', 'select').on('change', 'select', function (event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });

            header.off('mouseup', 'input').on('mouseup', 'input', function (event) {
                var $input = $(this),
                oldValue = $input.val();

                if (oldValue === "") {
                    return;
                }

                setTimeout(function(){
                    var newValue = $input.val();

                    if (newValue === "") {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(function () {
                            that.onColumnSearch(event);
                        }, that.options.searchTimeOut);
                    }
                }, 1);
            });

            if (header.find('.date-filter-control').length > 0) {
                $.each(that.columns, function (i, column) {
                    if (column.filterControl !== undefined && column.filterControl.toLowerCase() === 'datepicker') {
                        header.find('.date-filter-control.' + column.field).datepicker(column.filterDatepickerOptions)
                            .on('changeDate', function (e) {
                                //Fired the keyup event
                                $(e.currentTarget).keyup();
                            });
                    }
                });
            }
        } else {
            header.find('.filterControl').hide();
        }
    };

    $.extend($.fn.bootstrapTable.defaults, {
        filterControl: false,
        onColumnSearch: function (field, text) {
            return false;
        },
        filterShowClear: false,
        //internal variables
        values: []
    });

    $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
        filterControl: undefined,
        filterData: undefined,
        filterDatepickerOptions: undefined,
        filterStrictSearch: false
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'column-search.bs.table': 'onColumnSearch'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initToolbar = BootstrapTable.prototype.initToolbar,
        _initHeader = BootstrapTable.prototype.initHeader,
        _initBody = BootstrapTable.prototype.initBody,
        _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.init = function () {
        //Make sure that the filtercontrol option is set
        if (this.options.filterControl) {
            var that = this;
            //Make sure that the internal variables are set correctly
            this.options.values = [];

            this.$el.on('reset-view.bs.table', function () {
                //Create controls on $tableHeader if the height is set
                if (!that.options.height) {
                    return;
                }

                //Avoid recreate the controls
                if (that.$tableHeader.find('select').length > 0 || that.$tableHeader.find('input').length > 0) {
                    return;
                }

                createControls(that, that.$tableHeader);
            }).on('post-header.bs.table', function () {
                setValues(that);
            }).on('post-body.bs.table', function () {
                if (that.options.height) {
                    fixHeaderCSS(that);
                }
            }).on('column-switch.bs.table', function(field, checked) {
                setValues(that);
            });
        }
        _init.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.initToolbar = function () {
        if ((!this.showToolbar) && (this.options.filterControl)) {
            this.showToolbar = this.options.filterControl;
        }

        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.filterControl && this.options.filterShowClear) {
            var $btnGroup = this.$toolbar.find('>.btn-group'),
                $btnClear = $btnGroup.find('div.export');

            if (!$btnClear.length) {
              $btnClear = $([
                    '<button class="btn btn-default " ' +
                        'type="button">',
                    '<i class="glyphicon glyphicon-trash icon-share"></i> ',
                    '</button>',
                    '</ul>'].join('')).appendTo($btnGroup);

                $btnClear.off('click').on('click', $.proxy(this.clearFilterControl, this));
            }
        }
    };

    BootstrapTable.prototype.initHeader = function () {
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.filterControl) {
            return;
        }
        createControls(this, this.$header);
    };

    BootstrapTable.prototype.initBody = function () {
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        var that = this,
            data = this.options.data,
            pageTo = this.pageTo < this.options.data.length ? this.options.data.length : this.pageTo;

        for (var i = this.pageFrom - 1; i < pageTo; i++) {
            var item = data[i];

            $.each(this.header.fields, function (j, field) {
                var value = item[field],
                    column = that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, field)];

                value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header, that.header.formatters[j], [value, item, i], value);

                if ((!column.checkbox) || (!column.radio)) {
                    if (column.filterControl !== undefined && column.filterControl.toLowerCase() === 'select' && column.searchable) {
                        if (column.filterData === undefined || column.filterData.toLowerCase() === 'column') {
                            var selectControl = $('.' + column.field);
                            if (selectControl !== undefined && selectControl.length > 0) {
                                if (selectControl.get(selectControl.length - 1).options.length === 0) {
                                    //Added the default option
                                    addOptionToSelectControl(selectControl, '', '');
                                }

                                //Added a new value
                                addOptionToSelectControl(selectControl, value, value);
                            }
                        }
                    }
                }
            });
        }
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        var that = this;
        var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;

        //Check partial column filter
        this.data = fp ? $.grep(this.data, function (item, i) {
            for (var key in fp) {
                var thisColumn = that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, key)];
                var fval = fp[key].toLowerCase();
                var value = item[key];
                value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header,
                    that.header.formatters[$.inArray(key, that.header.fields)],
                    [value, item, i], value);

                if(thisColumn.filterStrictSearch===true){
                    if (!($.inArray(key, that.header.fields) !== -1 &&
                        (typeof value === 'string' || typeof value === 'number') &&
                        value.toLowerCase() === fval.toLowerCase())) {
                        return false;
                    }
                }
                else{
                    if (!($.inArray(key, that.header.fields) !== -1 &&
                        (typeof value === 'string' || typeof value === 'number') &&
                        (value + '').toLowerCase().indexOf(fval) !== -1)) {
                        return false;
                    }
                };
            }
            return true;
        }) : this.data;
    };

    BootstrapTable.prototype.onColumnSearch = function (event) {
        copyValues(this);
        var text = $.trim($(event.currentTarget).val());
        var $field = $(event.currentTarget).parent().parent().parent().data('field')

        if ($.isEmptyObject(this.filterColumnsPartial)) {
            this.filterColumnsPartial = {};
        }
        if (text) {
            this.filterColumnsPartial[$field] = text;
        } else {
            delete this.filterColumnsPartial[$field];
        }

        this.options.pageNumber = 1;
        this.onSearch(event);
        this.updatePagination();
        this.trigger('column-search', $field, text);
    };

    BootstrapTable.prototype.clearFilterControl = function () {
        if (this.options.filterControl && this.options.filterShowClear) {
            $.each(this.options.values, function (i, item) {
                item.value = '';
            });

            setValues(this);

            var controls = getCurrentHeader(this).find(getCurrentSearchControls(this)),
                timeoutId = 0;

            if (controls.length > 0) {
                this.filterColumnsPartial = {};
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    $(controls[0]).trigger(controls[0].tagName === 'INPUT' ? 'keyup' : 'change');
                }, this.options.searchTimeOut);
            }
        }
    };
}(jQuery);
