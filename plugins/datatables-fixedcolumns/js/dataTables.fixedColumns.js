/*! FixedColumns 4.0.0
 * 2019-2020 SpryMedia Ltd - datatables.net/license
 */
(function () {
    'use strict';

    var $;
    var dataTable;
    function setJQuery(jq) {
        $ = jq;
        dataTable = $.fn.dataTable;
    }
    var FixedColumns = /** @class */ (function () {
        function FixedColumns(settings, opts) {
            var _this = this;
            // Check that the required version of DataTables is included
            if (!dataTable || !dataTable.versionCheck || !dataTable.versionCheck('1.10.0')) {
                throw new Error('StateRestore requires DataTables 1.10 or newer');
            }
            var table = new dataTable.Api(settings);
            this.classes = $.extend(true, {}, FixedColumns.classes);
            // Get options from user
            this.c = $.extend(true, {}, FixedColumns.defaults, opts);
            // Backwards compatibility for deprecated leftColumns
            if (opts.left === undefined && this.c.leftColumns !== undefined) {
                this.c.left = this.c.leftColumns;
            }
            // Backwards compatibility for deprecated rightColumns
            if (opts.right === undefined && this.c.rightColumns !== undefined) {
                this.c.right = this.c.rightColumns;
            }
            this.s = {
                barWidth: 0,
                dt: table,
                rtl: $(table.table().node()).css('direction') === 'rtl'
            };
            // Set the bar width if vertical scrolling is enabled
            if (this.s.dt.settings()[0].oInit.scrollY === true) {
                this.s.barWidth = this.s.dt.settings()[0].oBrowser.barWidth;
            }
            // Common CSS for all blockers
            var blockerCSS = {
                'background-color': 'white',
                'bottom': '0px',
                'display': 'block',
                'position': 'absolute',
                'width': this.s.barWidth + 1 + 'px'
            };
            this.dom = {
                leftBottomBlocker: $('<div>')
                    .css(blockerCSS)
                    .css('left', 0)
                    .addClass(this.classes.leftBottomBlocker),
                leftTopBlocker: $('<div>')
                    .css(blockerCSS)
                    .css({
                    left: 0,
                    top: 0
                })
                    .addClass(this.classes.leftTopBlocker),
                rightBottomBlocker: $('<div>')
                    .css(blockerCSS)
                    .css('right', 0)
                    .addClass(this.classes.rightBottomBlocker),
                rightTopBlocker: $('<div>')
                    .css(blockerCSS)
                    .css({
                    right: 0,
                    top: 0
                })
                    .addClass(this.classes.rightTopBlocker)
            };
            if (this.s.dt.settings()[0]._bInitComplete) {
                // Fixed Columns Initialisation
                this._addStyles();
                this._setKeyTableListener();
            }
            else {
                table.one('preInit.dt', function () {
                    // Fixed Columns Initialisation
                    _this._addStyles();
                    _this._setKeyTableListener();
                });
            }
            // Make class available through dt object
            table.settings()[0]._fixedColumns = this;
            return this;
        }
        /**
         * Getter/Setter for the fixedColumns.left property
         *
         * @param newVal Optional. If present this will be the new value for the number of left fixed columns
         * @returns The number of left fixed columns
         */
        FixedColumns.prototype.left = function (newVal) {
            // If the value is to change
            if (newVal !== undefined) {
                // Set the new values and redraw the columns
                this.c.left = newVal;
                this._addStyles();
            }
            return this.c.left;
        };
        /**
         * Getter/Setter for the fixedColumns.left property
         *
         * @param newVal Optional. If present this will be the new value for the number of right fixed columns
         * @returns The number of right fixed columns
         */
        FixedColumns.prototype.right = function (newVal) {
            // If the value is to change
            if (newVal !== undefined) {
                // Set the new values and redraw the columns
                this.c.right = newVal;
                this._addStyles();
            }
            return this.c.right;
        };
        /**
         * Iterates over the columns, fixing the appropriate ones to the left and right
         */
        FixedColumns.prototype._addStyles = function () {
            var parentDiv = null;
            // Get the header and it's height
            var header = this.s.dt.column(0).header();
            var headerHeight = null;
            if (header !== null) {
                header = $(header);
                headerHeight = header.outerHeight() + 1;
                parentDiv = $(header.closest('div.dataTables_scroll')).css('position', 'relative');
            }
            // Get the footer and it's height
            var footer = this.s.dt.column(0).footer();
            var footerHeight = null;
            if (footer !== null) {
                footer = $(footer);
                footerHeight = footer.outerHeight();
                // Only attempt to retrieve the parentDiv if it has not been retrieved already
                if (parentDiv === null) {
                    parentDiv = $(footer.closest('div.dataTables_scroll')).css('position', 'relative');
                }
            }
            // Get the number of columns in the table - this is used often so better to only make 1 api call
            var numCols = this.s.dt.columns().data().toArray().length;
            // Tracker for the number of pixels should be left to the left of the table
            var distLeft = 0;
            // Get all of the row elements in the table
            var rows = $(this.s.dt.table().node()).children('tbody').children('tr');
            var invisibles = 0;
            // Iterate over all of the columns
            for (var i = 0; i < numCols; i++) {
                var column = this.s.dt.column(i);
                if (!column.visible()) {
                    invisibles++;
                    continue;
                }
                // Get the columns header and footer element
                var colHeader = $(column.header());
                var colFooter = $(column.footer());
                // If i is less than the value of left then this column should be fixed left
                if (i < this.c.left) {
                    $(this.s.dt.table().node()).addClass(this.classes.tableFixedLeft);
                    parentDiv.addClass(this.classes.tableFixedLeft);
                    // Add the width of the previous node - only if we are on atleast the second column
                    if (i !== 0) {
                        var prevCol = this.s.dt.column(i - 1);
                        if (prevCol.visible()) {
                            distLeft += $(prevCol.nodes()[0]).outerWidth();
                        }
                    }
                    // Iterate over all of the rows, fixing the cell to the left
                    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        var row = rows_1[_i];
                        $($(row).children()[i - invisibles])
                            .css(this._getCellCSS(false, distLeft, 'left'))
                            .addClass(this.classes.fixedLeft);
                    }
                    // Add the css for the header and the footer
                    colHeader
                        .css(this._getCellCSS(true, distLeft, 'left'))
                        .addClass(this.classes.fixedLeft);
                    colFooter
                        .css(this._getCellCSS(true, distLeft, 'left'))
                        .addClass(this.classes.fixedLeft);
                }
                else {
                    // Iteriate through all of the rows, making sure they aren't currently trying to fix left
                    for (var _a = 0, rows_2 = rows; _a < rows_2.length; _a++) {
                        var row = rows_2[_a];
                        var cell = $($(row).children()[i - invisibles]);
                        // If the cell is trying to fix to the left, remove the class and the css
                        if (cell.hasClass(this.classes.fixedLeft)) {
                            cell
                                .css(this._clearCellCSS('left'))
                                .removeClass(this.classes.fixedLeft);
                        }
                    }
                    // Make sure the header for this column isn't fixed left
                    if (colHeader.hasClass(this.classes.fixedLeft)) {
                        colHeader
                            .css(this._clearCellCSS('left'))
                            .removeClass(this.classes.fixedLeft);
                    }
                    // Make sure the footer for this column isn't fixed left
                    if (colFooter.hasClass(this.classes.fixedLeft)) {
                        colFooter
                            .css(this._clearCellCSS('left'))
                            .removeClass(this.classes.fixedLeft);
                    }
                }
            }
            // If there is a header with the index class and reading rtl then add left top blocker
            if (header !== null && !header.hasClass('index')) {
                if (this.s.rtl) {
                    this.dom.leftTopBlocker.outerHeight(headerHeight);
                    parentDiv.append(this.dom.leftTopBlocker);
                }
                else {
                    this.dom.rightTopBlocker.outerHeight(headerHeight);
                    parentDiv.append(this.dom.rightTopBlocker);
                }
            }
            // If there is a footer with the index class and reading rtl then add left bottom blocker
            if (footer !== null && !footer.hasClass('index')) {
                if (this.s.rtl) {
                    this.dom.leftBottomBlocker.outerHeight(footerHeight);
                    parentDiv.append(this.dom.leftBottomBlocker);
                }
                else {
                    this.dom.rightBottomBlocker.outerHeight(footerHeight);
                    parentDiv.append(this.dom.rightBottomBlocker);
                }
            }
            var distRight = 0;
            invisibles = 0;
            for (var i = numCols - 1; i >= 0; i--) {
                var column = this.s.dt.column(i);
                // Get the columns header and footer element
                var colHeader = $(column.header());
                var colFooter = $(column.footer());
                if (!column.visible()) {
                    invisibles++;
                    continue;
                }
                if (i >= numCols - this.c.right) {
                    $(this.s.dt.table().node()).addClass(this.classes.tableFixedRight);
                    parentDiv.addClass(this.classes.tableFixedLeft);
                    // Add the widht of the previous node, only if we are on atleast the second column
                    if (i !== numCols - 1) {
                        var prevCol = this.s.dt.column(i + 1);
                        if (prevCol.visible()) {
                            distRight += $(prevCol.nodes()[0]).outerWidth();
                        }
                    }
                    // Iterate over all of the rows, fixing the cell to the right
                    for (var _b = 0, rows_3 = rows; _b < rows_3.length; _b++) {
                        var row = rows_3[_b];
                        $($(row).children()[i + invisibles])
                            .css(this._getCellCSS(false, distRight, 'right'))
                            .addClass(this.classes.fixedRight);
                    }
                    // Add the css for the header and the footer
                    colHeader
                        .css(this._getCellCSS(true, distRight, 'right'))
                        .addClass(this.classes.fixedRight);
                    colFooter
                        .css(this._getCellCSS(true, distRight, 'right'))
                        .addClass(this.classes.fixedRight);
                }
                else {
                    // Iteriate through all of the rows, making sure they aren't currently trying to fix right
                    for (var _c = 0, rows_4 = rows; _c < rows_4.length; _c++) {
                        var row = rows_4[_c];
                        var cell = $($(row).children()[i + invisibles]);
                        // If the cell is trying to fix to the right, remove the class and the css
                        if (cell.hasClass(this.classes.fixedRight)) {
                            cell
                                .css(this._clearCellCSS('right'))
                                .removeClass(this.classes.fixedRight);
                        }
                    }
                    // Make sure the header for this column isn't fixed right
                    if (colHeader.hasClass(this.classes.fixedRight)) {
                        colHeader
                            .css(this._clearCellCSS('right'))
                            .removeClass(this.classes.fixedRight);
                    }
                    // Make sure the footer for this column isn't fixed right
                    if (colFooter.hasClass(this.classes.fixedRight)) {
                        colFooter
                            .css(this._clearCellCSS('right'))
                            .removeClass(this.classes.fixedRight);
                    }
                }
            }
            // If there is a header with the index class and reading rtl then add right top blocker
            if (header) {
                if (!this.s.rtl) {
                    this.dom.rightTopBlocker.outerHeight(headerHeight);
                    parentDiv.append(this.dom.rightTopBlocker);
                }
                else {
                    this.dom.leftTopBlocker.outerHeight(headerHeight);
                    parentDiv.append(this.dom.leftTopBlocker);
                }
            }
            // If there is a footer with the index class and reading rtl then add right bottom blocker
            if (footer) {
                if (!this.s.rtl) {
                    this.dom.rightBottomBlocker.outerHeight(footerHeight);
                    parentDiv.append(this.dom.rightBottomBlocker);
                }
                else {
                    this.dom.leftBottomBlocker.outerHeight(footerHeight);
                    parentDiv.append(this.dom.leftBottomBlocker);
                }
            }
        };
        /**
         * Gets the correct CSS for the cell, header or footer based on options provided
         *
         * @param header Whether this cell is a header or a footer
         * @param dist The distance that the cell should be moved away from the edge
         * @param lr Indicator of fixing to the left or the right
         * @returns An object containing the correct css
         */
        FixedColumns.prototype._getCellCSS = function (header, dist, lr) {
            if (lr === 'left') {
                return !this.s.rtl ?
                    {
                        left: dist + 'px',
                        position: 'sticky'
                    } :
                    {
                        position: 'sticky',
                        right: dist + (header ? this.s.barWidth : 0) + 'px'
                    };
            }
            else {
                return !this.s.rtl ?
                    {
                        position: 'sticky',
                        right: dist + (header ? this.s.barWidth : 0) + 'px'
                    } :
                    {
                        left: dist + 'px',
                        position: 'sticky'
                    };
            }
        };
        /**
         * Gets the css that is required to clear the fixing to a side
         *
         * @param lr Indicator of fixing to the left or the right
         * @returns An object containing the correct css
         */
        FixedColumns.prototype._clearCellCSS = function (lr) {
            if (lr === 'left') {
                return !this.s.rtl ?
                    {
                        left: '',
                        position: ''
                    } :
                    {
                        position: '',
                        right: ''
                    };
            }
            else {
                return !this.s.rtl ?
                    {
                        position: '',
                        right: ''
                    } :
                    {
                        left: '',
                        position: ''
                    };
            }
        };
        FixedColumns.prototype._setKeyTableListener = function () {
            var _this = this;
            this.s.dt.on('key-focus', function (e, dt, cell) {
                var cellPos = $(cell.node()).offset();
                var scroll = $($(_this.s.dt.table().node()).closest('div.dataTables_scrollBody'));
                // If there are fixed columns to the left
                if (_this.c.left > 0) {
                    // Get the rightmost left fixed column header, it's position and it's width
                    var rightMost = $(_this.s.dt.column(_this.c.left - 1).header());
                    var rightMostPos = rightMost.offset();
                    var rightMostWidth = rightMost.outerWidth();
                    // If the current highlighted cell is left of the rightmost cell on the screen
                    if (cellPos.left < rightMostPos.left + rightMostWidth) {
                        // Scroll it into view
                        var currScroll = scroll.scrollLeft();
                        scroll.scrollLeft(currScroll - (rightMostPos.left + rightMostWidth - cellPos.left));
                    }
                }
                // If there are fixed columns to the right
                if (_this.c.right > 0) {
                    // Get the number of columns and the width of the cell as doing right side calc
                    var numCols = _this.s.dt.columns().data().toArray().length;
                    var cellWidth = $(cell.node()).outerWidth();
                    // Get the leftmost right fixed column header and it's position
                    var leftMost = $(_this.s.dt.column(numCols - _this.c.right).header());
                    var leftMostPos = leftMost.offset();
                    // If the current highlighted cell is right of the leftmost cell on the screen
                    if (cellPos.left + cellWidth > leftMostPos.left) {
                        // Scroll it into view
                        var currScroll = scroll.scrollLeft();
                        scroll.scrollLeft(currScroll - (leftMostPos.left - (cellPos.left + cellWidth)));
                    }
                }
            });
            // Whenever a draw occurs there is potential for the data to have changed and therefore also the column widths
            // Therefore it is necessary to recalculate the values for the fixed columns
            this.s.dt.on('draw', function () {
                _this._addStyles();
            });
            this.s.dt.on('column-reorder', function () {
                _this._addStyles();
            });
            this.s.dt.on('column-visibility', function () {
                _this._addStyles();
            });
        };
        FixedColumns.version = '4.0.0';
        FixedColumns.classes = {
            fixedLeft: 'dtfc-fixed-left',
            fixedRight: 'dtfc-fixed-right',
            leftBottomBlocker: 'dtfc-left-bottom-blocker',
            leftTopBlocker: 'dtfc-left-top-blocker',
            rightBottomBlocker: 'dtfc-right-bottom-blocker',
            rightTopBlocker: 'dtfc-right-top-blocker',
            tableFixedLeft: 'dtfc-has-left',
            tableFixedRight: 'dtfc-has-right'
        };
        FixedColumns.defaults = {
            i18n: {
                button: 'FixedColumns'
            },
            left: 1,
            right: 0
        };
        return FixedColumns;
    }());

    /*! FixedColumns 4.0.0
     * 2019-2020 SpryMedia Ltd - datatables.net/license
     */
    // DataTables extensions common UMD. Note that this allows for AMD, CommonJS
    // (with window and jQuery being allowed as parameters to the returned
    // function) or just default browser loading.
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery', 'datatables.net'], function ($) {
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
                    $ = require('datatables.net')(root, $).$;
                }
                return factory($, root, root.document);
            };
        }
        else {
            // Browser - assume jQuery has already been loaded
            factory(window.jQuery, window, document);
        }
    }(function ($, window, document) {
        setJQuery($);
        var dataTable = $.fn.dataTable;
        $.fn.dataTable.FixedColumns = FixedColumns;
        $.fn.DataTable.FixedColumns = FixedColumns;
        var apiRegister = $.fn.dataTable.Api.register;
        apiRegister('fixedColumns()', function () {
            return this;
        });
        apiRegister('fixedColumns().left()', function (newVal) {
            var ctx = this.context[0];
            if (newVal !== undefined) {
                ctx._fixedColumns.left(newVal);
                return this;
            }
            else {
                return ctx._fixedColumns.left();
            }
        });
        apiRegister('fixedColumns().right()', function (newVal) {
            var ctx = this.context[0];
            if (newVal !== undefined) {
                ctx._fixedColumns.right(newVal);
                return this;
            }
            else {
                return ctx._fixedColumns.right();
            }
        });
        $.fn.dataTable.ext.buttons.fixedColumns = {
            action: function (e, dt, node, config) {
                if ($(node).attr('active')) {
                    $(node).removeAttr('active').removeClass('active');
                    dt.fixedColumns().left(0);
                    dt.fixedColumns().right(0);
                }
                else {
                    $(node).attr('active', true).addClass('active');
                    dt.fixedColumns().left(config.config.left);
                    dt.fixedColumns().right(config.config.right);
                }
            },
            config: {
                left: 1,
                right: 0
            },
            init: function (dt, node, config) {
                if (dt.settings()[0]._fixedColumns === undefined) {
                    _init(dt.settings(), config);
                }
                $(node).attr('active', true).addClass('active');
                dt.button(node).text(config.text || dt.i18n('buttons.fixedColumns', dt.settings()[0]._fixedColumns.c.i18n.button));
            },
            text: null
        };
        function _init(settings, options) {
            if (options === void 0) { options = null; }
            var api = new dataTable.Api(settings);
            var opts = options
                ? options
                : api.init().fixedColumns || dataTable.defaults.fixedColumns;
            var fixedColumns = new FixedColumns(api, opts);
            return fixedColumns;
        }
        // Attach a listener to the document which listens for DataTables initialisation
        // events so we can automatically initialise
        $(document).on('init.dt.dtfc', function (e, settings) {
            if (e.namespace !== 'dt') {
                return;
            }
            if (settings.oInit.fixedColumns ||
                dataTable.defaults.fixedColumns) {
                if (!settings._fixedColumns) {
                    _init(settings, null);
                }
            }
        });
    }));

}());
