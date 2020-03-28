/*!
 Bootstrap integration for DataTables' Responsive
 ©2015-2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-se","datatables.net-responsive"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-se")(a,b).$;b.fn.dataTable.Responsive||require("datatables.net-responsive")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){var a=c.fn.dataTable,b=a.Responsive.display,g=b.modal,d=c('<div class="ui modal" role="dialog"><div class="header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="content"/></div>');
b.modal=function(a){return function(b,e,f){c.fn.modal?e||(a&&a.header&&d.find("div.header").empty().append('<h4 class="title">'+a.header(b)+"</h4>"),d.find("div.content").empty().append(f()),d.appendTo("body").modal("show")):g(b,e,f)}};return a.Responsive});
