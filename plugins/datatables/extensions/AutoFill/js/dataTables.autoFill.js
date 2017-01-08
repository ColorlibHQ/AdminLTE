/*! AutoFill 1.2.1
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     AutoFill
 * @description Add Excel like click and drag auto-fill options to DataTables
 * @version     1.2.1
 * @file        dataTables.autoFill.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2010-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function( window, document, undefined ) {

var factory = function( $, DataTable ) {
"use strict";

/** 
 * AutoFill provides Excel like auto-fill features for a DataTable
 *
 * @class AutoFill
 * @constructor
 * @param {object} oTD DataTables settings object
 * @param {object} oConfig Configuration object for AutoFill
 */
var AutoFill = function( oDT, oConfig )
{
	/* Sanity check that we are a new instance */
	if ( ! (this instanceof AutoFill) ) {
		throw( "Warning: AutoFill must be initialised with the keyword 'new'" );
	}

	if ( ! $.fn.dataTableExt.fnVersionCheck('1.7.0') ) {
		throw( "Warning: AutoFill requires DataTables 1.7 or greater");
	}


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public class variables
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	this.c = {};

	/**
	 * @namespace Settings object which contains customisable information for AutoFill instance
	 */
	this.s = {
		/**
		 * @namespace Cached information about the little dragging icon (the filler)
		 */
		"filler": {
			"height": 0,
			"width": 0
		},

		/**
		 * @namespace Cached information about the border display
		 */
		"border": {
			"width": 2
		},

		/**
		 * @namespace Store for live information for the current drag
		 */
		"drag": {
			"startX": -1,
			"startY": -1,
			"startTd": null,
			"endTd": null,
			"dragging": false
		},

		/**
		 * @namespace Data cache for information that we need for scrolling the screen when we near
		 *   the edges
		 */
		"screen": {
			"interval": null,
			"y": 0,
			"height": 0,
			"scrollTop": 0
		},

		/**
		 * @namespace Data cache for the position of the DataTables scrolling element (when scrolling
		 *   is enabled)
		 */
		"scroller": {
			"top": 0,
			"bottom": 0
		},

		/**
		 * @namespace Information stored for each column. An array of objects
		 */
		"columns": []
	};


	/**
	 * @namespace Common and useful DOM elements for the class instance
	 */
	this.dom = {
		"table": null,
		"filler": null,
		"borderTop": null,
		"borderRight": null,
		"borderBottom": null,
		"borderLeft": null,
		"currentTarget": null
	};



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public class methods
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 * Retreieve the settings object from an instance
	 *  @method fnSettings
	 *  @returns {object} AutoFill settings object
	 */
	this.fnSettings = function () {
		return this.s;
	};


	/* Constructor logic */
	this._fnInit( oDT, oConfig );
	return this;
};



