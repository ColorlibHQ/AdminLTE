/*! FixedHeader 3.2.0
 * ©2009-2021 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     3.2.0
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2021 SpryMedia Ltd.
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

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


var _instCounter = 0;

var FixedHeader = function ( dt, config ) {
	// Sanity check - you just know it will happen
	if ( ! (this instanceof FixedHeader) ) {
		throw "FixedHeader must be initialised with the 'new' keyword.";
	}

	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	dt = new DataTable.Api( dt );

	this.c = $.extend( true, {}, FixedHeader.defaults, config );

	this.s = {
		dt: dt,
		position: {
			theadTop: 0,
			tbodyTop: 0,
			tfootTop: 0,
			tfootBottom: 0,
			width: 0,
			left: 0,
			tfootHeight: 0,
			theadHeight: 0,
			windowHeight: $(window).height(),
			visible: true
		},
		headerMode: null,
		footerMode: null,
		autoWidth: dt.settings()[0].oFeatures.bAutoWidth,
		namespace: '.dtfc'+(_instCounter++),
		scrollLeft: {
			header: -1,
			footer: -1
		},
		enable: true
	};

	this.dom = {
		floatingHeader: null,
		thead: $(dt.table().header()),
		tbody: $(dt.table().body()),
		tfoot: $(dt.table().footer()),
		header: {
			host: null,
			floating: null,
			floatingParent: $('<div class="dtfh-floatingparent">'),
			placeholder: null
		},
		footer: {
			host: null,
			floating: null,
			floatingParent: $('<div class="dtfh-floatingparent">'),
			placeholder: null
		}
	};

	this.dom.header.host = this.dom.thead.parent();
	this.dom.footer.host = this.dom.tfoot.parent();

	var dtSettings = dt.settings()[0];
	if ( dtSettings._fixedHeader ) {
		throw "FixedHeader already initialised on table "+dtSettings.nTable.id;
	}

	dtSettings._fixedHeader = this;

	this._constructor();
};


/*
 * Variable: FixedHeader
 * Purpose:  Prototype for FixedHeader
 * Scope:    global
 */
