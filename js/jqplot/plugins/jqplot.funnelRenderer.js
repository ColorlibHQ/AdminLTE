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
     * Class: $.jqplot.FunnelRenderer
     * Plugin renderer to draw a funnel chart.
     * x values, if present, will be used as labels.
     * y values give area size.
     * 
     * Funnel charts will draw a single series
     * only.
     * 
     * To use this renderer, you need to include the 
     * funnel renderer plugin, for example:
     * 
     * > <script type="text/javascript" src="plugins/jqplot.funnelRenderer.js"></script>
     * 
     * Properties described here are passed into the $.jqplot function
     * as options on the series renderer.  For example:
     * 
     * > plot2 = $.jqplot('chart2', [s1, s2], {
     * >     seriesDefaults: {
     * >         renderer:$.jqplot.FunnelRenderer,
     * >         rendererOptions:{
     * >              sectionMargin: 12,
     * >              widthRatio: 0.3
     * >          }
     * >      }
     * > });
     * 
     * IMPORTANT
     * 
     * *The funnel renderer will reorder data in descending order* so the largest value in
     * the data set is first and displayed on top of the funnel.  Data will then
     * be displayed in descending order down the funnel.  The area of each funnel
     * section will correspond to the value of each data point relative to the sum
     * of all values.  That is section area is proportional to section value divided by 
     * sum of all section values.
     * 
     * If your data is not in descending order when passed into the plot, *it will be
     * reordered* when stored in the series.data property.  A copy of the unordered
     * data is kept in the series._unorderedData property.
     * 
     * A funnel plot will trigger events on the plot target
     * according to user interaction.  All events return the event object,
     * the series index, the point (section) index, and the point data for 
     * the appropriate section. *Note* the point index will referr to the ordered
     * data, not the original unordered data.
     * 
     * 'jqplotDataMouseOver' - triggered when mousing over a section.
     * 'jqplotDataHighlight' - triggered the first time user mouses over a section,
     * if highlighting is enabled.
     * 'jqplotDataUnhighlight' - triggered when a user moves the mouse out of
     * a highlighted section.
     * 'jqplotDataClick' - triggered when the user clicks on a section.
     * 'jqplotDataRightClick' - tiggered when the user right clicks on a section if
     * the "captureRightClick" option is set to true on the plot.
     */
    $.jqplot.FunnelRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.FunnelRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.FunnelRenderer.prototype.constructor = $.jqplot.FunnelRenderer;
    
    // called with scope of a series
    $.jqplot.FunnelRenderer.prototype.init = function(options, plot) {
        // Group: Properties
        //
        // prop: padding
        // padding between the funnel and plot edges, legend, etc.
        this.padding = {top: 20, right: 20, bottom: 20, left: 20};
        // prop: sectionMargin
        // spacing between funnel sections in pixels.
        this.sectionMargin = 6;
        // prop: fill
        // true or false, whether to fill the areas.
        this.fill = true;
        // prop: shadowOffset
        // offset of the shadow from the area and offset of 
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
        // True to highlight area when moused over.
        // This must be false to enable highlightMouseDown to highlight when clicking on a area.
        this.highlightMouseOver = true;
        // prop: highlightMouseDown
        // True to highlight when a mouse button is pressed over a area.
        // This will be disabled if highlightMouseOver is true.
        this.highlightMouseDown = false;
        // prop: highlightColors
        // array of colors to use when highlighting an area.
        this.highlightColors = [];
        // prop: widthRatio
        // The ratio of the width of the top of the funnel to the bottom.
        // a ratio of 0 will make an upside down pyramid. 
        this.widthRatio = 0.2;
        // prop: lineWidth
        // width of line if areas are stroked and not filled.
        this.lineWidth = 2;
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
        this._type = 'funnel';
        
        this.tickRenderer = $.jqplot.FunnelTickRenderer;
        
        // if user has passed in highlightMouseDown option and not set highlightMouseOver, disable highlightMouseOver
        if (options.highlightMouseDown && options.highlightMouseOver == null) {
            options.highlightMouseOver = false;
        }
        
        $.extend(true, this, options);
        
        // index of the currenty highlighted point, if any
        this._highlightedPoint = null;
        
        // lengths of bases, or horizontal sides of areas of trapezoid.
        this._bases = [];
        // total area
        this._atot;
        // areas of segments.
        this._areas = [];
        // vertical lengths of segments.
        this._lengths = [];
        // angle of the funnel to vertical.
        this._angle;
        this._dataIndices = [];
        
        // sort data
        this._unorderedData = $.extend(true, [], this.data);
        var idxs = $.extend(true, [], this.data);
        for (var i=0; i<idxs.length; i++) {
            idxs[i].push(i);
        }
        this.data.sort( function (a, b) { return b[1] - a[1]; } );
        idxs.sort( function (a, b) { return b[1] - a[1]; });
        for (var i=0; i<idxs.length; i++) {
            this._dataIndices.push(idxs[i][2]);
        }
        
        // set highlight colors if none provided
        if (this.highlightColors.length == 0) {
            for (var i=0; i<this.seriesColors.length; i++){
                var rgba = $.jqplot.getColorComponents(this.seriesColors[i]);
                var newrgb = [rgba[0], rgba[1], rgba[2]];
                var sum = newrgb[0] + newrgb[1] + newrgb[2];
                for (var j=0; j<3; j++) {
                    // when darkening, lowest color component can be is 60.
                    newrgb[j] = (sum > 570) ?  newrgb[j] * 0.8 : newrgb[j] + 0.4 * (255 - newrgb[j]);
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
    
    // gridData will be of form [label, percentage of total]
    $.jqplot.FunnelRenderer.prototype.setGridData = function(plot) {
        // set gridData property.  This will hold angle in radians of each data point.
        var sum = 0;
        var td = [];
        for (var i=0; i<this.data.length; i++){
            sum += this.data[i][1];
            td.push([this.data[i][0], this.data[i][1]]);
        }
        
        // normalize y values, so areas are proportional.
        for (var i=0; i<td.length; i++) {
            td[i][1] = td[i][1]/sum;
        }
        
        this._bases = new Array(td.length + 1);
        this._lengths = new Array(td.length);
        
        this.gridData = td;
    };
    
    $.jqplot.FunnelRenderer.prototype.makeGridData = function(data, plot) {
        // set gridData property.  This will hold angle in radians of each data point.
        var sum = 0;
        var td = [];
        for (var i=0; i<this.data.length; i++){
            sum += this.data[i][1];
            td.push([this.data[i][0], this.data[i][1]]);
        }
        
        // normalize y values, so areas are proportional.
        for (var i=0; i<td.length; i++) {
            td[i][1] = td[i][1]/sum;
        }
        
        this._bases = new Array(td.length + 1);
        this._lengths = new Array(td.length);
        
        return td;
    };
    
    $.jqplot.FunnelRenderer.prototype.drawSection = function (ctx, vertices, color, isShadow) {
        var fill = this.fill;
        var lineWidth = this.lineWidth;
        ctx.save();
        
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
            ctx.beginPath();  
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(vertices[0][0], vertices[0][1]);
            for (var i=1; i<4; i++) {
                ctx.lineTo(vertices[i][0], vertices[i][1]);
            }
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
    $.jqplot.FunnelRenderer.prototype.draw = function (ctx, gd, options, plot) {
        var i;
        var opts = (options != undefined) ? options : {};
        // offset and direction of offset due to legend placement
        var offx = 0;
        var offy = 0;
        var trans = 1;
        this._areas = [];
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
        
        var loff = (trans==1) ? this.padding.left + offx : this.padding.left;
        var toff = (trans==1) ? this.padding.top + offy : this.padding.top;
        var roff = (trans==-1) ? this.padding.right + offx : this.padding.right;
        var boff = (trans==-1) ? this.padding.bottom + offy : this.padding.bottom;
        
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var cw = ctx.canvas.width;
        var ch = ctx.canvas.height;
        this._bases[0] = cw - loff - roff;
        var ltot = this._length = ch - toff - boff;

        var hend = this._bases[0]*this.widthRatio;
        this._atot = ltot/2 * (this._bases[0] + this._bases[0]*this.widthRatio);

        this._angle = Math.atan((this._bases[0] - hend)/2/ltot);

        for (i=0; i<gd.length; i++) {
            this._areas.push(gd[i][1] * this._atot);
        }

        
        var guess, err, count, lsum=0;
        var tolerance = 0.0001;

        for (i=0; i<this._areas.length; i++) {
            guess = this._areas[i]/this._bases[i];
            err = 999999;
            this._lengths[i] = guess;
            count = 0;
            while (err > this._lengths[i]*tolerance && count < 100) {
                this._lengths[i] = this._areas[i]/(this._bases[i] - this._lengths[i] * Math.tan(this._angle));
                err = Math.abs(this._lengths[i] - guess);
                this._bases[i+1] = this._bases[i] - (2*this._lengths[i]*Math.tan(this._angle));
                guess = this._lengths[i];
                count++;
            }
            lsum += this._lengths[i];
        }
        
        // figure out vertices of each section
        this._vertices = new Array(gd.length);
        
        // these are 4 coners of entire trapezoid
        var p0 = [loff, toff],
            p1 = [loff+this._bases[0], toff],
            p2 = [loff + (this._bases[0] - this._bases[this._bases.length-1])/2, toff + this._length],
            p3 = [p2[0] + this._bases[this._bases.length-1], p2[1]];
            
        // equations of right and left sides, returns x, y values given height of section (y value)
        function findleft (l) {
            var m = (p0[1] - p2[1])/(p0[0] - p2[0]);
            var b = p0[1] - m*p0[0];
            var y = l + p0[1];
            
            return [(y - b)/m, y];
        }
        
        function findright (l) {
            var m = (p1[1] - p3[1])/(p1[0] - p3[0]);
            var b = p1[1] - m*p1[0];
            var y = l + p1[1];
            
            return [(y - b)/m, y];
        }
        
        var x = offx, y = offy;
        var h=0, adj=0;
        
        for (i=0; i<gd.length; i++) {
            this._vertices[i] = new Array();
            var v = this._vertices[i];
            var sm = this.sectionMargin;
            if (i == 0) {
                adj = 0;
            }
            if (i == 1) {
                adj = sm/3;
            }
            else if (i > 0 && i < gd.length-1) {
                adj = sm/2;
            }
            else if (i == gd.length -1) {
                adj = 2*sm/3;
            }
            v.push(findleft(h+adj));
            v.push(findright(h+adj));
            h += this._lengths[i];
            if (i == 0) {
                adj = -2*sm/3;
            }
            else if (i > 0 && i < gd.length-1) {
                adj = -sm/2;
            }
            else if (i == gd.length - 1) {
                adj = 0;
            }
            v.push(findright(h+adj));
            v.push(findleft(h+adj));
            
        }

        if (this.shadow) {
            var shadowColor = 'rgba(0,0,0,'+this.shadowAlpha+')';
            for (var i=0; i<gd.length; i++) {
                this.renderer.drawSection.call (this, ctx, this._vertices[i], shadowColor, true);
            }
            
        }
        for (var i=0; i<gd.length; i++) {
            var v = this._vertices[i];
            this.renderer.drawSection.call (this, ctx, v, this.seriesColors[i]);
            
            if (this.showDataLabels && gd[i][1]*100 >= this.dataLabelThreshold) {
                var fstr, label;
                
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
                    label = $.jqplot.sprintf(fstr, gd[i][1]*100);
                }
                else if (this.dataLabels.constructor == Array) {
                    fstr = this.dataLabelFormatString || '%s';
                    label = $.jqplot.sprintf(fstr, this.dataLabels[this._dataIndices[i]]);
                }
                
                var fact = (this._radius ) * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge;
                
                var x = (v[0][0] + v[1][0])/2 + this.canvas._offsets.left;
                var y = (v[1][1] + v[2][1])/2 + this.canvas._offsets.top;
                
                var labelelem = $('<span class="jqplot-funnel-series jqplot-data-label" style="position:absolute;">' + label + '</span>').insertBefore(plot.eventCanvas._elem);
                x -= labelelem.width()/2;
                y -= labelelem.height()/2;
                x = Math.round(x);
                y = Math.round(y);
                labelelem.css({left: x, top: y});
            }
            
        }
               
    };
    
    $.jqplot.FunnelAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.FunnelAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.FunnelAxisRenderer.prototype.constructor = $.jqplot.FunnelAxisRenderer;
        
    
    // There are no traditional axes on a funnel chart.  We just need to provide
    // dummy objects with properties so the plot will render.
    // called with scope of axis object.
    $.jqplot.FunnelAxisRenderer.prototype.init = function(options){
        //
        this.tickRenderer = $.jqplot.FunnelTickRenderer;
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
    
    
    
    /**
     * Class: $.jqplot.FunnelLegendRenderer
     * Legend Renderer specific to funnel plots.  Set by default
     * when the user creates a funnel plot.
     */
    $.jqplot.FunnelLegendRenderer = function(){
        $.jqplot.TableLegendRenderer.call(this);
    };
    
    $.jqplot.FunnelLegendRenderer.prototype = new $.jqplot.TableLegendRenderer();
    $.jqplot.FunnelLegendRenderer.prototype.constructor = $.jqplot.FunnelLegendRenderer;
    
    $.jqplot.FunnelLegendRenderer.prototype.init = function(options) {
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
    $.jqplot.FunnelLegendRenderer.prototype.draw = function() {
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
            // Funnel charts legends don't go by number of series, but by number of data points
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
    
    // $.jqplot.FunnelLegendRenderer.prototype.pack = function(offsets) {
    //     if (this.show) {
    //         // fake a grid for positioning
    //         var grid = {_top:offsets.top, _left:offsets.left, _right:offsets.right, _bottom:this._plotDimensions.height - offsets.bottom};        
    //         if (this.placement == 'insideGrid') {
    //             switch (this.location) {
    //                 case 'nw':
    //                     var a = grid._left + this.xoffset;
    //                     var b = grid._top + this.yoffset;
    //                     this._elem.css('left', a);
    //                     this._elem.css('top', b);
    //                     break;
    //                 case 'n':
    //                     var a = (offsets.left + (this._plotDimensions.width - offsets.right))/2 - this.getWidth()/2;
    //                     var b = grid._top + this.yoffset;
    //                     this._elem.css('left', a);
    //                     this._elem.css('top', b);
    //                     break;
    //                 case 'ne':
    //                     var a = offsets.right + this.xoffset;
    //                     var b = grid._top + this.yoffset;
    //                     this._elem.css({right:a, top:b});
    //                     break;
    //                 case 'e':
    //                     var a = offsets.right + this.xoffset;
    //                     var b = (offsets.top + (this._plotDimensions.height - offsets.bottom))/2 - this.getHeight()/2;
    //                     this._elem.css({right:a, top:b});
    //                     break;
    //                 case 'se':
    //                     var a = offsets.right + this.xoffset;
    //                     var b = offsets.bottom + this.yoffset;
    //                     this._elem.css({right:a, bottom:b});
    //                     break;
    //                 case 's':
    //                     var a = (offsets.left + (this._plotDimensions.width - offsets.right))/2 - this.getWidth()/2;
    //                     var b = offsets.bottom + this.yoffset;
    //                     this._elem.css({left:a, bottom:b});
    //                     break;
    //                 case 'sw':
    //                     var a = grid._left + this.xoffset;
    //                     var b = offsets.bottom + this.yoffset;
    //                     this._elem.css({left:a, bottom:b});
    //                     break;
    //                 case 'w':
    //                     var a = grid._left + this.xoffset;
    //                     var b = (offsets.top + (this._plotDimensions.height - offsets.bottom))/2 - this.getHeight()/2;
    //                     this._elem.css({left:a, top:b});
    //                     break;
    //                 default:  // same as 'se'
    //                     var a = grid._right - this.xoffset;
    //                     var b = grid._bottom + this.yoffset;
    //                     this._elem.css({right:a, bottom:b});
    //                     break;
    //             }
    //             
    //         }
    //         else {
    //             switch (this.location) {
    //                 case 'nw':
    //                     var a = this._plotDimensions.width - grid._left + this.xoffset;
    //                     var b = grid._top + this.yoffset;
    //                     this._elem.css('right', a);
    //                     this._elem.css('top', b);
    //                     break;
    //                 case 'n':
    //                     var a = (offsets.left + (this._plotDimensions.width - offsets.right))/2 - this.getWidth()/2;
    //                     var b = this._plotDimensions.height - grid._top + this.yoffset;
    //                     this._elem.css('left', a);
    //                     this._elem.css('bottom', b);
    //                     break;
    //                 case 'ne':
    //                     var a = this._plotDimensions.width - offsets.right + this.xoffset;
    //                     var b = grid._top + this.yoffset;
    //                     this._elem.css({left:a, top:b});
    //                     break;
    //                 case 'e':
    //                     var a = this._plotDimensions.width - offsets.right + this.xoffset;
    //                     var b = (offsets.top + (this._plotDimensions.height - offsets.bottom))/2 - this.getHeight()/2;
    //                     this._elem.css({left:a, top:b});
    //                     break;
    //                 case 'se':
    //                     var a = this._plotDimensions.width - offsets.right + this.xoffset;
    //                     var b = offsets.bottom + this.yoffset;
    //                     this._elem.css({left:a, bottom:b});
    //                     break;
    //                 case 's':
    //                     var a = (offsets.left + (this._plotDimensions.width - offsets.right))/2 - this.getWidth()/2;
    //                     var b = this._plotDimensions.height - offsets.bottom + this.yoffset;
    //                     this._elem.css({left:a, top:b});
    //                     break;
    //                 case 'sw':
    //                     var a = this._plotDimensions.width - grid._left + this.xoffset;
    //                     var b = offsets.bottom + this.yoffset;
    //                     this._elem.css({right:a, bottom:b});
    //                     break;
    //                 case 'w':
    //                     var a = this._plotDimensions.width - grid._left + this.xoffset;
    //                     var b = (offsets.top + (this._plotDimensions.height - offsets.bottom))/2 - this.getHeight()/2;
    //                     this._elem.css({right:a, top:b});
    //                     break;
    //                 default:  // same as 'se'
    //                     var a = grid._right - this.xoffset;
    //                     var b = grid._bottom + this.yoffset;
    //                     this._elem.css({right:a, bottom:b});
    //                     break;
    //             }
    //         }
    //     } 
    // };
    
    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
        // only set these if there is a funnel series
        var setopts = false;
        if (options.seriesDefaults.renderer == $.jqplot.FunnelRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer == $.jqplot.FunnelRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.FunnelAxisRenderer;
            options.legend.renderer = $.jqplot.FunnelLegendRenderer;
            options.legend.preDraw = true;
            options.sortData = false;
            options.seriesDefaults.pointLabels = {show: false};
        }
    }
    
    function postInit(target, data, options) {
        // if multiple series, add a reference to the previous one so that
        // funnel rings can nest.
        for (var i=0; i<this.series.length; i++) {
            if (this.series[i].renderer.constructor == $.jqplot.FunnelRenderer) {
                // don't allow mouseover and mousedown at same time.
                if (this.series[i].highlightMouseOver) {
                    this.series[i].highlightMouseDown = false;
                }
            }
        }
    }
    
    // called with scope of plot
    function postParseOptions(options) {
        for (var i=0; i<this.series.length; i++) {
            this.series[i].seriesColors = this.seriesColors;
            this.series[i].colorGenerator = $.jqplot.colorGenerator;
        }
    }
    
    function highlight (plot, sidx, pidx) {
        var s = plot.series[sidx];
        var canvas = plot.plugins.funnelRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        s._highlightedPoint = pidx;
        plot.plugins.funnelRenderer.highlightedSeriesIndex = sidx;
        s.renderer.drawSection.call(s, canvas._ctx, s._vertices[pidx], s.highlightColors[pidx], false);
    }
    
    function unhighlight (plot) {
        var canvas = plot.plugins.funnelRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        for (var i=0; i<plot.series.length; i++) {
            plot.series[i]._highlightedPoint = null;
        }
        plot.plugins.funnelRenderer.highlightedSeriesIndex = null;
        plot.target.trigger('jqplotDataUnhighlight');
    }
    
    function handleMove(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt1 = jQuery.Event('jqplotDataMouseOver');
            evt1.pageX = ev.pageX;
            evt1.pageY = ev.pageY;
            plot.target.trigger(evt1, ins);
            if (plot.series[ins[0]].highlightMouseOver && !(ins[0] == plot.plugins.funnelRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
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
            if (plot.series[ins[0]].highlightMouseDown && !(ins[0] == plot.plugins.funnelRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
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
        var idx = plot.plugins.funnelRenderer.highlightedSeriesIndex;
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
            var idx = plot.plugins.funnelRenderer.highlightedSeriesIndex;
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
        if (this.plugins.funnelRenderer && this.plugins.funnelRenderer.highlightCanvas) {
            this.plugins.funnelRenderer.highlightCanvas.resetCanvas();
            this.plugins.funnelRenderer.highlightCanvas = null;
        }

        this.plugins.funnelRenderer = {};
        this.plugins.funnelRenderer.highlightCanvas = new $.jqplot.GenericCanvas();
        
        // do we have any data labels?  if so, put highlight canvas before those
        var labels = $(this.targetId+' .jqplot-data-label');
        if (labels.length) {
            $(labels[0]).before(this.plugins.funnelRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-funnelRenderer-highlight-canvas', this._plotDimensions, this));
        }
        // else put highlight canvas before event canvas.
        else {
            this.eventCanvas._elem.before(this.plugins.funnelRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-funnelRenderer-highlight-canvas', this._plotDimensions, this));
        }
        var hctx = this.plugins.funnelRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind('mouseleave', {plot:this}, function (ev) { unhighlight(ev.data.plot); });
    }
    
    $.jqplot.preInitHooks.push(preInit);
    
    $.jqplot.FunnelTickRenderer = function() {
        $.jqplot.AxisTickRenderer.call(this);
    };
    
    $.jqplot.FunnelTickRenderer.prototype = new $.jqplot.AxisTickRenderer();
    $.jqplot.FunnelTickRenderer.prototype.constructor = $.jqplot.FunnelTickRenderer;
    
})(jQuery);
    
    