/*! Bootstrap 4 integration for DataTables' Responsive
 * ©2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-responsive'], function ( $ ) {
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
				$ = require('datatables.net-bs4')(root, $).$;
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
var _modal = $(
	'<div class="modal fade dtr-bs-modal" role="dialog">'+
		'<div class="modal-dialog" role="document">'+
			'<div class="modal-content">'+
				'<div class="modal-header">'+
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
				'</div>'+
				'<div class="modal-body"/>'+
			'</div>'+
		'</div>'+
	'</div>'
);

_display.modal = function ( options ) {
	return function ( row, update, render ) {
		if ( ! $.fn.modal ) {
			_original( row, update, render );
		}
		else {
			if ( ! update ) {
				if ( options && options.header ) {
					var header = _modal.find('div.modal-header');
					var button = header.find('button').detach();
					
					header
						.empty()
						.append( '<h4 class="modal-title">'+options.header( row )+'</h4>' )
						.append( button );
				}

				_modal.find( 'div.modal-body' )
					.empty()
					.append( render() );

				_modal
					.appendTo( 'body' )
					.modal();
			}
		}
	};
};


return DataTable.Responsive;
}));
