/*! FixedColumns 4.2.2
 * © SpryMedia Ltd - datatables.net/license
 */

import $ from 'jquery';
import DataTable from 'datatables.net';

(function () {
    'use strict';

    var $$1;
    var dataTable;
    function setJQuery(jq) {
        $$1 = jq;
        dataTable = $$1.fn.dataTable;
    }
    var FixedColumns = /** @class */ (function () {
        function FixedColumns(settings, opts) {
            var _this = this;
            // Check that the required version of DataTables is included
            if (!dataTable || !dataTable.versionCheck || !dataTable.versionCheck('1.10.0')) {
                throw new Error('StateRestore requires DataTables 1.10 or newer');
            }
            var table = new dataTable.Api(settings);
            this.classes = $$1.extend(true, {}, FixedColumns.classes);
            // Get options from user
            this.c = $$1.extend(true, {}, FixedColumns.defaults, opts);
            // Backwards compatibility for deprecated leftColumns
            if ((!opts || opts.left === undefined) && this.c.leftColumns !== undefined) {
                this.c.left = this.c.leftColumns;
            }
            // Backwards compatibility for deprecated rightColumns
            if ((!opts || opts.right === undefined) && this.c.rightColumns !== undefined) {
                this.c.right = this.c.rightColumns;
            }
            this.s = {
                barWidth: 0,
                dt: table,
                rtl: $$1('body').css('direction') === 'rtl'
            };
            // Common CSS for all blockers
            var blockerCSS = {
                'bottom': '0px',
                'display': 'block',
                'position': 'absolute',
                'width': this.s.barWidth + 1 + 'px'
            };
            this.dom = {
                leftBottomBlocker: $$1('<div>')
                    .css(blockerCSS)
                    .css('left', 0)
                    .addClass(this.classes.leftBottomBlocker),
                leftTopBlocker: $$1('<div>')
                    .css(blockerCSS)
                    .css({
                    left: 0,
                    top: 0
                })
                    .addClass(this.classes.leftTopBlocker),
                rightBottomBlocker: $$1('<div>')
                    .css(blockerCSS)
                    .css('right', 0)
                    .addClass(this.classes.rightBottomBlocker),
                rightTopBlocker: $$1('<div>')
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
                table.one('init.dt', function () {
                    // Fixed Columns Initialisation
                    _this._addStyles();
                    _this._setKeyTableListener();
                });
            }
            table.on('column-sizing.dt', function () { return _this._addStyles(); });
            // Make class available through dt object
            table.settings()[0]._fixedColumns = this;
            return this;
        }
        /**
         * Getter/Setter for the `fixedColumns.left` property
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
         * Getter/Setter for the `fixedColumns.left` property
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
            // Set the bar width if vertical scrolling is enabled
            if (this.s.dt.settings()[0].oScroll.sY) {
                var scroll_1 = $$1(this.s.dt.table().node()).closest('div.dataTables_scrollBody')[0];
                var barWidth = this.s.dt.settings()[0].oBrowser.barWidth;
                if (scroll_1.offsetWidth - scroll_1.clientWidth >= barWidth) {
                    this.s.barWidth = barWidth;
                }
                else {
                    this.s.barWidth = 0;
                }
                this.dom.rightTopBlocker.css('width', this.s.barWidth + 1);
                this.dom.leftTopBlocker.css('width', this.s.barWidth + 1);
                this.dom.rightBottomBlocker.css('width', this.s.barWidth + 1);
                this.dom.leftBottomBlocker.css('width', this.s.barWidth + 1);
            }
            var parentDiv = null;
            // Get the header and it's height
            var header = this.s.dt.column(0).header();
            var headerHeight = null;
            if (header !== null) {
                header = $$1(header);
                headerHeight = header.outerHeight() + 1;
                parentDiv = $$1(header.closest('div.dataTables_scroll')).css('position', 'relative');
            }
            // Get the footer and it's height
            var footer = this.s.dt.column(0).footer();
            var footerHeight = null;
            if (footer !== null) {
                footer = $$1(footer);
                footerHeight = footer.outerHeight();
                // Only attempt to retrieve the parentDiv if it has not been retrieved already
                if (parentDiv === null) {
                    parentDiv = $$1(footer.closest('div.dataTables_scroll')).css('position', 'relative');
                }
            }
            // Get the number of columns in the table - this is used often so better to only make 1 api call
            var numCols = this.s.dt.columns().data().toArray().length;
            // Tracker for the number of pixels should be left to the left of the table
            var distLeft = 0;
            // Sometimes the headers have slightly different widths so need to track them individually
            var headLeft = 0;
            // Get all of the row elements in the table
            var rows = $$1(this.s.dt.table().node()).children('tbody').children('tr');
            var invisibles = 0;
            // When working from right to left we need to know how many are invisible before a point,
            // without including those that are invisible after
            var prevInvisible = new Map();
            // Iterate over all of the columns
            for (var i = 0; i < numCols; i++) {
                var column = this.s.dt.column(i);
                // Set the map for the previous column
                if (i > 0) {
                    prevInvisible.set(i - 1, invisibles);
                }
                if (!column.visible()) {
                    invisibles++;
                    continue;
                }
                // Get the columns header and footer element
                var colHeader = $$1(column.header());
                var colFooter = $$1(column.footer());
                // If i is less than the value of left then this column should be fixed left
                if (i - invisibles < this.c.left) {
                    $$1(this.s.dt.table().node()).addClass(this.classes.tableFixedLeft);
                    parentDiv.addClass(this.classes.tableFixedLeft);
                    // Add the width of the previous node - only if we are on atleast the second column
                    if (i - invisibles > 0) {
                        var prevIdx = i;
                        // Simply using the number of hidden columns doesn't work here,
                        // if the first is hidden then this would be thrown off
                        while (prevIdx + 1 < numCols) {
                            var prevCol = this.s.dt.column(prevIdx - 1, { page: 'current' });
                            if (prevCol.visible()) {
                                distLeft += $$1(prevCol.nodes()[0]).outerWidth();
                                headLeft += prevCol.header() ?
                                    $$1(prevCol.header()).outerWidth() :
                                    prevCol.footer() ?
                                        $$1(prevCol.header()).outerWidth() :
                                        0;
                                break;
                            }
                            prevIdx--;
                        }
                    }
                    // Iterate over all of the rows, fixing the cell to the left
                    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        var row = rows_1[_i];
                        $$1($$1(row).children()[i - invisibles])
                            .css(this._getCellCSS(false, distLeft, 'left'))
                            .addClass(this.classes.fixedLeft);
                    }
                    // Add the css for the header and the footer
                    colHeader
                        .css(this._getCellCSS(true, headLeft, 'left'))
                        .addClass(this.classes.fixedLeft);
                    colFooter
                        .css(this._getCellCSS(true, headLeft, 'left'))
                        .addClass(this.classes.fixedLeft);
                }
                else {
                    // Iteriate through all of the rows, making sure they aren't currently trying to fix left
                    for (var _a = 0, rows_2 = rows; _a < rows_2.length; _a++) {
                        var row = rows_2[_a];
                        var cell = $$1($$1(row).children()[i - invisibles]);
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
            var distRight = 0;
            var headRight = 0;
            // Counter for the number of invisible columns so far
            var rightInvisibles = 0;
            for (var i = numCols - 1; i >= 0; i--) {
                var column = this.s.dt.column(i);
                // If a column is invisible just skip it
                if (!column.visible()) {
                    rightInvisibles++;
                    continue;
                }
                // Get the columns header and footer element
                var colHeader = $$1(column.header());
                var colFooter = $$1(column.footer());
                // Get the number of visible columns that came before this one
                var prev = prevInvisible.get(i);
                if (prev === undefined) {
                    // If it wasn't set then it was the last column so just use the final value
                    prev = invisibles;
                }
                if (i + rightInvisibles >= numCols - this.c.right) {
                    $$1(this.s.dt.table().node()).addClass(this.classes.tableFixedRight);
                    parentDiv.addClass(this.classes.tableFixedRight);
                    // Add the widht of the previous node, only if we are on atleast the second column
                    if (i + 1 + rightInvisibles < numCols) {
                        var prevIdx = i;
                        // Simply using the number of hidden columns doesn't work here,
                        // if the first is hidden then this would be thrown off
                        while (prevIdx + 1 < numCols) {
                            var prevCol = this.s.dt.column(prevIdx + 1, { page: 'current' });
                            if (prevCol.visible()) {
                                distRight += $$1(prevCol.nodes()[0]).outerWidth();
                                headRight += prevCol.header() ?
                                    $$1(prevCol.header()).outerWidth() :
                                    prevCol.footer() ?
                                        $$1(prevCol.header()).outerWidth() :
                                        0;
                                break;
                            }
                            prevIdx++;
                        }
                    }
                    // Iterate over all of the rows, fixing the cell to the right
                    for (var _b = 0, rows_3 = rows; _b < rows_3.length; _b++) {
                        var row = rows_3[_b];
                        $$1($$1(row).children()[i - prev])
                            .css(this._getCellCSS(false, distRight, 'right'))
                            .addClass(this.classes.fixedRight);
                    }
                    // Add the css for the header and the footer
                    colHeader
                        .css(this._getCellCSS(true, headRight, 'right'))
                        .addClass(this.classes.fixedRight);
                    colFooter
                        .css(this._getCellCSS(true, headRight, 'right'))
                        .addClass(this.classes.fixedRight);
                }
                else {
                    // Iteriate through all of the rows, making sure they aren't currently trying to fix right
                    for (var _c = 0, rows_4 = rows; _c < rows_4.length; _c++) {
                        var row = rows_4[_c];
                        var cell = $$1($$1(row).children()[i - prev]);
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
                return this.s.rtl
                    ? {
                        position: 'sticky',
                        right: dist + 'px'
                    }
                    : {
                        left: dist + 'px',
                        position: 'sticky'
                    };
            }
            else {
                return this.s.rtl
                    ? {
                        left: dist + (header ? this.s.barWidth : 0) + 'px',
                        position: 'sticky'
                    }
                    : {
                        position: 'sticky',
                        right: dist + (header ? this.s.barWidth : 0) + 'px'
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
                var cellPos = $$1(cell.node()).offset();
                var scroll = $$1($$1(_this.s.dt.table().node()).closest('div.dataTables_scrollBody'));
                // If there are fixed columns to the left
                if (_this.c.left > 0) {
                    // Get the rightmost left fixed column header, it's position and it's width
                    var rightMost = $$1(_this.s.dt.column(_this.c.left - 1).header());
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
                    var cellWidth = $$1(cell.node()).outerWidth();
                    // Get the leftmost right fixed column header and it's position
                    var leftMost = $$1(_this.s.dt.column(numCols - _this.c.right).header());
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
            this.s.dt.on('column-visibility', function (e, settings, column, state, recalc) {
                if (recalc && !settings.bDestroying) {
                    setTimeout(function () {
                        _this._addStyles();
                    }, 50);
                }
            });
        };
        FixedColumns.version = '4.2.2';
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

    /*! FixedColumns 4.2.2
     * © SpryMedia Ltd - datatables.net/license
     */
    setJQuery($);
    $.fn.dataTable.FixedColumns = FixedColumns;
    $.fn.DataTable.FixedColumns = FixedColumns;
    var apiRegister = DataTable.Api.register;
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
    DataTable.ext.buttons.fixedColumns = {
        action: function (e, dt, node, config) {
            if ($(node).attr('active')) {
                $(node).removeAttr('active').removeClass('active');
                dt.fixedColumns().left(0);
                dt.fixedColumns().right(0);
            }
            else {
                $(node).attr('active', 'true').addClass('active');
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
            $(node).attr('active', 'true').addClass('active');
            dt.button(node).text(config.text || dt.i18n('buttons.fixedColumns', dt.settings()[0]._fixedColumns.c.i18n.button));
        },
        text: null
    };
    function _init(settings, options) {
        if (options === void 0) { options = null; }
        var api = new DataTable.Api(settings);
        var opts = options
            ? options
            : api.init().fixedColumns || DataTable.defaults.fixedColumns;
        var fixedColumns = new FixedColumns(api, opts);
        return fixedColumns;
    }
    // Attach a listener to the document which listens for DataTables initialisation
    // events so we can automatically initialise
    $(document).on('plugin-init.dt', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (settings.oInit.fixedColumns ||
            DataTable.defaults.fixedColumns) {
            if (!settings._fixedColumns) {
                _init(settings, null);
            }
        }
    });

}());


export default DataTable;