$.extend( FixedHeader.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * API methods
	 */

	/**
	 * Kill off FH and any events
	 */
	destroy: function () {
		this.s.dt.off( '.dtfc' );
		$(window).off( this.s.namespace );

		if ( this.c.header ) {
			this._modeChange( 'in-place', 'header', true );
		}

		if ( this.c.footer && this.dom.tfoot.length ) {
			this._modeChange( 'in-place', 'footer', true );
		}
	},

	/**
	 * Enable / disable the fixed elements
	 *
	 * @param  {boolean} enable `true` to enable, `false` to disable
	 */
	enable: function ( enable, update )
	{
		this.s.enable = enable;

		if ( update || update === undefined ) {
			this._positions();
			this._scroll( true );
		}
	},

	/**
	 * Get enabled status
	 */
	enabled: function ()
	{
		return this.s.enable;
	},
	
	/**
	 * Set header offset 
	 *
	 * @param  {int} new value for headerOffset
	 */
	headerOffset: function ( offset )
	{
		if ( offset !== undefined ) {
			this.c.headerOffset = offset;
			this.update();
		}

		return this.c.headerOffset;
	},
	
	/**
	 * Set footer offset
	 *
	 * @param  {int} new value for footerOffset
	 */
	footerOffset: function ( offset )
	{
		if ( offset !== undefined ) {
			this.c.footerOffset = offset;
			this.update();
		}

		return this.c.footerOffset;
	},

	
	/**
	 * Recalculate the position of the fixed elements and force them into place
	 */
	update: function (force)
	{
		var table = this.s.dt.table().node();

		if ( $(table).is(':visible') ) {
			this.enable( true, false );
		}
		else {
			this.enable( false, false );
		}

		// Don't update if header is not in the document atm (due to
		// async events)
		if ($(table).children('thead').length === 0) {
			return;
		}

		this._positions();
		this._scroll( force !== undefined ? force : true );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */
	
	/**
	 * FixedHeader constructor - adding the required event listeners and
	 * simple initialisation
	 *
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;

		$(window)
			.on( 'scroll'+this.s.namespace, function () {
				that._scroll();
			} )
			.on( 'resize'+this.s.namespace, DataTable.util.throttle( function () {
				that.s.position.windowHeight = $(window).height();
				that.update();
			}, 50 ) );

		var autoHeader = $('.fh-fixedHeader');
		if ( ! this.c.headerOffset && autoHeader.length ) {
			this.c.headerOffset = autoHeader.outerHeight();
		}

		var autoFooter = $('.fh-fixedFooter');
		if ( ! this.c.footerOffset && autoFooter.length ) {
			this.c.footerOffset = autoFooter.outerHeight();
		}

		dt
			.on( 'column-reorder.dt.dtfc column-visibility.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc', function (e, ctx) {
				that.update();
			} )
			.on( 'draw.dt.dtfc', function (e, ctx) {
				// For updates from our own table, don't reclone, but for all others, do
				that.update(ctx === dt.settings()[0] ? false : true);
			} );

		dt.on( 'destroy.dtfc', function () {
			that.destroy();
		} );

		this._positions();
		$('div.dataTables_scrollHeadInner').height(this.s.position.theadHeight);
		this._scroll();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Clone a fixed item to act as a place holder for the original element
	 * which is moved into a clone of the table element, and moved around the
	 * document to give the fixed effect.
	 *
	 * @param  {string}  item  'header' or 'footer'
	 * @param  {boolean} force Force the clone to happen, or allow automatic
	 *   decision (reuse existing if available)
	 * @private
	 */
	_clone: function ( item, force )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var itemElement = item === 'header' ?
			this.dom.thead :
			this.dom.tfoot;

		// If footer and scrolling is enabled then we don't clone
		// Instead the table's height is decreased accordingly - see `_scroll()`
		if (item === 'footer' && this._scrollEnabled()) {
			return;
		}	

		if ( ! force && itemDom.floating ) {
			// existing floating element - reuse it
			itemDom.floating.removeClass( 'fixedHeader-floating fixedHeader-locked' );
		}
		else {
			if ( itemDom.floating ) {
				if(itemDom.placeholder !== null) {
					itemDom.placeholder.remove();
				}
				this._unsize( item );
				itemDom.floating.children().detach();
				itemDom.floating.remove();
			}

			var tableNode = $(dt.table().node()); 
			var scrollBody = $(tableNode.parent());
			var scrollEnabled = this._scrollEnabled();

			itemDom.floating = $( dt.table().node().cloneNode( false ) )
				.attr( 'aria-hidden', 'true' )
				.css({
					'table-layout': 'fixed',
					top: 0,
					left: 0
				})
				.removeAttr( 'id' )
				.append( itemElement );

			itemDom.floatingParent
				.css({
					width: scrollBody.width(),
					overflow: 'hidden',
					height: 'fit-content',
					position: 'fixed',
					left: scrollEnabled ? tableNode.offset().left + scrollBody.scrollLeft() : 0
				})
				.css(
					item === 'header' ?
						{
							top: this.c.headerOffset,
							bottom: ''
						} :
						{
							top: '',
							bottom: this.c.footerOffset
						}
				)
				.addClass(item === 'footer' ? 'dtfh-floatingparentfoot' : 'dtfh-floatingparenthead')
				.append(itemDom.floating)
				.appendTo( 'body' );

			this._stickyPosition(itemDom.floating, '-');

			var scrollLeftUpdate = () => {
				var scrollLeft = scrollBody.scrollLeft()
				this.s.scrollLeft = {footer: scrollLeft, header: scrollLeft};
				itemDom.floatingParent.scrollLeft(this.s.scrollLeft.header);
			}

			scrollLeftUpdate();
			scrollBody.scroll(scrollLeftUpdate)

			// Insert a fake thead/tfoot into the DataTable to stop it jumping around
			itemDom.placeholder = itemElement.clone( false );
			itemDom.placeholder
				.find( '*[id]' )
				.removeAttr( 'id' );

			itemDom.host.prepend( itemDom.placeholder );

			// Clone widths
			this._matchWidths( itemDom.placeholder, itemDom.floating );
		}
	},

	/**
	 * This method sets the sticky position of the header elements to match fixed columns
	 * @param {JQuery<HTMLElement>} el 
	 * @param {string} sign 
	 */
	_stickyPosition(el, sign) {
		if (this._scrollEnabled()) {
			var that = this
			var rtl = $(that.s.dt.table().node()).css('direction') === 'rtl';

			el.find('th').each(function() {
				// Find out if fixed header has previously set this column
				if ($(this).css('position') === 'sticky') {
					var right = $(this).css('right');
					var left = $(this).css('left');
					if (right !== 'auto' && !rtl) {
						// New position either adds or dismisses the barWidth
						var potential = +right.replace(/px/g, '') + (sign === '-' ? -1 : 1) * that.s.dt.settings()[0].oBrowser.barWidth;
						$(this).css('right', potential > 0 ? potential : 0);
					}
					else if(left !== 'auto' && rtl) {
						var potential = +left.replace(/px/g, '') + (sign === '-' ? -1 : 1) * that.s.dt.settings()[0].oBrowser.barWidth;
						$(this).css('left', potential > 0 ? potential : 0);
					}
				}
			});
		}
	},

	/**
	 * Copy widths from the cells in one element to another. This is required
	 * for the footer as the footer in the main table takes its sizes from the
	 * header columns. That isn't present in the footer so to have it still
	 * align correctly, the sizes need to be copied over. It is also required
	 * for the header when auto width is not enabled
	 *
	 * @param  {jQuery} from Copy widths from
	 * @param  {jQuery} to   Copy widths to
	 * @private
	 */
	_matchWidths: function ( from, to ) {
		var get = function ( name ) {
			return $(name, from)
				.map( function () {
					return $(this).css('width').replace(/[^\d\.]/g, '') * 1;
				} ).toArray();
		};

		var set = function ( name, toWidths ) {
			$(name, to).each( function ( i ) {
				$(this).css( {
					width: toWidths[i],
					minWidth: toWidths[i]
				} );
			} );
		};

		var thWidths = get( 'th' );
		var tdWidths = get( 'td' );

		set( 'th', thWidths );
		set( 'td', tdWidths );
	},

	/**
	 * Remove assigned widths from the cells in an element. This is required
	 * when inserting the footer back into the main table so the size is defined
	 * by the header columns and also when auto width is disabled in the
	 * DataTable.
	 *
	 * @param  {string} item The `header` or `footer`
	 * @private
	 */
	_unsize: function ( item ) {
		var el = this.dom[ item ].floating;

		if ( el && (item === 'footer' || (item === 'header' && ! this.s.autoWidth)) ) {
			$('th, td', el).css( {
				width: '',
				minWidth: ''
			} );
		}
		else if ( el && item === 'header' ) {
			$('th, td', el).css( 'min-width', '' );
		}
	},

	/**
	 * Reposition the floating elements to take account of horizontal page
	 * scroll
	 *
	 * @param  {string} item       The `header` or `footer`
	 * @param  {int}    scrollLeft Document scrollLeft
	 * @private
	 */
	_horizontal: function ( item, scrollLeft )
	{
		var itemDom = this.dom[ item ];
		var position = this.s.position;
		var lastScrollLeft = this.s.scrollLeft;

		if ( itemDom.floating && lastScrollLeft[ item ] !== scrollLeft ) {
			// If scrolling is enabled we need to match the floating header to the body
			if (this._scrollEnabled()) {
				var newScrollLeft = $($(this.s.dt.table().node()).parent()).scrollLeft()
				itemDom.floating.scrollLeft(newScrollLeft);
				itemDom.floatingParent.scrollLeft(newScrollLeft);
			}

			lastScrollLeft[ item ] = scrollLeft;
		}
	},

	/**
	 * Change from one display mode to another. Each fixed item can be in one
	 * of:
	 *
	 * * `in-place` - In the main DataTable
	 * * `in` - Floating over the DataTable
	 * * `below` - (Header only) Fixed to the bottom of the table body
	 * * `above` - (Footer only) Fixed to the top of the table body
	 * 
	 * @param  {string}  mode        Mode that the item should be shown in
	 * @param  {string}  item        'header' or 'footer'
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_modeChange: function ( mode, item, forceChange )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var position = this.s.position;

		// Just determine if scroll is enabled once
		var scrollEnabled = this._scrollEnabled();

		// If footer and scrolling is enabled then we don't clone
		// Instead the table's height is decreased accordingly - see `_scroll()`
		if (item === 'footer' && scrollEnabled) {
			return;
		}		

		// It isn't trivial to add a !important css attribute...
		var importantWidth = function (w) {
			itemDom.floating.attr('style', function(i,s) {
				return (s || '') + 'width: '+w+'px !important;';
			});

			// If not scrolling also have to update the floatingParent
			if (!scrollEnabled) {
				itemDom.floatingParent.attr('style', function(i,s) {
					return (s || '') + 'width: '+w+'px !important;';
				});
			}
		};

		// Record focus. Browser's will cause input elements to loose focus if
		// they are inserted else where in the doc
		var tablePart = this.dom[ item==='footer' ? 'tfoot' : 'thead' ];
		var focus = $.contains( tablePart[0], document.activeElement ) ?
			document.activeElement :
			null;
		var scrollBody = $($(this.s.dt.table().node()).parent());

		if ( mode === 'in-place' ) {
			// Insert the header back into the table's real header
			if ( itemDom.placeholder ) {
				itemDom.placeholder.remove();
				itemDom.placeholder = null;
			}

			this._unsize( item );

			if ( item === 'header' ) {
				itemDom.host.prepend( tablePart );
			}
			else {
				itemDom.host.append( tablePart );
			}

			if ( itemDom.floating ) {
				itemDom.floating.remove();
				itemDom.floating = null;
				this._stickyPosition(itemDom.host, '+');
			}

			if ( itemDom.floatingParent ) {
				itemDom.floatingParent.remove();
			}

			$($(itemDom.host.parent()).parent()).scrollLeft(scrollBody.scrollLeft())
		}
		else if ( mode === 'in' ) {
			// Remove the header from the read header and insert into a fixed
			// positioned floating table clone
			this._clone( item, forceChange );

			// Get useful position values
			var scrollOffset = scrollBody.offset();
			var windowTop = $(document).scrollTop();
			var windowHeight = $(window).height();
			var windowBottom = windowTop + windowHeight;
			var bodyTop = scrollEnabled ? scrollOffset.top : position.tbodyTop;
			var bodyBottom = scrollEnabled ? scrollOffset.top + scrollBody.outerHeight() : position.tfootTop

			// Calculate the amount that the footer or header needs to be shuffled
			var shuffle = item === 'footer' ?
				// footer and top of body isn't on screen
				bodyTop > windowBottom ?
					// Yes - push the footer below
					position.tfootHeight :
					// No - bottom set to the gap between the top of the body and the bottom of the window
					bodyTop + position.tfootHeight - windowBottom :
				// Otherwise must be a header so get the difference from the bottom of the
				//  desired floating header and the bottom of the table body
				windowTop + this.c.headerOffset + position.theadHeight - bodyBottom
				
			// Set the top or bottom based off of the offset and the shuffle value
			var prop = item === 'header' ? 'top' : 'bottom';
			var val = this.c[item+'Offset'] - (shuffle > 0 ? shuffle : 0);

			itemDom.floating.addClass( 'fixedHeader-floating' );
			itemDom.floatingParent
				.css(prop, val)
				.css( {
					'left': position.left,
					'height': item === 'header' ? position.theadHeight : position.tfootHeight,
					'z-index': 2
				})
				.append(itemDom.floating);

			importantWidth(position.width);

			if ( item === 'footer' ) {
				itemDom.floating.css( 'top', '' );
			}
		}
		else if ( mode === 'below' ) { // only used for the header
			// Fix the position of the floating header at base of the table body
			this._clone( item, forceChange );

			itemDom.floating.addClass( 'fixedHeader-locked' );
			itemDom.floatingParent.css({
				position: 'absolute',
				top: position.tfootTop - position.theadHeight,
				left: position.left+'px'
			});

			importantWidth(position.width);
		}
		else if ( mode === 'above' ) { // only used for the footer
			// Fix the position of the floating footer at top of the table body
			this._clone( item, forceChange );

			itemDom.floating.addClass( 'fixedHeader-locked' );
			itemDom.floatingParent.css({
				position: 'absolute',
				top: position.tbodyTop,
				left: position.left+'px'
			});

			importantWidth(position.width);
		}

		// Restore focus if it was lost
		if ( focus && focus !== document.activeElement ) {
			setTimeout( function () {
				focus.focus();
			}, 10 );
		}

		this.s.scrollLeft.header = -1;
		this.s.scrollLeft.footer = -1;
		this.s[item+'Mode'] = mode;
	},

	/**
	 * Cache the positional information that is required for the mode
	 * calculations that FixedHeader performs.
	 *
	 * @private
	 */
	_positions: function ()
	{
		var dt = this.s.dt;
		var table = dt.table();
		var position = this.s.position;
		var dom = this.dom;
		var tableNode = $(table.node());
		var scrollEnabled = this._scrollEnabled();

		// Need to use the header and footer that are in the main table,
		// regardless of if they are clones, since they hold the positions we
		// want to measure from
		var thead = $(dt.table().header());
		var tfoot = $(dt.table().footer());
		var tbody = dom.tbody;
		var scrollBody = tableNode.parent();

		position.visible = tableNode.is(':visible');
		position.width = tableNode.outerWidth();
		position.left = tableNode.offset().left;
		position.theadTop = thead.offset().top;
		position.tbodyTop = scrollEnabled ? scrollBody.offset().top : tbody.offset().top;
		position.tbodyHeight = scrollEnabled ? scrollBody.outerHeight() : tbody.outerHeight();
		position.theadHeight = thead.outerHeight();
		position.theadBottom = position.theadTop + position.theadHeight;

		if ( tfoot.length ) {
			position.tfootTop = position.tbodyTop + position.tbodyHeight; //tfoot.offset().top;
			position.tfootBottom = position.tfootTop + tfoot.outerHeight();
			position.tfootHeight = tfoot.outerHeight();
		}
		else {
			position.tfootTop = position.tbodyTop + tbody.outerHeight();
			position.tfootBottom = position.tfootTop;
			position.tfootHeight = position.tfootTop;
		}
	},


	/**
	 * Mode calculation - determine what mode the fixed items should be placed
	 * into.
	 *
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_scroll: function ( forceChange )
	{
		// ScrollBody details
		var scrollEnabled = this._scrollEnabled();
		var scrollBody = $(this.s.dt.table().node()).parent();
		var scrollOffset =  scrollBody.offset();
		var scrollHeight =  scrollBody.outerHeight();

		// Window details
		var windowLeft = $(document).scrollLeft();
		var windowTop = $(document).scrollTop();
		var windowHeight = $(window).height();
		var windowBottom = windowHeight + windowTop


		var position = this.s.position;
		var headerMode, footerMode;

		// Body Details
		var bodyTop = (scrollEnabled ? scrollOffset.top : position.tbodyTop);
		var bodyLeft = (scrollEnabled ? scrollOffset.left : position.left);
		var bodyBottom = (scrollEnabled ? scrollOffset.top + scrollHeight : position.tfootTop);
		var bodyWidth = (scrollEnabled ? scrollBody.outerWidth() : position.tbodyWidth);

		var windowBottom = windowTop + windowHeight;

		if ( this.c.header ) {
			if ( ! this.s.enable ) {
				headerMode = 'in-place';
			}
			// The header is in it's normal place if the body top is lower than
			//  the scroll of the window plus the headerOffset and the height of the header
			else if ( ! position.visible || windowTop + this.c.headerOffset + position.theadHeight <= bodyTop) {
				headerMode = 'in-place';
			}
			// The header should be floated if
			else if (
				// The scrolling plus the header offset plus the height of the header is lower than the top of the body
				windowTop + this.c.headerOffset + position.theadHeight > bodyTop &&
				// And the scrolling at the top plus the header offset is above the bottom of the body
				windowTop + this.c.headerOffset < bodyBottom
			) {
				headerMode = 'in';
				var scrollBody = $($(this.s.dt.table().node()).parent());

				// Further to the above, If the scrolling plus the header offset plus the header height is lower
				// than the bottom of the table a shuffle is required so have to force the calculation
				if(windowTop + this.c.headerOffset + position.theadHeight > bodyBottom || this.dom.header.floatingParent === undefined){
					forceChange = true;
				}
				else {
					this.dom.header.floatingParent
						.css({
							'top': this.c.headerOffset,
							'position': 'fixed'
						})
						.append(this.dom.header.floating);
				}
			}
			// Anything else and the view is below the table
			else {
				headerMode = 'below';
			}

			if ( forceChange || headerMode !== this.s.headerMode ) {
				this._modeChange( headerMode, 'header', forceChange );
			}

			this._horizontal( 'header', windowLeft );
		}

		var header = {
			offset: {top: 0, left: 0},
			height: 0
		}
		var footer = {
			offset: {top: 0, left: 0},
			height: 0
		}

		if ( this.c.footer && this.dom.tfoot.length ) {
			if ( ! this.s.enable ) {
				footerMode = 'in-place';
			}
			else if ( ! position.visible || position.tfootBottom + this.c.footerOffset <= windowBottom ) {
				footerMode = 'in-place';
			}
			else if (
				bodyBottom + position.tfootHeight + this.c.footerOffset > windowBottom &&
				bodyTop + this.c.footerOffset < windowBottom
			) {
				footerMode = 'in';
				forceChange = true;
			}
			else {
				footerMode = 'above';
			}
			
			if ( forceChange || footerMode !== this.s.footerMode ) {
				this._modeChange( footerMode, 'footer', forceChange );
			}

			this._horizontal( 'footer', windowLeft );
			
			var getOffsetHeight = (el) => {
				return {
					offset: el.offset(),
					height: el.outerHeight()
				}
			}
		
			header = this.dom.header.floating ? getOffsetHeight(this.dom.header.floating) : getOffsetHeight(this.dom.thead);
			footer = this.dom.footer.floating ? getOffsetHeight(this.dom.footer.floating) : getOffsetHeight(this.dom.tfoot);

			// If scrolling is enabled and the footer is off the screen
			if (scrollEnabled && footer.offset.top > windowTop){// && footer.offset.top >= windowBottom) {
				// Calculate the gap between the top of the scrollBody and the top of the window
				var overlap = windowTop - scrollOffset.top;
				// The new height is the bottom of the window
				var newHeight = windowBottom +
					// If the gap between the top of the scrollbody and the window is more than
					//  the height of the header then the top of the table is still visible so add that gap
					// Doing this has effectively calculated the height from the top of the table to the bottom of the current page
					(overlap > -header.height ? overlap : 0) -
					// Take from that
					(
						// The top of the header plus
						header.offset.top +
						// The header height if the standard header is present
						(overlap < -header.height ? header.height : 0) +
						// And the height of the footer
						footer.height
					)

					// Don't want a negative height
				if (newHeight < 0) {
					newHeight = 0;
				}

				// At the end of the above calculation the space between the header (top of the page if floating)
				// and the point just above the footer should be the new value for the height of the table.
				scrollBody.outerHeight(newHeight);
				
				// Need some rounding here as sometimes very small decimal places are encountered
				// If the actual height is bigger or equal to the height we just applied then the footer is "Floating"
				if(Math.round(scrollBody.outerHeight()) >= Math.round(newHeight)) {
					$(this.dom.tfoot.parent()).addClass("fixedHeader-floating");
				}
				// Otherwise max-width has kicked in so it is not floating
				else {
					$(this.dom.tfoot.parent()).removeClass("fixedHeader-floating");
				}
			}
		}

		if(this.dom.header.floating){
			this.dom.header.floatingParent.css('left', bodyLeft-windowLeft);
		}
		if(this.dom.footer.floating){
			this.dom.footer.floatingParent.css('left', bodyLeft-windowLeft);
		}

		// If fixed columns is being used on this table then the blockers need to be copied across
		// Cloning these is cleaner than creating as our own as it will keep consistency with fixedColumns automatically
		// ASSUMING that the class remains the same
		if (this.s.dt.settings()[0]._fixedColumns !== undefined) {
			var adjustBlocker = (side, end, el) => {
				if (el === undefined) {
					let blocker = $('div.dtfc-'+side+'-'+end+'-blocker');
					el = blocker.length === 0 ?
						null :
						blocker.clone().appendTo('body').css('z-index', 1);
				}
				if(el !== null) {
					el.css({
						top: end === 'top' ? header.offset.top : footer.offset.top,
						left: side === 'right' ? bodyLeft + bodyWidth - el.width() : bodyLeft
					});
				}

				return el;
			}

			// Adjust all blockers
			this.dom.header.rightBlocker = adjustBlocker('right', 'top', this.dom.header.rightBlocker);
			this.dom.header.leftBlocker = adjustBlocker('left', 'top', this.dom.header.leftBlocker);
			this.dom.footer.rightBlocker = adjustBlocker('right', 'bottom', this.dom.footer.rightBlocker);
			this.dom.footer.leftBlocker = adjustBlocker('left', 'bottom', this.dom.footer.leftBlocker);
		}
	},

	/**
	 * Function to check if scrolling is enabled on the table or not
	 * @returns Boolean value indicating if scrolling on the table is enabled or not
	 */
	_scrollEnabled: function() {
		var oScroll = this.s.dt.settings()[0].oScroll;
		if(oScroll.sY !== "" || oScroll.sX !== "") {
			return true;
		}
		return false
	}
} );


