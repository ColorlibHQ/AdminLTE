/**
* Copyright (c) 2021, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uPlot.js (μPlot)
* A small, fast chart for time series, lines, areas, ohlc & bars
* https://github.com/leeoniya/uPlot (v1.6.17)
*/

var uPlot = (function () {
	'use strict';

	const FEAT_TIME          = true;

	// binary search for index of closest value
	function closestIdx(num, arr, lo, hi) {
		let mid;
		lo = lo || 0;
		hi = hi || arr.length - 1;
		let bitwise = hi <= 2147483647;

		while (hi - lo > 1) {
			mid = bitwise ? (lo + hi) >> 1 : floor((lo + hi) / 2);

			if (arr[mid] < num)
				lo = mid;
			else
				hi = mid;
		}

		if (num - arr[lo] <= arr[hi] - num)
			return lo;

		return hi;
	}

	function nonNullIdx(data, _i0, _i1, dir) {
		for (let i = dir == 1 ? _i0 : _i1; i >= _i0 && i <= _i1; i += dir) {
			if (data[i] != null)
				return i;
		}

		return -1;
	}

	function getMinMax(data, _i0, _i1, sorted) {
	//	console.log("getMinMax()");

		let _min = inf;
		let _max = -inf;

		if (sorted == 1) {
			_min = data[_i0];
			_max = data[_i1];
		}
		else if (sorted == -1) {
			_min = data[_i1];
			_max = data[_i0];
		}
		else {
			for (let i = _i0; i <= _i1; i++) {
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

		let _min = inf;
		let _max = -inf;

		for (let i = _i0; i <= _i1; i++) {
			if (data[i] > 0) {
				_min = min(_min, data[i]);
				_max = max(_max, data[i]);
			}
		}

		return [
			_min ==  inf ?  1 : _min,
			_max == -inf ? 10 : _max,
		];
	}

	const _fixedTuple = [0, 0];

	function fixIncr(minIncr, maxIncr, minExp, maxExp) {
		_fixedTuple[0] = minExp < 0 ? roundDec(minIncr, -minExp) : minIncr;
		_fixedTuple[1] = maxExp < 0 ? roundDec(maxIncr, -maxExp) : maxIncr;
		return _fixedTuple;
	}

	function rangeLog(min, max, base, fullMags) {
		let minSign = sign(min);

		let logFn = base == 10 ? log10 : log2;

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

		let minExp, maxExp, minMaxIncrs;

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
		let minMax = rangeLog(min, max, base, fullMags);

		if (min == 0)
			minMax[0] = 0;

		if (max == 0)
			minMax[1] = 0;

		return minMax;
	}

	const rangePad = 0.1;

	const autoRangePart = {
		mode: 3,
		pad: rangePad,
	};

	const _eqRangePart = {
		pad:  0,
		soft: null,
		mode: 0,
	};

	const _eqRange = {
		min: _eqRangePart,
		max: _eqRangePart,
	};

	// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
	// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
	function rangeNum(_min, _max, mult, extra) {
		if (isObj(mult))
			return _rangeNum(_min, _max, mult);

		_eqRangePart.pad  = mult;
		_eqRangePart.soft = extra ? 0 : null;
		_eqRangePart.mode = extra ? 3 : 0;

		return _rangeNum(_min, _max, _eqRange);
	}

	// nullish coalesce
	function ifNull(lh, rh) {
		return lh == null ? rh : lh;
	}

	// checks if given index range in an array contains a non-null value
	// aka a range-bounded Array.some()
	function hasData(data, idx0, idx1) {
		idx0 = ifNull(idx0, 0);
		idx1 = ifNull(idx1, data.length - 1);

		while (idx0 <= idx1) {
			if (data[idx0] != null)
				return true;
			idx0++;
		}

		return false;
	}

	function _rangeNum(_min, _max, cfg) {
		let cmin = cfg.min;
		let cmax = cfg.max;

		let padMin = ifNull(cmin.pad, 0);
		let padMax = ifNull(cmax.pad, 0);

		let hardMin = ifNull(cmin.hard, -inf);
		let hardMax = ifNull(cmax.hard,  inf);

		let softMin = ifNull(cmin.soft,  inf);
		let softMax = ifNull(cmax.soft, -inf);

		let softMinMode = ifNull(cmin.mode, 0);
		let softMaxMode = ifNull(cmax.mode, 0);

		let delta        = _max - _min;

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
					padMin = 0;

				if (softMaxMode == 2 && softMax != -inf)
					padMax = 0;
			}
		}

		let nonZeroDelta = delta || abs(_max) || 1e3;
		let mag          = log10(nonZeroDelta);
		let base         = pow(10, floor(mag));

		let _padMin  = nonZeroDelta * (delta == 0 ? (_min == 0 ? .1 : 1) : padMin);
		let _newMin  = roundDec(incrRoundDn(_min - _padMin, base/10), 9);
		let _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 3 && _newMin <= softMin || softMinMode == 2 && _newMin >= softMin) ? softMin : inf;
		let minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

		let _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
		let _newMax  = roundDec(incrRoundUp(_max + _padMax, base/10), 9);
		let _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 3 && _newMax >= softMax || softMaxMode == 2 && _newMax <= softMax) ? softMax : -inf;
		let maxLim   = min(hardMax, _newMax > _softMax && _max <= _softMax ? _softMax : max(_softMax, _newMax));

		if (minLim == maxLim && minLim == 0)
			maxLim = 100;

		return [minLim, maxLim];
	}

	// alternative: https://stackoverflow.com/a/2254896
	const fmtNum = new Intl.NumberFormat(navigator.language).format;

	const M = Math;

	const PI = M.PI;
	const abs = M.abs;
	const floor = M.floor;
	const round = M.round;
	const ceil = M.ceil;
	const min = M.min;
	const max = M.max;
	const pow = M.pow;
	const sign = M.sign;
	const log10 = M.log10;
	const log2 = M.log2;
	// TODO: seems like this needs to match asinh impl if the passed v is tweaked?
	const sinh =  (v, linthresh = 1) => M.sinh(v) * linthresh;
	const asinh = (v, linthresh = 1) => M.asinh(v / linthresh);

	const inf = Infinity;

	function numIntDigits(x) {
		return (log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
	}

	function incrRound(num, incr) {
		return round(num/incr)*incr;
	}

	function clamp(num, _min, _max) {
		return min(max(num, _min), _max);
	}

	function fnOrSelf(v) {
		return typeof v == "function" ? v : () => v;
	}

	const retArg0 = _0 => _0;

	const retArg1 = (_0, _1) => _1;

	const retNull = _ => null;

	const retTrue = _ => true;

	const retEq = (a, b) => a == b;

	function incrRoundUp(num, incr) {
		return ceil(num/incr)*incr;
	}

	function incrRoundDn(num, incr) {
		return floor(num/incr)*incr;
	}

	function roundDec(val, dec) {
		return round(val * (dec = 10**dec)) / dec;
	}

	const fixedDec = new Map();

	function guessDec(num) {
		return ((""+num).split(".")[1] || "").length;
	}

	function genIncrs(base, minExp, maxExp, mults) {
		let incrs = [];

		let multDec = mults.map(guessDec);

		for (let exp = minExp; exp < maxExp; exp++) {
			let expa = abs(exp);
			let mag = roundDec(pow(base, exp), expa);

			for (let i = 0; i < mults.length; i++) {
				let _incr = mults[i] * mag;
				let dec = (_incr >= 0 && exp >= 0 ? 0 : expa) + (exp >= multDec[i] ? 0 : multDec[i]);
				let incr = roundDec(_incr, dec);
				incrs.push(incr);
				fixedDec.set(incr, dec);
			}
		}

		return incrs;
	}

	//export const assign = Object.assign;

	const EMPTY_OBJ = {};
	const EMPTY_ARR = [];

	const nullNullTuple = [null, null];

	const isArr = Array.isArray;

	function isStr(v) {
		return typeof v == 'string';
	}

	function isObj(v) {
		let is = false;

		if (v != null) {
			let c = v.constructor;
			is = c == null || c == Object;
		}

		return is;
	}

	function fastIsObj(v) {
		return v != null && typeof v == 'object';
	}

	function copy(o, _isObj = isObj) {
		let out;

		if (isArr(o)) {
			let val = o.find(v => v != null);

			if (isArr(val) || _isObj(val)) {
				out = Array(o.length);
				for (let i = 0; i < o.length; i++)
				  out[i] = copy(o[i], _isObj);
			}
			else
				out = o.slice();
		}
		else if (_isObj(o)) {
			out = {};
			for (let k in o)
				out[k] = copy(o[k], _isObj);
		}
		else
			out = o;

		return out;
	}

	function assign(targ) {
		let args = arguments;

		for (let i = 1; i < args.length; i++) {
			let src = args[i];

			for (let key in src) {
				if (isObj(targ[key]))
					assign(targ[key], copy(src[key]));
				else
					targ[key] = copy(src[key]);
			}
		}

		return targ;
	}

	// nullModes
	const NULL_REMOVE = 0;  // nulls are converted to undefined (e.g. for spanGaps: true)
	const NULL_RETAIN = 1;  // nulls are retained, with alignment artifacts set to undefined (default)
	const NULL_EXPAND = 2;  // nulls are expanded to include any adjacent alignment artifacts

	// sets undefined values to nulls when adjacent to existing nulls (minesweeper)
	function nullExpand(yVals, nullIdxs, alignedLen) {
		for (let i = 0, xi, lastNullIdx = -1; i < nullIdxs.length; i++) {
			let nullIdx = nullIdxs[i];

			if (nullIdx > lastNullIdx) {
				xi = nullIdx - 1;
				while (xi >= 0 && yVals[xi] == null)
					yVals[xi--] = null;

				xi = nullIdx + 1;
				while (xi < alignedLen && yVals[xi] == null)
					yVals[lastNullIdx = xi++] = null;
			}
		}
	}

	// nullModes is a tables-matched array indicating how to treat nulls in each series
	// output is sorted ASC on the joined field (table[0]) and duplicate join values are collapsed
	function join(tables, nullModes) {
		let xVals = new Set();

		for (let ti = 0; ti < tables.length; ti++) {
			let t = tables[ti];
			let xs = t[0];
			let len = xs.length;

			for (let i = 0; i < len; i++)
				xVals.add(xs[i]);
		}

		let data = [Array.from(xVals).sort((a, b) => a - b)];

		let alignedLen = data[0].length;

		let xIdxs = new Map();

		for (let i = 0; i < alignedLen; i++)
			xIdxs.set(data[0][i], i);

		for (let ti = 0; ti < tables.length; ti++) {
			let t = tables[ti];
			let xs = t[0];

			for (let si = 1; si < t.length; si++) {
				let ys = t[si];

				let yVals = Array(alignedLen).fill(undefined);

				let nullMode = nullModes ? nullModes[ti][si] : NULL_RETAIN;

				let nullIdxs = [];

				for (let i = 0; i < ys.length; i++) {
					let yVal = ys[i];
					let alignedIdx = xIdxs.get(xs[i]);

					if (yVal === null) {
						if (nullMode != NULL_REMOVE) {
							yVals[alignedIdx] = yVal;

							if (nullMode == NULL_EXPAND)
								nullIdxs.push(alignedIdx);
						}
					}
					else
						yVals[alignedIdx] = yVal;
				}

				nullExpand(yVals, nullIdxs, alignedLen);

				data.push(yVals);
			}
		}

		return data;
	}

	const microTask = typeof queueMicrotask == "undefined" ? fn => Promise.resolve().then(fn) : queueMicrotask;

	const WIDTH       = "width";
	const HEIGHT      = "height";
	const TOP         = "top";
	const BOTTOM      = "bottom";
	const LEFT        = "left";
	const RIGHT       = "right";
	const hexBlack    = "#000";
	const transparent = hexBlack + "0";

	const mousemove   = "mousemove";
	const mousedown   = "mousedown";
	const mouseup     = "mouseup";
	const mouseenter  = "mouseenter";
	const mouseleave  = "mouseleave";
	const dblclick    = "dblclick";
	const resize      = "resize";
	const scroll      = "scroll";

	const change      = "change";
	const dppxchange  = "dppxchange";

	const pre = "u-";

	const UPLOT          =       "uplot";
	const ORI_HZ         = pre + "hz";
	const ORI_VT         = pre + "vt";
	const TITLE          = pre + "title";
	const WRAP           = pre + "wrap";
	const UNDER          = pre + "under";
	const OVER           = pre + "over";
	const AXIS           = pre + "axis";
	const OFF            = pre + "off";
	const SELECT         = pre + "select";
	const CURSOR_X       = pre + "cursor-x";
	const CURSOR_Y       = pre + "cursor-y";
	const CURSOR_PT      = pre + "cursor-pt";
	const LEGEND         = pre + "legend";
	const LEGEND_LIVE    = pre + "live";
	const LEGEND_INLINE  = pre + "inline";
	const LEGEND_THEAD   = pre + "thead";
	const LEGEND_SERIES  = pre + "series";
	const LEGEND_MARKER  = pre + "marker";
	const LEGEND_LABEL   = pre + "label";
	const LEGEND_VALUE   = pre + "value";

	const doc = document;
	const win = window;
	let pxRatio;

	let query;

	function setPxRatio() {
		let _pxRatio = devicePixelRatio;

		// during print preview, Chrome fires off these dppx queries even without changes
		if (pxRatio != _pxRatio) {
			pxRatio = _pxRatio;

			query && off(change, query, setPxRatio);
			query = matchMedia(`(min-resolution: ${pxRatio - 0.001}dppx) and (max-resolution: ${pxRatio + 0.001}dppx)`);
			on(change, query, setPxRatio);

			win.dispatchEvent(new CustomEvent(dppxchange));
		}
	}

	function addClass(el, c) {
		if (c != null) {
			let cl = el.classList;
			!cl.contains(c) && cl.add(c);
		}
	}

	function remClass(el, c) {
		let cl = el.classList;
		cl.contains(c) && cl.remove(c);
	}

	function setStylePx(el, name, value) {
		el.style[name] = value + "px";
	}

	function placeTag(tag, cls, targ, refEl) {
		let el = doc.createElement(tag);

		if (cls != null)
			addClass(el, cls);

		if (targ != null)
			targ.insertBefore(el, refEl);

		return el;
	}

	function placeDiv(cls, targ) {
		return placeTag("div", cls, targ);
	}

	const xformCache = new WeakMap();

	function elTrans(el, xPos, yPos, xMax, yMax) {
		let xform = "translate(" + xPos + "px," + yPos + "px)";
		let xformOld = xformCache.get(el);

		if (xform != xformOld) {
			el.style.transform = xform;
			xformCache.set(el, xform);

			if (xPos < 0 || yPos < 0 || xPos > xMax || yPos > yMax)
				addClass(el, OFF);
			else
				remClass(el, OFF);
		}
	}

	const colorCache = new WeakMap();

	function elColor(el, background, borderColor) {
		let newColor = background + borderColor;
		let oldColor = colorCache.get(el);

		if (newColor != oldColor) {
			colorCache.set(el, newColor);
			el.style.background = background;
			el.style.borderColor = borderColor;
		}
	}

	const sizeCache = new WeakMap();

	function elSize(el, newWid, newHgt, centered) {
		let newSize = newWid + "" + newHgt;
		let oldSize = sizeCache.get(el);

		if (newSize != oldSize) {
			sizeCache.set(el, newSize);
			el.style.height = newHgt + "px";
			el.style.width = newWid + "px";
			el.style.marginLeft = centered ? -newWid/2 + "px" : 0;
			el.style.marginTop = centered ? -newHgt/2 + "px" : 0;
		}
	}

	const evOpts = {passive: true};
	const evOpts2 = assign({capture: true}, evOpts);

	function on(ev, el, cb, capt) {
		el.addEventListener(ev, cb, capt ? evOpts2 : evOpts);
	}

	function off(ev, el, cb, capt) {
		el.removeEventListener(ev, cb, capt ? evOpts2 : evOpts);
	}

	setPxRatio();

	const months = [
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
		"December",
	];

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	function slice3(str) {
		return str.slice(0, 3);
	}

	const days3 = days.map(slice3);

	const months3 = months.map(slice3);

	const engNames = {
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

	const subs = {
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
		h:		d => {let h = d.getHours(); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
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
		let parts = [];

		let R = /\{([a-z]+)\}|[^{]+/gi, m;

		while (m = R.exec(tpl))
			parts.push(m[0][0] == '{' ? subs[m[1]] : m[0]);

		return d => {
			let out = '';

			for (let i = 0; i < parts.length; i++)
				out += typeof parts[i] == "string" ? parts[i] : parts[i](d, names);

			return out;
		}
	}

	const localTz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

	// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone/53652131#53652131
	function tzDate(date, tz) {
		let date2;

		// perf optimization
		if (tz == 'UTC' || tz == 'Etc/UTC')
			date2 = new Date(+date + date.getTimezoneOffset() * 6e4);
		else if (tz == localTz)
			date2 = date;
		else {
			date2 = new Date(date.toLocaleString('en-US', {timeZone: tz}));
			date2.setMilliseconds(date.getMilliseconds());
		}

		return date2;
	}

	//export const series = [];

	// default formatters:

	const onlyWhole = v => v % 1 == 0;

	const allMults = [1,2,2.5,5];

	// ...0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.25, 0.5
	const decIncrs = genIncrs(10, -16, 0, allMults);

	// 1, 2, 2.5, 5, 10, 20, 25, 50...
	const oneIncrs = genIncrs(10, 0, 16, allMults);

	// 1, 2,      5, 10, 20, 25, 50...
	const wholeIncrs = oneIncrs.filter(onlyWhole);

	const numIncrs = decIncrs.concat(oneIncrs);

	const NL = "\n";

	const yyyy    = "{YYYY}";
	const NLyyyy  = NL + yyyy;
	const md      = "{M}/{D}";
	const NLmd    = NL + md;
	const NLmdyy  = NLmd + "/{YY}";

	const aa      = "{aa}";
	const hmm     = "{h}:{mm}";
	const hmmaa   = hmm + aa;
	const NLhmmaa = NL + hmmaa;
	const ss      = ":{ss}";

	const _ = null;

	function genTimeStuffs(ms) {
		let	s  = ms * 1e3,
			m  = s  * 60,
			h  = m  * 60,
			d  = h  * 24,
			mo = d  * 30,
			y  = d  * 365;

		// min of 1e-3 prevents setting a temporal x ticks too small since Date objects cannot advance ticks smaller than 1ms
		let subSecIncrs = ms == 1 ? genIncrs(10, 0, 3, allMults).filter(onlyWhole) : genIncrs(10, -3, 0, allMults);

		let timeIncrs = subSecIncrs.concat([
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
			y * 100,
		]);

		// [0]:   minimum num secs in the tick incr
		// [1]:   default tick format
		// [2-7]: rollover tick formats
		// [8]:   mode: 0: replace [1] -> [2-7], 1: concat [1] + [2-7]
		const _timeAxisStamps = [
		//   tick incr    default          year                    month   day                   hour    min       sec   mode
			[y,           yyyy,            _,                      _,      _,                    _,      _,        _,       1],
			[d * 28,      "{MMM}",         NLyyyy,                 _,      _,                    _,      _,        _,       1],
			[d,           md,              NLyyyy,                 _,      _,                    _,      _,        _,       1],
			[h,           "{h}" + aa,      NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
			[m,           hmmaa,           NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
			[s,           ss,              NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1],
			[ms,          ss + ".{fff}",   NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1],
		];

		// the ensures that axis ticks, values & grid are aligned to logical temporal breakpoints and not an arbitrary timestamp
		// https://www.timeanddate.com/time/dst/
		// https://www.timeanddate.com/time/dst/2019.html
		// https://www.epochconverter.com/timezones
		function timeAxisSplits(tzDate) {
			return (self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace) => {
				let splits = [];
				let isYr = foundIncr >= y;
				let isMo = foundIncr >= mo && foundIncr < y;

				// get the timezone-adjusted date
				let minDate = tzDate(scaleMin);
				let minDateTs = roundDec(minDate * ms, 3);

				// get ts of 12am (this lands us at or before the original scaleMin)
				let minMin = mkDate(minDate.getFullYear(), isYr ? 0 : minDate.getMonth(), isMo || isYr ? 1 : minDate.getDate());
				let minMinTs = roundDec(minMin * ms, 3);

				if (isMo || isYr) {
					let moIncr = isMo ? foundIncr / mo : 0;
					let yrIncr = isYr ? foundIncr / y  : 0;
				//	let tzOffset = scaleMin - minDateTs;		// needed?
					let split = minDateTs == minMinTs ? minDateTs : roundDec(mkDate(minMin.getFullYear() + yrIncr, minMin.getMonth() + moIncr, 1) * ms, 3);
					let splitDate = new Date(round(split / ms));
					let baseYear = splitDate.getFullYear();
					let baseMonth = splitDate.getMonth();

					for (let i = 0; split <= scaleMax; i++) {
						let next = mkDate(baseYear + yrIncr * i, baseMonth + moIncr * i, 1);
						let offs = next - tzDate(roundDec(next * ms, 3));

						split = roundDec((+next + offs) * ms, 3);

						if (split <= scaleMax)
							splits.push(split);
					}
				}
				else {
					let incr0 = foundIncr >= d ? d : foundIncr;
					let tzOffset = floor(scaleMin) - floor(minDateTs);
					let split = minMinTs + tzOffset + incrRoundUp(minDateTs - minMinTs, incr0);
					splits.push(split);

					let date0 = tzDate(split);

					let prevHour = date0.getHours() + (date0.getMinutes() / m) + (date0.getSeconds() / h);
					let incrHours = foundIncr / h;

					let minSpace = self.axes[axisIdx]._space;
					let pctSpace = foundSpace / minSpace;

					while (1) {
						split = roundDec(split + foundIncr, ms == 1 ? 0 : 3);

						if (split > scaleMax)
							break;

						if (incrHours > 1) {
							let expectedHour = floor(roundDec(prevHour + incrHours, 6)) % 24;
							let splitDate = tzDate(split);
							let actualHour = splitDate.getHours();

							let dstShift = actualHour - expectedHour;

							if (dstShift > 1)
								dstShift = -1;

							split -= dstShift * h;

							prevHour = (prevHour + incrHours) % 24;

							// add a tick only if it's further than 70% of the min allowed label spacing
							let prevSplit = splits[splits.length - 1];
							let pctIncr = roundDec((split - prevSplit) / foundIncr, 3);

							if (pctIncr * pctSpace >= .7)
								splits.push(split);
						}
						else
							splits.push(split);
					}
				}

				return splits;
			}
		}

		return [
			timeIncrs,
			_timeAxisStamps,
			timeAxisSplits,
		];
	}

	const [ timeIncrsMs, _timeAxisStampsMs, timeAxisSplitsMs ] = genTimeStuffs(1);
	const [ timeIncrsS,  _timeAxisStampsS,  timeAxisSplitsS  ] = genTimeStuffs(1e-3);

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
			let s = stamps.find(s => foundIncr >= s[0]) || stamps[stamps.length - 1];

			// these track boundaries when a full label is needed again
			let prevYear;
			let prevMnth;
			let prevDate;
			let prevHour;
			let prevMins;
			let prevSecs;

			return splits.map(split => {
				let date = tzDate(split);

				let newYear = date.getFullYear();
				let newMnth = date.getMonth();
				let newDate = date.getDate();
				let newHour = date.getHours();
				let newMins = date.getMinutes();
				let newSecs = date.getSeconds();

				let stamp = (
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
		let stamp = fmtDate(dateTpl);
		return (self, splits, axisIdx, foundSpace, foundIncr) => splits.map(split => stamp(tzDate(split)));
	}

	function mkDate(y, m, d) {
		return new Date(y, m, d);
	}

	function timeSeriesStamp(stampCfg, fmtDate) {
		return fmtDate(stampCfg);
	}
	const _timeSeriesStamp = '{YYYY}-{MM}-{DD} {h}:{mm}{aa}';

	function timeSeriesVal(tzDate, stamp) {
		return (self, val) => stamp(tzDate(val));
	}

	function legendStroke(self, seriesIdx) {
		let s = self.series[seriesIdx];
		return s.width ? s.stroke(self, seriesIdx) : s.points.width ? s.points.stroke(self, seriesIdx) : null;
	}

	function legendFill(self, seriesIdx) {
		return self.series[seriesIdx].fill(self, seriesIdx);
	}

	const legendOpts = {
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
		let o = self.cursor.points;

		let pt = placeDiv();

		let size = o.size(self, si);
		setStylePx(pt, WIDTH, size);
		setStylePx(pt, HEIGHT, size);

		let mar = size / -2;
		setStylePx(pt, "marginLeft", mar);
		setStylePx(pt, "marginTop", mar);

		let width = o.width(self, si, size);
		width && setStylePx(pt, "borderWidth", width);

		return pt;
	}

	function cursorPointFill(self, si) {
		let sp = self.series[si].points;
		return sp._fill || sp._stroke;
	}

	function cursorPointStroke(self, si) {
		let sp = self.series[si].points;
		return sp._stroke || sp._fill;
	}

	function cursorPointSize(self, si) {
		let sp = self.series[si].points;
		return ptDia(sp.width, 1);
	}

	function dataIdx(self, seriesIdx, cursorIdx) {
		return cursorIdx;
	}

	const moveTuple = [0,0];

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

	const cursorOpts = {
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
		dataIdx,
		idxs: null,
	};

	const grid = {
		show: true,
		stroke: "rgba(0,0,0,0.07)",
		width: 2,
	//	dash: [],
		filter: retArg1,
	};

	const ticks = assign({}, grid, {size: 10});

	const font      = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	const labelFont = "bold " + font;
	const lineMult = 1.5;		// font-size multiplier

	const xAxisOpts = {
		show: true,
		scale: "x",
		stroke: hexBlack,
		space: 50,
		gap: 5,
		size: 50,
		labelGap: 0,
		labelSize: 30,
		labelFont,
		side: 2,
	//	class: "x-vals",
	//	incrs: timeIncrs,
	//	values: timeVals,
	//	filter: retArg1,
		grid,
		ticks,
		font,
		rotate: 0,
	};

	const numSeriesLabel = "Value";
	const timeSeriesLabel = "Time";

	const xSeriesOpts = {
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
		let splits = [];

		let numDec = fixedDec.get(foundIncr) || 0;

		scaleMin = forceMin ? scaleMin : roundDec(incrRoundUp(scaleMin, foundIncr), numDec);

		for (let val = scaleMin; val <= scaleMax; val = roundDec(val + foundIncr, numDec))
			splits.push(Object.is(val, -0) ? 0 : val);		// coalesces -0

		return splits;
	}

	// this doesnt work for sin, which needs to come off from 0 independently in pos and neg dirs
	function logAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
		const splits = [];

		const logBase = self.scales[self.axes[axisIdx].scale].log;

		const logFn = logBase == 10 ? log10 : log2;

		const exp = floor(logFn(scaleMin));

		foundIncr = pow(logBase, exp);

		if (exp < 0)
			foundIncr = roundDec(foundIncr, -exp);

		let split = scaleMin;

		do {
			splits.push(split);
			split = roundDec(split + foundIncr, fixedDec.get(foundIncr));

			if (split >= foundIncr * logBase)
				foundIncr = split;

		} while (split <= scaleMax);

		return splits;
	}

	function asinhAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
		let sc = self.scales[self.axes[axisIdx].scale];

		let linthresh = sc.asinh;

		let posSplits = scaleMax > linthresh ? logAxisSplits(self, axisIdx, max(linthresh, scaleMin), scaleMax, foundIncr) : [linthresh];
		let zero = scaleMax >= 0 && scaleMin <= 0 ? [0] : [];
		let negSplits = scaleMin < -linthresh ? logAxisSplits(self, axisIdx, max(linthresh, -scaleMax), -scaleMin, foundIncr): [linthresh];

		return negSplits.reverse().map(v => -v).concat(zero, posSplits);
	}

	const RE_ALL   = /./;
	const RE_12357 = /[12357]/;
	const RE_125   = /[125]/;
	const RE_1     = /1/;

	function logAxisValsFilt(self, splits, axisIdx, foundSpace, foundIncr) {
		let axis = self.axes[axisIdx];
		let scaleKey = axis.scale;
		let sc = self.scales[scaleKey];

		if (sc.distr == 3 && sc.log == 2)
			return splits;

		let valToPos = self.valToPos;

		let minSpace = axis._space;

		let _10 = valToPos(10, scaleKey);

		let re = (
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

	const yAxisOpts = {
		show: true,
		scale: "y",
		stroke: hexBlack,
		space: 30,
		gap: 5,
		size: 50,
		labelGap: 0,
		labelSize: 30,
		labelFont,
		side: 3,
	//	class: "y-vals",
	//	incrs: numIncrs,
	//	values: (vals, space) => vals,
	//	filter: retArg1,
		grid,
		ticks,
		font,
		rotate: 0,
	};

	// takes stroke width
	function ptDia(width, mult) {
		let dia = 3 + (width || 1) * 2;
		return roundDec(dia * mult, 3);
	}

	function seriesPointsShow(self, si) {
		let { scale, idxs } = self.series[0];
		let xData = self._data[0];
		let p0 = self.valToPos(xData[idxs[0]], scale, true);
		let p1 = self.valToPos(xData[idxs[1]], scale, true);
		let dim = abs(p1 - p0);

		let s = self.series[si];
	//	const dia = ptDia(s.width, pxRatio);
		let maxPts = dim / (s.points.space * pxRatio);
		return idxs[1] - idxs[0] <= maxPts;
	}

	function seriesFillTo(self, seriesIdx, dataMin, dataMax) {
		let scale = self.scales[self.series[seriesIdx].scale];
		let isUpperBandEdge = self.bands && self.bands.some(b => b.series[0] == seriesIdx);
		return scale.distr == 3 || isUpperBandEdge ? scale.min : 0;
	}

	const facet = {
		scale: null,
		auto: true,

		// internal caches
		min: inf,
		max: -inf,
	};

	const xySeriesOpts = {
		show: true,
		auto: true,
		sorted: 0,
		alpha: 1,
		facets: [
			assign({}, facet, {scale: 'x'}),
			assign({}, facet, {scale: 'y'}),
		],
	};

	const ySeriesOpts = {
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

	const xScaleOpts = {
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

	const yScaleOpts = assign({}, xScaleOpts, {
		time: false,
		ori: 1,
	});

	const syncs = {};

	function _sync(key, opts) {
		let s = syncs[key];

		if (!s) {
			s = {
				key,
				plots: [],
				sub(plot) {
					s.plots.push(plot);
				},
				unsub(plot) {
					s.plots = s.plots.filter(c => c != plot);
				},
				pub(type, self, x, y, w, h, i) {
					for (let j = 0; j < s.plots.length; j++)
						s.plots[j] != self && s.plots[j].pub(type, self, x, y, w, h, i);
				},
			};

			if (key != null)
				syncs[key] = s;
		}

		return s;
	}

	const BAND_CLIP_FILL   = 1 << 0;
	const BAND_CLIP_STROKE = 1 << 1;

	function orient(u, seriesIdx, cb) {
		const series = u.series[seriesIdx];
		const scales = u.scales;
		const bbox   = u.bbox;
		const scaleX = u.mode == 2 ? scales[series.facets[0].scale] : scales[u.series[0].scale];

		let dx = u._data[0],
			dy = u._data[seriesIdx],
			sx = scaleX,
			sy = u.mode == 2 ? scales[series.facets[1].scale] : scales[series.scale],
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
				bezierCurveToH,
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
				bezierCurveToV,
			)
		);
	}

	// creates inverted band clip path (towards from stroke path -> yMax)
	function clipBandLine(self, seriesIdx, idx0, idx1, strokePath) {
		return orient(self, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
			let pxRound = series.pxRound;

			const dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
			const lineTo = scaleX.ori == 0 ? lineToH : lineToV;

			let frIdx, toIdx;

			if (dir == 1) {
				frIdx = idx0;
				toIdx = idx1;
			}
			else {
				frIdx = idx1;
				toIdx = idx0;
			}

			// path start
			let x0 = pxRound(valToPosX(dataX[frIdx], scaleX, xDim, xOff));
			let y0 = pxRound(valToPosY(dataY[frIdx], scaleY, yDim, yOff));
			// path end x
			let x1 = pxRound(valToPosX(dataX[toIdx], scaleX, xDim, xOff));
			// upper y limit
			let yLimit = pxRound(valToPosY(scaleY.max, scaleY, yDim, yOff));

			let clip = new Path2D(strokePath);

			lineTo(clip, x1, yLimit);
			lineTo(clip, x0, yLimit);
			lineTo(clip, x0, y0);

			return clip;
		});
	}

	function clipGaps(gaps, ori, plotLft, plotTop, plotWid, plotHgt) {
		let clip = null;

		// create clip path (invert gaps and non-gaps)
		if (gaps.length > 0) {
			clip = new Path2D();

			const rect = ori == 0 ? rectH : rectV;

			let prevGapEnd = plotLft;

			for (let i = 0; i < gaps.length; i++) {
				let g = gaps[i];

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
		let prevGap = gaps[gaps.length - 1];

		if (prevGap && prevGap[0] == fromX)			// TODO: gaps must be encoded at stroke widths?
			prevGap[1] = toX;
		else
			gaps.push([fromX, toX]);
	}

	function pxRoundGen(pxAlign) {
		return pxAlign == 0 ? retArg0 : pxAlign == 1 ? round : v => incrRound(v, pxAlign);
	}

	function rect(ori) {
		let moveTo = ori == 0 ?
			moveToH :
			moveToV;

		let arcTo = ori == 0 ?
			(p, x1, y1, x2, y2, r) => { p.arcTo(x1, y1, x2, y2, r); } :
			(p, y1, x1, y2, x2, r) => { p.arcTo(x1, y1, x2, y2, r); };

		let rect = ori == 0 ?
			(p, x, y, w, h) => { p.rect(x, y, w, h); } :
			(p, y, x, h, w) => { p.rect(x, y, w, h); };

		return (p, x, y, w, h, r = 0) => {
			if (r == 0)
				rect(p, x, y, w, h);
			else {
				r = Math.min(r, w / 2, h / 2);

				// adapted from https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas/7838871#7838871
				moveTo(p, x + r, y);
				arcTo(p, x + w, y, x + w, y + h, r);
				arcTo(p, x + w, y + h, x, y + h, r);
				arcTo(p, x, y + h, x, y, r);
				arcTo(p, x, y, x + w, y, r);
				p.closePath();
			}
		};
	}

	// orientation-inverting canvas functions
	const moveToH = (p, x, y) => { p.moveTo(x, y); };
	const moveToV = (p, y, x) => { p.moveTo(x, y); };
	const lineToH = (p, x, y) => { p.lineTo(x, y); };
	const lineToV = (p, y, x) => { p.lineTo(x, y); };
	const rectH = rect(0);
	const rectV = rect(1);
	const arcH = (p, x, y, r, startAngle, endAngle) => { p.arc(x, y, r, startAngle, endAngle); };
	const arcV = (p, y, x, r, startAngle, endAngle) => { p.arc(x, y, r, startAngle, endAngle); };
	const bezierCurveToH = (p, bp1x, bp1y, bp2x, bp2y, p2x, p2y) => { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); };
	const bezierCurveToV = (p, bp1y, bp1x, bp2y, bp2x, p2y, p2x) => { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); };

	// TODO: drawWrap(seriesIdx, drawPoints) (save, restore, translate, clip)
	function points(opts) {
		return (u, seriesIdx, idx0, idx1, filtIdxs) => {
		//	log("drawPoints()", arguments);

			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				let { pxRound, points } = series;

				let moveTo, arc;

				if (scaleX.ori == 0) {
					moveTo = moveToH;
					arc = arcH;
				}
				else {
					moveTo = moveToV;
					arc = arcV;
				}

				const width = roundDec(points.width * pxRatio, 3);

				let rad = (points.size - points.width) / 2 * pxRatio;
				let dia = roundDec(rad * 2, 3);

				let fill = new Path2D();
				let clip = new Path2D();

				let { left: lft, top: top, width: wid, height: hgt } = u.bbox;

				rectH(clip,
					lft - dia,
					top - dia,
					wid + dia * 2,
					hgt + dia * 2,
				);

				const drawPoint = pi => {
					if (dataY[pi] != null) {
						let x = pxRound(valToPosX(dataX[pi], scaleX, xDim, xOff));
						let y = pxRound(valToPosY(dataY[pi], scaleY, yDim, yOff));

						moveTo(fill, x + rad, y);
						arc(fill, x, y, rad, 0, PI * 2);
					}
				};

				if (filtIdxs)
					filtIdxs.forEach(drawPoint);
				else {
					for (let pi = idx0; pi <= idx1; pi++)
						drawPoint(pi);
				}

				return {
					stroke: width > 0 ? fill : null,
					fill,
					clip,
					flags: BAND_CLIP_FILL | BAND_CLIP_STROKE,
				};
			});
		};
	}

	function _drawAcc(lineTo) {
		return (stroke, accX, minY, maxY, inY, outY) => {
			if (minY != maxY) {
				if (inY != minY && outY != minY)
					lineTo(stroke, accX, minY);
				if (inY != maxY && outY != maxY)
					lineTo(stroke, accX, maxY);

				lineTo(stroke, accX, outY);
			}
		};
	}

	const drawAccH = _drawAcc(lineToH);
	const drawAccV = _drawAcc(lineToV);

	function linear() {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				let pxRound = series.pxRound;

				let lineTo, drawAcc;

				if (scaleX.ori == 0) {
					lineTo = lineToH;
					drawAcc = drawAccH;
				}
				else {
					lineTo = lineToV;
					drawAcc = drawAccV;
				}

				const dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				const stroke = _paths.stroke;

				let minY = inf,
					maxY = -inf,
					inY, outY, outX, drawnAtX;

				let gaps = [];

				let accX = pxRound(valToPosX(dataX[dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				let accGaps = false;
				let prevYNull = false;

				// data edges
				let lftIdx = nonNullIdx(dataY, idx0, idx1,  1 * dir);
				let rgtIdx = nonNullIdx(dataY, idx0, idx1, -1 * dir);
				let lftX =  pxRound(valToPosX(dataX[lftIdx], scaleX, xDim, xOff));
				let rgtX =  pxRound(valToPosX(dataX[rgtIdx], scaleX, xDim, xOff));

				if (lftX > xOff)
					addGap(gaps, xOff, lftX);

				for (let i = dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += dir) {
					let x = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

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
							accGaps = prevYNull = true;
					}
					else {
						let _addGap = false;

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
								_addGap = true;

							prevYNull = false;
						}
						else {
							minY = inf;
							maxY = -inf;

							if (dataY[i] === null) {
								accGaps = true;

								if (x - accX > 1)
									_addGap = true;
							}
						}

						_addGap && addGap(gaps, outX, x);

						accX = x;
					}
				}

				if (minY != inf && minY != maxY && drawnAtX != accX)
					drawAcc(stroke, accX, minY, maxY, inY, outY);

				if (rgtX < xOff + xDim)
					addGap(gaps, rgtX, xOff + xDim);

				if (series.fill != null) {
					let fill = _paths.fill = new Path2D(stroke);

					let fillTo = pxRound(valToPosY(series.fillTo(u, seriesIdx, series.min, series.max), scaleY, yDim, yOff));

					lineTo(fill, rgtX, fillTo);
					lineTo(fill, lftX, fillTo);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

				if (!series.spanGaps)
					_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

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
		const align = ifNull(opts.align, 1);
		// whether to draw ascenders/descenders at null/gap bondaries
		const ascDesc = ifNull(opts.ascDesc, false);

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				let pxRound = series.pxRound;

				let lineTo = scaleX.ori == 0 ? lineToH : lineToV;

				const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				const stroke = _paths.stroke;

				const _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				idx0 = nonNullIdx(dataY, idx0, idx1,  1);
				idx1 = nonNullIdx(dataY, idx0, idx1, -1);

				let gaps = [];
				let inGap = false;
				let prevYPos  = pxRound(valToPosY(dataY[_dir == 1 ? idx0 : idx1], scaleY, yDim, yOff));
				let firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				let prevXPos = firstXPos;

				lineTo(stroke, firstXPos, prevYPos);

				for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					let yVal1 = dataY[i];

					let x1 = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

					if (yVal1 == null) {
						if (yVal1 === null) {
							addGap(gaps, prevXPos, x1);
							inGap = true;
						}
						continue;
					}

					let y1 = pxRound(valToPosY(yVal1, scaleY, yDim, yOff));

					if (inGap) {
						addGap(gaps, prevXPos, x1);

						// don't clip vertical extenders
						if (prevYPos != y1) {
							let halfStroke = (series.width * pxRatio) / 2;

							let lastGap = gaps[gaps.length - 1];

							lastGap[0] += (ascDesc || align ==  1) ? halfStroke : -halfStroke;
							lastGap[1] -= (ascDesc || align == -1) ? halfStroke : -halfStroke;
						}

						inGap = false;
					}

					if (align == 1)
						lineTo(stroke, x1, prevYPos);
					else
						lineTo(stroke, prevXPos, y1);

					lineTo(stroke, x1, y1);

					prevYPos = y1;
					prevXPos = x1;
				}

				if (series.fill != null) {
					let fill = _paths.fill = new Path2D(stroke);

					let fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
					let minY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

				if (!series.spanGaps)
					_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

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
		const size = ifNull(opts.size, [0.6, inf, 1]);
		const align = opts.align || 0;
		const extraGap = (opts.gap || 0) * pxRatio;

		const radius = ifNull(opts.radius, 0) * pxRatio;

		const gapFactor = 1 - size[0];
		const maxWidth  = ifNull(size[1], inf) * pxRatio;
		const minWidth  = ifNull(size[2], 1) * pxRatio;

		const disp = opts.disp;
		const _each = ifNull(opts.each, _ => {});

		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				let pxRound = series.pxRound;

				const _dirX = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
				const _dirY = scaleY.dir * (scaleY.ori == 1 ? 1 : -1);

				let rect = scaleX.ori == 0 ? rectH : rectV;

				let each = scaleX.ori == 0 ? _each : (u, seriesIdx, i, top, lft, hgt, wid) => {
					_each(u, seriesIdx, i, lft, top, wid, hgt);
				};

				let fillToY = series.fillTo(u, seriesIdx, series.min, series.max);

				let y0Pos = valToPosY(fillToY, scaleY, yDim, yOff);

				let xShift, barWid;

				let strokeWidth = pxRound(series.width * pxRatio);

				let multiPath = false;

				let fillColors = null;
				let fillPaths = null;
				let strokeColors = null;
				let strokePaths = null;

				if (disp != null) {
					if (disp.fill != null && disp.stroke != null) {
						multiPath = true;

						fillColors = disp.fill.values(u, seriesIdx, idx0, idx1);
						fillPaths = new Map();
						(new Set(fillColors)).forEach(color => {
							if (color != null)
								fillPaths.set(color, new Path2D());
						});

						strokeColors = disp.stroke.values(u, seriesIdx, idx0, idx1);
						strokePaths = new Map();
						(new Set(strokeColors)).forEach(color => {
							if (color != null)
								strokePaths.set(color, new Path2D());
						});
					}

					dataX = disp.x0.values(u, seriesIdx, idx0, idx1);

					if (disp.x0.unit == 2)
						dataX = dataX.map(pct => u.posToVal(xOff + pct * xDim, scaleX.key, true));

					// assumes uniform sizes, for now
					let sizes = disp.size.values(u, seriesIdx, idx0, idx1);

					if (disp.size.unit == 2)
						barWid = sizes[0] * xDim;
					else
						barWid = valToPosX(sizes[0], scaleX, xDim, xOff) - valToPosX(0, scaleX, xDim, xOff); // assumes linear scale (delta from 0)

					barWid = pxRound(barWid - strokeWidth);

					xShift = (_dirX == 1 ? -strokeWidth / 2 : barWid + strokeWidth / 2);
				}
				else {
					let colWid = xDim;

					if (dataX.length > 1) {
						// prior index with non-undefined y data
						let prevIdx = null;

						// scan full dataset for smallest adjacent delta
						// will not work properly for non-linear x scales, since does not do expensive valToPosX calcs till end
						for (let i = 0, minDelta = Infinity; i < dataX.length; i++) {
							if (dataY[i] !== undefined) {
								if (prevIdx != null) {
									let delta = abs(dataX[i] - dataX[prevIdx]);

									if (delta < minDelta) {
										minDelta = delta;
										colWid = abs(valToPosX(dataX[i], scaleX, xDim, xOff) - valToPosX(dataX[prevIdx], scaleX, xDim, xOff));
									}
								}

								prevIdx = i;
							}
						}
					}

					let gapWid = colWid * gapFactor;

					barWid = pxRound(min(maxWidth, max(minWidth, colWid - gapWid)) - strokeWidth - extraGap);

					xShift = (align == 0 ? barWid / 2 : align == _dirX ? 0 : barWid) - align * _dirX * extraGap / 2;
				}

				const _paths = {stroke: null, fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL | BAND_CLIP_STROKE};  // disp, geom

				const hasBands = u.bands.length > 0;
				let yLimit;

				if (hasBands) {
					// ADDL OPT: only create band clips for series that are band lower edges
					// if (b.series[1] == i && _paths.band == null)
					_paths.band = new Path2D();
					yLimit = pxRound(valToPosY(scaleY.max, scaleY, yDim, yOff));
				}

				const stroke = multiPath ? null : new Path2D();
				const band = _paths.band;

				for (let i = _dirX == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dirX) {
					let yVal = dataY[i];

				/*
					// interpolate upwards band clips
					if (yVal == null) {
					//	if (hasBands)
					//		yVal = costlyLerp(i, idx0, idx1, _dirX, dataY);
					//	else
							continue;
					}
				*/

					let xVal = scaleX.distr != 2 || disp != null ? dataX[i] : i;

					// TODO: all xPos can be pre-computed once for all series in aligned set
					let xPos = valToPosX(xVal, scaleX, xDim, xOff);
					let yPos = valToPosY(yVal, scaleY, yDim, yOff);

					let lft = pxRound(xPos - xShift);
					let btm = pxRound(max(yPos, y0Pos));
					let top = pxRound(min(yPos, y0Pos));
					let barHgt = btm - top;

					if (dataY[i] != null) {
						if (multiPath) {
							if (strokeWidth > 0 && strokeColors[i] != null)
								rect(strokePaths.get(strokeColors[i]), lft, top, barWid, barHgt, radius * barWid);

							if (fillColors[i] != null)
								rect(fillPaths.get(fillColors[i]), lft, top, barWid, barHgt, radius * barWid);
						}
						else
							rect(stroke, lft, top, barWid, barHgt, radius * barWid);

						each(u, seriesIdx, i,
							lft    - strokeWidth / 2,
							top    - strokeWidth / 2,
							barWid + strokeWidth,
							barHgt + strokeWidth,
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

						rect(band, lft - strokeWidth / 2, top + strokeWidth / 2, barWid + strokeWidth, barHgt - strokeWidth, 0);
					}
				}

				if (strokeWidth > 0)
					_paths.stroke = multiPath ? strokePaths : stroke;

				_paths.fill = multiPath ? fillPaths : stroke;

				return _paths;
			});
		};
	}

	function splineInterp(interp, opts) {
		return (u, seriesIdx, idx0, idx1) => {
			return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
				let pxRound = series.pxRound;

				let moveTo, bezierCurveTo, lineTo;

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

				const _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

				idx0 = nonNullIdx(dataY, idx0, idx1,  1);
				idx1 = nonNullIdx(dataY, idx0, idx1, -1);

				let gaps = [];
				let inGap = false;
				let firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
				let prevXPos = firstXPos;

				let xCoords = [];
				let yCoords = [];

				for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
					let yVal = dataY[i];
					let xVal = dataX[i];
					let xPos = valToPosX(xVal, scaleX, xDim, xOff);

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

				const _paths = {stroke: interp(xCoords, yCoords, moveTo, lineTo, bezierCurveTo, pxRound), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
				const stroke = _paths.stroke;

				if (series.fill != null && stroke != null) {
					let fill = _paths.fill = new Path2D(stroke);

					let fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
					let minY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

					lineTo(fill, prevXPos, minY);
					lineTo(fill, firstXPos, minY);
				}

				_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

				if (!series.spanGaps)
					_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

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
		const n = xs.length;

		if (n < 2)
			return null;

		const path = new Path2D();

		moveTo(path, xs[0], ys[0]);

		if (n == 2)
			lineTo(path, xs[1], ys[1]);
		else {
			let ms  = Array(n),
				ds  = Array(n - 1),
				dys = Array(n - 1),
				dxs = Array(n - 1);

			// calc deltas and derivative
			for (let i = 0; i < n - 1; i++) {
				dys[i] = ys[i + 1] - ys[i];
				dxs[i] = xs[i + 1] - xs[i];
				ds[i]  = dys[i] / dxs[i];
			}

			// determine desired slope (m) at each point using Fritsch-Carlson method
			// http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation
			ms[0] = ds[0];

			for (let i = 1; i < n - 1; i++) {
				if (ds[i] === 0 || ds[i - 1] === 0 || (ds[i - 1] > 0) !== (ds[i] > 0))
					ms[i] = 0;
				else {
					ms[i] = 3 * (dxs[i - 1] + dxs[i]) / (
						(2 * dxs[i] + dxs[i - 1]) / ds[i - 1] +
						(dxs[i] + 2 * dxs[i - 1]) / ds[i]
					);

					if (!isFinite(ms[i]))
						ms[i] = 0;
				}
			}

			ms[n - 1] = ds[n - 2];

			for (let i = 0; i < n - 1; i++) {
				bezierCurveTo(
					path,
					xs[i] + dxs[i] / 3,
					ys[i] + ms[i] * dxs[i] / 3,
					xs[i + 1] - dxs[i] / 3,
					ys[i + 1] - ms[i + 1] * dxs[i] / 3,
					xs[i + 1],
					ys[i + 1],
				);
			}
		}

		return path;
	}

	const cursorPlots = new Set();

	function invalidateRects() {
		cursorPlots.forEach(u => {
			u.syncRect(true);
		});
	}

	on(resize, win, invalidateRects);
	on(scroll, win, invalidateRects, true);

	const linearPath = linear() ;
	const pointsPath = points() ;

	function setDefaults(d, xo, yo, initY) {
		let d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
		return d2.map((o, i) => setDefault(o, i, xo, yo));
	}

	function setDefaults2(d, xyo) {
		return d.map((o, i) => i == 0 ? null : assign({}, xyo, o));  // todo: assign() will not merge facet arrays
	}

	function setDefault(o, i, xo, yo) {
		return assign({}, (i == 0 ? xo : yo), o);
	}

	function snapNumX(self, dataMin, dataMax) {
		return dataMin == null ? nullNullTuple : [dataMin, dataMax];
	}

	const snapTimeX = snapNumX;

	// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
	// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
	function snapNumY(self, dataMin, dataMax) {
		return dataMin == null ? nullNullTuple : rangeNum(dataMin, dataMax, rangePad, true);
	}

	function snapLogY(self, dataMin, dataMax, scale) {
		return dataMin == null ? nullNullTuple : rangeLog(dataMin, dataMax, self.scales[scale].log, false);
	}

	const snapLogX = snapLogY;

	function snapAsinhY(self, dataMin, dataMax, scale) {
		return dataMin == null ? nullNullTuple : rangeAsinh(dataMin, dataMax, self.scales[scale].log, false);
	}

	const snapAsinhX = snapAsinhY;

	// dim is logical (getClientBoundingRect) pixels, not canvas pixels
	function findIncr(minVal, maxVal, incrs, dim, minSpace) {
		let intDigits = max(numIntDigits(minVal), numIntDigits(maxVal));

		let delta = maxVal - minVal;

		let incrIdx = closestIdx((minSpace / dim) * delta, incrs);

		do {
			let foundIncr = incrs[incrIdx];
			let foundSpace = dim * foundIncr / delta;

			if (foundSpace >= minSpace && intDigits + (foundIncr < 5 ? fixedDec.get(foundIncr) : 0) <= 17)
				return [foundIncr, foundSpace];
		} while (++incrIdx < incrs.length);

		return [0, 0];
	}

	function pxRatioFont(font) {
		let fontSize, fontSizeCss;
		font = font.replace(/(\d+)px/, (m, p1) => (fontSize = round((fontSizeCss = +p1) * pxRatio)) + 'px');
		return [font, fontSize, fontSizeCss];
	}

	function syncFontSize(axis) {
		if (axis.show) {
			[axis.font, axis.labelFont].forEach(f => {
				let size = roundDec(f[2] * pxRatio, 1);
				f[0] = f[0].replace(/[0-9.]+px/, size + 'px');
				f[1] = size;
			});
		}
	}

	function uPlot(opts, data, then) {
		const self = {
			mode: ifNull(opts.mode, 1),
		};

		const mode = self.mode;

		// TODO: cache denoms & mins scale.cache = {r, min, }
		function getValPct(val, scale) {
			let _val = (
				scale.distr == 3 ? log10(val > 0 ? val : scale.clamp(self, val, scale.min, scale.max, scale.key)) :
				scale.distr == 4 ? asinh(val, scale.asinh) :
				val
			);

			return (_val - scale._min) / (scale._max - scale._min);
		}

		function getHPos(val, scale, dim, off) {
			let pct = getValPct(val, scale);
			return off + dim * (scale.dir == -1 ? (1 - pct) : pct);
		}

		function getVPos(val, scale, dim, off) {
			let pct = getValPct(val, scale);
			return off + dim * (scale.dir == -1 ? pct : (1 - pct));
		}

		function getPos(val, scale, dim, off) {
			return scale.ori == 0 ? getHPos(val, scale, dim, off) : getVPos(val, scale, dim, off);
		}

		self.valToPosH = getHPos;
		self.valToPosV = getVPos;

		let ready = false;
		self.status = 0;

		const root = self.root = placeDiv(UPLOT);

		if (opts.id != null)
			root.id = opts.id;

		addClass(root, opts.class);

		if (opts.title) {
			let title = placeDiv(TITLE, root);
			title.textContent = opts.title;
		}

		const can = placeTag("canvas");
		const ctx = self.ctx = can.getContext("2d");

		const wrap = placeDiv(WRAP, root);
		const under = self.under = placeDiv(UNDER, wrap);
		wrap.appendChild(can);
		const over = self.over = placeDiv(OVER, wrap);

		opts = copy(opts);

		const pxAlign = +ifNull(opts.pxAlign, 1);

		const pxRound = pxRoundGen(pxAlign);

		(opts.plugins || []).forEach(p => {
			if (p.opts)
				opts = p.opts(self, opts) || opts;
		});

		const ms = opts.ms || 1e-3;

		const series  = self.series = mode == 1 ?
			setDefaults(opts.series || [], xSeriesOpts, ySeriesOpts, false) :
			setDefaults2(opts.series || [null], xySeriesOpts);
		const axes    = self.axes   = setDefaults(opts.axes   || [], xAxisOpts,   yAxisOpts,    true);
		const scales  = self.scales = {};
		const bands   = self.bands  = opts.bands || [];

		bands.forEach(b => {
			b.fill = fnOrSelf(b.fill || null);
		});

		const xScaleKey = mode == 2 ? series[1].facets[0].scale : series[0].scale;

		const drawOrderMap = {
			axes: drawAxesGrid,
			series: drawSeries,
		};

		const drawOrder = (opts.drawOrder || ["axes", "series"]).map(key => drawOrderMap[key]);

		function initScale(scaleKey) {
			let sc = scales[scaleKey];

			if (sc == null) {
				let scaleOpts = (opts.scales || EMPTY_OBJ)[scaleKey] || EMPTY_OBJ;

				if (scaleOpts.from != null) {
					// ensure parent is initialized
					initScale(scaleOpts.from);
					// dependent scales inherit
					scales[scaleKey] = assign({}, scales[scaleOpts.from], scaleOpts, {key: scaleKey});
				}
				else {
					sc = scales[scaleKey] = assign({}, (scaleKey == xScaleKey ? xScaleOpts : yScaleOpts), scaleOpts);

					if (mode == 2)
						sc.time = false;

					sc.key = scaleKey;

					let isTime = sc.time;

					let rn = sc.range;

					let rangeIsArr = isArr(rn);

					if (scaleKey != xScaleKey || mode == 2) {
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
							let cfg = rn;
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

		// TODO: init scales from facets in mode: 2
		if (mode == 1) {
			series.forEach(s => {
				initScale(s.scale);
			});
		}

		axes.forEach(a => {
			initScale(a.scale);
		});

		for (let k in opts.scales)
			initScale(k);

		const scaleX = scales[xScaleKey];

		const xScaleDistr = scaleX.distr;

		let valToPosX, valToPosY;

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

		const pendScales = {};

		// explicitly-set initial scales
		for (let k in scales) {
			let sc = scales[k];

			if (sc.min != null || sc.max != null) {
				pendScales[k] = {min: sc.min, max: sc.max};
				sc.min = sc.max = null;
			}
		}

	//	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
		const _tzDate  = (opts.tzDate || (ts => new Date(round(ts / ms))));
		const _fmtDate = (opts.fmtDate || fmtDate);

		const _timeAxisSplits = (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
		const _timeAxisVals   = timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
		const _timeSeriesVal  = timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

		const activeIdxs = [];

		const legend     = (self.legend = assign({}, legendOpts, opts.legend));
		const showLegend = legend.show;
		const markers    = legend.markers;

		{
			legend.idxs = activeIdxs;

			markers.width  = fnOrSelf(markers.width);
			markers.dash   = fnOrSelf(markers.dash);
			markers.stroke = fnOrSelf(markers.stroke);
			markers.fill   = fnOrSelf(markers.fill);
		}

		let legendEl;
		let legendRows = [];
		let legendCells = [];
		let legendCols;
		let multiValLegend = false;
		let NULL_LEGEND_VALUES = {};

		if (legend.live) {
			const getMultiVals = series[1] ? series[1].values : null;
			multiValLegend = getMultiVals != null;
			legendCols = multiValLegend ? getMultiVals(self, 1, 0) : {_: 0};

			for (let k in legendCols)
				NULL_LEGEND_VALUES[k] = "--";
		}

		if (showLegend) {
			legendEl = placeTag("table", LEGEND, root);

			if (multiValLegend) {
				let head = placeTag("tr", LEGEND_THEAD, legendEl);
				placeTag("th", null, head);

				for (var key in legendCols)
					placeTag("th", LEGEND_LABEL, head).textContent = key;
			}
			else {
				addClass(legendEl, LEGEND_INLINE);
				legend.live && addClass(legendEl, LEGEND_LIVE);
			}
		}

		const son  = {show: true};
		const soff = {show: false};

		function initLegendRow(s, i) {
			if (i == 0 && (multiValLegend || !legend.live || mode == 2))
				return nullNullTuple;

			let cells = [];

			let row = placeTag("tr", LEGEND_SERIES, legendEl, legendEl.childNodes[i]);

			addClass(row, s.class);

			if (!s.show)
				addClass(row, OFF);

			let label = placeTag("th", null, row);

			if (markers.show) {
				let indic = placeDiv(LEGEND_MARKER, label);

				if (i > 0) {
					let width  = markers.width(self, i);

					if (width)
						indic.style.border = width + "px " + markers.dash(self, i) + " " + markers.stroke(self, i);

					indic.style.background = markers.fill(self, i);
				}
			}

			let text = placeDiv(LEGEND_LABEL, label);
			text.textContent = s.label;

			if (i > 0) {
				if (!markers.show)
					text.style.color = s.width > 0 ? markers.stroke(self, i) : markers.fill(self, i);

				onMouse("click", label, e => {
					if (cursor._lock)
						return;

					let seriesIdx = series.indexOf(s);

					if ((e.ctrlKey || e.metaKey) != legend.isolate) {
						// if any other series is shown, isolate this one. else show all
						let isolate = series.some((s, i) => i > 0 && i != seriesIdx && s.show);

						series.forEach((s, i) => {
							i > 0 && setSeries(i, isolate ? (i == seriesIdx ? son : soff) : son, true, syncOpts.setSeries);
						});
					}
					else
						setSeries(seriesIdx, {show: !s.show}, true, syncOpts.setSeries);
				});

				if (cursorFocus) {
					onMouse(mouseenter, label, e => {
						if (cursor._lock)
							return;

						setSeries(series.indexOf(s), FOCUS_TRUE, true, syncOpts.setSeries);
					});
				}
			}

			for (var key in legendCols) {
				let v = placeTag("td", LEGEND_VALUE, row);
				v.textContent = "--";
				cells.push(v);
			}

			return [row, cells];
		}

		const mouseListeners = new Map();

		function onMouse(ev, targ, fn) {
			const targListeners = mouseListeners.get(targ) || {};
			const listener = cursor.bind[ev](self, targ, fn);

			if (listener) {
				on(ev, targ, targListeners[ev] = listener);
				mouseListeners.set(targ, targListeners);
			}
		}

		function offMouse(ev, targ, fn) {
			const targListeners = mouseListeners.get(targ) || {};

			for (let k in targListeners) {
				if (ev == null || k == ev) {
					off(k, targ, targListeners[k]);
					delete targListeners[k];
				}
			}

			if (ev == null)
				mouseListeners.delete(targ);
		}

		let fullWidCss = 0;
		let fullHgtCss = 0;

		let plotWidCss = 0;
		let plotHgtCss = 0;

		// plot margins to account for axes
		let plotLftCss = 0;
		let plotTopCss = 0;

		let plotLft = 0;
		let plotTop = 0;
		let plotWid = 0;
		let plotHgt = 0;

		self.bbox = {};

		let shouldSetScales = false;
		let shouldSetSize = false;
		let shouldConvergeSize = false;
		let shouldSetCursor = false;
		let shouldSetLegend = false;

		function _setSize(width, height, force) {
			if (force || (width != self.width || height != self.height))
				calcSize(width, height);

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

			let bb = self.bbox;

			plotLft = bb.left   = incrRound(plotLftCss * pxRatio, 0.5);
			plotTop = bb.top    = incrRound(plotTopCss * pxRatio, 0.5);
			plotWid = bb.width  = incrRound(plotWidCss * pxRatio, 0.5);
			plotHgt = bb.height = incrRound(plotHgtCss * pxRatio, 0.5);

		//	updOriDims();
		}

		// ensures size calc convergence
		const CYCLE_LIMIT = 3;

		function convergeSize() {
			let converged = false;

			let cycleNum = 0;

			while (!converged) {
				cycleNum++;

				let axesConverged = axesCalc(cycleNum);
				let paddingConverged = paddingCalc(cycleNum);

				converged = cycleNum == CYCLE_LIMIT || (axesConverged && paddingConverged);

				if (!converged) {
					calcSize(self.width, self.height);
					shouldSetSize = true;
				}
			}
		}

		function setSize({width, height}) {
			_setSize(width, height);
		}

		self.setSize = setSize;

		// accumulate axis offsets, reduce canvas width
		function calcPlotRect() {
			// easements for edge labels
			let hasTopAxis = false;
			let hasBtmAxis = false;
			let hasRgtAxis = false;
			let hasLftAxis = false;

			axes.forEach((axis, i) => {
				if (axis.show && axis._show) {
					let {side, _size} = axis;
					let isVt = side % 2;
					let labelSize = axis.label != null ? axis.labelSize : 0;

					let fullSize = _size + labelSize;

					if (fullSize > 0) {
						if (isVt) {
							plotWidCss -= fullSize;

							if (side == 3) {
								plotLftCss += fullSize;
								hasLftAxis = true;
							}
							else
								hasRgtAxis = true;
						}
						else {
							plotHgtCss -= fullSize;

							if (side == 0) {
								plotTopCss += fullSize;
								hasTopAxis = true;
							}
							else
								hasBtmAxis = true;
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
			let off1 = plotLftCss + plotWidCss;
			let off2 = plotTopCss + plotHgtCss;
			// will accum -
			let off3 = plotLftCss;
			let off0 = plotTopCss;

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
					let side = axis.side;

					axis._pos = incrOffset(side, axis._size);

					if (axis.label != null)
						axis._lpos = incrOffset(side, axis.labelSize);
				}
			});
		}

		const cursor = (self.cursor = assign({}, cursorOpts, {drag: {y: mode == 2}}, opts.cursor));

		{
			cursor.idxs = activeIdxs;

			cursor._lock = false;

			let points = cursor.points;

			points.show   = fnOrSelf(points.show);
			points.size   = fnOrSelf(points.size);
			points.stroke = fnOrSelf(points.stroke);
			points.width  = fnOrSelf(points.width);
			points.fill   = fnOrSelf(points.fill);
		}

		const focus = self.focus = assign({}, opts.focus || {alpha: 0.3}, cursor.focus);
		const cursorFocus = focus.prox >= 0;

		// series-intersection markers
		let cursorPts = [null];

		function initCursorPt(s, si) {
			if (si > 0) {
				let pt = cursor.points.show(self, si);

				if (pt) {
					addClass(pt, CURSOR_PT);
					addClass(pt, s.class);
					elTrans(pt, -10, -10, plotWidCss, plotHgtCss);
					over.insertBefore(pt, cursorPts[si]);

					return pt;
				}
			}
		}

		function initSeries(s, i) {
			if (mode == 1 || i > 0) {
				let isTime = mode == 1 && scales[s.scale].time;

				let sv = s.value;
				s.value = isTime ? (isStr(sv) ? timeSeriesVal(_tzDate, timeSeriesStamp(sv, _fmtDate)) : sv || _timeSeriesVal) : sv || numSeriesVal;
				s.label = s.label || (isTime ? timeSeriesLabel : numSeriesLabel);
			}

			if (i > 0) {
				s.width  = s.width == null ? 1 : s.width;
				s.paths  = s.paths || linearPath || retNull;
				s.fillTo = fnOrSelf(s.fillTo || seriesFillTo);
				s.pxAlign = +ifNull(s.pxAlign, pxAlign);
				s.pxRound = pxRoundGen(s.pxAlign);

				s.stroke = fnOrSelf(s.stroke || null);
				s.fill   = fnOrSelf(s.fill || null);
				s._stroke = s._fill = s._paths = s._focus = null;

				let _ptDia = ptDia(s.width, 1);
				let points = s.points = assign({}, {
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
				let rowCells = initLegendRow(s, i);
				legendRows.splice(i, 0, rowCells[0]);
				legendCells.splice(i, 0, rowCells[1]);
				legend.values.push(null);	// NULL_LEGEND_VALS not yet avil here :(
			}

			if (cursor.show) {
				activeIdxs.splice(i, 0, null);

				let pt = initCursorPt(s, i);
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
				let tr = legendRows.splice(i, 1)[0];
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

		const sidesWithAxes = [false, false, false, false];

		function initAxis(axis, i) {
			axis._show = axis.show;

			if (axis.show) {
				let isVt = axis.side % 2;

				let sc = scales[axis.scale];

				// this can occur if all series specify non-default scales
				if (sc == null) {
					axis.scale = isVt ? series[1].scale : xScaleKey;
					sc = scales[axis.scale];
				}

				// also set defaults for incrs & values based on axis distr
				let isTime = sc.time;

				axis.size   = fnOrSelf(axis.size);
				axis.space  = fnOrSelf(axis.space);
				axis.rotate = fnOrSelf(axis.rotate);
				axis.incrs  = fnOrSelf(axis.incrs  || (          sc.distr == 2 ? wholeIncrs : (isTime ? (ms == 1 ? timeIncrsMs : timeIncrsS) : numIncrs)));
				axis.splits = fnOrSelf(axis.splits || (isTime && sc.distr == 1 ? _timeAxisSplits : sc.distr == 3 ? logAxisSplits : sc.distr == 4 ? asinhAxisSplits : numAxisSplits));

				axis.stroke       = fnOrSelf(axis.stroke);
				axis.grid.stroke  = fnOrSelf(axis.grid.stroke);
				axis.ticks.stroke = fnOrSelf(axis.ticks.stroke);

				let av = axis.values;

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
					sidesWithAxes[i] = true;

				axis._el = placeDiv(AXIS, wrap);

				// debug
			//	axis._el.style.background = "#"  + Math.floor(Math.random()*16777215).toString(16) + '80';
			}
		}

		function autoPadSide(self, side, sidesWithAxes, cycleNum) {
			let [hasTopAxis, hasRgtAxis, hasBtmAxis, hasLftAxis] = sidesWithAxes;

			let ori = side % 2;
			let size = 0;

			if (ori == 0 && (hasLftAxis || hasRgtAxis))
				size = (side == 0 && !hasTopAxis || side == 2 && !hasBtmAxis ? round(xAxisOpts.size / 3) : 0);
			if (ori == 1 && (hasTopAxis || hasBtmAxis))
				size = (side == 1 && !hasRgtAxis || side == 3 && !hasLftAxis ? round(yAxisOpts.size / 2) : 0);

			return size;
		}

		const padding = self.padding = (opts.padding || [autoPadSide,autoPadSide,autoPadSide,autoPadSide]).map(p => fnOrSelf(ifNull(p, autoPadSide)));
		const _padding = self._padding = padding.map((p, i) => p(self, i, sidesWithAxes, 0));

		let dataLen;

		// rendered data window
		let i0 = null;
		let i1 = null;
		const idxs = mode == 1 ? series[0].idxs : null;

		let data0 = null;

		let viaAutoScaleX = false;

		function setData(_data, _resetScales) {
			if (mode == 2) {
				dataLen = 0;
				for (let i = 1; i < series.length; i++)
					dataLen += data[i][0].length;
				self.data = data = _data;
			}
			else {
				data = (_data || []).slice();
				data[0] = data[0] || [];

				self.data = data.slice();
				data0 = data[0];
				dataLen = data0.length;

				if (xScaleDistr == 2)
					data[0] = data0.map((v, i) => i);
			}

			self._data = data;

			resetYSeries(true);

			fire("setData");

			if (_resetScales !== false) {
				let xsc = scaleX;

				if (xsc.auto(self, viaAutoScaleX))
					autoScaleX();
				else
					_setScale(xScaleKey, xsc.min, xsc.max);

				shouldSetCursor = cursor.left >= 0;
				shouldSetLegend = true;
				commit();
			}
		}

		self.setData = setData;

		function autoScaleX() {
			viaAutoScaleX = true;

			let _min, _max;

			if (mode == 1) {
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
							[_min, _max] = rangeLog(_min, _min, scaleX.log, false);
						else if (xScaleDistr == 4)
							[_min, _max] = rangeAsinh(_min, _min, scaleX.log, false);
						else if (scaleX.time)
							_max = _min + round(86400 / ms);
						else
							[_min, _max] = rangeNum(_min, _max, rangePad, true);
					}
				}
				else {
					i0 = idxs[0] = _min = null;
					i1 = idxs[1] = _max = null;
				}
			}

			_setScale(xScaleKey, _min, _max);
		}

		let ctxStroke, ctxFill, ctxWidth, ctxDash, ctxJoin, ctxCap, ctxFont, ctxAlign, ctxBaseline;
		let ctxAlpha;

		function setCtxStyle(stroke = transparent, width, dash = EMPTY_ARR, cap = "butt", fill = transparent, join = "round") {
			if (stroke != ctxStroke)
				ctx.strokeStyle = ctxStroke = stroke;
			if (fill != ctxFill)
				ctx.fillStyle = ctxFill = fill;
			if (width != ctxWidth)
				ctx.lineWidth = ctxWidth = width;
			if (join != ctxJoin)
				ctx.lineJoin = ctxJoin = join;
			if (cap != ctxCap)
				ctx.lineCap = ctxCap = cap; // (‿|‿)
			if (dash != ctxDash)
				ctx.setLineDash(ctxDash = dash);
		}

		function setFontStyle(font, fill, align, baseline) {
			if (fill != ctxFill)
				ctx.fillStyle = ctxFill = fill;
			if (font != ctxFont)
				ctx.font = ctxFont = font;
			if (align != ctxAlign)
				ctx.textAlign = ctxAlign = align;
			if (baseline != ctxBaseline)
				ctx.textBaseline = ctxBaseline = baseline;
		}

		function accScale(wsc, psc, facet, data) {
			if (wsc.auto(self, viaAutoScaleX) && (psc == null || psc.min == null)) {
				let _i0 = ifNull(i0, 0);
				let _i1 = ifNull(i1, data.length - 1);

				// only run getMinMax() for invalidated series data, else reuse
				let minMax = facet.min == null ? (wsc.distr == 3 ? getMinMaxLog(data, _i0, _i1) : getMinMax(data, _i0, _i1)) : [facet.min, facet.max];

				// initial min/max
				wsc.min = min(wsc.min, facet.min = minMax[0]);
				wsc.max = max(wsc.max, facet.max = minMax[1]);
			}
		}

		function setScales() {
		//	log("setScales()", arguments);

			// wip scales
			let wipScales = copy(scales, fastIsObj);

			for (let k in wipScales) {
				let wsc = wipScales[k];
				let psc = pendScales[k];

				if (psc != null && psc.min != null) {
					assign(wsc, psc);

					// explicitly setting the x-scale invalidates everything (acts as redraw)
					if (k == xScaleKey)
						resetYSeries(true);
				}
				else if (k != xScaleKey || mode == 2) {
					if (dataLen == 0 && wsc.from == null) {
						let minMax = wsc.range(self, null, null, k);
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
					if (mode == 1) {
						let k = s.scale;
						let wsc = wipScales[k];
						let psc = pendScales[k];

						if (i == 0) {
							let minMax = wsc.range(self, wsc.min, wsc.max, k);

							wsc.min = minMax[0];
							wsc.max = minMax[1];

							i0 = closestIdx(wsc.min, data[0]);
							i1 = closestIdx(wsc.max, data[0]);

							// closest indices can be outside of view
							if (data[0][i0] < wsc.min)
								i0++;
							if (data[0][i1] > wsc.max)
								i1--;

							s.min = data0[i0];
							s.max = data0[i1];
						}
						else if (s.show && s.auto)
							accScale(wsc, psc, s, data[i]);

						s.idxs[0] = i0;
						s.idxs[1] = i1;
					}
					else {
						if (i > 0) {
							if (s.show && s.auto) {
								// TODO: only handles, assumes and requires facets[0] / 'x' scale, and facets[1] / 'y' scale
								let [ xFacet, yFacet ] = s.facets;
								let xScaleKey = xFacet.scale;
								let yScaleKey = yFacet.scale;
								let [ xData, yData ] = data[i];

								accScale(wipScales[xScaleKey], pendScales[xScaleKey], xFacet, xData);
								accScale(wipScales[yScaleKey], pendScales[yScaleKey], yFacet, yData);

								// temp
								s.min = yFacet.min;
								s.max = yFacet.max;
							}
						}
					}
				});

				// range independent scales
				for (let k in wipScales) {
					let wsc = wipScales[k];
					let psc = pendScales[k];

					if (wsc.from == null && (psc == null || psc.min == null)) {
						let minMax = wsc.range(
							self,
							wsc.min ==  inf ? null : wsc.min,
							wsc.max == -inf ? null : wsc.max,
							k
						);
						wsc.min = minMax[0];
						wsc.max = minMax[1];
					}
				}
			}

			// range dependent scales
			for (let k in wipScales) {
				let wsc = wipScales[k];

				if (wsc.from != null) {
					let base = wipScales[wsc.from];

					if (base.min == null)
						wsc.min = wsc.max = null;
					else {
						let minMax = wsc.range(self, base.min, base.max, k);
						wsc.min = minMax[0];
						wsc.max = minMax[1];
					}
				}
			}

			let changed = {};
			let anyChanged = false;

			for (let k in wipScales) {
				let wsc = wipScales[k];
				let sc = scales[k];

				if (sc.min != wsc.min || sc.max != wsc.max) {
					sc.min = wsc.min;
					sc.max = wsc.max;

					let distr = sc.distr;

					sc._min = distr == 3 ? log10(sc.min) : distr == 4 ? asinh(sc.min, sc.asinh) : sc.min;
					sc._max = distr == 3 ? log10(sc.max) : distr == 4 ? asinh(sc.max, sc.asinh) : sc.max;

					changed[k] = anyChanged = true;
				}
			}

			if (anyChanged) {
				// invalidate paths of all series on changed scales
				series.forEach((s, i) => {
					if (mode == 2) {
						if (i > 0 && changed.y)
							s._paths = null;
					}
					else {
						if (changed[s.scale])
							s._paths = null;
					}
				});

				for (let k in changed) {
					shouldConvergeSize = true;
					fire("setScale", k);
				}

				if (cursor.show)
					shouldSetCursor = shouldSetLegend = cursor.left >= 0;
			}

			for (let k in pendScales)
				pendScales[k] = null;
		}

		// grabs the nearest indices with y data outside of x-scale limits
		function getOuterIdxs(ydata) {
			let _i0 = clamp(i0 - 1, 0, dataLen - 1);
			let _i1 = clamp(i1 + 1, 0, dataLen - 1);

			while (ydata[_i0] == null && _i0 > 0)
				_i0--;

			while (ydata[_i1] == null && _i1 < dataLen - 1)
				_i1++;

			return [_i0, _i1];
		}

		function drawSeries() {
			if (dataLen > 0) {
				series.forEach((s, i) => {
					if (i > 0 && s.show && s._paths == null) {
						let _idxs = getOuterIdxs(data[i]);
						s._paths = s.paths(self, i, _idxs[0], _idxs[1]);
					}
				});

				series.forEach((s, i) => {
					if (i > 0 && s.show) {
						if (ctxAlpha != s.alpha)
							ctx.globalAlpha = ctxAlpha = s.alpha;

						{
							cacheStrokeFill(i, false);
							s._paths && drawPath(i, false);
						}

						{
							cacheStrokeFill(i, true);

							let show = s.points.show(self, i, i0, i1);
							let idxs = s.points.filter(self, i, show, s._paths ? s._paths.gaps : null);

							if (show || idxs) {
								s.points._paths = s.points.paths(self, i, i0, i1, idxs);
								drawPath(i, true);
							}
						}

						if (ctxAlpha != 1)
							ctx.globalAlpha = ctxAlpha = 1;

						fire("drawSeries", i);
					}
				});
			}
		}

		function cacheStrokeFill(si, _points) {
			let s = _points ? series[si].points : series[si];

			s._stroke = s.stroke(self, si);
			s._fill   = s.fill(self, si);
		}

		function drawPath(si, _points) {
			let s = _points ? series[si].points : series[si];

			let strokeStyle = s._stroke;
			let fillStyle   = s._fill;

			let { stroke, fill, clip: gapsClip, flags } = s._paths;
			let boundsClip = null;
			let width = roundDec(s.width * pxRatio, 3);
			let offset = (width % 2) / 2;

			if (_points && fillStyle == null)
				fillStyle = width > 0 ? "#fff" : strokeStyle;

			let _pxAlign = s.pxAlign == 1;

			_pxAlign && ctx.translate(offset, offset);

			if (!_points) {
				let lft = plotLft,
					top = plotTop,
					wid = plotWid,
					hgt = plotHgt;

				let halfWid = width * pxRatio / 2;

				if (s.min == 0)
					hgt += halfWid;

				if (s.max == 0) {
					top -= halfWid;
					hgt += halfWid;
				}

				boundsClip = new Path2D();
				boundsClip.rect(lft, top, wid, hgt);
			}

			// the points pathbuilder's gapsClip is its boundsClip, since points dont need gaps clipping, and bounds depend on point size
			if (_points)
				strokeFill(strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, flags, gapsClip);
			else
				fillStroke(si, strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, flags, boundsClip, gapsClip);

			_pxAlign && ctx.translate(-offset, -offset);
		}

		function fillStroke(si, strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip) {
			let didStrokeFill = false;

			// for all bands where this series is the top edge, create upwards clips using the bottom edges
			// and apply clips + fill with band fill or dfltFill
			bands.forEach((b, bi) => {
				// isUpperEdge?
				if (b.series[0] == si) {
					let lowerEdge = series[b.series[1]];
					let lowerData = data[b.series[1]];

					let bandClip = (lowerEdge._paths || EMPTY_OBJ).band;
					let gapsClip2;

					let _fillStyle = null;

					// hasLowerEdge?
					if (lowerEdge.show && bandClip && hasData(lowerData, i0, i1)) {
						_fillStyle = b.fill(self, bi) || fillStyle;
						gapsClip2 = lowerEdge._paths.clip;
					}
					else
						bandClip = null;

					strokeFill(strokeStyle, lineWidth, lineDash, lineCap, _fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip, gapsClip2, bandClip);

					didStrokeFill = true;
				}
			});

			if (!didStrokeFill)
				strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip);
		}

		const CLIP_FILL_STROKE = BAND_CLIP_FILL | BAND_CLIP_STROKE;

		function strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip, gapsClip2, bandClip) {
			setCtxStyle(strokeStyle, lineWidth, lineDash, lineCap, fillStyle);

			if (boundsClip || gapsClip || bandClip) {
				ctx.save();
				boundsClip && ctx.clip(boundsClip);
				gapsClip && ctx.clip(gapsClip);
			}

			if (bandClip) {
				if ((flags & CLIP_FILL_STROKE) == CLIP_FILL_STROKE) {
					ctx.clip(bandClip);
					gapsClip2 && ctx.clip(gapsClip2);
					doFill(fillStyle, fillPath);
					doStroke(strokeStyle, strokePath, lineWidth);
				}
				else if (flags & BAND_CLIP_STROKE) {
					doFill(fillStyle, fillPath);
					ctx.clip(bandClip);
					doStroke(strokeStyle, strokePath, lineWidth);
				}
				else if (flags & BAND_CLIP_FILL) {
					ctx.save();
					ctx.clip(bandClip);
					gapsClip2 && ctx.clip(gapsClip2);
					doFill(fillStyle, fillPath);
					ctx.restore();
					doStroke(strokeStyle, strokePath, lineWidth);
				}
			}
			else {
				doFill(fillStyle, fillPath);
				doStroke(strokeStyle, strokePath, lineWidth);
			}

			if (boundsClip || gapsClip || bandClip)
				ctx.restore();
		}

		function doStroke(strokeStyle, strokePath, lineWidth) {
			if (lineWidth > 0) {
				if (strokePath instanceof Map) {
					strokePath.forEach((strokePath, strokeStyle) => {
						ctx.strokeStyle = ctxStroke = strokeStyle;
						ctx.stroke(strokePath);
					});
				}
				else
					strokePath != null && strokeStyle && ctx.stroke(strokePath);
			}
		}

		function doFill(fillStyle, fillPath) {
			if (fillPath instanceof Map) {
				fillPath.forEach((fillPath, fillStyle) => {
					ctx.fillStyle = ctxFill = fillStyle;
					ctx.fill(fillPath);
				});
			}
			else
				fillPath != null && fillStyle && ctx.fill(fillPath);
		}

		function getIncrSpace(axisIdx, min, max, fullDim) {
			let axis = axes[axisIdx];

			let incrSpace;

			if (fullDim <= 0)
				incrSpace = [0, 0];
			else {
				let minSpace = axis._space = axis.space(self, axisIdx, min, max, fullDim);
				let incrs    = axis._incrs = axis.incrs(self, axisIdx, min, max, fullDim, minSpace);
				incrSpace    = findIncr(min, max, incrs, fullDim, minSpace);
			}

			return (axis._found = incrSpace);
		}

		function drawOrthoLines(offs, filts, ori, side, pos0, len, width, stroke, dash, cap) {
			let offset = (width % 2) / 2;

			pxAlign == 1 && ctx.translate(offset, offset);

			setCtxStyle(stroke, width, dash, cap, stroke);

			ctx.beginPath();

			let x0, y0, x1, y1, pos1 = pos0 + (side == 0 || side == 3 ? -len : len);

			if (ori == 0) {
				y0 = pos0;
				y1 = pos1;
			}
			else {
				x0 = pos0;
				x1 = pos1;
			}

			for (let i = 0; i < offs.length; i++) {
				if (filts[i] != null) {
					if (ori == 0)
						x0 = x1 = offs[i];
					else
						y0 = y1 = offs[i];

					ctx.moveTo(x0, y0);
					ctx.lineTo(x1, y1);
				}
			}

			ctx.stroke();

			pxAlign == 1 && ctx.translate(-offset, -offset);
		}

		function axesCalc(cycleNum) {
		//	log("axesCalc()", arguments);

			let converged = true;

			axes.forEach((axis, i) => {
				if (!axis.show)
					return;

				let scale = scales[axis.scale];

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

				let side = axis.side;
				let ori = side % 2;

				let {min, max} = scale;		// 		// should this toggle them ._show = false

				let [_incr, _space] = getIncrSpace(i, min, max, ori == 0 ? plotWidCss : plotHgtCss);

				if (_space == 0)
					return;

				// if we're using index positions, force first tick to match passed index
				let forceMin = scale.distr == 2;

				let _splits = axis._splits = axis.splits(self, i, min, max, _incr, _space, forceMin);

				// tick labels
				// BOO this assumes a specific data/series
				let splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
				let incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

				let values = axis._values = axis.values(self, axis.filter(self, splits, i, _space, incr), i, _space, incr);

				// rotating of labels only supported on bottom x axis
				axis._rotate = side == 2 ? axis.rotate(self, values, i, _space) : 0;

				let oldSize = axis._size;

				axis._size = ceil(axis.size(self, values, i, cycleNum));

				if (oldSize != null && axis._size != oldSize)			// ready && ?
					converged = false;
			});

			return converged;
		}

		function paddingCalc(cycleNum) {
			let converged = true;

			padding.forEach((p, i) => {
				let _p = p(self, i, sidesWithAxes, cycleNum);

				if (_p != _padding[i])
					converged = false;

				_padding[i] = _p;
			});

			return converged;
		}

		function drawAxesGrid() {
			for (let i = 0; i < axes.length; i++) {
				let axis = axes[i];

				if (!axis.show || !axis._show)
					continue;

				let side = axis.side;
				let ori = side % 2;

				let x, y;

				let fillStyle = axis.stroke(self, i);

				let shiftDir = side == 0 || side == 3 ? -1 : 1;

				// axis label
				if (axis.label) {
					let shiftAmt = axis.labelGap * shiftDir;
					let baseLpos = round((axis._lpos + shiftAmt) * pxRatio);

					setFontStyle(axis.labelFont[0], fillStyle, "center", side == 2 ? TOP : BOTTOM);

					ctx.save();

					if (ori == 1) {
						x = y = 0;

						ctx.translate(
							baseLpos,
							round(plotTop + plotHgt / 2),
						);
						ctx.rotate((side == 3 ? -PI : PI) / 2);

					}
					else {
						x = round(plotLft + plotWid / 2);
						y = baseLpos;
					}

					ctx.fillText(axis.label, x, y);

					ctx.restore();
				}

				let [_incr, _space] = axis._found;

				if (_space == 0)
					continue;

				let scale = scales[axis.scale];

				let plotDim = ori == 0 ? plotWid : plotHgt;
				let plotOff = ori == 0 ? plotLft : plotTop;

				let axisGap = round(axis.gap * pxRatio);

				let _splits = axis._splits;

				// tick labels
				// BOO this assumes a specific data/series
				let splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
				let incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

				let ticks = axis.ticks;
				let tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

				// rotating of labels only supported on bottom x axis
				let angle = axis._rotate * -PI/180;

				let basePos  = pxRound(axis._pos * pxRatio);
				let shiftAmt = (tickSize + axisGap) * shiftDir;
				let finalPos = basePos + shiftAmt;
				    y        = ori == 0 ? finalPos : 0;
				    x        = ori == 1 ? finalPos : 0;

				let font         = axis.font[0];
				let textAlign    = axis.align == 1 ? LEFT :
				                   axis.align == 2 ? RIGHT :
				                   angle > 0 ? LEFT :
				                   angle < 0 ? RIGHT :
				                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
				let textBaseline = angle ||
				                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

				setFontStyle(font, fillStyle, textAlign, textBaseline);

				let lineHeight = axis.font[1] * lineMult;

				let canOffs = _splits.map(val => pxRound(getPos(val, scale, plotDim, plotOff)));

				let _values = axis._values;

				for (let i = 0; i < _values.length; i++) {
					let val = _values[i];

					if (val != null) {
						if (ori == 0)
							x = canOffs[i];
						else
							y = canOffs[i];

						val = "" + val;

						let _parts = val.indexOf("\n") == -1 ? [val] : val.split(/\n/gm);

						for (let j = 0; j < _parts.length; j++) {
							let text = _parts[j];

							if (angle) {
								ctx.save();
								ctx.translate(x, y + j * lineHeight); // can this be replaced with position math?
								ctx.rotate(angle); // can this be done once?
								ctx.fillText(text, 0, 0);
								ctx.restore();
							}
							else
								ctx.fillText(text, x, y + j * lineHeight);
						}
					}
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
						ticks.cap,
					);
				}

				// grid
				let grid = axis.grid;

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
						grid.cap,
					);
				}
			}

			fire("drawAxes");
		}

		function resetYSeries(minMax) {
		//	log("resetYSeries()", arguments);

			series.forEach((s, i) => {
				if (i > 0) {
					s._paths = null;

					if (minMax) {
						if (mode == 1) {
							s.min = null;
							s.max = null;
						}
						else {
							s.facets.forEach(f => {
								f.min = null;
								f.max = null;
							});
						}
					}
				}
			});
		}

		let queuedCommit = false;

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

				// NOTE: mutating this during print preview in Chrome forces transparent
				// canvas pixels to white, even when followed up with clearRect() below
				can.width  = round(fullWidCss * pxRatio);
				can.height = round(fullHgtCss * pxRatio);


				axes.forEach(a => {
					let { _show, _el, _size, _pos, side } = a;

					if (_show) {
						let posOffset = (side === 3 || side === 0 ? _size : 0);
						let isVt = side % 2 == 1;

						setStylePx(_el, isVt ? "left"   : "top",    _pos - posOffset);
						setStylePx(_el, isVt ? "width"  : "height", _size);
						setStylePx(_el, isVt ? "top"    : "left",   isVt ? plotTopCss : plotLftCss);
						setStylePx(_el, isVt ? "height" : "width",  isVt ? plotHgtCss : plotWidCss);

						_el && remClass(_el, OFF);
					}
					else
						_el && addClass(_el, OFF);
				});

				// invalidate ctx style cache
				ctxStroke = ctxFill = ctxWidth = ctxJoin = ctxCap = ctxFont = ctxAlign = ctxBaseline = ctxDash = null;
				ctxAlpha = 1;

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
				updateCursor(null, true, false);
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
				_setScale(xScaleKey, scaleX.min, scaleX.max);
			else
				commit();
		};

		// redraw() => setScale('x', scales.x.min, scales.x.max);

		// explicit, never re-ranged (is this actually true? for x and y)
		function setScale(key, opts) {
			let sc = scales[key];

			if (sc.from == null) {
				if (dataLen == 0) {
					let minMax = sc.range(self, opts.min, opts.max, key);
					opts.min = minMax[0];
					opts.max = minMax[1];
				}

				if (opts.min > opts.max) {
					let _min = opts.min;
					opts.min = opts.max;
					opts.max = _min;
				}

				if (dataLen > 1 && opts.min != null && opts.max != null && opts.max - opts.min < 1e-16)
					return;

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

		let xCursor;
		let yCursor;
		let vCursor;
		let hCursor;

		// starting position before cursor.move
		let rawMouseLeft0;
		let rawMouseTop0;

		// starting position
		let mouseLeft0;
		let mouseTop0;

		// current position before cursor.move
		let rawMouseLeft1;
		let rawMouseTop1;

		// current position
		let mouseLeft1;
		let mouseTop1;

		let dragging = false;

		const drag = cursor.drag;

		let dragX = drag.x;
		let dragY = drag.y;

		if (cursor.show) {
			if (cursor.x)
				xCursor = placeDiv(CURSOR_X, over);
			if (cursor.y)
				yCursor = placeDiv(CURSOR_Y, over);

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

		const select = self.select = assign({
			show:   true,
			over:   true,
			left:   0,
			width:  0,
			top:    0,
			height: 0,
		}, opts.select);

		const selectDiv = select.show ? placeDiv(SELECT, select.over ? over : under) : null;

		function setSelect(opts, _fire) {
			if (select.show) {
				for (let prop in opts)
					setStylePx(selectDiv, prop, select[prop] = opts[prop]);

				_fire !== false && fire("setSelect");
			}
		}

		self.setSelect = setSelect;

		function toggleDOM(i, onOff) {
			let s = series[i];
			let label = showLegend ? legendRows[i] : null;

			if (s.show)
				label && remClass(label, OFF);
			else {
				label && addClass(label, OFF);
				cursorPts.length > 1 && elTrans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
			}
		}

		function _setScale(key, min, max) {
			setScale(key, {min, max});
		}

		function setSeries(i, opts, _fire, _pub) {
		//	log("setSeries()", arguments);

			let s = series[i];

			if (opts.focus != null)
				setFocus(i);

			if (opts.show != null) {
				s.show = opts.show;
				toggleDOM(i, opts.show);

				_setScale(mode == 2 ? s.facets[1].scale : s.scale, null, null);
				commit();
			}

			_fire !== false && fire("setSeries", i, opts);

			_pub && pubSync("setSeries", self, i, opts);
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
				bands.length = 0;
			else
				bands.splice(bi, 1);
		}

		self.addBand = addBand;
		self.setBand = setBand;
		self.delBand = delBand;

		function setAlpha(i, value) {
			series[i].alpha = value;

			if (cursor.show && cursorPts[i])
				cursorPts[i].style.opacity = value;

			if (showLegend && legendRows[i])
				legendRows[i].style.opacity = value;
		}

		// y-distance
		let closestDist;
		let closestSeries;
		let focusedSeries;
		const FOCUS_TRUE  = {focus: true};
		const FOCUS_FALSE = {focus: false};

		function setFocus(i) {
			if (i != focusedSeries) {
			//	log("setFocus()", arguments);

				let allFocused = i == null;

				let _setAlpha = focus.alpha != 1;

				series.forEach((s, i2) => {
					let isFocused = allFocused || i2 == 0 || i2 == i;
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
					return;
				setSeries(null, FOCUS_FALSE, true, syncOpts.setSeries);
				updateCursor(null, true, false);
			});
		}

		function posToVal(pos, scale, can) {
			let sc = scales[scale];

			if (can)
				pos = pos / pxRatio - (sc.ori == 1 ? plotTopCss : plotLftCss);

			let dim = plotWidCss;

			if (sc.ori == 1) {
				dim = plotHgtCss;
				pos = dim - pos;
			}

			if (sc.dir == -1)
				pos = dim - pos;

			let _min = sc._min,
				_max = sc._max,
				pct = pos / dim;

			let sv = _min + (_max - _min) * pct;

			let distr = sc.distr;

			return (
				distr == 3 ? pow(10, sv) :
				distr == 4 ? sinh(sv, sc.asinh) :
				sv
			);
		}

		function closestIdxFromXpos(pos, can) {
			let v = posToVal(pos, xScaleKey, can);
			return closestIdx(v, data[0], i0, i1);
		}

		self.valToIdx = val => closestIdx(val, data[0]);
		self.posToIdx = closestIdxFromXpos;
		self.posToVal = posToVal;
		self.valToPos = (val, scale, can) => (
			scales[scale].ori == 0 ?
			getHPos(val, scales[scale],
				can ? plotWid : plotWidCss,
				can ? plotLft : 0,
			) :
			getVPos(val, scales[scale],
				can ? plotHgt : plotHgtCss,
				can ? plotTop : 0,
			)
		);

		// defers calling expensive functions
		function batch(fn) {
			fn(self);
			commit();
		}

		self.batch = batch;

		(self.setCursor = (opts, _fire, _pub) => {
			mouseLeft1 = opts.left;
			mouseTop1 = opts.top;
		//	assign(cursor, opts);
			updateCursor(null, _fire, _pub);
		});

		function setSelH(off, dim) {
			setStylePx(selectDiv, LEFT,  select.left = off);
			setStylePx(selectDiv, WIDTH, select.width = dim);
		}

		function setSelV(off, dim) {
			setStylePx(selectDiv, TOP,    select.top = off);
			setStylePx(selectDiv, HEIGHT, select.height = dim);
		}

		let setSelX = scaleX.ori == 0 ? setSelH : setSelV;
		let setSelY = scaleX.ori == 1 ? setSelH : setSelV;

		function syncLegend() {
			if (showLegend && legend.live) {
				for (let i = mode == 2 ? 1 : 0; i < series.length; i++) {
					if (i == 0 && multiValLegend)
						continue;

					let vals = legend.values[i];

					let j = 0;

					for (let k in vals)
						legendCells[i][j++].firstChild.nodeValue = vals[k];
				}
			}
		}

		function setLegend(opts, _fire) {
			if (opts != null) {
				let idx = opts.idx;

				legend.idx = idx;
				series.forEach((s, sidx) => {
					(sidx > 0 || !multiValLegend) && setLegendValues(sidx, idx);
				});
			}

			if (showLegend && legend.live)
				syncLegend();

			shouldSetLegend = false;

			_fire !== false && fire("setLegend");
		}

		self.setLegend = setLegend;

		function setLegendValues(sidx, idx) {
			let val;

			if (idx == null)
				val = NULL_LEGEND_VALUES;
			else {
				let s = series[sidx];
				let src = sidx == 0 && xScaleDistr == 2 ? data0 : data[sidx];
				val = multiValLegend ? s.values(self, sidx, idx) : {_: s.value(self, src[idx], sidx, idx)};
			}

			legend.values[sidx] = val;
		}

		function updateCursor(src, _fire, _pub) {
		//	ts == null && log("updateCursor()", arguments);

			rawMouseLeft1 = mouseLeft1;
			rawMouseTop1 = mouseTop1;

			[mouseLeft1, mouseTop1] = cursor.move(self, mouseLeft1, mouseTop1);

			if (cursor.show) {
				vCursor && elTrans(vCursor, round(mouseLeft1), 0, plotWidCss, plotHgtCss);
				hCursor && elTrans(hCursor, 0, round(mouseTop1), plotWidCss, plotHgtCss);
			}

			let idx;

			// when zooming to an x scale range between datapoints the binary search
			// for nearest min/max indices results in this condition. cheap hack :D
			let noDataInRange = i0 > i1; // works for mode 1 only

			closestDist = inf;

			// TODO: extract
			let xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss;
			let yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss;

			// if cursor hidden, hide points & clear legend vals
			if (mouseLeft1 < 0 || dataLen == 0 || noDataInRange) {
				idx = null;

				for (let i = 0; i < series.length; i++) {
					if (i > 0) {
						cursorPts.length > 1 && elTrans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
					}
				}

				if (cursorFocus)
					setSeries(null, FOCUS_TRUE, true, src == null && syncOpts.setSeries);

				if (legend.live) {
					activeIdxs.fill(null);
					shouldSetLegend = true;

					for (let i = 0; i < series.length; i++)
						legend.values[i] = NULL_LEGEND_VALUES;
				}
			}
			else {
			//	let pctY = 1 - (y / rect.height);

				let mouseXPos, valAtPosX, xPos;

				if (mode == 1) {
					mouseXPos = scaleX.ori == 0 ? mouseLeft1 : mouseTop1;
					valAtPosX = posToVal(mouseXPos, xScaleKey);
					idx = closestIdx(valAtPosX, data[0], i0, i1);
					xPos = incrRoundUp(valToPosX(data[0][idx], scaleX, xDim, 0), 0.5);
				}

				for (let i = mode == 2 ? 1 : 0; i < series.length; i++) {
					let s = series[i];

					let idx1  = activeIdxs[i];
					let yVal1 = mode == 1 ? data[i][idx1] : data[i][1][idx1];

					let idx2  = cursor.dataIdx(self, i, idx, valAtPosX);
					let yVal2 = mode == 1 ? data[i][idx2] : data[i][1][idx2];

					shouldSetLegend = shouldSetLegend || yVal2 != yVal1 || idx2 != idx1;

					activeIdxs[i] = idx2;

					let xPos2 = idx2 == idx ? xPos : incrRoundUp(valToPosX(mode == 1 ? data[0][idx2] : data[i][0][idx2], scaleX, xDim, 0), 0.5);

					if (i > 0 && s.show) {
						let yPos = yVal2 == null ? -10 : incrRoundUp(valToPosY(yVal2, mode == 1 ? scales[s.scale] : scales[s.facets[1].scale], yDim, 0), 0.5);

						if (yPos > 0 && mode == 1) {
							let dist = abs(yPos - mouseTop1);

							if (dist <= closestDist) {
								closestDist = dist;
								closestSeries = i;
							}
						}

						let hPos, vPos;

						if (scaleX.ori == 0) {
							hPos = xPos2;
							vPos = yPos;
						}
						else {
							hPos = yPos;
							vPos = xPos2;
						}

						if (shouldSetLegend && cursorPts.length > 1) {
							elColor(cursorPts[i], cursor.points.fill(self, i), cursor.points.stroke(self, i));

							let ptWid, ptHgt, ptLft, ptTop,
								centered = true,
								getBBox = cursor.points.bbox;

							if (getBBox != null) {
								centered = false;

								let bbox = getBBox(self, i);

								ptLft = bbox.left;
								ptTop = bbox.top;
								ptWid = bbox.width;
								ptHgt = bbox.height;
							}
							else {
								ptLft = hPos;
								ptTop = vPos;
								ptWid = ptHgt = cursor.points.size(self, i);
							}

							elSize(cursorPts[i], ptWid, ptHgt, centered);
							elTrans(cursorPts[i], ptLft, ptTop, plotWidCss, plotHgtCss);
						}
					}

					if (legend.live) {
						if (!shouldSetLegend || i == 0 && multiValLegend)
							continue;

						setLegendValues(i, idx2);
					}
				}
			}

			cursor.idx = idx;
			cursor.left = mouseLeft1;
			cursor.top = mouseTop1;

			if (shouldSetLegend) {
				legend.idx = idx;
				setLegend();
			}

			// nit: cursor.drag.setSelect is assumed always true
			if (select.show && dragging) {
				if (src != null) {
					let [xKey, yKey] = syncOpts.scales;
					let [matchXKeys, matchYKeys] = syncOpts.match;
					let [xKeySrc, yKeySrc] = src.cursor.sync.scales;

					// match the dragX/dragY implicitness/explicitness of src
					let sdrag = src.cursor.drag;
					dragX = sdrag._x;
					dragY = sdrag._y;

					let { left, top, width, height } = src.select;

					let sori = src.scales[xKey].ori;
					let sPosToVal = src.posToVal;

					let sOff, sDim, sc, a, b;

					let matchingX = xKey != null && matchXKeys(xKey, xKeySrc);
					let matchingY = yKey != null && matchYKeys(yKey, yKeySrc);

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
							setSelX(0, xDim);

						if (!matchingY)
							setSelY(0, yDim);
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
							setSelY(0, yDim);

						if (!matchingX)
							setSelX(0, xDim);
					}
				}
				else {
					let rawDX = abs(rawMouseLeft1 - rawMouseLeft0);
					let rawDY = abs(rawMouseTop1 - rawMouseTop0);

					if (scaleX.ori == 1) {
						let _rawDX = rawDX;
						rawDX = rawDY;
						rawDY = _rawDX;
					}

					dragX = drag.x && rawDX >= drag.dist;
					dragY = drag.y && rawDY >= drag.dist;

					let uni = drag.uni;

					if (uni != null) {
						// only calc drag status if they pass the dist thresh
						if (dragX && dragY) {
							dragX = rawDX >= uni;
							dragY = rawDY >= uni;

							// force unidirectionality when both are under uni limit
							if (!dragX && !dragY) {
								if (rawDY > rawDX)
									dragY = true;
								else
									dragX = true;
							}
						}
					}
					else if (drag.x && drag.y && (dragX || dragY))
						// if omni with no uni then both dragX / dragY should be true if either is true
						dragX = dragY = true;

					let p0, p1;

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
							setSelY(0, yDim);
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
							setSelX(0, xDim);
					}

					// the drag didn't pass the dist requirement
					if (!dragX && !dragY) {
						setSelX(0, 0);
						setSelY(0, 0);
					}
				}
			}

			drag._x = dragX;
			drag._y = dragY;

			if (src == null) {
				if (_pub) {
					if (syncKey != null) {
						let [xSyncKey, ySyncKey] = syncOpts.scales;

						syncOpts.values[0] = xSyncKey != null ? posToVal(scaleX.ori == 0 ? mouseLeft1 : mouseTop1, xSyncKey) : null;
						syncOpts.values[1] = ySyncKey != null ? posToVal(scaleX.ori == 1 ? mouseLeft1 : mouseTop1, ySyncKey) : null;
					}

					pubSync(mousemove, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, idx);
				}

				if (cursorFocus) {
					let shouldPub = _pub && syncOpts.setSeries;
					let p = focus.prox;

					if (focusedSeries == null) {
						if (closestDist <= p)
							setSeries(closestSeries, FOCUS_TRUE, true, shouldPub);
					}
					else {
						if (closestDist > p)
							setSeries(null, FOCUS_TRUE, true, shouldPub);
						else if (closestSeries != focusedSeries)
							setSeries(closestSeries, FOCUS_TRUE, true, shouldPub);
					}
				}
			}

			ready && _fire !== false && fire("setCursor");
		}

		let rect = null;

		function syncRect(defer) {
			if (defer === true)
				rect = null;
			else {
				rect = over.getBoundingClientRect();
				fire("syncRect", rect);
			}
		}

		function mouseMove(e, src, _l, _t, _w, _h, _i) {
			if (cursor._lock)
				return;

			cacheMouse(e, src, _l, _t, _w, _h, _i, false, e != null);

			if (e != null)
				updateCursor(null, true, true);
			else
				updateCursor(src, true, false);
		}

		function cacheMouse(e, src, _l, _t, _w, _h, _i, initial, snap) {
			if (rect == null)
				syncRect(false);

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

				let [xKey, yKey] = syncOpts.scales;

				let syncOptsSrc = src.cursor.sync;
				let [xValSrc, yValSrc] = syncOptsSrc.values;
				let [xKeySrc, yKeySrc] = syncOptsSrc.scales;
				let [matchXKeys, matchYKeys] = syncOpts.match;

				let rotSrc = src.scales[xKeySrc].ori == 1;

				let xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss,
					yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss,
					_xDim = rotSrc ? _h : _w,
					_yDim = rotSrc ? _w : _h,
					_xPos = rotSrc ? _t : _l,
					_yPos = rotSrc ? _l : _t;

				if (xKeySrc != null)
					_l = matchXKeys(xKey, xKeySrc) ? getPos(xValSrc, scales[xKey], xDim, 0) : -10;
				else
					_l = xDim * (_xPos/_xDim);

				if (yKeySrc != null)
					_t = matchYKeys(yKey, yKeySrc) ? getPos(yValSrc, scales[yKey], yDim, 0) : -10;
				else
					_t = yDim * (_yPos/_yDim);

				if (scaleX.ori == 1) {
					let __l = _l;
					_l = _t;
					_t = __l;
				}
			}

			if (snap) {
				if (_l <= 1 || _l >= plotWidCss - 1)
					_l = incrRound(_l, plotWidCss);

				if (_t <= 1 || _t >= plotHgtCss - 1)
					_t = incrRound(_t, plotHgtCss);
			}

			if (initial) {
				rawMouseLeft0 = _l;
				rawMouseTop0 = _t;

				[mouseLeft0, mouseTop0] = cursor.move(self, _l, _t);
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

			let { left, top, width, height } = select;

			let hasSelect = width > 0 || height > 0;

			hasSelect && setSelect(select);

			if (drag.setScale && hasSelect) {
			//	if (syncKey != null) {
			//		dragX = drag.x;
			//		dragY = drag.y;
			//	}

				let xOff = left,
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
					for (let k in scales) {
						let sc = scales[k];

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
					updateCursor(null, true, false);
			}

			if (e != null) {
				offMouse(mouseup, doc);
				pubSync(mouseup, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
			}
		}

		function mouseLeave(e, src, _l, _t, _w, _h, _i) {
			if (!cursor._lock) {
				let _dragging = dragging;

				if (dragging) {
					// handle case when mousemove aren't fired all the way to edges by browser
					let snapH = true;
					let snapV = true;
					let snapProx = 10;

					let dragH, dragV;

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
						mouseLeft1 = mouseLeft1 < mouseLeft0 ? 0 : plotWidCss;

					if (dragV && snapV)
						mouseTop1 = mouseTop1 < mouseTop0 ? 0 : plotHgtCss;

					updateCursor(null, true, true);

					dragging = false;
				}

				mouseLeft1 = -10;
				mouseTop1 = -10;

				// passing a non-null timestamp to force sync/mousemove event
				updateCursor(null, true, true);

				if (_dragging)
					dragging = _dragging;
			}
		}

		function dblClick(e, src, _l, _t, _w, _h, _i) {
			autoScaleX();

			hideSelect();

			if (e != null)
				pubSync(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
		}

		function syncPxRatio() {
			axes.forEach(syncFontSize);
			_setSize(self.width, self.height, true);
		}

		on(dppxchange, win, syncPxRatio);

		// internal pub/sub
		const events = {};

		events.mousedown = mouseDown;
		events.mousemove = mouseMove;
		events.mouseup = mouseUp;
		events.dblclick = dblClick;
		events["setSeries"] = (e, src, idx, opts) => {
			setSeries(idx, opts, true, false);
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
		const hooks = self.hooks = opts.hooks || {};

		function fire(evName, a1, a2) {
			if (evName in hooks) {
				hooks[evName].forEach(fn => {
					fn.call(null, self, a1, a2);
				});
			}
		}

		(opts.plugins || []).forEach(p => {
			for (let evName in p.hooks)
				hooks[evName] = (hooks[evName] || []).concat(p.hooks[evName]);
		});

		const syncOpts = assign({
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

		const syncKey = syncOpts.key;

		const sync = _sync(syncKey);

		function pubSync(type, src, x, y, w, h, i) {
			if (syncOpts.filters.pub(type, src, x, y, w, h, i))
				sync.pub(type, src, x, y, w, h, i);
		}

		sync.sub(self);

		function pub(type, src, x, y, w, h, i) {
			if (syncOpts.filters.sub(type, src, x, y, w, h, i))
				events[type](null, src, x, y, w, h, i);
		}

		(self.pub = pub);

		function destroy() {
			sync.unsub(self);
			cursorPlots.delete(self);
			mouseListeners.clear();
			off(dppxchange, win, syncPxRatio);
			root.remove();
			fire("destroy");
		}

		self.destroy = destroy;

		function _init() {
			fire("init", opts, data);

			setData(data || opts.data, false);

			if (pendScales[xScaleKey])
				setScale(xScaleKey, pendScales[xScaleKey]);
			else
				autoScaleX();

			_setSize(opts.width, opts.height);

			updateCursor(null, true, false);

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
				then(self, _init);
		}
		else
			_init();

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

		let paths = uPlot.paths = {
			points,
		};

		(paths.linear  = linear);
		(paths.stepped = stepped);
		(paths.bars    = bars);
		(paths.spline  = monotoneCubic);
	}

	return uPlot;

})();
