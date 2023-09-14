/*! SearchPanes 1.4.0
 * 2019-2020 SpryMedia Ltd - datatables.net/license
 */
(function () {
    'use strict';

    var $;
    var dataTable;
    function setJQuery(jq) {
        $ = jq;
        dataTable = jq.fn.dataTable;
    }
    var SearchPane = /** @class */ (function () {
        /**
         * Creates the panes, sets up the search function
         *
         * @param paneSettings The settings for the searchPanes
         * @param opts The options for the default features
         * @param idx the index of the column for this pane
         * @returns {object} the pane that has been created, including the table and the index of the pane
         */
        function SearchPane(paneSettings, opts, idx, layout, panesContainer, panes) {
            var _this = this;
            if (panes === void 0) { panes = null; }
            // Check that the required version of DataTables is included
            if (!dataTable || !dataTable.versionCheck || !dataTable.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            // eslint-disable-next-line no-extra-parens
            if (!dataTable.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new dataTable.Api(paneSettings);
            this.classes = $.extend(true, {}, SearchPane.classes);
            // Get options from user
            this.c = $.extend(true, {}, SearchPane.defaults, opts);
            if (opts !== undefined && opts.hideCount !== undefined && opts.viewCount === undefined) {
                this.c.viewCount = !this.c.hideCount;
            }
            this.customPaneSettings = panes;
            this.s = {
                cascadeRegen: false,
                clearing: false,
                colOpts: [],
                deselect: false,
                displayed: false,
                dt: table,
                dtPane: undefined,
                filteringActive: false,
                firstSet: true,
                forceViewTotal: false,
                index: idx,
                indexes: [],
                lastCascade: false,
                lastSelect: false,
                listSet: false,
                name: undefined,
                redraw: false,
                rowData: {
                    arrayFilter: [],
                    arrayOriginal: [],
                    arrayTotals: [],
                    bins: {},
                    binsOriginal: {},
                    binsTotal: {},
                    filterMap: new Map(),
                    totalOptions: 0
                },
                scrollTop: 0,
                searchFunction: undefined,
                selectPresent: false,
                serverSelect: [],
                serverSelecting: false,
                showFiltered: false,
                tableLength: null,
                updating: false
            };
            var rowLength = table.columns().eq(0).toArray().length;
            this.colExists = this.s.index < rowLength;
            // Add extra elements to DOM object including clear and hide buttons
            this.c.layout = layout;
            var layVal = parseInt(layout.split('-')[1], 10);
            this.dom = {
                buttonGroup: $('<div/>').addClass(this.classes.buttonGroup),
                clear: $('<button type="button">&#215;</button>')
                    .addClass(this.classes.disabledButton)
                    .attr('disabled', 'true')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.clearButton),
                collapseButton: $('<button type="button"><span class="dtsp-caret">&#x5e;</span></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.collapseButton),
                container: $('<div/>')
                    .addClass(this.classes.container)
                    .addClass(this.classes.layout +
                    (layVal < 10 ? layout : layout.split('-')[0] + '-9')),
                countButton: $('<button type="button"></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.countButton),
                dtP: $('<table><thead><tr><th>' +
                    (this.colExists
                        ? $(table.column(this.colExists ? this.s.index : 0).header()).text()
                        : this.customPaneSettings.header || 'Custom Pane') + '</th><th/></tr></thead></table>'),
                lower: $('<div/>').addClass(this.classes.subRow2).addClass(this.classes.narrowButton),
                nameButton: $('<button type="button"></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.nameButton),
                panesContainer: panesContainer,
                searchBox: $('<input/>').addClass(this.classes.paneInputButton).addClass(this.classes.search),
                searchButton: $('<button type = "button" class="' + this.classes.searchIcon + '"></button>')
                    .addClass(this.classes.paneButton),
                searchCont: $('<div/>').addClass(this.classes.searchCont),
                searchLabelCont: $('<div/>').addClass(this.classes.searchLabelCont),
                topRow: $('<div/>').addClass(this.classes.topRow),
                upper: $('<div/>').addClass(this.classes.subRow1).addClass(this.classes.narrowSearch)
            };
            this.s.displayed = false;
            table = this.s.dt;
            this.selections = [];
            this.s.colOpts = this.colExists ? this._getOptions() : this._getBonusOptions();
            var colOpts = this.s.colOpts;
            var clear = $('<button type="button">X</button>').addClass(this.classes.paneButton);
            clear.text(table.i18n('searchPanes.clearPane', this.c.i18n.clearPane));
            this.dom.container.addClass(colOpts.className);
            this.dom.container.addClass(this.customPaneSettings !== null && this.customPaneSettings.className !== undefined
                ? this.customPaneSettings.className
                : '');
            // Set the value of name incase ordering is desired
            if (this.s.colOpts.name !== undefined) {
                this.s.name = this.s.colOpts.name;
            }
            else if (this.customPaneSettings !== null && this.customPaneSettings.name !== undefined) {
                this.s.name = this.customPaneSettings.name;
            }
            else {
                this.s.name = this.colExists ?
                    $(table.column(this.s.index).header()).text() :
                    this.customPaneSettings.header || 'Custom Pane';
            }
            $(panesContainer).append(this.dom.container);
            var tableNode = table.table(0).node();
            // Custom search function for table
            this.s.searchFunction = function (settings, searchData, dataIndex, origData) {
                // If no data has been selected then show all
                if (_this.selections.length === 0) {
                    return true;
                }
                if (settings.nTable !== tableNode) {
                    return true;
                }
                var filter = null;
                if (_this.colExists) {
                    // Get the current filtered data
                    filter = searchData[_this.s.index];
                    if (colOpts.orthogonal.filter !== 'filter') {
                        // get the filter value from the map
                        filter = _this.s.rowData.filterMap.get(dataIndex);
                        if (filter instanceof $.fn.dataTable.Api) {
                            // eslint-disable-next-line no-extra-parens
                            filter = filter.toArray();
                        }
                    }
                }
                return _this._search(filter, dataIndex);
            };
            $.fn.dataTable.ext.search.push(this.s.searchFunction);
            // If the clear button for this pane is clicked clear the selections
            if (this.c.clear) {
                clear.on('click', function () {
                    var searches = _this.dom.container.find('.' + _this.classes.search.replace(/\s+/g, '.'));
                    searches.each(function () {
                        $(this).val('');
                        $(this).trigger('input');
                    });
                    _this.clearPane();
                });
            }
            // Sometimes the top row of the panes containing the search box and ordering buttons appears
            //  weird if the width of the panes is lower than expected, this fixes the design.
            // Equally this may occur when the table is resized.
            table.on('draw.dtsp', function () {
                _this.adjustTopRow();
            });
            table.on('buttons-action', function () {
                _this.adjustTopRow();
            });
            // When column-reorder is present and the columns are moved, it is necessary to
            //  reassign all of the panes indexes to the new index of the column.
            table.on('column-reorder.dtsp', function (e, settings, details) {
                _this.s.index = details.mapping[_this.s.index];
            });
            return this;
        }
        /**
         * Adds a row to the panes table
         *
         * @param display the value to be displayed to the user
         * @param filter the value to be filtered on when searchpanes is implemented
         * @param shown the number of rows in the table that are currently visible matching this criteria
         * @param total the total number of rows in the table that match this criteria
         * @param sort the value to be sorted in the pane table
         * @param type the value of which the type is to be derived from
         */
        SearchPane.prototype.addRow = function (display, filter, shown, total, sort, type, className) {
            var index;
            for (var _i = 0, _a = this.s.indexes; _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.filter === filter) {
                    index = entry.index;
                }
            }
            if (index === undefined) {
                index = this.s.indexes.length;
                this.s.indexes.push({ filter: filter, index: index });
            }
            return this.s.dtPane.row.add({
                className: className,
                display: display !== '' ?
                    display :
                    this.emptyMessage(),
                filter: filter,
                index: index,
                shown: shown,
                sort: sort,
                total: total,
                type: type
            });
        };
        /**
         * Adjusts the layout of the top row when the screen is resized
         */
        SearchPane.prototype.adjustTopRow = function () {
            var subContainers = this.dom.container.find('.' + this.classes.subRowsContainer.replace(/\s+/g, '.'));
            var subRow1 = this.dom.container.find('.' + this.classes.subRow1.replace(/\s+/g, '.'));
            var subRow2 = this.dom.container.find('.' + this.classes.subRow2.replace(/\s+/g, '.'));
            var topRow = this.dom.container.find('.' + this.classes.topRow.replace(/\s+/g, '.'));
            // If the width is 0 then it is safe to assume that the pane has not yet been displayed.
            //  Even if it has, if the width is 0 it won't make a difference if it has the narrow class or not
            if (($(subContainers[0]).width() < 252 || $(topRow[0]).width() < 252) && $(subContainers[0]).width() !== 0) {
                $(subContainers[0]).addClass(this.classes.narrow);
                $(subRow1[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowSearch);
                $(subRow2[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowButton);
            }
            else {
                $(subContainers[0]).removeClass(this.classes.narrow);
                $(subRow1[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowSearch);
                $(subRow2[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowButton);
            }
        };
        /**
         * In the case of a rebuild there is potential for new data to have been included or removed
         * so all of the rowData must be reset as a precaution.
         */
        SearchPane.prototype.clearData = function () {
            this.s.rowData = {
                arrayFilter: [],
                arrayOriginal: [],
                arrayTotals: [],
                bins: {},
                binsOriginal: {},
                binsTotal: {},
                filterMap: new Map(),
                totalOptions: 0
            };
        };
        /**
         * Clear the selections in the pane
         */
        SearchPane.prototype.clearPane = function () {
            // Deselect all rows which are selected and update the table and filter count.
            this.s.dtPane.rows({ selected: true }).deselect();
            this.updateTable();
            return this;
        };
        /**
         * Collapses the pane so that only the header is displayed
         */
        SearchPane.prototype.collapse = function () {
            var _this = this;
            if (!this.s.displayed ||
                (!this.c.collapse && this.s.colOpts.collapse !== true ||
                    this.s.colOpts.collapse === false)) {
                return;
            }
            this.dom.collapseButton.addClass(this.classes.rotated);
            $(this.s.dtPane.table().container()).addClass(this.classes.hidden);
            this.dom.topRow.addClass(this.classes.bordered);
            this.dom.countButton.addClass(this.classes.disabledButton);
            this.dom.nameButton.addClass(this.classes.disabledButton);
            this.dom.searchButton.addClass(this.classes.disabledButton);
            this.dom.topRow.one('click', function () {
                _this.show();
            });
        };
        /**
         * Strips all of the SearchPanes elements from the document and turns all of the listeners for the buttons off
         */
        SearchPane.prototype.destroy = function () {
            if (this.s.dtPane !== undefined) {
                this.s.dtPane.off('.dtsp');
            }
            this.dom.nameButton.off('.dtsp');
            this.dom.collapseButton.off('.dtsp');
            this.dom.countButton.off('.dtsp');
            this.dom.clear.off('.dtsp');
            this.dom.searchButton.off('.dtsp');
            this.dom.container.remove();
            var searchIdx = $.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            while (searchIdx !== -1) {
                $.fn.dataTable.ext.search.splice(searchIdx, 1);
                searchIdx = $.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            }
            // If the datatables have been defined for the panes then also destroy these
            if (this.s.dtPane !== undefined) {
                this.s.dtPane.destroy();
            }
            this.s.listSet = false;
        };
        /**
         * Getting the legacy message is a little complex due a legacy parameter
         */
        SearchPane.prototype.emptyMessage = function () {
            var def = this.c.i18n.emptyMessage;
            // Legacy parameter support
            if (this.c.emptyMessage) {
                def = this.c.emptyMessage;
            }
            // Override per column
            if (this.s.colOpts.emptyMessage !== false && this.s.colOpts.emptyMessage !== null) {
                def = this.s.colOpts.emptyMessage;
            }
            return this.s.dt.i18n('searchPanes.emptyMessage', def);
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPane.prototype.getPaneCount = function () {
            return this.s.dtPane !== undefined ?
                this.s.dtPane.rows({ selected: true }).data().toArray().length :
                0;
        };
        /**
         * Rebuilds the panes from the start having deleted the old ones
         *
         * @param? last boolean to indicate if this is the last pane a selection was made in
         * @param? dataIn data to be used in buildPane
         * @param? init Whether this is the initial draw or not
         * @param? maintainSelection Whether the current selections are to be maintained over rebuild
         */
        SearchPane.prototype.rebuildPane = function (last, dataIn, init, maintainSelection) {
            if (last === void 0) { last = false; }
            if (dataIn === void 0) { dataIn = null; }
            if (init === void 0) { init = null; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            this.clearData();
            var selectedRows = [];
            this.s.serverSelect = [];
            var prevEl = null;
            // When rebuilding strip all of the HTML Elements out of the container and start from scratch
            if (this.s.dtPane !== undefined) {
                if (maintainSelection) {
                    if (!this.s.dt.page.info().serverSide) {
                        selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                    else {
                        this.s.serverSelect = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                }
                this.s.dtPane.clear().destroy();
                prevEl = this.dom.container.prev();
                this.destroy();
                this.s.dtPane = undefined;
                $.fn.dataTable.ext.search.push(this.s.searchFunction);
            }
            this.dom.container.removeClass(this.classes.hidden);
            this.s.displayed = false;
            this._buildPane(!this.s.dt.page.info().serverSide ?
                selectedRows :
                this.s.serverSelect, last, dataIn, init, prevEl);
            return this;
        };
        /**
         * removes the pane from the page and sets the displayed property to false.
         */
        SearchPane.prototype.removePane = function () {
            this.s.displayed = false;
            this.dom.container.hide();
        };
        /**
         * Resizes the pane based on the layout that is passed in
         *
         * @param layout the layout to be applied to this pane
         */
        SearchPane.prototype.resize = function (layout) {
            this.c.layout = layout;
            var layVal = parseInt(layout.split('-')[1], 10);
            this.dom.container
                .removeClass()
                .addClass(this.classes.container)
                .addClass(this.classes.layout +
                (layVal < 10 ? layout : layout.split('-')[0] + '-9'))
                .addClass(this.s.colOpts.className)
                .addClass(this.customPaneSettings !== null && this.customPaneSettings.className !== undefined
                ? this.customPaneSettings.className
                : '')
                .addClass(this.classes.show);
            this.adjustTopRow();
        };
        /**
         * Sets the cascadeRegen property of the pane. Accessible from above because as SearchPanes.ts
         * deals with the rebuilds.
         *
         * @param val the boolean value that the cascadeRegen property is to be set to
         */
        SearchPane.prototype.setCascadeRegen = function (val) {
            this.s.cascadeRegen = val;
        };
        /**
         * This function allows the clearing property to be assigned. This is used when implementing cascadePane.
         * In setting this to true for the clearing of the panes selection on the deselects it forces the pane to
         * repopulate from the entire dataset not just the displayed values.
         *
         * @param val the boolean value which the clearing property is to be assigned
         */
        SearchPane.prototype.setClear = function (val) {
            this.s.clearing = val;
        };
        /**
         * Expands the pane from the collapsed state
         */
        SearchPane.prototype.show = function () {
            if (!this.s.displayed) {
                return;
            }
            this.dom.collapseButton.removeClass(this.classes.rotated);
            $(this.s.dtPane.table().container()).removeClass(this.classes.hidden);
            this.dom.topRow.removeClass(this.classes.bordered);
            this.dom.countButton.removeClass(this.classes.disabledButton);
            this.dom.nameButton.removeClass(this.classes.disabledButton);
            this.dom.searchButton.removeClass(this.classes.disabledButton);
        };
        /**
         * Updates the values of all of the panes
         *
         * @param draw whether this has been triggered by a draw event or not
         */
        SearchPane.prototype.updatePane = function (draw) {
            if (draw === void 0) { draw = false; }
            this.s.updating = true;
            this._updateCommon(draw);
            this.s.updating = false;
        };
        /**
         * Updates the panes if one of the options to do so has been set to true
         * rather than the filtered message when using viewTotal.
         */
        SearchPane.prototype.updateTable = function () {
            var selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray();
            this.selections = selectedRows;
            this._searchExtras();
            // If either of the options that effect how the panes are displayed are selected then update the Panes
            if (this.c.cascadePanes || this.c.viewTotal) {
                this.updatePane();
            }
        };
        /**
         * Sets the listeners for the pane.
         *
         * Having it in it's own function makes it easier to only set them once
         */
        SearchPane.prototype._setListeners = function () {
            var _this = this;
            var rowData = this.s.rowData;
            var t0;
            // When an item is selected on the pane, add these to the array which holds selected items.
            // Custom search will perform.
            this.s.dtPane.off('select.dtsp');
            this.s.dtPane.on('select.dtsp', function () {
                clearTimeout(t0);
                if (_this.s.dt.page.info().serverSide && !_this.s.updating) {
                    if (!_this.s.serverSelecting) {
                        _this.s.serverSelect = _this.s.dtPane.rows({ selected: true }).data().toArray();
                        _this.s.scrollTop = $(_this.s.dtPane.table().node()).parent()[0].scrollTop;
                        _this.s.selectPresent = true;
                        _this.s.dt.draw(false);
                    }
                }
                else if (!_this.s.updating) {
                    _this.s.selectPresent = true;
                    _this._makeSelection();
                    _this.s.selectPresent = false;
                }
                _this.dom.clear.removeClass(_this.classes.disabledButton).removeAttr('disabled');
            });
            // When an item is deselected on the pane, re add the currently selected items to the array
            // which holds selected items. Custom search will be performed.
            this.s.dtPane.off('deselect.dtsp');
            this.s.dtPane.on('deselect.dtsp', function () {
                t0 = setTimeout(function () {
                    _this.s.scrollTop = $(_this.s.dtPane.table().node()).parent()[0].scrollTop;
                    if (_this.s.dt.page.info().serverSide && !_this.s.updating) {
                        if (!_this.s.serverSelecting) {
                            _this.s.serverSelect = _this.s.dtPane.rows({ selected: true }).data().toArray();
                            _this.s.deselect = true;
                            _this.s.dt.draw(false);
                        }
                    }
                    else {
                        _this.s.deselect = true;
                        _this._makeSelection();
                        _this.s.deselect = false;
                    }
                    if (_this.s.dtPane.rows({ selected: true }).data().toArray().length === 0) {
                        _this.dom.clear.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                    }
                }, 50);
            });
            // If we attempty to turn off this event then it will ruin behaviour in other panes
            //  so need to make sure that it is only done once
            if (this.s.firstSet) {
                this.s.firstSet = false;
                // When saving the state store all of the selected rows for preselection next time around
                this.s.dt.on('stateSaveParams.dtsp', function (e, settings, data) {
                    // If the data being passed in is empty then state clear must have occured
                    // so clear the panes state as well
                    if ($.isEmptyObject(data)) {
                        _this.s.dtPane.state.clear();
                        return;
                    }
                    var selected = [];
                    var searchTerm;
                    var order;
                    var bins;
                    var arrayFilter;
                    var collapsed;
                    // Get all of the data needed for the state save from the pane
                    if (_this.s.dtPane !== undefined) {
                        selected = _this.s.dtPane
                            .rows({ selected: true })
                            .data()
                            .map(function (item) { return item.filter.toString(); })
                            .toArray();
                        searchTerm = _this.dom.searchBox.val();
                        order = _this.s.dtPane.order();
                        bins = rowData.binsOriginal;
                        arrayFilter = rowData.arrayOriginal;
                        collapsed = _this.dom.collapseButton.hasClass(_this.classes.rotated);
                    }
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    if (data.searchPanes.panes === undefined) {
                        data.searchPanes.panes = [];
                    }
                    for (var i = 0; i < data.searchPanes.panes.length; i++) {
                        if (data.searchPanes.panes[i].id === _this.s.index) {
                            data.searchPanes.panes.splice(i, 1);
                            i--;
                        }
                    }
                    // Add the panes data to the state object
                    data.searchPanes.panes.push({
                        arrayFilter: arrayFilter,
                        bins: bins,
                        collapsed: collapsed,
                        id: _this.s.index,
                        order: order,
                        searchTerm: searchTerm,
                        selected: selected
                    });
                });
            }
            this.s.dtPane.off('user-select.dtsp');
            this.s.dtPane.on('user-select.dtsp', function (e, _dt, type, cell, originalEvent) {
                originalEvent.stopPropagation();
            });
            this.s.dtPane.off('draw.dtsp');
            this.s.dtPane.on('draw.dtsp', function () {
                _this.adjustTopRow();
            });
            // When the button to order by the name of the options is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.nameButton.off('click.dtsp');
            this.dom.nameButton.on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([0, currentOrder === 'asc' ? 'desc' : 'asc']).draw();
                // This state save is required so that the ordering of the panes is maintained
                _this.s.dt.state.save();
            });
            // When the button to order by the number of entries in the column is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.countButton.off('click.dtsp');
            this.dom.countButton.on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([1, currentOrder === 'asc' ? 'desc' : 'asc']).draw();
                // This state save is required so that the ordering of the panes is maintained
                _this.s.dt.state.save();
            });
            // When the button to order by the number of entries in the column is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.collapseButton.off('click.dtsp');
            this.dom.collapseButton.on('click.dtsp', function (e) {
                e.stopPropagation();
                var container = $(_this.s.dtPane.table().container());
                // Toggle the classes
                _this.dom.collapseButton.toggleClass(_this.classes.rotated);
                container.toggleClass(_this.classes.hidden);
                _this.dom.topRow.toggleClass(_this.classes.bordered);
                _this.dom.countButton.toggleClass(_this.classes.disabledButton);
                _this.dom.nameButton.toggleClass(_this.classes.disabledButton);
                _this.dom.searchButton.toggleClass(_this.classes.disabledButton);
                if (container.hasClass(_this.classes.hidden)) {
                    _this.dom.topRow.on('click', function () { return _this.dom.collapseButton.click(); });
                }
                else {
                    _this.dom.topRow.off('click');
                }
                _this.s.dt.state.save();
                return;
            });
            // When the clear button is clicked reset the pane
            this.dom.clear.off('click.dtsp');
            this.dom.clear.on('click.dtsp', function () {
                var searches = _this.dom.container.find('.' + _this.classes.search.replace(/ /g, '.'));
                searches.each(function () {
                    // set the value of the search box to be an empty string and then search on that, effectively reseting
                    $(this).val('');
                    $(this).trigger('input');
                });
                _this.clearPane();
            });
            // When the search button is clicked then draw focus to the search box
            this.dom.searchButton.off('click.dtsp');
            this.dom.searchButton.on('click.dtsp', function () {
                _this.dom.searchBox.focus();
            });
            // When a character is inputted into the searchbox search the pane for matching values.
            // Doing it this way means that no button has to be clicked to trigger a search, it is done asynchronously
            this.dom.searchBox.off('click.dtsp');
            this.dom.searchBox.on('input.dtsp', function () {
                var searchval = _this.dom.searchBox.val();
                _this.s.dtPane.search(searchval).draw();
                if (typeof searchval === 'string' &&
                    (searchval.length > 0 ||
                        searchval.length === 0 && _this.s.dtPane.rows({ selected: true }).data().toArray().length > 0)) {
                    _this.dom.clear.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                }
                else {
                    _this.dom.clear.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                }
                // This state save is required so that the searching on the panes is maintained
                _this.s.dt.state.save();
            });
            return true;
        };
        /**
         * Takes in potentially undetected rows and adds them to the array if they are not yet featured
         *
         * @param filter the filter value of the potential row
         * @param display the display value of the potential row
         * @param sort the sort value of the potential row
         * @param type the type value of the potential row
         * @param arrayFilter the array to be populated
         * @param bins the bins to be populated
         */
        SearchPane.prototype._addOption = function (filter, display, sort, type, arrayFilter, bins) {
            // If the filter is an array then take a note of this, and add the elements to the arrayFilter array
            if (Array.isArray(filter) || filter instanceof dataTable.Api) {
                // Convert to an array so that we can work with it
                if (filter instanceof dataTable.Api) {
                    filter = filter.toArray();
                    display = display.toArray();
                }
                if (filter.length === display.length) {
                    for (var i = 0; i < filter.length; i++) {
                        // If we haven't seen this row before add it
                        if (!bins[filter[i]]) {
                            bins[filter[i]] = 1;
                            arrayFilter.push({
                                display: display[i],
                                filter: filter[i],
                                sort: sort[i],
                                type: type[i]
                            });
                        }
                        // Otherwise just increment the count
                        else {
                            bins[filter[i]]++;
                        }
                        this.s.rowData.totalOptions++;
                    }
                    return;
                }
                else {
                    throw new Error('display and filter not the same length');
                }
            }
            // If the values were affected by othogonal data and are not an array then check if it is already present
            else if (typeof this.s.colOpts.orthogonal === 'string') {
                if (!bins[filter]) {
                    bins[filter] = 1;
                    arrayFilter.push({
                        display: display,
                        filter: filter,
                        sort: sort,
                        type: type
                    });
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                    return;
                }
            }
            // Otherwise we must just be adding an option
            else {
                arrayFilter.push({
                    display: display,
                    filter: filter,
                    sort: sort,
                    type: type
                });
            }
        };
        /**
         * Method to construct the actual pane.
         *
         * @param selectedRows previously selected Rows to be reselected
         * @last boolean to indicate whether this pane was the last one to have a selection made
         */
        SearchPane.prototype._buildPane = function (selectedRows, last, dataIn, init, prevEl) {
            var _this = this;
            if (selectedRows === void 0) { selectedRows = []; }
            if (last === void 0) { last = false; }
            if (dataIn === void 0) { dataIn = null; }
            if (init === void 0) { init = null; }
            if (prevEl === void 0) { prevEl = null; }
            // Aliases
            this.selections = [];
            var table = this.s.dt;
            var column = table.column(this.colExists ? this.s.index : 0);
            var colOpts = this.s.colOpts;
            var rowData = this.s.rowData;
            // Other Variables
            var countMessage = table.i18n('searchPanes.count', this.c.i18n.count);
            var filteredMessage = table.i18n('searchPanes.countFiltered', this.c.i18n.countFiltered);
            var loadedFilter = table.state.loaded();
            // If the listeners have not been set yet then using the latest state may result in funny errors
            if (this.s.listSet) {
                loadedFilter = table.state();
            }
            // If it is not a custom pane in place
            if (this.colExists) {
                var idx = -1;
                if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.panes) {
                    for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                        if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                            idx = i;
                            break;
                        }
                    }
                }
                // Perform checks that do not require populate pane to run
                if ((colOpts.show === false ||
                    colOpts.show !== undefined && colOpts.show !== true) &&
                    idx === -1) {
                    this.dom.container.addClass(this.classes.hidden);
                    this.s.displayed = false;
                    return false;
                }
                else if (colOpts.show === true || idx !== -1) {
                    this.s.displayed = true;
                }
                if (!this.s.dt.page.info().serverSide &&
                    (dataIn === null ||
                        dataIn.searchPanes === null ||
                        dataIn.searchPanes.options === null)) {
                    // Only run populatePane if the data has not been collected yet
                    if (rowData.arrayFilter.length === 0) {
                        this._populatePane(last);
                        this.s.rowData.totalOptions = 0;
                        this._detailsPane();
                        rowData.arrayOriginal = rowData.arrayTotals;
                        rowData.binsOriginal = rowData.binsTotal;
                    }
                    var binLength = Object.keys(rowData.binsOriginal).length;
                    var uniqueRatio = this._uniqueRatio(binLength, table.rows()[0].length);
                    // Don't show the pane if there isn't enough variance in the data, or there is only 1 entry
                    //  for that pane
                    if (this.s.displayed === false &&
                        ((colOpts.show === undefined && colOpts.threshold === null ?
                            uniqueRatio > this.c.threshold :
                            uniqueRatio > colOpts.threshold) ||
                            colOpts.show !== true && binLength <= 1)) {
                        this.dom.container.addClass(this.classes.hidden);
                        this.s.displayed = false;
                        return;
                    }
                    // If the option viewTotal is true then find
                    // the total count for the whole table to display alongside the displayed count
                    if (this.c.viewTotal && rowData.arrayTotals.length === 0) {
                        this.s.rowData.totalOptions = 0;
                        this._detailsPane();
                    }
                    else {
                        rowData.binsTotal = rowData.bins;
                    }
                    this.dom.container.addClass(this.classes.show);
                    this.s.displayed = true;
                }
                else if (dataIn !== null && dataIn.searchPanes !== null && dataIn.searchPanes.options !== null) {
                    if (dataIn.tableLength !== undefined) {
                        this.s.tableLength = dataIn.tableLength;
                        this.s.rowData.totalOptions = this.s.tableLength;
                    }
                    else if (this.s.tableLength === null || table.rows()[0].length > this.s.tableLength) {
                        this.s.tableLength = table.rows()[0].length;
                        this.s.rowData.totalOptions = this.s.tableLength;
                    }
                    var colTitle = table.column(this.s.index).dataSrc();
                    if (dataIn.searchPanes.options[colTitle] !== undefined) {
                        for (var _i = 0, _a = dataIn.searchPanes.options[colTitle]; _i < _a.length; _i++) {
                            var dataPoint = _a[_i];
                            this.s.rowData.arrayFilter.push({
                                display: dataPoint.label,
                                filter: dataPoint.value,
                                sort: dataPoint.label,
                                type: dataPoint.label
                            });
                            this.s.rowData.bins[dataPoint.value] = this.c.viewTotal || this.c.cascadePanes ?
                                dataPoint.count :
                                dataPoint.total;
                            this.s.rowData.binsTotal[dataPoint.value] = dataPoint.total;
                        }
                    }
                    var binLength = Object.keys(rowData.binsTotal).length;
                    var uniqueRatio = this._uniqueRatio(binLength, this.s.tableLength);
                    // Don't show the pane if there isnt enough variance in the data, or there is only 1 entry for that pane
                    if (this.s.displayed === false &&
                        ((colOpts.show === undefined && colOpts.threshold === null ?
                            uniqueRatio > this.c.threshold :
                            uniqueRatio > colOpts.threshold) ||
                            colOpts.show !== true && binLength <= 1)) {
                        this.dom.container.addClass(this.classes.hidden);
                        this.s.displayed = false;
                        return;
                    }
                    this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter;
                    this.s.rowData.binsOriginal = this.s.rowData.bins;
                    this.s.displayed = true;
                }
            }
            else {
                this.s.displayed = true;
            }
            // If the variance is accceptable then display the search pane
            this._displayPane();
            if (!this.s.listSet) {
                // Here, when the state is loaded if the data object on the original table is empty,
                //  then a state.clear() must have occurred, so delete all of the panes tables state objects too.
                this.dom.dtP.on('stateLoadParams.dt', function (e, settings, data) {
                    if ($.isEmptyObject(table.state.loaded())) {
                        $.each(data, function (index, value) {
                            delete data[index];
                        });
                    }
                });
            }
            // Add the container to the document in its original location
            if (prevEl !== null && this.dom.panesContainer.has(prevEl).length > 0) {
                this.dom.container.insertAfter(prevEl);
            }
            else {
                this.dom.panesContainer.prepend(this.dom.container);
            }
            // Declare the datatable for the pane
            var errMode = $.fn.dataTable.ext.errMode;
            $.fn.dataTable.ext.errMode = 'none';
            // eslint-disable-next-line no-extra-parens
            var haveScroller = dataTable.Scroller;
            this.s.dtPane = this.dom.dtP.DataTable($.extend(true, {
                columnDefs: [
                    {
                        className: 'dtsp-nameColumn',
                        data: 'display',
                        render: function (data, type, row) {
                            if (type === 'sort') {
                                return row.sort;
                            }
                            else if (type === 'type') {
                                return row.type;
                            }
                            var message;
                            message =
                                (_this.s.filteringActive || _this.s.showFiltered) && _this.c.viewTotal ||
                                    _this.c.viewTotal && _this.s.forceViewTotal ?
                                    filteredMessage.replace(/{total}/, row.total) :
                                    countMessage.replace(/{total}/, row.total);
                            message = message.replace(/{shown}/, row.shown);
                            while (message.includes('{total}')) {
                                message = message.replace(/{total}/, row.total);
                            }
                            while (message.includes('{shown}')) {
                                message = message.replace(/{shown}/, row.shown);
                            }
                            // We are displaying the count in the same columne as the name of the search option.
                            // This is so that there is not need to call columns.adjust()
                            //  which in turn speeds up the code
                            var pill = '<span class="' + _this.classes.pill + '">' + message + '</span>';
                            if (!_this.c.viewCount || !colOpts.viewCount) {
                                pill = '';
                            }
                            if (type === 'filter') {
                                return typeof data === 'string' && data.match(/<[^>]*>/) !== null ?
                                    data.replace(/<[^>]*>/g, '') :
                                    data;
                            }
                            return '<div class="' + _this.classes.nameCont + '"><span title="' +
                                (typeof data === 'string' && data.match(/<[^>]*>/) !== null ?
                                    data.replace(/<[^>]*>/g, '') :
                                    data) +
                                '" class="' + _this.classes.name + '">' +
                                data + '</span>' +
                                pill + '</div>';
                        },
                        targets: 0,
                        // Accessing the private datatables property to set type based on the original table.
                        // This is null if not defined by the user, meaning that automatic type detection
                        //  would take place
                        type: table.settings()[0].aoColumns[this.s.index] !== undefined ?
                            table.settings()[0].aoColumns[this.s.index]._sManualType :
                            null
                    },
                    {
                        className: 'dtsp-countColumn ' + this.classes.badgePill,
                        data: 'shown',
                        orderData: [1, 2],
                        searchable: false,
                        targets: 1,
                        visible: false
                    },
                    {
                        data: 'total',
                        searchable: false,
                        targets: 2,
                        visible: false
                    }
                ],
                deferRender: true,
                dom: 't',
                info: false,
                language: this.s.dt.settings()[0].oLanguage,
                paging: haveScroller ? true : false,
                scrollX: false,
                scrollY: '200px',
                scroller: haveScroller ? true : false,
                select: true,
                stateSave: table.settings()[0].oFeatures.bStateSave ? true : false
            }, this.c.dtOpts, colOpts !== undefined ? colOpts.dtOpts : {}, this.s.colOpts.options !== undefined || !this.colExists ?
                {
                    createdRow: function (row, data, dataIndex) {
                        $(row).addClass(data.className);
                    }
                } :
                undefined, this.customPaneSettings !== null && this.customPaneSettings.dtOpts !== undefined ?
                this.customPaneSettings.dtOpts :
                {}, $.fn.dataTable.versionCheck('2')
                ? {
                    layout: {
                        bottomLeft: null,
                        bottomRight: null,
                        topLeft: null,
                        topRight: null
                    }
                }
                : {}));
            this.dom.dtP.addClass(this.classes.table);
            // Getting column titles is a little messy
            var headerText = 'Custom Pane';
            if (this.customPaneSettings && this.customPaneSettings.header) {
                headerText = this.customPaneSettings.header;
            }
            else if (colOpts.header) {
                headerText = colOpts.header;
            }
            else if (this.colExists) {
                headerText = $.fn.dataTable.versionCheck('2')
                    ? table.column(this.s.index).title()
                    : table.settings()[0].aoColumns[this.s.index].sTitle;
            }
            this.dom.searchBox.attr('placeholder', headerText);
            // As the pane table is not in the document yet we must initialise select ourselves
            // eslint-disable-next-line no-extra-parens
            $.fn.dataTable.select.init(this.s.dtPane);
            $.fn.dataTable.ext.errMode = errMode;
            // If it is not a custom pane
            if (this.colExists) {
                // On initialisation, do we need to set a filtering value from a
                // saved state or init option?
                var search = column.search();
                search = search ? search.substr(1, search.length - 2).split('|') : [];
                // Count the number of empty cells
                var count_1 = 0;
                rowData.arrayFilter.forEach(function (element) {
                    if (element.filter === '') {
                        count_1++;
                    }
                });
                // Add all of the search options to the pane
                for (var i = 0, ien = rowData.arrayFilter.length; i < ien; i++) {
                    var selected = false;
                    for (var _b = 0, _c = this.s.serverSelect; _b < _c.length; _b++) {
                        var option = _c[_b];
                        if (option.filter === rowData.arrayFilter[i].filter) {
                            selected = true;
                        }
                    }
                    if (this.s.dt.page.info().serverSide &&
                        (!this.c.cascadePanes ||
                            this.c.cascadePanes && rowData.bins[rowData.arrayFilter[i].filter] !== 0 ||
                            this.c.cascadePanes && init !== null ||
                            selected)) {
                        var row = this.addRow(rowData.arrayFilter[i].display, rowData.arrayFilter[i].filter, init ?
                            rowData.binsTotal[rowData.arrayFilter[i].filter] :
                            rowData.bins[rowData.arrayFilter[i].filter], this.c.viewTotal || init
                            ? String(rowData.binsTotal[rowData.arrayFilter[i].filter])
                            : rowData.bins[rowData.arrayFilter[i].filter], rowData.arrayFilter[i].sort, rowData.arrayFilter[i].type);
                        for (var _d = 0, _e = this.s.serverSelect; _d < _e.length; _d++) {
                            var option = _e[_d];
                            if (option.filter === rowData.arrayFilter[i].filter) {
                                this.s.serverSelecting = true;
                                row.select();
                                this.s.serverSelecting = false;
                            }
                        }
                    }
                    else if (!this.s.dt.page.info().serverSide &&
                        rowData.arrayFilter[i] &&
                        (rowData.bins[rowData.arrayFilter[i].filter] !== undefined || !this.c.cascadePanes)) {
                        this.addRow(rowData.arrayFilter[i].display, rowData.arrayFilter[i].filter, rowData.bins[rowData.arrayFilter[i].filter], rowData.binsTotal[rowData.arrayFilter[i].filter], rowData.arrayFilter[i].sort, rowData.arrayFilter[i].type);
                    }
                    else if (!this.s.dt.page.info().serverSide) {
                        // Just pass an empty string as the message will be calculated based on that in addRow()
                        this.addRow('', count_1, count_1, '', '', '');
                    }
                }
            }
            // eslint-disable-next-line no-extra-parens
            dataTable.select.init(this.s.dtPane);
            // If there are custom options set or it is a custom pane then get them
            if (colOpts.options !== undefined ||
                this.customPaneSettings !== null && this.customPaneSettings.options !== undefined) {
                this._getComparisonRows();
            }
            // Display the pane
            this.s.dtPane.draw();
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop;
            this.adjustTopRow();
            if (!this.s.listSet) {
                this._setListeners();
                this.s.listSet = true;
            }
            for (var _f = 0, selectedRows_1 = selectedRows; _f < selectedRows_1.length; _f++) {
                var selection = selectedRows_1[_f];
                if (selection !== undefined) {
                    for (var _g = 0, _h = this.s.dtPane.rows().indexes().toArray(); _g < _h.length; _g++) {
                        var row = _h[_g];
                        if (this.s.dtPane.row(row).data() !== undefined &&
                            selection.filter === this.s.dtPane.row(row).data().filter) {
                            // If this is happening when serverSide processing is happening then
                            //  different behaviour is needed
                            if (this.s.dt.page.info().serverSide) {
                                this.s.serverSelecting = true;
                                this.s.dtPane.row(row).select();
                                this.s.serverSelecting = false;
                            }
                            else {
                                this.s.dtPane.row(row).select();
                            }
                        }
                    }
                }
            }
            //  If SSP and the table is ready, apply the search for the pane
            if (this.s.dt.page.info().serverSide) {
                this.s.dtPane.search(this.dom.searchBox.val()).draw();
            }
            if ((this.c.initCollapsed && this.s.colOpts.initCollapsed !== false ||
                this.s.colOpts.initCollapsed) &&
                (this.c.collapse && this.s.colOpts.collapse !== false ||
                    this.s.colOpts.collapse)) {
                this.collapse();
            }
            // Reload the selection, searchbox entry and ordering from the previous state
            // Need to check here if SSP that this is the first draw, otherwise it will infinite loop
            if (loadedFilter &&
                loadedFilter.searchPanes &&
                loadedFilter.searchPanes.panes &&
                (dataIn === null ||
                    dataIn.draw === 1)) {
                if (!this.c.cascadePanes) {
                    this._reloadSelect(loadedFilter);
                }
                for (var _j = 0, _k = loadedFilter.searchPanes.panes; _j < _k.length; _j++) {
                    var pane = _k[_j];
                    if (pane.id === this.s.index) {
                        // Save some time by only triggering an input if there is a value
                        if (pane.searchTerm && pane.searchTerm.length > 0) {
                            this.dom.searchBox.val(pane.searchTerm);
                            this.dom.searchBox.trigger('input');
                        }
                        this.s.dtPane.order(pane.order).draw();
                        // Is the pane to be hidden or shown?
                        if (pane.collapsed) {
                            this.collapse();
                        }
                        else {
                            this.show();
                        }
                    }
                }
            }
            return true;
        };
        /**
         * Update the array which holds the display and filter values for the table
         */
        SearchPane.prototype._detailsPane = function () {
            var table = this.s.dt;
            this.s.rowData.arrayTotals = [];
            this.s.rowData.binsTotal = {};
            var settings = this.s.dt.settings()[0];
            var indexArray = table.rows().indexes();
            if (!this.s.dt.page.info().serverSide) {
                for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                    var rowIdx = indexArray_1[_i];
                    this._populatePaneArray(rowIdx, this.s.rowData.arrayTotals, settings, this.s.rowData.binsTotal);
                }
            }
        };
        /**
         * Appends all of the HTML elements to their relevant parent Elements
         */
        SearchPane.prototype._displayPane = function () {
            var container = this.dom.container;
            var colOpts = this.s.colOpts;
            var layVal = parseInt(this.c.layout.split('-')[1], 10);
            // Empty everything to start again
            this.dom.topRow.empty();
            this.dom.dtP.empty();
            this.dom.topRow.addClass(this.classes.topRow);
            // If there are more than 3 columns defined then make there be a smaller gap between the panes
            if (layVal > 3) {
                this.dom.container.addClass(this.classes.smallGap);
            }
            this.dom.topRow.addClass(this.classes.subRowsContainer);
            this.dom.upper.appendTo(this.dom.topRow);
            this.dom.lower.appendTo(this.dom.topRow);
            this.dom.searchCont.appendTo(this.dom.upper);
            this.dom.buttonGroup.appendTo(this.dom.lower);
            // If no selections have been made in the pane then disable the clear button
            if (this.c.dtOpts.searching === false ||
                colOpts.dtOpts !== undefined && colOpts.dtOpts.searching === false ||
                (!this.c.controls || !colOpts.controls) ||
                this.customPaneSettings !== null &&
                    this.customPaneSettings.dtOpts !== undefined &&
                    this.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.customPaneSettings.dtOpts.searching) {
                this.dom.searchBox
                    .removeClass(this.classes.paneInputButton)
                    .addClass(this.classes.disabledButton)
                    .attr('disabled', 'true');
            }
            this.dom.searchBox.appendTo(this.dom.searchCont);
            // Create the contents of the searchCont div. Worth noting that this function will change when using semantic ui
            this._searchContSetup();
            // If the clear button is allowed to show then display it
            if (this.c.clear && this.c.controls && colOpts.controls) {
                this.dom.clear.appendTo(this.dom.buttonGroup);
            }
            if (this.c.orderable && colOpts.orderable && this.c.controls && colOpts.controls) {
                this.dom.nameButton.appendTo(this.dom.buttonGroup);
            }
            // If the count column is hidden then don't display the ordering button for it
            if (this.c.viewCount &&
                colOpts.viewCount &&
                this.c.orderable &&
                colOpts.orderable &&
                this.c.controls &&
                colOpts.controls) {
                this.dom.countButton.appendTo(this.dom.buttonGroup);
            }
            if ((this.c.collapse && this.s.colOpts.collapse !== false ||
                this.s.colOpts.collapse) &&
                this.c.controls && colOpts.controls) {
                this.dom.collapseButton.appendTo(this.dom.buttonGroup);
            }
            this.dom.topRow.prependTo(this.dom.container);
            container.append(this.dom.dtP);
            container.show();
        };
        /**
         * Gets the options for the row for the customPanes
         *
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getBonusOptions = function () {
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                orthogonal: {
                    threshold: null
                },
                threshold: null
            };
            return $.extend(true, {}, SearchPane.defaults, defaultMutator, this.c !== undefined ? this.c : {});
        };
        /**
         * Adds the custom options to the pane
         *
         * @returns {Array} Returns the array of rows which have been added to the pane
         */
        SearchPane.prototype._getComparisonRows = function () {
            var colOpts = this.s.colOpts;
            // Find the appropriate options depending on whether this is a pane for a specific column or a custom pane
            var options = colOpts.options !== undefined
                ? colOpts.options
                : this.customPaneSettings !== null && this.customPaneSettings.options !== undefined
                    ? this.customPaneSettings.options
                    : undefined;
            if (options === undefined) {
                return;
            }
            var tableVals = this.s.dt.rows({ search: 'applied' }).data().toArray();
            var appRows = this.s.dt.rows({ search: 'applied' });
            var tableValsTotal = this.s.dt.rows().data().toArray();
            var allRows = this.s.dt.rows();
            var rows = [];
            // Clear all of the other rows from the pane, only custom options are to be displayed when they are defined
            this.s.dtPane.clear();
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var comp = options_1[_i];
                // Initialise the object which is to be placed in the row
                var insert = comp.label !== '' ?
                    comp.label :
                    this.emptyMessage();
                var comparisonObj = {
                    className: comp.className,
                    display: insert,
                    filter: typeof comp.value === 'function' ? comp.value : [],
                    shown: 0,
                    sort: insert,
                    total: 0,
                    type: insert
                };
                // If a custom function is in place
                if (typeof comp.value === 'function') {
                    // Count the number of times the function evaluates to true for the data currently being displayed
                    for (var tVal = 0; tVal < tableVals.length; tVal++) {
                        if (comp.value.call(this.s.dt, tableVals[tVal], appRows[0][tVal])) {
                            comparisonObj.shown++;
                        }
                    }
                    // Count the number of times the function evaluates to true for the original data in the Table
                    for (var i = 0; i < tableValsTotal.length; i++) {
                        if (comp.value.call(this.s.dt, tableValsTotal[i], allRows[0][i])) {
                            comparisonObj.total++;
                        }
                    }
                    // Update the comparisonObj
                    if (typeof comparisonObj.filter !== 'function') {
                        comparisonObj.filter.push(comp.filter);
                    }
                }
                // If cascadePanes is not active or if it is and the comparisonObj should be shown then add it to the pane
                if (!this.c.cascadePanes || this.c.cascadePanes && comparisonObj.shown !== 0) {
                    rows.push(this.addRow(comparisonObj.display, comparisonObj.filter, comparisonObj.shown, comparisonObj.total, comparisonObj.sort, comparisonObj.type, comparisonObj.className));
                }
            }
            return rows;
        };
        /**
         * Gets the options for the row for the customPanes
         *
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getOptions = function () {
            var table = this.s.dt;
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                collapse: null,
                emptyMessage: false,
                initCollapsed: null,
                orthogonal: {
                    threshold: null
                },
                threshold: null
            };
            var columnOptions = table.settings()[0].aoColumns[this.s.index].searchPanes;
            var colOpts = $.extend(true, {}, SearchPane.defaults, defaultMutator, columnOptions);
            if (columnOptions !== undefined &&
                columnOptions.hideCount !== undefined &&
                columnOptions.viewCount === undefined) {
                colOpts.viewCount = !columnOptions.hideCount;
            }
            return colOpts;
        };
        /**
         * This method allows for changes to the panes and table to be made when a selection or a deselection occurs
         *
         * @param select Denotes whether a selection has been made or not
         */
        SearchPane.prototype._makeSelection = function () {
            this.updateTable();
            this.s.updating = true;
            this.s.dt.draw();
            this.s.updating = false;
        };
        /**
         * Fill the array with the values that are currently being displayed in the table
         *
         * @param last boolean to indicate whether this was the last pane a selection was made in
         */
        SearchPane.prototype._populatePane = function (last) {
            if (last === void 0) { last = false; }
            var table = this.s.dt;
            this.s.rowData.arrayFilter = [];
            this.s.rowData.bins = {};
            var settings = this.s.dt.settings()[0];
            // If cascadePanes or viewTotal are active it is necessary to get the data which is currently
            // being displayed for their functionality.
            // Also make sure that this was not the last pane to have a selection made
            if (!this.s.dt.page.info().serverSide) {
                var indexArray = (this.c.cascadePanes || this.c.viewTotal) && (!this.s.clearing && !last) ?
                    table.rows({ search: 'applied' }).indexes() :
                    table.rows().indexes();
                for (var _i = 0, _a = indexArray.toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._populatePaneArray(index, this.s.rowData.arrayFilter, settings);
                }
            }
        };
        /**
         * Populates an array with all of the data for the table
         *
         * @param rowIdx The current row index to be compared
         * @param arrayFilter The array that is to be populated with row Details
         * @param bins The bins object that is to be populated with the row counts
         */
        SearchPane.prototype._populatePaneArray = function (rowIdx, arrayFilter, settings, bins) {
            if (bins === void 0) { bins = this.s.rowData.bins; }
            var colOpts = this.s.colOpts;
            // Retrieve the rendered data from the cell using the fnGetCellData function
            // rather than the cell().render API method for optimisation
            if (typeof colOpts.orthogonal === 'string') {
                var rendered = settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal);
                this.s.rowData.filterMap.set(rowIdx, rendered);
                this._addOption(rendered, rendered, rendered, rendered, arrayFilter, bins);
            }
            else {
                var filter = settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.search);
                // Null and empty string are to be considered the same value
                if (filter === null) {
                    filter = '';
                }
                if (typeof filter === 'string') {
                    filter = filter.replace(/<[^>]*>/g, '');
                }
                this.s.rowData.filterMap.set(rowIdx, filter);
                if (!bins[filter]) {
                    bins[filter] = 1;
                    this._addOption(filter, settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.display), settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.sort), settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.type), arrayFilter, bins);
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                    return;
                }
            }
        };
        /**
         * Reloads all of the previous selects into the panes
         *
         * @param loadedFilter The loaded filters from a previous state
         */
        SearchPane.prototype._reloadSelect = function (loadedFilter) {
            // If the state was not saved don't selected any
            if (loadedFilter === undefined) {
                return;
            }
            var idx;
            // For each pane, check that the loadedFilter list exists and is not null,
            // find the id of each search item and set it to be selected.
            for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                    idx = i;
                    break;
                }
            }
            if (idx !== undefined) {
                var table = this.s.dtPane;
                var rows = table.rows({ order: 'index' }).data().map(function (item) { return item.filter !== null ?
                    item.filter.toString() :
                    null; }).toArray();
                for (var _i = 0, _a = loadedFilter.searchPanes.panes[idx].selected; _i < _a.length; _i++) {
                    var filter = _a[_i];
                    var id = -1;
                    if (filter !== null) {
                        id = rows.indexOf(filter.toString());
                    }
                    if (id > -1) {
                        this.s.serverSelecting = true;
                        table.row(id).select();
                        this.s.serverSelecting = false;
                    }
                }
            }
        };
        /**
         * This method decides whether a row should contribute to the pane or not
         *
         * @param filter the value that the row is to be filtered on
         * @param dataIndex the row index
         */
        SearchPane.prototype._search = function (filter, dataIndex) {
            var colOpts = this.s.colOpts;
            var table = this.s.dt;
            // For each item selected in the pane, check if it is available in the cell
            for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
                var colSelect = _a[_i];
                if (typeof colSelect.filter === 'string' && typeof filter === 'string') {
                    // The filter value will not have the &amp; in place but a &,
                    // so we need to do a replace to make sure that they will match
                    colSelect.filter = colSelect.filter
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"');
                }
                // if the filter is an array then is the column present in it
                if (Array.isArray(filter)) {
                    if (filter.includes(colSelect.filter)) {
                        return true;
                    }
                }
                // if the filter is a function then does it meet the criteria of that function or not
                else if (typeof colSelect.filter === 'function') {
                    if (colSelect.filter.call(table, table.row(dataIndex).data(), dataIndex)) {
                        if (colOpts.combiner === 'or') {
                            return true;
                        }
                    }
                    // If the combiner is an "and" then we need to check against all possible selections
                    // so if it fails here then the and is not met and return false
                    else if (colOpts.combiner === 'and') {
                        return false;
                    }
                }
                // otherwise if the two filter values are equal then return true
                else if (filter === colSelect.filter ||
                    // Loose type checking incase number type in column comparing to a string
                    // eslint-disable-next-line eqeqeq
                    !(typeof filter === 'string' && filter.length === 0) && filter == colSelect.filter ||
                    colSelect.filter === null && typeof filter === 'string' && filter === '') {
                    return true;
                }
            }
            // If the combiner is an and then we need to check against all possible selections
            // so return true here if so because it would have returned false earlier if it had failed
            if (colOpts.combiner === 'and') {
                return true;
            }
            // Otherwise it hasn't matched with anything by this point so it must be false
            else {
                return false;
            }
        };
        /**
         * Creates the contents of the searchCont div
         *
         * NOTE This is overridden when semantic ui styling in order to integrate the search button into the text box.
         */
        SearchPane.prototype._searchContSetup = function () {
            if (this.c.controls && this.s.colOpts.controls) {
                this.dom.searchButton.appendTo(this.dom.searchLabelCont);
            }
            if (!(this.c.dtOpts.searching === false ||
                this.s.colOpts.dtOpts.searching === false ||
                this.customPaneSettings !== null &&
                    this.customPaneSettings.dtOpts !== undefined &&
                    this.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.customPaneSettings.dtOpts.searching)) {
                this.dom.searchLabelCont.appendTo(this.dom.searchCont);
            }
        };
        /**
         * Adds outline to the pane when a selection has been made
         */
        SearchPane.prototype._searchExtras = function () {
            var updating = this.s.updating;
            this.s.updating = true;
            var filters = this.s.dtPane.rows({ selected: true }).data().pluck('filter').toArray();
            var nullIndex = filters.indexOf(this.emptyMessage());
            var container = $(this.s.dtPane.table().container());
            // If null index is found then search for empty cells as a filter.
            if (nullIndex > -1) {
                filters[nullIndex] = '';
            }
            // If a filter has been applied then outline the respective pane, remove it when it no longer is.
            if (filters.length > 0) {
                container.addClass(this.classes.selected);
            }
            else if (filters.length === 0) {
                container.removeClass(this.classes.selected);
            }
            this.s.updating = updating;
        };
        /**
         * Finds the ratio of the number of different options in the table to the number of rows
         *
         * @param bins the number of different options in the table
         * @param rowCount the total number of rows in the table
         * @returns {number} returns the ratio
         */
        SearchPane.prototype._uniqueRatio = function (bins, rowCount) {
            if (rowCount > 0 &&
                (this.s.rowData.totalOptions > 0 && !this.s.dt.page.info().serverSide ||
                    this.s.dt.page.info().serverSide && this.s.tableLength > 0)) {
                return bins / this.s.rowData.totalOptions;
            }
            else {
                return 1;
            }
        };
        /**
         * updates the options within the pane
         *
         * @param draw a flag to define whether this has been called due to a draw event or not
         */
        SearchPane.prototype._updateCommon = function (draw) {
            if (draw === void 0) { draw = false; }
            // Update the panes if doing a deselect. if doing a select then
            // update all of the panes except for the one causing the change
            if (!this.s.dt.page.info().serverSide &&
                this.s.dtPane !== undefined &&
                (!this.s.filteringActive || this.c.cascadePanes || draw === true) &&
                (this.c.cascadePanes !== true || this.s.selectPresent !== true) &&
                (!this.s.lastSelect || !this.s.lastCascade)) {
                var colOpts = this.s.colOpts;
                var selected = this.s.dtPane.rows({ selected: true }).data().toArray();
                var rowData = this.s.rowData;
                // Clear the pane in preparation for adding the updated search options
                this.s.dtPane.clear();
                // If it is not a custom pane
                if (this.colExists) {
                    // Only run populatePane if the data has not been collected yet
                    if (rowData.arrayFilter.length === 0) {
                        this._populatePane(!this.s.filteringActive);
                    }
                    // If cascadePanes is active and the table has returned to its default state then
                    // there is a need to update certain parts ofthe rowData.
                    else if (this.c.cascadePanes &&
                        this.s.dt.rows().data().toArray().length ===
                            this.s.dt.rows({ search: 'applied' }).data().toArray().length) {
                        rowData.arrayFilter = rowData.arrayOriginal;
                        rowData.bins = rowData.binsOriginal;
                    }
                    // Otherwise if viewTotal or cascadePanes is active then the data from the table must be read.
                    else if (this.c.viewTotal || this.c.cascadePanes) {
                        this._populatePane(!this.s.filteringActive);
                    }
                    // If the viewTotal option is selected then find the totals for the table
                    if (this.c.viewTotal) {
                        this._detailsPane();
                    }
                    else {
                        rowData.binsTotal = rowData.bins;
                    }
                    if (this.c.viewTotal && !this.c.cascadePanes) {
                        rowData.arrayFilter = rowData.arrayTotals;
                    }
                    var _loop_1 = function (dataP) {
                        // If both view Total and cascadePanes have been selected and the count of the row
                        // is not 0 then add it to pane
                        // Do this also if the viewTotal option has been selected and cascadePanes has not
                        if (dataP &&
                            (rowData.bins[dataP.filter] !== undefined &&
                                rowData.bins[dataP.filter] !== 0 &&
                                this_1.c.cascadePanes ||
                                !this_1.c.cascadePanes ||
                                this_1.s.clearing)) {
                            var row = this_1.addRow(dataP.display, dataP.filter, !this_1.c.viewTotal ?
                                rowData.bins[dataP.filter] :
                                rowData.bins[dataP.filter] !== undefined ?
                                    rowData.bins[dataP.filter] :
                                    0, this_1.c.viewTotal ?
                                String(rowData.binsTotal[dataP.filter]) :
                                rowData.bins[dataP.filter], dataP.sort, dataP.type);
                            // Find out if the filter was selected in the previous search,
                            // if so select it and remove from array.
                            var selectIndex = selected.findIndex(function (element) {
                                return element.filter === dataP.filter;
                            });
                            if (selectIndex !== -1) {
                                row.select();
                                selected.splice(selectIndex, 1);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, _a = rowData.arrayFilter; _i < _a.length; _i++) {
                        var dataP = _a[_i];
                        _loop_1(dataP);
                    }
                }
                if (colOpts.searchPanes !== undefined && colOpts.searchPanes.options !== undefined ||
                    colOpts.options !== undefined ||
                    this.customPaneSettings !== null && this.customPaneSettings.options !== undefined) {
                    var rows = this._getComparisonRows();
                    var _loop_2 = function (row) {
                        var selectIndex = selected.findIndex(function (element) {
                            if (element.display === row.data().display) {
                                return true;
                            }
                        });
                        if (selectIndex !== -1) {
                            row.select();
                            selected.splice(selectIndex, 1);
                        }
                    };
                    for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
                        var row = rows_1[_b];
                        _loop_2(row);
                    }
                }
                // Add search options which were previously selected but whos results are no
                // longer present in the resulting data set.
                for (var _c = 0, selected_1 = selected; _c < selected_1.length; _c++) {
                    var selectedEl = selected_1[_c];
                    var row = this.addRow(selectedEl.display, selectedEl.filter, 0, this.c.viewTotal
                        ? selectedEl.total
                        : 0, selectedEl.display, selectedEl.display);
                    this.s.updating = true;
                    row.select();
                    this.s.updating = false;
                }
                this.s.dtPane.draw();
                this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop;
            }
        };
        SearchPane.version = '1.3.0';
        SearchPane.classes = {
            bordered: 'dtsp-bordered',
            buttonGroup: 'dtsp-buttonGroup',
            buttonSub: 'dtsp-buttonSub',
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            clearButton: 'clearButton',
            collapseAll: 'dtsp-collapseAll',
            collapseButton: 'dtsp-collapseButton',
            container: 'dtsp-searchPane',
            countButton: 'dtsp-countButton',
            disabledButton: 'dtsp-disabledButton',
            hidden: 'dtsp-hidden',
            hide: 'dtsp-hide',
            layout: 'dtsp-',
            name: 'dtsp-name',
            nameButton: 'dtsp-nameButton',
            nameCont: 'dtsp-nameCont',
            narrow: 'dtsp-narrow',
            paneButton: 'dtsp-paneButton',
            paneInputButton: 'dtsp-paneInputButton',
            pill: 'dtsp-pill',
            rotated: 'dtsp-rotated',
            search: 'dtsp-search',
            searchCont: 'dtsp-searchCont',
            searchIcon: 'dtsp-searchIcon',
            searchLabelCont: 'dtsp-searchButtonCont',
            selected: 'dtsp-selected',
            smallGap: 'dtsp-smallGap',
            subRow1: 'dtsp-subRow1',
            subRow2: 'dtsp-subRow2',
            subRowsContainer: 'dtsp-subRowsContainer',
            title: 'dtsp-title',
            topRow: 'dtsp-topRow'
        };
        // Define SearchPanes default options
        SearchPane.defaults = {
            cascadePanes: false,
            clear: true,
            collapse: true,
            combiner: 'or',
            container: function (dt) {
                return dt.table().container();
            },
            controls: true,
            dtOpts: {},
            emptyMessage: null,
            hideCount: false,
            i18n: {
                clearPane: '&times;',
                count: '{total}',
                countFiltered: '{shown} ({total})',
                emptyMessage: '<em>No data</em>'
            },
            initCollapsed: false,
            layout: 'auto',
            name: undefined,
            orderable: true,
            orthogonal: {
                display: 'display',
                filter: 'filter',
                hideCount: false,
                search: 'filter',
                show: undefined,
                sort: 'sort',
                threshold: 0.6,
                type: 'type',
                viewCount: true
            },
            preSelect: [],
            threshold: 0.6,
            viewCount: true,
            viewTotal: false
        };
        return SearchPane;
    }());

    var $$1;
    var dataTable$1;
    function setJQuery$1(jq) {
        $$1 = jq;
        dataTable$1 = jq.fn.dataTable;
    }
    var SearchPanes = /** @class */ (function () {
        function SearchPanes(paneSettings, opts, fromInit) {
            var _this = this;
            if (fromInit === void 0) { fromInit = false; }
            this.regenerating = false;
            // Check that the required version of DataTables is included
            if (!dataTable$1 || !dataTable$1.versionCheck || !dataTable$1.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            // eslint-disable-next-line no-extra-parens
            if (!dataTable$1.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new dataTable$1.Api(paneSettings);
            this.classes = $$1.extend(true, {}, SearchPanes.classes);
            // Get options from user
            this.c = $$1.extend(true, {}, SearchPanes.defaults, opts);
            // Add extra elements to DOM object including clear
            this.dom = {
                clearAll: $$1('<button type="button">Clear All</button>').addClass(this.classes.clearAll),
                collapseAll: $$1('<button type="button">Collapse All</button>').addClass(this.classes.collapseAll),
                container: $$1('<div/>').addClass(this.classes.panes).text(table.i18n('searchPanes.loadMessage', this.c.i18n.loadMessage)),
                emptyMessage: $$1('<div/>').addClass(this.classes.emptyMessage),
                options: $$1('<div/>').addClass(this.classes.container),
                panes: $$1('<div/>').addClass(this.classes.container),
                showAll: $$1('<button type="button">Show All</button>')
                    .addClass(this.classes.showAll)
                    .addClass(this.classes.disabledButton)
                    .attr('disabled', 'true'),
                title: $$1('<div/>').addClass(this.classes.title),
                titleRow: $$1('<div/>').addClass(this.classes.titleRow),
                wrapper: $$1('<div/>')
            };
            this.s = {
                colOpts: [],
                dt: table,
                filterCount: 0,
                filterPane: -1,
                page: 0,
                paging: false,
                panes: [],
                selectionList: [],
                serverData: {},
                stateRead: false,
                updating: false
            };
            if (table.settings()[0]._searchPanes !== undefined) {
                return;
            }
            this._getState();
            if (this.s.dt.page.info().serverSide) {
                table.on('preXhr.dt', function (e, settings, data) {
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    if (data.searchPanes_null === undefined) {
                        data.searchPanes_null = {};
                    }
                    for (var _i = 0, _a = _this.s.selectionList; _i < _a.length; _i++) {
                        var selection = _a[_i];
                        var src = _this.s.dt.column(selection.index).dataSrc();
                        if (data.searchPanes[src] === undefined) {
                            data.searchPanes[src] = {};
                        }
                        if (data.searchPanes_null[src] === undefined) {
                            data.searchPanes_null[src] = {};
                        }
                        for (var i = 0; i < selection.rows.length; i++) {
                            data.searchPanes[src][i] = selection.rows[i].filter;
                            if (data.searchPanes[src][i] === null) {
                                data.searchPanes_null[src][i] = true;
                            }
                        }
                    }
                });
            }
            // We are using the xhr event to rebuild the panes if required due to viewTotal being enabled
            // If viewTotal is not enabled then we simply update the data from the server
            table.on('xhr', function (e, settings, json, xhr) {
                if (json && json.searchPanes && json.searchPanes.options) {
                    _this.s.serverData = json;
                    _this.s.serverData.tableLength = json.recordsTotal;
                    _this._serverTotals();
                }
            });
            table.settings()[0]._searchPanes = this;
            this.dom.clearAll.text(table.i18n('searchPanes.clearMessage', this.c.i18n.clearMessage));
            this.dom.collapseAll.text(table.i18n('searchPanes.collapseMessage', this.c.i18n.collapseMessage));
            this.dom.showAll.text(table.i18n('searchPanes.showMessage', this.c.i18n.showMessage));
            if (this.s.dt.settings()[0]._bInitComplete || fromInit) {
                this._paneDeclare(table, paneSettings, opts);
            }
            else {
                table.one('preInit.dt', function (settings) {
                    _this._paneDeclare(table, paneSettings, opts);
                });
            }
            return this;
        }
        /**
         * Clear the selections of all of the panes
         */
        SearchPanes.prototype.clearSelections = function () {
            // Load in all of the searchBoxes in the documents
            var searches = this.dom.container.find('.' + this.classes.search.replace(/\s+/g, '.'));
            // For each searchBox set the input text to be empty and then trigger
            // an input on them so that they no longer filter the panes
            searches.each(function () {
                $$1(this).val('');
                $$1(this).trigger('input');
            });
            var returnArray = [];
            // Clear the selectionList to prevent cascadePanes from reselecting rows
            this.s.selectionList = [];
            // For every pane, clear the selections in the pane
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    returnArray.push(pane.clearPane());
                }
            }
            return returnArray;
        };
        /**
         * returns the container node for the searchPanes
         */
        SearchPanes.prototype.getNode = function () {
            return this.dom.container;
        };
        /**
         * rebuilds all of the panes
         */
        SearchPanes.prototype.rebuild = function (targetIdx, maintainSelection) {
            if (targetIdx === void 0) { targetIdx = false; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            this.dom.emptyMessage.remove();
            // As a rebuild from scratch is required, empty the searchpanes container.
            var returnArray = [];
            // Rebuild each pane individually, if a specific pane has been selected then only rebuild that one
            if (targetIdx === false) {
                this.dom.panes.empty();
            }
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (targetIdx !== false && pane.s.index !== targetIdx) {
                    continue;
                }
                pane.clearData();
                returnArray.push(
                // Pass a boolean to say whether this is the last choice made for maintaining selections when rebuilding
                pane.rebuildPane(this.s.selectionList[this.s.selectionList.length - 1] !== undefined ?
                    pane.s.index === this.s.selectionList[this.s.selectionList.length - 1].index :
                    false, this.s.dt.page.info().serverSide ?
                    this.s.serverData :
                    undefined, null, maintainSelection));
                this.dom.panes.append(pane.dom.container);
            }
            if (this.c.cascadePanes || this.c.viewTotal) {
                this.redrawPanes(true);
            }
            else {
                this._updateSelection();
            }
            // Attach panes, clear buttons, and title bar to the document
            this._updateFilterCount();
            this._attachPaneContainer();
            // If the selections are to be maintained, then it is safe to assume that paging is also to be maintained
            // Otherwise, the paging should be reset
            this.s.dt.draw(!maintainSelection);
            // Resize the panes incase there has been a change
            this.resizePanes();
            // If a single pane has been rebuilt then return only that pane
            if (returnArray.length === 1) {
                return returnArray[0];
            }
            // Otherwise return all of the panes that have been rebuilt
            else {
                return returnArray;
            }
        };
        /**
         * Redraws all of the panes
         */
        SearchPanes.prototype.redrawPanes = function (rebuild) {
            if (rebuild === void 0) { rebuild = false; }
            var table = this.s.dt;
            // Only do this if the redraw isn't being triggered by the panes updating themselves
            if (!this.s.updating && !this.s.dt.page.info().serverSide) {
                var filterActive = true;
                var filterPane = this.s.filterPane;
                var selectTotal = null;
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    if (pane.s.dtPane !== undefined) {
                        selectTotal += pane.s.dtPane.rows({ selected: true }).data().toArray().length;
                    }
                }
                // If the number of rows currently visible is equal to the number of rows in the table
                // then there can't be any filtering taking place
                if (selectTotal === 0 &&
                    table.rows({ search: 'applied' }).data().toArray().length === table.rows().data().toArray().length) {
                    filterActive = false;
                }
                // Otherwise if viewTotal is active then it is necessary to determine which panes a select is present in.
                // If there is only one pane with a selection present then it should not show the filtered message as
                // more selections may be made in that pane.
                else if (this.c.viewTotal) {
                    for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                        var pane = _c[_b];
                        if (pane.s.dtPane !== undefined) {
                            var selectLength = pane.s.dtPane.rows({ selected: true }).data().toArray().length;
                            if (selectLength === 0) {
                                for (var _d = 0, _e = this.s.selectionList; _d < _e.length; _d++) {
                                    var selection = _e[_d];
                                    if (selection.index === pane.s.index && selection.rows.length !== 0) {
                                        selectLength = selection.rows.length;
                                    }
                                }
                            }
                            // If filterPane === -1 then a pane with a selection has not been found yet,
                            // so set filterPane to that panes index
                            if (selectLength > 0 && filterPane === -1) {
                                filterPane = pane.s.index;
                            }
                            // Then if another pane is found with a selection then set filterPane to null to
                            // show that multiple panes have selections present
                            else if (selectLength > 0) {
                                filterPane = null;
                            }
                        }
                    }
                    // If the searchbox is in place and filtering is applied then need to cascade down anyway
                    if (selectTotal === 0) {
                        filterPane = null;
                    }
                }
                var deselectIdx = void 0;
                var newSelectionList = [];
                // Don't run this if it is due to the panes regenerating
                if (!this.regenerating) {
                    for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                        var pane = _g[_f];
                        // Identify the pane where a selection or deselection has been made and add it to the list.
                        if (pane.s.selectPresent) {
                            this.s.selectionList.push({
                                index: pane.s.index,
                                protect: false,
                                rows: pane.s.dtPane.rows({ selected: true }).data().toArray()
                            });
                            break;
                        }
                        else if (pane.s.deselect) {
                            deselectIdx = pane.s.index;
                            var selectedData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                            if (selectedData.length > 0) {
                                this.s.selectionList.push({
                                    index: pane.s.index,
                                    protect: true,
                                    rows: selectedData
                                });
                            }
                        }
                    }
                    if (this.s.selectionList.length > 0) {
                        var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                        for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                            var pane = _j[_h];
                            pane.s.lastSelect = pane.s.index === last;
                        }
                    }
                    // Remove selections from the list from the pane where a deselect has taken place
                    for (var i = 0; i < this.s.selectionList.length; i++) {
                        if (this.s.selectionList[i].index !== deselectIdx || this.s.selectionList[i].protect === true) {
                            var further = false;
                            // Find out if this selection is the last one in the list for that pane
                            for (var j = i + 1; j < this.s.selectionList.length; j++) {
                                if (this.s.selectionList[j].index === this.s.selectionList[i].index) {
                                    further = true;
                                }
                            }
                            // If there are no selections for this pane in the list then just push this one
                            if (!further) {
                                newSelectionList.push(this.s.selectionList[i]);
                                this.s.selectionList[i].protect = false;
                            }
                        }
                    }
                    var solePane = -1;
                    if (newSelectionList.length === 1 && selectTotal !== null && selectTotal !== 0) {
                        solePane = newSelectionList[0].index;
                    }
                    // Update all of the panes to reflect the current state of the filters
                    for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                        var pane = _l[_k];
                        if (pane.s.dtPane !== undefined) {
                            var tempFilter = true;
                            pane.s.filteringActive = true;
                            if (filterPane !== -1 && filterPane !== null && filterPane === pane.s.index ||
                                filterActive === false ||
                                pane.s.index === solePane) {
                                tempFilter = false;
                                pane.s.filteringActive = false;
                            }
                            pane.updatePane(!tempFilter ? false : filterActive);
                        }
                    }
                    // If the length of the selections are different then some of them have been
                    // removed and a deselect has occured
                    if (newSelectionList.length > 0 && (newSelectionList.length < this.s.selectionList.length || rebuild)) {
                        this._cascadeRegen(newSelectionList, selectTotal);
                        var last = newSelectionList[newSelectionList.length - 1].index;
                        for (var _m = 0, _o = this.s.panes; _m < _o.length; _m++) {
                            var pane = _o[_m];
                            pane.s.lastSelect = pane.s.index === last;
                        }
                    }
                    else if (newSelectionList.length > 0) {
                        // Update all of the other panes as you would just making a normal selection
                        for (var _p = 0, _q = this.s.panes; _p < _q.length; _p++) {
                            var paneUpdate = _q[_p];
                            if (paneUpdate.s.dtPane !== undefined) {
                                var tempFilter = true;
                                paneUpdate.s.filteringActive = true;
                                if (filterPane !== -1 && filterPane !== null && filterPane === paneUpdate.s.index ||
                                    filterActive === false ||
                                    paneUpdate.s.index === solePane) {
                                    tempFilter = false;
                                    paneUpdate.s.filteringActive = false;
                                }
                                paneUpdate.updatePane(!tempFilter ? tempFilter : filterActive);
                            }
                        }
                    }
                    // Update the label that shows how many filters are in place
                    this._updateFilterCount();
                }
                else {
                    var solePane = -1;
                    if (newSelectionList.length === 1 && selectTotal !== null && selectTotal !== 0) {
                        solePane = newSelectionList[0].index;
                    }
                    for (var _r = 0, _s = this.s.panes; _r < _s.length; _r++) {
                        var pane = _s[_r];
                        if (pane.s.dtPane !== undefined) {
                            var tempFilter = true;
                            pane.s.filteringActive = true;
                            if (filterPane !== -1 && filterPane !== null && filterPane === pane.s.index ||
                                filterActive === false ||
                                pane.s.index === solePane) {
                                tempFilter = false;
                                pane.s.filteringActive = false;
                            }
                            pane.updatePane(!tempFilter ? tempFilter : filterActive);
                        }
                    }
                    // Update the label that shows how many filters are in place
                    this._updateFilterCount();
                }
                if (!filterActive || selectTotal === 0) {
                    this.s.selectionList = [];
                }
            }
        };
        /**
         * Resizes all of the panes
         */
        SearchPanes.prototype.resizePanes = function () {
            if (this.c.layout === 'auto') {
                var contWidth = $$1(this.s.dt.searchPanes.container()).width();
                var target = Math.floor(contWidth / 260.0); // The neatest number of panes per row
                var highest = 1;
                var highestmod = 0;
                var dispIndex = [];
                // Get the indexes of all of the displayed panes
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    if (pane.s.displayed) {
                        dispIndex.push(pane.s.index);
                    }
                }
                var displayCount = dispIndex.length;
                // If the neatest number is the number we have then use this.
                if (target === displayCount) {
                    highest = target;
                }
                else {
                    // Go from the target down and find the value with the most panes left over, this will be the best fit
                    for (var ppr = target; ppr > 1; ppr--) {
                        var rem = displayCount % ppr;
                        if (rem === 0) {
                            highest = ppr;
                            highestmod = 0;
                            break;
                        }
                        // If there are more left over at this amount of panes per row (ppr)
                        // then it fits better so new values
                        else if (rem > highestmod) {
                            highest = ppr;
                            highestmod = rem;
                        }
                    }
                }
                // If there is a perfect fit then none are to be wider
                var widerIndexes = highestmod !== 0 ? dispIndex.slice(dispIndex.length - highestmod, dispIndex.length) : [];
                for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                    var pane = _c[_b];
                    // Resize the pane with the new layout
                    if (pane.s.displayed) {
                        var layout = 'columns-' + (!widerIndexes.includes(pane.s.index) ? highest : highestmod);
                        pane.resize(layout);
                    }
                }
            }
            else {
                for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                    var pane = _e[_d];
                    pane.adjustTopRow();
                }
            }
            return this;
        };
        /**
         * Attach the panes, buttons and title to the document
         */
        SearchPanes.prototype._attach = function () {
            var _this = this;
            this.dom.container.removeClass(this.classes.hide);
            this.dom.titleRow.removeClass(this.classes.hide);
            this.dom.titleRow.remove();
            this.dom.title.appendTo(this.dom.titleRow);
            // If the clear button is permitted attach it
            if (this.c.clear) {
                this.dom.clearAll.appendTo(this.dom.titleRow);
                this.dom.clearAll.on('click.dtsps', function () {
                    _this.clearSelections();
                });
            }
            if (this.c.collapse) {
                this._setCollapseListener();
            }
            this.dom.titleRow.appendTo(this.dom.container);
            // Attach the container for each individual pane to the overall container
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.dom.container.appendTo(this.dom.panes);
            }
            // Attach everything to the document
            this.dom.panes.appendTo(this.dom.container);
            if ($$1('div.' + this.classes.container).length === 0) {
                this.dom.container.prependTo(this.s.dt);
            }
            return this.dom.container;
        };
        /**
         * Attach the top row containing the filter count and clear all button
         */
        SearchPanes.prototype._attachExtras = function () {
            this.dom.container.removeClass(this.classes.hide);
            this.dom.titleRow.removeClass(this.classes.hide);
            this.dom.titleRow.remove();
            this.dom.title.appendTo(this.dom.titleRow);
            // If the clear button is permitted attach it
            if (this.c.clear) {
                this.dom.clearAll.appendTo(this.dom.titleRow);
            }
            // If collapsing is permitted attach those buttons
            if (this.c.collapse) {
                this.dom.showAll.appendTo(this.dom.titleRow);
                this.dom.collapseAll.appendTo(this.dom.titleRow);
            }
            this.dom.titleRow.appendTo(this.dom.container);
            return this.dom.container;
        };
        /**
         * If there are no panes to display then this method is called to either
         * display a message in their place or hide them completely.
         */
        SearchPanes.prototype._attachMessage = function () {
            // Create a message to display on the screen
            var message;
            try {
                message = this.s.dt.i18n('searchPanes.emptyPanes', this.c.i18n.emptyPanes);
            }
            catch (error) {
                message = null;
            }
            // If the message is an empty string then searchPanes.emptyPanes is undefined,
            // therefore the pane container should be removed from the display
            if (message === null) {
                this.dom.container.addClass(this.classes.hide);
                this.dom.titleRow.removeClass(this.classes.hide);
                return;
            }
            else {
                this.dom.container.removeClass(this.classes.hide);
                this.dom.titleRow.addClass(this.classes.hide);
            }
            // Otherwise display the message
            this.dom.emptyMessage.text(message);
            this.dom.emptyMessage.appendTo(this.dom.container);
            return this.dom.container;
        };
        /**
         * Attaches the panes to the document and displays a message or hides if there are none
         */
        SearchPanes.prototype._attachPaneContainer = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    return this._attach();
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            return this._attachMessage();
        };
        /**
         * Prepares the panes for selections to be made when cascade is active and a deselect has occured
         *
         * @param newSelectionList the list of selections which are to be made
         */
        SearchPanes.prototype._cascadeRegen = function (newSelectionList, selectTotal) {
            // Set this to true so that the actions taken do not cause this to run until it is finished
            this.regenerating = true;
            // If only one pane has been selected then take note of its index
            var solePane = -1;
            if (newSelectionList.length === 1 && selectTotal !== null && selectTotal !== 0) {
                solePane = newSelectionList[0].index;
            }
            // Let the pane know that a cascadeRegen is taking place to avoid unexpected behaviour
            // and clear all of the previous selections in the pane
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.setCascadeRegen(true);
                pane.setClear(true);
                // If this is the same as the pane with the only selection then pass it as a parameter into clearPane
                if (pane.s.dtPane !== undefined && pane.s.index === solePane || pane.s.dtPane !== undefined) {
                    pane.clearPane();
                }
                pane.setClear(false);
            }
            // Rebin panes
            this.s.dt.draw();
            // While all of the selections have been removed, check the table lengths
            // If they are different, another filter is in place and we need to force viewTotal to be used
            var noSelectionsTableLength = this.s.dt.rows({ search: 'applied' }).data().toArray().length;
            var tableLength = this.s.dt.rows().data().toArray().length;
            if (tableLength !== noSelectionsTableLength) {
                for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                    var pane = _c[_b];
                    pane.s.forceViewTotal = true;
                }
            }
            for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                var pane = _e[_d];
                pane.updatePane(true);
            }
            // Remake Selections
            this._makeCascadeSelections(newSelectionList);
            // Set the selection list property to be the list without the selections from the deselect pane
            this.s.selectionList = newSelectionList;
            // The regeneration of selections is over so set it back to false
            for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                var pane = _g[_f];
                pane.setCascadeRegen(false);
            }
            this.regenerating = false;
            // ViewTotal has already been forced at this point so can cancel that for future
            if (tableLength !== noSelectionsTableLength) {
                for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                    var pane = _j[_h];
                    pane.s.forceViewTotal = false;
                }
            }
        };
        /**
         * Attaches the message to the document but does not add any panes
         */
        SearchPanes.prototype._checkMessage = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    // Ensure that the empty message is removed if a pane is displayed
                    this.dom.emptyMessage.remove();
                    this.dom.titleRow.removeClass(this.classes.hide);
                    return;
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            return this._attachMessage();
        };
        /**
         * Checks which panes are collapsed and then performs relevant actions to the collapse/show all buttons
         *
         * @param pane The pane to be checked
         */
        SearchPanes.prototype._checkCollapse = function () {
            var disableClose = true;
            var disableShow = true;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed) {
                    // It the pane is not collapsed
                    if (!pane.dom.collapseButton.hasClass(pane.classes.rotated)) {
                        // Enable the collapse all button
                        this.dom.collapseAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
                        disableClose = false;
                    }
                    else {
                        // Otherwise enable the show all button
                        this.dom.showAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
                        disableShow = false;
                    }
                }
            }
            // If this flag is still true, no panes are open so the close button should be disabled
            if (disableClose) {
                this.dom.collapseAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
            // If this flag is still true, no panes are closed so the show button should be disabled
            if (disableShow) {
                this.dom.showAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
        };
        /**
         * Collapses all of the panes
         */
        SearchPanes.prototype._collapseAll = function () {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.collapse();
            }
        };
        /**
         * Gets the selection list from the previous state and stores it in the selectionList Property
         */
        SearchPanes.prototype._getState = function () {
            var loadedFilter = this.s.dt.state.loaded();
            if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.selectionList !== undefined) {
                this.s.selectionList = loadedFilter.searchPanes.selectionList;
            }
        };
        /**
         * Makes all of the selections when cascade is active
         *
         * @param newSelectionList the list of selections to be made, in the order they were originally selected
         */
        SearchPanes.prototype._makeCascadeSelections = function (newSelectionList) {
            // make selections in the order they were made previously,
            // excluding those from the pane where a deselect was made
            for (var i = 0; i < newSelectionList.length; i++) {
                var _loop_1 = function (pane) {
                    if (pane.s.index === newSelectionList[i].index && pane.s.dtPane !== undefined) {
                        // When regenerating the cascade selections we need this flag so that
                        // the panes are only ignored if it
                        // is the last selection and the pane for that selection
                        if (i === newSelectionList.length - 1) {
                            pane.s.lastCascade = true;
                        }
                        // if there are any selections currently in the pane then
                        // deselect them as we are about to make our new selections
                        if (pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0 && pane.s.dtPane !== undefined) {
                            pane.setClear(true);
                            pane.clearPane();
                            pane.setClear(false);
                        }
                        var _loop_2 = function (row) {
                            var found = false;
                            pane.s.dtPane.rows().every(function (rowIdx) {
                                if (pane.s.dtPane.row(rowIdx).data() !== undefined &&
                                    row !== undefined &&
                                    pane.s.dtPane.row(rowIdx).data().filter === row.filter) {
                                    found = true;
                                    pane.s.dtPane.row(rowIdx).select();
                                }
                            });
                            if (!found) {
                                var newRow = pane.addRow(row.display, row.filter, 0, row.total, row.sort, row.type, row.className);
                                newRow.select();
                            }
                        };
                        // select every row in the pane that was selected previously
                        for (var _i = 0, _a = newSelectionList[i].rows; _i < _a.length; _i++) {
                            var row = _a[_i];
                            _loop_2(row);
                        }
                        pane.s.scrollTop = $$1(pane.s.dtPane.table().node()).parent()[0].scrollTop;
                        pane.s.dtPane.draw();
                        pane.s.dtPane.table().node().parentNode.scrollTop = pane.s.scrollTop;
                        pane.s.lastCascade = false;
                    }
                };
                // As the selections may have been made across the panes
                // in a different order to the pane index we must identify
                // which pane has the index of the selection. This is also important for colreorder etc
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    _loop_1(pane);
                }
            }
        };
        /**
         * Declares the instances of individual searchpanes dependant on the number of columns.
         * It is necessary to run this once preInit has completed otherwise no panes will be
         * created as the column count will be 0.
         *
         * @param table the DataTable api for the parent table
         * @param paneSettings the settings passed into the constructor
         * @param opts the options passed into the constructor
         */
        SearchPanes.prototype._paneDeclare = function (table, paneSettings, opts) {
            var _this = this;
            // Create Panes
            table
                .columns(this.c.columns.length > 0 ? this.c.columns : undefined)
                .eq(0)
                .each(function (idx) {
                _this.s.panes.push(new SearchPane(paneSettings, opts, idx, _this.c.layout, _this.dom.panes));
            });
            // If there is any extra custom panes defined then create panes for them too
            var rowLength = table.columns().eq(0).toArray().length;
            var paneLength = this.c.panes.length;
            for (var i = 0; i < paneLength; i++) {
                var id = rowLength + i;
                this.s.panes.push(new SearchPane(paneSettings, opts, id, this.c.layout, this.dom.panes, this.c.panes[i]));
            }
            // If a custom ordering is being used
            if (this.c.order.length > 0) {
                // Make a new Array of panes based upon the order
                var newPanes = this.c.order.map(function (name, index, values) { return _this._findPane(name); });
                // Remove the old panes from the dom
                this.dom.panes.empty();
                this.s.panes = newPanes;
                // Append the panes in the correct order
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    this.dom.panes.append(pane.dom.container);
                }
            }
            // If this internal property is true then the DataTable has been initialised already
            if (this.s.dt.settings()[0]._bInitComplete) {
                this._startup(table);
            }
            else {
                // Otherwise add the paneStartup function to the list of functions
                // that are to be run when the table is initialised. This will garauntee that the
                // panes are initialised before the init event and init Complete callback is fired
                this.s.dt.settings()[0].aoInitComplete.push({ fn: function () {
                        _this._startup(table);
                    } });
            }
        };
        /**
         * Finds a pane based upon the name of that pane
         *
         * @param name string representing the name of the pane
         * @returns SearchPane The pane which has that name
         */
        SearchPanes.prototype._findPane = function (name) {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (name === pane.s.name) {
                    return pane;
                }
            }
        };
        /**
         * Works out which panes to update when data is recieved from the server and viewTotal is active
         */
        SearchPanes.prototype._serverTotals = function () {
            var selectPresent = false;
            var deselectPresent = false;
            var table = this.s.dt;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                // Identify the pane where a selection or deselection has been made and add it to the list.
                if (pane.s.selectPresent) {
                    this.s.selectionList.push({
                        index: pane.s.index,
                        protect: false,
                        rows: pane.s.dtPane.rows({ selected: true }).data().toArray()
                    });
                    pane.s.selectPresent = false;
                    selectPresent = true;
                    break;
                }
                else if (pane.s.deselect) {
                    var selectedData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                    if (selectedData.length > 0) {
                        this.s.selectionList.push({
                            index: pane.s.index,
                            protect: true,
                            rows: selectedData
                        });
                    }
                    selectPresent = true;
                    deselectPresent = true;
                }
            }
            // Build an updated list based on any selections or deselections added
            if (!selectPresent) {
                this.s.selectionList = [];
            }
            else {
                var newSelectionList = [];
                for (var i = 0; i < this.s.selectionList.length; i++) {
                    var further = false;
                    // Find out if this selection is the last one in the list for that pane
                    for (var j = i + 1; j < this.s.selectionList.length; j++) {
                        if (this.s.selectionList[j].index === this.s.selectionList[i].index) {
                            further = true;
                        }
                    }
                    // If there are no selections for this pane in the list then just push this one
                    if (!further) {
                        var push = false;
                        for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            if (pane.s.index === this.s.selectionList[i].index &&
                                pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0) {
                                push = true;
                            }
                        }
                        if (push) {
                            newSelectionList.push(this.s.selectionList[i]);
                        }
                    }
                }
                this.s.selectionList = newSelectionList;
            }
            var initIdx = -1;
            // If there has been a deselect and only one pane has a selection then update everything
            if (deselectPresent && this.s.selectionList.length === 1) {
                for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                    var pane = _e[_d];
                    pane.s.lastSelect = false;
                    pane.s.deselect = false;
                    if (pane.s.dtPane !== undefined && pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0) {
                        initIdx = pane.s.index;
                    }
                }
            }
            // Otherwise if there are more 1 selections then find the last one and set it to not update that pane
            else if (this.s.selectionList.length > 0) {
                var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                    var pane = _g[_f];
                    pane.s.lastSelect = pane.s.index === last;
                    pane.s.deselect = false;
                }
            }
            // Otherwise if there are no selections then find where that took place and do not update to maintain scrolling
            else if (this.s.selectionList.length === 0) {
                for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                    var pane = _j[_h];
                    // pane.s.lastSelect = (pane.s.deselect === true);
                    pane.s.lastSelect = false;
                    pane.s.deselect = false;
                }
            }
            this.dom.panes.empty();
            // Rebuild the desired panes
            for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                var pane = _l[_k];
                if (!pane.s.lastSelect) {
                    pane.rebuildPane(undefined, this.s.dt.page.info().serverSide ? this.s.serverData : undefined, pane.s.index === initIdx ? true : null, true);
                }
                else {
                    pane._setListeners();
                }
                // append all of the panes and enable select
                this.dom.panes.append(pane.dom.container);
                if (pane.s.dtPane !== undefined) {
                    $$1(pane.s.dtPane.table().node()).parent()[0].scrollTop = pane.s.scrollTop;
                    // eslint-disable-next-line no-extra-parens
                    $$1.fn.dataTable.select.init(pane.s.dtPane);
                }
            }
            this._updateSelection();
        };
        /**
         * Sets the listeners for the collapse and show all buttons
         * Also sets and performs checks on current panes to see if they are collapsed
         */
        SearchPanes.prototype._setCollapseListener = function () {
            var _this = this;
            this.dom.collapseAll.on('click.dtsps', function () {
                _this._collapseAll();
                _this.dom.collapseAll.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                _this.dom.showAll.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                _this.s.dt.state.save();
            });
            this.dom.showAll.on('click.dtsps', function () {
                _this._showAll();
                _this.dom.showAll.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                _this.dom.collapseAll.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                _this.s.dt.state.save();
            });
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                // We want to make the same check whenever there is a collapse/expand
                pane.dom.collapseButton.on('click', function () { return _this._checkCollapse(); });
            }
            this._checkCollapse();
        };
        /**
         * Shows all of the panes
         */
        SearchPanes.prototype._showAll = function () {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.show();
            }
        };
        /**
         * Initialises the tables previous/preset selections and initialises callbacks for events
         *
         * @param table the parent table for which the searchPanes are being created
         */
        SearchPanes.prototype._startup = function (table) {
            var _this = this;
            this.dom.container.text('');
            // Attach clear button and title bar to the document
            this._attachExtras();
            this.dom.container.append(this.dom.panes);
            this.dom.panes.empty();
            var loadedFilter = this.s.dt.state.loaded();
            if (this.c.viewTotal && !this.c.cascadePanes) {
                if (loadedFilter !== null &&
                    loadedFilter !== undefined &&
                    loadedFilter.searchPanes !== undefined &&
                    loadedFilter.searchPanes.panes !== undefined) {
                    var filterActive = false;
                    for (var _i = 0, _a = loadedFilter.searchPanes.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        if (pane.selected.length > 0) {
                            filterActive = true;
                            break;
                        }
                    }
                    if (filterActive) {
                        for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            pane.s.showFiltered = true;
                        }
                    }
                }
            }
            for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                var pane = _e[_d];
                pane.rebuildPane(undefined, Object.keys(this.s.serverData).length > 0 ? this.s.serverData : undefined);
                this.dom.panes.append(pane.dom.container);
            }
            // If the layout is set to auto then the panes need to be resized to their best fit
            if (this.c.layout === 'auto') {
                this.resizePanes();
            }
            // Reset the paging if that has been saved in the state
            if (!this.s.stateRead && loadedFilter !== null && loadedFilter !== undefined) {
                this.s.dt.page(loadedFilter.start / this.s.dt.page.len());
                this.s.dt.draw('page');
            }
            this.s.stateRead = true;
            if (this.c.viewTotal && !this.c.cascadePanes) {
                for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                    var pane = _g[_f];
                    pane.updatePane();
                }
            }
            this._checkMessage();
            // When a draw is called on the DataTable, update all of the panes incase the data in the DataTable has changed
            table.on('preDraw.dtsps', function () {
                // Check that the panes are not updating to avoid infinite loops
                // Also check that this draw is not due to paging
                if (!_this.s.updating && !_this.s.paging) {
                    if ((_this.c.cascadePanes || _this.c.viewTotal) && !_this.s.dt.page.info().serverSide) {
                        _this.redrawPanes(_this.c.viewTotal);
                    }
                    else {
                        _this._updateFilterCount();
                        _this._updateSelection();
                    }
                    _this.s.filterPane = -1;
                }
                // Paging flag reset - we only need to dodge the draw once
                _this.s.paging = false;
            });
            $$1(window).on('resize.dtsp', dataTable$1.util.throttle(function () {
                _this.resizePanes();
            }));
            // Whenever a state save occurs store the selection list in the state object
            this.s.dt.on('stateSaveParams.dtsp', function (e, settings, data) {
                if (data.searchPanes === undefined) {
                    data.searchPanes = {};
                }
                data.searchPanes.selectionList = _this.s.selectionList;
            });
            // Listener for paging on main table
            table.off('page');
            table.on('page', function () {
                _this.s.paging = true;
                _this.s.page = _this.s.dt.page();
            });
            if (this.s.dt.page.info().serverSide) {
                table.off('preXhr.dt');
                table.on('preXhr.dt', function (e, settings, data) {
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    if (data.searchPanes_null === undefined) {
                        data.searchPanes_null = {};
                    }
                    // Count how many filters are being applied
                    var filterCount = 0;
                    for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        var src = _this.s.dt.column(pane.s.index).dataSrc();
                        if (data.searchPanes[src] === undefined) {
                            data.searchPanes[src] = {};
                        }
                        if (data.searchPanes_null[src] === undefined) {
                            data.searchPanes_null[src] = {};
                        }
                        if (pane.s.dtPane !== undefined) {
                            var rowData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                            for (var i = 0; i < rowData.length; i++) {
                                data.searchPanes[src][i] = rowData[i].filter;
                                if (data.searchPanes[src][i] === null) {
                                    data.searchPanes_null[src][i] = true;
                                }
                                filterCount++;
                            }
                        }
                    }
                    if (_this.c.viewTotal) {
                        _this._prepViewTotal(filterCount);
                    }
                    // If there is a filter to be applied, then we need to read from the start of the result set
                    // and set the paging to 0. This matches the behaviour of client side processing
                    if (filterCount > 0) {
                        // If the number of filters has changed we need to read from the start of the
                        // result set and reset the paging
                        if (filterCount !== _this.s.filterCount) {
                            data.start = 0;
                            _this.s.page = 0;
                        }
                        // Otherwise it is a paging request and we need to read from whatever the paging has been set to
                        else {
                            data.start = _this.s.page * _this.s.dt.page.len();
                        }
                        _this.s.dt.page(_this.s.page);
                        _this.s.filterCount = filterCount;
                    }
                });
            }
            else {
                table.on('preXhr.dt', function (e, settings, data) {
                    for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        pane.clearData();
                    }
                });
            }
            // If the data is reloaded from the server then it is possible that it has changed completely,
            // so we need to rebuild the panes
            this.s.dt.on('xhr', function (e, settings, json, xhr) {
                if (settings.nTable !== _this.s.dt.table().node()) {
                    return;
                }
                var processing = false;
                if (!_this.s.dt.page.info().serverSide) {
                    _this.s.dt.one('preDraw', function () {
                        if (processing) {
                            return;
                        }
                        var page = _this.s.dt.page();
                        processing = true;
                        _this.s.updating = true;
                        _this.dom.panes.empty();
                        for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                            var pane = _a[_i];
                            pane.clearData(); // Clears all of the bins and will mean that the data has to be re-read
                            // Pass a boolean to say whether this is the last choice made for maintaining selections
                            // when rebuilding
                            pane.rebuildPane(_this.s.selectionList[_this.s.selectionList.length - 1] !== undefined ?
                                pane.s.index === _this.s.selectionList[_this.s.selectionList.length - 1].index :
                                false, undefined, undefined, true);
                            _this.dom.panes.append(pane.dom.container);
                        }
                        if (!_this.s.dt.page.info().serverSide) {
                            _this.s.dt.draw();
                        }
                        _this.s.updating = false;
                        if (_this.c.cascadePanes || _this.c.viewTotal) {
                            _this.redrawPanes(_this.c.cascadePanes);
                        }
                        else {
                            _this._updateSelection();
                        }
                        _this._checkMessage();
                        _this.s.dt.one('draw', function () {
                            _this.s.updating = true;
                            _this.s.dt.page(page).draw(false);
                            _this.s.updating = false;
                        });
                    });
                }
            });
            // PreSelect any selections which have been defined using the preSelect option
            for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                var pane = _j[_h];
                if (pane !== undefined &&
                    pane.s.dtPane !== undefined &&
                    (pane.s.colOpts.preSelect !== undefined && pane.s.colOpts.preSelect.length > 0 ||
                        pane.customPaneSettings !== null &&
                            pane.customPaneSettings.preSelect !== undefined &&
                            pane.customPaneSettings.preSelect.length > 0)) {
                    var tableLength = pane.s.dtPane.rows().data().toArray().length;
                    for (var i = 0; i < tableLength; i++) {
                        if (pane.s.colOpts.preSelect.includes(pane.s.dtPane.cell(i, 0).data()) ||
                            pane.customPaneSettings !== null &&
                                pane.customPaneSettings.preSelect !== undefined &&
                                pane.customPaneSettings.preSelect.includes(pane.s.dtPane.cell(i, 0).data())) {
                            pane.s.dtPane.row(i).select();
                        }
                    }
                    pane.updateTable();
                }
            }
            if (this.s.selectionList !== undefined && this.s.selectionList.length > 0) {
                var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                    var pane = _l[_k];
                    pane.s.lastSelect = pane.s.index === last;
                }
            }
            // If cascadePanes is active then make the previous selections in the order they were previously
            if (this.s.selectionList.length > 0 && this.c.cascadePanes) {
                this._cascadeRegen(this.s.selectionList, this.s.selectionList.length);
            }
            // Update the title bar to show how many filters have been selected
            this._updateFilterCount();
            // If the table is destroyed and restarted then clear the selections so that they do not persist.
            table.on('destroy.dtsps', function () {
                for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    pane.destroy();
                }
                table.off('.dtsps');
                _this.dom.collapseAll.off('.dtsps');
                _this.dom.showAll.off('.dtsps');
                _this.dom.clearAll.off('.dtsps');
                _this.dom.container.remove();
                _this.clearSelections();
            });
            if (this.c.collapse) {
                this._setCollapseListener();
            }
            // When the clear All button has been pressed clear all of the selections in the panes
            if (this.c.clear) {
                this.dom.clearAll.on('click.dtsps', function () {
                    _this.clearSelections();
                });
            }
            table.settings()[0]._searchPanes = this;
            // This state save is required so that state is maintained over multiple refreshes if no actions are made
            this.s.dt.state.save();
        };
        SearchPanes.prototype._prepViewTotal = function (selectTotal) {
            var filterPane = this.s.filterPane;
            var filterActive = false;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    var selectLength = pane.s.dtPane.rows({ selected: true }).data().toArray().length;
                    // If filterPane === -1 then a pane with a selection has not been found yet,
                    // so set filterPane to that panes index
                    if (selectLength > 0 && filterPane === -1) {
                        filterPane = pane.s.index;
                        filterActive = true;
                    }
                    // Then if another pane is found with a selection then set filterPane to null to
                    // show that multiple panes have selections present
                    else if (selectLength > 0) {
                        filterPane = null;
                    }
                }
            }
            if (selectTotal !== null && selectTotal !== 0) {
                filterPane = null;
            }
            // Update all of the panes to reflect the current state of the filters
            for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                var pane = _c[_b];
                if (pane.s.dtPane !== undefined) {
                    pane.s.filteringActive = true;
                    if (filterPane !== -1 && filterPane !== null && filterPane === pane.s.index ||
                        filterActive === false) {
                        pane.s.filteringActive = false;
                    }
                }
            }
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPanes.prototype._updateFilterCount = function () {
            var filterCount = 0;
            // Add the number of all of the filters throughout the panes
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    filterCount += pane.getPaneCount();
                }
            }
            // Run the message through the internationalisation method to improve readability
            var message = this.s.dt.i18n('searchPanes.title', this.c.i18n.title, filterCount);
            this.dom.title.text(message);
            if (this.c.filterChanged !== undefined && typeof this.c.filterChanged === 'function') {
                this.c.filterChanged.call(this.s.dt, filterCount);
            }
            if (filterCount === 0) {
                this.dom.clearAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
            else {
                this.dom.clearAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
            }
        };
        /**
         * Updates the selectionList when cascade is not in place
         */
        SearchPanes.prototype._updateSelection = function () {
            this.s.selectionList = [];
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    this.s.selectionList.push({
                        index: pane.s.index,
                        protect: false,
                        rows: pane.s.dtPane.rows({ selected: true }).data().toArray()
                    });
                }
            }
        };
        SearchPanes.version = '1.4.0';
        SearchPanes.classes = {
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            collapseAll: 'dtsp-collapseAll',
            container: 'dtsp-searchPanes',
            disabledButton: 'dtsp-disabledButton',
            emptyMessage: 'dtsp-emptyMessage',
            hide: 'dtsp-hidden',
            panes: 'dtsp-panesContainer',
            search: 'dtsp-search',
            showAll: 'dtsp-showAll',
            title: 'dtsp-title',
            titleRow: 'dtsp-titleRow'
        };
        // Define SearchPanes default options
        SearchPanes.defaults = {
            cascadePanes: false,
            clear: true,
            collapse: true,
            columns: [],
            container: function (dt) {
                return dt.table().container();
            },
            filterChanged: undefined,
            i18n: {
                clearMessage: 'Clear All',
                clearPane: '&times;',
                collapse: {
                    0: 'SearchPanes',
                    _: 'SearchPanes (%d)'
                },
                collapseMessage: 'Collapse All',
                count: '{total}',
                countFiltered: '{shown} ({total})',
                emptyMessage: '<em>No data</em>',
                emptyPanes: 'No SearchPanes',
                loadMessage: 'Loading Search Panes...',
                showMessage: 'Show All',
                title: 'Filters Active - %d'
            },
            layout: 'auto',
            order: [],
            panes: [],
            viewTotal: false
        };
        return SearchPanes;
    }());

    /*! SearchPanes 1.4.0
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
            // eslint-disable-next-line no-extra-parens
            factory(window.jQuery, window, document);
        }
    }(function ($, window, document) {
        setJQuery($);
        setJQuery$1($);
        var dataTable = $.fn.dataTable;
        // eslint-disable-next-line no-extra-parens
        $.fn.dataTable.SearchPanes = SearchPanes;
        // eslint-disable-next-line no-extra-parens
        $.fn.DataTable.SearchPanes = SearchPanes;
        // eslint-disable-next-line no-extra-parens
        $.fn.dataTable.SearchPane = SearchPane;
        // eslint-disable-next-line no-extra-parens
        $.fn.DataTable.SearchPane = SearchPane;
        // eslint-disable-next-line no-extra-parens
        var apiRegister = $.fn.dataTable.Api.register;
        apiRegister('searchPanes()', function () {
            return this;
        });
        apiRegister('searchPanes.clearSelections()', function () {
            return this.iterator('table', function (ctx) {
                if (ctx._searchPanes) {
                    ctx._searchPanes.clearSelections();
                }
            });
        });
        apiRegister('searchPanes.rebuildPane()', function (targetIdx, maintainSelections) {
            return this.iterator('table', function (ctx) {
                if (ctx._searchPanes) {
                    ctx._searchPanes.rebuild(targetIdx, maintainSelections);
                }
            });
        });
        apiRegister('searchPanes.resizePanes()', function () {
            var ctx = this.context[0];
            return ctx._searchPanes ?
                ctx._searchPanes.resizePanes() :
                null;
        });
        apiRegister('searchPanes.container()', function () {
            var ctx = this.context[0];
            return ctx._searchPanes
                ? ctx._searchPanes.getNode()
                : null;
        });
        $.fn.dataTable.ext.buttons.searchPanesClear = {
            action: function (e, dt, node, config) {
                dt.searchPanes.clearSelections();
            },
            text: 'Clear Panes'
        };
        $.fn.dataTable.ext.buttons.searchPanes = {
            action: function (e, dt, node, config) {
                e.stopPropagation();
                this.popover(config._panes.getNode(), {
                    align: 'dt-container'
                });
                config._panes.rebuild(undefined, true);
            },
            config: {},
            init: function (dt, node, config) {
                var panes = new $.fn.dataTable.SearchPanes(dt, $.extend({
                    filterChanged: function (count) {
                        // console.log(dt.context[0])
                        dt.button(node).text(dt.i18n('searchPanes.collapse', dt.context[0].oLanguage.searchPanes !== undefined ?
                            dt.context[0].oLanguage.searchPanes.collapse :
                            dt.context[0]._searchPanes.c.i18n.collapse, count));
                    }
                }, config.config));
                var message = dt.i18n('searchPanes.collapse', panes.c.i18n.collapse, 0);
                dt.button(node).text(message);
                config._panes = panes;
            },
            text: 'Search Panes'
        };
        function _init(settings, options, fromPre) {
            if (options === void 0) { options = null; }
            if (fromPre === void 0) { fromPre = false; }
            var api = new dataTable.Api(settings);
            var opts = options
                ? options
                : api.init().searchPanes || dataTable.defaults.searchPanes;
            var searchPanes = new SearchPanes(api, opts, fromPre);
            var node = searchPanes.getNode();
            return node;
        }
        // Attach a listener to the document which listens for DataTables initialisation
        // events so we can automatically initialise
        $(document).on('preInit.dt.dtsp', function (e, settings, json) {
            if (e.namespace !== 'dt') {
                return;
            }
            if (settings.oInit.searchPanes ||
                dataTable.defaults.searchPanes) {
                if (!settings._searchPanes) {
                    _init(settings, null, true);
                }
            }
        });
        // DataTables `dom` feature option
        dataTable.ext.feature.push({
            cFeature: 'P',
            fnInit: _init
        });
        // DataTables 2 layout feature
        if (dataTable.ext.features) {
            dataTable.ext.features.register('searchPanes', _init);
        }
    }));

}());
