/*! jQuery Validation Plugin - v1.19.5 - 7/1/2022
 * https://jqueryvalidation.org/
 * Copyright (c) 2022 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.methods,{date:function(a,b){return this.optional(b)||/^\d\d?[\.\/\-]\d\d?[\.\/\-]\d\d\d?\d?$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(a)}}),a});