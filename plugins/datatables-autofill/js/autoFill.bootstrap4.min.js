/*!
 Bootstrap integration for DataTables' AutoFill
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-autofill"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,c){a||(a=window);c&&c.fn.dataTable||(c=require("datatables.net-bs4")(a,c).$);c.fn.dataTable.AutoFill||require("datatables.net-autofill")(a,c);return b(c,a,a.document)}:b(jQuery,window,document)})(function(b,a,c,d){b=b.fn.dataTable;b.AutoFill.classes.btn="btn btn-primary";return b});
