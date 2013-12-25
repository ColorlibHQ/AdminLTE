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
    *  class: $.jqplot.LogAxisRenderer
    *  A plugin for a jqPlot to render a logarithmic axis.
    * 
    *  To use this renderer, include the plugin in your source
    *  > <script type="text/javascript" language="javascript" src="plugins/jqplot.logAxisRenderer.js"></script>
    *  
    *  and supply the appropriate options to your plot
    *  
    *  > {axes:{xaxis:{renderer:$.jqplot.LogAxisRenderer}}}
    **/ 
    $.jqplot.LogAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
        // prop: axisDefaults
        // Default properties which will be applied directly to the series.
        //
        // Group: Properties
        //
        // Properties
        //
        // base - the logarithmic base, commonly 2, 10 or Math.E
        // tickDistribution - Deprecated.  "power" distribution of ticks
        // always used.  Option has no effect.
        this.axisDefaults = {
            base : 10,
            tickDistribution :'power'
        };
    };
    
    $.jqplot.LogAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.LogAxisRenderer.prototype.constructor = $.jqplot.LogAxisRenderer;
    
    $.jqplot.LogAxisRenderer.prototype.init = function(options) {
        // prop: drawBaseline
        // True to draw the axis baseline.
        this.drawBaseline = true;
        // prop: minorTicks
        // Number of ticks to add between "major" ticks.
        // Major ticks are ticks supplied by user or auto computed.
        // Minor ticks cannot be created by user.
        this.minorTicks = 'auto';
        this._scalefact = 1.0;

        $.extend(true, this, options);

        this._autoFormatString = '%d';
        this._overrideFormatString = false;

        for (var d in this.renderer.axisDefaults) {
            if (this[d] == null) {
                this[d] = this.renderer.axisDefaults[d];
            }
        }

        this.resetDataBounds();
    };
    
    $.jqplot.LogAxisRenderer.prototype.createTicks = function(plot) {
        // we're are operating on an axis here
        var ticks = this._ticks;
        var userTicks = this.ticks;
        var name = this.name;
        var db = this._dataBounds;
        var dim = (this.name.charAt(0) === 'x') ? this._plotDimensions.width : this._plotDimensions.height;
        var interval;
        var min, max;
        var pos1, pos2;
        var tt, i;

        var threshold = 30;
        // For some reason scalefactor is screwing up ticks.
        this._scalefact =  (Math.max(dim, threshold+1) - threshold)/300;

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

                else if ($.isPlainObject(ut)) {
                    $.extend(true, t, ut);
                    t.axis = this.name;
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
        }
        
        // we don't have any ticks yet, let's make some!
        else if (this.min == null && this.max == null) {
            min = db.min * (2 - this.padMin);
            max = db.max * this.padMax;
            
            // if min and max are same, space them out a bit
            if (min == max) {
                var adj = 0.05;
                min = min*(1-adj);
                max = max*(1+adj);
            }
            
            // perform some checks
            if (this.min != null && this.min <= 0) {
                throw new Error("Log axis minimum must be greater than 0");
            }
            if (this.max != null && this.max <= 0) {
                throw new Error("Log axis maximum must be greater than 0");
            }

            function findCeil (val) {
                var order = Math.pow(10, Math.floor(Math.log(val)/Math.LN10));
                return Math.ceil(val/order) * order;
            }

            function findFloor(val) {
                var order = Math.pow(10, Math.floor(Math.log(val)/Math.LN10));
                return Math.floor(val/order) * order;
            }

            // var range = max - min;
            var rmin, rmax;

            // for power distribution, open up range to get a nice power of axis.renderer.base.
            // power distribution won't respect the user's min/max settings.
            rmin = Math.pow(this.base, Math.floor(Math.log(min)/Math.log(this.base)));
            rmax = Math.pow(this.base, Math.ceil(Math.log(max)/Math.log(this.base)));

            // // if min and max are same, space them out a bit
            // if (rmin === rmax) {
            //     var adj = 0.05;
            //     rmin = rmin*(1-adj);
            //     rmax = rmax*(1+adj);
            // }

            // Handle case where a data value was zero
            if (rmin === 0) {
              rmin = 1;
            }

            var order = Math.round(Math.log(rmin)/Math.LN10);

            if (this.tickOptions == null || !this.tickOptions.formatString) {
                this._overrideFormatString = true;
            }

            this.min = rmin;
            this.max = rmax;
            var range = this.max - this.min;            

            var minorTicks = (this.minorTicks === 'auto') ? 0 : this.minorTicks;
            var numberTicks;
            if (this.numberTicks == null){
                if (dim > 140) {
                    numberTicks = Math.round(Math.log(this.max/this.min)/Math.log(this.base) + 1);
                    if (numberTicks < 2) {
                        numberTicks = 2;
                    }
                    if (minorTicks === 0) {
                        var temp = dim/(numberTicks - 1);
                        if (temp < 100) {
                            minorTicks = 0;
                        }
                        else if (temp < 190) {
                            minorTicks = 1;
                        }
                        else if (temp < 250) {
                            minorTicks = 3;
                        }
                        else if (temp < 600) {
                            minorTicks = 4;
                        }
                        else {
                            minorTicks = 9;
                        }
                    }
                }
                else {
                    numberTicks = 2;
                    if (minorTicks === 0) {
                        minorTicks = 1;
                    }
                    minorTicks = 0;
                }
            }
            else {
                numberTicks = this.numberTicks;
            }

            if (order >= 0 && minorTicks !== 3) {
                this._autoFormatString = '%d';
            }
            // Adjust format string for case with 3 ticks where we'll have like 1, 2.5, 5, 7.5, 10
            else if (order <= 0 && minorTicks === 3) {
                var temp = -(order - 1);
                this._autoFormatString = '%.'+ Math.abs(order-1) + 'f';
            }

            // Adjust format string for values less than 1.
            else if (order < 0) {
                var temp = -order;
                this._autoFormatString = '%.'+ Math.abs(order) + 'f';
            }

            else {
                this._autoFormatString = '%d';
            }

            var to, t, val, tt1, spread, interval;
            for (var i=0; i<numberTicks; i++){
                tt = Math.pow(this.base, i - numberTicks + 1) * this.max;

                t = new this.tickRenderer(this.tickOptions);
            
                if (this._overrideFormatString) {
                    t.formatString = this._autoFormatString;
                }
                
                if (!this.showTicks) {
                    t.showLabel = false;
                    t.showMark = false;
                }
                else if (!this.showTickMarks) {
                    t.showMark = false;
                }
                t.setTick(tt, this.name);
                this._ticks.push(t);

                if (minorTicks && i<numberTicks-1) {
                    tt1 = Math.pow(this.base, i - numberTicks + 2) * this.max;
                    spread = tt1 - tt;
                    interval = tt1 / (minorTicks+1);
                    for (var j=minorTicks-1; j>=0; j--) {
                        val = tt1-interval*(j+1);
                        t = new this.tickRenderer(this.tickOptions);
            
                        if (this._overrideFormatString && this._autoFormatString != '') {
                            t.formatString = this._autoFormatString;
                        }
                        if (!this.showTicks) {
                            t.showLabel = false;
                            t.showMark = false;
                        }
                        else if (!this.showTickMarks) {
                            t.showMark = false;
                        }
                        t.setTick(val, this.name);
                        this._ticks.push(t);
                    }
                }       
            }     
        }

        // min and max are set as would be the case with zooming
        else if (this.min != null && this.max != null) {
            var opts = $.extend(true, {}, this.tickOptions, {name: this.name, value: null});
            var nt, ti;
            // don't have an interval yet, pick one that gives the most
            // "round" ticks we can get.
            if (this.numberTicks == null && this.tickInterval == null) {
                // var threshold = 30;
                var tdim = Math.max(dim, threshold+1);
                var nttarget =  Math.ceil((tdim-threshold)/35 + 1);

                var ret = $.jqplot.LinearTickGenerator.bestConstrainedInterval(this.min, this.max, nttarget);

                this._autoFormatString = ret[3];
                nt = ret[2];
                ti = ret[4];

                for (var i=0; i<nt; i++) {
                    opts.value = this.min + i * ti;
                    t = new this.tickRenderer(opts);
                    
                    if (this._overrideFormatString && this._autoFormatString != '') {
                        t.formatString = this._autoFormatString;
                    }
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    this._ticks.push(t);
                }
            }

            // for loose zoom, number ticks and interval are also set.
            else if (this.numberTicks != null && this.tickInterval != null) {
                nt = this.numberTicks;
                for (var i=0; i<nt; i++) {
                    opts.value = this.min + i * this.tickInterval;
                    t = new this.tickRenderer(opts);
                    
                    if (this._overrideFormatString && this._autoFormatString != '') {
                        t.formatString = this._autoFormatString;
                    }
                    if (!this.showTicks) {
                        t.showLabel = false;
                        t.showMark = false;
                    }
                    else if (!this.showTickMarks) {
                        t.showMark = false;
                    }
                    this._ticks.push(t);
                }
            }
        }
    };
    
    $.jqplot.LogAxisRenderer.prototype.pack = function(pos, offsets) {
        var lb = parseInt(this.base, 10);
        var ticks = this._ticks;
        var trans = function (v) { return Math.log(v)/Math.log(lb); };
        var invtrans = function (v) { return Math.pow(Math.E, (Math.log(lb)*v)); };
        var max = trans(this.max);
        var min = trans(this.min);
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
            return invtrans((p - offmin) * unitlength / pixellength + min);
        };
        
        this.u2p = function(u){
            return (trans(u) - min) * pixellength / unitlength + offmin;
        };
        
        if (this.name == 'xaxis' || this.name == 'x2axis'){
            this.series_u2p = function(u){
                return (trans(u) - min) * pixellength / unitlength;
            };
            this.series_p2u = function(p){
                return invtrans(p * unitlength / pixellength + min);
            };
        }
        // yaxis is max at top of canvas.
        else {
            this.series_u2p = function(u){
                return (trans(u) - max) * pixellength / unitlength;
            };
            this.series_p2u = function(p){
                return invtrans(p * unitlength / pixellength + max);
            };
        }
        
        if (this.show) {
            if (this.name == 'xaxis' || this.name == 'x2axis') {
                for (var i=0; i<ticks.length; i++) {
                    var t = ticks[i];
                    if (t.show && t.showLabel) {
                        var shim;
                        
                        if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                            switch (t.labelPosition) {
                                case 'auto':
                                    // position at end
                                    if (t.angle < 0) {
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
                        // var shim = t.getWidth()/2;
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
                    if (t.show && t.showLabel) {                        
                        var shim;
                        if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                            switch (t.labelPosition) {
                                case 'auto':
                                    // position at end
                                case 'end':
                                    if (t.angle < 0) {
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