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
    *  class: $.jqplot.CategoryAxisRenderer
    *  A plugin for jqPlot to render a category style axis, with equal pixel spacing between y data values of a series.
    *  
    *  To use this renderer, include the plugin in your source
    *  > <script type="text/javascript" language="javascript" src="plugins/jqplot.categoryAxisRenderer.js"></script>
    *  
    *  and supply the appropriate options to your plot
    *  
    *  > {axes:{xaxis:{renderer:$.jqplot.CategoryAxisRenderer}}}
    **/
    $.jqplot.CategoryAxisRenderer = function(options) {
        $.jqplot.LinearAxisRenderer.call(this);
        // prop: sortMergedLabels
        // True to sort tick labels when labels are created by merging
        // x axis values from multiple series.  That is, say you have
        // two series like:
        // > line1 = [[2006, 4],            [2008, 9], [2009, 16]];
        // > line2 = [[2006, 3], [2007, 7], [2008, 6]];
        // If no label array is specified, tick labels will be collected
        // from the x values of the series.  With sortMergedLabels
        // set to true, tick labels will be:
        // > [2006, 2007, 2008, 2009]
        // With sortMergedLabels set to false, tick labels will be:
        // > [2006, 2008, 2009, 2007]
        //
        // Note, this property is specified on the renderOptions for the 
        // axes when creating a plot:
        // > axes:{xaxis:{renderer:$.jqplot.CategoryAxisRenderer, rendererOptions:{sortMergedLabels:true}}}
        this.sortMergedLabels = false;
    };
    
    $.jqplot.CategoryAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.CategoryAxisRenderer.prototype.constructor = $.jqplot.CategoryAxisRenderer;
    
    $.jqplot.CategoryAxisRenderer.prototype.init = function(options){
        this.groups = 1;
        this.groupLabels = [];
        this._groupLabels = [];
        this._grouped = false;
        this._barsPerGroup = null;
        this.reverse = false;
        // prop: tickRenderer
        // A class of a rendering engine for creating the ticks labels displayed on the plot, 
        // See <$.jqplot.AxisTickRenderer>.
        // this.tickRenderer = $.jqplot.AxisTickRenderer;
        // this.labelRenderer = $.jqplot.AxisLabelRenderer;
        $.extend(true, this, {tickOptions:{formatString:'%d'}}, options);
        var db = this._dataBounds;
        // Go through all the series attached to this axis and find
        // the min/max bounds for this axis.
        for (var i=0; i<this._series.length; i++) {
            var s = this._series[i];
            if (s.groups) {
                this.groups = s.groups;
            }
            var d = s.data;
            
            for (var j=0; j<d.length; j++) { 
                if (this.name == 'xaxis' || this.name == 'x2axis') {
                    if (d[j][0] < db.min || db.min == null) {
                        db.min = d[j][0];
                    }
                    if (d[j][0] > db.max || db.max == null) {
                        db.max = d[j][0];
                    }
                }              
                else {
                    if (d[j][1] < db.min || db.min == null) {
                        db.min = d[j][1];
                    }
                    if (d[j][1] > db.max || db.max == null) {
                        db.max = d[j][1];
                    }
                }              
            }
        }
        
        if (this.groupLabels.length) {
            this.groups = this.groupLabels.length;
        }
    };
 

    $.jqplot.CategoryAxisRenderer.prototype.createTicks = function() {
        // we're are operating on an axis here
        var ticks = this._ticks;
        var userTicks = this.ticks;
        var name = this.name;
        // databounds were set on axis initialization.
        var db = this._dataBounds;
        var dim, interval;
        var min, max;
        var pos1, pos2;
        var tt, i;

        // if we already have ticks, use them.
        if (userTicks.length) {
            // adjust with blanks if we have groups
            if (this.groups > 1 && !this._grouped) {
                var l = userTicks.length;
                var skip = parseInt(l/this.groups, 10);
                var count = 0;
                for (var i=skip; i<l; i+=skip) {
                    userTicks.splice(i+count, 0, ' ');
                    count++;
                }
                this._grouped = true;
            }
            this.min = 0.5;
            this.max = userTicks.length + 0.5;
            var range = this.max - this.min;
            this.numberTicks = 2*userTicks.length + 1;
            for (i=0; i<userTicks.length; i++){
                tt = this.min + 2 * i * range / (this.numberTicks-1);
                // need a marker before and after the tick
                var t = new this.tickRenderer(this.tickOptions);
                t.showLabel = false;
                // t.showMark = true;
                t.setTick(tt, this.name);
                this._ticks.push(t);
                var t = new this.tickRenderer(this.tickOptions);
                t.label = userTicks[i];
                // t.showLabel = true;
                t.showMark = false;
                t.showGridline = false;
                t.setTick(tt+0.5, this.name);
                this._ticks.push(t);
            }
            // now add the last tick at the end
            var t = new this.tickRenderer(this.tickOptions);
            t.showLabel = false;
            // t.showMark = true;
            t.setTick(tt+1, this.name);
            this._ticks.push(t);
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
            
            // if max, min, and interval specified and interval won't fit, ignore interval.
            if (this.min != null && this.max != null && this.tickInterval != null) {
                if (parseInt((this.max-this.min)/this.tickInterval, 10) != (this.max-this.min)/this.tickInterval) {
                    this.tickInterval = null;
                }
            }
        
            // find out how many categories are in the lines and collect labels
            var labels = [];
            var numcats = 0;
            var min = 0.5;
            var max, val;
            var isMerged = false;
            for (var i=0; i<this._series.length; i++) {
                var s = this._series[i];
                for (var j=0; j<s.data.length; j++) {
                    if (this.name == 'xaxis' || this.name == 'x2axis') {
                        val = s.data[j][0];
                    }
                    else {
                        val = s.data[j][1];
                    }
                    if ($.inArray(val, labels) == -1) {
                        isMerged = true;
                        numcats += 1;      
                        labels.push(val);
                    }
                }
            }
            
            if (isMerged && this.sortMergedLabels) {
                if (typeof labels[0] == "string") {
                    labels.sort();
                } else {
                    labels.sort(function(a,b) { return a - b; });
                }
            }
            
            // keep a reference to these tick labels to use for redrawing plot (see bug #57)
            this.ticks = labels;
            
            // now bin the data values to the right lables.
            for (var i=0; i<this._series.length; i++) {
                var s = this._series[i];
                for (var j=0; j<s.data.length; j++) {
                    if (this.name == 'xaxis' || this.name == 'x2axis') {
                        val = s.data[j][0];
                    }
                    else {
                        val = s.data[j][1];
                    }
                    // for category axis, force the values into category bins.
                    // we should have the value in the label array now.
                    var idx = $.inArray(val, labels)+1;
                    if (this.name == 'xaxis' || this.name == 'x2axis') {
                        s.data[j][0] = idx;
                    }
                    else {
                        s.data[j][1] = idx;
                    }
                }
            }
            
            // adjust with blanks if we have groups
            if (this.groups > 1 && !this._grouped) {
                var l = labels.length;
                var skip = parseInt(l/this.groups, 10);
                var count = 0;
                for (var i=skip; i<l; i+=skip+1) {
                    labels[i] = ' ';
                }
                this._grouped = true;
            }
        
            max = numcats + 0.5;
            if (this.numberTicks == null) {
                this.numberTicks = 2*numcats + 1;
            }

            var range = max - min;
            this.min = min;
            this.max = max;
            var track = 0;
            
            // todo: adjust this so more ticks displayed.
            var maxVisibleTicks = parseInt(3+dim/10, 10);
            var skip = parseInt(numcats/maxVisibleTicks, 10);

            if (this.tickInterval == null) {

                this.tickInterval = range / (this.numberTicks-1);

            }
            // if tickInterval is specified, we will ignore any computed maximum.
            for (var i=0; i<this.numberTicks; i++){
                tt = this.min + i * this.tickInterval;
                var t = new this.tickRenderer(this.tickOptions);
                // if even tick, it isn't a category, it's a divider
                if (i/2 == parseInt(i/2, 10)) {
                    t.showLabel = false;
                    t.showMark = true;
                }
                else {
                    if (skip>0 && track<skip) {
                        t.showLabel = false;
                        track += 1;
                    }
                    else {
                        t.showLabel = true;
                        track = 0;
                    } 
                    t.label = t.formatter(t.formatString, labels[(i-1)/2]);
                    t.showMark = false;
                    t.showGridline = false;
                }
                t.setTick(tt, this.name);
                this._ticks.push(t);
            }
        }
        
    };
    
    // called with scope of axis
    $.jqplot.CategoryAxisRenderer.prototype.draw = function(ctx, plot) {
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
            // Added for theming.
            if (this._elem) {
                // this._elem.empty();
                // Memory Leaks patch
                this._elem.emptyForce();
            }

            this._elem = this._elem || $('<div class="jqplot-axis jqplot-'+this.name+'" style="position:absolute;"></div>');
            
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
            }
    
            var t = this._ticks;
            for (var i=0; i<t.length; i++) {
                var tick = t[i];
                if (tick.showLabel && (!tick.isMinorTick || this.showMinorTicks)) {
                    var elem = tick.draw(ctx, plot);
                    elem.appendTo(this._elem);
                }
            }
        
            this._groupLabels = [];
            // now make group labels
            for (var i=0; i<this.groupLabels.length; i++)
            {
                var elem = $('<div style="position:absolute;" class="jqplot-'+this.name+'-groupLabel"></div>');
                elem.html(this.groupLabels[i]);
                this._groupLabels.push(elem);
                elem.appendTo(this._elem);
            }
        }
        return this._elem;
    };
    
    // called with scope of axis
    $.jqplot.CategoryAxisRenderer.prototype.set = function() { 
        var dim = 0;
        var temp;
        var w = 0;
        var h = 0;
        var lshow = (this._label == null) ? false : this._label.show;
        if (this.show) {
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
            
            var dim2 = 0;
            for (var i=0; i<this._groupLabels.length; i++) {
                var l = this._groupLabels[i];
                if (this.name == 'xaxis' || this.name == 'x2axis') {
                    temp = l.outerHeight(true);
                }
                else {
                    temp = l.outerWidth(true);
                }
                if (temp > dim2) {
                    dim2 = temp;
                }
            }
            
            if (lshow) {
                w = this._label._elem.outerWidth(true);
                h = this._label._elem.outerHeight(true); 
            }
            if (this.name == 'xaxis') {
                dim += dim2 + h;
                this._elem.css({'height':dim+'px', left:'0px', bottom:'0px'});
            }
            else if (this.name == 'x2axis') {
                dim += dim2 + h;
                this._elem.css({'height':dim+'px', left:'0px', top:'0px'});
            }
            else if (this.name == 'yaxis') {
                dim += dim2 + w;
                this._elem.css({'width':dim+'px', left:'0px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css('width', w+'px');
                }
            }
            else {
                dim += dim2 + w;
                this._elem.css({'width':dim+'px', right:'0px', top:'0px'});
                if (lshow && this._label.constructor == $.jqplot.AxisLabelRenderer) {
                    this._label._elem.css('width', w+'px');
                }
            }
        }  
    };
    
    // called with scope of axis
    $.jqplot.CategoryAxisRenderer.prototype.pack = function(pos, offsets) {
        var ticks = this._ticks;
        var max = this.max;
        var min = this.min;
        var offmax = offsets.max;
        var offmin = offsets.min;
        var lshow = (this._label == null) ? false : this._label.show;
        var i;

        for (var p in pos) {
            this._elem.css(p, pos[p]);
        }
        
        this._offsets = offsets;
        // pixellength will be + for x axes and - for y axes becasue pixels always measured from top left.
        var pixellength = offmax - offmin;
        var unitlength = max - min;
        
        if (!this.reverse) {
            // point to unit and unit to point conversions references to Plot DOM element top left corner.
            
            this.u2p = function(u){
                return (u - min) * pixellength / unitlength + offmin;
            };

            this.p2u = function(p){
                return (p - offmin) * unitlength / pixellength + min;
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
        }

        else {
            // point to unit and unit to point conversions references to Plot DOM element top left corner.
            
            this.u2p = function(u){
                return offmin + (max - u) * pixellength / unitlength;
            };

            this.p2u = function(p){
                return min + (p - offmin) * unitlength / pixellength;
            };
                    
            if (this.name == 'xaxis' || this.name == 'x2axis'){
                this.series_u2p = function(u){
                    return (max - u) * pixellength / unitlength;
                };
                this.series_p2u = function(p){
                    return p * unitlength / pixellength + max;
                };
            }
            
            else {
                this.series_u2p = function(u){
                    return (min - u) * pixellength / unitlength;
                };
                this.series_p2u = function(p){
                    return p * unitlength / pixellength + min;
                };
            }

        }
            
        
        if (this.show) {
            if (this.name == 'xaxis' || this.name == 'x2axis') {
                for (i=0; i<ticks.length; i++) {
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
                
                var labeledge=['bottom', 0];
                if (lshow) {
                    var w = this._label._elem.outerWidth(true);
                    this._label._elem.css('left', offmin + pixellength/2 - w/2 + 'px');
                    if (this.name == 'xaxis') {
                        this._label._elem.css('bottom', '0px');
                        labeledge = ['bottom', this._label._elem.outerHeight(true)];
                    }
                    else {
                        this._label._elem.css('top', '0px');
                        labeledge = ['top', this._label._elem.outerHeight(true)];
                    }
                    this._label.pack();
                }
                
                // draw the group labels
                var step = parseInt(this._ticks.length/this.groups, 10) + 1;
                for (i=0; i<this._groupLabels.length; i++) {
                    var mid = 0;
                    var count = 0;
                    for (var j=i*step; j<(i+1)*step; j++) {
                        if (j >= this._ticks.length-1) continue; // the last tick does not exist as there is no other group in order to have an empty one.
                        if (this._ticks[j]._elem && this._ticks[j].label != " ") {
                            var t = this._ticks[j]._elem;
                            var p = t.position();
                            mid += p.left + t.outerWidth(true)/2;
                            count++;
                        }
                    }
                    mid = mid/count;
                    this._groupLabels[i].css({'left':(mid - this._groupLabels[i].outerWidth(true)/2)});
                    this._groupLabels[i].css(labeledge[0], labeledge[1]);
                }
            }
            else {
                for (i=0; i<ticks.length; i++) {
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
                
                var labeledge=['left', 0];
                if (lshow) {
                    var h = this._label._elem.outerHeight(true);
                    this._label._elem.css('top', offmax - pixellength/2 - h/2 + 'px');
                    if (this.name == 'yaxis') {
                        this._label._elem.css('left', '0px');
                        labeledge = ['left', this._label._elem.outerWidth(true)];
                    }
                    else {
                        this._label._elem.css('right', '0px');
                        labeledge = ['right', this._label._elem.outerWidth(true)];
                    }   
                    this._label.pack();
                }
                
                // draw the group labels, position top here, do left after label position.
                var step = parseInt(this._ticks.length/this.groups, 10) + 1; // step is one more than before as we don't want to have overlaps in loops
                for (i=0; i<this._groupLabels.length; i++) {
                    var mid = 0;
                    var count = 0;
                    for (var j=i*step; j<(i+1)*step; j++) { // j must never reach (i+1)*step as we don't want to have overlap between loops
                        if (j >= this._ticks.length-1) continue; // the last tick does not exist as there is no other group in order to have an empty one.
                        if (this._ticks[j]._elem && this._ticks[j].label != " ") {
                            var t = this._ticks[j]._elem;
                            var p = t.position();
                            mid += p.top + t.outerHeight()/2;
                            count++;
                        }
                    }
                    mid = mid/count;
                    this._groupLabels[i].css({'top':mid - this._groupLabels[i].outerHeight()/2});
                    this._groupLabels[i].css(labeledge[0], labeledge[1]);
                    
                }
            }
        }
    };    
    
    
})(jQuery);
