/*!
 Foundation integration for DataTables' Responsive
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-zf","datatables.net-responsive"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-zf")(a,b).$;b.fn.dataTable.Responsive||require("datatables.net-responsive")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){var a=c.fn.dataTable,b=a.Responsive.display,f=b.modal;b.modal=function(a){return function(b,
d,e){c.fn.foundation?d||c('<div class="reveal-modal" data-reveal/>').append('<a class="close-reveal-modal" aria-label="Close">&#215;</a>').append(a&&a.header?"<h4>"+a.header(b)+"</h4>":null).append(e()).appendTo("body").foundation("reveal","open"):f(b,d,e)}};return a.Responsive});