AutoFill.prototype = {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods (they are of course public in JS, but recommended as private)
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 * Initialisation
	 *  @method _fnInit
	 *  @param {object} dt DataTables settings object
	 *  @param {object} config Configuration object for AutoFill
	 *  @returns void
	 */
	"_fnInit": function ( dt, config )
	{
		var
			that = this,
			i, iLen;

		// Use DataTables API to get the settings allowing selectors, instances
		// etc to be used, or for backwards compatibility get from the old
		// fnSettings method
		this.s.dt = DataTable.Api ?
			new DataTable.Api( dt ).settings()[0] :
			dt.fnSettings();
		this.s.init = config || {};
		this.dom.table = this.s.dt.nTable;

		$.extend( true, this.c, AutoFill.defaults, config );

		/* Add and configure the columns */
		this._initColumns();

		/* Auto Fill click and drag icon */
		var filler = $('<div/>', {
				'class': 'AutoFill_filler'
			} )
			.appendTo( 'body' );
		this.dom.filler = filler[0];

		// Get the height / width of the click element
		this.s.filler.height = filler.height();
		this.s.filler.width = filler.width();
		filler[0].style.display = "none";

		/* Border display - one div for each side. We can't just use a single
		 * one with a border, as we want the events to effectively pass through
		 * the transparent bit of the box
		 */
		var border;
		var appender = document.body;
		if ( that.s.dt.oScroll.sY !== "" ) {
			that.s.dt.nTable.parentNode.style.position = "relative";
			appender = that.s.dt.nTable.parentNode;
		}

		border = $('<div/>', {
			"class": "AutoFill_border"
		} );
		this.dom.borderTop    = border.clone().appendTo( appender )[0];
		this.dom.borderRight  = border.clone().appendTo( appender )[0];
		this.dom.borderBottom = border.clone().appendTo( appender )[0];
		this.dom.borderLeft   = border.clone().appendTo( appender )[0];

		/* Events */
		filler.on( 'mousedown.DTAF', function (e) {
			this.onselectstart = function() { return false; };
			that._fnFillerDragStart.call( that, e );
			return false;
		} );

		$('tbody', this.dom.table).on(
			'mouseover.DTAF mouseout.DTAF',
			'>tr>td, >tr>th',
			function (e) {
				that._fnFillerDisplay.call( that, e );
			}
		);

		$(this.dom.table).on( 'destroy.dt.DTAF', function () {
			filler.off( 'mousedown.DTAF' ).remove();
			$('tbody', this.dom.table).off( 'mouseover.DTAF mouseout.DTAF' );
		} );
	},


	_initColumns: function ( )
	{
		var that = this;
		var i, ien;
		var dt = this.s.dt;
		var config = this.s.init;

		for ( i=0, ien=dt.aoColumns.length ; i<ien ; i++ ) {
			this.s.columns[i] = $.extend( true, {}, AutoFill.defaults.column );
		}

		dt.oApi._fnApplyColumnDefs(
			dt,
			config.aoColumnDefs || config.columnDefs,
			config.aoColumns || config.columns,
			function (colIdx, def) {
				that._fnColumnOptions( colIdx, def );
			}
		);

		// For columns which don't have read, write, step functions defined,
		// use the default ones
		for ( i=0, ien=dt.aoColumns.length ; i<ien ; i++ ) {
			var column = this.s.columns[i];

			if ( ! column.read ) {
				column.read = this._fnReadCell;
			}
			if ( ! column.write ) {
				column.read = this._fnWriteCell;
			}
			if ( ! column.step ) {
				column.read = this._fnStep;
			}
		}
	},


	"_fnColumnOptions": function ( i, opts )
	{
		var column = this.s.columns[ i ];
		var set = function ( outProp, inProp ) {
			if ( opts[ inProp[0] ] !== undefined ) {
				column[ outProp ] = opts[ inProp[0] ];
			}
			if ( opts[ inProp[1] ] !== undefined ) {
				column[ outProp ] = opts[ inProp[1] ];
			}
		};

		// Compatibility with the old Hungarian style of notation
		set( 'enable',    ['bEnable',     'enable'] );
		set( 'read',      ['fnRead',      'read'] );
		set( 'write',     ['fnWrite',     'write'] );
		set( 'step',      ['fnStep',      'step'] );
		set( 'increment', ['bIncrement',  'increment'] );
	},


	/**
	 * Find out the coordinates of a given TD cell in a table
	 *  @method  _fnTargetCoords
	 *  @param   {Node} nTd
	 *  @returns {Object} x and y properties, for the position of the cell in the tables DOM
	 */
	"_fnTargetCoords": function ( nTd )
	{
		var nTr = $(nTd).parents('tr')[0];
		var position = this.s.dt.oInstance.fnGetPosition( nTd );

		return {
			"x":      $('td', nTr).index(nTd),
			"y":      $('tr', nTr.parentNode).index(nTr),
			"row":    position[0],
			"column": position[2]
		};
	},


	/**
	 * Display the border around one or more cells (from start to end)
	 *  @method  _fnUpdateBorder
	 *  @param   {Node} nStart Starting cell
	 *  @param   {Node} nEnd Ending cell
	 *  @returns void
	 */
	"_fnUpdateBorder": function ( nStart, nEnd )
	{
		var
			border = this.s.border.width,
			offsetStart = $(nStart).offset(),
			offsetEnd = $(nEnd).offset(),
			x1 = offsetStart.left - border,
			x2 = offsetEnd.left + $(nEnd).outerWidth(),
			y1 = offsetStart.top - border,
			y2 = offsetEnd.top + $(nEnd).outerHeight(),
			width = offsetEnd.left + $(nEnd).outerWidth() - offsetStart.left + (2*border),
			height = offsetEnd.top + $(nEnd).outerHeight() - offsetStart.top + (2*border),
			oStyle;

		// Recalculate start and end (when dragging "backwards")  
		if( offsetStart.left > offsetEnd.left) {
			x1 = offsetEnd.left - border;
			x2 = offsetStart.left + $(nStart).outerWidth();
			width = offsetStart.left + $(nStart).outerWidth() - offsetEnd.left + (2*border);
		}

		if ( this.s.dt.oScroll.sY !== "" )
		{
			/* The border elements are inside the DT scroller - so position relative to that */
			var
				offsetScroll = $(this.s.dt.nTable.parentNode).offset(),
				scrollTop = $(this.s.dt.nTable.parentNode).scrollTop(),
				scrollLeft = $(this.s.dt.nTable.parentNode).scrollLeft();

			x1 -= offsetScroll.left - scrollLeft;
			x2 -= offsetScroll.left - scrollLeft;
			y1 -= offsetScroll.top - scrollTop;
			y2 -= offsetScroll.top - scrollTop;
		}

		/* Top */
		oStyle = this.dom.borderTop.style;
		oStyle.top = y1+"px";
		oStyle.left = x1+"px";
		oStyle.height = this.s.border.width+"px";
		oStyle.width = width+"px";

		/* Bottom */
		oStyle = this.dom.borderBottom.style;
		oStyle.top = y2+"px";
		oStyle.left = x1+"px";
		oStyle.height = this.s.border.width+"px";
		oStyle.width = width+"px";

		/* Left */
		oStyle = this.dom.borderLeft.style;
		oStyle.top = y1+"px";
		oStyle.left = x1+"px";
		oStyle.height = height+"px";
		oStyle.width = this.s.border.width+"px";

		/* Right */
		oStyle = this.dom.borderRight.style;
		oStyle.top = y1+"px";
		oStyle.left = x2+"px";
		oStyle.height = height+"px";
		oStyle.width = this.s.border.width+"px";
	},


	/**
	 * Mouse down event handler for starting a drag
	 *  @method  _fnFillerDragStart
	 *  @param   {Object} e Event object
	 *  @returns void
	 */
	"_fnFillerDragStart": function (e)
	{
		var that = this;
		var startingTd = this.dom.currentTarget;

		this.s.drag.dragging = true;

		that.dom.borderTop.style.display = "block";
		that.dom.borderRight.style.display = "block";
		that.dom.borderBottom.style.display = "block";
		that.dom.borderLeft.style.display = "block";

		var coords = this._fnTargetCoords( startingTd );
		this.s.drag.startX = coords.x;
		this.s.drag.startY = coords.y;

		this.s.drag.startTd = startingTd;
		this.s.drag.endTd = startingTd;

		this._fnUpdateBorder( startingTd, startingTd );

		$(document).bind('mousemove.AutoFill', function (e) {
			that._fnFillerDragMove.call( that, e );
		} );

		$(document).bind('mouseup.AutoFill', function (e) {
			that._fnFillerFinish.call( that, e );
		} );

		/* Scrolling information cache */
		this.s.screen.y = e.pageY;
		this.s.screen.height = $(window).height();
		this.s.screen.scrollTop = $(document).scrollTop();

		if ( this.s.dt.oScroll.sY !== "" )
		{
			this.s.scroller.top = $(this.s.dt.nTable.parentNode).offset().top;
			this.s.scroller.bottom = this.s.scroller.top + $(this.s.dt.nTable.parentNode).height();
		}

		/* Scrolling handler - we set an interval (which is cancelled on mouse up) which will fire
		 * regularly and see if we need to do any scrolling
		 */
		this.s.screen.interval = setInterval( function () {
			var iScrollTop = $(document).scrollTop();
			var iScrollDelta = iScrollTop - that.s.screen.scrollTop;
			that.s.screen.y += iScrollDelta;

			if ( that.s.screen.height - that.s.screen.y + iScrollTop < 50 )
			{
				$('html, body').animate( {
					"scrollTop": iScrollTop + 50
				}, 240, 'linear' );
			}
			else if ( that.s.screen.y - iScrollTop < 50 )
			{
				$('html, body').animate( {
					"scrollTop": iScrollTop - 50
				}, 240, 'linear' );
			}

			if ( that.s.dt.oScroll.sY !== "" )
			{
				if ( that.s.screen.y > that.s.scroller.bottom - 50 )
				{
					$(that.s.dt.nTable.parentNode).animate( {
						"scrollTop": $(that.s.dt.nTable.parentNode).scrollTop() + 50
					}, 240, 'linear' );
				}
				else if ( that.s.screen.y < that.s.scroller.top + 50 )
				{
					$(that.s.dt.nTable.parentNode).animate( {
						"scrollTop": $(that.s.dt.nTable.parentNode).scrollTop() - 50
					}, 240, 'linear' );
				}
			}
		}, 250 );
	},


	/**
	 * Mouse move event handler for during a move. See if we want to update the display based on the
	 * new cursor position
	 *  @method  _fnFillerDragMove
	 *  @param   {Object} e Event object
	 *  @returns void
	 */
	"_fnFillerDragMove": function (e)
	{
		if ( e.target && e.target.nodeName.toUpperCase() == "TD" &&
			 e.target != this.s.drag.endTd )
		{
			var coords = this._fnTargetCoords( e.target );

			if ( this.c.mode == "y" && coords.x != this.s.drag.startX )
			{
				e.target = $('tbody>tr:eq('+coords.y+')>td:eq('+this.s.drag.startX+')', this.dom.table)[0];
			}
			if ( this.c.mode == "x" && coords.y != this.s.drag.startY )
			{
				e.target = $('tbody>tr:eq('+this.s.drag.startY+')>td:eq('+coords.x+')', this.dom.table)[0];
			}

			if ( this.c.mode == "either")
			{
				if(coords.x != this.s.drag.startX )
				{
					e.target = $('tbody>tr:eq('+this.s.drag.startY+')>td:eq('+coords.x+')', this.dom.table)[0];
				}
				else if ( coords.y != this.s.drag.startY ) {
					e.target = $('tbody>tr:eq('+coords.y+')>td:eq('+this.s.drag.startX+')', this.dom.table)[0];
				}
			}

			// update coords
			if ( this.c.mode !== "both" ) {
				coords = this._fnTargetCoords( e.target );
			}

			var drag = this.s.drag;
			drag.endTd = e.target;

			if ( coords.y >= this.s.drag.startY ) {
				this._fnUpdateBorder( drag.startTd, drag.endTd );
			}
			else {
				this._fnUpdateBorder( drag.endTd, drag.startTd );
			}
			this._fnFillerPosition( e.target );
		}

		/* Update the screen information so we can perform scrolling */
		this.s.screen.y = e.pageY;
		this.s.screen.scrollTop = $(document).scrollTop();

		if ( this.s.dt.oScroll.sY !== "" )
		{
			this.s.scroller.scrollTop = $(this.s.dt.nTable.parentNode).scrollTop();
			this.s.scroller.top = $(this.s.dt.nTable.parentNode).offset().top;
			this.s.scroller.bottom = this.s.scroller.top + $(this.s.dt.nTable.parentNode).height();
		}
	},


	/**
	 * Mouse release handler - end the drag and take action to update the cells with the needed values
	 *  @method  _fnFillerFinish
	 *  @param   {Object} e Event object
	 *  @returns void
	 */
	"_fnFillerFinish": function (e)
	{
		var that = this, i, iLen, j;

		$(document).unbind('mousemove.AutoFill mouseup.AutoFill');

		this.dom.borderTop.style.display = "none";
		this.dom.borderRight.style.display = "none";
		this.dom.borderBottom.style.display = "none";
		this.dom.borderLeft.style.display = "none";

		this.s.drag.dragging = false;

		clearInterval( this.s.screen.interval );

		var cells = [];
		var table = this.dom.table;
		var coordsStart = this._fnTargetCoords( this.s.drag.startTd );
		var coordsEnd = this._fnTargetCoords( this.s.drag.endTd );
		var columnIndex = function ( visIdx ) {
			return that.s.dt.oApi._fnVisibleToColumnIndex( that.s.dt, visIdx );
		};

		// xxx - urgh - there must be a way of reducing this...
		if ( coordsStart.y <= coordsEnd.y ) {
			for ( i=coordsStart.y ; i<=coordsEnd.y ; i++ ) {
				if ( coordsStart.x <= coordsEnd.x ) {
					for ( j=coordsStart.x ; j<=coordsEnd.x ; j++ ) {
						cells.push( {
							node:   $('tbody>tr:eq('+i+')>td:eq('+j+')', table)[0],
							x:      j - coordsStart.x,
							y:      i - coordsStart.y,
							colIdx: columnIndex( j )
						} );
					}
				}
				else {
					for ( j=coordsStart.x ; j>=coordsEnd.x ; j-- ) {
						cells.push( {
							node:   $('tbody>tr:eq('+i+')>td:eq('+j+')', table)[0],
							x:      j - coordsStart.x,
							y:      i - coordsStart.y,
							colIdx: columnIndex( j )
						} );
					}
				}
			}
		}
		else {
			for ( i=coordsStart.y ; i>=coordsEnd.y ; i-- ) {
				if ( coordsStart.x <= coordsEnd.x ) {
					for ( j=coordsStart.x ; j<=coordsEnd.x ; j++ ) {
						cells.push( {
							node:   $('tbody>tr:eq('+i+')>td:eq('+j+')', table)[0],
							x:      j - coordsStart.x,
							y:      i - coordsStart.y,
							colIdx: columnIndex( j )
						} );
					}
				}
				else {
					for ( j=coordsStart.x ; j>=coordsEnd.x ; j-- ) {
						cells.push( {
							node:   $('tbody>tr:eq('+i+')>td:eq('+j+')', table)[0],
							x:      coordsStart.x - j,
							y:      coordsStart.y - i,
							colIdx: columnIndex( j )
						} );
					}
				}
			}
		}

		// An auto-fill requires 2 or more cells
		if ( cells.length <= 1 ) {
			return;
		}

		var edited = [];
		var previous;

		for ( i=0, iLen=cells.length ; i<iLen ; i++ ) {
			var cell      = cells[i];
			var column    = this.s.columns[ cell.colIdx ];
			var read      = column.read.call( column, cell.node );
			var stepValue = column.step.call( column, cell.node, read, previous, i, cell.x, cell.y );

			column.write.call( column, cell.node, stepValue );

			previous = stepValue;
			edited.push( {
				cell:     cell,
				colIdx:   cell.colIdx,
				newValue: stepValue,
				oldValue: read
			} );
		}

		if ( this.c.complete !== null ) {
			this.c.complete.call( this, edited );
		}

		// In 1.10 we can do a static draw
		if ( DataTable.Api ) {
			new DataTable.Api( this.s.dt ).draw( false );
		}
		else {
			this.s.dt.oInstance.fnDraw();
		}
	},


	/**
	 * Display the drag handle on mouse over cell
	 *  @method  _fnFillerDisplay
	 *  @param   {Object} e Event object
	 *  @returns void
	 */
	"_fnFillerDisplay": function (e)
	{
		var filler = this.dom.filler;

		/* Don't display automatically when dragging */
		if ( this.s.drag.dragging)
		{
			return;
		}

		/* Check that we are allowed to AutoFill this column or not */
		var nTd = (e.target.nodeName.toLowerCase() == 'td') ? e.target : $(e.target).parents('td')[0];
		var iX = this._fnTargetCoords(nTd).column;
		if ( !this.s.columns[iX].enable )
		{
			filler.style.display = "none";
			return;
		}

		if (e.type == 'mouseover')
		{
			this.dom.currentTarget = nTd;
			this._fnFillerPosition( nTd );

			filler.style.display = "block";
		}
		else if ( !e.relatedTarget || !e.relatedTarget.className.match(/AutoFill/) )
		{
			filler.style.display = "none";
		}
	},


	/**
	 * Position the filler icon over a cell
	 *  @method  _fnFillerPosition
	 *  @param   {Node} nTd Cell to position filler icon over
	 *  @returns void
	 */
	"_fnFillerPosition": function ( nTd )
	{
		var offset = $(nTd).offset();
		var filler = this.dom.filler;
		filler.style.top = (offset.top - (this.s.filler.height / 2)-1 + $(nTd).outerHeight())+"px";
		filler.style.left = (offset.left - (this.s.filler.width / 2)-1 + $(nTd).outerWidth())+"px";
	}
};


