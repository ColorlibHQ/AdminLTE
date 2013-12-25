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
    $.jqplot.PyramidAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.PyramidAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.PyramidAxisRenderer.prototype.constructor = $.jqplot.PyramidAxisRenderer;
        
    // called with scope of axis
    $.jqplot.PyramidAxisRenderer.prototype.init = function(options){
        // Group: Properties
        //
        // prop: position
        // Position of axis.  Values are: top, bottom , left, center, right.
        // By default, x and x2 axes are bottom, y axis is center.
        this.position = null;
        // prop: drawBaseline
        // True to draw the axis baseline.
        this.drawBaseline = true;
        // prop: baselineWidth
        // width of the baseline in pixels.
        this.baselineWidth = null;
        // prop: baselineColor
        // CSS color spec for the baseline.
        this.baselineColor = null;
        this.tickSpacingFactor = 25;
        this._type = 'pyramid';
        this._splitAxis = false;
        this._splitLength = null;
        this.category = false;
        this._autoFormatString = '';
        this._overrideFormatString = false;
        
        $.extend(true, this, options);
        this.renderer.options = options;

        this.resetDataBounds = this.renderer.resetDataBounds;
        this.resetDataBounds();

    };

    $.jqplot.PyramidAxisRenderer.prototype.resetDataBounds = function() {
        // Go through all the series attached to this axis and find
        // the min/max bounds for this axis.
        var db = this._dataBounds;
        db.min = null;
        db.max = null;
        var temp;
        for (var i=0; i<this._series.length; i++) {
            var s = this._series[i];
            var d = s._plotData;
            
            for (var j=0, l=d.length; j<l; j++) { 
                if (this.name.charAt(0) === 'x') {
                    temp = d[j][1];
                    if ((temp !== null && temp < db.min) || db.min === null) {
                        db.min = temp;
                    }
                    if ((temp !== null && temp > db.max) || db.max === null) {
                        db.max = temp;
                    }
                }              
                else {
                    temp = d[j][0];
                    if ((temp !== null && temp < db.min) || db.min === null) {
                        db.min = temp;
                    }
                    if ((temp !== null && temp > db.max) || db.max === null) {
                        db.max = temp;
                    }
                }              
            }
        }
    };
    
    // called with scope of axis
    $.jqplot.PyramidAxisRenderer.prototype.draw = function(ctx, plot) {
        if (this.show) {
            // populate the axis label and value properties.
            // createTicks is a method on the renderer, but
            // call it within the scope of the axis.
            this.renderer.createTicks.call(this, plot);
            // fill a div with axes labels in the right direction.
            // Need to pregenerate each axis to get its bounds and
            // position it and the labels correctly on the plot.
            var dim=0;
            var temp;
            // Added for theming.
            if (this._elem) {
                // Memory Leaks patch
                //this._elem.empty();
                this._elem.emptyForce();
                this._elem = null;
            }
            
            this._elem = $(document.createElement('div'));
            this._elem.addClass('jqplot-axis jqplot-'+this.name);
            this._elem.css('position', 'absolute');

            
            if (this.name == 'xaxis' || this.name == 'x2axis') {
                this._elem.width(this._plotDimensions.width);
            }
            else {
                this._elem.height(this._plotDimensions.height);
            }
            
            // create a _label object.
            this.labelOptions.axis = this.name;
            this._label = new this.labelRenderer(this.labelOptions);
            if (this._label.show) {
                var elem = this._label.draw(ctx, plot);
                elem.appendTo(this._elem);
                elem = null;
            }
    
            var t = this._ticks;
            var tick;
            for (var i=0; i<t.length; i++) {
                tick = t[i];
                if (tick.show && tick.showLabel && (!tick.isMinorTick)) {
                    this._elem.append(tick.draw(ctx, plot));
                }
            }
            tick = null;
            t = null;
        }
        return this._elem;
    };   

    // Note, primes can be found on http://primes.utm.edu/
    var _primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];


    var _primesHash = {};

    for (var i =0, l = _primes.length; i < l; i++) {
        _primesHash[_primes[i]] = _primes[i];
    }

    // called with scope of axis
    $.jqplot.PyramidAxisRenderer.prototype.createTicks = function(plot) {
        // we're are operating on an axis here
        var userTicks = this.ticks;
        // databounds were set on axis initialization.
        var db = this._dataBounds;
        var dim;
        var interval;
        var min;
        var max;
        var range;
        var pos1;
        var pos2;
        var tt;
        var i;
        var l;
        var s;
        // get a copy of user's settings for min/max.
        var userMin = this.min;
        var userMax = this.max;
        var ut;
        var t;
        var threshold;
        var tdim;
        var scalefact;
        var ret;
        var tumin;
        var tumax;
        var maxVisibleTicks;
        var val;
        var skip = null;
        var temp;
        
        // if we already have ticks, use them.
        // ticks must be in order of increasing value.

        if (userTicks.length) {
            // ticks could be 1D or 2D array of [val, val, ,,,] or [[val, label], [val, label], ...] or mixed
            for (i=0, l=userTicks.length; i<l; i++){
                ut = userTicks[i];
                t = new this.tickRenderer(this.tickOptions);
                if ($.isArray(ut)) {
                    t.value = ut[0];
                    t.label = ut[1];
                    t.setTick(ut[0], this.name);
                    this._ticks.push(t);
                }

                else if ($.isPlainObject(ut)) {
                    $.extend(true, t, ut);
                    t.axis = this.name;
                    this._ticks.push(t);
                }
                
                else {
                    if (typeof ut === 'string') {
                        val = i + plot.defaultAxisStart;
                    }
                    else {
                        val = ut;
                    }
                    t.value = val;
                    t.label = ut;
                    t.axis = this.name;
                    this._ticks.push(t);
                }
            }
            this.numberTicks = userTicks.length;
            this.min = this._ticks[0].value;
            this.max = this._ticks[this.numberTicks-1].value;
            this.tickInterval = (this.max - this.min) / (this.numberTicks - 1);

            // use user specified tickInterval if there is one
            if (this._options.tickInterval) {
                // hide every tick except for ticks on interval
                var ti = this._options.tickInterval;
                for (i=0; i<this.numberTicks; i++) {
                    if (i%ti !== 0) {
                        // this._ticks[i].show = false;
                        this._ticks[i].isMinorTick = true;
                    }
                }
            }

            else {
                // check if we have too many ticks
                dim = (this.name.charAt(0) === 'x') ? this._plotDimensions.width : this._plotDimensions.height;
                maxVisibleTicks = Math.round(2.0 + dim/this.tickSpacingFactor);

                if (this.numberTicks > maxVisibleTicks) {
                    // check for number of ticks we can skip
                    temp = this.numberTicks - 1;
                    for (i=2; i<temp; i++) {
                        if (temp % i === 0 && temp/i < maxVisibleTicks) {
                            skip = i-1;
                            break;
                        }
                    }

                    if (skip !== null) {
                        var count = 1;
                        for (i=1, l=this._ticks.length; i<l; i++) {
                            if (count <= skip) {
                                this._ticks[i].show = false;
                                count += 1;
                            }
                            else {
                                count = 1;
                            }
                        }
                    }
                }
            }

            // if category style, add minor ticks in between
            temp = [];
            if (this.category) {
                // turn off gridline and mark on first tick
                this._ticks[0].showGridline = false;
                this._ticks[0].showMark = false;

                for (i=this._ticks.length-1; i>0; i--) {
                    t = new this.tickRenderer(this.tickOptions);
                    t.value = this._ticks[i-1].value + this.tickInterval/2.0;
                    t.label = '';
                    t.showLabel = false;
                    t.axis = this.name;
                    this._ticks[i].showGridline = false;
                    this._ticks[i].showMark = false;
                    this._ticks.splice(i, 0, t);
                    // temp.push(t);
                }

                // merge in the new ticks
                // for (i=1, l=temp.length; i<l; i++) {
                //     this._ticks.splice(i, 0, temp[i]);
                // }

                // now add a tick at beginning and end
                t = new this.tickRenderer(this.tickOptions);
                t.value = this._ticks[0].value - this.tickInterval/2.0;
                t.label = '';
                t.showLabel = false;
                t.axis = this.name;
                this._ticks.unshift(t);

                t = new this.tickRenderer(this.tickOptions);
                t.value = this._ticks[this._ticks.length-1].value + this.tickInterval/2.0;
                t.label = '';
                t.showLabel = false;
                t.axis = this.name;
                this._ticks.push(t);

                this.tickInterval = this.tickInterval / 2.0;
                this.numberTicks = this._ticks.length;
                this.min = this._ticks[0].value;
                this.max = this._ticks[this._ticks.length-1].value;
            }
        }

        // we don't have any ticks yet, let's make some!
        else {
            if (this.name.charAt(0) === 'x') {
                dim = this._plotDimensions.width;
                // make sure x axis is symetric about 0.
                var tempmax = Math.max(db.max, Math.abs(db.min));
                var tempmin = Math.min(db.min, -tempmax);
                // min = ((this.min != null) ? this.min : tempmin);
                // max = ((this.max != null) ? this.max : tempmax);
                min = tempmin;
                max = tempmax;
                range = max - min;

                if (this.tickOptions == null || !this.tickOptions.formatString) {
                    this._overrideFormatString = true;
                }

                threshold = 30;
                tdim = Math.max(dim, threshold+1);
                scalefact =  (tdim-threshold)/300.0;
                ret = $.jqplot.LinearTickGenerator(min, max, scalefact); 
                // calculate a padded max and min, points should be less than these
                // so that they aren't too close to the edges of the plot.
                // User can adjust how much padding is allowed with pad, padMin and PadMax options. 
                tumin = min + range*(this.padMin - 1);
                tumax = max - range*(this.padMax - 1);

                if (min < tumin || max > tumax) {
                    tumin = min - range*(this.padMin - 1);
                    tumax = max + range*(this.padMax - 1);
                    ret = $.jqplot.LinearTickGenerator(tumin, tumax, scalefact);
                }

                this.min = ret[0];
                this.max = ret[1];
                this.numberTicks = ret[2];
                this._autoFormatString = ret[3];
                this.tickInterval = ret[4];
            }
            else {
                dim = this._plotDimensions.height;

                // ticks will be on whole integers like 1, 2, 3, ... or 1, 4, 7, ...
                min = db.min;
                max = db.max;
                s = this._series[0];
                this._ticks = [];

                range = max - min;

                // if range is a prime, will get only 2 ticks, expand range in that case.
                if (_primesHash[range]) {
                    range += 1;
                    max += 1;
                }

                this.max = max;
                this.min = min;
                
                maxVisibleTicks = Math.round(2.0 + dim/this.tickSpacingFactor);

                if (range + 1 <= maxVisibleTicks) {
                    this.numberTicks = range + 1;
                    this.tickInterval = 1.0;
                }

                else {
                    // figure out a round number of ticks to skip in every interval
                    // range / ti + 1 = nt
                    // ti = range / (nt - 1)
                    for (var i=maxVisibleTicks; i>1; i--) {
                        if (range/(i - 1) === Math.round(range/(i - 1))) {
                            this.numberTicks = i;
                            this.tickInterval = range/(i - 1);
                            break;
                        }
                        
                    }
                }
            }
            
            if (this._overrideFormatString && this._autoFormatString != '') {
                this.tickOptions = this.tickOptions || {};
                this.tickOptions.formatString = this._autoFormatString;
            }

            var labelval;
            for (i=0; i<this.numberTicks; i++) {
                this.tickOptions.axis = this.name;
                labelval = this.min + this.tickInterval * i;
                if (this.name.charAt(0) === 'x') {
                    labelval = Math.abs(labelval);
                }
                // this.tickOptions.label = String (labelval);
                this.tickOptions.value = this.min + this.tickInterval * i;
                t = new this.tickRenderer(this.tickOptions);

                t.label = t.prefix + t.formatter(t.formatString, labelval);

                this._ticks.push(t);
                // for x axis, if y axis is in middle, add a symetrical 0 tick
                if (this.name.charAt(0) === 'x' && plot.axes.yMidAxis.show && this.tickOptions.value === 0) {
                    this._splitAxis = true;
                    this._splitLength = plot.axes.yMidAxis.getWidth();
                    // t.value = -this.max/2000.0;
                    t = new this.tickRenderer(this.tickOptions);
                    this._ticks.push(t);
                    t.value = this.max/2000.0;
                }
            }
            t = null;
        }
    };
    
    // called with scope of axis
    $.jqplot.PyramidAxisRenderer.prototype.set = function() { 
        var dim = 0;
        var temp;
        var w = 0;
        var h = 0;
        var i;
        var t;
        var tick;
        var lshow = (this._label == null) ? false : this._label.show;
        if (this.show) {
            t = this._ticks;
            l = t.length;
            for (i=0; i<l; i++) {
                tick = t[i];
                if (!tick._breakTick && tick.show && tick.showLabel && !tick.isMinorTick) {
                    if (this.name.charAt(0) === 'x') {
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

            if (this.name === 'yMidAxis') {
                for (i=0; i<l; i++) {
                    tick = t[i];
                    if (tick._elem) {
                        temp = (dim - tick._elem.outerWidth(true))/2.0;
                        tick._elem.css('left', temp);
                    }
                }
            }
            tick = null;
            t = null;
            
            if (lshow) {
                w = this._label._elem.outerWidth(true);
                h = this._label._elem.outerHeight(true); 
            }
            if (this.name === 'xaxis') {
                dim = dim + h;
                this._elem.css({'height':dim+'px', left:'0px', bottom:'0px'});
            }
            else if (this.name === 'x2axis') {
                dim = dim + h;
                this._elem.css({'height':dim+'px', left:'0px', top:'0px'});
            }
            else if (this.name === 'yaxis') {
                dim = dim + w;
                this._elem.css({'width':dim+'px', left:'0px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css('width', w+'px');
                }
            }
            else if (this.name === 'yMidAxis') {
                // don't include width of label at all in width of axis?
                // dim = (dim > w) ? dim : w;
                var temp = dim/2.0 - w/2.0;
                this._elem.css({'width':dim+'px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css({width: w, left: temp, top: 0});
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
    
    $.jqplot.PyramidAxisRenderer.prototype.pack = function(pos, offsets) { 
        // Add defaults for repacking from resetTickValues function.
        pos = pos || {};
        offsets = offsets || this._offsets;
        
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
        var sl = this._splitLength;
        
        // point to unit and unit to point conversions references to Plot DOM element top left corner.
        if (this._splitAxis) {
            pixellength -= this._splitLength;
            
            // don't know that this one is correct.
            this.p2u = function(p){
                return (p - offmin) * unitlength / pixellength + min;
            };
        
            this.u2p = function(u){
                if (u <= 0) {
                    return (u - min) * pixellength / unitlength + offmin;
                }
                else {
                    return (u - min) * pixellength / unitlength + offmin + sl;
                }
            };
                
            this.series_u2p = function(u){
                if (u <= 0) {
                    return (u - min) * pixellength / unitlength;
                }
                else {
                    return (u - min) * pixellength / unitlength + sl;
                }
            };

            // don't know that this one is correct.
            this.series_p2u = function(p){
                return p * unitlength / pixellength + min;
            };
        }
        else {
            this.p2u = function(p){
                return (p - offmin) * unitlength / pixellength + min;
            };
        
            this.u2p = function(u){
                return (u - min) * pixellength / unitlength + offmin;
            };
                
            if (this.name.charAt(0) === 'x'){
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
        }
        
        if (this.show) {
            if (this.name.charAt(0) === 'x') {
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
                if (lshow) {
                    var w = this._label._elem.outerWidth(true);
                    this._label._elem.css('left', offmin + pixellength/2 - w/2 + 'px');
                    if (this.name == 'xaxis') {
                        this._label._elem.css('bottom', '0px');
                    }
                    else {
                        this._label._elem.css('top', '0px');
                    }
                    this._label.pack();
                }
            }
            else {
                for (var i=0; i<ticks.length; i++) {
                    var t = ticks[i];
                    if (t.show && t.showLabel && !t.isMinorTick) {                        
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
                                    // if (t.angle > 0) {
                                    //     shim = -t.getHeight()/2 + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                    // }
                                    // else {
                                    //     shim = -t.getHeight()/2 - t._textRenderer.height * Math.sin(t._textRenderer.angle) / 2;
                                    // }
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
                    if (this.name !== 'yMidAxis') {
                        this._label._elem.css('top', offmax - pixellength/2 - h/2 + 'px');
                    }
                    if (this.name == 'yaxis') {
                        this._label._elem.css('left', '0px');
                    }
                    else if (this.name !== 'yMidAxis') {
                        this._label._elem.css('right', '0px');
                    }   
                    this._label.pack();
                }
            }
        }

        ticks = null;
    };
})(jQuery);
