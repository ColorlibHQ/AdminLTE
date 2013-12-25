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
    // class: $.jqplot.MekkoAxisRenderer
    // An axis renderer for a Mekko chart.
    // Should be used with a Mekko chart where the mekkoRenderer is used on the series.
    // Displays the Y axis as a range from 0 to 1 (0 to 100%) and the x axis with a tick
    // for each series scaled to the sum of all the y values.
    $.jqplot.MekkoAxisRenderer = function() {
    };
    
    // called with scope of axis object.
    $.jqplot.MekkoAxisRenderer.prototype.init = function(options){
        // prop: tickMode
        // How to space the ticks on the axis.
        // 'bar' will place a tick at the width of each bar.  
        // This is the default for the x axis.
        // 'even' will place ticks at even intervals.  This is
        // the default for x2 axis and y axis.  y axis cannot be changed.
        this.tickMode;
        // prop: barLabelRenderer
        // renderer to use to draw labels under each bar.
        this.barLabelRenderer = $.jqplot.AxisLabelRenderer;
        // prop: barLabels
        // array of labels to put under each bar.
        this.barLabels = this.barLabels || [];
        // prop: barLabelOptions
        // options object to pass to the bar label renderer.
        this.barLabelOptions = {};
        this.tickOptions = $.extend(true, {showGridline:false}, this.tickOptions);
        this._barLabels = [];
        $.extend(true, this, options);
        if (this.name == 'yaxis') {
            this.tickOptions.formatString = this.tickOptions.formatString || "%d\%";
        }
        var db = this._dataBounds;
        db.min = 0;
        // for y axes, scale always go from 0 to 1 (0 to 100%)
        if (this.name == 'yaxis' || this.name == 'y2axis') {
            db.max = 100;
            this.tickMode = 'even';
        }
        // For x axes, scale goes from 0 to sum of all y values.
        else if (this.name == 'xaxis'){
            this.tickMode = (this.tickMode == null) ? 'bar' : this.tickMode;
            for (var i=0; i<this._series.length; i++) {
                db.max += this._series[i]._sumy;
            }
        }
        else if (this.name == 'x2axis'){
            this.tickMode = (this.tickMode == null) ? 'even' : this.tickMode;
            for (var i=0; i<this._series.length; i++) {
                db.max += this._series[i]._sumy;
            }
        }
    };
    
    // called with scope of axis
    $.jqplot.MekkoAxisRenderer.prototype.draw = function(ctx, plot) {
        if (this.show) {
            // populate the axis label and value properties.
            // createTicks is a method on the renderer, but
            // call it within the scope of the axis.
            this.renderer.createTicks.call(this);
            // fill a div with axes labels in the right direction.
            // Need to pregenerate each axis to get its bounds and
            // position it and the labels correctly on the plot.
            var dim=0;
            var temp;
            
            var elem = document.createElement('div');
            this._elem = $(elem);
            this._elem.addClass('jqplot-axis jqplot-'+this.name);
            this._elem.css('position', 'absolute');
            elem = null;
            
            if (this.name == 'xaxis' || this.name == 'x2axis') {
                this._elem.width(this._plotDimensions.width);
            }
            else {
                this._elem.height(this._plotDimensions.height);
            }
            
            // draw the axis label
            // create a _label object.
            this.labelOptions.axis = this.name;
            this._label = new this.labelRenderer(this.labelOptions);
            if (this._label.show) {
                this._elem.append(this._label.draw(ctx));
            }
            
            var t, tick, elem;
            if (this.showTicks) {
                t = this._ticks;
                for (var i=0; i<t.length; i++) {
                    tick = t[i];
                    if (tick.showLabel && (!tick.isMinorTick || this.showMinorTicks)) {
                        this._elem.append(tick.draw(ctx));
                    }
                }
            }
            
            // draw the series labels
            for (i=0; i<this.barLabels.length; i++) {
                this.barLabelOptions.axis = this.name;
                this.barLabelOptions.label = this.barLabels[i];
                this._barLabels.push(new this.barLabelRenderer(this.barLabelOptions));
                if (this.tickMode != 'bar') {
                    this._barLabels[i].show = false;
                }
                if (this._barLabels[i].show) {
                    var elem = this._barLabels[i].draw(ctx, plot);
                    elem.removeClass('jqplot-'+this.name+'-label');
                    elem.addClass('jqplot-'+this.name+'-tick');
                    elem.addClass('jqplot-mekko-barLabel');
                    elem.appendTo(this._elem);
                    elem = null;
                }   
            }
            
        }
        return this._elem;
    };
    
    // called with scope of an axis
    $.jqplot.MekkoAxisRenderer.prototype.reset = function() {
        this.min = this._min;
        this.max = this._max;
        this.tickInterval = this._tickInterval;
        this.numberTicks = this._numberTicks;
        // this._ticks = this.__ticks;
    };
    
    // called with scope of axis
    $.jqplot.MekkoAxisRenderer.prototype.set = function() { 
        var dim = 0;
        var temp;
        var w = 0;
        var h = 0;
        var lshow = (this._label == null) ? false : this._label.show;
        if (this.show && this.showTicks) {
            var t = this._ticks;
            for (var i=0; i<t.length; i++) {
                var tick = t[i];
                if (tick.showLabel && (!tick.isMinorTick || this.showMinorTicks)) {
                    if (this.name == 'xaxis' || this.name == 'x2axis') {
                        temp = tick._elem.outerHeight(true);
                    }
                    else {
                        temp = tick._elem.outerWidth(true);
                    }
                    if (temp > dim) {
                        dim = temp;
                    }
                }
            }
            
            if (lshow) {
                w = this._label._elem.outerWidth(true);
                h = this._label._elem.outerHeight(true); 
            }
            if (this.name == 'xaxis') {
                dim = dim + h;
                this._elem.css({'height':dim+'px', left:'0px', bottom:'0px'});
            }
            else if (this.name == 'x2axis') {
                dim = dim + h;
                this._elem.css({'height':dim+'px', left:'0px', top:'0px'});
            }
            else if (this.name == 'yaxis') {
                dim = dim + w;
                this._elem.css({'width':dim+'px', left:'0px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css('width', w+'px');
                }
            }
            else {
                dim = dim + w;
                this._elem.css({'width':dim+'px', right:'0px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css('width', w+'px');
                }
            }
        }  
    };    
    
    // called with scope of axis
    $.jqplot.MekkoAxisRenderer.prototype.createTicks = function() {
        // we're are operating on an axis here
        var ticks = this._ticks;
        var userTicks = this.ticks;
        var name = this.name;
        // databounds were set on axis initialization.
        var db = this._dataBounds;
        var dim, interval;
        var min, max;
        var pos1, pos2;
        var t, tt, i, j;
        
        // if we already have ticks, use them.
        // ticks must be in order of increasing value.
        
        if (userTicks.length) {
            // ticks could be 1D or 2D array of [val, val, ,,,] or [[val, label], [val, label], ...] or mixed
            for (i=0; i<userTicks.length; i++){
                var ut = userTicks[i];
                var t = new this.tickRenderer(this.tickOptions);
                if (ut.constructor == Array) {
                    t.value = ut[0];
                    t.label = ut[1];
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(ut[0], this.name);
                    this._ticks.push(t);
                }
                
                else {
                    t.value = ut;
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(ut, this.name);
                    this._ticks.push(t);
                }
            }
            this.numberTicks = userTicks.length;
            this.min = this._ticks[0].value;
            this.max = this._ticks[this.numberTicks-1].value;
            this.tickInterval = (this.max - this.min) / (this.numberTicks - 1);
        }
        
        // we don't have any ticks yet, let's make some!
        else {
            if (name == 'xaxis' || name == 'x2axis') {
                dim = this._plotDimensions.width;
            }
            else {
                dim = this._plotDimensions.height;
            }
            
            // if min, max and number of ticks specified, user can't specify interval.
            if (this.min != null && this.max != null && this.numberTicks != null) {
                this.tickInterval = null;
            }
        
            min = (this.min != null) ? this.min : db.min;
            max = (this.max != null) ? this.max : db.max;
            
            // if min and max are same, space them out a bit.+
            if (min == max) {
                var adj = 0.05;
                if (min > 0) {
                    adj = Math.max(Math.log(min)/Math.LN10, 0.05);
                }
                min -= adj;
                max += adj;
            }

            var range = max - min;
            var rmin, rmax;
            var temp, prev, curr;
            var ynumticks = [3,5,6,11,21];
            
            // yaxis divide ticks in nice intervals from 0 to 1.
            if (this.name == 'yaxis' || this.name == 'y2axis') { 
                this.min = 0;
                this.max = 100; 
                // user didn't specify number of ticks.
                if (!this.numberTicks){
                    if (this.tickInterval) {
                        this.numberTicks = 3 + Math.ceil(range / this.tickInterval);
                    }
                    else {
                        temp = 2 + Math.ceil((dim-(this.tickSpacing-1))/this.tickSpacing);
                        for (i=0; i<ynumticks.length; i++) {
                            curr = temp/ynumticks[i];
                            if (curr == 1) {
                                this.numberTicks = ynumticks[i];
                                break;
                            }
                            else if (curr > 1) {
                                prev = curr;
                                continue;
                            }
                            else if (curr < 1) {
                                // was prev or is curr closer to one?
                                if (Math.abs(prev - 1) < Math.abs(curr - 1)) {
                                    this.numberTicks = ynumticks[i-1];
                                    break;
                                }
                                else {
                                    this.numberTicks = ynumticks[i];
                                    break;
                                }
                            }
                            else if (i == ynumticks.length -1) {
                                this.numberTicks = ynumticks[i];
                            }
                        }
                        this.tickInterval = range / (this.numberTicks - 1);
                    }
                }
                
                // user did specify number of ticks.
                else {
                    this.tickInterval = range / (this.numberTicks - 1);
                }

                for (var i=0; i<this.numberTicks; i++){
                    tt = this.min + i * this.tickInterval;
                    t = new this.tickRenderer(this.tickOptions);
                    // var t = new $.jqplot.AxisTickRenderer(this.tickOptions);
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(tt, this.name);
                    this._ticks.push(t);
                }
            }
            
            // for x axes, have number ot ticks equal to number of series and ticks placed
            // at sum of y values for each series.
            else if (this.tickMode == 'bar') {
                this.min = 0;
                this.numberTicks = this._series.length + 1;
                t = new this.tickRenderer(this.tickOptions);
                if (!this.showTicks) {
                    t.showLabel = false;
                    t.showMark = false;
                }
                else if (!this.showTickMarks) {
                    t.showMark = false;
                }
                t.setTick(0, this.name);
                this._ticks.push(t);
                
                temp = 0;

                for (i=1; i<this.numberTicks; i++){
                    temp += this._series[i-1]._sumy;
                    t = new this.tickRenderer(this.tickOptions);
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(temp, this.name);
                    this._ticks.push(t);
                }
                this.max = this.max || temp;
                
                // if user specified a max and it is greater than sum, add a tick
                if (this.max > temp) {
                     t = new this.tickRenderer(this.tickOptions);
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(this.max, this.name);
                    this._ticks.push(t);
                    
                }
            }
            
            else if (this.tickMode == 'even') {
                this.min = 0;
                this.max = this.max || db.max;
                // get a desired number of ticks
                var nt = 2 + Math.ceil((dim-(this.tickSpacing-1))/this.tickSpacing);
                range = this.max - this.min;
                this.numberTicks = nt;
                this.tickInterval = range / (this.numberTicks - 1);

                for (i=0; i<this.numberTicks; i++){
                    tt = this.min + i * this.tickInterval;
                    t = new this.tickRenderer(this.tickOptions);
                    // var t = new $.jqplot.AxisTickRenderer(this.tickOptions);
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    t.setTick(tt, this.name);
                    this._ticks.push(t);
                }
                
            }
        }
    };
    
    // called with scope of axis
    $.jqplot.MekkoAxisRenderer.prototype.pack = function(pos, offsets) {
        var ticks = this._ticks;
        var max = this.max;
        var min = this.min;
        var offmax = offsets.max;
        var offmin = offsets.min;
        var lshow = (this._label == null) ? false : this._label.show;
        
        for (var p in pos) {
            this._elem.css(p, pos[p]);
        }
        
        this._offsets = offsets;
        // pixellength will be + for x axes and - for y axes becasue pixels always measured from top left.
        var pixellength = offmax - offmin;
        var unitlength = max - min;
        
        // point to unit and unit to point conversions references to Plot DOM element top left corner.
        this.p2u = function(p){
            return (p - offmin) * unitlength / pixellength + min;
        };
        
        this.u2p = function(u){
            return (u - min) * pixellength / unitlength + offmin;
        };
                
        if (this.name == 'xaxis' || this.name == 'x2axis'){
            this.series_u2p = function(u){
                return (u - min) * pixellength / unitlength;
            };
            this.series_p2u = function(p){
                return p * unitlength / pixellength + min;
            };
        }
        
        else {
            this.series_u2p = function(u){
                return (u - max) * pixellength / unitlength;
            };
            this.series_p2u = function(p){
                return p * unitlength / pixellength + max;
            };
        }
        
        if (this.show) {
            if (this.name == 'xaxis' || this.name == 'x2axis') {
                for (var i=0; i<ticks.length; i++) {
                    var t = ticks[i];
                    if (t.show && t.showLabel) {
                        var shim;
                        
                        if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                            // will need to adjust auto positioning based on which axis this is.
                            var temp = (this.name == 'xaxis') ? 1 : -1;
                            switch (t.labelPosition) {
                                case 'auto':
                                    // position at end
                                    if (temp * t.angle < 0) {
                                        shim = -t.getWidth() + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                    }
                                    // position at start
                                    else {
                                        shim = -t._textRenderer.height * Math.sin(t._textRenderer.angle) / 2;
                                    }
                                    break;
                                case 'end':
                                    shim = -t.getWidth() + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                    break;
                                case 'start':
                                    shim = -t._textRenderer.height * Math.sin(t._textRenderer.angle) / 2;
                                    break;
                                case 'middle':
                                    shim = -t.getWidth()/2 + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                    break;
                                default:
                                    shim = -t.getWidth()/2 + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                    break;
                            }
                        }
                        else {
                            shim = -t.getWidth()/2;
                        }
                        var val = this.u2p(t.value) + shim + 'px';
                        t._elem.css('left', val);
                        t.pack();
                    }
                }
                var w;
                if (lshow) {
                    w = this._label._elem.outerWidth(true);
                    this._label._elem.css('left', offmin + pixellength/2 - w/2 + 'px');
                    if (this.name == 'xaxis') {
                        this._label._elem.css('bottom', '0px');
                    }
                    else {
                        this._label._elem.css('top', '0px');
                    }
                    this._label.pack();
                }
                // now show the labels under the bars.
                var b, l, r;
                for (var i=0; i<this.barLabels.length; i++) {
                    b = this._barLabels[i];
                    if (b.show) {
                        w = b.getWidth();
                        l = this._ticks[i].getLeft() + this._ticks[i].getWidth();
                        r = this._ticks[i+1].getLeft();
                        b._elem.css('left', (r+l-w)/2+'px');
                        b._elem.css('top', this._ticks[i]._elem.css('top'));
                        b.pack();
                    }
                }
            }
            else {
                for (var i=0; i<ticks.length; i++) {
                    var t = ticks[i];
                    if (t.show && t.showLabel) {                        
                        var shim;
                        if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                            // will need to adjust auto positioning based on which axis this is.
                            var temp = (this.name == 'yaxis') ? 1 : -1;
                            switch (t.labelPosition) {
                                case 'auto':
                                    // position at end
                                case 'end':
                                    if (temp * t.angle < 0) {
                                        shim = -t._textRenderer.height * Math.cos(-t._textRenderer.angle) / 2;
                                    }
                                    else {
                                        shim = -t.getHeight() + t._textRenderer.height * Math.cos(t._textRenderer.angle) / 2;
                                    }
                                    break;
                                case 'start':
                                    if (t.angle > 0) {
                                        shim = -t._textRenderer.height * Math.cos(-t._textRenderer.angle) / 2;
                                    }
                                    else {
                                        shim = -t.getHeight() + t._textRenderer.height * Math.cos(t._textRenderer.angle) / 2;
                                    }
                                    break;
                                case 'middle':
                                    shim = -t.getHeight()/2;
                                    break;
                                default:
                                    shim = -t.getHeight()/2;
                                    break;
                            }
                        }
                        else {
                            shim = -t.getHeight()/2;
                        }
                        
                        var val = this.u2p(t.value) + shim + 'px';
                        t._elem.css('top', val);
                        t.pack();
                    }
                }
                if (lshow) {
                    var h = this._label._elem.outerHeight(true);
                    this._label._elem.css('top', offmax - pixellength/2 - h/2 + 'px');
                    if (this.name == 'yaxis') {
                        this._label._elem.css('left', '0px');
                    }
                    else {
                        this._label._elem.css('right', '0px');
                    }   
                    this._label.pack();
                }
            }
        }
    };
})(jQuery);