// Alias for access
DataTable.AutoFill = AutoFill;
DataTable.AutoFill = AutoFill;



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Constants
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * AutoFill version
 *  @constant  version
 *  @type      String
 *  @default   See code
 */
AutoFill.version = "1.2.1";


/**
 * AutoFill defaults
 *  @namespace
 */
AutoFill.defaults = {
	/**
	 * Mode for dragging (restrict to y-axis only, x-axis only, either one or none):
	 *
	 *  * `y`      - y-axis only (default)
	 *  * `x`      - x-axis only
	 *  * `either` - either one, but not both axis at the same time
	 *  * `both`   - multiple cells allowed
	 *
	 * @type {string}
	 * @default `y`
	 */
	mode: 'y',

	complete: null,

	/**
	 * Column definition defaults
	 *  @namespace
	 */
	column: {
		/**
		 * If AutoFill should be enabled on this column
		 *
		 * @type {boolean}
		 * @default true
		 */
		enable: true,

		/**
		 * Allow automatic increment / decrement on this column if a number
		 * is found.
		 *
		 * @type {boolean}
		 * @default true
		 */
		increment: true,

		/**
		 * Cell read function
		 *
		 * Default function will simply read the value from the HTML of the
		 * cell.
		 *
		 * @type   {function}
		 * @param  {node} cell `th` / `td` element to read the value from
		 * @return {string}    Data that has been read
		 */
		read: function ( cell ) {
			return $(cell).html();
		},

		/**
		 * Cell write function
		 *
		 * Default function will simply write to the HTML and tell the DataTable
		 * to update.
		 *
		 * @type   {function}
		 * @param  {node} cell `th` / `td` element to write the value to
		 * @return {string}    Data two write
		 */
		write: function ( cell, val ) {
			var table = $(cell).parents('table');
			if ( DataTable.Api ) {
				// 1.10
				table.DataTable().cell( cell ).data( val );
			}
			else {
				// 1.9
				var dt = table.dataTable();
				var pos = dt.fnGetPosition( cell );
				dt.fnUpdate( val, pos[0], pos[2], false );
			}
		},

		/**
		 * Step function. This provides the ability to customise how the values
		 * are incremented.
		 *
		 * @param  {node} cell `th` / `td` element that is being operated upon
		 * @param  {string} read Cell value from `read` function
		 * @param  {string} last Value of the previous cell
		 * @param  {integer} i Loop counter
		 * @param  {integer} x Cell x-position in the current auto-fill. The
		 *   starting cell is coordinate 0 regardless of its physical position
		 *   in the DataTable.
		 * @param  {integer} y Cell y-position in the current auto-fill. The
		 *   starting cell is coordinate 0 regardless of its physical position
		 *   in the DataTable.
		 * @return {string} Value to write
		 */
		step: function ( cell, read, last, i, x, y ) {
			// Increment a number if it is found
			var re = /(\-?\d+)/;
			var match = this.increment && last ? last.match(re) : null;
			if ( match ) {
				return last.replace( re, parseInt(match[1],10) + (x<0 || y<0 ? -1 : 1) );
			}
			return last === undefined ?
				read :
				last;
		}
	}
};

return AutoFill;
};


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery && !jQuery.fn.dataTable.AutoFill ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


}(window, document));

