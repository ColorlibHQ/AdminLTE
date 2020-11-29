/**
* Copyright (c) 2020, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uPlot.js (μPlot)
* A small, fast chart for time series, lines, areas, ohlc & bars
* https://github.com/leeoniya/uPlot (v1.4.6)
*/

'use strict';

function debounce(fn, time) {
	var pending = null;

	function run() {
		pending = null;
		fn();
	}

	return function() {
		clearTimeout(pending);
		pending = setTimeout(run, time);
	}
}

// binary search for index of closest value
function closestIdx(num, arr, lo, hi) {
	var mid;
	lo = lo || 0;
	hi = hi || arr.length - 1;
	var bitwise = hi <= 2147483647;

	while (hi - lo > 1) {
		mid = bitwise ? (lo + hi) >> 1 : floor((lo + hi) / 2);

		if (arr[mid] < num)
			{ lo = mid; }
		else
			{ hi = mid; }
	}

	if (num - arr[lo] <= arr[hi] - num)
		{ return lo; }

	return hi;
}

function getMinMax(data, _i0, _i1, sorted) {
//	console.log("getMinMax()");

	var _min = inf;
	var _max = -inf;

	if (sorted == 1) {
		_min = data[_i0];
		_max = data[_i1];
	}
	else if (sorted == -1) {
		_min = data[_i1];
		_max = data[_i0];
	}
	else {
		for (var i = _i0; i <= _i1; i++) {
			if (data[i] != null) {
				_min = min(_min, data[i]);
				_max = max(_max, data[i]);
			}
		}
	}

	return [_min, _max];
}

var _fixedTuple = [0, 0];

function fixIncr(minIncr, maxIncr, minExp, maxExp) {
	_fixedTuple[0] = minExp < 0 ? roundDec(minIncr, -minExp) : minIncr;
	_fixedTuple[1] = maxExp < 0 ? roundDec(maxIncr, -maxExp) : maxIncr;
	return _fixedTuple;
}

function rangeLog(min, max, base, fullMags) {
	var logFn = base == 10 ? log10 : log2;

	if (min == max) {
		min /= base;
		max *= base;
	}

	var minExp, maxExp, minMaxIncrs;

	if (fullMags) {
		minExp = floor(logFn(min));
		maxExp =  ceil(logFn(max));

		minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

		min = minMaxIncrs[0];
		max = minMaxIncrs[1];
	}
	else {
		minExp = floor(logFn(min));
		maxExp = floor(logFn(max));

		minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

		min = incrRoundDn(min, minMaxIncrs[0]);
		max = incrRoundUp(max, minMaxIncrs[1]);
	}

	return [min, max];
}

var _eqRangePart = {
	pad:  0,
	soft: null,
	mode: 0,
};

var _eqRange = {
	min: _eqRangePart,
	max: _eqRangePart,
};

// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
function rangeNum(_min, _max, mult, extra) {
	if (isObj(mult))
		{ return _rangeNum(_min, _max, mult); }

	_eqRangePart.pad  = mult;
	_eqRangePart.soft = extra ? 0 : null;
	_eqRangePart.mode = extra ? 2 : 0;

	return _rangeNum(_min, _max, _eqRange);
}

// nullish coalesce
function ifNull(lh, rh) {
	return lh == null ? rh : lh;
}

function _rangeNum(_min, _max, cfg) {
	var cmin = cfg.min;
	var cmax = cfg.max;

	var padMin = ifNull(cmin.pad, 0);
	var padMax = ifNull(cmax.pad, 0);

	var hardMin = ifNull(cmin.hard, -inf);
	var hardMax = ifNull(cmax.hard,  inf);

	var softMin = ifNull(cmin.soft,  inf);
	var softMax = ifNull(cmax.soft, -inf);

	var softMinMode = ifNull(cmin.mode, 0);
	var softMaxMode = ifNull(cmax.mode, 0);

	var delta        = _max - _min;
	var nonZeroDelta = delta || abs(_max) || 1e3;
	var mag          = log10(nonZeroDelta);
	var base         = pow(10, floor(mag));

	var _padMin  = nonZeroDelta * (delta == 0 ? (_min == 0 ? .1 : 1) : padMin);
	var _newMin  = roundDec(incrRoundDn(_min - _padMin, base/100), 6);
	var _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 2 && _newMin < softMin) ? softMin : inf;
	var minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

	var _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
	var _newMax  = roundDec(incrRoundUp(_max + _padMax, base/100), 6);
	var _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 2 && _newMax > softMax) ? softMax : -inf;
	var maxLim   = min(hardMax, _newMax > _softMax && _max <= _softMax ? _softMax : max(_softMax, _newMax));

	if (minLim == maxLim && minLim == 0)
		{ maxLim = 100; }

	return [minLim, maxLim];
}

// alternative: https://stackoverflow.com/a/2254896
var fmtNum = new Intl.NumberFormat(navigator.language).format;

var M = Math;

var abs = M.abs;
var floor = M.floor;
var round = M.round;
var ceil = M.ceil;
var min = M.min;
var max = M.max;
var pow = M.pow;
var log10 = M.log10;
var log2 = M.log2;
var PI = M.PI;

var inf = Infinity;

function incrRound(num, incr) {
	return round(num/incr)*incr;
}

function clamp(num, _min, _max) {
	return min(max(num, _min), _max);
}

function fnOrSelf(v) {
	return typeof v == "function" ? v : function () { return v; };
}

function retArg1(_0, _1) {
	return _1;
}

function incrRoundUp(num, incr) {
	return ceil(num/incr)*incr;
}

function incrRoundDn(num, incr) {
	return floor(num/incr)*incr;
}

function roundDec(val, dec) {
	return round(val * (dec = Math.pow( 10, dec ))) / dec;
}

var fixedDec = new Map();

function guessDec(num) {
	return ((""+num).split(".")[1] || "").length;
}

function genIncrs(base, minExp, maxExp, mults) {
	var incrs = [];

	var multDec = mults.map(guessDec);

	for (var exp = minExp; exp < maxExp; exp++) {
		var expa = abs(exp);
		var mag = roundDec(pow(base, exp), expa);

		for (var i = 0; i < mults.length; i++) {
			var _incr = mults[i] * mag;
			var dec = (_incr >= 0 && exp >= 0 ? 0 : expa) + (exp >= multDec[i] ? 0 : multDec[i]);
			var incr = roundDec(_incr, dec);
			incrs.push(incr);
			fixedDec.set(incr, dec);
		}
	}

	return incrs;
}

//export const assign = Object.assign;

var EMPTY_OBJ = {};

var isArr = Array.isArray;

function isStr(v) {
	return typeof v === 'string';
}

function isObj(v) {
	return typeof v === 'object' && v !== null;
}

function copy(o) {
	var out;

	if (isArr(o))
		{ out = o.map(copy); }
	else if (isObj(o)) {
		out = {};
		for (var k in o)
			{ out[k] = copy(o[k]); }
	}
	else
		{ out = o; }

	return out;
}

function assign(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++) {
		var src = args[i];

		for (var key in src) {
			if (isObj(targ[key]))
				{ assign(targ[key], copy(src[key])); }
			else
				{ targ[key] = copy(src[key]); }
		}
	}

	return targ;
}

var microTask = typeof queueMicrotask == "undefined" ? function (fn) { return Promise.resolve().then(fn); } : queueMicrotask;

var WIDTH = "width";
var HEIGHT = "height";
var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";
var firstChild = "firstChild";
var createElement = "createElement";
var hexBlack = "#000";
var transparent = hexBlack + "0";
var classList = "classList";

var mousemove = "mousemove";
var mousedown = "mousedown";
var mouseup = "mouseup";
var mouseenter = "mouseenter";
var mouseleave = "mouseleave";
var dblclick = "dblclick";
var resize = "resize";
var scroll = "scroll";

var pre = "u-";

var UPLOT          =       "uplot";
var TITLE          = pre + "title";
var WRAP           = pre + "wrap";
var UNDER          = pre + "under";
var OVER           = pre + "over";
var OFF            = pre + "off";
var SELECT         = pre + "select";
var CURSOR_X       = pre + "cursor-x";
var CURSOR_Y       = pre + "cursor-y";
var CURSOR_PT      = pre + "cursor-pt";
var LEGEND         = pre + "legend";
var LEGEND_LIVE    = pre + "live";
var LEGEND_INLINE  = pre + "inline";
var LEGEND_THEAD   = pre + "thead";
var LEGEND_SERIES  = pre + "series";
var LEGEND_MARKER  = pre + "marker";
var LEGEND_LABEL   = pre + "label";
var LEGEND_VALUE   = pre + "value";

var rAF = requestAnimationFrame;
var doc = document;
var win = window;
var pxRatio = devicePixelRatio;

function addClass(el, c) {
	c != null && el[classList].add(c);
}

function remClass(el, c) {
	el[classList].remove(c);
}

function setStylePx(el, name, value) {
	el.style[name] = value + "px";
}

function placeTag(tag, cls, targ, refEl) {
	var el = doc[createElement](tag);

	if (cls != null)
		{ addClass(el, cls); }

	if (targ != null)
		{ targ.insertBefore(el, refEl); }

	return el;
}

function placeDiv(cls, targ) {
	return placeTag("div", cls, targ);
}

function trans(el, xPos, yPos, xMax, yMax) {
	el.style.transform = "translate(" + xPos + "px," + yPos + "px)";

	if (xPos < 0 || yPos < 0 || xPos > xMax || yPos > yMax)
		{ addClass(el, OFF); }
	else
		{ remClass(el, OFF); }
}

var evOpts = {passive: true};

function on(ev, el, cb) {
	el.addEventListener(ev, cb, evOpts);
}

function off(ev, el, cb) {
	el.removeEventListener(ev, cb, evOpts);
}

var months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December" ];

var days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday" ];

function slice3(str) {
	return str.slice(0, 3);
}

var days3 =  days.map(slice3);

var months3 =  months.map(slice3);

var engNames = {
	MMMM: months,
	MMM:  months3,
	WWWW: days,
	WWW:  days3,
};

function zeroPad2(int) {
	return (int < 10 ? '0' : '') + int;
}

function zeroPad3(int) {
	return (int < 10 ? '00' : int < 100 ? '0' : '') + int;
}

/*
function suffix(int) {
	let mod10 = int % 10;

	return int + (
		mod10 == 1 && int != 11 ? "st" :
		mod10 == 2 && int != 12 ? "nd" :
		mod10 == 3 && int != 13 ? "rd" : "th"
	);
}
*/

var getFullYear = 'getFullYear';
var getMonth = 'getMonth';
var getDate = 'getDate';
var getDay = 'getDay';
var getHours = 'getHours';
var getMinutes = 'getMinutes';
var getSeconds = 'getSeconds';
var getMilliseconds = 'getMilliseconds';

