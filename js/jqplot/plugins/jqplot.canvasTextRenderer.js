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
 * included jsDate library by Chris Leonello:
 *
 * Copyright (c) 2010-2013 Chris Leonello
 *
 * jsDate is currently available for use in all personal or commercial projects 
 * under both the MIT and GPL version 2.0 licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly.
 *
 * jsDate borrows many concepts and ideas from the Date Instance 
 * Methods by Ken Snyder along with some parts of Ken's actual code.
 * 
 * Ken's original Date Instance Methods and copyright notice:
 * 
 * Ken Snyder (ken d snyder at gmail dot com)
 * 2008-09-10
 * version 2.0.2 (http://kendsnyder.com/sandbox/date/)     
 * Creative Commons Attribution License 3.0 (http://creativecommons.org/licenses/by/3.0/)
 *
 * jqplotToImage function based on Larry Siden's export-jqplot-to-png.js.
 * Larry has generously given permission to adapt his code for inclusion
 * into jqPlot.
 *
 * Larry's original code can be found here:
 *
 * https://github.com/lsiden/export-jqplot-to-png
 * 
 * 
 */

(function($) {    
    // This code is a modified version of the canvastext.js code, copyright below:
    //
    // This code is released to the public domain by Jim Studt, 2007.
    // He may keep some sort of up to date copy at http://www.federated.com/~jim/canvastext/
    //
    $.jqplot.CanvasTextRenderer = function(options){
        this.fontStyle = 'normal';  // normal, italic, oblique [not implemented]
        this.fontVariant = 'normal';    // normal, small caps [not implemented]
        this.fontWeight = 'normal'; // normal, bold, bolder, lighter, 100 - 900
        this.fontSize = '10px'; 
        this.fontFamily = 'sans-serif';
        this.fontStretch = 1.0;
        this.fillStyle = '#666666';
        this.angle = 0;
        this.textAlign = 'start';
        this.textBaseline = 'alphabetic';
        this.text;
        this.width;
        this.height;
        this.pt2px = 1.28;

        $.extend(true, this, options);
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize);
        this.setHeight();
    };
    
    $.jqplot.CanvasTextRenderer.prototype.init = function(options) {
        $.extend(true, this, options);
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize);
        this.setHeight();
    };
    
    // convert css spec into point size
    // returns float
    $.jqplot.CanvasTextRenderer.prototype.normalizeFontSize = function(sz) {
        sz = String(sz);
        var n = parseFloat(sz);
        if (sz.indexOf('px') > -1) {
            return n/this.pt2px;
        }
        else if (sz.indexOf('pt') > -1) {
            return n;
        }
        else if (sz.indexOf('em') > -1) {
            return n*12;
        }
        else if (sz.indexOf('%') > -1) {
            return n*12/100;
        }
        // default to pixels;
        else {
            return n/this.pt2px;
        }
    };
    
    
    $.jqplot.CanvasTextRenderer.prototype.fontWeight2Float = function(w) {
        // w = normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
        // return values adjusted for Hershey font.
        if (Number(w)) {
            return w/400;
        }
        else {
            switch (w) {
                case 'normal':
                    return 1;
                    break;
                case 'bold':
                    return 1.75;
                    break;
                case 'bolder':
                    return 2.25;
                    break;
                case 'lighter':
                    return 0.75;
                    break;
                default:
                    return 1;
                    break;
             }   
        }
    };
    
    $.jqplot.CanvasTextRenderer.prototype.getText = function() {
        return this.text;
    };
    
    $.jqplot.CanvasTextRenderer.prototype.setText = function(t, ctx) {
        this.text = t;
        this.setWidth(ctx);
        return this;
    };
    
    $.jqplot.CanvasTextRenderer.prototype.getWidth = function(ctx) {
        return this.width;
    };
    
    $.jqplot.CanvasTextRenderer.prototype.setWidth = function(ctx, w) {
        if (!w) {
            this.width = this.measure(ctx, this.text);
        }
        else {
            this.width = w;   
        }
        return this;
    };
    
    // return height in pixels.
    $.jqplot.CanvasTextRenderer.prototype.getHeight = function(ctx) {
        return this.height;
    };
    
    // w - height in pt
    // set heigh in px
    $.jqplot.CanvasTextRenderer.prototype.setHeight = function(w) {
        if (!w) {
            //height = this.fontSize /0.75;
            this.height = this.normalizedFontSize * this.pt2px;
        }
        else {
            this.height = w;   
        }
        return this;
    };

    $.jqplot.CanvasTextRenderer.prototype.letter = function (ch)
    {
        return this.letters[ch];
    };

    $.jqplot.CanvasTextRenderer.prototype.ascent = function()
    {
        return this.normalizedFontSize;
    };

    $.jqplot.CanvasTextRenderer.prototype.descent = function()
    {
        return 7.0*this.normalizedFontSize/25.0;
    };

    $.jqplot.CanvasTextRenderer.prototype.measure = function(ctx, str)
    {
        var total = 0;
        var len = str.length;
 
        for (var i = 0; i < len; i++) {
            var c = this.letter(str.charAt(i));
            if (c) {
                total += c.width * this.normalizedFontSize / 25.0 * this.fontStretch;
            }
        }
        return total;
    };

    $.jqplot.CanvasTextRenderer.prototype.draw = function(ctx,str)
    {
        var x = 0;
        // leave room at bottom for descenders.
        var y = this.height*0.72;
         var total = 0;
         var len = str.length;
         var mag = this.normalizedFontSize / 25.0;

         ctx.save();
         var tx, ty;
         
         // 1st quadrant
         if ((-Math.PI/2 <= this.angle && this.angle <= 0) || (Math.PI*3/2 <= this.angle && this.angle <= Math.PI*2)) {
             tx = 0;
             ty = -Math.sin(this.angle) * this.width;
         }
         // 4th quadrant
         else if ((0 < this.angle && this.angle <= Math.PI/2) || (-Math.PI*2 <= this.angle && this.angle <= -Math.PI*3/2)) {
             tx = Math.sin(this.angle) * this.height;
             ty = 0;
         }
         // 2nd quadrant
         else if ((-Math.PI < this.angle && this.angle < -Math.PI/2) || (Math.PI <= this.angle && this.angle <= Math.PI*3/2)) {
             tx = -Math.cos(this.angle) * this.width;
             ty = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height;
         }
         // 3rd quadrant
         else if ((-Math.PI*3/2 < this.angle && this.angle < Math.PI) || (Math.PI/2 < this.angle && this.angle < Math.PI)) {
             tx = Math.sin(this.angle) * this.height - Math.cos(this.angle)*this.width;
             ty = -Math.cos(this.angle) * this.height;
         }
         
         ctx.strokeStyle = this.fillStyle;
         ctx.fillStyle = this.fillStyle;
         ctx.translate(tx, ty);
         ctx.rotate(this.angle);
         ctx.lineCap = "round";
         // multiplier was 2.0
         var fact = (this.normalizedFontSize > 30) ? 2.0 : 2 + (30 - this.normalizedFontSize)/20;
         ctx.lineWidth = fact * mag * this.fontWeight2Float(this.fontWeight);
         
         for ( var i = 0; i < len; i++) {
            var c = this.letter( str.charAt(i));
            if ( !c) {
                continue;
            }

            ctx.beginPath();

            var penUp = 1;
            var needStroke = 0;
            for ( var j = 0; j < c.points.length; j++) {
              var a = c.points[j];
              if ( a[0] == -1 && a[1] == -1) {
                  penUp = 1;
                  continue;
              }
              if ( penUp) {
                  ctx.moveTo( x + a[0]*mag*this.fontStretch, y - a[1]*mag);
                  penUp = false;
              } else {
                  ctx.lineTo( x + a[0]*mag*this.fontStretch, y - a[1]*mag);
              }
            }
            ctx.stroke();
            x += c.width*mag*this.fontStretch;
         }
         ctx.restore();
         return total;
    };

    $.jqplot.CanvasTextRenderer.prototype.letters = {
         ' ': { width: 16, points: [] },
         '!': { width: 10, points: [[5,21],[5,7],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
         '"': { width: 16, points: [[4,21],[4,14],[-1,-1],[12,21],[12,14]] },
         '#': { width: 21, points: [[11,25],[4,-7],[-1,-1],[17,25],[10,-7],[-1,-1],[4,12],[18,12],[-1,-1],[3,6],[17,6]] },
         '$': { width: 20, points: [[8,25],[8,-4],[-1,-1],[12,25],[12,-4],[-1,-1],[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
         '%': { width: 24, points: [[21,21],[3,0],[-1,-1],[8,21],[10,19],[10,17],[9,15],[7,14],[5,14],[3,16],[3,18],[4,20],[6,21],[8,21],[10,20],[13,19],[16,19],[19,20],[21,21],[-1,-1],[17,7],[15,6],[14,4],[14,2],[16,0],[18,0],[20,1],[21,3],[21,5],[19,7],[17,7]] },
         '&': { width: 26, points: [[23,12],[23,13],[22,14],[21,14],[20,13],[19,11],[17,6],[15,3],[13,1],[11,0],[7,0],[5,1],[4,2],[3,4],[3,6],[4,8],[5,9],[12,13],[13,14],[14,16],[14,18],[13,20],[11,21],[9,20],[8,18],[8,16],[9,13],[11,10],[16,3],[18,1],[20,0],[22,0],[23,1],[23,2]] },
         '\'': { width: 10, points: [[5,19],[4,20],[5,21],[6,20],[6,18],[5,16],[4,15]] },
         '(': { width: 14, points: [[11,25],[9,23],[7,20],[5,16],[4,11],[4,7],[5,2],[7,-2],[9,-5],[11,-7]] },
         ')': { width: 14, points: [[3,25],[5,23],[7,20],[9,16],[10,11],[10,7],[9,2],[7,-2],[5,-5],[3,-7]] },
         '*': { width: 16, points: [[8,21],[8,9],[-1,-1],[3,18],[13,12],[-1,-1],[13,18],[3,12]] },
         '+': { width: 26, points: [[13,18],[13,0],[-1,-1],[4,9],[22,9]] },
         ',': { width: 10, points: [[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
         '-': { width: 18, points: [[6,9],[12,9]] },
         '.': { width: 10, points: [[5,2],[4,1],[5,0],[6,1],[5,2]] },
         '/': { width: 22, points: [[20,25],[2,-7]] },
         '0': { width: 20, points: [[9,21],[6,20],[4,17],[3,12],[3,9],[4,4],[6,1],[9,0],[11,0],[14,1],[16,4],[17,9],[17,12],[16,17],[14,20],[11,21],[9,21]] },
         '1': { width: 20, points: [[6,17],[8,18],[11,21],[11,0]] },
         '2': { width: 20, points: [[4,16],[4,17],[5,19],[6,20],[8,21],[12,21],[14,20],[15,19],[16,17],[16,15],[15,13],[13,10],[3,0],[17,0]] },
         '3': { width: 20, points: [[5,21],[16,21],[10,13],[13,13],[15,12],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
         '4': { width: 20, points: [[13,21],[3,7],[18,7],[-1,-1],[13,21],[13,0]] },
         '5': { width: 20, points: [[15,21],[5,21],[4,12],[5,13],[8,14],[11,14],[14,13],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
         '6': { width: 20, points: [[16,18],[15,20],[12,21],[10,21],[7,20],[5,17],[4,12],[4,7],[5,3],[7,1],[10,0],[11,0],[14,1],[16,3],[17,6],[17,7],[16,10],[14,12],[11,13],[10,13],[7,12],[5,10],[4,7]] },
         '7': { width: 20, points: [[17,21],[7,0],[-1,-1],[3,21],[17,21]] },
         '8': { width: 20, points: [[8,21],[5,20],[4,18],[4,16],[5,14],[7,13],[11,12],[14,11],[16,9],[17,7],[17,4],[16,2],[15,1],[12,0],[8,0],[5,1],[4,2],[3,4],[3,7],[4,9],[6,11],[9,12],[13,13],[15,14],[16,16],[16,18],[15,20],[12,21],[8,21]] },
         '9': { width: 20, points: [[16,14],[15,11],[13,9],[10,8],[9,8],[6,9],[4,11],[3,14],[3,15],[4,18],[6,20],[9,21],[10,21],[13,20],[15,18],[16,14],[16,9],[15,4],[13,1],[10,0],[8,0],[5,1],[4,3]] },
         ':': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
         ';': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
         '<': { width: 24, points: [[20,18],[4,9],[20,0]] },
         '=': { width: 26, points: [[4,12],[22,12],[-1,-1],[4,6],[22,6]] },
         '>': { width: 24, points: [[4,18],[20,9],[4,0]] },
         '?': { width: 18, points: [[3,16],[3,17],[4,19],[5,20],[7,21],[11,21],[13,20],[14,19],[15,17],[15,15],[14,13],[13,12],[9,10],[9,7],[-1,-1],[9,2],[8,1],[9,0],[10,1],[9,2]] },
         '@': { width: 27, points: [[18,13],[17,15],[15,16],[12,16],[10,15],[9,14],[8,11],[8,8],[9,6],[11,5],[14,5],[16,6],[17,8],[-1,-1],[12,16],[10,14],[9,11],[9,8],[10,6],[11,5],[-1,-1],[18,16],[17,8],[17,6],[19,5],[21,5],[23,7],[24,10],[24,12],[23,15],[22,17],[20,19],[18,20],[15,21],[12,21],[9,20],[7,19],[5,17],[4,15],[3,12],[3,9],[4,6],[5,4],[7,2],[9,1],[12,0],[15,0],[18,1],[20,2],[21,3],[-1,-1],[19,16],[18,8],[18,6],[19,5]] },
         'A': { width: 18, points: [[9,21],[1,0],[-1,-1],[9,21],[17,0],[-1,-1],[4,7],[14,7]] },
         'B': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[-1,-1],[4,11],[13,11],[16,10],[17,9],[18,7],[18,4],[17,2],[16,1],[13,0],[4,0]] },
         'C': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5]] },
         'D': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[11,21],[14,20],[16,18],[17,16],[18,13],[18,8],[17,5],[16,3],[14,1],[11,0],[4,0]] },
         'E': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11],[-1,-1],[4,0],[17,0]] },
         'F': { width: 18, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11]] },
         'G': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[18,8],[-1,-1],[13,8],[18,8]] },
         'H': { width: 22, points: [[4,21],[4,0],[-1,-1],[18,21],[18,0],[-1,-1],[4,11],[18,11]] },
         'I': { width: 8, points: [[4,21],[4,0]] },
         'J': { width: 16, points: [[12,21],[12,5],[11,2],[10,1],[8,0],[6,0],[4,1],[3,2],[2,5],[2,7]] },
         'K': { width: 21, points: [[4,21],[4,0],[-1,-1],[18,21],[4,7],[-1,-1],[9,12],[18,0]] },
         'L': { width: 17, points: [[4,21],[4,0],[-1,-1],[4,0],[16,0]] },
         'M': { width: 24, points: [[4,21],[4,0],[-1,-1],[4,21],[12,0],[-1,-1],[20,21],[12,0],[-1,-1],[20,21],[20,0]] },
         'N': { width: 22, points: [[4,21],[4,0],[-1,-1],[4,21],[18,0],[-1,-1],[18,21],[18,0]] },
         'O': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21]] },
         'P': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,14],[17,12],[16,11],[13,10],[4,10]] },
         'Q': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21],[-1,-1],[12,4],[18,-2]] },
         'R': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[4,11],[-1,-1],[11,11],[18,0]] },
         'S': { width: 20, points: [[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
         'T': { width: 16, points: [[8,21],[8,0],[-1,-1],[1,21],[15,21]] },
         'U': { width: 22, points: [[4,21],[4,6],[5,3],[7,1],[10,0],[12,0],[15,1],[17,3],[18,6],[18,21]] },
         'V': { width: 18, points: [[1,21],[9,0],[-1,-1],[17,21],[9,0]] },
         'W': { width: 24, points: [[2,21],[7,0],[-1,-1],[12,21],[7,0],[-1,-1],[12,21],[17,0],[-1,-1],[22,21],[17,0]] },
         'X': { width: 20, points: [[3,21],[17,0],[-1,-1],[17,21],[3,0]] },
         'Y': { width: 18, points: [[1,21],[9,11],[9,0],[-1,-1],[17,21],[9,11]] },
         'Z': { width: 20, points: [[17,21],[3,0],[-1,-1],[3,21],[17,21],[-1,-1],[3,0],[17,0]] },
         '[': { width: 14, points: [[4,25],[4,-7],[-1,-1],[5,25],[5,-7],[-1,-1],[4,25],[11,25],[-1,-1],[4,-7],[11,-7]] },
         '\\': { width: 14, points: [[0,21],[14,-3]] },
         ']': { width: 14, points: [[9,25],[9,-7],[-1,-1],[10,25],[10,-7],[-1,-1],[3,25],[10,25],[-1,-1],[3,-7],[10,-7]] },
         '^': { width: 16, points: [[6,15],[8,18],[10,15],[-1,-1],[3,12],[8,17],[13,12],[-1,-1],[8,17],[8,0]] },
         '_': { width: 16, points: [[0,-2],[16,-2]] },
         '`': { width: 10, points: [[6,21],[5,20],[4,18],[4,16],[5,15],[6,16],[5,17]] },
         'a': { width: 19, points: [[15,14],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'b': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
         'c': { width: 18, points: [[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'd': { width: 19, points: [[15,21],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'e': { width: 18, points: [[3,8],[15,8],[15,10],[14,12],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'f': { width: 12, points: [[10,21],[8,21],[6,20],[5,17],[5,0],[-1,-1],[2,14],[9,14]] },
         'g': { width: 19, points: [[15,14],[15,-2],[14,-5],[13,-6],[11,-7],[8,-7],[6,-6],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'h': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
         'i': { width: 8, points: [[3,21],[4,20],[5,21],[4,22],[3,21],[-1,-1],[4,14],[4,0]] },
         'j': { width: 10, points: [[5,21],[6,20],[7,21],[6,22],[5,21],[-1,-1],[6,14],[6,-3],[5,-6],[3,-7],[1,-7]] },
         'k': { width: 17, points: [[4,21],[4,0],[-1,-1],[14,14],[4,4],[-1,-1],[8,8],[15,0]] },
         'l': { width: 8, points: [[4,21],[4,0]] },
         'm': { width: 30, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0],[-1,-1],[15,10],[18,13],[20,14],[23,14],[25,13],[26,10],[26,0]] },
         'n': { width: 19, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
         'o': { width: 19, points: [[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3],[16,6],[16,8],[15,11],[13,13],[11,14],[8,14]] },
         'p': { width: 19, points: [[4,14],[4,-7],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
         'q': { width: 19, points: [[15,14],[15,-7],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
         'r': { width: 13, points: [[4,14],[4,0],[-1,-1],[4,8],[5,11],[7,13],[9,14],[12,14]] },
         's': { width: 17, points: [[14,11],[13,13],[10,14],[7,14],[4,13],[3,11],[4,9],[6,8],[11,7],[13,6],[14,4],[14,3],[13,1],[10,0],[7,0],[4,1],[3,3]] },
         't': { width: 12, points: [[5,21],[5,4],[6,1],[8,0],[10,0],[-1,-1],[2,14],[9,14]] },
         'u': { width: 19, points: [[4,14],[4,4],[5,1],[7,0],[10,0],[12,1],[15,4],[-1,-1],[15,14],[15,0]] },
         'v': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0]] },
         'w': { width: 22, points: [[3,14],[7,0],[-1,-1],[11,14],[7,0],[-1,-1],[11,14],[15,0],[-1,-1],[19,14],[15,0]] },
         'x': { width: 17, points: [[3,14],[14,0],[-1,-1],[14,14],[3,0]] },
         'y': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0],[6,-4],[4,-6],[2,-7],[1,-7]] },
         'z': { width: 17, points: [[14,14],[3,0],[-1,-1],[3,14],[14,14],[-1,-1],[3,0],[14,0]] },
         '{': { width: 14, points: [[9,25],[7,24],[6,23],[5,21],[5,19],[6,17],[7,16],[8,14],[8,12],[6,10],[-1,-1],[7,24],[6,22],[6,20],[7,18],[8,17],[9,15],[9,13],[8,11],[4,9],[8,7],[9,5],[9,3],[8,1],[7,0],[6,-2],[6,-4],[7,-6],[-1,-1],[6,8],[8,6],[8,4],[7,2],[6,1],[5,-1],[5,-3],[6,-5],[7,-6],[9,-7]] },
         '|': { width: 8, points: [[4,25],[4,-7]] },
         '}': { width: 14, points: [[5,25],[7,24],[8,23],[9,21],[9,19],[8,17],[7,16],[6,14],[6,12],[8,10],[-1,-1],[7,24],[8,22],[8,20],[7,18],[6,17],[5,15],[5,13],[6,11],[10,9],[6,7],[5,5],[5,3],[6,1],[7,0],[8,-2],[8,-4],[7,-6],[-1,-1],[8,8],[6,6],[6,4],[7,2],[8,1],[9,-1],[9,-3],[8,-5],[7,-6],[5,-7]] },
         '~': { width: 24, points: [[3,6],[3,8],[4,11],[6,12],[8,12],[10,11],[14,8],[16,7],[18,7],[20,8],[21,10],[-1,-1],[3,8],[4,10],[6,11],[8,11],[10,10],[14,7],[16,6],[18,6],[20,7],[21,10],[21,12]] }
     };
     
    $.jqplot.CanvasFontRenderer = function(options) {
        options = options || {};
        if (!options.pt2px) {
            options.pt2px = 1.5;
        }
        $.jqplot.CanvasTextRenderer.call(this, options);
    };
    
    $.jqplot.CanvasFontRenderer.prototype = new $.jqplot.CanvasTextRenderer({});
    $.jqplot.CanvasFontRenderer.prototype.constructor = $.jqplot.CanvasFontRenderer;

    $.jqplot.CanvasFontRenderer.prototype.measure = function(ctx, str)
    {
        // var fstyle = this.fontStyle+' '+this.fontVariant+' '+this.fontWeight+' '+this.fontSize+' '+this.fontFamily;
        var fstyle = this.fontSize+' '+this.fontFamily;
        ctx.save();
        ctx.font = fstyle;
        var w = ctx.measureText(str).width;
        ctx.restore();
        return w;
    };

    $.jqplot.CanvasFontRenderer.prototype.draw = function(ctx, str)
    {
        var x = 0;
        // leave room at bottom for descenders.
        var y = this.height*0.72;
        //var y = 12;

         ctx.save();
         var tx, ty;
         
         // 1st quadrant
         if ((-Math.PI/2 <= this.angle && this.angle <= 0) || (Math.PI*3/2 <= this.angle && this.angle <= Math.PI*2)) {
             tx = 0;
             ty = -Math.sin(this.angle) * this.width;
         }
         // 4th quadrant
         else if ((0 < this.angle && this.angle <= Math.PI/2) || (-Math.PI*2 <= this.angle && this.angle <= -Math.PI*3/2)) {
             tx = Math.sin(this.angle) * this.height;
             ty = 0;
         }
         // 2nd quadrant
         else if ((-Math.PI < this.angle && this.angle < -Math.PI/2) || (Math.PI <= this.angle && this.angle <= Math.PI*3/2)) {
             tx = -Math.cos(this.angle) * this.width;
             ty = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height;
         }
         // 3rd quadrant
         else if ((-Math.PI*3/2 < this.angle && this.angle < Math.PI) || (Math.PI/2 < this.angle && this.angle < Math.PI)) {
             tx = Math.sin(this.angle) * this.height - Math.cos(this.angle)*this.width;
             ty = -Math.cos(this.angle) * this.height;
         }
         ctx.strokeStyle = this.fillStyle;
         ctx.fillStyle = this.fillStyle;
        // var fstyle = this.fontStyle+' '+this.fontVariant+' '+this.fontWeight+' '+this.fontSize+' '+this.fontFamily;
        var fstyle = this.fontSize+' '+this.fontFamily;
         ctx.font = fstyle;
         ctx.translate(tx, ty);
         ctx.rotate(this.angle);
         ctx.fillText(str, x, y);
         // ctx.strokeText(str, x, y);

         ctx.restore();
    };
    
})(jQuery);