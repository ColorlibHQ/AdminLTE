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
     * Class: $.jqplot.Trendline
     * Plugin which will automatically compute and draw trendlines for plotted data.
     */
    $.jqplot.Trendline = function() {
        // Group: Properties
        
        // prop: show
        // Wether or not to show the trend line.
        this.show = $.jqplot.config.enablePlugins;
        // prop: color
        // CSS color spec for the trend line.
        // By default this wil be the same color as the primary line.
        this.color = '#666666';
        // prop: renderer
        // Renderer to use to draw the trend line.
        // The data series that is plotted may not be rendered as a line.
        // Therefore, we use our own line renderer here to draw a trend line.
        this.renderer = new $.jqplot.LineRenderer();
        // prop: rendererOptions
        // Options to pass to the line renderer.
        // By default, markers are not shown on trend lines.
        this.rendererOptions = {marker:{show:false}};
        // prop: label
        // Label for the trend line to use in the legend.
        this.label = '';
        // prop: type
        // Either 'exponential', 'exp', or 'linear'.
        this.type = 'linear';
        // prop: shadow
        // true or false, whether or not to show the shadow.
        this.shadow = true;
        // prop: markerRenderer
        // Renderer to use to draw markers on the line.
        // I think this is wrong.
        this.markerRenderer = {show:false};
        // prop: lineWidth
        // Width of the trend line.
        this.lineWidth = 1.5;
        // prop: shadowAngle
        // Angle of the shadow on the trend line.
        this.shadowAngle = 45;
        // prop: shadowOffset
        // pixel offset for each stroke of the shadow.
        this.shadowOffset = 1.0;
        // prop: shadowAlpha
        // Alpha transparency of the shadow.
        this.shadowAlpha = 0.07;
        // prop: shadowDepth
        // number of strokes to make of the shadow.
        this.shadowDepth = 3;
        this.isTrendline = true;
        
    };
    
    $.jqplot.postSeriesInitHooks.push(parseTrendLineOptions);
    $.jqplot.postDrawSeriesHooks.push(drawTrendline);
    $.jqplot.addLegendRowHooks.push(addTrendlineLegend);
    
    // called witin scope of the legend object
    // current series passed in
    // must return null or an object {label:label, color:color}
    function addTrendlineLegend(series) {
        var ret = null;
        if (series.trendline && series.trendline.show) {
            var lt = series.trendline.label.toString();
            if (lt) {
                ret = {label:lt, color:series.trendline.color};
            }
        }
        return ret;
    }

    // called within scope of a series
    function parseTrendLineOptions (target, data, seriesDefaults, options, plot) {
        if (this._type && (this._type === 'line' || this._type == 'bar')) {
            this.trendline = new $.jqplot.Trendline();
            options = options || {};
            $.extend(true, this.trendline, {color:this.color}, seriesDefaults.trendline, options.trendline);
            this.trendline.renderer.init.call(this.trendline, null);
        }
    }
    
    // called within scope of series object
    function drawTrendline(sctx, options) {
        // if we have options, merge trendline options in with precedence
        options = $.extend(true, {}, this.trendline, options);

        if (this.trendline && options.show) {
            var fit;
            // this.renderer.setGridData.call(this);
            var data = options.data || this.data;
            fit = fitData(data, this.trendline.type);
            var gridData = options.gridData || this.renderer.makeGridData.call(this, fit.data);
            this.trendline.renderer.draw.call(this.trendline, sctx, gridData, {showLine:true, shadow:this.trendline.shadow});
        }
    }
    
    function regression(x, y, typ)  {
        var type = (typ == null) ? 'linear' : typ;
        var N = x.length;
        var slope;
        var intercept;  
        var SX = 0;
        var SY = 0;
        var SXX = 0;
        var SXY = 0;
        var SYY = 0;
        var Y = [];
        var X = [];
    
        if (type == 'linear') {
            X = x;
            Y = y;
        }
        else if (type == 'exp' || type == 'exponential') {
            for ( var i=0; i<y.length; i++) {
                // ignore points <= 0, log undefined.
                if (y[i] <= 0) {
                    N--;
                }
                else {
                    X.push(x[i]);
                    Y.push(Math.log(y[i]));
                }
            }
        }

        for ( var i = 0; i < N; i++) {
            SX = SX + X[i];
            SY = SY + Y[i];
            SXY = SXY + X[i]* Y[i];
            SXX = SXX + X[i]* X[i];
            SYY = SYY + Y[i]* Y[i];
        }

        slope = (N*SXY - SX*SY)/(N*SXX - SX*SX);
        intercept = (SY - slope*SX)/N;

        return [slope, intercept];
    }

    function linearRegression(X,Y) {
        var ret;
        ret = regression(X,Y,'linear');
        return [ret[0],ret[1]];
    }

    function expRegression(X,Y) {
        var ret;
        var x = X;
        var y = Y;
        ret = regression(x, y,'exp');
        var base = Math.exp(ret[0]);
        var coeff = Math.exp(ret[1]);
        return [base, coeff];
    }

    function fitData(data, typ) {
        var type = (typ == null) ?  'linear' : typ;
        var ret;
        var res;
        var x = [];
        var y = [];
        var ypred = [];
        
        for (i=0; i<data.length; i++){
            if (data[i] != null && data[i][0] != null && data[i][1] != null) {
                x.push(data[i][0]);
                y.push(data[i][1]);
            }
        }
        
        if (type == 'linear') {
            ret = linearRegression(x,y);
            for ( var i=0; i<x.length; i++){
                res = ret[0]*x[i] + ret[1];
                ypred.push([x[i], res]);
            }
        }
        else if (type == 'exp' || type == 'exponential') {
            ret = expRegression(x,y);
            for ( var i=0; i<x.length; i++){
                res = ret[1]*Math.pow(ret[0],x[i]);
                ypred.push([x[i], res]);
            }
        }
        return {data: ypred, slope: ret[0], intercept: ret[1]};
    } 

})(jQuery);