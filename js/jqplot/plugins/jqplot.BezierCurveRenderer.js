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
    // Class: $.jqplot.BezierCurveRenderer.js
    // Renderer which draws lines as stacked bezier curves.
    // Data for the line will not be specified as an array of
    // [x, y] data point values, but as a an array of [start piont, bezier curve]
    // So, the line is specified as: [[xstart, ystart], [cp1x, cp1y, cp2x, cp2y, xend, yend]].
    $.jqplot.BezierCurveRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.BezierCurveRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.BezierCurveRenderer.prototype.constructor = $.jqplot.BezierCurveRenderer;

    
    // Method: setGridData
    // converts the user data values to grid coordinates and stores them
    // in the gridData array.
    // Called with scope of a series.
    $.jqplot.BezierCurveRenderer.prototype.setGridData = function(plot) {
        // recalculate the grid data
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        // this._plotData should be same as this.data
        var data = this.data;
        this.gridData = [];
        this._prevGridData = [];
        // if seriesIndex = 0, fill to x axis.
        // if seriesIndex > 0, fill to previous series data.
        var idx = this.index;
        if (data.length == 2) {
            if (idx == 0) {
                this.gridData = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[1][2]), yp.call(this._yaxis, data[1][3]),  
                        xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, data[1][5])],
                    [xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, this._yaxis.min)],
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, this._yaxis.min)]
                ];
            }
            else {
                var psd = plot.series[idx-1].data;
                this.gridData = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[1][2]), yp.call(this._yaxis, data[1][3]),  
                        xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, data[1][5])],
                    [xp.call(this._xaxis, psd[1][4]), yp.call(this._yaxis, psd[1][5])],
                    [xp.call(this._xaxis, psd[1][2]), yp.call(this._yaxis, psd[1][3]), 
                        xp.call(this._xaxis, psd[1][0]), yp.call(this._yaxis, psd[1][1]),  
                        xp.call(this._xaxis, psd[0][0]), yp.call(this._yaxis, psd[0][1])]
                ];
            }
        }
        else {
            if (idx == 0) {
                this.gridData = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[2][0]), yp.call(this._yaxis, data[2][1]),  
                        xp.call(this._xaxis, data[3][0]), yp.call(this._yaxis, data[3][1])],
                    [xp.call(this._xaxis, data[3][1]), yp.call(this._yaxis, this._yaxis.min)],
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, this._yaxis.min)]
                ];
            }
            else {
                var psd = plot.series[idx-1].data;
                this.gridData = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[2][0]), yp.call(this._yaxis, data[2][1]),  
                        xp.call(this._xaxis, data[3][0]), yp.call(this._yaxis, data[3][1])],
                    [xp.call(this._xaxis, psd[3][0]), yp.call(this._yaxis, psd[3][1])],
                    [xp.call(this._xaxis, psd[2][0]), yp.call(this._yaxis, psd[2][1]), 
                        xp.call(this._xaxis, psd[1][0]), yp.call(this._yaxis, psd[1][1]),  
                        xp.call(this._xaxis, psd[0][0]), yp.call(this._yaxis, psd[0][1])]
                ];
            }
        }
    };
    
    // Method: makeGridData
    // converts any arbitrary data values to grid coordinates and
    // returns them.  This method exists so that plugins can use a series'
    // linerenderer to generate grid data points without overwriting the
    // grid data associated with that series.
    // Called with scope of a series.
    $.jqplot.BezierCurveRenderer.prototype.makeGridData = function(data, plot) {
        // recalculate the grid data
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var gd = [];
        var pgd = [];
        // if seriesIndex = 0, fill to x axis.
        // if seriesIndex > 0, fill to previous series data.
        var idx = this.index;
        if (data.length == 2) {
            if (idx == 0) {
                gd = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[1][2]), yp.call(this._yaxis, data[1][3]),  
                        xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, data[1][5])],
                    [xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, this._yaxis.min)],
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, this._yaxis.min)]
                ];
            }
            else {
                var psd = plot.series[idx-1].data;
                gd = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[1][2]), yp.call(this._yaxis, data[1][3]),  
                        xp.call(this._xaxis, data[1][4]), yp.call(this._yaxis, data[1][5])],
                    [xp.call(this._xaxis, psd[1][4]), yp.call(this._yaxis, psd[1][5])],
                    [xp.call(this._xaxis, psd[1][2]), yp.call(this._yaxis, psd[1][3]), 
                        xp.call(this._xaxis, psd[1][0]), yp.call(this._yaxis, psd[1][1]),  
                        xp.call(this._xaxis, psd[0][0]), yp.call(this._yaxis, psd[0][1])]
                ];
            }
        }
        else {
            if (idx == 0) {
                gd = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[2][0]), yp.call(this._yaxis, data[2][1]),  
                        xp.call(this._xaxis, data[3][0]), yp.call(this._yaxis, data[3][1])],
                    [xp.call(this._xaxis, data[3][1]), yp.call(this._yaxis, this._yaxis.min)],
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, this._yaxis.min)]
                ];
            }
            else {
                var psd = plot.series[idx-1].data;
                gd = [
                    [xp.call(this._xaxis, data[0][0]), yp.call(this._yaxis, data[0][1])], 
                    [xp.call(this._xaxis, data[1][0]), yp.call(this._yaxis, data[1][1]), 
                        xp.call(this._xaxis, data[2][0]), yp.call(this._yaxis, data[2][1]),  
                        xp.call(this._xaxis, data[3][0]), yp.call(this._yaxis, data[3][1])],
                    [xp.call(this._xaxis, psd[3][0]), yp.call(this._yaxis, psd[3][1])],
                    [xp.call(this._xaxis, psd[2][0]), yp.call(this._yaxis, psd[2][1]), 
                        xp.call(this._xaxis, psd[1][0]), yp.call(this._yaxis, psd[1][1]),  
                        xp.call(this._xaxis, psd[0][0]), yp.call(this._yaxis, psd[0][1])]
                ];
            }
        }
        return gd;
    };
    

    // called within scope of series.
    $.jqplot.BezierCurveRenderer.prototype.draw = function(ctx, gd, options) {
        var i;
        ctx.save();
        if (gd.length) {
            if (this.showLine) {
                ctx.save();
                var opts = (options != null) ? options : {};
                ctx.fillStyle = opts.fillStyle || this.color;
                ctx.beginPath();
                ctx.moveTo(gd[0][0], gd[0][1]);
                ctx.bezierCurveTo(gd[1][0], gd[1][1], gd[1][2], gd[1][3], gd[1][4], gd[1][5]);
                ctx.lineTo(gd[2][0], gd[2][1]);
                if (gd[3].length == 2) {
                    ctx.lineTo(gd[3][0], gd[3][1]);
                }
                else {
                    ctx.bezierCurveTo(gd[3][0], gd[3][1], gd[3][2], gd[3][3], gd[3][4], gd[3][5]);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }
        
        ctx.restore();
    };  
    
    $.jqplot.BezierCurveRenderer.prototype.drawShadow = function(ctx, gd, options) {
        // This is a no-op, shadows drawn with lines.
    };
    
    $.jqplot.BezierAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.BezierAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.BezierAxisRenderer.prototype.constructor = $.jqplot.BezierAxisRenderer;
        
    
    // Axes on a plot with Bezier Curves
    $.jqplot.BezierAxisRenderer.prototype.init = function(options){
        $.extend(true, this, options);
        var db = this._dataBounds;
        // Go through all the series attached to this axis and find
        // the min/max bounds for this axis.
        for (var i=0; i<this._series.length; i++) {
            var s = this._series[i];
            var d = s.data;  
            if (d.length == 4) {
                for (var j=0; j<d.length; j++) { 
                    if (this.name == 'xaxis' || this.name == 'x2axis') {
                        if (d[j][0] < db.min || db.min == null) {
                            db.min = d[j][0];
                        }
                        if (d[j][0] > db.max || db.max == null) {
                            db.max = d[j][0];
                        }
                    }              
                    else {
                        if (d[j][1] < db.min || db.min == null) {
                            db.min = d[j][1];
                        }
                        if (d[j][1] > db.max || db.max == null) {
                            db.max = d[j][1];
                        }
                    }              
                }
            }          
            else {    
                if (this.name == 'xaxis' || this.name == 'x2axis') {
                    if (d[0][0] < db.min || db.min == null) {
                        db.min = d[0][0];
                    }
                    if (d[0][0] > db.max || db.max == null) {
                        db.max = d[0][0];
                    }
                    for (var j=0; j<5; j+=2) {
                        if (d[1][j] < db.min || db.min == null) {
                            db.min = d[1][j];
                        }
                        if (d[1][j] > db.max || db.max == null) {
                            db.max = d[1][j];
                        }
                    }
                }              
                else {
                    if (d[0][1] < db.min || db.min == null) {
                        db.min = d[0][1];
                    }
                    if (d[0][1] > db.max || db.max == null) {
                        db.max = d[0][1];
                    }
                    for (var j=1; j<6; j+=2) {
                        if (d[1][j] < db.min || db.min == null) {
                            db.min = d[1][j];
                        }
                        if (d[1][j] > db.max || db.max == null) {
                            db.max = d[1][j];
                        }
                    }
                }           
            }
        }
    };
    
    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = $.extend(true, {pad:0}, options.axesDefaults);
        options.seriesDefaults = options.seriesDefaults || {};
        options.legend = $.extend(true, {placement:'outside'}, options.legend);
        // only set these if there is a pie series
        var setopts = false;
        if (options.seriesDefaults.renderer == $.jqplot.BezierCurveRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer == $.jqplot.BezierCurveRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.BezierAxisRenderer;
        }
    }
    
    $.jqplot.preInitHooks.push(preInit);
    
})(jQuery);    