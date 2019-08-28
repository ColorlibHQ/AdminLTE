/*!
 Bootstrap 4 styling wrapper for ColReorder
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-colreorder"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-bs4")(a,b).$;b.fn.dataTable.ColReorder||require("datatables.net-colreorder")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){return c.fn.dataTable});
