/*!
 * Bootstrap Colorpicker
 * http://mjolnic.github.io/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * @todo Update DOCS
 */

(function(factory) {
    "use strict";
    if (typeof exports === 'object') {
      module.exports = factory(window.jQuery);
    } else if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else if (window.jQuery && !window.jQuery.fn.colorpicker) {
      factory(window.jQuery);
    }
  }
  (function($) {
    'use strict';

    // Color object
    var Color = function(val, customColors) {
      this.value = {
        h: 0,
        s: 0,
        b: 0,
        a: 1
      };
      this.origFormat = null; // original string format
      if (customColors) {
        $.extend(this.colors, customColors);
      }
      if (val) {
        if (val.toLowerCase !== undefined) {
          // cast to string
          val = val + '';
          this.setColor(val);
        } else if (val.h !== undefined) {
          this.value = val;
        }
      }
    };

    Color.prototype = {
      constructor: Color,
      // 140 predefined colors from the HTML Colors spec
      colors: {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370d8",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#d87093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32",
        "transparent": "transparent"
      },
      _sanitizeNumber: function(val) {
        if (typeof val === 'number') {
          return val;
        }
        if (isNaN(val) || (val === null) || (val === '') || (val === undefined)) {
          return 1;
        }
        if (val.toLowerCase !== undefined) {
          return parseFloat(val);
        }
        return 1;
      },
      isTransparent: function(strVal) {
        if (!strVal) {
          return false;
        }
        strVal = strVal.toLowerCase().trim();
        return (strVal === 'transparent') || (strVal.match(/#?00000000/)) || (strVal.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/));
      },
      rgbaIsTransparent: function(rgba) {
        return ((rgba.r === 0) && (rgba.g === 0) && (rgba.b === 0) && (rgba.a === 0));
      },
      //parse a string to HSB
      setColor: function(strVal) {
        strVal = strVal.toLowerCase().trim();
        if (strVal) {
          if (this.isTransparent(strVal)) {
            this.value = {
              h: 0,
              s: 0,
              b: 0,
              a: 0
            };
          } else {
            this.value = this.stringToHSB(strVal) || {
              h: 0,
              s: 0,
              b: 0,
              a: 1
            }; // if parser fails, defaults to black
          }
        }
      },
      stringToHSB: function(strVal) {
        strVal = strVal.toLowerCase();
        var alias;
        if (typeof this.colors[strVal] !== 'undefined') {
          strVal = this.colors[strVal];
          alias = 'alias';
        }
        var that = this,
          result = false;
        $.each(this.stringParsers, function(i, parser) {
          var match = parser.re.exec(strVal),
            values = match && parser.parse.apply(that, [match]),
            format = alias || parser.format || 'rgba';
          if (values) {
            if (format.match(/hsla?/)) {
              result = that.RGBtoHSB.apply(that, that.HSLtoRGB.apply(that, values));
            } else {
              result = that.RGBtoHSB.apply(that, values);
            }
            that.origFormat = format;
            return false;
          }
          return true;
        });
        return result;
      },
      setHue: function(h) {
        this.value.h = 1 - h;
      },
      setSaturation: function(s) {
        this.value.s = s;
      },
      setBrightness: function(b) {
        this.value.b = 1 - b;
      },
      setAlpha: function(a) {
        this.value.a = parseInt((1 - a) * 100, 10) / 100;
      },
      toRGB: function(h, s, b, a) {
        if (!h) {
          h = this.value.h;
          s = this.value.s;
          b = this.value.b;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = b * s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = b - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return {
          r: Math.round(R * 255),
          g: Math.round(G * 255),
          b: Math.round(B * 255),
          a: a || this.value.a
        };
      },
      toHex: function(h, s, b, a) {
        var rgb = this.toRGB(h, s, b, a);
        if (this.rgbaIsTransparent(rgb)) {
          return 'transparent';
        }
        return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
      },
      toHSL: function(h, s, b, a) {
        h = h || this.value.h;
        s = s || this.value.s;
        b = b || this.value.b;
        a = a || this.value.a;

        var H = h,
          L = (2 - s) * b,
          S = s * b;
        if (L > 0 && L <= 1) {
          S /= L;
        } else {
          S /= 2 - L;
        }
        L /= 2;
        if (S > 1) {
          S = 1;
        }
        return {
          h: isNaN(H) ? 0 : H,
          s: isNaN(S) ? 0 : S,
          l: isNaN(L) ? 0 : L,
          a: isNaN(a) ? 0 : a
        };
      },
      toAlias: function(r, g, b, a) {
        var rgb = this.toHex(r, g, b, a);
        for (var alias in this.colors) {
          if (this.colors[alias] === rgb) {
            return alias;
          }
        }
        return false;
      },
      RGBtoHSB: function(r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;

        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C === 0 ? null :
          V === r ? (g - b) / C :
          V === g ? (b - r) / C + 2 :
          (r - g) / C + 4
        );
        H = ((H + 360) % 6) * 60 / 360;
        S = C === 0 ? 0 : C / V;
        return {
          h: this._sanitizeNumber(H),
          s: S,
          b: V,
          a: this._sanitizeNumber(a)
        };
      },
      HueToRGB: function(p, q, h) {
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
        if ((h * 6) < 1) {
          return p + (q - p) * h * 6;
        } else if ((h * 2) < 1) {
          return q;
        } else if ((h * 3) < 2) {
          return p + (q - p) * ((2 / 3) - h) * 6;
        } else {
          return p;
        }
      },
      HSLtoRGB: function(h, s, l, a) {
        if (s < 0) {
          s = 0;
        }
        var q;
        if (l <= 0.5) {
          q = l * (1 + s);
        } else {
          q = l + s - (l * s);
        }

        var p = 2 * l - q;

        var tr = h + (1 / 3);
        var tg = h;
        var tb = h - (1 / 3);

        var r = Math.round(this.HueToRGB(p, q, tr) * 255);
        var g = Math.round(this.HueToRGB(p, q, tg) * 255);
        var b = Math.round(this.HueToRGB(p, q, tb) * 255);
        return [r, g, b, this._sanitizeNumber(a)];
      },
      toString: function(format) {
        format = format || 'rgba';
        var c = false;
        switch (format) {
          case 'rgb':
            {
              c = this.toRGB();
              if (this.rgbaIsTransparent(c)) {
                return 'transparent';
              }
              return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
            }
            break;
          case 'rgba':
            {
              c = this.toRGB();
              return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
            }
            break;
          case 'hsl':
            {
              c = this.toHSL();
              return 'hsl(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%)';
            }
            break;
          case 'hsla':
            {
              c = this.toHSL();
              return 'hsla(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%,' + c.a + ')';
            }
            break;
          case 'hex':
            {
              return this.toHex();
            }
            break;
          case 'alias':
            return this.toAlias() || this.toHex();
          default:
            {
              return c;
            }
            break;
        }
      },
      // a set of RE's that can match strings and generate color tuples.
      // from John Resig color plugin
      // https://github.com/jquery/jquery-color/
      stringParsers: [{
        re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
        format: 'rgb',
        parse: function(execResult) {
          return [
            execResult[1],
            execResult[2],
            execResult[3],
            1
          ];
        }
      }, {
        re: /rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
        format: 'rgb',
        parse: function(execResult) {
          return [
            2.55 * execResult[1],
            2.55 * execResult[2],
            2.55 * execResult[3],
            1
          ];
        }
      }, {
        re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        format: 'rgba',
        parse: function(execResult) {
          return [
            execResult[1],
            execResult[2],
            execResult[3],
            execResult[4]
          ];
        }
      }, {
        re: /rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        format: 'rgba',
        parse: function(execResult) {
          return [
            2.55 * execResult[1],
            2.55 * execResult[2],
            2.55 * execResult[3],
            execResult[4]
          ];
        }
      }, {
        re: /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
        format: 'hsl',
        parse: function(execResult) {
          return [
            execResult[1] / 360,
            execResult[2] / 100,
            execResult[3] / 100,
            execResult[4]
          ];
        }
      }, {
        re: /hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        format: 'hsla',
        parse: function(execResult) {
          return [
            execResult[1] / 360,
            execResult[2] / 100,
            execResult[3] / 100,
            execResult[4]
          ];
        }
      }, {
        re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        format: 'hex',
        parse: function(execResult) {
          return [
            parseInt(execResult[1], 16),
            parseInt(execResult[2], 16),
            parseInt(execResult[3], 16),
            1
          ];
        }
      }, {
        re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
        format: 'hex',
        parse: function(execResult) {
          return [
            parseInt(execResult[1] + execResult[1], 16),
            parseInt(execResult[2] + execResult[2], 16),
            parseInt(execResult[3] + execResult[3], 16),
            1
          ];
        }
      }],
      colorNameToHex: function(name) {
        if (typeof this.colors[name.toLowerCase()] !== 'undefined') {
          return this.colors[name.toLowerCase()];
        }
        return false;
      }
    };


    var defaults = {
      horizontal: false, // horizontal mode layout ?
      inline: false, //forces to show the colorpicker as an inline element
      color: false, //forces a color
      format: false, //forces a format
      input: 'input', // children input selector
      container: false, // container selector
      component: '.add-on, .input-group-addon', // children component selector
      sliders: {
        saturation: {
          maxLeft: 100,
          maxTop: 100,
          callLeft: 'setSaturation',
          callTop: 'setBrightness'
        },
        hue: {
          maxLeft: 0,
          maxTop: 100,
          callLeft: false,
          callTop: 'setHue'
        },
        alpha: {
          maxLeft: 0,
          maxTop: 100,
          callLeft: false,
          callTop: 'setAlpha'
        }
      },
      slidersHorz: {
        saturation: {
          maxLeft: 100,
          maxTop: 100,
          callLeft: 'setSaturation',
          callTop: 'setBrightness'
        },
        hue: {
          maxLeft: 100,
          maxTop: 0,
          callLeft: 'setHue',
          callTop: false
        },
        alpha: {
          maxLeft: 100,
          maxTop: 0,
          callLeft: 'setAlpha',
          callTop: false
        }
      },
      template: '<div class="colorpicker dropdown-menu">' +
        '<div class="colorpicker-saturation"><i><b></b></i></div>' +
        '<div class="colorpicker-hue"><i></i></div>' +
        '<div class="colorpicker-alpha"><i></i></div>' +
        '<div class="colorpicker-color"><div /></div>' +
        '<div class="colorpicker-selectors"></div>' +
        '</div>',
      align: 'right',
      customClass: null,
      colorSelectors: null
    };

    var Colorpicker = function(element, options) {
      this.element = $(element).addClass('colorpicker-element');
      this.options = $.extend(true, {}, defaults, this.element.data(), options);
      this.component = this.options.component;
      this.component = (this.component !== false) ? this.element.find(this.component) : false;
      if (this.component && (this.component.length === 0)) {
        this.component = false;
      }
      this.container = (this.options.container === true) ? this.element : this.options.container;
      this.container = (this.container !== false) ? $(this.container) : false;

      // Is the element an input? Should we search inside for any input?
      this.input = this.element.is('input') ? this.element : (this.options.input ?
        this.element.find(this.options.input) : false);
      if (this.input && (this.input.length === 0)) {
        this.input = false;
      }
      // Set HSB color
      this.color = new Color(this.options.color !== false ? this.options.color : this.getValue(), this.options.colorSelectors);
      this.format = this.options.format !== false ? this.options.format : this.color.origFormat;

      // Setup picker
      this.picker = $(this.options.template);
      if (this.options.customClass) {
        this.picker.addClass(this.options.customClass);
      }
      if (this.options.inline) {
        this.picker.addClass('colorpicker-inline colorpicker-visible');
      } else {
        this.picker.addClass('colorpicker-hidden');
      }
      if (this.options.horizontal) {
        this.picker.addClass('colorpicker-horizontal');
      }
      if (this.format === 'rgba' || this.format === 'hsla' || this.options.format === false) {
        this.picker.addClass('colorpicker-with-alpha');
      }
      if (this.options.align === 'right') {
        this.picker.addClass('colorpicker-right');
      }
      if (this.options.colorSelectors) {
        var colorpicker = this;
        $.each(this.options.colorSelectors, function(name, color) {
          var $btn = $('<i />').css('background-color', color).data('class', name);
          $btn.click(function() {
            colorpicker.setValue($(this).css('background-color'));
          });
          colorpicker.picker.find('.colorpicker-selectors').append($btn);
        });
        this.picker.find('.colorpicker-selectors').show();
      }
      this.picker.on('mousedown.colorpicker touchstart.colorpicker', $.proxy(this.mousedown, this));
      this.picker.appendTo(this.container ? this.container : $('body'));

      // Bind events
      if (this.input !== false) {
        this.input.on({
          'keyup.colorpicker': $.proxy(this.keyup, this)
        });
        this.input.on({
          'change.colorpicker': $.proxy(this.change, this)
        });
        if (this.component === false) {
          this.element.on({
            'focus.colorpicker': $.proxy(this.show, this)
          });
        }
        if (this.options.inline === false) {
          this.element.on({
            'focusout.colorpicker': $.proxy(this.hide, this)
          });
        }
      }

      if (this.component !== false) {
        this.component.on({
          'click.colorpicker': $.proxy(this.show, this)
        });
      }

      if ((this.input === false) && (this.component === false)) {
        this.element.on({
          'click.colorpicker': $.proxy(this.show, this)
        });
      }

      // for HTML5 input[type='color']
      if ((this.input !== false) && (this.component !== false) && (this.input.attr('type') === 'color')) {

        this.input.on({
          'click.colorpicker': $.proxy(this.show, this),
          'focus.colorpicker': $.proxy(this.show, this)
        });
      }
      this.update();

      $($.proxy(function() {
        this.element.trigger('create');
      }, this));
    };

    Colorpicker.Color = Color;

    Colorpicker.prototype = {
      constructor: Colorpicker,
      destroy: function() {
        this.picker.remove();
        this.element.removeData('colorpicker').off('.colorpicker');
        if (this.input !== false) {
          this.input.off('.colorpicker');
        }
        if (this.component !== false) {
          this.component.off('.colorpicker');
        }
        this.element.removeClass('colorpicker-element');
        this.element.trigger({
          type: 'destroy'
        });
      },
      reposition: function() {
        if (this.options.inline !== false || this.options.container) {
          return false;
        }
        var type = this.container && this.container[0] !== document.body ? 'position' : 'offset';
        var element = this.component || this.element;
        var offset = element[type]();
        if (this.options.align === 'right') {
          offset.left -= this.picker.outerWidth() - element.outerWidth();
        }
        this.picker.css({
          top: offset.top + element.outerHeight(),
          left: offset.left
        });
      },
      show: function(e) {
        if (this.isDisabled()) {
          return false;
        }
        this.picker.addClass('colorpicker-visible').removeClass('colorpicker-hidden');
        this.reposition();
        $(window).on('resize.colorpicker', $.proxy(this.reposition, this));
        if (e && (!this.hasInput() || this.input.attr('type') === 'color')) {
          if (e.stopPropagation && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
          }
        }
        if (this.options.inline === false) {
          $(window.document).on({
            'mousedown.colorpicker': $.proxy(this.hide, this)
          });
        }
        this.element.trigger({
          type: 'showPicker',
          color: this.color
        });
      },
      hide: function() {
        this.picker.addClass('colorpicker-hidden').removeClass('colorpicker-visible');
        $(window).off('resize.colorpicker', this.reposition);
        $(document).off({
          'mousedown.colorpicker': this.hide
        });
        this.update();
        this.element.trigger({
          type: 'hidePicker',
          color: this.color
        });
      },
      updateData: function(val) {
        val = val || this.color.toString(this.format);
        this.element.data('color', val);
        return val;
      },
      updateInput: function(val) {
        val = val || this.color.toString(this.format);
        if (this.input !== false) {
          if (this.options.colorSelectors) {
            var color = new Color(val, this.options.colorSelectors);
            var alias = color.toAlias();
            if (typeof this.options.colorSelectors[alias] !== 'undefined') {
              val = alias;
            }
          }
          this.input.prop('value', val);
        }
        return val;
      },
      updatePicker: function(val) {
        if (val !== undefined) {
          this.color = new Color(val, this.options.colorSelectors);
        }
        var sl = (this.options.horizontal === false) ? this.options.sliders : this.options.slidersHorz;
        var icns = this.picker.find('i');
        if (icns.length === 0) {
          return;
        }
        if (this.options.horizontal === false) {
          sl = this.options.sliders;
          icns.eq(1).css('top', sl.hue.maxTop * (1 - this.color.value.h)).end()
            .eq(2).css('top', sl.alpha.maxTop * (1 - this.color.value.a));
        } else {
          sl = this.options.slidersHorz;
          icns.eq(1).css('left', sl.hue.maxLeft * (1 - this.color.value.h)).end()
            .eq(2).css('left', sl.alpha.maxLeft * (1 - this.color.value.a));
        }
        icns.eq(0).css({
          'top': sl.saturation.maxTop - this.color.value.b * sl.saturation.maxTop,
          'left': this.color.value.s * sl.saturation.maxLeft
        });
        this.picker.find('.colorpicker-saturation').css('backgroundColor', this.color.toHex(this.color.value.h, 1, 1, 1));
        this.picker.find('.colorpicker-alpha').css('backgroundColor', this.color.toHex());
        this.picker.find('.colorpicker-color, .colorpicker-color div').css('backgroundColor', this.color.toString(this.format));
        return val;
      },
      updateComponent: function(val) {
        val = val || this.color.toString(this.format);
        if (this.component !== false) {
          var icn = this.component.find('i').eq(0);
          if (icn.length > 0) {
            icn.css({
              'backgroundColor': val
            });
          } else {
            this.component.css({
              'backgroundColor': val
            });
          }
        }
        return val;
      },
      update: function(force) {
        var val;
        if ((this.getValue(false) !== false) || (force === true)) {
          // Update input/data only if the current value is not empty
          val = this.updateComponent();
          this.updateInput(val);
          this.updateData(val);
          this.updatePicker(); // only update picker if value is not empty
        }
        return val;

      },
      setValue: function(val) { // set color manually
        this.color = new Color(val, this.options.colorSelectors);
        this.update(true);
        this.element.trigger({
          type: 'changeColor',
          color: this.color,
          value: val
        });
      },
      getValue: function(defaultValue) {
        defaultValue = (defaultValue === undefined) ? '#000000' : defaultValue;
        var val;
        if (this.hasInput()) {
          val = this.input.val();
        } else {
          val = this.element.data('color');
        }
        if ((val === undefined) || (val === '') || (val === null)) {
          // if not defined or empty, return default
          val = defaultValue;
        }
        return val;
      },
      hasInput: function() {
        return (this.input !== false);
      },
      isDisabled: function() {
        if (this.hasInput()) {
          return (this.input.prop('disabled') === true);
        }
        return false;
      },
      disable: function() {
        if (this.hasInput()) {
          this.input.prop('disabled', true);
          this.element.trigger({
            type: 'disable',
            color: this.color,
            value: this.getValue()
          });
          return true;
        }
        return false;
      },
      enable: function() {
        if (this.hasInput()) {
          this.input.prop('disabled', false);
          this.element.trigger({
            type: 'enable',
            color: this.color,
            value: this.getValue()
          });
          return true;
        }
        return false;
      },
      currentSlider: null,
      mousePointer: {
        left: 0,
        top: 0
      },
      mousedown: function(e) {
        if (!e.pageX && !e.pageY && e.originalEvent) {
          e.pageX = e.originalEvent.touches[0].pageX;
          e.pageY = e.originalEvent.touches[0].pageY;
        }
        e.stopPropagation();
        e.preventDefault();

        var target = $(e.target);

        //detect the slider and set the limits and callbacks
        var zone = target.closest('div');
        var sl = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
        if (!zone.is('.colorpicker')) {
          if (zone.is('.colorpicker-saturation')) {
            this.currentSlider = $.extend({}, sl.saturation);
          } else if (zone.is('.colorpicker-hue')) {
            this.currentSlider = $.extend({}, sl.hue);
          } else if (zone.is('.colorpicker-alpha')) {
            this.currentSlider = $.extend({}, sl.alpha);
          } else {
            return false;
          }
          var offset = zone.offset();
          //reference to guide's style
          this.currentSlider.guide = zone.find('i')[0].style;
          this.currentSlider.left = e.pageX - offset.left;
          this.currentSlider.top = e.pageY - offset.top;
          this.mousePointer = {
            left: e.pageX,
            top: e.pageY
          };
          //trigger mousemove to move the guide to the current position
          $(document).on({
            'mousemove.colorpicker': $.proxy(this.mousemove, this),
            'touchmove.colorpicker': $.proxy(this.mousemove, this),
            'mouseup.colorpicker': $.proxy(this.mouseup, this),
            'touchend.colorpicker': $.proxy(this.mouseup, this)
          }).trigger('mousemove');
        }
        return false;
      },
      mousemove: function(e) {
        if (!e.pageX && !e.pageY && e.originalEvent) {
          e.pageX = e.originalEvent.touches[0].pageX;
          e.pageY = e.originalEvent.touches[0].pageY;
        }
        e.stopPropagation();
        e.preventDefault();
        var left = Math.max(
          0,
          Math.min(
            this.currentSlider.maxLeft,
            this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)
          )
        );
        var top = Math.max(
          0,
          Math.min(
            this.currentSlider.maxTop,
            this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)
          )
        );
        this.currentSlider.guide.left = left + 'px';
        this.currentSlider.guide.top = top + 'px';
        if (this.currentSlider.callLeft) {
          this.color[this.currentSlider.callLeft].call(this.color, left / this.currentSlider.maxLeft);
        }
        if (this.currentSlider.callTop) {
          this.color[this.currentSlider.callTop].call(this.color, top / this.currentSlider.maxTop);
        }
        // Change format dynamically
        // Only occurs if user choose the dynamic format by
        // setting option format to false
        if (this.currentSlider.callTop === 'setAlpha' && this.options.format === false) {

          // Converting from hex / rgb to rgba
          if (this.color.value.a !== 1) {
            this.format = 'rgba';
            this.color.origFormat = 'rgba';
          }

          // Converting from rgba to hex
          else {
            this.format = 'hex';
            this.color.origFormat = 'hex';
          }
        }
        this.update(true);

        this.element.trigger({
          type: 'changeColor',
          color: this.color
        });
        return false;
      },
      mouseup: function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(document).off({
          'mousemove.colorpicker': this.mousemove,
          'touchmove.colorpicker': this.mousemove,
          'mouseup.colorpicker': this.mouseup,
          'touchend.colorpicker': this.mouseup
        });
        return false;
      },
      change: function(e) {
        this.keyup(e);
      },
      keyup: function(e) {
        if ((e.keyCode === 38)) {
          if (this.color.value.a < 1) {
            this.color.value.a = Math.round((this.color.value.a + 0.01) * 100) / 100;
          }
          this.update(true);
        } else if ((e.keyCode === 40)) {
          if (this.color.value.a > 0) {
            this.color.value.a = Math.round((this.color.value.a - 0.01) * 100) / 100;
          }
          this.update(true);
        } else {
          this.color = new Color(this.input.val(), this.options.colorSelectors);
          // Change format dynamically
          // Only occurs if user choose the dynamic format by
          // setting option format to false
          if (this.color.origFormat && this.options.format === false) {
            this.format = this.color.origFormat;
          }
          if (this.getValue(false) !== false) {
            this.updateData();
            this.updateComponent();
            this.updatePicker();
          }
        }
        this.element.trigger({
          type: 'changeColor',
          color: this.color,
          value: this.input.val()
        });
      }
    };

    $.colorpicker = Colorpicker;

    $.fn.colorpicker = function(option) {
      var pickerArgs = arguments,
        rv;

      var $returnValue = this.each(function() {
        var $this = $(this),
          inst = $this.data('colorpicker'),
          options = ((typeof option === 'object') ? option : {});
        if ((!inst) && (typeof option !== 'string')) {
          $this.data('colorpicker', new Colorpicker(this, options));
        } else {
          if (typeof option === 'string') {
            rv = inst[option].apply(inst, Array.prototype.slice.call(pickerArgs, 1));
          }
        }
      });
      if (option === 'getValue') {
        return rv;
      }
      return $returnValue;
    };

    $.fn.colorpicker.constructor = Colorpicker;

  }));