var subs = {
	// 2019
	YYYY:	function (d) { return d[getFullYear](); },
	// 19
	YY:		function (d) { return (d[getFullYear]()+'').slice(2); },
	// July
	MMMM:	function (d, names) { return names.MMMM[d[getMonth]()]; },
	// Jul
	MMM:	function (d, names) { return names.MMM[d[getMonth]()]; },
	// 07
	MM:		function (d) { return zeroPad2(d[getMonth]()+1); },
	// 7
	M:		function (d) { return d[getMonth]()+1; },
	// 09
	DD:		function (d) { return zeroPad2(d[getDate]()); },
	// 9
	D:		function (d) { return d[getDate](); },
	// Monday
	WWWW:	function (d, names) { return names.WWWW[d[getDay]()]; },
	// Mon
	WWW:	function (d, names) { return names.WWW[d[getDay]()]; },
	// 03
	HH:		function (d) { return zeroPad2(d[getHours]()); },
	// 3
	H:		function (d) { return d[getHours](); },
	// 9 (12hr, unpadded)
	h:		function (d) {var h = d[getHours](); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
	// AM
	AA:		function (d) { return d[getHours]() >= 12 ? 'PM' : 'AM'; },
	// am
	aa:		function (d) { return d[getHours]() >= 12 ? 'pm' : 'am'; },
	// a
	a:		function (d) { return d[getHours]() >= 12 ? 'p' : 'a'; },
	// 09
	mm:		function (d) { return zeroPad2(d[getMinutes]()); },
	// 9
	m:		function (d) { return d[getMinutes](); },
	// 09
	ss:		function (d) { return zeroPad2(d[getSeconds]()); },
	// 9
	s:		function (d) { return d[getSeconds](); },
	// 374
	fff:	function (d) { return zeroPad3(d[getMilliseconds]()); },
};

function fmtDate(tpl, names) {
	names = names || engNames;
	var parts = [];

	var R = /\{([a-z]+)\}|[^{]+/gi, m;

	while (m = R.exec(tpl))
		{ parts.push(m[0][0] == '{' ? subs[m[1]] : m[0]); }

	return function (d) {
		var out = '';

		for (var i = 0; i < parts.length; i++)
			{ out += typeof parts[i] == "string" ? parts[i] : parts[i](d, names); }

		return out;
	}
}

var localTz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone/53652131#53652131
function tzDate(date, tz) {
	var date2;

	// perf optimization
	if (tz == 'Etc/UTC')
		{ date2 = new Date(+date + date.getTimezoneOffset() * 6e4); }
	else if (tz == localTz)
		{ date2 = date; }
	else {
		date2 = new Date(date.toLocaleString('en-US', {timeZone: tz}));
		date2.setMilliseconds(date[getMilliseconds]());
	}

	return date2;
}

//export const series = [];

// default formatters:

var onlyWhole = function (v) { return v % 1 == 0; };

var allMults = [1,2,2.5,5];

// ...0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.25, 0.5
var decIncrs = genIncrs(10, -16, 0, allMults);

// 1, 2, 2.5, 5, 10, 20, 25, 50...
var oneIncrs = genIncrs(10, 0, 16, allMults);

// 1, 2,      5, 10, 20, 25, 50...
var wholeIncrs = oneIncrs.filter(onlyWhole);

var numIncrs = decIncrs.concat(oneIncrs);

var NL = "\n";

var yyyy    = "{YYYY}";
var NLyyyy  = NL + yyyy;
var md      = "{M}/{D}";
var NLmd    = NL + md;
var NLmdyy  = NLmd + "/{YY}";

var aa      = "{aa}";
var hmm     = "{h}:{mm}";
var hmmaa   = hmm + aa;
var NLhmmaa = NL + hmmaa;
var ss      = ":{ss}";

var _ = null;

function genTimeStuffs(ms) {
	var	s  = ms * 1e3,
		m  = s  * 60,
		h  = m  * 60,
		d  = h  * 24,
		mo = d  * 30,
		y  = d  * 365;

	// min of 1e-3 prevents setting a temporal x ticks too small since Date objects cannot advance ticks smaller than 1ms
	var subSecIncrs = ms == 1 ? genIncrs(10, 0, 3, allMults).filter(onlyWhole) : genIncrs(10, -3, 0, allMults);

	var timeIncrs = subSecIncrs.concat([
		// minute divisors (# of secs)
		s,
		s * 5,
		s * 10,
		s * 15,
		s * 30,
		// hour divisors (# of mins)
		m,
		m * 5,
		m * 10,
		m * 15,
		m * 30,
		// day divisors (# of hrs)
		h,
		h * 2,
		h * 3,
		h * 4,
		h * 6,
		h * 8,
		h * 12,
		// month divisors TODO: need more?
		d,
		d * 2,
		d * 3,
		d * 4,
		d * 5,
		d * 6,
		d * 7,
		d * 8,
		d * 9,
		d * 10,
		d * 15,
		// year divisors (# months, approx)
		mo,
		mo * 2,
		mo * 3,
		mo * 4,
		mo * 6,
		// century divisors
		y,
		y * 2,
		y * 5,
		y * 10,
		y * 25,
		y * 50,
		y * 100 ]);

	// [0]:   minimum num secs in the tick incr
	// [1]:   default tick format
	// [2-7]: rollover tick formats
	// [8]:   mode: 0: replace [1] -> [2-7], 1: concat [1] + [2-7]
	var _timeAxisStamps = [
	//   tick incr    default          year                    month   day                   hour    min       sec   mode
		[y,           yyyy,            _,                      _,      _,                    _,      _,        _,       1],
		[d * 28,      "{MMM}",         NLyyyy,                 _,      _,                    _,      _,        _,       1],
		[d,           md,              NLyyyy,                 _,      _,                    _,      _,        _,       1],
		[h,           "{h}" + aa,      NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
		[m,           hmmaa,           NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
		[s,           ss,              NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1],
		[ms,          ss + ".{fff}",   NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1] ];

	// the ensures that axis ticks, values & grid are aligned to logical temporal breakpoints and not an arbitrary timestamp
	// https://www.timeanddate.com/time/dst/
	// https://www.timeanddate.com/time/dst/2019.html
	// https://www.epochconverter.com/timezones
	function timeAxisSplits(tzDate) {
		return function (self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace) {
			var splits = [];
			var isYr = foundIncr >= y;
			var isMo = foundIncr >= mo && foundIncr < y;

			// get the timezone-adjusted date
			var minDate = tzDate(scaleMin);
			var minDateTs = minDate * ms;

			// get ts of 12am (this lands us at or before the original scaleMin)
			var minMin = mkDate(minDate[getFullYear](), isYr ? 0 : minDate[getMonth](), isMo || isYr ? 1 : minDate[getDate]());
			var minMinTs = minMin * ms;

			if (isMo || isYr) {
				var moIncr = isMo ? foundIncr / mo : 0;
				var yrIncr = isYr ? foundIncr / y  : 0;
			//	let tzOffset = scaleMin - minDateTs;		// needed?
				var split = minDateTs == minMinTs ? minDateTs : mkDate(minMin[getFullYear]() + yrIncr, minMin[getMonth]() + moIncr, 1) * ms;
				var splitDate = new Date(split / ms);
				var baseYear = splitDate[getFullYear]();
				var baseMonth = splitDate[getMonth]();

				for (var i = 0; split <= scaleMax; i++) {
					var next = mkDate(baseYear + yrIncr * i, baseMonth + moIncr * i, 1);
					var offs = next - tzDate(next * ms);

					split = (+next + offs) * ms;

					if (split <= scaleMax)
						{ splits.push(split); }
				}
			}
			else {
				var incr0 = foundIncr >= d ? d : foundIncr;
				var tzOffset = floor(scaleMin) - floor(minDateTs);
				var split$1 = minMinTs + tzOffset + incrRoundUp(minDateTs - minMinTs, incr0);
				splits.push(split$1);

				var date0 = tzDate(split$1);

				var prevHour = date0[getHours]() + (date0[getMinutes]() / m) + (date0[getSeconds]() / h);
				var incrHours = foundIncr / h;

				var minSpace = self.axes[axisIdx]._space;
				var pctSpace = foundSpace / minSpace;

				while (1) {
					split$1 = roundDec(split$1 + foundIncr, ms == 1 ? 0 : 3);

					if (split$1 > scaleMax)
						{ break; }

					if (incrHours > 1) {
						var expectedHour = floor(roundDec(prevHour + incrHours, 6)) % 24;
						var splitDate$1 = tzDate(split$1);
						var actualHour = splitDate$1.getHours();

						var dstShift = actualHour - expectedHour;

						if (dstShift > 1)
							{ dstShift = -1; }

						split$1 -= dstShift * h;

						prevHour = (prevHour + incrHours) % 24;

						// add a tick only if it's further than 70% of the min allowed label spacing
						var prevSplit = splits[splits.length - 1];
						var pctIncr = roundDec((split$1 - prevSplit) / foundIncr, 3);

						if (pctIncr * pctSpace >= .7)
							{ splits.push(split$1); }
					}
					else
						{ splits.push(split$1); }
				}
			}

			return splits;
		}
	}

	return [
		timeIncrs,
		_timeAxisStamps,
		timeAxisSplits ];
}

var ref =  genTimeStuffs(1);
var timeIncrsMs = ref[0];
var _timeAxisStampsMs = ref[1];
var timeAxisSplitsMs = ref[2];
var ref$1 =  genTimeStuffs(1e-3);
var timeIncrsS = ref$1[0];
var _timeAxisStampsS = ref$1[1];
var timeAxisSplitsS = ref$1[2];

// base 2
var binIncrs = genIncrs(2, -53, 53, [1]);

/*
console.log({
	decIncrs,
	oneIncrs,
	wholeIncrs,
	numIncrs,
	timeIncrs,
	fixedDec,
});
*/

function timeAxisStamps(stampCfg, fmtDate) {
	return stampCfg.map(function (s) { return s.map(function (v, i) { return i == 0 || i == 8 || v == null ? v : fmtDate(i == 1 || s[8] == 0 ? v : s[1] + v); }
	); });
}

// TODO: will need to accept spaces[] and pull incr into the loop when grid will be non-uniform, eg for log scales.
// currently we ignore this for months since they're *nearly* uniform and the added complexity is not worth it
function timeAxisVals(tzDate, stamps) {
	return function (self, splits, axisIdx, foundSpace, foundIncr) {
		var s = stamps.find(function (s) { return foundIncr >= s[0]; }) || stamps[stamps.length - 1];

		// these track boundaries when a full label is needed again
		var prevYear;
		var prevMnth;
		var prevDate;
		var prevHour;
		var prevMins;
		var prevSecs;

		return splits.map(function (split) {
			var date = tzDate(split);

			var newYear = date[getFullYear]();
			var newMnth = date[getMonth]();
			var newDate = date[getDate]();
			var newHour = date[getHours]();
			var newMins = date[getMinutes]();
			var newSecs = date[getSeconds]();

			var stamp = (
				newYear != prevYear && s[2] ||
				newMnth != prevMnth && s[3] ||
				newDate != prevDate && s[4] ||
				newHour != prevHour && s[5] ||
				newMins != prevMins && s[6] ||
				newSecs != prevSecs && s[7] ||
				                       s[1]
			);

			prevYear = newYear;
			prevMnth = newMnth;
			prevDate = newDate;
			prevHour = newHour;
			prevMins = newMins;
			prevSecs = newSecs;

			return stamp(date);
		});
	}
}

// for when axis.values is defined as a static fmtDate template string
function timeAxisVal(tzDate, dateTpl) {
	var stamp = fmtDate(dateTpl);
	return function (self, splits, axisIdx, foundSpace, foundIncr) { return splits.map(function (split) { return stamp(tzDate(split)); }); };
}

function mkDate(y, m, d) {
	return new Date(y, m, d);
}

function timeSeriesStamp(stampCfg, fmtDate) {
	return fmtDate(stampCfg);
}
var _timeSeriesStamp = '{YYYY}-{MM}-{DD} {h}:{mm}{aa}';

function timeSeriesVal(tzDate, stamp) {
	return function (self, val) { return stamp(tzDate(val)); };
}

function cursorPoint(self, si) {
	var s = self.series[si];

	var pt = placeDiv();

	pt.style.background = s.stroke || hexBlack;

	var dia = ptDia(s.width, 1);
	var mar = (dia - 1) / -2;

	setStylePx(pt, WIDTH, dia);
	setStylePx(pt, HEIGHT, dia);
	setStylePx(pt, "marginLeft", mar);
	setStylePx(pt, "marginTop", mar);

	return pt;
}

function dataIdx(self, seriesIdx, cursorIdx) {
	return cursorIdx;
}

var moveTuple = [0,0];

function cursorMove(self, mouseLeft1, mouseTop1) {
	moveTuple[0] = mouseLeft1;
	moveTuple[1] = mouseTop1;
	return moveTuple;
}

function filtBtn0(self, targ, handle) {
	return function (e) {
		e.button == 0 && handle(e);
	};
}

function passThru(self, targ, handle) {
	return handle;
}

var cursorOpts = {
	show: true,
	x: true,
	y: true,
	lock: false,
	move: cursorMove,
	points: {
		show: cursorPoint,
	},

	bind: {
		mousedown:   filtBtn0,
		mouseup:     filtBtn0,
		click:       filtBtn0,
		dblclick:    filtBtn0,

		mousemove:   passThru,
		mouseleave:  passThru,
		mouseenter:  passThru,
	},

	drag: {
		setScale: true,
		x: true,
		y: false,
		dist: 0,
		uni: null,
		_x: false,
		_y: false,
	},

	focus: {
		prox: -1,
	},

	left: -10,
	top: -10,
	idx: null,
	dataIdx: dataIdx,
};

var grid = {
	show: true,
	stroke: "rgba(0,0,0,0.07)",
	width: 2,
//	dash: [],
	filter: retArg1,
};

var ticks = assign({}, grid, {size: 10});

var font      = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
var labelFont = "bold " + font;
var lineMult = 1.5;		// font-size multiplier

var xAxisOpts = {
	show: true,
	scale: "x",
	space: 50,
	gap: 5,
	size: 50,
	labelSize: 30,
	labelFont: labelFont,
	side: 2,
//	class: "x-vals",
//	incrs: timeIncrs,
//	values: timeVals,
//	filter: retArg1,
	grid: grid,
	ticks: ticks,
	font: font,
	rotate: 0,
};

var numSeriesLabel = "Value";
var timeSeriesLabel = "Time";

var xSeriesOpts = {
	show: true,
	scale: "x",
	auto: false,
	sorted: 1,
//	label: "Time",
//	value: v => stamp(new Date(v * 1e3)),

	// internal caches
	min: inf,
	max: -inf,
	idxs: [],
};

function numAxisVals(self, splits, axisIdx, foundSpace, foundIncr) {
	return splits.map(function (v) { return v == null ? "" : fmtNum(v); });
}

function numAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
	var splits = [];

	var numDec = fixedDec.get(foundIncr) || 0;

	scaleMin = forceMin ? scaleMin : roundDec(incrRoundUp(scaleMin, foundIncr), numDec);

	for (var val = scaleMin; val <= scaleMax; val = roundDec(val + foundIncr, numDec))
		{ splits.push(Object.is(val, -0) ? 0 : val); }		// coalesces -0

	return splits;
}

function logAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
	var splits = [];

	var logBase = self.scales[self.axes[axisIdx].scale].log;

	var logFn = logBase == 10 ? log10 : log2;

	var exp = floor(logFn(scaleMin));

	foundIncr = pow(logBase, exp);

	if (exp < 0)
		{ foundIncr = roundDec(foundIncr, -exp); }

	var split = scaleMin;

	do {
		splits.push(split);
		split = roundDec(split + foundIncr, fixedDec.get(foundIncr));

		if (split >= foundIncr * logBase)
			{ foundIncr = split; }

	} while (split <= scaleMax);

	return splits;
}

var RE_ALL   = /./;
var RE_12357 = /[12357]/;
var RE_125   = /[125]/;
var RE_1     = /1/;

function logAxisValsFilt(self, splits, axisIdx, foundSpace, foundIncr) {
	var axis = self.axes[axisIdx];
	var scaleKey = axis.scale;

	if (self.scales[scaleKey].log == 2)
		{ return splits; }

	var valToPos = self.valToPos;

	var minSpace = axis._space;

	var _10 = valToPos(10, scaleKey);

	var re = (
		valToPos(9, scaleKey) - _10 >= minSpace ? RE_ALL :
		valToPos(7, scaleKey) - _10 >= minSpace ? RE_12357 :
		valToPos(5, scaleKey) - _10 >= minSpace ? RE_125 :
		RE_1
	);

	return splits.map(function (v) { return re.test(v) ? v : null; });
}

function numSeriesVal(self, val) {
	return val == null ? "" : fmtNum(val);
}

var yAxisOpts = {
	show: true,
	scale: "y",
	space: 30,
	gap: 5,
	size: 50,
	labelSize: 30,
	labelFont: labelFont,
	side: 3,
//	class: "y-vals",
//	incrs: numIncrs,
//	values: (vals, space) => vals,
//	filter: retArg1,
	grid: grid,
	ticks: ticks,
	font: font,
	rotate: 0,
};

// takes stroke width
function ptDia(width, mult) {
	var dia = 3 + (width || 1) * 2;
	return roundDec(dia * mult, 3);
}

function seriesPoints(self, si) {
	var s = self.series[si];
	var dia = ptDia(s.width, pxRatio);
	var maxPts = self.bbox.width / (s.points.space * pxRatio);
	var idxs = self.series[0].idxs;
	return idxs[1] - idxs[0] <= maxPts;
}

function seriesFillTo(self, seriesIdx, dataMin, dataMax) {
	var scale = self.scales[self.series[seriesIdx].scale];
	return scale.distr == 3 ? scale.min : 0;
}

var ySeriesOpts = {
	scale: "y",
	auto: true,
	sorted: 0,
	show: true,
	band: false,
	spanGaps: false,
	isGap: function (self, seriesIdx, dataIdx) { return true; },
	alpha: 1,
	points: {
		show: seriesPoints,
	//	stroke: "#000",
	//	fill: "#fff",
	//	width: 1,
	//	size: 10,
	},
//	label: "Value",
//	value: v => v,
	values: null,

	// internal caches
	min: inf,
	max: -inf,
	idxs: [],

	path: null,
	clip: null,
};

var xScaleOpts = {
	time: true,
	auto: true,
	distr: 1,
	log: 10,
	min: null,
	max: null,
};

var yScaleOpts = assign({}, xScaleOpts, {
	time: false,
});

var syncs = {};

function _sync(opts) {
	var clients = [];

	return {
		sub: function sub(client) {
			clients.push(client);
		},
		unsub: function unsub(client) {
			clients = clients.filter(function (c) { return c != client; });
		},
		pub: function pub(type, self, x, y, w, h, i) {
			if (clients.length > 1) {
				clients.forEach(function (client) {
					client != self && client.pub(type, self, x, y, w, h, i);
				});
			}
		}
	};
}

function setDefaults(d, xo, yo, initY) {
	var d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
	return d2.map(function (o, i) { return setDefault(o, i, xo, yo); });
}

function setDefault(o, i, xo, yo) {
	return assign({}, (i == 0 || o && o.side % 2 == 0 ? xo : yo), o);
}

function getValPct(val, scale) {
	return (
		scale.distr == 3
		? log10(val / scale.min) / log10(scale.max / scale.min)
		: (val - scale.min) / (scale.max - scale.min)
	);
}

function getYPos(val, scale, hgt, top) {
	var pctY = getValPct(val, scale);
	return top + (1 - pctY) * hgt;
}

function getXPos(val, scale, wid, lft) {
	var pctX = getValPct(val, scale);
	return lft + pctX * wid;
}

var nullMinMax = [null, null];

function snapNumX(self, dataMin, dataMax) {
	return dataMin == null ? nullMinMax : [dataMin, dataMax];
}

var snapTimeX = snapNumX;

// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
function snapNumY(self, dataMin, dataMax) {
	return dataMin == null ? nullMinMax : rangeNum(dataMin, dataMax, 0.1, true);
}

function snapLogY(self, dataMin, dataMax, scale) {
	return dataMin == null ? nullMinMax : rangeLog(dataMin, dataMax, self.scales[scale].log, false);
}

var snapLogX = snapLogY;

// dim is logical (getClientBoundingRect) pixels, not canvas pixels
function findIncr(min, max, incrs, dim, minSpace) {
	var pxPerUnit = dim / (max - min);

	var minDec = (""+floor(min)).length;

	for (var i = 0; i < incrs.length; i++) {
		var space = incrs[i] * pxPerUnit;

		var incrDec = incrs[i] < 10 ? fixedDec.get(incrs[i]) : 0;

		if (space >= minSpace && minDec + incrDec < 17)
			{ return [incrs[i], space]; }
	}

	return [0, 0];
}

function pxRatioFont(font) {
	var fontSize;
	font = font.replace(/(\d+)px/, function (m, p1) { return (fontSize = round(p1 * pxRatio)) + 'px'; });
	return [font, fontSize];
}

function uPlot(opts, data, then) {
	var self = {};

	var ready = false;
	self.status = 0;

	var root = self.root = placeDiv(UPLOT);

	if (opts.id != null)
		{ root.id = opts.id; }

	addClass(root, opts.class);

	if (opts.title) {
		var title = placeDiv(TITLE, root);
		title.textContent = opts.title;
	}

	var can = placeTag("canvas");
	var ctx = self.ctx = can.getContext("2d");

	var wrap = placeDiv(WRAP, root);
	var under = placeDiv(UNDER, wrap);
	wrap.appendChild(can);
	var over = placeDiv(OVER, wrap);

	opts = copy(opts);

	(opts.plugins || []).forEach(function (p) {
		if (p.opts)
			{ opts = p.opts(self, opts) || opts; }
	});

	var ms = opts.ms || 1e-3;

	var series  = self.series = setDefaults(opts.series || [], xSeriesOpts, ySeriesOpts, false);
	var axes    = self.axes   = setDefaults(opts.axes   || [], xAxisOpts,   yAxisOpts,    true);
	var scales  = self.scales = {};

	var xScaleKey = series[0].scale;

	function initScale(scaleKey) {
		var sc = scales[scaleKey];

		if (sc == null) {
			var scaleOpts = (opts.scales || EMPTY_OBJ)[scaleKey] || EMPTY_OBJ;

			if (scaleOpts.from != null) {
				// ensure parent is initialized
				initScale(scaleOpts.from);
				// dependent scales inherit
				scales[scaleKey] = assign({}, scales[scaleOpts.from], scaleOpts);
			}
			else {
				sc = scales[scaleKey] = assign({}, (scaleKey == xScaleKey ? xScaleOpts : yScaleOpts), scaleOpts);

				var isTime =  sc.time;
				var isLog  = sc.distr == 3;

				var rn = sc.range;

				if (scaleKey != xScaleKey && !isArr(rn) && isObj(rn)) {
					var cfg = rn;
					// this is similar to snapNumY
					rn = function (self, dataMin, dataMax) { return dataMin == null ? nullMinMax : rangeNum(dataMin, dataMax, cfg); };
				}

				sc.range = fnOrSelf(rn || (isTime ? snapTimeX : scaleKey == xScaleKey ? (isLog ? snapLogX : snapNumX) : (isLog ? snapLogY : snapNumY)));

				sc.auto = fnOrSelf(sc.auto);
			}
		}
	}

	initScale("x");
	initScale("y");

	series.forEach(function (s, i) {
		initScale(s.scale);
	});

	for (var k in opts.scales)
		{ initScale(k); }

	var xScaleDistr = scales[xScaleKey].distr;

	var pendScales = {};

	// explicitly-set initial scales
	for (var k$1 in scales) {
		var sc = scales[k$1];

		if (sc.min != null || sc.max != null)
			{ pendScales[k$1] = {min: sc.min, max: sc.max}; }
	}

	var gutters = self.gutters = assign({
		x: round(yAxisOpts.size / 2),
		y: round(xAxisOpts.size / 3),
		_x: null,
		_y: null,
	}, opts.gutters);

	gutters.x  = fnOrSelf(gutters.x);
	gutters.y  = fnOrSelf(gutters.y);
	gutters._x = gutters.x(self);
	gutters._y = gutters.y(self);

//	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
	var _tzDate  =  (opts.tzDate || (function (ts) { return new Date(ts / ms); }));
	var _fmtDate =  (opts.fmtDate || fmtDate);

	var _timeAxisSplits =  (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
	var _timeAxisVals   =  timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
	var _timeSeriesVal  =  timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

	var legend     =  assign({show: true, live: true}, opts.legend);
	var showLegend =  legend.show;

	var legendEl;
	var legendRows = [];
	var legendCols;
	var multiValLegend = false;

	if (showLegend) {
		legendEl = placeTag("table", LEGEND, root);

		var getMultiVals = series[1] ? series[1].values : null;
		multiValLegend = getMultiVals != null;

		if (multiValLegend) {
			var head = placeTag("tr", LEGEND_THEAD, legendEl);
			placeTag("th", null, head);
			legendCols = getMultiVals(self, 1, 0);

			for (var key in legendCols)
				{ placeTag("th", LEGEND_LABEL, head).textContent = key; }
		}
		else {
			legendCols = {_: 0};
			addClass(legendEl, LEGEND_INLINE);
			legend.live && addClass(legendEl, LEGEND_LIVE);
		}
	}

	function initLegendRow(s, i) {
		if (i == 0 && (multiValLegend || !legend.live))
			{ return null; }

		var _row = [];

		var row = placeTag("tr", LEGEND_SERIES, legendEl, legendEl.childNodes[i]);

		addClass(row, s.class);

		if (!s.show)
			{ addClass(row, OFF); }

		var label = placeTag("th", null, row);

		var indic = placeDiv(LEGEND_MARKER, label);
		indic.style.borderColor = s.width ? s.stroke : i > 0 && s.points.width ? s.points.stroke : null;
		indic.style.backgroundColor = s.fill || null;

		var text = placeDiv(LEGEND_LABEL, label);
		text.textContent = s.label;

		if (i > 0) {
			onMouse("click", label, function (e) {
				if ( cursor._lock)
					{ return; }

				setSeries(series.indexOf(s), {show: !s.show},  syncOpts.setSeries);
			});

			if (cursorFocus) {
				onMouse(mouseenter, label, function (e) {
					if (cursor._lock)
						{ return; }

					setSeries(series.indexOf(s), {focus: true}, syncOpts.setSeries);
				});
			}
		}

		for (var key in legendCols) {
			var v = placeTag("td", LEGEND_VALUE, row);
			v.textContent = "--";
			_row.push(v);
		}

		return _row;
	}

	var mouseListeners = new Map();

	function onMouse(ev, targ, fn) {
		var targListeners = mouseListeners.get(targ) || {};
		var listener = cursor.bind[ev](self, targ, fn);

		if (listener) {
			on(ev, targ, targListeners[ev] = listener);
			mouseListeners.set(targ, targListeners);
		}
	}

	function offMouse(ev, targ, fn) {
		var targListeners = mouseListeners.get(targ) || {};
		off(ev, targ, targListeners[ev]);
		targListeners[ev] = null;
	}

	var fullWidCss = 0;
	var fullHgtCss = 0;

	var plotWidCss = 0;
	var plotHgtCss = 0;

	// plot margins to account for axes
	var plotLftCss = 0;
	var plotTopCss = 0;

	var plotLft = 0;
	var plotTop = 0;
	var plotWid = 0;
	var plotHgt = 0;

	self.bbox = {};

	var shouldSetScales = false;
	var shouldSetSize = false;
	var shouldConvergeSize = false;
	var shouldSetCursor = false;
	var shouldSetLegend = false;

	function _setSize(width, height) {
		if (width != self.width || height != self.height)
			{ calcSize(width, height); }

		resetYSeries(false);

		shouldConvergeSize = true;
		shouldSetSize = true;
		shouldSetCursor = true;
		shouldSetLegend = true;
		commit();
	}

	function calcSize(width, height) {
	//	log("calcSize()", arguments);

		self.width  = fullWidCss = plotWidCss = width;
		self.height = fullHgtCss = plotHgtCss = height;
		plotLftCss  = plotTopCss = 0;

		calcPlotRect();
		calcAxesRects();

		var bb = self.bbox;

		plotLft = bb[LEFT]   = incrRound(plotLftCss * pxRatio, 0.5);
		plotTop = bb[TOP]    = incrRound(plotTopCss * pxRatio, 0.5);
		plotWid = bb[WIDTH]  = incrRound(plotWidCss * pxRatio, 0.5);
		plotHgt = bb[HEIGHT] = incrRound(plotHgtCss * pxRatio, 0.5);
	}

	function convergeSize() {
		var converged = false;

		var cycleNum = 0;

		while (!converged) {
			cycleNum++;

			var axesConverged = axesCalc(cycleNum);
			var guttersConverged = guttersCalc(cycleNum);

			converged = axesConverged && guttersConverged;

			if (!converged) {
				calcSize(self.width, self.height);
				shouldSetSize = true;
			}
		}
	}

	function setSize(ref) {
		var width = ref.width;
		var height = ref.height;

		_setSize(width, height);
	}

	self.setSize = setSize;

	// accumulate axis offsets, reduce canvas width
	function calcPlotRect() {
		// easements for edge labels
		var hasTopAxis = false;
		var hasBtmAxis = false;
		var hasRgtAxis = false;
		var hasLftAxis = false;

		axes.forEach(function (axis, i) {
			if (axis.show && axis._show) {
				var side = axis.side;
				var _size = axis._size;
				var isVt = side % 2;
				var labelSize = axis.labelSize = (axis.label != null ? (axis.labelSize || 30) : 0);

				var fullSize = _size + labelSize;

				if (fullSize > 0) {
					if (isVt) {
						plotWidCss -= fullSize;

						if (side == 3) {
							plotLftCss += fullSize;
							hasLftAxis = true;
						}
						else
							{ hasRgtAxis = true; }
					}
					else {
						plotHgtCss -= fullSize;

						if (side == 0) {
							plotTopCss += fullSize;
							hasTopAxis = true;
						}
						else
							{ hasBtmAxis = true; }
					}
				}
			}
		});

		// hz gutters
		if (hasTopAxis || hasBtmAxis) {
			if (!hasRgtAxis)
				{ plotWidCss -= gutters._x; }
			if (!hasLftAxis) {
				plotWidCss -= gutters._x;
				plotLftCss += gutters._x;
			}
		}

		// vt gutters
		if (hasLftAxis || hasRgtAxis) {
			if (!hasBtmAxis)
				{ plotHgtCss -= gutters._y; }
			if (!hasTopAxis) {
				plotHgtCss -= gutters._y;
				plotTopCss += gutters._y;
			}
		}
	}

	function calcAxesRects() {
		// will accum +
		var off1 = plotLftCss + plotWidCss;
		var off2 = plotTopCss + plotHgtCss;
		// will accum -
		var off3 = plotLftCss;
		var off0 = plotTopCss;

		function incrOffset(side, size) {

			switch (side) {
				case 1: off1 += size; return off1 - size;
				case 2: off2 += size; return off2 - size;
				case 3: off3 -= size; return off3 + size;
				case 0: off0 -= size; return off0 + size;
			}
		}

		axes.forEach(function (axis, i) {
			if (axis.show && axis._show) {
				var side = axis.side;

				axis._pos = incrOffset(side, axis._size);

				if (axis.label != null)
					{ axis._lpos = incrOffset(side, axis.labelSize); }
			}
		});
	}

	var cursor =  (self.cursor = assign({}, cursorOpts, opts.cursor));

	 (cursor._lock = false);
	 (cursor.points.show = fnOrSelf(cursor.points.show));

	var focus = self.focus = assign({}, opts.focus || {alpha: 0.3},  cursor.focus);
	var cursorFocus =  focus.prox >= 0;

	// series-intersection markers
	var cursorPts = [null];

	function initCursorPt(s, si) {
		if (si > 0) {
			var pt = cursor.points.show(self, si);

			if (pt) {
				addClass(pt, CURSOR_PT);
				addClass(pt, s.class);
				trans(pt, -10, -10, plotWidCss, plotHgtCss);
				over.insertBefore(pt, cursorPts[si]);

				return pt;
			}
		}
	}

	function initSeries(s, i) {
		var isTime =  scales[s.scale].time;

		var sv = s.value;
		s.value = isTime ? (isStr(sv) ? timeSeriesVal(_tzDate, timeSeriesStamp(sv, _fmtDate)) : sv || _timeSeriesVal) : sv || numSeriesVal;
		s.label = s.label || (isTime ? timeSeriesLabel : numSeriesLabel);

		if (i > 0) {
			s.width = s.width == null ? 1 : s.width;
			s.paths = s.paths || ( buildPaths);
			s.fillTo = s.fillTo || seriesFillTo;
			var _ptDia = ptDia(s.width, 1);
			s.points = assign({}, {
				size: _ptDia,
				width: max(1, _ptDia * .2),
				stroke: s.stroke,
				space: _ptDia * 2,
			}, s.points);
			s.points.show = fnOrSelf(s.points.show);
			s._paths = null;
		}

		if (showLegend)
			{ legendRows.splice(i, 0, initLegendRow(s, i)); }

		if ( cursor.show) {
			var pt = initCursorPt(s, i);
			pt && cursorPts.splice(i, 0, pt);
		}
	}

	function addSeries(opts, si) {
		si = si == null ? series.length : si;

		opts = setDefault(opts, si, xSeriesOpts, ySeriesOpts);
		series.splice(si, 0, opts);
		initSeries(series[si], si);
	}

	self.addSeries = addSeries;

	function delSeries(i) {
		series.splice(i, 1);
		 showLegend && legendRows.splice(i, 1)[0][0].parentNode.remove();
		 cursorPts.length > 1 && cursorPts.splice(i, 1)[0].remove();

		// TODO: de-init no-longer-needed scales?
	}

	self.delSeries = delSeries;

	series.forEach(initSeries);

	function initAxis(axis, i) {
		axis._show = axis.show;

		if (axis.show) {
			var isVt = axis.side % 2;

			var sc = scales[axis.scale];

			// this can occur if all series specify non-default scales
			if (sc == null) {
				axis.scale = isVt ? series[1].scale : xScaleKey;
				sc = scales[axis.scale];
			}

			// also set defaults for incrs & values based on axis distr
			var isTime =  sc.time;

			axis.size   = fnOrSelf(axis.size);
			axis.space  = fnOrSelf(axis.space);
			axis.rotate = fnOrSelf(axis.rotate);
			axis.incrs  = fnOrSelf(axis.incrs  || (          sc.distr == 2 ? wholeIncrs : (isTime ? (ms == 1 ? timeIncrsMs : timeIncrsS) : numIncrs)));
			axis.splits = fnOrSelf(axis.splits || (isTime && sc.distr == 1 ? _timeAxisSplits : sc.distr == 3 ? logAxisSplits : numAxisSplits));

			var av = axis.values;
			axis.values = (
				isTime ? (
					isArr(av) ?
						timeAxisVals(_tzDate, timeAxisStamps(av, _fmtDate)) :
					isStr(av) ?
						timeAxisVal(_tzDate, av) :
					av || _timeAxisVals
				) : av || numAxisVals
			);

			axis.filter = fnOrSelf(axis.filter || (          sc.distr == 3 ? logAxisValsFilt : retArg1));

			axis.font      = pxRatioFont(axis.font);
			axis.labelFont = pxRatioFont(axis.labelFont);

			axis._size   = axis.size(self, null, i, 0);

			axis._space  =
			axis._rotate =
			axis._incrs  =
			axis._found  =	// foundIncrSpace
			axis._splits =
			axis._values = null;
		}
	}

	// set axis defaults
	axes.forEach(initAxis);

	var dataLen;
	var dataIsGap;

	// rendered data window
	var i0 = null;
	var i1 = null;
	var idxs = series[0].idxs;

	var data0 = null;

	var viaAutoScaleX = false;

	function setData(_data, _resetScales) {
		if (!isArr(_data) && isObj(_data)) {
			dataIsGap = _data.isGap;
			_data = _data.data;
		}

		_data = _data || [];
		_data[0] = _data[0] || [];

		self.data = _data;
		data = _data.slice();
		data0 = data[0];
		dataLen = data0.length;

		if (xScaleDistr == 2)
			{ data[0] = data0.map(function (v, i) { return i; }); }

		resetYSeries(true);

		fire("setData");

		if (_resetScales !== false) {
			var xsc = scales[xScaleKey];

			if (xsc.auto(self, viaAutoScaleX))
				{ autoScaleX(); }
			else
				{ _setScale(xScaleKey, xsc.min, xsc.max); }

			shouldSetCursor = true;
			shouldSetLegend = true;
			commit();
		}
	}

	self.setData = setData;

	function autoScaleX() {
		var assign, assign$1;

		viaAutoScaleX = true;

		var _min, _max;

		if (dataLen > 0) {
			i0 = idxs[0] = 0;
			i1 = idxs[1] = dataLen - 1;

			_min = data[0][i0];
			_max = data[0][i1];

			if (xScaleDistr == 2) {
				_min = i0;
				_max = i1;
			}
			else if (dataLen == 1) {
				if (xScaleDistr == 3)
					{ (assign = rangeLog(_min, _min, scales[xScaleKey].log, false), _min = assign[0], _max = assign[1]); }
				else if (scales[xScaleKey].time)
					{ _max = _min + 86400 / ms; }
				else
					{ (assign$1 = rangeNum(_min, _max, 0.1, true), _min = assign$1[0], _max = assign$1[1]); }
			}
		}
		else {
			i0 = idxs[0] = _min = null;
			i1 = idxs[1] = _max = null;
		}

		_setScale(xScaleKey, _min, _max);

		viaAutoScaleX = false;
	}

	function setCtxStyle(stroke, width, dash, fill) {
		ctx.strokeStyle = stroke || transparent;
		ctx.lineWidth = width;
		ctx.lineJoin = "round";
		ctx.setLineDash(dash || []);
		ctx.fillStyle = fill || transparent;
	}

	function setScales() {
	//	log("setScales()", arguments);

		// wip scales
		var wipScales = copy(scales);

		for (var k in wipScales) {
			var wsc = wipScales[k];
			var psc = pendScales[k];

			if (psc != null && psc.min != null) {
				assign(wsc, psc);

				// explicitly setting the x-scale invalidates everything (acts as redraw)
				if (k == xScaleKey)
					{ resetYSeries(true); }
			}
			else if (k != xScaleKey) {
				if (dataLen == 0 && wsc.from == null) {
					var minMax = wsc.range(self, null, null, k);
					wsc.min = minMax[0];
					wsc.max = minMax[1];
				}
				else {
					wsc.min = inf;
					wsc.max = -inf;
				}
			}
		}

		if (dataLen > 0) {
			// pre-range y-scales from y series' data values
			series.forEach(function (s, i) {
				var k = s.scale;
				var wsc = wipScales[k];
				var psc = pendScales[k];

				if (i == 0) {
					var minMax = wsc.range(self, wsc.min, wsc.max, k);

					wsc.min = minMax[0];
					wsc.max = minMax[1];

					i0 = closestIdx(wsc.min, data[0]);
					i1 = closestIdx(wsc.max, data[0]);

					// closest indices can be outside of view
					if (data[0][i0] < wsc.min)
						{ i0++; }
					if (data[0][i1] > wsc.max)
						{ i1--; }

					s.min = data0[i0];
					s.max = data0[i1];
				}
				else if (s.show && s.auto && wsc.auto(self, viaAutoScaleX) && (psc == null || psc.min == null)) {
					// only run getMinMax() for invalidated series data, else reuse
					var minMax$1 = s.min == null ? getMinMax(data[i], i0, i1, s.sorted) : [s.min, s.max];

					// initial min/max
					wsc.min = min(wsc.min, s.min = minMax$1[0]);
					wsc.max = max(wsc.max, s.max = minMax$1[1]);
				}

				s.idxs[0] = i0;
				s.idxs[1] = i1;
			});

			// range independent scales
			for (var k$1 in wipScales) {
				var wsc$1 = wipScales[k$1];
				var psc$1 = pendScales[k$1];

				if (wsc$1.from == null && (psc$1 == null || psc$1.min == null)) {
					var minMax$1 = wsc$1.range(
						self,
						wsc$1.min ==  inf ? null : wsc$1.min,
						wsc$1.max == -inf ? null : wsc$1.max,
						k$1
					);
					wsc$1.min = minMax$1[0];
					wsc$1.max = minMax$1[1];
				}
			}
		}

		// range dependent scales
		for (var k$2 in wipScales) {
			var wsc$2 = wipScales[k$2];

			if (wsc$2.from != null) {
				var base = wipScales[wsc$2.from];
				var minMax$2 = wsc$2.range(self, base.min, base.max, k$2);
				wsc$2.min = minMax$2[0];
				wsc$2.max = minMax$2[1];
			}
		}

		var changed = {};
		var anyChanged = false;

		for (var k$3 in wipScales) {
			var wsc$3 = wipScales[k$3];
			var sc = scales[k$3];

			if (sc.min != wsc$3.min || sc.max != wsc$3.max) {
				sc.min = wsc$3.min;
				sc.max = wsc$3.max;
				changed[k$3] = anyChanged = true;
			}
		}

		if (anyChanged) {
			// invalidate paths of all series on changed scales
			series.forEach(function (s) {
				if (changed[s.scale])
					{ s._paths = null; }
			});

			for (var k$4 in changed) {
				shouldConvergeSize = true;
				fire("setScale", k$4);
			}

			if ( cursor.show)
				{ shouldSetCursor = true; }
		}

		for (var k$5 in pendScales)
			{ pendScales[k$5] = null; }
	}

	// TODO: drawWrap(si, drawPoints) (save, restore, translate, clip)

	function drawPoints(si) {
	//	log("drawPoints()", arguments);

		var s = series[si];
		var p = s.points;

		var width = roundDec(p.width * pxRatio, 3);
		var offset = (width % 2) / 2;
		var isStroked = p.width > 0;

		var rad = (p.size - p.width) / 2 * pxRatio;
		var dia = roundDec(rad * 2, 3);

		ctx.translate(offset, offset);

		ctx.save();

		ctx.beginPath();
		ctx.rect(
			plotLft - dia,
			plotTop - dia,
			plotWid + dia * 2,
			plotHgt + dia * 2
		);
		ctx.clip();

		ctx.globalAlpha = s.alpha;

		var path = new Path2D();

		for (var pi = i0; pi <= i1; pi++) {
			if (data[si][pi] != null) {
				var x = round(getXPos(data[0][pi],  scales[xScaleKey], plotWid, plotLft));
				var y = round(getYPos(data[si][pi], scales[s.scale],   plotHgt, plotTop));

				path.moveTo(x + rad, y);
				path.arc(x, y, rad, 0, PI * 2);
			}
		}

		setCtxStyle(
			p.stroke,
			width,
			null,
			p.fill || (isStroked ? "#fff" : s.stroke)
		);

		ctx.fill(path);
		isStroked && ctx.stroke(path);

		ctx.globalAlpha = 1;

		ctx.restore();

		ctx.translate(-offset, -offset);
	}

	// grabs the nearest indices with y data outside of x-scale limits
	function getOuterIdxs(ydata) {
		var _i0 = clamp(i0 - 1, 0, dataLen - 1);
		var _i1 = clamp(i1 + 1, 0, dataLen - 1);

		while (ydata[_i0] == null && _i0 > 0)
			{ _i0--; }

		while (ydata[_i1] == null && _i1 < dataLen - 1)
			{ _i1++; }

		return [_i0, _i1];
	}

	var dir = 1;

	function drawSeries() {
		// path building loop must be before draw loop to ensure that all bands are fully constructed
		series.forEach(function (s, i) {
			if (i > 0 && s.show && s._paths == null) {
				var _idxs = getOuterIdxs(data[i]);
				s._paths = s.paths(self, i, _idxs[0], _idxs[1]);
			}
		});

		series.forEach(function (s, i) {
			if (i > 0 && s.show) {
				if (s._paths)
					 { drawPath(i); }

				if (s.points.show(self, i, i0, i1))
					 { drawPoints(i); }

				fire("drawSeries", i);
			}
		});
	}

	function drawPath(si) {
		var s = series[si];

		if (dir == 1) {
			var ref = s._paths;
			var stroke = ref.stroke;
			var fill = ref.fill;
			var clip = ref.clip;
			var width = roundDec(s[WIDTH] * pxRatio, 3);
			var offset = (width % 2) / 2;

			setCtxStyle(s.stroke, width, s.dash, s.fill);

			ctx.globalAlpha = s.alpha;

			ctx.translate(offset, offset);

			ctx.save();

			var lft = plotLft,
				top = plotTop,
				wid = plotWid,
				hgt = plotHgt;

			var halfWid = width * pxRatio / 2;

			if (s.min == 0)
				{ hgt += halfWid; }

			if (s.max == 0) {
				top -= halfWid;
				hgt += halfWid;
			}

			ctx.beginPath();
			ctx.rect(lft, top, wid, hgt);
			ctx.clip();

			if (clip != null)
				{ ctx.clip(clip); }

			if (s.band) {
				ctx.fill(stroke);
				width && ctx.stroke(stroke);
			}
			else {
				width && ctx.stroke(stroke);

				if (s.fill != null)
					{ ctx.fill(fill); }
			}

			ctx.restore();

			ctx.translate(-offset, -offset);

			ctx.globalAlpha = 1;
		}

		if (s.band)
			{ dir *= -1; }
	}

	function buildClip(is, gaps, nullHead, nullTail) {
		var s = series[is];

		var clip = null;

		// create clip path (invert gaps and non-gaps)
		if (gaps.length > 0 && !s.spanGaps) {
			clip = new Path2D();

			var prevGapEnd = plotLft;

			for (var i = 0; i < gaps.length; i++) {
				var g = gaps[i];

				clip.rect(prevGapEnd, plotTop, g[0] - prevGapEnd, plotTop + plotHgt);

				prevGapEnd = g[1];
			}

			clip.rect(prevGapEnd, plotTop, plotLft + plotWid - prevGapEnd, plotTop + plotHgt);
		}

		return clip;
	}

	function addGap(gaps, fromX, toX) {
		if (toX > fromX) {
			var prevGap = gaps[gaps.length - 1];

			if (prevGap && prevGap[0] == fromX)			// TODO: gaps must be encoded at stroke widths?
				{ prevGap[1] = toX; }
			else
				{ gaps.push([fromX, toX]); }
		}
	}

	function nonNullIdx(data, _i0, _i1, dir) {
		for (var i = dir == 1 ? _i0 : _i1; i >= _i0 && i <= _i1; i += dir) {
			if (data[i] != null)
				{ return i; }
		}

		return -1;
	}

	function buildPaths(self, is, _i0, _i1) {
		var s = series[is];
		var isGap = dataIsGap || s.isGap;

		var xdata  = data[0];
		var ydata  = data[is];
		var scaleX = scales[xScaleKey];
		var scaleY = scales[s.scale];

		var _paths = dir == 1 ? {stroke: new Path2D(), fill: null, clip: null} : series[is-1]._paths;
		var stroke = _paths.stroke;
		var width = roundDec(s[WIDTH] * pxRatio, 3);

		var minY = inf,
			maxY = -inf,
			outY, outX;

		// todo: don't build gaps on dir = -1 pass
		var gaps = [];

		var accX = round(getXPos(xdata[dir == 1 ? _i0 : _i1], scaleX, plotWid, plotLft));
		var accGaps = false;

		// data edges
		var lftIdx = nonNullIdx(ydata, _i0, _i1, 1);
		var rgtIdx = nonNullIdx(ydata, _i0, _i1, -1);
		var lftX = incrRound(getXPos(xdata[lftIdx], scaleX, plotWid, plotLft), 0.5);
		var rgtX = incrRound(getXPos(xdata[rgtIdx], scaleX, plotWid, plotLft), 0.5);

		if (lftX > plotLft)
			{ addGap(gaps, plotLft, lftX); }

		// the moves the shape edge outside the canvas so stroke doesnt bleed in
		if (s.band && dir == 1)
			{ stroke.lineTo(lftX - width * 2, round(getYPos(ydata[_i0], scaleY, plotHgt, plotTop))); }

		for (var i = dir == 1 ? _i0 : _i1; i >= _i0 && i <= _i1; i += dir) {
			var x = round(getXPos(xdata[i], scaleX, plotWid, plotLft));

			if (x == accX) {
				if (ydata[i] != null) {
					outY = round(getYPos(ydata[i], scaleY, plotHgt, plotTop));
					minY = min(outY, minY);
					maxY = max(outY, maxY);
				}
				else if (!accGaps && isGap(self, is, i))
					{ accGaps = true; }
			}
			else {
				var _addGap = false;

				if (minY != inf) {
					stroke.lineTo(accX, minY);
					stroke.lineTo(accX, maxY);
					stroke.lineTo(accX, outY);
					outX = accX;
				}
				else if (accGaps) {
					_addGap = true;
					accGaps = false;
				}

				if (ydata[i] != null) {
					outY = round(getYPos(ydata[i], scaleY, plotHgt, plotTop));
					stroke.lineTo(x, outY);
					minY = maxY = outY;

					// prior pixel can have data but still start a gap if ends with null
					if (x - accX > 1 && ydata[i-1] == null && isGap(self, is, i-1))
						{ _addGap = true; }
				}
				else {
					minY = inf;
					maxY = -inf;

					if (!accGaps && isGap(self, is, i))
						{ accGaps = true; }
				}

				_addGap && addGap(gaps, outX, x);

				accX = x;
			}
		}

		if (rgtX < plotLft + plotWid)
			{ addGap(gaps, rgtX, plotLft + plotWid); }

		if (s.band) {
			var _x, _iy, ydata2;

			// the moves the shape edge outside the canvas so stroke doesnt bleed in
			if (dir == 1) {
				_x = rgtX + width * 2;
				_iy = rgtIdx;
				ydata2 = data[is + 1];
			}
			else {
				_x = lftX - width * 2;
				_iy = lftIdx;
				ydata2 = data[is - 1];
			}

			stroke.lineTo(_x, round(getYPos(ydata[_iy],  scaleY, plotHgt, plotTop)));
			stroke.lineTo(_x, round(getYPos(ydata2[_iy], scaleY, plotHgt, plotTop)));
		}

		if (dir == 1) {
			_paths.clip = buildClip(is, gaps, ydata[_i0] == null, ydata[_i1] == null);

			if (s.fill != null) {
				var fill = _paths.fill = new Path2D(stroke);

				var fillTo = round(getYPos(s.fillTo(self, is, s.min, s.max), scaleY, plotHgt, plotTop));
				fill.lineTo(rgtX, fillTo);
				fill.lineTo(lftX, fillTo);
			}
		}

		if (s.band)
			{ dir *= -1; }

		return _paths;
	}

	self.paths = buildPaths;

	function getIncrSpace(axisIdx, min, max, fullDim) {
		var axis = axes[axisIdx];

		var incrSpace;

		if (fullDim <= 0)
			{ incrSpace = [0, 0]; }
		else {
			var minSpace = axis._space = axis.space(self, axisIdx, min, max, fullDim);
			var incrs    = axis._incrs = axis.incrs(self, axisIdx, min, max, fullDim, minSpace);
			incrSpace    = axis._found = findIncr(min, max, incrs, fullDim, minSpace);
		}

		return incrSpace;
	}

	function drawOrthoLines(offs, filts, ori, side, pos0, len, width, stroke, dash) {
		var offset = (width % 2) / 2;

		ctx.translate(offset, offset);

		setCtxStyle(stroke, width, dash);

		ctx.beginPath();

		var x0, y0, x1, y1, pos1 = pos0 + (side == 0 || side == 3 ? -len : len);

		if (ori == 0) {
			y0 = pos0;
			y1 = pos1;
		}
		else {
			x0 = pos0;
			x1 = pos1;
		}

		offs.forEach(function (off, i) {
			if (filts[i] == null)
				{ return; }

			if (ori == 0)
				{ x0 = x1 = off; }
			else
				{ y0 = y1 = off; }

			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
		});

		ctx.stroke();

		ctx.translate(-offset, -offset);
	}

	function axesCalc(cycleNum) {
	//	log("axesCalc()", arguments);

		var converged = true;

		axes.forEach(function (axis, i) {
			if (!axis.show)
				{ return; }

			var scale = scales[axis.scale];

			if (scale.min == null) {
				if (axis._show) {
					converged = false;
					axis._show = false;
					resetYSeries(false);
				}
				return;
			}
			else {
				if (!axis._show) {
					converged = false;
					axis._show = true;
					resetYSeries(false);
				}
			}

			var side = axis.side;
			var ori = side % 2;

			var min = scale.min;
			var max = scale.max;		// 		// should this toggle them ._show = false

			var ref = getIncrSpace(i, min, max, ori == 0 ? plotWidCss : plotHgtCss);
			var _incr = ref[0];
			var _space = ref[1];

			if (_space == 0)
				{ return; }

			// if we're using index positions, force first tick to match passed index
			var forceMin = scale.distr == 2;

			var _splits = axis._splits = axis.splits(self, i, min, max, _incr, _space, forceMin);

			// tick labels
			// BOO this assumes a specific data/series
			var splits = scale.distr == 2 ? _splits.map(function (i) { return data0[i]; }) : _splits;
			var incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

			var values = axis._values  = axis.values(self, axis.filter(self, splits, i, _space, incr), i, _space, incr);

			// rotating of labels only supported on bottom x axis
			axis._rotate = side == 2 ? axis.rotate(self, values, i, _space) : 0;

			var oldSize = axis._size;

			axis._size = ceil(axis.size(self, values, i, cycleNum));

			if (oldSize != null && axis._size != oldSize)			// ready && ?
				{ converged = false; }
		});

		return converged;
	}

	function guttersCalc(cycleNum) {
		var converged = true;

		var _x = gutters._x;
		var _y = gutters._y;

		gutters._x = ceil(gutters.x(self, cycleNum));
		gutters._y = ceil(gutters.y(self, cycleNum));

		if (gutters._x != _x || gutters._y != _y)
			{ converged = false; }

		return converged;
	}

	function drawAxesGrid() {
		axes.forEach(function (axis, i) {
			if (!axis.show || !axis._show)
				{ return; }

			var scale = scales[axis.scale];
			var side = axis.side;
			var ori = side % 2;

			var getPos  = ori == 0 ? getXPos : getYPos;
			var plotDim = ori == 0 ? plotWid : plotHgt;
			var plotOff = ori == 0 ? plotLft : plotTop;

			var axisGap  = round(axis.gap * pxRatio);

			var ticks = axis.ticks;
			var tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

			var ref = axis._found;
			var _incr = ref[0];
			var _space = ref[1];
			var _splits = axis._splits;

			// tick labels
			// BOO this assumes a specific data/series
			var splits = scale.distr == 2 ? _splits.map(function (i) { return data0[i]; }) : _splits;
			var incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

			// rotating of labels only supported on bottom x axis
			var angle = axis._rotate * -PI/180;

			var basePos  = round(axis._pos * pxRatio);
			var shiftAmt = tickSize + axisGap;
			var shiftDir = ori == 0 && side == 0 || ori == 1 && side == 3 ? -1 : 1;
			var finalPos = basePos + shiftAmt * shiftDir;
			var y        = ori == 0 ? finalPos : 0;
			var x        = ori == 1 ? finalPos : 0;

			ctx.font         = axis.font[0];
			ctx.fillStyle    = axis.stroke || hexBlack;									// rgba?
			ctx.textAlign    = axis.align == 1 ? LEFT :
			                   axis.align == 2 ? RIGHT :
			                   angle > 0 ? LEFT :
			                   angle < 0 ? RIGHT :
			                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
			ctx.textBaseline = angle ||
			                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

			var lineHeight   = axis.font[1] * lineMult;

			var canOffs = _splits.map(function (val) { return round(getPos(val, scale, plotDim, plotOff)); });

			axis._values.forEach(function (val, i) {
				if (val == null)
					{ return; }

				if (ori == 0)
					{ x = canOffs[i]; }
				else
					{ y = canOffs[i]; }

				(""+val).split(/\n/gm).forEach(function (text, j) {
					if (angle) {
						ctx.save();
						ctx.translate(x, y + j * lineHeight);
						ctx.rotate(angle);
						ctx.fillText(text, 0, 0);
						ctx.restore();
					}
					else
						{ ctx.fillText(text, x, y + j * lineHeight); }
				});
			});

			// axis label
			if (axis.label) {
				ctx.save();

				var baseLpos = round(axis._lpos * pxRatio);

				if (ori == 1) {
					x = y = 0;

					ctx.translate(
						baseLpos,
						round(plotTop + plotHgt / 2)
					);
					ctx.rotate((side == 3 ? -PI : PI) / 2);

				}
				else {
					x = round(plotLft + plotWid / 2);
					y = baseLpos;
				}

				ctx.font         = axis.labelFont[0];
			//	ctx.fillStyle    = axis.labelStroke || hexBlack;						// rgba?
				ctx.textAlign    = "center";
				ctx.textBaseline = side == 2 ? TOP : BOTTOM;

				ctx.fillText(axis.label, x, y);

				ctx.restore();
			}

			// ticks
			if (ticks.show) {
				drawOrthoLines(
					canOffs,
					ticks.filter(self, splits, i, _space, incr),
					ori,
					side,
					basePos,
					tickSize,
					roundDec(ticks[WIDTH] * pxRatio, 3),
					ticks.stroke
				);
			}

			// grid
			var grid = axis.grid;

			if (grid.show) {
				drawOrthoLines(
					canOffs,
					grid.filter(self, splits, i, _space, incr),
					ori,
					ori == 0 ? 2 : 1,
					ori == 0 ? plotTop : plotLft,
					ori == 0 ? plotHgt : plotWid,
					roundDec(grid[WIDTH] * pxRatio, 3),
					grid.stroke,
					grid.dash
				);
			}
		});

		fire("drawAxes");
	}

	function resetYSeries(minMax) {
	//	log("resetYSeries()", arguments);

		series.forEach(function (s, i) {
			if (i > 0) {
				s._paths = null;

				if (minMax) {
					s.min = null;
					s.max = null;
				}
			}
		});
	}

	var queuedCommit = false;

	// could do rAF instead of microTask, or Promose.resolve().then()
	function commit() {
		if (!queuedCommit) {
			microTask(_commit);
			queuedCommit = true;
		}
	}

	function _commit() {
	//	log("_commit()", arguments);

		if (shouldSetScales) {
			setScales();
			shouldSetScales = false;
		}

		if (shouldConvergeSize) {
			convergeSize();
			shouldConvergeSize = false;
		}

		if (shouldSetSize) {
			setStylePx(under, LEFT,   plotLftCss);
			setStylePx(under, TOP,    plotTopCss);
			setStylePx(under, WIDTH,  plotWidCss);
			setStylePx(under, HEIGHT, plotHgtCss);

			setStylePx(over, LEFT,    plotLftCss);
			setStylePx(over, TOP,     plotTopCss);
			setStylePx(over, WIDTH,   plotWidCss);
			setStylePx(over, HEIGHT,  plotHgtCss);

			setStylePx(wrap, WIDTH,   fullWidCss);
			setStylePx(wrap, HEIGHT,  fullHgtCss);

			can[WIDTH]  = round(fullWidCss * pxRatio);
			can[HEIGHT] = round(fullHgtCss * pxRatio);

			syncRect();

			fire("setSize");

			shouldSetSize = false;
		}

	//	if (shouldSetSelect) {
		// TODO: update .u-select metrics (if visible)
		//	setStylePx(selectDiv, TOP, select[TOP] = 0);
		//	setStylePx(selectDiv, LEFT, select[LEFT] = 0);
		//	setStylePx(selectDiv, WIDTH, select[WIDTH] = 0);
		//	setStylePx(selectDiv, HEIGHT, select[HEIGHT] = 0);
		//	shouldSetSelect = false;
	//	}

		if ( cursor.show && shouldSetCursor) {
			updateCursor();
			shouldSetCursor = false;
		}

	//	if (true && legend.show && legend.live && shouldSetLegend) {}

		if (fullWidCss > 0 && fullHgtCss > 0) {
			ctx.clearRect(0, 0, can[WIDTH], can[HEIGHT]);
			fire("drawClear");
			drawAxesGrid();
			dataLen > 0 && drawSeries();
			fire("draw");
		}

		if (!ready) {
			ready = true;
			self.status = 1;

			fire("ready");
		}

		queuedCommit = false;
	}

	self.redraw = function (rebuildPaths) {
		if (rebuildPaths !== false)
			{ _setScale(xScaleKey, scales[xScaleKey].min, scales[xScaleKey].max); }
		else
			{ commit(); }
	};

	// redraw() => setScale('x', scales.x.min, scales.x.max);

	// explicit, never re-ranged (is this actually true? for x and y)
	function setScale(key, opts) {
		var sc = scales[key];

		if (sc.from == null) {
			if (dataLen == 0) {
				var minMax = sc.range(self, opts.min, opts.max, key);
				opts.min = minMax[0];
				opts.max = minMax[1];
			}

			if (dataLen > 1 && opts.min != null && opts.max != null && opts.max - opts.min < 1e-16)
				{ return; }

			if (key == xScaleKey) {
				if (sc.distr == 2 && dataLen > 0) {
					opts.min = closestIdx(opts.min, data[0]);
					opts.max = closestIdx(opts.max, data[0]);
				}
			}

		//	log("setScale()", arguments);

			pendScales[key] = opts;

			shouldSetScales = true;
			commit();
		}
	}

	self.setScale = setScale;

//	INTERACTION

	var vt;
	var hz;

	// starting position before cursor.move
	var rawMouseLeft0;
	var rawMouseTop0;

	// starting position
	var mouseLeft0;
	var mouseTop0;

	// current position before cursor.move
	var rawMouseLeft1;
	var rawMouseTop1;

	// current position
	var mouseLeft1;
	var mouseTop1;

	var dragging = false;

	var drag =  cursor.drag;

	var dragX =  drag.x;
	var dragY =  drag.y;

	if ( cursor.show) {
		if (cursor.x) {
			mouseLeft1 = cursor.left;
			vt = placeDiv(CURSOR_X, over);
		}

		if (cursor.y) {
			mouseTop1 = cursor.top;
			hz = placeDiv(CURSOR_Y, over);
		}
	}

	var select = self.select = assign({
		show:   true,
		over:   true,
		left:	0,
		width:	0,
		top:	0,
		height:	0,
	}, opts.select);

	var selectDiv = select.show ? placeDiv(SELECT, select.over ? over : under) : null;

	function setSelect(opts, _fire) {
		if (select.show) {
			for (var prop in opts)
				{ setStylePx(selectDiv, prop, select[prop] = opts[prop]); }

			_fire !== false && fire("setSelect");
		}
	}

	self.setSelect = setSelect;

	function toggleDOM(i, onOff) {
		var s = series[i];
		var label = showLegend ? legendRows[i][0].parentNode : null;

		if (s.show)
			{ label && remClass(label, OFF); }
		else {
			label && addClass(label, OFF);
			 cursorPts.length > 1 && trans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
		}
	}

	function _setScale(key, min, max) {
		setScale(key, {min: min, max: max});
	}

	function setSeries(i, opts, pub) {
	//	log("setSeries()", arguments);

		var s = series[i];

		// will this cause redundant commit() if both show and focus are set?
		if (opts.focus != null)
			{ setFocus(i); }

		if (opts.show != null) {
			s.show = opts.show;
			 toggleDOM(i, opts.show);

			if (s.band) {
				// not super robust, will break if two bands are adjacent
				var ip = series[i+1] && series[i+1].band ? i+1 : i-1;
				series[ip].show = s.show;
				 toggleDOM(ip, opts.show);
			}

			_setScale(s.scale, null, null);
			commit();
		}

		fire("setSeries", i, opts);

		 pub && sync.pub("setSeries", self, i, opts);
	}

	self.setSeries = setSeries;

	function _alpha(i, value) {
		series[i].alpha = value;

		if ( cursor.show && cursorPts[i])
			{ cursorPts[i].style.opacity = value; }

		if ( showLegend && legendRows[i])
			{ legendRows[i][0].parentNode.style.opacity = value; }
	}

	function _setAlpha(i, value) {
		var s = series[i];

		_alpha(i, value);

		if (s.band) {
			// not super robust, will break if two bands are adjacent
			var ip = series[i+1].band ? i+1 : i-1;
			_alpha(ip, value);
		}
	}

	// y-distance
	var closestDist;
	var closestSeries;
	var focusedSeries;

	function setFocus(i) {
		if (i != focusedSeries) {
		//	log("setFocus()", arguments);

			series.forEach(function (s, i2) {
				_setAlpha(i2, i == null || i2 == 0 || i2 == i ? 1 : focus.alpha);
			});

			focusedSeries = i;
			commit();
		}
	}

	if (showLegend && cursorFocus) {
		on(mouseleave, legendEl, function (e) {
			if (cursor._lock)
				{ return; }
			setSeries(null, {focus: false}, syncOpts.setSeries);
			updateCursor();
		});
	}

	function scaleValueAtPos(pos, scale) {
		var dim = plotWidCss;

		if (scale != xScaleKey) {
			dim = plotHgtCss;
			pos = dim - pos;
		}

		var pct = pos / dim;

		var sc = scales[scale],
			_min = sc.min,
			_max = sc.max;

		if (sc.distr == 3) {
			_min = log10(_min);
			_max = log10(_max);
			return pow(10, _min + (_max - _min) * pct);
		}
		else
			{ return _min + (_max - _min) * pct; }
	}

	function closestIdxFromXpos(pos) {
		var v = scaleValueAtPos(pos, xScaleKey);
		return closestIdx(v, data[0], i0, i1);
	}

	self.valToIdx = function (val) { return closestIdx(val, data[0]); };
	self.posToIdx = closestIdxFromXpos;
	self.posToVal = scaleValueAtPos;
	self.valToPos = function (val, scale, can) { return (
		scale == xScaleKey ?
		getXPos(val, scales[scale],
			can ? plotWid : plotWidCss,
			can ? plotLft : 0
		) :
		getYPos(val, scales[scale],
			can ? plotHgt : plotHgtCss,
			can ? plotTop : 0
		)
	); };

	// defers calling expensive functions
	function batch(fn) {
		fn(self);
		commit();
	}

	self.batch = batch;

	 (self.setCursor = function (opts) {
		mouseLeft1 = opts.left;
		mouseTop1 = opts.top;
	//	assign(cursor, opts);
		updateCursor();
	});

	var cursorRaf = 0;

	function updateCursor(ts, src) {
		var assign;

	//	ts == null && log("updateCursor()", arguments);

		cursorRaf = 0;

		rawMouseLeft1 = mouseLeft1;
		rawMouseTop1 = mouseTop1;

		(assign = cursor.move(self, mouseLeft1, mouseTop1), mouseLeft1 = assign[0], mouseTop1 = assign[1]);

		if (cursor.show) {
			cursor.x && trans(vt, round(mouseLeft1), 0, plotWidCss, plotHgtCss);
			cursor.y && trans(hz, 0, round(mouseTop1), plotWidCss, plotHgtCss);
		}

		var idx;

		// when zooming to an x scale range between datapoints the binary search
		// for nearest min/max indices results in this condition. cheap hack :D
		var noDataInRange = i0 > i1;

		closestDist = inf;

		// if cursor hidden, hide points & clear legend vals
		if (mouseLeft1 < 0 || dataLen == 0 || noDataInRange) {
			idx = null;

			for (var i = 0; i < series.length; i++) {
				if (i > 0) {
					 cursorPts.length > 1 && trans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
				}

				if (showLegend && legend.live) {
					if (i == 0 && multiValLegend)
						{ continue; }

					for (var j = 0; j < legendRows[i].length; j++)
						{ legendRows[i][j][firstChild].nodeValue = '--'; }
				}
			}

			if (cursorFocus)
				{ setSeries(null, {focus: true}, syncOpts.setSeries); }
		}
		else {
		//	let pctY = 1 - (y / rect[HEIGHT]);

			var valAtPos = scaleValueAtPos(mouseLeft1, xScaleKey);

			idx = closestIdx(valAtPos, data[0], i0, i1);

			var scX = scales[xScaleKey];

			var xPos = roundDec(getXPos(data[0][idx], scX, plotWidCss, 0), 3);

			for (var i$1 = 0; i$1 < series.length; i$1++) {
				var s = series[i$1];

				var idx2  = cursor.dataIdx(self, i$1, idx, valAtPos);
				var xPos2 = idx2 == idx ? xPos : roundDec(getXPos(data[0][idx2], scX, plotWidCss, 0), 3);

				if (i$1 > 0 && s.show) {
					var valAtIdx = data[i$1][idx2];

					var yPos = valAtIdx == null ? -10 : roundDec(getYPos(valAtIdx, scales[s.scale], plotHgtCss, 0), 3);

					if (yPos > 0) {
						var dist = abs(yPos - mouseTop1);

						if (dist <= closestDist) {
							closestDist = dist;
							closestSeries = i$1;
						}
					}

					 cursorPts.length > 1 && trans(cursorPts[i$1], xPos2, yPos, plotWidCss, plotHgtCss);
				}

				if (showLegend && legend.live) {
					if ((idx2 == cursor.idx && !shouldSetLegend) || i$1 == 0 && multiValLegend)
						{ continue; }

					var src$1 = i$1 == 0 && xScaleDistr == 2 ? data0 : data[i$1];

					var vals = multiValLegend ? s.values(self, i$1, idx2) : {_: s.value(self, src$1[idx2], i$1, idx2)};

					var j$1 = 0;

					for (var k in vals)
						{ legendRows[i$1][j$1++][firstChild].nodeValue = vals[k]; }
				}
			}

			shouldSetLegend = false;
		}

		// nit: cursor.drag.setSelect is assumed always true
		if (select.show && dragging) {
			if (src != null) {
				var ref = syncOpts.scales;
				var xKey = ref[0];
				var yKey = ref[1];

				// match the dragX/dragY implicitness/explicitness of src
				var sdrag = src.cursor.drag;
				dragX = sdrag._x;
				dragY = sdrag._y;

				if (xKey) {
					var sc = scales[xKey];
					var srcLeft = src.posToVal(src.select[LEFT], xKey);
					var srcRight = src.posToVal(src.select[LEFT] + src.select[WIDTH], xKey);

					select[LEFT] = getXPos(srcLeft, sc, plotWidCss, 0);
					select[WIDTH] = abs(select[LEFT] - getXPos(srcRight, sc, plotWidCss, 0));

					setStylePx(selectDiv, LEFT, select[LEFT]);
					setStylePx(selectDiv, WIDTH, select[WIDTH]);

					if (!yKey) {
						setStylePx(selectDiv, TOP, select[TOP] = 0);
						setStylePx(selectDiv, HEIGHT, select[HEIGHT] = plotHgtCss);
					}
				}

				if (yKey) {
					var sc$1 = scales[yKey];
					var srcTop = src.posToVal(src.select[TOP], yKey);
					var srcBottom = src.posToVal(src.select[TOP] + src.select[HEIGHT], yKey);

					select[TOP] = getYPos(srcTop, sc$1, plotHgtCss, 0);
					select[HEIGHT] = abs(select[TOP] - getYPos(srcBottom, sc$1, plotHgtCss, 0));

					setStylePx(selectDiv, TOP, select[TOP]);
					setStylePx(selectDiv, HEIGHT, select[HEIGHT]);

					if (!xKey) {
						setStylePx(selectDiv, LEFT, select[LEFT] = 0);
						setStylePx(selectDiv, WIDTH, select[WIDTH] = plotWidCss);
					}
				}
			}
			else {
				var rawDX = abs(rawMouseLeft1 - rawMouseLeft0);
				var rawDY = abs(rawMouseTop1 - rawMouseTop0);

				dragX = drag.x && rawDX >= drag.dist;
				dragY = drag.y && rawDY >= drag.dist;

				var uni = drag.uni;

				if (uni != null) {
					// only calc drag status if they pass the dist thresh
					if (dragX && dragY) {
						dragX = rawDX >= uni;
						dragY = rawDY >= uni;

						// force unidirectionality when both are under uni limit
						if (!dragX && !dragY) {
							if (rawDY > rawDX)
								{ dragY = true; }
							else
								{ dragX = true; }
						}
					}
				}
				else if (drag.x && drag.y && (dragX || dragY))
					// if omni with no uni then both dragX / dragY should be true if either is true
					{ dragX = dragY = true; }

				if (dragX) {
					var minX = min(mouseLeft0, mouseLeft1);
					var dx = abs(mouseLeft1 - mouseLeft0);

					setStylePx(selectDiv, LEFT,  select[LEFT] = minX);
					setStylePx(selectDiv, WIDTH, select[WIDTH] = dx);

					if (!dragY) {
						setStylePx(selectDiv, TOP, select[TOP] = 0);
						setStylePx(selectDiv, HEIGHT, select[HEIGHT] = plotHgtCss);
					}
				}

				if (dragY) {
					var minY = min(mouseTop0, mouseTop1);
					var dy = abs(mouseTop1 - mouseTop0);

					setStylePx(selectDiv, TOP,    select[TOP] = minY);
					setStylePx(selectDiv, HEIGHT, select[HEIGHT] = dy);

					if (!dragX) {
						setStylePx(selectDiv, LEFT, select[LEFT] = 0);
						setStylePx(selectDiv, WIDTH, select[WIDTH] = plotWidCss);
					}
				}

				if (!dragX && !dragY) {
					// the drag didn't pass the dist requirement
					setStylePx(selectDiv, HEIGHT, select[HEIGHT] = 0);
					setStylePx(selectDiv, WIDTH,  select[WIDTH]  = 0);
				}
			}
		}

		cursor.idx = idx;
		cursor.left = mouseLeft1;
		cursor.top = mouseTop1;
		drag._x = dragX;
		drag._y = dragY;

		// if ts is present, means we're implicitly syncing own cursor as a result of debounced rAF
		if (ts != null) {
			// this is not technically a "mousemove" event, since it's debounced, rename to setCursor?
			// since this is internal, we can tweak it later
			sync.pub(mousemove, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, idx);

			if (cursorFocus) {
				setSeries(closestDist <= focus.prox ? closestSeries : null, {focus: true}, syncOpts.setSeries);
			}
		}

		ready && fire("setCursor");
	}

	var rect = null;

	function syncRect() {
		rect = over.getBoundingClientRect();
	}

	function mouseMove(e, src, _x, _y, _w, _h, _i) {
		if (cursor._lock)
			{ return; }

		cacheMouse(e, src, _x, _y, _w, _h, _i, false, e != null);

		if (e != null) {
			if (cursorRaf == 0)
				{ cursorRaf = rAF(updateCursor); }
		}
		else
			{ updateCursor(null, src); }
	}

	function cacheMouse(e, src, _x, _y, _w, _h, _i, initial, snap) {
		var assign;

		if (e != null) {
			_x = e.clientX - rect.left;
			_y = e.clientY - rect.top;
		}
		else {
			if (_x < 0 || _y < 0) {
				mouseLeft1 = -10;
				mouseTop1 = -10;
				return;
			}

			var ref = syncOpts.scales;
			var xKey = ref[0];
			var yKey = ref[1];

			if (xKey != null)
				{ _x = getXPos(src.posToVal(_x, xKey), scales[xKey], plotWidCss, 0); }
			else
				{ _x = plotWidCss * (_x/_w); }

			if (yKey != null)
				{ _y = getYPos(src.posToVal(_y, yKey), scales[yKey], plotHgtCss, 0); }
			else
				{ _y = plotHgtCss * (_y/_h); }
		}

		if (snap) {
			if (_x <= 1 || _x >= plotWidCss - 1)
				{ _x = incrRound(_x, plotWidCss); }

			if (_y <= 1 || _y >= plotHgtCss - 1)
				{ _y = incrRound(_y, plotHgtCss); }
		}

		if (initial) {
			rawMouseLeft0 = _x;
			rawMouseTop0 = _y;

			(assign = cursor.move(self, _x, _y), mouseLeft0 = assign[0], mouseTop0 = assign[1]);
		}
		else {
			mouseLeft1 = _x;
			mouseTop1 = _y;
		}
	}

	function hideSelect() {
		setSelect({
			width: 0,
			height: 0,
		}, false);
	}

	function mouseDown(e, src, _x, _y, _w, _h, _i) {
		dragging = true;
		dragX = dragY = drag._x = drag._y = false;

		cacheMouse(e, src, _x, _y, _w, _h, _i, true, false);

		if (e != null) {
			onMouse(mouseup, doc, mouseUp);
			sync.pub(mousedown, self, mouseLeft0, mouseTop0, plotWidCss, plotHgtCss, null);
		}
	}

	function mouseUp(e, src, _x, _y, _w, _h, _i) {
		dragging = drag._x = drag._y = false;

		cacheMouse(e, src, _x, _y, _w, _h, _i, false, true);

		var hasSelect = select[WIDTH] > 0 || select[HEIGHT] > 0;

		hasSelect && setSelect(select);

		if (drag.setScale && hasSelect) {
		//	if (syncKey != null) {
		//		dragX = drag.x;
		//		dragY = drag.y;
		//	}

			if (dragX) {
				_setScale(xScaleKey,
					scaleValueAtPos(select[LEFT], xScaleKey),
					scaleValueAtPos(select[LEFT] + select[WIDTH], xScaleKey)
				);
			}

			if (dragY) {
				for (var k in scales) {
					var sc = scales[k];

					if (k != xScaleKey && sc.from == null && sc.min != inf) {
						_setScale(k,
							scaleValueAtPos(select[TOP] + select[HEIGHT], k),
							scaleValueAtPos(select[TOP], k)
						);
					}
				}
			}

			hideSelect();
		}
		else if (cursor.lock) {
			cursor._lock = !cursor._lock;

			if (!cursor._lock)
				{ updateCursor(); }
		}

		if (e != null) {
			offMouse(mouseup, doc);
			sync.pub(mouseup, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
		}
	}

	function mouseLeave(e, src, _x, _y, _w, _h, _i) {
		if (!cursor._lock) {
			var _dragging = dragging;

			if (dragging) {
				// handle case when mousemove aren't fired all the way to edges by browser
				var snapX = true;
				var snapY = true;
				var snapProx = 10;

				if (dragX && dragY) {
					// maybe omni corner snap
					snapX = mouseLeft1 <= snapProx || mouseLeft1 >= plotWidCss - snapProx;
					snapY = mouseTop1  <= snapProx || mouseTop1  >= plotHgtCss - snapProx;
				}

				if (dragX && snapX) {
					var dLft = mouseLeft1;
					var dRgt = plotWidCss - mouseLeft1;

					var xMin = min(dLft, dRgt);

					if (xMin == dLft)
						{ mouseLeft1 = 0; }
					if (xMin == dRgt)
						{ mouseLeft1 = plotWidCss; }
				}

				if (dragY && snapY) {
					var dTop = mouseTop1;
					var dBtm = plotHgtCss - mouseTop1;

					var yMin = min(dTop, dBtm);

					if (yMin == dTop)
						{ mouseTop1 = 0; }
					if (yMin == dBtm)
						{ mouseTop1 = plotHgtCss; }
				}

				updateCursor(1);

				dragging = false;
			}

			mouseLeft1 = -10;
			mouseTop1 = -10;

			// passing a non-null timestamp to force sync/mousemove event
			updateCursor(1);

			if (_dragging)
				{ dragging = _dragging; }
		}
	}

	function dblClick(e, src, _x, _y, _w, _h, _i) {
		autoScaleX();

		hideSelect();

		if (e != null)
			{ sync.pub(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null); }
	}

	// internal pub/sub
	var events = {};

	events[mousedown] = mouseDown;
	events[mousemove] = mouseMove;
	events[mouseup] = mouseUp;
	events[dblclick] = dblClick;
	events["setSeries"] = function (e, src, idx, opts) {
		setSeries(idx, opts);
	};

	var deb;

	if ( cursor.show) {
		onMouse(mousedown, over, mouseDown);
		onMouse(mousemove, over, mouseMove);
		onMouse(mouseenter, over, syncRect);
		// this has to be rAF'd so it always fires after the last queued/rAF'd updateCursor
		onMouse(mouseleave, over, function (e) { rAF(mouseLeave); });

		onMouse(dblclick, over, dblClick);

		deb = debounce(syncRect, 100);

		on(resize, win, deb);
		on(scroll, win, deb);

		self.syncRect = syncRect;
	}

	// external on/off
	var hooks = self.hooks = opts.hooks || {};

	function fire(evName, a1, a2) {
		if (evName in hooks) {
			hooks[evName].forEach(function (fn) {
				fn.call(null, self, a1, a2);
			});
		}
	}

	(opts.plugins || []).forEach(function (p) {
		for (var evName in p.hooks)
			{ hooks[evName] = (hooks[evName] || []).concat(p.hooks[evName]); }
	});

	var syncOpts =  assign({
		key: null,
		setSeries: false,
		scales: [xScaleKey, null]
	}, cursor.sync);

	var syncKey =  syncOpts.key;

	var sync =  (syncKey != null ? (syncs[syncKey] = syncs[syncKey] || _sync()) : _sync());

	 sync.sub(self);

	function pub(type, src, x, y, w, h, i) {
		events[type](null, src, x, y, w, h, i);
	}

	 (self.pub = pub);

	function destroy() {
		 sync.unsub(self);
		 off(resize, win, deb);
		 off(scroll, win, deb);
		root.remove();
		fire("destroy");
	}

	self.destroy = destroy;

	function _init() {
		fire("init", opts, data);

		setData(data || opts.data, false);

		if (pendScales[xScaleKey])
			{ setScale(xScaleKey, pendScales[xScaleKey]); }
		else
			{ autoScaleX(); }

		_setSize(opts[WIDTH], opts[HEIGHT]);

		setSelect(select, false);
	}

	if (then) {
		if (then instanceof HTMLElement) {
			then.appendChild(root);
			_init();
		}
		else
			{ then(self, _init); }
	}
	else
		{ _init(); }

	return self;
}

uPlot.assign = assign;
uPlot.fmtNum = fmtNum;
uPlot.rangeNum = rangeNum;
uPlot.rangeLog = rangeLog;

{
	uPlot.fmtDate = fmtDate;
	uPlot.tzDate  = tzDate;
}

module.exports = uPlot;
