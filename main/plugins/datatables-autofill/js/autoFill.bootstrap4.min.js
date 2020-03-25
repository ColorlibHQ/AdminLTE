/*!
 Bootstrap integration for DataTables' AutoFill
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-autofill"],function(b){return a(b,window,document)}):"object"===typeof exports?module.exports=function(b,c){b||(b=window);if(!c||!c.fn.dataTable)c=require("datatables.net-bs4")(b,c).$;c.fn.dataTable.AutoFill||require("datatables.net-autofill")(b,c);return a(c,b,b.document)}:a(jQuery,window,document)})(function(a){a=a.fn.dataTable;a.AutoFill.classes.btn="btn btn-primary";return a});
