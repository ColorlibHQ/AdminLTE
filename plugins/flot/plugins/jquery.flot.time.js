/* Pretty handling of time axes.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

Set axis.mode to "time" to enable. See the section "Time series data" in
API.txt for details.
*/

(function($) {
    'use strict';

    var options = {
        xaxis: {
            timezone: null, // "browser" for local to the client or timezone for timezone-js
            timeformat: null, // format string to use
            twelveHourClock: false, // 12 or 24 time in time mode
            monthNames: null, // list of names of months
            timeBase: 'seconds' // are the values in given in mircoseconds, milliseconds or seconds
        },
        yaxis: {
            timeBase: 'seconds'
        }
    };

    var floorInBase = $.plot.saturated.floorInBase;

    // Method to provide microsecond support to Date like classes.
    var CreateMicroSecondDate = function(DateType, microEpoch) {
        var newDate = new DateType(microEpoch);

        var oldSetTime = newDate.setTime.bind(newDate);
        newDate.update = function(microEpoch) {
            // Round epoch to 3 decimal accuracy
            microEpoch = Math.round(microEpoch * 1000) / 1000;

            oldSetTime(microEpoch);

            // Microseconds are stored as integers
            this.microseconds = 1000 * (microEpoch - Math.floor(microEpoch));
        };

        var oldGetTime = newDate.getTime.bind(newDate);
        newDate.getTime = function () {
            var microEpoch = oldGetTime() + this.microseconds / 1000;
            return microEpoch;
        };

        newDate.setTime = function (microEpoch) {
            this.update(microEpoch);
        };

        newDate.getMicroseconds = function() {
            return this.microseconds;
        };

        newDate.setMicroseconds = function(microseconds) {
            var epochWithoutMicroseconds = oldGetTime();
            var newEpoch = epochWithoutMicroseconds + microseconds / 1000;
            this.update(newEpoch);
        };

        newDate.setUTCMicroseconds = function(microseconds) { this.setMicroseconds(microseconds); }

        newDate.getUTCMicroseconds = function() { return this.getMicroseconds(); }

        newDate.microseconds = null;
        newDate.microEpoch = null;
        newDate.update(microEpoch);
        return newDate;
    }

    // Returns a string with the date d formatted according to fmt.
    // A subset of the Open Group's strftime format is supported.

    function formatDate(d, fmt, monthNames, dayNames) {
        if (typeof d.strftime === "function") {
            return d.strftime(fmt);
        }

        var leftPad = function(n, pad) {
            n = "" + n;
            pad = "" + (pad == null ? "0" : pad);
            return n.length === 1 ? pad + n : n;
        };

        var formatSubSeconds = function(milliseconds, microseconds, numberDecimalPlaces) {
            var totalMicroseconds = milliseconds * 1000 + microseconds;
            var formattedString;
            if (numberDecimalPlaces < 6 && numberDecimalPlaces > 0) {
                var magnitude = parseFloat('1e' + (numberDecimalPlaces - 6));
                totalMicroseconds = Math.round(Math.round(totalMicroseconds * magnitude) / magnitude);
                formattedString = ('00000' + totalMicroseconds).slice(-6, -(6 - numberDecimalPlaces));
            } else {
                totalMicroseconds = Math.round(totalMicroseconds)
                formattedString = ('00000' + totalMicroseconds).slice(-6);
            }
            return formattedString;
        };

        var r = [];
        var escape = false;
        var hours = d.getHours();
        var isAM = hours < 12;

        if (!monthNames) {
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        }

        if (!dayNames) {
            dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        }

        var hours12;
        if (hours > 12) {
            hours12 = hours - 12;
        } else if (hours === 0) {
            hours12 = 12;
        } else {
            hours12 = hours;
        }

        var decimals = -1;
        for (var i = 0; i < fmt.length; ++i) {
            var c = fmt.charAt(i);

            if (!isNaN(Number(c)) && Number(c) > 0) {
                decimals = Number(c);
            } else if (escape) {
                switch (c) {
                    case 'a': c = "" + dayNames[d.getDay()]; break;
                    case 'b': c = "" + monthNames[d.getMonth()]; break;
                    case 'd': c = leftPad(d.getDate()); break;
                    case 'e': c = leftPad(d.getDate(), " "); break;
                    case 'h': // For back-compat with 0.7; remove in 1.0
                    case 'H': c = leftPad(hours); break;
                    case 'I': c = leftPad(hours12); break;
                    case 'l': c = leftPad(hours12, " "); break;
                    case 'm': c = leftPad(d.getMonth() + 1); break;
                    case 'M': c = leftPad(d.getMinutes()); break;
                    // quarters not in Open Group's strftime specification
                    case 'q':
                        c = "" + (Math.floor(d.getMonth() / 3) + 1); break;
                    case 'S': c = leftPad(d.getSeconds()); break;
                    case 's': c = "" + formatSubSeconds(d.getMilliseconds(), d.getMicroseconds(), decimals); break;
                    case 'y': c = leftPad(d.getFullYear() % 100); break;
                    case 'Y': c = "" + d.getFullYear(); break;
                    case 'p': c = (isAM) ? ("" + "am") : ("" + "pm"); break;
                    case 'P': c = (isAM) ? ("" + "AM") : ("" + "PM"); break;
                    case 'w': c = "" + d.getDay(); break;
                }
                r.push(c);
                escape = false;
            } else {
                if (c === "%") {
                    escape = true;
                } else {
                    r.push(c);
                }
            }
        }

        return r.join("");
    }

    // To have a consistent view of time-based data independent of which time
    // zone the client happens to be in we need a date-like object independent
    // of time zones.  This is done through a wrapper that only calls the UTC
    // versions of the accessor methods.

    function makeUtcWrapper(d) {
        function addProxyMethod(sourceObj, sourceMethod, targetObj, targetMethod) {
            sourceObj[sourceMethod] = function() {
                return targetObj[targetMethod].apply(targetObj, arguments);
            };
        }

        var utc = {
            date: d
        };

        // support strftime, if found
        if (d.strftime !== undefined) {
            addProxyMethod(utc, "strftime", d, "strftime");
        }

        addProxyMethod(utc, "getTime", d, "getTime");
        addProxyMethod(utc, "setTime", d, "setTime");

        var props = ["Date", "Day", "FullYear", "Hours", "Minutes", "Month", "Seconds", "Milliseconds", "Microseconds"];

        for (var p = 0; p < props.length; p++) {
            addProxyMethod(utc, "get" + props[p], d, "getUTC" + props[p]);
            addProxyMethod(utc, "set" + props[p], d, "setUTC" + props[p]);
        }

        return utc;
    }

    // select time zone strategy.  This returns a date-like object tied to the
    // desired timezone
    function dateGenerator(ts, opts) {
        var maxDateValue = 8640000000000000;

        if (opts && opts.timeBase === 'seconds') {
            ts *= 1000;
        } else if (opts.timeBase === 'microseconds') {
            ts /= 1000;
        }

        if (ts > maxDateValue) {
            ts = maxDateValue;
        } else if (ts < -maxDateValue) {
            ts = -maxDateValue;
        }

        if (opts.timezone === "browser") {
            return CreateMicroSecondDate(Date, ts);
        } else if (!opts.timezone || opts.timezone === "utc") {
            return makeUtcWrapper(CreateMicroSecondDate(Date, ts));
        } else if (typeof timezoneJS !== "undefined" && typeof timezoneJS.Date !== "undefined") {
            var d = CreateMicroSecondDate(timezoneJS.Date, ts);
            // timezone-js is fickle, so be sure to set the time zone before
            // setting the time.
            d.setTimezone(opts.timezone);
            d.setTime(ts);
            return d;
        } else {
            return makeUtcWrapper(CreateMicroSecondDate(Date, ts));
        }
    }

    // map of app. size of time units in seconds
    var timeUnitSizeSeconds = {
        "microsecond": 0.000001,
        "millisecond": 0.001,
        "second": 1,
        "minute": 60,
        "hour": 60 * 60,
        "day": 24 * 60 * 60,
        "month": 30 * 24 * 60 * 60,
        "quarter": 3 * 30 * 24 * 60 * 60,
        "year": 365.2425 * 24 * 60 * 60
    };

    // map of app. size of time units in milliseconds
    var timeUnitSizeMilliseconds = {
        "microsecond": 0.001,
        "millisecond": 1,
        "second": 1000,
        "minute": 60 * 1000,
        "hour": 60 * 60 * 1000,
        "day": 24 * 60 * 60 * 1000,
        "month": 30 * 24 * 60 * 60 * 1000,
        "quarter": 3 * 30 * 24 * 60 * 60 * 1000,
        "year": 365.2425 * 24 * 60 * 60 * 1000
    };

    // map of app. size of time units in microseconds
    var timeUnitSizeMicroseconds = {
        "microsecond": 1,
        "millisecond": 1000,
        "second": 1000000,
        "minute": 60 * 1000000,
        "hour": 60 * 60 * 1000000,
        "day": 24 * 60 * 60 * 1000000,
        "month": 30 * 24 * 60 * 60 * 1000000,
        "quarter": 3 * 30 * 24 * 60 * 60 * 1000000,
        "year": 365.2425 * 24 * 60 * 60 * 1000000
    };

    // the allowed tick sizes, after 1 year we use
    // an integer algorithm

    var baseSpec = [
        [1, "microsecond"], [2, "microsecond"], [5, "microsecond"], [10, "microsecond"],
        [25, "microsecond"], [50, "microsecond"], [100, "microsecond"], [250, "microsecond"], [500, "microsecond"],
        [1, "millisecond"], [2, "millisecond"], [5, "millisecond"], [10, "millisecond"],
        [25, "millisecond"], [50, "millisecond"], [100, "millisecond"], [250, "millisecond"], [500, "millisecond"],
        [1, "second"], [2, "second"], [5, "second"], [10, "second"],
        [30, "second"],
        [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"],
        [30, "minute"],
        [1, "hour"], [2, "hour"], [4, "hour"],
        [8, "hour"], [12, "hour"],
        [1, "day"], [2, "day"], [3, "day"],
        [0.25, "month"], [0.5, "month"], [1, "month"],
        [2, "month"]
    ];

    // we don't know which variant(s) we'll need yet, but generating both is
    // cheap

    var specMonths = baseSpec.concat([[3, "month"], [6, "month"],
        [1, "year"]]);
    var specQuarters = baseSpec.concat([[1, "quarter"], [2, "quarter"],
        [1, "year"]]);

    function dateTickGenerator(axis) {
        var opts = axis.options,
            ticks = [],
            d = dateGenerator(axis.min, opts),
            minSize = 0;

        // make quarter use a possibility if quarters are
        // mentioned in either of these options
        var spec = (opts.tickSize && opts.tickSize[1] ===
            "quarter") ||
            (opts.minTickSize && opts.minTickSize[1] ===
            "quarter") ? specQuarters : specMonths;

        var timeUnitSize;
        if (opts.timeBase === 'seconds') {
            timeUnitSize = timeUnitSizeSeconds;
        } else if (opts.timeBase === 'microseconds') {
            timeUnitSize = timeUnitSizeMicroseconds;
        } else {
            timeUnitSize = timeUnitSizeMilliseconds;
        }

        if (opts.minTickSize !== null && opts.minTickSize !== undefined) {
            if (typeof opts.tickSize === "number") {
                minSize = opts.tickSize;
            } else {
                minSize = opts.minTickSize[0] * timeUnitSize[opts.minTickSize[1]];
            }
        }

        for (var i = 0; i < spec.length - 1; ++i) {
            if (axis.delta < (spec[i][0] * timeUnitSize[spec[i][1]] +
                spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2 &&
                spec[i][0] * timeUnitSize[spec[i][1]] >= minSize) {
                break;
            }
        }

        var size = spec[i][0];
        var unit = spec[i][1];
        // special-case the possibility of several years
        if (unit === "year") {
            // if given a minTickSize in years, just use it,
            // ensuring that it's an integer

            if (opts.minTickSize !== null && opts.minTickSize !== undefined && opts.minTickSize[1] === "year") {
                size = Math.floor(opts.minTickSize[0]);
            } else {
                var magn = parseFloat('1e' + Math.floor(Math.log(axis.delta / timeUnitSize.year) / Math.LN10));
                var norm = (axis.delta / timeUnitSize.year) / magn;

                if (norm < 1.5) {
                    size = 1;
                } else if (norm < 3) {
                    size = 2;
                } else if (norm < 7.5) {
                    size = 5;
                } else {
                    size = 10;
                }

                size *= magn;
            }

            // minimum size for years is 1

            if (size < 1) {
                size = 1;
            }
        }

        axis.tickSize = opts.tickSize || [size, unit];
        var tickSize = axis.tickSize[0];
        unit = axis.tickSize[1];

        var step = tickSize * timeUnitSize[unit];

        if (unit === "microsecond") {
            d.setMicroseconds(floorInBase(d.getMicroseconds(), tickSize));
        } else if (unit === "millisecond") {
            d.setMilliseconds(floorInBase(d.getMilliseconds(), tickSize));
        } else if (unit === "second") {
            d.setSeconds(floorInBase(d.getSeconds(), tickSize));
        } else if (unit === "minute") {
            d.setMinutes(floorInBase(d.getMinutes(), tickSize));
        } else if (unit === "hour") {
            d.setHours(floorInBase(d.getHours(), tickSize));
        } else if (unit === "month") {
            d.setMonth(floorInBase(d.getMonth(), tickSize));
        } else if (unit === "quarter") {
            d.setMonth(3 * floorInBase(d.getMonth() / 3,
                tickSize));
        } else if (unit === "year") {
            d.setFullYear(floorInBase(d.getFullYear(), tickSize));
        }

        // reset smaller components

        if (step >= timeUnitSize.millisecond) {
            d.setMicroseconds(0);
        }
        if (step >= timeUnitSize.second) {
            d.setMilliseconds(0);
        }
        if (step >= timeUnitSize.minute) {
            d.setSeconds(0);
        }
        if (step >= timeUnitSize.hour) {
            d.setMinutes(0);
        }
        if (step >= timeUnitSize.day) {
            d.setHours(0);
        }
        if (step >= timeUnitSize.day * 4) {
            d.setDate(1);
        }
        if (step >= timeUnitSize.month * 2) {
            d.setMonth(floorInBase(d.getMonth(), 3));
        }
        if (step >= timeUnitSize.quarter * 2) {
            d.setMonth(floorInBase(d.getMonth(), 6));
        }
        if (step >= timeUnitSize.year) {
            d.setMonth(0);
        }

        var carry = 0;
        var v = Number.NaN;
        var v1000;
        var prev;
        do {
            prev = v;
            v1000 = d.getTime();
            if (opts && opts.timeBase === 'seconds') {
                v = v1000 / 1000;
            } else if (opts && opts.timeBase === 'microseconds') {
                v = v1000 * 1000;
            } else {
                v = v1000;
            }

            ticks.push(v);

            if (unit === "month" || unit === "quarter") {
                if (tickSize < 1) {
                    // a bit complicated - we'll divide the
                    // month/quarter up but we need to take
                    // care of fractions so we don't end up in
                    // the middle of a day
                    d.setDate(1);
                    var start = d.getTime();
                    d.setMonth(d.getMonth() +
                        (unit === "quarter" ? 3 : 1));
                    var end = d.getTime();
                    d.setTime((v + carry * timeUnitSize.hour + (end - start) * tickSize));
                    carry = d.getHours();
                    d.setHours(0);
                } else {
                    d.setMonth(d.getMonth() +
                        tickSize * (unit === "quarter" ? 3 : 1));
                }
            } else if (unit === "year") {
                d.setFullYear(d.getFullYear() + tickSize);
            } else {
                if (opts.timeBase === 'seconds') {
                    d.setTime((v + step) * 1000);
                } else if (opts.timeBase === 'microseconds') {
                    d.setTime((v + step) / 1000);
                } else {
                    d.setTime(v + step);
                }
            }
        } while (v < axis.max && v !== prev);

        return ticks;
    };

    function init(plot) {
        plot.hooks.processOptions.push(function (plot) {
            $.each(plot.getAxes(), function(axisName, axis) {
                var opts = axis.options;
                if (opts.mode === "time") {
                    axis.tickGenerator = dateTickGenerator;

                    // if a tick formatter is already provided do not overwrite it
                    if ('tickFormatter' in opts && typeof opts.tickFormatter === 'function') return;

                    axis.tickFormatter = function (v, axis) {
                        var d = dateGenerator(v, axis.options);

                        // first check global format
                        if (opts.timeformat != null) {
                            return formatDate(d, opts.timeformat, opts.monthNames, opts.dayNames);
                        }

                        // possibly use quarters if quarters are mentioned in
                        // any of these places
                        var useQuarters = (axis.options.tickSize &&
                                axis.options.tickSize[1] === "quarter") ||
                            (axis.options.minTickSize &&
                                axis.options.minTickSize[1] === "quarter");

                        var timeUnitSize;
                        if (opts.timeBase === 'seconds') {
                            timeUnitSize = timeUnitSizeSeconds;
                        } else if (opts.timeBase === 'microseconds') {
                            timeUnitSize = timeUnitSizeMicroseconds;
                        } else {
                            timeUnitSize = timeUnitSizeMilliseconds;
                        }

                        var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
                        var span = axis.max - axis.min;
                        var suffix = (opts.twelveHourClock) ? " %p" : "";
                        var hourCode = (opts.twelveHourClock) ? "%I" : "%H";
                        var factor;
                        var fmt;

                        if (opts.timeBase === 'seconds') {
                            factor = 1;
                        } else if (opts.timeBase === 'microseconds') {
                            factor = 1000000
                        } else {
                            factor = 1000;
                        }

                        if (t < timeUnitSize.second) {
                            var decimals = -Math.floor(Math.log10(t / factor))

                            // the two-and-halves require an additional decimal
                            if (String(t).indexOf('25') > -1) {
                                decimals++;
                            }

                            fmt = "%S.%" + decimals + "s";
                        } else
                        if (t < timeUnitSize.minute) {
                            fmt = hourCode + ":%M:%S" + suffix;
                        } else if (t < timeUnitSize.day) {
                            if (span < 2 * timeUnitSize.day) {
                                fmt = hourCode + ":%M" + suffix;
                            } else {
                                fmt = "%b %d " + hourCode + ":%M" + suffix;
                            }
                        } else if (t < timeUnitSize.month) {
                            fmt = "%b %d";
                        } else if ((useQuarters && t < timeUnitSize.quarter) ||
                            (!useQuarters && t < timeUnitSize.year)) {
                            if (span < timeUnitSize.year) {
                                fmt = "%b";
                            } else {
                                fmt = "%b %Y";
                            }
                        } else if (useQuarters && t < timeUnitSize.year) {
                            if (span < timeUnitSize.year) {
                                fmt = "Q%q";
                            } else {
                                fmt = "Q%q %Y";
                            }
                        } else {
                            fmt = "%Y";
                        }

                        var rt = formatDate(d, fmt, opts.monthNames, opts.dayNames);

                        return rt;
                    };
                }
            });
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'time',
        version: '1.0'
    });

    // Time-axis support used to be in Flot core, which exposed the
    // formatDate function on the plot object.  Various plugins depend
    // on the function, so we need to re-expose it here.

    $.plot.formatDate = formatDate;
    $.plot.dateGenerator = dateGenerator;
    $.plot.dateTickGenerator = dateTickGenerator;
    $.plot.makeUtcWrapper = makeUtcWrapper;
})(jQuery);
