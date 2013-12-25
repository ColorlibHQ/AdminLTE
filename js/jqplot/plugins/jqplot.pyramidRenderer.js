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

    // Need to ensure pyramid axis and grid renderers are loaded.
    // You should load these with script tags in the html head, that is more efficient
    // as the browser will cache the request.
    // Note, have to block with synchronous request in order to execute bar renderer code.
    if ($.jqplot.PyramidAxisRenderer === undefined) {
        $.ajax({
            url: $.jqplot.pluginLocation + 'jqplot.pyramidAxisRenderer.js',
            dataType: "script",
            async: false
        });
    }
    
    if ($.jqplot.PyramidGridRenderer === undefined) {
        $.ajax({
            url: $.jqplot.pluginLocation + 'jqplot.pyramidGridRenderer.js',
            dataType: "script",
            async: false
        });
    }

    $.jqplot.PyramidRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.PyramidRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.PyramidRenderer.prototype.constructor = $.jqplot.PyramidRenderer;
    
    // called with scope of a series
    $.jqplot.PyramidRenderer.prototype.init = function(options, plot) {
        options = options || {};
        this._type = 'pyramid';
        // Group: Properties
        //
        // prop: barPadding
        this.barPadding = 10;
        this.barWidth = null;
        // prop: fill
        // True to fill the bars.
        this.fill = true;
        // prop: highlightMouseOver
        // True to highlight slice when moused over.
        // This must be false to enable highlightMouseDown to highlight when clicking on a slice.
        this.highlightMouseOver = true;
        // prop: highlightMouseDown
        // True to highlight when a mouse button is pressed over a slice.
        // This will be disabled if highlightMouseOver is true.
        this.highlightMouseDown = false;
        // prop: highlightColors
        // an array of colors to use when highlighting a slice.
        this.highlightColors = [];
        // prop highlightThreshold
        // Expand the highlightable region in the x direction.
        // E.g. a value of 3 will highlight a bar when the mouse is
        // within 3 pixels of the bar in the x direction.
        this.highlightThreshold = 2;
        // prop: synchronizeHighlight
        // Index of another series to highlight when this series is highlighted.
        // null or false to not synchronize.
        this.synchronizeHighlight = false;
        // prop: offsetBars
        // False will center bars on their y value.
        // True will push bars up by 1/2 bar width to fill between their y values.
        // If true, there needs to be 1 more tick than there are bars.
        this.offsetBars = false;
        
        // if user has passed in highlightMouseDown option and not set highlightMouseOver, disable highlightMouseOver
        if (options.highlightMouseDown && options.highlightMouseOver == null) {
            options.highlightMouseOver = false;
        }

        this.side = 'right';
        
        $.extend(true, this, options);

        // if (this.fill === false) {
        //     this.shadow = false;
        // }

        if (this.side === 'left') {
            this._highlightThreshold = [[-this.highlightThreshold, 0], [-this.highlightThreshold, 0], [0,0], [0,0]];
        }

        else {
            this._highlightThreshold = [[0,0], [0,0], [this.highlightThreshold, 0], [this.highlightThreshold, 0]];
        }
        
        this.renderer.options = options;
        // index of the currenty highlighted point, if any
        this._highlightedPoint = null;
        // Array of actual data colors used for each data point.
        this._dataColors = [];
        this._barPoints = [];
        this.fillAxis = 'y';
        this._primaryAxis = '_yaxis';
        this._xnudge = 0;
        
        // set the shape renderer options
        var opts = {lineJoin:'miter', lineCap:'butt', fill:this.fill, fillRect:this.fill, isarc:false, strokeStyle:this.color, fillStyle:this.color, closePath:this.fill, lineWidth: this.lineWidth};
        this.renderer.shapeRenderer.init(opts);
        // set the shadow renderer options
        var shadow_offset = options.shadowOffset;
        // set the shadow renderer options
        if (shadow_offset == null) {
            // scale the shadowOffset to the width of the line.
            if (this.lineWidth > 2.5) {
                shadow_offset = 1.25 * (1 + (Math.atan((this.lineWidth/2.5))/0.785398163 - 1)*0.6);
                // var shadow_offset = this.shadowOffset;
            }
            // for skinny lines, don't make such a big shadow.
            else {
                shadow_offset = 1.25 * Math.atan((this.lineWidth/2.5))/0.785398163;
            }
        }
        var sopts = {lineJoin:'miter', lineCap:'butt', fill:this.fill, fillRect:this.fill, isarc:false, angle:this.shadowAngle, offset:shadow_offset, alpha:this.shadowAlpha, depth:this.shadowDepth, closePath:this.fill, lineWidth: this.lineWidth};
        this.renderer.shadowRenderer.init(sopts);

        plot.postDrawHooks.addOnce(postPlotDraw);
        plot.eventListenerHooks.addOnce('jqplotMouseMove', handleMove);

        // if this is the left side of pyramid, set y values to negative.
        if (this.side === 'left') {
            for (var i=0, l=this.data.length; i<l; i++) {
                this.data[i][1] = -Math.abs(this.data[i][1]);
            }
        }
    };
    
    // setGridData
    // converts the user data values to grid coordinates and stores them
    // in the gridData array.
    // Called with scope of a series.
    $.jqplot.PyramidRenderer.prototype.setGridData = function(plot) {
        // recalculate the grid data
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var data = this._plotData;
        var pdata = this._prevPlotData;
        this.gridData = [];
        this._prevGridData = [];
        var l = data.length;
        var adjust = false;
        var i;

        // if any data values are < 0,  consider this a negative series
        for (i = 0; i < l; i++) {
            if (data[i][1] < 0) {
                this.side = 'left';
            }
        }

        if (this._yaxis.name === 'yMidAxis' && this.side === 'right') {
            this._xnudge = this._xaxis.max/2000.0;
            adjust = true;
        }

        for (i = 0; i < l; i++) {
            // if not a line series or if no nulls in data, push the converted point onto the array.
            if (data[i][0] != null && data[i][1] != null) {
                this.gridData.push([xp(data[i][1]), yp(data[i][0])]);
            }
            // else if there is a null, preserve it.
            else if (data[i][0] == null) {
                this.gridData.push([xp(data[i][1]), null]);
            }
            else if (data[i][1] == null) {
                this.gridData.push(null, [yp(data[i][0])]);
            }
            // finally, adjust x grid data if have to
            if (data[i][1] === 0 && adjust) {
                this.gridData[i][0] = xp(this._xnudge);
            }
        }
    };
    
    // makeGridData
    // converts any arbitrary data values to grid coordinates and
    // returns them.  This method exists so that plugins can use a series'
    // linerenderer to generate grid data points without overwriting the
    // grid data associated with that series.
    // Called with scope of a series.
    $.jqplot.PyramidRenderer.prototype.makeGridData = function(data, plot) {
        // recalculate the grid data
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var gd = [];
        var l = data.length;
        var adjust = false;
        var i;

        // if any data values are < 0,  consider this a negative series
        for (i = 0; i < l; i++) {
            if (data[i][1] < 0) {
                this.side = 'left';
            }
        }

        if (this._yaxis.name === 'yMidAxis' && this.side === 'right') {
            this._xnudge = this._xaxis.max/2000.0;
            adjust = true;
        }

        for (i = 0; i < l; i++) {
            // if not a line series or if no nulls in data, push the converted point onto the array.
            if (data[i][0] != null && data[i][1] != null) {
                gd.push([xp(data[i][1]), yp(data[i][0])]);
            }
            // else if there is a null, preserve it.
            else if (data[i][0] == null) {
                gd.push([xp(data[i][1]), null]);
            }
            else if (data[i][1] == null) {
                gd.push([null, yp(data[i][0])]);
            }
            // finally, adjust x grid data if have to
            if (data[i][1] === 0 && adjust) {
                gd[i][0] = xp(this._xnudge);
            }
        }

        return gd;
    };

    $.jqplot.PyramidRenderer.prototype.setBarWidth = function() {
        // need to know how many data values we have on the approprate axis and figure it out.
        var i;
        var nvals = 0;
        var nseries = 0;
        var paxis = this[this._primaryAxis];
        var s, series, pos;
        nvals = paxis.max - paxis.min;
        var nticks = paxis.numberTicks;
        var nbins = (nticks-1)/2;
        // so, now we have total number of axis values.
        var temp = (this.barPadding === 0) ? 1.0 : 0;
        if (paxis.name == 'xaxis' || paxis.name == 'x2axis') {
            this.barWidth = (paxis._offsets.max - paxis._offsets.min) / nvals - this.barPadding + temp;
        }
        else {
            if (this.fill) {
                this.barWidth = (paxis._offsets.min - paxis._offsets.max) / nvals - this.barPadding + temp;
            }
            else {
                this.barWidth = (paxis._offsets.min - paxis._offsets.max) / nvals;
            }
        }
    };
    
    $.jqplot.PyramidRenderer.prototype.draw = function(ctx, gridData, options) {
        var i;
        // Ughhh, have to make a copy of options b/c it may be modified later.
        var opts = $.extend({}, options);
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var pointx, pointy;
        // clear out data colors.
        this._dataColors = [];
        this._barPoints = [];
        
        if (this.renderer.options.barWidth == null) {
            this.renderer.setBarWidth.call(this);
        }
        
        // var temp = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
        // var nvals = temp[0];
        // var nseries = temp[1];
        // var pos = temp[2];
        var points = [],
            w,
            h;
        
        // this._barNudge = 0;

        if (showLine) {
            var negativeColors = new $.jqplot.ColorGenerator(this.negativeSeriesColors);
            var positiveColors = new $.jqplot.ColorGenerator(this.seriesColors);
            var negativeColor = negativeColors.get(this.index);
            if (! this.useNegativeColors) {
                negativeColor = opts.fillStyle;
            }
            var positiveColor = opts.fillStyle;
            var base;
            var xstart = this._xaxis.series_u2p(this._xnudge);
            var ystart = this._yaxis.series_u2p(this._yaxis.min);
            var yend = this._yaxis.series_u2p(this._yaxis.max);
            var bw = this.barWidth;
            var bw2 = bw/2.0;
            var points = [];
            var yadj = this.offsetBars ? bw2 : 0;
            
            for (var i=0, l=gridData.length; i<l; i++) {
                if (this.data[i][0] == null) {
                    continue;
                }
                base = gridData[i][1];
                // not stacked and first series in stack

                if (this._plotData[i][1] < 0) {
                    if (this.varyBarColor && !this._stack) {
                        if (this.useNegativeColors) {
                            opts.fillStyle = negativeColors.next();
                        }
                        else {
                            opts.fillStyle = positiveColors.next();
                        }
                    }
                }
                else {
                    if (this.varyBarColor && !this._stack) {
                        opts.fillStyle = positiveColors.next();
                    }
                    else {
                        opts.fillStyle = positiveColor;
                    }                    
                }
                
                if (this.fill) {

                    if (this._plotData[i][1] >= 0) {
                        // xstart = this._xaxis.series_u2p(this._xnudge);
                        w = gridData[i][0] - xstart;
                        h = this.barWidth;
                        points = [xstart, base - bw2 - yadj, w, h];
                    }
                    else {
                        // xstart = this._xaxis.series_u2p(0);
                        w = xstart - gridData[i][0];
                        h = this.barWidth;
                        points = [gridData[i][0], base - bw2 - yadj, w, h];
                    }

                    this._barPoints.push([[points[0], points[1] + h], [points[0], points[1]], [points[0] + w, points[1]], [points[0] + w, points[1] + h]]);

                    if (shadow) {
                        this.renderer.shadowRenderer.draw(ctx, points);
                    }
                    var clr = opts.fillStyle || this.color;
                    this._dataColors.push(clr);
                    this.renderer.shapeRenderer.draw(ctx, points, opts); 
                }

                else {
                    if (i === 0) {
                        points =[[xstart, ystart], [gridData[i][0], ystart], [gridData[i][0], gridData[i][1] - bw2 - yadj]];
                    }

                    else if (i < l-1) {
                        points = points.concat([[gridData[i-1][0], gridData[i-1][1] - bw2 - yadj], [gridData[i][0], gridData[i][1] + bw2 - yadj], [gridData[i][0], gridData[i][1] - bw2 - yadj]]);
                    } 

                    // finally, draw the line
                    else {
                        points = points.concat([[gridData[i-1][0], gridData[i-1][1] - bw2 - yadj], [gridData[i][0], gridData[i][1] + bw2 - yadj], [gridData[i][0], yend], [xstart, yend]]);
                    
                        if (shadow) {
                            this.renderer.shadowRenderer.draw(ctx, points);
                        }
                        var clr = opts.fillStyle || this.color;
                        this._dataColors.push(clr);
                        this.renderer.shapeRenderer.draw(ctx, points, opts);
                    }
                }
            }  
        }        
        
        if (this.highlightColors.length == 0) {
            this.highlightColors = $.jqplot.computeHighlightColors(this._dataColors);
        }
        
        else if (typeof(this.highlightColors) == 'string') {
            this.highlightColors = [];
            for (var i=0; i<this._dataColors.length; i++) {
                this.highlightColors.push(this.highlightColors);
            }
        }
        
    };

        
    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.grid = options.grid || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
        // only set these if there is a pie series
        var setopts = false;
        if (options.seriesDefaults.renderer === $.jqplot.PyramidRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer === $.jqplot.PyramidRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.PyramidAxisRenderer;
            options.grid.renderer = $.jqplot.PyramidGridRenderer;
            options.seriesDefaults.pointLabels = {show: false};
        }
    }
    
    // called within context of plot
    // create a canvas which we can draw on.
    // insert it before the eventCanvas, so eventCanvas will still capture events.
    function postPlotDraw() {
        // Memory Leaks patch    
        if (this.plugins.pyramidRenderer && this.plugins.pyramidRenderer.highlightCanvas) {

            this.plugins.pyramidRenderer.highlightCanvas.resetCanvas();
            this.plugins.pyramidRenderer.highlightCanvas = null;
        }
         
        this.plugins.pyramidRenderer = {highlightedSeriesIndex:null};
        this.plugins.pyramidRenderer.highlightCanvas = new $.jqplot.GenericCanvas();
        
        this.eventCanvas._elem.before(this.plugins.pyramidRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-pyramidRenderer-highlight-canvas', this._plotDimensions, this));
        this.plugins.pyramidRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind('mouseleave', {plot:this}, function (ev) { unhighlight(ev.data.plot); });
    }  
    
    function highlight (plot, sidx, pidx, points) {
        var s = plot.series[sidx];
        var canvas = plot.plugins.pyramidRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        s._highlightedPoint = pidx;
        plot.plugins.pyramidRenderer.highlightedSeriesIndex = sidx;
        var opts = {fillStyle: s.highlightColors[pidx], fillRect: false};
        s.renderer.shapeRenderer.draw(canvas._ctx, points, opts);
        if (s.synchronizeHighlight !== false && plot.series.length >= s.synchronizeHighlight && s.synchronizeHighlight !== sidx) {
            s = plot.series[s.synchronizeHighlight];
            opts = {fillStyle: s.highlightColors[pidx], fillRect: false};
            s.renderer.shapeRenderer.draw(canvas._ctx, s._barPoints[pidx], opts);
        }
        canvas = null;
    }
    
    function unhighlight (plot) {
        var canvas = plot.plugins.pyramidRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        for (var i=0; i<plot.series.length; i++) {
            plot.series[i]._highlightedPoint = null;
        }
        plot.plugins.pyramidRenderer.highlightedSeriesIndex = null;
        plot.target.trigger('jqplotDataUnhighlight');
        canvas =  null;
    }
    
    
    function handleMove(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt1 = jQuery.Event('jqplotDataMouseOver');
            evt1.pageX = ev.pageX;
            evt1.pageY = ev.pageY;
            plot.target.trigger(evt1, ins);
            if (plot.series[ins[0]].highlightMouseOver && !(ins[0] == plot.plugins.pyramidRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                var evt = jQuery.Event('jqplotDataHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                plot.target.trigger(evt, ins);
                highlight (plot, neighbor.seriesIndex, neighbor.pointIndex, neighbor.points);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    }

    // Have to add hook here, becuase it needs called before series is inited.
    $.jqplot.preInitHooks.push(preInit);
    

})(jQuery);