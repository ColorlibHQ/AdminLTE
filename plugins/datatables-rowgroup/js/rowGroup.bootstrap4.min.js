/*!
 Bootstrap 4 styling wrapper for RowGroup
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-rowgroup"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);b&&b.fn.dataTable||(b=require("datatables.net-bs4")(a,b).$);b.fn.dataTable.RowGroup||require("datatables.net-rowgroup")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c,a,b,d){return c.fn.dataTable});
