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
    
    // Class: $.jqplot.BarRenderer
    // A plugin renderer for jqPlot to draw a bar plot.
    // Draws series as a line.
    
    $.jqplot.BarRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.BarRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.BarRenderer.prototype.constructor = $.jqplot.BarRenderer;
    
    // called with scope of series.
    $.jqplot.BarRenderer.prototype.init = function(options, plot) {
        // Group: Properties
        //
        // prop: barPadding
        // Number of pixels between adjacent bars at the same axis value.
        this.barPadding = 8;
        // prop: barMargin
        // Number of pixels between groups of bars at adjacent axis values.
        this.barMargin = 10;
        // prop: barDirection
        // 'vertical' = up and down bars, 'horizontal' = side to side bars
        this.barDirection = 'vertical';
        // prop: barWidth
        // Width of the bar in pixels (auto by devaul).  null = calculated automatically.
        this.barWidth = null;
        // prop: shadowOffset
        // offset of the shadow from the slice and offset of 
        // each succesive stroke of the shadow from the last.
        this.shadowOffset = 2;
        // prop: shadowDepth
        // number of strokes to apply to the shadow, 
        // each stroke offset shadowOffset from the last.
        this.shadowDepth = 5;
        // prop: shadowAlpha
        // transparency of the shadow (0 = transparent, 1 = opaque)
        this.shadowAlpha = 0.08;
        // prop: waterfall
        // true to enable waterfall plot.
        this.waterfall = false;
        // prop: groups
        // group bars into this many groups
        this.groups = 1;
        // prop: varyBarColor
        // true to color each bar of a series separately rather than
        // have every bar of a given series the same color.
        // If used for non-stacked multiple series bar plots, user should
        // specify a separate 'seriesColors' array for each series.
        // Otherwise, each series will set their bars to the same color array.
        // This option has no Effect for stacked bar charts and is disabled.
        this.varyBarColor = false;
        // prop: highlightMouseOver
        // True to highlight slice when moused over.
        // This must be false to enable highlightMouseDown to highlight when clicking on a slice.
        this.highlightMouseOver = true;
        // prop: highlightMouseDown
        // True to highlight when a mouse button is pressed over a slice.
        // This will be disabled if highlightMouseOver is true.
        this.highlightMouseDown = false;
        // prop: highlightColors
        // an array of colors to use when highlighting a bar.
        this.highlightColors = [];
        // prop: transposedData
        // NOT IMPLEMENTED YET.  True if this is a horizontal bar plot and 
        // x and y values are "transposed".  Tranposed, or "swapped", data is 
        // required prior to rev. 894 builds of jqPlot with horizontal bars. 
        // Allows backward compatability of bar renderer horizontal bars with 
        // old style data sets.
        this.transposedData = true;
        this.renderer.animation = {
            show: false,
            direction: 'down',
            speed: 3000,
            _supported: true
        };
        this._type = 'bar';
        
        // if user has passed in highlightMouseDown option and not set highlightMouseOver, disable highlightMouseOver
        if (options.highlightMouseDown && options.highlightMouseOver == null) {
            options.highlightMouseOver = false;
        }
        
        //////
        // This is probably wrong here.
        // After going back and forth on whether renderer should be the thing
        // or extend the thing, it seems that it it best if it is a property
        // on the thing.  This should be something that is commonized 
        // among series renderers in the future.
        //////
        $.extend(true, this, options);

        // really should probably do this
        $.extend(true, this.renderer, options);
        // fill is still needed to properly draw the legend.
        // bars have to be filled.
        this.fill = true;

        // if horizontal bar and animating, reset the default direction
        if (this.barDirection === 'horizontal' && this.rendererOptions.animation && this.rendererOptions.animation.direction == null) {
            this.renderer.animation.direction = 'left';
        }
        
        if (this.waterfall) {
            this.fillToZero = false;
            this.disableStack = true;
        }
        
        if (this.barDirection == 'vertical' ) {
            this._primaryAxis = '_xaxis';
            this._stackAxis = 'y';
            this.fillAxis = 'y';
        }
        else {
            this._primaryAxis = '_yaxis';
            this._stackAxis = 'x';
            this.fillAxis = 'x';
        }
        // index of the currenty highlighted point, if any
        this._highlightedPoint = null;
        // total number of values for all bar series, total number of bar series, and position of this series
        this._plotSeriesInfo = null;
        // Array of actual data colors used for each data point.
        this._dataColors = [];
        this._barPoints = [];
        
        // set the shape renderer options
        var opts = {lineJoin:'miter', lineCap:'round', fill:true, isarc:false, strokeStyle:this.color, fillStyle:this.color, closePath:this.fill};
        this.renderer.shapeRenderer.init(opts);
        // set the shadow renderer options
        var sopts = {lineJoin:'miter', lineCap:'round', fill:true, isarc:false, angle:this.shadowAngle, offset:this.shadowOffset, alpha:this.shadowAlpha, depth:this.shadowDepth, closePath:this.fill};
        this.renderer.shadowRenderer.init(sopts);
        
        plot.postInitHooks.addOnce(postInit);
        plot.postDrawHooks.addOnce(postPlotDraw);
        plot.eventListenerHooks.addOnce('jqplotMouseMove', handleMove);
        plot.eventListenerHooks.addOnce('jqplotMouseDown', handleMouseDown);
        plot.eventListenerHooks.addOnce('jqplotMouseUp', handleMouseUp);
        plot.eventListenerHooks.addOnce('jqplotClick', handleClick);
        plot.eventListenerHooks.addOnce('jqplotRightClick', handleRightClick); 
    };
    
    // called with scope of series
    function barPreInit(target, data, seriesDefaults, options) {
        if (this.rendererOptions.barDirection == 'horizontal') {
            this._stackAxis = 'x';
            this._primaryAxis = '_yaxis';
        }
        if (this.rendererOptions.waterfall == true) {
            this._data = $.extend(true, [], this.data);
            var sum = 0;
            var pos = (!this.rendererOptions.barDirection || this.rendererOptions.barDirection === 'vertical' || this.transposedData === false) ? 1 : 0;
            for(var i=0; i<this.data.length; i++) {
                sum += this.data[i][pos];
                if (i>0) {
                    this.data[i][pos] += this.data[i-1][pos];
                }
            }
            this.data[this.data.length] = (pos == 1) ? [this.data.length+1, sum] : [sum, this.data.length+1];
            this._data[this._data.length] = (pos == 1) ? [this._data.length+1, sum] : [sum, this._data.length+1];
        }
        if (this.rendererOptions.groups > 1) {
            this.breakOnNull = true;
            var l = this.data.length;
            var skip = parseInt(l/this.rendererOptions.groups, 10);
            var count = 0;
            for (var i=skip; i<l; i+=skip) {
                this.data.splice(i+count, 0, [null, null]);
                this._plotData.splice(i+count, 0, [null, null]);
                this._stackData.splice(i+count, 0, [null, null]);
                count++;
            }
            for (i=0; i<this.data.length; i++) {
                if (this._primaryAxis == '_xaxis') {
                    this.data[i][0] = i+1;
                    this._plotData[i][0] = i+1;
                    this._stackData[i][0] = i+1;
                }
                else {
                    this.data[i][1] = i+1;
                    this._plotData[i][1] = i+1;
                    this._stackData[i][1] = i+1;
                }
            }
        }
    }
    
    $.jqplot.preSeriesInitHooks.push(barPreInit);
    
    // needs to be called with scope of series, not renderer.
    $.jqplot.BarRenderer.prototype.calcSeriesNumbers = function() {
        var nvals = 0;
        var nseries = 0;
        var paxis = this[this._primaryAxis];
        var s, series, pos;
        // loop through all series on this axis
        for (var i=0; i < paxis._series.length; i++) {
            series = paxis._series[i];
            if (series === this) {
                pos = i;
            }
            // is the series rendered as a bar?
            if (series.renderer.constructor == $.jqplot.BarRenderer) {
                // gridData may not be computed yet, use data length insted
                nvals += series.data.length;
                nseries += 1;
            }
        }
        // return total number of values for all bar series, total number of bar series, and position of this series
        return [nvals, nseries, pos];
    };

    $.jqplot.BarRenderer.prototype.setBarWidth = function() {
        // need to know how many data values we have on the approprate axis and figure it out.
        var i;
        var nvals = 0;
        var nseries = 0;
        var paxis = this[this._primaryAxis];
        var s, series, pos;
        var temp = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
        nvals = temp[0];
        nseries = temp[1];
        var nticks = paxis.numberTicks;
        var nbins = (nticks-1)/2;
        // so, now we have total number of axis values.
        if (paxis.name == 'xaxis' || paxis.name == 'x2axis') {
            if (this._stack) {
                this.barWidth = (paxis._offsets.max - paxis._offsets.min) / nvals * nseries - this.barMargin;
            }
            else {
                this.barWidth = ((paxis._offsets.max - paxis._offsets.min)/nbins  - this.barPadding * (nseries-1) - this.barMargin*2)/nseries;
                // this.barWidth = (paxis._offsets.max - paxis._offsets.min) / nvals - this.barPadding - this.barMargin/nseries;
            }
        }
        else {
            if (this._stack) {
                this.barWidth = (paxis._offsets.min - paxis._offsets.max) / nvals * nseries - this.barMargin;
            }
            else {
                this.barWidth = ((paxis._offsets.min - paxis._offsets.max)/nbins  - this.barPadding * (nseries-1) - this.barMargin*2)/nseries;
                // this.barWidth = (paxis._offsets.min - paxis._offsets.max) / nvals - this.barPadding - this.barMargin/nseries;
            }
        }
        return [nvals, nseries];
    };

    function computeHighlightColors (colors) {
        var ret = [];
        for (var i=0; i<colors.length; i++){
            var rgba = $.jqplot.getColorComponents(colors[i]);
            var newrgb = [rgba[0], rgba[1], rgba[2]];
            var sum = newrgb[0] + newrgb[1] + newrgb[2];
            for (var j=0; j<3; j++) {
                // when darkening, lowest color component can be is 60.
                newrgb[j] = (sum > 570) ?  newrgb[j] * 0.8 : newrgb[j] + 0.3 * (255 - newrgb[j]);
                newrgb[j] = parseInt(newrgb[j], 10);
            }
            ret.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');
        }
        return ret;
    }

    function getStart(sidx, didx, comp, plot, axis) {
        // check if sign change
        var seriesIndex = sidx,
            prevSeriesIndex = sidx - 1,
            start,
            prevVal,
            aidx = (axis === 'x') ? 0 : 1;

        // is this not the first series?
        if (seriesIndex > 0) {
            prevVal = plot.series[prevSeriesIndex]._plotData[didx][aidx];

            // is there a sign change
            if ((comp * prevVal) < 0) {
                start = getStart(prevSeriesIndex, didx, comp, plot, axis);
            }

            // no sign change.
            else {
                start = plot.series[prevSeriesIndex].gridData[didx][aidx];
            }

        }

        // if first series, return value at 0
        else {

            start = (aidx === 0) ? plot.series[seriesIndex]._xaxis.series_u2p(0) : plot.series[seriesIndex]._yaxis.series_u2p(0);
        }

        return start;
    }

    
    $.jqplot.BarRenderer.prototype.draw = function(ctx, gridData, options, plot) {
        var i;
        // Ughhh, have to make a copy of options b/c it may be modified later.
        var opts = $.extend({}, options);
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var xaxis = this.xaxis;
        var yaxis = this.yaxis;
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var pointx, pointy;
        // clear out data colors.
        this._dataColors = [];
        this._barPoints = [];
        
        if (this.barWidth == null) {
            this.renderer.setBarWidth.call(this);
        }
        
        var temp = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
        var nvals = temp[0];
        var nseries = temp[1];
        var pos = temp[2];
        var points = [];
        
        if (this._stack) {
            this._barNudge = 0;
        }
        else {
            this._barNudge = (-Math.abs(nseries/2 - 0.5) + pos) * (this.barWidth + this.barPadding);
        }
        if (showLine) {
            var negativeColors = new $.jqplot.ColorGenerator(this.negativeSeriesColors);
            var positiveColors = new $.jqplot.ColorGenerator(this.seriesColors);
            var negativeColor = negativeColors.get(this.index);
            if (! this.useNegativeColors) {
                negativeColor = opts.fillStyle;
            }
            var positiveColor = opts.fillStyle;
            var base;
            var xstart; 
            var ystart;
            
            if (this.barDirection == 'vertical') {
                for (var i=0; i<gridData.length; i++) {
                    if (!this._stack && this.data[i][1] == null) {
                        continue;
                    }
                    points = [];
                    base = gridData[i][0] + this._barNudge;
                    
                    // stacked
                    if (this._stack && this._prevGridData.length) {
                        ystart = getStart(this.index, i, this._plotData[i][1], plot, 'y');
                    }

                    // not stacked
                    else {
                        if (this.fillToZero) {
                            ystart = this._yaxis.series_u2p(0);
                        }
                        else if (this.waterfall && i > 0 && i < this.gridData.length-1) {
                            ystart = this.gridData[i-1][1];
                        }
                        else if (this.waterfall && i == 0 && i < this.gridData.length-1) {
                            if (this._yaxis.min <= 0 && this._yaxis.max >= 0) {
                                ystart = this._yaxis.series_u2p(0);
                            }
                            else if (this._yaxis.min > 0) {
                                ystart = ctx.canvas.height;
                            }
                            else {
                                ystart = 0;
                            }
                        }
                        else if (this.waterfall && i == this.gridData.length - 1) {
                            if (this._yaxis.min <= 0 && this._yaxis.max >= 0) {
                                ystart = this._yaxis.series_u2p(0);
                            }
                            else if (this._yaxis.min > 0) {
                                ystart = ctx.canvas.height;
                            }
                            else {
                                ystart = 0;
                            }
                        }
                        else {
                            ystart = ctx.canvas.height;
                        }
                    }
                    if ((this.fillToZero && this._plotData[i][1] < 0) || (this.waterfall && this._data[i][1] < 0)) {
                        if (this.varyBarColor && !this._stack) {
                            if (this.useNegativeColors) {
                                opts.fillStyle = negativeColors.next();
                            }
                            else {
                                opts.fillStyle = positiveColors.next();
                            }
                        }
                        else {
                            opts.fillStyle = negativeColor;
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
                    
                    if (!this.fillToZero || this._plotData[i][1] >= 0) { 
                        points.push([base-this.barWidth/2, ystart]);
                        points.push([base-this.barWidth/2, gridData[i][1]]);
                        points.push([base+this.barWidth/2, gridData[i][1]]);
                        points.push([base+this.barWidth/2, ystart]);
                    }
                    // for negative bars make sure points are always ordered clockwise
                    else {              
                        points.push([base-this.barWidth/2, gridData[i][1]]);
                        points.push([base-this.barWidth/2, ystart]);
                        points.push([base+this.barWidth/2, ystart]);
                        points.push([base+this.barWidth/2, gridData[i][1]]);
                    }
                    this._barPoints.push(points);
                    // now draw the shadows if not stacked.
                    // for stacked plots, they are predrawn by drawShadow
                    if (shadow && !this._stack) {
                        var sopts = $.extend(true, {}, opts);
                        // need to get rid of fillStyle on shadow.
                        delete sopts.fillStyle;
                        this.renderer.shadowRenderer.draw(ctx, points, sopts);
                    }
                    var clr = opts.fillStyle || this.color;
                    this._dataColors.push(clr);
                    this.renderer.shapeRenderer.draw(ctx, points, opts); 
                }
            }
            
            else if (this.barDirection == 'horizontal'){
                for (var i=0; i<gridData.length; i++) {
                    if (!this._stack && this.data[i][0] == null) {
                        continue;
                    }
                    points = [];
                    base = gridData[i][1] - this._barNudge;
                    xstart;
                    
                    if (this._stack && this._prevGridData.length) {
                        xstart = getStart(this.index, i, this._plotData[i][0], plot, 'x');
                    }
                    // not stacked
                    else {
                        if (this.fillToZero) {
                            xstart = this._xaxis.series_u2p(0);
                        }
                        else if (this.waterfall && i > 0 && i < this.gridData.length-1) {
                            xstart = this.gridData[i-1][0];
                        }
                        else if (this.waterfall && i == 0 && i < this.gridData.length-1) {
                            if (this._xaxis.min <= 0 && this._xaxis.max >= 0) {
                                xstart = this._xaxis.series_u2p(0);
                            }
                            else if (this._xaxis.min > 0) {
                                xstart = 0;
                            }
                            else {
                                xstart = 0;
                            }
                        }
                        else if (this.waterfall && i == this.gridData.length - 1) {
                            if (this._xaxis.min <= 0 && this._xaxis.max >= 0) {
                                xstart = this._xaxis.series_u2p(0);
                            }
                            else if (this._xaxis.min > 0) {
                                xstart = 0;
                            }
                            else {
                                xstart = ctx.canvas.width;
                            }
                        }
                        else {
                            xstart = 0;
                        }
                    }
                    if ((this.fillToZero && this._plotData[i][0] < 0) || (this.waterfall && this._data[i][0] < 0)) {
                        if (this.varyBarColor && !this._stack) {
                            if (this.useNegativeColors) {
                                opts.fillStyle = negativeColors.next();
                            }
                            else {
                                opts.fillStyle = positiveColors.next();
                            }
                        }
                        else {
                            opts.fillStyle = negativeColor;
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
                    

                    if (!this.fillToZero || this._plotData[i][0] >= 0) {
                        points.push([xstart, base + this.barWidth / 2]);
                        points.push([xstart, base - this.barWidth / 2]);
                        points.push([gridData[i][0], base - this.barWidth / 2]);
                        points.push([gridData[i][0], base + this.barWidth / 2]);
                    }
                    else {
                        points.push([gridData[i][0], base + this.barWidth / 2]);
                        points.push([gridData[i][0], base - this.barWidth / 2]);
                        points.push([xstart, base - this.barWidth / 2]);
                        points.push([xstart, base + this.barWidth / 2]);
                    }

                    this._barPoints.push(points);
                    // now draw the shadows if not stacked.
                    // for stacked plots, they are predrawn by drawShadow
                    if (shadow && !this._stack) {
                        var sopts = $.extend(true, {}, opts);
                        delete sopts.fillStyle;
                        this.renderer.shadowRenderer.draw(ctx, points, sopts);
                    }
                    var clr = opts.fillStyle || this.color;
                    this._dataColors.push(clr);
                    this.renderer.shapeRenderer.draw(ctx, points, opts);
                } 
            }
        }                
        
        if (this.highlightColors.length == 0) {
            this.highlightColors = $.jqplot.computeHighlightColors(this._dataColors);
        }
        
        else if (typeof(this.highlightColors) == 'string') {
            var temp = this.highlightColors;
            this.highlightColors = [];
            for (var i=0; i<this._dataColors.length; i++) {
                this.highlightColors.push(temp);
            }
        }
        
    };
    
     
    // for stacked plots, shadows will be pre drawn by drawShadow.
    $.jqplot.BarRenderer.prototype.drawShadow = function(ctx, gridData, options, plot) {
        var i;
        var opts = (options != undefined) ? options : {};
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var xaxis = this.xaxis;
        var yaxis = this.yaxis;
        var xp = this._xaxis.series_u2p;
        var yp = this._yaxis.series_u2p;
        var pointx, points, pointy, nvals, nseries, pos;
        
        if (this._stack && this.shadow) {
            if (this.barWidth == null) {
                this.renderer.setBarWidth.call(this);
            }
        
            var temp = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
            nvals = temp[0];
            nseries = temp[1];
            pos = temp[2];
        
            if (this._stack) {
                this._barNudge = 0;
            }
            else {
                this._barNudge = (-Math.abs(nseries/2 - 0.5) + pos) * (this.barWidth + this.barPadding);
            }
            if (showLine) {
            
                if (this.barDirection == 'vertical') {
                    for (var i=0; i<gridData.length; i++) {
                        if (this.data[i][1] == null) {
                            continue;
                        }
                        points = [];
                        var base = gridData[i][0] + this._barNudge;
                        var ystart;
                    
                        if (this._stack && this._prevGridData.length) {
                            ystart = getStart(this.index, i, this._plotData[i][1], plot, 'y');
                        }
                        else {
                            if (this.fillToZero) {
                                ystart = this._yaxis.series_u2p(0);
                            }
                            else {
                                ystart = ctx.canvas.height;
                            }
                        }
                    
                        points.push([base-this.barWidth/2, ystart]);
                        points.push([base-this.barWidth/2, gridData[i][1]]);
                        points.push([base+this.barWidth/2, gridData[i][1]]);
                        points.push([base+this.barWidth/2, ystart]);
                        this.renderer.shadowRenderer.draw(ctx, points, opts);
                    }
                }
            
                else if (this.barDirection == 'horizontal'){
                    for (var i=0; i<gridData.length; i++) {
                        if (this.data[i][0] == null) {
                            continue;
                        }
                        points = [];
                        var base = gridData[i][1] - this._barNudge;
                        var xstart;
                    
                        if (this._stack && this._prevGridData.length) {
                            xstart = getStart(this.index, i, this._plotData[i][0], plot, 'x');
                        }
                        else {
                            if (this.fillToZero) {
                                xstart = this._xaxis.series_u2p(0);
                            }
                            else {
                                xstart = 0;
                            }
                        }
                    
                        points.push([xstart, base+this.barWidth/2]);
                        points.push([gridData[i][0], base+this.barWidth/2]);
                        points.push([gridData[i][0], base-this.barWidth/2]);
                        points.push([xstart, base-this.barWidth/2]);
                        this.renderer.shadowRenderer.draw(ctx, points, opts);
                    }  
                }
            }   
            
        }
    };
    
    function postInit(target, data, options) {
        for (var i=0; i<this.series.length; i++) {
            if (this.series[i].renderer.constructor == $.jqplot.BarRenderer) {
                // don't allow mouseover and mousedown at same time.
                if (this.series[i].highlightMouseOver) {
                    this.series[i].highlightMouseDown = false;
                }
            }
        }
    }
    
    // called within context of plot
    // create a canvas which we can draw on.
    // insert it before the eventCanvas, so eventCanvas will still capture events.
    function postPlotDraw() {
        // Memory Leaks patch    
        if (this.plugins.barRenderer && this.plugins.barRenderer.highlightCanvas) {

            this.plugins.barRenderer.highlightCanvas.resetCanvas();
            this.plugins.barRenderer.highlightCanvas = null;
        }
         
        this.plugins.barRenderer = {highlightedSeriesIndex:null};
        this.plugins.barRenderer.highlightCanvas = new $.jqplot.GenericCanvas();
        
        this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-barRenderer-highlight-canvas', this._plotDimensions, this));
        this.plugins.barRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind('mouseleave', {plot:this}, function (ev) { unhighlight(ev.data.plot); });
    }   
    
    function highlight (plot, sidx, pidx, points) {
        var s = plot.series[sidx];
        var canvas = plot.plugins.barRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        s._highlightedPoint = pidx;
        plot.plugins.barRenderer.highlightedSeriesIndex = sidx;
        var opts = {fillStyle: s.highlightColors[pidx]};
        s.renderer.shapeRenderer.draw(canvas._ctx, points, opts);
        canvas = null;
    }
    
    function unhighlight (plot) {
        var canvas = plot.plugins.barRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        for (var i=0; i<plot.series.length; i++) {
            plot.series[i]._highlightedPoint = null;
        }
        plot.plugins.barRenderer.highlightedSeriesIndex = null;
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
            if (plot.series[ins[0]].show && plot.series[ins[0]].highlightMouseOver &&
                !(ins[0] == plot.plugins.barRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
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
    
    function handleMouseDown(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            if (plot.series[ins[0]].highlightMouseDown && !(ins[0] == plot.plugins.barRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
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
    
    function handleMouseUp(ev, gridpos, datapos, neighbor, plot) {
        var idx = plot.plugins.barRenderer.highlightedSeriesIndex;
        if (idx != null && plot.series[idx].highlightMouseDown) {
            unhighlight(plot);
        }
    }
    
    function handleClick(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt = jQuery.Event('jqplotDataClick');
            evt.which = ev.which;
            evt.pageX = ev.pageX;
            evt.pageY = ev.pageY;
            plot.target.trigger(evt, ins);
        }
    }
    
    function handleRightClick(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var idx = plot.plugins.barRenderer.highlightedSeriesIndex;
            if (idx != null && plot.series[idx].highlightMouseDown) {
                unhighlight(plot);
            }
            var evt = jQuery.Event('jqplotDataRightClick');
            evt.which = ev.which;
            evt.pageX = ev.pageX;
            evt.pageY = ev.pageY;
            plot.target.trigger(evt, ins);
        }
    }
    
    
})(jQuery);