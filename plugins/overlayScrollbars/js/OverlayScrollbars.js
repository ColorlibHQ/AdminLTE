/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.7.2
 *
 * Copyright KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 10.06.2019
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd)
        define(function() { return factory(global, global.document, undefined); });
    else if (typeof module === 'object' && typeof module.exports === 'object')
        module.exports = factory(global, global.document, undefined);
    else
        factory(global, global.document, undefined);
}(typeof window !== 'undefined' ? window : this,
    function(window, document, undefined) {
        'use strict';
        var PLUGINNAME = 'OverlayScrollbars';
        var TYPES = {
            o : 'object',
            f : 'function',
            a : 'array',
            s : 'string',
            b : 'boolean',
            n : 'number',
            u : 'undefined',
            z : 'null'
            //d : 'date',
            //e : 'error',
            //r : 'regexp',
            //y : 'symbol'
        };
        var LEXICON = {
            c : 'class',
            s : 'style',
            i : 'id',
            l : 'length',
            p : 'prototype',
            oH : 'offsetHeight',
            cH : 'clientHeight',
            sH : 'scrollHeight',
            oW : 'offsetWidth',
            cW : 'clientWidth',
            sW : 'scrollWidth'
        };
        var VENDORS = {
            //https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix
            _jsCache : { },
            _cssCache : { },
            _cssPrefixes : ['-webkit-', '-moz-', '-o-', '-ms-'],
            _jsPrefixes : ['WebKit', 'Moz', 'O', 'MS'],
            _cssProperty : function(name) {
                var cache = this._cssCache;

                if(cache[name])
                    return cache[name];

                var prefixes = this._cssPrefixes;
                var uppercasedName = this._firstLetterToUpper(name);
                var elmStyle = document.createElement('div')[LEXICON.s];
                var resultPossibilities;
                var i = 0;
                var v = 0;
                var currVendorWithoutDashes;

                for (; i < prefixes.length; i++) {
                    currVendorWithoutDashes = prefixes[i].replace(/-/g, '');
                    resultPossibilities = [
                        name, //transition
                        prefixes[i] + name, //-webkit-transition
                        currVendorWithoutDashes + uppercasedName, //webkitTransition
                        this._firstLetterToUpper(currVendorWithoutDashes) + uppercasedName //WebkitTransition
                    ];
                    for(v = 0; v < resultPossibilities[LEXICON.l]; v++) {
                        if(elmStyle[resultPossibilities[v]] !== undefined) {
                            cache[name] = resultPossibilities[v];
                            return resultPossibilities[v];
                        }
                    }
                }

                return null;
            },
            _jsAPI : function(name, isInterface, fallback) {
                var prefixes = this._jsPrefixes;
                var cache = this._jsCache;
                var i = 0;
                var result = cache[name];
                if(!result) {
                    result = window[name];
                    for(; i < prefixes[LEXICON.l]; i++)
                        result = result || window[(isInterface ? prefixes[i] : prefixes[i].toLowerCase()) + this._firstLetterToUpper(name)];
                    cache[name] = result;
                }
                return result || fallback;
            },
            _firstLetterToUpper : function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        };
        var COMPATIBILITY = {
            /**
             * Gets the current window width.
             * @returns {Number|number} The current window width in pixel.
             */
            wW: function() {
                return window.innerWidth || document.documentElement[LEXICON.cW] || document.body[LEXICON.cW];
            },

            /**
             * Gets the current window height.
             * @returns {Number|number} The current window height in pixel.
             */
            wH: function() {
                return window.innerHeight || document.documentElement[LEXICON.cH] || document.body[LEXICON.cH];
            },

            /**
             * Gets the MutationObserver Object or undefined if not supported.
             * @returns {MutationObserver|*|undefined} The MutationsObserver Object or undefined.
             */
            mO: function() {
                return VENDORS._jsAPI('MutationObserver', true);
            },

            /**
             * Gets the ResizeObserver Object or undefined if not supported.
             * @returns {MutationObserver|*|undefined} The ResizeObserver Object or undefined.
             */
            rO: function() {
                return VENDORS._jsAPI('ResizeObserver', true);
            },

            /**
             * Gets the RequestAnimationFrame method or it's corresponding polyfill.
             * @returns {*|Function} The RequestAnimationFrame method or it's corresponding polyfill.
             */
            rAF: function() {
                return VENDORS._jsAPI('requestAnimationFrame', false, function (func) { return window.setTimeout(func, 1000 / 60); });
            },

            /**
             * Gets the CancelAnimationFrame method or it's corresponding polyfill.
             * @returns {*|Function} The CancelAnimationFrame method or it's corresponding polyfill.
             */
            cAF: function() {
                return VENDORS._jsAPI('cancelAnimationFrame', false, function (id) { return window.clearTimeout(id); });
            },

            /**
             * Gets the current time.
             * @returns {number} The current time.
             */
            now: function() {
                return Date.now && Date.now() || new Date().getTime();
            },

            /**
             * Stops the propagation of the given event.
             * @param event The event of which the propagation shall be stoped.
             */
            stpP: function(event) {
                if(event.stopPropagation)
                    event.stopPropagation();
                else
                    event.cancelBubble = true;
            },

            /**
             * Prevents the default action of the given event.
             * @param event The event of which the default action shall be prevented.
             */
            prvD: function(event) {
                if(event.preventDefault && event.cancelable)
                    event.preventDefault();
                else
                    event.returnValue = false;
            },

            /**
             * Gets the pageX and pageY values of the given mouse event.
             * @param event The mouse event of which the pageX and pageX shall be got.
             * @returns {{x: number, y: number}} x = pageX value, y = pageY value.
             */
            page: function(event) {
                event = event.originalEvent || event;

                var strPage = 'page';
                var strClient = 'client';
                var strX = 'X';
                var strY = 'Y';
                var target = event.target || event.srcElement || document;
                var eventDoc = target.ownerDocument || document;
                var doc = eventDoc.documentElement;
                var body = eventDoc.body;

                //if touch event return return pageX/Y of it
                if(event.touches !== undefined) {
                    var touch = event.touches[0];
                    return {
                        x : touch[strPage + strX],
                        y : touch[strPage + strY]
                    }
                }

                // Calculate pageX/Y if not native supported
                if (!event[strPage + strX] && event[strClient + strX] && event[strClient + strX] != null) {

                    return {
                        x : event[strClient + strX] +
                        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                        (doc && doc.clientLeft || body && body.clientLeft || 0),
                        y : event[strClient + strY] +
                        (doc && doc.scrollTop || body && body.scrollTop || 0) -
                        (doc && doc.clientTop || body && body.clientTop || 0)
                    }
                }
                return {
                    x : event[strPage + strX],
                    y : event[strPage + strY]
                };
            },

            /**
             * Gets the clicked mouse button of the given mouse event.
             * @param event The mouse event of which the clicked button shal be got.
             * @returns {number} The number of the clicked mouse button. (0 : none | 1 : leftButton | 2 : middleButton | 3 : rightButton)
             */
            mBtn: function(event) {
                var button = event.button;
                if (!event.which && button !== undefined)
                    return (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                else
                    return event.which;
            },

            /**
             * Checks whether a item is in the given array and returns its index.
             * @param item The item of which the position in the array shall be determined.
             * @param arr The array.
             * @returns {number} The zero based index of the item or -1 if the item isn't in the array.
             */
            inA : function(item, arr) {
                for (var i = 0; i < arr[LEXICON.l]; i++)
                    //Sometiems in IE a "SCRIPT70" Permission denied error occurs if HTML elements in a iFrame are compared
                    try {
                        if (arr[i] === item)
                            return i;
                    }
                    catch(e) { }
                return -1;
            },

            /**
             * Returns true if the given value is a array.
             * @param arr The potential array.
             * @returns {boolean} True if the given value is a array, false otherwise.
             */
            isA: function(arr) {
                var def = Array.isArray;
                return def ? def(arr) : this.type(arr) == TYPES.a;
            },

            /**
             * Determine the internal JavaScript [[Class]] of the given object.
             * @param obj The object of which the type shall be determined.
             * @returns {string} The type of the given object.
             */
            type: function(obj) {
                if (obj === undefined)
                    return obj + "";
                if (obj === null)
                    return obj + "";
                return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
            },


            bind: function(func, thisObj) {
                if (typeof func != TYPES.f) {
                    throw "Can't bind function!";
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    //throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }
                var proto     = LEXICON.p;
                var aArgs   = Array[proto].slice.call(arguments, 2);
                var fNOP    = function() {};
                var fBound  = function() { return func.apply(this instanceof fNOP ? this : thisObj, aArgs.concat(Array[proto].slice.call(arguments))); };

                if (func[proto])
                    fNOP[proto] = func[proto]; // Function.prototype doesn't have a prototype property
                fBound[proto] = new fNOP();

                return fBound;
            }

            /**
             * Gets the vendor-prefixed CSS property by the given name.
             * For example the given name is "transform" and you're using a old Firefox browser then the returned value would be "-moz-transform".
             * If the browser doesn't need a vendor-prefix, then the returned string is the given name.
             * If the browser doesn't support the given property name at all (not even with a vendor-prefix) the returned value is null.
             * @param propName The unprefixed CSS property name.
             * @returns {string|null} The vendor-prefixed CSS property or null if the browser doesn't support the given CSS property.

            cssProp : function(propName) {
                return VENDORS._cssProperty(propName);
            }
            */
        };

        var MATH = Math;
        var JQUERY = window.jQuery;
        var EASING = (function() {
            var _easingsMath = {
                p : MATH.PI,
                c : MATH.cos,
                s : MATH.sin,
                w : MATH.pow,
                t : MATH.sqrt,
                n : MATH.asin,
                a : MATH.abs,
                o : 1.70158
            };
            
            /*
             x : current percent (0 - 1),
             t : current time (duration * percent),
             b : start value (from),
             c : end value (to),
             d : duration

             easingName : function(x, t, b, c, d) { return easedValue; }
             */

            return {
                swing: function (x, t, b, c, d) {
                    return 0.5 - _easingsMath.c(x * _easingsMath.p) / 2;
                },
                linear: function(x, t, b, c, d) {
                    return x;
                },
                easeInQuad: function (x, t, b, c, d) {
                    return c*(t/=d)*t + b;
                },
                easeOutQuad: function (x, t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (x, t, b, c, d) {
                    return ((t/=d/2) < 1) ? c/2*t*t + b : -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (x, t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (x, t, b, c, d) {
                    return ((t/=d/2) < 1) ? c/2*t*t*t + b : c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (x, t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (x, t, b, c, d) {
                    return ((t/=d/2) < 1) ? c/2*t*t*t*t + b : -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOutQuint: function (x, t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOutQuint: function (x, t, b, c, d) {
                    return ((t/=d/2) < 1) ? c/2*t*t*t*t*t + b : c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInSine: function (x, t, b, c, d) {
                    return -c * _easingsMath.c(t/d * (_easingsMath.p/2)) + c + b;
                },
                easeOutSine: function (x, t, b, c, d) {
                    return c * _easingsMath.s(t/d * (_easingsMath.p/2)) + b;
                },
                easeInOutSine: function (x, t, b, c, d) {
                    return -c/2 * (_easingsMath.c(_easingsMath.p*t/d) - 1) + b;
                },
                easeInExpo: function (x, t, b, c, d) {
                    return (t==0) ? b : c * _easingsMath.w(2, 10 * (t/d - 1)) + b;
                },
                easeOutExpo: function (x, t, b, c, d) {
                    return (t==d) ? b+c : c * (-_easingsMath.w(2, -10 * t/d) + 1) + b;
                },
                easeInOutExpo: function (x, t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * _easingsMath.w(2, 10 * (t - 1)) + b;
                    return c/2 * (-_easingsMath.w(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (x, t, b, c, d) {
                    return -c * (_easingsMath.t(1 - (t/=d)*t) - 1) + b;
                },
                easeOutCirc: function (x, t, b, c, d) {
                    return c * _easingsMath.t(1 - (t=t/d-1)*t) + b;
                },
                easeInOutCirc: function (x, t, b, c, d) {
                    return ((t/=d/2) < 1) ? -c/2 * (_easingsMath.t(1 - t*t) - 1) + b : c/2 * (_easingsMath.t(1 - (t-=2)*t) + 1) + b;
                },
                easeInElastic: function (x, t, b, c, d) {
                    var s=_easingsMath.o;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < _easingsMath.a(c)) { a=c; s=p/4; }
                    else s = p/(2*_easingsMath.p) * _easingsMath.n (c/a);
                    return -(a*_easingsMath.w(2,10*(t-=1)) * _easingsMath.s( (t*d-s)*(2*_easingsMath.p)/p )) + b;
                },
                easeOutElastic: function (x, t, b, c, d) {
                    var s=_easingsMath.o;var p=0;var a=c;
                    if (t==0) return b;  
                    if ((t/=d)==1) return b+c;  
                    if (!p) p=d*.3;
                    if (a < _easingsMath.a(c)) { a=c; s=p/4; }
                    else s = p/(2*_easingsMath.p) * _easingsMath.n (c/a);
                    return a*_easingsMath.w(2,-10*t) * _easingsMath.s( (t*d-s)*(2*_easingsMath.p)/p ) + c + b;
                },
                easeInOutElastic: function (x, t, b, c, d) {
                    var s=_easingsMath.o;var p=0;var a=c;
                    if (t==0) return b;  
                    if ((t/=d/2)==2) return b+c;  
                    if (!p) p=d*(.3*1.5);
                    if (a < _easingsMath.a(c)) { a=c; s=p/4; }
                    else s = p/(2*_easingsMath.p) * _easingsMath.n (c/a);
                    if (t < 1) return -.5*(a*_easingsMath.w(2,10*(t-=1)) * _easingsMath.s( (t*d-s)*(2*_easingsMath.p)/p )) + b;
                    return a*_easingsMath.w(2,-10*(t-=1)) * _easingsMath.s( (t*d-s)*(2*_easingsMath.p)/p )*.5 + c + b;
                },
                easeInBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOutBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOutBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return ((t/=d/2) < 1) ? c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b : c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                easeInBounce: function (x, t, b, c, d) {
                    return c - this.easeOutBounce (x, d-t, 0, c, d) + b;
                },
                easeOutBounce: function (x, t, b, c, d) {
                    var o = 7.5625;
                    if ((t/=d) < (1/2.75)) {
                        return c*(o*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(o*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(o*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(o*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                easeInOutBounce: function (x, t, b, c, d) {
                    return (t < d/2) ? this.easeInBounce (x, t*2, 0, c, d) * .5 + b : this.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            };
            /*
             *
             * TERMS OF USE - EASING EQUATIONS
             * 
             * Open source under the BSD License. 
             * 
             * Copyright Â© 2001 Robert Penner
             * All rights reserved.
             * 
             * Redistribution and use in source and binary forms, with or without modification, 
             * are permitted provided that the following conditions are met:
             * 
             * Redistributions of source code must retain the above copyright notice, this list of 
             * conditions and the following disclaimer.
             * Redistributions in binary form must reproduce the above copyright notice, this list 
             * of conditions and the following disclaimer in the documentation and/or other materials 
             * provided with the distribution.
             * 
             * Neither the name of the author nor the names of contributors may be used to endorse 
             * or promote products derived from this software without specific prior written permission.
             * 
             * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
             * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
             * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
             *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
             *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
             *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
             * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
             *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
             * OF THE POSSIBILITY OF SUCH DAMAGE. 
             *
             */
        })();
        var FRAMEWORK = (function() {
            var _rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
            var _strSpace = ' ';
            var _strEmpty = '';
            var _strScrollLeft = 'scrollLeft';
            var _strScrollTop = 'scrollTop';
            var _animations = [ ];
            var _type = COMPATIBILITY.type;
            var _cssNumber = {
                "animationIterationCount": true,
                "columnCount": true,
                "fillOpacity": true,
                "flexGrow": true,
                "flexShrink": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            };

            var extend = function() {
                var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                    i = 1,
                    length = arguments[LEXICON.l],
                    deep = false;

                // Handle a deep copy situation
                if (_type(target) == TYPES.b) {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    i = 2;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if (_type(target) != TYPES.o && !_type(target) == TYPES.f) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if (length === i) {
                    target = FakejQuery;
                    --i;
                }

                for (; i < length; i++) {
                    // Only deal with non-null/undefined values
                    if ((options = arguments[i]) != null) {
                        // Extend the base object
                        for (name in options) {
                            src = target[name];
                            copy = options[name];

                            // Prevent never-ending loop
                            if (target === copy) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (isPlainObject(copy) || (copyIsArray = COMPATIBILITY.isA(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && COMPATIBILITY.isA(src) ? src : [];

                                } else {
                                    clone = src && isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[name] = extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            };

            var inArray = function(item, arr, fromIndex) {
                for (var i = fromIndex || 0; i < arr[LEXICON.l]; i++)
                    if (arr[i] === item)
                        return i;
                return -1;
            }
            
            var isFunction = function(obj) {
                return _type(obj) == TYPES.f;
            };

            var isEmptyObject = function(obj) {
                for (var name in obj )
                    return false;
                return true;
            };

            var isPlainObject = function(obj) {
                if (!obj || _type(obj) != TYPES.o)
                    return false;

                var key;
                var proto = LEXICON.p;
                var hasOwnProperty = Object[proto].hasOwnProperty;
                var hasOwnConstructor = hasOwnProperty.call(obj, 'constructor');
                var hasIsPrototypeOf = obj.constructor && obj.constructor[proto] && hasOwnProperty.call(obj.constructor[proto], 'isPrototypeOf');

                if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
                    return false;
                }


                for (key in obj) { /**/ }

                return _type(key) == TYPES.u || hasOwnProperty.call(obj, key);
            };

            var each = function(obj, callback) {
                var i = 0;

                if (isArrayLike(obj)) {
                    for (; i < obj[LEXICON.l]; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false)
                            break;
                    }
                }
                else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false)
                            break;
                    }
                }

                return obj;
            };

            var FakejQuery = function (selector) {
                if(arguments[LEXICON.l] === 0)
                    return this;

                var base = new FakejQuery();
                var elements = selector;
                var i = 0;
                var elms;
                var el;

                if(_type(selector) == TYPES.s) {
                    elements = [ ];
                    if(selector.charAt(0) === '<') {
                        el = document.createElement('div');
                        el.innerHTML = selector;
                        elms = el.children;
                    }
                    else {
                        elms = document.querySelectorAll(selector);
                    }

                    for(; i < elms[LEXICON.l]; i++)
                        elements.push(elms[i]);
                }

                if(elements) {
                    if(_type(elements) != TYPES.s && (!isArrayLike(elements) || elements === window || elements === elements.self))
                        elements = [ elements ];

                    for(i = 0; i < elements[LEXICON.l]; i++)
                        base[i] = elements[i];

                    base[LEXICON.l] = elements[LEXICON.l];
                }

                return base;
            };

            function isArrayLike(obj) {
                var length = !!obj && [LEXICON.l] in obj && obj[LEXICON.l];
                var t = _type(obj);
                return isFunction(t) ? false : (t == TYPES.a || length === 0 || _type(length) == TYPES.n && length > 0 && (length - 1) in obj);
            }

            function stripAndCollapse(value) {
                var tokens = value.match(_rnothtmlwhite) || [];
                return tokens.join(_strSpace);
            }

            function matches(elem, selector) {
                var nodeList = (elem.parentNode || document).querySelectorAll(selector) || [];
                var i = nodeList[LEXICON.l];

                while (i--)
                    if (nodeList[i] == elem)
                        return true;

                return false;
            }

            function insertAdjacentElement(el, strategy, child) {
                if(_type(child) == TYPES.a) {
                    for(var i = 0; i < child[LEXICON.l]; i++)
                        insertAdjacentElement(el, strategy, child[i]);
                }
                else if(_type(child) == TYPES.s)
                    el.insertAdjacentHTML(strategy, child);
                else
                    el.insertAdjacentElement(strategy, child.nodeType ? child : child[0]);
            }

            function setCSSVal(el, prop, val) {
                try {
                    if(el[LEXICON.s][prop] !== undefined)
                        el[LEXICON.s][prop] = parseCSSVal(prop, val);
                } catch(e) { }
            }

            function parseCSSVal(prop, val) {
                if(!_cssNumber[prop.toLowerCase()] && _type(val) == TYPES.n)
                    val += 'px';
                return val;
            }

            function startNextAnimationInQ(animObj, removeFromQ) {
                var index;
                var nextAnim;
                if(removeFromQ !== false)
                    animObj.q.splice(0, 1);
                if(animObj.q[LEXICON.l] > 0) {
                    nextAnim = animObj.q[0];
                    animate(animObj.el, nextAnim.props, nextAnim.duration, nextAnim.easing, nextAnim.complete, true);
                }
                else {
                    index = inArray(animObj, _animations);
                    if(index > -1)
                        _animations.splice(index, 1);
                }
            }

            function setAnimationValue(el, prop, value) {
                if(prop === _strScrollLeft || prop === _strScrollTop)
                    el[prop] = value;
                else
                    setCSSVal(el, prop, value);
            }

            function animate(el, props, options, easing, complete, guaranteedNext) {
                var hasOptions = isPlainObject(options);
                var from = { };
                var to = { };
                var i = 0;
                var key;
                var animObj;
                var start;
                var progress;
                var step;
                var specialEasing;
                var duration;
                if(hasOptions) {
                    easing = options.easing;
                    start = options.start;
                    progress = options.progress;
                    step = options.step;
                    specialEasing = options.specialEasing;
                    complete = options.complete;
                    duration = options.duration;
                }
                else
                    duration = options;
                specialEasing = specialEasing || { };
                duration = duration || 400;
                easing = easing || 'swing';
                guaranteedNext = guaranteedNext || false;

                for(; i < _animations[LEXICON.l]; i++) {
                    if(_animations[i].el === el) {
                        animObj = _animations[i];
                        break;
                    }
                }

                if(!animObj) {
                    animObj = {
                        el : el,
                        q : []
                    };
                    _animations.push(animObj);
                }

                for (key in props) {
                    if(key === _strScrollLeft || key === _strScrollTop)
                        from[key] = el[key];
                    else
                        from[key] = FakejQuery(el).css(key);
                }

                for (key in from) {
                    if(from[key] !== props[key] && props[key] !== undefined)
                        to[key] = props[key];
                }

                if(!isEmptyObject(to)) {
                    var timeNow;
                    var end;
                    var percent;
                    var fromVal;
                    var toVal;
                    var easedVal;
                    var timeStart;
                    var frame;
                    var elapsed;
                    var qPos = guaranteedNext ? 0 : inArray(qObj, animObj.q);
                    var qObj = {
                        props : to,
                        duration : hasOptions ? options : duration,
                        easing : easing,
                        complete : complete
                    };
                    if (qPos === -1) {
                        qPos = animObj.q[LEXICON.l];
                        animObj.q.push(qObj);
                    }

                    if(qPos === 0) {
                        if(duration > 0) {
                            timeStart = COMPATIBILITY.now();
                            frame = function() {
                                timeNow = COMPATIBILITY.now();
                                elapsed = (timeNow - timeStart);
                                end = qObj.stop || elapsed >= duration;
                                percent = 1 - ((MATH.max(0, timeStart + duration - timeNow) / duration) || 0);

                                for(key in to) {
                                    fromVal = parseFloat(from[key]);
                                    toVal = parseFloat(to[key]);
                                    easedVal = (toVal - fromVal) * EASING[specialEasing[key] || easing](percent, percent * duration, 0, 1, duration) + fromVal;
                                    setAnimationValue(el, key, easedVal);
                                    if(isFunction(step)) {
                                        step(easedVal, {
                                            elem : el,
                                            prop : key,
                                            start : fromVal,
                                            now : easedVal,
                                            end : toVal,
                                            pos : percent,
                                            options : {
                                                easing : easing,
                                                speacialEasing : specialEasing,
                                                duration : duration,
                                                complete : complete,
                                                step : step
                                            },
                                            startTime : timeStart
                                        });
                                    }
                                }

                                if(isFunction(progress))
                                    progress({ }, percent, MATH.max(0, duration - elapsed));

                                if (end) {
                                    startNextAnimationInQ(animObj);
                                    if(isFunction(complete))
                                        complete();
                                }
                                else
                                    qObj.frame = COMPATIBILITY.rAF()(frame);
                            };
                            qObj.frame = COMPATIBILITY.rAF()(frame);
                        }
                        else {
                            for(key in to)
                                setAnimationValue(el, key, to[key]);
                            startNextAnimationInQ(animObj);
                        }
                    }
                }
                else if(guaranteedNext)
                    startNextAnimationInQ(animObj);
            }

            function stop(el, clearQ, jumpToEnd) {
                var animObj;
                var qObj;
                var key;
                var i = 0;
                for(; i < _animations[LEXICON.l]; i++) {
                    animObj = _animations[i];
                    if(animObj.el === el) {
                        if(animObj.q[LEXICON.l] > 0) {
                            qObj = animObj.q[0];
                            qObj.stop = true;
                            COMPATIBILITY.cAF()(qObj.frame);
                            animObj.q.splice(0, 1);

                            if(jumpToEnd)
                                for(key in qObj.props)
                                    setAnimationValue(el, key, qObj.props[key]);

                            if(clearQ)
                                animObj.q = [ ];
                            else
                                startNextAnimationInQ(animObj, false);
                        }
                        break;
                    }
                }
            }

            FakejQuery[LEXICON.p] = {

                //EVENTS:

                on : function(eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];

                    var eventNameLength = eventName[LEXICON.l];
                    var i = 0;
                    var el;
                    return this.each(function() {
                        el = this;
                        try {
                            if (el.addEventListener) {
                                for (; i < eventNameLength; i++)
                                    el.addEventListener(eventName[i], handler);
                            }
                            else if(el.detachEvent) {
                                for (; i < eventNameLength; i++)
                                    el.attachEvent('on' + eventName[i], handler);
                            }
                        } catch (e) { }
                    });
                },

                off : function(eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];

                    var eventNameLength = eventName[LEXICON.l];
                    var i = 0;
                    var el;
                    return this.each(function() {
                        el = this;
                        try {
                            if (el.removeEventListener) {
                                for (; i < eventNameLength; i++)
                                    el.removeEventListener(eventName[i], handler);
                            }
                            else if(el.detachEvent) {
                                for (; i < eventNameLength; i++)
                                    el.detachEvent('on' + eventName[i], handler);
                            }
                        } catch (e) { }
                    });
                },

                one : function (eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
                    return this.each(function() {
                        var el = FakejQuery(this);
                        FakejQuery.each(eventName, function(i, oneEventName) {
                            var oneHandler = function(e) {
                                handler.call(this, e);
                                el.off(oneEventName, oneHandler);
                            };
                            el.on(oneEventName, oneHandler);
                        });
                    });
                },

                trigger : function(eventName) {
                    var el;
                    var event;
                    return this.each(function() {
                        el = this;
                        if (document.createEvent) {
                            event = document.createEvent('HTMLEvents');
                            event.initEvent(eventName, true, false);
                            el.dispatchEvent(event);
                        }
                        else {
                            el.fireEvent("on" + eventName);
                        }
                    });
                },

                //DOM NODE INSERTING / REMOVING:

                append : function(child) {
                    return this.each(function() { insertAdjacentElement(this, 'beforeend', child); });
                },

                prepend : function(child) {
                    return this.each(function() { insertAdjacentElement(this, 'afterbegin', child); });
                },

                before : function(child) {
                    return this.each(function() { insertAdjacentElement(this, 'beforebegin', child); });
                },

                after : function(child) {
                    return this.each(function() { insertAdjacentElement(this, 'afterend', child); });
                },

                remove : function() {
                    return this.each(function() {
                        var el = this;
                        var parentNode = el.parentNode;
                        if(parentNode != null)
                            parentNode.removeChild(el);
                    });
                },

                unwrap : function() {
                    var parents = [ ];
                    var i;
                    var el;
                    var parent;

                    this.each(function() {
                        parent = this.parentNode;
                        if(inArray(parent, parents) === - 1)
                            parents.push(parent);
                    });

                    for(i = 0; i < parents[LEXICON.l]; i++) {
                        el = parents[i];
                        parent = el.parentNode;
                        while (el.firstChild)
                            parent.insertBefore(el.firstChild, el);
                        parent.removeChild(el);
                    }

                    return this;
                },

                wrapAll : function(wrapperHTML) {
                    var i;
                    var nodes = this;
                    var wrapper = FakejQuery(wrapperHTML)[0];
                    var deepest = wrapper;
                    var parent = nodes[0].parentNode;
                    var previousSibling = nodes[0].previousSibling;
                    while(deepest.childNodes[LEXICON.l] > 0)
                        deepest = deepest.childNodes[0];

                    for (i = 0; nodes[LEXICON.l] - i; deepest.firstChild === nodes[0] && i++)
                        deepest.appendChild(nodes[i]);

                    var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
                    parent.insertBefore(wrapper, nextSibling);

                    return this;
                },

                wrapInner : function(wrapperHTML) {
                    return this.each(function() {
                        var el = FakejQuery(this);
                        var contents = el.contents();

                        if (contents[LEXICON.l])
                            contents.wrapAll(wrapperHTML);
                        else
                            el.append(wrapperHTML);
                    });
                },

                wrap : function(wrapperHTML) {
                    return this.each(function() { FakejQuery(this).wrapAll(wrapperHTML); });
                },


                //DOM NODE MANIPULATION / INFORMATION:

                css : function(styles, val) {
                    var el;
                    var key;
                    var cptStyle;
                    var getCptStyle = window.getComputedStyle;
                    if(_type(styles) == TYPES.s) {
                        if(val === undefined) {
                            el = this[0];
                            cptStyle = getCptStyle ? getCptStyle(el, null) : el.currentStyle[styles];

                            //https://bugzilla.mozilla.org/show_bug.cgi?id=548397 can be null sometimes if iframe with display: none (firefox only!)
                            return getCptStyle ? cptStyle != null ? cptStyle.getPropertyValue(styles) : el[LEXICON.s][styles] : cptStyle;
                        }
                        else {
                            return this.each(function() {
                                setCSSVal(this, styles, val);
                            });
                        }
                    }
                    else {
                        return this.each(function() {
                            for(key in styles)
                                setCSSVal(this, key, styles[key]);
                        });
                    }
                },

                hasClass : function(className) {
                    var elem, i = 0;
                    var classNamePrepared = _strSpace + className + _strSpace;
                    var classList;

                    while ((elem = this[ i++ ])) {
                        classList = elem.classList;
                        if(classList && classList.contains(className))
                            return true;
                        else if (elem.nodeType === 1 && (_strSpace + stripAndCollapse(elem.className + _strEmpty) + _strSpace).indexOf(classNamePrepared) > -1)
                            return true;
                    }

                    return false;
                },

                addClass : function(className) {
                    var classes;
                    var elem;
                    var cur;
                    var curValue;
                    var clazz;
                    var finalValue;
                    var supportClassList;
                    var elmClassList;
                    var i = 0;
                    var v = 0;

                    if (className) {
                        classes = className.match( _rnothtmlwhite ) || [];

                        while ((elem = this[i++])) {
                            elmClassList = elem.classList;
                            if(supportClassList === undefined)
                                supportClassList = elmClassList !== undefined;

                            if(supportClassList) {
                                while ((clazz = classes[v++]))
                                    elmClassList.add(clazz);
                            }
                            else {
                                curValue = elem.className + _strEmpty;
                                cur = elem.nodeType === 1 && (_strSpace + stripAndCollapse(curValue) + _strSpace);

                                if (cur) {
                                    while ((clazz = classes[v++]))
                                        if (cur.indexOf(_strSpace + clazz + _strSpace) < 0)
                                            cur += clazz + _strSpace;

                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue)
                                        elem.className = finalValue;
                                }
                            }
                        }
                    }

                    return this;
                },

                removeClass : function(className) {
                    var classes;
                    var elem;
                    var cur;
                    var curValue;
                    var clazz;
                    var finalValue;
                    var supportClassList;
                    var elmClassList;
                    var i = 0;
                    var v = 0;

                    if (className) {
                        classes = className.match(_rnothtmlwhite) || [];

                        while ((elem = this[i++])) {
                            elmClassList = elem.classList;
                            if(supportClassList === undefined)
                                supportClassList = elmClassList !== undefined;

                            if(supportClassList) {
                                while ((clazz = classes[v++]))
                                    elmClassList.remove(clazz);
                            }
                            else {
                                curValue = elem.className + _strEmpty;
                                cur = elem.nodeType === 1 && (_strSpace + stripAndCollapse(curValue) + _strSpace);

                                if (cur) {
                                    while ((clazz = classes[v++]))
                                        while (cur.indexOf(_strSpace + clazz + _strSpace) > -1)
                                            cur = cur.replace(_strSpace + clazz + _strSpace, _strSpace);

                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue)
                                        elem.className = finalValue;
                                }
                            }
                        }
                    }

                    return this;
                },

                hide : function() {
                    return this.each(function() { this[LEXICON.s].display = 'none'; });
                },

                show : function() {
                    return this.each(function() { this[LEXICON.s].display = 'block'; });
                },

                attr : function(attrName, value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if(value === undefined)
                            return el.getAttribute(attrName);
                        el.setAttribute(attrName, value);
                    }
                    return this;
                },

                removeAttr : function(attrName) {
                    return this.each(function() { this.removeAttribute(attrName); });
                },

                offset : function() {
                    var el = this[0];
                    var rect = el.getBoundingClientRect();
                    var scrollLeft = window.pageXOffset || document.documentElement[_strScrollLeft];
                    var scrollTop = window.pageYOffset || document.documentElement[_strScrollTop];
                    return {
                        top: rect.top + scrollTop,
                        left: rect.left + scrollLeft
                    };
                },

                position : function() {
                    var el = this[0];
                    return {
                        top: el.offsetTop,
                        left: el.offsetLeft
                    };
                },

                scrollLeft : function(value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if(value === undefined)
                            return el[_strScrollLeft];
                        el[_strScrollLeft] = value;
                    }
                    return this;
                },

                scrollTop : function(value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if(value === undefined)
                            return el[_strScrollTop];
                        el[_strScrollTop] = value;
                    }
                    return this;
                },

                val : function(value) {
                    var el = this[0];
                    if(!value)
                        return el.value;
                    el.value = value;
                    return this;
                },


                //DOM TRAVERSAL / FILTERING:

                first : function() {
                    return this.eq(0);
                },

                last : function() {
                    return this.eq(-1);
                },

                eq : function(index) {
                    return FakejQuery(this[index >= 0 ? index : this[LEXICON.l] + index]);
                },

                find : function(selector) {
                    var children = [ ];
                    var i;
                    this.each(function() {
                        var el = this;
                        var ch = el.querySelectorAll(selector);
                        for(i = 0; i < ch[LEXICON.l]; i++)
                            children.push(ch[i]);
                    });
                    return FakejQuery(children);
                },

                children : function(selector) {
                    var children = [ ];
                    var el;
                    var ch;
                    var i;

                    this.each(function() {
                        ch = this.children;
                        for(i = 0; i < ch[LEXICON.l]; i++) {
                            el = ch[i];
                            if(selector) {
                                if((el.matches && el.matches(selector)) || matches(el, selector))
                                    children.push(el);
                            }
                            else
                                children.push(el);
                        }
                    });
                    return FakejQuery(children);
                },

                parent : function(selector) {
                    var parents = [ ];
                    var parent;
                    this.each(function() {
                        parent = this.parentNode;
                        if(selector ? FakejQuery(parent).is(selector) : true)
                            parents.push(parent);
                    });
                    return FakejQuery(parents);
                },

                is : function(selector) {
                    var el;
                    var i;
                    for(i = 0; i < this[LEXICON.l]; i++) {
                        el = this[i];
                        if(selector === ":visible")
                            return !!(el[LEXICON.oW] || el[LEXICON.oH] || el.getClientRects()[LEXICON.l]);
                        if(selector === ":hidden")
                            return !!!(el[LEXICON.oW] || el[LEXICON.oH] || el.getClientRects()[LEXICON.l]);
                        if((el.matches && el.matches(selector)) || matches(el, selector))
                            return true;
                    }
                    return false;
                },

                contents : function() {
                    var contents = [ ];
                    var childs;
                    var i;

                    this.each(function() {
                        childs = this.childNodes;
                        for(i = 0; i < childs[LEXICON.l]; i++)
                            contents.push(childs[i]);
                    });

                    return FakejQuery(contents);
                },

                each : function(callback) {
                    return each(this, callback);
                },


                //ANIMATION:

                animate : function(props, duration, easing, complete) {
                    return this.each(function() { animate(this, props, duration, easing, complete); });
                },

                stop : function(clearQ, jump) {
                    return this.each(function() { stop(this, clearQ, jump); });
                }
            };

            extend(FakejQuery, {
                extend : extend,
                inArray : inArray,
                isEmptyObject : isEmptyObject,
                isPlainObject : isPlainObject,
                each : each
            });

            return FakejQuery;
        })();
        var INSTANCES = (function() {
            var _targets = [ ];
            var _instancePropertyString = '__overlayScrollbars__';

            /**
             * Register, unregister or get a certain (or all) instances.
             * Register: Pass the target and the instance.
             * Unregister: Pass the target and null.
             * Get Instance: Pass the target from which the instance shall be got.
             * Get Targets: Pass no arguments.
             * @param target The target to which the instance shall be registered / from which the instance shall be unregistered / the instance shall be got
             * @param instance The instance.
             * @returns {*|void} Returns the instance from the given target.
             */
            return function (target, instance) {
                var argLen = arguments[LEXICON.l];
                if(argLen < 1) {
                    //return all targets
                    return _targets;
                }
                else {
                    if(instance) {
                        //register instance
                        target[_instancePropertyString] = instance;
                        _targets.push(target);
                    }
                    else {
                        var index = COMPATIBILITY.inA(target, _targets);
                        if (index > -1) {
                            if(argLen > 1) {
                                //unregister instance
                                delete target[_instancePropertyString];
                                _targets.splice(index, 1);
                            }
                            else {
                                //get instance from target
                                return _targets[index][_instancePropertyString];
                            }
                        }
                    }
                }
            }
        })();
        var PLUGIN = (function() {
            var _pluginsGlobals;
            var _pluginsAutoUpdateLoop;
            var _pluginsExtensions = [ ];
            var _pluginsOptions = (function() {
                var possibleTemplateTypes = [
                    TYPES.b, //boolean
                    TYPES.n, //number
                    TYPES.s, //string
                    TYPES.a, //array
                    TYPES.o, //object
                    TYPES.f, //function
                    TYPES.z  //null
                ];
                var restrictedStringsSplit = ' ';
                var restrictedStringsPossibilitiesSplit = ':';
                var classNameAllowedValues = [TYPES.z, TYPES.s];
                var numberAllowedValues = TYPES.n;
                var booleanNullAllowedValues = [TYPES.z, TYPES.b];
                var booleanTrueTemplate = [true, TYPES.b];
                var booleanFalseTemplate = [false, TYPES.b];
                var callbackTemplate = [null,  [TYPES.z, TYPES.f]];
                var inheritedAttrsTemplate = [['style', 'class'], [TYPES.s, TYPES.a, TYPES.z]];
                var resizeAllowedValues = 'n:none b:both h:horizontal v:vertical';
                var overflowBehaviorAllowedValues = 'v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden';
                var scrollbarsVisibilityAllowedValues = 'v:visible h:hidden a:auto';
                var scrollbarsAutoHideAllowedValues = 'n:never s:scroll l:leave m:move';
                var optionsDefaultsAndTemplate = {
                    className: ['os-theme-dark', classNameAllowedValues],                //null || string
                    resize: ['none', resizeAllowedValues],                               //none || both  || horizontal || vertical || n || b || h || v
                    sizeAutoCapable: booleanTrueTemplate,                                //true || false
                    clipAlways: booleanTrueTemplate,                                     //true || false
                    normalizeRTL: booleanTrueTemplate,                                   //true || false
                    paddingAbsolute: booleanFalseTemplate,                               //true || false
                    autoUpdate: [null, booleanNullAllowedValues],                        //true || false || null
                    autoUpdateInterval: [33, numberAllowedValues],                       //number
                    nativeScrollbarsOverlaid: {
                        showNativeScrollbars: booleanFalseTemplate,                      //true || false
                        initialize: booleanTrueTemplate                                  //true || false
                    },
                    overflowBehavior: {
                        x: ['scroll', overflowBehaviorAllowedValues],                    //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
                        y: ['scroll', overflowBehaviorAllowedValues]                     //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
                    },
                    scrollbars: {
                        visibility: ['auto', scrollbarsVisibilityAllowedValues],         //visible || hidden || auto || v || h || a
                        autoHide: ['never', scrollbarsAutoHideAllowedValues],            //never || scroll || leave || move || n || s || l || m
                        autoHideDelay: [800, numberAllowedValues],                       //number
                        dragScrolling: booleanTrueTemplate,                              //true || false
                        clickScrolling: booleanFalseTemplate,                            //true || false
                        touchSupport: booleanTrueTemplate,                               //true || false
                        snapHandle: booleanFalseTemplate                                 //true || false
                    },
                    textarea: {
                        dynWidth: booleanFalseTemplate,                                  //true || false
                        dynHeight: booleanFalseTemplate,                                 //true || false
                        inheritedAttrs : inheritedAttrsTemplate                          //string || array || null
                    },
                    callbacks: {
                        onInitialized: callbackTemplate,                                 //null || function
                        onInitializationWithdrawn: callbackTemplate,                     //null || function
                        onDestroyed: callbackTemplate,                                   //null || function
                        onScrollStart: callbackTemplate,                                 //null || function
                        onScroll: callbackTemplate,                                      //null || function
                        onScrollStop: callbackTemplate,                                  //null || function
                        onOverflowChanged: callbackTemplate,                             //null || function
                        onOverflowAmountChanged: callbackTemplate,                       //null || function
                        onDirectionChanged: callbackTemplate,                            //null || function
                        onContentSizeChanged: callbackTemplate,                          //null || function
                        onHostSizeChanged: callbackTemplate,                             //null || function
                        onUpdated: callbackTemplate                                      //null || function
                    }
                };
                var convert = function(template) {
                    var recursive = function(obj) {
                        var key;
                        var val;
                        var valType;
                        for(key in obj) {
                            if(!obj.hasOwnProperty(key))
                                continue;
                            val = obj[key];
                            valType = COMPATIBILITY.type(val);
                            if(valType == TYPES.a)
                                obj[key] = val[template ? 1 : 0];
                            else if(valType == TYPES.o)
                                obj[key] = recursive(val);
                        }
                        return obj;
                    };
                    return recursive(FRAMEWORK.extend(true, { }, optionsDefaultsAndTemplate));
                };

                return {
                    _defaults : convert(),

                    _template : convert(true),

                    /**
                     * Validates the passed object by the passed template.
                     * @param obj The object which shall be validated.
                     * @param template The template which defines the allowed values and types.
                     * @param writeErrors True if errors shall be logged to the console.
                     * @param usePreparedValues True if the validated main values shall be returned in the validated object, false otherwise.
                     * @param keepForeignProps True if properties which aren't in the template shall be added to the validated object, false otherwise.
                     * @returns {{}} A object which contains only the valid properties of the passed original object.
                     */
                    _validate : function (obj, template, writeErrors, usePreparedValues, keepForeignProps) {
                        var validatedOptions = { };
                        var objectCopy = FRAMEWORK.extend(true, { }, obj);
                        var checkObjectProps = function(data, template, validatedOptions, prevPropName) {
                            for (var prop in template) {
                                if (template.hasOwnProperty(prop) && data.hasOwnProperty(prop)) {
                                    var isValid = false;
                                    var templateValue = template[prop];
                                    var templateValueType = COMPATIBILITY.type(templateValue);
                                    var templateIsComplext = templateValueType == TYPES.o;
                                    var templateTypes = COMPATIBILITY.type(templateValue) != TYPES.a ? [ templateValue ] : templateValue;
                                    var dataValue = data[prop];
                                    var dataValueType = COMPATIBILITY.type(dataValue);
                                    var propPrefix = prevPropName ? prevPropName + "." : "";
                                    var error = "The option \"" + propPrefix + prop + "\" wasn't set, because";
                                    var errorPossibleTypes = [ ];
                                    var errorRestrictedStrings = [ ];
                                    var restrictedStringValuesSplit;
                                    var restrictedStringValuesPossibilitiesSplit;
                                    var isRestrictedValue;
                                    var mainPossibility;
                                    var currType;
                                    var i;
                                    var v;
                                    var j;

                                    //if the template has a object as value, it means that the options are complex (verschachtelt)
                                    if(templateIsComplext && dataValueType == TYPES.o) {
                                        validatedOptions[prop] = { };
                                        checkObjectProps(dataValue, templateValue, validatedOptions[prop], propPrefix + prop);
                                        if(FRAMEWORK.isEmptyObject(dataValue))
                                            delete data[prop];
                                    }
                                    else if(!templateIsComplext) {
                                        for(i = 0; i < templateTypes.length; i++) {
                                            currType = templateTypes[i];
                                            templateValueType = COMPATIBILITY.type(currType);
                                            //if currtype is string and starts with restrictedStringPrefix and end with restrictedStringSuffix
                                            isRestrictedValue = templateValueType == TYPES.s && FRAMEWORK.inArray(currType, possibleTemplateTypes) === -1;
                                            if(isRestrictedValue) {
                                                errorPossibleTypes.push(TYPES.s);

                                                //split it into a array which contains all possible values for example: ["y:yes", "n:no", "m:maybe"]
                                                restrictedStringValuesSplit = currType.split(restrictedStringsSplit);
                                                errorRestrictedStrings = errorRestrictedStrings.concat(restrictedStringValuesSplit);
                                                for(v = 0; v < restrictedStringValuesSplit.length; v++) {
                                                    //split the possible values into their possibiliteis for example: ["y", "yes"] -> the first is always the mainPossibility
                                                    restrictedStringValuesPossibilitiesSplit = restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
                                                    mainPossibility = restrictedStringValuesPossibilitiesSplit[0];
                                                    for(j = 0; j < restrictedStringValuesPossibilitiesSplit.length; j++) {
                                                        //if any possibility matches with the dataValue, its valid
                                                        if(dataValue === restrictedStringValuesPossibilitiesSplit[j]) {
                                                            isValid = true;
                                                            break;
                                                        }
                                                    }
                                                    if(isValid)
                                                        break;
                                                }
                                            }
                                            else {
                                                errorPossibleTypes.push(currType);

                                                if(dataValueType === currType) {
                                                    isValid = true;
                                                    break;
                                                }
                                            }
                                        }

                                        if(isValid) {
                                            validatedOptions[prop] = isRestrictedValue && usePreparedValues ? mainPossibility : dataValue;
                                        }
                                        else if(writeErrors) {
                                            console.warn(error + " it doesn't accept the type [ " + dataValueType.toUpperCase() + " ] with the value of \"" + dataValue + "\".\r\n" +
                                                "Accepted types are: [ " + errorPossibleTypes.join(", ").toUpperCase() + " ]." +
                                                (errorRestrictedStrings.length > 0 ? "\r\nValid strings are: [ " + errorRestrictedStrings.join(", ").split(restrictedStringsPossibilitiesSplit).join(", ") + " ]." : ""));
                                        }
                                        delete data[prop];
                                    }
                                }
                            }
                        };
                        checkObjectProps(objectCopy, template, validatedOptions);

                        //add values which aren't specified in the template to the finished validated object to prevent them from being discarded
                        if(keepForeignProps)
                            FRAMEWORK.extend(true, validatedOptions, objectCopy);
                        else if(!FRAMEWORK.isEmptyObject(objectCopy) && writeErrors)
                            console.warn("The following options are discarded due to invalidity:\r\n" + window.JSON.stringify(objectCopy, null, 2));

                        return validatedOptions;
                    }
                }
            }());

            /**
             * Initializes the object which contains global information about the plugin and each instance of it.
             */
            function initOverlayScrollbarsStatics() {
                if(!_pluginsGlobals)
                    _pluginsGlobals = new OverlayScrollbarsGlobals(_pluginsOptions._defaults);
                if(!_pluginsAutoUpdateLoop)
                    _pluginsAutoUpdateLoop = new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals);
            }

            /**
             * The global object for the OverlayScrollbars objects. It contains resources which every OverlayScrollbars object needs. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
             * @param defaultOptions
             * @constructor
             */
            function OverlayScrollbarsGlobals(defaultOptions) {
                var _base = this;
                var strOverflow = 'overflow';
                var strHidden = 'hidden';
                var strScroll = 'scroll';
                var bodyElement = FRAMEWORK('body');
                var scrollbarDummyElement = FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
                var scrollbarDummyElement0 = scrollbarDummyElement[0];
                var dummyContainerChild = FRAMEWORK(scrollbarDummyElement.children('div').eq(0));

                bodyElement.append(scrollbarDummyElement);
                scrollbarDummyElement.hide().show(); //fix IE8 bug (incorrect measuring)

                var nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement0);
                var nativeScrollbarIsOverlaid = {
                    x: nativeScrollbarSize.x === 0,
                    y: nativeScrollbarSize.y === 0
                };

                FRAMEWORK.extend(_base, {
                    defaultOptions : defaultOptions,
                    autoUpdateLoop : false,
                    autoUpdateRecommended : !COMPATIBILITY.mO(),
                    nativeScrollbarSize : nativeScrollbarSize,
                    nativeScrollbarIsOverlaid : nativeScrollbarIsOverlaid,
                    nativeScrollbarStyling : (function() {
                        scrollbarDummyElement.addClass('os-viewport-native-scrollbars-invisible');

                        //fix opera bug: scrollbar styles will only appear if overflow value is scroll or auto during the activation of the style.
                        //and set overflow to scroll
                        //scrollbarDummyElement.css(strOverflow, strHidden).hide().css(strOverflow, strScroll).show();
                        //return (scrollbarDummyElement0[LEXICON.oH] - scrollbarDummyElement0[LEXICON.cH]) === 0 && (scrollbarDummyElement0[LEXICON.oW] - scrollbarDummyElement0[LEXICON.cW]) === 0;
                        
                        return scrollbarDummyElement.css('scrollbar-width') === 'none' || window.getComputedStyle(scrollbarDummyElement0, '::-webkit-scrollbar').getPropertyValue('display') === 'none';
                    })(),
                    overlayScrollbarDummySize : { x: 30, y: 30 },
                    msie : (function() {
                        var ua = window.navigator.userAgent;
                        var strIndexOf = 'indexOf';
                        var strSubString = 'substring';
                        var msie = ua[strIndexOf]('MSIE ');
                        var trident = ua[strIndexOf]('Trident/');
                        var edge = ua[strIndexOf]('Edge/');
                        var rv = ua[strIndexOf]('rv:');
                        var result;
                        var parseIntFunc = parseInt;

                        // IE 10 or older => return version number
                        if (msie > 0)
                            result = parseIntFunc(ua[strSubString](msie + 5, ua[strIndexOf]('.', msie)), 10);

                        // IE 11 => return version number
                        else if (trident > 0)
                            result = parseIntFunc(ua[strSubString](rv + 3, ua[strIndexOf]('.', rv)), 10);

                        // Edge (IE 12+) => return version number
                        else if (edge > 0)
                            result = parseIntFunc(ua[strSubString](edge + 5, ua[strIndexOf]('.', edge)), 10);

                        // other browser
                        return result;
                    })(),
                    cssCalc : (function() {
                        var dummyStyle = document.createElement('div')[LEXICON.s];
                        var strCalc = 'calc';
                        var i = -1;
                        var prop;

                        for(; i < VENDORS._cssPrefixes[LEXICON.l]; i++) {
                            prop = i < 0 ? strCalc : VENDORS._cssPrefixes[i] + strCalc;
                            dummyStyle.cssText = 'width:' + prop + '(1px);';
                            if (dummyStyle[LEXICON.l])
                                return prop;
                        }
                        return null;
                    })(),
                    restrictedMeasuring : (function() {
                        //https://bugzilla.mozilla.org/show_bug.cgi?id=1439305
                        scrollbarDummyElement.css(strOverflow, strHidden);
                        var scrollSize = {
                            w : scrollbarDummyElement0[LEXICON.sW],
                            h : scrollbarDummyElement0[LEXICON.sH]
                        };
                        scrollbarDummyElement.css(strOverflow, 'visible');
                        var scrollSize2 = {
                            w : scrollbarDummyElement0[LEXICON.sW],
                            h : scrollbarDummyElement0[LEXICON.sH]
                        };
                        return (scrollSize.w - scrollSize2.w) !== 0 || (scrollSize.h - scrollSize2.h) !== 0;
                    })(),
                    rtlScrollBehavior : (function() {
                        scrollbarDummyElement.css({ 'overflow-y' : strHidden, 'overflow-x' : strScroll, 'direction' : 'rtl' }).scrollLeft(0);
                        var dummyContainerOffset = scrollbarDummyElement.offset();
                        var dummyContainerChildOffset = dummyContainerChild.offset();
                        scrollbarDummyElement.scrollLeft(999);
                        var dummyContainerScrollOffsetAfterScroll = dummyContainerChild.offset();
                        return {
                            //origin direction = determines if the zero scroll position is on the left or right side
                            //'i' means 'invert' (i === true means that the axis must be inverted to be correct)
                            //true = on the left side
                            //false = on the right side
                            i : dummyContainerOffset.left === dummyContainerChildOffset.left,
                            //negative = determines if the maximum scroll is positive or negative
                            //'n' means 'negate' (n === true means that the axis must be negated to be correct)
                            //true = negative
                            //false = positive
                            n : dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left === 0
                        };
                    })(),
                    supportTransform : VENDORS._cssProperty('transform') !== null,
                    supportTransition : VENDORS._cssProperty('transition') !== null,
                    supportPassiveEvents : (function() {
                        var supportsPassive = false;
                        try {
                            window.addEventListener('test', null, Object.defineProperty({ }, 'passive', {
                                get: function() {
                                    supportsPassive = true;
                                }
                            }));
                        } catch (e) { }
                        return supportsPassive;
                    })(),
                    supportResizeObserver : !!COMPATIBILITY.rO(),
                    supportMutationObserver : !!COMPATIBILITY.mO()
                });

                scrollbarDummyElement.removeAttr(LEXICON.s).remove();

                //Catch zoom event:
                (function () {
                    if(nativeScrollbarIsOverlaid.x && nativeScrollbarIsOverlaid.y)
                        return;

                    var abs = MATH.abs;
                    var windowWidth = COMPATIBILITY.wW();
                    var windowHeight = COMPATIBILITY.wH();
                    var windowDpr = getWindowDPR();
                    var onResize = function() {
                        if(INSTANCES().length > 0) {
                            var newW = COMPATIBILITY.wW();
                            var newH = COMPATIBILITY.wH();
                            var deltaW = newW - windowWidth;
                            var deltaH = newH - windowHeight;

                            if (deltaW === 0 && deltaH === 0)
                                return;

                            var deltaWRatio = MATH.round(newW / (windowWidth / 100.0));
                            var deltaHRatio = MATH.round(newH / (windowHeight / 100.0));
                            var absDeltaW = abs(deltaW);
                            var absDeltaH = abs(deltaH);
                            var absDeltaWRatio = abs(deltaWRatio);
                            var absDeltaHRatio = abs(deltaHRatio);
                            var newDPR = getWindowDPR();

                            var deltaIsBigger = absDeltaW > 2 && absDeltaH > 2;
                            var difference = !differenceIsBiggerThanOne(absDeltaWRatio, absDeltaHRatio);
                            var dprChanged = newDPR !== windowDpr && windowDpr > 0;
                            var isZoom = deltaIsBigger && difference && dprChanged;
                            var oldScrollbarSize = _base.nativeScrollbarSize;
                            var newScrollbarSize;

                            if (isZoom) {
                                bodyElement.append(scrollbarDummyElement);
                                newScrollbarSize = _base.nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement[0]);
                                scrollbarDummyElement.remove();
                                if(oldScrollbarSize.x !== newScrollbarSize.x || oldScrollbarSize.y !== newScrollbarSize.y) {
                                    FRAMEWORK.each(INSTANCES(), function () {
                                        if(INSTANCES(this))
                                            INSTANCES(this).update('zoom');
                                    });
                                }
                            }

                            windowWidth = newW;
                            windowHeight = newH;
                            windowDpr = newDPR;
                        }
                    };

                    function differenceIsBiggerThanOne(valOne, valTwo) {
                        var absValOne = abs(valOne);
                        var absValTwo = abs(valTwo);
                        return !(absValOne === absValTwo || absValOne + 1 === absValTwo || absValOne - 1 === absValTwo);
                    }

                    function getWindowDPR() {
                        var dDPI = window.screen.deviceXDPI || 0;
                        var sDPI = window.screen.logicalXDPI || 1;
                        return window.devicePixelRatio || (dDPI / sDPI);
                    }

                    FRAMEWORK(window).on('resize', onResize);
                })();

                function calcNativeScrollbarSize(measureElement) {
                    return {
                        x: measureElement[LEXICON.oH] - measureElement[LEXICON.cH],
                        y: measureElement[LEXICON.oW] - measureElement[LEXICON.cW]
                    };
                }
            }

            /**
             * The object which manages the auto update loop for all OverlayScrollbars objects. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
             * @constructor
             */
            function OverlayScrollbarsAutoUpdateLoop(globals) {
                var _base = this;
                var _strAutoUpdate = 'autoUpdate';
                var _strAutoUpdateInterval = _strAutoUpdate + 'Interval';
                var _strLength = LEXICON.l;
                var _loopingInstances = [ ];
                var _loopingInstancesIntervalCache = [ ];
                var _loopIsActive = false;
                var _loopIntervalDefault = 33;
                var _loopInterval = _loopIntervalDefault;
                var _loopTimeOld  = COMPATIBILITY.now();
                var _loopID;

                /**
                 * The auto update loop which will run every 50 milliseconds or less if the update interval of a instance is lower than 50 milliseconds.
                 */
                var loop = function() {
                    if(_loopingInstances[_strLength] > 0 && _loopIsActive) {
                        _loopID = COMPATIBILITY.rAF()(function () {
                            loop();
                        });
                        var timeNew = COMPATIBILITY.now();
                        var timeDelta = timeNew - _loopTimeOld;
                        var lowestInterval;
                        var instance;
                        var instanceOptions;
                        var instanceAutoUpdateAllowed;
                        var instanceAutoUpdateInterval;
                        var now;

                        if (timeDelta > _loopInterval) {
                            _loopTimeOld = timeNew - (timeDelta % _loopInterval);
                            lowestInterval = _loopIntervalDefault;
                            for(var i = 0; i < _loopingInstances[_strLength]; i++) {
                                instance = _loopingInstances[i];
                                if (instance !== undefined) {
                                    instanceOptions = instance.options();
                                    instanceAutoUpdateAllowed = instanceOptions[_strAutoUpdate];
                                    instanceAutoUpdateInterval = MATH.max(1, instanceOptions[_strAutoUpdateInterval]);
                                    now = COMPATIBILITY.now();

                                    if ((instanceAutoUpdateAllowed === true || instanceAutoUpdateAllowed === null) && (now - _loopingInstancesIntervalCache[i]) > instanceAutoUpdateInterval) {
                                        instance.update('auto');
                                        _loopingInstancesIntervalCache[i] = new Date(now += instanceAutoUpdateInterval);
                                    }

                                    lowestInterval = MATH.max(1, MATH.min(lowestInterval, instanceAutoUpdateInterval));
                                }
                            }
                            _loopInterval = lowestInterval;
                        }
                    } else {
                        _loopInterval = _loopIntervalDefault;
                    }
                };

                /**
                 * Add OverlayScrollbars instance to the auto update loop. Only successful if the instance isn't already added.
                 * @param instance The instance which shall be updated in a loop automatically.
                 */
                _base.add = function(instance) {
                    if(FRAMEWORK.inArray(instance, _loopingInstances) === -1) {
                        _loopingInstances.push(instance);
                        _loopingInstancesIntervalCache.push(COMPATIBILITY.now());
                        if (_loopingInstances[_strLength] > 0 && !_loopIsActive) {
                            _loopIsActive = true;
                            globals.autoUpdateLoop = _loopIsActive;
                            loop();
                        }
                    }
                };

                /**
                 * Remove OverlayScrollbars instance from the auto update loop. Only successful if the instance was added before.
                 * @param instance The instance which shall be updated in a loop automatically.
                 */
                _base.remove = function(instance) {
                    var index = FRAMEWORK.inArray(instance, _loopingInstances);
                    if(index > -1) {
                        //remove from loopingInstances list
                        _loopingInstancesIntervalCache.splice(index, 1);
                        _loopingInstances.splice(index, 1);

                        //correct update loop behavior
                        if (_loopingInstances[_strLength] === 0 && _loopIsActive) {
                            _loopIsActive = false;
                            globals.autoUpdateLoop = _loopIsActive;
                            if(_loopID !== undefined) {
                                COMPATIBILITY.cAF()(_loopID);
                                _loopID = -1;
                            }
                        }
                    }
                };
            }

            /**
             * A object which manages the scrollbars visibility of the target element.
             * @param pluginTargetElement The element from which the scrollbars shall be hidden.
             * @param options The custom options.
             * @param extensions The custom extensions.
             * @param globals
             * @param autoUpdateLoop
             * @returns {*}
             * @constructor
             */
            function OverlayScrollbarsInstance(pluginTargetElement, options, extensions, globals, autoUpdateLoop) {
                //if passed element is no HTML element: skip and return
                if(!isHTMLElement(pluginTargetElement))
                    return;

                //if passed element is already initialized: set passed options if there are any and return its instance
                if(INSTANCES(pluginTargetElement)) {
                    var inst = INSTANCES(pluginTargetElement);
                    inst.options(options);
                    return inst;
                }

                //make correct instanceof
                var _base = new window[PLUGINNAME]();
                var _frameworkProto = FRAMEWORK[LEXICON.p];

                //globals:
                var _nativeScrollbarIsOverlaid;
                var _overlayScrollbarDummySize;
                var _rtlScrollBehavior;
                var _autoUpdateRecommended;
                var _msieVersion;
                var _nativeScrollbarStyling;
                var _cssCalc;
                var _nativeScrollbarSize;
                var _supportTransition;
                var _supportTransform;
                var _supportPassiveEvents;
                var _supportResizeObserver;
                var _supportMutationObserver;
                var _restrictedMeasuring;

                //general readonly:
                var _initialized;
                var _destroyed;
                var _isTextarea;
                var _isBody;
                var _documentMixed;
                var _isTextareaHostGenerated;

                //general:
                var _isBorderBox;
                var _sizeAutoObserverAdded;
                var _paddingX;
                var _paddingY;
                var _borderX;
                var _borderY;
                var _marginX;
                var _marginY;
                var _isRTL;
                var _isSleeping;
                var _contentBorderSize = { };
                var _scrollHorizontalInfo = { };
                var _scrollVerticalInfo = { };
                var _viewportSize = { };
                var _nativeScrollbarMinSize = { };

                //naming:
                var _strMinusHidden = '-hidden';
                var _strMarginMinus = 'margin-';
                var _strPaddingMinus = 'padding-';
                var _strBorderMinus = 'border-';
                var _strTop = 'top';
                var _strRight = 'right';
                var _strBottom = 'bottom';
                var _strLeft = 'left';
                var _strMinMinus = 'min-';
                var _strMaxMinus = 'max-';
                var _strWidth = 'width';
                var _strHeight = 'height';
                var _strFloat = 'float';
                var _strEmpty = '';
                var _strAuto = 'auto';
                var _strScroll = 'scroll';
                var _strHundredPercent = '100%';
                var _strX = 'x';
                var _strY = 'y';
                var _strDot = '.';
                var _strSpace = ' ';
                var _strScrollbar = 'scrollbar';
                var _strMinusHorizontal = '-horizontal';
                var _strMinusVertical = '-vertical';
                var _strScrollLeft = _strScroll + 'Left';
                var _strScrollTop = _strScroll + 'Top';
                var _strMouseTouchDownEvent = 'mousedown touchstart';
                var _strMouseTouchUpEvent = 'mouseup touchend touchcancel';
                var _strMouseTouchMoveEvent = 'mousemove touchmove';
                var _strMouseTouchEnter = 'mouseenter';
                var _strMouseTouchLeave = 'mouseleave';
                var _strKeyDownEvent = 'keydown';
                var _strKeyUpEvent = 'keyup';
                var _strSelectStartEvent = 'selectstart';
                var _strTransitionEndEvent = 'transitionend webkitTransitionEnd oTransitionEnd';
                var _strResizeObserverProperty = '__overlayScrollbarsRO__';

                //class names:
                var _cassNamesPrefix = 'os-';
                var _classNameHTMLElement = _cassNamesPrefix + 'html';
                var _classNameHostElement = _cassNamesPrefix + 'host';
                var _classNameHostTextareaElement = _classNameHostElement + '-textarea';
                var _classNameHostScrollbarHorizontalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusHorizontal + _strMinusHidden;
                var _classNameHostScrollbarVerticalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusVertical + _strMinusHidden;
                var _classNameHostTransition = _classNameHostElement + '-transition';
                var _classNameHostRTL = _classNameHostElement + '-rtl';
                var _classNameHostResizeDisabled = _classNameHostElement + '-resize-disabled';
                var _classNameHostScrolling = _classNameHostElement + '-scrolling';
                var _classNameHostOverflow = _classNameHostElement + '-overflow';
                var _classNameHostOverflowX = _classNameHostOverflow + '-x';
                var _classNameHostOverflowY = _classNameHostOverflow + '-y';
                var _classNameTextareaElement = _cassNamesPrefix + 'textarea';
                var _classNameTextareaCoverElement = _classNameTextareaElement + '-cover';
                var _classNamePaddingElement = _cassNamesPrefix + 'padding';
                var _classNameViewportElement = _cassNamesPrefix + 'viewport';
                var _classNameViewportNativeScrollbarsInvisible = _classNameViewportElement + '-native-scrollbars-invisible';
                var _classNameViewportNativeScrollbarsOverlaid = _classNameViewportElement + '-native-scrollbars-overlaid';
                var _classNameContentElement = _cassNamesPrefix + 'content';
                var _classNameContentArrangeElement = _cassNamesPrefix + 'content-arrange';
                var _classNameContentGlueElement = _cassNamesPrefix + 'content-glue';
                var _classNameSizeAutoObserverElement = _cassNamesPrefix + 'size-auto-observer';
                var _classNameResizeObserverElement = _cassNamesPrefix + 'resize-observer';
                var _classNameResizeObserverItemElement = _cassNamesPrefix + 'resize-observer-item';
                var _classNameResizeObserverItemFinalElement = _classNameResizeObserverItemElement + '-final';
                var _classNameTextInherit = _cassNamesPrefix + 'text-inherit';
                var _classNameScrollbar = _cassNamesPrefix + _strScrollbar;
                var _classNameScrollbarTrack = _classNameScrollbar + '-track';
                var _classNameScrollbarTrackOff = _classNameScrollbarTrack + '-off';
                var _classNameScrollbarHandle = _classNameScrollbar + '-handle';
                var _classNameScrollbarHandleOff = _classNameScrollbarHandle + '-off';
                var _classNameScrollbarUnusable = _classNameScrollbar + '-unusable';
                var _classNameScrollbarAutoHidden = _classNameScrollbar + '-' + _strAuto + _strMinusHidden;
                var _classNameScrollbarCorner = _classNameScrollbar + '-corner';
                var _classNameScrollbarCornerResize = _classNameScrollbarCorner + '-resize';
                var _classNameScrollbarCornerResizeB = _classNameScrollbarCornerResize + '-both';
                var _classNameScrollbarCornerResizeH = _classNameScrollbarCornerResize + _strMinusHorizontal;
                var _classNameScrollbarCornerResizeV = _classNameScrollbarCornerResize + _strMinusVertical;
                var _classNameScrollbarHorizontal = _classNameScrollbar + _strMinusHorizontal;
                var _classNameScrollbarVertical = _classNameScrollbar + _strMinusVertical;
                var _classNameDragging = _cassNamesPrefix + 'dragging';
                var _classNameThemeNone = _cassNamesPrefix + 'theme-none';

                //callbacks:
                var _callbacksInitQeueue = [ ];

                //options:
                var _defaultOptions;
                var _currentOptions;
                var _currentPreparedOptions;

                //extensions:
                var _extensions = { };
                var _extensionsPrivateMethods = "added removed on contract";

                //update
                var _lastUpdateTime;
                var _swallowedUpdateParams = { };
                var _swallowedUpdateTimeout;
                var _swallowUpdateLag = 42;
                var _imgs = [ ];

                //DOM elements:
                var _windowElement;
                var _documentElement;
                var _htmlElement;
                var _bodyElement;
                var _targetElement;                     //the target element of this OverlayScrollbars object
                var _hostElement;                       //the host element of this OverlayScrollbars object -> may be the same as targetElement
                var _sizeAutoObserverElement;           //observes size auto changes
                var _sizeObserverElement;               //observes size and padding changes
                var _paddingElement;                    //manages the padding
                var _viewportElement;                   //is the viewport of our scrollbar model
                var _contentElement;                    //the element which holds the content
                var _contentArrangeElement;             //is needed for correct sizing of the content element (only if native scrollbars are overlays)
                var _contentGlueElement;                //has always the size of the content element
                var _textareaCoverElement;              //only applied if target is a textarea element. Used for correct size calculation and for prevention of uncontrolled scrolling
                var _scrollbarCornerElement;
                var _scrollbarHorizontalElement;
                var _scrollbarHorizontalTrackElement;
                var _scrollbarHorizontalHandleElement;
                var _scrollbarVerticalElement;
                var _scrollbarVerticalTrackElement;
                var _scrollbarVerticalHandleElement;
                var _windowElementNative;
                var _documentElementNative;
                var _targetElementNative;
                var _hostElementNative;
                var _sizeAutoObserverElementNative;
                var _sizeObserverElementNative;
                var _paddingElementNative;
                var _viewportElementNative;
                var _contentElementNative;

                //Cache:
                var _hostSizeCache;
                var _contentScrollSizeCache;
                var _arrangeContentSizeCache;
                var _hasOverflowCache;
                var _hideOverflowCache;
                var _widthAutoCache;
                var _heightAutoCache;
                var _cssMaxValueCache;
                var _cssBoxSizingCache;
                var _cssPaddingCache;
                var _cssBorderCache;
                var _cssMarginCache;
                var _cssDirectionCache;
                var _cssDirectionDetectedCache;
                var _paddingAbsoluteCache;
                var _clipAlwaysCache;
                var _contentGlueSizeCache;
                var _overflowBehaviorCache;
                var _overflowAmountCache;
                var _ignoreOverlayScrollbarHidingCache;
                var _autoUpdateCache;
                var _sizeAutoCapableCache;
                var _textareaAutoWrappingCache;
                var _textareaInfoCache;
                var _updateAutoHostElementIdCache;
                var _updateAutoHostElementClassCache;
                var _updateAutoHostElementStyleCache;
                var _updateAutoHostElementVisibleCache;
                var _updateAutoTargetElementRowsCache;
                var _updateAutoTargetElementColsCache;
                var _updateAutoTargetElementWrapCache;
                var _contentElementScrollSizeChangeDetectedCache;
                var _hostElementSizeChangeDetectedCache;
                var _scrollbarsVisibilityCache;
                var _scrollbarsAutoHideCache;
                var _scrollbarsClickScrollingCache;
                var _scrollbarsDragScrollingCache;
                var _resizeCache;
                var _normalizeRTLCache;
                var _classNameCache;
                var _oldClassName;
                var _textareaDynHeightCache;
                var _textareaDynWidthCache;
                var _bodyMinSizeCache;
                var _viewportScrollSizeCache;
                var _displayIsHiddenCache;

                //MutationObserver:
                var _mutationObserverHost;
                var _mutationObserverContent;
                var _mutationObserversConnected;

                //textarea:
                var _textareaEvents;
                var _textareaHasFocus;

                //scrollbars:
                var _scrollbarsAutoHideTimeoutId;
                var _scrollbarsAutoHideMoveTimeoutId;
                var _scrollbarsAutoHideDelay;
                var _scrollbarsAutoHideNever;
                var _scrollbarsAutoHideScroll;
                var _scrollbarsAutoHideMove;
                var _scrollbarsAutoHideLeave;
                var _scrollbarsHandleHovered;
                var _scrollbarsHandleAsync;

                //resize
                var _resizeReconnectMutationObserver;
                var _resizeNone;
                var _resizeBoth;
                var _resizeHorizontal;
                var _resizeVertical;
                var _resizeOnMouseTouchDown;


                //==== Passive Event Listener ====//

                /**
                 * Adds a passive event listener to the given element.
                 * @param element The element to which the event listener shall be applied.
                 * @param eventNames The name(s) of the event listener.
                 * @param listener The listener method which shall be called.
                 */
                function addPassiveEventListener(element, eventNames, listener) {
                    var events = eventNames.split(_strSpace);
                    for (var i = 0; i < events.length; i++)
                        element[0].addEventListener(events[i], listener, {passive: true});
                }

                /**
                 * Removes a passive event listener to the given element.
                 * @param element The element from which the event listener shall be removed.
                 * @param eventNames The name(s) of the event listener.
                 * @param listener The listener method which shall be removed.
                 */
                function removePassiveEventListener(element, eventNames, listener) {
                    var events = eventNames.split(_strSpace);
                    for (var i = 0; i < events.length; i++)
                        element[0].removeEventListener(events[i], listener, {passive: true});
                }


                //==== Resize Observer ====//

                /**
                 * Adds a resize observer to the given element.
                 * @param targetElement The element to which the resize observer shall be applied.
                 * @param onElementResizedCallback The callback which is fired every time the resize observer registers a size change.
                 */
                function addResizeObserver(targetElement, onElementResizedCallback) {
                    var constMaximum = 3333333;
                    var resizeObserver = COMPATIBILITY.rO();
                    var strAnimationStartEvent = 'animationstart mozAnimationStart webkitAnimationStart MSAnimationStart';
                    var strChildNodes = 'childNodes';
                    var callback = function () {
                        targetElement[_strScrollTop](constMaximum)[_strScrollLeft](_isRTL ? _rtlScrollBehavior.n ? -constMaximum : _rtlScrollBehavior.i ? 0 : constMaximum : constMaximum);
                        onElementResizedCallback();
                    };
                    if (_supportResizeObserver) {
                        var element = targetElement.append(generateDiv(_classNameResizeObserverElement + ' observed')).contents()[0];
                        var observer = element[_strResizeObserverProperty] = new resizeObserver(callback);
                        observer.observe(element);
                    }
                    else {
                        if (_msieVersion > 9 || !_autoUpdateRecommended) {
                            targetElement.prepend(
                                generateDiv(_classNameResizeObserverElement,
                                    generateDiv({ className : _classNameResizeObserverItemElement, dir : "ltr" },
                                        generateDiv(_classNameResizeObserverItemElement,
                                            generateDiv(_classNameResizeObserverItemFinalElement)
                                        ) +
                                        generateDiv(_classNameResizeObserverItemElement,
                                            generateDiv({ className : _classNameResizeObserverItemFinalElement, style : 'width: 200%; height: 200%' })
                                        )
                                    )
                                )
                            );

                            var observerElement = targetElement[0][strChildNodes][0][strChildNodes][0];
                            var shrinkElement = FRAMEWORK(observerElement[strChildNodes][1]);
                            var expandElement = FRAMEWORK(observerElement[strChildNodes][0]);
                            var expandElementChild = FRAMEWORK(expandElement[0][strChildNodes][0]);
                            var widthCache = observerElement[LEXICON.oW];
                            var heightCache = observerElement[LEXICON.oH];
                            var isDirty;
                            var rAFId;
                            var currWidth;
                            var currHeight;
                            var factor = 2;
                            var nativeScrollbarSize = globals.nativeScrollbarSize; //care don't make changes to this object!!!
                            var reset = function () {
                                /*
                                 var sizeResetWidth = observerElement[LEXICON.oW] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                                 var sizeResetHeight = observerElement[LEXICON.oH] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                                 var expandChildCSS = {};
                                 expandChildCSS[_strWidth] = sizeResetWidth;
                                 expandChildCSS[_strHeight] = sizeResetHeight;
                                 expandElementChild.css(expandChildCSS);


                                 expandElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                                 shrinkElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                                 */
                                expandElement[_strScrollLeft](constMaximum)[_strScrollTop](constMaximum);
                                shrinkElement[_strScrollLeft](constMaximum)[_strScrollTop](constMaximum);
                            };
                            var onResized = function () {
                                rAFId = 0;
                                if (!isDirty)
                                    return;

                                widthCache = currWidth;
                                heightCache = currHeight;
                                callback();
                            };
                            var onScroll = function (event) {
                                currWidth = observerElement[LEXICON.oW];
                                currHeight = observerElement[LEXICON.oH];
                                isDirty = currWidth != widthCache || currHeight != heightCache;

                                if (event && isDirty && !rAFId) {
                                    COMPATIBILITY.cAF()(rAFId);
                                    rAFId = COMPATIBILITY.rAF()(onResized);
                                }
                                else if(!event)
                                    onResized();

                                reset();
                                if (event) {
                                    COMPATIBILITY.prvD(event);
                                    COMPATIBILITY.stpP(event);
                                }
                                return false;
                            };
                            var expandChildCSS = {};
                            var observerElementCSS = {};

                            setTopRightBottomLeft(observerElementCSS, _strEmpty, [
                                -((nativeScrollbarSize.y + 1) * factor),
                                nativeScrollbarSize.x * -factor,
                                nativeScrollbarSize.y * -factor,
                                -((nativeScrollbarSize.x + 1) * factor)
                            ]);

                            FRAMEWORK(observerElement).css(observerElementCSS);
                            expandElement.on(_strScroll, onScroll);
                            shrinkElement.on(_strScroll, onScroll);
                            targetElement.on(strAnimationStartEvent, function () {
                                onScroll(false);
                            });
                            //lets assume that the divs will never be that large and a constant value is enough
                            expandChildCSS[_strWidth] = constMaximum;
                            expandChildCSS[_strHeight] = constMaximum;
                            expandElementChild.css(expandChildCSS);

                            reset();
                        }
                        else {
                            var attachEvent = _documentElementNative.attachEvent;
                            var isIE = _msieVersion !== undefined;
                            if (attachEvent) {
                                targetElement.prepend(generateDiv(_classNameResizeObserverElement));
                                findFirst(targetElement, _strDot + _classNameResizeObserverElement)[0].attachEvent('onresize', callback);
                            }
                            else {
                                var obj = _documentElementNative.createElement(TYPES.o);
                                obj.setAttribute('tabindex', '-1');
                                obj.setAttribute(LEXICON.c, _classNameResizeObserverElement);
                                obj.onload = function () {
                                    var wnd = this.contentDocument.defaultView;
                                    wnd.addEventListener('resize', callback);
                                    wnd.document.documentElement.style.display = 'none';
                                };
                                obj.type = 'text/html';
                                if (isIE)
                                    targetElement.prepend(obj);
                                obj.data = 'about:blank';
                                if (!isIE)
                                    targetElement.prepend(obj);
                                targetElement.on(strAnimationStartEvent, callback);
                            }
                        }
                    }

                    //direction change detection:
                    if (targetElement[0] === _sizeObserverElementNative) {
                        var directionChanged = function () {
                            var dir = _hostElement.css('direction');
                            var css = {};
                            var scrollLeftValue = 0;
                            var result = false;
                            if (dir !== _cssDirectionDetectedCache) {
                                if (dir === 'ltr') {
                                    css[_strLeft] = 0;
                                    css[_strRight] = _strAuto;
                                    scrollLeftValue = constMaximum;
                                }
                                else {
                                    css[_strLeft] = _strAuto;
                                    css[_strRight] = 0;
                                    scrollLeftValue = _rtlScrollBehavior.n ? -constMaximum : _rtlScrollBehavior.i ? 0 : constMaximum;
                                }
                                _sizeObserverElement.children().eq(0).css(css);
                                targetElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constMaximum);
                                _cssDirectionDetectedCache = dir;
                                result = true;
                            }
                            return result;
                        };
                        directionChanged();
                        targetElement.on(_strScroll, function (event) {
                            if (directionChanged())
                                update();
                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                            return false;
                        });
                    }
                }

                /**
                 * Removes a resize observer from the given element.
                 * @param targetElement The element to which the target resize observer is applied.
                 */
                function removeResizeObserver(targetElement) {
                    if (_supportResizeObserver) {
                        var element = targetElement.contents()[0];
                        element[_strResizeObserverProperty].disconnect();
                        delete element[_strResizeObserverProperty];
                    }
                    else {
                        remove(targetElement.children(_strDot + _classNameResizeObserverElement).eq(0));
                    }
                }

                /**
                 * Freezes the given resize observer.
                 * @param targetElement The element to which the target resize observer is applied.
                 */
                function freezeResizeObserver(targetElement) {
                    if (targetElement !== undefined) {
                        /*
                        if (_supportResizeObserver) {
                            var element = targetElement.contents()[0];
                            element[_strResizeObserverProperty].unobserve(element);
                        }
                        else {
                            targetElement = targetElement.children(_strDot + _classNameResizeObserverElement).eq(0);
                            var w = targetElement.css(_strWidth);
                            var h = targetElement.css(_strHeight);
                            var css = {};
                            css[_strWidth] = w;
                            css[_strHeight] = h;
                            targetElement.css(css);
                        }
                        */
                    }
                }

                /**
                 * Unfreezes the given resize observer.
                 * @param targetElement The element to which the target resize observer is applied.
                 */
                function unfreezeResizeObserver(targetElement) {
                    if (targetElement !== undefined) {
                        /*
                        if (_supportResizeObserver) {
                            var element = targetElement.contents()[0];
                            element[_strResizeObserverProperty].observe(element);
                        }
                        else {
                            var css = { };
                            css[_strHeight] = _strEmpty;
                            css[_strWidth] = _strEmpty;
                            targetElement.children(_strDot + _classNameResizeObserverElement).eq(0).css(css);
                        }
                        */
                    }
                }


                //==== Mutation Observers ====//

                /**
                 * Creates MutationObservers for the host and content Element if they are supported.
                 */
                function createMutationObservers() {
                    if (_supportMutationObserver) {
                        var mutationObserverContentLag = 11;
                        var mutationObserver = COMPATIBILITY.mO();
                        var contentLastUpdate = COMPATIBILITY.now();
                        var mutationTarget;
                        var mutationAttrName;
                        var contentTimeout;
                        var now;
                        var sizeAuto;
                        var action;

                        _mutationObserverHost = new mutationObserver(function (mutations) {
                            if (!_initialized || _isSleeping)
                                return;

                            var doUpdate = false;
                            var mutation;
                            FRAMEWORK.each(mutations, function () {
                                mutation = this;
                                mutationTarget = mutation.target;
                                mutationAttrName = mutation.attributeName;

                                if (mutationAttrName === LEXICON.c)
                                    doUpdate = hostClassNamesChanged(mutation.oldValue, mutationTarget.className);
                                else if (mutationAttrName === LEXICON.s)
                                    doUpdate = mutation.oldValue !== mutationTarget[LEXICON.s].cssText;
                                else
                                    doUpdate = true;

                                if (doUpdate)
                                    return false;
                            });

                            if (doUpdate)
                                _base.update(_strAuto);
                        });
                        _mutationObserverContent = new mutationObserver(function (mutations) {
                            if (!_initialized || _isSleeping)
                                return;

                            var doUpdate = false;
                            var mutation;
                            FRAMEWORK.each(mutations, function () {
                                mutation = this;
                                doUpdate = isUnknownMutation(mutation);
                                return !doUpdate;
                            });

                            if (doUpdate) {
                                now = COMPATIBILITY.now();
                                sizeAuto = (_heightAutoCache || _widthAutoCache);
                                action = function () {
                                    if(!_destroyed) {
                                        contentLastUpdate = now;

                                        //if cols, rows or wrap attr was changed
                                        if (_isTextarea)
                                            textareaUpdate();

                                        if (sizeAuto)
                                            update();
                                        else
                                            _base.update(_strAuto);
                                    }
                                };
                                clearTimeout(contentTimeout);
                                if (mutationObserverContentLag <= 0 || now - contentLastUpdate > mutationObserverContentLag || !sizeAuto)
                                    action();
                                else
                                    contentTimeout = setTimeout(action, mutationObserverContentLag);
                            }
                        });
                    }
                }

                /**
                 * Connects the MutationObservers if they are supported.
                 */
                function connectMutationObservers() {
                    if (_supportMutationObserver && !_mutationObserversConnected) {
                        _mutationObserverHost.observe(_hostElementNative, {
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: [LEXICON.i, LEXICON.c, LEXICON.s]
                        });

                        _mutationObserverContent.observe(_isTextarea ? _targetElementNative : _contentElementNative, {
                            attributes: true,
                            attributeOldValue: true,
                            subtree: !_isTextarea,
                            childList: !_isTextarea,
                            characterData: !_isTextarea,
                            attributeFilter: _isTextarea ? ['wrap', 'cols', 'rows'] : [LEXICON.i, LEXICON.c, LEXICON.s]
                        });

                        _mutationObserversConnected = true;
                    }
                }

                /**
                 * Disconnects the MutationObservers if they are supported.
                 */
                function disconnectMutationObservers() {
                    if (_supportMutationObserver && _mutationObserversConnected) {
                        _mutationObserverHost.disconnect();
                        _mutationObserverContent.disconnect();

                        _mutationObserversConnected = false;
                    }
                }


                //==== Events of elements ====//

                /**
                 * This method gets called every time the host element gets resized. IMPORTANT: Padding changes are detected too!!
                 * It refreshes the hostResizedEventArgs and the hostSizeResizeCache.
                 * If there are any size changes, the update method gets called.
                 */
                function hostOnResized() {
                    if (_isSleeping)
                        return;

                    var changed;
                    var hostSize = {
                        w: _sizeObserverElementNative[LEXICON.sW],
                        h: _sizeObserverElementNative[LEXICON.sH]
                    };

                    if (_initialized) {
                        changed = checkCacheDouble(hostSize, _hostElementSizeChangeDetectedCache);
                        _hostElementSizeChangeDetectedCache = hostSize;
                        if (changed)
                            update(true, false);
                    }
                    else {
                        _hostElementSizeChangeDetectedCache = hostSize;
                    }
                }

                /**
                 * The mouse enter event of the host element. This event is only needed for the autoHide feature.
                 */
                function hostOnMouseEnter() {
                    if (_scrollbarsAutoHideLeave)
                        refreshScrollbarsAutoHide(true);
                }

                /**
                 * The mouse leave event of the host element. This event is only needed for the autoHide feature.
                 */
                function hostOnMouseLeave() {
                    if (_scrollbarsAutoHideLeave && !_bodyElement.hasClass(_classNameDragging))
                        refreshScrollbarsAutoHide(false);
                }

                /**
                 * The mouse move event of the host element. This event is only needed for the autoHide "move" feature.
                 */
                function hostOnMouseMove() {
                    if (_scrollbarsAutoHideMove) {
                        refreshScrollbarsAutoHide(true);
                        clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
                        _scrollbarsAutoHideMoveTimeoutId = setTimeout(function () {
                            if (_scrollbarsAutoHideMove && !_destroyed)
                                refreshScrollbarsAutoHide(false);
                        }, 100);
                    }
                }

                 /**
                 * Adds or removes mouse & touch events of the host element. (for handling auto-hiding of the scrollbars)
                 * @param destroy Indicates whether the events shall be added or removed.
                 */
                function setupHostMouseTouchEvents(destroy) {
                    var passiveEvent = destroy ? removePassiveEventListener : addPassiveEventListener;
                    var strOnOff = destroy ? 'off' : 'on';
                    var setupEvent = function(target, name, listener) {
                        if(_supportPassiveEvents)
                            passiveEvent(target, name, listener);
                        else
                            target[strOnOff](name, listener);
                    };

                    if(_scrollbarsAutoHideMove && !destroy)
                        setupEvent(_hostElement, _strMouseTouchMoveEvent, hostOnMouseMove);
                    else {
                        if(destroy)
                            setupEvent(_hostElement, _strMouseTouchMoveEvent, hostOnMouseMove);
                        setupEvent(_hostElement, _strMouseTouchEnter, hostOnMouseEnter);
                        setupEvent(_hostElement, _strMouseTouchLeave, hostOnMouseLeave);
                    }

                    //if the plugin is initialized and the mouse is over the host element, make the scrollbars visible
                    if(!_initialized && !destroy)
                        _hostElement.one("mouseover", hostOnMouseEnter);
                }

                /**
                 * Prevents text from deselection if attached to the document element on the mousedown event of a DOM element.
                 * @param event The select start event.
                 */
                function documentOnSelectStart(event) {
                    COMPATIBILITY.prvD(event);
                    return false;
                }

                /**
                 * A callback which will be called after a img element has downloaded its src asynchronous.
                 */
                function imgOnLoad() {
                    update(false, true);
                }


                //==== Update Detection ====//

                /**
                 * Measures the min width and min height of the body element and refreshes the related cache.
                 * @returns {boolean} True if the min width or min height has changed, false otherwise.
                 */
                function bodyMinSizeChanged() {
                    var bodyMinSize = {};
                    if (_isBody && _contentArrangeElement) {
                        bodyMinSize.w = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strWidth));
                        bodyMinSize.h = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strHeight));
                        bodyMinSize.c = checkCacheDouble(bodyMinSize, _bodyMinSizeCache);
                        bodyMinSize.f = true; //flag for "measured at least once"
                    }
                    _bodyMinSizeCache = bodyMinSize;
                    return bodyMinSize.c || false;
                }

                /**
                 * Returns true if the class names really changed (new class without plugin host prefix)
                 * @param oldCassNames The old ClassName string.
                 * @param newClassNames The new ClassName string.
                 * @returns {boolean} True if the class names has really changed, false otherwise.
                 */
                function hostClassNamesChanged(oldCassNames, newClassNames) {
                    var currClasses = (newClassNames !== undefined && newClassNames !== null) ? newClassNames.split(_strSpace) : _strEmpty;
                    var oldClasses = (oldCassNames !== undefined && oldCassNames !== null) ? oldCassNames.split(_strSpace) : _strEmpty;
                    if (currClasses === _strEmpty && oldClasses === _strEmpty)
                        return false;
                    var diff = getArrayDifferences(oldClasses, currClasses);
                    var changed = false;
                    var oldClassNames = _oldClassName !== undefined && _oldClassName !== null ? _oldClassName.split(_strSpace) : [_strEmpty];
                    var currClassNames = _classNameCache !== undefined && _classNameCache !== null ? _classNameCache.split(_strSpace) : [_strEmpty];

                    //remove none theme from diff list to prevent update
                    var idx = FRAMEWORK.inArray(_classNameThemeNone, diff);
                    var curr;
                    var i;
                    var v;
                    var o;
                    var c;

                    if (idx > -1)
                        diff.splice(idx, 1);

                    for (i = 0; i < diff.length; i++) {
                        curr = diff[i];
                        if (curr.indexOf(_classNameHostElement) !== 0) {
                            o = true;
                            c = true;
                            for (v = 0; v < oldClassNames.length; v++) {
                                if (curr === oldClassNames[v]) {
                                    o = false;
                                    break;
                                }
                            }
                            for (v = 0; v < currClassNames.length; v++) {
                                if (curr === currClassNames[v]) {
                                    c = false;
                                    break;
                                }
                            }
                            if (o && c) {
                                changed = true;
                                break;
                            }
                        }

                    }
                    return changed;
                }

                /**
                 * Returns true if the given mutation is not from a from the plugin generated element. If the target element is a textarea the mutation is always unknown.
                 * @param mutation The mutation which shall be checked.
                 * @returns {boolean} True if the mutation is from a unknown element, false otherwise.
                 */
                function isUnknownMutation(mutation) {
                    var attributeName = mutation.attributeName;
                    var mutationTarget = mutation.target;
                    var mutationType = mutation.type;
                    var strClosest = 'closest';

                    if (mutationTarget === _contentElementNative)
                        return attributeName === null;
                    if (mutationType === 'attributes' && (attributeName === LEXICON.c || attributeName === LEXICON.s) && !_isTextarea) {
                        //ignore className changes by the plugin
                        if (attributeName === LEXICON.c && FRAMEWORK(mutationTarget).hasClass(_classNameHostElement))
                            return hostClassNamesChanged(mutation.oldValue, mutationTarget.getAttribute(LEXICON.c));

                        //only do it of browser support it natively
                        if (typeof mutationTarget[strClosest] != TYPES.f)
                            return true;
                        if (mutationTarget[strClosest](_strDot + _classNameResizeObserverElement) !== null ||
                            mutationTarget[strClosest](_strDot + _classNameScrollbar) !== null ||
                            mutationTarget[strClosest](_strDot + _classNameScrollbarCorner) !== null)
                            return false;
                    }
                    return true;
                }

                /**
                 * Returns true if the content size was changed since the last time this method was called.
                 * @returns {boolean} True if the content size was changed, false otherwise.
                 */
                function updateAutoContentSizeChanged() {
                    if (_isSleeping)
                        return false;

                    var float;
                    var textareaValueLength = _isTextarea && _widthAutoCache && !_textareaAutoWrappingCache ? _targetElement.val().length : 0;
                    var setCSS = !_mutationObserversConnected && _widthAutoCache && !_isTextarea;
                    var viewportScrollSize = { };
                    var css = { };
                    var bodyMinSizeC;
                    var changed;
                    var viewportScrollSizeChanged;

                    //fix for https://bugzilla.mozilla.org/show_bug.cgi?id=1439305, it only works with "clipAlways : true"
                    //it can work with "clipAlways : false" too, but we had to set the overflow of the viewportElement to hidden every time before measuring
                    if(_restrictedMeasuring) {
                        viewportScrollSize = {
                            x : _viewportElementNative[LEXICON.sW],
                            y : _viewportElementNative[LEXICON.sH]
                        }
                    }
                    if (setCSS) {
                        float = _contentElement.css(_strFloat);
                        css[_strFloat] = _isRTL ? _strRight : _strLeft;
                        css[_strWidth] = _strAuto;
                        _contentElement.css(css);
                    }
                    var contentElementScrollSize = {
                        w: getContentMeasureElement()[LEXICON.sW] + textareaValueLength,
                        h: getContentMeasureElement()[LEXICON.sH] + textareaValueLength
                    };
                    if (setCSS) {
                        css[_strFloat] = float;
                        css[_strWidth] = _strHundredPercent;
                        _contentElement.css(css);
                    }

                    bodyMinSizeC = bodyMinSizeChanged();
                    changed = checkCacheDouble(contentElementScrollSize, _contentElementScrollSizeChangeDetectedCache);
                    viewportScrollSizeChanged = checkCacheDouble(viewportScrollSize, _viewportScrollSizeCache, _strX, _strY);

                    _contentElementScrollSizeChangeDetectedCache = contentElementScrollSize;
                    _viewportScrollSizeCache = viewportScrollSize;

                    return changed || bodyMinSizeC || viewportScrollSizeChanged;
                }

                /**
                 * Returns true if the host element attributes (id, class, style) was changed since the last time this method was called.
                 * @returns {boolean}
                 */
                function meaningfulAttrsChanged() {
                    if (_isSleeping || _mutationObserversConnected)
                        return false;

                    var hostElementId = _hostElement.attr(LEXICON.i) || _strEmpty;
                    var hostElementIdChanged = checkCacheSingle(hostElementId, _updateAutoHostElementIdCache);
                    var hostElementClass = _hostElement.attr(LEXICON.c) || _strEmpty;
                    var hostElementClassChanged = checkCacheSingle(hostElementClass, _updateAutoHostElementClassCache);
                    var hostElementStyle = _hostElement.attr(LEXICON.s) || _strEmpty;
                    var hostElementStyleChanged = checkCacheSingle(hostElementStyle, _updateAutoHostElementStyleCache);
                    var hostElementVisible = _hostElement.is(':visible') || _strEmpty;
                    var hostElementVisibleChanged = checkCacheSingle(hostElementVisible, _updateAutoHostElementVisibleCache);
                    var targetElementRows = _isTextarea ? (_targetElement.attr('rows') || _strEmpty) : _strEmpty;
                    var targetElementRowsChanged = checkCacheSingle(targetElementRows, _updateAutoTargetElementRowsCache);
                    var targetElementCols = _isTextarea ? (_targetElement.attr('cols') || _strEmpty) : _strEmpty;
                    var targetElementColsChanged = checkCacheSingle(targetElementCols, _updateAutoTargetElementColsCache);
                    var targetElementWrap = _isTextarea ? (_targetElement.attr('wrap') || _strEmpty) : _strEmpty;
                    var targetElementWrapChanged = checkCacheSingle(targetElementWrap, _updateAutoTargetElementWrapCache);

                    _updateAutoHostElementIdCache = hostElementId;
                    if (hostElementClassChanged)
                        hostElementClassChanged = hostClassNamesChanged(_updateAutoHostElementClassCache, hostElementClass);
                    _updateAutoHostElementClassCache = hostElementClass;
                    _updateAutoHostElementStyleCache = hostElementStyle;
                    _updateAutoHostElementVisibleCache = hostElementVisible;
                    _updateAutoTargetElementRowsCache = targetElementRows;
                    _updateAutoTargetElementColsCache = targetElementCols;
                    _updateAutoTargetElementWrapCache = targetElementWrap;

                    return hostElementIdChanged || hostElementClassChanged || hostElementStyleChanged || hostElementVisibleChanged || targetElementRowsChanged || targetElementColsChanged || targetElementWrapChanged;
                }

                /**
                 * Checks is a CSS Property of a child element is affecting the scroll size of the content.
                 * @param propertyName The CSS property name.
                 * @returns {boolean} True if the property is affecting the content scroll size, false otherwise.
                 */
                function isSizeAffectingCSSProperty(propertyName) {
                    if (!_initialized)
                        return true;
                    var flexGrow = 'flex-grow';
                    var flexShrink = 'flex-shrink';
                    var flexBasis = 'flex-basis';
                    var affectingPropsX = [
                        _strWidth,
                        _strMinMinus + _strWidth,
                        _strMaxMinus + _strWidth,
                        _strMarginMinus + _strLeft,
                        _strMarginMinus + _strRight,
                        _strLeft,
                        _strRight,
                        'font-weight',
                        'word-spacing',
                        flexGrow,
                        flexShrink,
                        flexBasis
                    ];
                    var affectingPropsXContentBox = [
                        _strPaddingMinus + _strLeft,
                        _strPaddingMinus + _strRight,
                        _strBorderMinus + _strLeft + _strWidth,
                        _strBorderMinus + _strRight + _strWidth
                    ];
                    var affectingPropsY = [
                        _strHeight,
                        _strMinMinus + _strHeight,
                        _strMaxMinus + _strHeight,
                        _strMarginMinus + _strTop,
                        _strMarginMinus + _strBottom,
                        _strTop,
                        _strBottom,
                        'line-height',
                        flexGrow,
                        flexShrink,
                        flexBasis
                    ];
                    var affectingPropsYContentBox = [
                        _strPaddingMinus + _strTop,
                        _strPaddingMinus + _strBottom,
                        _strBorderMinus + _strTop + _strWidth,
                        _strBorderMinus + _strBottom + _strWidth
                    ];
                    var _strS = 's';
                    var _strVS = 'v-s';
                    var checkX = _overflowBehaviorCache.x === _strS || _overflowBehaviorCache.x === _strVS;
                    var checkY = _overflowBehaviorCache.y === _strS || _overflowBehaviorCache.y === _strVS;
                    var sizeIsAffected = false;
                    var checkPropertyName = function (arr, name) {
                        for (var i = 0; i < arr[LEXICON.l]; i++) {
                            if (arr[i] === name)
                                return true;
                        }
                        return false;
                    };

                    if (checkY) {
                        sizeIsAffected = checkPropertyName(affectingPropsY, propertyName);
                        if (!sizeIsAffected && !_isBorderBox)
                            sizeIsAffected = checkPropertyName(affectingPropsYContentBox, propertyName);
                    }
                    if (checkX && !sizeIsAffected) {
                        sizeIsAffected = checkPropertyName(affectingPropsX, propertyName);
                        if (!sizeIsAffected && !_isBorderBox)
                            sizeIsAffected = checkPropertyName(affectingPropsXContentBox, propertyName);
                    }
                    return sizeIsAffected;
                }


                //==== Update ====//

                /**
                 * Updates the variables and size of the textarea element, and manages the scroll on new line or new character.
                 */
                function textareaUpdate() {
                    if (_isSleeping)
                        return;

                    var wrapAttrOff = !_textareaAutoWrappingCache;
                    var minWidth = _viewportSize.w /* - (!_isBorderBox && !_paddingAbsoluteCache && _widthAutoCache ? _paddingY + _borderY : 0) */;
                    var minHeight = _viewportSize.h /* - (!_isBorderBox && !_paddingAbsoluteCache && _heightAutoCache ? _paddingY + _borderY : 0) */;
                    var css = { };
                    var doMeasure = _widthAutoCache || wrapAttrOff;
                    var origWidth;
                    var width;
                    var origHeight;
                    var height;

                    //reset min size
                    css[_strMinMinus + _strWidth] = _strEmpty;
                    css[_strMinMinus + _strHeight] = _strEmpty;

                    //set width auto
                    css[_strWidth] = _strAuto;
                    _targetElement.css(css);

                    //measure width
                    origWidth = _targetElementNative[LEXICON.oW];
                    width = doMeasure ? MATH.max(origWidth, _targetElementNative[LEXICON.sW] - 1) : 1;
                    /*width += (_widthAutoCache ? _marginX + (!_isBorderBox ? wrapAttrOff ? 0 : _paddingX + _borderX : 0) : 0);*/

                    //set measured width
                    css[_strWidth] = _widthAutoCache ? _strAuto /*width*/ : _strHundredPercent;
                    css[_strMinMinus + _strWidth] = _strHundredPercent;

                    //set height auto
                    css[_strHeight] = _strAuto;
                    _targetElement.css(css);

                    //measure height
                    origHeight = _targetElementNative[LEXICON.oH];
                    height = MATH.max(origHeight, _targetElementNative[LEXICON.sH] - 1);

                    //append correct size values
                    css[_strWidth] = width;
                    css[_strHeight] = height;
                    _textareaCoverElement.css(css);

                    //apply min width / min height to prevent textarea collapsing
                    css[_strMinMinus + _strWidth] = minWidth /*+ (!_isBorderBox && _widthAutoCache ? _paddingX + _borderX : 0)*/;
                    css[_strMinMinus + _strHeight] = minHeight /*+ (!_isBorderBox && _heightAutoCache ? _paddingY + _borderY : 0)*/;
                    _targetElement.css(css);

                    return {
                        _originalWidth: origWidth,
                        _originalHeight: origHeight,
                        _dynamicWidth: width,
                        _dynamicHeight: height
                    };
                }

                /**
                 * Updates the plugin and DOM to the current options.
                 * This method should only be called if a update is 100% required.
                 * @param hostSizeChanged True if this method was called due to a host size change.
                 * @param contentSizeChanged True if this method was called due to a content size change.
                 * @param force True if every property shall be updated and the cache shall be ignored.
                 * @param preventSwallowing True if this method shall be executed event if it could be swallowed.
                 */
                function update(hostSizeChanged, contentSizeChanged, force, preventSwallowing) {
                    var now = COMPATIBILITY.now();
                    var swallow = _swallowUpdateLag > 0 && _initialized && (now - _lastUpdateTime) < _swallowUpdateLag && (!_heightAutoCache && !_widthAutoCache) && !preventSwallowing;
                    var displayIsHidden = _hostElement.is(':hidden');
                    var displayIsHiddenChanged = checkCacheSingle(displayIsHidden, _displayIsHiddenCache, force);
                    _displayIsHiddenCache = displayIsHidden;
                    clearTimeout(_swallowedUpdateTimeout);

                    if (swallow) {
                        _swallowedUpdateParams.h = _swallowedUpdateParams.h || hostSizeChanged;
                        _swallowedUpdateParams.c = _swallowedUpdateParams.c || contentSizeChanged;
                        _swallowedUpdateParams.f = _swallowedUpdateParams.f || force;
                        _swallowedUpdateTimeout = setTimeout(update, _swallowUpdateLag);
                    }

                    //abort update due to:
                    //destroyed
                    //swallowing
                    //sleeping
                    //host is hidden or has false display
                    if (_destroyed || swallow || _isSleeping || (_initialized && !force && displayIsHidden) || _hostElement.css('display') === 'inline')
                        return;

                    _lastUpdateTime = now;
                    hostSizeChanged = hostSizeChanged || _swallowedUpdateParams.h;
                    contentSizeChanged = contentSizeChanged || _swallowedUpdateParams.c;
                    force = force || _swallowedUpdateParams.f;
                    _swallowedUpdateParams = {};

                    hostSizeChanged = hostSizeChanged === undefined ? false : hostSizeChanged;
                    contentSizeChanged = contentSizeChanged === undefined ? false : contentSizeChanged;
                    force = force === undefined ? false : force;

                    //if scrollbar styling is possible and native scrollbars aren't overlaid the scrollbar styling will be applied which hides the native scrollbars completely.
                    if (_nativeScrollbarStyling && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
                        //native scrollbars are hidden, so change the values to zero
                        _nativeScrollbarSize.x = 0;
                        _nativeScrollbarSize.y = 0;
                    }
                    else {
                        //refresh native scrollbar size (in case of zoom)
                        _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
                    }

                    // Scrollbar padding is needed for firefox, because firefox hides scrollbar automatically if the size of the div is too small.
                    // The calculation: [scrollbar size +3 *3]
                    // (+3 because of possible decoration e.g. borders, margins etc., but only if native scrollbar is NOT a overlaid scrollbar)
                    // (*3 because (1)increase / (2)decrease -button and (3)resize handle)
                    _nativeScrollbarMinSize = {
                        x: (_nativeScrollbarSize.x + (_nativeScrollbarIsOverlaid.x ? 0 : 3)) * 3,
                        y: (_nativeScrollbarSize.y + (_nativeScrollbarIsOverlaid.y ? 0 : 3)) * 3
                    };

                    freezeResizeObserver(_sizeObserverElement);
                    freezeResizeObserver(_sizeAutoObserverElement);

                    //save current scroll offset
                    var currScroll = {
                        x: _viewportElement[_strScrollLeft](),
                        y: _viewportElement[_strScrollTop]()
                    };
                    var currentPreparedOptionsScrollbars = _currentPreparedOptions.scrollbars;
                    var currentPreparedOptionsTextarea = _currentPreparedOptions.textarea;

                    //scrollbars visibility:
                    var scrollbarsVisibility = currentPreparedOptionsScrollbars.visibility;
                    var scrollbarsVisibilityChanged = checkCacheSingle(scrollbarsVisibility, _scrollbarsVisibilityCache, force);

                    //scrollbars autoHide:
                    var scrollbarsAutoHide = currentPreparedOptionsScrollbars.autoHide;
                    var scrollbarsAutoHideChanged = checkCacheSingle(scrollbarsAutoHide, _scrollbarsAutoHideCache, force);

                    //scrollbars click scrolling
                    var scrollbarsClickScrolling = currentPreparedOptionsScrollbars.clickScrolling;
                    var scrollbarsClickScrollingChanged = checkCacheSingle(scrollbarsClickScrolling, _scrollbarsClickScrollingCache, force);

                    //scrollbars drag scrolling
                    var scrollbarsDragScrolling = currentPreparedOptionsScrollbars.dragScrolling;
                    var scrollbarsDragScrollingChanged = checkCacheSingle(scrollbarsDragScrolling, _scrollbarsDragScrollingCache, force);

                    //className
                    var className = _currentPreparedOptions.className;
                    var classNameChanged = checkCacheSingle(className, _classNameCache, force);

                    //resize
                    var resize = _currentPreparedOptions.resize;
                    var resizeChanged = checkCacheSingle(resize, _resizeCache, force) && !_isBody; //body can't be resized since the window itself acts as resize possibility.

                    //textarea AutoWrapping
                    var textareaAutoWrapping = _isTextarea ? _targetElement.attr('wrap') !== 'off' : false;
                    var textareaAutoWrappingChanged = checkCacheSingle(textareaAutoWrapping, _textareaAutoWrappingCache, force);

                    //paddingAbsolute
                    var paddingAbsolute = _currentPreparedOptions.paddingAbsolute;
                    var paddingAbsoluteChanged = checkCacheSingle(paddingAbsolute, _paddingAbsoluteCache, force);

                    //clipAlways
                    var clipAlways = _currentPreparedOptions.clipAlways;
                    var clipAlwaysChanged = checkCacheSingle(clipAlways, _clipAlwaysCache, force);

                    //sizeAutoCapable
                    var sizeAutoCapable = _currentPreparedOptions.sizeAutoCapable && !_isBody; //body can never be size auto, because it shall be always as big as the viewport.
                    var sizeAutoCapableChanged = checkCacheSingle(sizeAutoCapable, _sizeAutoCapableCache, force);

                    //showNativeScrollbars
                    var ignoreOverlayScrollbarHiding = _currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
                    var ignoreOverlayScrollbarHidingChanged = checkCacheSingle(ignoreOverlayScrollbarHiding, _ignoreOverlayScrollbarHidingCache);

                    //autoUpdate
                    var autoUpdate = _currentPreparedOptions.autoUpdate;
                    var autoUpdateChanged = checkCacheSingle(autoUpdate, _autoUpdateCache);

                    //overflowBehavior
                    var overflowBehavior = _currentPreparedOptions.overflowBehavior;
                    var overflowBehaviorChanged = checkCacheDouble(overflowBehavior, _overflowBehaviorCache, _strX, _strY, force);

                    //dynWidth:
                    var textareaDynWidth = currentPreparedOptionsTextarea.dynWidth;
                    var textareaDynWidthChanged = checkCacheSingle(_textareaDynWidthCache, textareaDynWidth);

                    //dynHeight:
                    var textareaDynHeight = currentPreparedOptionsTextarea.dynHeight;
                    var textareaDynHeightChanged = checkCacheSingle(_textareaDynHeightCache, textareaDynHeight);

                    //scrollbars visibility
                    _scrollbarsAutoHideNever = scrollbarsAutoHide === 'n';
                    _scrollbarsAutoHideScroll = scrollbarsAutoHide === 's';
                    _scrollbarsAutoHideMove = scrollbarsAutoHide === 'm';
                    _scrollbarsAutoHideLeave = scrollbarsAutoHide === 'l';

                    //scrollbars autoHideDelay
                    _scrollbarsAutoHideDelay = currentPreparedOptionsScrollbars.autoHideDelay;

                    //old className
                    _oldClassName = _classNameCache;

                    //resize
                    _resizeNone = resize === 'n';
                    _resizeBoth = resize === 'b';
                    _resizeHorizontal = resize === 'h';
                    _resizeVertical = resize === 'v';

                    //normalizeRTL
                    _normalizeRTLCache = _currentPreparedOptions.normalizeRTL;

                    //ignore overlay scrollbar hiding
                    ignoreOverlayScrollbarHiding = ignoreOverlayScrollbarHiding && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y);

                    //refresh options cache
                    _scrollbarsVisibilityCache = scrollbarsVisibility;
                    _scrollbarsAutoHideCache = scrollbarsAutoHide;
                    _scrollbarsClickScrollingCache = scrollbarsClickScrolling;
                    _scrollbarsDragScrollingCache = scrollbarsDragScrolling;
                    _classNameCache = className;
                    _resizeCache = resize;
                    _textareaAutoWrappingCache = textareaAutoWrapping;
                    _paddingAbsoluteCache = paddingAbsolute;
                    _clipAlwaysCache = clipAlways;
                    _sizeAutoCapableCache = sizeAutoCapable;
                    _ignoreOverlayScrollbarHidingCache = ignoreOverlayScrollbarHiding;
                    _autoUpdateCache = autoUpdate;
                    _overflowBehaviorCache = extendDeep({}, overflowBehavior);
                    _textareaDynWidthCache = textareaDynWidth;
                    _textareaDynHeightCache = textareaDynHeight;
                    _hasOverflowCache = _hasOverflowCache || { x: false, y: false };

                    //set correct class name to the host element
                    if (classNameChanged) {
                        removeClass(_hostElement, _oldClassName + _strSpace + _classNameThemeNone);
                        addClass(_hostElement, className !== undefined && className !== null && className.length > 0 ? className : _classNameThemeNone);
                    }

                    //set correct auto Update
                    if (autoUpdateChanged) {
                        if (autoUpdate === true) {
                            disconnectMutationObservers();
                            autoUpdateLoop.add(_base);
                        }
                        else if (autoUpdate === null) {
                            if (_autoUpdateRecommended) {
                                disconnectMutationObservers();
                                autoUpdateLoop.add(_base);
                            }
                            else {
                                autoUpdateLoop.remove(_base);
                                connectMutationObservers();
                            }
                        }
                        else {
                            autoUpdateLoop.remove(_base);
                            connectMutationObservers();
                        }
                    }

                    //activate or deactivate size auto capability
                    if (sizeAutoCapableChanged) {
                        if (sizeAutoCapable) {
                            if (!_contentGlueElement) {
                                _contentGlueElement = FRAMEWORK(generateDiv(_classNameContentGlueElement));
                                _paddingElement.before(_contentGlueElement);
                            }
                            else {
                                _contentGlueElement.show();
                            }
                            if (_sizeAutoObserverAdded) {
                                _sizeAutoObserverElement.show();
                            }
                            else {
                                _sizeAutoObserverElement = FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
                                _sizeAutoObserverElementNative = _sizeAutoObserverElement[0];

                                _contentGlueElement.before(_sizeAutoObserverElement);
                                var oldSize = {w: -1, h: -1};
                                addResizeObserver(_sizeAutoObserverElement, function () {
                                    var newSize = {
                                        w: _sizeAutoObserverElementNative[LEXICON.oW],
                                        h: _sizeAutoObserverElementNative[LEXICON.oH]
                                    };
                                    if (checkCacheDouble(newSize, oldSize)) {
                                        if (_initialized && (_heightAutoCache && newSize.h > 0) || (_widthAutoCache && newSize.w > 0)) {
                                            update();
                                        }
                                        else if (_initialized && (!_heightAutoCache && newSize.h === 0) || (!_widthAutoCache && newSize.w === 0)) {
                                            update();
                                        }
                                    }
                                    oldSize = newSize;
                                });
                                _sizeAutoObserverAdded = true;
                                //fix heightAuto detector bug if height is fixed but contentHeight is 0.
                                //the probability this bug will ever happen is very very low, thats why its ok if we use calc which isn't supported in IE8.
                                if (_cssCalc !== null)
                                    _sizeAutoObserverElement.css(_strHeight, _cssCalc + '(100% + 1px)');
                            }
                        }
                        else {
                            if (_sizeAutoObserverAdded)
                                _sizeAutoObserverElement.hide();
                            if (_contentGlueElement)
                                _contentGlueElement.hide();
                        }
                    }

                    //if force, update all resizeObservers too
                    if (force) {
                        _sizeObserverElement.find('*').trigger(_strScroll);
                        if (_sizeAutoObserverAdded)
                            _sizeAutoObserverElement.find('*').trigger(_strScroll);
                    }

                    //detect direction:
                    var cssDirection = _hostElement.css('direction');
                    var cssDirectionChanged = checkCacheSingle(cssDirection, _cssDirectionCache, force);

                    //detect box-sizing:
                    var boxSizing = _hostElement.css('box-sizing');
                    var boxSizingChanged = checkCacheSingle(boxSizing, _cssBoxSizingCache, force);

                    //detect padding:
                    var padding = {
                        c: force,
                        t: parseToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strTop)),
                        r: parseToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strRight)),
                        b: parseToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strBottom)),
                        l: parseToZeroOrNumber(_hostElement.css(_strPaddingMinus + _strLeft))
                    };

                    //width + height auto detecting var:
                    var sizeAutoObserverElementBCRect;
                    //exception occurs in IE8 sometimes (unknown exception)
                    try {
                        sizeAutoObserverElementBCRect = _sizeAutoObserverAdded ? _sizeAutoObserverElementNative.getBoundingClientRect() : null;
                    } catch (ex) {
                        return;
                    }

                    _isRTL = cssDirection === 'rtl';
                    _isBorderBox = (boxSizing === 'border-box');
                    var isRTLLeft = _isRTL ? _strLeft : _strRight;
                    var isRTLRight = _isRTL ? _strRight : _strLeft;

                    //detect width auto:
                    var widthAutoResizeDetection = false;
                    var widthAutoObserverDetection = (_sizeAutoObserverAdded && (_hostElement.css(_strFloat) !== 'none' /*|| _isTextarea */)) ? (MATH.round(sizeAutoObserverElementBCRect.right - sizeAutoObserverElementBCRect.left) === 0) && (!paddingAbsolute ? (_hostElementNative[LEXICON.cW] - _paddingX) > 0 : true) : false;
                    if (sizeAutoCapable && !widthAutoObserverDetection) {
                        var tmpCurrHostWidth = _hostElementNative[LEXICON.oW];
                        var tmpCurrContentGlueWidth = _contentGlueElement.css(_strWidth);
                        _contentGlueElement.css(_strWidth, _strAuto);

                        var tmpNewHostWidth = _hostElementNative[LEXICON.oW];
                        _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
                        widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
                        if (!widthAutoResizeDetection) {
                            _contentGlueElement.css(_strWidth, tmpCurrHostWidth + 1);
                            tmpNewHostWidth = _hostElementNative[LEXICON.oW];
                            _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
                            widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
                        }
                    }
                    var widthAuto = (widthAutoObserverDetection || widthAutoResizeDetection) && sizeAutoCapable && !displayIsHidden;
                    var widthAutoChanged = checkCacheSingle(widthAuto, _widthAutoCache, force);
                    var wasWidthAuto = !widthAuto && _widthAutoCache;

                    //detect height auto:
                    var heightAuto = _sizeAutoObserverAdded && sizeAutoCapable && !displayIsHidden ? (MATH.round(sizeAutoObserverElementBCRect.bottom - sizeAutoObserverElementBCRect.top) === 0) /* && (!paddingAbsolute && (_msieVersion > 9 || !_msieVersion) ? true : true) */ : false;
                    var heightAutoChanged = checkCacheSingle(heightAuto, _heightAutoCache, force);
                    var wasHeightAuto = !heightAuto && _heightAutoCache;

                    //detect border:
                    //we need the border only if border box and auto size
                    var strMinusWidth = '-' + _strWidth;
                    var updateBorderX = (widthAuto && _isBorderBox) || !_isBorderBox;
                    var updateBorderY = (heightAuto && _isBorderBox) || !_isBorderBox;
                    var border = {
                        c: force,
                        t: updateBorderY ? parseToZeroOrNumber(_hostElement.css(_strBorderMinus + _strTop + strMinusWidth), true) : 0,
                        r: updateBorderX ? parseToZeroOrNumber(_hostElement.css(_strBorderMinus + _strRight + strMinusWidth), true) : 0,
                        b: updateBorderY ? parseToZeroOrNumber(_hostElement.css(_strBorderMinus + _strBottom + strMinusWidth), true) : 0,
                        l: updateBorderX ? parseToZeroOrNumber(_hostElement.css(_strBorderMinus + _strLeft + strMinusWidth), true) : 0
                    };

                    //detect margin:
                    var margin = {
                        c: force,
                        t: parseToZeroOrNumber(_hostElement.css(_strMarginMinus + _strTop)),
                        r: parseToZeroOrNumber(_hostElement.css(_strMarginMinus + _strRight)),
                        b: parseToZeroOrNumber(_hostElement.css(_strMarginMinus + _strBottom)),
                        l: parseToZeroOrNumber(_hostElement.css(_strMarginMinus + _strLeft))
                    };

                    //detect css max width & height:
                    var cssMaxValue = {
                        h: String(_hostElement.css(_strMaxMinus + _strHeight)),
                        w: String(_hostElement.css(_strMaxMinus + _strWidth))
                    };

                    //vars to apply correct css
                    var contentElementCSS = { };
                    var contentGlueElementCSS = { };

                    //funcs
                    var getHostSize = function() {
                        //has to be clientSize because offsetSize respect borders
                        return {
                            w: _hostElementNative[LEXICON.cW],
                            h: _hostElementNative[LEXICON.cH]
                        };
                    };
                    var getViewportSize = function() {
                        //viewport size is padding container because it never has padding, margin and a border
                        //determine zoom rounding error -> sometimes scrollWidth/Height is smaller than clientWidth/Height
                        //if this happens add the difference to the viewportSize to compensate the rounding error
                        return {
                            w: _paddingElementNative[LEXICON.oW] + MATH.max(0, _contentElementNative[LEXICON.cW] - _contentElementNative[LEXICON.sW]),
                            h: _paddingElementNative[LEXICON.oH] + MATH.max(0, _contentElementNative[LEXICON.cH] - _contentElementNative[LEXICON.sH])
                        };
                    };

                    //set info for padding
                    var paddingAbsoluteX = _paddingX = padding.l + padding.r;
                    var paddingAbsoluteY = _paddingY = padding.t + padding.b;
                    paddingAbsoluteX *= paddingAbsolute ? 1 : 0;
                    paddingAbsoluteY *= paddingAbsolute ? 1 : 0;
                    padding.c = checkCacheTRBL(padding, _cssPaddingCache);

                    //set info for border
                    _borderX = border.l + border.r;
                    _borderY = border.t + border.b;
                    border.c = checkCacheTRBL(border, _cssBorderCache);

                    //set info for margin
                    _marginX = margin.l + margin.r;
                    _marginY = margin.t + margin.b;
                    margin.c = checkCacheTRBL(margin, _cssMarginCache);

                    //set info for css max value
                    cssMaxValue.ih = parseToZeroOrNumber(cssMaxValue.h); //ih = integer height
                    cssMaxValue.iw = parseToZeroOrNumber(cssMaxValue.w); //iw = integer width
                    cssMaxValue.ch = cssMaxValue.h.indexOf('px') > -1; //ch = correct height
                    cssMaxValue.cw = cssMaxValue.w.indexOf('px') > -1; //cw = correct width
                    cssMaxValue.c = checkCacheDouble(cssMaxValue, _cssMaxValueCache, force);

                    //refresh cache
                    _cssDirectionCache = cssDirection;
                    _cssBoxSizingCache = boxSizing;
                    _widthAutoCache = widthAuto;
                    _heightAutoCache = heightAuto;
                    _cssPaddingCache = padding;
                    _cssBorderCache = border;
                    _cssMarginCache = margin;
                    _cssMaxValueCache = cssMaxValue;

                    //IEFix direction changed
                    if (cssDirectionChanged && _sizeAutoObserverAdded)
                        _sizeAutoObserverElement.css(_strFloat, isRTLRight);

                    //apply padding:
                    if (padding.c || cssDirectionChanged || paddingAbsoluteChanged || widthAutoChanged || heightAutoChanged || boxSizingChanged || sizeAutoCapableChanged) {
                        var paddingElementCSS = {};
                        var textareaCSS = {};
                        setTopRightBottomLeft(contentGlueElementCSS, _strMarginMinus, [-padding.t, -padding.r, -padding.b, -padding.l]);
                        if (paddingAbsolute) {
                            setTopRightBottomLeft(paddingElementCSS, _strEmpty, [padding.t, padding.r, padding.b, padding.l]);
                            if (_isTextarea)
                                setTopRightBottomLeft(textareaCSS, _strPaddingMinus);
                            else
                                setTopRightBottomLeft(contentElementCSS, _strPaddingMinus);
                        }
                        else {
                            setTopRightBottomLeft(paddingElementCSS, _strEmpty);
                            if (_isTextarea)
                                setTopRightBottomLeft(textareaCSS, _strPaddingMinus, [padding.t, padding.r, padding.b, padding.l]);
                            else
                                setTopRightBottomLeft(contentElementCSS, _strPaddingMinus, [padding.t, padding.r, padding.b, padding.l]);
                        }
                        _paddingElement.css(paddingElementCSS);
                        _targetElement.css(textareaCSS);
                    }

                    //viewport size is padding container because it never has padding, margin and a border.
                    _viewportSize = getViewportSize();

                    //update Textarea
                    var textareaSize = _isTextarea ? textareaUpdate() : false;
                    var textareaDynOrigSize = _isTextarea && textareaSize ? {
                        w : textareaDynWidth ? textareaSize._dynamicWidth : textareaSize._originalWidth,
                        h : textareaDynHeight ? textareaSize._dynamicHeight : textareaSize._originalHeight
                    } : { };
                    
                    //fix height auto / width auto in cooperation with current padding & boxSizing behavior:
                    if (heightAuto && (heightAutoChanged || paddingAbsoluteChanged || boxSizingChanged || cssMaxValue.c || padding.c || border.c)) {
                        //if (cssMaxValue.ch)
                        contentElementCSS[_strMaxMinus + _strHeight] =
                            (cssMaxValue.ch ? (cssMaxValue.ih - paddingAbsoluteY + (_isBorderBox ? -_borderY : _paddingY))
                            : _strEmpty);
                        contentElementCSS[_strHeight] = _strAuto;
                    }
                    else if (heightAutoChanged || paddingAbsoluteChanged) {
                        contentElementCSS[_strMaxMinus + _strHeight] = _strEmpty;
                        contentElementCSS[_strHeight] = _strHundredPercent;
                    }
                    if (widthAuto && (widthAutoChanged || paddingAbsoluteChanged || boxSizingChanged || cssMaxValue.c || padding.c || border.c || cssDirectionChanged)) {
                        //if (cssMaxValue.cw)
                        contentElementCSS[_strMaxMinus + _strWidth] =
                            (cssMaxValue.cw ? (cssMaxValue.iw - paddingAbsoluteX + (_isBorderBox ? -_borderX : _paddingX)) +
                            (_nativeScrollbarIsOverlaid.y /*&& _hasOverflowCache.y && widthAuto */ ? _overlayScrollbarDummySize.y : 0)
                            : _strEmpty);
                        contentElementCSS[_strWidth] = _strAuto;
                        contentGlueElementCSS[_strMaxMinus + _strWidth] = _strHundredPercent; //IE Fix
                    }
                    else if (widthAutoChanged || paddingAbsoluteChanged) {
                        contentElementCSS[_strMaxMinus + _strWidth] = _strEmpty;
                        contentElementCSS[_strWidth] = _strHundredPercent;
                        contentElementCSS[_strFloat] = _strEmpty;
                        contentGlueElementCSS[_strMaxMinus + _strWidth] = _strEmpty; //IE Fix
                    }
                    if (widthAuto) {
                        if (!cssMaxValue.cw)
                            contentElementCSS[_strMaxMinus + _strWidth] = _strEmpty;
                        //textareaDynOrigSize.w || _strAuto :: doesnt works because applied margin will shift width
                        contentGlueElementCSS[_strWidth] = _strAuto;

                        contentElementCSS[_strWidth] = _strAuto;
                        contentElementCSS[_strFloat] = isRTLRight;
                    }
                    else {
                        contentGlueElementCSS[_strWidth] = _strEmpty;
                    }
                    if (heightAuto) {
                        if (!cssMaxValue.ch)
                            contentElementCSS[_strMaxMinus + _strHeight] = _strEmpty;
                        //textareaDynOrigSize.h || _contentElementNative[LEXICON.cH] :: use for anti scroll jumping
                        contentGlueElementCSS[_strHeight] = textareaDynOrigSize.h || _contentElementNative[LEXICON.cH];
                    }
                    else {
                        contentGlueElementCSS[_strHeight] = _strEmpty;
                    }
                    if (sizeAutoCapable)
                        _contentGlueElement.css(contentGlueElementCSS);
                    _contentElement.css(contentElementCSS);

                    //CHECKPOINT HERE ~
                    contentElementCSS = {};
                    contentGlueElementCSS = {};

                    //if [content(host) client / scroll size, or target element direction, or content(host) max-sizes] changed, or force is true
                    if (hostSizeChanged || contentSizeChanged || cssDirectionChanged || boxSizingChanged || paddingAbsoluteChanged || widthAutoChanged || widthAuto || heightAutoChanged || heightAuto || cssMaxValue.c || ignoreOverlayScrollbarHidingChanged || overflowBehaviorChanged || clipAlwaysChanged || resizeChanged || scrollbarsVisibilityChanged || scrollbarsAutoHideChanged || scrollbarsDragScrollingChanged || scrollbarsClickScrollingChanged || textareaDynWidthChanged || textareaDynHeightChanged || textareaAutoWrappingChanged || force) {
                        var strOverflow = 'overflow';
                        var strOverflowX = strOverflow + '-x';
                        var strOverflowY = strOverflow + '-y';
                        var strHidden = 'hidden';
                        var strVisible = 'visible';
                        //decide whether the content overflow must get hidden for correct overflow measuring, it !MUST! be always hidden if the height is auto
                        var hideOverflow4CorrectMeasuring = _restrictedMeasuring ?
                        (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) || //it must be hidden if native scrollbars are overlaid
                        (_viewportSize.w < _nativeScrollbarMinSize.y || _viewportSize.h < _nativeScrollbarMinSize.x) || //it must be hidden if host-element is too small
                        heightAuto || displayIsHiddenChanged //it must be hidden if height is auto or display was change
                            : heightAuto; //if there is not the restricted Measuring bug, it must be hidden if the height is auto

                        //Reset the viewport (very important for natively overlaid scrollbars and zoom change
                        //don't change the overflow prop as it is very expensive and affects performance !A LOT!
                        var viewportElementResetCSS = { };
                        var resetXTmp = _hasOverflowCache.y && _hideOverflowCache.ys && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.y ? _viewportElement.css(isRTLLeft) : -_nativeScrollbarSize.y) : 0;
                        var resetBottomTmp = _hasOverflowCache.x && _hideOverflowCache.xs && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.x ? _viewportElement.css(_strBottom) : -_nativeScrollbarSize.x) : 0;
                        setTopRightBottomLeft(viewportElementResetCSS, _strEmpty);
                        _viewportElement.css(viewportElementResetCSS);
                        if(hideOverflow4CorrectMeasuring)
                            _contentElement.css(strOverflow, strHidden);

                        //measure several sizes:
                        var contentMeasureElement = getContentMeasureElement();
                        //in Firefox content element has to have overflow hidden, else element margins aren't calculated properly, this element prevents this bug, but only if scrollbars aren't overlaid
                        var contentMeasureElementGuaranty = _restrictedMeasuring && !hideOverflow4CorrectMeasuring ? _viewportElementNative : contentMeasureElement;
                        var contentSize = {
                            //use clientSize because natively overlaidScrollbars add borders
                            w: textareaDynOrigSize.w || contentMeasureElement[LEXICON.cW],
                            h: textareaDynOrigSize.h || contentMeasureElement[LEXICON.cH]
                        };
                        var scrollSize = {
                            w: MATH.max(contentMeasureElement[LEXICON.sW], contentMeasureElementGuaranty[LEXICON.sW]),
                            h: MATH.max(contentMeasureElement[LEXICON.sH], contentMeasureElementGuaranty[LEXICON.sH])
                        };

                        //apply the correct viewport style and measure viewport size
                        viewportElementResetCSS[_strBottom] = wasHeightAuto ? _strEmpty : resetBottomTmp;
                        viewportElementResetCSS[isRTLLeft] = wasWidthAuto ? _strEmpty : resetXTmp;
                        _viewportElement.css(viewportElementResetCSS);
                        _viewportSize = getViewportSize();

                        //measure and correct several sizes
                        var hostSize = getHostSize();
                        var contentGlueSize = {
                            //client/scrollSize + AbsolutePadding -> because padding is only applied to the paddingElement if its absolute, so you have to add it manually
                            //hostSize is clientSize -> so padding should be added manually, right? FALSE! Because content glue is inside hostElement, so we don't have to worry about padding
                            w: MATH.max((widthAuto ? contentSize.w : scrollSize.w) + paddingAbsoluteX, hostSize.w),
                            h: MATH.max((heightAuto ? contentSize.h : scrollSize.h) + paddingAbsoluteY, hostSize.h)
                        };
                        contentGlueSize.c = checkCacheDouble(contentGlueSize, _contentGlueSizeCache, force);
                        _contentGlueSizeCache = contentGlueSize;

                        //apply correct contentGlue size
                        if (sizeAutoCapable) {
                            //size contentGlue correctly to make sure the element has correct size if the sizing switches to auto
                            if (contentGlueSize.c || (heightAuto || widthAuto)) {
                                contentGlueElementCSS[_strWidth] = contentGlueSize.w;
                                contentGlueElementCSS[_strHeight] = contentGlueSize.h;

                                //textarea-sizes are already calculated correctly at this point
                                if(!_isTextarea) {
                                    contentSize = {
                                        //use clientSize because natively overlaidScrollbars add borders
                                        w: contentMeasureElement[LEXICON.cW],
                                        h: contentMeasureElement[LEXICON.cH]
                                    };
                                }
                            }
                            var textareaCoverCSS = {};
                            var setContentGlueElementCSSfunction = function(horizontal) {
                                var scrollbarVars = getScrollbarVars(horizontal);
                                var wh = scrollbarVars._w_h;
                                var strWH = scrollbarVars._width_height;
                                var autoSize = horizontal ? widthAuto : heightAuto;
                                var borderSize = horizontal ? _borderX : _borderY;
                                var paddingSize = horizontal ? _paddingX : _paddingY;
                                var marginSize = horizontal ? _marginX : _marginY;
                                var maxSize = contentGlueElementCSS[strWH] + (_isBorderBox ? borderSize : -paddingSize);

                                //make contentGlue size -1 if element is not auto sized, to make sure that a resize event happens when the element shrinks
                                if (!autoSize || (!autoSize && border.c))
                                    contentGlueElementCSS[strWH] = hostSize[wh] - (_isBorderBox ? 0 : paddingSize + borderSize) - 1 - marginSize;

                                //if size is auto and host is same size as max size, make content glue size +1 to make sure size changes will be detected
                                if (autoSize && cssMaxValue['c' + wh] && cssMaxValue['i' + wh] === maxSize)
                                    contentGlueElementCSS[strWH] = maxSize + (_isBorderBox ? 0 : paddingSize) + 1;

                                //if size is auto and host is smaller than size as min size, make content glue size -1 to make sure size changes will be detected (this is only needed if padding is 0)
                                if (autoSize && (contentSize[wh] < _viewportSize[wh]) && (horizontal ? (_isTextarea ? !textareaAutoWrapping : false) : true)) {
                                    if (_isTextarea)
                                        textareaCoverCSS[strWH] = parseToZeroOrNumber(_textareaCoverElement.css(strWH)) - 1;
                                    contentGlueElementCSS[strWH] -= 1;
                                }

                                //make sure content glue size is at least 1
                                if (contentSize[wh] > 0)
                                    contentGlueElementCSS[strWH] = MATH.max(1, contentGlueElementCSS[strWH]);
                            };
                            setContentGlueElementCSSfunction(true);
                            setContentGlueElementCSSfunction(false);

                            if (_isTextarea)
                                _textareaCoverElement.css(textareaCoverCSS);
                            _contentGlueElement.css(contentGlueElementCSS);
                        }
                        if (widthAuto)
                            contentElementCSS[_strWidth] = _strHundredPercent;
                        if (widthAuto && !_isBorderBox && !_mutationObserversConnected)
                            contentElementCSS[_strFloat] = 'none';

                        //apply and reset content style
                        _contentElement.css(contentElementCSS);
                        contentElementCSS = {};

                        //measure again, but this time all correct sizes:
                        var contentScrollSize = {
                            w: MATH.max(contentMeasureElement[LEXICON.sW], contentMeasureElementGuaranty[LEXICON.sW]),
                            h: MATH.max(contentMeasureElement[LEXICON.sH], contentMeasureElementGuaranty[LEXICON.sH])
                        };
                        contentScrollSize.c = contentSizeChanged = checkCacheDouble(contentScrollSize, _contentScrollSizeCache, force);
                        _contentScrollSizeCache = contentScrollSize;

                        //remove overflow hidden to restore overflow
                        if(hideOverflow4CorrectMeasuring)
                            _contentElement.css(strOverflow, _strEmpty);
                        
                        //refresh viewport size after correct measuring
                        _viewportSize = getViewportSize();

                        hostSize = getHostSize();
                        hostSizeChanged = checkCacheDouble(hostSize, _hostSizeCache);
                        _hostSizeCache = hostSize;

                        var hideOverflowForceTextarea = _isTextarea && (_viewportSize.w === 0 || _viewportSize.h === 0);
                        var previousOverflow = _overflowAmountCache;
                        var overflowBehaviorIsVS = { };
                        var overflowBehaviorIsVH = { };
                        var overflowBehaviorIsS = { };
                        var overflowAmount = { };
                        var hasOverflow = { };
                        var hideOverflow = { };
                        var canScroll = { };
                        var viewportRect = _paddingElementNative.getBoundingClientRect();
                        var setOverflowVariables = function(horizontal) {
                            var scrollbarVars = getScrollbarVars(horizontal);
                            var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                            var xyI = scrollbarVarsInverted._x_y;
                            var xy = scrollbarVars._x_y;
                            var wh = scrollbarVars._w_h;
                            var widthHeight = scrollbarVars._width_height;
                            var scrollMax = _strScroll + scrollbarVars._Left_Top + 'Max';
                            var fractionalOverflowAmount = viewportRect[widthHeight] ? MATH.abs(viewportRect[widthHeight] - _viewportSize[wh]) : 0;
                            overflowBehaviorIsVS[xy] = overflowBehavior[xy] === 'v-s';
                            overflowBehaviorIsVH[xy] = overflowBehavior[xy] === 'v-h';
                            overflowBehaviorIsS[xy] = overflowBehavior[xy] === 's';
                            overflowAmount[xy] = MATH.max(0, MATH.round((contentScrollSize[wh] - _viewportSize[wh]) * 100) / 100);
                            overflowAmount[xy] *= (hideOverflowForceTextarea || (_viewportElementNative[scrollMax] === 0 && fractionalOverflowAmount > 0 && fractionalOverflowAmount < 1)) ? 0 : 1;
                            hasOverflow[xy] = overflowAmount[xy] > 0;

                            //hideOverflow:
                            //x || y : true === overflow is hidden by "overflow: scroll" OR "overflow: hidden"
                            //xs || ys : true === overflow is hidden by "overflow: scroll"
                            hideOverflow[xy] = overflowBehaviorIsVS[xy] || overflowBehaviorIsVH[xy] ? (hasOverflow[xyI] && !overflowBehaviorIsVS[xyI] && !overflowBehaviorIsVH[xyI]) : hasOverflow[xy];
                            hideOverflow[xy + 's'] = hideOverflow[xy] ? (overflowBehaviorIsS[xy] || overflowBehaviorIsVS[xy]) : false;

                            canScroll[xy] = hasOverflow[xy] && hideOverflow[xy + 's'];
                        };
                        setOverflowVariables(true);
                        setOverflowVariables(false);

                        overflowAmount.c = checkCacheDouble(overflowAmount, _overflowAmountCache, _strX, _strY, force);
                        _overflowAmountCache = overflowAmount;
                        hasOverflow.c = checkCacheDouble(hasOverflow, _hasOverflowCache, _strX, _strY, force);
                        _hasOverflowCache = hasOverflow;
                        hideOverflow.c = checkCacheDouble(hideOverflow, _hideOverflowCache, _strX, _strY, force);
                        _hideOverflowCache = hideOverflow;

                        //if native scrollbar is overlay at x OR y axis, prepare DOM
                        if (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) {
                            var borderDesign = 'px solid transparent';
                            var contentArrangeElementCSS = { };
                            var arrangeContent = { };
                            var arrangeChanged = force;
                            var setContentElementCSS;

                            if (hasOverflow.x || hasOverflow.y) {
                                arrangeContent.w = _nativeScrollbarIsOverlaid.y && hasOverflow.y ? contentScrollSize.w + _overlayScrollbarDummySize.y : _strEmpty;
                                arrangeContent.h = _nativeScrollbarIsOverlaid.x && hasOverflow.x ? contentScrollSize.h + _overlayScrollbarDummySize.x : _strEmpty;
                                arrangeChanged = checkCacheSingle(arrangeContent, _arrangeContentSizeCache, force);
                                _arrangeContentSizeCache = arrangeContent;
                            }

                            if (hasOverflow.c || hideOverflow.c || contentScrollSize.c || cssDirectionChanged || widthAutoChanged || heightAutoChanged || widthAuto || heightAuto || ignoreOverlayScrollbarHidingChanged) {
                                contentElementCSS[_strMarginMinus + isRTLRight] = contentElementCSS[_strBorderMinus + isRTLRight] = _strEmpty;
                                setContentElementCSS = function(horizontal) {
                                    var scrollbarVars = getScrollbarVars(horizontal);
                                    var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                                    var xy = scrollbarVars._x_y;
                                    var strDirection = horizontal ? _strBottom : isRTLLeft;
                                    var invertedAutoSize = horizontal ? heightAuto : widthAuto;

                                    if (_nativeScrollbarIsOverlaid[xy] && hasOverflow[xy] && hideOverflow[xy + 's']) {
                                        contentElementCSS[_strMarginMinus + strDirection] = invertedAutoSize ? (ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize[xy]) : _strEmpty;
                                        contentElementCSS[_strBorderMinus + strDirection] = ((horizontal ? !invertedAutoSize : true) && !ignoreOverlayScrollbarHiding) ? (_overlayScrollbarDummySize[xy] + borderDesign) : _strEmpty;
                                    }
                                    else {
                                        arrangeContent[scrollbarVarsInverted._w_h] =
                                        contentElementCSS[_strMarginMinus + strDirection] =
                                        contentElementCSS[_strBorderMinus + strDirection] = _strEmpty;
                                        arrangeChanged = true;
                                    }
                                };

                                if (_nativeScrollbarStyling) {
                                    if (ignoreOverlayScrollbarHiding) 
                                        removeClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
                                    else
                                        addClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
                                }
                                else {
                                    setContentElementCSS(true);
                                    setContentElementCSS(false);
                                }
                            }
                            if (ignoreOverlayScrollbarHiding) {
                                arrangeContent.w = arrangeContent.h = _strEmpty;
                                arrangeChanged = true;
                            }
                            if (arrangeChanged && !_nativeScrollbarStyling) {
                                contentArrangeElementCSS[_strWidth] = hideOverflow.y ? arrangeContent.w : _strEmpty;
                                contentArrangeElementCSS[_strHeight] = hideOverflow.x ? arrangeContent.h : _strEmpty;

                                if (!_contentArrangeElement) {
                                    _contentArrangeElement = FRAMEWORK(generateDiv(_classNameContentArrangeElement));
                                    _viewportElement.prepend(_contentArrangeElement);
                                }
                                _contentArrangeElement.css(contentArrangeElementCSS);
                            }
                            _contentElement.css(contentElementCSS);
                        }

                        var viewportElementCSS = {};
                        var paddingElementCSS = {};
                        var setViewportCSS;
                        if (hostSizeChanged || hasOverflow.c || hideOverflow.c || contentScrollSize.c || overflowBehaviorChanged || boxSizingChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged || clipAlwaysChanged || heightAutoChanged) {
                            viewportElementCSS[isRTLRight] = _strEmpty;
                            setViewportCSS = function(horizontal) {
                                var scrollbarVars = getScrollbarVars(horizontal);
                                var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                                var xy = scrollbarVars._x_y;
                                var XY = scrollbarVars._X_Y;
                                var strDirection = horizontal ? _strBottom : isRTLLeft;

                                var reset = function () {
                                    viewportElementCSS[strDirection] = _strEmpty;
                                    _contentBorderSize[scrollbarVarsInverted._w_h] = 0;
                                };
                                if (hasOverflow[xy] && hideOverflow[xy + 's']) {
                                    viewportElementCSS[strOverflow + XY] = _strScroll;
                                    if (ignoreOverlayScrollbarHiding || _nativeScrollbarStyling) {
                                        reset();
                                    }
                                    else {
                                        viewportElementCSS[strDirection] =  -(_nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[xy] : _nativeScrollbarSize[xy]);
                                        _contentBorderSize[scrollbarVarsInverted._w_h] = _nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[scrollbarVarsInverted._x_y] : 0;
                                    }
                                } else {
                                    viewportElementCSS[strOverflow + XY] = _strEmpty;
                                    reset();
                                }
                            };
                            setViewportCSS(true);
                            setViewportCSS(false);
                            
                            // if the scroll container is too small and if there is any overflow with no overlay scrollbar (and scrollbar styling isn't possible), 
                            // make viewport element greater in size (Firefox hide Scrollbars fix)
                            // because firefox starts hiding scrollbars on too small elements
                            // with this behavior the overflow calculation may be incorrect or the scrollbars would appear suddenly
                            // https://bugzilla.mozilla.org/show_bug.cgi?id=292284
                            if (!_nativeScrollbarStyling 
                                && (_viewportSize.h < _nativeScrollbarMinSize.x || _viewportSize.w < _nativeScrollbarMinSize.y)
                                && ((hasOverflow.x && hideOverflow.x && !_nativeScrollbarIsOverlaid.x) || (hasOverflow.y && hideOverflow.y && !_nativeScrollbarIsOverlaid.y))) {
                                viewportElementCSS[_strPaddingMinus + _strTop] = _nativeScrollbarMinSize.x;
                                viewportElementCSS[_strMarginMinus + _strTop] = -_nativeScrollbarMinSize.x;

                                viewportElementCSS[_strPaddingMinus + isRTLRight] = _nativeScrollbarMinSize.y;
                                viewportElementCSS[_strMarginMinus + isRTLRight] = -_nativeScrollbarMinSize.y;
                            }
                            else {
                                viewportElementCSS[_strPaddingMinus + _strTop] =
                                viewportElementCSS[_strMarginMinus + _strTop] =
                                viewportElementCSS[_strPaddingMinus + isRTLRight] =
                                viewportElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
                            }
                            viewportElementCSS[_strPaddingMinus + isRTLLeft] =
                            viewportElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty;

                            //if there is any overflow (x OR y axis) and this overflow shall be hidden, make overflow hidden, else overflow visible
                            if ((hasOverflow.x && hideOverflow.x) || (hasOverflow.y && hideOverflow.y) || hideOverflowForceTextarea) {
                                //only hide if is Textarea
                                if (_isTextarea && hideOverflowForceTextarea) {
                                    paddingElementCSS[strOverflowX] =
                                    paddingElementCSS[strOverflowY] = strHidden;
                                }
                            }
                            else {
                                if (!clipAlways || (overflowBehaviorIsVH.x || overflowBehaviorIsVS.x || overflowBehaviorIsVH.y || overflowBehaviorIsVS.y)) {
                                    //only un-hide if Textarea
                                    if (_isTextarea) {
                                        paddingElementCSS[strOverflowX] =
                                        paddingElementCSS[strOverflowY] = _strEmpty;
                                    }
                                    viewportElementCSS[strOverflowX] =
                                    viewportElementCSS[strOverflowY] = strVisible;
                                }
                            }

                            _paddingElement.css(paddingElementCSS);
                            _viewportElement.css(viewportElementCSS);
                            viewportElementCSS = { };

                            //force soft redraw in webkit because without the scrollbars will may appear because DOM wont be redrawn under special conditions
                            if ((hasOverflow.c || boxSizingChanged || widthAutoChanged || heightAutoChanged) && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
                                var elementStyle = _contentElementNative[LEXICON.s];
                                var dump;
                                elementStyle.webkitTransform = 'scale(1)';
                                elementStyle.display = 'run-in';
                                dump = _contentElementNative[LEXICON.oH];
                                elementStyle.display = _strEmpty; //|| dump; //use dump to prevent it from deletion if minify
                                elementStyle.webkitTransform = _strEmpty;
                            }
                            /*
                            //force hard redraw in webkit if native overlaid scrollbars shall appear
                            if (ignoreOverlayScrollbarHidingChanged && ignoreOverlayScrollbarHiding) {
                                _hostElement.hide();
                                var dump = _hostElementNative[LEXICON.oH];
                                _hostElement.show();
                            }
                            */
                        }

                        //change to direction RTL and width auto Bugfix in Webkit
                        //without this fix, the DOM still thinks the scrollbar is LTR and thus the content is shifted to the left
                        contentElementCSS = {};
                        if (cssDirectionChanged || widthAutoChanged || heightAutoChanged) {
                            if (_isRTL && widthAuto) {
                                var floatTmp = _contentElement.css(_strFloat);
                                var posLeftWithoutFloat = MATH.round(_contentElement.css(_strFloat, _strEmpty).css(_strLeft, _strEmpty).position().left);
                                _contentElement.css(_strFloat, floatTmp);
                                var posLeftWithFloat = MATH.round(_contentElement.position().left);

                                if (posLeftWithoutFloat !== posLeftWithFloat)
                                    contentElementCSS[_strLeft] = posLeftWithoutFloat;
                            }
                            else {
                                contentElementCSS[_strLeft] = _strEmpty;
                            }
                        }
                        _contentElement.css(contentElementCSS);

                        //handle scroll position
                        if (_isTextarea && contentSizeChanged) {
                            var textareaInfo = getTextareaInfo();
                            if (textareaInfo) {
                                var textareaRowsChanged = _textareaInfoCache === undefined ? true : textareaInfo._rows !== _textareaInfoCache._rows;
                                var cursorRow = textareaInfo._cursorRow;
                                var cursorCol = textareaInfo._cursorColumn;
                                var widestRow = textareaInfo._widestRow;
                                var lastRow = textareaInfo._rows;
                                var lastCol = textareaInfo._columns;
                                var cursorPos = textareaInfo._cursorPosition;
                                var cursorMax = textareaInfo._cursorMax;
                                var cursorIsLastPosition = (cursorPos >= cursorMax && _textareaHasFocus);
                                var textareaScrollAmount = {
                                    x: (!textareaAutoWrapping && (cursorCol === lastCol && cursorRow === widestRow)) ? _overflowAmountCache.x : -1,
                                    y: (textareaAutoWrapping ? cursorIsLastPosition || textareaRowsChanged && (previousOverflow !== undefined ? (currScroll.y === previousOverflow.y) : false) : (cursorIsLastPosition || textareaRowsChanged) && cursorRow === lastRow) ? _overflowAmountCache.y : -1
                                };
                                currScroll.x = textareaScrollAmount.x > -1 ? (_isRTL && _normalizeRTLCache && _rtlScrollBehavior.i ? 0 : textareaScrollAmount.x) : currScroll.x; //if inverted, scroll to 0 -> normalized this means to max scroll offset.
                                currScroll.y = textareaScrollAmount.y > -1 ? textareaScrollAmount.y : currScroll.y;
                            }
                            _textareaInfoCache = textareaInfo;
                        }
                        if (_isRTL && _rtlScrollBehavior.i && _nativeScrollbarIsOverlaid.y && hasOverflow.x && _normalizeRTLCache)
                            currScroll.x += _contentBorderSize.w || 0;
                        if(widthAuto)
                            _hostElement[_strScrollLeft](0);
                        if(heightAuto)
                            _hostElement[_strScrollTop](0);
                        _viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y);

                        //scrollbars management:
                        var scrollbarsVisibilityVisible = scrollbarsVisibility === 'v';
                        var scrollbarsVisibilityHidden = scrollbarsVisibility === 'h';
                        var scrollbarsVisibilityAuto = scrollbarsVisibility === 'a';

                        var showScrollbarH = COMPATIBILITY.bind(refreshScrollbarAppearance, 0, true, true, canScroll.x);
                        var showScrollbarV = COMPATIBILITY.bind(refreshScrollbarAppearance, 0, false, true, canScroll.y);
                        var hideScrollbarH = COMPATIBILITY.bind(refreshScrollbarAppearance, 0, true, false, canScroll.x);
                        var hideScrollbarV = COMPATIBILITY.bind(refreshScrollbarAppearance, 0, false, false, canScroll.y);

                        //manage class name which indicates scrollable overflow
                        if (hideOverflow.x || hideOverflow.y)
                            addClass(_hostElement, _classNameHostOverflow);
                        else
                            removeClass(_hostElement, _classNameHostOverflow);
                        if (hideOverflow.x)
                            addClass(_hostElement, _classNameHostOverflowX);
                        else
                            removeClass(_hostElement, _classNameHostOverflowX);
                        if (hideOverflow.y)
                            addClass(_hostElement, _classNameHostOverflowY);
                        else
                            removeClass(_hostElement, _classNameHostOverflowY);

                        //add or remove rtl class name for styling purposes
                        if (cssDirectionChanged) {
                            if (_isRTL)
                                addClass(_hostElement, _classNameHostRTL);
                            else
                                removeClass(_hostElement, _classNameHostRTL);
                        }

                        //manage the resize feature (CSS3 resize "polyfill" for this plugin)
                        if (_isBody)
                            addClass(_hostElement, _classNameHostResizeDisabled);
                        if (resizeChanged) {
                            var addCornerEvents = function () { _scrollbarCornerElement.on(_strMouseTouchDownEvent, _resizeOnMouseTouchDown); };
                            var removeCornerEvents = function () { _scrollbarCornerElement.off(_strMouseTouchDownEvent, _resizeOnMouseTouchDown); };
                            removeClass(_scrollbarCornerElement, [
                                    _classNameHostResizeDisabled,
                                    _classNameScrollbarCornerResize,
                                    _classNameScrollbarCornerResizeB,
                                    _classNameScrollbarCornerResizeH,
                                    _classNameScrollbarCornerResizeV].join(_strSpace));
                            if (_resizeNone) {
                                addClass(_hostElement, _classNameHostResizeDisabled);
                                removeCornerEvents();
                            }
                            else {
                                addClass(_scrollbarCornerElement, _classNameScrollbarCornerResize);
                                if (_resizeBoth)
                                    addClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeB);
                                else if (_resizeHorizontal)
                                    addClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeH);
                                else if (_resizeVertical)
                                    addClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeV);

                                removeCornerEvents();
                                addCornerEvents();
                            }
                        }

                        //manage the scrollbars general visibility + the scrollbar interactivity (unusable class name)
                        if (scrollbarsVisibilityChanged || overflowBehaviorChanged || hideOverflow.c || hasOverflow.c || ignoreOverlayScrollbarHidingChanged) {
                            if (ignoreOverlayScrollbarHiding) {
                                if (ignoreOverlayScrollbarHidingChanged) {
                                    removeClass(_hostElement, _classNameHostScrolling);
                                    if (ignoreOverlayScrollbarHiding) {
                                        hideScrollbarH();
                                        hideScrollbarV();
                                    }
                                }
                            }
                            else if (scrollbarsVisibilityAuto) {
                                if (canScroll.x)
                                    showScrollbarH();
                                else
                                    hideScrollbarH();

                                if (canScroll.y)
                                    showScrollbarV();
                                else
                                    hideScrollbarV();
                            }
                            else if (scrollbarsVisibilityVisible) {
                                showScrollbarH();
                                showScrollbarV();
                            }
                            else if (scrollbarsVisibilityHidden) {
                                hideScrollbarH();
                                hideScrollbarV();
                            }
                        }

                        //manage the scrollbars auto hide feature (auto hide them after specific actions)
                        if (scrollbarsAutoHideChanged || ignoreOverlayScrollbarHidingChanged) {
                            if (_scrollbarsAutoHideLeave || _scrollbarsAutoHideMove) {
                                setupHostMouseTouchEvents(true);
                                setupHostMouseTouchEvents();
                            }
                            else {
                                setupHostMouseTouchEvents(true);
                            }

                            if (_scrollbarsAutoHideNever)
                                refreshScrollbarsAutoHide(true);
                            else
                                refreshScrollbarsAutoHide(false, true);
                        }

                        //manage scrollbars handle length & offset - don't remove!
                        if (hostSizeChanged || overflowAmount.c || heightAutoChanged || widthAutoChanged || resizeChanged || boxSizingChanged || paddingAbsoluteChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged) {
                            refreshScrollbarHandleLength(true);
                            refreshScrollbarHandleOffset(true);
                            refreshScrollbarHandleLength(false);
                            refreshScrollbarHandleOffset(false);
                        }

                        //manage interactivity
                        if (scrollbarsClickScrollingChanged)
                            refreshScrollbarsInteractive(true, scrollbarsClickScrolling);
                        if (scrollbarsDragScrollingChanged)
                            refreshScrollbarsInteractive(false, scrollbarsDragScrolling);

                        //callbacks:
                        if (cssDirectionChanged) {
                            dispatchCallback("onDirectionChanged", {
                                isRTL: _isRTL,
                                dir: cssDirection
                            });
                        }
                        if (hostSizeChanged) {
                            dispatchCallback("onHostSizeChanged", {
                                width: _hostSizeCache.w,
                                height: _hostSizeCache.h
                            });
                        }
                        if (contentSizeChanged) {
                            dispatchCallback("onContentSizeChanged", {
                                width: _contentScrollSizeCache.w,
                                height: _contentScrollSizeCache.h
                            });
                        }
                        if (hasOverflow.c || hideOverflow.c) {
                            dispatchCallback("onOverflowChanged", {
                                x: hasOverflow.x,
                                y: hasOverflow.y,
                                xScrollable: hideOverflow.xs,
                                yScrollable: hideOverflow.ys,
                                clipped: hideOverflow.x || hideOverflow.y
                            });
                        }
                        if (overflowAmount.c) {
                            dispatchCallback("onOverflowAmountChanged", {
                                x: overflowAmount.x,
                                y: overflowAmount.y
                            });
                        }
                    }

                    //fix body min size
                    if (_isBody && (_hasOverflowCache.c || _bodyMinSizeCache.c)) {
                        //its possible that no min size was measured until now, because the content arrange element was just added now, in this case, measure now the min size.
                        if (!_bodyMinSizeCache.f)
                            bodyMinSizeChanged();
                        if (_nativeScrollbarIsOverlaid.y && _hasOverflowCache.x)
                            _contentElement.css(_strMinMinus + _strWidth, _bodyMinSizeCache.w + _overlayScrollbarDummySize.y);
                        if (_nativeScrollbarIsOverlaid.x && _hasOverflowCache.y)
                            _contentElement.css(_strMinMinus + _strHeight, _bodyMinSizeCache.h + _overlayScrollbarDummySize.x);
                        _bodyMinSizeCache.c = false;
                    }

                    unfreezeResizeObserver(_sizeObserverElement);
                    unfreezeResizeObserver(_sizeAutoObserverElement);

                    dispatchCallback("onUpdated", { forced: force });
                }


                //==== Options ====//

                /**
                 * Sets new options but doesn't call the update method.
                 * @param newOptions The object which contains the new options.
                 */
                function setOptions(newOptions) {
                    _currentOptions = extendDeep({}, _currentOptions, _pluginsOptions._validate(newOptions, _pluginsOptions._template, true));
                    _currentPreparedOptions = extendDeep({}, _currentPreparedOptions, _pluginsOptions._validate(newOptions, _pluginsOptions._template, false, true));
                }


                //==== Structure ====//

                /**
                 * Builds or destroys the wrapper and helper DOM elements.
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupStructureDOM(destroy) {
                    var adoptAttrs = _currentPreparedOptions.textarea.inheritedAttrs;
                    var adoptAttrsMap = { };
                    var applyAdoptedAttrs = function() {
                        var applyAdoptedAttrsElm = destroy ? _targetElement : _hostElement;
                        FRAMEWORK.each(adoptAttrsMap, function(k, v) {
                            if(type(v) == TYPES.s) {
                                if(k == LEXICON.c)
                                    applyAdoptedAttrsElm.addClass(v);
                                else
                                    applyAdoptedAttrsElm.attr(k, v);
                            }
                        });
                    };
                    var hostElementClassNames = [
                        _classNameHostElement,
                        _classNameHostTextareaElement,
                        _classNameHostResizeDisabled,
                        _classNameHostRTL,
                        _classNameHostScrollbarHorizontalHidden,
                        _classNameHostScrollbarVerticalHidden,
                        _classNameHostTransition,
                        _classNameHostScrolling,
                        _classNameHostOverflow,
                        _classNameHostOverflowX,
                        _classNameHostOverflowY,
                        _classNameThemeNone,
                        _classNameTextareaElement,
                        _classNameTextInherit,
                        _classNameCache].join(_strSpace);
                    adoptAttrs = type(adoptAttrs) == TYPES.s ? adoptAttrs.split(' ') : adoptAttrs;
                    if(type(adoptAttrs) == TYPES.a) {
                        FRAMEWORK.each(adoptAttrs, function(i, v) {
                            if(type(v) == TYPES.s)
                                adoptAttrsMap[v] = destroy ? _hostElement.attr(v) : _targetElement.attr(v);
                        });
                    }

                    if(!destroy) {
                        if (_isTextarea) {
                            var hostElementCSS = {};
                            var parent = _targetElement.parent();
                            _isTextareaHostGenerated = !(parent.hasClass(_classNameHostTextareaElement) && parent.children()[LEXICON.l] === 1);

                            if (!_currentPreparedOptions.sizeAutoCapable) {
                                hostElementCSS[_strWidth] = _targetElement.css(_strWidth);
                                hostElementCSS[_strHeight] = _targetElement.css(_strHeight);
                            }
                            if(_isTextareaHostGenerated)
                                _targetElement.wrap(generateDiv(_classNameHostTextareaElement));

                            _hostElement = _targetElement.parent();
                            _hostElement.css(hostElementCSS)
                                .wrapInner(generateDiv(_classNameContentElement + _strSpace + _classNameTextInherit))
                                .wrapInner(generateDiv(_classNameViewportElement + _strSpace + _classNameTextInherit))
                                .wrapInner(generateDiv(_classNamePaddingElement + _strSpace + _classNameTextInherit));
                            _contentElement = findFirst(_hostElement, _strDot + _classNameContentElement);
                            _viewportElement = findFirst(_hostElement, _strDot + _classNameViewportElement);
                            _paddingElement = findFirst(_hostElement, _strDot + _classNamePaddingElement);
                            _textareaCoverElement = FRAMEWORK(generateDiv(_classNameTextareaCoverElement));
                            _contentElement.prepend(_textareaCoverElement);

                            addClass(_targetElement, _classNameTextareaElement + _strSpace + _classNameTextInherit);

                            if(_isTextareaHostGenerated)
                                applyAdoptedAttrs();
                        }
                        else {
                            _hostElement = _targetElement;
                            _hostElement.wrapInner(generateDiv(_classNameContentElement))
                                .wrapInner(generateDiv(_classNameViewportElement))
                                .wrapInner(generateDiv(_classNamePaddingElement));
                            _contentElement = findFirst(_hostElement, _strDot + _classNameContentElement);
                            _viewportElement = findFirst(_hostElement, _strDot + _classNameViewportElement);
                            _paddingElement = findFirst(_hostElement, _strDot + _classNamePaddingElement);

                            addClass(_targetElement, _classNameHostElement);
                        }
                        
                        if (_nativeScrollbarStyling)
                            addClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
                        if(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)
                            addClass(_viewportElement, _classNameViewportNativeScrollbarsOverlaid);
                        if (_isBody)
                            addClass(_htmlElement, _classNameHTMLElement);

                        _sizeObserverElement = FRAMEWORK(generateDiv('os-resize-observer-host'));
                        _hostElement.prepend(_sizeObserverElement);

                        _sizeObserverElementNative = _sizeObserverElement[0];
                        _hostElementNative = _hostElement[0];
                        _paddingElementNative = _paddingElement[0];
                        _viewportElementNative = _viewportElement[0];
                        _contentElementNative = _contentElement[0];
                    }
                    else {
                        _contentElement.contents()
                            .unwrap()
                            .unwrap()
                            .unwrap();

                        removeClass(_hostElement, hostElementClassNames);
                        if (_isTextarea) {
                            _targetElement.removeAttr(LEXICON.s);

                            if(_isTextareaHostGenerated)
                                applyAdoptedAttrs();

                            removeClass(_targetElement, hostElementClassNames);
                            remove(_textareaCoverElement);

                            if(_isTextareaHostGenerated) {
                                _targetElement.unwrap();
                                remove(_hostElement);
                            }
                            else {
                                addClass(_hostElement, _classNameHostTextareaElement);
                            }
                        }
                        else {
                            removeClass(_targetElement, _classNameHostElement);
                        }

                        if (_isBody)
                            removeClass(_htmlElement, _classNameHTMLElement);

                        remove(_sizeObserverElement);
                    }
                }

                /**
                 * Adds or removes all wrapper elements interactivity events.
                 * @param destroy Indicates whether the Events shall be added or removed.
                 */
                function setupStructureEvents(destroy) {
                    var textareaKeyDownRestrictedKeyCodes = [
                        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123,    //F1 to F12
                        33, 34,                                                   //page up, page down
                        37, 38, 39, 40,                                           //left, up, right, down arrows
                        16, 17, 18, 19, 20, 144                                   //Shift, Ctrl, Alt, Pause, CapsLock, NumLock
                    ];
                    var textareaKeyDownKeyCodesList = [ ];
                    var textareaUpdateIntervalID;
                    var scrollStopDelay = 175;
                    var scrollStopTimeoutId;
                    var strOnOff = destroy ? 'off' : 'on';
                    var updateTextarea;
                    var viewportOnScroll;

                    if(!destroy && _isTextarea) {
                        _textareaEvents = { };
                        updateTextarea = function(doClearInterval) {
                            textareaUpdate();
                            _base.update(_strAuto);
                            if(doClearInterval)
                                clearInterval(textareaUpdateIntervalID);
                        };
                        _textareaEvents[_strScroll] = function(event) {
                            _targetElement[_strScrollLeft](_rtlScrollBehavior.i && _normalizeRTLCache ? 9999999 : 0);
                            _targetElement[_strScrollTop](0);
                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                            return false;
                        };
                        _textareaEvents['drop'] = function() {
                            setTimeout(function () {
                                if(!_destroyed)
                                    updateTextarea();
                            }, 50);
                        };
                        _textareaEvents['focus'] = function() {
                            _textareaHasFocus = true;
                        };
                        _textareaEvents['focusout'] = function() {
                            _textareaHasFocus = false;
                            textareaKeyDownKeyCodesList = [ ];
                            updateTextarea(true);
                        };
                        if (_msieVersion > 9 || !_autoUpdateRecommended) {
                            _textareaEvents['input'] = function textareaOnInput() {
                                updateTextarea();
                            }
                        }
                        else {
                            _textareaEvents[_strKeyDownEvent] = function textareaOnKeyDown(event) {
                                var keyCode = event.keyCode;
                                if (FRAMEWORK.inArray(keyCode, textareaKeyDownRestrictedKeyCodes) > -1)
                                    return;
                                if (!textareaKeyDownKeyCodesList.length) {
                                    updateTextarea();
                                    textareaUpdateIntervalID = setInterval(updateTextarea, 1000 / 60);
                                }
                                if (FRAMEWORK.inArray(keyCode, textareaKeyDownKeyCodesList) === -1)
                                    textareaKeyDownKeyCodesList.push(keyCode);
                            };
                            _textareaEvents[_strKeyUpEvent] = function(event) {
                                var keyCode = event.keyCode;
                                var index = FRAMEWORK.inArray(keyCode, textareaKeyDownKeyCodesList);

                                if (FRAMEWORK.inArray(keyCode, textareaKeyDownRestrictedKeyCodes) > -1)
                                    return;
                                if (index > -1)
                                    textareaKeyDownKeyCodesList.splice(index, 1);
                                if (!textareaKeyDownKeyCodesList.length)
                                    updateTextarea(true);
                            };
                        }
                    }

                    if (_isTextarea) {
                        FRAMEWORK.each(_textareaEvents, function(key, value) {
                            _targetElement[strOnOff](key, value);
                        });
                    }
                    else {
                        _contentElement[strOnOff](_strTransitionEndEvent, function (event) {
                            if (_autoUpdateCache === true)
                                return;
                            event = event.originalEvent || event;
                            if (isSizeAffectingCSSProperty(event.propertyName))
                                update(_strAuto);
                        });
                    }

                    if(!destroy) {
                        viewportOnScroll = function(event) {
                            if (_isSleeping)
                                return;

                            if (scrollStopTimeoutId !== undefined)
                                clearTimeout(scrollStopTimeoutId);
                            else {
                                if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                    refreshScrollbarsAutoHide(true);

                                if (!nativeOverlayScrollbarsAreActive())
                                    addClass(_hostElement, _classNameHostScrolling);

                                dispatchCallback("onScrollStart", event);
                            }

                            //if a scrollbars handle gets dragged, the mousemove event is responsible for refreshing the handle offset
                            //because if CSS scroll-snap is used, the handle offset gets only refreshed on every snap point
                            //this looks laggy & clunky, it looks much better if the offset refreshes with the mousemove
                            if(!_scrollbarsHandleAsync) {
                                refreshScrollbarHandleOffset(true);
                                refreshScrollbarHandleOffset(false);
                            }
                            dispatchCallback("onScroll", event);

                            scrollStopTimeoutId = setTimeout(function () {
                                if(!_destroyed) {
                                    //OnScrollStop:
                                    clearTimeout(scrollStopTimeoutId);
                                    scrollStopTimeoutId = undefined;

                                    if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                        refreshScrollbarsAutoHide(false);

                                    if (!nativeOverlayScrollbarsAreActive())
                                        removeClass(_hostElement, _classNameHostScrolling);

                                    dispatchCallback("onScrollStop", event);
                                }
                            }, scrollStopDelay);
                        };

                        if (_supportPassiveEvents)
                            addPassiveEventListener(_viewportElement, _strScroll, viewportOnScroll);
                        else
                            _viewportElement.on(_strScroll, viewportOnScroll);
                    }
                }



                //==== Scrollbars ====//

                /**
                 * Builds or destroys all scrollbar DOM elements (scrollbar, track, handle)
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupScrollbarsDOM(destroy) {
                    if(!destroy) {
                        _scrollbarHorizontalElement = FRAMEWORK(generateDiv(_classNameScrollbar + _strSpace + _classNameScrollbarHorizontal));
                        _scrollbarHorizontalTrackElement = FRAMEWORK(generateDiv(_classNameScrollbarTrack));
                        _scrollbarHorizontalHandleElement = FRAMEWORK(generateDiv(_classNameScrollbarHandle));
                        _scrollbarVerticalElement = FRAMEWORK(generateDiv(_classNameScrollbar + _strSpace + _classNameScrollbarVertical));
                        _scrollbarVerticalTrackElement = FRAMEWORK(generateDiv(_classNameScrollbarTrack));
                        _scrollbarVerticalHandleElement = FRAMEWORK(generateDiv(_classNameScrollbarHandle));

                        _scrollbarHorizontalElement.append(_scrollbarHorizontalTrackElement);
                        _scrollbarHorizontalTrackElement.append(_scrollbarHorizontalHandleElement);
                        _scrollbarVerticalElement.append(_scrollbarVerticalTrackElement);
                        _scrollbarVerticalTrackElement.append(_scrollbarVerticalHandleElement);

                        _paddingElement.after(_scrollbarVerticalElement);
                        _paddingElement.after(_scrollbarHorizontalElement);
                    }
                    else {
                        remove(_scrollbarHorizontalElement);
                        remove(_scrollbarVerticalElement);
                    }
                }

                /**
                 * Initializes all scrollbar interactivity events. (track and handle dragging, clicking, scrolling)
                 * @param isHorizontal True if the target scrollbar is the horizontal scrollbar, false if the target scrollbar is the vertical scrollbar.
                 */
                function setupScrollbarEvents(isHorizontal) {
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var insideIFrame = _windowElementNative.top !== _windowElementNative;
                    var xy = scrollbarVars._x_y;
                    var XY = scrollbarVars._X_Y;
                    var scroll = _strScroll + scrollbarVars._Left_Top;
                    var strActive = 'active';
                    var strSnapHandle = 'snapHandle';
                    var scrollDurationFactor = 1;
                    var increaseDecreaseScrollAmountKeyCodes = [ 16, 17 ]; //shift, ctrl
                    var trackTimeout;
                    var mouseDownScroll;
                    var mouseDownOffset;
                    var mouseDownInvertedScale;

                    function getPointerPosition(event) {
                        return _msieVersion && insideIFrame ? event['screen' + XY] : COMPATIBILITY.page(event)[xy]; //use screen coordinates in EDGE & IE because the page values are incorrect in frames.
                    }
                    function getPreparedScrollbarsOption(name) {
                        return _currentPreparedOptions.scrollbars[name];
                    }
                    function increaseTrackScrollAmount() {
                        scrollDurationFactor = 0.5;
                    }
                    function decreaseTrackScrollAmount() {
                        scrollDurationFactor = 1;
                    }
                    function documentKeyDown(event) {
                        if (FRAMEWORK.inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                            increaseTrackScrollAmount();
                    }
                    function documentKeyUp(event) {
                        if (FRAMEWORK.inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                            decreaseTrackScrollAmount();
                    }
                    function onMouseTouchDownContinue(event) {
                        var originalEvent = event.originalEvent || event;
                        var isTouchEvent = originalEvent.touches !== undefined;
                        return _isSleeping || _destroyed || nativeOverlayScrollbarsAreActive() || !_scrollbarsDragScrollingCache || (isTouchEvent && !getPreparedScrollbarsOption('touchSupport')) ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
                    }
                    function documentDragMove(event) {
                        if(onMouseTouchDownContinue(event)) {
                            var trackLength = scrollbarVarsInfo._trackLength;
                            var handleLength = scrollbarVarsInfo._handleLength;
                            var scrollRange = scrollbarVarsInfo._maxScroll;
                            var scrollRaw = (getPointerPosition(event) - mouseDownOffset) * mouseDownInvertedScale;
                            var scrollDeltaPercent = scrollRaw / (trackLength - handleLength);
                            var scrollDelta = (scrollRange * scrollDeltaPercent);
                            scrollDelta = isFinite(scrollDelta) ? scrollDelta : 0;
                            if (_isRTL && isHorizontal && !_rtlScrollBehavior.i)
                                scrollDelta *= -1;

                            _viewportElement[scroll](MATH.round(mouseDownScroll + scrollDelta));

                            if(_scrollbarsHandleAsync)
                                refreshScrollbarHandleOffset(isHorizontal, mouseDownScroll + scrollDelta);

                            if (!_supportPassiveEvents)
                                COMPATIBILITY.prvD(event);
                        }
                        else
                            documentMouseTouchUp(event);
                    }
                    function documentMouseTouchUp(event) {
                        event = event || event.originalEvent;

                        _documentElement.off(_strMouseTouchMoveEvent, documentDragMove)
                            .off(_strMouseTouchUpEvent, documentMouseTouchUp)
                            .off(_strKeyDownEvent, documentKeyDown)
                            .off(_strKeyUpEvent, documentKeyUp)
                            .off(_strSelectStartEvent, documentOnSelectStart);

                        if(_scrollbarsHandleAsync)
                            refreshScrollbarHandleOffset(isHorizontal, true);

                        _scrollbarsHandleAsync = false;
                        removeClass(_bodyElement, _classNameDragging);
                        removeClass(scrollbarVars._handle, strActive);
                        removeClass(scrollbarVars._track, strActive);
                        removeClass(scrollbarVars._scrollbar, strActive);

                        mouseDownScroll = undefined;
                        mouseDownOffset = undefined;
                        mouseDownInvertedScale = 1;

                        decreaseTrackScrollAmount();

                        if (trackTimeout !== undefined) {
                            _base.scrollStop();
                            clearTimeout(trackTimeout);
                            trackTimeout = undefined;
                        }

                        if(event) {
                            var rect = _hostElementNative.getBoundingClientRect();
                            var mouseInsideHost = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

                            //if mouse is outside host element
                            if (!mouseInsideHost)
                                hostOnMouseLeave();

                            if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                refreshScrollbarsAutoHide(false);
                        }
                    }
                    function onHandleMouseTouchDown(event) {
                        mouseDownScroll = _viewportElement[scroll]();
                        mouseDownScroll = isNaN(mouseDownScroll) ? 0 : mouseDownScroll;
                        if (_isRTL && isHorizontal && !_rtlScrollBehavior.n || !_isRTL)
                            mouseDownScroll = mouseDownScroll < 0 ? 0 : mouseDownScroll;

                        mouseDownInvertedScale = getHostElementInvertedScale()[xy];
                        mouseDownOffset = getPointerPosition(event);

                        _scrollbarsHandleAsync = !getPreparedScrollbarsOption(strSnapHandle);
                        addClass(_bodyElement, _classNameDragging);
                        addClass(scrollbarVars._handle, strActive);
                        addClass(scrollbarVars._scrollbar, strActive);

                        _documentElement.on(_strMouseTouchMoveEvent, documentDragMove)
                            .on(_strMouseTouchUpEvent, documentMouseTouchUp)
                            .on(_strSelectStartEvent, documentOnSelectStart);

                        if(_msieVersion || !_documentMixed)
                            COMPATIBILITY.prvD(event);
                        COMPATIBILITY.stpP(event);
                    }
                    scrollbarVars._handle.on(_strMouseTouchDownEvent, function(event) {
                        if (onMouseTouchDownContinue(event))
                            onHandleMouseTouchDown(event);
                    });
                    scrollbarVars._track.on(_strMouseTouchDownEvent, function(event) {
                        if (onMouseTouchDownContinue(event)) {
                            var scrollDistance = MATH.round(_viewportSize[scrollbarVars._w_h]);
                            var trackOffset = scrollbarVars._track.offset()[scrollbarVars._left_top];
                            var ctrlKey = event.ctrlKey;
                            var instantScroll = event.shiftKey;
                            var instantScrollTransition = instantScroll && ctrlKey;
                            var isFirstIteration = true;
                            var easing = 'linear';
                            var decreaseScroll;
                            var finishedCondition;
                            var scrollActionFinsished = function(transition) {
                                if(_scrollbarsHandleAsync)
                                    refreshScrollbarHandleOffset(isHorizontal, transition);
                            };
                            var scrollActionInstantFinished = function() {
                                scrollActionFinsished();
                                onHandleMouseTouchDown(event);
                            };
                            var scrollAction = function () {
                                if(!_destroyed) {
                                    var mouseOffset = (mouseDownOffset - trackOffset) * mouseDownInvertedScale;
                                    var handleOffset = scrollbarVarsInfo._handleOffset;
                                    var trackLength = scrollbarVarsInfo._trackLength;
                                    var handleLength = scrollbarVarsInfo._handleLength;
                                    var scrollRange = scrollbarVarsInfo._maxScroll;
                                    var currScroll = scrollbarVarsInfo._currentScroll;
                                    var scrollDuration = 270 * scrollDurationFactor;
                                    var timeoutDelay = isFirstIteration ? MATH.max(400, scrollDuration) : scrollDuration;
                                    var instantScrollPosition = scrollRange * ((mouseOffset - (handleLength / 2)) / (trackLength - handleLength)); // 100% * positionPercent
                                    var rtlIsNormal = _isRTL && isHorizontal && ((!_rtlScrollBehavior.i && !_rtlScrollBehavior.n) || _normalizeRTLCache);
                                    var decreaseScrollCondition = rtlIsNormal ? handleOffset < mouseOffset : handleOffset > mouseOffset;
                                    var scrollObj = { };
                                    var animationObj = {
                                        easing : easing,
                                        step : function(now) {
                                            if(_scrollbarsHandleAsync) {
                                                _viewportElement[scroll](now); //https://github.com/jquery/jquery/issues/4340
                                                refreshScrollbarHandleOffset(isHorizontal, now);
                                            }
                                        }
                                    };
                                    instantScrollPosition = isFinite(instantScrollPosition) ? instantScrollPosition : 0;
                                    instantScrollPosition = _isRTL && isHorizontal && !_rtlScrollBehavior.i ? (scrollRange - instantScrollPosition) : instantScrollPosition;

                                    //_base.scrollStop();

                                    if(instantScroll) {
                                        _viewportElement[scroll](instantScrollPosition); //scroll instantly to new position
                                        if(instantScrollTransition) {
                                            //get the scroll position after instant scroll (in case CSS Snap Points are used) to get the correct snapped scroll position
                                            //and the animation stops at the correct point
                                            instantScrollPosition = _viewportElement[scroll]();
                                            //scroll back to the position before instant scrolling so animation can be performed
                                            _viewportElement[scroll](currScroll);

                                            instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.i ? (scrollRange - instantScrollPosition) : instantScrollPosition;
                                            instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.n ? -instantScrollPosition : instantScrollPosition;

                                            scrollObj[xy] = instantScrollPosition;
                                            _base.scroll(scrollObj, extendDeep(animationObj, {
                                                duration : 130,
                                                complete : scrollActionInstantFinished
                                            }));
                                        }
                                        else
                                            scrollActionInstantFinished();
                                    }
                                    else {
                                        decreaseScroll = isFirstIteration ? decreaseScrollCondition : decreaseScroll;
                                        finishedCondition = rtlIsNormal
                                            ? (decreaseScroll ? handleOffset + handleLength >= mouseOffset : handleOffset <= mouseOffset)
                                            : (decreaseScroll ? handleOffset <= mouseOffset : handleOffset + handleLength >= mouseOffset);

                                        if (finishedCondition) {
                                            clearTimeout(trackTimeout);
                                            _base.scrollStop();
                                            trackTimeout = undefined;
                                            scrollActionFinsished(true);
                                        }
                                        else {
                                            trackTimeout = setTimeout(scrollAction, timeoutDelay);

                                            scrollObj[xy] = (decreaseScroll ? '-=' : '+=') + scrollDistance;
                                            _base.scroll(scrollObj, extendDeep(animationObj, {
                                                duration: scrollDuration
                                            }));
                                        }
                                        isFirstIteration = false;
                                    }
                                }
                            };
                            if (ctrlKey)
                                increaseTrackScrollAmount();

                            mouseDownInvertedScale = getHostElementInvertedScale()[xy];
                            mouseDownOffset = COMPATIBILITY.page(event)[xy];

                            _scrollbarsHandleAsync = !getPreparedScrollbarsOption(strSnapHandle);
                            addClass(_bodyElement, _classNameDragging);
                            addClass(scrollbarVars._track, strActive);
                            addClass(scrollbarVars._scrollbar, strActive);

                            _documentElement.on(_strMouseTouchUpEvent, documentMouseTouchUp)
                                .on(_strKeyDownEvent, documentKeyDown)
                                .on(_strKeyUpEvent, documentKeyUp)
                                .on(_strSelectStartEvent, documentOnSelectStart);

                            scrollAction();
                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                        }
                    }).on(_strMouseTouchEnter, function() { //make sure both scrollbars will stay visible if one scrollbar is hovered if autoHide is "scroll" or "move".
                        _scrollbarsHandleHovered = true;
                        if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                            refreshScrollbarsAutoHide(true);

                    }).on(_strMouseTouchLeave, function() {
                        _scrollbarsHandleHovered = false;
                        if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                            refreshScrollbarsAutoHide(false);
                    });
                    scrollbarVars._scrollbar.on(_strMouseTouchDownEvent, function(event) {
                        COMPATIBILITY.stpP(event);
                    });
                    if (_supportTransition) {
                        scrollbarVars._scrollbar.on(_strTransitionEndEvent, function(event) {
                            if (event.target !== scrollbarVars._scrollbar[0])
                                return;
                            refreshScrollbarHandleLength(isHorizontal);
                            refreshScrollbarHandleOffset(isHorizontal);
                        });
                    }
                }

                /**
                 * Shows or hides the given scrollbar and applied a class name which indicates if the scrollbar is scrollable or not.
                 * @param isHorizontal True if the horizontal scrollbar is the target, false if the vertical scrollbar is the target.
                 * @param shallBeVisible True if the scrollbar shall be shown, false if hidden.
                 * @param canScroll True if the scrollbar is scrollable, false otherwise.
                 */
                function refreshScrollbarAppearance(isHorizontal, shallBeVisible, canScroll) {
                    var scrollbarClassName = isHorizontal ? _classNameHostScrollbarHorizontalHidden : _classNameHostScrollbarVerticalHidden;
                    var scrollbarElement = isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement;

                    if (shallBeVisible)
                        removeClass(_hostElement, scrollbarClassName);
                    else
                        addClass(_hostElement, scrollbarClassName);

                    if (canScroll)
                        removeClass(scrollbarElement, _classNameScrollbarUnusable);
                    else
                        addClass(scrollbarElement, _classNameScrollbarUnusable);
                }

                /**
                 * Autoshows / autohides both scrollbars with.
                 * @param shallBeVisible True if the scrollbars shall be autoshown (only the case if they are hidden by a autohide), false if the shall be auto hidden.
                 * @param delayfree True if the scrollbars shall be hidden without a delay, false or undefined otherwise.
                 */
                function refreshScrollbarsAutoHide(shallBeVisible, delayfree) {
                    clearTimeout(_scrollbarsAutoHideTimeoutId);
                    if (shallBeVisible) {
                        //if(_hasOverflowCache.x && _hideOverflowCache.xs)
                        removeClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
                        //if(_hasOverflowCache.y && _hideOverflowCache.ys)
                        removeClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
                    }
                    else {
                        var anyActive;
                        var strActive = 'active';
                        var hide = function () {
                            if (!_scrollbarsHandleHovered && !_destroyed) {
                                anyActive = _scrollbarHorizontalHandleElement.hasClass(strActive) || _scrollbarVerticalHandleElement.hasClass(strActive);
                                if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                                    addClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
                                if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                                    addClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
                            }
                        };
                        if (_scrollbarsAutoHideDelay > 0 && delayfree !== true)
                            _scrollbarsAutoHideTimeoutId = setTimeout(hide, _scrollbarsAutoHideDelay);
                        else
                            hide();
                    }
                }

                /**
                 * Refreshes the handle length of the given scrollbar.
                 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
                 */
                function refreshScrollbarHandleLength(isHorizontal) {
                    var handleCSS = {};
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var digit = 1000000;
                    //get and apply intended handle length
                    var handleRatio = MATH.min(1, (_hostSizeCache[scrollbarVars._w_h] - (_paddingAbsoluteCache ? (isHorizontal ? _paddingX : _paddingY) : 0)) / _contentScrollSizeCache[scrollbarVars._w_h]);
                    handleCSS[scrollbarVars._width_height] = (MATH.floor(handleRatio * 100 * digit) / digit) + "%"; //the last * digit / digit is for flooring to the 4th digit

                    if (!nativeOverlayScrollbarsAreActive())
                        scrollbarVars._handle.css(handleCSS);

                    //measure the handle length to respect min & max length
                    scrollbarVarsInfo._handleLength = scrollbarVars._handle[0]['offset' + scrollbarVars._Width_Height];
                    scrollbarVarsInfo._handleLengthRatio = handleRatio;
                }

                /**
                 * Refreshes the handle offset of the given scrollbar.
                 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
                 * @param scrollOrTransition The scroll position of the given scrollbar axis to which the handle shall be moved or a boolean which indicates whether a transition shall be applied. If undefined or boolean if the current scroll-offset is taken. (if isHorizontal ? scrollLeft : scrollTop)
                 */
                function refreshScrollbarHandleOffset(isHorizontal, scrollOrTransition) {
                    var transition = type(scrollOrTransition) == TYPES.b;
                    var transitionDuration = 250;
                    var isRTLisHorizontal = _isRTL && isHorizontal;
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var strTranslateBrace = 'translate(';
                    var strTransform = VENDORS._cssProperty('transform');
                    var strTransition = VENDORS._cssProperty('transition');
                    var nativeScroll = isHorizontal ? _viewportElement[_strScrollLeft]() : _viewportElement[_strScrollTop]();
                    var currentScroll = scrollOrTransition === undefined || transition ? nativeScroll : scrollOrTransition;

                    //measure the handle length to respect min & max length
                    var handleLength = scrollbarVarsInfo._handleLength;
                    var trackLength = scrollbarVars._track[0]['offset' + scrollbarVars._Width_Height];
                    var handleTrackDiff = trackLength - handleLength;
                    var handleCSS = {};
                    var transformOffset;
                    var translateValue;

                    //DONT use the variable '_contentScrollSizeCache[scrollbarVars._w_h]' instead of '_viewportElement[0]['scroll' + scrollbarVars._Width_Height]'
                    // because its a bit behind during the small delay when content size updates
                    //(delay = mutationObserverContentLag, if its 0 then this var could be used)
                    var maxScroll = (_viewportElementNative[_strScroll + scrollbarVars._Width_Height] - _viewportElementNative['client' + scrollbarVars._Width_Height]) * (_rtlScrollBehavior.n && isRTLisHorizontal ? -1 : 1); //* -1 if rtl scroll max is negative
                    var getScrollRatio = function(base) {
                        return isNaN(base / maxScroll) ? 0 : MATH.max(0, MATH.min(1, base / maxScroll));
                    };
                    var getHandleOffset = function(scrollRatio) {
                        var offset = handleTrackDiff * scrollRatio;
                        offset = isNaN(offset) ? 0 : offset;
                        offset = (isRTLisHorizontal && !_rtlScrollBehavior.i) ? (trackLength - handleLength - offset) : offset;
                        offset = MATH.max(0, offset);
                        return offset;
                    };
                    var scrollRatio = getScrollRatio(nativeScroll);
                    var unsnappedScrollRatio = getScrollRatio(currentScroll);
                    var handleOffset = getHandleOffset(unsnappedScrollRatio);
                    var snappedHandleOffset = getHandleOffset(scrollRatio);

                    scrollbarVarsInfo._maxScroll = maxScroll;
                    scrollbarVarsInfo._currentScroll = nativeScroll;
                    scrollbarVarsInfo._currentScrollRatio = scrollRatio;

                    if (_supportTransform) {
                        transformOffset = isRTLisHorizontal ? -(trackLength - handleLength - handleOffset) : handleOffset; //in px
                        //transformOffset = (transformOffset / trackLength * 100) * (trackLength / handleLength); //in %
                        translateValue = isHorizontal ? strTranslateBrace + transformOffset + 'px, 0)' : strTranslateBrace + '0, ' + transformOffset + 'px)';

                        handleCSS[strTransform] = translateValue;

                        //apply or clear up transition
                        if(_supportTransition)
                            handleCSS[strTransition] = transition && MATH.abs(handleOffset - scrollbarVarsInfo._handleOffset) > 1 ? getCSSTransitionString(scrollbarVars._handle) + ', ' +  (strTransform + _strSpace + transitionDuration + 'ms') : _strEmpty;
                    }
                    else
                        handleCSS[scrollbarVars._left_top] = handleOffset;


                    //only apply css if offset has changed and overflow exists.
                    if (!nativeOverlayScrollbarsAreActive()) {
                        scrollbarVars._handle.css(handleCSS);

                        //clear up transition
                        if(_supportTransform && _supportTransition && transition) {
                            scrollbarVars._handle.one(_strTransitionEndEvent, function() {
                                if(!_destroyed)
                                    scrollbarVars._handle.css(strTransition, _strEmpty);
                            });
                        }
                    }

                    scrollbarVarsInfo._handleOffset = handleOffset;
                    scrollbarVarsInfo._snappedHandleOffset = snappedHandleOffset;
                    scrollbarVarsInfo._trackLength = trackLength;
                }

                /**
                 * Refreshes the interactivity of the given scrollbar element.
                 * @param isTrack True if the track element is the target, false if the handle element is the target.
                 * @param value True for interactivity false for no interactivity.
                 */
                function refreshScrollbarsInteractive(isTrack, value) {
                    var action = value ? 'removeClass' : 'addClass';
                    var element1 = isTrack ? _scrollbarHorizontalTrackElement : _scrollbarHorizontalHandleElement;
                    var element2 = isTrack ? _scrollbarVerticalTrackElement : _scrollbarVerticalHandleElement;
                    var className = isTrack ? _classNameScrollbarTrackOff : _classNameScrollbarHandleOff;

                    element1[action](className);
                    element2[action](className);
                }

                /**
                 * Returns a object which is used for fast access for specific variables.
                 * @param isHorizontal True if the horizontal scrollbar vars shall be accessed, false if the vertical scrollbar vars shall be accessed.
                 * @returns {{wh: string, WH: string, lt: string, _wh: string, _lt: string, t: *, h: *, c: {}, s: *}}
                 */
                function getScrollbarVars(isHorizontal) {
                    return {
                        _width_height: isHorizontal ? _strWidth : _strHeight,
                        _Width_Height: isHorizontal ? 'Width' : 'Height',
                        _left_top: isHorizontal ? _strLeft : _strTop,
                        _Left_Top: isHorizontal ? 'Left' : 'Top',
                        _x_y: isHorizontal ? _strX : _strY,
                        _X_Y: isHorizontal ? 'X' : 'Y',
                        _w_h: isHorizontal ? 'w' : 'h',
                        _l_t: isHorizontal ? 'l' : 't',
                        _track: isHorizontal ? _scrollbarHorizontalTrackElement : _scrollbarVerticalTrackElement,
                        _handle: isHorizontal ? _scrollbarHorizontalHandleElement : _scrollbarVerticalHandleElement,
                        _scrollbar: isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement,
                        _info: isHorizontal ? _scrollHorizontalInfo : _scrollVerticalInfo
                    };
                }


                //==== Scrollbar Corner ====//

                /**
                 * Builds or destroys the scrollbar corner DOM element.
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupScrollbarCornerDOM(destroy) {
                    if(!destroy) {
                         _scrollbarCornerElement = FRAMEWORK(generateDiv(_classNameScrollbarCorner));
                        _hostElement.append(_scrollbarCornerElement);
                    }
                    else {
                        remove(_scrollbarCornerElement);
                    }
                 }

                /**
                 * Initializes all scrollbar corner interactivity events.
                 */
                function setupScrollbarCornerEvents() {
                    var insideIFrame = _windowElementNative.top !== _windowElementNative;
                    var mouseDownPosition = { };
                    var mouseDownSize = { };
                    var mouseDownInvertedScale = { };

                    _resizeOnMouseTouchDown = function(event) {
                        if (onMouseTouchDownContinue(event)) {
                            if (_mutationObserversConnected) {
                                _resizeReconnectMutationObserver = true;
                                disconnectMutationObservers();
                            }

                            mouseDownPosition = getCoordinates(event);

                            mouseDownSize.w = _hostElementNative[LEXICON.oW] - (!_isBorderBox ? _paddingX : 0);
                            mouseDownSize.h = _hostElementNative[LEXICON.oH] - (!_isBorderBox ? _paddingY : 0);
                            mouseDownInvertedScale = getHostElementInvertedScale();

                            _documentElement.on(_strSelectStartEvent, documentOnSelectStart)
                                .on(_strMouseTouchMoveEvent, documentDragMove)
                                .on(_strMouseTouchUpEvent, documentMouseTouchUp);

                            addClass(_bodyElement, _classNameDragging);
                            if (_scrollbarCornerElement.setCapture)
                                _scrollbarCornerElement.setCapture();

                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                        }
                    };
                    function documentDragMove(event) {
                        if (onMouseTouchDownContinue(event)) {
                            var pageOffset = getCoordinates(event);
                            var hostElementCSS = { };
                            if (_resizeHorizontal || _resizeBoth)
                                hostElementCSS[_strWidth] = (mouseDownSize.w + (pageOffset.x - mouseDownPosition.x) * mouseDownInvertedScale.x);
                            if (_resizeVertical || _resizeBoth)
                                hostElementCSS[_strHeight] = (mouseDownSize.h + (pageOffset.y - mouseDownPosition.y) * mouseDownInvertedScale.y);
                            _hostElement.css(hostElementCSS);
                            COMPATIBILITY.stpP(event);
                        }
                        else {
                            documentMouseTouchUp(event);
                        }
                    }
                    function documentMouseTouchUp(event) {
                        var eventIsTrusted = event !== undefined;

                        _documentElement.off(_strSelectStartEvent, documentOnSelectStart)
                            .off(_strMouseTouchMoveEvent, documentDragMove)
                            .off(_strMouseTouchUpEvent, documentMouseTouchUp);

                        removeClass(_bodyElement, _classNameDragging);
                        if (_scrollbarCornerElement.releaseCapture)
                            _scrollbarCornerElement.releaseCapture();

                        if (eventIsTrusted) {
                            if (_resizeReconnectMutationObserver)
                                connectMutationObservers();
                            _base.update(_strAuto);
                        }
                        _resizeReconnectMutationObserver = false;
                    }
                    function onMouseTouchDownContinue(event) {
                        var originalEvent = event.originalEvent || event;
                        var isTouchEvent = originalEvent.touches !== undefined;
                        return _isSleeping || _destroyed ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
                    }
                    function getCoordinates(event) {
                        return _msieVersion && insideIFrame ? { x : event.screenX , y : event.screenY } : COMPATIBILITY.page(event);
                    }
                }


                //==== Utils ====//

                /**
                 * Calls the callback with the given name. The Context of this callback is always _base (this).
                 * @param name The name of the target which shall be called.
                 * @param args The args with which the callback shall be called.
                 */
                function dispatchCallback(name, args) {
                    if(_initialized) {
                        var callback = _currentPreparedOptions.callbacks[name];
                        var extensionOnName = name;
                        var ext;

                        if(extensionOnName.substr(0, 2) === "on")
                            extensionOnName = extensionOnName.substr(2, 1).toLowerCase() + extensionOnName.substr(3);

                        if(type(callback) == TYPES.f)
                            callback.call(_base, args);

                        FRAMEWORK.each(_extensions, function() {
                            ext = this;
                            if(type(ext.on) == TYPES.f)
                                ext.on(extensionOnName, args);
                        });
                    }
                    else if(!_destroyed)
                        _callbacksInitQeueue.push({ n : name, a : args });
                }

                /**
                 * Sets the "top, right, bottom, left" properties, with a given prefix, of the given css object.
                 * @param targetCSSObject The css object to which the values shall be applied.
                 * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
                 * @param values A array of values which shall be applied to the "top, right, bottom, left" -properties. The array order is [top, right, bottom, left].
                 * If this argument is undefined the value '' (empty string) will be applied to all properties.
                 */
                function setTopRightBottomLeft(targetCSSObject, prefix, values) {
                    if (values === undefined)
                        values = [_strEmpty, _strEmpty, _strEmpty, _strEmpty];

                    targetCSSObject[prefix + _strTop] = values[0];
                    targetCSSObject[prefix + _strRight] = values[1];
                    targetCSSObject[prefix + _strBottom] = values[2];
                    targetCSSObject[prefix + _strLeft] = values[3];
                }

                /**
                 * Returns the computed CSS transition string from the given element.
                 * @param element The element from which the transition string shall be returned.
                 * @returns {string} The CSS transition string from the given element.
                 */
                function getCSSTransitionString(element) {
                    var transitionStr = VENDORS._cssProperty('transition');
                    var assembledValue = element.css(transitionStr);
                    if(assembledValue)
                        return assembledValue;
                    var regExpString = '\\s*(' + '([^,(]+(\\(.+?\\))?)+' + ')[\\s,]*';
                    var regExpMain = new RegExp(regExpString);
                    var regExpValidate = new RegExp('^(' + regExpString + ')+$');
                    var properties = 'property duration timing-function delay'.split(' ');
                    var result = [ ];
                    var strResult;
                    var valueArray;
                    var i = 0;
                    var j;
                    var splitCssStyleByComma = function(str) {
                        strResult = [ ];
                        if (!str.match(regExpValidate))
                            return str;
                        while (str.match(regExpMain)) {
                            strResult.push(RegExp.$1);
                            str = str.replace(regExpMain, _strEmpty);
                        }

                        return strResult;
                    };
                    for (; i < properties[LEXICON.l]; i++) {
                        valueArray = splitCssStyleByComma(element.css(transitionStr + '-' + properties[i]));
                        for (j = 0; j < valueArray[LEXICON.l]; j++)
                            result[j] = (result[j] ? result[j] + _strSpace : _strEmpty) + valueArray[j];
                    }
                    return result.join(', ');
                }

                /**
                 * Calculates the host-elements inverted scale. (invertedScale = 1 / scale)
                 * @returns {{x: number, y: number}} The scale of the host-element.
                 */
                function getHostElementInvertedScale() {
                    var rect = _paddingElementNative.getBoundingClientRect();
                    return {
                        x :  _supportTransform ? 1 / (MATH.round(rect.width) / _paddingElementNative[LEXICON.oW]) : 1,
                        y :  _supportTransform ? 1 / (MATH.round(rect.height) / _paddingElementNative[LEXICON.oH]) : 1
                    };
                }

                /**
                 * Checks whether the given object is a HTMLElement.
                 * @param o The object which shall be checked.
                 * @returns {boolean} True the given object is a HTMLElement, false otherwise.
                 */
                function isHTMLElement(o) {
                    var strOwnerDocument = 'ownerDocument';
                    var strHTMLElement = 'HTMLElement';
                    var wnd = o && o[strOwnerDocument] ? (o[strOwnerDocument].parentWindow || window) : window;
                    return (
                        typeof wnd[strHTMLElement] == TYPES.o ? o instanceof wnd[strHTMLElement] : //DOM2
                        o && typeof o == TYPES.o && o !== null && o.nodeType === 1 && typeof o.nodeName == TYPES.s
                    );
                }

                /**
                 * Compares 2 arrays and returns the differences between them as a array.
                 * @param a1 The first array which shall be compared.
                 * @param a2 The second array which shall be compared.
                 * @returns {Array} The differences between the two arrays.
                 */
                function getArrayDifferences(a1, a2) {
                    var a = [ ];
                    var diff = [ ];
                    var i;
                    var k;
                    for (i = 0; i < a1.length; i++)
                        a[a1[i]] = true;
                    for (i = 0; i < a2.length; i++) {
                        if (a[a2[i]])
                            delete a[a2[i]];
                        else
                            a[a2[i]] = true;
                    }
                    for (k in a)
                        diff.push(k);
                    return diff;
                }

                /**
                 * Returns Zero or the number to which the value can be parsed.
                 * @param value The value which shall be parsed.
                 * @param toFloat Indicates whether the number shall be parsed to a float.
                 */
                function parseToZeroOrNumber(value, toFloat) {
                    var num = toFloat ? parseFloat(value) : parseInt(value, 10);
                    return isNaN(num) ? 0 : num;
                }

                /**
                 * Gets several information of the textarea and returns them as a object or undefined if the browser doesn't support it.
                 * @returns {{cursorRow: Number, cursorCol, rows: Number, cols: number, wRow: number, pos: number, max : number}} or undefined if not supported.
                 */
                function getTextareaInfo() {
                    //read needed values
                    var textareaCursorPosition = _targetElementNative.selectionStart;
                    if (textareaCursorPosition === undefined)
                        return;

                    var strLength = 'length';
                    var textareaValue = _targetElement.val();
                    var textareaLength = textareaValue[strLength];
                    var textareaRowSplit = textareaValue.split("\n");
                    var textareaLastRow = textareaRowSplit[strLength];
                    var textareaCurrentCursorRowSplit = textareaValue.substr(0, textareaCursorPosition).split("\n");
                    var widestRow = 0;
                    var textareaLastCol = 0;
                    var cursorRow = textareaCurrentCursorRowSplit[strLength];
                    var cursorCol = textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[strLength] - 1][strLength];
                    var rowCols;
                    var i;

                    //get widest Row and the last column of the textarea
                    for (i = 0; i < textareaRowSplit[strLength]; i++) {
                        rowCols = textareaRowSplit[i][strLength];
                        if (rowCols > textareaLastCol) {
                            widestRow = i + 1;
                            textareaLastCol = rowCols;
                        }
                    }

                    return {
                        _cursorRow: cursorRow, //cursorRow
                        _cursorColumn: cursorCol, //cursorCol
                        _rows: textareaLastRow, //rows
                        _columns: textareaLastCol, //cols
                        _widestRow: widestRow, //wRow
                        _cursorPosition: textareaCursorPosition, //pos
                        _cursorMax: textareaLength //max
                    };
                }

                /**
                 * Determines whether native overlay scrollbars are active.
                 * @returns {boolean} True if native overlay scrollbars are active, false otherwise.
                 */
                function nativeOverlayScrollbarsAreActive() {
                    return (_ignoreOverlayScrollbarHidingCache && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y));
                }

                /**
                 * Gets the element which is used to measure the content size.
                 * @returns {*} TextareaCover if target element is textarea else the ContentElement.
                 */
                function getContentMeasureElement() {
                    return _isTextarea ? _textareaCoverElement[0] : _contentElementNative;
                }

                /**
                 * Generates a string which represents a HTML div with the given classes or attributes.
                 * @param classesOrAttrs The class of the div as string or a object which represents the attributes of the div. (The class attribute can also be written as "className".)
                 * @param content The content of the div as string.
                 * @returns {string} The concated string which represents a HTML div and its content.
                 */
                function generateDiv(classesOrAttrs, content) {
                    return '<div ' + (classesOrAttrs ? type(classesOrAttrs) == TYPES.s ?
                        'class="' + classesOrAttrs + '"' :
                            (function() {
                                var key;
                                var attrs = '';
                                if(FRAMEWORK.isPlainObject(classesOrAttrs)) {
                                    for (key in classesOrAttrs)
                                        attrs += (key === 'className' ? 'class' : key) + '="' + classesOrAttrs[key] + '" ';
                                }
                                return attrs;
                            })() :
                            _strEmpty) +
                        '>' +
                        (content ? content : _strEmpty) +
                        '</div>';
                }

                /**
                 * Gets the value of the given property from the given object.
                 * @param obj The object from which the property value shall be got.
                 * @param path The property of which the value shall be got.
                 * @returns {*} Returns the value of the searched property or undefined of the property wasn't found.
                 */
                function getObjectPropVal(obj, path) {
                    var splits = path.split(_strDot);
                    var i = 0;
                    var val;
                    for(; i < splits.length; i++) {
                        if(!obj.hasOwnProperty(splits[i]))
                            return;
                        val = obj[splits[i]];
                        if(i < splits.length && type(val) == TYPES.o)
                            obj = val;
                    }
                    return val;
                }

                /**
                 * Sets the value of the given property from the given object.
                 * @param obj The object from which the property value shall be set.
                 * @param path The property of which the value shall be set.
                 * @param val The value of the property which shall be set.
                 */
                function setObjectPropVal(obj, path, val) {
                    var splits = path.split(_strDot);
                    var splitsLength = splits.length;
                    var i = 0;
                    var extendObj = { };
                    var extendObjRoot = extendObj;
                    for(; i < splitsLength; i++)
                        extendObj = extendObj[splits[i]] = i + 1 < splitsLength ? { } : val;
                    FRAMEWORK.extend(obj, extendObjRoot, true);
                }


                //==== Utils Cache ====//

                /**
                 * Compares two values and returns the result of the comparison as a boolean.
                 * @param current The first value which shall be compared.
                 * @param cache The second value which shall be compared.
                 * @param force If true the returned value is always true.
                 * @returns {boolean} True if both variables aren't equal or some of them is undefined or when the force parameter is true, false otherwise.
                 */
                function checkCacheSingle(current, cache, force) {
                    if (force === true)
                        return force;
                    if (cache === undefined)
                        return true;
                    else if (current !== cache)
                        return true;
                    return false;
                }

                /**
                 * Compares two objects with two properties and returns the result of the comparison as a boolean.
                 * @param current The first object which shall be compared.
                 * @param cache The second object which shall be compared.
                 * @param prop1 The name of the first property of the objects which shall be compared.
                 * @param prop2 The name of the second property of the objects which shall be compared.
                 * @param force If true the returned value is always true.
                 * @returns {boolean} True if both variables aren't equal or some of them is undefined or when the force parameter is true, false otherwise.
                 */
                function checkCacheDouble(current, cache, prop1, prop2, force) {
                    if (force === true)
                        return force;
                    if (prop2 === undefined && force === undefined) {
                        if (prop1 === true)
                            return prop1;
                        else
                            prop1 = undefined;
                    }
                    prop1 = prop1 === undefined ? 'w' : prop1;
                    prop2 = prop2 === undefined ? 'h' : prop2;
                    if (cache === undefined)
                        return true;
                    else if (current[prop1] !== cache[prop1] || current[prop2] !== cache[prop2])
                        return true;
                    return false;
                }

                /**
                 * Compares two objects which have four properties and returns the result of the comparison as a boolean.
                 * @param current The first object with four properties.
                 * @param cache The second object with four properties.
                 * @returns {boolean} True if both objects aren't equal or some of them is undefined, false otherwise.
                 */
                function checkCacheTRBL(current, cache) {
                    if (cache === undefined)
                        return true;
                    else if (current.t !== cache.t ||
                        current.r !== cache.r ||
                        current.b !== cache.b ||
                        current.l !== cache.l)
                        return true;
                    return false;
                }


                //==== Shortcuts ====//

                /**
                 * jQuery type method shortcut.
                 */
                function type(obj) {
                    return COMPATIBILITY.type(obj);
                }

                /**
                 * jQuery extend method shortcut with a appended "true" as first argument.
                 */
                function extendDeep() {
                    return FRAMEWORK.extend.apply(this, [ true ].concat([].slice.call(arguments)));
                }

                /**
                 * jQuery addClass method shortcut.
                 */
                function addClass(el, classes) {
                    return _frameworkProto.addClass.call(el, classes);
                }

                /**
                 * jQuery removeClass method shortcut.
                 */
                function removeClass(el, classes) {
                    return _frameworkProto.removeClass.call(el, classes);
                }

                /**
                 * jQuery remove method shortcut.
                 */
                function remove(el) {
                    return _frameworkProto.remove.call(el);
                }

                /**
                 * Finds the first child element with the given selector of the given element.
                 * @param el The root element from which the selector shall be valid.
                 * @param selector The selector of the searched element.
                 * @returns {*} The first element which is a child of the given element and matches the givens selector.
                 */
                function findFirst(el, selector) {
                    return _frameworkProto.find.call(el, selector).eq(0);
                }


                //==== API ====//

                /**
                 * Puts the instance to sleep. It wont respond to any changes in the DOM and won't update. Scrollbar Interactivity is also disabled as well as the resize handle.
                 * This behavior can be reset by calling the update method.
                 */
                _base.sleep = function () {
                    _isSleeping = true;
                };

                /**
                 * Updates the plugin and DOM to the current options.
                 * This method should only be called if a update is 100% required.
                 * @param force True if every property shall be updated and the cache shall be ignored.
                 * !INTERNAL USAGE! : force can be a string "auto", "auto+" or "zoom" too
                 * if this is the case then before a real update the content size and host element attributes gets checked, and if they changed only then the update method will be called.
                 */
                _base.update = function (force) {
                    var attrsChanged;
                    var contentSizeC;
                    var isString = type(force) == TYPES.s;
                    var imgElementSelector = 'img';
                    var imgElementLoadEvent = 'load';
                    var isPlus = isString && force.slice(-1) == '+';
                    if(isString) {
                        if (force.indexOf(_strAuto) === 0) {
                            attrsChanged = meaningfulAttrsChanged();
                            contentSizeC = updateAutoContentSizeChanged();
                            if (attrsChanged || contentSizeC || isPlus)
                                update(false, contentSizeC, false, isPlus);
                        }
                        else if (force === 'zoom')
                            update(true, true);
                    }
                    else {
                        force = _isSleeping || force;
                        _isSleeping = false;
                        update(false, false, force, true);
                    }
                    if(!_isTextarea) {
                        _contentElement.find(imgElementSelector).each(function(i, el) {
                            var index = COMPATIBILITY.inA(el, _imgs);
                            if (index === -1)
                                FRAMEWORK(el).off(imgElementLoadEvent, imgOnLoad).on(imgElementLoadEvent, imgOnLoad);
                        });
                    }
                };

                /**
                 Gets or sets the current options. The update method will be called automatically if new options were set.
                 * @param newOptions If new options are given, then the new options will be set, if new options aren't given (undefined or a not a plain object) then the current options will be returned.
                 * @param value If new options is a property path string, then this value will be used to set the option to which the property path string leads.
                 * @returns {*}
                 */
                _base.options = function (newOptions, value) {
                    //return current options if newOptions are undefined or empty
                    if (FRAMEWORK.isEmptyObject(newOptions) || !FRAMEWORK.isPlainObject(newOptions)) {
                        if (type(newOptions) == TYPES.s) {
                            if (arguments.length > 1) {
                                var option = { };
                                setObjectPropVal(option, newOptions, value);
                                setOptions(option);
                                update();
                                return;
                            }
                            else
                                return getObjectPropVal(_currentOptions, newOptions);
                        }
                        else
                            return _currentOptions;
                    }
                    setOptions(newOptions);
                    var isSleepingTmp = _isSleeping || false;
                    _isSleeping = false;
                    update();
                    _isSleeping = isSleepingTmp;
                };

                /**
                 * Restore the DOM, disconnects all observers, remove all resize observers and destroy all methods.
                 */
                _base.destroy = function () {
                    _destroyed = true;

                    //remove this instance from auto update loop
                    autoUpdateLoop.remove(_base);

                    //disconnect all mutation observers
                    disconnectMutationObservers();

                    //remove all resize observers
                    removeResizeObserver(_sizeObserverElement);
                    if (_sizeAutoObserverAdded)
                        removeResizeObserver(_sizeAutoObserverElement);

                    //remove all extensions
                    for(var extName in _extensions)
                        _base.removeExt(extName);

                    //remove all events from host element
                    setupHostMouseTouchEvents(true);

                    //remove all events from structure
                    setupStructureEvents(true);

                    //remove all helper / detection elements
                    if (_contentGlueElement)
                        remove(_contentGlueElement);
                    if (_contentArrangeElement)
                        remove(_contentArrangeElement);
                    if (_sizeAutoObserverAdded)
                        remove(_sizeAutoObserverElement);

                    //remove all generated DOM
                    setupScrollbarsDOM(true);
                    setupScrollbarCornerDOM(true);
                    setupStructureDOM(true);

                    //remove all generated image load events
                    for(var i = 0; i < _imgs[LEXICON.l]; i++)
                        FRAMEWORK(_imgs[i]).off('load', imgOnLoad);
                    _imgs = undefined;

                    //remove this instance from the instances list
                    INSTANCES(pluginTargetElement, 0);
                    dispatchCallback("onDestroyed");

                    //remove all properties and methods
                    for (var property in _base)
                        delete _base[property];
                    _base = undefined;
                };

                /**
                 * Scrolls to a given position or element.
                 * @param coordinates
                 * 1. Can be "coordinates" which looks like:
                 *    { x : ?, y : ? } OR          Object with x and y properties
                 *    { left : ?, top : ? } OR     Object with left and top properties
                 *    { l : ?, t : ? } OR          Object with l and t properties
                 *    [ ?, ? ] OR                  Array where the first two element are the coordinates (first is x, second is y)
                 *    ?                            A single value which stays for both axis
                 *    A value can be a number, a string or a calculation.
                 *
                 *    Operators:
                 *    [NONE]  The current scroll will be overwritten by the value.
                 *    '+='    The value will be added to the current scroll offset
                 *    '-='    The value will be subtracted from the current scroll offset
                 *    '*='    The current scroll wil be multiplicated by the value.
                 *    '/='    The current scroll wil be divided by the value.
                 *
                 *    Units:
                 *    [NONE]  The value is the final scroll amount.                   final = (value * 1)
                 *    'px'    Same as none
                 *    '%'     The value is dependent on the current scroll value.     final = ((currentScrollValue / 100) * value)
                 *    'vw'    The value is multiplicated by the viewport width.       final = (value * viewportWidth)
                 *    'vh'    The value is multiplicated by the viewport height.      final = (value * viewportHeight)
                 *
                 *    example final values:
                 *    200, '200px', '50%', '1vw', '1vh', '+=200', '/=1vw', '*=2px', '-=5vh', '+=33%', '+= 50% - 2px', '-= 1vw - 50%'
                 *
                 * 2. Can be a HTML or jQuery element:
                 *    The final scroll offset is the offset (without margin) of the given HTML / jQuery element.
                 *
                 * 3. Can be a object with a HTML or jQuery element with additional settings:
                 *    {
                 *      el : [HTMLElement, jQuery element],             MUST be specified, else this object isn't valid.
                 *      scroll : [string, array, object],               Default value is 'always'.
                 *      block : [string, array, object],                Default value is 'begin'.
                 *      margin : [number, boolean, array, object]       Default value is false.
                 *    }
                 *
                 *    Possible scroll settings are:
                 *    'always'      Scrolls always.
                 *    'ifneeded'    Scrolls only if the element isnt fully in view.
                 *    'never'       Scrolls never.
                 *
                 *    Possible block settings are:
                 *    'begin'   Both axis shall be docked to the "begin" edge. - The element will be docked to the top and left edge of the viewport.
                 *    'end'     Both axis shall be docked to the "end" edge. - The element will be docked to the bottom and right edge of the viewport. (If direction is RTL to the bottom and left edge.)
                 *    'center'  Both axis shall be docked to "center". - The element will be centered in the viewport.
                 *    'nearest' The element will be docked to the nearest edge(s).
                 *
                 *    Possible margin settings are: -- The actual margin of the element wont be affect, this option affects only the final scroll offset.
                 *    [BOOLEAN]                                         If true the css margin of the element will be used, if false no margin will be used.
                 *    [NUMBER]                                          The margin will be used for all edges.
                 *
                 * @param duration The duration of the scroll animation, OR a jQuery animation configuration object.
                 * @param easing The animation easing.
                 * @param complete The animation complete callback.
                 * @returns {{
                 *   position: {x: number, y: number},
                 *   ratio: {x: number, y: number},
                 *   max: {x: number, y: number},
                 *   handleOffset: {x: number, y: number},
                 *   handleLength: {x: number, y: number},
                 *   handleLengthRatio: {x: number, y: number}, t
                 *   rackLength: {x: number, y: number},
                 *   isRTL: boolean,
                 *   isRTLNormalized: boolean
                 *  }}
                 */
                _base.scroll = function (coordinates, duration, easing, complete) {
                    if (arguments.length === 0 || coordinates === undefined) {
                        var infoX = _scrollHorizontalInfo;
                        var infoY = _scrollVerticalInfo;
                        var normalizeInvert = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.i;
                        var normalizeNegate = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.n;
                        var scrollX = infoX._currentScroll;
                        var scrollXRatio = infoX._currentScrollRatio;
                        var maxScrollX = infoX._maxScroll;
                        scrollXRatio = normalizeInvert ? 1 - scrollXRatio : scrollXRatio;
                        scrollX = normalizeInvert ? maxScrollX - scrollX : scrollX;
                        scrollX *= normalizeNegate ? -1 : 1;
                        maxScrollX *= normalizeNegate ? -1 : 1;

                        return {
                            position : {
                                x : scrollX,
                                y : infoY._currentScroll
                            },
                            ratio : {
                                x : scrollXRatio,
                                y : infoY._currentScrollRatio
                            },
                            max : {
                                x : maxScrollX,
                                y : infoY._maxScroll
                            },
                            handleOffset : {
                                x : infoX._handleOffset,
                                y : infoY._handleOffset
                            },
                            handleLength : {
                                x : infoX._handleLength,
                                y : infoY._handleLength
                            },
                            handleLengthRatio : {
                                x : infoX._handleLengthRatio,
                                y : infoY._handleLengthRatio
                            },
                            trackLength : {
                                x : infoX._trackLength,
                                y : infoY._trackLength
                            },
                            snappedHandleOffset : {
                                x : infoX._snappedHandleOffset,
                                y : infoY._snappedHandleOffset
                            },
                            isRTL: _isRTL,
                            isRTLNormalized: _normalizeRTLCache
                        };
                    }

                    var normalizeRTL = _normalizeRTLCache;
                    var coordinatesXAxisProps = [_strX, _strLeft, 'l'];
                    var coordinatesYAxisProps = [_strY, _strTop, 't'];
                    var coordinatesOperators = ['+=', '-=', '*=', '/='];
                    var durationIsObject = type(duration) == TYPES.o;
                    var completeCallback = durationIsObject ? duration.complete : complete;
                    var i;
                    var finalScroll = { };
                    var specialEasing = {};
                    var doScrollLeft;
                    var doScrollTop;
                    var animationOptions;
                    var strEnd = 'end';
                    var strBegin = 'begin';
                    var strCenter = 'center';
                    var strNearest = 'nearest';
                    var strAlways = 'always';
                    var strNever = 'never';
                    var strIfNeeded = 'ifneeded';
                    var strLength = LEXICON.l;
                    var settingsAxis;
                    var settingsScroll;
                    var settingsBlock;
                    var settingsMargin;
                    var finalElement;
                    var elementObjSettingsAxisValues = [_strX, _strY, 'xy', 'yx'];
                    var elementObjSettingsBlockValues = [strBegin, strEnd, strCenter, strNearest];
                    var elementObjSettingsScrollValues = [strAlways, strNever, strIfNeeded];
                    var coordinatesIsElementObj = coordinates.hasOwnProperty('el');
                    var possibleElement = coordinatesIsElementObj ? coordinates.el : coordinates;
                    var possibleElementIsJQuery = possibleElement instanceof FRAMEWORK || JQUERY ? possibleElement instanceof JQUERY : false;
                    var possibleElementIsHTMLElement = possibleElementIsJQuery ? false : isHTMLElement(possibleElement);
                    var proxyCompleteCallback = type(completeCallback) != TYPES.f ? undefined : function() {
                        if(doScrollLeft)
                            refreshScrollbarHandleOffset(true);
                        if(doScrollTop)
                            refreshScrollbarHandleOffset(false);
                        completeCallback();
                    };
                    var checkSettingsStringValue = function (currValue, allowedValues) {
                        for (i = 0; i < allowedValues[strLength]; i++) {
                            if (currValue === allowedValues[i])
                                return true;
                        }
                        return false;
                    };
                    var getRawScroll = function (isX, coordinates) {
                        var coordinateProps = isX ? coordinatesXAxisProps : coordinatesYAxisProps;
                        coordinates = type(coordinates) == TYPES.s || type(coordinates) == TYPES.n ? [ coordinates, coordinates ] : coordinates;

                        if (type(coordinates) == TYPES.a)
                            return isX ? coordinates[0] : coordinates[1];
                        else if (type(coordinates) == TYPES.o) {
                            //decides RTL normalization "hack" with .n
                            //normalizeRTL = type(coordinates.n) == TYPES.b ? coordinates.n : normalizeRTL; 
                            for (i = 0; i < coordinateProps[strLength]; i++)
                                if (coordinateProps[i] in coordinates)
                                    return coordinates[coordinateProps[i]];
                        }
                    };
                    var getFinalScroll = function (isX, rawScroll) {
                        var isString = type(rawScroll) == TYPES.s;
                        if(isString)
                            _base.update(_strAuto + '+');
                        var operator;
                        var amount;
                        var scrollInfo = isX ? _scrollHorizontalInfo : _scrollVerticalInfo;
                        var currScroll = scrollInfo._currentScroll;
                        var maxScroll = scrollInfo._maxScroll;
                        var mult = ' * ';
                        var finalValue;
                        var isRTLisX = _isRTL && isX;
                        var normalizeShortcuts = isRTLisX && _rtlScrollBehavior.n && !normalizeRTL;
                        var strReplace = 'replace';
                        var evalFunc = eval;
                        var possibleOperator;
                        if (isString) {
                            //check operator
                            if (rawScroll[strLength] > 2) {
                                possibleOperator = rawScroll.substr(0, 2);
                                if(FRAMEWORK.inArray(possibleOperator, coordinatesOperators) > -1)
                                    operator = possibleOperator;
                            }

                            //calculate units and shortcuts
                            rawScroll = operator ? rawScroll.substr(2) : rawScroll;
                            rawScroll = rawScroll
                            [strReplace](/min/g, 0) //'min' = 0%
                            [strReplace](/</g, 0)   //'<'   = 0%
                            [strReplace](/max/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent)    //'max' = 100%
                            [strReplace](/>/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent)      //'>'   = 100%
                            [strReplace](/px/g, _strEmpty)
                            [strReplace](/%/g, mult + (maxScroll * (isRTLisX && _rtlScrollBehavior.n ? -1 : 1) / 100.0))
                            [strReplace](/vw/g, mult + _viewportSize.w)
                            [strReplace](/vh/g, mult + _viewportSize.h);
                            amount = parseToZeroOrNumber(isNaN(rawScroll) ? parseToZeroOrNumber(evalFunc(rawScroll), true).toFixed() : rawScroll);
                        }
                        else {
                            amount = rawScroll;
                        }

                        if (amount !== undefined && !isNaN(amount) && type(amount) == TYPES.n) {
                            var normalizeIsRTLisX = normalizeRTL && isRTLisX;
                            var operatorCurrScroll = currScroll * (normalizeIsRTLisX && _rtlScrollBehavior.n ? -1 : 1);
                            var invert = normalizeIsRTLisX && _rtlScrollBehavior.i;
                            var negate = normalizeIsRTLisX && _rtlScrollBehavior.n;
                            operatorCurrScroll = invert ? (maxScroll - operatorCurrScroll) : operatorCurrScroll;
                            switch (operator) {
                                case '+=':
                                    finalValue = operatorCurrScroll + amount;
                                    break;
                                case '-=':
                                    finalValue = operatorCurrScroll - amount;
                                    break;
                                case '*=':
                                    finalValue = operatorCurrScroll * amount;
                                    break;
                                case '/=':
                                    finalValue = operatorCurrScroll / amount;
                                    break;
                                default:
                                    finalValue = amount;
                                    break;
                            }
                            finalValue = invert ? maxScroll - finalValue : finalValue;
                            finalValue *= negate ? -1 : 1;
                            finalValue = isRTLisX && _rtlScrollBehavior.n ? MATH.min(0, MATH.max(maxScroll, finalValue)) : MATH.max(0, MATH.min(maxScroll, finalValue));
                        }
                        return finalValue === currScroll ? undefined : finalValue;
                    };
                    var getPerAxisValue = function (value, valueInternalType, defaultValue, allowedValues) {
                        var resultDefault = [ defaultValue, defaultValue ];
                        var valueType = type(value);
                        var valueArrLength;
                        var valueArrItem;

                        //value can be [ string, or array of two strings ]
                        if (valueType == valueInternalType) {
                            value = [value, value];
                        }
                        else if (valueType == TYPES.a) {
                            valueArrLength = value[strLength];
                            if (valueArrLength > 2 || valueArrLength < 1)
                                value = resultDefault;
                            else {
                                if (valueArrLength === 1)
                                    value[1] = defaultValue;
                                for (i = 0; i < valueArrLength; i++) {
                                    valueArrItem = value[i];
                                    if (type(valueArrItem) != valueInternalType || !checkSettingsStringValue(valueArrItem, allowedValues)) {
                                        value = resultDefault;
                                        break;
                                    }
                                }
                            }
                        }
                        else if (valueType == TYPES.o)
                            value = [ value[_strX]|| defaultValue, value[_strY] || defaultValue];
                        else
                            value = resultDefault;
                        return { x : value[0], y : value[1] };
                    };
                    var generateMargin = function (marginTopRightBottomLeftArray) {
                        var result = [ ];
                        var currValue;
                        var currValueType;
                        var valueDirections = [ _strTop, _strRight, _strBottom, _strLeft ];
                        for(i = 0; i < marginTopRightBottomLeftArray[strLength]; i++) {
                            if(i === valueDirections[strLength])
                                break;
                            currValue = marginTopRightBottomLeftArray[i];
                            currValueType = type(currValue);
                            if(currValueType == TYPES.b)
                                result.push(currValue ? parseToZeroOrNumber(finalElement.css(_strMarginMinus + valueDirections[i])) : 0);
                            else
                                result.push(currValueType == TYPES.n ? currValue : 0);
                        }
                        return result;
                    };

                    if (possibleElementIsJQuery || possibleElementIsHTMLElement) {
                        //get settings
                        var margin = coordinatesIsElementObj ? coordinates.margin : 0;
                        var axis = coordinatesIsElementObj ? coordinates.axis : 0;
                        var scroll = coordinatesIsElementObj ? coordinates.scroll : 0;
                        var block = coordinatesIsElementObj ? coordinates.block : 0;
                        var marginDefault = [ 0, 0, 0, 0 ];
                        var marginType = type(margin);
                        var marginLength;
                        finalElement = possibleElementIsJQuery ? possibleElement : FRAMEWORK(possibleElement);
                        if (finalElement[strLength] === 0)
                            return;

                        _base.update(_strAuto + '+');

                        //margin can be [ boolean, number, array of 2, array of 4, object ]
                        if (marginType == TYPES.n || marginType == TYPES.b)
                            margin = generateMargin([margin, margin, margin, margin]);
                        else if (marginType == TYPES.a) {
                            marginLength = margin[strLength];
                            if(marginLength === 2)
                                margin = generateMargin([margin[0], margin[1], margin[0], margin[1]]);
                            else if(marginLength >= 4)
                                margin = generateMargin(margin);
                            else
                                margin = marginDefault;
                        }
                        else if (marginType == TYPES.o)
                            margin = generateMargin([margin[_strTop], margin[_strRight], margin[_strBottom], margin[_strLeft]]);
                        else
                            margin = marginDefault;

                        //block = type(block) === TYPES.b ? block ? [ strNearest, strBegin ] : [ strNearest, strEnd ] : block;
                        settingsAxis = checkSettingsStringValue(axis, elementObjSettingsAxisValues) ? axis : 'xy';
                        settingsScroll = getPerAxisValue(scroll, TYPES.s, strAlways, elementObjSettingsScrollValues);
                        settingsBlock = getPerAxisValue(block, TYPES.s, strBegin, elementObjSettingsBlockValues);
                        settingsMargin = margin;

                        var viewportScroll = {
                            l: _scrollHorizontalInfo._currentScroll,
                            t: _scrollVerticalInfo._currentScroll
                        };
                        // use padding element instead of viewport element because padding element has never padding, margin or position applied.
                        var viewportOffset = _paddingElement.offset();

                        //get coordinates
                        var elementOffset = finalElement.offset();
                        var doNotScroll = {
                            x : settingsScroll.x == strNever || settingsAxis == _strY,
                            y : settingsScroll.y == strNever || settingsAxis == _strX
                        };
                        elementOffset[_strTop] -= settingsMargin[0];
                        elementOffset[_strLeft] -= settingsMargin[3];
                        var elementScrollCoordinates = {
                            x: MATH.round(elementOffset[_strLeft] - viewportOffset[_strLeft] + viewportScroll.l),
                            y: MATH.round(elementOffset[_strTop] - viewportOffset[_strTop] + viewportScroll.t)
                        };
                        if (_isRTL) {
                            if (!_rtlScrollBehavior.n && !_rtlScrollBehavior.i)
                                elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + viewportScroll.l);
                            if (_rtlScrollBehavior.n && normalizeRTL)
                                elementScrollCoordinates.x *= -1;
                            if (_rtlScrollBehavior.i && normalizeRTL)
                                elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + (_scrollHorizontalInfo._maxScroll - viewportScroll.l));
                        }

                        //measuring is required
                        if (settingsBlock.x != strBegin || settingsBlock.y != strBegin || settingsScroll.x == strIfNeeded || settingsScroll.y == strIfNeeded || _isRTL) {
                            var measuringElm = finalElement[0];
                            var rawElementSize = _supportTransform ? measuringElm.getBoundingClientRect() : {
                                width : measuringElm[LEXICON.oW],
                                height : measuringElm[LEXICON.oH]
                            };
                            var elementSize = {
                                w: rawElementSize[_strWidth] + settingsMargin[3] + settingsMargin[1],
                                h: rawElementSize[_strHeight] + settingsMargin[0] + settingsMargin[2]
                            };
                            var finalizeBlock = function(isX) {
                                var vars = getScrollbarVars(isX);
                                var wh = vars._w_h;
                                var lt = vars._left_top;
                                var xy = vars._x_y;
                                var blockIsEnd = settingsBlock[xy] == (isX ? _isRTL ? strBegin : strEnd : strEnd);
                                var blockIsCenter = settingsBlock[xy] == strCenter;
                                var blockIsNearest = settingsBlock[xy] == strNearest;
                                var scrollNever = settingsScroll[xy] == strNever;
                                var scrollIfNeeded = settingsScroll[xy] == strIfNeeded;
                                var vpSize = _viewportSize[wh];
                                var vpOffset = viewportOffset[lt];
                                var elSize = elementSize[wh];
                                var elOffset = elementOffset[lt];
                                var divide = blockIsCenter ? 2 : 1;
                                var elementCenterOffset = elOffset + (elSize / 2);
                                var viewportCenterOffset = vpOffset + (vpSize / 2);
                                var isInView =
                                    elSize <= vpSize
                                    && elOffset >= vpOffset
                                    && elOffset + elSize <= vpOffset + vpSize;

                                if(scrollNever)
                                    doNotScroll[xy] = true;
                                else if(!doNotScroll[xy]) {
                                    if (blockIsNearest || scrollIfNeeded) {
                                        doNotScroll[xy] = scrollIfNeeded ? isInView : false;
                                        blockIsEnd = elSize < vpSize ? elementCenterOffset > viewportCenterOffset : elementCenterOffset < viewportCenterOffset;
                                    }
                                    elementScrollCoordinates[xy] -= blockIsEnd || blockIsCenter ? ((vpSize / divide) - (elSize / divide)) * (isX && _isRTL && normalizeRTL ? -1 : 1) : 0;
                                }
                            };
                            finalizeBlock(true);
                            finalizeBlock(false);
                        }

                        if (doNotScroll.y)
                            delete elementScrollCoordinates.y;
                        if (doNotScroll.x)
                            delete elementScrollCoordinates.x;

                        coordinates = elementScrollCoordinates;
                    }

                    finalScroll[_strScrollLeft] = getFinalScroll(true, getRawScroll(true, coordinates));
                    finalScroll[_strScrollTop] = getFinalScroll(false, getRawScroll(false, coordinates));
                    doScrollLeft = finalScroll[_strScrollLeft] !== undefined;
                    doScrollTop = finalScroll[_strScrollTop] !== undefined;

                    if ((doScrollLeft || doScrollTop) && (duration > 0 || durationIsObject)) {
                        if (durationIsObject) {
                            duration.complete = proxyCompleteCallback;
                            _viewportElement.animate(finalScroll, duration);
                        }
                        else {
                            animationOptions = {
                                duration: duration,
                                complete: proxyCompleteCallback
                            };
                            if (type(easing) == TYPES.a || FRAMEWORK.isPlainObject(easing)) {
                                specialEasing[_strScrollLeft] = easing[0] || easing.x;
                                specialEasing[_strScrollTop] = easing[1] || easing.y;
                                animationOptions.specialEasing = specialEasing;
                            }
                            else {
                                animationOptions.easing = easing;
                            }
                            _viewportElement.animate(finalScroll, animationOptions);
                        }
                    }
                    else {
                        if (doScrollLeft)
                            _viewportElement[_strScrollLeft](finalScroll[_strScrollLeft]);
                        if (doScrollTop)
                            _viewportElement[_strScrollTop](finalScroll[_strScrollTop]);
                    }
                };

                /**
                 * Stops all scroll animations.
                 * @returns {*} The current OverlayScrollbars instance (for chaining).
                 */
                _base.scrollStop = function (param1, param2, param3) {
                    _viewportElement.stop(param1, param2, param3);
                    return _base;
                };

                /**
                 * Returns all relevant elements.
                 * @param elementName The name of the element which shall be returned.
                 * @returns {{target: *, host: *, padding: *, viewport: *, content: *, scrollbarHorizontal: {scrollbar: *, track: *, handle: *}, scrollbarVertical: {scrollbar: *, track: *, handle: *}, scrollbarCorner: *} | *}
                 */
                _base.getElements = function (elementName) {
                    var obj = {
                        target: _targetElementNative,
                        host: _hostElementNative,
                        padding: _paddingElementNative,
                        viewport: _viewportElementNative,
                        content: _contentElementNative,
                        scrollbarHorizontal: {
                            scrollbar: _scrollbarHorizontalElement[0],
                            track: _scrollbarHorizontalTrackElement[0],
                            handle: _scrollbarHorizontalHandleElement[0]
                        },
                        scrollbarVertical: {
                            scrollbar: _scrollbarVerticalElement[0],
                            track: _scrollbarVerticalTrackElement[0],
                            handle: _scrollbarVerticalHandleElement[0]
                        },
                        scrollbarCorner: _scrollbarCornerElement[0]
                    };
                    return type(elementName) == TYPES.s ? getObjectPropVal(obj, elementName) : obj;
                };

                /**
                 * Returns a object which describes the current state of this instance.
                 * @param stateProperty A specific property from the state object which shall be returned.
                 * @returns {{widthAuto, heightAuto, overflowAmount, hideOverflow, hasOverflow, contentScrollSize, viewportSize, hostSize, autoUpdate} | *}
                 */
                _base.getState = function (stateProperty) {
                    var prepare = function (obj) {
                        if (!FRAMEWORK.isPlainObject(obj))
                            return obj;
                        var extended = extendDeep({}, obj);
                        var changePropertyName = function (from, to) {
                            if (extended.hasOwnProperty(from)) {
                                extended[to] = extended[from];
                                delete extended[from];
                            }
                        };
                        changePropertyName('w', _strWidth); //change w to width
                        changePropertyName('h', _strHeight); //change h to height
                        delete extended.c; //delete c (the 'changed' prop)
                        return extended;
                    };
                    var obj = {
                        sleeping: prepare(_isSleeping) || false,
                        autoUpdate: prepare(!_mutationObserversConnected),
                        widthAuto: prepare(_widthAutoCache),
                        heightAuto: prepare(_heightAutoCache),
                        padding: prepare(_cssPaddingCache),
                        overflowAmount: prepare(_overflowAmountCache),
                        hideOverflow: prepare(_hideOverflowCache),
                        hasOverflow: prepare(_hasOverflowCache),
                        contentScrollSize: prepare(_contentScrollSizeCache),
                        viewportSize: prepare(_viewportSize),
                        hostSize: prepare(_hostSizeCache),
                        documentMixed : prepare(_documentMixed)
                    };
                    return type(stateProperty) == TYPES.s ? getObjectPropVal(obj, stateProperty) : obj;
                };

                /**
                 * Gets all or specific extension instance.
                 * @param extName The name of the extension from which the instance shall be got.
                 * @returns {{}} The instance of the extension with the given name or undefined if the instance couldn't be found.
                 */
                _base.ext = function(extName) {
                    var result;
                    var privateMethods = _extensionsPrivateMethods.split(' ');
                    var i = 0;
                    if(type(extName) == TYPES.s) {
                        if(_extensions.hasOwnProperty(extName)) {
                            result = extendDeep({}, _extensions[extName]);
                            for (; i < privateMethods.length; i++)
                                delete result[privateMethods[i]];
                        }
                    }
                    else {
                        result = { };
                        for(i in _extensions)
                            result[i] = extendDeep({ }, _base.ext(i));
                    }
                    return result;
                };

                /**
                 * Adds a extension to this instance.
                 * @param extName The name of the extension which shall be added.
                 * @param extensionOptions The extension options which shall be used.
                 * @returns {{}} The instance of the added extension or undefined if the extension couldn't be added properly.
                 */
                _base.addExt = function(extName, extensionOptions) {
                    var registeredExtensionObj = window[PLUGINNAME].extension(extName);
                    var instance;
                    var instanceAdded;
                    var instanceContract;
                    var contractResult;
                    var contractFulfilled = true;
                    if(registeredExtensionObj) {
                        if(!_extensions.hasOwnProperty(extName)) {
                            instance = registeredExtensionObj.extensionFactory.call(_base,
                                extendDeep({ }, registeredExtensionObj.defaultOptions),
                                FRAMEWORK,
                                COMPATIBILITY);

                            if (instance) {
                                instanceContract = instance.contract;
                                if (type(instanceContract) == TYPES.f) {
                                    contractResult = instanceContract(window);
                                    contractFulfilled = type(contractResult) == TYPES.b ? contractResult : contractFulfilled;
                                }
                                if(contractFulfilled) {
                                    _extensions[extName] = instance;
                                    instanceAdded = instance.added;
                                    if(type(instanceAdded) == TYPES.f)
                                        instanceAdded(extensionOptions);

                                    return _base.ext(extName);
                                }
                            }
                        }
                        else
                            return _base.ext(extName);
                    }
                    else
                        console.warn("A extension with the name \"" + extName + "\" isn't registered.");
                };

                /**
                 * Removes a extension from this instance.
                 * @param extName The name of the extension which shall be removed.
                 * @returns {boolean} True if the extension was removed, false otherwise e.g. if the extension wasn't added before.
                 */
                _base.removeExt = function(extName) {
                    var instance = _extensions[extName];
                    var instanceRemoved;
                    if(instance) {
                        delete _extensions[extName];

                        instanceRemoved = instance.removed;
                        if(type(instanceRemoved) == TYPES.f)
                            instanceRemoved();

                        return true;
                    }
                    return false;
                };

                /**
                 * Constructs the plugin.
                 * @param targetElement The element to which the plugin shall be applied.
                 * @param options The initial options of the plugin.
                 * @param extensions The extension(s) which shall be added right after the initialization.
                 * @returns {boolean} True if the plugin was successfully initialized, false otherwise.
                 */
                function construct(targetElement, options, extensions) {
                    _defaultOptions = globals.defaultOptions;
                    _nativeScrollbarStyling = globals.nativeScrollbarStyling;
                    _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
                    _nativeScrollbarIsOverlaid = extendDeep({}, globals.nativeScrollbarIsOverlaid);
                    _overlayScrollbarDummySize = extendDeep({}, globals.overlayScrollbarDummySize);
                    _rtlScrollBehavior = extendDeep({}, globals.rtlScrollBehavior);

                    //parse & set options but don't update
                    setOptions(extendDeep({ }, _defaultOptions, _pluginsOptions._validate(options, _pluginsOptions._template, true)));

                    //check if the plugin hasn't to be initialized
                    if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.x && !_currentPreparedOptions.nativeScrollbarsOverlaid.initialize) {
                        dispatchCallback("onInitializationWithdrawn");
                        return false;
                    }

                    _cssCalc = globals.cssCalc;
                    _msieVersion = globals.msie;
                    _autoUpdateRecommended = globals.autoUpdateRecommended;
                    _supportTransition = globals.supportTransition;
                    _supportTransform = globals.supportTransform;
                    _supportPassiveEvents = globals.supportPassiveEvents;
                    _supportResizeObserver = globals.supportResizeObserver;
                    _supportMutationObserver = globals.supportMutationObserver;
                    _restrictedMeasuring = globals.restrictedMeasuring;
                    _documentElement = FRAMEWORK(targetElement.ownerDocument);
                    _documentElementNative = _documentElement[0];
                    _windowElement = FRAMEWORK(_documentElementNative.defaultView || _documentElementNative.parentWindow);
                    _windowElementNative = _windowElement[0];
                    _htmlElement = findFirst(_documentElement, 'html');
                    _bodyElement =  findFirst(_htmlElement, 'body');
                    _targetElement = FRAMEWORK(targetElement);
                    _targetElementNative = _targetElement[0];
                    _isTextarea = _targetElement.is('textarea');
                    _isBody = _targetElement.is('body');
                    _documentMixed = _documentElementNative !== document;

                    var initBodyScroll;
                    if (_isBody) {
                        initBodyScroll = {};
                        initBodyScroll.l = MATH.max(_targetElement[_strScrollLeft](), _htmlElement[_strScrollLeft](), _windowElement[_strScrollLeft]());
                        initBodyScroll.t = MATH.max(_targetElement[_strScrollTop](), _htmlElement[_strScrollTop](), _windowElement[_strScrollTop]());
                    }

                    //build OverlayScrollbars DOM and Events
                    setupStructureDOM();
                    setupStructureEvents();

                    //build Scrollbars DOM and Events
                    setupScrollbarsDOM();
                    setupScrollbarEvents(true);
                    setupScrollbarEvents(false);

                    //build Scrollbar Corner DOM and Events
                    setupScrollbarCornerDOM();
                    setupScrollbarCornerEvents();

                    //create mutation observers
                    createMutationObservers();

                    if(_isBody) {
                        //apply the body scroll to handle it right in the update method
                        _viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t);

                        //set the focus on the viewport element so you dont have to click on the page to use keyboard keys (up / down / space) for scrolling
                        if(document.activeElement == targetElement && _viewportElementNative.focus) {
                            //set a tabindex to make the viewportElement focusable
                            _viewportElement.attr('tabindex', '-1');
                            _viewportElementNative.focus();
                            /* the tabindex has to be removed due to;
                             * If you set the tabindex attribute on an <div>, then its child content cannot be scrolled with the arrow keys unless you set tabindex on the content, too
                             * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                             */
                            _viewportElement.one(_strMouseTouchDownEvent, function() {
                                _viewportElement.removeAttr('tabindex');
                            });
                        }
                    }

                    //build resize observer for the host element
                    addResizeObserver(_sizeObserverElement, hostOnResized);

                    //update for the first time
                    hostOnResized(); //initialize cache for host size
                    _base.update(_strAuto); //initialize cache for content

                    //the plugin is initialized now!
                    _initialized = true;
                    dispatchCallback("onInitialized");

                    //call all callbacks which would fire before the initialized was complete
                    FRAMEWORK.each(_callbacksInitQeueue, function(index, value) { dispatchCallback(value.n, value.a); });
                    _callbacksInitQeueue = [ ];

                    //add extensions
                    if(type(extensions) == TYPES.s)
                        extensions = [ extensions ];
                    if(COMPATIBILITY.isA(extensions))
                        FRAMEWORK.each(extensions, function (index, value) {_base.addExt(value); });
                    else if(FRAMEWORK.isPlainObject(extensions))
                        FRAMEWORK.each(extensions, function (key, value) { _base.addExt(key, value); });

                    //add the transition class for transitions AFTER the first update & AFTER the applied extensions (for preventing unwanted transitions)
                    setTimeout(function () {
                        if (_supportTransition && !_destroyed)
                            addClass(_hostElement, _classNameHostTransition);
                    }, 333);

                    return _initialized;
                }

                if (construct(pluginTargetElement, options, extensions)) {
                    INSTANCES(pluginTargetElement, _base);
                    return _base;
                }
                _base = undefined;
            }

            /**
             * Initializes a new OverlayScrollbarsInstance object or changes options if already initialized or returns the current instance.
             * @param pluginTargetElements The elements to which the Plugin shall be initialized.
             * @param options The custom options with which the plugin shall be initialized.
             * @param extensions The extension(s) which shall be added right after initialization.
             * @returns {*}
             */
            window[PLUGINNAME] = function(pluginTargetElements, options, extensions) {
                if(arguments[LEXICON.l] === 0)
                    return this;

                var arr = [ ];
                var optsIsPlainObj = FRAMEWORK.isPlainObject(options);
                var inst;
                var result;

                //pluginTargetElements is null or undefined
                if(!pluginTargetElements)
                    return optsIsPlainObj || !options ? result : arr;

                /*
                   pluginTargetElements will be converted to:
                   1. A jQueryElement Array
                   2. A HTMLElement Array
                   3. A Array with a single HTML Element
                   so pluginTargetElements is always a array.
                */
                pluginTargetElements = pluginTargetElements[LEXICON.l] != undefined ? pluginTargetElements : [ pluginTargetElements[0] || pluginTargetElements ];
                initOverlayScrollbarsStatics();

                if(pluginTargetElements[LEXICON.l] > 0) {
                    if(optsIsPlainObj) {
                        FRAMEWORK.each(pluginTargetElements, function (i, v) {
                            inst = v;
                            if(inst !== undefined)
                                arr.push(OverlayScrollbarsInstance(inst, options, extensions, _pluginsGlobals, _pluginsAutoUpdateLoop));
                        });
                    }
                    else {
                        FRAMEWORK.each(pluginTargetElements, function(i, v) {
                            inst = INSTANCES(v);
                            if((options === '!' && inst instanceof window[PLUGINNAME]) || (COMPATIBILITY.type(options) == TYPES.f && options(v, inst)))
                                arr.push(inst);
                            else if(options === undefined)
                                arr.push(inst);
                        });
                    }
                    result = arr[LEXICON.l] === 1 ? arr[0] : arr;
                }
                return result;
            };

            /**
             * Returns a object which contains global information about the plugin and each instance of it.
             * The returned object is just a copy, that means that changes to the returned object won't have any effect to the original object.
             */
            window[PLUGINNAME].globals = function () {
                initOverlayScrollbarsStatics();
                var globals = FRAMEWORK.extend(true, { }, _pluginsGlobals);
                delete globals['msie'];
                return globals;
            };

            /**
             * Gets or Sets the default options for each new plugin initialization.
             * @param newDefaultOptions The object with which the default options shall be extended.
             */
            window[PLUGINNAME].defaultOptions = function(newDefaultOptions) {
                initOverlayScrollbarsStatics();
                var currDefaultOptions = _pluginsGlobals.defaultOptions;
                if(newDefaultOptions === undefined)
                    return FRAMEWORK.extend(true, { }, currDefaultOptions);

                //set the new default options
                _pluginsGlobals.defaultOptions = FRAMEWORK.extend(true, { }, currDefaultOptions , _pluginsOptions._validate(newDefaultOptions, _pluginsOptions._template, true));
            };

            /**
             * Registers, Unregisters or returns a extension.
             * Register: Pass the name and the extension. (defaultOptions is optional)
             * Unregister: Pass the name and anything except a function as extension parameter.
             * Get extension: Pass the name of the extension which shall be got.
             * Get all extensions: Pass no arguments.
             * @param extensionName The name of the extension which shall be registered, unregistered or returned.
             * @param extension A function which generates the instance of the extension or anything other to remove a already registered extension.
             * @param defaultOptions The default options which shall be used for the registered extension.
             */
            window[PLUGINNAME].extension = function(extensionName, extension, defaultOptions) {
                var extNameTypeString = COMPATIBILITY.type(extensionName) == TYPES.s;
                var argLen = arguments[LEXICON.l];
                var i = 0;
                if(argLen < 1 || !extNameTypeString) {
                    //return a copy of all extension objects
                    return FRAMEWORK.extend(true, { length : _pluginsExtensions[LEXICON.l] }, _pluginsExtensions);
                }
                else if(extNameTypeString) {
                    if(COMPATIBILITY.type(extension) == TYPES.f) {
                        //register extension
                        _pluginsExtensions.push({
                            name : extensionName,
                            extensionFactory : extension,
                            defaultOptions : defaultOptions
                        });
                    }
                    else {
                        for(; i < _pluginsExtensions[LEXICON.l]; i++) {
                            if (_pluginsExtensions[i].name === extensionName) {
                                if(argLen > 1)
                                    _pluginsExtensions.splice(i, 1); //remove extension
                                else
                                    return FRAMEWORK.extend(true, { }, _pluginsExtensions[i]); //return extension with the given name
                            }
                        }
                    }
                }
            };

            return window[PLUGINNAME];
        })();

        if(JQUERY && JQUERY.fn) {
            /**
             * The jQuery initialization interface.
             * @param options The initial options for the construction of the plugin. To initialize the plugin, this option has to be a object! If it isn't a object, the instance(s) are returned and the plugin wont be initialized.
             * @param extensions The extension(s) which shall be added right after initialization.
             * @returns {*} After initialization it returns the jQuery element array, else it returns the instance(s) of the elements which are selected.
             */
            JQUERY.fn.overlayScrollbars = function (options, extensions) {
                var _elements = this;
                if(JQUERY.isPlainObject(options)) {
                    JQUERY.each(_elements, function() { PLUGIN(this, options, extensions); });
                    return _elements;
                }
                else
                    return PLUGIN(_elements, options);
            };
        }
        return PLUGIN;
    }
));