/*!
 jQuery UI integration for DataTables' Responsive
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-jqui","datatables.net-responsive"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-jqui")(a,b).$;b.fn.dataTable.Responsive||require("datatables.net-responsive")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){var a=c.fn.dataTable,b=a.Responsive.display,f=b.modal;b.modal=function(a){return function(b,
d,e){c.fn.dialog?d||c("<div/>").append(e()).appendTo("body").dialog(c.extend(!0,{title:a&&a.header?a.header(b):"",width:500},a.dialog)):f(b,d,e)}};return a.Responsive});
