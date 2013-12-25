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
    $.jqplot.eventListenerHooks.push(['jqplotMouseMove', handleMove]);
    
    /**
     * Class: $.jqplot.Highlighter
     * Plugin which will highlight data points when they are moused over.
     * 
     * To use this plugin, include the js
     * file in your source:
     * 
     * > <script type="text/javascript" src="plugins/jqplot.highlighter.js"></script>
     * 
     * A tooltip providing information about the data point is enabled by default.
     * To disable the tooltip, set "showTooltip" to false.
     * 
     * You can control what data is displayed in the tooltip with various
     * options.  The "tooltipAxes" option controls whether the x, y or both
     * data values are displayed.
     * 
     * Some chart types (e.g. hi-low-close) have more than one y value per
     * data point. To display the additional values in the tooltip, set the
     * "yvalues" option to the desired number of y values present (3 for a hlc chart).
     * 
     * By default, data values will be formatted with the same formatting
     * specifiers as used to format the axis ticks.  A custom format code
     * can be supplied with the tooltipFormatString option.  This will apply 
     * to all values in the tooltip.  
     * 
     * For more complete control, the "formatString" option can be set.  This
     * Allows conplete control over tooltip formatting.  Values are passed to
     * the format string in an order determined by the "tooltipAxes" and "yvalues"
     * options.  So, if you have a hi-low-close chart and you just want to display 
     * the hi-low-close values in the tooltip, you could set a formatString like:
     * 
     * > highlighter: {
     * >     tooltipAxes: 'y',
     * >     yvalues: 3,
     * >     formatString:'<table class="jqplot-highlighter">
     * >         <tr><td>hi:</td><td>%s</td></tr>
     * >         <tr><td>low:</td><td>%s</td></tr>
     * >         <tr><td>close:</td><td>%s</td></tr></table>'
     * > }
     * 
     */
    $.jqplot.Highlighter = function(options) {
        // Group: Properties
        //
        //prop: show
        // true to show the highlight.
        this.show = $.jqplot.config.enablePlugins;
        // prop: markerRenderer
        // Renderer used to draw the marker of the highlighted point.
        // Renderer will assimilate attributes from the data point being highlighted,
        // so no attributes need set on the renderer directly.
        // Default is to turn off shadow drawing on the highlighted point.
        this.markerRenderer = new $.jqplot.MarkerRenderer({shadow:false});
        // prop: showMarker
        // true to show the marker
        this.showMarker  = true;
        // prop: lineWidthAdjust
        // Pixels to add to the lineWidth of the highlight.
        this.lineWidthAdjust = 2.5;
        // prop: sizeAdjust
        // Pixels to add to the overall size of the highlight.
        this.sizeAdjust = 5;
        // prop: showTooltip
        // Show a tooltip with data point values.
        this.showTooltip = true;
        // prop: tooltipLocation
        // Where to position tooltip, 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'
        this.tooltipLocation = 'nw';
        // prop: fadeTooltip
        // true = fade in/out tooltip, flase = show/hide tooltip
        this.fadeTooltip = true;
        // prop: tooltipFadeSpeed
        // 'slow', 'def', 'fast', or number of milliseconds.
        this.tooltipFadeSpeed = "fast";
        // prop: tooltipOffset
        // Pixel offset of tooltip from the highlight.
        this.tooltipOffset = 2;
        // prop: tooltipAxes
        // Which axes to display in tooltip, 'x', 'y' or 'both', 'xy' or 'yx'
        // 'both' and 'xy' are equivalent, 'yx' reverses order of labels.
        this.tooltipAxes = 'both';
        // prop; tooltipSeparator
        // String to use to separate x and y axes in tooltip.
        this.tooltipSeparator = ', ';
        // prop; tooltipContentEditor
        // Function used to edit/augment/replace the formatted tooltip contents.
        // Called as str = tooltipContentEditor(str, seriesIndex, pointIndex)
        // where str is the generated tooltip html and seriesIndex and pointIndex identify
        // the data point being highlighted. Should return the html for the tooltip contents.
        this.tooltipContentEditor = null;
        // prop: useAxesFormatters
        // Use the x and y axes formatters to format the text in the tooltip.
        this.useAxesFormatters = true;
        // prop: tooltipFormatString
        // sprintf format string for the tooltip.
        // Uses Ash Searle's javascript sprintf implementation
        // found here: http://hexmen.com/blog/2007/03/printf-sprintf/
        // See http://perldoc.perl.org/functions/sprintf.html for reference.
        // Additional "p" and "P" format specifiers added by Chris Leonello.
        this.tooltipFormatString = '%.5P';
        // prop: formatString
        // alternative to tooltipFormatString
        // will format the whole tooltip text, populating with x, y values as
        // indicated by tooltipAxes option.  So, you could have a tooltip like:
        // 'Date: %s, number of cats: %d' to format the whole tooltip at one go.
        // If useAxesFormatters is true, values will be formatted according to
        // Axes formatters and you can populate your tooltip string with 
        // %s placeholders.
        this.formatString = null;
        // prop: yvalues
        // Number of y values to expect in the data point array.
        // Typically this is 1.  Certain plots, like OHLC, will
        // have more y values in each data point array.
        this.yvalues = 1;
        // prop: bringSeriesToFront
        // This option requires jQuery 1.4+
        // True to bring the series of the highlighted point to the front
        // of other series.
        this.bringSeriesToFront = false;
        this._tooltipElem;
        this.isHighlighting = false;
        this.currentNeighbor = null;

        $.extend(true, this, options);
    };
    
    var locations = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    var locationIndicies = {'nw':0, 'n':1, 'ne':2, 'e':3, 'se':4, 's':5, 'sw':6, 'w':7};
    var oppositeLocations = ['se', 's', 'sw', 'w', 'nw', 'n', 'ne', 'e'];
    
    // axis.renderer.tickrenderer.formatter
    
    // called with scope of plot
    $.jqplot.Highlighter.init = function (target, data, opts){
        var options = opts || {};
        // add a highlighter attribute to the plot
        this.plugins.highlighter = new $.jqplot.Highlighter(options.highlighter);
    };
    
    // called within scope of series
    $.jqplot.Highlighter.parseOptions = function (defaults, options) {
        // Add a showHighlight option to the series 
        // and set it to true by default.
        this.showHighlight = true;
    };
    
    // called within context of plot
    // create a canvas which we can draw on.
    // insert it before the eventCanvas, so eventCanvas will still capture events.
    $.jqplot.Highlighter.postPlotDraw = function() {
        // Memory Leaks patch    
        if (this.plugins.highlighter && this.plugins.highlighter.highlightCanvas) {
            this.plugins.highlighter.highlightCanvas.resetCanvas();
            this.plugins.highlighter.highlightCanvas = null;
        }

        if (this.plugins.highlighter && this.plugins.highlighter._tooltipElem) {
            this.plugins.highlighter._tooltipElem.emptyForce();
            this.plugins.highlighter._tooltipElem = null;
        }

        this.plugins.highlighter.highlightCanvas = new $.jqplot.GenericCanvas();
        
        this.eventCanvas._elem.before(this.plugins.highlighter.highlightCanvas.createElement(this._gridPadding, 'jqplot-highlight-canvas', this._plotDimensions, this));
        this.plugins.highlighter.highlightCanvas.setContext();

        var elem = document.createElement('div');
        this.plugins.highlighter._tooltipElem = $(elem);
        elem = null;
        this.plugins.highlighter._tooltipElem.addClass('jqplot-highlighter-tooltip');
        this.plugins.highlighter._tooltipElem.css({position:'absolute', display:'none'});
        
        this.eventCanvas._elem.before(this.plugins.highlighter._tooltipElem);
    };
    
    $.jqplot.preInitHooks.push($.jqplot.Highlighter.init);
    $.jqplot.preParseSeriesOptionsHooks.push($.jqplot.Highlighter.parseOptions);
    $.jqplot.postDrawHooks.push($.jqplot.Highlighter.postPlotDraw);
    
    function draw(plot, neighbor) {
        var hl = plot.plugins.highlighter;
        var s = plot.series[neighbor.seriesIndex];
        var smr = s.markerRenderer;
        var mr = hl.markerRenderer;
        mr.style = smr.style;
        mr.lineWidth = smr.lineWidth + hl.lineWidthAdjust;
        mr.size = smr.size + hl.sizeAdjust;
        var rgba = $.jqplot.getColorComponents(smr.color);
        var newrgb = [rgba[0], rgba[1], rgba[2]];
        var alpha = (rgba[3] >= 0.6) ? rgba[3]*0.6 : rgba[3]*(2-rgba[3]);
        mr.color = 'rgba('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+','+alpha+')';
        mr.init();
        mr.draw(s.gridData[neighbor.pointIndex][0], s.gridData[neighbor.pointIndex][1], hl.highlightCanvas._ctx);
    }
    
    function showTooltip(plot, series, neighbor) {
        // neighbor looks like: {seriesIndex: i, pointIndex:j, gridData:p, data:s.data[j]}
        // gridData should be x,y pixel coords on the grid.
        // add the plot._gridPadding to that to get x,y in the target.
        var hl = plot.plugins.highlighter;
        var elem = hl._tooltipElem;
        var serieshl = series.highlighter || {};

        var opts = $.extend(true, {}, hl, serieshl);

        if (opts.useAxesFormatters) {
            var xf = series._xaxis._ticks[0].formatter;
            var yf = series._yaxis._ticks[0].formatter;
            var xfstr = series._xaxis._ticks[0].formatString;
            var yfstr = series._yaxis._ticks[0].formatString;
            var str;
            var xstr = xf(xfstr, neighbor.data[0]);
            var ystrs = [];
            for (var i=1; i<opts.yvalues+1; i++) {
                ystrs.push(yf(yfstr, neighbor.data[i]));
            }
            if (typeof opts.formatString === 'string') {
                switch (opts.tooltipAxes) {
                    case 'both':
                    case 'xy':
                        ystrs.unshift(xstr);
                        ystrs.unshift(opts.formatString);
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    case 'yx':
                        ystrs.push(xstr);
                        ystrs.unshift(opts.formatString);
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    case 'x':
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, [opts.formatString, xstr]);
                        break;
                    case 'y':
                        ystrs.unshift(opts.formatString);
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    default: // same as xy
                        ystrs.unshift(xstr);
                        ystrs.unshift(opts.formatString);
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                } 
            }
            else {
                switch (opts.tooltipAxes) {
                    case 'both':
                    case 'xy':
                        str = xstr;
                        for (var i=0; i<ystrs.length; i++) {
                            str += opts.tooltipSeparator + ystrs[i];
                        }
                        break;
                    case 'yx':
                        str = '';
                        for (var i=0; i<ystrs.length; i++) {
                            str += ystrs[i] + opts.tooltipSeparator;
                        }
                        str += xstr;
                        break;
                    case 'x':
                        str = xstr;
                        break;
                    case 'y':
                        str = ystrs.join(opts.tooltipSeparator);
                        break;
                    default: // same as 'xy'
                        str = xstr;
                        for (var i=0; i<ystrs.length; i++) {
                            str += opts.tooltipSeparator + ystrs[i];
                        }
                        break;
                    
                }                
            }
        }
        else {
            var str;
            if (typeof opts.formatString ===  'string') {
                str = $.jqplot.sprintf.apply($.jqplot.sprintf, [opts.formatString].concat(neighbor.data));
            }

            else {
                if (opts.tooltipAxes == 'both' || opts.tooltipAxes == 'xy') {
                    str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]) + opts.tooltipSeparator + $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]);
                }
                else if (opts.tooltipAxes == 'yx') {
                    str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]) + opts.tooltipSeparator + $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]);
                }
                else if (opts.tooltipAxes == 'x') {
                    str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]);
                }
                else if (opts.tooltipAxes == 'y') {
                    str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]);
                } 
            }
        }
        if ($.isFunction(opts.tooltipContentEditor)) {
            // args str, seriesIndex, pointIndex are essential so the hook can look up
            // extra data for the point.
            str = opts.tooltipContentEditor(str, neighbor.seriesIndex, neighbor.pointIndex, plot);
        }
        elem.html(str);
        var gridpos = {x:neighbor.gridData[0], y:neighbor.gridData[1]};
        var ms = 0;
        var fact = 0.707;
        if (series.markerRenderer.show == true) { 
            ms = (series.markerRenderer.size + opts.sizeAdjust)/2;
        }

        var loc = locations;
        if (series.fillToZero && series.fill && neighbor.data[1] < 0) {
          loc = oppositeLocations;
        }

        switch (loc[locationIndicies[opts.tooltipLocation]]) {
            case 'nw':
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true) - opts.tooltipOffset - fact * ms;
                var y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(true) - fact * ms;
                break;
            case 'n':
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true)/2;
                var y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(true) - ms;
                break;
            case 'ne':
                var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + fact * ms;
                var y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(true) - fact * ms;
                break;
            case 'e':
                var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + ms;
                var y = gridpos.y + plot._gridPadding.top - elem.outerHeight(true)/2;
                break;
            case 'se':
                var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + fact * ms;
                var y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + fact * ms;
                break;
            case 's':
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true)/2;
                var y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + ms;
                break;
            case 'sw':
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true) - opts.tooltipOffset - fact * ms;
                var y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + fact * ms;
                break;
            case 'w':
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true) - opts.tooltipOffset - ms;
                var y = gridpos.y + plot._gridPadding.top - elem.outerHeight(true)/2;
                break;
            default: // same as 'nw'
                var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(true) - opts.tooltipOffset - fact * ms;
                var y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(true) - fact * ms;
                break;
        }
        elem.css('left', x);
        elem.css('top', y);
        if (opts.fadeTooltip) {
            // Fix for stacked up animations.  Thnanks Trevor!
            elem.stop(true,true).fadeIn(opts.tooltipFadeSpeed);
        }
        else {
            elem.show();
        }
        elem = null;
        
    }
    
    function handleMove(ev, gridpos, datapos, neighbor, plot) {
        var hl = plot.plugins.highlighter;
        var c = plot.plugins.cursor;
        if (hl.show) {
            if (neighbor == null && hl.isHighlighting) {
                var evt = jQuery.Event('jqplotHighlighterUnhighlight');
                plot.target.trigger(evt);

                var ctx = hl.highlightCanvas._ctx;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                if (hl.fadeTooltip) {
                    hl._tooltipElem.fadeOut(hl.tooltipFadeSpeed);
                }
                else {
                    hl._tooltipElem.hide();
                }
                if (hl.bringSeriesToFront) {
                    plot.restorePreviousSeriesOrder();
                }
                hl.isHighlighting = false;
                hl.currentNeighbor = null;
                ctx = null;
            }
            else if (neighbor != null && plot.series[neighbor.seriesIndex].showHighlight && !hl.isHighlighting) {
                var evt = jQuery.Event('jqplotHighlighterHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data, plot];
                plot.target.trigger(evt, ins);

                hl.isHighlighting = true;
                hl.currentNeighbor = neighbor;
                if (hl.showMarker) {
                    draw(plot, neighbor);
                }
                if (plot.series[neighbor.seriesIndex].show && hl.showTooltip && (!c || !c._zoom.started)) {
                    showTooltip(plot, plot.series[neighbor.seriesIndex], neighbor);
                }
                if (hl.bringSeriesToFront) {
                    plot.moveSeriesToFront(neighbor.seriesIndex);
                }
            }
            // check to see if we're highlighting the wrong point.
            else if (neighbor != null && hl.isHighlighting && hl.currentNeighbor != neighbor) {
                // highlighting the wrong point.

                // if new series allows highlighting, highlight new point.
                if (plot.series[neighbor.seriesIndex].showHighlight) {
                    var ctx = hl.highlightCanvas._ctx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    hl.isHighlighting = true;
                    hl.currentNeighbor = neighbor;
                    if (hl.showMarker) {
                        draw(plot, neighbor);
                    }
                    if (plot.series[neighbor.seriesIndex].show && hl.showTooltip && (!c || !c._zoom.started)) {
                        showTooltip(plot, plot.series[neighbor.seriesIndex], neighbor);
                    }
                    if (hl.bringSeriesToFront) {
                        plot.moveSeriesToFront(neighbor.seriesIndex);
                    }                    
                }                
            }
        }
    }
})(jQuery);