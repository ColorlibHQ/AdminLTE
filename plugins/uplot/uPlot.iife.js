/**
* Copyright (c) 2021, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uPlot.js (μPlot)
* A small, fast chart for time series, lines, areas, ohlc & bars
* https://github.com/leeoniya/uPlot (v1.6.15)
*/

var uPlot = (function () {
	'use strict';

	var FEAT_TIME          = true;

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
		var minSign = sign(min);

		var logFn = base == 10 ? log10 : log2;

		if (min == max) {
			if (minSign == -1) {
				min *= base;
				max /= base;
			}
			else {
				min /= base;
				max *= base;
			}
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
			minExp = floor(logFn(abs(min)));
			maxExp = floor(logFn(abs(max)));

			minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

			min = incrRoundDn(min, minMaxIncrs[0]);
			max = incrRoundUp(max, minMaxIncrs[1]);
		}

		return [min, max];
	}

	function rangeAsinh(min, max, base, fullMags) {
		var minMax = rangeLog(min, max, base, fullMags);

		if (min == 0)
			{ minMax[0] = 0; }

		if (max == 0)
			{ minMax[1] = 0; }

		return minMax;
	}

	var rangePad = 0.1;

	var autoRangePart = {
		mode: 3,
		pad: rangePad,
	};

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

		// this handles situations like 89.7, 89.69999999999999
		// by assuming 0.001x deltas are precision errors
	//	if (delta > 0 && delta < abs(_max) / 1e3)
	//		delta = 0;

		// treat data as flat if delta is less than 1 billionth
		if (delta < 1e-9) {
			delta = 0;

			// if soft mode is 2 and all vals are flat at 0, avoid the 0.1 * 1e3 fallback
			// this prevents 0,0,0 from ranging to -100,100 when softMin/softMax are -1,1
			if (_min == 0 || _max == 0) {
				delta = 1e-9;

				if (softMinMode == 2 && softMin != inf)
					{ padMin = 0; }

				if (softMaxMode == 2 && softMax != -inf)
					{ padMax = 0; }
			}
		}

		var nonZeroDelta = delta || abs(_max) || 1e3;
		var mag          = log10(nonZeroDelta);
		var base         = pow(10, floor(mag));

		var _padMin  = nonZeroDelta * (delta == 0 ? (_min == 0 ? .1 : 1) : padMin);
		var _newMin  = roundDec(incrRoundDn(_min - _padMin, base/10), 9);
		var _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 3 && _newMin <= softMin || softMinMode == 2 && _newMin >= softMin) ? softMin : inf;
		var minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

		var _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
		var _newMax  = roundDec(incrRoundUp(_max + _padMax, base/10), 9);
		var _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 3 && _newMax >= softMax || softMaxMode == 2 && _newMax <= softMax) ? softMax : -inf;
		var maxLim   = min(hardMax, _newMax > _softMax && _max <= _softMax ? _softMax : max(_softMax, _newMax));

		if (minLim == maxLim && minLim == 0)
			{ maxLim = 100; }

		return [minLim, maxLim];
	}

	// alternative: https://stackoverflow.com/a/2254896
	var fmtNum = new Intl.NumberFormat(navigator.language).format;

	var M = Math;

	var PI = M.PI;
	var abs = M.abs;
	var floor = M.floor;
	var round = M.round;
	var ceil = M.ceil;
	var min = M.min;
	var max = M.max;
	var pow = M.pow;
	var sign = M.sign;
	var log10 = M.log10;
	var log2 = M.log2;
	var sinh =  (v, linthresh) => {
		if ( linthresh === void 0 ) linthresh = 1;

		return M.sinh(v / linthresh);
	};
	var asinh = (v, linthresh) => {
		if ( linthresh === void 0 ) linthresh = 1;

		return M.asinh(v / linthresh);
	};

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

	var retArg0 = _0 => _0;

	var retArg1 = (_0, _1) => _1;

	var retNull = _ => null;

	var retTrue = _ => true;

	var retEq = (a, b) => a == b;

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

	var nullNullTuple = [null, null];

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

	function fastIsObj(v) {
		return v != null && typeof v == 'object';
	}

	function copy(o, _isObj) {
		_isObj = _isObj || isObj;

		var out;

		if (isArr(o))
			{ out = o.map(v => copy(v, _isObj)); }
		else if (_isObj(o)) {
			out = {};
			for (var k in o)
				{ out[k] = copy(o[k], _isObj); }
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

					if (yVal === null) {
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

	var change      = "change";
	var ddpxchange  = "dppxchange";

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
	var pxRatio;

	var query;

	function setPxRatio() {
		pxRatio = devicePixelRatio;

		query && off(change, query, setPxRatio);
		query = matchMedia(("screen and (min-resolution: " + (pxRatio - 0.001) + "dppx) and (max-resolution: " + (pxRatio + 0.001) + "dppx)"));
		on(change, query, setPxRatio);

		win.dispatchEvent(new CustomEvent(ddpxchange));
	}

	function addClass(el, c) {
		if (c != null) {
			var cl = el.classList;
			!cl.contains(c) && cl.add(c);
		}
	}

	function remClass(el, c) {
		var cl = el.classList;
		cl.contains(c) && cl.remove(c);
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

	var xformCache = new WeakMap();

	function trans(el, xPos, yPos, xMax, yMax) {
		var xform = "translate(" + xPos + "px," + yPos + "px)";
		var xformOld = xformCache.get(el);

		if (xform != xformOld) {
			el.style.transform = xform;
			xformCache.set(el, xform);

			if (xPos < 0 || yPos < 0 || xPos > xMax || yPos > yMax)
				{ addClass(el, OFF); }
			else
				{ remClass(el, OFF); }
		}
	}

	var colorCache = new WeakMap();

	function color(el, background, borderColor) {
		var newColor = background + borderColor;
		var oldColor = colorCache.get(el);

		if (newColor != oldColor) {
			colorCache.set(el, newColor);
			el.style.background = background;
			el.style.borderColor = borderColor;
		}
	}

	var evOpts = {passive: true};
	var evOpts2 = assign({capture: true}, evOpts);

	function on(ev, el, cb, capt) {
		el.addEventListener(ev, cb, capt ? evOpts2 : evOpts);
	}

	function off(ev, el, cb, capt) {
		el.removeEventListener(ev, cb, capt ? evOpts2 : evOpts);
	}

	setPxRatio();

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

	var days3 = days.map(slice3);

	var months3 = months.map(slice3);

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

	var subs = {
		// 2019
		YYYY:	d => d.getFullYear(),
		// 19
		YY:		d => (d.getFullYear()+'').slice(2),
		// July
		MMMM:	(d, names) => names.MMMM[d.getMonth()],
		// Jul
		MMM:	(d, names) => names.MMM[d.getMonth()],
		// 07
		MM:		d => zeroPad2(d.getMonth()+1),
		// 7
		M:		d => d.getMonth()+1,
		// 09
		DD:		d => zeroPad2(d.getDate()),
		// 9
		D:		d => d.getDate(),
		// Monday
		WWWW:	(d, names) => names.WWWW[d.getDay()],
		// Mon
		WWW:	(d, names) => names.WWW[d.getDay()],
		// 03
		HH:		d => zeroPad2(d.getHours()),
		// 3
		H:		d => d.getHours(),
		// 9 (12hr, unpadded)
		h:		d => {var h = d.getHours(); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
		// AM
		AA:		d => d.getHours() >= 12 ? 'PM' : 'AM',
		// am
		aa:		d => d.getHours() >= 12 ? 'pm' : 'am',
		// a
		a:		d => d.getHours() >= 12 ? 'p' : 'a',
		// 09
		mm:		d => zeroPad2(d.getMinutes()),
		// 9
		m:		d => d.getMinutes(),
		// 09
		ss:		d => zeroPad2(d.getSeconds()),
		// 9
		s:		d => d.getSeconds(),
		// 374
		fff:	d => zeroPad3(d.getMilliseconds()),
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
		if (tz == 'UTC' || tz == 'Etc/UTC')
			{ date2 = new Date(+date + date.getTimezoneOffset() * 6e4); }
		else if (tz == localTz)
			{ date2 = date; }
		else {
			date2 = new Date(date.toLocaleString('en-US', {timeZone: tz}));
			date2.setMilliseconds(date.getMilliseconds());
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
				var minDateTs = roundDec(minDate * ms, 3);

				// get ts of 12am (this lands us at or before the original scaleMin)
				var minMin = mkDate(minDate.getFullYear(), isYr ? 0 : minDate.getMonth(), isMo || isYr ? 1 : minDate.getDate());
				var minMinTs = roundDec(minMin * ms, 3);

				if (isMo || isYr) {
					var moIncr = isMo ? foundIncr / mo : 0;
					var yrIncr = isYr ? foundIncr / y  : 0;
				//	let tzOffset = scaleMin - minDateTs;		// needed?
					var split = minDateTs == minMinTs ? minDateTs : roundDec(mkDate(minMin.getFullYear() + yrIncr, minMin.getMonth() + moIncr, 1) * ms, 3);
					var splitDate = new Date(round(split / ms));
					var baseYear = splitDate.getFullYear();
					var baseMonth = splitDate.getMonth();

					for (var i = 0; split <= scaleMax; i++) {
						var next = mkDate(baseYear + yrIncr * i, baseMonth + moIncr * i, 1);
						var offs = next - tzDate(roundDec(next * ms, 3));

						split = roundDec((+next + offs) * ms, 3);

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

					var prevHour = date0.getHours() + (date0.getMinutes() / m) + (date0.getSeconds() / h);
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

	var ref = genTimeStuffs(1);
	var timeIncrsMs = ref[0];
	var _timeAxisStampsMs = ref[1];
	var timeAxisSplitsMs = ref[2];
	var ref$1 = genTimeStuffs(1e-3);
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

				var newYear = date.getFullYear();
				var newMnth = date.getMonth();
				var newDate = date.getDate();
				var newHour = date.getHours();
				var newMins = date.getMinutes();
				var newSecs = date.getSeconds();

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

	function legendStroke(self, seriesIdx) {
		var s = self.series[seriesIdx];
		return s.width ? s.stroke(self, seriesIdx) : s.points.width ? s.points.stroke(self, seriesIdx) : null;
	}

	function legendFill(self, seriesIdx) {
		return self.series[seriesIdx].fill(self, seriesIdx);
	}

	var legendOpts = {
		show: true,
		live: true,
		isolate: false,
		markers: {
			show: true,
			width: 2,
			stroke: legendStroke,
			fill: legendFill,
			dash: "solid",
		},
		idx: null,
		idxs: null,
		values: [],
	};

	function cursorPointShow(self, si) {
		var o = self.cursor.points;

		var pt = placeDiv();

		var size = o.size(self, si);
		setStylePx(pt, WIDTH, size);
		setStylePx(pt, HEIGHT, size);

		var mar = size / -2;
		setStylePx(pt, "marginLeft", mar);
		setStylePx(pt, "marginTop", mar);

		var width = o.width(self, si, size);
		width && setStylePx(pt, "borderWidth", width);

		return pt;
	}

	function cursorPointFill(self, si) {
		var sp = self.series[si].points;
		return sp._fill || sp._stroke;
	}

	function cursorPointStroke(self, si) {
		var sp = self.series[si].points;
		return sp._stroke || sp._fill;
	}

	function cursorPointSize(self, si) {
		var sp = self.series[si].points;
		return ptDia(sp.width, 1);
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
		idxs: null,
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
		labelGap: 0,
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

	// this doesnt work for sin, which needs to come off from 0 independently in pos and neg dirs
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

	function asinhAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
		var sc = self.scales[self.axes[axisIdx].scale];

		var linthresh = sc.asinh;

		var posSplits = scaleMax > linthresh ? logAxisSplits(self, axisIdx, max(linthresh, scaleMin), scaleMax, foundIncr) : [linthresh];
		var zero = scaleMax >= 0 && scaleMin <= 0 ? [0] : [];
		var negSplits = scaleMin < -linthresh ? logAxisSplits(self, axisIdx, max(linthresh, -scaleMax), -scaleMin, foundIncr): [linthresh];

		return negSplits.reverse().map(v => -v).concat(zero, posSplits);
	}

	var RE_ALL   = /./;
	var RE_12357 = /[12357]/;
	var RE_125   = /[125]/;
	var RE_1     = /1/;

	function logAxisValsFilt(self, splits, axisIdx, foundSpace, foundIncr) {
		var axis = self.axes[axisIdx];
		var scaleKey = axis.scale;
		var sc = self.scales[scaleKey];

		if (sc.distr == 3 && sc.log == 2)
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

		return splits.map(v => ((sc.distr == 4 && v == 0) || re.test(v)) ? v : null);
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
		labelGap: 0,
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

	function seriesPointsShow(self, si) {
		var ref = self.series[0];
		var scale = ref.scale;
		var idxs = ref.idxs;
		var xData = self._data[0];
		var p0 = self.valToPos(xData[idxs[0]], scale, true);
		var p1 = self.valToPos(xData[idxs[1]], scale, true);
		var dim = abs(p1 - p0);

		var s = self.series[si];
	//	const dia = ptDia(s.width, pxRatio);
		var maxPts = dim / (s.points.space * pxRatio);
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
		spanGaps: false,
		gaps: (self, seriesIdx, idx0, idx1, nullGaps) => nullGaps,
		alpha: 1,
		points: {
			show: seriesPointsShow,
			filter: null,
		//  paths:
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
		asinh: 1,
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

	function _sync(key, opts) {
		var s = syncs[key];

		if (!s) {
			s = {
				key: key,
				plots: [],
				sub: function sub(plot) {
					s.plots.push(plot);
				},
				unsub: function unsub(plot) {
					s.plots = s.plots.filter(c => c != plot);
				},
				pub: function pub(type, self, x, y, w, h, i) {
					for (var j = 0; j < s.plots.length; j++)
						{ s.plots[j] != self && s.plots[j].pub(type, self, x, y, w, h, i); }
				},
			};

			if (key != null)
				{ syncs[key] = s; }
		}

		return s;
	}

	var BAND_CLIP_FILL   = 1 << 0;
	var BAND_CLIP_STROKE = 1 << 1;

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

				if (g[1] > g[0]) {
					rect(clip, prevGapEnd, plotTop, g[0] - prevGapEnd, plotTop + plotHgt);

					prevGapEnd = g[1];
				}
			}

			rect(clip, prevGapEnd, plotTop, plotLft + plotWid - prevGapEnd, plotTop + plotHgt);
		}

		return clip;
	}

	function addGap(gaps, fromX, toX) {
		var prevGap = gaps[gaps.length - 1];

		if (prevGap && prevGap[0] == fromX)			// TODO: gaps must be encoded at stroke widths?
			{ prevGap[1] = toX; }
		else
			{ gaps.push([fromX, toX]); }
	}

	function pxRoundGen(pxAlign) {
		return pxAlign == 0 ? retArg0 : pxAlign == 1 ? round : v => incrRound(v, pxAlign);
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

	// TODO: drawWrap(seriesIdx, drawPoints) (save, restore, translate, clip)
	function points(opts) {
		return (u, seriesIdx, idx0, idx1, filtIdxs) => {
		//	log("drawPoints()", arguments);

			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var pxRound = series.pxRound;
				var points = series.points;

				var moveTo, arc;

				if (scaleX.ori == 0) {
					moveTo = moveToH;
					arc = arcH;
				}
				else {
					moveTo = moveToV;
					arc = arcV;
				}

				var width = roundDec(points.width * pxRatio, 3);

				var rad = (points.size - points.width) / 2 * pxRatio;
				var dia = roundDec(rad * 2, 3);

				var fill = new Path2D();
				var clip = new Path2D();

				var ref = u.bbox;
				var lft = ref.left;
				var top = ref.top;
				var wid = ref.width;
				var hgt = ref.height;

				rectH(clip,
					lft - dia,
					top - dia,
					wid + dia * 2,
					hgt + dia * 2
				);

				var drawPoint = pi => {
					if (dataY[pi] != null) {
						var x = pxRound(valToPosX(dataX[pi], scaleX, xDim, xOff));
						var y = pxRound(valToPosY(dataY[pi], scaleY, yDim, yOff));

						moveTo(fill, x + rad, y);
						arc(fill, x, y, rad, 0, PI * 2);
					}
				};

				if (filtIdxs)
					{ filtIdxs.forEach(drawPoint); }
				else {
					for (var pi = idx0; pi <= idx1; pi++)
						{ drawPoint(pi); }
				}

				return {
					stroke: width > 0 ? fill : null,
					fill: fill,
					clip: clip,
					flags: BAND_CLIP_FILL | BAND_CLIP_STROKE,
				};
			});
		};
	}

	function _drawAcc(lineTo) {
		return (stroke, accX, minY, maxY, inY, outY) => {
			if (minY != maxY) {
				if (inY != minY && outY != minY)
					{ lineTo(stroke, accX, minY); }
				if (inY != maxY && outY != maxY)
					{ lineTo(stroke, accX, maxY); }

				lineTo(stroke, accX, outY);
			}
		};
	}

	var drawAccH = _drawAcc(lineToH);
	var drawAccV = _drawAcc(lineToV);

	function linear() {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var pxRound = series.pxRound;

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

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				var stroke = _paths.stroke;

				var minY = inf,
					maxY = -inf,
					inY, outY, outX, drawnAtX;

				var gaps = [];

				var accX = pxRound(valToPosX(dataX[dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				var accGaps = false;
				var prevYNull = false;

				// data edges
				var lftIdx = nonNullIdx(dataY, idx0, idx1,  1 * dir);
				var rgtIdx = nonNullIdx(dataY, idx0, idx1, -1 * dir);
				var lftX = incrRound(valToPosX(dataX[lftIdx], scaleX, xDim, xOff), 0.5);
				var rgtX = incrRound(valToPosX(dataX[rgtIdx], scaleX, xDim, xOff), 0.5);

				if (lftX > xOff)
					{ addGap(gaps, xOff, lftX); }

				for (var i = dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += dir) {
					var x = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

					if (x == accX) {
						if (dataY[i] != null) {
							outY = pxRound(valToPosY(dataY[i], scaleY, yDim, yOff));

							if (minY == inf) {
								lineTo(stroke, x, outY);
								inY = outY;
							}

							minY = min(outY, minY);
							maxY = max(outY, maxY);
						}
						else if (dataY[i] === null)
							{ accGaps = prevYNull = true; }
					}
					else {
						var _addGap = false;

						if (minY != inf) {
							drawAcc(stroke, accX, minY, maxY, inY, outY);
							outX = drawnAtX = accX;
						}
						else if (accGaps) {
							_addGap = true;
							accGaps = false;
						}

						if (dataY[i] != null) {
							outY = pxRound(valToPosY(dataY[i], scaleY, yDim, yOff));
							lineTo(stroke, x, outY);
							minY = maxY = inY = outY;

							// prior pixel can have data but still start a gap if ends with null
							if (prevYNull && x - accX > 1)
								{ _addGap = true; }

							prevYNull = false;
						}
						else {
							minY = inf;
							maxY = -inf;

							if (dataY[i] === null) {
								accGaps = true;

								if (x - accX > 1)
									{ _addGap = true; }
							}
						}

						_addGap && addGap(gaps, outX, x);

						accX = x;
					}
				}

				if (minY != inf && minY != maxY && drawnAtX != accX)
					{ drawAcc(stroke, accX, minY, maxY, inY, outY); }

				if (rgtX < xOff + xDim)
					{ addGap(gaps, rgtX, xOff + xDim); }

				if (series.fill != null) {
					var fill = _paths.fill = new Path2D(stroke);

					var fillTo = pxRound(valToPosY(series.fillTo(u, seriesIdx, series.min, series.max), scaleY, yDim, yOff));

					lineTo(fill, rgtX, fillTo);
					lineTo(fill, lftX, fillTo);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

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

	function stepped(opts) {
		var align = ifNull(opts.align, 1);
		// whether to draw ascenders/descenders at null/gap bondaries
		var ascDesc = ifNull(opts.ascDesc, false);

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var pxRound = series.pxRound;

				var lineTo = scaleX.ori == 0 ? lineToH : lineToV;

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				var stroke = _paths.stroke;

				var _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				idx0 = nonNullIdx(dataY, idx0, idx1,  1);
				idx1 = nonNullIdx(dataY, idx0, idx1, -1);

				var gaps = [];
				var inGap = false;
				var prevYPos  = pxRound(valToPosY(dataY[_dir == 1 ? idx0 : idx1], scaleY, yDim, yOff));
				var firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				var prevXPos = firstXPos;

				lineTo(stroke, firstXPos, prevYPos);

				for (var i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					var yVal1 = dataY[i];

					var x1 = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

					if (yVal1 == null) {
						if (yVal1 === null) {
							addGap(gaps, prevXPos, x1);
							inGap = true;
						}
						continue;
					}

					var y1 = pxRound(valToPosY(yVal1, scaleY, yDim, yOff));

					if (inGap) {
						addGap(gaps, prevXPos, x1);

						// don't clip vertical extenders
						if (prevYPos != y1) {
							var halfStroke = (series.width * pxRatio) / 2;

							var lastGap = gaps[gaps.length - 1];

							lastGap[0] += (ascDesc || align ==  1) ? halfStroke : -halfStroke;
							lastGap[1] -= (ascDesc || align == -1) ? halfStroke : -halfStroke;
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
					var minY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

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
		var size = ifNull(opts.size, [0.6, inf, 1]);
		var align = opts.align || 0;
		var extraGap = (opts.gap || 0) * pxRatio;

		var gapFactor = 1 - size[0];
		var maxWidth  = ifNull(size[1], inf) * pxRatio;
		var minWidth  = ifNull(size[2], 1) * pxRatio;

		var disp = opts.disp;
		var _each = ifNull(opts.each, _ => {});

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var pxRound = series.pxRound;

				var _dirX = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
				var _dirY = scaleY.dir * (scaleY.ori == 1 ? 1 : -1);

				var rect = scaleX.ori == 0 ? rectH : rectV;

				var each = scaleX.ori == 0 ? _each : (u, seriesIdx, i, top, lft, hgt, wid) => {
					_each(u, seriesIdx, i, lft, top, wid, hgt);
				};

				var fillToY = series.fillTo(u, seriesIdx, series.min, series.max);

				var y0Pos = valToPosY(fillToY, scaleY, yDim, yOff);

				var xShift, barWid;

				var strokeWidth = pxRound(series.width * pxRatio);

				if (disp != null) {
					dataX = disp.x0.values(u, seriesIdx, idx0, idx1);

					if (disp.x0.unit == 2)
						{ dataX = dataX.map(pct => u.posToVal(xOff + pct * xDim, scaleX.key, true)); }

					// assumes uniform sizes, for now
					var sizes = disp.size.values(u, seriesIdx, idx0, idx1);

					if (disp.size.unit == 2)
						{ barWid = sizes[0] * xDim; }
					else
						{ barWid = valToPosX(sizes[0], scaleX, xDim, xOff) - valToPosX(0, scaleX, xDim, xOff); } // assumes linear scale (delta from 0)

					barWid = pxRound(barWid - strokeWidth);

					xShift = (_dirX == 1 ? -strokeWidth / 2 : barWid + strokeWidth / 2);
				}
				else {
					var colWid = xDim;

					if (dataX.length > 1) {
						// scan full dataset for smallest adjacent delta
						// will not work properly for non-linear x scales, since does not do expensive valToPosX calcs till end
						for (var i = 1, minDelta = Infinity; i < dataX.length; i++) {
							var delta = abs(dataX[i] - dataX[i-1]);

							if (delta < minDelta) {
								minDelta = delta;
								colWid = abs(valToPosX(dataX[i], scaleX, xDim, xOff) - valToPosX(dataX[i-1], scaleX, xDim, xOff));
							}
						}
					}

					var gapWid = colWid * gapFactor;

					barWid = pxRound(min(maxWidth, max(minWidth, colWid - gapWid)) - strokeWidth - extraGap);

					xShift = (align == 0 ? barWid / 2 : align == _dirX ? 0 : barWid) - align * _dirX * extraGap / 2;
				}

				var _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL | BAND_CLIP_STROKE};  // disp, geom

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

				for (var i$1 = _dirX == 1 ? idx0 : idx1; i$1 >= idx0 && i$1 <= idx1; i$1 += _dirX) {
					var yVal = dataY[i$1];

					// interpolate upwards band clips
					if (yVal == null) {
						if (hasBands) {
							// simple, but inefficient bi-directinal linear scans on each iteration
							var prevNonNull = nonNullIdx(dataY, _dirX == 1 ? idx0 : idx1, i$1, -_dirX);
							var nextNonNull = nonNullIdx(dataY, i$1, _dirX == 1 ? idx1 : idx0,  _dirX);

							var prevVal = dataY[prevNonNull];
							var nextVal = dataY[nextNonNull];

							yVal = prevVal + (i$1 - prevNonNull) / (nextNonNull - prevNonNull) * (nextVal - prevVal);
						}
						else
							{ continue; }
					}

					var xVal = scaleX.distr != 2 || disp != null ? dataX[i$1] : i$1;

					// TODO: all xPos can be pre-computed once for all series in aligned set
					var xPos = valToPosX(xVal, scaleX, xDim, xOff);
					var yPos = valToPosY(yVal, scaleY, yDim, yOff);

					var lft = pxRound(xPos - xShift);
					var btm = pxRound(max(yPos, y0Pos));
					var top = pxRound(min(yPos, y0Pos));
					var barHgt = btm - top;

					if (dataY[i$1] != null) {
						rect(stroke, lft, top, barWid, barHgt);

						each(u, seriesIdx, i$1,
							lft    - strokeWidth / 2,
							top    - strokeWidth / 2,
							barWid + strokeWidth,
							barHgt + strokeWidth
						);
					}

					if (hasBands) {
						if (_dirY == 1) {
							btm = top;
							top = yLimit;
						}
						else {
							top = btm;
							btm = yLimit;
						}

						barHgt = btm - top;

						rect(band, lft - strokeWidth / 2, top + strokeWidth / 2, barWid + strokeWidth, barHgt - strokeWidth);
					}
				}

				if (series.fill != null)
					{ _paths.fill = new Path2D(stroke); }

				return _paths;
			});
		};
	}

	function splineInterp(interp, opts) {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				var pxRound = series.pxRound;

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
				var firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
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

				var _paths = {stroke: interp(xCoords, yCoords, moveTo, lineTo, bezierCurveTo, pxRound), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				var stroke = _paths.stroke;

				if (series.fill != null && stroke != null) {
					var fill = _paths.fill = new Path2D(stroke);

					var fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
					var minY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

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

	function monotoneCubic(opts) {
		return splineInterp(_monotoneCubic);
	}

	// Monotone Cubic Spline interpolation, adapted from the Chartist.js implementation:
	// https://github.com/gionkunz/chartist-js/blob/e7e78201bffe9609915e5e53cfafa29a5d6c49f9/src/scripts/interpolation.js#L240-L369
	function _monotoneCubic(xs, ys, moveTo, lineTo, bezierCurveTo, pxRound) {
		var n = xs.length;

		if (n < 2)
			{ return null; }

		var path = new Path2D();

		moveTo(path, xs[0], ys[0]);

		if (n == 2)
			{ lineTo(path, xs[1], ys[1]); }
		else {
			var ms  = Array(n),
				ds  = Array(n - 1),
				dys = Array(n - 1),
				dxs = Array(n - 1);

			// calc deltas and derivative
			for (var i = 0; i < n - 1; i++) {
				dys[i] = ys[i + 1] - ys[i];
				dxs[i] = xs[i + 1] - xs[i];
				ds[i]  = dys[i] / dxs[i];
			}

			// determine desired slope (m) at each point using Fritsch-Carlson method
			// http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation
			ms[0] = ds[0];

			for (var i$1 = 1; i$1 < n - 1; i$1++) {
				if (ds[i$1] === 0 || ds[i$1 - 1] === 0 || (ds[i$1 - 1] > 0) !== (ds[i$1] > 0))
					{ ms[i$1] = 0; }
				else {
					ms[i$1] = 3 * (dxs[i$1 - 1] + dxs[i$1]) / (
						(2 * dxs[i$1] + dxs[i$1 - 1]) / ds[i$1 - 1] +
						(dxs[i$1] + 2 * dxs[i$1 - 1]) / ds[i$1]
					);

					if (!isFinite(ms[i$1]))
						{ ms[i$1] = 0; }
				}
			}

			ms[n - 1] = ds[n - 2];

			for (var i$2 = 0; i$2 < n - 1; i$2++) {
				bezierCurveTo(
					path,
					xs[i$2] + dxs[i$2] / 3,
					ys[i$2] + ms[i$2] * dxs[i$2] / 3,
					xs[i$2 + 1] - dxs[i$2] / 3,
					ys[i$2 + 1] - ms[i$2 + 1] * dxs[i$2] / 3,
					xs[i$2 + 1],
					ys[i$2 + 1]
				);
			}
		}

		return path;
	}

	var cursorPlots = new Set();

	function invalidateRects() {
		cursorPlots.forEach(u => {
			u.syncRect(true);
		});
	}

	on(resize, win, invalidateRects);
	on(scroll, win, invalidateRects, true);

	var linearPath = linear() ;
	var pointsPath = points() ;

	function setDefaults(d, xo, yo, initY) {
		var d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
		return d2.map((o, i) => setDefault(o, i, xo, yo));
	}

	function setDefault(o, i, xo, yo) {
		return assign({}, (i == 0 ? xo : yo), o);
	}

	function snapNumX(self, dataMin, dataMax) {
		return dataMin == null ? nullNullTuple : [dataMin, dataMax];
	}

	var snapTimeX = snapNumX;

	// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
	// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
	function snapNumY(self, dataMin, dataMax) {
		return dataMin == null ? nullNullTuple : rangeNum(dataMin, dataMax, rangePad, true);
	}

	function snapLogY(self, dataMin, dataMax, scale) {
		return dataMin == null ? nullNullTuple : rangeLog(dataMin, dataMax, self.scales[scale].log, false);
	}

	var snapLogX = snapLogY;

	function snapAsinhY(self, dataMin, dataMax, scale) {
		return dataMin == null ? nullNullTuple : rangeAsinh(dataMin, dataMax, self.scales[scale].log, false);
	}

	var snapAsinhX = snapAsinhY;

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
		var fontSize, fontSizeCss;
		font = font.replace(/(\d+)px/, (m, p1) => (fontSize = round((fontSizeCss = +p1) * pxRatio)) + 'px');
		return [font, fontSize, fontSizeCss];
	}

	function syncFontSize(axis) {
		if (axis.show) {
			[axis.font, axis.labelFont].forEach(f => {
				var size = roundDec(f[2] * pxRatio, 1);
				f[0] = f[0].replace(/[0-9.]+px/, size + 'px');
				f[1] = size;
			});
		}
	}

	function uPlot(opts, data, then) {
		var self = {};

		// TODO: cache denoms & mins scale.cache = {r, min, }
		function getValPct(val, scale) {
			var _val = (
				scale.distr == 3 ? log10(val > 0 ? val : scale.clamp(self, val, scale.min, scale.max, scale.key)) :
				scale.distr == 4 ? asinh(val, scale.asinh) :
				val
			);

			return (_val - scale._min) / (scale._max - scale._min);
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
		var under = self.under = placeDiv(UNDER, wrap);
		wrap.appendChild(can);
		var over = self.over = placeDiv(OVER, wrap);

		opts = copy(opts);

		var pxAlign = +ifNull(opts.pxAlign, 1);

		var pxRound = pxRoundGen(pxAlign);

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

					var isTime = sc.time;

					var rn = sc.range;

					var rangeIsArr = isArr(rn);

					if (scaleKey != xScaleKey) {
						// if range array has null limits, it should be auto
						if (rangeIsArr && (rn[0] == null || rn[1] == null)) {
							rn = {
								min: rn[0] == null ? autoRangePart : {
									mode: 1,
									hard: rn[0],
									soft: rn[0],
								},
								max: rn[1] == null ? autoRangePart : {
									mode: 1,
									hard: rn[1],
									soft: rn[1],
								},
							};
							rangeIsArr = false;
						}

						if (!rangeIsArr && isObj(rn)) {
							var cfg = rn;
							// this is similar to snapNumY
							rn = (self, dataMin, dataMax) => dataMin == null ? nullNullTuple : rangeNum(dataMin, dataMax, cfg);
						}
					}

					sc.range = fnOrSelf(rn || (isTime ? snapTimeX : scaleKey == xScaleKey ?
						(sc.distr == 3 ? snapLogX : sc.distr == 4 ? snapAsinhX : snapNumX) :
						(sc.distr == 3 ? snapLogY : sc.distr == 4 ? snapAsinhY : snapNumY)
					));

					sc.auto = fnOrSelf(rangeIsArr ? false : sc.auto);

					sc.clamp = fnOrSelf(sc.clamp || clampScale);

					// caches for expensive ops like asinh() & log()
					sc._min = sc._max = null;
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

		var valToPosX, valToPosY;

		if (scaleX.ori == 0) {
			addClass(root, ORI_HZ);
			valToPosX = getHPos;
			valToPosY = getVPos;
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

			if (sc.min != null || sc.max != null) {
				pendScales[k$1] = {min: sc.min, max: sc.max};
				sc.min = sc.max = null;
			}
		}

	//	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
		var _tzDate  = (opts.tzDate || (ts => new Date(round(ts / ms))));
		var _fmtDate = (opts.fmtDate || fmtDate);

		var _timeAxisSplits = (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
		var _timeAxisVals   = timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
		var _timeSeriesVal  = timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

		var activeIdxs = [];

		var legend     = (self.legend = assign({}, legendOpts, opts.legend));
		var showLegend = legend.show;
		var markers    = legend.markers;

		{
			legend.idxs = activeIdxs;

			markers.width  = fnOrSelf(markers.width);
			markers.dash   = fnOrSelf(markers.dash);
			markers.stroke = fnOrSelf(markers.stroke);
			markers.fill   = fnOrSelf(markers.fill);
		}

		var legendEl;
		var legendRows = [];
		var legendCells = [];
		var legendCols;
		var multiValLegend = false;
		var NULL_LEGEND_VALUES = {};

		if (legend.live) {
			var getMultiVals = series[1] ? series[1].values : null;
			multiValLegend = getMultiVals != null;
			legendCols = multiValLegend ? getMultiVals(self, 1, 0) : {_: 0};

			for (var k$2 in legendCols)
				{ NULL_LEGEND_VALUES[k$2] = "--"; }
		}

		if (showLegend) {
			legendEl = placeTag("table", LEGEND, root);

			if (multiValLegend) {
				var head = placeTag("tr", LEGEND_THEAD, legendEl);
				placeTag("th", null, head);

				for (var key in legendCols)
					{ placeTag("th", LEGEND_LABEL, head).textContent = key; }
			}
			else {
				addClass(legendEl, LEGEND_INLINE);
				legend.live && addClass(legendEl, LEGEND_LIVE);
			}
		}

		var son  = {show: true};
		var soff = {show: false};

		function initLegendRow(s, i) {
			if (i == 0 && (multiValLegend || !legend.live))
				{ return nullNullTuple; }

			var cells = [];

			var row = placeTag("tr", LEGEND_SERIES, legendEl, legendEl.childNodes[i]);

			addClass(row, s.class);

			if (!s.show)
				{ addClass(row, OFF); }

			var label = placeTag("th", null, row);

			if (markers.show) {
				var indic = placeDiv(LEGEND_MARKER, label);

				if (i > 0) {
					var width  = markers.width(self, i);

					if (width)
						{ indic.style.border = width + "px " + markers.dash(self, i) + " " + markers.stroke(self, i); }

					indic.style.background = markers.fill(self, i);
				}
			}

			var text = placeDiv(LEGEND_LABEL, label);
			text.textContent = s.label;

			if (i > 0) {
				if (!markers.show)
					{ text.style.color = s.width > 0 ? markers.stroke(self, i) : markers.fill(self, i); }

				onMouse("click", label, e => {
					if (cursor._lock)
						{ return; }

					var seriesIdx = series.indexOf(s);

					if (e.ctrlKey != legend.isolate) {
						// if any other series is shown, isolate this one. else show all
						var isolate = series.some((s, i) => i > 0 && i != seriesIdx && s.show);

						series.forEach((s, i) => {
							i > 0 && setSeries(i, isolate ? (i == seriesIdx ? son : soff) : son, syncOpts.setSeries);
						});
					}
					else
						{ setSeries(seriesIdx, {show: !s.show}, syncOpts.setSeries); }
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
				cells.push(v);
			}

			return [row, cells];
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

			for (var k in targListeners) {
				if (ev == null || k == ev) {
					off(k, targ, targListeners[k]);
					delete targListeners[k];
				}
			}

			if (ev == null)
				{ mouseListeners.delete(targ); }
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

		function _setSize(width, height, force) {
			if (force || (width != self.width || height != self.height))
				{ calcSize(width, height); }

			resetYSeries(false);

			shouldConvergeSize = true;
			shouldSetSize = true;
			shouldSetCursor = shouldSetLegend = cursor.left >= 0;
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

		// ensures size calc convergence
		var CYCLE_LIMIT = 3;

		function convergeSize() {
			var converged = false;

			var cycleNum = 0;

			while (!converged) {
				cycleNum++;

				var axesConverged = axesCalc(cycleNum);
				var paddingConverged = paddingCalc(cycleNum);

				converged = cycleNum == CYCLE_LIMIT || (axesConverged && paddingConverged);

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

		var cursor = (self.cursor = assign({}, cursorOpts, opts.cursor));

		{
			cursor.idxs = activeIdxs;

			cursor._lock = false;

			var points = cursor.points;

			points.show   = fnOrSelf(points.show);
			points.size   = fnOrSelf(points.size);
			points.stroke = fnOrSelf(points.stroke);
			points.width  = fnOrSelf(points.width);
			points.fill   = fnOrSelf(points.fill);
		}

		var focus = self.focus = assign({}, opts.focus || {alpha: 0.3}, cursor.focus);
		var cursorFocus = focus.prox >= 0;

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
			var isTime = scales[s.scale].time;

			var sv = s.value;
			s.value = isTime ? (isStr(sv) ? timeSeriesVal(_tzDate, timeSeriesStamp(sv, _fmtDate)) : sv || _timeSeriesVal) : sv || numSeriesVal;
			s.label = s.label || (isTime ? timeSeriesLabel : numSeriesLabel);

			if (i > 0) {
				s.width  = s.width == null ? 1 : s.width;
				s.paths  = s.paths || linearPath || retNull;
				s.fillTo = fnOrSelf(s.fillTo || seriesFillTo);
				s.pxAlign = +ifNull(s.pxAlign, pxAlign);
				s.pxRound = pxRoundGen(s.pxAlign);

				s.stroke = fnOrSelf(s.stroke || null);
				s.fill   = fnOrSelf(s.fill || null);
				s._stroke = s._fill = s._paths = s._focus = null;

				var _ptDia = ptDia(s.width, 1);
				var points = s.points = assign({}, {
					size: _ptDia,
					width: max(1, _ptDia * .2),
					stroke: s.stroke,
					space: _ptDia * 2,
					paths: pointsPath,
					_stroke: null,
					_fill: null,
				}, s.points);
				points.show   = fnOrSelf(points.show);
				points.filter = fnOrSelf(points.filter);
				points.fill   = fnOrSelf(points.fill);
				points.stroke = fnOrSelf(points.stroke);
				points.paths  = fnOrSelf(points.paths);
				points.pxAlign = s.pxAlign;
			}

			if (showLegend) {
				var rowCells = initLegendRow(s, i);
				legendRows.splice(i, 0, rowCells[0]);
				legendCells.splice(i, 0, rowCells[1]);
				legend.values.push(null);	// NULL_LEGEND_VALS not yet avil here :(
			}

			if (cursor.show) {
				activeIdxs.splice(i, 0, null);

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

			if (showLegend) {
				legend.values.splice(i, 1);

				legendCells.splice(i, 1);
				var tr = legendRows.splice(i, 1)[0];
				offMouse(null, tr.firstChild);
				tr.remove();
			}

			if (cursor.show) {
				activeIdxs.splice(i, 1);

				cursorPts.length > 1 && cursorPts.splice(i, 1)[0].remove();
			}

			// TODO: de-init no-longer-needed scales?
		}

		self.delSeries = delSeries;

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
				var isTime = sc.time;

				axis.size   = fnOrSelf(axis.size);
				axis.space  = fnOrSelf(axis.space);
				axis.rotate = fnOrSelf(axis.rotate);
				axis.incrs  = fnOrSelf(axis.incrs  || (          sc.distr == 2 ? wholeIncrs : (isTime ? (ms == 1 ? timeIncrsMs : timeIncrsS) : numIncrs)));
				axis.splits = fnOrSelf(axis.splits || (isTime && sc.distr == 1 ? _timeAxisSplits : sc.distr == 3 ? logAxisSplits : sc.distr == 4 ? asinhAxisSplits : numAxisSplits));

				axis.stroke       = fnOrSelf(axis.stroke);
				axis.grid.stroke  = fnOrSelf(axis.grid.stroke);
				axis.ticks.stroke = fnOrSelf(axis.ticks.stroke);

				var av = axis.values;

				axis.values = (
					// static array of tick values
					isArr(av) && !isArr(av[0]) ? fnOrSelf(av) :
					// temporal
					isTime ? (
						// config array of fmtDate string tpls
						isArr(av) ?
							timeAxisVals(_tzDate, timeAxisStamps(av, _fmtDate)) :
						// fmtDate string tpl
						isStr(av) ?
							timeAxisVal(_tzDate, av) :
						av || _timeAxisVals
					) : av || numAxisVals
				);

				axis.filter = fnOrSelf(axis.filter || (          sc.distr >= 3 ? logAxisValsFilt : retArg1));

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
			data = (_data || []).slice();
			data[0] = data[0] || [];

			self.data = data.slice();
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

				shouldSetCursor = cursor.left >= 0;
				shouldSetLegend = true;
				commit();
			}
		}

		self.setData = setData;

		function autoScaleX() {
			var assign, assign$1, assign$2;

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
					else if (xScaleDistr == 4)
						{ (assign$1 = rangeAsinh(_min, _min, scaleX.log, false), _min = assign$1[0], _max = assign$1[1]); }
					else if (scaleX.time)
						{ _max = _min + round(86400 / ms); }
					else
						{ (assign$2 = rangeNum(_min, _max, rangePad, true), _min = assign$2[0], _max = assign$2[1]); }
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
			var wipScales = copy(scales, fastIsObj);

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

					var distr = sc.distr;

					sc._min = distr == 3 ? log10(sc.min) : distr == 4 ? asinh(sc.min, sc.asinh) : sc.min;
					sc._max = distr == 3 ? log10(sc.max) : distr == 4 ? asinh(sc.max, sc.asinh) : sc.max;

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

				if (cursor.show)
					{ shouldSetCursor = shouldSetLegend = cursor.left >= 0; }
			}

			for (var k$5 in pendScales)
				{ pendScales[k$5] = null; }
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
						{
							cacheStrokeFill(i, false);
							s._paths && drawPath(i, false);
						}

						{
							cacheStrokeFill(i, true);

							var show = s.points.show(self, i, i0, i1);
							var idxs = s.points.filter(self, i, show, s._paths ? s._paths.gaps : null);

							if (show || idxs) {
								s.points._paths = s.points.paths(self, i, i0, i1, idxs);
								drawPath(i, true);
							}
						}

						fire("drawSeries", i);
					}
				});
			}
		}

		function cacheStrokeFill(si, _points) {
			var s = _points ? series[si].points : series[si];

			s._stroke = s.stroke(self, si);
			s._fill   = s.fill(self, si);
		}

		function drawPath(si, _points) {
			var s = _points ? series[si].points : series[si];

			var strokeStyle = s._stroke;
			var fillStyle   = s._fill;

			var ref = s._paths;
			var stroke = ref.stroke;
			var fill = ref.fill;
			var clip = ref.clip;
			var flags = ref.flags;
			var width = roundDec(s.width * pxRatio, 3);
			var offset = (width % 2) / 2;

			if (_points && fillStyle == null)
				{ fillStyle = width > 0 ? "#fff" : strokeStyle; }

			ctx.globalAlpha = s.alpha;

			var _pxAlign = s.pxAlign == 1;

			_pxAlign && ctx.translate(offset, offset);

			ctx.save();

			if (!_points) {
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
			}

			clip && ctx.clip(clip);

			if (_points)
				{ strokeFill(strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, null, flags); }
			else
				{ fillStroke(si, strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, flags); }

			ctx.restore();

			_pxAlign && ctx.translate(-offset, -offset);

			ctx.globalAlpha = 1;
		}

		function fillStroke(si, strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags) {
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
					if (lowerEdge.show && clip)
						{ _fillStyle = b.fill(self, bi) || fillStyle; }
					else
						{ clip = null; }

					strokeFill(strokeStyle, lineWidth, lineDash, lineCap, _fillStyle, strokePath, fillPath, clip, flags);

					ctx.restore();

					didStrokeFill = true;
				}
			});

			if (!didStrokeFill)
				{ strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, null, flags); }
		}

		var CLIP_FILL_STROKE = BAND_CLIP_FILL | BAND_CLIP_STROKE;

		function strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, clip, flags) {
			setCtxStyle(strokeStyle, lineWidth, lineDash, lineCap, fillStyle);

			if (clip) {
				if ((flags & CLIP_FILL_STROKE) == CLIP_FILL_STROKE) {
					ctx.clip(clip);
					doFill(fillStyle, fillPath);
					doStroke(strokeStyle, strokePath, lineWidth);
				}
				else if (flags & BAND_CLIP_STROKE) {
					doFill(fillStyle, fillPath);
					ctx.clip(clip);
					doStroke(strokeStyle, strokePath, lineWidth);
				}
				else if (flags & BAND_CLIP_FILL) {
					ctx.save();
					ctx.clip(clip);
					doFill(fillStyle, fillPath);
					ctx.restore();
					doStroke(strokeStyle, strokePath, lineWidth);
				}
			}
			else {
				doFill(fillStyle, fillPath);
				doStroke(strokeStyle, strokePath, lineWidth);
			}
		}

		function doStroke(strokeStyle, strokePath, lineWidth) {
			strokeStyle && strokePath && lineWidth && ctx.stroke(strokePath);
		}

		function doFill(fillStyle, fillPath) {
			fillStyle   && fillPath && ctx.fill(fillPath);
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

			pxAlign == 1 && ctx.translate(offset, offset);

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

			pxAlign == 1 && ctx.translate(-offset, -offset);
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

				var side = axis.side;
				var ori = side % 2;

				var x, y;

				var fillStyle = axis.stroke(self, i);

				var shiftDir = side == 0 || side == 3 ? -1 : 1;

				// axis label
				if (axis.label) {
					var shiftAmt$1 = axis.labelGap * shiftDir;
					var baseLpos = round((axis._lpos + shiftAmt$1) * pxRatio);

					ctx.save();

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
					ctx.fillStyle    = fillStyle;
					ctx.textAlign    = "center";
					ctx.textBaseline = side == 2 ? TOP : BOTTOM;

					ctx.fillText(axis.label, x, y);

					ctx.restore();
				}

				var ref = axis._found;
				var _incr = ref[0];
				var _space = ref[1];

				if (_space == 0)
					{ return; }

				var scale = scales[axis.scale];

				var plotDim = ori == 0 ? plotWid : plotHgt;
				var plotOff = ori == 0 ? plotLft : plotTop;

				var axisGap = round(axis.gap * pxRatio);

				var _splits = axis._splits;

				// tick labels
				// BOO this assumes a specific data/series
				var splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
				var incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

				var ticks = axis.ticks;
				var tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

				// rotating of labels only supported on bottom x axis
				var angle = axis._rotate * -PI/180;

				var basePos  = pxRound(axis._pos * pxRatio);
				var shiftAmt = (tickSize + axisGap) * shiftDir;
				var finalPos = basePos + shiftAmt;
				    y        = ori == 0 ? finalPos : 0;
				    x        = ori == 1 ? finalPos : 0;

				ctx.font         = axis.font[0];
				ctx.fillStyle    = fillStyle;
				ctx.textAlign    = axis.align == 1 ? LEFT :
				                   axis.align == 2 ? RIGHT :
				                   angle > 0 ? LEFT :
				                   angle < 0 ? RIGHT :
				                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
				ctx.textBaseline = angle ||
				                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

				var lineHeight = axis.font[1] * lineMult;

				var canOffs = _splits.map(val => pxRound(getPos(val, scale, plotDim, plotOff)));

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

				syncRect(false);

				fire("setSize");

				shouldSetSize = false;
			}

			if (fullWidCss > 0 && fullHgtCss > 0) {
				ctx.clearRect(0, 0, can.width, can.height);
				fire("drawClear");
				drawOrder.forEach(fn => fn());
				fire("draw");
			}

		//	if (shouldSetSelect) {
			// TODO: update .u-select metrics (if visible)
			//	setStylePx(selectDiv, TOP, select.top = 0);
			//	setStylePx(selectDiv, LEFT, select.left = 0);
			//	setStylePx(selectDiv, WIDTH, select.width = 0);
			//	setStylePx(selectDiv, HEIGHT, select.height = 0);
			//	shouldSetSelect = false;
		//	}

			if (cursor.show && shouldSetCursor) {
				updateCursor();
				shouldSetCursor = false;
			}

		//	if (FEAT_LEGEND && legend.show && legend.live && shouldSetLegend) {}

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

		var drag = cursor.drag;

		var dragX = drag.x;
		var dragY = drag.y;

		if (cursor.show) {
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
			var label = showLegend ? legendRows[i] : null;

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

			if (opts.focus != null)
				{ setFocus(i); }

			if (opts.show != null) {
				s.show = opts.show;
				toggleDOM(i, opts.show);

				_setScale(s.scale, null, null);
				commit();
			}

			fire("setSeries", i, opts);

			pub && pubSync("setSeries", self, i, opts);
		}

		self.setSeries = setSeries;

		function setBand(bi, opts) {
			assign(bands[bi], opts);
		}

		function addBand(opts, bi) {
			opts.fill = fnOrSelf(opts.fill || null);
			bi = bi == null ? bands.length : bi;
			bands.splice(bi, 0, opts);
		}

		function delBand(bi) {
			if (bi == null)
				{ bands.length = 0; }
			else
				{ bands.splice(bi, 1); }
		}

		self.addBand = addBand;
		self.setBand = setBand;
		self.delBand = delBand;

		function setAlpha(i, value) {
			series[i].alpha = value;

			if (cursor.show && cursorPts[i])
				{ cursorPts[i].style.opacity = value; }

			if (showLegend && legendRows[i])
				{ legendRows[i].style.opacity = value; }
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

				var _setAlpha = focus.alpha != 1;

				series.forEach((s, i2) => {
					var isFocused = allFocused || i2 == 0 || i2 == i;
					s._focus = allFocused ? null : isFocused;
					_setAlpha && setAlpha(i2, isFocused ? 1 : focus.alpha);
				});

				focusedSeries = i;
				_setAlpha && commit();
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

		function posToVal(pos, scale, can) {
			var sc = scales[scale];

			if (can)
				{ pos = pos / pxRatio - (sc.ori == 1 ? plotTopCss : plotLftCss); }

			var dim = plotWidCss;

			if (sc.ori == 1) {
				dim = plotHgtCss;
				pos = dim - pos;
			}

			if (sc.dir == -1)
				{ pos = dim - pos; }

			var _min = sc._min,
				_max = sc._max,
				pct = pos / dim;

			var sv = _min + (_max - _min) * pct;

			var distr = sc.distr;

			return (
				distr == 3 ? pow(10, sv) :
				distr == 4 ? sinh(sv, sc.asinh) :
				sv
			);
		}

		function closestIdxFromXpos(pos, can) {
			var v = posToVal(pos, xScaleKey, can);
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

		(self.setCursor = (opts, _fire) => {
			mouseLeft1 = opts.left;
			mouseTop1 = opts.top;
		//	assign(cursor, opts);
			updateCursor(null, null, _fire);
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

		function syncLegend() {
			if (showLegend && legend.live) {
				for (var i = 0; i < series.length; i++) {
					if (i == 0 && multiValLegend)
						{ continue; }

					var vals = legend.values[i];

					var j = 0;

					for (var k in vals)
						{ legendCells[i][j++].firstChild.nodeValue = vals[k]; }
				}
			}
		}

		function setLegend(opts, _fire) {
			if (opts != null) {
				var idx = opts.idx;

				legend.idx = idx;
				series.forEach((s, sidx) => {
					(sidx > 0 || !multiValLegend) && setLegendValues(sidx, idx);
				});
			}

			if (showLegend && legend.live)
				{ syncLegend(); }

			shouldSetLegend = false;

			_fire !== false && fire("setLegend");
		}

		self.setLegend = setLegend;

		function setLegendValues(sidx, idx) {
			var val;

			if (idx == null)
				{ val = NULL_LEGEND_VALUES; }
			else {
				var s = series[sidx];
				var src = sidx == 0 && xScaleDistr == 2 ? data0 : data[sidx];
				val = multiValLegend ? s.values(self, sidx, idx) : {_: s.value(self, src[idx], sidx, idx)};
			}

			legend.values[sidx] = val;
		}

		function updateCursor(ts, src, _fire) {
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
				}

				if (cursorFocus)
					{ setSeries(null, FOCUS_TRUE, syncOpts.setSeries); }

				if (legend.live) {
					activeIdxs.fill(null);
					shouldSetLegend = true;

					for (var i$1 = 0; i$1 < series.length; i$1++)
						{ legend.values[i$1] = NULL_LEGEND_VALUES; }
				}
			}
			else {
			//	let pctY = 1 - (y / rect.height);

				var mouseXPos = scaleX.ori == 0 ? mouseLeft1 : mouseTop1;

				var valAtPosX = posToVal(mouseXPos, xScaleKey);

				idx = closestIdx(valAtPosX, data[0], i0, i1);

				var xPos = incrRoundUp(valToPosX(data[0][idx], scaleX, xDim, 0), 0.5);

				for (var i$2 = 0; i$2 < series.length; i$2++) {
					var s = series[i$2];

					var idx2 = cursor.dataIdx(self, i$2, idx, valAtPosX);

					var yVal2 = data[i$2][idx2];

					shouldSetLegend = shouldSetLegend || yVal2 != data[i$2][activeIdxs[i$2]];

					activeIdxs[i$2] = idx2;

					var xPos2 = idx2 == idx ? xPos : incrRoundUp(valToPosX(data[0][idx2], scaleX, xDim, 0), 0.5);

					if (i$2 > 0 && s.show) {
						var yPos = yVal2 == null ? -10 : incrRoundUp(valToPosY(yVal2, scales[s.scale], yDim, 0), 0.5);

						if (yPos > 0) {
							var dist = abs(yPos - mouseTop1);

							if (dist <= closestDist) {
								closestDist = dist;
								closestSeries = i$2;
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

						if (shouldSetLegend && cursorPts.length > 1) {
							trans(cursorPts[i$2], hPos, vPos, plotWidCss, plotHgtCss);
							color(cursorPts[i$2], cursor.points.fill(self, i$2), cursor.points.stroke(self, i$2));
						}
					}

					if (legend.live) {
						if (!shouldSetLegend || i$2 == 0 && multiValLegend)
							{ continue; }

						setLegendValues(i$2, idx2);
					}
				}
			}

			if (shouldSetLegend) {
				legend.idx = idx;
				setLegend();
			}

			// nit: cursor.drag.setSelect is assumed always true
			if (select.show && dragging) {
				if (src != null) {
					var ref = syncOpts.scales;
					var xKey = ref[0];
					var yKey = ref[1];
					var ref$1 = syncOpts.match;
					var matchXKeys = ref$1[0];
					var matchYKeys = ref$1[1];
					var ref$2 = src.cursor.sync.scales;
					var xKeySrc = ref$2[0];
					var yKeySrc = ref$2[1];

					// match the dragX/dragY implicitness/explicitness of src
					var sdrag = src.cursor.drag;
					dragX = sdrag._x;
					dragY = sdrag._y;

					var ref$3 = src.select;
					var left = ref$3.left;
					var top = ref$3.top;
					var width = ref$3.width;
					var height = ref$3.height;

					var sori = src.scales[xKey].ori;
					var sPosToVal = src.posToVal;

					var sOff, sDim, sc, a, b;

					var matchingX = xKey != null && matchXKeys(xKey, xKeySrc);
					var matchingY = yKey != null && matchYKeys(yKey, yKeySrc);

					if (matchingX) {
						if (sori == 0) {
							sOff = left;
							sDim = width;
						}
						else {
							sOff = top;
							sDim = height;
						}

						if (dragX) {
							sc = scales[xKey];

							a = valToPosX(sPosToVal(sOff, xKeySrc),        sc, xDim, 0);
							b = valToPosX(sPosToVal(sOff + sDim, xKeySrc), sc, xDim, 0);

							setSelX(min(a,b), abs(b-a));
						}
						else
							{ setSelX(0, xDim); }

						if (!matchingY)
							{ setSelY(0, yDim); }
					}

					if (matchingY) {
						if (sori == 1) {
							sOff = left;
							sDim = width;
						}
						else {
							sOff = top;
							sDim = height;
						}

						if (dragY) {
							sc = scales[yKey];

							a = valToPosY(sPosToVal(sOff, yKeySrc),        sc, yDim, 0);
							b = valToPosY(sPosToVal(sOff + sDim, yKeySrc), sc, yDim, 0);

							setSelY(min(a,b), abs(b-a));
						}
						else
							{ setSelY(0, yDim); }

						if (!matchingX)
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
				if (syncKey != null) {
					var ref$4 = syncOpts.scales;
					var xSyncKey = ref$4[0];
					var ySyncKey = ref$4[1];

					syncOpts.values[0] = xSyncKey != null ? posToVal(scaleX.ori == 0 ? mouseLeft1 : mouseTop1, xSyncKey) : null;
					syncOpts.values[1] = ySyncKey != null ? posToVal(scaleX.ori == 1 ? mouseLeft1 : mouseTop1, ySyncKey) : null;
				}

				// this is not technically a "mousemove" event, since it's debounced, rename to setCursor?
				// since this is internal, we can tweak it later
				pubSync(mousemove, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, idx);

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

			ready && _fire !== false && fire("setCursor");
		}

		var rect = null;

		function syncRect(defer) {
			if (defer === true)
				{ rect = null; }
			else {
				rect = over.getBoundingClientRect();
				fire("syncRect", rect);
			}
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

			if (rect == null)
				{ syncRect(false); }

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

				var ref = syncOpts.scales;
				var xKey = ref[0];
				var yKey = ref[1];

				var syncOptsSrc = src.cursor.sync;
				var ref$1 = syncOptsSrc.values;
				var xValSrc = ref$1[0];
				var yValSrc = ref$1[1];
				var ref$2 = syncOptsSrc.scales;
				var xKeySrc = ref$2[0];
				var yKeySrc = ref$2[1];
				var ref$3 = syncOpts.match;
				var matchXKeys = ref$3[0];
				var matchYKeys = ref$3[1];

				var rotSrc = src.scales[xKeySrc].ori == 1;

				var xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss,
					yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss,
					_xDim = rotSrc ? _h : _w,
					_yDim = rotSrc ? _w : _h,
					_xPos = rotSrc ? _t : _l,
					_yPos = rotSrc ? _l : _t;

				if (xKeySrc != null)
					{ _l = matchXKeys(xKey, xKeySrc) ? getPos(xValSrc, scales[xKey], xDim, 0) : -10; }
				else
					{ _l = xDim * (_xPos/_xDim); }

				if (yKeySrc != null)
					{ _t = matchYKeys(yKey, yKeySrc) ? getPos(yValSrc, scales[yKey], yDim, 0) : -10; }
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
				pubSync(mousedown, self, mouseLeft0, mouseTop0, plotWidCss, plotHgtCss, null);
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
				pubSync(mouseup, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
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
				{ pubSync(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null); }
		}

		function syncPxRatio() {
			axes.forEach(syncFontSize);
			_setSize(self.width, self.height, true);
		}

		on(ddpxchange, win, syncPxRatio);

		// internal pub/sub
		var events = {};

		events.mousedown = mouseDown;
		events.mousemove = mouseMove;
		events.mouseup = mouseUp;
		events.dblclick = dblClick;
		events["setSeries"] = (e, src, idx, opts) => {
			setSeries(idx, opts);
		};

		if (cursor.show) {
			onMouse(mousedown,  over, mouseDown);
			onMouse(mousemove,  over, mouseMove);
			onMouse(mouseenter, over, syncRect);
			onMouse(mouseleave, over, mouseLeave);

			onMouse(dblclick, over, dblClick);

			cursorPlots.add(self);

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

		var syncOpts = assign({
			key: null,
			setSeries: false,
			filters: {
				pub: retTrue,
				sub: retTrue,
			},
			scales: [xScaleKey, series[1] ? series[1].scale : null],
			match: [retEq, retEq],
			values: [null, null],
		}, cursor.sync);

		(cursor.sync = syncOpts);

		var syncKey = syncOpts.key;

		var sync = _sync(syncKey);

		function pubSync(type, src, x, y, w, h, i) {
			if (syncOpts.filters.pub(type, src, x, y, w, h, i))
				{ sync.pub(type, src, x, y, w, h, i); }
		}

		sync.sub(self);

		function pub(type, src, x, y, w, h, i) {
			if (syncOpts.filters.sub(type, src, x, y, w, h, i))
				{ events[type](null, src, x, y, w, h, i); }
		}

		(self.pub = pub);

		function destroy() {
			sync.unsub(self);
			cursorPlots.delete(self);
			mouseListeners.clear();
			off(ddpxchange, win, syncPxRatio);
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

			updateCursor();

			setSelect(select, false);
		}

		series.forEach(initSeries);

		axes.forEach(initAxis);

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
	uPlot.rangeAsinh = rangeAsinh;
	uPlot.orient   = orient;

	{
		uPlot.join = join;
	}

	{
		uPlot.fmtDate = fmtDate;
		uPlot.tzDate  = tzDate;
	}

	{
		uPlot.sync = _sync;
	}

	{
		uPlot.addGap = addGap;
		uPlot.clipGaps = clipGaps;

		var paths = uPlot.paths = {
			points: points,
		};

		(paths.linear  = linear);
		(paths.stepped = stepped);
		(paths.bars    = bars);
		(paths.spline  = monotoneCubic);
	}

	return uPlot;

}());
