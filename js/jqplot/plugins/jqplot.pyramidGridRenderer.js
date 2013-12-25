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
    // Class: $.jqplot.CanvasGridRenderer
    // The default jqPlot grid renderer, creating a grid on a canvas element.
    // The renderer has no additional options beyond the <Grid> class.
    $.jqplot.PyramidGridRenderer = function(){
        $.jqplot.CanvasGridRenderer.call(this);
    };

    $.jqplot.PyramidGridRenderer.prototype = new $.jqplot.CanvasGridRenderer();
    $.jqplot.PyramidGridRenderer.prototype.constructor = $.jqplot.PyramidGridRenderer;
    
    // called with context of Grid object
    $.jqplot.CanvasGridRenderer.prototype.init = function(options) {
        this._ctx;
        this.plotBands = {
            show: false,
            color: 'rgb(230, 219, 179)',
            axis: 'y',
            start: null,
            interval: 10
        };
        $.extend(true, this, options);
        // set the shadow renderer options
        var sopts = {lineJoin:'miter', lineCap:'round', fill:false, isarc:false, angle:this.shadowAngle, offset:this.shadowOffset, alpha:this.shadowAlpha, depth:this.shadowDepth, lineWidth:this.shadowWidth, closePath:false, strokeStyle:this.shadowColor};
        this.renderer.shadowRenderer.init(sopts);
    };
    
    $.jqplot.PyramidGridRenderer.prototype.draw = function() {
        this._ctx = this._elem.get(0).getContext("2d");
        var ctx = this._ctx;
        var axes = this._axes;
        var xp = axes.xaxis.u2p;
        var yp = axes.yMidAxis.u2p;
        var xnudge = axes.xaxis.max/1000.0;
        var xp0 = xp(0);
        var xpn = xp(xnudge);
        var ax = ['xaxis', 'yaxis', 'x2axis', 'y2axis','yMidAxis'];
        // Add the grid onto the grid canvas.  This is the bottom most layer.
        ctx.save();
        ctx.clearRect(0, 0, this._plotDimensions.width, this._plotDimensions.height);
        ctx.fillStyle = this.backgroundColor || this.background;

        ctx.fillRect(this._left, this._top, this._width, this._height);

        if (this.plotBands.show) {
            ctx.save();
            var pb = this.plotBands;
            ctx.fillStyle = pb.color;
            var axis;
            var x, y, w, h;
            // find axis to work with
            if (pb.axis.charAt(0) === 'x') {
                if (axes.xaxis.show) {
                    axis = axes.xaxis;
                }
            }
            else if (pb.axis.charAt(0) === 'y') {
                if (axes.yaxis.show) {
                    axis = axes.yaxis;
                }
                else if (axes.y2axis.show) {
                    axis = axes.y2axis;
                }
                else if (axes.yMidAxis.show) {
                    axis = axes.yMidAxis;
                }
            }

            if (axis !== undefined) {
                // draw some rectangles
                var start = pb.start;
                if (start === null) {
                    start = axis.min;
                }
                for (var i = start; i < axis.max; i += 2 * pb.interval) {
                    if (axis.name.charAt(0) === 'y') {
                        x = this._left;
                        if ((i + pb.interval) < axis.max) {
                            y = axis.series_u2p(i + pb.interval) + this._top;
                        }
                        else {
                            y = axis.series_u2p(axis.max) + this._top;
                        }
                        w = this._right - this._left;
                        h = axis.series_u2p(start) - axis.series_u2p(start + pb.interval);
                        ctx.fillRect(x, y, w, h);
                    }
                    // else {
                    //     y = 0;
                    //     x = axis.series_u2p(i);
                    //     h = this._height;
                    //     w = axis.series_u2p(start + pb.interval) - axis.series_u2p(start);
                    // }

                }
            }
            ctx.restore();
        }
        
        ctx.save();
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'butt';
        ctx.lineWidth = this.gridLineWidth;
        ctx.strokeStyle = this.gridLineColor;
        var b, e, s, m;
        for (var i=5; i>0; i--) {
            var name = ax[i-1];
            var axis = axes[name];
            var ticks = axis._ticks;
            var numticks = ticks.length;
            if (axis.show) {
                if (axis.drawBaseline) {
                    var bopts = {};
                    if (axis.baselineWidth !== null) {
                        bopts.lineWidth = axis.baselineWidth;
                    }
                    if (axis.baselineColor !== null) {
                        bopts.strokeStyle = axis.baselineColor;
                    }
                    switch (name) {
                        case 'xaxis':
                            if (axes.yMidAxis.show) {
                                drawLine (this._left, this._bottom, xp0, this._bottom, bopts);
                                drawLine (xpn, this._bottom, this._right, this._bottom, bopts);
                            }
                            else {
                                drawLine (this._left, this._bottom, this._right, this._bottom, bopts);
                            }
                            break;
                        case 'yaxis':
                            drawLine (this._left, this._bottom, this._left, this._top, bopts);
                            break;
                        case 'yMidAxis':               
                            drawLine(xp0, this._bottom, xp0, this._top, bopts);
                            drawLine(xpn, this._bottom, xpn, this._top, bopts);
                            break;
                        case 'x2axis':
                            if (axes.yMidAxis.show) {
                                drawLine (this._left, this._top, xp0, this._top, bopts);
                                drawLine (xpn, this._top, this._right, this._top, bopts);
                            }
                            else {
                                drawLine (this._left, this._bottom, this._right, this._bottom, bopts);
                            }
                            break;
                        case 'y2axis':
                            drawLine (this._right, this._bottom, this._right, this._top, bopts);
                            break;

                    }
                }
                for (var j=numticks; j>0; j--) {
                    var t = ticks[j-1];
                    if (t.show) {
                        var pos = Math.round(axis.u2p(t.value)) + 0.5;
                        switch (name) {
                            case 'xaxis':
                                // draw the grid line if we should
                                if (t.showGridline && this.drawGridlines && (!t.isMinorTick || axis.showMinorTicks)) {
                                    drawLine(pos, this._top, pos, this._bottom);
                                }
                                
                                // draw the mark
                                if (t.showMark && t.mark && (!t.isMinorTick || axis.showMinorTicks)) {
                                    s = t.markSize;
                                    m = t.mark;
                                    var pos = Math.round(axis.u2p(t.value)) + 0.5;
                                    switch (m) {
                                        case 'outside':
                                            b = this._bottom;
                                            e = this._bottom+s;
                                            break;
                                        case 'inside':
                                            b = this._bottom-s;
                                            e = this._bottom;
                                            break;
                                        case 'cross':
                                            b = this._bottom-s;
                                            e = this._bottom+s;
                                            break;
                                        default:
                                            b = this._bottom;
                                            e = this._bottom+s;
                                            break;
                                    }
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[pos,b],[pos,e]], {lineCap:'butt', lineWidth:this.gridLineWidth, offset:this.gridLineWidth*0.75, depth:2, fill:false, closePath:false});
                                    }
                                    // draw the line
                                    drawLine(pos, b, pos, e);
                                }
                                break;
                            case 'yaxis':
                                // draw the grid line
                                if (t.showGridline && this.drawGridlines && (!t.isMinorTick || axis.showMinorTicks)) {
                                    drawLine(this._right, pos, this._left, pos);
                                }

                                // draw the mark
                                if (t.showMark && t.mark && (!t.isMinorTick || axis.showMinorTicks)) {
                                    s = t.markSize;
                                    m = t.mark;
                                    var pos = Math.round(axis.u2p(t.value)) + 0.5;
                                    switch (m) {
                                        case 'outside':
                                            b = this._left-s;
                                            e = this._left;
                                            break;
                                        case 'inside':
                                            b = this._left;
                                            e = this._left+s;
                                            break;
                                        case 'cross':
                                            b = this._left-s;
                                            e = this._left+s;
                                            break;
                                        default:
                                            b = this._left-s;
                                            e = this._left;
                                            break;
                                            }
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[b, pos], [e, pos]], {lineCap:'butt', lineWidth:this.gridLineWidth*1.5, offset:this.gridLineWidth*0.75, fill:false, closePath:false});
                                    }
                                    drawLine(b, pos, e, pos, {strokeStyle:axis.borderColor});
                                }
                                break;
                            case 'yMidAxis':
                                // draw the grid line
                                if (t.showGridline && this.drawGridlines && (!t.isMinorTick || axis.showMinorTicks)) {
                                    drawLine(this._left, pos, xp0, pos);
                                    drawLine(xpn, pos, this._right, pos);
                                }
                                // draw the mark
                                if (t.showMark && t.mark && (!t.isMinorTick || axis.showMinorTicks)) {
                                    s = t.markSize;
                                    m = t.mark;
                                    var pos = Math.round(axis.u2p(t.value)) + 0.5;

                                    b = xp0;
                                    e = xp0 + s;
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[b, pos], [e, pos]], {lineCap:'butt', lineWidth:this.gridLineWidth*1.5, offset:this.gridLineWidth*0.75, fill:false, closePath:false});
                                    }
                                    drawLine(b, pos, e, pos, {strokeStyle:axis.borderColor});

                                    b = xpn - s;
                                    e = xpn;
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[b, pos], [e, pos]], {lineCap:'butt', lineWidth:this.gridLineWidth*1.5, offset:this.gridLineWidth*0.75, fill:false, closePath:false});
                                    }
                                    drawLine(b, pos, e, pos, {strokeStyle:axis.borderColor});
                                }
                                break;
                            case 'x2axis':
                                // draw the grid line
                                if (t.showGridline && this.drawGridlines && (!t.isMinorTick || axis.showMinorTicks)) {
                                    drawLine(pos, this._bottom, pos, this._top);
                                }

                                // draw the mark
                                if (t.showMark && t.mark && (!t.isMinorTick || axis.showMinorTicks)) {
                                    s = t.markSize;
                                    m = t.mark;
                                    var pos = Math.round(axis.u2p(t.value)) + 0.5;
                                    switch (m) {
                                        case 'outside':
                                            b = this._top-s;
                                            e = this._top;
                                            break;
                                        case 'inside':
                                            b = this._top;
                                            e = this._top+s;
                                            break;
                                        case 'cross':
                                            b = this._top-s;
                                            e = this._top+s;
                                            break;
                                        default:
                                            b = this._top-s;
                                            e = this._top;
                                            break;
                                            }
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[pos,b],[pos,e]], {lineCap:'butt', lineWidth:this.gridLineWidth, offset:this.gridLineWidth*0.75, depth:2, fill:false, closePath:false});
                                    }
                                    drawLine(pos, b, pos, e);
                                }
                                break;
                            case 'y2axis':
                                // draw the grid line
                                if (t.showGridline && this.drawGridlines && (!t.isMinorTick || axis.showMinorTicks)) {
                                    drawLine(this._left, pos, this._right, pos);
                                }

                                // draw the mark
                                if (t.showMark && t.mark && (!t.isMinorTick || axis.showMinorTicks)) {
                                    s = t.markSize;
                                    m = t.mark;
                                    var pos = Math.round(axis.u2p(t.value)) + 0.5;
                                    switch (m) {
                                        case 'outside':
                                            b = this._right;
                                            e = this._right+s;
                                            break;
                                        case 'inside':
                                            b = this._right-s;
                                            e = this._right;
                                            break;
                                        case 'cross':
                                            b = this._right-s;
                                            e = this._right+s;
                                            break;
                                        default:
                                            b = this._right;
                                            e = this._right+s;
                                            break;
                                            }
                                    // draw the shadow
                                    if (this.shadow) {
                                        this.renderer.shadowRenderer.draw(ctx, [[b, pos], [e, pos]], {lineCap:'butt', lineWidth:this.gridLineWidth*1.5, offset:this.gridLineWidth*0.75, fill:false, closePath:false});
                                    }
                                    drawLine(b, pos, e, pos, {strokeStyle:axis.borderColor});
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                t = null;
            }
            axis = null;
            ticks = null;
        }
        
        ctx.restore();
        
        function drawLine(bx, by, ex, ey, opts) {
            ctx.save();
            opts = opts || {};
            if (opts.lineWidth == null || opts.lineWidth != 0){
                $.extend(true, ctx, opts);
                ctx.beginPath();
                ctx.moveTo(bx, by);
                ctx.lineTo(ex, ey);
                ctx.stroke();
            }
            ctx.restore();
        }
        
        if (this.shadow) {
            if (axes.yMidAxis.show) {
                var points = [[this._left, this._bottom], [xp0, this._bottom]];
                this.renderer.shadowRenderer.draw(ctx, points);
                var points = [[xpn, this._bottom], [this._right, this._bottom], [this._right, this._top]];
                this.renderer.shadowRenderer.draw(ctx, points);
                var points = [[xp0, this._bottom], [xp0, this._top]];
                this.renderer.shadowRenderer.draw(ctx, points);
            }
            else {
                var points = [[this._left, this._bottom], [this._right, this._bottom], [this._right, this._top]];
                this.renderer.shadowRenderer.draw(ctx, points);
            }
        }
        // Now draw border around grid.  Use axis border definitions. start at
        // upper left and go clockwise.
        if (this.borderWidth != 0 && this.drawBorder) {
            if (axes.yMidAxis.show) {
                drawLine (this._left, this._top, xp0, this._top, {lineCap:'round', strokeStyle:axes.x2axis.borderColor, lineWidth:axes.x2axis.borderWidth});
                drawLine (xpn, this._top, this._right, this._top, {lineCap:'round', strokeStyle:axes.x2axis.borderColor, lineWidth:axes.x2axis.borderWidth});
                drawLine (this._right, this._top, this._right, this._bottom, {lineCap:'round', strokeStyle:axes.y2axis.borderColor, lineWidth:axes.y2axis.borderWidth});
                drawLine (this._right, this._bottom, xpn, this._bottom, {lineCap:'round', strokeStyle:axes.xaxis.borderColor, lineWidth:axes.xaxis.borderWidth});
                drawLine (xp0, this._bottom, this._left, this._bottom, {lineCap:'round', strokeStyle:axes.xaxis.borderColor, lineWidth:axes.xaxis.borderWidth});
                drawLine (this._left, this._bottom, this._left, this._top, {lineCap:'round', strokeStyle:axes.yaxis.borderColor, lineWidth:axes.yaxis.borderWidth});
                drawLine (xp0, this._bottom, xp0, this._top, {lineCap:'round', strokeStyle:axes.yaxis.borderColor, lineWidth:axes.yaxis.borderWidth});
                drawLine (xpn, this._bottom, xpn, this._top, {lineCap:'round', strokeStyle:axes.yaxis.borderColor, lineWidth:axes.yaxis.borderWidth});
            }
            else {
                drawLine (this._left, this._top, this._right, this._top, {lineCap:'round', strokeStyle:axes.x2axis.borderColor, lineWidth:axes.x2axis.borderWidth});
                drawLine (this._right, this._top, this._right, this._bottom, {lineCap:'round', strokeStyle:axes.y2axis.borderColor, lineWidth:axes.y2axis.borderWidth});
                drawLine (this._right, this._bottom, this._left, this._bottom, {lineCap:'round', strokeStyle:axes.xaxis.borderColor, lineWidth:axes.xaxis.borderWidth});
                drawLine (this._left, this._bottom, this._left, this._top, {lineCap:'round', strokeStyle:axes.yaxis.borderColor, lineWidth:axes.yaxis.borderWidth});
            }
        }
        // ctx.lineWidth = this.borderWidth;
        // ctx.strokeStyle = this.borderColor;
        // ctx.strokeRect(this._left, this._top, this._width, this._height);
        
        ctx.restore();
        ctx =  null;
        axes = null;
    };
})(jQuery); 