/**
* Copyright (c) 2021, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uPlot.js (μPlot)
* A small, fast chart for time series, lines, areas, ohlc & bars
* https://github.com/leeoniya/uPlot (v1.6.1)
*/

'use strict';

const FEAT_TIME          = true;

function debounce(fn, time) {
	let pending = null;

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
	let logFn = base == 10 ? log10 : log2;

	if (min == max) {
		min /= base;
		max *= base;
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
		minExp = floor(logFn(min));
		maxExp = floor(logFn(max));

		minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

		min = incrRoundDn(min, minMaxIncrs[0]);
		max = incrRoundUp(max, minMaxIncrs[1]);
	}

	return [min, max];
}

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
	let nonZeroDelta = delta || abs(_max) || 1e3;
	let mag          = log10(nonZeroDelta);
	let base         = pow(10, floor(mag));

	let _padMin  = nonZeroDelta * (delta == 0 ? (_min == 0 ? .1 : 1) : padMin);
	let _newMin  = roundDec(incrRoundDn(_min - _padMin, base/10), 6);
	let _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 3 && _newMin <= softMin || softMinMode == 2 && _newMin >= softMin) ? softMin : inf;
	let minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

	let _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
	let _newMax  = roundDec(incrRoundUp(_max + _padMax, base/10), 6);
	let _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 3 && _newMax >= softMax || softMaxMode == 2 && _newMax <= softMax) ? softMax : -inf;
	let maxLim   = min(hardMax, _newMax > _softMax && _max <= _softMax ? _softMax : max(_softMax, _newMax));

	if (minLim == maxLim && minLim == 0)
		maxLim = 100;

	return [minLim, maxLim];
}

// alternative: https://stackoverflow.com/a/2254896
const fmtNum = new Intl.NumberFormat(navigator.language).format;

const M = Math;

const abs = M.abs;
const floor = M.floor;
const round = M.round;
const ceil = M.ceil;
const min = M.min;
const max = M.max;
const pow = M.pow;
const sqrt = M.sqrt;
const log10 = M.log10;
const log2 = M.log2;
const PI = M.PI;

const inf = Infinity;

function incrRound(num, incr) {
	return round(num/incr)*incr;
}

function clamp(num, _min, _max) {
	return min(max(num, _min), _max);
}

function fnOrSelf(v) {
	return typeof v == "function" ? v : () => v;
}

const retArg1 = (_0, _1) => _1;

const retNull = _ => null;

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

