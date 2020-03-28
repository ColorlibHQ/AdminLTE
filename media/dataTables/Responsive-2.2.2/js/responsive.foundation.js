/*! Foundation integration for DataTables' Responsive
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-zf', 'datatables.net-responsive'], function ( $ ) {
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
				$ = require('datatables.net-zf')(root, $).$;
			}

			if ( ! $.fn.dataTable.Responsive ) {
				require('datatables.net-responsive')(root, $);
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


var _display = DataTable.Responsive.display;
var _original = _display.modal;

_display.modal = function ( options ) {
	return function ( row, update, render ) {
		if ( ! $.fn.foundation ) {
			_original( row, update, render );
		}
		else {
			if ( ! update ) {
				$( '<div class="reveal-modal" data-reveal/>' )
					.append( '<a class="close-reveal-modal" aria-label="Close">&#215;</a>' )
					.append( options && options.header ? '<h4>'+options.header( row )+'</h4>' : null )
					.append( render() )
					.appendTo( 'body' )
					.foundation( 'reveal', 'open' );
			}
		}
	};
};


return DataTable.Responsive;
}));
