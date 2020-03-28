/*
 Highstock JS v7.2.0 (2019-09-03)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/full-screen",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,b,c){a.hasOwnProperty(d)||(a[d]=c.apply(null,b))}a=a?a._modules:{};c(a,"modules/full-screen.src.js",[a["parts/Globals.js"]],function(a){(a.FullScreen=function(a){this.init(a.parentNode)}).prototype=
{init:function(a){var b;a.requestFullscreen?b=a.requestFullscreen():a.mozRequestFullScreen?b=a.mozRequestFullScreen():a.webkitRequestFullscreen?b=a.webkitRequestFullscreen():a.msRequestFullscreen&&(b=a.msRequestFullscreen());if(b)b["catch"](function(){alert("Full screen is not supported inside a frame")})}}});c(a,"masters/modules/full-screen.src.js",[],function(){})});
//# sourceMappingURL=full-screen.js.map