function copy(o) {
	let out;

	if (isArr(o))
		out = o.map(copy);
	else if (isObj(o)) {
		out = {};
		for (var k in o)
			out[k] = copy(o[k]);
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
const NULL_IGNORE = 0;  // all nulls are ignored by isGap
const NULL_GAP    = 1;  // alignment nulls are ignored by isGap (default)
const NULL_EXPAND = 2;  // nulls are expand to include adjacent alignment nulls

// nullModes is a tables-matched array indicating how to treat nulls in each series
function join(tables, nullModes) {
	if (tables.length == 1) {
		return {
			data: tables[0],
			isGap: nullModes ? (u, seriesIdx, dataIdx) => nullModes[0][seriesIdx] != NULL_IGNORE : () => true,
		};
	}

	let xVals = new Set();
	let xNulls = [new Set()];

	for (let ti = 0; ti < tables.length; ti++) {
		let t = tables[ti];
		let xs = t[0];
		let len = xs.length;

		for (let i = 0; i < len; i++)
			xVals.add(xs[i]);

		for (let si = 1; si < t.length; si++) {
			let nulls = new Set();

			// cache original nulls for isGap lookup
			if (nullModes == null || nullModes[ti][si] == NULL_GAP || nullModes[ti][si] == NULL_EXPAND) {
				let ys = t[si];

				for (let i = 0; i < len; i++) {
					if (ys[i] == null)
						nulls.add(xs[i]);
				}
			}

			xNulls.push(nulls);
		}
	}

	let data = [Array.from(xVals).sort((a, b) => a - b)];

	let alignedLen = data[0].length;

	let xIdxs = new Map();

	for (let i = 0; i < alignedLen; i++)
		xIdxs.set(data[0][i], i);

	let gsi = 1;

	for (let ti = 0; ti < tables.length; ti++) {
		let t = tables[ti];
		let xs = t[0];

		for (let si = 1; si < t.length; si++) {
			let ys = t[si];

			let yVals = Array(alignedLen).fill(null);

			for (let i = 0; i < ys.length; i++)
				yVals[xIdxs.get(xs[i])] = ys[i];

			// mark all filler nulls as explicit when adjacent to existing explicit nulls (minesweeper)
			if (nullModes && nullModes[ti][si] == NULL_EXPAND) {
				let nulls = xNulls[gsi];
				let size = nulls.size;
				let	i = 0;
				let xi;

				let lastAddedX = -inf;

				for (let xVal of nulls.values()) {
					if (i++ == size)
						break;

					if (xVal > lastAddedX) {
						let xIdx = xIdxs.get(xVal);

						xi = xIdx - 1;
						while (yVals[xi] === null) {
							nulls.add(data[0][xi]);
							xi--;
						}

						xi = xIdx + 1;
						while (yVals[xi] === null) {
							nulls.add(lastAddedX = data[0][xi]);
							xi++;
						}
					}
				}
			}

			data.push(yVals);

			gsi++;
		}
	}

	return {
		data: data,
		isGap(u, seriesIdx, dataIdx) {
			let xVal = u._data[0][dataIdx];
			return xNulls[seriesIdx].has(xVal);
		},
	};
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

const pre = "u-";

const UPLOT          =       "uplot";
const ORI_HZ         = pre + "hz";
const ORI_VT         = pre + "vt";
const TITLE          = pre + "title";
const WRAP           = pre + "wrap";
const UNDER          = pre + "under";
const OVER           = pre + "over";
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
const pxRatio = devicePixelRatio;

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

function trans(el, xPos, yPos, xMax, yMax) {
	el.style.transform = "translate(" + xPos + "px," + yPos + "px)";

	if (xPos < 0 || yPos < 0 || xPos > xMax || yPos > yMax)
		addClass(el, OFF);
	else
		remClass(el, OFF);
}

const evOpts = {passive: true};

function on(ev, el, cb) {
	el.addEventListener(ev, cb, evOpts);
}

function off(ev, el, cb) {
	el.removeEventListener(ev, cb, evOpts);
}

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

const days3 =  days.map(slice3);

const months3 =  months.map(slice3);

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

const getFullYear = 'getFullYear';
const getMonth = 'getMonth';
const getDate = 'getDate';
const getDay = 'getDay';
const getHours = 'getHours';
const getMinutes = 'getMinutes';
const getSeconds = 'getSeconds';
const getMilliseconds = 'getMilliseconds';

const subs = {
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
	h:		d => {let h = d[getHours](); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
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
	if (tz == 'Etc/UTC')
		date2 = new Date(+date + date.getTimezoneOffset() * 6e4);
	else if (tz == localTz)
		date2 = date;
	else {
		date2 = new Date(date.toLocaleString('en-US', {timeZone: tz}));
		date2.setMilliseconds(date[getMilliseconds]());
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
			let minDateTs = minDate * ms;

			// get ts of 12am (this lands us at or before the original scaleMin)
			let minMin = mkDate(minDate[getFullYear](), isYr ? 0 : minDate[getMonth](), isMo || isYr ? 1 : minDate[getDate]());
			let minMinTs = minMin * ms;

			if (isMo || isYr) {
				let moIncr = isMo ? foundIncr / mo : 0;
				let yrIncr = isYr ? foundIncr / y  : 0;
			//	let tzOffset = scaleMin - minDateTs;		// needed?
				let split = minDateTs == minMinTs ? minDateTs : mkDate(minMin[getFullYear]() + yrIncr, minMin[getMonth]() + moIncr, 1) * ms;
				let splitDate = new Date(split / ms);
				let baseYear = splitDate[getFullYear]();
				let baseMonth = splitDate[getMonth]();

				for (let i = 0; split <= scaleMax; i++) {
					let next = mkDate(baseYear + yrIncr * i, baseMonth + moIncr * i, 1);
					let offs = next - tzDate(next * ms);

					split = (+next + offs) * ms;

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

				let prevHour = date0[getHours]() + (date0[getMinutes]() / m) + (date0[getSeconds]() / h);
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

const [ timeIncrsMs, _timeAxisStampsMs, timeAxisSplitsMs ] =  genTimeStuffs(1);
const [ timeIncrsS,  _timeAxisStampsS,  timeAxisSplitsS  ] =  genTimeStuffs(1e-3);

// base 2
const binIncrs = genIncrs(2, -53, 53, [1]);

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

			let newYear = date[getFullYear]();
			let newMnth = date[getMonth]();
			let newDate = date[getDate]();
			let newHour = date[getHours]();
			let newMins = date[getMinutes]();
			let newSecs = date[getSeconds]();

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

const legendWidth = 2;

const legendDash = "solid";

function legendStroke(self, seriesIdx) {
	let s = self.series[seriesIdx];
	return s.width ? s.stroke(self, seriesIdx) : s.points.width ? s.points.stroke(self, seriesIdx) : null;
}

function legendFill(self, seriesIdx) {
	return self.series[seriesIdx].fill(self, seriesIdx);
}

function cursorPointShow(self, si) {
	let o = self.cursor.points;

	let pt = placeDiv();

	let stroke = o.stroke(self, si);
	let fill = o.fill(self, si);

	pt.style.background = fill || stroke;

	let size = o.size(self, si);
	let width = o.width(self, si, size);

	if (width)
		pt.style.border = width + "px solid " + stroke;

	let mar = size / -2;

	setStylePx(pt, WIDTH, size);
	setStylePx(pt, HEIGHT, size);
	setStylePx(pt, "marginLeft", mar);
	setStylePx(pt, "marginTop", mar);

	return pt;
}

function cursorPointFill(self, si) {
	let s = self.series[si];
	return s.stroke(self, si);
}

function cursorPointStroke(self, si) {
	let s = self.series[si];
	return s.stroke(self, si);
}

function cursorPointSize(self, si) {
	let s = self.series[si];
	return ptDia(s.width, 1);
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
	space: 50,
	gap: 5,
	size: 50,
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

const RE_ALL   = /./;
const RE_12357 = /[12357]/;
const RE_125   = /[125]/;
const RE_1     = /1/;

function logAxisValsFilt(self, splits, axisIdx, foundSpace, foundIncr) {
	let axis = self.axes[axisIdx];
	let scaleKey = axis.scale;

	if (self.scales[scaleKey].log == 2)
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

	return splits.map(v => re.test(v) ? v : null);
}

function numSeriesVal(self, val) {
	return val == null ? "" : fmtNum(val);
}

const yAxisOpts = {
	show: true,
	scale: "y",
	space: 30,
	gap: 5,
	size: 50,
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

function seriesPoints(self, si) {
	const xsc = self.scales[self.series[0].scale];
	const dim = xsc.ori == 0 ? self.bbox.width : self.bbox.height;
	const s = self.series[si];
//	const dia = ptDia(s.width, pxRatio);
	let maxPts = dim / (s.points.space * pxRatio);
	let idxs = self.series[0].idxs;
	return idxs[1] - idxs[0] <= maxPts;
}

function seriesFillTo(self, seriesIdx, dataMin, dataMax) {
	let scale = self.scales[self.series[seriesIdx].scale];
	return scale.distr == 3 ? scale.min : 0;
}

const ySeriesOpts = {
	scale: "y",
	auto: true,
	sorted: 0,
	show: true,
	band: false,
	spanGaps: false,
	isGap: (self, seriesIdx, dataIdx) => true,
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

const xScaleOpts = {
	time: FEAT_TIME,
	auto: true,
	distr: 1,
	log: 10,
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

function _sync(opts) {
	let clients = [];

	return {
		sub(client) {
			clients.push(client);
		},
		unsub(client) {
			clients = clients.filter(c => c != client);
		},
		pub(type, self, x, y, w, h, i) {
			if (clients.length > 1) {
				clients.forEach(client => {
					client != self && client.pub(type, self, x, y, w, h, i);
				});
			}
		}
	};
}

function orient(u, seriesIdx, cb) {
	const series = u.series[seriesIdx];
	const scales = u.scales;
	const bbox   = u.bbox;
	const scaleX = scales[u.series[0].scale];

	let dx = u._data[0],
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
		let x0 = incrRound(valToPosX(dataX[frIdx], scaleX, xDim, xOff), 0.5);
		let y0 = incrRound(valToPosY(dataY[frIdx], scaleY, yDim, yOff), 0.5);
		// path end x
		let x1 = incrRound(valToPosX(dataX[toIdx], scaleX, xDim, xOff), 0.5);
		// upper y limit
		let yLimit = incrRound(valToPosY(scaleY.max, scaleY, yDim, yOff), 0.5);

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

			rect(clip, prevGapEnd, plotTop, g[0] - prevGapEnd, plotTop + plotHgt);

			prevGapEnd = g[1];
		}

		rect(clip, prevGapEnd, plotTop, plotLft + plotWid - prevGapEnd, plotTop + plotHgt);
	}

	return clip;
}

function addGap(gaps, fromX, toX) {
	if (toX > fromX) {
		let prevGap = gaps[gaps.length - 1];

		if (prevGap && prevGap[0] == fromX)			// TODO: gaps must be encoded at stroke widths?
			prevGap[1] = toX;
		else
			gaps.push([fromX, toX]);
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
		lineTo(stroke, accX, minY);
		lineTo(stroke, accX, maxY);
		lineTo(stroke, accX, outY);
	};
}

const drawAccH = _drawAcc(lineToH);
const drawAccV = _drawAcc(lineToV);

function linear() {
	return (u, seriesIdx, idx0, idx1) => {
		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
			let lineTo, drawAcc;

			if (scaleX.ori == 0) {
				lineTo = lineToH;
				drawAcc = drawAccH;
			}
			else {
				lineTo = lineToV;
				drawAcc = drawAccV;
			}

			const isGap = series.isGap;

			const dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

			const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};
			const stroke = _paths.stroke;

			let minY = inf,
				maxY = -inf,
				outY, outX, drawnAtX;

			let gaps = [];

			let accX = round(valToPosX(dataX[dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
			let accGaps = false;

			// data edges
			let lftIdx = nonNullIdx(dataY, idx0, idx1,  1 * dir);
			let rgtIdx = nonNullIdx(dataY, idx0, idx1, -1 * dir);
			let lftX = incrRound(valToPosX(dataX[lftIdx], scaleX, xDim, xOff), 0.5);
			let rgtX = incrRound(valToPosX(dataX[rgtIdx], scaleX, xDim, xOff), 0.5);

			if (lftX > xOff)
				addGap(gaps, xOff, lftX);

			for (let i = dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += dir) {
				let x = round(valToPosX(dataX[i], scaleX, xDim, xOff));

				if (x == accX) {
					if (dataY[i] != null) {
						outY = round(valToPosY(dataY[i], scaleY, yDim, yOff));

						if (minY == inf)
							lineTo(stroke, x, outY);

						minY = min(outY, minY);
						maxY = max(outY, maxY);
					}
					else if (!accGaps && isGap(u, seriesIdx, i))
						accGaps = true;
				}
				else {
					let _addGap = false;

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
						if (x - accX > 1 && dataY[i - dir] == null && isGap(u, seriesIdx, i - dir))
							_addGap = true;
					}
					else {
						minY = inf;
						maxY = -inf;

						if (!accGaps && isGap(u, seriesIdx, i))
							accGaps = true;
					}

					_addGap && addGap(gaps, outX, x);

					accX = x;
				}
			}

			if (minY != inf && minY != maxY && drawnAtX != accX)
				drawAcc(stroke, accX, minY, maxY, outY);

			if (rgtX < xOff + xDim)
				addGap(gaps, rgtX, xOff + xDim);

			if (series.fill != null) {
				let fill = _paths.fill = new Path2D(stroke);

				let fillTo = round(valToPosY(series.fillTo(u, seriesIdx, series.min, series.max), scaleY, yDim, yOff));

				lineTo(fill, rgtX, fillTo);
				lineTo(fill, lftX, fillTo);
			}

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

function spline(opts) {
	return (u, seriesIdx, idx0, idx1) => {
		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
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
			let firstXPos = round(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
			let prevXPos = firstXPos;

			let xCoords = [];
			let yCoords = [];

			for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
				let yVal = dataY[i];
				let xVal = dataX[i];
				let xPos = valToPosX(xVal, scaleX, xDim, xOff);

				if (yVal == null) {
					if (series.isGap(u, seriesIdx, i)) {
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

			const _paths = {stroke: catmullRomFitting(xCoords, yCoords, 0.5, moveTo, bezierCurveTo), fill: null, clip: null, band: null};
			const stroke = _paths.stroke;

			if (series.fill != null) {
				let fill = _paths.fill = new Path2D(stroke);

				let fillTo = series.fillTo(u, seriesIdx, series.min, series.max);
				let minY = round(valToPosY(fillTo, scaleY, yDim, yOff));

				lineTo(fill, prevXPos, minY);
				lineTo(fill, firstXPos, minY);
			}

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

// adapted from https://gist.github.com/nicholaswmin/c2661eb11cad5671d816 (MIT)
/**
 * Interpolates a Catmull-Rom Spline through a series of x/y points
 * Converts the CR Spline to Cubic Beziers for use with SVG items
 *
 * If 'alpha' is 0.5 then the 'Centripetal' variant is used
 * If 'alpha' is 1 then the 'Chordal' variant is used
 *
 */
function catmullRomFitting(xCoords, yCoords, alpha, moveTo, bezierCurveTo) {
	const path = new Path2D();

	const dataLen = xCoords.length;

	let p0x,
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

	for (let i = 0; i < dataLen - 1; i++) {
		let p0i = i == 0 ? 0 : i - 1;

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
			N = 1 / N;

		M = 3 * d3powA * (d3powA + d2powA);

		if (M > 0)
			M = 1 / M;

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
	const align = ifNull(opts.align, 1);

	return (u, seriesIdx, idx0, idx1) => {
		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
			let lineTo = scaleX.ori == 0 ? lineToH : lineToV;

			const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};
			const stroke = _paths.stroke;

			const _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

			idx0 = nonNullIdx(dataY, idx0, idx1,  1);
			idx1 = nonNullIdx(dataY, idx0, idx1, -1);

			let gaps = [];
			let inGap = false;
			let prevYPos  = round(valToPosY(dataY[_dir == 1 ? idx0 : idx1], scaleY, yDim, yOff));
			let firstXPos = round(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
			let prevXPos = firstXPos;

			lineTo(stroke, firstXPos, prevYPos);

			for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
				let yVal1 = dataY[i];

				let x1 = round(valToPosX(dataX[i], scaleX, xDim, xOff));

				if (yVal1 == null) {
					if (series.isGap(u, seriesIdx, i)) {
						addGap(gaps, prevXPos, x1);
						inGap = true;
					}
					continue;
				}

				let y1 = round(valToPosY(yVal1, scaleY, yDim, yOff));

				if (inGap) {
					addGap(gaps, prevXPos, x1);

					// don't clip vertical extenders
					if (prevYPos != y1) {
						let halfStroke = (series.width * pxRatio) / 2;

						let lastGap = gaps[gaps.length - 1];
						lastGap[0] += halfStroke;
						lastGap[1] -= halfStroke;
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
				let minY = round(valToPosY(fillTo, scaleY, yDim, yOff));

				lineTo(fill, prevXPos, minY);
				lineTo(fill, firstXPos, minY);
			}

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
	const size = ifNull(opts.size, [0.6, inf]);
	const align = opts.align || 0;

	const gapFactor = 1 - size[0];
	const maxWidth  = ifNull(size[1], inf) * pxRatio;

	return (u, seriesIdx, idx0, idx1) => {
		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
			let rect = scaleX.ori == 0 ? rectH : rectV;

			let colWid = valToPosX(dataX[1], scaleX, xDim, xOff) - valToPosX(dataX[0], scaleX, xDim, xOff);

			let gapWid = colWid * gapFactor;

			let fillToY = series.fillTo(u, seriesIdx, series.min, series.max);

			let y0Pos = valToPosY(fillToY, scaleY, yDim, yOff);

			let strokeWidth = round(series.width * pxRatio);

			let barWid = round(min(maxWidth, colWid - gapWid) - strokeWidth);

			let xShift = align == 1 ? 0 : align == -1 ? barWid : barWid / 2;

			const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null};

			const hasBands = u.bands.length > 0;
			let yLimit;

			if (hasBands) {
				// ADDL OPT: only create band clips for series that are band lower edges
				// if (b.series[1] == i && _paths.band == null)
				_paths.band = new Path2D();
				yLimit = incrRound(valToPosY(scaleY.max, scaleY, yDim, yOff), 0.5);
			}

			const stroke = _paths.stroke;
			const band = _paths.band;

			const _dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

			for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
				let yVal = dataY[i];

				// interpolate upwards band clips
				if (yVal == null) {
					if (hasBands) {
						// simple, but inefficient bi-directinal linear scans on each iteration
						let prevNonNull = nonNullIdx(dataY, _dir == 1 ? idx0 : idx1, i, -_dir);
						let nextNonNull = nonNullIdx(dataY, i, _dir == 1 ? idx1 : idx0,  _dir);

						let prevVal = dataY[prevNonNull];
						let nextVal = dataY[nextNonNull];

						yVal = prevVal + (i - prevNonNull) / (nextNonNull - prevNonNull) * (nextVal - prevVal);
					}
					else
						continue;
				}

				let xVal = scaleX.distr == 2 ? i : dataX[i];

				// TODO: all xPos can be pre-computed once for all series in aligned set
				let xPos = valToPosX(xVal, scaleX, xDim, xOff);
				let yPos = valToPosY(yVal, scaleY, yDim, yOff);

				let lft = round(xPos - xShift);
				let btm = round(max(yPos, y0Pos));
				let top = round(min(yPos, y0Pos));
				let barHgt = btm - top;

				dataY[i] != null && rect(stroke, lft, top, barWid, barHgt);

				if (hasBands) {
					btm = top;
					top = yLimit;
					barHgt = btm - top;
					rect(band, lft, top, barWid, barHgt);
				}
			}

			if (series.fill != null)
				_paths.fill = new Path2D(stroke);

			return _paths;
		});
	};
}

const linearPath =  linear() ;

function setDefaults(d, xo, yo, initY) {
	let d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
	return d2.map((o, i) => setDefault(o, i, xo, yo));
}

function setDefault(o, i, xo, yo) {
	return assign({}, (i == 0 ? xo : yo), o);
}

const nullMinMax = [null, null];

function snapNumX(self, dataMin, dataMax) {
	return dataMin == null ? nullMinMax : [dataMin, dataMax];
}

const snapTimeX = snapNumX;

// this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
// TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
function snapNumY(self, dataMin, dataMax) {
	return dataMin == null ? nullMinMax : rangeNum(dataMin, dataMax, 0.1, true);
}

function snapLogY(self, dataMin, dataMax, scale) {
	return dataMin == null ? nullMinMax : rangeLog(dataMin, dataMax, self.scales[scale].log, false);
}

const snapLogX = snapLogY;

// dim is logical (getClientBoundingRect) pixels, not canvas pixels
function findIncr(min, max, incrs, dim, minSpace) {
	let pxPerUnit = dim / (max - min);

	let minDec = (""+floor(min)).length;

	for (var i = 0; i < incrs.length; i++) {
		let space = incrs[i] * pxPerUnit;

		let incrDec = incrs[i] < 10 ? fixedDec.get(incrs[i]) : 0;

		if (space >= minSpace && minDec + incrDec < 17)
			return [incrs[i], space];
	}

	return [0, 0];
}

function pxRatioFont(font) {
	let fontSize;
	font = font.replace(/(\d+)px/, (m, p1) => (fontSize = round(p1 * pxRatio)) + 'px');
	return [font, fontSize];
}

function uPlot(opts, data, then) {
	const self = {};

	function getValPct(val, scale) {
		return (
			scale.distr == 3
			? log10((val > 0 ? val : scale.clamp(self, val, scale.min, scale.max, scale.key)) / scale.min) / log10(scale.max / scale.min)
			: (val - scale.min) / (scale.max - scale.min)
		);
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
	const under = placeDiv(UNDER, wrap);
	wrap.appendChild(can);
	const over = placeDiv(OVER, wrap);

	opts = copy(opts);

	(opts.plugins || []).forEach(p => {
		if (p.opts)
			opts = p.opts(self, opts) || opts;
	});

	const ms = opts.ms || 1e-3;

	const series  = self.series = setDefaults(opts.series || [], xSeriesOpts, ySeriesOpts, false);
	const axes    = self.axes   = setDefaults(opts.axes   || [], xAxisOpts,   yAxisOpts,    true);
	const scales  = self.scales = {};
	const bands   = self.bands  = opts.bands || [];

	bands.forEach(b => {
		b.fill = fnOrSelf(b.fill || null);
	});

	const xScaleKey = series[0].scale;

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
				scales[scaleKey] = assign({}, scales[scaleOpts.from], scaleOpts);
			}
			else {
				sc = scales[scaleKey] = assign({}, (scaleKey == xScaleKey ? xScaleOpts : yScaleOpts), scaleOpts);

				sc.key = scaleKey;

				let isTime =  sc.time;
				let isLog  = sc.distr == 3;

				let rn = sc.range;

				if (scaleKey != xScaleKey && !isArr(rn) && isObj(rn)) {
					let cfg = rn;
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

	for (let k in opts.scales)
		initScale(k);

	const scaleX = scales[xScaleKey];

	const xScaleDistr = scaleX.distr;

	let valToPosX, valToPosY, moveTo, arc;

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

	const pendScales = {};

	// explicitly-set initial scales
	for (let k in scales) {
		let sc = scales[k];

		if (sc.min != null || sc.max != null)
			pendScales[k] = {min: sc.min, max: sc.max};
	}

//	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
	const _tzDate  =  (opts.tzDate || (ts => new Date(ts / ms)));
	const _fmtDate =  (opts.fmtDate || fmtDate);

	const _timeAxisSplits =  (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
	const _timeAxisVals   =  timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
	const _timeSeriesVal  =  timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

	const legend     =  assign({show: true, live: true}, opts.legend);
	const showLegend =  legend.show;

	{
		legend.width  = fnOrSelf(ifNull(legend.width, legendWidth));
		legend.dash   = fnOrSelf(legend.dash   || legendDash);
		legend.stroke = fnOrSelf(legend.stroke || legendStroke);
		legend.fill   = fnOrSelf(legend.fill   || legendFill);
	}

	let legendEl;
	let legendRows = [];
	let legendCols;
	let multiValLegend = false;

	if (showLegend) {
		legendEl = placeTag("table", LEGEND, root);

		const getMultiVals = series[1] ? series[1].values : null;
		multiValLegend = getMultiVals != null;

		if (multiValLegend) {
			let head = placeTag("tr", LEGEND_THEAD, legendEl);
			placeTag("th", null, head);
			legendCols = getMultiVals(self, 1, 0);

			for (var key in legendCols)
				placeTag("th", LEGEND_LABEL, head).textContent = key;
		}
		else {
			legendCols = {_: 0};
			addClass(legendEl, LEGEND_INLINE);
			legend.live && addClass(legendEl, LEGEND_LIVE);
		}
	}

	function initLegendRow(s, i) {
		if (i == 0 && (multiValLegend || !legend.live))
			return null;

		let _row = [];

		let row = placeTag("tr", LEGEND_SERIES, legendEl, legendEl.childNodes[i]);

		addClass(row, s.class);

		if (!s.show)
			addClass(row, OFF);

		let label = placeTag("th", null, row);

		let indic = placeDiv(LEGEND_MARKER, label);

		if (i > 0) {
			let width  = legend.width(self, i);

			if (width)
				indic.style.border = width + "px " + legend.dash(self, i) + " " + legend.stroke(self, i);

			indic.style.background = legend.fill(self, i);
		}

		let text = placeDiv(LEGEND_LABEL, label);
		text.textContent = s.label;

		if (i > 0) {
			onMouse("click", label, e => {
				if ( cursor._lock)
					return;

				setSeries(series.indexOf(s), {show: !s.show},  syncOpts.setSeries);
			});

			if (cursorFocus) {
				onMouse(mouseenter, label, e => {
					if (cursor._lock)
						return;

					setSeries(series.indexOf(s), FOCUS_TRUE, syncOpts.setSeries);
				});
			}
		}

		for (var key in legendCols) {
			let v = placeTag("td", LEGEND_VALUE, row);
			v.textContent = "--";
			_row.push(v);
		}

		return _row;
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
		off(ev, targ, targListeners[ev]);
		targListeners[ev] = null;
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

	function _setSize(width, height) {
		if (width != self.width || height != self.height)
			calcSize(width, height);

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

		let bb = self.bbox;

		plotLft = bb.left   = incrRound(plotLftCss * pxRatio, 0.5);
		plotTop = bb.top    = incrRound(plotTopCss * pxRatio, 0.5);
		plotWid = bb.width  = incrRound(plotWidCss * pxRatio, 0.5);
		plotHgt = bb.height = incrRound(plotHgtCss * pxRatio, 0.5);

	//	updOriDims();
	}

	function convergeSize() {
		let converged = false;

		let cycleNum = 0;

		while (!converged) {
			cycleNum++;

			let axesConverged = axesCalc(cycleNum);
			let paddingConverged = paddingCalc(cycleNum);

			converged = axesConverged && paddingConverged;

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
				let labelSize = axis.labelSize = (axis.label != null ? (axis.labelSize || 30) : 0);

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

	const cursor =  (self.cursor = assign({}, cursorOpts, opts.cursor));

	{
		cursor._lock = false;

		let points = cursor.points;

		points.show   = fnOrSelf(points.show);
		points.size   = fnOrSelf(points.size);
		points.stroke = fnOrSelf(points.stroke);
		points.width  = fnOrSelf(points.width);
		points.fill   = fnOrSelf(points.fill);
	}

	const focus = self.focus = assign({}, opts.focus || {alpha: 0.3},  cursor.focus);
	const cursorFocus =  focus.prox >= 0;

	// series-intersection markers
	let cursorPts = [null];

	function initCursorPt(s, si) {
		if (si > 0) {
			let pt = cursor.points.show(self, si);

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
		let isTime =  scales[s.scale].time;

		let sv = s.value;
		s.value = isTime ? (isStr(sv) ? timeSeriesVal(_tzDate, timeSeriesStamp(sv, _fmtDate)) : sv || _timeSeriesVal) : sv || numSeriesVal;
		s.label = s.label || (isTime ? timeSeriesLabel : numSeriesLabel);

		if (i > 0) {
			s.width  = s.width == null ? 1 : s.width;
			s.paths  = s.paths || linearPath || retNull;
			s.fillTo = fnOrSelf(s.fillTo || seriesFillTo);

			s.stroke = fnOrSelf(s.stroke || hexBlack);
			s.fill   = fnOrSelf(s.fill || null);
			s._stroke = s._fill = s._paths = null;

			let _ptDia = ptDia(s.width, 1);
			let points = s.points = assign({}, {
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
			legendRows.splice(i, 0, initLegendRow(s, i));

		if ( cursor.show) {
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
		 showLegend && legendRows.splice(i, 1)[0][0].parentNode.remove();
		 cursorPts.length > 1 && cursorPts.splice(i, 1)[0].remove();

		// TODO: de-init no-longer-needed scales?
	}

	self.delSeries = delSeries;

	series.forEach(initSeries);

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
			let isTime =  sc.time;

			axis.size   = fnOrSelf(axis.size);
			axis.space  = fnOrSelf(axis.space);
			axis.rotate = fnOrSelf(axis.rotate);
			axis.incrs  = fnOrSelf(axis.incrs  || (          sc.distr == 2 ? wholeIncrs : (isTime ? (ms == 1 ? timeIncrsMs : timeIncrsS) : numIncrs)));
			axis.splits = fnOrSelf(axis.splits || (isTime && sc.distr == 1 ? _timeAxisSplits : sc.distr == 3 ? logAxisSplits : numAxisSplits));

			let av = axis.values;
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
				sidesWithAxes[i] = true;
		}
	}

	// set axis defaults
	axes.forEach(initAxis);

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
	const idxs = series[0].idxs;

	let data0 = null;

	let viaAutoScaleX = false;

	function setData(_data, _resetScales) {
		if (!isArr(_data) && isObj(_data)) {
			_data.isGap && series.forEach(s => { s.isGap = _data.isGap; });
			_data = _data.data;
		}

		_data = _data || [];
		_data[0] = _data[0] || [];

		self.data = _data;
		data = _data.slice();
		data0 = data[0];
		dataLen = data0.length;

		if (xScaleDistr == 2)
			data[0] = data0.map((v, i) => i);

		self._data = data;

		resetYSeries(true);

		fire("setData");

		if (_resetScales !== false) {
			let xsc = scaleX;

			if (xsc.auto(self, viaAutoScaleX))
				autoScaleX();
			else
				_setScale(xScaleKey, xsc.min, xsc.max);

			shouldSetCursor = true;
			shouldSetLegend = true;
			commit();
		}
	}

	self.setData = setData;

	function autoScaleX() {
		viaAutoScaleX = true;

		let _min, _max;

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
				else if (scaleX.time)
					_max = _min + 86400 / ms;
				else
					[_min, _max] = rangeNum(_min, _max, 0.1, true);
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
		let wipScales = copy(scales);

		for (let k in wipScales) {
			let wsc = wipScales[k];
			let psc = pendScales[k];

			if (psc != null && psc.min != null) {
				assign(wsc, psc);

				// explicitly setting the x-scale invalidates everything (acts as redraw)
				if (k == xScaleKey)
					resetYSeries(true);
			}
			else if (k != xScaleKey) {
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
				else if (s.show && s.auto && wsc.auto(self, viaAutoScaleX) && (psc == null || psc.min == null)) {
					// only run getMinMax() for invalidated series data, else reuse
					let minMax = s.min == null ? (wsc.distr == 3 ? getMinMaxLog(data[i], i0, i1) : getMinMax(data[i], i0, i1, s.sorted)) : [s.min, s.max];

					// initial min/max
					wsc.min = min(wsc.min, s.min = minMax[0]);
					wsc.max = max(wsc.max, s.max = minMax[1]);
				}

				s.idxs[0] = i0;
				s.idxs[1] = i1;
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
				let minMax = wsc.range(self, base.min, base.max, k);
				wsc.min = minMax[0];
				wsc.max = minMax[1];
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
				changed[k] = anyChanged = true;
			}
		}

		if (anyChanged) {
			// invalidate paths of all series on changed scales
			series.forEach(s => {
				if (changed[s.scale])
					s._paths = null;
			});

			for (let k in changed) {
				shouldConvergeSize = true;
				fire("setScale", k);
			}

			if ( cursor.show)
				shouldSetCursor = true;
		}

		for (let k in pendScales)
			pendScales[k] = null;
	}

	// TODO: drawWrap(si, drawPoints) (save, restore, translate, clip)
	function drawPoints(si) {
	//	log("drawPoints()", arguments);

		let s = series[si];
		let p = s.points;

		const width = roundDec(p.width * pxRatio, 3);
		const offset = (width % 2) / 2;
		const isStroked = p.width > 0;

		let rad = (p.size - p.width) / 2 * pxRatio;
		let dia = roundDec(rad * 2, 3);

		ctx.translate(offset, offset);

		ctx.save();

		ctx.beginPath();
		ctx.rect(
			plotLft - dia,
			plotTop - dia,
			plotWid + dia * 2,
			plotHgt + dia * 2,
		);
		ctx.clip();

		ctx.globalAlpha = s.alpha;

		const path = new Path2D();

		const scaleY = scales[s.scale];

		let xDim, xOff, yDim, yOff;

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

		for (let pi = i0; pi <= i1; pi++) {
			if (data[si][pi] != null) {
				let x = round(valToPosX(data[0][pi],  scaleX, xDim, xOff));
				let y = round(valToPosY(data[si][pi], scaleY, yDim, yOff));

				moveTo(path, x + rad, y);
				arc(path, x, y, rad, 0, PI * 2);
			}
		}

		const _stroke = p._stroke = p.stroke(self, si);
		const _fill   = p._fill   = p.fill(self, si);

		setCtxStyle(
			_stroke,
			width,
			p.dash,
			p.cap,
			_fill || (isStroked ? "#fff" : s._stroke),
		);

		ctx.fill(path);
		isStroked && ctx.stroke(path);

		ctx.globalAlpha = 1;

		ctx.restore();

		ctx.translate(-offset, -offset);
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
					if (s._paths)
						 drawPath(i);

					if (s.points.show(self, i, i0, i1))
						 drawPoints(i);

					fire("drawSeries", i);
				}
			});
		}
	}

	function drawPath(si) {
		const s = series[si];

		const { stroke, fill, clip } = s._paths;
		const width = roundDec(s.width * pxRatio, 3);
		const offset = (width % 2) / 2;

		const _stroke = s._stroke = s.stroke(self, si);
		const _fill   = s._fill   = s.fill(self, si);

		setCtxStyle(_stroke, width, s.dash, s.cap, _fill);

		ctx.globalAlpha = s.alpha;

		ctx.translate(offset, offset);

		ctx.save();

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

		ctx.beginPath();
		ctx.rect(lft, top, wid, hgt);
		ctx.clip();

		if (clip != null)
			ctx.clip(clip);

		if (!fillBands(si, _fill) && _fill != null)
			ctx.fill(fill);

		width && ctx.stroke(stroke);

		ctx.restore();

		ctx.translate(-offset, -offset);

		ctx.globalAlpha = 1;
	}

	function fillBands(si, seriesFill) {
		let isUpperEdge = false;
		let s = series[si];

		// for all bands where this series is the top edge, create upwards clips using the bottom edges
		// and apply clips + fill with band fill or dfltFill
		bands.forEach((b, bi) => {
			if (b.series[0] == si) {
				isUpperEdge = true;
				let lowerEdge = series[b.series[1]];

				let clip = (lowerEdge._paths || EMPTY_OBJ).band;

				if (lowerEdge.show && clip) {
					ctx.save();
					setCtxStyle(null, null, null, null, b.fill(self, bi) || seriesFill);
					ctx.clip(clip);
					ctx.fill(s._paths.fill);
					ctx.restore();
				}
			}
		});

		return isUpperEdge;
	}

	function getIncrSpace(axisIdx, min, max, fullDim) {
		let axis = axes[axisIdx];

		let incrSpace;

		if (fullDim <= 0)
			incrSpace = [0, 0];
		else {
			let minSpace = axis._space = axis.space(self, axisIdx, min, max, fullDim);
			let incrs    = axis._incrs = axis.incrs(self, axisIdx, min, max, fullDim, minSpace);
			incrSpace    = axis._found = findIncr(min, max, incrs, fullDim, minSpace);
		}

		return incrSpace;
	}

	function drawOrthoLines(offs, filts, ori, side, pos0, len, width, stroke, dash, cap) {
		let offset = (width % 2) / 2;

		ctx.translate(offset, offset);

		setCtxStyle(stroke, width, dash, cap);

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

		offs.forEach((off, i) => {
			if (filts[i] == null)
				return;

			if (ori == 0)
				x0 = x1 = off;
			else
				y0 = y1 = off;

			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
		});

		ctx.stroke();

		ctx.translate(-offset, -offset);
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

			let values = axis._values  = axis.values(self, axis.filter(self, splits, i, _space, incr), i, _space, incr);

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
		axes.forEach((axis, i) => {
			if (!axis.show || !axis._show)
				return;

			let scale = scales[axis.scale];
			let side = axis.side;
			let ori = side % 2;

			let plotDim = ori == 0 ? plotWid : plotHgt;
			let plotOff = ori == 0 ? plotLft : plotTop;

			let axisGap  = round(axis.gap * pxRatio);

			let ticks = axis.ticks;
			let tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

			let [_incr, _space] = axis._found;
			let _splits = axis._splits;

			// tick labels
			// BOO this assumes a specific data/series
			let splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
			let incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

			// rotating of labels only supported on bottom x axis
			let angle = axis._rotate * -PI/180;

			let basePos  = round(axis._pos * pxRatio);
			let shiftAmt = tickSize + axisGap;
			let shiftDir = ori == 0 && side == 0 || ori == 1 && side == 3 ? -1 : 1;
			let finalPos = basePos + shiftAmt * shiftDir;
			let y        = ori == 0 ? finalPos : 0;
			let x        = ori == 1 ? finalPos : 0;

			ctx.font         = axis.font[0];
			ctx.fillStyle    = axis.stroke || hexBlack;									// rgba?
			ctx.textAlign    = axis.align == 1 ? LEFT :
			                   axis.align == 2 ? RIGHT :
			                   angle > 0 ? LEFT :
			                   angle < 0 ? RIGHT :
			                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
			ctx.textBaseline = angle ||
			                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

			let lineHeight   = axis.font[1] * lineMult;

			let canOffs = _splits.map(val => round(getPos(val, scale, plotDim, plotOff)));

			axis._values.forEach((val, i) => {
				if (val == null)
					return;

				if (ori == 0)
					x = canOffs[i];
				else
					y = canOffs[i];

				(""+val).split(/\n/gm).forEach((text, j) => {
					if (angle) {
						ctx.save();
						ctx.translate(x, y + j * lineHeight);
						ctx.rotate(angle);
						ctx.fillText(text, 0, 0);
						ctx.restore();
					}
					else
						ctx.fillText(text, x, y + j * lineHeight);
				});
			});

			// axis label
			if (axis.label) {
				ctx.save();

				let baseLpos = round(axis._lpos * pxRatio);

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
					ticks.stroke,
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
					grid.stroke,
					grid.dash,
					grid.cap,
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

	self.redraw = rebuildPaths => {
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

	const drag =  cursor.drag;

	let dragX =  drag.x;
	let dragY =  drag.y;

	if ( cursor.show) {
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
		left:	0,
		width:	0,
		top:	0,
		height:	0,
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
		let label = showLegend ? legendRows[i][0].parentNode : null;

		if (s.show)
			label && remClass(label, OFF);
		else {
			label && addClass(label, OFF);
			 cursorPts.length > 1 && trans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
		}
	}

	function _setScale(key, min, max) {
		setScale(key, {min, max});
	}

	function setSeries(i, opts, pub) {
	//	log("setSeries()", arguments);

		let s = series[i];

		// will this cause redundant commit() if both show and focus are set?
		if (opts.focus != null)
			setFocus(i);

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
			cursorPts[i].style.opacity = value;

		if ( showLegend && legendRows[i])
			legendRows[i][0].parentNode.style.opacity = value;
	}

	function _setAlpha(i, value) {

		_alpha(i, value);
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

			series.forEach((s, i2) => {
				_setAlpha(i2, i == null || i2 == 0 || i2 == i ? 1 : focus.alpha);
			});

			focusedSeries = i;
			commit();
		}
	}

	if (showLegend && cursorFocus) {
		on(mouseleave, legendEl, e => {
			if (cursor._lock)
				return;
			setSeries(null, FOCUS_FALSE, syncOpts.setSeries);
			updateCursor();
		});
	}

	function posToVal(pos, scale) {
		let sc = scales[scale];

		let dim = plotWidCss;

		if (sc.ori == 1) {
			dim = plotHgtCss;
			pos = dim - pos;
		}

		if (sc.dir == -1)
			pos = dim - pos;

		let _min = sc.min,
			_max = sc.max,
			pct = pos / dim;

		if (sc.distr == 3) {
			_min = log10(_min);
			_max = log10(_max);
			return pow(10, _min + (_max - _min) * pct);
		}
		else
			return _min + (_max - _min) * pct;
	}

	function closestIdxFromXpos(pos) {
		let v = posToVal(pos, xScaleKey);
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

	let setSelX = scaleX.ori == 0 ? setSelH : setSelV;
	let setSelY = scaleX.ori == 1 ? setSelH : setSelV;

	function updateCursor(ts, src) {
	//	ts == null && log("updateCursor()", arguments);

		rawMouseLeft1 = mouseLeft1;
		rawMouseTop1 = mouseTop1;

		[mouseLeft1, mouseTop1] = cursor.move(self, mouseLeft1, mouseTop1);

		if (cursor.show) {
			vCursor && trans(vCursor, round(mouseLeft1), 0, plotWidCss, plotHgtCss);
			hCursor && trans(hCursor, 0, round(mouseTop1), plotWidCss, plotHgtCss);
		}

		let idx;

		// when zooming to an x scale range between datapoints the binary search
		// for nearest min/max indices results in this condition. cheap hack :D
		let noDataInRange = i0 > i1;

		closestDist = inf;

		// TODO: extract
		let xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss;
		let yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss;

		// if cursor hidden, hide points & clear legend vals
		if (mouseLeft1 < 0 || dataLen == 0 || noDataInRange) {
			idx = null;

			for (let i = 0; i < series.length; i++) {
				if (i > 0) {
					 cursorPts.length > 1 && trans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
				}

				if (showLegend && legend.live) {
					if (i == 0 && multiValLegend)
						continue;

					for (let j = 0; j < legendRows[i].length; j++)
						legendRows[i][j].firstChild.nodeValue = '--';
				}
			}

			if (cursorFocus)
				setSeries(null, FOCUS_TRUE, syncOpts.setSeries);
		}
		else {
		//	let pctY = 1 - (y / rect.height);

			let mouseXPos = scaleX.ori == 0 ? mouseLeft1 : mouseTop1;

			let valAtPosX = posToVal(mouseXPos, xScaleKey);

			idx = closestIdx(valAtPosX, data[0], i0, i1);

			let xPos = incrRoundUp(valToPosX(data[0][idx], scaleX, xDim, 0), 0.5);

			for (let i = 0; i < series.length; i++) {
				let s = series[i];

				let idx2  = cursor.dataIdx(self, i, idx, valAtPosX);
				let xPos2 = idx2 == idx ? xPos : incrRoundUp(valToPosX(data[0][idx2], scaleX, xDim, 0), 0.5);

				if (i > 0 && s.show) {
					let valAtIdx = data[i][idx2];

					let yPos = valAtIdx == null ? -10 : incrRoundUp(valToPosY(valAtIdx, scales[s.scale], yDim, 0), 0.5);

					if (yPos > 0) {
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

					 cursorPts.length > 1 && trans(cursorPts[i], hPos, vPos, plotWidCss, plotHgtCss);
				}

				if (showLegend && legend.live) {
					if ((idx2 == cursor.idx && !shouldSetLegend) || i == 0 && multiValLegend)
						continue;

					let src = i == 0 && xScaleDistr == 2 ? data0 : data[i];

					let vals = multiValLegend ? s.values(self, i, idx2) : {_: s.value(self, src[idx2], i, idx2)};

					let j = 0;

					for (let k in vals)
						legendRows[i][j++].firstChild.nodeValue = vals[k];
				}
			}

			shouldSetLegend = false;
		}

		// nit: cursor.drag.setSelect is assumed always true
		if (select.show && dragging) {
			if (src != null) {
				let [xKey, yKey] = syncOpts.scales;

				// match the dragX/dragY implicitness/explicitness of src
				let sdrag = src.cursor.drag;
				dragX = sdrag._x;
				dragY = sdrag._y;

				let { left, top, width, height } = src.select;

				let sori = src.scales[xKey].ori;
				let sPosToVal = src.posToVal;

				let sOff, sDim, sc, a, b;

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
						setSelY(0, yDim);
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
				let o = syncOpts.setSeries;
				let p = focus.prox;

				if (focusedSeries == null) {
					if (closestDist <= p)
						setSeries(closestSeries, FOCUS_TRUE, o);
				}
				else {
					if (closestDist > p)
						setSeries(null, FOCUS_TRUE, o);
					else if (closestSeries != focusedSeries)
						setSeries(closestSeries, FOCUS_TRUE, o);
				}
			}
		}

		ready && fire("setCursor");
	}

	let rect = null;

	function syncRect() {
		rect = over.getBoundingClientRect();
	}

	function mouseMove(e, src, _l, _t, _w, _h, _i) {
		if (cursor._lock)
			return;

		cacheMouse(e, src, _l, _t, _w, _h, _i, false, e != null);

		if (e != null)
			updateCursor(1);
		else
			updateCursor(null, src);
	}

	function cacheMouse(e, src, _l, _t, _w, _h, _i, initial, snap) {
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

			let xDim = plotWidCss,
				yDim = plotHgtCss,
				_xDim = _w,
				_yDim = _h,
				_xPos = _l,
				_yPos = _t;

			if (scaleX.ori == 1) {
				xDim = plotHgtCss;
				yDim = plotWidCss;
			}

			let [xKey, yKey] = syncOpts.scales;

			if (src.scales[xKey].ori == 1) {
				_xDim = _h;
				_yDim = _w;
				_xPos = _t;
				_yPos = _l;
			}

			if (xKey != null)
				_l = getPos(src.posToVal(_xPos, xKey), scales[xKey], xDim, 0);
			else
				_l = xDim * (_xPos/_xDim);

			if (yKey != null)
				_t = getPos(src.posToVal(_yPos, yKey), scales[yKey], yDim, 0);
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
			sync.pub(mousedown, self, mouseLeft0, mouseTop0, plotWidCss, plotHgtCss, null);
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
				updateCursor();
		}

		if (e != null) {
			offMouse(mouseup, doc);
			sync.pub(mouseup, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
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

				updateCursor(1);

				dragging = false;
			}

			mouseLeft1 = -10;
			mouseTop1 = -10;

			// passing a non-null timestamp to force sync/mousemove event
			updateCursor(1);

			if (_dragging)
				dragging = _dragging;
		}
	}

	function dblClick(e, src, _l, _t, _w, _h, _i) {
		autoScaleX();

		hideSelect();

		if (e != null)
			sync.pub(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
	}

	// internal pub/sub
	const events = {};

	events.mousedown = mouseDown;
	events.mousemove = mouseMove;
	events.mouseup = mouseUp;
	events.dblclick = dblClick;
	events["setSeries"] = (e, src, idx, opts) => {
		setSeries(idx, opts);
	};

	let deb;

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

	const syncOpts =  assign({
		key: null,
		setSeries: false,
		scales: [xScaleKey, null]
	}, cursor.sync);

	const syncKey =  syncOpts.key;

	const sync =  (syncKey != null ? (syncs[syncKey] = syncs[syncKey] || _sync()) : _sync());

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
			setScale(xScaleKey, pendScales[xScaleKey]);
		else
			autoScaleX();

		_setSize(opts.width, opts.height);

		setSelect(select, false);
	}

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

	let paths = uPlot.paths = {};

	 (paths.linear  = linear);
	 (paths.spline  = spline);
	 (paths.stepped = stepped);
	 (paths.bars    = bars);
}

module.exports = uPlot;
