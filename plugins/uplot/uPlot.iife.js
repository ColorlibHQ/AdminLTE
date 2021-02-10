/**
* Copyright (c) 2021, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uPlot.js (μPlot)
* A small, fast chart for time series, lines, areas, ohlc & bars
* https://github.com/leeoniya/uPlot (v1.6.4)
*/

var uPlot = (function () {
	'use strict';

	var FEAT_TIME          = true;

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

	function nonNullIdx(data, _i0, _i1, dir) {
		for (var i = dir == 1 ? _i0 : _i1; i >= _i0 && i <= _i1; i += dir) {
			if (data[i] != null)
				{ return i; }
		}

		return -1;
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

	function getMinMaxLog(data, _i0, _i1) {
	//	console.log("getMinMax()");

		var _min = inf;
		var _max = -inf;

		for (var i = _i0; i <= _i1; i++) {
			if (data[i] > 0) {
				_min = min(_min, data[i]);
				_max = max(_max, data[i]);
			}
		}

		return [
			_min ==  inf ?  1 : _min,
			_max == -inf ? 10 : _max ];
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
		_eqRangePart.mode = extra ? 3 : 0;

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
		var _newMin  = roundDec(incrRoundDn(_min - _padMin, base/10), 6);
		var _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 3 && _newMin <= softMin || softMinMode == 2 && _newMin >= softMin) ? softMin : inf;
		var minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

		var _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
		var _newMax  = roundDec(incrRoundUp(_max + _padMax, base/10), 6);
		var _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 3 && _newMax >= softMax || softMaxMode == 2 && _newMax <= softMax) ? softMax : -inf;
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
	var sqrt = M.sqrt;
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
		return typeof v == "function" ? v : () => v;
	}

	var retArg1 = (_0, _1) => _1;

	var retNull = _ => null;

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
		return typeof v == 'string';
	}

	function isObj(v) {
		var is = false;

		if (v != null) {
			var c = v.constructor;
			is = c == null || c == Object;
		}

		return is;
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

	// nullModes
	var NULL_REMOVE = 0;  // nulls are converted to undefined (e.g. for spanGaps: true)
	var NULL_RETAIN = 1;  // nulls are retained, with alignment artifacts set to undefined (default)
	var NULL_EXPAND = 2;  // nulls are expanded to include any adjacent alignment artifacts

	// sets undefined values to nulls when adjacent to existing nulls (minesweeper)
	function nullExpand(yVals, nullIdxs, alignedLen) {
		for (var i = 0, xi = (void 0), lastNullIdx = -1; i < nullIdxs.length; i++) {
			var nullIdx = nullIdxs[i];

			if (nullIdx > lastNullIdx) {
				xi = nullIdx - 1;
				while (xi >= 0 && yVals[xi] == null)
					{ yVals[xi--] = null; }

				xi = nullIdx + 1;
				while (xi < alignedLen && yVals[xi] == null)
					{ yVals[lastNullIdx = xi++] = null; }
			}
		}
	}

	// nullModes is a tables-matched array indicating how to treat nulls in each series
	// output is sorted ASC on the joined field (table[0]) and duplicate join values are collapsed
	function join(tables, nullModes) {
		var xVals = new Set();

		for (var ti = 0; ti < tables.length; ti++) {
			var t = tables[ti];
			var xs = t[0];
			var len = xs.length;

			for (var i = 0; i < len; i++)
				{ xVals.add(xs[i]); }
		}

		var data = [Array.from(xVals).sort((a, b) => a - b)];

		var alignedLen = data[0].length;

		var xIdxs = new Map();

		for (var i$1 = 0; i$1 < alignedLen; i$1++)
			{ xIdxs.set(data[0][i$1], i$1); }

		for (var ti$1 = 0; ti$1 < tables.length; ti$1++) {
			var t$1 = tables[ti$1];
			var xs$1 = t$1[0];

			for (var si = 1; si < t$1.length; si++) {
				var ys = t$1[si];

				var yVals = Array(alignedLen).fill(undefined);

				var nullMode = nullModes ? nullModes[ti$1][si] : NULL_RETAIN;

				var nullIdxs = [];

				for (var i$2 = 0; i$2 < ys.length; i$2++) {
					var yVal = ys[i$2];
					var alignedIdx = xIdxs.get(xs$1[i$2]);

					if (yVal == null) {
						if (nullMode != NULL_REMOVE) {
							yVals[alignedIdx] = yVal;

							if (nullMode == NULL_EXPAND)
								{ nullIdxs.push(alignedIdx); }
						}
					}
					else
						{ yVals[alignedIdx] = yVal; }
				}

				nullExpand(yVals, nullIdxs, alignedLen);

				data.push(yVals);
			}
		}

		return data;
	}

	var microTask = typeof queueMicrotask == "undefined" ? fn => Promise.resolve().then(fn) : queueMicrotask;

	var WIDTH       = "width";
	var HEIGHT      = "height";
	var TOP         = "top";
	var BOTTOM      = "bottom";
	var LEFT        = "left";
	var RIGHT       = "right";
	var hexBlack    = "#000";
	var transparent = hexBlack + "0";

	var mousemove   = "mousemove";
	var mousedown   = "mousedown";
	var mouseup     = "mouseup";
	var mouseenter  = "mouseenter";
	var mouseleave  = "mouseleave";
	var dblclick    = "dblclick";
	var resize      = "resize";
	var scroll      = "scroll";

	var pre = "u-";

	var UPLOT          =       "uplot";
	var ORI_HZ         = pre + "hz";
	var ORI_VT         = pre + "vt";
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

	var doc = document;
	var win = window;
	var pxRatio = devicePixelRatio;

	function addClass(el, c) {
		c != null && el.classList.add(c);
	}

	function remClass(el, c) {
		el.classList.remove(c);
	}

	function setStylePx(el, name, value) {
		el.style[name] = value + "px";
	}

	function placeTag(tag, cls, targ, refEl) {
		var el = doc.createElement(tag);

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
		YYYY:	d => d[getFullYear](),
		// 19
		YY:		d => (d[getFullYear]()+'').slice(2),
		// July
		MMMM:	(d, names) => names.MMMM[d[getMonth]()],
		// Jul
		MMM:	(d, names) => names.MMM[d[getMonth]()],
		// 07
		MM:		d => zeroPad2(d[getMonth]()+1),
		// 7
		M:		d => d[getMonth]()+1,
		// 09
		DD:		d => zeroPad2(d[getDate]()),
		// 9
		D:		d => d[getDate](),
		// Monday
		WWWW:	(d, names) => names.WWWW[d[getDay]()],
		// Mon
		WWW:	(d, names) => names.WWW[d[getDay]()],
		// 03
		HH:		d => zeroPad2(d[getHours]()),
		// 3
		H:		d => d[getHours](),
		// 9 (12hr, unpadded)
		h:		d => {var h = d[getHours](); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
		// AM
		AA:		d => d[getHours]() >= 12 ? 'PM' : 'AM',
		// am
		aa:		d => d[getHours]() >= 12 ? 'pm' : 'am',
		// a
		a:		d => d[getHours]() >= 12 ? 'p' : 'a',
		// 09
		mm:		d => zeroPad2(d[getMinutes]()),
		// 9
		m:		d => d[getMinutes](),
		// 09
		ss:		d => zeroPad2(d[getSeconds]()),
		// 9
		s:		d => d[getSeconds](),
		// 374
		fff:	d => zeroPad3(d[getMilliseconds]()),
	};

	function fmtDate(tpl, names) {
		names = names || engNames;
		var parts = [];

		var R = /\{([a-z]+)\}|[^{]+/gi, m;

		while (m = R.exec(tpl))
			{ parts.push(m[0][0] == '{' ? subs[m[1]] : m[0]); }

		return d => {
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

	var onlyWhole = v => v % 1 == 0;

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
			return (self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace) => {
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
	genIncrs(2, -53, 53, [1]);

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
		return stampCfg.map(s => s.map((v, i) =>
			i == 0 || i == 8 || v == null ? v : fmtDate(i == 1 || s[8] == 0 ? v : s[1] + v)
		));
	}

	// TODO: will need to accept spaces[] and pull incr into the loop when grid will be non-uniform, eg for log scales.
	// currently we ignore this for months since they're *nearly* uniform and the added complexity is not worth it
	function timeAxisVals(tzDate, stamps) {
		return (self, splits, axisIdx, foundSpace, foundIncr) => {
			var s = stamps.find(s => foundIncr >= s[0]) || stamps[stamps.length - 1];

			// these track boundaries when a full label is needed again
			var prevYear;
			var prevMnth;
			var prevDate;
			var prevHour;
			var prevMins;
			var prevSecs;

			return splits.map(split => {
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
		return (self, splits, axisIdx, foundSpace, foundIncr) => splits.map(split => stamp(tzDate(split)));
	}

	function mkDate(y, m, d) {
		return new Date(y, m, d);
	}

	function timeSeriesStamp(stampCfg, fmtDate) {
		return fmtDate(stampCfg);
	}
	var _timeSeriesStamp = '{YYYY}-{MM}-{DD} {h}:{mm}{aa}';

	function timeSeriesVal(tzDate, stamp) {
		return (self, val) => stamp(tzDate(val));
	}

	var legendWidth = 2;

	var legendDash = "solid";

	function legendStroke(self, seriesIdx) {
		var s = self.series[seriesIdx];
		return s.width ? s.stroke(self, seriesIdx) : s.points.width ? s.points.stroke(self, seriesIdx) : null;
	}

	function legendFill(self, seriesIdx) {
		return self.series[seriesIdx].fill(self, seriesIdx);
	}

	function cursorPointShow(self, si) {
		var o = self.cursor.points;

		var pt = placeDiv();

		var stroke = o.stroke(self, si);
		var fill = o.fill(self, si);

		pt.style.background = fill || stroke;

		var size = o.size(self, si);
		var width = o.width(self, si, size);

		if (width)
			{ pt.style.border = width + "px solid " + stroke; }

		var mar = size / -2;

		setStylePx(pt, WIDTH, size);
		setStylePx(pt, HEIGHT, size);
		setStylePx(pt, "marginLeft", mar);
		setStylePx(pt, "marginTop", mar);

		return pt;
	}

	function cursorPointFill(self, si) {
		var s = self.series[si];
		return s.stroke(self, si);
	}

	function cursorPointStroke(self, si) {
		var s = self.series[si];
		return s.stroke(self, si);
	}

	function cursorPointSize(self, si) {
		var s = self.series[si];
		return ptDia(s.width, 1);
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
		return e => {
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
			show:   cursorPointShow,
			size:   cursorPointSize,
			width:  0,
			stroke: cursorPointStroke,
			fill:   cursorPointFill,
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
		stroke: hexBlack,
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
		return splits.map(v => v == null ? "" : fmtNum(v));
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

		return splits.map(v => re.test(v) ? v : null);
	}

	function numSeriesVal(self, val) {
		return val == null ? "" : fmtNum(val);
	}

	var yAxisOpts = {
		show: true,
		scale: "y",
		stroke: hexBlack,
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
		var xsc = self.scales[self.series[0].scale];
		var dim = xsc.ori == 0 ? self.bbox.width : self.bbox.height;
		var s = self.series[si];
	//	const dia = ptDia(s.width, pxRatio);
		var maxPts = dim / (s.points.space * pxRatio);
		var idxs = self.series[0].idxs;
		return idxs[1] - idxs[0] <= maxPts;
	}

	function seriesFillTo(self, seriesIdx, dataMin, dataMax) {
		var scale = self.scales[self.series[seriesIdx].scale];
		var isUpperBandEdge = self.bands && self.bands.some(b => b.series[0] == seriesIdx);
		return scale.distr == 3 || isUpperBandEdge ? scale.min : 0;
	}

	var ySeriesOpts = {
		scale: "y",
		auto: true,
		sorted: 0,
		show: true,
		band: false,
		spanGaps: false,
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

	function clampScale(self, val, scaleMin, scaleMax, scaleKey) {
	/*
		if (val < 0) {
			let cssHgt = self.bbox.height / pxRatio;
			let absPos = self.valToPos(abs(val), scaleKey);
			let fromBtm = cssHgt - absPos;
			return self.posToVal(cssHgt + fromBtm, scaleKey);
		}
	*/
		return scaleMin / 10;
	}

	var xScaleOpts = {
		time: FEAT_TIME,
		auto: true,
		distr: 1,
		log: 10,
		min: null,
		max: null,
		dir: 1,
		ori: 0,
	};

	var yScaleOpts = assign({}, xScaleOpts, {
		time: false,
		ori: 1,
	});

	var syncs = {};

	function _sync(opts) {
		var clients = [];

		return {
			sub: function sub(client) {
				clients.push(client);
			},
			unsub: function unsub(client) {
				clients = clients.filter(c => c != client);
			},
			pub: function pub(type, self, x, y, w, h, i) {
				if (clients.length > 1) {
					clients.forEach(client => {
						client != self && client.pub(type, self, x, y, w, h, i);
					});
				}
			}
		};
	}

	function orient(u, seriesIdx, cb) {
		var series = u.series[seriesIdx];
		var scales = u.scales;
		var bbox   = u.bbox;
		var scaleX = scales[u.series[0].scale];

		var dx = u._data[0],
			dy = u._data[seriesIdx],
			sx = scaleX,
			sy = scales[series.scale],
			l = bbox.left,
			t = bbox.top,
			w = bbox.width,
			h = bbox.height,
			H = u.valToPosH,
			V = u.valToPosV;

		return (sx.ori == 0
			? cb(
				series,
				dx,
				dy,
				sx,
				sy,
				H,
				V,
				l,
				t,
				w,
				h,
				moveToH,
				lineToH,
				rectH,
				arcH,
				bezierCurveToH
			)
			: cb(
				series,
				dx,
				dy,
				sx,
				sy,
				V,
				H,
				t,
				l,
				h,
				w,
				moveToV,
				lineToV,
				rectV,
				arcV,
				bezierCurveToV
			)
		);
	}

	// creates inverted band clip path (towards from stroke path -> yMax)
	function clipBandLine(self, seriesIdx, idx0, idx1, strokePath) {
		return orient(self, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
			var dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
			var lineTo = scaleX.ori == 0 ? lineToH : lineToV;

			var frIdx, toIdx;

			if (dir == 1) {
				frIdx = idx0;
				toIdx = idx1;
			}
			else {
				frIdx = idx1;
				toIdx = idx0;
			}

			// path start
			var x0 = incrRound(valToPosX(dataX[frIdx], scaleX, xDim, xOff), 0.5);
			var y0 = incrRound(valToPosY(dataY[frIdx], scaleY, yDim, yOff), 0.5);
			// path end x
			var x1 = incrRound(valToPosX(dataX[toIdx], scaleX, xDim, xOff), 0.5);
			// upper y limit
			var yLimit = incrRound(valToPosY(scaleY.max, scaleY, yDim, yOff), 0.5);

			var clip = new Path2D(strokePath);

			lineTo(clip, x1, yLimit);
			lineTo(clip, x0, yLimit);
			lineTo(clip, x0, y0);

			return clip;
		});
	}

	function clipGaps(gaps, ori, plotLft, plotTop, plotWid, plotHgt) {
		var clip = null;

		// create clip path (invert gaps and non-gaps)
		if (gaps.length > 0) {
			clip = new Path2D();

			var rect = ori == 0 ? rectH : rectV;

			var prevGapEnd = plotLft;

			for (var i = 0; i < gaps.length; i++) {
				var g = gaps[i];

				rect(clip, prevGapEnd, plotTop, g[0] - prevGapEnd, plotTop + plotHgt);

				prevGapEnd = g[1];
			}

			rect(clip, prevGapEnd, plotTop, plotLft + plotWid - prevGapEnd, plotTop + plotHgt);
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

	// orientation-inverting canvas functions
	function moveToH(p, x, y) { p.moveTo(x, y); }
	function moveToV(p, y, x) { p.moveTo(x, y); }
	function lineToH(p, x, y) { p.lineTo(x, y); }
	function lineToV(p, y, x) { p.lineTo(x, y); }
	function rectH(p, x, y, w, h) { p.rect(x, y, w, h); }
	function rectV(p, y, x, h, w) { p.rect(x, y, w, h); }
	function arcH(p, x, y, r, startAngle, endAngle) { p.arc(x, y, r, startAngle, endAngle); }
	function arcV(p, y, x, r, startAngle, endAngle) { p.arc(x, y, r, startAngle, endAngle); }
	function bezierCurveToH(p, bp1x, bp1y, bp2x, bp2y, p2x, p2y) { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); }function bezierCurveToV(p, bp1y, bp1x, bp2y, bp2x, p2y, p2x) { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); }

	function _drawAcc(lineTo) {
		return (stroke, accX, minY, maxY, outY) => {
			if (minY != maxY) {
				lineTo(stroke, accX, minY);
				lineTo(stroke, accX, maxY);
				lineTo(stroke, accX, outY);
			}
		};
	}

	var drawAccH = _drawAcc(lineToH);
	var drawAccV = _drawAcc(lineToV);

	function linear() {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var lineTo, drawAcc;

				if (scaleX.ori == 0) {
					lineTo = lineToH;
					drawAcc = drawAccH;
				}
				else {
					lineTo = lineToV;
					drawAcc = drawAccV;
				}

				var dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};
				var stroke = _paths.stroke;

				var minY = inf,
					maxY = -inf,
					outY, outX, drawnAtX;

				var gaps = [];

				var accX = round(valToPosX(dataX[dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				var accGaps = false;

				// data edges
				var lftIdx = nonNullIdx(dataY, idx0, idx1,  1 * dir);
				var rgtIdx = nonNullIdx(dataY, idx0, idx1, -1 * dir);
				var lftX = incrRound(valToPosX(dataX[lftIdx], scaleX, xDim, xOff), 0.5);
				var rgtX = incrRound(valToPosX(dataX[rgtIdx], scaleX, xDim, xOff), 0.5);

				if (lftX > xOff)
					{ addGap(gaps, xOff, lftX); }

				for (var i = dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += dir) {
					var x = round(valToPosX(dataX[i], scaleX, xDim, xOff));

					if (x == accX) {
						if (dataY[i] != null) {
							outY = round(valToPosY(dataY[i], scaleY, yDim, yOff));

							if (minY == inf)
								{ lineTo(stroke, x, outY); }

							minY = min(outY, minY);
							maxY = max(outY, maxY);
						}
						else if (!accGaps && dataY[i] === null)
							{ accGaps = true; }
					}
					else {
						var _addGap = false;

						if (minY != inf) {
							drawAcc(stroke, accX, minY, maxY, outY);
							outX = drawnAtX = accX;
						}
						else if (accGaps) {
							_addGap = true;
							accGaps = false;
						}

						if (dataY[i] != null) {
							outY = round(valToPosY(dataY[i], scaleY, yDim, yOff));
							lineTo(stroke, x, outY);
							minY = maxY = outY;

							// prior pixel can have data but still start a gap if ends with null
							if (x - accX > 1 && dataY[i - dir] === null)
								{ _addGap = true; }
						}
						else {
							minY = inf;
							maxY = -inf;

							if (!accGaps && dataY[i] === null)
								{ accGaps = true; }
						}

						_addGap && addGap(gaps, outX, x);

						accX = x;
					}
				}

				if (minY != inf && minY != maxY && drawnAtX != accX)
					{ drawAcc(stroke, accX, minY, maxY, outY); }

				if (rgtX < xOff + xDim)
					{ addGap(gaps, rgtX, xOff + xDim); }

				if (series.fill != null) {
					var fill = _paths.fill = new Path2D(stroke);

					var fillTo = round(valToPosY(series.fillTo(u, seriesIdx, series.min, series.max), scaleY, yDim, yOff));

					lineTo(fill, rgtX, fillTo);
					lineTo(fill, lftX, fillTo);
				}

				if (!series.spanGaps)
					{ _paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim); }

				if (u.bands.length > 0) {
					// ADDL OPT: only create band clips for series that are band lower edges
					// if (b.series[1] == i && _paths.band == null)
					_paths.band = clipBandLine(u, seriesIdx, idx0, idx1, stroke);
				}

				return _paths;
			});
		};
	}

	function spline(opts) {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var moveTo, bezierCurveTo, lineTo;

				if (scaleX.ori == 0) {
					moveTo = moveToH;
					lineTo = lineToH;
					bezierCurveTo = bezierCurveToH;
				}
				else {
					moveTo = moveToV;
					lineTo = lineToV;
					bezierCurveTo = bezierCurveToV;
				}

				var _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				idx0 = nonNullIdx(dataY, idx0, idx1,  1);
				idx1 = nonNullIdx(dataY, idx0, idx1, -1);

				var gaps = [];
				var inGap = false;
				var firstXPos = round(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				var prevXPos = firstXPos;

				var xCoords = [];
				var yCoords = [];

				for (var i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					var yVal = dataY[i];
					var xVal = dataX[i];
					var xPos = valToPosX(xVal, scaleX, xDim, xOff);

					if (yVal == null) {
						if (yVal === null) {
							addGap(gaps, prevXPos, xPos);
							inGap = true;
						}
						continue;
					}
					else {
						if (inGap) {
							addGap(gaps, prevXPos, xPos);
							inGap = false;
						}

						xCoords.push((prevXPos = xPos));
						yCoords.push(valToPosY(dataY[i], scaleY, yDim, yOff));
					}
				}

				var _paths = {stroke: catmullRomFitting(xCoords, yCoords, 0.5, moveTo, bezierCurveTo), fill: null, clip: null, band: null};
				var stroke = _paths.stroke;

				if (series.fill != null) {
					var fill = _paths.fill = new Path2D(stroke);

					var fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
					var minY = round(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				if (!series.spanGaps)
					{ _paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim); }

				if (u.bands.length > 0) {
					// ADDL OPT: only create band clips for series that are band lower edges
					// if (b.series[1] == i && _paths.band == null)
					_paths.band = clipBandLine(u, seriesIdx, idx0, idx1, stroke);
				}

				return _paths;

				//  if FEAT_PATHS: false in rollup.config.js
				//	u.ctx.save();
				//	u.ctx.beginPath();
				//	u.ctx.rect(u.bbox.left, u.bbox.top, u.bbox.width, u.bbox.height);
				//	u.ctx.clip();
				//	u.ctx.strokeStyle = u.series[sidx].stroke;
				//	u.ctx.stroke(stroke);
				//	u.ctx.fillStyle = u.series[sidx].fill;
				//	u.ctx.fill(fill);
				//	u.ctx.restore();
				//	return null;
			});
		};
	}

	// adapted from https://gist.github.com/nicholaswmin/c2661eb11cad5671d816 (MIT)

	function catmullRomFitting(xCoords, yCoords, alpha, moveTo, bezierCurveTo) {
		var path = new Path2D();

		var dataLen = xCoords.length;

		var p0x,
			p0y,
			p1x,
			p1y,
			p2x,
			p2y,
			p3x,
			p3y,
			bp1x,
			bp1y,
			bp2x,
			bp2y,
			d1,
			d2,
			d3,
			A,
			B,
			N,
			M,
			d3powA,
			d2powA,
			d3pow2A,
			d2pow2A,
			d1pow2A,
			d1powA;

		moveTo(path, round(xCoords[0]), round(yCoords[0]));

		for (var i = 0; i < dataLen - 1; i++) {
			var p0i = i == 0 ? 0 : i - 1;

			p0x = xCoords[p0i];
			p0y = yCoords[p0i];

			p1x = xCoords[i];
			p1y = yCoords[i];

			p2x = xCoords[i + 1];
			p2y = yCoords[i + 1];

			if (i + 2 < dataLen) {
				p3x = xCoords[i + 2];
				p3y = yCoords[i + 2];
			} else {
				p3x = p2x;
				p3y = p2y;
			}

			d1 = sqrt(pow(p0x - p1x, 2) + pow(p0y - p1y, 2));
			d2 = sqrt(pow(p1x - p2x, 2) + pow(p1y - p2y, 2));
			d3 = sqrt(pow(p2x - p3x, 2) + pow(p2y - p3y, 2));

			// Catmull-Rom to Cubic Bezier conversion matrix

			// A = 2d1^2a + 3d1^a * d2^a + d3^2a
			// B = 2d3^2a + 3d3^a * d2^a + d2^2a

			// [   0			 1			0		  0		  ]
			// [   -d2^2a /N	 A/N		  d1^2a /N   0		  ]
			// [   0			 d3^2a /M	 B/M		-d2^2a /M  ]
			// [   0			 0			1		  0		  ]

			d3powA  = pow(d3, alpha);
			d3pow2A = pow(d3, alpha * 2);
			d2powA  = pow(d2, alpha);
			d2pow2A = pow(d2, alpha * 2);
			d1powA  = pow(d1, alpha);
			d1pow2A = pow(d1, alpha * 2);

			A = 2 * d1pow2A + 3 * d1powA * d2powA + d2pow2A;
			B = 2 * d3pow2A + 3 * d3powA * d2powA + d2pow2A;
			N = 3 * d1powA * (d1powA + d2powA);

			if (N > 0)
				{ N = 1 / N; }

			M = 3 * d3powA * (d3powA + d2powA);

			if (M > 0)
				{ M = 1 / M; }

			bp1x = (-d2pow2A * p0x + A * p1x + d1pow2A * p2x) * N;
			bp1y = (-d2pow2A * p0y + A * p1y + d1pow2A * p2y) * N;

			bp2x = (d3pow2A * p1x + B * p2x - d2pow2A * p3x) * M;
			bp2y = (d3pow2A * p1y + B * p2y - d2pow2A * p3y) * M;

			if (bp1x == 0 && bp1y == 0) {
				bp1x = p1x;
				bp1y = p1y;
			}

			if (bp2x == 0 && bp2y == 0) {
				bp2x = p2x;
				bp2y = p2y;
			}

			bezierCurveTo(path, bp1x, bp1y, bp2x, bp2y, p2x, p2y);
		}

		return path;
	}

	function stepped(opts) {
		var align = ifNull(opts.align, 1);

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var lineTo = scaleX.ori == 0 ? lineToH : lineToV;

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};
				var stroke = _paths.stroke;

				var _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				idx0 = nonNullIdx(dataY, idx0, idx1,  1);
				idx1 = nonNullIdx(dataY, idx0, idx1, -1);

				var gaps = [];
				var inGap = false;
				var prevYPos  = round(valToPosY(dataY[_dir == 1 ? idx0 : idx1], scaleY, yDim, yOff));
				var firstXPos = round(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				var prevXPos = firstXPos;

				lineTo(stroke, firstXPos, prevYPos);

				for (var i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					var yVal1 = dataY[i];

					var x1 = round(valToPosX(dataX[i], scaleX, xDim, xOff));

					if (yVal1 == null) {
						if (yVal1 === null) {
							addGap(gaps, prevXPos, x1);
							inGap = true;
						}
						continue;
					}

					var y1 = round(valToPosY(yVal1, scaleY, yDim, yOff));

					if (inGap) {
						addGap(gaps, prevXPos, x1);

						// don't clip vertical extenders
						if (prevYPos != y1) {
							var halfStroke = (series.width * pxRatio) / 2;

							var lastGap = gaps[gaps.length - 1];
							lastGap[0] += halfStroke;
							lastGap[1] -= halfStroke;
						}

						inGap = false;
					}

					if (align == 1)
						{ lineTo(stroke, x1, prevYPos); }
					else
						{ lineTo(stroke, prevXPos, y1); }

					lineTo(stroke, x1, y1);

					prevYPos = y1;
					prevXPos = x1;
				}

				if (series.fill != null) {
					var fill = _paths.fill = new Path2D(stroke);

					var fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
					var minY = round(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				if (!series.spanGaps)
					{ _paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim); }

				if (u.bands.length > 0) {
					// ADDL OPT: only create band clips for series that are band lower edges
					// if (b.series[1] == i && _paths.band == null)
					_paths.band = clipBandLine(u, seriesIdx, idx0, idx1, stroke);
				}

				return _paths;
			});
		};
	}

	function bars(opts) {
		opts = opts || EMPTY_OBJ;
		var size = ifNull(opts.size, [0.6, inf]);
		var align = opts.align || 0;

		var gapFactor = 1 - size[0];
		var maxWidth  = ifNull(size[1], inf) * pxRatio;

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var rect = scaleX.ori == 0 ? rectH : rectV;

				var colWid = valToPosX(dataX[1], scaleX, xDim, xOff) - valToPosX(dataX[0], scaleX, xDim, xOff);

				var gapWid = colWid * gapFactor;

				var fillToY = series.fillTo(u, seriesIdx, series.min, series.max);

				var y0Pos = valToPosY(fillToY, scaleY, yDim, yOff);

				var strokeWidth = round(series.width * pxRatio);

				var barWid = round(min(maxWidth, colWid - gapWid) - strokeWidth);

				var xShift = align == 1 ? 0 : align == -1 ? barWid : barWid / 2;

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};

				var hasBands = u.bands.length > 0;
				var yLimit;

				if (hasBands) {
					// ADDL OPT: only create band clips for series that are band lower edges
					// if (b.series[1] == i && _paths.band == null)
					_paths.band = new Path2D();
					yLimit = incrRound(valToPosY(scaleY.max, scaleY, yDim, yOff), 0.5);
				}

				var stroke = _paths.stroke;
				var band = _paths.band;

				var _dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				for (var i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					var yVal = dataY[i];

					// interpolate upwards band clips
					if (yVal == null) {
						if (hasBands) {
							// simple, but inefficient bi-directinal linear scans on each iteration
							var prevNonNull = nonNullIdx(dataY, _dir == 1 ? idx0 : idx1, i, -_dir);
							var nextNonNull = nonNullIdx(dataY, i, _dir == 1 ? idx1 : idx0,  _dir);

							var prevVal = dataY[prevNonNull];
							var nextVal = dataY[nextNonNull];

							yVal = prevVal + (i - prevNonNull) / (nextNonNull - prevNonNull) * (nextVal - prevVal);
						}
						else
							{ continue; }
					}

					var xVal = scaleX.distr == 2 ? i : dataX[i];

					// TODO: all xPos can be pre-computed once for all series in aligned set
					var xPos = valToPosX(xVal, scaleX, xDim, xOff);
					var yPos = valToPosY(yVal, scaleY, yDim, yOff);

					var lft = round(xPos - xShift);
					var btm = round(max(yPos, y0Pos));
					var top = round(min(yPos, y0Pos));
					var barHgt = btm - top;

					dataY[i] != null && rect(stroke, lft, top, barWid, barHgt);

					if (hasBands) {
						btm = top;
						top = yLimit;
						barHgt = btm - top;
						rect(band, lft, top, barWid, barHgt);
					}
				}

				if (series.fill != null)
					{ _paths.fill = new Path2D(stroke); }

				return _paths;
			});
		};
	}

	var linearPath =  linear() ;

	function setDefaults(d, xo, yo, initY) {
		var d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
		return d2.map((o, i) => setDefault(o, i, xo, yo));
	}

	function setDefault(o, i, xo, yo) {
		return assign({}, (i == 0 ? xo : yo), o);
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
		font = font.replace(/(\d+)px/, (m, p1) => (fontSize = round(p1 * pxRatio)) + 'px');
		return [font, fontSize];
	}

	function uPlot(opts, data, then) {
		var self = {};

		function getValPct(val, scale) {
			return (
				scale.distr == 3
				? log10((val > 0 ? val : scale.clamp(self, val, scale.min, scale.max, scale.key)) / scale.min) / log10(scale.max / scale.min)
				: (val - scale.min) / (scale.max - scale.min)
			);
		}

		function getHPos(val, scale, dim, off) {
			var pct = getValPct(val, scale);
			return off + dim * (scale.dir == -1 ? (1 - pct) : pct);
		}

		function getVPos(val, scale, dim, off) {
			var pct = getValPct(val, scale);
			return off + dim * (scale.dir == -1 ? pct : (1 - pct));
		}

		function getPos(val, scale, dim, off) {
			return scale.ori == 0 ? getHPos(val, scale, dim, off) : getVPos(val, scale, dim, off);
		}

		self.valToPosH = getHPos;
		self.valToPosV = getVPos;

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

		var pxAlign = ifNull(opts.pxAlign, true);

		(opts.plugins || []).forEach(p => {
			if (p.opts)
				{ opts = p.opts(self, opts) || opts; }
		});

		var ms = opts.ms || 1e-3;

		var series  = self.series = setDefaults(opts.series || [], xSeriesOpts, ySeriesOpts, false);
		var axes    = self.axes   = setDefaults(opts.axes   || [], xAxisOpts,   yAxisOpts,    true);
		var scales  = self.scales = {};
		var bands   = self.bands  = opts.bands || [];

		bands.forEach(b => {
			b.fill = fnOrSelf(b.fill || null);
		});

		var xScaleKey = series[0].scale;

		var drawOrderMap = {
			axes: drawAxesGrid,
			series: drawSeries,
		};

		var drawOrder = (opts.drawOrder || ["axes", "series"]).map(key => drawOrderMap[key]);

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

					sc.key = scaleKey;

					var isTime =  sc.time;
					var isLog  = sc.distr == 3;

					var rn = sc.range;

					if (scaleKey != xScaleKey && !isArr(rn) && isObj(rn)) {
						var cfg = rn;
						// this is similar to snapNumY
						rn = (self, dataMin, dataMax) => dataMin == null ? nullMinMax : rangeNum(dataMin, dataMax, cfg);
					}

					sc.range = fnOrSelf(rn || (isTime ? snapTimeX : scaleKey == xScaleKey ? (isLog ? snapLogX : snapNumX) : (isLog ? snapLogY : snapNumY)));

					sc.auto = fnOrSelf(sc.auto);

					sc.clamp = fnOrSelf(sc.clamp || clampScale);
				}
			}
		}

		initScale("x");
		initScale("y");

		series.forEach(s => {
			initScale(s.scale);
		});

		axes.forEach(a => {
			initScale(a.scale);
		});

		for (var k in opts.scales)
			{ initScale(k); }

		var scaleX = scales[xScaleKey];

		var xScaleDistr = scaleX.distr;

		var valToPosX, valToPosY, moveTo, arc;

		if (scaleX.ori == 0) {
			addClass(root, ORI_HZ);
			valToPosX = getHPos;
			valToPosY = getVPos;
			moveTo    = moveToH;
			arc       = arcH;
			/*
			updOriDims = () => {
				xDimCan = plotWid;
				xOffCan = plotLft;
				yDimCan = plotHgt;
				yOffCan = plotTop;

				xDimCss = plotWidCss;
				xOffCss = plotLftCss;
				yDimCss = plotHgtCss;
				yOffCss = plotTopCss;
			};
			*/
		}
		else {
			addClass(root, ORI_VT);
			valToPosX = getVPos;
			valToPosY = getHPos;
			moveTo    = moveToV;
			arc       = arcV;
			/*
			updOriDims = () => {
				xDimCan = plotHgt;
				xOffCan = plotTop;
				yDimCan = plotWid;
				yOffCan = plotLft;

				xDimCss = plotHgtCss;
				xOffCss = plotTopCss;
				yDimCss = plotWidCss;
				yOffCss = plotLftCss;
			};
			*/
		}

		var pendScales = {};

		// explicitly-set initial scales
		for (var k$1 in scales) {
			var sc = scales[k$1];

			if (sc.min != null || sc.max != null)
				{ pendScales[k$1] = {min: sc.min, max: sc.max}; }
		}

	//	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
		var _tzDate  =  (opts.tzDate || (ts => new Date(ts / ms)));
		var _fmtDate =  (opts.fmtDate || fmtDate);

		var _timeAxisSplits =  (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
		var _timeAxisVals   =  timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
		var _timeSeriesVal  =  timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

		var legend     =  assign({show: true, live: true}, opts.legend);
		var showLegend =  legend.show;

		{
			legend.width  = fnOrSelf(ifNull(legend.width, legendWidth));
			legend.dash   = fnOrSelf(legend.dash   || legendDash);
			legend.stroke = fnOrSelf(legend.stroke || legendStroke);
			legend.fill   = fnOrSelf(legend.fill   || legendFill);
		}

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

			if (i > 0) {
				var width  = legend.width(self, i);

				if (width)
					{ indic.style.border = width + "px " + legend.dash(self, i) + " " + legend.stroke(self, i); }

				indic.style.background = legend.fill(self, i);
			}

			var text = placeDiv(LEGEND_LABEL, label);
			text.textContent = s.label;

			if (i > 0) {
				onMouse("click", label, e => {
					if ( cursor._lock)
						{ return; }

					setSeries(series.indexOf(s), {show: !s.show},  syncOpts.setSeries);
				});

				if (cursorFocus) {
					onMouse(mouseenter, label, e => {
						if (cursor._lock)
							{ return; }

						setSeries(series.indexOf(s), FOCUS_TRUE, syncOpts.setSeries);
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

			plotLft = bb.left   = incrRound(plotLftCss * pxRatio, 0.5);
			plotTop = bb.top    = incrRound(plotTopCss * pxRatio, 0.5);
			plotWid = bb.width  = incrRound(plotWidCss * pxRatio, 0.5);
			plotHgt = bb.height = incrRound(plotHgtCss * pxRatio, 0.5);

		//	updOriDims();
		}

		function convergeSize() {
			var converged = false;

			var cycleNum = 0;

			while (!converged) {
				cycleNum++;

				var axesConverged = axesCalc(cycleNum);
				var paddingConverged = paddingCalc(cycleNum);

				converged = axesConverged && paddingConverged;

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

			axes.forEach((axis, i) => {
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

			sidesWithAxes[0] = hasTopAxis;
			sidesWithAxes[1] = hasRgtAxis;
			sidesWithAxes[2] = hasBtmAxis;
			sidesWithAxes[3] = hasLftAxis;

			// hz padding
			plotWidCss -= _padding[1] + _padding[3];
			plotLftCss += _padding[3];

			// vt padding
			plotHgtCss -= _padding[2] + _padding[0];
			plotTopCss += _padding[0];
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

			axes.forEach((axis, i) => {
				if (axis.show && axis._show) {
					var side = axis.side;

					axis._pos = incrOffset(side, axis._size);

					if (axis.label != null)
						{ axis._lpos = incrOffset(side, axis.labelSize); }
				}
			});
		}

		var cursor =  (self.cursor = assign({}, cursorOpts, opts.cursor));

		{
			cursor._lock = false;

			var points = cursor.points;

			points.show   = fnOrSelf(points.show);
			points.size   = fnOrSelf(points.size);
			points.stroke = fnOrSelf(points.stroke);
			points.width  = fnOrSelf(points.width);
			points.fill   = fnOrSelf(points.fill);
		}

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
				s.width  = s.width == null ? 1 : s.width;
				s.paths  = s.paths || linearPath || retNull;
				s.fillTo = fnOrSelf(s.fillTo || seriesFillTo);
				s.pxAlign = ifNull(s.pxAlign, true);

				s.stroke = fnOrSelf(s.stroke || null);
				s.fill   = fnOrSelf(s.fill || null);
				s._stroke = s._fill = s._paths = s._focus = null;

				var _ptDia = ptDia(s.width, 1);
				var points = s.points = assign({}, {
					size: _ptDia,
					width: max(1, _ptDia * .2),
					stroke: s.stroke,
					space: _ptDia * 2,
					_stroke: null,
					_fill: null,
				}, s.points);
				points.show   = fnOrSelf(points.show);
				points.fill   = fnOrSelf(points.fill);
				points.stroke = fnOrSelf(points.stroke);
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

		var sidesWithAxes = [false, false, false, false];

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

				axis.stroke       = fnOrSelf(axis.stroke);
				axis.grid.stroke  = fnOrSelf(axis.grid.stroke);
				axis.ticks.stroke = fnOrSelf(axis.ticks.stroke);

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

				if (axis._size > 0)
					{ sidesWithAxes[i] = true; }
			}
		}

		// set axis defaults
		axes.forEach(initAxis);

		function autoPadSide(self, side, sidesWithAxes, cycleNum) {
			var hasTopAxis = sidesWithAxes[0];
			var hasRgtAxis = sidesWithAxes[1];
			var hasBtmAxis = sidesWithAxes[2];
			var hasLftAxis = sidesWithAxes[3];

			var ori = side % 2;
			var size = 0;

			if (ori == 0 && (hasLftAxis || hasRgtAxis))
				{ size = (side == 0 && !hasTopAxis || side == 2 && !hasBtmAxis ? round(xAxisOpts.size / 3) : 0); }
			if (ori == 1 && (hasTopAxis || hasBtmAxis))
				{ size = (side == 1 && !hasRgtAxis || side == 3 && !hasLftAxis ? round(yAxisOpts.size / 2) : 0); }

			return size;
		}

		var padding = self.padding = (opts.padding || [autoPadSide,autoPadSide,autoPadSide,autoPadSide]).map(p => fnOrSelf(ifNull(p, autoPadSide)));
		var _padding = self._padding = padding.map((p, i) => p(self, i, sidesWithAxes, 0));

		var dataLen;

		// rendered data window
		var i0 = null;
		var i1 = null;
		var idxs = series[0].idxs;

		var data0 = null;

		var viaAutoScaleX = false;

		function setData(_data, _resetScales) {
			_data = _data || [];
			_data[0] = _data[0] || [];

			self.data = _data;
			data = _data.slice();
			data0 = data[0];
			dataLen = data0.length;

			if (xScaleDistr == 2)
				{ data[0] = data0.map((v, i) => i); }

			self._data = data;

			resetYSeries(true);

			fire("setData");

			if (_resetScales !== false) {
				var xsc = scaleX;

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
						{ (assign = rangeLog(_min, _min, scaleX.log, false), _min = assign[0], _max = assign[1]); }
					else if (scaleX.time)
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
		}

		function setCtxStyle(stroke, width, dash, cap, fill) {
			ctx.strokeStyle = stroke || transparent;
			ctx.lineWidth = width;
			ctx.lineJoin = "round";
			ctx.lineCap = cap || "butt"; // (‿|‿)
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
				series.forEach((s, i) => {
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
						var minMax$1 = s.min == null ? (wsc.distr == 3 ? getMinMaxLog(data[i], i0, i1) : getMinMax(data[i], i0, i1, s.sorted)) : [s.min, s.max];

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
				series.forEach(s => {
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

			var _pxAlign = pxAlign && s.pxAlign;

			_pxAlign && ctx.translate(offset, offset);

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

			var scaleY = scales[s.scale];

			var xDim, xOff, yDim, yOff;

			if (scaleX.ori == 0) {
				xDim = plotWid;
				xOff = plotLft;
				yDim = plotHgt;
				yOff = plotTop;
			}
			else {
				xDim = plotHgt;
				xOff = plotTop;
				yDim = plotWid;
				yOff = plotLft;
			}

			for (var pi = i0; pi <= i1; pi++) {
				if (data[si][pi] != null) {
					var x = round(valToPosX(data[0][pi],  scaleX, xDim, xOff));
					var y = round(valToPosY(data[si][pi], scaleY, yDim, yOff));

					moveTo(path, x + rad, y);
					arc(path, x, y, rad, 0, PI * 2);
				}
			}

			var _stroke = p._stroke = p.stroke(self, si);
			var _fill   = p._fill   = p.fill(self, si);

			setCtxStyle(
				_stroke,
				width,
				p.dash,
				p.cap,
				_fill || (isStroked ? "#fff" : s._stroke)
			);

			ctx.fill(path);
			isStroked && ctx.stroke(path);

			ctx.globalAlpha = 1;

			ctx.restore();

			_pxAlign && ctx.translate(-offset, -offset);
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

		function drawSeries() {
			if (dataLen > 0) {
				series.forEach((s, i) => {
					if (i > 0 && s.show && s._paths == null) {
						var _idxs = getOuterIdxs(data[i]);
						s._paths = s.paths(self, i, _idxs[0], _idxs[1]);
					}
				});

				series.forEach((s, i) => {
					if (i > 0 && s.show) {
						if (s._paths)
							 { drawPath(i); }

						if (s.points.show(self, i, i0, i1))
							 { drawPoints(i); }

						fire("drawSeries", i);
					}
				});
			}
		}

		function drawPath(si) {
			var s = series[si];

			var ref = s._paths;
			var stroke = ref.stroke;
			var fill = ref.fill;
			var clip = ref.clip;
			var width = roundDec(s.width * pxRatio, 3);
			var offset = (width % 2) / 2;

			var strokeStyle = s._stroke = s.stroke(self, si);
			var fillStyle   = s._fill   = s.fill(self, si);

			ctx.globalAlpha = s.alpha;

			var _pxAlign = pxAlign && s.pxAlign;

			_pxAlign && ctx.translate(offset, offset);

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

			clip && ctx.clip(clip);

			fillStroke(si, strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill);

			ctx.restore();

			_pxAlign && ctx.translate(-offset, -offset);

			ctx.globalAlpha = 1;
		}

		function fillStroke(si, strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath) {
			var didStrokeFill = false;

			// for all bands where this series is the top edge, create upwards clips using the bottom edges
			// and apply clips + fill with band fill or dfltFill
			bands.forEach((b, bi) => {
				// isUpperEdge?
				if (b.series[0] == si) {
					var lowerEdge = series[b.series[1]];

					var clip = (lowerEdge._paths || EMPTY_OBJ).band;

					ctx.save();

					var _fillStyle = null;

					// hasLowerEdge?
					if (lowerEdge.show && clip) {
						_fillStyle = b.fill(self, bi) || fillStyle;
						ctx.clip(clip);
					}

					strokeFill(strokeStyle, lineWidth, lineDash, lineCap, _fillStyle, strokePath, fillPath);

					ctx.restore();

					didStrokeFill = true;
				}
			});

			if (!didStrokeFill)
				{ strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath); }
		}

		function strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath) {
			setCtxStyle(strokeStyle, lineWidth, lineDash, lineCap, fillStyle);
			fillStyle   && fillPath                && ctx.fill(fillPath);
			strokeStyle && strokePath && lineWidth && ctx.stroke(strokePath);
		}

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

		function drawOrthoLines(offs, filts, ori, side, pos0, len, width, stroke, dash, cap) {
			var offset = (width % 2) / 2;

			pxAlign && ctx.translate(offset, offset);

			setCtxStyle(stroke, width, dash, cap);

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

			offs.forEach((off, i) => {
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

			pxAlign && ctx.translate(-offset, -offset);
		}

		function axesCalc(cycleNum) {
		//	log("axesCalc()", arguments);

			var converged = true;

			axes.forEach((axis, i) => {
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
				var splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
				var incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

				var values = axis._values = axis.values(self, axis.filter(self, splits, i, _space, incr), i, _space, incr);

				// rotating of labels only supported on bottom x axis
				axis._rotate = side == 2 ? axis.rotate(self, values, i, _space) : 0;

				var oldSize = axis._size;

				axis._size = ceil(axis.size(self, values, i, cycleNum));

				if (oldSize != null && axis._size != oldSize)			// ready && ?
					{ converged = false; }
			});

			return converged;
		}

		function paddingCalc(cycleNum) {
			var converged = true;

			padding.forEach((p, i) => {
				var _p = p(self, i, sidesWithAxes, cycleNum);

				if (_p != _padding[i])
					{ converged = false; }

				_padding[i] = _p;
			});

			return converged;
		}

		function drawAxesGrid() {
			axes.forEach((axis, i) => {
				if (!axis.show || !axis._show)
					{ return; }

				var scale = scales[axis.scale];
				var side = axis.side;
				var ori = side % 2;

				var plotDim = ori == 0 ? plotWid : plotHgt;
				var plotOff = ori == 0 ? plotLft : plotTop;

				var axisGap = round(axis.gap * pxRatio);

				var ticks = axis.ticks;
				var tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

				var ref = axis._found;
				var _incr = ref[0];
				var _space = ref[1];
				var _splits = axis._splits;

				// tick labels
				// BOO this assumes a specific data/series
				var splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
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
				ctx.fillStyle    = axis.stroke(self, i);									// rgba?
				ctx.textAlign    = axis.align == 1 ? LEFT :
				                   axis.align == 2 ? RIGHT :
				                   angle > 0 ? LEFT :
				                   angle < 0 ? RIGHT :
				                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
				ctx.textBaseline = angle ||
				                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

				var lineHeight = axis.font[1] * lineMult;

				var canOffs = _splits.map(val => round(getPos(val, scale, plotDim, plotOff)));

				axis._values.forEach((val, i) => {
					if (val == null)
						{ return; }

					if (ori == 0)
						{ x = canOffs[i]; }
					else
						{ y = canOffs[i]; }

					(""+val).split(/\n/gm).forEach((text, j) => {
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
						roundDec(ticks.width * pxRatio, 3),
						ticks.stroke(self, i),
						ticks.dash,
						ticks.cap
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
						roundDec(grid.width * pxRatio, 3),
						grid.stroke(self, i),
						grid.dash,
						grid.cap
					);
				}
			});

			fire("drawAxes");
		}

		function resetYSeries(minMax) {
		//	log("resetYSeries()", arguments);

			series.forEach((s, i) => {
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

				can.width  = round(fullWidCss * pxRatio);
				can.height = round(fullHgtCss * pxRatio);

				syncRect();

				fire("setSize");

				shouldSetSize = false;
			}

		//	if (shouldSetSelect) {
			// TODO: update .u-select metrics (if visible)
			//	setStylePx(selectDiv, TOP, select.top = 0);
			//	setStylePx(selectDiv, LEFT, select.left = 0);
			//	setStylePx(selectDiv, WIDTH, select.width = 0);
			//	setStylePx(selectDiv, HEIGHT, select.height = 0);
			//	shouldSetSelect = false;
		//	}

			if ( cursor.show && shouldSetCursor) {
				updateCursor();
				shouldSetCursor = false;
			}

		//	if (FEAT_LEGEND && legend.show && legend.live && shouldSetLegend) {}

			if (fullWidCss > 0 && fullHgtCss > 0) {
				ctx.clearRect(0, 0, can.width, can.height);
				fire("drawClear");
				drawOrder.forEach(fn => fn());
				fire("draw");
			}

			if (!ready) {
				ready = true;
				self.status = 1;

				fire("ready");
			}

			viaAutoScaleX = false;

			queuedCommit = false;
		}

		self.redraw = (rebuildPaths, recalcAxes) => {
			shouldConvergeSize = recalcAxes || false;

			if (rebuildPaths !== false)
				{ _setScale(xScaleKey, scaleX.min, scaleX.max); }
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

				if (opts.min > opts.max) {
					var _min = opts.min;
					opts.min = opts.max;
					opts.max = _min;
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

		var xCursor;
		var yCursor;
		var vCursor;
		var hCursor;

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
			if (cursor.x)
				{ xCursor = placeDiv(CURSOR_X, over); }
			if (cursor.y)
				{ yCursor = placeDiv(CURSOR_Y, over); }

			if (scaleX.ori == 0) {
				vCursor = xCursor;
				hCursor = yCursor;
			}
			else {
				vCursor = yCursor;
				hCursor = xCursor;
			}

			mouseLeft1 = cursor.left;
			mouseTop1 = cursor.top;
		}

		var select = self.select = assign({
			show:   true,
			over:   true,
			left:   0,
			width:  0,
			top:    0,
			height: 0,
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

			_alpha(i, value);
		}

		// y-distance
		var closestDist;
		var closestSeries;
		var focusedSeries;
		var FOCUS_TRUE  = {focus: true};
		var FOCUS_FALSE = {focus: false};

		function setFocus(i) {
			if (i != focusedSeries) {
			//	log("setFocus()", arguments);

				var allFocused = i == null;

				series.forEach((s, i2) => {
					var isFocused = allFocused || i2 == 0 || i2 == i;
					s._focus = allFocused ? null : isFocused;
					_setAlpha(i2, isFocused ? 1 : focus.alpha);
				});

				focusedSeries = i;
				commit();
			}
		}

		if (showLegend && cursorFocus) {
			on(mouseleave, legendEl, e => {
				if (cursor._lock)
					{ return; }
				setSeries(null, FOCUS_FALSE, syncOpts.setSeries);
				updateCursor();
			});
		}

		function posToVal(pos, scale) {
			var sc = scales[scale];

			var dim = plotWidCss;

			if (sc.ori == 1) {
				dim = plotHgtCss;
				pos = dim - pos;
			}

			if (sc.dir == -1)
				{ pos = dim - pos; }

			var _min = sc.min,
				_max = sc.max,
				pct = pos / dim;

			if (sc.distr == 3) {
				_min = log10(_min);
				_max = log10(_max);
				return pow(10, _min + (_max - _min) * pct);
			}
			else
				{ return _min + (_max - _min) * pct; }
		}

		function closestIdxFromXpos(pos) {
			var v = posToVal(pos, xScaleKey);
			return closestIdx(v, data[0], i0, i1);
		}

		self.valToIdx = val => closestIdx(val, data[0]);
		self.posToIdx = closestIdxFromXpos;
		self.posToVal = posToVal;
		self.valToPos = (val, scale, can) => (
			scales[scale].ori == 0 ?
			getHPos(val, scales[scale],
				can ? plotWid : plotWidCss,
				can ? plotLft : 0
			) :
			getVPos(val, scales[scale],
				can ? plotHgt : plotHgtCss,
				can ? plotTop : 0
			)
		);

		// defers calling expensive functions
		function batch(fn) {
			fn(self);
			commit();
		}

		self.batch = batch;

		 (self.setCursor = opts => {
			mouseLeft1 = opts.left;
			mouseTop1 = opts.top;
		//	assign(cursor, opts);
			updateCursor();
		});

		function setSelH(off, dim) {
			setStylePx(selectDiv, LEFT,  select.left = off);
			setStylePx(selectDiv, WIDTH, select.width = dim);
		}

		function setSelV(off, dim) {
			setStylePx(selectDiv, TOP,    select.top = off);
			setStylePx(selectDiv, HEIGHT, select.height = dim);
		}

		var setSelX = scaleX.ori == 0 ? setSelH : setSelV;
		var setSelY = scaleX.ori == 1 ? setSelH : setSelV;

		function updateCursor(ts, src) {
			var assign;

		//	ts == null && log("updateCursor()", arguments);

			rawMouseLeft1 = mouseLeft1;
			rawMouseTop1 = mouseTop1;

			(assign = cursor.move(self, mouseLeft1, mouseTop1), mouseLeft1 = assign[0], mouseTop1 = assign[1]);

			if (cursor.show) {
				vCursor && trans(vCursor, round(mouseLeft1), 0, plotWidCss, plotHgtCss);
				hCursor && trans(hCursor, 0, round(mouseTop1), plotWidCss, plotHgtCss);
			}

			var idx;

			// when zooming to an x scale range between datapoints the binary search
			// for nearest min/max indices results in this condition. cheap hack :D
			var noDataInRange = i0 > i1;

			closestDist = inf;

			// TODO: extract
			var xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss;
			var yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss;

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
							{ legendRows[i][j].firstChild.nodeValue = '--'; }
					}
				}

				if (cursorFocus)
					{ setSeries(null, FOCUS_TRUE, syncOpts.setSeries); }
			}
			else {
			//	let pctY = 1 - (y / rect.height);

				var mouseXPos = scaleX.ori == 0 ? mouseLeft1 : mouseTop1;

				var valAtPosX = posToVal(mouseXPos, xScaleKey);

				idx = closestIdx(valAtPosX, data[0], i0, i1);

				var xPos = incrRoundUp(valToPosX(data[0][idx], scaleX, xDim, 0), 0.5);

				for (var i$1 = 0; i$1 < series.length; i$1++) {
					var s = series[i$1];

					var idx2  = cursor.dataIdx(self, i$1, idx, valAtPosX);
					var xPos2 = idx2 == idx ? xPos : incrRoundUp(valToPosX(data[0][idx2], scaleX, xDim, 0), 0.5);

					if (i$1 > 0 && s.show) {
						var valAtIdx = data[i$1][idx2];

						var yPos = valAtIdx == null ? -10 : incrRoundUp(valToPosY(valAtIdx, scales[s.scale], yDim, 0), 0.5);

						if (yPos > 0) {
							var dist = abs(yPos - mouseTop1);

							if (dist <= closestDist) {
								closestDist = dist;
								closestSeries = i$1;
							}
						}

						var hPos = (void 0), vPos = (void 0);

						if (scaleX.ori == 0) {
							hPos = xPos2;
							vPos = yPos;
						}
						else {
							hPos = yPos;
							vPos = xPos2;
						}

						 cursorPts.length > 1 && trans(cursorPts[i$1], hPos, vPos, plotWidCss, plotHgtCss);
					}

					if (showLegend && legend.live) {
						if ((idx2 == cursor.idx && !shouldSetLegend) || i$1 == 0 && multiValLegend)
							{ continue; }

						var src$1 = i$1 == 0 && xScaleDistr == 2 ? data0 : data[i$1];

						var vals = multiValLegend ? s.values(self, i$1, idx2) : {_: s.value(self, src$1[idx2], i$1, idx2)};

						var j$1 = 0;

						for (var k in vals)
							{ legendRows[i$1][j$1++].firstChild.nodeValue = vals[k]; }
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

					var ref$1 = src.select;
					var left = ref$1.left;
					var top = ref$1.top;
					var width = ref$1.width;
					var height = ref$1.height;

					var sori = src.scales[xKey].ori;
					var sPosToVal = src.posToVal;

					var sOff, sDim, sc, a, b;

					if (xKey) {
						if (sori == 0) {
							sOff = left;
							sDim = width;
						}
						else {
							sOff = top;
							sDim = height;
						}

						sc = scales[xKey];

						a = valToPosX(sPosToVal(sOff, xKey),        sc, xDim, 0);
						b = valToPosX(sPosToVal(sOff + sDim, xKey), sc, xDim, 0);

						setSelX(min(a,b), abs(b-a));

						if (!yKey)
							{ setSelY(0, yDim); }
					}

					if (yKey) {
						if (sori == 1) {
							sOff = left;
							sDim = width;
						}
						else {
							sOff = top;
							sDim = height;
						}

						sc = scales[yKey];

						a = valToPosY(sPosToVal(sOff, yKey),        sc, yDim, 0);
						b = valToPosY(sPosToVal(sOff + sDim, yKey), sc, yDim, 0);

						setSelY(min(a,b), abs(b-a));

						if (!xKey)
							{ setSelX(0, xDim); }
					}
				}
				else {
					var rawDX = abs(rawMouseLeft1 - rawMouseLeft0);
					var rawDY = abs(rawMouseTop1 - rawMouseTop0);

					if (scaleX.ori == 1) {
						var _rawDX = rawDX;
						rawDX = rawDY;
						rawDY = _rawDX;
					}

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

					var p0, p1;

					if (dragX) {
						if (scaleX.ori == 0) {
							p0 = mouseLeft0;
							p1 = mouseLeft1;
						}
						else {
							p0 = mouseTop0;
							p1 = mouseTop1;
						}

						setSelX(min(p0, p1), abs(p1 - p0));

						if (!dragY)
							{ setSelY(0, yDim); }
					}

					if (dragY) {
						if (scaleX.ori == 1) {
							p0 = mouseLeft0;
							p1 = mouseLeft1;
						}
						else {
							p0 = mouseTop0;
							p1 = mouseTop1;
						}

						setSelY(min(p0, p1), abs(p1 - p0));

						if (!dragX)
							{ setSelX(0, xDim); }
					}

					// the drag didn't pass the dist requirement
					if (!dragX && !dragY) {
						setSelX(0, 0);
						setSelY(0, 0);
					}
				}
			}

			cursor.idx = idx;
			cursor.left = mouseLeft1;
			cursor.top = mouseTop1;
			drag._x = dragX;
			drag._y = dragY;

			// if ts is present, means we're implicitly syncing own cursor
			if (ts != null) {
				// this is not technically a "mousemove" event, since it's debounced, rename to setCursor?
				// since this is internal, we can tweak it later
				sync.pub(mousemove, self, mouseLeft1, mouseTop1, xDim, yDim, idx);

				if (cursorFocus) {
					var o = syncOpts.setSeries;
					var p = focus.prox;

					if (focusedSeries == null) {
						if (closestDist <= p)
							{ setSeries(closestSeries, FOCUS_TRUE, o); }
					}
					else {
						if (closestDist > p)
							{ setSeries(null, FOCUS_TRUE, o); }
						else if (closestSeries != focusedSeries)
							{ setSeries(closestSeries, FOCUS_TRUE, o); }
					}
				}
			}

			ready && fire("setCursor");
		}

		var rect = null;

		function syncRect() {
			rect = over.getBoundingClientRect();
		}

		function mouseMove(e, src, _l, _t, _w, _h, _i) {
			if (cursor._lock)
				{ return; }

			cacheMouse(e, src, _l, _t, _w, _h, _i, false, e != null);

			if (e != null)
				{ updateCursor(1); }
			else
				{ updateCursor(null, src); }
		}

		function cacheMouse(e, src, _l, _t, _w, _h, _i, initial, snap) {
			var assign;

			if (e != null) {
				_l = e.clientX - rect.left;
				_t = e.clientY - rect.top;
			}
			else {
				if (_l < 0 || _t < 0) {
					mouseLeft1 = -10;
					mouseTop1 = -10;
					return;
				}

				var xDim = plotWidCss,
					yDim = plotHgtCss,
					_xDim = _w,
					_yDim = _h,
					_xPos = _l,
					_yPos = _t;

				if (scaleX.ori == 1) {
					xDim = plotHgtCss;
					yDim = plotWidCss;
				}

				var ref = syncOpts.scales;
				var xKey = ref[0];
				var yKey = ref[1];

				if (src.scales[xKey].ori == 1) {
					_xDim = _h;
					_yDim = _w;
					_xPos = _t;
					_yPos = _l;
				}

				if (xKey != null)
					{ _l = getPos(src.posToVal(_xPos, xKey), scales[xKey], xDim, 0); }
				else
					{ _l = xDim * (_xPos/_xDim); }

				if (yKey != null)
					{ _t = getPos(src.posToVal(_yPos, yKey), scales[yKey], yDim, 0); }
				else
					{ _t = yDim * (_yPos/_yDim); }

				if (scaleX.ori == 1) {
					var _l$1 = _l;
					_l = _t;
					_t = _l$1;
				}
			}

			if (snap) {
				if (_l <= 1 || _l >= plotWidCss - 1)
					{ _l = incrRound(_l, plotWidCss); }

				if (_t <= 1 || _t >= plotHgtCss - 1)
					{ _t = incrRound(_t, plotHgtCss); }
			}

			if (initial) {
				rawMouseLeft0 = _l;
				rawMouseTop0 = _t;

				(assign = cursor.move(self, _l, _t), mouseLeft0 = assign[0], mouseTop0 = assign[1]);
			}
			else {
				mouseLeft1 = _l;
				mouseTop1 = _t;
			}
		}

		function hideSelect() {
			setSelect({
				width: 0,
				height: 0,
			}, false);
		}

		function mouseDown(e, src, _l, _t, _w, _h, _i) {
			dragging = true;
			dragX = dragY = drag._x = drag._y = false;

			cacheMouse(e, src, _l, _t, _w, _h, _i, true, false);

			if (e != null) {
				onMouse(mouseup, doc, mouseUp);
				sync.pub(mousedown, self, mouseLeft0, mouseTop0, plotWidCss, plotHgtCss, null);
			}
		}

		function mouseUp(e, src, _l, _t, _w, _h, _i) {
			dragging = drag._x = drag._y = false;

			cacheMouse(e, src, _l, _t, _w, _h, _i, false, true);

			var left = select.left;
			var top = select.top;
			var width = select.width;
			var height = select.height;

			var hasSelect = width > 0 || height > 0;

			hasSelect && setSelect(select);

			if (drag.setScale && hasSelect) {
			//	if (syncKey != null) {
			//		dragX = drag.x;
			//		dragY = drag.y;
			//	}

				var xOff = left,
					xDim = width,
					yOff = top,
					yDim = height;

				if (scaleX.ori == 1) {
					xOff = top,
					xDim = height,
					yOff = left,
					yDim = width;
				}

				if (dragX) {
					_setScale(xScaleKey,
						posToVal(xOff, xScaleKey),
						posToVal(xOff + xDim, xScaleKey)
					);
				}

				if (dragY) {
					for (var k in scales) {
						var sc = scales[k];

						if (k != xScaleKey && sc.from == null && sc.min != inf) {
							_setScale(k,
								posToVal(yOff + yDim, k),
								posToVal(yOff, k)
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

		function mouseLeave(e, src, _l, _t, _w, _h, _i) {
			if (!cursor._lock) {
				var _dragging = dragging;

				if (dragging) {
					// handle case when mousemove aren't fired all the way to edges by browser
					var snapH = true;
					var snapV = true;
					var snapProx = 10;

					var dragH, dragV;

					if (scaleX.ori == 0) {
						dragH = dragX;
						dragV = dragY;
					}
					else {
						dragH = dragY;
						dragV = dragX;
					}

					if (dragH && dragV) {
						// maybe omni corner snap
						snapH = mouseLeft1 <= snapProx || mouseLeft1 >= plotWidCss - snapProx;
						snapV = mouseTop1  <= snapProx || mouseTop1  >= plotHgtCss - snapProx;
					}

					if (dragH && snapH)
						{ mouseLeft1 = mouseLeft1 < mouseLeft0 ? 0 : plotWidCss; }

					if (dragV && snapV)
						{ mouseTop1 = mouseTop1 < mouseTop0 ? 0 : plotHgtCss; }

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

		function dblClick(e, src, _l, _t, _w, _h, _i) {
			autoScaleX();

			hideSelect();

			if (e != null)
				{ sync.pub(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null); }
		}

		// internal pub/sub
		var events = {};

		events.mousedown = mouseDown;
		events.mousemove = mouseMove;
		events.mouseup = mouseUp;
		events.dblclick = dblClick;
		events["setSeries"] = (e, src, idx, opts) => {
			setSeries(idx, opts);
		};

		var deb;

		if ( cursor.show) {
			onMouse(mousedown,  over, mouseDown);
			onMouse(mousemove,  over, mouseMove);
			onMouse(mouseenter, over, syncRect);
			onMouse(mouseleave, over, mouseLeave);

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
				hooks[evName].forEach(fn => {
					fn.call(null, self, a1, a2);
				});
			}
		}

		(opts.plugins || []).forEach(p => {
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

			_setSize(opts.width, opts.height);

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
	uPlot.orient   = orient;

	{
		uPlot.join = join;
	}

	{
		uPlot.fmtDate = fmtDate;
		uPlot.tzDate  = tzDate;
	}

	{
		uPlot.addGap = addGap;
		uPlot.clipGaps = clipGaps;

		var paths = uPlot.paths = {};

		 (paths.linear  = linear);
		 (paths.spline  = spline);
		 (paths.stepped = stepped);
		 (paths.bars    = bars);
	}

	return uPlot;

}());
