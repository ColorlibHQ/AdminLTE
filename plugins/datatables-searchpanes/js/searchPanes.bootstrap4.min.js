/*!
 Bootstrap integration for DataTables' SearchPanes
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-searchpanes"],function(a){return b(a)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net-bs4")(a,c).$);c.fn.dataTable.SearchPanes||require("datatables.net-searchpanes")(a,c);return b(c)}:b(jQuery)})(function(b){var a=b.fn.dataTable;b.extend(!0,a.SearchPane.classes,{buttonGroup:"btn-group",disabledButton:"disabled",narrow:"col",
pane:{container:"table"},paneButton:"btn btn-light",pill:"pill badge badge-pill badge-secondary",search:"form-control search",searchCont:"input-group",searchLabelCont:"input-group-append",subRow1:"dtsp-subRow1",subRow2:"dtsp-subRow2",table:"table table-sm table-borderless",topRow:"dtsp-topRow"});b.extend(!0,a.SearchPanes.classes,{clearAll:"dtsp-clearAll btn btn-light",collapseAll:"dtsp-collapseAll btn btn-light",container:"dtsp-searchPanes",disabledButton:"disabled",panes:"dtsp-panes dtsp-panesContainer",
showAll:"dtsp-showAll btn btn-light",title:"dtsp-title",titleRow:"dtsp-titleRow"});return a.searchPanes});
