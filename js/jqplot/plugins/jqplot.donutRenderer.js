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
     * Class: $.jqplot.DonutRenderer
     * Plugin renderer to draw a donut chart.
     * x values, if present, will be used as slice labels.
     * y values give slice size.
     * 
     * To use this renderer, you need to include the 
     * donut renderer plugin, for example:
     * 
     * > <script type="text/javascript" src="plugins/jqplot.donutRenderer.js"></script>
     * 
     * Properties described here are passed into the $.jqplot function
     * as options on the series renderer.  For example:
     * 
     * > plot2 = $.jqplot('chart2', [s1, s2], {
     * >     seriesDefaults: {
     * >         renderer:$.jqplot.DonutRenderer,
     * >         rendererOptions:{
     * >              sliceMargin: 2,
     * >              innerDiameter: 110,
     * >              startAngle: -90
     * >          }
     * >      }
     * > });
     * 
     * A donut plot will trigger events on the plot target
     * according to user interaction.  All events return the event object,
     * the series index, the point (slice) index, and the point data for 
     * the appropriate slice.
     * 
     * 'jqplotDataMouseOver' - triggered when user mouseing over a slice.
     * 'jqplotDataHighlight' - triggered the first time user mouses over a slice,
     * if highlighting is enabled.
     * 'jqplotDataUnhighlight' - triggered when a user moves the mouse out of
     * a highlighted slice.
     * 'jqplotDataClick' - triggered when the user clicks on a slice.
     * 'jqplotDataRightClick' - tiggered when the user right clicks on a slice if
     * the "captureRightClick" option is set to true on the plot.
     */
    $.jqplot.DonutRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.DonutRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.DonutRenderer.prototype.constructor = $.jqplot.DonutRenderer;
    
    // called with scope of a series
    $.jqplot.DonutRenderer.prototype.init = function(options, plot) {
        // Group: Properties
        //
        // prop: diameter
        // Outer diameter of the donut, auto computed by default
        this.diameter = null;
        // prop: innerDiameter
        // Inner diameter of the donut, auto calculated by default.
        // If specified will override thickness value.
        this.innerDiameter = null;
        // prop: thickness
        // thickness of the donut, auto computed by default
        // Overridden by if innerDiameter is specified.
        this.thickness = null;
        // prop: padding
        // padding between the donut and plot edges, legend, etc.
        this.padding = 20;
        // prop: sliceMargin
        // angular spacing between donut slices in degrees.
        this.sliceMargin = 0;
        // prop: ringMargin
        // pixel distance between rings, or multiple series in a donut plot.
        // null will compute ringMargin based on sliceMargin.
        this.ringMargin = null;
        // prop: fill
        // true or false, whether to fil the slices.
        this.fill = true;
        // prop: shadowOffset
        // offset of the shadow from the slice and offset of 
        // each succesive stroke of the shadow from the last.
        this.shadowOffset = 2;
        // prop: shadowAlpha
        // transparency of the shadow (0 = transparent, 1 = opaque)
        this.shadowAlpha = 0.07;
        // prop: shadowDepth
        // number of strokes to apply to the shadow, 
        // each stroke offset shadowOffset from the last.
        this.shadowDepth = 5;
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
        // prop: dataLabels
        // Either 'label', 'value', 'percent' or an array of labels to place on the pie slices.
        // Defaults to percentage of each pie slice.
        this.dataLabels = 'percent';
        // prop: showDataLabels
        // true to show data labels on slices.
        this.showDataLabels = false;
        // prop: dataLabelFormatString
        // Format string for data labels.  If none, '%s' is used for "label" and for arrays, '%d' for value and '%d%%' for percentage.
        this.dataLabelFormatString = null;
        // prop: dataLabelThreshold
        // Threshhold in percentage (0 - 100) of pie area, below which no label will be displayed.
        // This applies to all label types, not just to percentage labels.
        this.dataLabelThreshold = 3;
        // prop: dataLabelPositionFactor
        // A Multiplier (0-1) of the pie radius which controls position of label on slice.
        // Increasing will slide label toward edge of pie, decreasing will slide label toward center of pie.
        this.dataLabelPositionFactor = 0.4;
        // prop: dataLabelNudge
        // Number of pixels to slide the label away from (+) or toward (-) the center of the pie.
        this.dataLabelNudge = 0;
        // prop: startAngle
        // Angle to start drawing donut in degrees.  
        // According to orientation of canvas coordinate system:
        // 0 = on the positive x axis
        // -90 = on the positive y axis.
        // 90 = on the negaive y axis.
        // 180 or - 180 = on the negative x axis.
        this.startAngle = 0;
        this.tickRenderer = $.jqplot.DonutTickRenderer;
        // Used as check for conditions where donut shouldn't be drawn.
        this._drawData = true;
        this._type = 'donut';
        
        // if user has passed in highlightMouseDown option and not set highlightMouseOver, disable highlightMouseOver
        if (options.highlightMouseDown && options.highlightMouseOver == null) {
            options.highlightMouseOver = false;
        }
        
        $.extend(true, this, options);
        if (this.diameter != null) {
            this.diameter = this.diameter - this.sliceMargin;
        }
        this._diameter = null;
        this._innerDiameter = null;
        this._radius = null;
        this._innerRadius = null;
        this._thickness = null;
        // references to the previous series in the plot to properly calculate diameters
        // and thicknesses of nested rings.
        this._previousSeries = [];
        this._numberSeries = 1;
        // array of [start,end] angles arrays, one for each slice.  In radians.
        this._sliceAngles = [];
        // index of the currenty highlighted point, if any
        this._highlightedPoint = null;
        
        // set highlight colors if none provided
        if (this.highlightColors.length == 0) {
            for (var i=0; i<this.seriesColors.length; i++){
                var rgba = $.jqplot.getColorComponents(this.seriesColors[i]);
                var newrgb = [rgba[0], rgba[1], rgba[2]];
                var sum = newrgb[0] + newrgb[1] + newrgb[2];
                for (var j=0; j<3; j++) {
                    // when darkening, lowest color component can be is 60.
                    newrgb[j] = (sum > 570) ?  newrgb[j] * 0.8 : newrgb[j] + 0.3 * (255 - newrgb[j]);
                    newrgb[j] = parseInt(newrgb[j], 10);
                }
                this.highlightColors.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');
            }
        }
        
        plot.postParseOptionsHooks.addOnce(postParseOptions);
        plot.postInitHooks.addOnce(postInit);
        plot.eventListenerHooks.addOnce('jqplotMouseMove', handleMove);
        plot.eventListenerHooks.addOnce('jqplotMouseDown', handleMouseDown);
        plot.eventListenerHooks.addOnce('jqplotMouseUp', handleMouseUp);
        plot.eventListenerHooks.addOnce('jqplotClick', handleClick);
        plot.eventListenerHooks.addOnce('jqplotRightClick', handleRightClick);
        plot.postDrawHooks.addOnce(postPlotDraw);
        
        
    };
    
    $.jqplot.DonutRenderer.prototype.setGridData = function(plot) {
        // set gridData property.  This will hold angle in radians of each data point.
        var stack = [];
        var td = [];
        var sa = this.startAngle/180*Math.PI;
        var tot = 0;
        // don't know if we have any valid data yet, so set plot to not draw.
        this._drawData = false;
        for (var i=0; i<this.data.length; i++){
            if (this.data[i][1] != 0) {
                // we have data, O.K. to draw.
                this._drawData = true;
            }
            stack.push(this.data[i][1]);
            td.push([this.data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
            tot += this.data[i][1];
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
            td[i][2] = this.data[i][1]/tot;
        }
        this.gridData = td;
    };
    
    $.jqplot.DonutRenderer.prototype.makeGridData = function(data, plot) {
        var stack = [];
        var td = [];
        var tot = 0;
        var sa = this.startAngle/180*Math.PI;
        // don't know if we have any valid data yet, so set plot to not draw.
        this._drawData = false;
        for (var i=0; i<data.length; i++){
            if (this.data[i][1] != 0) {
                // we have data, O.K. to draw.
                this._drawData = true;
            }
            stack.push(data[i][1]);
            td.push([data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
            tot += data[i][1];
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
            td[i][2] = data[i][1]/tot;
        }
        return td;
    };
    
    $.jqplot.DonutRenderer.prototype.drawSlice = function (ctx, ang1, ang2, color, isShadow) {
        var r = this._diameter / 2;
        var ri = r - this._thickness;
        var fill = this.fill;
        // var lineWidth = this.lineWidth;
        ctx.save();
        ctx.translate(this._center[0], this._center[1]);
        // ctx.translate(this.sliceMargin*Math.cos((ang1+ang2)/2), this.sliceMargin*Math.sin((ang1+ang2)/2));
        
        if (isShadow) {
            for (var i=0; i<this.shadowDepth; i++) {
                ctx.save();
                ctx.translate(this.shadowOffset*Math.cos(this.shadowAngle/180*Math.PI), this.shadowOffset*Math.sin(this.shadowAngle/180*Math.PI));
                doDraw();
            }
        }
        
        else {
            doDraw();
        }
        
        function doDraw () {
            // Fix for IE and Chrome that can't seem to draw circles correctly.
            // ang2 should always be <= 2 pi since that is the way the data is converted.
             if (ang2 > 6.282 + this.startAngle) {
                ang2 = 6.282 + this.startAngle;
                if (ang1 > ang2) {
                    ang1 = 6.281 + this.startAngle;
                }
            }
            // Fix for IE, where it can't seem to handle 0 degree angles.  Also avoids
            // ugly line on unfilled donuts.
            if (ang1 >= ang2) {
                return;
            }
            ctx.beginPath();  
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            // ctx.lineWidth = lineWidth;
            ctx.arc(0, 0, r, ang1, ang2, false);
            ctx.lineTo(ri*Math.cos(ang2), ri*Math.sin(ang2));
            ctx.arc(0,0, ri, ang2, ang1, true);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
        
        if (isShadow) {
            for (var i=0; i<this.shadowDepth; i++) {
                ctx.restore();
            }
        }
        
        ctx.restore();
    };
    
    // called with scope of series
    $.jqplot.DonutRenderer.prototype.draw = function (ctx, gd, options, plot) {
        var i;
        var opts = (options != undefined) ? options : {};
        // offset and direction of offset due to legend placement
        var offx = 0;
        var offy = 0;
        var trans = 1;
        // var colorGenerator = new this.colorGenerator(this.seriesColors);
        if (options.legendInfo && options.legendInfo.placement == 'insideGrid') {
            var li = options.legendInfo;
            switch (li.location) {
                case 'nw':
                    offx = li.width + li.xoffset;
                    break;
                case 'w':
                    offx = li.width + li.xoffset;
                    break;
                case 'sw':
                    offx = li.width + li.xoffset;
                    break;
                case 'ne':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'e':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'se':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'n':
                    offy = li.height + li.yoffset;
                    break;
                case 's':
                    offy = li.height + li.yoffset;
                    trans = -1;
                    break;
                default:
                    break;
            }
        }
        
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var cw = ctx.canvas.width;
        var ch = ctx.canvas.height;
        var w = cw - offx - 2 * this.padding;
        var h = ch - offy - 2 * this.padding;
        var mindim = Math.min(w,h);
        var d = mindim;
        var ringmargin =  (this.ringMargin == null) ? this.sliceMargin * 2.0 : this.ringMargin;
        
        for (var i=0; i<this._previousSeries.length; i++) {
            d -= 2.0 * this._previousSeries[i]._thickness + 2.0 * ringmargin;
        }
        this._diameter = this.diameter || d;
        if (this.innerDiameter != null) {
            var od = (this._numberSeries > 1 && this.index > 0) ? this._previousSeries[0]._diameter : this._diameter;
            this._thickness = this.thickness || (od - this.innerDiameter - 2.0*ringmargin*this._numberSeries) / this._numberSeries/2.0;
        }
        else {
            this._thickness = this.thickness || mindim / 2 / (this._numberSeries + 1) * 0.85;
        }

        var r = this._radius = this._diameter/2;
        this._innerRadius = this._radius - this._thickness;
        var sa = this.startAngle / 180 * Math.PI;
        this._center = [(cw - trans * offx)/2 + trans * offx, (ch - trans*offy)/2 + trans * offy];
        
        if (this.shadow) {
            var shadowColor = 'rgba(0,0,0,'+this.shadowAlpha+')';
            for (var i=0; i<gd.length; i++) {
                var ang1 = (i == 0) ? sa : gd[i-1][1] + sa;
                // Adjust ang1 and ang2 for sliceMargin
                ang1 += this.sliceMargin/180*Math.PI;
                this.renderer.drawSlice.call (this, ctx, ang1, gd[i][1]+sa, shadowColor, true);
            }
            
        }
        for (var i=0; i<gd.length; i++) {
            var ang1 = (i == 0) ? sa : gd[i-1][1] + sa;
            // Adjust ang1 and ang2 for sliceMargin
            ang1 += this.sliceMargin/180*Math.PI;
            var ang2 = gd[i][1] + sa;
            this._sliceAngles.push([ang1, ang2]);
            this.renderer.drawSlice.call (this, ctx, ang1, ang2, this.seriesColors[i], false);
            
            if (this.showDataLabels && gd[i][2]*100 >= this.dataLabelThreshold) {
                var fstr, avgang = (ang1+ang2)/2, label;
                
                if (this.dataLabels == 'label') {
                    fstr = this.dataLabelFormatString || '%s';
                    label = $.jqplot.sprintf(fstr, gd[i][0]);
                }
                else if (this.dataLabels == 'value') {
                    fstr = this.dataLabelFormatString || '%d';
                    label = $.jqplot.sprintf(fstr, this.data[i][1]);
                }
                else if (this.dataLabels == 'percent') {
                    fstr = this.dataLabelFormatString || '%d%%';
                    label = $.jqplot.sprintf(fstr, gd[i][2]*100);
                }
                else if (this.dataLabels.constructor == Array) {
                    fstr = this.dataLabelFormatString || '%s';
                    label = $.jqplot.sprintf(fstr, this.dataLabels[i]);
                }
                
                var fact = this._innerRadius + this._thickness * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge;
                
                var x = this._center[0] + Math.cos(avgang) * fact + this.canvas._offsets.left;
                var y = this._center[1] + Math.sin(avgang) * fact + this.canvas._offsets.top;
                
                var labelelem = $('<span class="jqplot-donut-series jqplot-data-label" style="position:absolute;">' + label + '</span>').insertBefore(plot.eventCanvas._elem);
                x -= labelelem.width()/2;
                y -= labelelem.height()/2;
                x = Math.round(x);
                y = Math.round(y);
                labelelem.css({left: x, top: y});
            }
        }
               
    };
    
    $.jqplot.DonutAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.DonutAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.DonutAxisRenderer.prototype.constructor = $.jqplot.DonutAxisRenderer;
        
    
    // There are no traditional axes on a donut chart.  We just need to provide
    // dummy objects with properties so the plot will render.
    // called with scope of axis object.
    $.jqplot.DonutAxisRenderer.prototype.init = function(options){
        //
        this.tickRenderer = $.jqplot.DonutTickRenderer;
        $.extend(true, this, options);
        // I don't think I'm going to need _dataBounds here.
        // have to go Axis scaling in a way to fit chart onto plot area
        // and provide u2p and p2u functionality for mouse cursor, etc.
        // for convienence set _dataBounds to 0 and 100 and
        // set min/max to 0 and 100.
        this._dataBounds = {min:0, max:100};
        this.min = 0;
        this.max = 100;
        this.showTicks = false;
        this.ticks = [];
        this.showMark = false;
        this.show = false; 
    };
    
    
    
    
    $.jqplot.DonutLegendRenderer = function(){
        $.jqplot.TableLegendRenderer.call(this);
    };
    
    $.jqplot.DonutLegendRenderer.prototype = new $.jqplot.TableLegendRenderer();
    $.jqplot.DonutLegendRenderer.prototype.constructor = $.jqplot.DonutLegendRenderer;
    
    /**
     * Class: $.jqplot.DonutLegendRenderer
     * Legend Renderer specific to donut plots.  Set by default
     * when user creates a donut plot.
     */
    $.jqplot.DonutLegendRenderer.prototype.init = function(options) {
        // Group: Properties
        //
        // prop: numberRows
        // Maximum number of rows in the legend.  0 or null for unlimited.
        this.numberRows = null;
        // prop: numberColumns
        // Maximum number of columns in the legend.  0 or null for unlimited.
        this.numberColumns = null;
        $.extend(true, this, options);
    };
    
    // called with context of legend
    $.jqplot.DonutLegendRenderer.prototype.draw = function() {
        var legend = this;
        if (this.show) {
            var series = this._series;
            var ss = 'position:absolute;';
            ss += (this.background) ? 'background:'+this.background+';' : '';
            ss += (this.border) ? 'border:'+this.border+';' : '';
            ss += (this.fontSize) ? 'font-size:'+this.fontSize+';' : '';
            ss += (this.fontFamily) ? 'font-family:'+this.fontFamily+';' : '';
            ss += (this.textColor) ? 'color:'+this.textColor+';' : '';
            ss += (this.marginTop != null) ? 'margin-top:'+this.marginTop+';' : '';
            ss += (this.marginBottom != null) ? 'margin-bottom:'+this.marginBottom+';' : '';
            ss += (this.marginLeft != null) ? 'margin-left:'+this.marginLeft+';' : '';
            ss += (this.marginRight != null) ? 'margin-right:'+this.marginRight+';' : '';
            this._elem = $('<table class="jqplot-table-legend" style="'+ss+'"></table>');
            // Donut charts legends don't go by number of series, but by number of data points
            // in the series.  Refactor things here for that.
            
            var pad = false, 
                reverse = false,
                nr, nc;
            var s = series[0];
            var colorGenerator = new $.jqplot.ColorGenerator(s.seriesColors);
            
            if (s.show) {
                var pd = s.data;
                if (this.numberRows) {
                    nr = this.numberRows;
                    if (!this.numberColumns){
                        nc = Math.ceil(pd.length/nr);
                    }
                    else{
                        nc = this.numberColumns;
                    }
                }
                else if (this.numberColumns) {
                    nc = this.numberColumns;
                    nr = Math.ceil(pd.length/this.numberColumns);
                }
                else {
                    nr = pd.length;
                    nc = 1;
                }
                
                var i, j, tr, td1, td2, lt, rs, color;
                var idx = 0;    
                
                for (i=0; i<nr; i++) {
                    if (reverse){
                        tr = $('<tr class="jqplot-table-legend"></tr>').prependTo(this._elem);
                    }
                    else{
                        tr = $('<tr class="jqplot-table-legend"></tr>').appendTo(this._elem);
                    }
                    for (j=0; j<nc; j++) {
                        if (idx < pd.length){
                            lt = this.labels[idx] || pd[idx][0].toString();
                            color = colorGenerator.next();
                            if (!reverse){
                                if (i>0){
                                    pad = true;
                                }
                                else{
                                    pad = false;
                                }
                            }
                            else{
                                if (i == nr -1){
                                    pad = false;
                                }
                                else{
                                    pad = true;
                                }
                            }
                            rs = (pad) ? this.rowSpacing : '0';
                
                            td1 = $('<td class="jqplot-table-legend" style="text-align:center;padding-top:'+rs+';">'+
                                '<div><div class="jqplot-table-legend-swatch" style="border-color:'+color+';"></div>'+
                                '</div></td>');
                            td2 = $('<td class="jqplot-table-legend" style="padding-top:'+rs+';"></td>');
                            if (this.escapeHtml){
                                td2.text(lt);
                            }
                            else {
                                td2.html(lt);
                            }
                            if (reverse) {
                                td2.prependTo(tr);
                                td1.prependTo(tr);
                            }
                            else {
                                td1.appendTo(tr);
                                td2.appendTo(tr);
                            }
                            pad = true;
                        }
                        idx++;
                    }   
                }
            }
        }
        return this._elem;                
    };
    
    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
        // only set these if there is a donut series
        var setopts = false;
        if (options.seriesDefaults.renderer == $.jqplot.DonutRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer == $.jqplot.DonutRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.DonutAxisRenderer;
            options.legend.renderer = $.jqplot.DonutLegendRenderer;
            options.legend.preDraw = true;
            options.seriesDefaults.pointLabels = {show: false};
        }
    }
    
    // called with scope of plot.
    function postInit(target, data, options) {
        // if multiple series, add a reference to the previous one so that
        // donut rings can nest.
        for (var i=1; i<this.series.length; i++) {
            if (!this.series[i]._previousSeries.length){
                for (var j=0; j<i; j++) {
                    if (this.series[i].renderer.constructor == $.jqplot.DonutRenderer && this.series[j].renderer.constructor == $.jqplot.DonutRenderer) {
                        this.series[i]._previousSeries.push(this.series[j]);
                    }
                }
            }
        }
        for (i=0; i<this.series.length; i++) {
            if (this.series[i].renderer.constructor == $.jqplot.DonutRenderer) {
                this.series[i]._numberSeries = this.series.length;
                // don't allow mouseover and mousedown at same time.
                if (this.series[i].highlightMouseOver) {
                    this.series[i].highlightMouseDown = false;
                }
            }
        }
    }
    
    var postParseOptionsRun = false;
    // called with scope of plot
    function postParseOptions(options) {
        for (var i=0; i<this.series.length; i++) {
            this.series[i].seriesColors = this.seriesColors;
            this.series[i].colorGenerator = $.jqplot.colorGenerator;
        }
    }
    
    function highlight (plot, sidx, pidx) {
        var s = plot.series[sidx];
        var canvas = plot.plugins.donutRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        s._highlightedPoint = pidx;
        plot.plugins.donutRenderer.highlightedSeriesIndex = sidx;
        s.renderer.drawSlice.call(s, canvas._ctx, s._sliceAngles[pidx][0], s._sliceAngles[pidx][1], s.highlightColors[pidx], false);
    }
    
    function unhighlight (plot) {
        var canvas = plot.plugins.donutRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        for (var i=0; i<plot.series.length; i++) {
            plot.series[i]._highlightedPoint = null;
        }
        plot.plugins.donutRenderer.highlightedSeriesIndex = null;
        plot.target.trigger('jqplotDataUnhighlight');
    }
 
    function handleMove(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt1 = jQuery.Event('jqplotDataMouseOver');
            evt1.pageX = ev.pageX;
            evt1.pageY = ev.pageY;
            plot.target.trigger(evt1, ins);
            if (plot.series[ins[0]].highlightMouseOver && !(ins[0] == plot.plugins.donutRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                var evt = jQuery.Event('jqplotDataHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                plot.target.trigger(evt, ins);
                highlight (plot, ins[0], ins[1]);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    } 
    
    function handleMouseDown(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            if (plot.series[ins[0]].highlightMouseDown && !(ins[0] == plot.plugins.donutRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                var evt = jQuery.Event('jqplotDataHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                plot.target.trigger(evt, ins);
                highlight (plot, ins[0], ins[1]);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    }
    
    function handleMouseUp(ev, gridpos, datapos, neighbor, plot) {
        var idx = plot.plugins.donutRenderer.highlightedSeriesIndex;
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
            var idx = plot.plugins.donutRenderer.highlightedSeriesIndex;
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
    
    // called within context of plot
    // create a canvas which we can draw on.
    // insert it before the eventCanvas, so eventCanvas will still capture events.
    function postPlotDraw() {
        // Memory Leaks patch    
        if (this.plugins.donutRenderer && this.plugins.donutRenderer.highlightCanvas) {
            this.plugins.donutRenderer.highlightCanvas.resetCanvas();
            this.plugins.donutRenderer.highlightCanvas = null;
        }

        this.plugins.donutRenderer = {highlightedSeriesIndex:null};
        this.plugins.donutRenderer.highlightCanvas = new $.jqplot.GenericCanvas();
        // do we have any data labels?  if so, put highlight canvas before those
        // Fix for broken jquery :first selector with canvas (VML) elements.
        var labels = $(this.targetId+' .jqplot-data-label');
        if (labels.length) {
            $(labels[0]).before(this.plugins.donutRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-donutRenderer-highlight-canvas', this._plotDimensions, this));
        }
        // else put highlight canvas before event canvas.
        else {
            this.eventCanvas._elem.before(this.plugins.donutRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-donutRenderer-highlight-canvas', this._plotDimensions, this));
        }
        var hctx = this.plugins.donutRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind('mouseleave', {plot:this}, function (ev) { unhighlight(ev.data.plot); });
    }
    
    $.jqplot.preInitHooks.push(preInit);
    
    $.jqplot.DonutTickRenderer = function() {
        $.jqplot.AxisTickRenderer.call(this);
    };
    
    $.jqplot.DonutTickRenderer.prototype = new $.jqplot.AxisTickRenderer();
    $.jqplot.DonutTickRenderer.prototype.constructor = $.jqplot.DonutTickRenderer;
    
})(jQuery);
    
    