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
     * Class: $.jqplot.MeterGaugeRenderer
     * Plugin renderer to draw a meter gauge chart.
     * 
     * Data consists of a single series with 1 data point to position the gauge needle.
     * 
     * To use this renderer, you need to include the 
     * meter gauge renderer plugin, for example:
     * 
     * > <script type="text/javascript" src="plugins/jqplot.meterGaugeRenderer.js"></script>
     * 
     * Properties described here are passed into the $.jqplot function
     * as options on the series renderer.  For example:
     * 
     * > plot0 = $.jqplot('chart0',[[18]],{
     * >     title: 'Network Speed',
     * >     seriesDefaults: {
     * >         renderer: $.jqplot.MeterGaugeRenderer,
     * >         rendererOptions: {
     * >             label: 'MB/s'
     * >         }
     * >     }
     * > });
     * 
     * A meterGauge plot does not support events.
     */
    $.jqplot.MeterGaugeRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.MeterGaugeRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.MeterGaugeRenderer.prototype.constructor = $.jqplot.MeterGaugeRenderer;
    
    // called with scope of a series
    $.jqplot.MeterGaugeRenderer.prototype.init = function(options) {
        // Group: Properties
        //
        // prop: diameter
        // Outer diameter of the meterGauge, auto computed by default
        this.diameter = null;
        // prop: padding
        // padding between the meterGauge and plot edges, auto
        // calculated by default.
        this.padding = null;
        // prop: shadowOffset
        // offset of the shadow from the gauge ring and offset of 
        // each succesive stroke of the shadow from the last.
        this.shadowOffset = 2;
        // prop: shadowAlpha
        // transparency of the shadow (0 = transparent, 1 = opaque)
        this.shadowAlpha = 0.07;
        // prop: shadowDepth
        // number of strokes to apply to the shadow, 
        // each stroke offset shadowOffset from the last.
        this.shadowDepth = 4;
        // prop: background
        // background color of the inside of the gauge.
        this.background = "#efefef";
        // prop: ringColor
        // color of the outer ring, hub, and needle of the gauge.
        this.ringColor = "#BBC6D0";
        // needle color not implemented yet.
        this.needleColor = "#C3D3E5";
        // prop: tickColor
        // color of the tick marks around the gauge.
        this.tickColor = "#989898";
        // prop: ringWidth
        // width of the ring around the gauge.  Auto computed by default.
        this.ringWidth = null;
        // prop: min
        // Minimum value on the gauge.  Auto computed by default
        this.min;
        // prop: max
        // Maximum value on the gauge. Auto computed by default
        this.max;
        // prop: ticks
        // Array of tick values. Auto computed by default.
        this.ticks = [];
        // prop: showTicks
        // true to show ticks around gauge.
        this.showTicks = true;
        // prop: showTickLabels
        // true to show tick labels next to ticks.
        this.showTickLabels = true;
        // prop: label
        // A gauge label like 'kph' or 'Volts'
        this.label = null;
        // prop: labelHeightAdjust
        // Number of Pixels to offset the label up (-) or down (+) from its default position.
        this.labelHeightAdjust = 0;
        // prop: labelPosition
        // Where to position the label, either 'inside' or 'bottom'.
        this.labelPosition = 'inside';
        // prop: intervals
        // Array of ranges to be drawn around the gauge.
        // Array of form:
        // > [value1, value2, ...]
        // indicating the values for the first, second, ... intervals.
        this.intervals = [];
        // prop: intervalColors
        // Array of colors to use for the intervals.
        this.intervalColors = [ "#4bb2c5", "#EAA228", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"];
        // prop: intervalInnerRadius
        // Radius of the inner circle of the interval ring.
        this.intervalInnerRadius =  null;
        // prop: intervalOuterRadius
        // Radius of the outer circle of the interval ring.
        this.intervalOuterRadius = null;
        this.tickRenderer = $.jqplot.MeterGaugeTickRenderer;
        // ticks spaced every 1, 2, 2.5, 5, 10, 20, .1, .2, .25, .5, etc.
        this.tickPositions = [1, 2, 2.5, 5, 10];
        // prop: tickSpacing
        // Degrees between ticks.  This is a target number, if 
        // incompatible span and ticks are supplied, a suitable
        // spacing close to this value will be computed.
        this.tickSpacing = 30;
        this.numberMinorTicks = null;
        // prop: hubRadius
        // Radius of the hub at the bottom center of gauge which the needle attaches to.
        // Auto computed by default
        this.hubRadius = null;
        // prop: tickPadding
        // padding of the tick marks to the outer ring and the tick labels to marks.
        // Auto computed by default.
        this.tickPadding = null;
        // prop: needleThickness
        // Maximum thickness the needle.  Auto computed by default.
        this.needleThickness = null;
        // prop: needlePad
        // Padding between needle and inner edge of the ring when the needle is at the min or max gauge value.
        this.needlePad = 6;
        // prop: pegNeedle
        // True will stop needle just below/above the  min/max values if data is below/above min/max,
        // as if the meter is "pegged".
        this.pegNeedle = true;
        this._type = 'meterGauge';
        
        $.extend(true, this, options);
        this.type = null;
        this.numberTicks = null;
        this.tickInterval = null;
        // span, the sweep (in degrees) from min to max.  This gauge is 
        // a semi-circle.
        this.span = 180;
        // get rid of this nonsense
        // this.innerSpan = this.span;
        if (this.type == 'circular') {
            this.semiCircular = false;
        }
        else if (this.type != 'circular') {
            this.semiCircular = true;
        }
        else {
            this.semiCircular = (this.span <= 180) ? true : false;
        }
        this._tickPoints = [];
        // reference to label element.
        this._labelElem = null;
        
        // start the gauge at the beginning of the span
        this.startAngle = (90 + (360 - this.span)/2) * Math.PI/180;
        this.endAngle = (90 - (360 - this.span)/2) * Math.PI/180;
        
        this.setmin = !!(this.min == null);
        this.setmax = !!(this.max == null);
        
        // if given intervals and is an array of values, create labels and colors.
        if (this.intervals.length) {
            if (this.intervals[0].length == null || this.intervals.length == 1) {
                for (var i=0; i<this.intervals.length; i++) {
                    this.intervals[i] = [this.intervals[i], this.intervals[i], this.intervalColors[i]];
                }
            }
            else if (this.intervals[0].length == 2) {
                for (i=0; i<this.intervals.length; i++) {
                    this.intervals[i] = [this.intervals[i][0], this.intervals[i][1], this.intervalColors[i]];
                }
            }
        }
        
        // compute min, max and ticks if not supplied:
        if (this.ticks.length) {
            if (this.ticks[0].length == null || this.ticks[0].length == 1) {
                for (var i=0; i<this.ticks.length; i++) {
                    this.ticks[i] = [this.ticks[i], this.ticks[i]];
                }
            }
            this.min = (this.min == null) ? this.ticks[0][0] : this.min;
            this.max = (this.max == null) ? this.ticks[this.ticks.length-1][0] : this.max;
            this.setmin = false;
            this.setmax = false;
            this.numberTicks = this.ticks.length;
            this.tickInterval = this.ticks[1][0] - this.ticks[0][0];
            this.tickFactor = Math.floor(parseFloat((Math.log(this.tickInterval)/Math.log(10)).toFixed(11)));
            // use the first interal to calculate minor ticks;
            this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor);
            if (!this.numberMinorTicks) {
                this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor-1);
            }
            if (!this.numberMinorTicks) {
                this.numberMinorTicks = 1;
            }
        }
        
        else if (this.intervals.length) {
            this.min = (this.min == null) ? 0 : this.min;
            this.setmin = false;
            if (this.max == null) {
                if (this.intervals[this.intervals.length-1][0] >= this.data[0][1]) {
                    this.max = this.intervals[this.intervals.length-1][0];
                    this.setmax = false;
                }
            }
            else {
                this.setmax = false;
            }
        }
        
        else {
            // no ticks and no intervals supplied, put needle in middle
            this.min = (this.min == null) ? 0 : this.min;
            this.setmin = false;
            if (this.max == null) {
                this.max = this.data[0][1] * 1.25;
                this.setmax = true;
            }
            else {
                this.setmax = false;
            }
        }
    };
    
    $.jqplot.MeterGaugeRenderer.prototype.setGridData = function(plot) {
        // set gridData property.  This will hold angle in radians of each data point.
        var stack = [];
        var td = [];
        var sa = this.startAngle;
        for (var i=0; i<this.data.length; i++){
            stack.push(this.data[i][1]);
            td.push([this.data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
        }
        this.gridData = td;
    };
    
    $.jqplot.MeterGaugeRenderer.prototype.makeGridData = function(data, plot) {
        var stack = [];
        var td = [];
        var sa = this.startAngle;
        for (var i=0; i<data.length; i++){
            stack.push(data[i][1]);
            td.push([data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
        }
        return td;
    };

        
    function getnmt(pos, interval, fact) {
        var temp;
        for (var i=pos.length-1; i>=0; i--) {
            temp = interval/(pos[i] * Math.pow(10, fact));
            if (temp == 4 || temp == 5) {
                return temp - 1;
            }
        }
        return null;
    }
    
    // called with scope of series
    $.jqplot.MeterGaugeRenderer.prototype.draw = function (ctx, gd, options) {
        var i;
        var opts = (options != undefined) ? options : {};
        // offset and direction of offset due to legend placement
        var offx = 0;
        var offy = 0;
        var trans = 1;
        if (options.legendInfo && options.legendInfo.placement == 'inside') {
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
        
        
            
        // pre-draw so can get its dimensions.
        if (this.label) {
            this._labelElem = $('<div class="jqplot-meterGauge-label" style="position:absolute;">'+this.label+'</div>');
            this.canvas._elem.after(this._labelElem);
        }
        
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var cw = ctx.canvas.width;
        var ch = ctx.canvas.height;
        if (this.padding == null) {
            this.padding = Math.round(Math.min(cw, ch)/30);
        }
        var w = cw - offx - 2 * this.padding;
        var h = ch - offy - 2 * this.padding;
        if (this.labelPosition == 'bottom' && this.label) {
            h -= this._labelElem.outerHeight(true);
        }
        var mindim = Math.min(w,h);
        var d = mindim;
            
        if (!this.diameter) {
            if (this.semiCircular) {
                if ( w >= 2*h) {
                    if (!this.ringWidth) {
                        this.ringWidth = 2*h/35;
                    }
                    this.needleThickness = this.needleThickness || 2+Math.pow(this.ringWidth, 0.8);
                    this.innerPad = this.ringWidth/2 + this.needleThickness/2 + this.needlePad;
                    this.diameter = 2 * (h - 2*this.innerPad);
                }
                else {
                    if (!this.ringWidth) {
                        this.ringWidth = w/35;
                    }
                    this.needleThickness = this.needleThickness || 2+Math.pow(this.ringWidth, 0.8);
                    this.innerPad = this.ringWidth/2 + this.needleThickness/2 + this.needlePad;
                    this.diameter = w - 2*this.innerPad - this.ringWidth - this.padding;
                }
                // center taking into account legend and over draw for gauge bottom below hub.
                // this will be center of hub.
                this._center = [(cw - trans * offx)/2 + trans * offx,  (ch + trans*offy - this.padding - this.ringWidth - this.innerPad)];
            }
            else {
                if (!this.ringWidth) {
                    this.ringWidth = d/35;
                }
                this.needleThickness = this.needleThickness || 2+Math.pow(this.ringWidth, 0.8);
                this.innerPad = 0;
                this.diameter = d - this.ringWidth;
                // center in middle of canvas taking into account legend.
                // will be center of hub.
                this._center = [(cw-trans*offx)/2 + trans * offx, (ch-trans*offy)/2 + trans * offy];
            }
            if (this._labelElem && this.labelPosition == 'bottom') {
                this._center[1] -= this._labelElem.outerHeight(true);
            }
            
        }

        this._radius = this.diameter/2;
        
        this.tickSpacing = 6000/this.diameter;
        
        if (!this.hubRadius) {
            this.hubRadius = this.diameter/18;
        }
        
        this.shadowOffset = 0.5 + this.ringWidth/9;
        this.shadowWidth = this.ringWidth*1;
        
        this.tickPadding = 3 + Math.pow(this.diameter/20, 0.7);
        this.tickOuterRadius = this._radius - this.ringWidth/2 - this.tickPadding;
        this.tickLength = (this.showTicks) ? this._radius/13 : 0;
        
        if (this.ticks.length == 0) {
            // no ticks, lets make some.
            var max = this.max,
                min = this.min,
                setmax = this.setmax,
                setmin = this.setmin,
                ti = (max - min) * this.tickSpacing / this.span;
            var tf = Math.floor(parseFloat((Math.log(ti)/Math.log(10)).toFixed(11)));
            var tp = (ti/Math.pow(10, tf));
            (tp > 2 && tp <= 2.5) ? tp = 2.5 : tp = Math.ceil(tp);
            var t = this.tickPositions;
            var tpindex, nt;
    
            for (i=0; i<t.length; i++) {
                if (tp == t[i] || i && t[i-1] < tp && tp < t[i]) { 
                    ti = t[i]*Math.pow(10, tf);
                    tpindex = i;
                }
            }
        
            for (i=0; i<t.length; i++) {
                if (tp == t[i] || i && t[i-1] < tp && tp < t[i]) { 
                    ti = t[i]*Math.pow(10, tf);
                    nt = Math.ceil((max - min) / ti);
                }
            }
        
            // both max and min are free
            if (setmax && setmin) {
                var tmin = (min > 0) ? min - min % ti : min - min % ti - ti;
                if (!this.forceZero) {
                    var diff = Math.min(min - tmin, 0.8*ti);
                    var ntp = Math.floor(diff/t[tpindex]);
                    if (ntp > 1) {
                        tmin = tmin + t[tpindex] * (ntp-1);
                        if (parseInt(tmin, 10) != tmin && parseInt(tmin-t[tpindex], 10) == tmin-t[tpindex]) {
                            tmin = tmin - t[tpindex];
                        }
                    }
                }
                if (min == tmin) {
                    min -= ti;
                }
                else {
                    // tmin should always be lower than dataMin
                    if (min - tmin > 0.23*ti) {
                        min = tmin;
                    }
                    else {
                        min = tmin -ti;
                        nt += 1;
                    }
                }
                nt += 1;
                var tmax = min + (nt - 1) * ti;
                if (max >= tmax) { 
                    tmax += ti;
                    nt += 1;
                }
                // now tmax should always be mroe than dataMax
                if (tmax - max < 0.23*ti) { 
                    tmax += ti;
                    nt += 1;
                }
                this.max = max = tmax;
                this.min = min;    

                this.tickInterval = ti;
                this.numberTicks = nt;
                var it;
                for (i=0; i<nt; i++) {
                    it = parseFloat((min+i*ti).toFixed(11));
                    this.ticks.push([it, it]);
                }
                this.max = this.ticks[nt-1][1];
            
                this.tickFactor = tf;      
                // determine number of minor ticks

                this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor);     
        
                if (!this.numberMinorTicks) {
                    this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor-1);
                }
            }
            // max is free, min is fixed
            else if (setmax) {
                var tmax = min + (nt - 1) * ti;
                if (max >= tmax) {
                    max = tmax + ti;
                    nt += 1;
                }
                else {
                    max = tmax;
                }

                this.tickInterval = this.tickInterval || ti;
                this.numberTicks = this.numberTicks || nt;
                var it;
                for (i=0; i<this.numberTicks; i++) {
                    it = parseFloat((min+i*this.tickInterval).toFixed(11));
                    this.ticks.push([it, it]);
                }
                this.max = this.ticks[this.numberTicks-1][1];
            
                this.tickFactor = tf;
                // determine number of minor ticks
                this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor);
        
                if (!this.numberMinorTicks) {
                    this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor-1);
                }
            }
            
            // not setting max or min
            if (!setmax && !setmin) {
                var range = this.max - this.min;
                tf = Math.floor(parseFloat((Math.log(range)/Math.log(10)).toFixed(11))) - 1;
                var nticks = [5,6,4,7,3,8,9,10,2], res, numticks, nonSigDigits=0, sigRange;
                // check to see how many zeros are at the end of the range
                if (range > 1) {
                    var rstr = String(range);
                    if (rstr.search(/\./) == -1) {
                         var pos = rstr.search(/0+$/);
                         nonSigDigits = (pos > 0) ? rstr.length - pos - 1 : 0;
                    }
                }
                sigRange = range/Math.pow(10, nonSigDigits);
                for (i=0; i<nticks.length; i++) {
                    res = sigRange/(nticks[i]-1);
                    if (res == parseInt(res, 10)) {
                        this.numberTicks = nticks[i];
                        this.tickInterval = range/(this.numberTicks-1);
                        this.tickFactor = tf+1;
                        break;
                    }
                }
                var it;
                for (i=0; i<this.numberTicks; i++) {
                    it = parseFloat((this.min+i*this.tickInterval).toFixed(11));
                    this.ticks.push([it, it]);
                }
                // determine number of minor ticks
                this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor);
        
                if (!this.numberMinorTicks) {
                    this.numberMinorTicks = getnmt(this.tickPositions, this.tickInterval, this.tickFactor-1);
                }
                
                if (!this.numberMinorTicks) {
                    this.numberMinorTicks = 1;
                    var nums = [4, 5, 3, 6, 2];
                    for (i=0; i<5; i++) {
                        var temp = this.tickInterval/nums[i];
                        if (temp == parseInt(temp, 10)) {
                            this.numberMinorTicks = nums[i]-1;
                            break;
                        }
                    }
                }
            }
        }
        

        var r = this._radius,
            sa = this.startAngle,
            ea = this.endAngle,       
            pi = Math.PI,
            hpi = Math.PI/2;
            
        if (this.semiCircular) {
            var overAngle = Math.atan(this.innerPad/r),
                outersa = this.outerStartAngle = sa - overAngle,
                outerea = this.outerEndAngle = ea + overAngle,
                hubsa = this.hubStartAngle = sa - Math.atan(this.innerPad/this.hubRadius*2),
                hubea = this.hubEndAngle = ea + Math.atan(this.innerPad/this.hubRadius*2);

            ctx.save();            
            
            ctx.translate(this._center[0], this._center[1]);
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            
            // draw the innerbackground
            ctx.save();
            ctx.beginPath();  
            ctx.fillStyle = this.background;
            ctx.arc(0, 0, r, outersa, outerea, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
            // draw the shadow
            // the outer ring.
            var shadowColor = 'rgba(0,0,0,'+this.shadowAlpha+')';
            ctx.save();
            for (var i=0; i<this.shadowDepth; i++) {
                ctx.translate(this.shadowOffset*Math.cos(this.shadowAngle/180*Math.PI), this.shadowOffset*Math.sin(this.shadowAngle/180*Math.PI));
                ctx.beginPath();  
                ctx.strokeStyle = shadowColor;
                ctx.lineWidth = this.shadowWidth;
                ctx.arc(0 ,0, r, outersa, outerea, false);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
            
            // the inner hub.
            ctx.save();
            var tempd = parseInt((this.shadowDepth+1)/2, 10);
            for (var i=0; i<tempd; i++) {
                ctx.translate(this.shadowOffset*Math.cos(this.shadowAngle/180*Math.PI), this.shadowOffset*Math.sin(this.shadowAngle/180*Math.PI));
                ctx.beginPath();  
                ctx.fillStyle = shadowColor;
                ctx.arc(0 ,0, this.hubRadius, hubsa, hubea, false);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
            
            // draw the outer ring.
            ctx.save();
            ctx.beginPath();  
            ctx.strokeStyle = this.ringColor;
            ctx.lineWidth = this.ringWidth;
            ctx.arc(0 ,0, r, outersa, outerea, false);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            
            // draw the hub
            
            ctx.save();
            ctx.beginPath();  
            ctx.fillStyle = this.ringColor;
            ctx.arc(0 ,0, this.hubRadius,hubsa, hubea, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
            // draw the ticks
            if (this.showTicks) {
                ctx.save();
                var orad = this.tickOuterRadius,
                    tl = this.tickLength,
                    mtl = tl/2,
                    nmt = this.numberMinorTicks,
                    ts = this.span * Math.PI / 180 / (this.ticks.length-1),
                    mts = ts/(nmt + 1);
                
                for (i = 0; i<this.ticks.length; i++) {
                    ctx.beginPath();
                    ctx.lineWidth = 1.5 + this.diameter/360;
                    ctx.strokeStyle = this.ringColor;
                    var wps = ts*i+sa;
                    ctx.moveTo(-orad * Math.cos(ts*i+sa), orad * Math.sin(ts*i+sa));
                    ctx.lineTo(-(orad-tl) * Math.cos(ts*i+sa), (orad - tl) * Math.sin(ts*i+sa));
                    this._tickPoints.push([(orad-tl) * Math.cos(ts*i+sa) + this._center[0] + this.canvas._offsets.left, (orad - tl) * Math.sin(ts*i+sa) + this._center[1] + this.canvas._offsets.top, ts*i+sa]);
                    ctx.stroke();
                    ctx.lineWidth = 1.0 + this.diameter/440;
                    if (i<this.ticks.length-1) {
                        for (var j=1; j<=nmt; j++) {
                            ctx.beginPath();
                            ctx.moveTo(-orad * Math.cos(ts*i+mts*j+sa), orad * Math.sin(ts*i+mts*j+sa));
                            ctx.lineTo(-(orad-mtl) * Math.cos(ts*i+mts*j+sa), (orad-mtl) * Math.sin(ts*i+mts*j+sa));
                            ctx.stroke();
                        }   
                    }
                }
                ctx.restore();
            }
            
            // draw the tick labels
            if (this.showTickLabels) {
                var elem, l, t, ew, eh, dim, maxdim=0;
                var tp = this.tickPadding * (1 - 1/(this.diameter/80+1));
                for (i=0; i<this.ticks.length; i++) {
                    elem = $('<div class="jqplot-meterGauge-tick" style="position:absolute;">'+this.ticks[i][1]+'</div>');
                    this.canvas._elem.after(elem);
                    ew = elem.outerWidth(true);
                    eh = elem.outerHeight(true);
                    l = this._tickPoints[i][0] - ew * (this._tickPoints[i][2]-Math.PI)/Math.PI - tp * Math.cos(this._tickPoints[i][2]);
                    t = this._tickPoints[i][1] - eh/2 + eh/2 * Math.pow(Math.abs((Math.sin(this._tickPoints[i][2]))), 0.5) + tp/3 * Math.pow(Math.abs((Math.sin(this._tickPoints[i][2]))), 0.5) ;
                    // t = this._tickPoints[i][1] - eh/2 - eh/2 * Math.sin(this._tickPoints[i][2]) - tp/2 * Math.sin(this._tickPoints[i][2]);
                    elem.css({left:l, top:t, color: this.tickColor});
                    dim  = ew*Math.cos(this._tickPoints[i][2]) + eh*Math.sin(Math.PI/2+this._tickPoints[i][2]/2);
                    maxdim = (dim > maxdim) ? dim : maxdim;
                }
            }
            
            // draw the gauge label
            if (this.label && this.labelPosition == 'inside') {
                var l = this._center[0] + this.canvas._offsets.left;
                var tp = this.tickPadding * (1 - 1/(this.diameter/80+1));
                var t = 0.5*(this._center[1] + this.canvas._offsets.top - this.hubRadius) + 0.5*(this._center[1] + this.canvas._offsets.top - this.tickOuterRadius + this.tickLength + tp) + this.labelHeightAdjust;
                // this._labelElem = $('<div class="jqplot-meterGauge-label" style="position:absolute;">'+this.label+'</div>');
                // this.canvas._elem.after(this._labelElem);
                l -= this._labelElem.outerWidth(true)/2;
                t -= this._labelElem.outerHeight(true)/2;
                this._labelElem.css({left:l, top:t});
            }
            
            else if (this.label && this.labelPosition == 'bottom') {
                var l = this._center[0] + this.canvas._offsets.left - this._labelElem.outerWidth(true)/2;
                var t = this._center[1] + this.canvas._offsets.top + this.innerPad + this.ringWidth + this.padding + this.labelHeightAdjust;
                this._labelElem.css({left:l, top:t});
                
            }
            
            // draw the intervals
            
            ctx.save();
            var inner = this.intervalInnerRadius || this.hubRadius * 1.5;
            if (this.intervalOuterRadius == null) {
                if (this.showTickLabels) {
                    var outer = (this.tickOuterRadius - this.tickLength - this.tickPadding - this.diameter/8);
                }
                else {
                    var outer = (this.tickOuterRadius - this.tickLength - this.diameter/16);
                }
            }
            else {
                var outer = this.intervalOuterRadius;
            }
            var range = this.max - this.min;
            var intrange = this.intervals[this.intervals.length-1] - this.min;
            var start, end, span = this.span*Math.PI/180;
            for (i=0; i<this.intervals.length; i++) {
                start = (i == 0) ? sa : sa + (this.intervals[i-1][0] - this.min)*span/range;
                if (start < 0) {
                    start = 0;
                }
                end = sa + (this.intervals[i][0] - this.min)*span/range;
                if (end < 0) {
                    end = 0;
                }
                ctx.beginPath();
                ctx.fillStyle = this.intervals[i][2];
                ctx.arc(0, 0, inner, start, end, false);
                ctx.lineTo(outer*Math.cos(end), outer*Math.sin(end));
                ctx.arc(0, 0, outer, end, start, true);
                ctx.lineTo(inner*Math.cos(start), inner*Math.sin(start));
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
            
            // draw the needle
            var datapoint = this.data[0][1];
            var dataspan = this.max - this.min;
            if (this.pegNeedle) {
                if (this.data[0][1] > this.max + dataspan*3/this.span) {
                    datapoint = this.max + dataspan*3/this.span;
                }
                if (this.data[0][1] < this.min - dataspan*3/this.span) {
                    datapoint = this.min - dataspan*3/this.span;
                }
            }
            var dataang = (datapoint - this.min)/dataspan * this.span * Math.PI/180 + this.startAngle;
            
            
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.ringColor;
            ctx.strokeStyle = this.ringColor;
            this.needleLength = (this.tickOuterRadius - this.tickLength) * 0.85;
            this.needleThickness = (this.needleThickness < 2) ? 2 : this.needleThickness;
            var endwidth = this.needleThickness * 0.4;

            
            var dl = this.needleLength/10;
            var dt = (this.needleThickness - endwidth)/10;
            var templ;
            for (var i=0; i<10; i++) {
                templ = this.needleThickness - i*dt;
                ctx.moveTo(dl*i*Math.cos(dataang), dl*i*Math.sin(dataang));
                ctx.lineWidth = templ;
                ctx.lineTo(dl*(i+1)*Math.cos(dataang), dl*(i+1)*Math.sin(dataang));
                ctx.stroke();
            }
            
            ctx.restore();
        }
        else {
            this._center = [(cw - trans * offx)/2 + trans * offx, (ch - trans*offy)/2 + trans * offy];
        }               
    };
    
    $.jqplot.MeterGaugeAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.MeterGaugeAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.MeterGaugeAxisRenderer.prototype.constructor = $.jqplot.MeterGaugeAxisRenderer;
        
    
    // There are no traditional axes on a gauge chart.  We just need to provide
    // dummy objects with properties so the plot will render.
    // called with scope of axis object.
    $.jqplot.MeterGaugeAxisRenderer.prototype.init = function(options){
        //
        this.tickRenderer = $.jqplot.MeterGaugeTickRenderer;
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
    
    $.jqplot.MeterGaugeLegendRenderer = function(){
        $.jqplot.TableLegendRenderer.call(this);
    };
    
    $.jqplot.MeterGaugeLegendRenderer.prototype = new $.jqplot.TableLegendRenderer();
    $.jqplot.MeterGaugeLegendRenderer.prototype.constructor = $.jqplot.MeterGaugeLegendRenderer;
    
    /**
     * Class: $.jqplot.MeterGaugeLegendRenderer
     *Meter gauges don't typically have a legend, this overrides the default legend renderer.
     */
    $.jqplot.MeterGaugeLegendRenderer.prototype.init = function(options) {
        // Maximum number of rows in the legend.  0 or null for unlimited.
        this.numberRows = null;
        // Maximum number of columns in the legend.  0 or null for unlimited.
        this.numberColumns = null;
        $.extend(true, this, options);
    };
    
    // called with context of legend
    $.jqplot.MeterGaugeLegendRenderer.prototype.draw = function() {
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
            // MeterGauge charts legends don't go by number of series, but by number of data points
            // in the series.  Refactor things here for that.
            
            var pad = false, 
                reverse = false,
                nr, nc;
            var s = series[0];
            
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
                            // debugger
                            lt = this.labels[idx] || pd[idx][0].toString();
                            color = s.color;
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
        // debugger
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
        options.grid = options.grid || {};
           
        // only set these if there is a gauge series
        var setopts = false;
        if (options.seriesDefaults.renderer == $.jqplot.MeterGaugeRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer == $.jqplot.MeterGaugeRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.MeterGaugeAxisRenderer;
            options.legend.renderer = $.jqplot.MeterGaugeLegendRenderer;
            options.legend.preDraw = true;
            options.grid.background = options.grid.background || 'white';
            options.grid.drawGridlines = false;
            options.grid.borderWidth = (options.grid.borderWidth != null) ? options.grid.borderWidth : 0;
            options.grid.shadow = (options.grid.shadow != null) ? options.grid.shadow : false;
        }
    }
    
    // called with scope of plot
    function postParseOptions(options) {
        //
    }
    
    $.jqplot.preInitHooks.push(preInit);
    $.jqplot.postParseOptionsHooks.push(postParseOptions);
    
    $.jqplot.MeterGaugeTickRenderer = function() {
        $.jqplot.AxisTickRenderer.call(this);
    };
    
    $.jqplot.MeterGaugeTickRenderer.prototype = new $.jqplot.AxisTickRenderer();
    $.jqplot.MeterGaugeTickRenderer.prototype.constructor = $.jqplot.MeterGaugeTickRenderer;
    
})(jQuery);
    
    
