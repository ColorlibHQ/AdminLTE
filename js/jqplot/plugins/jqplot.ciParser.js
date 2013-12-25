/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.8
 * Revision: 1250
 *
 * Copyright (c) 2009-2013 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot dot com or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */
(function($) {
    /**
     * Class: $.jqplot.ciParser
     * Data Renderer function which converts a custom JSON data object into jqPlot data format.
     * Set this as a callable on the jqplot dataRenderer plot option:
     * 
     * > plot = $.jqplot('mychart', [data], { dataRenderer: $.jqplot.ciParser, ... });
     * 
     * Where data is an object in JSON format or a JSON encoded string conforming to the
     * City Index API spec.
     * 
     * Note that calling the renderer function is handled internally by jqPlot.  The
     * user does not have to call the function.  The parameters described below will
     * automatically be passed to the ciParser function.
     * 
     * Parameters:
     * data - JSON encoded string or object.
     * plot - reference to jqPlot Plot object.
     * 
     * Returns:
     * data array in jqPlot format.
     * 
     */
    $.jqplot.ciParser = function (data, plot) {
        var ret = [],
            line,
            temp,
            i, j, k, kk;
    
         if (typeof(data) == "string") {
             data =  $.jqplot.JSON.parse(data, handleStrings);
         }
 
         else if (typeof(data) == "object") {
             for (k in data) {
                 for (i=0; i<data[k].length; i++) {
                     for (kk in data[k][i]) {
                         data[k][i][kk] = handleStrings(kk, data[k][i][kk]);
                     }
                 }
             }
         }
 
         else {
             return null;
         }
 
         // function handleStrings
         // Checks any JSON encoded strings to see if they are
         // encoded dates.  If so, pull out the timestamp.
         // Expects dates to be represented by js timestamps.
 
         function handleStrings(key, value) {
            var a;
            if (value != null) {
                if (value.toString().indexOf('Date') >= 0) {
                    //here we will try to extract the ticks from the Date string in the "value" fields of JSON returned data
                    a = /^\/Date\((-?[0-9]+)\)\/$/.exec(value);
                    if (a) {
                        return parseInt(a[1], 10);
                    }
                }
                return value;
            }
         }
 
        for (var prop in data) {
            line = [];
            temp = data[prop];
            switch (prop) {
                case "PriceTicks":
                    for (i=0; i<temp.length; i++) {
                        line.push([temp[i]['TickDate'], temp[i]['Price']]);
                    }
                    break;
                case "PriceBars":
                    for (i=0; i<temp.length; i++) {
                        line.push([temp[i]['BarDate'], temp[i]['Open'], temp[i]['High'], temp[i]['Low'], temp[i]['Close']]);
                    }
                    break;
            }
            ret.push(line);
        }
        return ret;
    };
})(jQuery);