/**
 * Version
 * @type {String}
 * @static
 */
FixedHeader.version = "3.2.0";

/**
 * Defaults
 * @type {Object}
 * @static
 */
FixedHeader.defaults = {
	header: true,
	footer: false,
	headerOffset: 0,
	footerOffset: 0
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
$.fn.dataTable.FixedHeader = FixedHeader;
$.fn.DataTable.FixedHeader = FixedHeader;


// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
$(document).on( 'init.dt.dtfh', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var init = settings.oInit.fixedHeader;
	var defaults = DataTable.defaults.fixedHeader;

	if ( (init || defaults) && ! settings._fixedHeader ) {
		var opts = $.extend( {}, defaults, init );

		if ( init !== false ) {
			new FixedHeader( settings, opts );
		}
	}
} );

// DataTables API methods
DataTable.Api.register( 'fixedHeader()', function () {} );

DataTable.Api.register( 'fixedHeader.adjust()', function () {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		if ( fh ) {
			fh.update();
		}
	} );
} );

DataTable.Api.register( 'fixedHeader.enable()', function ( flag ) {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		flag = ( flag !== undefined ? flag : true );
		if ( fh && flag !== fh.enabled() ) {
			fh.enable( flag );
		}
	} );
} );

DataTable.Api.register( 'fixedHeader.enabled()', function () {
	if ( this.context.length ) {
		var fh = this.context[0]._fixedHeader;

		if ( fh ) {
			return fh.enabled();
		}
	}

	return false;
} );

DataTable.Api.register( 'fixedHeader.disable()', function ( ) {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		if ( fh && fh.enabled() ) {
			fh.enable( false );
		}
	} );
} );

$.each( ['header', 'footer'], function ( i, el ) {
	DataTable.Api.register( 'fixedHeader.'+el+'Offset()', function ( offset ) {
		var ctx = this.context;

		if ( offset === undefined ) {
			return ctx.length && ctx[0]._fixedHeader ?
				ctx[0]._fixedHeader[el +'Offset']() :
				undefined;
		}

		return this.iterator( 'table', function ( ctx ) {
			var fh = ctx._fixedHeader;

			if ( fh ) {
				fh[ el +'Offset' ]( offset );
			}
		} );
	} );
} );


return FixedHeader;
}));
