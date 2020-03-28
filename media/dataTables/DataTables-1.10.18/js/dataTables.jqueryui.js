/*! DataTables jQuery UI integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for jQuery UI. This requires jQuery UI and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using jQuery UI. See http://datatables.net/manual/styling/jqueryui
 * for further information.
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


var sort_prefix = 'css_right ui-icon ui-icon-';
var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';

/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		'<"'+toolbar_prefix+'tl ui-corner-tr"lfr>'+
		't'+
		'<"'+toolbar_prefix+'bl ui-corner-br"ip>',
	renderer: 'jqueryui'
} );


$.extend( DataTable.ext.classes, {
	"sWrapper":            "dataTables_wrapper dt-jqueryui",

	/* Full numbers paging buttons */
	"sPageButton":         "fg-button ui-button ui-state-default",
	"sPageButtonActive":   "ui-state-disabled",
	"sPageButtonDisabled": "ui-state-disabled",

	/* Features */
	"sPaging": "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi "+
		"ui-buttonset-multi paging_", /* Note that the type is postfixed */

	/* Sorting */
	"sSortAsc":            "ui-state-default sorting_asc",
	"sSortDesc":           "ui-state-default sorting_desc",
	"sSortable":           "ui-state-default sorting",
	"sSortableAsc":        "ui-state-default sorting_asc_disabled",
	"sSortableDesc":       "ui-state-default sorting_desc_disabled",
	"sSortableNone":       "ui-state-default sorting_disabled",
	"sSortIcon":           "DataTables_sort_icon",

	/* Scrolling */
	"sScrollHead": "dataTables_scrollHead "+"ui-state-default",
	"sScrollFoot": "dataTables_scrollFoot "+"ui-state-default",

	/* Misc */
	"sHeaderTH":  "ui-state-default",
	"sFooterTH":  "ui-state-default"
} );


DataTable.ext.renderer.header.jqueryui = function ( settings, cell, column, classes ) {
	// Calculate what the unsorted class should be
	var noSortAppliedClass = sort_prefix+'caret-2-n-s';
	var asc = $.inArray('asc', column.asSorting) !== -1;
	var desc = $.inArray('desc', column.asSorting) !== -1;

	if ( !column.bSortable || (!asc && !desc) ) {
		noSortAppliedClass = '';
	}
	else if ( asc && !desc ) {
		noSortAppliedClass = sort_prefix+'caret-1-n';
	}
	else if ( !asc && desc ) {
		noSortAppliedClass = sort_prefix+'caret-1-s';
	}

	// Setup the DOM structure
	$('<div/>')
		.addClass( 'DataTables_sort_wrapper' )
		.append( cell.contents() )
		.append( $('<span/>')
			.addClass( classes.sSortIcon+' '+noSortAppliedClass )
		)
		.appendTo( cell );

	// Attach a sort listener to update on sort
	$(settings.nTable).on( 'order.dt', function ( e, ctx, sorting, columns ) {
		if ( settings !== ctx ) {
			return;
		}

		var colIdx = column.idx;

		cell
			.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
			.addClass( columns[ colIdx ] == 'asc' ?
				classes.sSortAsc : columns[ colIdx ] == 'desc' ?
					classes.sSortDesc :
					column.sSortingClass
			);

		cell
			.find( 'span.'+classes.sSortIcon )
			.removeClass(
				sort_prefix+'triangle-1-n' +" "+
				sort_prefix+'triangle-1-s' +" "+
				sort_prefix+'caret-2-n-s' +" "+
				sort_prefix+'caret-1-n' +" "+
				sort_prefix+'caret-1-s'
			)
			.addClass( columns[ colIdx ] == 'asc' ?
				sort_prefix+'triangle-1-n' : columns[ colIdx ] == 'desc' ?
					sort_prefix+'triangle-1-s' :
					noSortAppliedClass
			);
	} );
};


/*
 * TableTools jQuery UI compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT_container ui-buttonset ui-buttonset-multi",
		"buttons": {
			"normal": "DTTT_button ui-button ui-state-default"
		},
		"collection": {
			"container": "DTTT_collection ui-buttonset ui-buttonset-multi"
		}
	} );
}


return DataTable;
}));
