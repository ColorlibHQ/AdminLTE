/*!
* bindings/inputmask.binding.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.7
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "../inputmask", "../global/document" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery"), require("../inputmask"), require("../global/document")) : factory(jQuery, window.Inputmask, document);
}(function($, Inputmask, document) {
    $(document).ajaxComplete(function(event, xmlHttpRequest, ajaxOptions) {
        -1 !== $.inArray("html", ajaxOptions.dataTypes) && $(".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias]").each(function(ndx, lmnt) {
            void 0 === lmnt.inputmask && Inputmask().mask(lmnt);
        });
    }).ready(function() {
        $(".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias]").each(function(ndx, lmnt) {
            void 0 === lmnt.inputmask && Inputmask().mask(lmnt);
        });
    });
});