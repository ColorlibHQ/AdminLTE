/*! Bootstrap 4 ui integration for DataTables' SearchBuilder
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-searchbuilder'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-bs4')(root, $);
			}

			if ( ! $.fn.dataTable.SearchBuilder ) {
				require('datatables.net-searchbuilder')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


$.extend(true, DataTable.SearchBuilder.classes, {
    clearAll: 'btn btn-light dtsb-clearAll'
});
$.extend(true, DataTable.Group.classes, {
    add: 'btn btn-light dtsb-add',
    clearGroup: 'btn btn-light dtsb-clearGroup',
    logic: 'btn btn-light dtsb-logic'
});
$.extend(true, DataTable.Criteria.classes, {
    condition: 'form-control dtsb-condition',
    data: 'form-control dtsb-data',
    "delete": 'btn btn-light dtsb-delete',
    left: 'btn btn-light dtsb-left',
    right: 'btn btn-light dtsb-right',
    value: 'form-control dtsb-value'
});


return DataTable;
}));
