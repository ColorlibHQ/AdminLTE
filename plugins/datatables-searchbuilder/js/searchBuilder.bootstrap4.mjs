/*! Bootstrap 4 ui integration for DataTables' SearchBuilder
 * © SpryMedia Ltd - datatables.net/license
 */

import $ from 'jquery';
import DataTable from 'datatables.net-bs4';
import SearchBuilder from 'datatables.net-searchbuilder';

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


export default DataTable;
