/*!
 * FullCalendar v3.5.1
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery', 'moment' ], factory);
	}
	else if (typeof exports === 'object') { // Node/CommonJS
		module.exports = factory(require('jquery'), require('moment'));
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {

;;

var FC = $.fullCalendar = {
	version: "3.5.1",
	// When introducing internal API incompatibilities (where fullcalendar plugins would break),
	// the minor version of the calendar should be upped (ex: 2.7.2 -> 2.8.0)
	// and the below integer should be incremented.
	internalApiVersion: 10
};
var fcViews = FC.views = {};


$.fn.fullCalendar = function(options) {
	var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
	var res = this; // what this function will return (this jQuery object by default)

	this.each(function(i, _element) { // loop each DOM element involved
		var element = $(_element);
		var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
		var singleRes; // the returned value of this single method call

		// a method call
		if (typeof options === 'string') {

			if (options === 'getCalendar') {
				if (!i) { // first element only
					res = calendar;
				}
			}
			else if (options === 'destroy') { // don't warn if no calendar object
				if (calendar) {
					calendar.destroy();
					element.removeData('fullCalendar');
				}
			}
			else if (!calendar) {
				FC.warn("Attempting to call a FullCalendar method on an element with no calendar.");
			}
			else if ($.isFunction(calendar[options])) {
				singleRes = calendar[options].apply(calendar, args);

				if (!i) {
					res = singleRes; // record the first method call result
				}
				if (options === 'destroy') { // for the destroy method, must remove Calendar object data
					element.removeData('fullCalendar');
				}
			}
			else {
				FC.warn("'" + options + "' is an unknown FullCalendar method.");
			}
		}
		// a new calendar initialization
		else if (!calendar) { // don't initialize twice
			calendar = new Calendar(element, options);
			element.data('fullCalendar', calendar);
			calendar.render();
		}
	});

	return res;
};


var complexOptions = [ // names of options that are objects whose properties should be combined
	'header',
	'footer',
	'buttonText',
	'buttonIcons',
	'themeButtonIcons'
];


// Merges an array of option objects into a single object
function mergeOptions(optionObjs) {
	return mergeProps(optionObjs, complexOptions);
}

;;

// exports
FC.applyAll = applyAll;
FC.debounce = debounce;
FC.isInt = isInt;
FC.htmlEscape = htmlEscape;
FC.cssToStr = cssToStr;
FC.proxy = proxy;
FC.capitaliseFirstLetter = capitaliseFirstLetter;


/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEls, scrollbarWidths) {
	if (scrollbarWidths.left) {
		rowEls.css({
			'border-left-width': 1,
			'margin-left': scrollbarWidths.left - 1
		});
	}
	if (scrollbarWidths.right) {
		rowEls.css({
			'border-right-width': 1,
			'margin-right': scrollbarWidths.right - 1
		});
	}
}


// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
	rowEls.css({
		'margin-left': '',
		'margin-right': '',
		'border-left-width': '',
		'border-right-width': ''
	});
}


// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
	$('body').addClass('fc-not-allowed');
}


// Returns the mouse cursor to its original look
function enableCursor() {
	$('body').removeClass('fc-not-allowed');
}


// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and 
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {

	// *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
	// and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.

	var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
	var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
	var flexEls = []; // elements that are allowed to expand. array of DOM nodes
	var flexOffsets = []; // amount of vertical space it takes up
	var flexHeights = []; // actual css height
	var usedHeight = 0;

	undistributeHeight(els); // give all elements their natural height

	// find elements that are below the recommended height (expandable).
	// important to query for heights in a single first pass (to avoid reflow oscillation).
	els.each(function(i, el) {
		var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = $(el).outerHeight(true);

		if (naturalOffset < minOffset) {
			flexEls.push(el);
			flexOffsets.push(naturalOffset);
			flexHeights.push($(el).height());
		}
		else {
			// this element stretches past recommended height (non-expandable). mark the space as occupied.
			usedHeight += naturalOffset;
		}
	});

	// readjust the recommended height to only consider the height available to non-maxed-out rows.
	if (shouldRedistribute) {
		availableHeight -= usedHeight;
		minOffset1 = Math.floor(availableHeight / flexEls.length);
		minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
	}

	// assign heights to all expandable elements
	$(flexEls).each(function(i, el) {
		var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = flexOffsets[i];
		var naturalHeight = flexHeights[i];
		var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding

		if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
			$(el).height(newHeight);
		}
	});
}


// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
	els.height('');
}


// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
	var maxInnerWidth = 0;

	els.find('> *').each(function(i, innerEl) {
		var innerWidth = $(innerEl).outerWidth();
		if (innerWidth > maxInnerWidth) {
			maxInnerWidth = innerWidth;
		}
	});

	maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance

	els.width(maxInnerWidth);

	return maxInnerWidth;
}


// Given one element that resides inside another,
// Subtracts the height of the inner element from the outer element.
function subtractInnerElHeight(outerEl, innerEl) {
	var both = outerEl.add(innerEl);
	var diff;

	// effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
	both.css({
		position: 'relative', // cause a reflow, which will force fresh dimension recalculation
		left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
	});
	diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
	both.css({ position: '', left: '' }); // undo hack

	return diff;
}


/* Element Geom Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.getOuterRect = getOuterRect;
FC.getClientRect = getClientRect;
FC.getContentRect = getContentRect;
FC.getScrollbarWidths = getScrollbarWidths;


// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
	var position = el.css('position'),
		scrollParent = el.parents().filter(function() {
			var parent = $(this);
			return (/(auto|scroll)/).test(
				parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x')
			);
		}).eq(0);

	return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}


// Queries the outer bounding area of a jQuery element.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getOuterRect(el, origin) {
	var offset = el.offset();
	var left = offset.left - (origin ? origin.left : 0);
	var top = offset.top - (origin ? origin.top : 0);

	return {
		left: left,
		right: left + el.outerWidth(),
		top: top,
		bottom: top + el.outerHeight()
	};
}


// Queries the area within the margin/border/scrollbars of a jQuery element. Does not go within the padding.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
// WARNING: given element can't have borders
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getClientRect(el, origin) {
	var offset = el.offset();
	var scrollbarWidths = getScrollbarWidths(el);
	var left = offset.left + getCssFloat(el, 'border-left-width') + scrollbarWidths.left - (origin ? origin.left : 0);
	var top = offset.top + getCssFloat(el, 'border-top-width') + scrollbarWidths.top - (origin ? origin.top : 0);

	return {
		left: left,
		right: left + el[0].clientWidth, // clientWidth includes padding but NOT scrollbars
		top: top,
		bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
	};
}


// Queries the area within the margin/border/padding of a jQuery element. Assumed not to have scrollbars.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getContentRect(el, origin) {
	var offset = el.offset(); // just outside of border, margin not included
	var left = offset.left + getCssFloat(el, 'border-left-width') + getCssFloat(el, 'padding-left') -
		(origin ? origin.left : 0);
	var top = offset.top + getCssFloat(el, 'border-top-width') + getCssFloat(el, 'padding-top') -
		(origin ? origin.top : 0);

	return {
		left: left,
		right: left + el.width(),
		top: top,
		bottom: top + el.height()
	};
}


// Returns the computed left/right/top/bottom scrollbar widths for the given jQuery element.
// WARNING: given element can't have borders (which will cause offsetWidth/offsetHeight to be larger).
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getScrollbarWidths(el) {
	var leftRightWidth = el[0].offsetWidth - el[0].clientWidth;
	var bottomWidth = el[0].offsetHeight - el[0].clientHeight;
	var widths;

	leftRightWidth = sanitizeScrollbarWidth(leftRightWidth);
	bottomWidth = sanitizeScrollbarWidth(bottomWidth);

	widths = { left: 0, right: 0, top: 0, bottom: bottomWidth };

	if (getIsLeftRtlScrollbars() && el.css('direction') == 'rtl') { // is the scrollbar on the left side?
		widths.left = leftRightWidth;
	}
	else {
		widths.right = leftRightWidth;
	}

	return widths;
}


// The scrollbar width computations in getScrollbarWidths are sometimes flawed when it comes to
// retina displays, rounding, and IE11. Massage them into a usable value.
function sanitizeScrollbarWidth(width) {
	width = Math.max(0, width); // no negatives
	width = Math.round(width);
	return width;
}


// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side

var _isLeftRtlScrollbars = null;

function getIsLeftRtlScrollbars() { // responsible for caching the computation
	if (_isLeftRtlScrollbars === null) {
		_isLeftRtlScrollbars = computeIsLeftRtlScrollbars();
	}
	return _isLeftRtlScrollbars;
}

function computeIsLeftRtlScrollbars() { // creates an offscreen test element, then removes it
	var el = $('<div><div/></div>')
		.css({
			position: 'absolute',
			top: -1000,
			left: 0,
			border: 0,
			padding: 0,
			overflow: 'scroll',
			direction: 'rtl'
		})
		.appendTo('body');
	var innerEl = el.children();
	var res = innerEl.offset().left > el.offset().left; // is the inner div shifted to accommodate a left scrollbar?
	el.remove();
	return res;
}


// Retrieves a jQuery element's computed CSS value as a floating-point number.
// If the queried value is non-numeric (ex: IE can return "medium" for border width), will just return zero.
function getCssFloat(el, prop) {
	return parseFloat(el.css(prop)) || 0;
}


/* Mouse / Touch Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.preventDefault = preventDefault;


// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
	return ev.which == 1 && !ev.ctrlKey;
}


function getEvX(ev) {
	var touches = ev.originalEvent.touches;

	// on mobile FF, pageX for touch events is present, but incorrect,
	// so, look at touch coordinates first.
	if (touches && touches.length) {
		return touches[0].pageX;
	}

	return ev.pageX;
}


function getEvY(ev) {
	var touches = ev.originalEvent.touches;

	// on mobile FF, pageX for touch events is present, but incorrect,
	// so, look at touch coordinates first.
	if (touches && touches.length) {
		return touches[0].pageY;
	}

	return ev.pageY;
}


function getEvIsTouch(ev) {
	return /^touch/.test(ev.type);
}


function preventSelection(el) {
	el.addClass('fc-unselectable')
		.on('selectstart', preventDefault);
}


function allowSelection(el) {
	el.removeClass('fc-unselectable')
		.off('selectstart', preventDefault);
}


// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
	ev.preventDefault();
}


/* General Geometry Utils
----------------------------------------------------------------------------------------------------------------------*/

FC.intersectRects = intersectRects;

// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
	var res = {
		left: Math.max(rect1.left, rect2.left),
		right: Math.min(rect1.right, rect2.right),
		top: Math.max(rect1.top, rect2.top),
		bottom: Math.min(rect1.bottom, rect2.bottom)
	};

	if (res.left < res.right && res.top < res.bottom) {
		return res;
	}
	return false;
}


// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
	return {
		left: Math.min(Math.max(point.left, rect.left), rect.right),
		top: Math.min(Math.max(point.top, rect.top), rect.bottom)
	};
}


// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
	return {
		left: (rect.left + rect.right) / 2,
		top: (rect.top + rect.bottom) / 2
	};
}


// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
	return {
		left: point1.left - point2.left,
		top: point1.top - point2.top
	};
}


/* Object Ordering by Field
----------------------------------------------------------------------------------------------------------------------*/

FC.parseFieldSpecs = parseFieldSpecs;
FC.compareByFieldSpecs = compareByFieldSpecs;
FC.compareByFieldSpec = compareByFieldSpec;
FC.flexibleCompare = flexibleCompare;


function parseFieldSpecs(input) {
	var specs = [];
	var tokens = [];
	var i, token;

	if (typeof input === 'string') {
		tokens = input.split(/\s*,\s*/);
	}
	else if (typeof input === 'function') {
		tokens = [ input ];
	}
	else if ($.isArray(input)) {
		tokens = input;
	}

	for (i = 0; i < tokens.length; i++) {
		token = tokens[i];

		if (typeof token === 'string') {
			specs.push(
				token.charAt(0) == '-' ?
					{ field: token.substring(1), order: -1 } :
					{ field: token, order: 1 }
			);
		}
		else if (typeof token === 'function') {
			specs.push({ func: token });
		}
	}

	return specs;
}


function compareByFieldSpecs(obj1, obj2, fieldSpecs) {
	var i;
	var cmp;

	for (i = 0; i < fieldSpecs.length; i++) {
		cmp = compareByFieldSpec(obj1, obj2, fieldSpecs[i]);
		if (cmp) {
			return cmp;
		}
	}

	return 0;
}


function compareByFieldSpec(obj1, obj2, fieldSpec) {
	if (fieldSpec.func) {
		return fieldSpec.func(obj1, obj2);
	}
	return flexibleCompare(obj1[fieldSpec.field], obj2[fieldSpec.field]) *
		(fieldSpec.order || 1);
}


function flexibleCompare(a, b) {
	if (!a && !b) {
		return 0;
	}
	if (b == null) {
		return -1;
	}
	if (a == null) {
		return 1;
	}
	if ($.type(a) === 'string' || $.type(b) === 'string') {
		return String(a).localeCompare(String(b));
	}
	return a - b;
}


/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/

FC.computeGreatestUnit = computeGreatestUnit;
FC.divideRangeByDuration = divideRangeByDuration;
FC.divideDurationByDuration = divideDurationByDuration;
FC.multiplyDuration = multiplyDuration;
FC.durationHasTime = durationHasTime;

var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
var unitsDesc = [ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ]; // descending


// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function diffDayTime(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
		ms: a.time() - b.time() // time-of-day from day start. disregards timezone
	});
}


// Diffs the two moments via their start-of-day (regardless of timezone). Produces whole-day durations.
function diffDay(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
	});
}


// Diffs two moments, producing a duration, made of a whole-unit-increment of the given unit. Uses rounding.
function diffByUnit(a, b, unit) {
	return moment.duration(
		Math.round(a.diff(b, unit, true)), // returnFloat=true
		unit
	);
}


// Computes the unit name of the largest whole-unit period of time.
// For example, 48 hours will be "days" whereas 49 hours will be "hours".
// Accepts start/end, a range object, or an original duration object.
function computeGreatestUnit(start, end) {
	var i, unit;
	var val;

	for (i = 0; i < unitsDesc.length; i++) {
		unit = unitsDesc[i];
		val = computeRangeAs(unit, start, end);

		if (val >= 1 && isInt(val)) {
			break;
		}
	}

	return unit; // will be "milliseconds" if nothing else matches
}


// like computeGreatestUnit, but has special abilities to interpret the source input for clues
function computeDurationGreatestUnit(duration, durationInput) {
	var unit = computeGreatestUnit(duration);

	// prevent days:7 from being interpreted as a week
	if (unit === 'week' && typeof durationInput === 'object' && durationInput.days) {
		unit = 'day';
	}

	return unit;
}


// Computes the number of units (like "hours") in the given range.
// Range can be a {start,end} object, separate start/end args, or a Duration.
// Results are based on Moment's .as() and .diff() methods, so results can depend on internal handling
// of month-diffing logic (which tends to vary from version to version).
function computeRangeAs(unit, start, end) {

	if (end != null) { // given start, end
		return end.diff(start, unit, true);
	}
	else if (moment.isDuration(start)) { // given duration
		return start.as(unit);
	}
	else { // given { start, end } range object
		return start.end.diff(start.start, unit, true);
	}
}


// Intelligently divides a range (specified by a start/end params) by a duration
function divideRangeByDuration(start, end, dur) {
	var months;

	if (durationHasTime(dur)) {
		return (end - start) / dur;
	}
	months = dur.asMonths();
	if (Math.abs(months) >= 1 && isInt(months)) {
		return end.diff(start, 'months', true) / months;
	}
	return end.diff(start, 'days', true) / dur.asDays();
}


// Intelligently divides one duration by another
function divideDurationByDuration(dur1, dur2) {
	var months1, months2;

	if (durationHasTime(dur1) || durationHasTime(dur2)) {
		return dur1 / dur2;
	}
	months1 = dur1.asMonths();
	months2 = dur2.asMonths();
	if (
		Math.abs(months1) >= 1 && isInt(months1) &&
		Math.abs(months2) >= 1 && isInt(months2)
	) {
		return months1 / months2;
	}
	return dur1.asDays() / dur2.asDays();
}


// Intelligently multiplies a duration by a number
function multiplyDuration(dur, n) {
	var months;

	if (durationHasTime(dur)) {
		return moment.duration(dur * n);
	}
	months = dur.asMonths();
	if (Math.abs(months) >= 1 && isInt(months)) {
		return moment.duration({ months: months * n });
	}
	return moment.duration({ days: dur.asDays() * n });
}


// Returns a boolean about whether the given duration has any time parts (hours/minutes/seconds/ms)
function durationHasTime(dur) {
	return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
}


function isNativeDate(input) {
	return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}


// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
	return typeof str === 'string' &&
		/^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}


/* Logging and Debug
----------------------------------------------------------------------------------------------------------------------*/

FC.log = function() {
	var console = window.console;

	if (console && console.log) {
		return console.log.apply(console, arguments);
	}
};

FC.warn = function() {
	var console = window.console;

	if (console && console.warn) {
		return console.warn.apply(console, arguments);
	}
	else {
		return FC.log.apply(FC, arguments);
	}
};


/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/

var hasOwnPropMethod = {}.hasOwnProperty;


// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
	var dest = {};
	var i, name;
	var complexObjs;
	var j, val;
	var props;

	if (complexProps) {
		for (i = 0; i < complexProps.length; i++) {
			name = complexProps[i];
			complexObjs = [];

			// collect the trailing object values, stopping when a non-object is discovered
			for (j = propObjs.length - 1; j >= 0; j--) {
				val = propObjs[j][name];

				if (typeof val === 'object') {
					complexObjs.unshift(val);
				}
				else if (val !== undefined) {
					dest[name] = val; // if there were no objects, this value will be used
					break;
				}
			}

			// if the trailing values were objects, use the merged value
			if (complexObjs.length) {
				dest[name] = mergeProps(complexObjs);
			}
		}
	}

	// copy values into the destination, going from last to first
	for (i = propObjs.length - 1; i >= 0; i--) {
		props = propObjs[i];

		for (name in props) {
			if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
				dest[name] = props[name];
			}
		}
	}

	return dest;
}


function copyOwnProps(src, dest) {
	for (var name in src) {
		if (hasOwnProp(src, name)) {
			dest[name] = src[name];
		}
	}
}


function hasOwnProp(obj, name) {
	return hasOwnPropMethod.call(obj, name);
}


function applyAll(functions, thisObj, args) {
	if ($.isFunction(functions)) {
		functions = [ functions ];
	}
	if (functions) {
		var i;
		var ret;
		for (i=0; i<functions.length; i++) {
			ret = functions[i].apply(thisObj, args) || ret;
		}
		return ret;
	}
}


function removeMatching(array, testFunc) {
	var removeCnt = 0;
	var i = 0;

	while (i < array.length) {
		if (testFunc(array[i])) { // truthy value means *remove*
			array.splice(i, 1);
			removeCnt++;
		}
		else {
			i++;
		}
	}

	return removeCnt;
}


function removeExact(array, exactVal) {
	var removeCnt = 0;
	var i = 0;

	while (i < array.length) {
		if (array[i] === exactVal) {
			array.splice(i, 1);
			removeCnt++;
		}
		else {
			i++;
		}
	}

	return removeCnt;
}
FC.removeExact = removeExact;



function firstDefined() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i] !== undefined) {
			return arguments[i];
		}
	}
}


function htmlEscape(s) {
	return (s + '').replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
}


function stripHtmlEntities(text) {
	return text.replace(/&.*?;/g, '');
}


// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
	var statements = [];

	$.each(cssProps, function(name, val) {
		if (val != null) {
			statements.push(name + ':' + val);
		}
	});

	return statements.join(';');
}


// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
	var parts = [];

	$.each(attrs, function(name, val) {
		if (val != null) {
			parts.push(name + '="' + htmlEscape(val) + '"');
		}
	});

	return parts.join(' ');
}


function capitaliseFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function compareNumbers(a, b) { // for .sort()
	return a - b;
}


function isInt(n) {
	return n % 1 === 0;
}


// Returns a method bound to the given object context.
// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
// different contexts as identical when binding/unbinding events.
function proxy(obj, methodName) {
	var method = obj[methodName];

	return function() {
		return method.apply(obj, arguments);
	};
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait, immediate) {
	var timeout, args, context, timestamp, result;

	var later = function() {
		var last = +new Date() - timestamp;
		if (last < wait) {
			timeout = setTimeout(later, wait - last);
		}
		else {
			timeout = null;
			if (!immediate) {
				result = func.apply(context, args);
				context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = +new Date();
		var callNow = immediate && !timeout;
		if (!timeout) {
			timeout = setTimeout(later, wait);
		}
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	};
}

;;

/*
GENERAL NOTE on moments throughout the *entire rest* of the codebase:
All moments are assumed to be ambiguously-zoned unless otherwise noted,
with the NOTABLE EXCEOPTION of start/end dates that live on *Event Objects*.
Ambiguously-TIMED moments are assumed to be ambiguously-zoned by nature.
*/

var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex =
	/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods

// tell momentjs to transfer these properties upon clone
var momentProperties = moment.momentProperties;
momentProperties.push('_fullCalendar');
momentProperties.push('_ambigTime');
momentProperties.push('_ambigZone');


// Creating
// -------------------------------------------------------------------------------------------------

// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
FC.moment = function() {
	return makeMoment(arguments);
};

// Sames as FC.moment, but forces the resulting moment to be in the UTC timezone.
FC.moment.utc = function() {
	var mom = makeMoment(arguments, true);

	// Force it into UTC because makeMoment doesn't guarantee it
	// (if given a pre-existing moment for example)
	if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
		mom.utc();
	}

	return mom;
};

// Same as FC.moment, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
FC.moment.parseZone = function() {
	return makeMoment(arguments, true, true);
};

// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
	var input = args[0];
	var isSingleString = args.length == 1 && typeof input === 'string';
	var isAmbigTime;
	var isAmbigZone;
	var ambigMatch;
	var mom;

	if (moment.isMoment(input) || isNativeDate(input) || input === undefined) {
		mom = moment.apply(null, args);
	}
	else { // "parsing" is required
		isAmbigTime = false;
		isAmbigZone = false;

		if (isSingleString) {
			if (ambigDateOfMonthRegex.test(input)) {
				// accept strings like '2014-05', but convert to the first of the month
				input += '-01';
				args = [ input ]; // for when we pass it on to moment's constructor
				isAmbigTime = true;
				isAmbigZone = true;
			}
			else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
				isAmbigTime = !ambigMatch[5]; // no time part?
				isAmbigZone = true;
			}
		}
		else if ($.isArray(input)) {
			// arrays have no timezone information, so assume ambiguous zone
			isAmbigZone = true;
		}
		// otherwise, probably a string with a format

		if (parseAsUTC || isAmbigTime) {
			mom = moment.utc.apply(moment, args);
		}
		else {
			mom = moment.apply(null, args);
		}

		if (isAmbigTime) {
			mom._ambigTime = true;
			mom._ambigZone = true; // ambiguous time always means ambiguous zone
		}
		else if (parseZone) { // let's record the inputted zone somehow
			if (isAmbigZone) {
				mom._ambigZone = true;
			}
			else if (isSingleString) {
				mom.utcOffset(input); // if not a valid zone, will assign UTC
			}
		}
	}

	mom._fullCalendar = true; // flag for extended functionality

	return mom;
}


// Week Number
// -------------------------------------------------------------------------------------------------


// Returns the week number, considering the locale's custom week number calcuation
// `weeks` is an alias for `week`
newMomentProto.week = newMomentProto.weeks = function(input) {
	var weekCalc = this._locale._fullCalendar_weekCalc;

	if (input == null && typeof weekCalc === 'function') { // custom function only works for getter
		return weekCalc(this);
	}
	else if (weekCalc === 'ISO') {
		return oldMomentProto.isoWeek.apply(this, arguments); // ISO getter/setter
	}

	return oldMomentProto.week.apply(this, arguments); // local getter/setter
};


// Time-of-day
// -------------------------------------------------------------------------------------------------

// GETTER
// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
// If the moment has an ambiguous time, a duration of 00:00 will be returned.
//
// SETTER
// You can supply a Duration, a Moment, or a Duration-like argument.
// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
newMomentProto.time = function(time) {

	// Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
	// `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
	if (!this._fullCalendar) {
		return oldMomentProto.time.apply(this, arguments);
	}

	if (time == null) { // getter
		return moment.duration({
			hours: this.hours(),
			minutes: this.minutes(),
			seconds: this.seconds(),
			milliseconds: this.milliseconds()
		});
	}
	else { // setter

		this._ambigTime = false; // mark that the moment now has a time

		if (!moment.isDuration(time) && !moment.isMoment(time)) {
			time = moment.duration(time);
		}

		// The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
		// Only for Duration times, not Moment times.
		var dayHours = 0;
		if (moment.isDuration(time)) {
			dayHours = Math.floor(time.asDays()) * 24;
		}

		// We need to set the individual fields.
		// Can't use startOf('day') then add duration. In case of DST at start of day.
		return this.hours(dayHours + time.hours())
			.minutes(time.minutes())
			.seconds(time.seconds())
			.milliseconds(time.milliseconds());
	}
};

// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
// but preserving its YMD. A moment with a stripped time will display no time
// nor timezone offset when .format() is called.
newMomentProto.stripTime = function() {

	if (!this._ambigTime) {

		this.utc(true); // keepLocalTime=true (for keeping *date* value)

		// set time to zero
		this.set({
			hours: 0,
			minutes: 0,
			seconds: 0,
			ms: 0
		});

		// Mark the time as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
		// which clears all ambig flags.
		this._ambigTime = true;
		this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset
	}

	return this; // for chaining
};

// Returns if the moment has a non-ambiguous time (boolean)
newMomentProto.hasTime = function() {
	return !this._ambigTime;
};


// Timezone
// -------------------------------------------------------------------------------------------------

// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function() {
	var wasAmbigTime;

	if (!this._ambigZone) {

		wasAmbigTime = this._ambigTime;

		this.utc(true); // keepLocalTime=true (for keeping date and time values)

		// the above call to .utc()/.utcOffset() unfortunately might clear the ambig flags, so restore
		this._ambigTime = wasAmbigTime || false;

		// Mark the zone as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
		// which clears the ambig flags.
		this._ambigZone = true;
	}

	return this; // for chaining
};

// Returns of the moment has a non-ambiguous timezone offset (boolean)
newMomentProto.hasZone = function() {
	return !this._ambigZone;
};


// implicitly marks a zone
newMomentProto.local = function(keepLocalTime) {

	// for when converting from ambiguously-zoned to local,
	// keep the time values when converting from UTC -> local
	oldMomentProto.local.call(this, this._ambigZone || keepLocalTime);

	// ensure non-ambiguous
	// this probably already happened via local() -> utcOffset(), but don't rely on Moment's internals
	this._ambigTime = false;
	this._ambigZone = false;

	return this; // for chaining
};


// implicitly marks a zone
newMomentProto.utc = function(keepLocalTime) {

	oldMomentProto.utc.call(this, keepLocalTime);

	// ensure non-ambiguous
	// this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
	this._ambigTime = false;
	this._ambigZone = false;

	return this;
};


// implicitly marks a zone (will probably get called upon .utc() and .local())
newMomentProto.utcOffset = function(tzo) {

	if (tzo != null) { // setter
		// these assignments needs to happen before the original zone method is called.
		// I forget why, something to do with a browser crash.
		this._ambigTime = false;
		this._ambigZone = false;
	}

	return oldMomentProto.utcOffset.apply(this, arguments);
};


// Formatting
// -------------------------------------------------------------------------------------------------

newMomentProto.format = function() {

	if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
		return formatDate(this, arguments[0]); // our extended formatting
	}
	if (this._ambigTime) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
	}
	if (this._fullCalendar) { // enhanced non-ambig moment?
		// moment.format() doesn't ensure english, but we want to.
		return oldMomentFormat(englishMoment(this));
	}

	return oldMomentProto.format.apply(this, arguments);
};

newMomentProto.toISOString = function() {

	if (this._ambigTime) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
	}
	if (this._fullCalendar) { // enhanced non-ambig moment?
		// depending on browser, moment might not output english. ensure english.
		// https://github.com/moment/moment/blob/2.18.1/src/lib/moment/format.js#L22
		return oldMomentProto.toISOString.apply(englishMoment(this), arguments);
	}

	return oldMomentProto.toISOString.apply(this, arguments);
};

function englishMoment(mom) {
	if (mom.locale() !== 'en') {
		return mom.clone().locale('en');
	}
	return mom;
}

;;
(function() {

// exports
FC.formatDate = formatDate;
FC.formatRange = formatRange;
FC.oldMomentFormat = oldMomentFormat;
FC.queryMostGranularFormatUnit = queryMostGranularFormatUnit;


// Config
// ---------------------------------------------------------------------------------------------------------------------

/*
Inserted between chunks in the fake ("intermediate") formatting string.
Important that it passes as whitespace (\s) because moment often identifies non-standalone months
via a regexp with an \s.
*/
var PART_SEPARATOR = '\u000b'; // vertical tab

/*
Inserted as the first character of a literal-text chunk to indicate that the literal text is not actually literal text,
but rather, a "special" token that has custom rendering (see specialTokens map).
*/
var SPECIAL_TOKEN_MARKER = '\u001f'; // information separator 1

/*
Inserted at the beginning and end of a span of text that must have non-zero numeric characters.
Handling of these markers is done in a post-processing step at the very end of text rendering.
*/
var MAYBE_MARKER = '\u001e'; // information separator 2
var MAYBE_REGEXP = new RegExp(MAYBE_MARKER + '([^' + MAYBE_MARKER + ']*)' + MAYBE_MARKER, 'g'); // must be global

/*
Addition formatting tokens we want recognized
*/
var specialTokens = {
	t: function(date) { // "a" or "p"
		return oldMomentFormat(date, 'a').charAt(0);
	},
	T: function(date) { // "A" or "P"
		return oldMomentFormat(date, 'A').charAt(0);
	}
};

/*
The first characters of formatting tokens for units that are 1 day or larger.
`value` is for ranking relative size (lower means bigger).
`unit` is a normalized unit, used for comparing moments.
*/
var largeTokenMap = {
	Y: { value: 1, unit: 'year' },
	M: { value: 2, unit: 'month' },
	W: { value: 3, unit: 'week' }, // ISO week
	w: { value: 3, unit: 'week' }, // local week
	D: { value: 4, unit: 'day' }, // day of month
	d: { value: 4, unit: 'day' } // day of week
};


// Single Date Formatting
// ---------------------------------------------------------------------------------------------------------------------

/*
Formats `date` with a Moment formatting string, but allow our non-zero areas and special token
*/
function formatDate(date, formatStr) {
	return renderFakeFormatString(
		getParsedFormatString(formatStr).fakeFormatString,
		date
	);
}

/*
Call this if you want Moment's original format method to be used
*/
function oldMomentFormat(mom, formatStr) {
	return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}


// Date Range Formatting
// -------------------------------------------------------------------------------------------------
// TODO: make it work with timezone offset

/*
Using a formatting string meant for a single date, generate a range string, like
"Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
If the dates are the same as far as the format string is concerned, just return a single
rendering of one date, without any separator.
*/
function formatRange(date1, date2, formatStr, separator, isRTL) {
	var localeData;

	date1 = FC.moment.parseZone(date1);
	date2 = FC.moment.parseZone(date2);

	localeData = date1.localeData();

	// Expand localized format strings, like "LL" -> "MMMM D YYYY".
	// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
	// or non-zero areas in Moment's localized format strings.
	formatStr = localeData.longDateFormat(formatStr) || formatStr;

	return renderParsedFormat(
		getParsedFormatString(formatStr),
		date1,
		date2,
		separator || ' - ',
		isRTL
	);
}

/*
Renders a range with an already-parsed format string.
*/
function renderParsedFormat(parsedFormat, date1, date2, separator, isRTL) {
	var sameUnits = parsedFormat.sameUnits;
	var unzonedDate1 = date1.clone().stripZone(); // for same-unit comparisons
	var unzonedDate2 = date2.clone().stripZone(); // "

	var renderedParts1 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date1);
	var renderedParts2 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date2);

	var leftI;
	var leftStr = '';
	var rightI;
	var rightStr = '';
	var middleI;
	var middleStr1 = '';
	var middleStr2 = '';
	var middleStr = '';

	// Start at the leftmost side of the formatting string and continue until you hit a token
	// that is not the same between dates.
	for (
		leftI = 0;
		leftI < sameUnits.length && (!sameUnits[leftI] || unzonedDate1.isSame(unzonedDate2, sameUnits[leftI]));
		leftI++
	) {
		leftStr += renderedParts1[leftI];
	}

	// Similarly, start at the rightmost side of the formatting string and move left
	for (
		rightI = sameUnits.length - 1;
		rightI > leftI && (!sameUnits[rightI] || unzonedDate1.isSame(unzonedDate2, sameUnits[rightI]));
		rightI--
	) {
		// If current chunk is on the boundary of unique date-content, and is a special-case
		// date-formatting postfix character, then don't consume it. Consider it unique date-content.
		// TODO: make configurable
		if (rightI - 1 === leftI && renderedParts1[rightI] === '.') {
			break;
		}

		rightStr = renderedParts1[rightI] + rightStr;
	}

	// The area in the middle is different for both of the dates.
	// Collect them distinctly so we can jam them together later.
	for (middleI = leftI; middleI <= rightI; middleI++) {
		middleStr1 += renderedParts1[middleI];
		middleStr2 += renderedParts2[middleI];
	}

	if (middleStr1 || middleStr2) {
		if (isRTL) {
			middleStr = middleStr2 + separator + middleStr1;
		}
		else {
			middleStr = middleStr1 + separator + middleStr2;
		}
	}

	return processMaybeMarkers(
		leftStr + middleStr + rightStr
	);
}


// Format String Parsing
// ---------------------------------------------------------------------------------------------------------------------

var parsedFormatStrCache = {};

/*
Returns a parsed format string, leveraging a cache.
*/
function getParsedFormatString(formatStr) {
	return parsedFormatStrCache[formatStr] ||
		(parsedFormatStrCache[formatStr] = parseFormatString(formatStr));
}

/*
Parses a format string into the following:
- fakeFormatString: a momentJS formatting string, littered with special control characters that get post-processed.
- sameUnits: for every part in fakeFormatString, if the part is a token, the value will be a unit string (like "day"),
  that indicates how similar a range's start & end must be in order to share the same formatted text.
  If not a token, then the value is null.
  Always a flat array (not nested liked "chunks").
*/
function parseFormatString(formatStr) {
	var chunks = chunkFormatString(formatStr);
	
	return {
		fakeFormatString: buildFakeFormatString(chunks),
		sameUnits: buildSameUnits(chunks)
	};
}

/*
Break the formatting string into an array of chunks.
A 'maybe' chunk will have nested chunks.
*/
function chunkFormatString(formatStr) {
	var chunks = [];
	var match;

	// TODO: more descrimination
	// \4 is a backreference to the first character of a multi-character set.
	var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;

	while ((match = chunker.exec(formatStr))) {
		if (match[1]) { // a literal string inside [ ... ]
			chunks.push.apply(chunks, // append
				splitStringLiteral(match[1])
			);
		}
		else if (match[2]) { // non-zero formatting inside ( ... )
			chunks.push({ maybe: chunkFormatString(match[2]) });
		}
		else if (match[3]) { // a formatting token
			chunks.push({ token: match[3] });
		}
		else if (match[5]) { // an unenclosed literal string
			chunks.push.apply(chunks, // append
				splitStringLiteral(match[5])
			);
		}
	}

	return chunks;
}

/*
Potentially splits a literal-text string into multiple parts. For special cases.
*/
function splitStringLiteral(s) {
	if (s === '. ') {
		return [ '.', ' ' ]; // for locales with periods bound to the end of each year/month/date
	}
	else {
		return [ s ];
	}
}

/*
Given chunks parsed from a real format string, generate a fake (aka "intermediate") format string with special control
characters that will eventually be given to moment for formatting, and then post-processed.
*/
function buildFakeFormatString(chunks) {
	var parts = [];
	var i, chunk;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (typeof chunk === 'string') {
			parts.push('[' + chunk + ']');
		}
		else if (chunk.token) {
			if (chunk.token in specialTokens) {
				parts.push(
					SPECIAL_TOKEN_MARKER + // useful during post-processing
					'[' + chunk.token + ']' // preserve as literal text
				);
			}
			else {
				parts.push(chunk.token); // unprotected text implies a format string
			}
		}
		else if (chunk.maybe) {
			parts.push(
				MAYBE_MARKER + // useful during post-processing
				buildFakeFormatString(chunk.maybe) +
				MAYBE_MARKER
			);
		}
	}

	return parts.join(PART_SEPARATOR);
}

/*
Given parsed chunks from a real formatting string, generates an array of unit strings (like "day") that indicate
in which regard two dates must be similar in order to share range formatting text.
The `chunks` can be nested (because of "maybe" chunks), however, the returned array will be flat.
*/
function buildSameUnits(chunks) {
	var units = [];
	var i, chunk;
	var tokenInfo;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (chunk.token) {
			tokenInfo = largeTokenMap[chunk.token.charAt(0)];
			units.push(tokenInfo ? tokenInfo.unit : 'second'); // default to a very strict same-second
		}
		else if (chunk.maybe) {
			units.push.apply(units, // append
				buildSameUnits(chunk.maybe)
			);
		}
		else {
			units.push(null);
		}
	}

	return units;
}


// Rendering to text
// ---------------------------------------------------------------------------------------------------------------------

/*
Formats a date with a fake format string, post-processes the control characters, then returns.
*/
function renderFakeFormatString(fakeFormatString, date) {
	return processMaybeMarkers(
		renderFakeFormatStringParts(fakeFormatString, date).join('')
	);
}

/*
Formats a date into parts that will have been post-processed, EXCEPT for the "maybe" markers.
*/
function renderFakeFormatStringParts(fakeFormatString, date) {
	var parts = [];
	var fakeRender = oldMomentFormat(date, fakeFormatString);
	var fakeParts = fakeRender.split(PART_SEPARATOR);
	var i, fakePart;

	for (i = 0; i < fakeParts.length; i++) {
		fakePart = fakeParts[i];

		if (fakePart.charAt(0) === SPECIAL_TOKEN_MARKER) {
			parts.push(
				// the literal string IS the token's name.
				// call special token's registered function.
				specialTokens[fakePart.substring(1)](date)
			);
		}
		else {
			parts.push(fakePart);
		}
	}

	return parts;
}

/*
Accepts an almost-finally-formatted string and processes the "maybe" control characters, returning a new string.
*/
function processMaybeMarkers(s) {
	return s.replace(MAYBE_REGEXP, function(m0, m1) { // regex assumed to have 'g' flag
		if (m1.match(/[1-9]/)) { // any non-zero numeric characters?
			return m1;
		}
		else {
			return '';
		}
	});
}


// Misc Utils
// -------------------------------------------------------------------------------------------------

/*
Returns a unit string, either 'year', 'month', 'day', or null for the most granular formatting token in the string.
*/
function queryMostGranularFormatUnit(formatStr) {
	var chunks = chunkFormatString(formatStr);
	var i, chunk;
	var candidate;
	var best;

	for (i = 0; i < chunks.length; i++) {
		chunk = chunks[i];

		if (chunk.token) {
			candidate = largeTokenMap[chunk.token.charAt(0)];
			if (candidate) {
				if (!best || candidate.value > best.value) {
					best = candidate;
				}
			}
		}
	}

	if (best) {
		return best.unit;
	}

	return null;
};

})();

// quick local references
var formatDate = FC.formatDate;
var formatRange = FC.formatRange;
var oldMomentFormat = FC.oldMomentFormat;

;;

FC.Class = Class; // export

// Class that all other classes will inherit from
function Class() { }


// Called on a class to create a subclass.
// Last argument contains instance methods. Any argument before the last are considered mixins.
Class.extend = function() {
	var members = {};
	var i;

	for (i = 0; i < arguments.length; i++) {
		copyOwnProps(arguments[i], members);
	}

	return extendClass(this, members);
};


// Adds new member variables/methods to the class's prototype.
// Can be called with another class, or a plain object hash containing new members.
Class.mixin = function(members) {
	copyOwnProps(members, this.prototype);
};


function extendClass(superClass, members) {
	var subClass;

	// ensure a constructor for the subclass, forwarding all arguments to the super-constructor if it doesn't exist
	if (hasOwnProp(members, 'constructor')) {
		subClass = members.constructor;
	}
	if (typeof subClass !== 'function') {
		subClass = members.constructor = function() {
			superClass.apply(this, arguments);
		};
	}

	// build the base prototype for the subclass, which is an new object chained to the superclass's prototype
	subClass.prototype = Object.create(superClass.prototype);

	// copy each member variable/method onto the the subclass's prototype
	copyOwnProps(members, subClass.prototype);

	// copy over all class variables/methods to the subclass, such as `extend` and `mixin`
	copyOwnProps(superClass, subClass);

	return subClass;
}

;;

var EmitterMixin = FC.EmitterMixin = {

	// jQuery-ification via $(this) allows a non-DOM object to have
	// the same event handling capabilities (including namespaces).


	on: function(types, handler) {
		$(this).on(types, this._prepareIntercept(handler));
		return this; // for chaining
	},


	one: function(types, handler) {
		$(this).one(types, this._prepareIntercept(handler));
		return this; // for chaining
	},


	_prepareIntercept: function(handler) {
		// handlers are always called with an "event" object as their first param.
		// sneak the `this` context and arguments into the extra parameter object
		// and forward them on to the original handler.
		var intercept = function(ev, extra) {
			return handler.apply(
				extra.context || this,
				extra.args || []
			);
		};

		// mimick jQuery's internal "proxy" system (risky, I know)
		// causing all functions with the same .guid to appear to be the same.
		// https://github.com/jquery/jquery/blob/2.2.4/src/core.js#L448
		// this is needed for calling .off with the original non-intercept handler.
		if (!handler.guid) {
			handler.guid = $.guid++;
		}
		intercept.guid = handler.guid;

		return intercept;
	},


	off: function(types, handler) {
		$(this).off(types, handler);

		return this; // for chaining
	},


	trigger: function(types) {
		var args = Array.prototype.slice.call(arguments, 1); // arguments after the first

		// pass in "extra" info to the intercept
		$(this).triggerHandler(types, { args: args });

		return this; // for chaining
	},


	triggerWith: function(types, context, args) {

		// `triggerHandler` is less reliant on the DOM compared to `trigger`.
		// pass in "extra" info to the intercept.
		$(this).triggerHandler(types, { context: context, args: args });

		return this; // for chaining
	},


	hasHandlers: function(type) {
		var hash = $._data(this, 'events'); // http://blog.jquery.com/2012/08/09/jquery-1-8-released/

		return hash && hash[type] && hash[type].length > 0;
	}

};

;;

/*
Utility methods for easily listening to events on another object,
and more importantly, easily unlistening from them.
*/
var ListenerMixin = FC.ListenerMixin = (function() {
	var guid = 0;
	var ListenerMixin = {

		listenerId: null,

		/*
		Given an `other` object that has on/off methods, bind the given `callback` to an event by the given name.
		The `callback` will be called with the `this` context of the object that .listenTo is being called on.
		Can be called:
			.listenTo(other, eventName, callback)
		OR
			.listenTo(other, {
				eventName1: callback1,
				eventName2: callback2
			})
		*/
		listenTo: function(other, arg, callback) {
			if (typeof arg === 'object') { // given dictionary of callbacks
				for (var eventName in arg) {
					if (arg.hasOwnProperty(eventName)) {
						this.listenTo(other, eventName, arg[eventName]);
					}
				}
			}
			else if (typeof arg === 'string') {
				other.on(
					arg + '.' + this.getListenerNamespace(), // use event namespacing to identify this object
					$.proxy(callback, this) // always use `this` context
						// the usually-undesired jQuery guid behavior doesn't matter,
						// because we always unbind via namespace
				);
			}
		},

		/*
		Causes the current object to stop listening to events on the `other` object.
		`eventName` is optional. If omitted, will stop listening to ALL events on `other`.
		*/
		stopListeningTo: function(other, eventName) {
			other.off((eventName || '') + '.' + this.getListenerNamespace());
		},

		/*
		Returns a string, unique to this object, to be used for event namespacing
		*/
		getListenerNamespace: function() {
			if (this.listenerId == null) {
				this.listenerId = guid++;
			}
			return '_listener' + this.listenerId;
		}

	};
	return ListenerMixin;
})();
;;

var ParsableModelMixin = {

	standardPropMap: {}, // will be cloned by allowRawProps


	/*
	Returns true/false for success
	*/
	applyRawProps: function(rawProps) {
		var standardPropMap = this.standardPropMap;
		var manualProps = {};
		var otherProps = {};
		var propName;

		for (propName in rawProps) {
			if (standardPropMap[propName] === true) { // copy automatically
				this[propName] = rawProps[propName];
			}
			else if (standardPropMap[propName] === false) {
				manualProps[propName] = rawProps[propName];
			}
			else {
				otherProps[propName] = rawProps[propName];
			}
		}

		this.applyOtherRawProps(otherProps);

		return this.applyManualRawProps(manualProps);
	},


	/*
	If subclasses override, they must call this supermethod and return the boolean response.
	*/
	applyManualRawProps: function(rawProps) {
		return true;
	},


	applyOtherRawProps: function(rawProps) {
		// subclasses can implement
	}

};


/*
TODO: devise a better system
*/
var ParsableModelMixin_allowRawProps = function(propDefs) {
	var proto = this.prototype;

	proto.standardPropMap = Object.create(proto.standardPropMap);

	copyOwnProps(propDefs, proto.standardPropMap);
};


/*
TODO: devise a better system
*/
var ParsableModelMixin_copyVerbatimStandardProps = function(src, dest) {
	var map = this.prototype.standardPropMap;
	var propName;

	for (propName in map) {
		if (
			src[propName] != null && // in the src object?
			map[propName] === true // false means "copy verbatim"
		) {
			dest[propName] = src[propName];
		}
	}
};

;;

var Model = Class.extend(EmitterMixin, ListenerMixin, {

	_props: null,
	_watchers: null,
	_globalWatchArgs: null,

	constructor: function() {
		this._watchers = {};
		this._props = {};
		this.applyGlobalWatchers();
	},

	applyGlobalWatchers: function() {
		var argSets = this._globalWatchArgs || [];
		var i;

		for (i = 0; i < argSets.length; i++) {
			this.watch.apply(this, argSets[i]);
		}
	},

	has: function(name) {
		return name in this._props;
	},

	get: function(name) {
		if (name === undefined) {
			return this._props;
		}

		return this._props[name];
	},

	set: function(name, val) {
		var newProps;

		if (typeof name === 'string') {
			newProps = {};
			newProps[name] = val === undefined ? null : val;
		}
		else {
			newProps = name;
		}

		this.setProps(newProps);
	},

	reset: function(newProps) {
		var oldProps = this._props;
		var changeset = {}; // will have undefined's to signal unsets
		var name;

		for (name in oldProps) {
			changeset[name] = undefined;
		}

		for (name in newProps) {
			changeset[name] = newProps[name];
		}

		this.setProps(changeset);
	},

	unset: function(name) { // accepts a string or array of strings
		var newProps = {};
		var names;
		var i;

		if (typeof name === 'string') {
			names = [ name ];
		}
		else {
			names = name;
		}

		for (i = 0; i < names.length; i++) {
			newProps[names[i]] = undefined;
		}

		this.setProps(newProps);
	},

	setProps: function(newProps) {
		var changedProps = {};
		var changedCnt = 0;
		var name, val;

		for (name in newProps) {
			val = newProps[name];

			// a change in value?
			// if an object, don't check equality, because might have been mutated internally.
			// TODO: eventually enforce immutability.
			if (
				typeof val === 'object' ||
				val !== this._props[name]
			) {
				changedProps[name] = val;
				changedCnt++;
			}
		}

		if (changedCnt) {

			this.trigger('before:batchChange', changedProps);

			for (name in changedProps) {
				val = changedProps[name];

				this.trigger('before:change', name, val);
				this.trigger('before:change:' + name, val);
			}

			for (name in changedProps) {
				val = changedProps[name];

				if (val === undefined) {
					delete this._props[name];
				}
				else {
					this._props[name] = val;
				}

				this.trigger('change:' + name, val);
				this.trigger('change', name, val);
			}

			this.trigger('batchChange', changedProps);
		}
	},

	watch: function(name, depList, startFunc, stopFunc) {
		var _this = this;

		this.unwatch(name);

		this._watchers[name] = this._watchDeps(depList, function(deps) {
			var res = startFunc.call(_this, deps);

			if (res && res.then) {
				_this.unset(name); // put in an unset state while resolving
				res.then(function(val) {
					_this.set(name, val);
				});
			}
			else {
				_this.set(name, res);
			}
		}, function() {
			_this.unset(name);

			if (stopFunc) {
				stopFunc.call(_this);
			}
		});
	},

	unwatch: function(name) {
		var watcher = this._watchers[name];

		if (watcher) {
			delete this._watchers[name];
			watcher.teardown();
		}
	},

	_watchDeps: function(depList, startFunc, stopFunc) {
		var _this = this;
		var queuedChangeCnt = 0;
		var depCnt = depList.length;
		var satisfyCnt = 0;
		var values = {}; // what's passed as the `deps` arguments
		var bindTuples = []; // array of [ eventName, handlerFunc ] arrays
		var isCallingStop = false;

		function onBeforeDepChange(depName, val, isOptional) {
			queuedChangeCnt++;
			if (queuedChangeCnt === 1) { // first change to cause a "stop" ?
				if (satisfyCnt === depCnt) { // all deps previously satisfied?
					isCallingStop = true;
					stopFunc();
					isCallingStop = false;
				}
			}
		}

		function onDepChange(depName, val, isOptional) {

			if (val === undefined) { // unsetting a value?

				// required dependency that was previously set?
				if (!isOptional && values[depName] !== undefined) {
					satisfyCnt--;
				}

				delete values[depName];
			}
			else { // setting a value?

				// required dependency that was previously unset?
				if (!isOptional && values[depName] === undefined) {
					satisfyCnt++;
				}

				values[depName] = val;
			}

			queuedChangeCnt--;
			if (!queuedChangeCnt) { // last change to cause a "start"?

				// now finally satisfied or satisfied all along?
				if (satisfyCnt === depCnt) {

					// if the stopFunc initiated another value change, ignore it.
					// it will be processed by another change event anyway.
					if (!isCallingStop) {
						startFunc(values);
					}
				}
			}
		}

		// intercept for .on() that remembers handlers
		function bind(eventName, handler) {
			_this.on(eventName, handler);
			bindTuples.push([ eventName, handler ]);
		}

		// listen to dependency changes
		depList.forEach(function(depName) {
			var isOptional = false;

			if (depName.charAt(0) === '?') { // TODO: more DRY
				depName = depName.substring(1);
				isOptional = true;
			}

			bind('before:change:' + depName, function(val) {
				onBeforeDepChange(depName, val, isOptional);
			});

			bind('change:' + depName, function(val) {
				onDepChange(depName, val, isOptional);
			});
		});

		// process current dependency values
		depList.forEach(function(depName) {
			var isOptional = false;

			if (depName.charAt(0) === '?') { // TODO: more DRY
				depName = depName.substring(1);
				isOptional = true;
			}

			if (_this.has(depName)) {
				values[depName] = _this.get(depName);
				satisfyCnt++;
			}
			else if (isOptional) {
				satisfyCnt++;
			}
		});

		// initially satisfied
		if (satisfyCnt === depCnt) {
			startFunc(values);
		}

		return {
			teardown: function() {
				// remove all handlers
				for (var i = 0; i < bindTuples.length; i++) {
					_this.off(bindTuples[i][0], bindTuples[i][1]);
				}
				bindTuples = null;

				// was satisfied, so call stopFunc
				if (satisfyCnt === depCnt) {
					stopFunc();
				}
			},
			flash: function() {
				if (satisfyCnt === depCnt) {
					stopFunc();
					startFunc(values);
				}
			}
		};
	},

	flash: function(name) {
		var watcher = this._watchers[name];

		if (watcher) {
			watcher.flash();
		}
	}

});


Model.watch = function(/* same arguments as this.watch() */) {
	var proto = this.prototype;

	if (!proto._globalWatchArgs) {
		proto._globalWatchArgs = [];
	}

	proto._globalWatchArgs.push(arguments);
};


FC.Model = Model;


;;

var Promise = {

	construct: function(executor) {
		var deferred = $.Deferred();
		var promise = deferred.promise();

		if (typeof executor === 'function') {
			executor(
				function(val) { // resolve
					deferred.resolve(val);
					attachImmediatelyResolvingThen(promise, val);
				},
				function() { // reject
					deferred.reject();
					attachImmediatelyRejectingThen(promise);
				}
			);
		}

		return promise;
	},

	resolve: function(val) {
		var deferred = $.Deferred().resolve(val);
		var promise = deferred.promise();

		attachImmediatelyResolvingThen(promise, val);

		return promise;
	},

	reject: function() {
		var deferred = $.Deferred().reject();
		var promise = deferred.promise();

		attachImmediatelyRejectingThen(promise);

		return promise;
	}

};


function attachImmediatelyResolvingThen(promise, val) {
	promise.then = function(onResolve) {
		if (typeof onResolve === 'function') {
			return Promise.resolve(onResolve(val));
		}
		return promise;
	};
}


function attachImmediatelyRejectingThen(promise) {
	promise.then = function(onResolve, onReject) {
		if (typeof onReject === 'function') {
			onReject();
		}
		return promise;
	};
}


FC.Promise = Promise;

;;

var TaskQueue = Class.extend(EmitterMixin, {

	q: null,
	isPaused: false,
	isRunning: false,


	constructor: function() {
		this.q = [];
	},


	queue: function(/* taskFunc, taskFunc... */) {
		this.q.push.apply(this.q, arguments); // append
		this.tryStart();
	},


	pause: function() {
		this.isPaused = true;
	},


	resume: function() {
		this.isPaused = false;
		this.tryStart();
	},


	tryStart: function() {
		if (!this.isRunning && this.canRunNext()) {
			this.isRunning = true;
			this.trigger('start');
			this.runNext();
		}
	},


	canRunNext: function() {
		return !this.isPaused && this.q.length;
	},


	runNext: function() { // does not check canRunNext
		this.runTask(this.q.shift());
	},


	runTask: function(task) {
		this.runTaskFunc(task);
	},


	runTaskFunc: function(taskFunc) {
		var _this = this;
		var res = taskFunc();

		if (res && res.then) {
			res.then(done);
		}
		else {
			done();
		}

		function done() {
			if (_this.canRunNext()) {
				_this.runNext();
			}
			else {
				_this.isRunning = false;
				_this.trigger('stop');
			}
		}
	}

});

FC.TaskQueue = TaskQueue;

;;

var RenderQueue = TaskQueue.extend({

	waitsByNamespace: null,
	waitNamespace: null,
	waitId: null,


	constructor: function(waitsByNamespace) {
		TaskQueue.call(this); // super-constructor

		this.waitsByNamespace = waitsByNamespace || {};
	},


	queue: function(taskFunc, namespace, type) {
		var task = {
			func: taskFunc,
			namespace: namespace,
			type: type
		};
		var waitMs;

		if (namespace) {
			waitMs = this.waitsByNamespace[namespace];
		}

		if (this.waitNamespace) {
			if (namespace === this.waitNamespace && waitMs != null) {
				this.delayWait(waitMs);
			}
			else {
				this.clearWait();
				this.tryStart();
			}
		}

		if (this.compoundTask(task)) { // appended to queue?

			if (!this.waitNamespace && waitMs != null) {
				this.startWait(namespace, waitMs);
			}
			else {
				this.tryStart();
			}
		}
	},


	startWait: function(namespace, waitMs) {
		this.waitNamespace = namespace;
		this.spawnWait(waitMs);
	},


	delayWait: function(waitMs) {
		clearTimeout(this.waitId);
		this.spawnWait(waitMs);
	},


	spawnWait: function(waitMs) {
		var _this = this;

		this.waitId = setTimeout(function() {
			_this.waitNamespace = null;
			_this.tryStart();
		}, waitMs);
	},


	clearWait: function() {
		if (this.waitNamespace) {
			clearTimeout(this.waitId);
			this.waitId = null;
			this.waitNamespace = null;
		}
	},


	canRunNext: function() {
		if (!TaskQueue.prototype.canRunNext.apply(this, arguments)) {
			return false;
		}

		// waiting for a certain namespace to stop receiving tasks?
		if (this.waitNamespace) {

			// if there was a different namespace task in the meantime,
			// that forces all previously-waiting tasks to suddenly execute.
			// TODO: find a way to do this in constant time.
			for (var q = this.q, i = 0; i < q.length; i++) {
				if (q[i].namespace !== this.waitNamespace) {
					return true; // allow execution
				}
			}

			return false;
		}

		return true;
	},


	runTask: function(task) {
		this.runTaskFunc(task.func);
	},


	compoundTask: function(newTask) {
		var q = this.q;
		var shouldAppend = true;
		var i, task;

		if (newTask.namespace) {

			if (newTask.type === 'destroy' || newTask.type === 'init') {

				// remove all add/remove ops with same namespace, regardless of order
				for (i = q.length - 1; i >= 0; i--) {
					task = q[i];

					if (
						task.namespace === newTask.namespace &&
						(task.type === 'add' || task.type === 'remove')
					) {
						q.splice(i, 1); // remove task
					}
				}

				if (newTask.type === 'destroy') {
					// eat away final init/destroy operation
					if (q.length) {
						task = q[q.length - 1]; // last task

						if (task.namespace === newTask.namespace) {

							// the init and our destroy cancel each other out
							if (task.type === 'init') {
								shouldAppend = false;
								q.pop();
							}
							// prefer to use the destroy operation that's already present
							else if (task.type === 'destroy') {
								shouldAppend = false;
							}
						}
					}
				}
				else if (newTask.type === 'init') {
					// eat away final init operation
					if (q.length) {
						task = q[q.length - 1]; // last task

						if (
							task.namespace === newTask.namespace &&
							task.type === 'init'
						) {
							// our init operation takes precedence
							q.pop();
						}
					}
				}
			}
		}

		if (shouldAppend) {
			q.push(newTask);
		}

		return shouldAppend;
	}

});

FC.RenderQueue = RenderQueue;

;;

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
	- className (string)
	- content (HTML string or jQuery element set)
	- parentEl
	- top
	- left
	- right (the x coord of where the right edge should be. not a "CSS" right)
	- autoHide (boolean)
	- show (callback)
	- hide (callback)
*/

var Popover = Class.extend(ListenerMixin, {

	isHidden: true,
	options: null,
	el: null, // the container element for the popover. generated by this object
	margin: 10, // the space required between the popover and the edges of the scroll container


	constructor: function(options) {
		this.options = options || {};
	},


	// Shows the popover on the specified position. Renders it if not already
	show: function() {
		if (this.isHidden) {
			if (!this.el) {
				this.render();
			}
			this.el.show();
			this.position();
			this.isHidden = false;
			this.trigger('show');
		}
	},


	// Hides the popover, through CSS, but does not remove it from the DOM
	hide: function() {
		if (!this.isHidden) {
			this.el.hide();
			this.isHidden = true;
			this.trigger('hide');
		}
	},


	// Creates `this.el` and renders content inside of it
	render: function() {
		var _this = this;
		var options = this.options;

		this.el = $('<div class="fc-popover"/>')
			.addClass(options.className || '')
			.css({
				// position initially to the top left to avoid creating scrollbars
				top: 0,
				left: 0
			})
			.append(options.content)
			.appendTo(options.parentEl);

		// when a click happens on anything inside with a 'fc-close' className, hide the popover
		this.el.on('click', '.fc-close', function() {
			_this.hide();
		});

		if (options.autoHide) {
			this.listenTo($(document), 'mousedown', this.documentMousedown);
		}
	},


	// Triggered when the user clicks *anywhere* in the document, for the autoHide feature
	documentMousedown: function(ev) {
		// only hide the popover if the click happened outside the popover
		if (this.el && !$(ev.target).closest(this.el).length) {
			this.hide();
		}
	},


	// Hides and unregisters any handlers
	removeElement: function() {
		this.hide();

		if (this.el) {
			this.el.remove();
			this.el = null;
		}

		this.stopListeningTo($(document), 'mousedown');
	},


	// Positions the popover optimally, using the top/left/right options
	position: function() {
		var options = this.options;
		var origin = this.el.offsetParent().offset();
		var width = this.el.outerWidth();
		var height = this.el.outerHeight();
		var windowEl = $(window);
		var viewportEl = getScrollParent(this.el);
		var viewportTop;
		var viewportLeft;
		var viewportOffset;
		var top; // the "position" (not "offset") values for the popover
		var left; //

		// compute top and left
		top = options.top || 0;
		if (options.left !== undefined) {
			left = options.left;
		}
		else if (options.right !== undefined) {
			left = options.right - width; // derive the left value from the right value
		}
		else {
			left = 0;
		}

		if (viewportEl.is(window) || viewportEl.is(document)) { // normalize getScrollParent's result
			viewportEl = windowEl;
			viewportTop = 0; // the window is always at the top left
			viewportLeft = 0; // (and .offset() won't work if called here)
		}
		else {
			viewportOffset = viewportEl.offset();
			viewportTop = viewportOffset.top;
			viewportLeft = viewportOffset.left;
		}

		// if the window is scrolled, it causes the visible area to be further down
		viewportTop += windowEl.scrollTop();
		viewportLeft += windowEl.scrollLeft();

		// constrain to the view port. if constrained by two edges, give precedence to top/left
		if (options.viewportConstrain !== false) {
			top = Math.min(top, viewportTop + viewportEl.outerHeight() - height - this.margin);
			top = Math.max(top, viewportTop + this.margin);
			left = Math.min(left, viewportLeft + viewportEl.outerWidth() - width - this.margin);
			left = Math.max(left, viewportLeft + this.margin);
		}

		this.el.css({
			top: top - origin.top,
			left: left - origin.left
		});
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	// TODO: better code reuse for this. Repeat code
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}

});

;;

/*
A cache for the left/right/top/bottom/width/height values for one or more elements.
Works with both offset (from topleft document) and position (from offsetParent).

options:
- els
- isHorizontal
- isVertical
*/
var CoordCache = FC.CoordCache = Class.extend({

	els: null, // jQuery set (assumed to be siblings)
	forcedOffsetParentEl: null, // options can override the natural offsetParent
	origin: null, // {left,top} position of offsetParent of els
	boundingRect: null, // constrain cordinates to this rectangle. {left,right,top,bottom} or null
	isHorizontal: false, // whether to query for left/right/width
	isVertical: false, // whether to query for top/bottom/height

	// arrays of coordinates (offsets from topleft of document)
	lefts: null,
	rights: null,
	tops: null,
	bottoms: null,


	constructor: function(options) {
		this.els = $(options.els);
		this.isHorizontal = options.isHorizontal;
		this.isVertical = options.isVertical;
		this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
	},


	// Queries the els for coordinates and stores them.
	// Call this method before using and of the get* methods below.
	build: function() {
		var offsetParentEl = this.forcedOffsetParentEl;
		if (!offsetParentEl && this.els.length > 0) {
			offsetParentEl = this.els.eq(0).offsetParent();
		}

		this.origin = offsetParentEl ?
			offsetParentEl.offset() :
			null;

		this.boundingRect = this.queryBoundingRect();

		if (this.isHorizontal) {
			this.buildElHorizontals();
		}
		if (this.isVertical) {
			this.buildElVerticals();
		}
	},


	// Destroys all internal data about coordinates, freeing memory
	clear: function() {
		this.origin = null;
		this.boundingRect = null;
		this.lefts = null;
		this.rights = null;
		this.tops = null;
		this.bottoms = null;
	},


	// When called, if coord caches aren't built, builds them
	ensureBuilt: function() {
		if (!this.origin) {
			this.build();
		}
	},


	// Populates the left/right internal coordinate arrays
	buildElHorizontals: function() {
		var lefts = [];
		var rights = [];

		this.els.each(function(i, node) {
			var el = $(node);
			var left = el.offset().left;
			var width = el.outerWidth();

			lefts.push(left);
			rights.push(left + width);
		});

		this.lefts = lefts;
		this.rights = rights;
	},


	// Populates the top/bottom internal coordinate arrays
	buildElVerticals: function() {
		var tops = [];
		var bottoms = [];

		this.els.each(function(i, node) {
			var el = $(node);
			var top = el.offset().top;
			var height = el.outerHeight();

			tops.push(top);
			bottoms.push(top + height);
		});

		this.tops = tops;
		this.bottoms = bottoms;
	},


	// Given a left offset (from document left), returns the index of the el that it horizontally intersects.
	// If no intersection is made, returns undefined.
	getHorizontalIndex: function(leftOffset) {
		this.ensureBuilt();

		var lefts = this.lefts;
		var rights = this.rights;
		var len = lefts.length;
		var i;

		for (i = 0; i < len; i++) {
			if (leftOffset >= lefts[i] && leftOffset < rights[i]) {
				return i;
			}
		}
	},


	// Given a top offset (from document top), returns the index of the el that it vertically intersects.
	// If no intersection is made, returns undefined.
	getVerticalIndex: function(topOffset) {
		this.ensureBuilt();

		var tops = this.tops;
		var bottoms = this.bottoms;
		var len = tops.length;
		var i;

		for (i = 0; i < len; i++) {
			if (topOffset >= tops[i] && topOffset < bottoms[i]) {
				return i;
			}
		}
	},


	// Gets the left offset (from document left) of the element at the given index
	getLeftOffset: function(leftIndex) {
		this.ensureBuilt();
		return this.lefts[leftIndex];
	},


	// Gets the left position (from offsetParent left) of the element at the given index
	getLeftPosition: function(leftIndex) {
		this.ensureBuilt();
		return this.lefts[leftIndex] - this.origin.left;
	},


	// Gets the right offset (from document left) of the element at the given index.
	// This value is NOT relative to the document's right edge, like the CSS concept of "right" would be.
	getRightOffset: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex];
	},


	// Gets the right position (from offsetParent left) of the element at the given index.
	// This value is NOT relative to the offsetParent's right edge, like the CSS concept of "right" would be.
	getRightPosition: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex] - this.origin.left;
	},


	// Gets the width of the element at the given index
	getWidth: function(leftIndex) {
		this.ensureBuilt();
		return this.rights[leftIndex] - this.lefts[leftIndex];
	},


	// Gets the top offset (from document top) of the element at the given index
	getTopOffset: function(topIndex) {
		this.ensureBuilt();
		return this.tops[topIndex];
	},


	// Gets the top position (from offsetParent top) of the element at the given position
	getTopPosition: function(topIndex) {
		this.ensureBuilt();
		return this.tops[topIndex] - this.origin.top;
	},

	// Gets the bottom offset (from the document top) of the element at the given index.
	// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
	getBottomOffset: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex];
	},


	// Gets the bottom position (from the offsetParent top) of the element at the given index.
	// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
	getBottomPosition: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex] - this.origin.top;
	},


	// Gets the height of the element at the given index
	getHeight: function(topIndex) {
		this.ensureBuilt();
		return this.bottoms[topIndex] - this.tops[topIndex];
	},


	// Bounding Rect
	// TODO: decouple this from CoordCache

	// Compute and return what the elements' bounding rectangle is, from the user's perspective.
	// Right now, only returns a rectangle if constrained by an overflow:scroll element.
	// Returns null if there are no elements
	queryBoundingRect: function() {
		var scrollParentEl;

		if (this.els.length > 0) {
			scrollParentEl = getScrollParent(this.els.eq(0));

			if (!scrollParentEl.is(document)) {
				return getClientRect(scrollParentEl);
			}
		}

		return null;
	},

	isPointInBounds: function(leftOffset, topOffset) {
		return this.isLeftInBounds(leftOffset) && this.isTopInBounds(topOffset);
	},

	isLeftInBounds: function(leftOffset) {
		return !this.boundingRect || (leftOffset >= this.boundingRect.left && leftOffset < this.boundingRect.right);
	},

	isTopInBounds: function(topOffset) {
		return !this.boundingRect || (topOffset >= this.boundingRect.top && topOffset < this.boundingRect.bottom);
	}

});

;;

/* Tracks a drag's mouse movement, firing various handlers
----------------------------------------------------------------------------------------------------------------------*/
// TODO: use Emitter

var DragListener = FC.DragListener = Class.extend(ListenerMixin, {

	options: null,
	subjectEl: null,

	// coordinates of the initial mousedown
	originX: null,
	originY: null,

	// the wrapping element that scrolls, or MIGHT scroll if there's overflow.
	// TODO: do this for wrappers that have overflow:hidden as well.
	scrollEl: null,

	isInteracting: false,
	isDistanceSurpassed: false,
	isDelayEnded: false,
	isDragging: false,
	isTouch: false,
	isGeneric: false, // initiated by 'dragstart' (jqui)

	delay: null,
	delayTimeoutId: null,
	minDistance: null,

	shouldCancelTouchScroll: true,
	scrollAlwaysKills: false,


	constructor: function(options) {
		this.options = options || {};
	},


	// Interaction (high-level)
	// -----------------------------------------------------------------------------------------------------------------


	startInteraction: function(ev, extraOptions) {

		if (ev.type === 'mousedown') {
			if (GlobalEmitter.get().shouldIgnoreMouse()) {
				return;
			}
			else if (!isPrimaryMouseButton(ev)) {
				return;
			}
			else {
				ev.preventDefault(); // prevents native selection in most browsers
			}
		}

		if (!this.isInteracting) {

			// process options
			extraOptions = extraOptions || {};
			this.delay = firstDefined(extraOptions.delay, this.options.delay, 0);
			this.minDistance = firstDefined(extraOptions.distance, this.options.distance, 0);
			this.subjectEl = this.options.subjectEl;

			preventSelection($('body'));

			this.isInteracting = true;
			this.isTouch = getEvIsTouch(ev);
			this.isGeneric = ev.type === 'dragstart';
			this.isDelayEnded = false;
			this.isDistanceSurpassed = false;

			this.originX = getEvX(ev);
			this.originY = getEvY(ev);
			this.scrollEl = getScrollParent($(ev.target));

			this.bindHandlers();
			this.initAutoScroll();
			this.handleInteractionStart(ev);
			this.startDelay(ev);

			if (!this.minDistance) {
				this.handleDistanceSurpassed(ev);
			}
		}
	},


	handleInteractionStart: function(ev) {
		this.trigger('interactionStart', ev);
	},


	endInteraction: function(ev, isCancelled) {
		if (this.isInteracting) {
			this.endDrag(ev);

			if (this.delayTimeoutId) {
				clearTimeout(this.delayTimeoutId);
				this.delayTimeoutId = null;
			}

			this.destroyAutoScroll();
			this.unbindHandlers();

			this.isInteracting = false;
			this.handleInteractionEnd(ev, isCancelled);

			allowSelection($('body'));
		}
	},


	handleInteractionEnd: function(ev, isCancelled) {
		this.trigger('interactionEnd', ev, isCancelled || false);
	},


	// Binding To DOM
	// -----------------------------------------------------------------------------------------------------------------


	bindHandlers: function() {
		// some browsers (Safari in iOS 10) don't allow preventDefault on touch events that are bound after touchstart,
		// so listen to the GlobalEmitter singleton, which is always bound, instead of the document directly.
		var globalEmitter = GlobalEmitter.get();

		if (this.isGeneric) {
			this.listenTo($(document), { // might only work on iOS because of GlobalEmitter's bind :(
				drag: this.handleMove,
				dragstop: this.endInteraction
			});
		}
		else if (this.isTouch) {
			this.listenTo(globalEmitter, {
				touchmove: this.handleTouchMove,
				touchend: this.endInteraction,
				scroll: this.handleTouchScroll
			});
		}
		else {
			this.listenTo(globalEmitter, {
				mousemove: this.handleMouseMove,
				mouseup: this.endInteraction
			});
		}

		this.listenTo(globalEmitter, {
			selectstart: preventDefault, // don't allow selection while dragging
			contextmenu: preventDefault // long taps would open menu on Chrome dev tools
		});
	},


	unbindHandlers: function() {
		this.stopListeningTo(GlobalEmitter.get());
		this.stopListeningTo($(document)); // for isGeneric
	},


	// Drag (high-level)
	// -----------------------------------------------------------------------------------------------------------------


	// extraOptions ignored if drag already started
	startDrag: function(ev, extraOptions) {
		this.startInteraction(ev, extraOptions); // ensure interaction began

		if (!this.isDragging) {
			this.isDragging = true;
			this.handleDragStart(ev);
		}
	},


	handleDragStart: function(ev) {
		this.trigger('dragStart', ev);
	},


	handleMove: function(ev) {
		var dx = getEvX(ev) - this.originX;
		var dy = getEvY(ev) - this.originY;
		var minDistance = this.minDistance;
		var distanceSq; // current distance from the origin, squared

		if (!this.isDistanceSurpassed) {
			distanceSq = dx * dx + dy * dy;
			if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
				this.handleDistanceSurpassed(ev);
			}
		}

		if (this.isDragging) {
			this.handleDrag(dx, dy, ev);
		}
	},


	// Called while the mouse is being moved and when we know a legitimate drag is taking place
	handleDrag: function(dx, dy, ev) {
		this.trigger('drag', dx, dy, ev);
		this.updateAutoScroll(ev); // will possibly cause scrolling
	},


	endDrag: function(ev) {
		if (this.isDragging) {
			this.isDragging = false;
			this.handleDragEnd(ev);
		}
	},


	handleDragEnd: function(ev) {
		this.trigger('dragEnd', ev);
	},


	// Delay
	// -----------------------------------------------------------------------------------------------------------------


	startDelay: function(initialEv) {
		var _this = this;

		if (this.delay) {
			this.delayTimeoutId = setTimeout(function() {
				_this.handleDelayEnd(initialEv);
			}, this.delay);
		}
		else {
			this.handleDelayEnd(initialEv);
		}
	},


	handleDelayEnd: function(initialEv) {
		this.isDelayEnded = true;

		if (this.isDistanceSurpassed) {
			this.startDrag(initialEv);
		}
	},


	// Distance
	// -----------------------------------------------------------------------------------------------------------------


	handleDistanceSurpassed: function(ev) {
		this.isDistanceSurpassed = true;

		if (this.isDelayEnded) {
			this.startDrag(ev);
		}
	},


	// Mouse / Touch
	// -----------------------------------------------------------------------------------------------------------------


	handleTouchMove: function(ev) {

		// prevent inertia and touchmove-scrolling while dragging
		if (this.isDragging && this.shouldCancelTouchScroll) {
			ev.preventDefault();
		}

		this.handleMove(ev);
	},


	handleMouseMove: function(ev) {
		this.handleMove(ev);
	},


	// Scrolling (unrelated to auto-scroll)
	// -----------------------------------------------------------------------------------------------------------------


	handleTouchScroll: function(ev) {
		// if the drag is being initiated by touch, but a scroll happens before
		// the drag-initiating delay is over, cancel the drag
		if (!this.isDragging || this.scrollAlwaysKills) {
			this.endInteraction(ev, true); // isCancelled=true
		}
	},


	// Utils
	// -----------------------------------------------------------------------------------------------------------------


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		// makes _methods callable by event name. TODO: kill this
		if (this['_' + name]) {
			this['_' + name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}


});

;;
/*
this.scrollEl is set in DragListener
*/
DragListener.mixin({

	isAutoScroll: false,

	scrollBounds: null, // { top, bottom, left, right }
	scrollTopVel: null, // pixels per second
	scrollLeftVel: null, // pixels per second
	scrollIntervalId: null, // ID of setTimeout for scrolling animation loop

	// defaults
	scrollSensitivity: 30, // pixels from edge for scrolling to start
	scrollSpeed: 200, // pixels per second, at maximum speed
	scrollIntervalMs: 50, // millisecond wait between scroll increment


	initAutoScroll: function() {
		var scrollEl = this.scrollEl;

		this.isAutoScroll =
			this.options.scroll &&
			scrollEl &&
			!scrollEl.is(window) &&
			!scrollEl.is(document);

		if (this.isAutoScroll) {
			// debounce makes sure rapid calls don't happen
			this.listenTo(scrollEl, 'scroll', debounce(this.handleDebouncedScroll, 100));
		}
	},


	destroyAutoScroll: function() {
		this.endAutoScroll(); // kill any animation loop

		// remove the scroll handler if there is a scrollEl
		if (this.isAutoScroll) {
			this.stopListeningTo(this.scrollEl, 'scroll'); // will probably get removed by unbindHandlers too :(
		}
	},


	// Computes and stores the bounding rectangle of scrollEl
	computeScrollBounds: function() {
		if (this.isAutoScroll) {
			this.scrollBounds = getOuterRect(this.scrollEl);
			// TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
		}
	},


	// Called when the dragging is in progress and scrolling should be updated
	updateAutoScroll: function(ev) {
		var sensitivity = this.scrollSensitivity;
		var bounds = this.scrollBounds;
		var topCloseness, bottomCloseness;
		var leftCloseness, rightCloseness;
		var topVel = 0;
		var leftVel = 0;

		if (bounds) { // only scroll if scrollEl exists

			// compute closeness to edges. valid range is from 0.0 - 1.0
			topCloseness = (sensitivity - (getEvY(ev) - bounds.top)) / sensitivity;
			bottomCloseness = (sensitivity - (bounds.bottom - getEvY(ev))) / sensitivity;
			leftCloseness = (sensitivity - (getEvX(ev) - bounds.left)) / sensitivity;
			rightCloseness = (sensitivity - (bounds.right - getEvX(ev))) / sensitivity;

			// translate vertical closeness into velocity.
			// mouse must be completely in bounds for velocity to happen.
			if (topCloseness >= 0 && topCloseness <= 1) {
				topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
			}
			else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
				topVel = bottomCloseness * this.scrollSpeed;
			}

			// translate horizontal closeness into velocity
			if (leftCloseness >= 0 && leftCloseness <= 1) {
				leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
			}
			else if (rightCloseness >= 0 && rightCloseness <= 1) {
				leftVel = rightCloseness * this.scrollSpeed;
			}
		}

		this.setScrollVel(topVel, leftVel);
	},


	// Sets the speed-of-scrolling for the scrollEl
	setScrollVel: function(topVel, leftVel) {

		this.scrollTopVel = topVel;
		this.scrollLeftVel = leftVel;

		this.constrainScrollVel(); // massages into realistic values

		// if there is non-zero velocity, and an animation loop hasn't already started, then START
		if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
			this.scrollIntervalId = setInterval(
				proxy(this, 'scrollIntervalFunc'), // scope to `this`
				this.scrollIntervalMs
			);
		}
	},


	// Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
	constrainScrollVel: function() {
		var el = this.scrollEl;

		if (this.scrollTopVel < 0) { // scrolling up?
			if (el.scrollTop() <= 0) { // already scrolled all the way up?
				this.scrollTopVel = 0;
			}
		}
		else if (this.scrollTopVel > 0) { // scrolling down?
			if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) { // already scrolled all the way down?
				this.scrollTopVel = 0;
			}
		}

		if (this.scrollLeftVel < 0) { // scrolling left?
			if (el.scrollLeft() <= 0) { // already scrolled all the left?
				this.scrollLeftVel = 0;
			}
		}
		else if (this.scrollLeftVel > 0) { // scrolling right?
			if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) { // already scrolled all the way right?
				this.scrollLeftVel = 0;
			}
		}
	},


	// This function gets called during every iteration of the scrolling animation loop
	scrollIntervalFunc: function() {
		var el = this.scrollEl;
		var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by

		// change the value of scrollEl's scroll
		if (this.scrollTopVel) {
			el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
		}
		if (this.scrollLeftVel) {
			el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
		}

		this.constrainScrollVel(); // since the scroll values changed, recompute the velocities

		// if scrolled all the way, which causes the vels to be zero, stop the animation loop
		if (!this.scrollTopVel && !this.scrollLeftVel) {
			this.endAutoScroll();
		}
	},


	// Kills any existing scrolling animation loop
	endAutoScroll: function() {
		if (this.scrollIntervalId) {
			clearInterval(this.scrollIntervalId);
			this.scrollIntervalId = null;

			this.handleScrollEnd();
		}
	},


	// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
	handleDebouncedScroll: function() {
		// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
		if (!this.scrollIntervalId) {
			this.handleScrollEnd();
		}
	},


	// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
	handleScrollEnd: function() {
	}

});
;;

/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
------------------------------------------------------------------------------------------------------------------------
options:
- subjectEl
- subjectCenter
*/

var HitDragListener = DragListener.extend({

	component: null, // converts coordinates to hits
		// methods: hitsNeeded, hitsNotNeeded, queryHit

	origHit: null, // the hit the mouse was over when listening started
	hit: null, // the hit the mouse is over
	coordAdjust: null, // delta that will be added to the mouse coordinates when computing collisions


	constructor: function(component, options) {
		DragListener.call(this, options); // call the super-constructor

		this.component = component;
	},


	// Called when drag listening starts (but a real drag has not necessarily began).
	// ev might be undefined if dragging was started manually.
	handleInteractionStart: function(ev) {
		var subjectEl = this.subjectEl;
		var subjectRect;
		var origPoint;
		var point;

		this.component.hitsNeeded();
		this.computeScrollBounds(); // for autoscroll

		if (ev) {
			origPoint = { left: getEvX(ev), top: getEvY(ev) };
			point = origPoint;

			// constrain the point to bounds of the element being dragged
			if (subjectEl) {
				subjectRect = getOuterRect(subjectEl); // used for centering as well
				point = constrainPoint(point, subjectRect);
			}

			this.origHit = this.queryHit(point.left, point.top);

			// treat the center of the subject as the collision point?
			if (subjectEl && this.options.subjectCenter) {

				// only consider the area the subject overlaps the hit. best for large subjects.
				// TODO: skip this if hit didn't supply left/right/top/bottom
				if (this.origHit) {
					subjectRect = intersectRects(this.origHit, subjectRect) ||
						subjectRect; // in case there is no intersection
				}

				point = getRectCenter(subjectRect);
			}

			this.coordAdjust = diffPoints(point, origPoint); // point - origPoint
		}
		else {
			this.origHit = null;
			this.coordAdjust = null;
		}

		// call the super-method. do it after origHit has been computed
		DragListener.prototype.handleInteractionStart.apply(this, arguments);
	},


	// Called when the actual drag has started
	handleDragStart: function(ev) {
		var hit;

		DragListener.prototype.handleDragStart.apply(this, arguments); // call the super-method

		// might be different from this.origHit if the min-distance is large
		hit = this.queryHit(getEvX(ev), getEvY(ev));

		// report the initial hit the mouse is over
		// especially important if no min-distance and drag starts immediately
		if (hit) {
			this.handleHitOver(hit);
		}
	},


	// Called when the drag moves
	handleDrag: function(dx, dy, ev) {
		var hit;

		DragListener.prototype.handleDrag.apply(this, arguments); // call the super-method

		hit = this.queryHit(getEvX(ev), getEvY(ev));

		if (!isHitsEqual(hit, this.hit)) { // a different hit than before?
			if (this.hit) {
				this.handleHitOut();
			}
			if (hit) {
				this.handleHitOver(hit);
			}
		}
	},


	// Called when dragging has been stopped
	handleDragEnd: function() {
		this.handleHitDone();
		DragListener.prototype.handleDragEnd.apply(this, arguments); // call the super-method
	},


	// Called when a the mouse has just moved over a new hit
	handleHitOver: function(hit) {
		var isOrig = isHitsEqual(hit, this.origHit);

		this.hit = hit;

		this.trigger('hitOver', this.hit, isOrig, this.origHit);
	},


	// Called when the mouse has just moved out of a hit
	handleHitOut: function() {
		if (this.hit) {
			this.trigger('hitOut', this.hit);
			this.handleHitDone();
			this.hit = null;
		}
	},


	// Called after a hitOut. Also called before a dragStop
	handleHitDone: function() {
		if (this.hit) {
			this.trigger('hitDone', this.hit);
		}
	},


	// Called when the interaction ends, whether there was a real drag or not
	handleInteractionEnd: function() {
		DragListener.prototype.handleInteractionEnd.apply(this, arguments); // call the super-method

		this.origHit = null;
		this.hit = null;

		this.component.hitsNotNeeded();
	},


	// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
	handleScrollEnd: function() {
		DragListener.prototype.handleScrollEnd.apply(this, arguments); // call the super-method

		// hits' absolute positions will be in new places after a user's scroll.
		// HACK for recomputing.
		if (this.isDragging) {
			this.component.releaseHits();
			this.component.prepareHits();
		}
	},


	// Gets the hit underneath the coordinates for the given mouse event
	queryHit: function(left, top) {

		if (this.coordAdjust) {
			left += this.coordAdjust.left;
			top += this.coordAdjust.top;
		}

		return this.component.queryHit(left, top);
	}

});


// Returns `true` if the hits are identically equal. `false` otherwise. Must be from the same component.
// Two null values will be considered equal, as two "out of the component" states are the same.
function isHitsEqual(hit0, hit1) {

	if (!hit0 && !hit1) {
		return true;
	}

	if (hit0 && hit1) {
		return hit0.component === hit1.component &&
			isHitPropsWithin(hit0, hit1) &&
			isHitPropsWithin(hit1, hit0); // ensures all props are identical
	}

	return false;
}


// Returns true if all of subHit's non-standard properties are within superHit
function isHitPropsWithin(subHit, superHit) {
	for (var propName in subHit) {
		if (!/^(component|left|right|top|bottom)$/.test(propName)) {
			if (subHit[propName] !== superHit[propName]) {
				return false;
			}
		}
	}
	return true;
}

;;

/*
Listens to document and window-level user-interaction events, like touch events and mouse events,
and fires these events as-is to whoever is observing a GlobalEmitter.
Best when used as a singleton via GlobalEmitter.get()

Normalizes mouse/touch events. For examples:
- ignores the the simulated mouse events that happen after a quick tap: mousemove+mousedown+mouseup+click
- compensates for various buggy scenarios where a touchend does not fire
*/

FC.touchMouseIgnoreWait = 500;

var GlobalEmitter = Class.extend(ListenerMixin, EmitterMixin, {

	isTouching: false,
	mouseIgnoreDepth: 0,
	handleScrollProxy: null,


	bind: function() {
		var _this = this;

		this.listenTo($(document), {
			touchstart: this.handleTouchStart,
			touchcancel: this.handleTouchCancel,
			touchend: this.handleTouchEnd,
			mousedown: this.handleMouseDown,
			mousemove: this.handleMouseMove,
			mouseup: this.handleMouseUp,
			click: this.handleClick,
			selectstart: this.handleSelectStart,
			contextmenu: this.handleContextMenu
		});

		// because we need to call preventDefault
		// because https://www.chromestatus.com/features/5093566007214080
		// TODO: investigate performance because this is a global handler
		window.addEventListener(
			'touchmove',
			this.handleTouchMoveProxy = function(ev) {
				_this.handleTouchMove($.Event(ev));
			},
			{ passive: false } // allows preventDefault()
		);

		// attach a handler to get called when ANY scroll action happens on the page.
		// this was impossible to do with normal on/off because 'scroll' doesn't bubble.
		// http://stackoverflow.com/a/32954565/96342
		window.addEventListener(
			'scroll',
			this.handleScrollProxy = function(ev) {
				_this.handleScroll($.Event(ev));
			},
			true // useCapture
		);
	},

	unbind: function() {
		this.stopListeningTo($(document));

		window.removeEventListener(
			'touchmove',
			this.handleTouchMoveProxy
		);

		window.removeEventListener(
			'scroll',
			this.handleScrollProxy,
			true // useCapture
		);
	},


	// Touch Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleTouchStart: function(ev) {

		// if a previous touch interaction never ended with a touchend, then implicitly end it,
		// but since a new touch interaction is about to begin, don't start the mouse ignore period.
		this.stopTouch(ev, true); // skipMouseIgnore=true

		this.isTouching = true;
		this.trigger('touchstart', ev);
	},

	handleTouchMove: function(ev) {
		if (this.isTouching) {
			this.trigger('touchmove', ev);
		}
	},

	handleTouchCancel: function(ev) {
		if (this.isTouching) {
			this.trigger('touchcancel', ev);

			// Have touchcancel fire an artificial touchend. That way, handlers won't need to listen to both.
			// If touchend fires later, it won't have any effect b/c isTouching will be false.
			this.stopTouch(ev);
		}
	},

	handleTouchEnd: function(ev) {
		this.stopTouch(ev);
	},


	// Mouse Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleMouseDown: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mousedown', ev);
		}
	},

	handleMouseMove: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mousemove', ev);
		}
	},

	handleMouseUp: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('mouseup', ev);
		}
	},

	handleClick: function(ev) {
		if (!this.shouldIgnoreMouse()) {
			this.trigger('click', ev);
		}
	},


	// Misc Handlers
	// -----------------------------------------------------------------------------------------------------------------

	handleSelectStart: function(ev) {
		this.trigger('selectstart', ev);
	},

	handleContextMenu: function(ev) {
		this.trigger('contextmenu', ev);
	},

	handleScroll: function(ev) {
		this.trigger('scroll', ev);
	},


	// Utils
	// -----------------------------------------------------------------------------------------------------------------

	stopTouch: function(ev, skipMouseIgnore) {
		if (this.isTouching) {
			this.isTouching = false;
			this.trigger('touchend', ev);

			if (!skipMouseIgnore) {
				this.startTouchMouseIgnore();
			}
		}
	},

	startTouchMouseIgnore: function() {
		var _this = this;
		var wait = FC.touchMouseIgnoreWait;

		if (wait) {
			this.mouseIgnoreDepth++;
			setTimeout(function() {
				_this.mouseIgnoreDepth--;
			}, wait);
		}
	},

	shouldIgnoreMouse: function() {
		return this.isTouching || Boolean(this.mouseIgnoreDepth);
	}

});


// Singleton
// ---------------------------------------------------------------------------------------------------------------------

(function() {
	var globalEmitter = null;
	var neededCount = 0;


	// gets the singleton
	GlobalEmitter.get = function() {

		if (!globalEmitter) {
			globalEmitter = new GlobalEmitter();
			globalEmitter.bind();
		}

		return globalEmitter;
	};


	// called when an object knows it will need a GlobalEmitter in the near future.
	GlobalEmitter.needed = function() {
		GlobalEmitter.get(); // ensures globalEmitter
		neededCount++;
	};


	// called when the object that originally called needed() doesn't need a GlobalEmitter anymore.
	GlobalEmitter.unneeded = function() {
		neededCount--;

		if (!neededCount) { // nobody else needs it
			globalEmitter.unbind();
			globalEmitter = null;
		}
	};

})();

;;

/* Creates a clone of an element and lets it track the mouse as it moves
----------------------------------------------------------------------------------------------------------------------*/

var MouseFollower = Class.extend(ListenerMixin, {

	options: null,

	sourceEl: null, // the element that will be cloned and made to look like it is dragging
	el: null, // the clone of `sourceEl` that will track the mouse
	parentEl: null, // the element that `el` (the clone) will be attached to

	// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
	top0: null,
	left0: null,

	// the absolute coordinates of the initiating touch/mouse action
	y0: null,
	x0: null,

	// the number of pixels the mouse has moved from its initial position
	topDelta: null,
	leftDelta: null,

	isFollowing: false,
	isHidden: false,
	isAnimating: false, // doing the revert animation?

	constructor: function(sourceEl, options) {
		this.options = options = options || {};
		this.sourceEl = sourceEl;
		this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
	},


	// Causes the element to start following the mouse
	start: function(ev) {
		if (!this.isFollowing) {
			this.isFollowing = true;

			this.y0 = getEvY(ev);
			this.x0 = getEvX(ev);
			this.topDelta = 0;
			this.leftDelta = 0;

			if (!this.isHidden) {
				this.updatePosition();
			}

			if (getEvIsTouch(ev)) {
				this.listenTo($(document), 'touchmove', this.handleMove);
			}
			else {
				this.listenTo($(document), 'mousemove', this.handleMove);
			}
		}
	},


	// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
	// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
	stop: function(shouldRevert, callback) {
		var _this = this;
		var revertDuration = this.options.revertDuration;

		function complete() { // might be called by .animate(), which might change `this` context
			_this.isAnimating = false;
			_this.removeElement();

			_this.top0 = _this.left0 = null; // reset state for future updatePosition calls

			if (callback) {
				callback();
			}
		}

		if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
			this.isFollowing = false;

			this.stopListeningTo($(document));

			if (shouldRevert && revertDuration && !this.isHidden) { // do a revert animation?
				this.isAnimating = true;
				this.el.animate({
					top: this.top0,
					left: this.left0
				}, {
					duration: revertDuration,
					complete: complete
				});
			}
			else {
				complete();
			}
		}
	},


	// Gets the tracking element. Create it if necessary
	getEl: function() {
		var el = this.el;

		if (!el) {
			el = this.el = this.sourceEl.clone()
				.addClass(this.options.additionalClass || '')
				.css({
					position: 'absolute',
					visibility: '', // in case original element was hidden (commonly through hideEvents())
					display: this.isHidden ? 'none' : '', // for when initially hidden
					margin: 0,
					right: 'auto', // erase and set width instead
					bottom: 'auto', // erase and set height instead
					width: this.sourceEl.width(), // explicit height in case there was a 'right' value
					height: this.sourceEl.height(), // explicit width in case there was a 'bottom' value
					opacity: this.options.opacity || '',
					zIndex: this.options.zIndex
				});

			// we don't want long taps or any mouse interaction causing selection/menus.
			// would use preventSelection(), but that prevents selectstart, causing problems.
			el.addClass('fc-unselectable');

			el.appendTo(this.parentEl);
		}

		return el;
	},


	// Removes the tracking element if it has already been created
	removeElement: function() {
		if (this.el) {
			this.el.remove();
			this.el = null;
		}
	},


	// Update the CSS position of the tracking element
	updatePosition: function() {
		var sourceOffset;
		var origin;

		this.getEl(); // ensure this.el

		// make sure origin info was computed
		if (this.top0 === null) {
			sourceOffset = this.sourceEl.offset();
			origin = this.el.offsetParent().offset();
			this.top0 = sourceOffset.top - origin.top;
			this.left0 = sourceOffset.left - origin.left;
		}

		this.el.css({
			top: this.top0 + this.topDelta,
			left: this.left0 + this.leftDelta
		});
	},


	// Gets called when the user moves the mouse
	handleMove: function(ev) {
		this.topDelta = getEvY(ev) - this.y0;
		this.leftDelta = getEvX(ev) - this.x0;

		if (!this.isHidden) {
			this.updatePosition();
		}
	},


	// Temporarily makes the tracking element invisible. Can be called before following starts
	hide: function() {
		if (!this.isHidden) {
			this.isHidden = true;
			if (this.el) {
				this.el.hide();
			}
		}
	},


	// Show the tracking element after it has been temporarily hidden
	show: function() {
		if (this.isHidden) {
			this.isHidden = false;
			this.updatePosition();
			this.getEl().show();
		}
	}

});

;;

var ChronoComponent = Model.extend({

	children: null,

	el: null, // the view's containing element. set by Calendar(?)

	// frequently accessed options
	isRTL: false,
	nextDayThreshold: null,


	constructor: function() {
		Model.call(this);

		this.children = [];

		this.nextDayThreshold = moment.duration(this.opt('nextDayThreshold'));
		this.isRTL = this.opt('isRTL');
	},


	addChild: function(chronoComponent) {
		this.children.push(chronoComponent);
	},


	// Options
	// -----------------------------------------------------------------------------------------------------------------


	opt: function(name) {
		// subclasses must implement
	},


	publiclyTrigger: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.publiclyTrigger.apply(calendar, arguments);
	},


	hasPublicHandlers: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.hasPublicHandlers.apply(calendar, arguments);
	},


	// Element
	// -----------------------------------------------------------------------------------------------------------------


	// Sets the container element that the view should render inside of, does global DOM-related initializations,
	// and renders all the non-date-related content inside.
	setElement: function(el) {
		this.el = el;
		this.bindGlobalHandlers();
		this.renderSkeleton();
	},


	// Removes the view's container element from the DOM, clearing any content beforehand.
	// Undoes any other DOM-related attachments.
	removeElement: function() {
		this.unrenderSkeleton();
		this.unbindGlobalHandlers();

		this.el.remove();
		// NOTE: don't null-out this.el in case the View was destroyed within an API callback.
		// We don't null-out the View's other jQuery element references upon destroy,
		//  so we shouldn't kill this.el either.
	},


	bindGlobalHandlers: function() {
	},


	unbindGlobalHandlers: function() {
	},


	// Skeleton
	// -----------------------------------------------------------------------------------------------------------------


	// Renders the basic structure of the view before any content is rendered
	renderSkeleton: function() {
		// subclasses should implement
	},


	// Unrenders the basic structure of the view
	unrenderSkeleton: function() {
		// subclasses should implement
	},


	// Date Low-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	// date-cell content only
	renderDates: function() {
		// subclasses should implement
	},


	// date-cell content only
	unrenderDates: function() {
		// subclasses should override
	},


	// Now-Indicator
	// -----------------------------------------------------------------------------------------------------------------


	// Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
	// should be refreshed. If something falsy is returned, no time indicator is rendered at all.
	getNowIndicatorUnit: function() {
		// subclasses should implement
	},


	// Renders a current time indicator at the given datetime
	renderNowIndicator: function(date) {
		this.callChildren('renderNowIndicator', date);
	},


	// Undoes the rendering actions from renderNowIndicator
	unrenderNowIndicator: function() {
		this.callChildren('unrenderNowIndicator');
	},


	// Business Hours
	// ---------------------------------------------------------------------------------------------------------------


	// Renders business-hours onto the view. Assumes updateSize has already been called.
	renderBusinessHours: function() {
		this.callChildren('renderBusinessHours');
	},


	// Unrenders previously-rendered business-hours
	unrenderBusinessHours: function() {
		this.callChildren('unrenderBusinessHours');
	},


	// Event Low-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	// Renders the events onto the view.
	// TODO: eventually rename to `renderEvents` once legacy is gone.
	renderEventsPayload: function(eventsPayload) {
		this.callChildren('renderEventsPayload', eventsPayload);
	},


	// Removes event elements from the view.
	unrenderEvents: function() {
		this.callChildren('unrenderEvents');

		// we DON'T need to call updateHeight() because
		// a renderEventsPayload() call always happens after this, which will eventually call updateHeight()
	},


	// Retrieves all segment objects that are rendered in the view
	getEventSegs: function() {
		var children = this.children;
		var segs = [];
		var i;

		for (i = 0; i < children.length; i++) {
			segs.push.apply( // append
				segs,
				children[i].getEventSegs()
			);
		}

		return segs;
	},


	// Drag-n-Drop Rendering (for both events and external elements)
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of a event or external-element drag over the given drop zone.
	// If an external-element, seg will be `null`.
	// Must return elements used for any mock events.
	renderDrag: function(eventFootprints, seg) {
		var dragEls = null;
		var children = this.children;
		var i;
		var childDragEls;

		for (i = 0; i < children.length; i++) {
			childDragEls = children[i].renderDrag(eventFootprints, seg);

			if (childDragEls) {
				if (!dragEls) {
					dragEls = childDragEls;
				}
				else {
					dragEls = dragEls.add(childDragEls);
				}
			}
		}

		return dragEls;
	},


	// Unrenders a visual indication of an event or external-element being dragged.
	unrenderDrag: function() {
		this.callChildren('unrenderDrag');
	},


	// Selection
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of the selection
	// TODO: rename to `renderSelection` after legacy is gone
	renderSelectionFootprint: function(componentFootprint) {
		this.callChildren('renderSelectionFootprint', componentFootprint);
	},


	// Unrenders a visual indication of selection
	unrenderSelection: function() {
		this.callChildren('unrenderSelection');
	},


	// Hit Areas
	// ---------------------------------------------------------------------------------------------------------------


	hitsNeeded: function() {
		this.callChildren('hitsNeeded');
	},


	hitsNotNeeded: function() {
		this.callChildren('hitsNotNeeded');
	},


	// Called before one or more queryHit calls might happen. Should prepare any cached coordinates for queryHit
	prepareHits: function() {
		this.callChildren('prepareHits');
	},


	// Called when queryHit calls have subsided. Good place to clear any coordinate caches.
	releaseHits: function() {
		this.callChildren('releaseHits');
	},


	// Given coordinates from the topleft of the document, return data about the date-related area underneath.
	// Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
	// Must have a `grid` property, a reference to this current grid. TODO: avoid this
	// The returned object will be processed by getHitFootprint and getHitEl.
	queryHit: function(leftOffset, topOffset) {
		var children = this.children;
		var i;
		var hit;

		for (i = 0; i < children.length; i++) {
			hit = children[i].queryHit(leftOffset, topOffset);

			if (hit) {
				break;
			}
		}

		return hit;
	},



	// Event Drag-n-Drop
	// ---------------------------------------------------------------------------------------------------------------


	// Computes if the given event is allowed to be dragged by the user
	isEventDefDraggable: function(eventDef) {
		return this.isEventDefStartEditable(eventDef);
	},


	isEventDefStartEditable: function(eventDef) {
		var isEditable = eventDef.isStartExplicitlyEditable();

		if (isEditable == null) {
			isEditable = this.opt('eventStartEditable');

			if (isEditable == null) {
				isEditable = this.isEventDefGenerallyEditable(eventDef);
			}
		}

		return isEditable;
	},


	isEventDefGenerallyEditable: function(eventDef) {
		var isEditable = eventDef.isExplicitlyEditable();

		if (isEditable == null) {
			isEditable = this.opt('editable');
		}

		return isEditable;
	},


	// Event Resizing
	// ---------------------------------------------------------------------------------------------------------------


	// Computes if the given event is allowed to be resized from its starting edge
	isEventDefResizableFromStart: function(eventDef) {
		return this.opt('eventResizableFromStart') && this.isEventDefResizable(eventDef);
	},


	// Computes if the given event is allowed to be resized from its ending edge
	isEventDefResizableFromEnd: function(eventDef) {
		return this.isEventDefResizable(eventDef);
	},


	// Computes if the given event is allowed to be resized by the user at all
	isEventDefResizable: function(eventDef) {
		var isResizable = eventDef.isDurationExplicitlyEditable();

		if (isResizable == null) {
			isResizable = this.opt('eventDurationEditable');

			if (isResizable == null) {
				isResizable = this.isEventDefGenerallyEditable(eventDef);
			}
		}
		return isResizable;
	},


	// Foreground Segment Rendering
	// ---------------------------------------------------------------------------------------------------------------


	// Renders foreground event segments onto the grid. May return a subset of segs that were rendered.
	renderFgSegs: function(segs) {
		// subclasses must implement
	},


	// Unrenders all currently rendered foreground segments
	unrenderFgSegs: function() {
		// subclasses must implement
	},


	// Renders and assigns an `el` property for each foreground event segment.
	// Only returns segments that successfully rendered.
	// A utility that subclasses may use.
	renderFgSegEls: function(segs, disableResizing) {
		var _this = this;
		var hasEventRenderHandlers = this.hasPublicHandlers('eventRender');
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) { // don't build an empty html string

			// build a large concatenation of event segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fgSegHtml(segs[i], disableResizing);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				if (hasEventRenderHandlers) { // optimization
					el = _this.filterEventRenderEl(seg.footprint, el);
				}

				if (el) {
					el.data('fc-seg', seg); // used by handlers
					seg.el = el;
					renderedSegs.push(seg);
				}
			});
		}

		return renderedSegs;
	},


	// Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
	fgSegHtml: function(seg, disableResizing) {
		// subclasses should implement
	},


	// Given an event and the default element used for rendering, returns the element that should actually be used.
	// Basically runs events and elements through the eventRender hook.
	filterEventRenderEl: function(eventFootprint, el) {
		var legacy = eventFootprint.getEventLegacy();

		var custom = this.publiclyTrigger('eventRender', {
			context: legacy,
			args: [ legacy, el, this._getView() ]
		});

		if (custom === false) { // means don't render at all
			el = null;
		}
		else if (custom && custom !== true) {
			el = $(custom);
		}

		return el;
	},


	// Navigation
	// ----------------------------------------------------------------------------------------------------------------


	// Generates HTML for an anchor to another view into the calendar.
	// Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
	// `gotoOptions` can either be a moment input, or an object with the form:
	// { date, type, forceOff }
	// `type` is a view-type like "day" or "week". default value is "day".
	// `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
	buildGotoAnchorHtml: function(gotoOptions, attrs, innerHtml) {
		var date, type, forceOff;
		var finalOptions;

		if ($.isPlainObject(gotoOptions)) {
			date = gotoOptions.date;
			type = gotoOptions.type;
			forceOff = gotoOptions.forceOff;
		}
		else {
			date = gotoOptions; // a single moment input
		}
		date = FC.moment(date); // if a string, parse it

		finalOptions = { // for serialization into the link
			date: date.format('YYYY-MM-DD'),
			type: type || 'day'
		};

		if (typeof attrs === 'string') {
			innerHtml = attrs;
			attrs = null;
		}

		attrs = attrs ? ' ' + attrsToStr(attrs) : ''; // will have a leading space
		innerHtml = innerHtml || '';

		if (!forceOff && this.opt('navLinks')) {
			return '<a' + attrs +
				' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
				innerHtml +
				'</a>';
		}
		else {
			return '<span' + attrs + '>' +
				innerHtml +
				'</span>';
		}
	},


	// Date Formatting Utils
	// ---------------------------------------------------------------------------------------------------------------


	// Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
	// Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
	// The timezones of the dates within `range` will be respected.
	formatRange: function(range, isAllDay, formatStr, separator) {
		var end = range.end;

		if (isAllDay) {
			end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
		}

		return formatRange(range.start, end, formatStr, separator, this.isRTL);
	},


	getAllDayHtml: function() {
		return this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'));
	},


	// Computes HTML classNames for a single-day element
	getDayClasses: function(date, noThemeHighlight) {
		var view = this._getView();
		var classes = [];
		var today;

		if (!view.activeUnzonedRange.containsDate(date)) {
			classes.push('fc-disabled-day'); // TODO: jQuery UI theme?
		}
		else {
			classes.push('fc-' + dayIDs[date.day()]);

			if (view.isDateInOtherMonth(date)) { // TODO: use ChronoComponent subclass somehow
				classes.push('fc-other-month');
			}

			today = view.calendar.getNow();

			if (date.isSame(today, 'day')) {
				classes.push('fc-today');

				if (noThemeHighlight !== true) {
					classes.push(view.calendar.theme.getClass('today'));
				}
			}
			else if (date < today) {
				classes.push('fc-past');
			}
			else {
				classes.push('fc-future');
			}
		}

		return classes;
	},


	// Date Utils
	// ---------------------------------------------------------------------------------------------------------------


	// Returns the date range of the full days the given range visually appears to occupy.
	// Returns a plain object with start/end, NOT an UnzonedRange!
	computeDayRange: function(unzonedRange) {
		var calendar = this._getCalendar();
		var startDay = calendar.msToUtcMoment(unzonedRange.startMs, true); // the beginning of the day the range starts
		var end = calendar.msToUtcMoment(unzonedRange.endMs);
		var endTimeMS = +end.time(); // # of milliseconds into `endDay`
		var endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends

		// If the end time is actually inclusively part of the next day and is equal to or
		// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
		// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
		if (endTimeMS && endTimeMS >= this.nextDayThreshold) {
			endDay.add(1, 'days');
		}

		// If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
		if (endDay <= startDay) {
			endDay = startDay.clone().add(1, 'days');
		}

		return { start: startDay, end: endDay };
	},


	// Does the given range visually appear to occupy more than one day?
	isMultiDayRange: function(unzonedRange) {
		var dayRange = this.computeDayRange(unzonedRange);

		return dayRange.end.diff(dayRange.start, 'days') > 1;
	},


	// Utils
	// ---------------------------------------------------------------------------------------------------------------


	callChildren: function(methodName) {
		var args = Array.prototype.slice.call(arguments, 1);
		var children = this.children;
		var i, child;

		for (i = 0; i < children.length; i++) {
			child = children[i];
			child[methodName].apply(child, args);
		}
	},


	_getCalendar: function() { // TODO: strip out. move to generic parent.
		return this.calendar || this.view.calendar;
	},


	_getView: function() { // TODO: strip out. move to generic parent.
		return this.view;
	}

});

;;

/* An abstract class comprised of a "grid" of areas that each represent a specific datetime
----------------------------------------------------------------------------------------------------------------------
Contains:
- hit system
- range->footprint->seg pipeline
- initializing day click
- initializing selection system
- initializing mouse/touch handlers for everything
- initializing event rendering-related options
*/

var Grid = FC.Grid = ChronoComponent.extend({

	// self-config, overridable by subclasses
	hasDayInteractions: true, // can user click/select ranges of time?

	view: null, // a View object
	isRTL: null, // shortcut to the view's isRTL option

	unzonedRange: null,

	hitsNeededDepth: 0, // necessary because multiple callers might need the same hits

	dayClickListener: null,
	daySelectListener: null,
	segDragListener: null,
	segResizeListener: null,
	externalDragListener: null,


	constructor: function(view) {
		this.view = view;

		ChronoComponent.call(this);

		this.initFillInternals();

		this.dayClickListener = this.buildDayClickListener();
		this.daySelectListener = this.buildDaySelectListener();
	},


	opt: function(name) {
		return this.view.opt(name);
	},


	/* Dates
	------------------------------------------------------------------------------------------------------------------*/


	// Tells the grid about what period of time to display.
	// Any date-related internal data should be generated.
	setRange: function(unzonedRange) {
		this.unzonedRange = unzonedRange;

		this.rangeUpdated();
		this.processRangeOptions();
	},


	// Called when internal variables that rely on the range should be updated
	rangeUpdated: function() {
	},


	// Updates values that rely on options and also relate to range
	processRangeOptions: function() {
		var displayEventTime;
		var displayEventEnd;

		this.eventTimeFormat = // for Grid.event-rendering.js
			this.opt('eventTimeFormat') ||
			this.opt('timeFormat') || // deprecated
			this.computeEventTimeFormat();

		displayEventTime = this.opt('displayEventTime');
		if (displayEventTime == null) {
			displayEventTime = this.computeDisplayEventTime(); // might be based off of range
		}

		displayEventEnd = this.opt('displayEventEnd');
		if (displayEventEnd == null) {
			displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
		}

		this.displayEventTime = displayEventTime;
		this.displayEventEnd = displayEventEnd;
	},



	/* Hit Area
	------------------------------------------------------------------------------------------------------------------*/


	hitsNeeded: function() {
		if (!(this.hitsNeededDepth++)) {
			this.prepareHits();
		}
	},


	hitsNotNeeded: function() {
		if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
			this.releaseHits();
		}
	},


	getSafeHitFootprint: function(hit) {
		var footprint = this.getHitFootprint(hit);

		if (!this.view.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
			return null;
		}

		return footprint;
	},


	getHitFootprint: function(hit) {
	},


	// Given position-level information about a date-related area within the grid,
	// should return a jQuery element that best represents it. passed to dayClick callback.
	getHitEl: function(hit) {
	},


	/* Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Sets the container element that the grid should render inside of.
	// Does other DOM-related initializations.
	setElement: function(el) {
		ChronoComponent.prototype.setElement.apply(this, arguments);

		if (this.hasDayInteractions) {
			preventSelection(el);

			this.bindDayHandler('touchstart', this.dayTouchStart);
			this.bindDayHandler('mousedown', this.dayMousedown);
		}

		// attach event-element-related handlers. in Grid.events
		// same garbage collection note as above.
		this.bindSegHandlers();
	},


	bindDayHandler: function(name, handler) {
		var _this = this;

		// attach a handler to the grid's root element.
		// jQuery will take care of unregistering them when removeElement gets called.
		this.el.on(name, function(ev) {
			if (
				!$(ev.target).is(
					_this.segSelector + ',' + // directly on an event element
					_this.segSelector + ' *,' + // within an event element
					'.fc-more,' + // a "more.." link
					'a[data-goto]' // a clickable nav link
				)
			) {
				return handler.call(_this, ev);
			}
		});
	},


	// Removes the grid's container element from the DOM. Undoes any other DOM-related attachments.
	// DOES NOT remove any content beforehand (doesn't clear events or call unrenderDates), unlike View
	removeElement: function() {
		ChronoComponent.prototype.removeElement.apply(this, arguments);

		this.clearDragListeners();
	},


	/* Handlers
	------------------------------------------------------------------------------------------------------------------*/


	// Binds DOM handlers to elements that reside outside the grid, such as the document
	bindGlobalHandlers: function() {
		ChronoComponent.prototype.bindGlobalHandlers.apply(this, arguments);

		this.listenTo($(document), {
			dragstart: this.externalDragStart, // jqui
			sortstart: this.externalDragStart // jqui
		});
	},


	// Unbinds DOM handlers from elements that reside outside the grid
	unbindGlobalHandlers: function() {
		ChronoComponent.prototype.unbindGlobalHandlers.apply(this, arguments);

		this.stopListeningTo($(document));
	},


	// Process a mousedown on an element that represents a day. For day clicking and selecting.
	dayMousedown: function(ev) {

		// HACK
		// This will still work even though bindDayHandler doesn't use GlobalEmitter.
		if (GlobalEmitter.get().shouldIgnoreMouse()) {
			return;
		}

		this.dayClickListener.startInteraction(ev);

		if (this.opt('selectable')) {
			this.daySelectListener.startInteraction(ev, {
				distance: this.opt('selectMinDistance')
			});
		}
	},


	dayTouchStart: function(ev) {
		var view = this.view;
		var selectLongPressDelay;

		// On iOS (and Android?) when a new selection is initiated overtop another selection,
		// the touchend never fires because the elements gets removed mid-touch-interaction (my theory).
		// HACK: simply don't allow this to happen.
		// ALSO: prevent selection when an *event* is already raised.
		if (view.isSelected || view.selectedEvent) {
			return;
		}

		selectLongPressDelay = this.opt('selectLongPressDelay');
		if (selectLongPressDelay == null) {
			selectLongPressDelay = this.opt('longPressDelay'); // fallback
		}

		this.dayClickListener.startInteraction(ev);

		if (this.opt('selectable')) {
			this.daySelectListener.startInteraction(ev, {
				delay: selectLongPressDelay
			});
		}
	},


	// Kills all in-progress dragging.
	// Useful for when public API methods that result in re-rendering are invoked during a drag.
	// Also useful for when touch devices misbehave and don't fire their touchend.
	clearDragListeners: function() {
		this.dayClickListener.endInteraction();
		this.daySelectListener.endInteraction();

		if (this.segDragListener) {
			this.segDragListener.endInteraction(); // will clear this.segDragListener
		}
		if (this.segResizeListener) {
			this.segResizeListener.endInteraction(); // will clear this.segResizeListener
		}
		if (this.externalDragListener) {
			this.externalDragListener.endInteraction(); // will clear this.externalDragListener
		}
	},


	/* Highlight
	------------------------------------------------------------------------------------------------------------------*/


	// Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
	renderHighlight: function(componentFootprint) {
		this.renderFill('highlight', this.componentFootprintToSegs(componentFootprint));
	},


	// Unrenders the emphasis on a date range
	unrenderHighlight: function() {
		this.unrenderFill('highlight');
	},


	/* Converting eventRange -> eventFootprint
	------------------------------------------------------------------------------------------------------------------*/


	eventRangesToEventFootprints: function(eventRanges) {
		var eventFootprints = [];
		var i;

		for (i = 0; i < eventRanges.length; i++) {
			eventFootprints.push.apply(eventFootprints,
				this.eventRangeToEventFootprints(eventRanges[i])
			);
		}

		return eventFootprints;
	},


	// Given an event's unzoned date range, return an array of eventSpan objects.
	// eventSpan - { start, end, isStart, isEnd, otherthings... }
	// Subclasses can override.
	// Subclasses are obligated to forward eventRange.isStart/isEnd to the resulting spans.
	// TODO: somehow more DRY with Calendar::eventRangeToEventFootprints
	eventRangeToEventFootprints: function(eventRange) {
		return [
			new EventFootprint(
				new ComponentFootprint(
					eventRange.unzonedRange,
					eventRange.eventDef.isAllDay()
				),
				eventRange.eventDef,
				eventRange.eventInstance // might not exist
			)
		];
	},


	/* Converting componentFootprint/eventFootprint -> segs
	------------------------------------------------------------------------------------------------------------------*/


	eventFootprintsToSegs: function(eventFootprints) {
		var segs = [];
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			segs.push.apply(segs,
				this.eventFootprintToSegs(eventFootprints[i])
			);
		}

		return segs;
	},


	// Given an event's span (unzoned start/end and other misc data), and the event itself,
	// slices into segments and attaches event-derived properties to them.
	// eventSpan - { start, end, isStart, isEnd, otherthings... }
	// constraintRange allow additional clipping. optional. eventually remove this.
	eventFootprintToSegs: function(eventFootprint, constraintRange) {
		var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
		var segs;
		var i, seg;

		if (constraintRange) {
			unzonedRange = unzonedRange.intersect(constraintRange);
		}

		segs = this.componentFootprintToSegs(eventFootprint.componentFootprint);

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (!unzonedRange.isStart) {
				seg.isStart = false;
			}
			if (!unzonedRange.isEnd) {
				seg.isEnd = false;
			}

			seg.footprint = eventFootprint;
			// TODO: rename to seg.eventFootprint
		}

		return segs;
	},


	componentFootprintToSegs: function(componentFootprint) {
		// subclasses must implement
	}

});

;;

Grid.mixin({

	// Creates a listener that tracks the user's drag across day elements, for day clicking.
	buildDayClickListener: function() {
		var _this = this;
		var dayClickHit; // null if invalid dayClick

		var dragListener = new HitDragListener(this, {
			scroll: this.opt('dragScroll'),
			interactionStart: function() {
				dayClickHit = dragListener.origHit;
			},
			hitOver: function(hit, isOrig, origHit) {
				// if user dragged to another cell at any point, it can no longer be a dayClick
				if (!isOrig) {
					dayClickHit = null;
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				dayClickHit = null;
			},
			interactionEnd: function(ev, isCancelled) {
				var componentFootprint;

				if (!isCancelled && dayClickHit) {
					componentFootprint = _this.getSafeHitFootprint(dayClickHit);

					if (componentFootprint) {
						_this.view.triggerDayClick(componentFootprint, _this.getHitEl(dayClickHit), ev);
					}
				}
			}
		});

		// because dayClickListener won't be called with any time delay, "dragging" will begin immediately,
		// which will kill any touchmoving/scrolling. Prevent this.
		dragListener.shouldCancelTouchScroll = false;

		dragListener.scrollAlwaysKills = true;

		return dragListener;
	}

});

;;

Grid.mixin({

	// Creates a listener that tracks the user's drag across day elements, for day selecting.
	buildDaySelectListener: function() {
		var _this = this;
		var selectionFootprint; // null if invalid selection

		var dragListener = new HitDragListener(this, {
			scroll: this.opt('dragScroll'),
			interactionStart: function() {
				selectionFootprint = null;
			},
			dragStart: function() {
				_this.view.unselect(); // since we could be rendering a new selection, we want to clear any old one
			},
			hitOver: function(hit, isOrig, origHit) {
				var origHitFootprint;
				var hitFootprint;

				if (origHit) { // click needs to have started on a hit

					origHitFootprint = _this.getSafeHitFootprint(origHit);
					hitFootprint = _this.getSafeHitFootprint(hit);

					if (origHitFootprint && hitFootprint) {
						selectionFootprint = _this.computeSelection(origHitFootprint, hitFootprint);
					}
					else {
						selectionFootprint = null;
					}

					if (selectionFootprint) {
						_this.renderSelectionFootprint(selectionFootprint);
					}
					else if (selectionFootprint === false) {
						disableCursor();
					}
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				selectionFootprint = null;
				_this.unrenderSelection();
			},
			hitDone: function() { // called after a hitOut OR before a dragEnd
				enableCursor();
			},
			interactionEnd: function(ev, isCancelled) {
				if (!isCancelled && selectionFootprint) {
					// the selection will already have been rendered. just report it
					_this.view.reportSelection(selectionFootprint, ev);
				}
			}
		});

		return dragListener;
	},


	// Renders a visual indication of a selection. Will highlight by default but can be overridden by subclasses.
	// Given a span (unzoned start/end and other misc data)
	renderSelectionFootprint: function(componentFootprint) {
		this.renderHighlight(componentFootprint);
	},


	// Unrenders any visual indications of a selection. Will unrender a highlight by default.
	unrenderSelection: function() {
		this.unrenderHighlight();
	},


	// Given the first and last date-spans of a selection, returns another date-span object.
	// Subclasses can override and provide additional data in the span object. Will be passed to renderSelectionFootprint().
	// Will return false if the selection is invalid and this should be indicated to the user.
	// Will return null/undefined if a selection invalid but no error should be reported.
	computeSelection: function(footprint0, footprint1) {
		var wholeFootprint = this.computeSelectionFootprint(footprint0, footprint1);

		if (wholeFootprint && !this.isSelectionFootprintAllowed(wholeFootprint)) {
			return false;
		}

		return wholeFootprint;
	},


	// Given two spans, must return the combination of the two.
	// TODO: do this separation of concerns (combining VS validation) for event dnd/resize too.
	// Assumes both footprints are non-open-ended.
	computeSelectionFootprint: function(footprint0, footprint1) {
		var ms = [
			footprint0.unzonedRange.startMs,
			footprint0.unzonedRange.endMs,
			footprint1.unzonedRange.startMs,
			footprint1.unzonedRange.endMs
		];

		ms.sort(compareNumbers);

		return new ComponentFootprint(
			new UnzonedRange(ms[0], ms[3]),
			footprint0.isAllDay
		);
	},


	isSelectionFootprintAllowed: function(componentFootprint) {
		return this.view.validUnzonedRange.containsRange(componentFootprint.unzonedRange) &&
			this.view.calendar.isSelectionFootprintAllowed(componentFootprint);
	}

});

;;

Grid.mixin({

	// Generates an array of classNames to be used for the rendering business hours overlay. Called by the fill system.
	// Called by fillSegHtml.
	businessHoursSegClasses: function(seg) {
		return [ 'fc-nonbusiness', 'fc-bgevent' ];
	},


	// Compute business hour segs for the grid's current date range.
	// Caller must ask if whole-day business hours are needed.
	buildBusinessHourSegs: function(wholeDay) {
		return this.eventFootprintsToSegs(
			this.buildBusinessHourEventFootprints(wholeDay)
		);
	},


	// Compute business hour *events* for the grid's current date range.
	// Caller must ask if whole-day business hours are needed.
	// FOR RENDERING
	buildBusinessHourEventFootprints: function(wholeDay) {
		var calendar = this.view.calendar;

		return this._buildBusinessHourEventFootprints(wholeDay, calendar.opt('businessHours'));
	},


	_buildBusinessHourEventFootprints: function(wholeDay, businessHourDef) {
		var calendar = this.view.calendar;
		var eventInstanceGroup;
		var eventRanges;

		eventInstanceGroup = calendar.buildBusinessInstanceGroup(
			wholeDay,
			businessHourDef,
			this.unzonedRange
		);

		if (eventInstanceGroup) {
			eventRanges = eventInstanceGroup.sliceRenderRanges(
				this.unzonedRange,
				calendar
			);
		}
		else {
			eventRanges = [];
		}

		return this.eventRangesToEventFootprints(eventRanges);
	}

});

;;

Grid.mixin({

	segs: null, // the *event* segments currently rendered in the grid. TODO: rename to `eventSegs`

	// derived from options
	// TODO: move initialization from Grid.js
	eventTimeFormat: null,
	displayEventTime: null,
	displayEventEnd: null,


	// Generates the format string used for event time text, if not explicitly defined by 'timeFormat'
	computeEventTimeFormat: function() {
		return this.opt('smallTimeFormat');
	},


	// Determines whether events should have their end times displayed, if not explicitly defined by 'displayEventTime'.
	// Only applies to non-all-day events.
	computeDisplayEventTime: function() {
		return true;
	},


	// Determines whether events should have their end times displayed, if not explicitly defined by 'displayEventEnd'
	computeDisplayEventEnd: function() {
		return true;
	},


	renderEventsPayload: function(eventsPayload) {
		var id, eventInstanceGroup;
		var eventRenderRanges;
		var eventFootprints;
		var eventSegs;
		var bgSegs = [];
		var fgSegs = [];

		for (id in eventsPayload) {
			eventInstanceGroup = eventsPayload[id];

			eventRenderRanges = eventInstanceGroup.sliceRenderRanges(this.view.activeUnzonedRange);
			eventFootprints = this.eventRangesToEventFootprints(eventRenderRanges);
			eventSegs = this.eventFootprintsToSegs(eventFootprints);

			if (eventInstanceGroup.getEventDef().hasBgRendering()) {
				bgSegs.push.apply(bgSegs, // append
					eventSegs
				);
			}
			else {
				fgSegs.push.apply(fgSegs, // append
					eventSegs
				);
			}
		}

		this.segs = [].concat( // record all segs
			this.renderBgSegs(bgSegs) || bgSegs,
			this.renderFgSegs(fgSegs) || fgSegs
		);
	},


	// Unrenders all events currently rendered on the grid
	unrenderEvents: function() {
		this.handleSegMouseout(); // trigger an eventMouseout if user's mouse is over an event
		this.clearDragListeners();

		this.unrenderFgSegs();
		this.unrenderBgSegs();

		this.segs = null;
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getEventSegs: function() {
		return this.segs || [];
	},


	// Background Segment Rendering
	// ---------------------------------------------------------------------------------------------------------------
	// TODO: move this to ChronoComponent, but without fill


	// Renders the given background event segments onto the grid.
	// Returns a subset of the segs that were actually rendered.
	renderBgSegs: function(segs) {
		return this.renderFill('bgEvent', segs);
	},


	// Unrenders all the currently rendered background event segments
	unrenderBgSegs: function() {
		this.unrenderFill('bgEvent');
	},


	// Renders a background event element, given the default rendering. Called by the fill system.
	bgEventSegEl: function(seg, el) {
		return this.filterEventRenderEl(seg.footprint, el);
	},


	// Generates an array of classNames to be used for the default rendering of a background event.
	// Called by fillSegHtml.
	bgEventSegClasses: function(seg) {
		var eventDef = seg.footprint.eventDef;

		return [ 'fc-bgevent' ].concat(
			eventDef.className,
			eventDef.source.className
		);
	},


	// Generates a semicolon-separated CSS string to be used for the default rendering of a background event.
	// Called by fillSegHtml.
	bgEventSegCss: function(seg) {
		return {
			'background-color': this.getSegSkinCss(seg)['background-color']
		};
	},


	/* Rendering Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Compute the text that should be displayed on an event's element.
	// `range` can be the Event object itself, or something range-like, with at least a `start`.
	// If event times are disabled, or the event has no time, will return a blank string.
	// If not specified, formatStr will default to the eventTimeFormat setting,
	// and displayEnd will default to the displayEventEnd setting.
	getEventTimeText: function(eventFootprint, formatStr, displayEnd) {
		return this._getEventTimeText(
			eventFootprint.eventInstance.dateProfile.start,
			eventFootprint.eventInstance.dateProfile.end,
			eventFootprint.componentFootprint.isAllDay,
			formatStr,
			displayEnd
		);
	},


	_getEventTimeText: function(start, end, isAllDay, formatStr, displayEnd) {

		if (formatStr == null) {
			formatStr = this.eventTimeFormat;
		}

		if (displayEnd == null) {
			displayEnd = this.displayEventEnd;
		}

		if (this.displayEventTime && !isAllDay) {
			if (displayEnd && end) {
				return this.view.formatRange(
					{ start: start, end: end },
					false, // allDay
					formatStr
				);
			}
			else {
				return start.format(formatStr);
			}
		}

		return '';
	},


	// Generic utility for generating the HTML classNames for an event segment's element
	getSegClasses: function(seg, isDraggable, isResizable) {
		var view = this.view;
		var classes = [
			'fc-event',
			seg.isStart ? 'fc-start' : 'fc-not-start',
			seg.isEnd ? 'fc-end' : 'fc-not-end'
		].concat(this.getSegCustomClasses(seg));

		if (isDraggable) {
			classes.push('fc-draggable');
		}
		if (isResizable) {
			classes.push('fc-resizable');
		}

		// event is currently selected? attach a className.
		if (view.isEventDefSelected(seg.footprint.eventDef)) {
			classes.push('fc-selected');
		}

		return classes;
	},


	// List of classes that were defined by the caller of the API in some way
	getSegCustomClasses: function(seg) {
		var eventDef = seg.footprint.eventDef;

		return [].concat(
			eventDef.className, // guaranteed to be an array
			eventDef.source.className
		);
	},


	// Utility for generating event skin-related CSS properties
	getSegSkinCss: function(seg) {
		return {
			'background-color': this.getSegBackgroundColor(seg),
			'border-color': this.getSegBorderColor(seg),
			color: this.getSegTextColor(seg)
		};
	},


	// Queries for caller-specified color, then falls back to default
	getSegBackgroundColor: function(seg) {
		var eventDef = seg.footprint.eventDef;

		return eventDef.backgroundColor ||
			eventDef.color ||
			this.getSegDefaultBackgroundColor(seg);
	},


	getSegDefaultBackgroundColor: function(seg) {
		var source = seg.footprint.eventDef.source;

		return source.backgroundColor ||
			source.color ||
			this.opt('eventBackgroundColor') ||
			this.opt('eventColor');
	},


	// Queries for caller-specified color, then falls back to default
	getSegBorderColor: function(seg) {
		var eventDef = seg.footprint.eventDef;

		return eventDef.borderColor ||
			eventDef.color ||
			this.getSegDefaultBorderColor(seg);
	},


	getSegDefaultBorderColor: function(seg) {
		var source = seg.footprint.eventDef.source;

		return source.borderColor ||
			source.color ||
			this.opt('eventBorderColor') ||
			this.opt('eventColor');
	},


	// Queries for caller-specified color, then falls back to default
	getSegTextColor: function(seg) {
		var eventDef = seg.footprint.eventDef;

		return eventDef.textColor ||
			this.getSegDefaultTextColor(seg);
	},


	getSegDefaultTextColor: function(seg) {
		var source = seg.footprint.eventDef.source;

		return source.textColor ||
			this.opt('eventTextColor');
	},


	sortEventSegs: function(segs) {
		segs.sort(proxy(this, 'compareEventSegs'));
	},


	// A cmp function for determining which segments should take visual priority
	compareEventSegs: function(seg1, seg2) {
		var f1 = seg1.footprint.componentFootprint;
		var r1 = f1.unzonedRange;
		var f2 = seg2.footprint.componentFootprint;
		var r2 = f2.unzonedRange;

		return r1.startMs - r2.startMs || // earlier events go first
			(r2.endMs - r2.startMs) - (r1.endMs - r1.startMs) || // tie? longer events go first
			f2.isAllDay - f1.isAllDay || // tie? put all-day events first (booleans cast to 0/1)
			compareByFieldSpecs(
				seg1.footprint.eventDef,
				seg2.footprint.eventDef,
				this.view.eventOrderSpecs
			);
	}

});

;;

/*
Contains:
- event clicking/mouseover/mouseout
- things that are common to event dragging AND resizing
- event helper rendering
*/
Grid.mixin({

	// self-config, overridable by subclasses
	segSelector: '.fc-event-container > *', // what constitutes an event element?

	mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing

	// if defined, holds the unit identified (ex: "year" or "month") that determines the level of granularity
	// of the date areas. if not defined, assumes to be day and time granularity.
	// TODO: port isTimeScale into same system?
	largeUnit: null,


	// Diffs the two dates, returning a duration, based on granularity of the grid
	// TODO: port isTimeScale into this system?
	diffDates: function(a, b) {
		if (this.largeUnit) {
			return diffByUnit(a, b, this.largeUnit);
		}
		else {
			return diffDayTime(a, b);
		}
	},


	// Attaches event-element-related handlers for *all* rendered event segments of the view.
	bindSegHandlers: function() {
		this.bindSegHandlersToEl(this.el);
	},


	// Attaches event-element-related handlers to an arbitrary container element. leverages bubbling.
	bindSegHandlersToEl: function(el) {
		this.bindSegHandlerToEl(el, 'touchstart', this.handleSegTouchStart);
		this.bindSegHandlerToEl(el, 'mouseenter', this.handleSegMouseover);
		this.bindSegHandlerToEl(el, 'mouseleave', this.handleSegMouseout);
		this.bindSegHandlerToEl(el, 'mousedown', this.handleSegMousedown);
		this.bindSegHandlerToEl(el, 'click', this.handleSegClick);
	},


	// Executes a handler for any a user-interaction on a segment.
	// Handler gets called with (seg, ev), and with the `this` context of the Grid
	bindSegHandlerToEl: function(el, name, handler) {
		var _this = this;

		el.on(name, this.segSelector, function(ev) {
			var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEventsPayload

			// only call the handlers if there is not a drag/resize in progress
			if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
				return handler.call(_this, seg, ev); // context will be the Grid
			}
		});
	},


	handleSegClick: function(seg, ev) {
		var res = this.publiclyTrigger('eventClick', { // can return `false` to cancel
			context: seg.el[0],
			args: [ seg.footprint.getEventLegacy(), ev, this.view ]
		});

		if (res === false) {
			ev.preventDefault();
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused over
	handleSegMouseover: function(seg, ev) {
		if (
			!GlobalEmitter.get().shouldIgnoreMouse() &&
			!this.mousedOverSeg
		) {
			this.mousedOverSeg = seg;

			if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
				seg.el.addClass('fc-allow-mouse-resize');
			}

			this.publiclyTrigger('eventMouseover', {
				context: seg.el[0],
				args: [ seg.footprint.getEventLegacy(), ev, this.view ]
			});
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused out.
	// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
	handleSegMouseout: function(seg, ev) {
		ev = ev || {}; // if given no args, make a mock mouse event

		if (this.mousedOverSeg) {
			seg = seg || this.mousedOverSeg; // if given no args, use the currently moused-over segment
			this.mousedOverSeg = null;

			if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
				seg.el.removeClass('fc-allow-mouse-resize');
			}

			this.publiclyTrigger('eventMouseout', {
				context: seg.el[0],
				args: [ seg.footprint.getEventLegacy(), ev, this.view ]
			});
		}
	},


	handleSegMousedown: function(seg, ev) {
		var isResizing = this.startSegResize(seg, ev, { distance: 5 });

		if (!isResizing && this.view.isEventDefDraggable(seg.footprint.eventDef)) {
			this.buildSegDragListener(seg)
				.startInteraction(ev, {
					distance: 5
				});
		}
	},


	handleSegTouchStart: function(seg, ev) {
		var view = this.view;
		var eventDef = seg.footprint.eventDef;
		var isSelected = view.isEventDefSelected(eventDef);
		var isDraggable = view.isEventDefDraggable(eventDef);
		var isResizable = view.isEventDefResizable(eventDef);
		var isResizing = false;
		var dragListener;
		var eventLongPressDelay;

		if (isSelected && isResizable) {
			// only allow resizing of the event is selected
			isResizing = this.startSegResize(seg, ev);
		}

		if (!isResizing && (isDraggable || isResizable)) { // allowed to be selected?

			eventLongPressDelay = this.opt('eventLongPressDelay');
			if (eventLongPressDelay == null) {
				eventLongPressDelay = this.opt('longPressDelay'); // fallback
			}

			dragListener = isDraggable ?
				this.buildSegDragListener(seg) :
				this.buildSegSelectListener(seg); // seg isn't draggable, but still needs to be selected

			dragListener.startInteraction(ev, { // won't start if already started
				delay: isSelected ? 0 : eventLongPressDelay // do delay if not already selected
			});
		}
	},


	// seg isn't draggable, but let's use a generic DragListener
	// simply for the delay, so it can be selected.
	// Has side effect of setting/unsetting `segDragListener`
	buildSegSelectListener: function(seg) {
		var _this = this;
		var view = this.view;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance; // null for inverse-background events

		if (this.segDragListener) {
			return this.segDragListener;
		}

		var dragListener = this.segDragListener = new DragListener({
			dragStart: function(ev) {
				if (
					dragListener.isTouch &&
					!view.isEventDefSelected(eventDef) &&
					eventInstance
				) {
					// if not previously selected, will fire after a delay. then, select the event
					view.selectEventInstance(eventInstance);
				}
			},
			interactionEnd: function(ev) {
				_this.segDragListener = null;
			}
		});

		return dragListener;
	},


	// is it allowed, in relation to the view's validRange?
	// NOTE: very similar to isExternalInstanceGroupAllowed
	isEventInstanceGroupAllowed: function(eventInstanceGroup) {
		var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			// TODO: just use getAllEventRanges directly
			if (!this.view.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
				return false;
			}
		}

		return this.view.calendar.isEventInstanceGroupAllowed(eventInstanceGroup);
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/
	// TODO: should probably move this to Grid.events, like we did event dragging / resizing


	renderHelperEventFootprints: function(eventFootprints, sourceSeg) {
		return this.renderHelperEventFootprintEls(eventFootprints, sourceSeg)
			.addClass('fc-helper');
	},


	renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
		// Subclasses must implement.
		// Must return all mock event elements.
	},


	// Unrenders a mock event
	// TODO: have this in ChronoComponent
	unrenderHelper: function() {
		// subclasses must implement
	},


	fabricateEventFootprint: function(componentFootprint) {
		var calendar = this.view.calendar;
		var eventDateProfile = calendar.footprintToDateProfile(componentFootprint);
		var dummyEvent = new SingleEventDef(new EventSource(calendar));
		var dummyInstance;

		dummyEvent.dateProfile = eventDateProfile;
		dummyInstance = dummyEvent.buildInstance();

		return new EventFootprint(componentFootprint, dummyEvent, dummyInstance);
	}

});

;;

/*
Wired up via Grid.event-interation.js by calling
buildSegDragListener
*/
Grid.mixin({

	isDraggingSeg: false, // is a segment being dragged? boolean


	// Builds a listener that will track user-dragging on an event segment.
	// Generic enough to work with any type of Grid.
	// Has side effect of setting/unsetting `segDragListener`
	buildSegDragListener: function(seg) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var eventManager = calendar.eventManager;
		var el = seg.el;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
		var isDragging;
		var mouseFollower; // A clone of the original element that will move with the mouse
		var eventDefMutation;

		if (this.segDragListener) {
			return this.segDragListener;
		}

		// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
		// of the view.
		var dragListener = this.segDragListener = new HitDragListener(view, {
			scroll: this.opt('dragScroll'),
			subjectEl: el,
			subjectCenter: true,
			interactionStart: function(ev) {
				seg.component = _this; // for renderDrag
				isDragging = false;
				mouseFollower = new MouseFollower(seg.el, {
					additionalClass: 'fc-dragging',
					parentEl: view.el,
					opacity: dragListener.isTouch ? null : _this.opt('dragOpacity'),
					revertDuration: _this.opt('dragRevertDuration'),
					zIndex: 2 // one above the .fc-view
				});
				mouseFollower.hide(); // don't show until we know this is a real drag
				mouseFollower.start(ev);
			},
			dragStart: function(ev) {
				if (
					dragListener.isTouch &&
					!view.isEventDefSelected(eventDef) &&
					eventInstance
				) {
					// if not previously selected, will fire after a delay. then, select the event
					view.selectEventInstance(eventInstance);
				}
				isDragging = true;
				_this.handleSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.segDragStart(seg, ev);
				view.hideEventsWithId(eventDef.id); // hide all event segments. our mouseFollower will take over
			},
			hitOver: function(hit, isOrig, origHit) {
				var isAllowed = true;
				var origFootprint;
				var footprint;
				var mutatedEventInstanceGroup;
				var dragHelperEls;

				// starting hit could be forced (DayGrid.limit)
				if (seg.hit) {
					origHit = seg.hit;
				}

				// hit might not belong to this grid, so query origin grid
				origFootprint = origHit.component.getSafeHitFootprint(origHit);
				footprint = hit.component.getSafeHitFootprint(hit);

				if (origFootprint && footprint) {
					eventDefMutation = _this.computeEventDropMutation(origFootprint, footprint, eventDef);

					if (eventDefMutation) {
						mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
							eventDef.id,
							eventDefMutation
						);
						isAllowed = _this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					eventDefMutation = null;
					disableCursor();
				}

				// if a valid drop location, have the subclass render a visual indication
				if (
					eventDefMutation &&
					(dragHelperEls = view.renderDrag(
						_this.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, calendar)
						),
						seg
					))
				) {
					dragHelperEls.addClass('fc-dragging');
					if (!dragListener.isTouch) {
						_this.applyDragOpacity(dragHelperEls);
					}

					mouseFollower.hide(); // if the subclass is already using a mock event "helper", hide our own
				}
				else {
					mouseFollower.show(); // otherwise, have the helper follow the mouse (no snapping)
				}

				if (isOrig) {
					// needs to have moved hits to be a valid drop
					eventDefMutation = null;
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				view.unrenderDrag(); // unrender whatever was done in renderDrag
				mouseFollower.show(); // show in case we are moving out of all hits
				eventDefMutation = null;
			},
			hitDone: function() { // Called after a hitOut OR before a dragEnd
				enableCursor();
			},
			interactionEnd: function(ev) {
				delete seg.component; // prevent side effects

				// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
				mouseFollower.stop(!eventDefMutation, function() {
					if (isDragging) {
						view.unrenderDrag();
						_this.segDragStop(seg, ev);
					}

					if (eventDefMutation) {
						// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
						view.reportEventDrop(eventInstance, eventDefMutation, el, ev);
					}
					else {
						view.showEventsWithId(eventDef.id);
					}
				});
				_this.segDragListener = null;
			}
		});

		return dragListener;
	},


	// Called before event segment dragging starts
	segDragStart: function(seg, ev) {
		this.isDraggingSeg = true;
		this.publiclyTrigger('eventDragStart', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Called after event segment dragging stops
	segDragStop: function(seg, ev) {
		this.isDraggingSeg = false;
		this.publiclyTrigger('eventDragStop', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// DOES NOT consider overlap/constraint
	computeEventDropMutation: function(startFootprint, endFootprint, eventDef) {
		var date0 = startFootprint.unzonedRange.getStart();
		var date1 = endFootprint.unzonedRange.getStart();
		var clearEnd = false;
		var forceTimed = false;
		var forceAllDay = false;
		var dateDelta;
		var dateMutation;
		var eventDefMutation;

		if (startFootprint.isAllDay !== endFootprint.isAllDay) {
			clearEnd = true;

			if (endFootprint.isAllDay) {
				forceAllDay = true;
				date0.stripTime();
			}
			else {
				forceTimed = true;
			}
		}

		dateDelta = this.diffDates(date1, date0);

		dateMutation = new EventDefDateMutation();
		dateMutation.clearEnd = clearEnd;
		dateMutation.forceTimed = forceTimed;
		dateMutation.forceAllDay = forceAllDay;
		dateMutation.setDateDelta(dateDelta);

		eventDefMutation = new EventDefMutation();
		eventDefMutation.setDateMutation(dateMutation);

		return eventDefMutation;
	},


	// Utility for apply dragOpacity to a jQuery set
	applyDragOpacity: function(els) {
		var opacity = this.opt('dragOpacity');

		if (opacity != null) {
			els.css('opacity', opacity);
		}
	}

});

;;

/*
Wired up via Grid.event-interation.js by calling
startSegResize
*/
Grid.mixin({

	isResizingSeg: false, // is a segment being resized? boolean


	// returns boolean whether resizing actually started or not.
	// assumes the seg allows resizing.
	// `dragOptions` are optional.
	startSegResize: function(seg, ev, dragOptions) {
		if ($(ev.target).is('.fc-resizer')) {
			this.buildSegResizeListener(seg, $(ev.target).is('.fc-start-resizer'))
				.startInteraction(ev, dragOptions);
			return true;
		}
		return false;
	},


	// Creates a listener that tracks the user as they resize an event segment.
	// Generic enough to work with any type of Grid.
	buildSegResizeListener: function(seg, isStart) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var eventManager = calendar.eventManager;
		var el = seg.el;
		var eventDef = seg.footprint.eventDef;
		var eventInstance = seg.footprint.eventInstance;
		var isDragging;
		var resizeMutation; // zoned event date properties. falsy if invalid resize

		// Tracks mouse movement over the *grid's* coordinate map
		var dragListener = this.segResizeListener = new HitDragListener(this, {
			scroll: this.opt('dragScroll'),
			subjectEl: el,
			interactionStart: function() {
				isDragging = false;
			},
			dragStart: function(ev) {
				isDragging = true;
				_this.handleSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.segResizeStart(seg, ev);
			},
			hitOver: function(hit, isOrig, origHit) {
				var isAllowed = true;
				var origHitFootprint = _this.getSafeHitFootprint(origHit);
				var hitFootprint = _this.getSafeHitFootprint(hit);
				var mutatedEventInstanceGroup;

				if (origHitFootprint && hitFootprint) {
					resizeMutation = isStart ?
						_this.computeEventStartResizeMutation(origHitFootprint, hitFootprint, seg.footprint) :
						_this.computeEventEndResizeMutation(origHitFootprint, hitFootprint, seg.footprint);

					if (resizeMutation) {
						mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
							eventDef.id,
							resizeMutation
						);
						isAllowed = _this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					resizeMutation = null;
					disableCursor();
				}
				else if (resizeMutation.isEmpty()) {
					// no change. (FYI, event dates might have zones)
					resizeMutation = null;
				}

				if (resizeMutation) {
					view.hideEventsWithId(eventDef.id);

					_this.renderEventResize(
						_this.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, calendar)
						),
						seg
					);
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				resizeMutation = null;
				view.showEventsWithId(eventDef.id); // for when out-of-bounds. show original
			},
			hitDone: function() { // resets the rendering to show the original event
				_this.unrenderEventResize();
				enableCursor();
			},
			interactionEnd: function(ev) {
				if (isDragging) {
					_this.segResizeStop(seg, ev);
				}

				if (resizeMutation) { // valid date to resize to?
					// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
					view.reportEventResize(eventInstance, resizeMutation, el, ev);
				}
				else {
					view.showEventsWithId(eventDef.id);
				}
				_this.segResizeListener = null;
			}
		});

		return dragListener;
	},


	// Called before event segment resizing starts
	segResizeStart: function(seg, ev) {
		this.isResizingSeg = true;
		this.publiclyTrigger('eventResizeStart', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Called after event segment resizing stops
	segResizeStop: function(seg, ev) {
		this.isResizingSeg = false;
		this.publiclyTrigger('eventResizeStop', {
			context: seg.el[0],
			args: [
				seg.footprint.getEventLegacy(),
				ev,
				{}, // jqui dummy
				this.view
			]
		});
	},


	// Returns new date-information for an event segment being resized from its start
	computeEventStartResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
		var origRange = origEventFootprint.componentFootprint.unzonedRange;
		var startDelta = this.diffDates(
			endFootprint.unzonedRange.getStart(),
			startFootprint.unzonedRange.getStart()
		);
		var dateMutation;
		var eventDefMutation;

		if (origRange.getStart().add(startDelta) < origRange.getEnd()) {

			dateMutation = new EventDefDateMutation();
			dateMutation.setStartDelta(startDelta);

			eventDefMutation = new EventDefMutation();
			eventDefMutation.setDateMutation(dateMutation);

			return eventDefMutation;
		}

		return false;
	},


	// Returns new date-information for an event segment being resized from its end
	computeEventEndResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
		var origRange = origEventFootprint.componentFootprint.unzonedRange;
		var endDelta = this.diffDates(
			endFootprint.unzonedRange.getEnd(),
			startFootprint.unzonedRange.getEnd()
		);
		var dateMutation;
		var eventDefMutation;

		if (origRange.getEnd().add(endDelta) > origRange.getStart()) {

			dateMutation = new EventDefDateMutation();
			dateMutation.setEndDelta(endDelta);

			eventDefMutation = new EventDefMutation();
			eventDefMutation.setDateMutation(dateMutation);

			return eventDefMutation;
		}

		return false;
	},


	// Renders a visual indication of an event being resized.
	// Must return elements used for any mock events.
	renderEventResize: function(eventFootprints, seg) {
		// subclasses must implement
	},


	// Unrenders a visual indication of an event being resized.
	unrenderEventResize: function() {
		// subclasses must implement
	}

});

;;

/*
Wired up via Grid.js by calling
externalDragStart
*/
Grid.mixin({

	isDraggingExternal: false, // jqui-dragging an external element? boolean


	// Called when a jQuery UI drag is initiated anywhere in the DOM
	externalDragStart: function(ev, ui) {
		var el;
		var accept;

		if (this.opt('droppable')) { // only listen if this setting is on
			el = $((ui ? ui.item : null) || ev.target);

			// Test that the dragged element passes the dropAccept selector or filter function.
			// FYI, the default is "*" (matches all)
			accept = this.opt('dropAccept');
			if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
				if (!this.isDraggingExternal) { // prevent double-listening if fired twice
					this.listenToExternalDrag(el, ev, ui);
				}
			}
		}
	},


	// Called when a jQuery UI drag starts and it needs to be monitored for dropping
	listenToExternalDrag: function(el, ev, ui) {
		var _this = this;
		var view = this.view;
		var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
		var singleEventDef; // a null value signals an unsuccessful drag

		// listener that tracks mouse movement over date-associated pixel regions
		var dragListener = _this.externalDragListener = new HitDragListener(this, {
			interactionStart: function() {
				_this.isDraggingExternal = true;
			},
			hitOver: function(hit) {
				var isAllowed = true;
				var hitFootprint = hit.component.getSafeHitFootprint(hit); // hit might not belong to this grid
				var mutatedEventInstanceGroup;

				if (hitFootprint) {
					singleEventDef = _this.computeExternalDrop(hitFootprint, meta);

					if (singleEventDef) {
						mutatedEventInstanceGroup = new EventInstanceGroup(
							singleEventDef.buildInstances()
						);
						isAllowed = meta.eventProps ? // isEvent?
							_this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup) :
							_this.isExternalInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					singleEventDef = null;
					disableCursor();
				}

				if (singleEventDef) {
					_this.renderDrag( // called without a seg parameter
						_this.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, view.calendar)
						)
					);
				}
			},
			hitOut: function() {
				singleEventDef = null; // signal unsuccessful
			},
			hitDone: function() { // Called after a hitOut OR before a dragEnd
				enableCursor();
				_this.unrenderDrag();
			},
			interactionEnd: function(ev) {

				if (singleEventDef) { // element was dropped on a valid hit
					view.reportExternalDrop(
						singleEventDef,
						Boolean(meta.eventProps), // isEvent
						Boolean(meta.stick), // isSticky
						el, ev, ui
					);
				}

				_this.isDraggingExternal = false;
				_this.externalDragListener = null;
			}
		});

		dragListener.startDrag(ev); // start listening immediately
	},


	// Given a hit to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
	// returns the zoned start/end dates for the event that would result from the hypothetical drop. end might be null.
	// Returning a null value signals an invalid drop hit.
	// DOES NOT consider overlap/constraint.
	// Assumes both footprints are non-open-ended.
	computeExternalDrop: function(componentFootprint, meta) {
		var calendar = this.view.calendar;
		var start = FC.moment.utc(componentFootprint.unzonedRange.startMs).stripZone();
		var end;
		var eventDef;

		if (componentFootprint.isAllDay) {
			// if dropped on an all-day span, and element's metadata specified a time, set it
			if (meta.startTime) {
				start.time(meta.startTime);
			}
			else {
				start.stripTime();
			}
		}

		if (meta.duration) {
			end = start.clone().add(meta.duration);
		}

		start = calendar.applyTimezone(start);

		if (end) {
			end = calendar.applyTimezone(end);
		}

		eventDef = SingleEventDef.parse(
			$.extend({}, meta.eventProps, {
				start: start,
				end: end
			}),
			new EventSource(calendar)
		);

		return eventDef;
	},


	// NOTE: very similar to isEventInstanceGroupAllowed
	// when it's a completely anonymous external drag, no event.
	isExternalInstanceGroupAllowed: function(eventInstanceGroup) {
		var calendar = this.view.calendar;
		var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			if (!this.view.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
				return false;
			}
		}

		for (i = 0; i < eventFootprints.length; i++) {
			// treat it as a selection
			// TODO: pass in eventInstanceGroup instead
			//  because we don't want calendar's constraint system to depend on a component's
			//  determination of footprints.
			if (!calendar.isSelectionFootprintAllowed(eventFootprints[i].componentFootprint)) {
				return false;
			}
		}

		return true;
	}

});


/* External-Dragging-Element Data
----------------------------------------------------------------------------------------------------------------------*/

// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
FC.dataAttrPrefix = '';

// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
	var prefix = FC.dataAttrPrefix;
	var eventProps; // properties for creating the event, not related to date/time
	var startTime; // a Duration
	var duration;
	var stick;

	if (prefix) { prefix += '-'; }
	eventProps = el.data(prefix + 'event') || null;

	if (eventProps) {
		if (typeof eventProps === 'object') {
			eventProps = $.extend({}, eventProps); // make a copy
		}
		else { // something like 1 or true. still signal event creation
			eventProps = {};
		}

		// pluck special-cased date/time properties
		startTime = eventProps.start;
		if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
		duration = eventProps.duration;
		stick = eventProps.stick;
		delete eventProps.start;
		delete eventProps.time;
		delete eventProps.duration;
		delete eventProps.stick;
	}

	// fallback to standalone attribute values for each of the date/time properties
	if (startTime == null) { startTime = el.data(prefix + 'start'); }
	if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
	if (duration == null) { duration = el.data(prefix + 'duration'); }
	if (stick == null) { stick = el.data(prefix + 'stick'); }

	// massage into correct data types
	startTime = startTime != null ? moment.duration(startTime) : null;
	duration = duration != null ? moment.duration(duration) : null;
	stick = Boolean(stick);

	return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}

;;

Grid.mixin({

	/* Fill System (highlight, background events, business hours)
	--------------------------------------------------------------------------------------------------------------------
	TODO: remove this system. like we did in TimeGrid
	*/


	elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.


	initFillInternals: function() {
		this.elsByFill = {};
	},


	// Renders a set of rectangles over the given segments of time.
	// MUST RETURN a subset of segs, the segs that were actually rendered.
	// Responsible for populating this.elsByFill. TODO: better API for expressing this requirement
	renderFill: function(type, segs) {
		// subclasses must implement
	},


	// Unrenders a specific type of fill that is currently rendered on the grid
	unrenderFill: function(type) {
		var el = this.elsByFill[type];

		if (el) {
			el.remove();
			delete this.elsByFill[type];
		}
	},


	// Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
	// Only returns segments that successfully rendered.
	// To be harnessed by renderFill (implemented by subclasses).
	// Analagous to renderFgSegEls.
	renderFillSegEls: function(type, segs) {
		var _this = this;
		var segElMethod = this[type + 'SegEl'];
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) {

			// build a large concatenation of segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fillSegHtml(type, segs[i]);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				// allow custom filter methods per-type
				if (segElMethod) {
					el = segElMethod.call(_this, seg, el);
				}

				if (el) { // custom filters did not cancel the render
					el = $(el); // allow custom filter to return raw DOM node

					// correct element type? (would be bad if a non-TD were inserted into a table for example)
					if (el.is(_this.fillSegTag)) {
						seg.el = el;
						renderedSegs.push(seg);
					}
				}
			});
		}

		return renderedSegs;
	},


	fillSegTag: 'div', // subclasses can override


	// Builds the HTML needed for one fill segment. Generic enough to work with different types.
	fillSegHtml: function(type, seg) {

		// custom hooks per-type
		var classesMethod = this[type + 'SegClasses'];
		var cssMethod = this[type + 'SegCss'];

		var classes = classesMethod ? classesMethod.call(this, seg) : [];
		var css = cssToStr(cssMethod ? cssMethod.call(this, seg) : {});

		return '<' + this.fillSegTag +
			(classes.length ? ' class="' + classes.join(' ') + '"' : '') +
			(css ? ' style="' + css + '"' : '') +
			' />';
	},


	// Generates an array of classNames for rendering the highlight. Used by the fill system.
	highlightSegClasses: function() {
		return [ 'fc-highlight' ];
	}

});

;;

/*
A set of rendering and date-related methods for a visual component comprised of one or more rows of day columns.
Prerequisite: the object being mixed into needs to be a *Grid*
*/
var DayTableMixin = FC.DayTableMixin = {

	breakOnWeeks: false, // should create a new row for each week?
	dayDates: null, // whole-day dates for each column. left to right
	dayIndices: null, // for each day from start, the offset
	daysPerRow: null,
	rowCnt: null,
	colCnt: null,
	colHeadFormat: null,


	// Populates internal variables used for date calculation and rendering
	updateDayTable: function() {
		var view = this.view;
		var calendar = view.calendar;
		var date = calendar.msToUtcMoment(this.unzonedRange.startMs, true);
		var end = calendar.msToUtcMoment(this.unzonedRange.endMs, true);
		var dayIndex = -1;
		var dayIndices = [];
		var dayDates = [];
		var daysPerRow;
		var firstDay;
		var rowCnt;

		while (date.isBefore(end)) { // loop each day from start to end
			if (view.isHiddenDay(date)) {
				dayIndices.push(dayIndex + 0.5); // mark that it's between indices
			}
			else {
				dayIndex++;
				dayIndices.push(dayIndex);
				dayDates.push(date.clone());
			}
			date.add(1, 'days');
		}

		if (this.breakOnWeeks) {
			// count columns until the day-of-week repeats
			firstDay = dayDates[0].day();
			for (daysPerRow = 1; daysPerRow < dayDates.length; daysPerRow++) {
				if (dayDates[daysPerRow].day() == firstDay) {
					break;
				}
			}
			rowCnt = Math.ceil(dayDates.length / daysPerRow);
		}
		else {
			rowCnt = 1;
			daysPerRow = dayDates.length;
		}

		this.dayDates = dayDates;
		this.dayIndices = dayIndices;
		this.daysPerRow = daysPerRow;
		this.rowCnt = rowCnt;

		this.updateDayTableCols();
	},


	// Computes and assigned the colCnt property and updates any options that may be computed from it
	updateDayTableCols: function() {
		this.colCnt = this.computeColCnt();
		this.colHeadFormat = this.opt('columnFormat') || this.computeColHeadFormat();
	},


	// Determines how many columns there should be in the table
	computeColCnt: function() {
		return this.daysPerRow;
	},


	// Computes the ambiguously-timed moment for the given cell
	getCellDate: function(row, col) {
		return this.dayDates[
				this.getCellDayIndex(row, col)
			].clone();
	},


	// Computes the ambiguously-timed date range for the given cell
	getCellRange: function(row, col) {
		var start = this.getCellDate(row, col);
		var end = start.clone().add(1, 'days');

		return { start: start, end: end };
	},


	// Returns the number of day cells, chronologically, from the first of the grid (0-based)
	getCellDayIndex: function(row, col) {
		return row * this.daysPerRow + this.getColDayIndex(col);
	},


	// Returns the numner of day cells, chronologically, from the first cell in *any given row*
	getColDayIndex: function(col) {
		if (this.isRTL) {
			return this.colCnt - 1 - col;
		}
		else {
			return col;
		}
	},


	// Given a date, returns its chronolocial cell-index from the first cell of the grid.
	// If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
	// If before the first offset, returns a negative number.
	// If after the last offset, returns an offset past the last cell offset.
	// Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
	getDateDayIndex: function(date) {
		var dayIndices = this.dayIndices;
		var dayOffset = date.diff(this.dayDates[0], 'days');

		if (dayOffset < 0) {
			return dayIndices[0] - 1;
		}
		else if (dayOffset >= dayIndices.length) {
			return dayIndices[dayIndices.length - 1] + 1;
		}
		else {
			return dayIndices[dayOffset];
		}
	},


	/* Options
	------------------------------------------------------------------------------------------------------------------*/


	// Computes a default column header formatting string if `colFormat` is not explicitly defined
	computeColHeadFormat: function() {
		// if more than one week row, or if there are a lot of columns with not much space,
		// put just the day numbers will be in each cell
		if (this.rowCnt > 1 || this.colCnt > 10) {
			return 'ddd'; // "Sat"
		}
		// multiple days, so full single date string WON'T be in title text
		else if (this.colCnt > 1) {
			return this.opt('dayOfMonthFormat'); // "Sat 12/10"
		}
		// single day, so full single date string will probably be in title text
		else {
			return 'dddd'; // "Saturday"
		}
	},


	/* Slicing
	------------------------------------------------------------------------------------------------------------------*/


	// Slices up a date range into a segment for every week-row it intersects with
	sliceRangeByRow: function(unzonedRange) {
		var daysPerRow = this.daysPerRow;
		var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
		var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
		var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
		var segs = [];
		var row;
		var rowFirst, rowLast; // inclusive day-index range for current row
		var segFirst, segLast; // inclusive day-index range for segment

		for (row = 0; row < this.rowCnt; row++) {
			rowFirst = row * daysPerRow;
			rowLast = rowFirst + daysPerRow - 1;

			// intersect segment's offset range with the row's
			segFirst = Math.max(rangeFirst, rowFirst);
			segLast = Math.min(rangeLast, rowLast);

			// deal with in-between indices
			segFirst = Math.ceil(segFirst); // in-between starts round to next cell
			segLast = Math.floor(segLast); // in-between ends round to prev cell

			if (segFirst <= segLast) { // was there any intersection with the current row?
				segs.push({
					row: row,

					// normalize to start of row
					firstRowDayIndex: segFirst - rowFirst,
					lastRowDayIndex: segLast - rowFirst,

					// must be matching integers to be the segment's start/end
					isStart: segFirst === rangeFirst,
					isEnd: segLast === rangeLast
				});
			}
		}

		return segs;
	},


	// Slices up a date range into a segment for every day-cell it intersects with.
	// TODO: make more DRY with sliceRangeByRow somehow.
	sliceRangeByDay: function(unzonedRange) {
		var daysPerRow = this.daysPerRow;
		var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
		var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
		var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
		var segs = [];
		var row;
		var rowFirst, rowLast; // inclusive day-index range for current row
		var i;
		var segFirst, segLast; // inclusive day-index range for segment

		for (row = 0; row < this.rowCnt; row++) {
			rowFirst = row * daysPerRow;
			rowLast = rowFirst + daysPerRow - 1;

			for (i = rowFirst; i <= rowLast; i++) {

				// intersect segment's offset range with the row's
				segFirst = Math.max(rangeFirst, i);
				segLast = Math.min(rangeLast, i);

				// deal with in-between indices
				segFirst = Math.ceil(segFirst); // in-between starts round to next cell
				segLast = Math.floor(segLast); // in-between ends round to prev cell

				if (segFirst <= segLast) { // was there any intersection with the current row?
					segs.push({
						row: row,

						// normalize to start of row
						firstRowDayIndex: segFirst - rowFirst,
						lastRowDayIndex: segLast - rowFirst,

						// must be matching integers to be the segment's start/end
						isStart: segFirst === rangeFirst,
						isEnd: segLast === rangeLast
					});
				}
			}
		}

		return segs;
	},


	/* Header Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderHeadHtml: function() {
		var theme = this.view.calendar.theme;

		return '' +
			'<div class="fc-row ' + theme.getClass('headerRow') + '">' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					'<thead>' +
						this.renderHeadTrHtml() +
					'</thead>' +
				'</table>' +
			'</div>';
	},


	renderHeadIntroHtml: function() {
		return this.renderIntroHtml(); // fall back to generic
	},


	renderHeadTrHtml: function() {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderHeadIntroHtml()) +
				this.renderHeadDateCellsHtml() +
				(this.isRTL ? this.renderHeadIntroHtml() : '') +
			'</tr>';
	},


	renderHeadDateCellsHtml: function() {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(0, col);
			htmls.push(this.renderHeadDateCellHtml(date));
		}

		return htmls.join('');
	},


	// TODO: when internalApiVersion, accept an object for HTML attributes
	// (colspan should be no different)
	renderHeadDateCellHtml: function(date, colspan, otherAttrs) {
		var view = this.view;
		var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var classNames = [
			'fc-day-header',
			view.calendar.theme.getClass('widgetHeader')
		];
		var innerHtml = htmlEscape(date.format(this.colHeadFormat));

		// if only one row of days, the classNames on the header can represent the specific days beneath
		if (this.rowCnt === 1) {
			classNames = classNames.concat(
				// includes the day-of-week class
				// noThemeHighlight=true (don't highlight the header)
				this.getDayClasses(date, true)
			);
		}
		else {
			classNames.push('fc-' + dayIDs[date.day()]); // only add the day-of-week class
		}

		return '' +
            '<th class="' + classNames.join(' ') + '"' +
				((isDateValid && this.rowCnt) === 1 ?
					' data-date="' + date.format('YYYY-MM-DD') + '"' :
					'') +
				(colspan > 1 ?
					' colspan="' + colspan + '"' :
					'') +
				(otherAttrs ?
					' ' + otherAttrs :
					'') +
				'>' +
				(isDateValid ?
					// don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
					view.buildGotoAnchorHtml(
						{ date: date, forceOff: this.rowCnt > 1 || this.colCnt === 1 },
						innerHtml
					) :
					// if not valid, display text, but no link
					innerHtml
				) +
			'</th>';
	},


	/* Background Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderBgTrHtml: function(row) {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderBgIntroHtml(row)) +
				this.renderBgCellsHtml(row) +
				(this.isRTL ? this.renderBgIntroHtml(row) : '') +
			'</tr>';
	},


	renderBgIntroHtml: function(row) {
		return this.renderIntroHtml(); // fall back to generic
	},


	renderBgCellsHtml: function(row) {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(row, col);
			htmls.push(this.renderBgCellHtml(date));
		}

		return htmls.join('');
	},


	renderBgCellHtml: function(date, otherAttrs) {
		var view = this.view;
		var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var classes = this.getDayClasses(date);

		classes.unshift('fc-day', view.calendar.theme.getClass('widgetContent'));

		return '<td class="' + classes.join(' ') + '"' +
			(isDateValid ?
				' data-date="' + date.format('YYYY-MM-DD') + '"' : // if date has a time, won't format it
				'') +
			(otherAttrs ?
				' ' + otherAttrs :
				'') +
			'></td>';
	},


	/* Generic
	------------------------------------------------------------------------------------------------------------------*/


	// Generates the default HTML intro for any row. User classes should override
	renderIntroHtml: function() {
	},


	// TODO: a generic method for dealing with <tr>, RTL, intro
	// when increment internalApiVersion
	// wrapTr (scheduler)


	/* Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Applies the generic "intro" and "outro" HTML to the given cells.
	// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
	bookendCells: function(trEl) {
		var introHtml = this.renderIntroHtml();

		if (introHtml) {
			if (this.isRTL) {
				trEl.append(introHtml);
			}
			else {
				trEl.prepend(introHtml);
			}
		}
	}

};

;;

/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/

var DayGrid = FC.DayGrid = Grid.extend(DayTableMixin, {

	numbersVisible: false, // should render a row for day/week numbers? set by outside view. TODO: make internal
	bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid

	rowEls: null, // set of fake row elements
	cellEls: null, // set of whole-day elements comprising the row's background
	helperEls: null, // set of cell skeleton elements for rendering the mock event "helper"

	rowCoordCache: null,
	colCoordCache: null,


	// Renders the rows and columns into the component's `this.el`, which should already be assigned.
	// isRigid determins whether the individual rows should ignore the contents and be a constant height.
	// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
	renderDates: function(isRigid) {
		var view = this.view;
		var rowCnt = this.rowCnt;
		var colCnt = this.colCnt;
		var html = '';
		var row;
		var col;

		for (row = 0; row < rowCnt; row++) {
			html += this.renderDayRowHtml(row, isRigid);
		}
		this.el.html(html);

		this.rowEls = this.el.find('.fc-row');
		this.cellEls = this.el.find('.fc-day, .fc-disabled-day');

		this.rowCoordCache = new CoordCache({
			els: this.rowEls,
			isVertical: true
		});
		this.colCoordCache = new CoordCache({
			els: this.cellEls.slice(0, this.colCnt), // only the first row
			isHorizontal: true
		});

		// trigger dayRender with each cell's element
		for (row = 0; row < rowCnt; row++) {
			for (col = 0; col < colCnt; col++) {
				this.publiclyTrigger('dayRender', {
					context: view,
					args: [
						this.getCellDate(row, col),
						this.getCellEl(row, col),
						view
					]
				});
			}
		}
	},


	unrenderDates: function() {
		this.removeSegPopover();
	},


	renderBusinessHours: function() {
		var segs = this.buildBusinessHourSegs(true); // wholeDay=true
		this.renderFill('businessHours', segs, 'bgevent');
	},


	unrenderBusinessHours: function() {
		this.unrenderFill('businessHours');
	},


	// Generates the HTML for a single row, which is a div that wraps a table.
	// `row` is the row number.
	renderDayRowHtml: function(row, isRigid) {
		var theme = this.view.calendar.theme;
		var classes = [ 'fc-row', 'fc-week', theme.getClass('dayRow') ];

		if (isRigid) {
			classes.push('fc-rigid');
		}

		return '' +
			'<div class="' + classes.join(' ') + '">' +
				'<div class="fc-bg">' +
					'<table class="' + theme.getClass('tableGrid') + '">' +
						this.renderBgTrHtml(row) +
					'</table>' +
				'</div>' +
				'<div class="fc-content-skeleton">' +
					'<table>' +
						(this.numbersVisible ?
							'<thead>' +
								this.renderNumberTrHtml(row) +
							'</thead>' :
							''
							) +
					'</table>' +
				'</div>' +
			'</div>';
	},


	/* Grid Number Rendering
	------------------------------------------------------------------------------------------------------------------*/


	renderNumberTrHtml: function(row) {
		return '' +
			'<tr>' +
				(this.isRTL ? '' : this.renderNumberIntroHtml(row)) +
				this.renderNumberCellsHtml(row) +
				(this.isRTL ? this.renderNumberIntroHtml(row) : '') +
			'</tr>';
	},


	renderNumberIntroHtml: function(row) {
		return this.renderIntroHtml();
	},


	renderNumberCellsHtml: function(row) {
		var htmls = [];
		var col, date;

		for (col = 0; col < this.colCnt; col++) {
			date = this.getCellDate(row, col);
			htmls.push(this.renderNumberCellHtml(date));
		}

		return htmls.join('');
	},


	// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
	// The number row will only exist if either day numbers or week numbers are turned on.
	renderNumberCellHtml: function(date) {
		var view = this.view;
		var html = '';
		var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
		var isDayNumberVisible = view.dayNumbersVisible && isDateValid;
		var classes;
		var weekCalcFirstDoW;

		if (!isDayNumberVisible && !view.cellWeekNumbersVisible) {
			// no numbers in day cell (week number must be along the side)
			return '<td/>'; //  will create an empty space above events :(
		}

		classes = this.getDayClasses(date);
		classes.unshift('fc-day-top');

		if (view.cellWeekNumbersVisible) {
			// To determine the day of week number change under ISO, we cannot
			// rely on moment.js methods such as firstDayOfWeek() or weekday(),
			// because they rely on the locale's dow (possibly overridden by
			// our firstDay option), which may not be Monday. We cannot change
			// dow, because that would affect the calendar start day as well.
			if (date._locale._fullCalendar_weekCalc === 'ISO') {
				weekCalcFirstDoW = 1;  // Monday by ISO 8601 definition
			}
			else {
				weekCalcFirstDoW = date._locale.firstDayOfWeek();
			}
		}

		html += '<td class="' + classes.join(' ') + '"' +
			(isDateValid ?
				' data-date="' + date.format() + '"' :
				''
				) +
			'>';

		if (view.cellWeekNumbersVisible && (date.day() == weekCalcFirstDoW)) {
			html += view.buildGotoAnchorHtml(
				{ date: date, type: 'week' },
				{ 'class': 'fc-week-number' },
				date.format('w') // inner HTML
			);
		}

		if (isDayNumberVisible) {
			html += view.buildGotoAnchorHtml(
				date,
				{ 'class': 'fc-day-number' },
				date.date() // inner HTML
			);
		}

		html += '</td>';

		return html;
	},


	/* Options
	------------------------------------------------------------------------------------------------------------------*/


	// Computes a default event time formatting string if `timeFormat` is not explicitly defined
	computeEventTimeFormat: function() {
		return this.opt('extraSmallTimeFormat'); // like "6p" or "6:30p"
	},


	// Computes a default `displayEventEnd` value if one is not expliclty defined
	computeDisplayEventEnd: function() {
		return this.colCnt == 1; // we'll likely have space if there's only one day
	},


	/* Dates
	------------------------------------------------------------------------------------------------------------------*/


	rangeUpdated: function() {
		this.updateDayTable();
	},


	// Slices up the given span (unzoned start/end with other misc data) into an array of segments
	componentFootprintToSegs: function(componentFootprint) {
		var segs = this.sliceRangeByRow(componentFootprint.unzonedRange);
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (this.isRTL) {
				seg.leftCol = this.daysPerRow - 1 - seg.lastRowDayIndex;
				seg.rightCol = this.daysPerRow - 1 - seg.firstRowDayIndex;
			}
			else {
				seg.leftCol = seg.firstRowDayIndex;
				seg.rightCol = seg.lastRowDayIndex;
			}
		}

		return segs;
	},


	/* Hit System
	------------------------------------------------------------------------------------------------------------------*/


	prepareHits: function() {
		this.colCoordCache.build();
		this.rowCoordCache.build();
		this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
	},


	releaseHits: function() {
		this.colCoordCache.clear();
		this.rowCoordCache.clear();
	},


	queryHit: function(leftOffset, topOffset) {
		if (this.colCoordCache.isLeftInBounds(leftOffset) && this.rowCoordCache.isTopInBounds(topOffset)) {
			var col = this.colCoordCache.getHorizontalIndex(leftOffset);
			var row = this.rowCoordCache.getVerticalIndex(topOffset);

			if (row != null && col != null) {
				return this.getCellHit(row, col);
			}
		}
	},


	getHitFootprint: function(hit) {
		var range = this.getCellRange(hit.row, hit.col);

		return new ComponentFootprint(
			new UnzonedRange(range.start, range.end),
			true // all-day?
		);
	},


	getHitEl: function(hit) {
		return this.getCellEl(hit.row, hit.col);
	},


	/* Cell System
	------------------------------------------------------------------------------------------------------------------*/
	// FYI: the first column is the leftmost column, regardless of date


	getCellHit: function(row, col) {
		return {
			row: row,
			col: col,
			component: this, // needed unfortunately :(
			left: this.colCoordCache.getLeftOffset(col),
			right: this.colCoordCache.getRightOffset(col),
			top: this.rowCoordCache.getTopOffset(row),
			bottom: this.rowCoordCache.getBottomOffset(row)
		};
	},


	getCellEl: function(row, col) {
		return this.cellEls.eq(row * this.colCnt + col);
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/
	// TODO: move to DayGrid.event, similar to what we did with Grid's drag methods


	// Renders a visual indication of an event or external element being dragged.
	// `eventLocation` has zoned start and end (optional)
	renderDrag: function(eventFootprints, seg) {
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			this.renderHighlight(eventFootprints[i].componentFootprint);
		}

		// if a segment from the same calendar but another component is being dragged, render a helper event
		if (seg && seg.component !== this) {
			return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
		}
	},


	// Unrenders any visual indication of a hovering event
	unrenderDrag: function() {
		this.unrenderHighlight();
		this.unrenderHelper();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderEventResize: function(eventFootprints, seg) {
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			this.renderHighlight(eventFootprints[i].componentFootprint);
		}

		return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
	},


	// Unrenders a visual indication of an event being resized
	unrenderEventResize: function() {
		this.unrenderHighlight();
		this.unrenderHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
	renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
		var helperNodes = [];
		var segs = this.eventFootprintsToSegs(eventFootprints);
		var rowStructs;

		segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
		rowStructs = this.renderSegRows(segs);

		// inject each new event skeleton into each associated row
		this.rowEls.each(function(row, rowNode) {
			var rowEl = $(rowNode); // the .fc-row
			var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
			var skeletonTop;

			// If there is an original segment, match the top position. Otherwise, put it at the row's top level
			if (sourceSeg && sourceSeg.row === row) {
				skeletonTop = sourceSeg.el.position().top;
			}
			else {
				skeletonTop = rowEl.find('.fc-content-skeleton tbody').position().top;
			}

			skeletonEl.css('top', skeletonTop)
				.find('table')
					.append(rowStructs[row].tbodyEl);

			rowEl.append(skeletonEl);
			helperNodes.push(skeletonEl[0]);
		});

		return ( // must return the elements rendered
			this.helperEls = $(helperNodes) // array -> jQuery set
		);
	},


	// Unrenders any visual indication of a mock helper event
	unrenderHelper: function() {
		if (this.helperEls) {
			this.helperEls.remove();
			this.helperEls = null;
		}
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	fillSegTag: 'td', // override the default tag name


	// Renders a set of rectangles over the given segments of days.
	// Only returns segments that successfully rendered.
	renderFill: function(type, segs, className) {
		var nodes = [];
		var i, seg;
		var skeletonEl;

		segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			skeletonEl = this.renderFillRow(type, seg, className);
			this.rowEls.eq(seg.row).append(skeletonEl);
			nodes.push(skeletonEl[0]);
		}

		if (this.elsByFill[type]) {
			this.elsByFill[type] = this.elsByFill[type].add(nodes);
		}
		else {
			this.elsByFill[type] = $(nodes);
		}

		return segs;
	},


	// Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
	renderFillRow: function(type, seg, className) {
		var colCnt = this.colCnt;
		var startCol = seg.leftCol;
		var endCol = seg.rightCol + 1;
		var skeletonEl;
		var trEl;

		className = className || type.toLowerCase();

		skeletonEl = $(
			'<div class="fc-' + className + '-skeleton">' +
				'<table><tr/></table>' +
			'</div>'
		);
		trEl = skeletonEl.find('tr');

		if (startCol > 0) {
			trEl.append('<td colspan="' + startCol + '"/>');
		}

		trEl.append(
			seg.el.attr('colspan', endCol - startCol)
		);

		if (endCol < colCnt) {
			trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
		}

		this.bookendCells(trEl);

		return skeletonEl;
	}

});

;;

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/

DayGrid.mixin({

	rowStructs: null, // an array of objects, each holding information about a row's foreground event-rendering


	// Unrenders all events currently rendered on the grid
	unrenderEvents: function() {
		this.removeSegPopover(); // removes the "more.." events popover
		Grid.prototype.unrenderEvents.apply(this, arguments); // calls the super-method
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getEventSegs: function() {
		return Grid.prototype.getEventSegs.call(this) // get the segments from the super-method
			.concat(this.popoverSegs || []); // append the segments from the "more..." popover
	},


	// Renders the given background event segments onto the grid
	renderBgSegs: function(segs) {

		// don't render timed background events
		var allDaySegs = $.grep(segs, function(seg) {
			return seg.footprint.componentFootprint.isAllDay;
		});

		return Grid.prototype.renderBgSegs.call(this, allDaySegs); // call the super-method
	},


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		var rowStructs;

		// render an `.el` on each seg
		// returns a subset of the segs. segs that were actually rendered
		segs = this.renderFgSegEls(segs);

		rowStructs = this.rowStructs = this.renderSegRows(segs);

		// append to each row's content skeleton
		this.rowEls.each(function(i, rowNode) {
			$(rowNode).find('.fc-content-skeleton > table').append(
				rowStructs[i].tbodyEl
			);
		});

		return segs; // return only the segs that were actually rendered
	},


	// Unrenders all currently rendered foreground event segments
	unrenderFgSegs: function() {
		var rowStructs = this.rowStructs || [];
		var rowStruct;

		while ((rowStruct = rowStructs.pop())) {
			rowStruct.tbodyEl.remove();
		}

		this.rowStructs = null;
	},


	// Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
	// Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
	// PRECONDITION: each segment shoud already have a rendered and assigned `.el`
	renderSegRows: function(segs) {
		var rowStructs = [];
		var segRows;
		var row;

		segRows = this.groupSegRows(segs); // group into nested arrays

		// iterate each row of segment groupings
		for (row = 0; row < segRows.length; row++) {
			rowStructs.push(
				this.renderSegRow(row, segRows[row])
			);
		}

		return rowStructs;
	},


	// Builds the HTML to be used for the default element for an individual segment
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var eventDef = seg.footprint.eventDef;
		var isAllDay = seg.footprint.componentFootprint.isAllDay;
		var isDraggable = view.isEventDefDraggable(eventDef);
		var isResizableFromStart = !disableResizing && isAllDay &&
			seg.isStart && view.isEventDefResizableFromStart(eventDef);
		var isResizableFromEnd = !disableResizing && isAllDay &&
			seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
		var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
		var skinCss = cssToStr(this.getSegSkinCss(seg));
		var timeHtml = '';
		var timeText;
		var titleHtml;

		classes.unshift('fc-day-grid-event', 'fc-h-event');

		// Only display a timed events time if it is the starting segment
		if (seg.isStart) {
			timeText = this.getEventTimeText(seg.footprint);
			if (timeText) {
				timeHtml = '<span class="fc-time">' + htmlEscape(timeText) + '</span>';
			}
		}

		titleHtml =
			'<span class="fc-title">' +
				(htmlEscape(eventDef.title || '') || '&nbsp;') + // we always want one line of height
			'</span>';
		
		return '<a class="' + classes.join(' ') + '"' +
				(eventDef.url ?
					' href="' + htmlEscape(eventDef.url) + '"' :
					''
					) +
				(skinCss ?
					' style="' + skinCss + '"' :
					''
					) +
			'>' +
				'<div class="fc-content">' +
					(this.isRTL ?
						titleHtml + ' ' + timeHtml : // put a natural space in between
						timeHtml + ' ' + titleHtml   //
						) +
				'</div>' +
				(isResizableFromStart ?
					'<div class="fc-resizer fc-start-resizer" />' :
					''
					) +
				(isResizableFromEnd ?
					'<div class="fc-resizer fc-end-resizer" />' :
					''
					) +
			'</a>';
	},


	// Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
	// the segments. Returns object with a bunch of internal data about how the render was calculated.
	// NOTE: modifies rowSegs
	renderSegRow: function(row, rowSegs) {
		var colCnt = this.colCnt;
		var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
		var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
		var tbody = $('<tbody/>');
		var segMatrix = []; // lookup for which segments are rendered into which level+col cells
		var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
		var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
		var i, levelSegs;
		var col;
		var tr;
		var j, seg;
		var td;

		// populates empty cells from the current column (`col`) to `endCol`
		function emptyCellsUntil(endCol) {
			while (col < endCol) {
				// try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
				td = (loneCellMatrix[i - 1] || [])[col];
				if (td) {
					td.attr(
						'rowspan',
						parseInt(td.attr('rowspan') || 1, 10) + 1
					);
				}
				else {
					td = $('<td/>');
					tr.append(td);
				}
				cellMatrix[i][col] = td;
				loneCellMatrix[i][col] = td;
				col++;
			}
		}

		for (i = 0; i < levelCnt; i++) { // iterate through all levels
			levelSegs = segLevels[i];
			col = 0;
			tr = $('<tr/>');

			segMatrix.push([]);
			cellMatrix.push([]);
			loneCellMatrix.push([]);

			// levelCnt might be 1 even though there are no actual levels. protect against this.
			// this single empty row is useful for styling.
			if (levelSegs) {
				for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
					seg = levelSegs[j];

					emptyCellsUntil(seg.leftCol);

					// create a container that occupies or more columns. append the event element.
					td = $('<td class="fc-event-container"/>').append(seg.el);
					if (seg.leftCol != seg.rightCol) {
						td.attr('colspan', seg.rightCol - seg.leftCol + 1);
					}
					else { // a single-column segment
						loneCellMatrix[i][col] = td;
					}

					while (col <= seg.rightCol) {
						cellMatrix[i][col] = td;
						segMatrix[i][col] = seg;
						col++;
					}

					tr.append(td);
				}
			}

			emptyCellsUntil(colCnt); // finish off the row
			this.bookendCells(tr);
			tbody.append(tr);
		}

		return { // a "rowStruct"
			row: row, // the row number
			tbodyEl: tbody,
			cellMatrix: cellMatrix,
			segMatrix: segMatrix,
			segLevels: segLevels,
			segs: rowSegs
		};
	},


	// Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
	// NOTE: modifies segs
	buildSegLevels: function(segs) {
		var levels = [];
		var i, seg;
		var j;

		// Give preference to elements with certain criteria, so they have
		// a chance to be closer to the top.
		this.sortEventSegs(segs);
		
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			// loop through levels, starting with the topmost, until the segment doesn't collide with other segments
			for (j = 0; j < levels.length; j++) {
				if (!isDaySegCollision(seg, levels[j])) {
					break;
				}
			}
			// `j` now holds the desired subrow index
			seg.level = j;

			// create new level array if needed and append segment
			(levels[j] || (levels[j] = [])).push(seg);
		}

		// order segments left-to-right. very important if calendar is RTL
		for (j = 0; j < levels.length; j++) {
			levels[j].sort(compareDaySegCols);
		}

		return levels;
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
	groupSegRows: function(segs) {
		var segRows = [];
		var i;

		for (i = 0; i < this.rowCnt; i++) {
			segRows.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segRows[segs[i].row].push(segs[i]);
		}

		return segRows;
	}

});


// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
	var i, otherSeg;

	for (i = 0; i < otherSegs.length; i++) {
		otherSeg = otherSegs[i];

		if (
			otherSeg.leftCol <= seg.rightCol &&
			otherSeg.rightCol >= seg.leftCol
		) {
			return true;
		}
	}

	return false;
}


// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
	return a.leftCol - b.leftCol;
}

;;

/* Methods relate to limiting the number events for a given day on a DayGrid
----------------------------------------------------------------------------------------------------------------------*/
// NOTE: all the segs being passed around in here are foreground segs

DayGrid.mixin({

	segPopover: null, // the Popover that holds events that can't fit in a cell. null when not visible
	popoverSegs: null, // an array of segment objects that the segPopover holds. null when not visible


	removeSegPopover: function() {
		if (this.segPopover) {
			this.segPopover.hide(); // in handler, will call segPopover's removeElement
		}
	},


	// Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
	// `levelLimit` can be false (don't limit), a number, or true (should be computed).
	limitRows: function(levelLimit) {
		var rowStructs = this.rowStructs || [];
		var row; // row #
		var rowLevelLimit;

		for (row = 0; row < rowStructs.length; row++) {
			this.unlimitRow(row);

			if (!levelLimit) {
				rowLevelLimit = false;
			}
			else if (typeof levelLimit === 'number') {
				rowLevelLimit = levelLimit;
			}
			else {
				rowLevelLimit = this.computeRowLevelLimit(row);
			}

			if (rowLevelLimit !== false) {
				this.limitRow(row, rowLevelLimit);
			}
		}
	},


	// Computes the number of levels a row will accomodate without going outside its bounds.
	// Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
	// `row` is the row number.
	computeRowLevelLimit: function(row) {
		var rowEl = this.rowEls.eq(row); // the containing "fake" row div
		var rowHeight = rowEl.height(); // TODO: cache somehow?
		var trEls = this.rowStructs[row].tbodyEl.children();
		var i, trEl;
		var trHeight;

		function iterInnerHeights(i, childNode) {
			trHeight = Math.max(trHeight, $(childNode).outerHeight());
		}

		// Reveal one level <tr> at a time and stop when we find one out of bounds
		for (i = 0; i < trEls.length; i++) {
			trEl = trEls.eq(i).removeClass('fc-limited'); // reset to original state (reveal)

			// with rowspans>1 and IE8, trEl.outerHeight() would return the height of the largest cell,
			// so instead, find the tallest inner content element.
			trHeight = 0;
			trEl.find('> td > :first-child').each(iterInnerHeights);

			if (trEl.position().top + trHeight > rowHeight) {
				return i;
			}
		}

		return false; // should not limit at all
	},


	// Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
	// `row` is the row number.
	// `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
	limitRow: function(row, levelLimit) {
		var _this = this;
		var rowStruct = this.rowStructs[row];
		var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
		var col = 0; // col #, left-to-right (not chronologically)
		var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
		var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
		var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
		var i, seg;
		var segsBelow; // array of segment objects below `seg` in the current `col`
		var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
		var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
		var td, rowspan;
		var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
		var j;
		var moreTd, moreWrap, moreLink;

		// Iterates through empty level cells and places "more" links inside if need be
		function emptyCellsUntil(endCol) { // goes from current `col` to `endCol`
			while (col < endCol) {
				segsBelow = _this.getCellSegs(row, col, levelLimit);
				if (segsBelow.length) {
					td = cellMatrix[levelLimit - 1][col];
					moreLink = _this.renderMoreLink(row, col, segsBelow);
					moreWrap = $('<div/>').append(moreLink);
					td.append(moreWrap);
					moreNodes.push(moreWrap[0]);
				}
				col++;
			}
		}

		if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
			levelSegs = rowStruct.segLevels[levelLimit - 1];
			cellMatrix = rowStruct.cellMatrix;

			limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
				.addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array

			// iterate though segments in the last allowable level
			for (i = 0; i < levelSegs.length; i++) {
				seg = levelSegs[i];
				emptyCellsUntil(seg.leftCol); // process empty cells before the segment

				// determine *all* segments below `seg` that occupy the same columns
				colSegsBelow = [];
				totalSegsBelow = 0;
				while (col <= seg.rightCol) {
					segsBelow = this.getCellSegs(row, col, levelLimit);
					colSegsBelow.push(segsBelow);
					totalSegsBelow += segsBelow.length;
					col++;
				}

				if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
					td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
					rowspan = td.attr('rowspan') || 1;
					segMoreNodes = [];

					// make a replacement <td> for each column the segment occupies. will be one for each colspan
					for (j = 0; j < colSegsBelow.length; j++) {
						moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
						segsBelow = colSegsBelow[j];
						moreLink = this.renderMoreLink(
							row,
							seg.leftCol + j,
							[ seg ].concat(segsBelow) // count seg as hidden too
						);
						moreWrap = $('<div/>').append(moreLink);
						moreTd.append(moreWrap);
						segMoreNodes.push(moreTd[0]);
						moreNodes.push(moreTd[0]);
					}

					td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
					limitedNodes.push(td[0]);
				}
			}

			emptyCellsUntil(this.colCnt); // finish off the level
			rowStruct.moreEls = $(moreNodes); // for easy undoing later
			rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
		}
	},


	// Reveals all levels and removes all "more"-related elements for a grid's row.
	// `row` is a row number.
	unlimitRow: function(row) {
		var rowStruct = this.rowStructs[row];

		if (rowStruct.moreEls) {
			rowStruct.moreEls.remove();
			rowStruct.moreEls = null;
		}

		if (rowStruct.limitedEls) {
			rowStruct.limitedEls.removeClass('fc-limited');
			rowStruct.limitedEls = null;
		}
	},


	// Renders an <a> element that represents hidden event element for a cell.
	// Responsible for attaching click handler as well.
	renderMoreLink: function(row, col, hiddenSegs) {
		var _this = this;
		var view = this.view;

		return $('<a class="fc-more"/>')
			.text(
				this.getMoreLinkText(hiddenSegs.length)
			)
			.on('click', function(ev) {
				var clickOption = _this.opt('eventLimitClick');
				var date = _this.getCellDate(row, col);
				var moreEl = $(this);
				var dayEl = _this.getCellEl(row, col);
				var allSegs = _this.getCellSegs(row, col);

				// rescope the segments to be within the cell's date
				var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
				var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);

				if (typeof clickOption === 'function') {
					// the returned value can be an atomic option
					clickOption = _this.publiclyTrigger('eventLimitClick', {
						context: view,
						args: [
							{
								date: date.clone(),
								dayEl: dayEl,
								moreEl: moreEl,
								segs: reslicedAllSegs,
								hiddenSegs: reslicedHiddenSegs
							},
							ev,
							view
						]
					});
				}

				if (clickOption === 'popover') {
					_this.showSegPopover(row, col, moreEl, reslicedAllSegs);
				}
				else if (typeof clickOption === 'string') { // a view name
					view.calendar.zoomTo(date, clickOption);
				}
			});
	},


	// Reveals the popover that displays all events within a cell
	showSegPopover: function(row, col, moreLink, segs) {
		var _this = this;
		var view = this.view;
		var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
		var topEl; // the element we want to match the top coordinate of
		var options;

		if (this.rowCnt == 1) {
			topEl = view.el; // will cause the popover to cover any sort of header
		}
		else {
			topEl = this.rowEls.eq(row); // will align with top of row
		}

		options = {
			className: 'fc-more-popover ' + view.calendar.theme.getClass('popover'),
			content: this.renderSegPopoverContent(row, col, segs),
			parentEl: view.el, // attach to root of view. guarantees outside of scrollbars.
			top: topEl.offset().top,
			autoHide: true, // when the user clicks elsewhere, hide the popover
			viewportConstrain: this.opt('popoverViewportConstrain'),
			hide: function() {
				// kill everything when the popover is hidden
				// notify events to be removed
				if (_this.popoverSegs) {
					var seg;
					var legacy;
					var i;

					for (i = 0; i < _this.popoverSegs.length; ++i) {
						seg = _this.popoverSegs[i];
						legacy = seg.footprint.getEventLegacy();

						_this.publiclyTrigger('eventDestroy', {
							context: legacy,
							args: [ legacy, seg.el, view ]
						});
					}
				}
				_this.segPopover.removeElement();
				_this.segPopover = null;
				_this.popoverSegs = null;
			}
		};

		// Determine horizontal coordinate.
		// We use the moreWrap instead of the <td> to avoid border confusion.
		if (this.isRTL) {
			options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
		}
		else {
			options.left = moreWrap.offset().left - 1; // -1 to be over cell border
		}

		this.segPopover = new Popover(options);
		this.segPopover.show();

		// the popover doesn't live within the grid's container element, and thus won't get the event
		// delegated-handlers for free. attach event-related handlers to the popover.
		this.bindSegHandlersToEl(this.segPopover.el);
	},


	// Builds the inner DOM contents of the segment popover
	renderSegPopoverContent: function(row, col, segs) {
		var view = this.view;
		var theme = view.calendar.theme;
		var title = this.getCellDate(row, col).format(this.opt('dayPopoverFormat'));
		var content = $(
			'<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
				'<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
				'<span class="fc-title">' +
					htmlEscape(title) +
				'</span>' +
				'<div class="fc-clear"/>' +
			'</div>' +
			'<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
				'<div class="fc-event-container"></div>' +
			'</div>'
		);
		var segContainer = content.find('.fc-event-container');
		var i;

		// render each seg's `el` and only return the visible segs
		segs = this.renderFgSegEls(segs, true); // disableResizing=true
		this.popoverSegs = segs;

		for (i = 0; i < segs.length; i++) {

			// because segments in the popover are not part of a grid coordinate system, provide a hint to any
			// grids that want to do drag-n-drop about which cell it came from
			this.hitsNeeded();
			segs[i].hit = this.getCellHit(row, col);
			this.hitsNotNeeded();

			segContainer.append(segs[i].el);
		}

		return content;
	},


	// Given the events within an array of segment objects, reslice them to be in a single day
	resliceDaySegs: function(segs, dayDate) {
		var dayStart = dayDate.clone();
		var dayEnd = dayStart.clone().add(1, 'days');
		var dayRange = new UnzonedRange(dayStart, dayEnd);
		var newSegs = [];
		var i;

		for (i = 0; i < segs.length; i++) {
			newSegs.push.apply(newSegs, // append
				this.eventFootprintToSegs(segs[i].footprint, dayRange)
			);
		}

		// force an order because eventsToSegs doesn't guarantee one
		// TODO: research if still needed
		this.sortEventSegs(newSegs);

		return newSegs;
	},


	// Generates the text that should be inside a "more" link, given the number of events it represents
	getMoreLinkText: function(num) {
		var opt = this.opt('eventLimitText');

		if (typeof opt === 'function') {
			return opt(num);
		}
		else {
			return '+' + num + ' ' + opt;
		}
	},


	// Returns segments within a given cell.
	// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
	getCellSegs: function(row, col, startLevel) {
		var segMatrix = this.rowStructs[row].segMatrix;
		var level = startLevel || 0;
		var segs = [];
		var seg;

		while (level < segMatrix.length) {
			seg = segMatrix[level][col];
			if (seg) {
				segs.push(seg);
			}
			level++;
		}

		return segs;
	}

});

;;

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
// We mixin DayTable, even though there is only a single row of days

var TimeGrid = FC.TimeGrid = Grid.extend(DayTableMixin, {

	dayRanges: null, // UnzonedRange[], of start-end of each day
	slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
	snapDuration: null, // granularity of time for dragging and selecting
	snapsPerSlot: null,
	labelFormat: null, // formatting string for times running along vertical axis
	labelInterval: null, // duration of how often a label should be displayed for a slot

	colEls: null, // cells elements in the day-row background
	slatContainerEl: null, // div that wraps all the slat rows
	slatEls: null, // elements running horizontally across all columns
	nowIndicatorEls: null,

	colCoordCache: null,
	slatCoordCache: null,


	constructor: function() {
		Grid.apply(this, arguments); // call the super-constructor

		this.processOptions();
	},


	// Renders the time grid into `this.el`, which should already be assigned.
	// Relies on the view's colCnt. In the future, this component should probably be self-sufficient.
	renderDates: function() {
		this.el.html(this.renderHtml());
		this.colEls = this.el.find('.fc-day, .fc-disabled-day');
		this.slatContainerEl = this.el.find('.fc-slats');
		this.slatEls = this.slatContainerEl.find('tr');

		this.colCoordCache = new CoordCache({
			els: this.colEls,
			isHorizontal: true
		});
		this.slatCoordCache = new CoordCache({
			els: this.slatEls,
			isVertical: true
		});

		this.renderContentSkeleton();
	},


	// Renders the basic HTML skeleton for the grid
	renderHtml: function() {
		var theme = this.view.calendar.theme;

		return '' +
			'<div class="fc-bg">' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					this.renderBgTrHtml(0) + // row=0
				'</table>' +
			'</div>' +
			'<div class="fc-slats">' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					this.renderSlatRowHtml() +
				'</table>' +
			'</div>';
	},


	// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
	renderSlatRowHtml: function() {
		var view = this.view;
		var calendar = view.calendar;
		var theme = calendar.theme;
		var isRTL = this.isRTL;
		var html = '';
		var slotTime = moment.duration(+this.view.minTime); // wish there was .clone() for durations
		var slotIterator = moment.duration(0);
		var slotDate; // will be on the view's first day, but we only care about its time
		var isLabeled;
		var axisHtml;

		// Calculate the time for each slot
		while (slotTime < view.maxTime) {
			slotDate = calendar.msToUtcMoment(this.unzonedRange.startMs).time(slotTime);
			isLabeled = isInt(divideDurationByDuration(slotIterator, this.labelInterval));

			axisHtml =
				'<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
					(isLabeled ?
						'<span>' + // for matchCellWidths
							htmlEscape(slotDate.format(this.labelFormat)) +
						'</span>' :
						''
						) +
				'</td>';

			html +=
				'<tr data-time="' + slotDate.format('HH:mm:ss') + '"' +
					(isLabeled ? '' : ' class="fc-minor"') +
					'>' +
					(!isRTL ? axisHtml : '') +
					'<td class="' + theme.getClass('widgetContent') + '"/>' +
					(isRTL ? axisHtml : '') +
				"</tr>";

			slotTime.add(this.slotDuration);
			slotIterator.add(this.slotDuration);
		}

		return html;
	},


	/* Options
	------------------------------------------------------------------------------------------------------------------*/


	// Parses various options into properties of this object
	processOptions: function() {
		var slotDuration = this.opt('slotDuration');
		var snapDuration = this.opt('snapDuration');
		var input;

		slotDuration = moment.duration(slotDuration);
		snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;

		this.slotDuration = slotDuration;
		this.snapDuration = snapDuration;
		this.snapsPerSlot = slotDuration / snapDuration; // TODO: ensure an integer multiple?

		// might be an array value (for TimelineView).
		// if so, getting the most granular entry (the last one probably).
		input = this.opt('slotLabelFormat');
		if ($.isArray(input)) {
			input = input[input.length - 1];
		}

		this.labelFormat = input ||
			this.opt('smallTimeFormat'); // the computed default

		input = this.opt('slotLabelInterval');
		this.labelInterval = input ?
			moment.duration(input) :
			this.computeLabelInterval(slotDuration);
	},


	// Computes an automatic value for slotLabelInterval
	computeLabelInterval: function(slotDuration) {
		var i;
		var labelInterval;
		var slotsPerLabel;

		// find the smallest stock label interval that results in more than one slots-per-label
		for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
			labelInterval = moment.duration(AGENDA_STOCK_SUB_DURATIONS[i]);
			slotsPerLabel = divideDurationByDuration(labelInterval, slotDuration);
			if (isInt(slotsPerLabel) && slotsPerLabel > 1) {
				return labelInterval;
			}
		}

		return moment.duration(slotDuration); // fall back. clone
	},


	// Computes a default event time formatting string if `timeFormat` is not explicitly defined
	computeEventTimeFormat: function() {
		return this.opt('noMeridiemTimeFormat'); // like "6:30" (no AM/PM)
	},


	// Computes a default `displayEventEnd` value if one is not expliclty defined
	computeDisplayEventEnd: function() {
		return true;
	},


	/* Hit System
	------------------------------------------------------------------------------------------------------------------*/


	prepareHits: function() {
		this.colCoordCache.build();
		this.slatCoordCache.build();
	},


	releaseHits: function() {
		this.colCoordCache.clear();
		// NOTE: don't clear slatCoordCache because we rely on it for computeTimeTop
	},


	queryHit: function(leftOffset, topOffset) {
		var snapsPerSlot = this.snapsPerSlot;
		var colCoordCache = this.colCoordCache;
		var slatCoordCache = this.slatCoordCache;

		if (colCoordCache.isLeftInBounds(leftOffset) && slatCoordCache.isTopInBounds(topOffset)) {
			var colIndex = colCoordCache.getHorizontalIndex(leftOffset);
			var slatIndex = slatCoordCache.getVerticalIndex(topOffset);

			if (colIndex != null && slatIndex != null) {
				var slatTop = slatCoordCache.getTopOffset(slatIndex);
				var slatHeight = slatCoordCache.getHeight(slatIndex);
				var partial = (topOffset - slatTop) / slatHeight; // floating point number between 0 and 1
				var localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat
				var snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
				var snapTop = slatTop + (localSnapIndex / snapsPerSlot) * slatHeight;
				var snapBottom = slatTop + ((localSnapIndex + 1) / snapsPerSlot) * slatHeight;

				return {
					col: colIndex,
					snap: snapIndex,
					component: this, // needed unfortunately :(
					left: colCoordCache.getLeftOffset(colIndex),
					right: colCoordCache.getRightOffset(colIndex),
					top: snapTop,
					bottom: snapBottom
				};
			}
		}
	},


	getHitFootprint: function(hit) {
		var start = this.getCellDate(0, hit.col); // row=0
		var time = this.computeSnapTime(hit.snap); // pass in the snap-index
		var end;

		start.time(time);
		end = start.clone().add(this.snapDuration);

		return new ComponentFootprint(
			new UnzonedRange(start, end),
			false // all-day?
		);
	},


	getHitEl: function(hit) {
		return this.colEls.eq(hit.col);
	},


	/* Dates
	------------------------------------------------------------------------------------------------------------------*/


	rangeUpdated: function() {
		var view = this.view;

		this.updateDayTable();

		this.dayRanges = this.dayDates.map(function(dayDate) {
			return new UnzonedRange(
				dayDate.clone().add(view.minTime),
				dayDate.clone().add(view.maxTime)
			);
		});
	},


	// Given a row number of the grid, representing a "snap", returns a time (Duration) from its start-of-day
	computeSnapTime: function(snapIndex) {
		return moment.duration(this.view.minTime + this.snapDuration * snapIndex);
	},


	// Slices up the given span (unzoned start/end with other misc data) into an array of segments
	componentFootprintToSegs: function(componentFootprint) {
		var segs = this.sliceRangeByTimes(componentFootprint.unzonedRange);
		var i;

		for (i = 0; i < segs.length; i++) {
			if (this.isRTL) {
				segs[i].col = this.daysPerRow - 1 - segs[i].dayIndex;
			}
			else {
				segs[i].col = segs[i].dayIndex;
			}
		}

		return segs;
	},


	sliceRangeByTimes: function(unzonedRange) {
		var segs = [];
		var segRange;
		var dayIndex;

		for (dayIndex = 0; dayIndex < this.daysPerRow; dayIndex++) {

			segRange = unzonedRange.intersect(this.dayRanges[dayIndex]);

			if (segRange) {
				segs.push({
					startMs: segRange.startMs,
					endMs: segRange.endMs,
					isStart: segRange.isStart,
					isEnd: segRange.isEnd,
					dayIndex: dayIndex
				});
			}
		}

		return segs;
	},


	/* Coordinates
	------------------------------------------------------------------------------------------------------------------*/


	updateSize: function(isResize) { // NOT a standard Grid method
		this.slatCoordCache.build();

		if (isResize) {
			this.updateSegVerticals(
				[].concat(this.fgSegs || [], this.bgSegs || [], this.businessSegs || [])
			);
		}
	},


	getTotalSlatHeight: function() {
		return this.slatContainerEl.outerHeight();
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given date.
	// `ms` can be a millisecond UTC time OR a UTC moment.
	// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
	computeDateTop: function(ms, startOfDayDate) {
		return this.computeTimeTop(
			moment.duration(
				ms - startOfDayDate.clone().stripTime()
			)
		);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
	computeTimeTop: function(time) {
		var len = this.slatEls.length;
		var slatCoverage = (time - this.view.minTime) / this.slotDuration; // floating-point value of # of slots covered
		var slatIndex;
		var slatRemainder;

		// compute a floating-point number for how many slats should be progressed through.
		// from 0 to number of slats (inclusive)
		// constrained because minTime/maxTime might be customized.
		slatCoverage = Math.max(0, slatCoverage);
		slatCoverage = Math.min(len, slatCoverage);

		// an integer index of the furthest whole slat
		// from 0 to number slats (*exclusive*, so len-1)
		slatIndex = Math.floor(slatCoverage);
		slatIndex = Math.min(slatIndex, len - 1);

		// how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
		// could be 1.0 if slatCoverage is covering *all* the slots
		slatRemainder = slatCoverage - slatIndex;

		return this.slatCoordCache.getTopPosition(slatIndex) +
			this.slatCoordCache.getHeight(slatIndex) * slatRemainder;
	},



	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the specified date(s).
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(eventFootprints, seg) {
		var i;

		if (seg) { // if there is event information for this drag, render a helper event

			// returns mock event elements
			// signal that a helper has been rendered
			return this.renderHelperEventFootprints(eventFootprints);
		}
		else { // otherwise, just render a highlight

			for (i = 0; i < eventFootprints.length; i++) {
				this.renderHighlight(eventFootprints[i].componentFootprint);
			}
		}
	},


	// Unrenders any visual indication of an event being dragged
	unrenderDrag: function() {
		this.unrenderHelper();
		this.unrenderHighlight();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderEventResize: function(eventFootprints, seg) {
		return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
	},


	// Unrenders any visual indication of an event being resized
	unrenderEventResize: function() {
		this.unrenderHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the original segment object and might be null (an external drag)
	renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
		var segs = this.eventFootprintsToSegs(eventFootprints);

		return this.renderHelperSegs( // returns mock event elements
			segs,
			sourceSeg
		);
	},


	// Unrenders any mock helper event
	unrenderHelper: function() {
		this.unrenderHelperSegs();
	},


	/* Business Hours
	------------------------------------------------------------------------------------------------------------------*/


	renderBusinessHours: function() {
		this.renderBusinessSegs(
			this.buildBusinessHourSegs()
		);
	},


	unrenderBusinessHours: function() {
		this.unrenderBusinessSegs();
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	getNowIndicatorUnit: function() {
		return 'minute'; // will refresh on the minute
	},


	renderNowIndicator: function(date) {
		// seg system might be overkill, but it handles scenario where line needs to be rendered
		//  more than once because of columns with the same date (resources columns for example)
		var segs = this.componentFootprintToSegs(
			new ComponentFootprint(
				new UnzonedRange(date, date.valueOf() + 1), // protect against null range
				false // all-day
			)
		);
		var top = this.computeDateTop(date, date);
		var nodes = [];
		var i;

		// render lines within the columns
		for (i = 0; i < segs.length; i++) {
			nodes.push($('<div class="fc-now-indicator fc-now-indicator-line"></div>')
				.css('top', top)
				.appendTo(this.colContainerEls.eq(segs[i].col))[0]);
		}

		// render an arrow over the axis
		if (segs.length > 0) { // is the current time in view?
			nodes.push($('<div class="fc-now-indicator fc-now-indicator-arrow"></div>')
				.css('top', top)
				.appendTo(this.el.find('.fc-content-skeleton'))[0]);
		}

		this.nowIndicatorEls = $(nodes);
	},


	unrenderNowIndicator: function() {
		if (this.nowIndicatorEls) {
			this.nowIndicatorEls.remove();
			this.nowIndicatorEls = null;
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
	renderSelectionFootprint: function(componentFootprint) {
		if (this.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
			this.renderHelperEventFootprints([
				this.fabricateEventFootprint(componentFootprint)
			]);
		}
		else {
			this.renderHighlight(componentFootprint);
		}
	},


	// Unrenders any visual indication of a selection
	unrenderSelection: function() {
		this.unrenderHelper();
		this.unrenderHighlight();
	},


	/* Highlight
	------------------------------------------------------------------------------------------------------------------*/


	renderHighlight: function(componentFootprint) {
		this.renderHighlightSegs(
			this.componentFootprintToSegs(componentFootprint)
		);
	},


	unrenderHighlight: function() {
		this.unrenderHighlightSegs();
	}

});

;;

/* Methods for rendering SEGMENTS, pieces of content that live on the view
 ( this file is no longer just for events )
----------------------------------------------------------------------------------------------------------------------*/

TimeGrid.mixin({

	colContainerEls: null, // containers for each column

	// inner-containers for each column where different types of segs live
	fgContainerEls: null,
	bgContainerEls: null,
	helperContainerEls: null,
	highlightContainerEls: null,
	businessContainerEls: null,

	// arrays of different types of displayed segments
	fgSegs: null,
	bgSegs: null,
	helperSegs: null,
	highlightSegs: null,
	businessSegs: null,


	// Renders the DOM that the view's content will live in
	renderContentSkeleton: function() {
		var cellHtml = '';
		var i;
		var skeletonEl;

		for (i = 0; i < this.colCnt; i++) {
			cellHtml +=
				'<td>' +
					'<div class="fc-content-col">' +
						'<div class="fc-event-container fc-helper-container"></div>' +
						'<div class="fc-event-container"></div>' +
						'<div class="fc-highlight-container"></div>' +
						'<div class="fc-bgevent-container"></div>' +
						'<div class="fc-business-container"></div>' +
					'</div>' +
				'</td>';
		}

		skeletonEl = $(
			'<div class="fc-content-skeleton">' +
				'<table>' +
					'<tr>' + cellHtml + '</tr>' +
				'</table>' +
			'</div>'
		);

		this.colContainerEls = skeletonEl.find('.fc-content-col');
		this.helperContainerEls = skeletonEl.find('.fc-helper-container');
		this.fgContainerEls = skeletonEl.find('.fc-event-container:not(.fc-helper-container)');
		this.bgContainerEls = skeletonEl.find('.fc-bgevent-container');
		this.highlightContainerEls = skeletonEl.find('.fc-highlight-container');
		this.businessContainerEls = skeletonEl.find('.fc-business-container');

		this.bookendCells(skeletonEl.find('tr')); // TODO: do this on string level
		this.el.append(skeletonEl);
	},


	/* Foreground Events
	------------------------------------------------------------------------------------------------------------------*/


	renderFgSegs: function(segs) {
		segs = this.renderFgSegsIntoContainers(segs, this.fgContainerEls);
		this.fgSegs = segs;
		return segs; // needed for Grid::renderEvents
	},


	unrenderFgSegs: function() {
		this.unrenderNamedSegs('fgSegs');
	},


	/* Foreground Helper Events
	------------------------------------------------------------------------------------------------------------------*/


	renderHelperSegs: function(segs, sourceSeg) {
		var helperEls = [];
		var i, seg;
		var sourceEl;

		segs = this.renderFgSegsIntoContainers(segs, this.helperContainerEls);

		// Try to make the segment that is in the same row as sourceSeg look the same
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			if (sourceSeg && sourceSeg.col === seg.col) {
				sourceEl = sourceSeg.el;
				seg.el.css({
					left: sourceEl.css('left'),
					right: sourceEl.css('right'),
					'margin-left': sourceEl.css('margin-left'),
					'margin-right': sourceEl.css('margin-right')
				});
			}
			helperEls.push(seg.el[0]);
		}

		this.helperSegs = segs;

		return $(helperEls); // must return rendered helpers
	},


	unrenderHelperSegs: function() {
		this.unrenderNamedSegs('helperSegs');
	},


	/* Background Events
	------------------------------------------------------------------------------------------------------------------*/


	renderBgSegs: function(segs) {
		segs = this.renderFillSegEls('bgEvent', segs); // TODO: old fill system
		this.updateSegVerticals(segs);
		this.attachSegsByCol(this.groupSegsByCol(segs), this.bgContainerEls);
		this.bgSegs = segs;
		return segs; // needed for Grid::renderEvents
	},


	unrenderBgSegs: function() {
		this.unrenderNamedSegs('bgSegs');
	},


	/* Highlight
	------------------------------------------------------------------------------------------------------------------*/


	renderHighlightSegs: function(segs) {
		segs = this.renderFillSegEls('highlight', segs); // TODO: instead of calling renderFill directly
		this.updateSegVerticals(segs);
		this.attachSegsByCol(this.groupSegsByCol(segs), this.highlightContainerEls);
		this.highlightSegs = segs;
	},


	unrenderHighlightSegs: function() {
		this.unrenderNamedSegs('highlightSegs');
	},


	/* Business Hours
	------------------------------------------------------------------------------------------------------------------*/


	renderBusinessSegs: function(segs) {
		segs = this.renderFillSegEls('businessHours', segs); // TODO: instead of calling renderFill directly
		this.updateSegVerticals(segs);
		this.attachSegsByCol(this.groupSegsByCol(segs), this.businessContainerEls);
		this.businessSegs = segs;
	},


	unrenderBusinessSegs: function() {
		this.unrenderNamedSegs('businessSegs');
	},


	/* Seg Rendering Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
	groupSegsByCol: function(segs) {
		var segsByCol = [];
		var i;

		for (i = 0; i < this.colCnt; i++) {
			segsByCol.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segsByCol[segs[i].col].push(segs[i]);
		}

		return segsByCol;
	},


	// Given segments grouped by column, insert the segments' elements into a parallel array of container
	// elements, each living within a column.
	attachSegsByCol: function(segsByCol, containerEls) {
		var col;
		var segs;
		var i;

		for (col = 0; col < this.colCnt; col++) { // iterate each column grouping
			segs = segsByCol[col];

			for (i = 0; i < segs.length; i++) {
				containerEls.eq(col).append(segs[i].el);
			}
		}
	},


	// Given the name of a property of `this` object, assumed to be an array of segments,
	// loops through each segment and removes from DOM. Will null-out the property afterwards.
	unrenderNamedSegs: function(propName) {
		var segs = this[propName];
		var i;

		if (segs) {
			for (i = 0; i < segs.length; i++) {
				segs[i].el.remove();
			}
			this[propName] = null;
		}
	},



	/* Foreground Event Rendering Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Given an array of foreground segments, render a DOM element for each, computes position,
	// and attaches to the column inner-container elements.
	renderFgSegsIntoContainers: function(segs, containerEls) {
		var segsByCol;
		var col;

		segs = this.renderFgSegEls(segs); // will call fgSegHtml
		segsByCol = this.groupSegsByCol(segs);

		for (col = 0; col < this.colCnt; col++) {
			this.updateFgSegCoords(segsByCol[col]);
		}

		this.attachSegsByCol(segsByCol, containerEls);

		return segs;
	},


	// Renders the HTML for a single event segment's default rendering
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var calendar = view.calendar;
		var componentFootprint = seg.footprint.componentFootprint;
		var isAllDay = componentFootprint.isAllDay;
		var eventDef = seg.footprint.eventDef;
		var isDraggable = view.isEventDefDraggable(eventDef);
		var isResizableFromStart = !disableResizing && seg.isStart && view.isEventDefResizableFromStart(eventDef);
		var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
		var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
		var skinCss = cssToStr(this.getSegSkinCss(seg));
		var timeText;
		var fullTimeText; // more verbose time text. for the print stylesheet
		var startTimeText; // just the start time text

		classes.unshift('fc-time-grid-event', 'fc-v-event');

		// if the event appears to span more than one day...
		if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
			// Don't display time text on segments that run entirely through a day.
			// That would appear as midnight-midnight and would look dumb.
			// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
			if (seg.isStart || seg.isEnd) {
				var zonedStart = calendar.msToMoment(seg.startMs);
				var zonedEnd = calendar.msToMoment(seg.endMs);
				timeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay);
				fullTimeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay, 'LT');
				startTimeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay, null, false); // displayEnd=false
			}
		}
		else {
			// Display the normal time text for the *event's* times
			timeText = this.getEventTimeText(seg.footprint);
			fullTimeText = this.getEventTimeText(seg.footprint, 'LT');
			startTimeText = this.getEventTimeText(seg.footprint, null, false); // displayEnd=false
		}

		return '<a class="' + classes.join(' ') + '"' +
			(eventDef.url ?
				' href="' + htmlEscape(eventDef.url) + '"' :
				''
				) +
			(skinCss ?
				' style="' + skinCss + '"' :
				''
				) +
			'>' +
				'<div class="fc-content">' +
					(timeText ?
						'<div class="fc-time"' +
						' data-start="' + htmlEscape(startTimeText) + '"' +
						' data-full="' + htmlEscape(fullTimeText) + '"' +
						'>' +
							'<span>' + htmlEscape(timeText) + '</span>' +
						'</div>' :
						''
						) +
					(eventDef.title ?
						'<div class="fc-title">' +
							htmlEscape(eventDef.title) +
						'</div>' :
						''
						) +
				'</div>' +
				'<div class="fc-bg"/>' +
				/* TODO: write CSS for this
				(isResizableFromStart ?
					'<div class="fc-resizer fc-start-resizer" />' :
					''
					) +
				*/
				(isResizableFromEnd ?
					'<div class="fc-resizer fc-end-resizer" />' :
					''
					) +
			'</a>';
	},


	/* Seg Position Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the CSS top/bottom coordinates for each segment element.
	// Works when called after initial render, after a window resize/zoom for example.
	updateSegVerticals: function(segs) {
		this.computeSegVerticals(segs);
		this.assignSegVerticals(segs);
	},


	// For each segment in an array, computes and assigns its top and bottom properties
	computeSegVerticals: function(segs) {
		var i, seg;
		var dayDate;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			dayDate = this.dayDates[seg.dayIndex];

			seg.top = this.computeDateTop(seg.startMs, dayDate);
			seg.bottom = this.computeDateTop(seg.endMs, dayDate);
		}
	},


	// Given segments that already have their top/bottom properties computed, applies those values to
	// the segments' elements.
	assignSegVerticals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.el.css(this.generateSegVerticalCss(seg));
		}
	},


	// Generates an object with CSS properties for the top/bottom coordinates of a segment element
	generateSegVerticalCss: function(seg) {
		return {
			top: seg.top,
			bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
		};
	},


	/* Foreground Event Positioning Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Given segments that are assumed to all live in the *same column*,
	// compute their verical/horizontal coordinates and assign to their elements.
	updateFgSegCoords: function(segs) {
		this.computeSegVerticals(segs); // horizontals relies on this
		this.computeFgSegHorizontals(segs); // compute horizontal coordinates, z-index's, and reorder the array
		this.assignSegVerticals(segs);
		this.assignFgSegHorizontals(segs);
	},


	// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
	// NOTE: Also reorders the given array by date!
	computeFgSegHorizontals: function(segs) {
		var levels;
		var level0;
		var i;

		this.sortEventSegs(segs); // order by certain criteria
		levels = buildSlotSegLevels(segs);
		computeForwardSlotSegs(levels);

		if ((level0 = levels[0])) {

			for (i = 0; i < level0.length; i++) {
				computeSlotSegPressures(level0[i]);
			}

			for (i = 0; i < level0.length; i++) {
				this.computeFgSegForwardBack(level0[i], 0, 0);
			}
		}
	},


	// Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
	// from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
	// seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
	//
	// The segment might be part of a "series", which means consecutive segments with the same pressure
	// who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
	// segments behind this one in the current series, and `seriesBackwardCoord` is the starting
	// coordinate of the first segment in the series.
	computeFgSegForwardBack: function(seg, seriesBackwardPressure, seriesBackwardCoord) {
		var forwardSegs = seg.forwardSegs;
		var i;

		if (seg.forwardCoord === undefined) { // not already computed

			if (!forwardSegs.length) {

				// if there are no forward segments, this segment should butt up against the edge
				seg.forwardCoord = 1;
			}
			else {

				// sort highest pressure first
				this.sortForwardSegs(forwardSegs);

				// this segment's forwardCoord will be calculated from the backwardCoord of the
				// highest-pressure forward segment.
				this.computeFgSegForwardBack(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
				seg.forwardCoord = forwardSegs[0].backwardCoord;
			}

			// calculate the backwardCoord from the forwardCoord. consider the series
			seg.backwardCoord = seg.forwardCoord -
				(seg.forwardCoord - seriesBackwardCoord) / // available width for series
				(seriesBackwardPressure + 1); // # of segments in the series

			// use this segment's coordinates to computed the coordinates of the less-pressurized
			// forward segments
			for (i=0; i<forwardSegs.length; i++) {
				this.computeFgSegForwardBack(forwardSegs[i], 0, seg.forwardCoord);
			}
		}
	},


	sortForwardSegs: function(forwardSegs) {
		forwardSegs.sort(proxy(this, 'compareForwardSegs'));
	},


	// A cmp function for determining which forward segment to rely on more when computing coordinates.
	compareForwardSegs: function(seg1, seg2) {
		// put higher-pressure first
		return seg2.forwardPressure - seg1.forwardPressure ||
			// put segments that are closer to initial edge first (and favor ones with no coords yet)
			(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
			// do normal sorting...
			this.compareEventSegs(seg1, seg2);
	},


	// Given foreground event segments that have already had their position coordinates computed,
	// assigns position-related CSS values to their elements.
	assignFgSegHorizontals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.el.css(this.generateFgSegHorizontalCss(seg));

			// if the height is short, add a className for alternate styling
			if (seg.bottom - seg.top < 30) {
				seg.el.addClass('fc-short');
			}
		}
	},


	// Generates an object with CSS properties/values that should be applied to an event segment element.
	// Contains important positioning-related properties that should be applied to any event element, customized or not.
	generateFgSegHorizontalCss: function(seg) {
		var shouldOverlap = this.opt('slotEventOverlap');
		var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
		var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
		var props = this.generateSegVerticalCss(seg); // get top/bottom first
		var left; // amount of space from left edge, a fraction of the total width
		var right; // amount of space from right edge, a fraction of the total width

		if (shouldOverlap) {
			// double the width, but don't go beyond the maximum forward coordinate (1.0)
			forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
		}

		if (this.isRTL) {
			left = 1 - forwardCoord;
			right = backwardCoord;
		}
		else {
			left = backwardCoord;
			right = 1 - forwardCoord;
		}

		props.zIndex = seg.level + 1; // convert from 0-base to 1-based
		props.left = left * 100 + '%';
		props.right = right * 100 + '%';

		if (shouldOverlap && seg.forwardPressure) {
			// add padding to the edge so that forward stacked events don't cover the resizer's icon
			props[this.isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
		}

		return props;
	}

});


// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
	var levels = [];
	var i, seg;
	var j;

	for (i=0; i<segs.length; i++) {
		seg = segs[i];

		// go through all the levels and stop on the first level where there are no collisions
		for (j=0; j<levels.length; j++) {
			if (!computeSlotSegCollisions(seg, levels[j]).length) {
				break;
			}
		}

		seg.level = j;

		(levels[j] || (levels[j] = [])).push(seg);
	}

	return levels;
}


// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
	var i, level;
	var j, seg;
	var k;

	for (i=0; i<levels.length; i++) {
		level = levels[i];

		for (j=0; j<level.length; j++) {
			seg = level[j];

			seg.forwardSegs = [];
			for (k=i+1; k<levels.length; k++) {
				computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
			}
		}
	}
}


// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
	var forwardSegs = seg.forwardSegs;
	var forwardPressure = 0;
	var i, forwardSeg;

	if (seg.forwardPressure === undefined) { // not already computed

		for (i=0; i<forwardSegs.length; i++) {
			forwardSeg = forwardSegs[i];

			// figure out the child's maximum forward path
			computeSlotSegPressures(forwardSeg);

			// either use the existing maximum, or use the child's forward pressure
			// plus one (for the forwardSeg itself)
			forwardPressure = Math.max(
				forwardPressure,
				1 + forwardSeg.forwardPressure
			);
		}

		seg.forwardPressure = forwardPressure;
	}
}


// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
	results = results || [];

	for (var i=0; i<otherSegs.length; i++) {
		if (isSlotSegCollision(seg, otherSegs[i])) {
			results.push(otherSegs[i]);
		}
	}

	return results;
}


// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
	return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}

;;

/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/

var View = FC.View = ChronoComponent.extend({

	type: null, // subclass' view name (string)
	name: null, // deprecated. use `type` instead
	title: null, // the text that will be displayed in the header's title

	calendar: null, // owner Calendar object
	viewSpec: null,
	options: null, // hash containing all options. already merged with view-specific-options

	renderQueue: null,
	batchRenderDepth: 0,
	isDatesRendered: false,
	isEventsRendered: false,
	isBaseRendered: false, // related to viewRender/viewDestroy triggers

	queuedScroll: null,

	isSelected: false, // boolean whether a range of time is user-selected or not
	selectedEventInstance: null,

	eventOrderSpecs: null, // criteria for ordering events when they have same date/time

	// for date utils, computed from options
	isHiddenDayHash: null,

	// now indicator
	isNowIndicatorRendered: null,
	initialNowDate: null, // result first getNow call
	initialNowQueriedMs: null, // ms time the getNow was called
	nowIndicatorTimeoutID: null, // for refresh timing of now indicator
	nowIndicatorIntervalID: null, // "


	constructor: function(calendar, viewSpec) {
		this.calendar = calendar;
		this.viewSpec = viewSpec;

		// shortcuts
		this.type = viewSpec.type;
		this.options = viewSpec.options;

		// .name is deprecated
		this.name = this.type;

		ChronoComponent.call(this);

		this.initHiddenDays();
		this.eventOrderSpecs = parseFieldSpecs(this.opt('eventOrder'));

		this.renderQueue = this.buildRenderQueue();
		this.initAutoBatchRender();

		this.initialize();
	},


	buildRenderQueue: function() {
		var _this = this;
		var renderQueue = new RenderQueue({
			event: this.opt('eventRenderWait')
		});

		renderQueue.on('start', function() {
			_this.freezeHeight();
			_this.addScroll(_this.queryScroll());
		});

		renderQueue.on('stop', function() {
			_this.thawHeight();
			_this.popScroll();
		});

		return renderQueue;
	},


	initAutoBatchRender: function() {
		var _this = this;

		this.on('before:change', function() {
			_this.startBatchRender();
		});

		this.on('change', function() {
			_this.stopBatchRender();
		});
	},


	startBatchRender: function() {
		if (!(this.batchRenderDepth++)) {
			this.renderQueue.pause();
		}
	},


	stopBatchRender: function() {
		if (!(--this.batchRenderDepth)) {
			this.renderQueue.resume();
		}
	},


	// A good place for subclasses to initialize member variables
	initialize: function() {
		// subclasses can implement
	},


	// Retrieves an option with the given name
	opt: function(name) {
		return this.options[name];
	},


	/* Title and Date Formatting
	------------------------------------------------------------------------------------------------------------------*/


	// Computes what the title at the top of the calendar should be for this view
	computeTitle: function() {
		var unzonedRange;

		// for views that span a large unit of time, show the proper interval, ignoring stray days before and after
		if (/^(year|month)$/.test(this.currentRangeUnit)) {
			unzonedRange = this.currentUnzonedRange;
		}
		else { // for day units or smaller, use the actual day range
			unzonedRange = this.activeUnzonedRange;
		}

		return this.formatRange(
			{
				start: this.calendar.msToMoment(unzonedRange.startMs, this.isRangeAllDay),
				end: this.calendar.msToMoment(unzonedRange.endMs, this.isRangeAllDay)
			},
			this.isRangeAllDay,
			this.opt('titleFormat') || this.computeTitleFormat(),
			this.opt('titleRangeSeparator')
		);
	},


	// Generates the format string that should be used to generate the title for the current date range.
	// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
	computeTitleFormat: function() {
		if (this.currentRangeUnit == 'year') {
			return 'YYYY';
		}
		else if (this.currentRangeUnit == 'month') {
			return this.opt('monthYearFormat'); // like "September 2014"
		}
		else if (this.currentRangeAs('days') > 1) {
			return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
		}
		else {
			return 'LL'; // one day. longer, like "September 9 2014"
		}
	},


	// Element
	// -----------------------------------------------------------------------------------------------------------------


	setElement: function(el) {
		ChronoComponent.prototype.setElement.apply(this, arguments);

		this.bindBaseRenderHandlers();
	},


	removeElement: function() {
		this.unsetDate();
		this.unbindBaseRenderHandlers();

		ChronoComponent.prototype.removeElement.apply(this, arguments);
	},


	// Date Setting/Unsetting
	// -----------------------------------------------------------------------------------------------------------------


	setDate: function(date) {
		var currentDateProfile = this.get('dateProfile');
		var newDateProfile = this.buildDateProfile(date, null, true); // forceToValid=true

		if (
			!currentDateProfile ||
			!currentDateProfile.activeUnzonedRange.equals(newDateProfile.activeUnzonedRange)
		) {
			this.set('dateProfile', newDateProfile);
		}

		return newDateProfile.date;
	},


	unsetDate: function() {
		this.unset('dateProfile');
	},


	// Date Rendering
	// -----------------------------------------------------------------------------------------------------------------


	requestDateRender: function(dateProfile) {
		var _this = this;

		this.renderQueue.queue(function() {
			_this.executeDateRender(dateProfile);
		}, 'date', 'init');
	},


	requestDateUnrender: function() {
		var _this = this;

		this.renderQueue.queue(function() {
			_this.executeDateUnrender();
		}, 'date', 'destroy');
	},


	// Event Data
	// -----------------------------------------------------------------------------------------------------------------


	fetchInitialEvents: function(dateProfile) {
		var calendar = this.calendar;
		var forceAllDay = dateProfile.isRangeAllDay && !this.usesMinMaxTime;

		return calendar.requestEvents(
			calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, forceAllDay),
			calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, forceAllDay)
		);
	},


	bindEventChanges: function() {
		this.listenTo(this.calendar, 'eventsReset', this.resetEvents);
	},


	unbindEventChanges: function() {
		this.stopListeningTo(this.calendar, 'eventsReset');
	},


	setEvents: function(eventsPayload) {
		this.set('currentEvents', eventsPayload);
		this.set('hasEvents', true);
	},


	unsetEvents: function() {
		this.unset('currentEvents');
		this.unset('hasEvents');
	},


	resetEvents: function(eventsPayload) {
		this.startBatchRender();
		this.unsetEvents();
		this.setEvents(eventsPayload);
		this.stopBatchRender();
	},


	// Event Rendering
	// -----------------------------------------------------------------------------------------------------------------


	requestEventsRender: function(eventsPayload) {
		var _this = this;

		this.renderQueue.queue(function() {
			_this.executeEventsRender(eventsPayload);
		}, 'event', 'init');
	},


	requestEventsUnrender: function() {
		var _this = this;

		this.renderQueue.queue(function() {
			_this.executeEventsUnrender();
		}, 'event', 'destroy');
	},


	// Date High-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	// if dateProfile not specified, uses current
	executeDateRender: function(dateProfile, skipScroll) {

		this.setDateProfileForRendering(dateProfile);

		if (this.render) {
			this.render(); // TODO: deprecate
		}

		this.renderDates();
		this.updateSize();
		this.renderBusinessHours(); // might need coordinates, so should go after updateSize()
		this.startNowIndicator();

		if (!skipScroll) {
			this.addScroll(this.computeInitialDateScroll());
		}

		this.isDatesRendered = true;
		this.trigger('datesRendered');
	},


	executeDateUnrender: function() {

		this.unselect();
		this.stopNowIndicator();

		this.trigger('before:datesUnrendered');

		this.unrenderBusinessHours();
		this.unrenderDates();

		if (this.destroy) {
			this.destroy(); // TODO: deprecate
		}

		this.isDatesRendered = false;
	},


	// Determing when the "meat" of the view is rendered (aka the base)
	// -----------------------------------------------------------------------------------------------------------------


	bindBaseRenderHandlers: function() {
		var _this = this;

		this.on('datesRendered.baseHandler', function() {
			_this.onBaseRender();
		});

		this.on('before:datesUnrendered.baseHandler', function() {
			_this.onBeforeBaseUnrender();
		});
	},


	unbindBaseRenderHandlers: function() {
		this.off('.baseHandler');
	},


	onBaseRender: function() {
		this.applyScreenState();
		this.publiclyTrigger('viewRender', {
			context: this,
			args: [ this, this.el ]
		});
	},


	onBeforeBaseUnrender: function() {
		this.applyScreenState();
		this.publiclyTrigger('viewDestroy', {
			context: this,
			args: [ this, this.el ]
		});
	},


	// Misc view rendering utils
	// -----------------------------------------------------------------------------------------------------------------


	// Binds DOM handlers to elements that reside outside the view container, such as the document
	bindGlobalHandlers: function() {
		this.listenTo(GlobalEmitter.get(), {
			touchstart: this.processUnselect,
			mousedown: this.handleDocumentMousedown
		});
	},


	// Unbinds DOM handlers from elements that reside outside the view container
	unbindGlobalHandlers: function() {
		this.stopListeningTo(GlobalEmitter.get());
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	// Immediately render the current time indicator and begins re-rendering it at an interval,
	// which is defined by this.getNowIndicatorUnit().
	// TODO: somehow do this for the current whole day's background too
	startNowIndicator: function() {
		var _this = this;
		var unit;
		var update;
		var delay; // ms wait value

		if (this.opt('nowIndicator')) {
			unit = this.getNowIndicatorUnit();
			if (unit) {
				update = proxy(this, 'updateNowIndicator'); // bind to `this`

				this.initialNowDate = this.calendar.getNow();
				this.initialNowQueriedMs = +new Date();
				this.renderNowIndicator(this.initialNowDate);
				this.isNowIndicatorRendered = true;

				// wait until the beginning of the next interval
				delay = this.initialNowDate.clone().startOf(unit).add(1, unit) - this.initialNowDate;
				this.nowIndicatorTimeoutID = setTimeout(function() {
					_this.nowIndicatorTimeoutID = null;
					update();
					delay = +moment.duration(1, unit);
					delay = Math.max(100, delay); // prevent too frequent
					_this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
				}, delay);
			}
		}
	},


	// rerenders the now indicator, computing the new current time from the amount of time that has passed
	// since the initial getNow call.
	updateNowIndicator: function() {
		if (this.isNowIndicatorRendered) {
			this.unrenderNowIndicator();
			this.renderNowIndicator(
				this.initialNowDate.clone().add(new Date() - this.initialNowQueriedMs) // add ms
			);
		}
	},


	// Immediately unrenders the view's current time indicator and stops any re-rendering timers.
	// Won't cause side effects if indicator isn't rendered.
	stopNowIndicator: function() {
		if (this.isNowIndicatorRendered) {

			if (this.nowIndicatorTimeoutID) {
				clearTimeout(this.nowIndicatorTimeoutID);
				this.nowIndicatorTimeoutID = null;
			}
			if (this.nowIndicatorIntervalID) {
				clearTimeout(this.nowIndicatorIntervalID);
				this.nowIndicatorIntervalID = null;
			}

			this.unrenderNowIndicator();
			this.isNowIndicatorRendered = false;
		}
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/
	// TODO: move some of these to ChronoComponent


	// Refreshes anything dependant upon sizing of the container element of the grid
	updateSize: function(isResize) {
		var scroll;

		if (isResize) {
			scroll = this.queryScroll();
		}

		this.updateHeight(isResize);
		this.updateWidth(isResize);
		this.updateNowIndicator();

		if (isResize) {
			this.applyScroll(scroll);
		}
	},


	// Refreshes the horizontal dimensions of the calendar
	updateWidth: function(isResize) {
		// subclasses should implement
	},


	// Refreshes the vertical dimensions of the calendar
	updateHeight: function(isResize) {
		var calendar = this.calendar; // we poll the calendar for height information

		this.setHeight(
			calendar.getSuggestedViewHeight(),
			calendar.isHeightAuto()
		);
	},


	// Updates the vertical dimensions of the calendar to the specified height.
	// if `isAuto` is set to true, height becomes merely a suggestion and the view should use its "natural" height.
	setHeight: function(height, isAuto) {
		// subclasses should implement
	},


	/* Scroller
	------------------------------------------------------------------------------------------------------------------*/


	addForcedScroll: function(scroll) {
		this.addScroll(
			$.extend(scroll, { isForced: true })
		);
	},


	addScroll: function(scroll) {
		var queuedScroll = this.queuedScroll || (this.queuedScroll = {});

		if (!queuedScroll.isForced) {
			$.extend(queuedScroll, scroll);
		}
	},


	popScroll: function() {
		this.applyQueuedScroll();
		this.queuedScroll = null;
	},


	applyQueuedScroll: function() {
		if (this.queuedScroll) {
			this.applyScroll(this.queuedScroll);
		}
	},


	queryScroll: function() {
		var scroll = {};

		if (this.isDatesRendered) {
			$.extend(scroll, this.queryDateScroll());
		}

		return scroll;
	},


	applyScroll: function(scroll) {
		if (this.isDatesRendered) {
			this.applyDateScroll(scroll);
		}
	},


	computeInitialDateScroll: function() {
		return {}; // subclasses must implement
	},


	queryDateScroll: function() {
		return {}; // subclasses must implement
	},


	applyDateScroll: function(scroll) {
		; // subclasses must implement
	},


	/* Height Freezing
	------------------------------------------------------------------------------------------------------------------*/


	freezeHeight: function() {
		this.calendar.freezeContentHeight();
	},


	thawHeight: function() {
		this.calendar.thawContentHeight();
	},


	// Event High-level Rendering
	// -----------------------------------------------------------------------------------------------------------------


	executeEventsRender: function(eventsPayload) {

		if (this.renderEvents) { // for legacy custom views
			this.renderEvents(convertEventsPayloadToLegacyArray(eventsPayload));
		}
		else {
			this.renderEventsPayload(eventsPayload);
		}

		this.isEventsRendered = true;

		this.onEventsRender();
	},


	executeEventsUnrender: function() {
		this.onBeforeEventsUnrender();

		if (this.destroyEvents) {
			this.destroyEvents(); // TODO: deprecate
		}

		this.unrenderEvents();
		this.isEventsRendered = false;
	},


	// Event Rendering Triggers
	// -----------------------------------------------------------------------------------------------------------------


	// Signals that all events have been rendered
	onEventsRender: function() {
		var _this = this;
		var hasSingleHandlers = this.hasPublicHandlers('eventAfterRender');

		if (hasSingleHandlers || this.hasPublicHandlers('eventAfterAllRender')) {
			this.applyScreenState();
		}

		if (hasSingleHandlers) {
			this.getEventSegs().forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventAfterRender', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}

		this.publiclyTrigger('eventAfterAllRender', {
			context: this,
			args: [ this ]
		});
	},


	// Signals that all event elements are about to be removed
	onBeforeEventsUnrender: function() {
		var _this = this;

		if (this.hasPublicHandlers('eventDestroy')) {

			this.applyScreenState();

			this.getEventSegs().forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventDestroy', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}
	},


	applyScreenState: function() {
		this.thawHeight();
		this.freezeHeight();
		this.applyQueuedScroll();
	},


	// Event Rendering Utils
	// -----------------------------------------------------------------------------------------------------------------
	// TODO: move this to ChronoComponent


	// Hides all rendered event segments linked to the given event
	showEventsWithId: function(eventDefId) {
		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', '');
			}
		});
	},


	// Shows all rendered event segments linked to the given event
	hideEventsWithId: function(eventDefId) {
		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', 'hidden');
			}
		});
	},


	/* Event Drag-n-Drop
	------------------------------------------------------------------------------------------------------------------*/


	reportEventDrop: function(eventInstance, eventMutation, el, ev) {
		var eventManager = this.calendar.eventManager;
		var undoFunc = eventManager.mutateEventsWithId(
			eventInstance.def.id,
			eventMutation,
			this.calendar
		);
		var dateMutation = eventMutation.dateMutation;

		// update the EventInstance, for handlers
		if (dateMutation) {
			eventInstance.dateProfile = dateMutation.buildNewDateProfile(
				eventInstance.dateProfile,
				this.calendar
			);
		}

		this.triggerEventDrop(
			eventInstance,
			// a drop doesn't necessarily mean a date mutation (ex: resource change)
			(dateMutation && dateMutation.dateDelta) || moment.duration(),
			undoFunc,
			el, ev
		);
	},


	// Triggers event-drop handlers that have subscribed via the API
	triggerEventDrop: function(eventInstance, dateDelta, undoFunc, el, ev) {
		this.publiclyTrigger('eventDrop', {
			context: el[0],
			args: [
				eventInstance.toLegacy(),
				dateDelta,
				undoFunc,
				ev,
				{}, // {} = jqui dummy
				this
			]
		});
	},


	/* External Element Drag-n-Drop
	------------------------------------------------------------------------------------------------------------------*/


	// Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
	// `meta` is the parsed data that has been embedded into the dragging event.
	// `dropLocation` is an object that contains the new zoned start/end/allDay values for the event.
	reportExternalDrop: function(singleEventDef, isEvent, isSticky, el, ev, ui) {

		if (isEvent) {
			this.calendar.eventManager.addEventDef(singleEventDef, isSticky);
		}

		this.triggerExternalDrop(singleEventDef, isEvent, el, ev, ui);
	},


	// Triggers external-drop handlers that have subscribed via the API
	triggerExternalDrop: function(singleEventDef, isEvent, el, ev, ui) {

		// trigger 'drop' regardless of whether element represents an event
		this.publiclyTrigger('drop', {
			context: el[0],
			args: [
				singleEventDef.dateProfile.start.clone(),
				ev,
				ui,
				this
			]
		});

		if (isEvent) {
			// signal an external event landed
			this.publiclyTrigger('eventReceive', {
				context: this,
				args: [
					singleEventDef.buildInstance().toLegacy(),
					this
				]
			});
		}
	},


	/* Event Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Must be called when an event in the view has been resized to a new length
	reportEventResize: function(eventInstance, eventMutation, el, ev) {
		var eventManager = this.calendar.eventManager;
		var undoFunc = eventManager.mutateEventsWithId(
			eventInstance.def.id,
			eventMutation,
			this.calendar
		);

		// update the EventInstance, for handlers
		eventInstance.dateProfile = eventMutation.dateMutation.buildNewDateProfile(
			eventInstance.dateProfile,
			this.calendar
		);

		this.triggerEventResize(
			eventInstance,
			eventMutation.dateMutation.endDelta,
			undoFunc,
			el, ev
		);
	},


	// Triggers event-resize handlers that have subscribed via the API
	triggerEventResize: function(eventInstance, durationDelta, undoFunc, el, ev) {
		this.publiclyTrigger('eventResize', {
			context: el[0],
			args: [
				eventInstance.toLegacy(),
				durationDelta,
				undoFunc,
				ev,
				{}, // {} = jqui dummy
				this
			]
		});
	},


	/* Selection (time range)
	------------------------------------------------------------------------------------------------------------------*/


	// Selects a date span on the view. `start` and `end` are both Moments.
	// `ev` is the native mouse event that begin the interaction.
	select: function(footprint, ev) {
		this.unselect(ev);
		this.renderSelectionFootprint(footprint);
		this.reportSelection(footprint, ev);
	},


	renderSelectionFootprint: function(footprint, ev) {
		if (this.renderSelection) { // legacy method in custom view classes
			this.renderSelection(
				footprint.toLegacy(this.calendar)
			);
		}
		else {
			ChronoComponent.prototype.renderSelectionFootprint.apply(this, arguments);
		}
	},


	// Called when a new selection is made. Updates internal state and triggers handlers.
	reportSelection: function(footprint, ev) {
		this.isSelected = true;
		this.triggerSelect(footprint, ev);
	},


	// Triggers handlers to 'select'
	triggerSelect: function(footprint, ev) {
		var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?

		this.publiclyTrigger('select', {
			context: this,
			args: [
				dateProfile.start,
				dateProfile.end,
				ev,
				this
			]
		});
	},


	// Undoes a selection. updates in the internal state and triggers handlers.
	// `ev` is the native mouse event that began the interaction.
	unselect: function(ev) {
		if (this.isSelected) {
			this.isSelected = false;
			if (this.destroySelection) {
				this.destroySelection(); // TODO: deprecate
			}
			this.unrenderSelection();
			this.publiclyTrigger('unselect', {
				context: this,
				args: [ ev, this ]
			});
		}
	},


	/* Event Selection
	------------------------------------------------------------------------------------------------------------------*/


	selectEventInstance: function(eventInstance) {
		if (
			!this.selectedEventInstance ||
			this.selectedEventInstance !== eventInstance
		) {
			this.unselectEventInstance();

			this.getEventSegs().forEach(function(seg) {
				if (
					seg.footprint.eventInstance === eventInstance &&
					seg.el // necessary?
				) {
					seg.el.addClass('fc-selected');
				}
			});

			this.selectedEventInstance = eventInstance;
		}
	},


	unselectEventInstance: function() {
		if (this.selectedEventInstance) {

			this.getEventSegs().forEach(function(seg) {
				if (seg.el) { // necessary?
					seg.el.removeClass('fc-selected');
				}
			});

			this.selectedEventInstance = null;
		}
	},


	isEventDefSelected: function(eventDef) {
		// event references might change on refetchEvents(), while selectedEventInstance doesn't,
		// so compare IDs
		return this.selectedEventInstance && this.selectedEventInstance.def.id === eventDef.id;
	},


	/* Mouse / Touch Unselecting (time range & event unselection)
	------------------------------------------------------------------------------------------------------------------*/
	// TODO: move consistently to down/start or up/end?
	// TODO: don't kill previous selection if touch scrolling


	handleDocumentMousedown: function(ev) {
		if (isPrimaryMouseButton(ev)) {
			this.processUnselect(ev);
		}
	},


	processUnselect: function(ev) {
		this.processRangeUnselect(ev);
		this.processEventUnselect(ev);
	},


	processRangeUnselect: function(ev) {
		var ignore;

		// is there a time-range selection?
		if (this.isSelected && this.opt('unselectAuto')) {
			// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
			ignore = this.opt('unselectCancel');
			if (!ignore || !$(ev.target).closest(ignore).length) {
				this.unselect(ev);
			}
		}
	},


	processEventUnselect: function(ev) {
		if (this.selectedEventInstance) {
			if (!$(ev.target).closest('.fc-selected').length) {
				this.unselectEventInstance();
			}
		}
	},


	/* Day Click
	------------------------------------------------------------------------------------------------------------------*/


	// Triggers handlers to 'dayClick'
	// Span has start/end of the clicked area. Only the start is useful.
	triggerDayClick: function(footprint, dayEl, ev) {
		var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?

		this.publiclyTrigger('dayClick', {
			context: dayEl,
			args: [ dateProfile.start, ev, this ]
		});
	}

});


View.watch('displayingDates', [ 'dateProfile' ], function(deps) {
	this.requestDateRender(deps.dateProfile);
}, function() {
	this.requestDateUnrender();
});


View.watch('initialEvents', [ 'dateProfile' ], function(deps) {
	return this.fetchInitialEvents(deps.dateProfile);
});


View.watch('bindingEvents', [ 'initialEvents' ], function(deps) {
	this.setEvents(deps.initialEvents);
	this.bindEventChanges();
}, function() {
	this.unbindEventChanges();
	this.unsetEvents();
});


View.watch('displayingEvents', [ 'displayingDates', 'hasEvents' ], function() {
	this.requestEventsRender(this.get('currentEvents')); // if there were event mutations after initialEvents
}, function() {
	this.requestEventsUnrender();
});


function convertEventsPayloadToLegacyArray(eventsPayload) {
	var legacyEvents = [];
	var id;
	var eventInstances;
	var i;

	for (id in eventsPayload) {

		eventInstances = eventsPayload[id].eventInstances;

		for (i = 0; i < eventInstances.length; i++) {
			legacyEvents.push(
				eventInstances[i].toLegacy()
			);
		}
	}

	return legacyEvents;
}

;;

View.mixin({

	// range the view is formally responsible for.
	// for example, a month view might have 1st-31st, excluding padded dates
	currentUnzonedRange: null,
	currentRangeUnit: null, // name of largest unit being displayed, like "month" or "week"

	isRangeAllDay: false,

	// date range with a rendered skeleton
	// includes not-active days that need some sort of DOM
	renderUnzonedRange: null,

	// dates that display events and accept drag-n-drop
	activeUnzonedRange: null,

	// constraint for where prev/next operations can go and where events can be dragged/resized to.
	// an object with optional start and end properties.
	validUnzonedRange: null,

	// how far the current date will move for a prev/next operation
	dateIncrement: null,

	minTime: null, // Duration object that denotes the first visible time of any given day
	maxTime: null, // Duration object that denotes the exclusive visible end time of any given day
	usesMinMaxTime: false, // whether minTime/maxTime will affect the activeUnzonedRange. Views must opt-in.

	// DEPRECATED
	start: null, // use activeUnzonedRange
	end: null, // use activeUnzonedRange
	intervalStart: null, // use currentUnzonedRange
	intervalEnd: null, // use currentUnzonedRange


	/* Date Range Computation
	------------------------------------------------------------------------------------------------------------------*/


	setDateProfileForRendering: function(dateProfile) {
		var calendar = this.calendar;

		this.currentUnzonedRange = dateProfile.currentUnzonedRange;
		this.currentRangeUnit = dateProfile.currentRangeUnit;
		this.isRangeAllDay = dateProfile.isRangeAllDay;
		this.renderUnzonedRange = dateProfile.renderUnzonedRange;
		this.activeUnzonedRange = dateProfile.activeUnzonedRange;
		this.validUnzonedRange = dateProfile.validUnzonedRange;
		this.dateIncrement = dateProfile.dateIncrement;
		this.minTime = dateProfile.minTime;
		this.maxTime = dateProfile.maxTime;

		// DEPRECATED, but we need to keep it updated...
		this.start = calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, this.isRangeAllDay);
		this.end = calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, this.isRangeAllDay);
		this.intervalStart = calendar.msToMoment(dateProfile.currentUnzonedRange.startMs, this.isRangeAllDay);
		this.intervalEnd = calendar.msToMoment(dateProfile.currentUnzonedRange.endMs, this.isRangeAllDay);

		this.title = this.computeTitle();
		this.calendar.reportViewDatesChanged(this, dateProfile);
	},


	// Builds a structure with info about what the dates/ranges will be for the "prev" view.
	buildPrevDateProfile: function(date) {
		var prevDate = date.clone().startOf(this.currentRangeUnit).subtract(this.dateIncrement);

		return this.buildDateProfile(prevDate, -1);
	},


	// Builds a structure with info about what the dates/ranges will be for the "next" view.
	buildNextDateProfile: function(date) {
		var nextDate = date.clone().startOf(this.currentRangeUnit).add(this.dateIncrement);

		return this.buildDateProfile(nextDate, 1);
	},


	// Builds a structure holding dates/ranges for rendering around the given date.
	// Optional direction param indicates whether the date is being incremented/decremented
	// from its previous value. decremented = -1, incremented = 1 (default).
	buildDateProfile: function(date, direction, forceToValid) {
		var isDateAllDay = !date.hasTime();
		var validUnzonedRange = this.buildValidRange();
		var minTime = null;
		var maxTime = null;
		var currentInfo;
		var renderUnzonedRange;
		var activeUnzonedRange;
		var isValid;

		if (forceToValid) {
			date = this.calendar.msToUtcMoment(
				validUnzonedRange.constrainDate(date), // returns MS
				isDateAllDay
			);
		}

		currentInfo = this.buildCurrentRangeInfo(date, direction);
		renderUnzonedRange = this.buildRenderRange(currentInfo.unzonedRange, currentInfo.unit);
		activeUnzonedRange = renderUnzonedRange.clone();

		if (!this.opt('showNonCurrentDates')) {
			activeUnzonedRange = activeUnzonedRange.intersect(currentInfo.unzonedRange);
		}

		minTime = moment.duration(this.opt('minTime'));
		maxTime = moment.duration(this.opt('maxTime'));
		activeUnzonedRange = this.adjustActiveRange(activeUnzonedRange, minTime, maxTime);

		activeUnzonedRange = activeUnzonedRange.intersect(validUnzonedRange);

		if (activeUnzonedRange) {
			date = this.calendar.msToUtcMoment(
				activeUnzonedRange.constrainDate(date), // returns MS
				isDateAllDay
			);
		}

		// it's invalid if the originally requested date is not contained,
		// or if the range is completely outside of the valid range.
		isValid = currentInfo.unzonedRange.intersectsWith(validUnzonedRange);

		return {
			validUnzonedRange: validUnzonedRange,
			currentUnzonedRange: currentInfo.unzonedRange,
			currentRangeUnit: currentInfo.unit,
			isRangeAllDay: /^(year|month|week|day)$/.test(currentInfo.unit),
			activeUnzonedRange: activeUnzonedRange,
			renderUnzonedRange: renderUnzonedRange,
			minTime: minTime,
			maxTime: maxTime,
			isValid: isValid,
			date: date,
			dateIncrement: this.buildDateIncrement(currentInfo.duration)
				// pass a fallback (might be null) ^
		};
	},


	// Builds an object with optional start/end properties.
	// Indicates the minimum/maximum dates to display.
	buildValidRange: function() {
		return this.getUnzonedRangeOption('validRange', this.calendar.getNow()) ||
			new UnzonedRange(); // completely open-ended
	},


	// Builds a structure with info about the "current" range, the range that is
	// highlighted as being the current month for example.
	// See buildDateProfile for a description of `direction`.
	// Guaranteed to have `range` and `unit` properties. `duration` is optional.
	// TODO: accept a MS-time instead of a moment `date`?
	buildCurrentRangeInfo: function(date, direction) {
		var duration = null;
		var unit = null;
		var unzonedRange = null;
		var dayCount;

		if (this.viewSpec.duration) {
			duration = this.viewSpec.duration;
			unit = this.viewSpec.durationUnit;
			unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
		}
		else if ((dayCount = this.opt('dayCount'))) {
			unit = 'day';
			unzonedRange = this.buildRangeFromDayCount(date, direction, dayCount);
		}
		else if ((unzonedRange = this.buildCustomVisibleRange(date))) {
			unit = computeGreatestUnit(unzonedRange.getStart(), unzonedRange.getEnd());
		}
		else {
			duration = this.getFallbackDuration();
			unit = computeGreatestUnit(duration);
			unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
		}

		return { duration: duration, unit: unit, unzonedRange: unzonedRange };
	},


	getFallbackDuration: function() {
		return moment.duration({ days: 1 });
	},


	// Returns a new activeUnzonedRange to have time values (un-ambiguate)
	// minTime or maxTime causes the range to expand.
	adjustActiveRange: function(unzonedRange, minTime, maxTime) {
		var start = unzonedRange.getStart();
		var end = unzonedRange.getEnd();

		if (this.usesMinMaxTime) {

			if (minTime < 0) {
				start.time(0).add(minTime);
			}

			if (maxTime > 24 * 60 * 60 * 1000) { // beyond 24 hours?
				end.time(maxTime - (24 * 60 * 60 * 1000));
			}
		}

		return new UnzonedRange(start, end);
	},


	// Builds the "current" range when it is specified as an explicit duration.
	// `unit` is the already-computed computeGreatestUnit value of duration.
	// TODO: accept a MS-time instead of a moment `date`?
	buildRangeFromDuration: function(date, direction, duration, unit) {
		var alignment = this.opt('dateAlignment');
		var start = date.clone();
		var end;
		var dateIncrementInput;
		var dateIncrementDuration;

		// if the view displays a single day or smaller
		if (duration.as('days') <= 1) {
			if (this.isHiddenDay(start)) {
				start = this.skipHiddenDays(start, direction);
				start.startOf('day');
			}
		}

		// compute what the alignment should be
		if (!alignment) {
			dateIncrementInput = this.opt('dateIncrement');

			if (dateIncrementInput) {
				dateIncrementDuration = moment.duration(dateIncrementInput);

				// use the smaller of the two units
				if (dateIncrementDuration < duration) {
					alignment = computeDurationGreatestUnit(dateIncrementDuration, dateIncrementInput);
				}
				else {
					alignment = unit;
				}
			}
			else {
				alignment = unit;
			}
		}

		start.startOf(alignment);
		end = start.clone().add(duration);

		return new UnzonedRange(start, end);
	},


	// Builds the "current" range when a dayCount is specified.
	// TODO: accept a MS-time instead of a moment `date`?
	buildRangeFromDayCount: function(date, direction, dayCount) {
		var customAlignment = this.opt('dateAlignment');
		var runningCount = 0;
		var start = date.clone();
		var end;

		if (customAlignment) {
			start.startOf(customAlignment);
		}

		start.startOf('day');
		start = this.skipHiddenDays(start, direction);

		end = start.clone();
		do {
			end.add(1, 'day');
			if (!this.isHiddenDay(end)) {
				runningCount++;
			}
		} while (runningCount < dayCount);

		return new UnzonedRange(start, end);
	},


	// Builds a normalized range object for the "visible" range,
	// which is a way to define the currentUnzonedRange and activeUnzonedRange at the same time.
	// TODO: accept a MS-time instead of a moment `date`?
	buildCustomVisibleRange: function(date) {
		var visibleUnzonedRange = this.getUnzonedRangeOption(
			'visibleRange',
			this.calendar.applyTimezone(date) // correct zone. also generates new obj that avoids mutations
		);

		if (visibleUnzonedRange && (visibleUnzonedRange.startMs === null || visibleUnzonedRange.endMs === null)) {
			return null;
		}

		return visibleUnzonedRange;
	},


	// Computes the range that will represent the element/cells for *rendering*,
	// but which may have voided days/times.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit) {
		// cut off days in the currentUnzonedRange that are hidden
		return this.trimHiddenDays(currentUnzonedRange);
	},


	// Compute the duration value that should be added/substracted to the current date
	// when a prev/next operation happens.
	buildDateIncrement: function(fallback) {
		var dateIncrementInput = this.opt('dateIncrement');
		var customAlignment;

		if (dateIncrementInput) {
			return moment.duration(dateIncrementInput);
		}
		else if ((customAlignment = this.opt('dateAlignment'))) {
			return moment.duration(1, customAlignment);
		}
		else if (fallback) {
			return fallback;
		}
		else {
			return moment.duration({ days: 1 });
		}
	},


	// Remove days from the beginning and end of the range that are computed as hidden.
	trimHiddenDays: function(inputUnzonedRange) {
		var start = inputUnzonedRange.getStart();
		var end = inputUnzonedRange.getEnd();

		start = this.skipHiddenDays(start);
		end = this.skipHiddenDays(end, -1, true);

		return new UnzonedRange(start, end);
	},


	// Compute the number of the give units in the "current" range.
	// Will return a floating-point number. Won't round.
	currentRangeAs: function(unit) {
		var currentUnzonedRange = this.currentUnzonedRange;

		return moment.utc(currentUnzonedRange.endMs).diff(
			moment.utc(currentUnzonedRange.startMs),
			unit,
			true
		);
	},


	// For ChronoComponent::getDayClasses
	isDateInOtherMonth: function(date) {
		return false;
	},


	// Arguments after name will be forwarded to a hypothetical function value
	// WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
	// Always clone your objects if you fear mutation.
	getUnzonedRangeOption: function(name) {
		var val = this.opt(name);

		if (typeof val === 'function') {
			val = val.apply(
				null,
				Array.prototype.slice.call(arguments, 1)
			);
		}

		if (val) {
			return this.calendar.parseUnzonedRange(val);
		}
	},


	/* Hidden Days
	------------------------------------------------------------------------------------------------------------------*/


	// Initializes internal variables related to calculating hidden days-of-week
	initHiddenDays: function() {
		var hiddenDays = this.opt('hiddenDays') || []; // array of day-of-week indices that are hidden
		var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
		var dayCnt = 0;
		var i;

		if (this.opt('weekends') === false) {
			hiddenDays.push(0, 6); // 0=sunday, 6=saturday
		}

		for (i = 0; i < 7; i++) {
			if (
				!(isHiddenDayHash[i] = $.inArray(i, hiddenDays) !== -1)
			) {
				dayCnt++;
			}
		}

		if (!dayCnt) {
			throw 'invalid hiddenDays'; // all days were hidden? bad.
		}

		this.isHiddenDayHash = isHiddenDayHash;
	},


	// Is the current day hidden?
	// `day` is a day-of-week index (0-6), or a Moment
	isHiddenDay: function(day) {
		if (moment.isMoment(day)) {
			day = day.day();
		}
		return this.isHiddenDayHash[day];
	},


	// Incrementing the current day until it is no longer a hidden day, returning a copy.
	// DOES NOT CONSIDER validUnzonedRange!
	// If the initial value of `date` is not a hidden day, don't do anything.
	// Pass `isExclusive` as `true` if you are dealing with an end date.
	// `inc` defaults to `1` (increment one day forward each time)
	skipHiddenDays: function(date, inc, isExclusive) {
		var out = date.clone();
		inc = inc || 1;
		while (
			this.isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]
		) {
			out.add(inc, 'days');
		}
		return out;
	}

});

;;

/*
Embodies a div that has potential scrollbars
*/
var Scroller = FC.Scroller = Class.extend({

	el: null, // the guaranteed outer element
	scrollEl: null, // the element with the scrollbars
	overflowX: null,
	overflowY: null,


	constructor: function(options) {
		options = options || {};
		this.overflowX = options.overflowX || options.overflow || 'auto';
		this.overflowY = options.overflowY || options.overflow || 'auto';
	},


	render: function() {
		this.el = this.renderEl();
		this.applyOverflow();
	},


	renderEl: function() {
		return (this.scrollEl = $('<div class="fc-scroller"></div>'));
	},


	// sets to natural height, unlocks overflow
	clear: function() {
		this.setHeight('auto');
		this.applyOverflow();
	},


	destroy: function() {
		this.el.remove();
	},


	// Overflow
	// -----------------------------------------------------------------------------------------------------------------


	applyOverflow: function() {
		this.scrollEl.css({
			'overflow-x': this.overflowX,
			'overflow-y': this.overflowY
		});
	},


	// Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
	// Useful for preserving scrollbar widths regardless of future resizes.
	// Can pass in scrollbarWidths for optimization.
	lockOverflow: function(scrollbarWidths) {
		var overflowX = this.overflowX;
		var overflowY = this.overflowY;

		scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();

		if (overflowX === 'auto') {
			overflowX = (
					scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
					// OR scrolling pane with massless scrollbars?
					this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth
						// subtract 1 because of IE off-by-one issue
				) ? 'scroll' : 'hidden';
		}

		if (overflowY === 'auto') {
			overflowY = (
					scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
					// OR scrolling pane with massless scrollbars?
					this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight
						// subtract 1 because of IE off-by-one issue
				) ? 'scroll' : 'hidden';
		}

		this.scrollEl.css({ 'overflow-x': overflowX, 'overflow-y': overflowY });
	},


	// Getters / Setters
	// -----------------------------------------------------------------------------------------------------------------


	setHeight: function(height) {
		this.scrollEl.height(height);
	},


	getScrollTop: function() {
		return this.scrollEl.scrollTop();
	},


	setScrollTop: function(top) {
		this.scrollEl.scrollTop(top);
	},


	getClientWidth: function() {
		return this.scrollEl[0].clientWidth;
	},


	getClientHeight: function() {
		return this.scrollEl[0].clientHeight;
	},


	getScrollbarWidths: function() {
		return getScrollbarWidths(this.scrollEl);
	}

});

;;
function Iterator(items) {
    this.items = items || [];
}


/* Calls a method on every item passing the arguments through */
Iterator.prototype.proxyCall = function(methodName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var results = [];

    this.items.forEach(function(item) {
        results.push(item[methodName].apply(item, args));
    });

    return results;
};

;;

/* Toolbar with buttons and title
----------------------------------------------------------------------------------------------------------------------*/

function Toolbar(calendar, toolbarOptions) {
	var t = this;

	// exports
	t.setToolbarOptions = setToolbarOptions;
	t.render = render;
	t.removeElement = removeElement;
	t.updateTitle = updateTitle;
	t.activateButton = activateButton;
	t.deactivateButton = deactivateButton;
	t.disableButton = disableButton;
	t.enableButton = enableButton;
	t.getViewsWithButtons = getViewsWithButtons;
	t.el = null; // mirrors local `el`

	// locals
	var el;
	var viewsWithButtons = [];

	// method to update toolbar-specific options, not calendar-wide options
	function setToolbarOptions(newToolbarOptions) {
		toolbarOptions = newToolbarOptions;
	}

	// can be called repeatedly and will rerender
	function render() {
		var sections = toolbarOptions.layout;

		if (sections) {
			if (!el) {
				el = this.el = $("<div class='fc-toolbar "+ toolbarOptions.extraClasses + "'/>");
			}
			else {
				el.empty();
			}
			el.append(renderSection('left'))
				.append(renderSection('right'))
				.append(renderSection('center'))
				.append('<div class="fc-clear"/>');
		}
		else {
			removeElement();
		}
	}


	function removeElement() {
		if (el) {
			el.remove();
			el = t.el = null;
		}
	}


	function renderSection(position) {
		var theme = calendar.theme;
		var sectionEl = $('<div class="fc-' + position + '"/>');
		var buttonStr = toolbarOptions.layout[position];
		var calendarCustomButtons = calendar.opt('customButtons') || {};
		var calendarButtonTextOverrides = calendar.overrides.buttonText || {};
		var calendarButtonText = calendar.opt('buttonText') || {};

		if (buttonStr) {
			$.each(buttonStr.split(' '), function(i) {
				var groupChildren = $();
				var isOnlyButtons = true;
				var groupEl;

				$.each(this.split(','), function(j, buttonName) {
					var customButtonProps;
					var viewSpec;
					var buttonClick;
					var buttonIcon; // only one of these will be set
					var buttonText; // "
					var buttonInnerHtml;
					var buttonClasses;
					var buttonEl;

					if (buttonName == 'title') {
						groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
						isOnlyButtons = false;
					}
					else {

						if ((customButtonProps = calendarCustomButtons[buttonName])) {
							buttonClick = function(ev) {
								if (customButtonProps.click) {
									customButtonProps.click.call(buttonEl[0], ev);
								}
							};
							(buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = customButtonProps.text); // jshint ignore:line
						}
						else if ((viewSpec = calendar.getViewSpec(buttonName))) {
							viewsWithButtons.push(buttonName);
							buttonClick = function() {
								calendar.changeView(buttonName);
							};
							(buttonText = viewSpec.buttonTextOverride) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = viewSpec.buttonTextDefault); // jshint ignore:line
						}
						else if (calendar[buttonName]) { // a calendar method
							buttonClick = function() {
								calendar[buttonName]();
							};
							(buttonText = calendarButtonTextOverrides[buttonName]) ||
							(buttonIcon = theme.getIconClass(buttonName)) ||
							(buttonText = calendarButtonText[buttonName]); // jshint ignore:line
							//            ^ everything else is considered default
						}

						if (buttonClick) {

							buttonClasses = [
								'fc-' + buttonName + '-button',
								theme.getClass('button'),
								theme.getClass('stateDefault')
							];

							if (buttonText) {
								buttonInnerHtml = htmlEscape(buttonText);
							}
							else if (buttonIcon) {
								buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
							}

							buttonEl = $( // type="button" so that it doesn't submit a form
								'<button type="button" class="' + buttonClasses.join(' ') + '">' +
									buttonInnerHtml +
								'</button>'
								)
								.click(function(ev) {
									// don't process clicks for disabled buttons
									if (!buttonEl.hasClass(theme.getClass('stateDisabled'))) {

										buttonClick(ev);

										// after the click action, if the button becomes the "active" tab, or disabled,
										// it should never have a hover class, so remove it now.
										if (
											buttonEl.hasClass(theme.getClass('stateActive')) ||
											buttonEl.hasClass(theme.getClass('stateDisabled'))
										) {
											buttonEl.removeClass(theme.getClass('stateHover'));
										}
									}
								})
								.mousedown(function() {
									// the *down* effect (mouse pressed in).
									// only on buttons that are not the "active" tab, or disabled
									buttonEl
										.not('.' + theme.getClass('stateActive'))
										.not('.' + theme.getClass('stateDisabled'))
										.addClass(theme.getClass('stateDown'));
								})
								.mouseup(function() {
									// undo the *down* effect
									buttonEl.removeClass(theme.getClass('stateDown'));
								})
								.hover(
									function() {
										// the *hover* effect.
										// only on buttons that are not the "active" tab, or disabled
										buttonEl
											.not('.' + theme.getClass('stateActive'))
											.not('.' + theme.getClass('stateDisabled'))
											.addClass(theme.getClass('stateHover'));
									},
									function() {
										// undo the *hover* effect
										buttonEl
											.removeClass(theme.getClass('stateHover'))
											.removeClass(theme.getClass('stateDown')); // if mouseleave happens before mouseup
									}
								);

							groupChildren = groupChildren.add(buttonEl);
						}
					}
				});

				if (isOnlyButtons) {
					groupChildren
						.first().addClass(theme.getClass('cornerLeft')).end()
						.last().addClass(theme.getClass('cornerRight')).end();
				}

				if (groupChildren.length > 1) {
					groupEl = $('<div/>');
					if (isOnlyButtons) {
						groupEl.addClass(theme.getClass('buttonGroup'));
					}
					groupEl.append(groupChildren);
					sectionEl.append(groupEl);
				}
				else {
					sectionEl.append(groupChildren); // 1 or 0 children
				}
			});
		}

		return sectionEl;
	}


	function updateTitle(text) {
		if (el) {
			el.find('h2').text(text);
		}
	}


	function activateButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.addClass(calendar.theme.getClass('stateActive'));
		}
	}


	function deactivateButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.removeClass(calendar.theme.getClass('stateActive'));
		}
	}


	function disableButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.prop('disabled', true)
				.addClass(calendar.theme.getClass('stateDisabled'));
		}
	}


	function enableButton(buttonName) {
		if (el) {
			el.find('.fc-' + buttonName + '-button')
				.prop('disabled', false)
				.removeClass(calendar.theme.getClass('stateDisabled'));
		}
	}


	function getViewsWithButtons() {
		return viewsWithButtons;
	}

}

;;

var Calendar = FC.Calendar = Class.extend(EmitterMixin, {

	view: null, // current View object
	viewsByType: null, // holds all instantiated view instances, current or not
	currentDate: null, // unzoned moment. private (public API should use getDate instead)
	theme: null,
	loadingLevel: 0, // number of simultaneous loading tasks


	constructor: function(el, overrides) {

		// declare the current calendar instance relies on GlobalEmitter. needed for garbage collection.
		// unneeded() is called in destroy.
		GlobalEmitter.needed();

		this.el = el;
		this.viewsByType = {};
		this.viewSpecCache = {};

		this.initOptionsInternals(overrides);
		this.initMomentInternals(); // needs to happen after options hash initialized
		this.initCurrentDate();
		this.initEventManager();

		EventManager.call(this); // needs options immediately
		this.initialize();
	},


	// Subclasses can override this for initialization logic after the constructor has been called
	initialize: function() {
	},


	// Public API
	// -----------------------------------------------------------------------------------------------------------------


	getView: function() {
		return this.view;
	},


	publiclyTrigger: function(name, triggerInfo) {
		var optHandler = this.opt(name);
		var context;
		var args;

		if ($.isPlainObject(triggerInfo)) {
			context = triggerInfo.context;
			args = triggerInfo.args;
		}
		else if ($.isArray(triggerInfo)) {
			args = triggerInfo;
		}

		if (context == null) {
			context = this.el[0]; // fallback context
		}

		if (!args) {
			args = [];
		}

		this.triggerWith(name, context, args); // Emitter's method

		if (optHandler) {
			return optHandler.apply(context, args);
		}
	},


	hasPublicHandlers: function(name) {
		return this.hasHandlers(name) ||
			this.opt(name); // handler specified in options
	},


	// View
	// -----------------------------------------------------------------------------------------------------------------


	// Given a view name for a custom view or a standard view, creates a ready-to-go View object
	instantiateView: function(viewType) {
		var spec = this.getViewSpec(viewType);

		return new spec['class'](this, spec);
	},


	// Returns a boolean about whether the view is okay to instantiate at some point
	isValidViewType: function(viewType) {
		return Boolean(this.getViewSpec(viewType));
	},


	changeView: function(viewName, dateOrRange) {

		if (dateOrRange) {

			if (dateOrRange.start && dateOrRange.end) { // a range
				this.recordOptionOverrides({ // will not rerender
					visibleRange: dateOrRange
				});
			}
			else { // a date
				this.currentDate = this.moment(dateOrRange).stripZone(); // just like gotoDate
			}
		}

		this.renderView(viewName);
	},


	// Forces navigation to a view for the given date.
	// `viewType` can be a specific view name or a generic one like "week" or "day".
	zoomTo: function(newDate, viewType) {
		var spec;

		viewType = viewType || 'day'; // day is default zoom
		spec = this.getViewSpec(viewType) || this.getUnitViewSpec(viewType);

		this.currentDate = newDate.clone();
		this.renderView(spec ? spec.type : null);
	},


	// Current Date
	// -----------------------------------------------------------------------------------------------------------------


	initCurrentDate: function() {
		var defaultDateInput = this.opt('defaultDate');

		// compute the initial ambig-timezone date
		if (defaultDateInput != null) {
			this.currentDate = this.moment(defaultDateInput).stripZone();
		}
		else {
			this.currentDate = this.getNow(); // getNow already returns unzoned
		}
	},


	reportViewDatesChanged: function(view, dateProfile) {
		this.currentDate = dateProfile.date; // might have been constrained by view dates
		this.setToolbarsTitle(view.title);
		this.updateToolbarButtons();
	},


	prev: function() {
		var prevInfo = this.view.buildPrevDateProfile(this.currentDate);

		if (prevInfo.isValid) {
			this.currentDate = prevInfo.date;
			this.renderView();
		}
	},


	next: function() {
		var nextInfo = this.view.buildNextDateProfile(this.currentDate);

		if (nextInfo.isValid) {
			this.currentDate = nextInfo.date;
			this.renderView();
		}
	},


	prevYear: function() {
		this.currentDate.add(-1, 'years');
		this.renderView();
	},


	nextYear: function() {
		this.currentDate.add(1, 'years');
		this.renderView();
	},


	today: function() {
		this.currentDate = this.getNow(); // should deny like prev/next?
		this.renderView();
	},


	gotoDate: function(zonedDateInput) {
		this.currentDate = this.moment(zonedDateInput).stripZone();
		this.renderView();
	},


	incrementDate: function(delta) {
		this.currentDate.add(moment.duration(delta));
		this.renderView();
	},


	// for external API
	getDate: function() {
		return this.applyTimezone(this.currentDate); // infuse the calendar's timezone
	},


	// Loading Triggering
	// -----------------------------------------------------------------------------------------------------------------


	// Should be called when any type of async data fetching begins
	pushLoading: function() {
		if (!(this.loadingLevel++)) {
			this.publiclyTrigger('loading', [ true, this.view ]);
		}
	},


	// Should be called when any type of async data fetching completes
	popLoading: function() {
		if (!(--this.loadingLevel)) {
			this.publiclyTrigger('loading', [ false, this.view ]);
		}
	},


	// Selection
	// -----------------------------------------------------------------------------------------------------------------


	// this public method receives start/end dates in any format, with any timezone
	select: function(zonedStartInput, zonedEndInput) {
		this.view.select(
			this.buildSelectFootprint.apply(this, arguments)
		);
	},


	unselect: function() { // safe to be called before renderView
		if (this.view) {
			this.view.unselect();
		}
	},


	// Given arguments to the select method in the API, returns a span (unzoned start/end and other info)
	buildSelectFootprint: function(zonedStartInput, zonedEndInput) {
		var start = this.moment(zonedStartInput).stripZone();
		var end;

		if (zonedEndInput) {
			end = this.moment(zonedEndInput).stripZone();
		}
		else if (start.hasTime()) {
			end = start.clone().add(this.defaultTimedEventDuration);
		}
		else {
			end = start.clone().add(this.defaultAllDayEventDuration);
		}

		return new ComponentFootprint(
			new UnzonedRange(start, end),
			!start.hasTime()
		);
	},


	// Misc
	// -----------------------------------------------------------------------------------------------------------------


	// will return `null` if invalid range
	parseUnzonedRange: function(rangeInput) {
		var start = null;
		var end = null;

		if (rangeInput.start) {
			start = this.moment(rangeInput.start).stripZone();
		}

		if (rangeInput.end) {
			end = this.moment(rangeInput.end).stripZone();
		}

		if (!start && !end) {
			return null;
		}

		if (start && end && end.isBefore(start)) {
			return null;
		}

		return new UnzonedRange(start, end);
	},


	rerenderEvents: function() { // API method. destroys old events if previously rendered.
		if (this.elementVisible()) {
			this.view.flash('displayingEvents');
		}
	},


	initEventManager: function() {
		var _this = this;
		var eventManager = new EventManager(this);
		var rawSources = this.opt('eventSources') || [];
		var singleRawSource = this.opt('events');

		this.eventManager = eventManager;

		if (singleRawSource) {
			rawSources.unshift(singleRawSource);
		}

		eventManager.on('release', function(eventsPayload) {
			_this.trigger('eventsReset', eventsPayload);
		});

		eventManager.freeze();

		rawSources.forEach(function(rawSource) {
			var source = EventSourceParser.parse(rawSource, _this);

			if (source) {
				eventManager.addSource(source);
			}
		});

		eventManager.thaw();
	},


	requestEvents: function(start, end) {
		return this.eventManager.requestEvents(
			start,
			end,
			this.opt('timezone'),
			!this.opt('lazyFetching')
		);
	}

});

;;
/*
Options binding/triggering system.
*/
Calendar.mixin({

	dirDefaults: null, // option defaults related to LTR or RTL
	localeDefaults: null, // option defaults related to current locale
	overrides: null, // option overrides given to the fullCalendar constructor
	dynamicOverrides: null, // options set with dynamic setter method. higher precedence than view overrides.
	optionsModel: null, // all defaults combined with overrides


	initOptionsInternals: function(overrides) {
		this.overrides = $.extend({}, overrides); // make a copy
		this.dynamicOverrides = {};
		this.optionsModel = new Model();

		this.populateOptionsHash();
	},


	// public getter/setter
	option: function(name, value) {
		var newOptionHash;

		if (typeof name === 'string') {
			if (value === undefined) { // getter
				return this.optionsModel.get(name);
			}
			else { // setter for individual option
				newOptionHash = {};
				newOptionHash[name] = value;
				this.setOptions(newOptionHash);
			}
		}
		else if (typeof name === 'object') { // compound setter with object input
			this.setOptions(name);
		}
	},


	// private getter
	opt: function(name) {
		return this.optionsModel.get(name);
	},


	setOptions: function(newOptionHash) {
		var optionCnt = 0;
		var optionName;

		this.recordOptionOverrides(newOptionHash); // will trigger optionsModel watchers

		for (optionName in newOptionHash) {
			optionCnt++;
		}

		// special-case handling of single option change.
		// if only one option change, `optionName` will be its name.
		if (optionCnt === 1) {
			if (optionName === 'height' || optionName === 'contentHeight' || optionName === 'aspectRatio') {
				this.updateSize(true); // true = allow recalculation of height
				return;
			}
			else if (optionName === 'defaultDate') {
				return; // can't change date this way. use gotoDate instead
			}
			else if (optionName === 'businessHours') {
				if (this.view) {
					this.view.unrenderBusinessHours();
					this.view.renderBusinessHours();
				}
				return;
			}
			else if (optionName === 'timezone') {
				this.view.flash('initialEvents');
				return;
			}
		}

		// catch-all. rerender the header and footer and rebuild/rerender the current view
		this.renderHeader();
		this.renderFooter();

		// even non-current views will be affected by this option change. do before rerender
		// TODO: detangle
		this.viewsByType = {};

		this.reinitView();
	},


	// Computes the flattened options hash for the calendar and assigns to `this.options`.
	// Assumes this.overrides and this.dynamicOverrides have already been initialized.
	populateOptionsHash: function() {
		var locale, localeDefaults;
		var isRTL, dirDefaults;
		var rawOptions;

		locale = firstDefined( // explicit locale option given?
			this.dynamicOverrides.locale,
			this.overrides.locale
		);
		localeDefaults = localeOptionHash[locale];
		if (!localeDefaults) { // explicit locale option not given or invalid?
			locale = Calendar.defaults.locale;
			localeDefaults = localeOptionHash[locale] || {};
		}

		isRTL = firstDefined( // based on options computed so far, is direction RTL?
			this.dynamicOverrides.isRTL,
			this.overrides.isRTL,
			localeDefaults.isRTL,
			Calendar.defaults.isRTL
		);
		dirDefaults = isRTL ? Calendar.rtlDefaults : {};

		this.dirDefaults = dirDefaults;
		this.localeDefaults = localeDefaults;

		rawOptions = mergeOptions([ // merge defaults and overrides. lowest to highest precedence
			Calendar.defaults, // global defaults
			dirDefaults,
			localeDefaults,
			this.overrides,
			this.dynamicOverrides
		]);
		populateInstanceComputableOptions(rawOptions); // fill in gaps with computed options

		this.optionsModel.reset(rawOptions);
	},


	// stores the new options internally, but does not rerender anything.
	recordOptionOverrides: function(newOptionHash) {
		var optionName;

		for (optionName in newOptionHash) {
			this.dynamicOverrides[optionName] = newOptionHash[optionName];
		}

		this.viewSpecCache = {}; // the dynamic override invalidates the options in this cache, so just clear it
		this.populateOptionsHash(); // this.options needs to be recomputed after the dynamic override
	}

});

;;

Calendar.mixin({

	defaultAllDayEventDuration: null,
	defaultTimedEventDuration: null,
	localeData: null,


	initMomentInternals: function() {
		var _this = this;

		this.defaultAllDayEventDuration = moment.duration(this.opt('defaultAllDayEventDuration'));
		this.defaultTimedEventDuration = moment.duration(this.opt('defaultTimedEventDuration'));

		// Called immediately, and when any of the options change.
		// Happens before any internal objects rebuild or rerender, because this is very core.
		this.optionsModel.watch('buildingMomentLocale', [
			'?locale', '?monthNames', '?monthNamesShort', '?dayNames', '?dayNamesShort',
			'?firstDay', '?weekNumberCalculation'
		], function(opts) {
			var weekNumberCalculation = opts.weekNumberCalculation;
			var firstDay = opts.firstDay;
			var _week;

			// normalize
			if (weekNumberCalculation === 'iso') {
				weekNumberCalculation = 'ISO'; // normalize
			}

			var localeData = Object.create( // make a cheap copy
				getMomentLocaleData(opts.locale) // will fall back to en
			);

			if (opts.monthNames) {
				localeData._months = opts.monthNames;
			}
			if (opts.monthNamesShort) {
				localeData._monthsShort = opts.monthNamesShort;
			}
			if (opts.dayNames) {
				localeData._weekdays = opts.dayNames;
			}
			if (opts.dayNamesShort) {
				localeData._weekdaysShort = opts.dayNamesShort;
			}

			if (firstDay == null && weekNumberCalculation === 'ISO') {
				firstDay = 1;
			}
			if (firstDay != null) {
				_week = Object.create(localeData._week); // _week: { dow: # }
				_week.dow = firstDay;
				localeData._week = _week;
			}

			if ( // whitelist certain kinds of input
				weekNumberCalculation === 'ISO' ||
				weekNumberCalculation === 'local' ||
				typeof weekNumberCalculation === 'function'
			) {
				localeData._fullCalendar_weekCalc = weekNumberCalculation; // moment-ext will know what to do with it
			}

			_this.localeData = localeData;

			// If the internal current date object already exists, move to new locale.
			// We do NOT need to do this technique for event dates, because this happens when converting to "segments".
			if (_this.currentDate) {
				_this.localizeMoment(_this.currentDate); // sets to localeData
			}
		});
	},


	// Builds a moment using the settings of the current calendar: timezone and locale.
	// Accepts anything the vanilla moment() constructor accepts.
	moment: function() {
		var mom;

		if (this.opt('timezone') === 'local') {
			mom = FC.moment.apply(null, arguments);

			// Force the moment to be local, because FC.moment doesn't guarantee it.
			if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
				mom.local();
			}
		}
		else if (this.opt('timezone') === 'UTC') {
			mom = FC.moment.utc.apply(null, arguments); // process as UTC
		}
		else {
			mom = FC.moment.parseZone.apply(null, arguments); // let the input decide the zone
		}

		this.localizeMoment(mom); // TODO

		return mom;
	},


	msToMoment: function(ms, forceAllDay) {
		var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC

		if (forceAllDay) {
			mom.stripTime();
		}
		else {
			mom = this.applyTimezone(mom); // may or may not apply locale
		}

		this.localizeMoment(mom);

		return mom;
	},


	msToUtcMoment: function(ms, forceAllDay) {
		var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC

		if (forceAllDay) {
			mom.stripTime();
		}

		this.localizeMoment(mom);

		return mom;
	},


	// Updates the given moment's locale settings to the current calendar locale settings.
	localizeMoment: function(mom) {
		mom._locale = this.localeData;
	},


	// Returns a boolean about whether or not the calendar knows how to calculate
	// the timezone offset of arbitrary dates in the current timezone.
	getIsAmbigTimezone: function() {
		return this.opt('timezone') !== 'local' && this.opt('timezone') !== 'UTC';
	},


	// Returns a copy of the given date in the current timezone. Has no effect on dates without times.
	applyTimezone: function(date) {
		if (!date.hasTime()) {
			return date.clone();
		}

		var zonedDate = this.moment(date.toArray());
		var timeAdjust = date.time() - zonedDate.time();
		var adjustedZonedDate;

		// Safari sometimes has problems with this coersion when near DST. Adjust if necessary. (bug #2396)
		if (timeAdjust) { // is the time result different than expected?
			adjustedZonedDate = zonedDate.clone().add(timeAdjust); // add milliseconds
			if (date.time() - adjustedZonedDate.time() === 0) { // does it match perfectly now?
				zonedDate = adjustedZonedDate;
			}
		}

		return zonedDate;
	},


	/*
	Assumes the footprint is non-open-ended.
	*/
	footprintToDateProfile: function(componentFootprint, ignoreEnd) {
		var start = FC.moment.utc(componentFootprint.unzonedRange.startMs);
		var end;

		if (!ignoreEnd) {
			end = FC.moment.utc(componentFootprint.unzonedRange.endMs);
		}

		if (componentFootprint.isAllDay) {
			start.stripTime();

			if (end) {
				end.stripTime();
			}
		}
		else {
			start = this.applyTimezone(start);

			if (end) {
				end = this.applyTimezone(end);
			}
		}

		return new EventDateProfile(start, end, this);
	},


	// Returns a moment for the current date, as defined by the client's computer or from the `now` option.
	// Will return an moment with an ambiguous timezone.
	getNow: function() {
		var now = this.opt('now');
		if (typeof now === 'function') {
			now = now();
		}
		return this.moment(now).stripZone();
	},


	// Produces a human-readable string for the given duration.
	// Side-effect: changes the locale of the given duration.
	humanizeDuration: function(duration) {
		return duration.locale(this.opt('locale')).humanize();
	},



	// Event-Specific Date Utilities. TODO: move
	// -----------------------------------------------------------------------------------------------------------------


	// Get an event's normalized end date. If not present, calculate it from the defaults.
	getEventEnd: function(event) {
		if (event.end) {
			return event.end.clone();
		}
		else {
			return this.getDefaultEventEnd(event.allDay, event.start);
		}
	},


	// Given an event's allDay status and start date, return what its fallback end date should be.
	// TODO: rename to computeDefaultEventEnd
	getDefaultEventEnd: function(allDay, zonedStart) {
		var end = zonedStart.clone();

		if (allDay) {
			end.stripTime().add(this.defaultAllDayEventDuration);
		}
		else {
			end.add(this.defaultTimedEventDuration);
		}

		if (this.getIsAmbigTimezone()) {
			end.stripZone(); // we don't know what the tzo should be
		}

		return end;
	}

});

;;

Calendar.mixin({

	viewSpecCache: null, // cache of view definitions (initialized in Calendar.js)


	// Gets information about how to create a view. Will use a cache.
	getViewSpec: function(viewType) {
		var cache = this.viewSpecCache;

		return cache[viewType] || (cache[viewType] = this.buildViewSpec(viewType));
	},


	// Given a duration singular unit, like "week" or "day", finds a matching view spec.
	// Preference is given to views that have corresponding buttons.
	getUnitViewSpec: function(unit) {
		var viewTypes;
		var i;
		var spec;

		if ($.inArray(unit, unitsDesc) != -1) {

			// put views that have buttons first. there will be duplicates, but oh well
			viewTypes = this.header.getViewsWithButtons(); // TODO: include footer as well?
			$.each(FC.views, function(viewType) { // all views
				viewTypes.push(viewType);
			});

			for (i = 0; i < viewTypes.length; i++) {
				spec = this.getViewSpec(viewTypes[i]);
				if (spec) {
					if (spec.singleUnit == unit) {
						return spec;
					}
				}
			}
		}
	},


	// Builds an object with information on how to create a given view
	buildViewSpec: function(requestedViewType) {
		var viewOverrides = this.overrides.views || {};
		var specChain = []; // for the view. lowest to highest priority
		var defaultsChain = []; // for the view. lowest to highest priority
		var overridesChain = []; // for the view. lowest to highest priority
		var viewType = requestedViewType;
		var spec; // for the view
		var overrides; // for the view
		var durationInput;
		var duration;
		var unit;

		// iterate from the specific view definition to a more general one until we hit an actual View class
		while (viewType) {
			spec = fcViews[viewType];
			overrides = viewOverrides[viewType];
			viewType = null; // clear. might repopulate for another iteration

			if (typeof spec === 'function') { // TODO: deprecate
				spec = { 'class': spec };
			}

			if (spec) {
				specChain.unshift(spec);
				defaultsChain.unshift(spec.defaults || {});
				durationInput = durationInput || spec.duration;
				viewType = viewType || spec.type;
			}

			if (overrides) {
				overridesChain.unshift(overrides); // view-specific option hashes have options at zero-level
				durationInput = durationInput || overrides.duration;
				viewType = viewType || overrides.type;
			}
		}

		spec = mergeProps(specChain);
		spec.type = requestedViewType;
		if (!spec['class']) {
			return false;
		}

		// fall back to top-level `duration` option
		durationInput = durationInput ||
			this.dynamicOverrides.duration ||
			this.overrides.duration;

		if (durationInput) {
			duration = moment.duration(durationInput);

			if (duration.valueOf()) { // valid?

				unit = computeDurationGreatestUnit(duration, durationInput);

				spec.duration = duration;
				spec.durationUnit = unit;

				// view is a single-unit duration, like "week" or "day"
				// incorporate options for this. lowest priority
				if (duration.as(unit) === 1) {
					spec.singleUnit = unit;
					overridesChain.unshift(viewOverrides[unit] || {});
				}
			}
		}

		spec.defaults = mergeOptions(defaultsChain);
		spec.overrides = mergeOptions(overridesChain);

		this.buildViewSpecOptions(spec);
		this.buildViewSpecButtonText(spec, requestedViewType);

		return spec;
	},


	// Builds and assigns a view spec's options object from its already-assigned defaults and overrides
	buildViewSpecOptions: function(spec) {
		spec.options = mergeOptions([ // lowest to highest priority
			Calendar.defaults, // global defaults
			spec.defaults, // view's defaults (from ViewSubclass.defaults)
			this.dirDefaults,
			this.localeDefaults, // locale and dir take precedence over view's defaults!
			this.overrides, // calendar's overrides (options given to constructor)
			spec.overrides, // view's overrides (view-specific options)
			this.dynamicOverrides // dynamically set via setter. highest precedence
		]);
		populateInstanceComputableOptions(spec.options);
	},


	// Computes and assigns a view spec's buttonText-related options
	buildViewSpecButtonText: function(spec, requestedViewType) {

		// given an options object with a possible `buttonText` hash, lookup the buttonText for the
		// requested view, falling back to a generic unit entry like "week" or "day"
		function queryButtonText(options) {
			var buttonText = options.buttonText || {};
			return buttonText[requestedViewType] ||
				// view can decide to look up a certain key
				(spec.buttonTextKey ? buttonText[spec.buttonTextKey] : null) ||
				// a key like "month"
				(spec.singleUnit ? buttonText[spec.singleUnit] : null);
		}

		// highest to lowest priority
		spec.buttonTextOverride =
			queryButtonText(this.dynamicOverrides) ||
			queryButtonText(this.overrides) || // constructor-specified buttonText lookup hash takes precedence
			spec.overrides.buttonText; // `buttonText` for view-specific options is a string

		// highest to lowest priority. mirrors buildViewSpecOptions
		spec.buttonTextDefault =
			queryButtonText(this.localeDefaults) ||
			queryButtonText(this.dirDefaults) ||
			spec.defaults.buttonText || // a single string. from ViewSubclass.defaults
			queryButtonText(Calendar.defaults) ||
			(spec.duration ? this.humanizeDuration(spec.duration) : null) || // like "3 days"
			requestedViewType; // fall back to given view name
	}

});

;;

Calendar.mixin({

	el: null,
	contentEl: null,
	suggestedViewHeight: null,
	windowResizeProxy: null,
	ignoreWindowResize: 0,


	render: function() {
		if (!this.contentEl) {
			this.initialRender();
		}
		else if (this.elementVisible()) {
			// mainly for the public API
			this.calcSize();
			this.renderView();
		}
	},


	initialRender: function() {
		var _this = this;
		var el = this.el;

		el.addClass('fc');

		// event delegation for nav links
		el.on('click.fc', 'a[data-goto]', function(ev) {
			var anchorEl = $(this);
			var gotoOptions = anchorEl.data('goto'); // will automatically parse JSON
			var date = _this.moment(gotoOptions.date);
			var viewType = gotoOptions.type;

			// property like "navLinkDayClick". might be a string or a function
			var customAction = _this.view.opt('navLink' + capitaliseFirstLetter(viewType) + 'Click');

			if (typeof customAction === 'function') {
				customAction(date, ev);
			}
			else {
				if (typeof customAction === 'string') {
					viewType = customAction;
				}
				_this.zoomTo(date, viewType);
			}
		});

		// called immediately, and upon option change
		this.optionsModel.watch('settingTheme', [ '?theme', '?themeSystem' ], function(opts) {
			var themeClass = ThemeRegistry.getThemeClass(opts.themeSystem || opts.theme);
			var theme = new themeClass(_this.optionsModel);
			var widgetClass = theme.getClass('widget');

			_this.theme = theme;

			if (widgetClass) {
				el.addClass(widgetClass);
			}
		}, function() {
			var widgetClass = _this.theme.getClass('widget');

			_this.theme = null;

			if (widgetClass) {
				el.removeClass(widgetClass);
			}
		});

		// called immediately, and upon option change.
		// HACK: locale often affects isRTL, so we explicitly listen to that too.
		this.optionsModel.watch('applyingDirClasses', [ '?isRTL', '?locale' ], function(opts) {
			el.toggleClass('fc-ltr', !opts.isRTL);
			el.toggleClass('fc-rtl', opts.isRTL);
		});

		this.contentEl = $("<div class='fc-view-container'/>").prependTo(el);

		this.initToolbars();
		this.renderHeader();
		this.renderFooter();
		this.renderView(this.opt('defaultView'));

		if (this.opt('handleWindowResize')) {
			$(window).resize(
				this.windowResizeProxy = debounce( // prevents rapid calls
					this.windowResize.bind(this),
					this.opt('windowResizeDelay')
				)
			);
		}
	},


	destroy: function() {

		if (this.view) {
			this.view.removeElement();

			// NOTE: don't null-out this.view in case API methods are called after destroy.
			// It is still the "current" view, just not rendered.
		}

		this.toolbarsManager.proxyCall('removeElement');
		this.contentEl.remove();
		this.el.removeClass('fc fc-ltr fc-rtl');

		// removes theme-related root className
		this.optionsModel.unwatch('settingTheme');

		this.el.off('.fc'); // unbind nav link handlers

		if (this.windowResizeProxy) {
			$(window).unbind('resize', this.windowResizeProxy);
			this.windowResizeProxy = null;
		}

		GlobalEmitter.unneeded();
	},


	elementVisible: function() {
		return this.el.is(':visible');
	},



	// View Rendering
	// -----------------------------------------------------------------------------------


	// Renders a view because of a date change, view-type change, or for the first time.
	// If not given a viewType, keep the current view but render different dates.
	// Accepts an optional scroll state to restore to.
	renderView: function(viewType, forcedScroll) {

		this.ignoreWindowResize++;

		var needsClearView = this.view && viewType && this.view.type !== viewType;

		// if viewType is changing, remove the old view's rendering
		if (needsClearView) {
			this.freezeContentHeight(); // prevent a scroll jump when view element is removed
			this.clearView();
		}

		// if viewType changed, or the view was never created, create a fresh view
		if (!this.view && viewType) {
			this.view =
				this.viewsByType[viewType] ||
				(this.viewsByType[viewType] = this.instantiateView(viewType));

			this.view.setElement(
				$("<div class='fc-view fc-" + viewType + "-view' />").appendTo(this.contentEl)
			);
			this.toolbarsManager.proxyCall('activateButton', viewType);
		}

		if (this.view) {

			if (forcedScroll) {
				this.view.addForcedScroll(forcedScroll);
			}

			if (this.elementVisible()) {
				this.view.setDate(this.currentDate);
			}
		}

		if (needsClearView) {
			this.thawContentHeight();
		}

		this.ignoreWindowResize--;
	},


	// Unrenders the current view and reflects this change in the Header.
	// Unregsiters the `view`, but does not remove from viewByType hash.
	clearView: function() {
		this.toolbarsManager.proxyCall('deactivateButton', this.view.type);
		this.view.removeElement();
		this.view = null;
	},


	// Destroys the view, including the view object. Then, re-instantiates it and renders it.
	// Maintains the same scroll state.
	// TODO: maintain any other user-manipulated state.
	reinitView: function() {
		this.ignoreWindowResize++;
		this.freezeContentHeight();

		var viewType = this.view.type;
		var scrollState = this.view.queryScroll();
		this.clearView();
		this.calcSize();
		this.renderView(viewType, scrollState);

		this.thawContentHeight();
		this.ignoreWindowResize--;
	},


	// Resizing
	// -----------------------------------------------------------------------------------


	getSuggestedViewHeight: function() {
		if (this.suggestedViewHeight === null) {
			this.calcSize();
		}
		return this.suggestedViewHeight;
	},


	isHeightAuto: function() {
		return this.opt('contentHeight') === 'auto' || this.opt('height') === 'auto';
	},


	updateSize: function(shouldRecalc) {
		if (this.elementVisible()) {

			if (shouldRecalc) {
				this._calcSize();
			}

			this.ignoreWindowResize++;
			this.view.updateSize(true); // isResize=true. will poll getSuggestedViewHeight() and isHeightAuto()
			this.ignoreWindowResize--;

			return true; // signal success
		}
	},


	calcSize: function() {
		if (this.elementVisible()) {
			this._calcSize();
		}
	},


	_calcSize: function() { // assumes elementVisible
		var contentHeightInput = this.opt('contentHeight');
		var heightInput = this.opt('height');

		if (typeof contentHeightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = contentHeightInput;
		}
		else if (typeof contentHeightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = contentHeightInput();
		}
		else if (typeof heightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = heightInput - this.queryToolbarsHeight();
		}
		else if (typeof heightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = heightInput() - this.queryToolbarsHeight();
		}
		else if (heightInput === 'parent') { // set to height of parent element
			this.suggestedViewHeight = this.el.parent().height() - this.queryToolbarsHeight();
		}
		else {
			this.suggestedViewHeight = Math.round(
				this.contentEl.width() /
				Math.max(this.opt('aspectRatio'), .5)
			);
		}
	},


	windowResize: function(ev) {
		if (
			!this.ignoreWindowResize &&
			ev.target === window && // so we don't process jqui "resize" events that have bubbled up
			this.view.renderUnzonedRange // view has already been rendered
		) {
			if (this.updateSize(true)) {
				this.publiclyTrigger('windowResize', [ this.view ]);
			}
		}
	},


	/* Height "Freezing"
	-----------------------------------------------------------------------------*/


	freezeContentHeight: function() {
		this.contentEl.css({
			width: '100%',
			height: this.contentEl.height(),
			overflow: 'hidden'
		});
	},


	thawContentHeight: function() {
		this.contentEl.css({
			width: '',
			height: '',
			overflow: ''
		});
	}

});

;;

Calendar.mixin({

	header: null,
	footer: null,
	toolbarsManager: null,


	initToolbars: function() {
		this.header = new Toolbar(this, this.computeHeaderOptions());
		this.footer = new Toolbar(this, this.computeFooterOptions());
		this.toolbarsManager = new Iterator([ this.header, this.footer ]);
	},


	computeHeaderOptions: function() {
		return {
			extraClasses: 'fc-header-toolbar',
			layout: this.opt('header')
		};
	},


	computeFooterOptions: function() {
		return {
			extraClasses: 'fc-footer-toolbar',
			layout: this.opt('footer')
		};
	},


	// can be called repeatedly and Header will rerender
	renderHeader: function() {
		var header = this.header;

		header.setToolbarOptions(this.computeHeaderOptions());
		header.render();

		if (header.el) {
			this.el.prepend(header.el);
		}
	},


	// can be called repeatedly and Footer will rerender
	renderFooter: function() {
		var footer = this.footer;

		footer.setToolbarOptions(this.computeFooterOptions());
		footer.render();

		if (footer.el) {
			this.el.append(footer.el);
		}
	},


	setToolbarsTitle: function(title) {
		this.toolbarsManager.proxyCall('updateTitle', title);
	},


	updateToolbarButtons: function() {
		var now = this.getNow();
		var view = this.view;
		var todayInfo = view.buildDateProfile(now);
		var prevInfo = view.buildPrevDateProfile(this.currentDate);
		var nextInfo = view.buildNextDateProfile(this.currentDate);

		this.toolbarsManager.proxyCall(
			(todayInfo.isValid && !view.currentUnzonedRange.containsDate(now)) ?
				'enableButton' :
				'disableButton',
			'today'
		);

		this.toolbarsManager.proxyCall(
			prevInfo.isValid ?
				'enableButton' :
				'disableButton',
			'prev'
		);

		this.toolbarsManager.proxyCall(
			nextInfo.isValid ?
				'enableButton' :
				'disableButton',
			'next'
		);
	},


	queryToolbarsHeight: function() {
		return this.toolbarsManager.items.reduce(function(accumulator, toolbar) {
			var toolbarHeight = toolbar.el ? toolbar.el.outerHeight(true) : 0; // includes margin
			return accumulator + toolbarHeight;
		}, 0);
	}

});

;;

var BUSINESS_HOUR_EVENT_DEFAULTS = {
	start: '09:00',
	end: '17:00',
	dow: [ 1, 2, 3, 4, 5 ], // monday - friday
	rendering: 'inverse-background'
	// classNames are defined in businessHoursSegClasses
};


/*
returns ComponentFootprint[]
`businessHourDef` is optional. Use Calendar's setting if omitted.
*/
Calendar.prototype.buildCurrentBusinessFootprints = function(wholeDay) {
	return this._buildCurrentBusinessFootprints(wholeDay, this.opt('businessHours'));
};


Calendar.prototype._buildCurrentBusinessFootprints = function(wholeDay, businessDefInput) {
	var eventPeriod = this.eventManager.currentPeriod;
	var businessInstanceGroup;

	if (eventPeriod) {
		businessInstanceGroup = this.buildBusinessInstanceGroup(
			wholeDay,
			businessDefInput,
			eventPeriod.unzonedRange
		);

		if (businessInstanceGroup) {
			return this.eventInstancesToFootprints( // in Calendar.constraints.js
				businessInstanceGroup.eventInstances
			);
		}
	}

	return [];
};


/*
If there are business hours, and they are within range, returns populated EventInstanceGroup.
If there are business hours, but they aren't within range, returns a zero-item EventInstanceGroup.
If there are NOT business hours, returns undefined.
*/
Calendar.prototype.buildBusinessInstanceGroup = function(wholeDay, rawComplexDef, unzonedRange) {
	var eventDefs = this.buildBusinessDefs(wholeDay, rawComplexDef);
	var eventInstanceGroup;

	if (eventDefs.length) {
		eventInstanceGroup = new EventInstanceGroup(
			eventDefsToEventInstances(eventDefs, unzonedRange)
		);

		// so that inverse-background rendering can happen even when no eventRanges in view
		eventInstanceGroup.explicitEventDef = eventDefs[0];

		return eventInstanceGroup;
	}
};


Calendar.prototype.buildBusinessDefs = function(wholeDay, rawComplexDef) {
	var rawDefs = [];
	var requireDow = false;
	var i;
	var defs = [];

	if (rawComplexDef === true) {
		rawDefs = [ {} ]; // will get BUSINESS_HOUR_EVENT_DEFAULTS verbatim
	}
	else if ($.isPlainObject(rawComplexDef)) {
		rawDefs = [ rawComplexDef ];
	}
	else if ($.isArray(rawComplexDef)) {
		rawDefs = rawComplexDef;
		requireDow = true; // every sub-definition NEEDS a day-of-week
	}

	for (i = 0; i < rawDefs.length; i++) {
		if (!requireDow || rawDefs[i].dow) {
			defs.push(
				this.buildBusinessDef(wholeDay, rawDefs[i])
			);
		}
	}

	return defs;
};


Calendar.prototype.buildBusinessDef = function(wholeDay, rawDef) {
	var fullRawDef = $.extend({}, BUSINESS_HOUR_EVENT_DEFAULTS, rawDef);

	if (wholeDay) {
		fullRawDef.start = null;
		fullRawDef.end = null;
	}

	return RecurringEventDef.parse(
		fullRawDef,
		new EventSource(this) // dummy source
	);
};

;;

/*
determines if eventInstanceGroup is allowed,
in relation to other EVENTS and business hours.
*/
Calendar.prototype.isEventInstanceGroupAllowed = function(eventInstanceGroup) {
	var eventDef = eventInstanceGroup.getEventDef();
	var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
	var i;

	var peerEventInstances = this.getPeerEventInstances(eventDef);
	var peerEventRanges = eventInstancesToEventRanges(peerEventInstances);
	var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);

	var constraintVal = eventDef.getConstraint();
	var overlapVal = eventDef.getOverlap();

	var eventAllowFunc = this.opt('eventAllow');

	for (i = 0; i < eventFootprints.length; i++) {
		if (
			!this.isFootprintAllowed(
				eventFootprints[i].componentFootprint,
				peerEventFootprints,
				constraintVal,
				overlapVal,
				eventFootprints[i].eventInstance
			)
		) {
			return false;
		}
	}

	if (eventAllowFunc) {
		for (i = 0; i < eventFootprints.length; i++) {
			if (
				eventAllowFunc(
					eventFootprints[i].componentFootprint.toLegacy(this),
					eventFootprints[i].getEventLegacy()
				) === false
			) {
				return false;
			}
		}
	}

	return true;
};


Calendar.prototype.getPeerEventInstances = function(eventDef) {
	return this.eventManager.getEventInstancesWithoutId(eventDef.id);
};


Calendar.prototype.isSelectionFootprintAllowed = function(componentFootprint) {
	var peerEventInstances = this.eventManager.getEventInstances();
	var peerEventRanges = eventInstancesToEventRanges(peerEventInstances);
	var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);

	var selectAllowFunc;

	if (
		this.isFootprintAllowed(
			componentFootprint,
			peerEventFootprints,
			this.opt('selectConstraint'),
			this.opt('selectOverlap')
		)
	) {
		selectAllowFunc = this.opt('selectAllow');

		if (selectAllowFunc) {
			return selectAllowFunc(componentFootprint.toLegacy(this)) !== false;
		}
		else {
			return true;
		}
	}

	return false;
};


Calendar.prototype.isFootprintAllowed = function(
	componentFootprint,
	peerEventFootprints,
	constraintVal,
	overlapVal,
	subjectEventInstance // optional
) {
	var constraintFootprints; // ComponentFootprint[]
	var overlapEventFootprints; // EventFootprint[]

	if (constraintVal != null) {
		constraintFootprints = this.constraintValToFootprints(constraintVal, componentFootprint.isAllDay);

		if (!this.isFootprintWithinConstraints(componentFootprint, constraintFootprints)) {
			return false;
		}
	}

	overlapEventFootprints = this.collectOverlapEventFootprints(peerEventFootprints, componentFootprint);

	if (overlapVal === false) {
		if (overlapEventFootprints.length) {
			return false;
		}
	}
	else if (typeof overlapVal === 'function') {
		if (!isOverlapsAllowedByFunc(overlapEventFootprints, overlapVal, subjectEventInstance)) {
			return false;
		}
	}

	if (subjectEventInstance) {
		if (!isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance)) {
			return false;
		}
	}

	return true;
};


// Constraint
// ------------------------------------------------------------------------------------------------


Calendar.prototype.isFootprintWithinConstraints = function(componentFootprint, constraintFootprints) {
	var i;

	for (i = 0; i < constraintFootprints.length; i++) {
		if (this.footprintContainsFootprint(constraintFootprints[i], componentFootprint)) {
			return true;
		}
	}

	return false;
};


Calendar.prototype.constraintValToFootprints = function(constraintVal, isAllDay) {
	var eventInstances;

	if (constraintVal === 'businessHours') {
		return this.buildCurrentBusinessFootprints(isAllDay);
	}
	else if (typeof constraintVal === 'object') {
		eventInstances = this.parseEventDefToInstances(constraintVal); // handles recurring events

		if (!eventInstances) { // invalid input. fallback to parsing footprint directly
			return this.parseFootprints(constraintVal);
		}
		else {
			return this.eventInstancesToFootprints(eventInstances);
		}
	}
	else if (constraintVal != null) { // an ID
		eventInstances = this.eventManager.getEventInstancesWithId(constraintVal);

		return this.eventInstancesToFootprints(eventInstances);
	}
};


// conversion util
Calendar.prototype.eventInstancesToFootprints = function(eventInstances) {
	return eventFootprintsToComponentFootprints(
		this.eventRangesToEventFootprints(
			eventInstancesToEventRanges(eventInstances)
		)
	);
};


// Overlap
// ------------------------------------------------------------------------------------------------


Calendar.prototype.collectOverlapEventFootprints = function(peerEventFootprints, targetFootprint) {
	var overlapEventFootprints = [];
	var i;

	for (i = 0; i < peerEventFootprints.length; i++) {
		if (
			this.footprintsIntersect(
				targetFootprint,
				peerEventFootprints[i].componentFootprint
			)
		) {
			overlapEventFootprints.push(peerEventFootprints[i]);
		}
	}

	return overlapEventFootprints;
};


// optional subjectEventInstance
function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
	var i;

	for (i = 0; i < overlapEventFootprints.length; i++) {
		if (
			!overlapFunc(
				overlapEventFootprints[i].eventInstance.toLegacy(),
				subjectEventInstance ? subjectEventInstance.toLegacy() : null
			)
		) {
			return false;
		}
	}

	return true;
}


function isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance) {
	var subjectLegacyInstance = subjectEventInstance.toLegacy();
	var i;
	var overlapEventInstance;
	var overlapEventDef;
	var overlapVal;

	for (i = 0; i < overlapEventFootprints.length; i++) {
		overlapEventInstance = overlapEventFootprints[i].eventInstance;
		overlapEventDef = overlapEventInstance.def;

		// don't need to pass in calendar, because don't want to consider global eventOverlap property,
		// because we already considered that earlier in the process.
		overlapVal = overlapEventDef.getOverlap();

		if (overlapVal === false) {
			return false;
		}
		else if (typeof overlapVal === 'function') {
			if (
				!overlapVal(
					overlapEventInstance.toLegacy(),
					subjectLegacyInstance
				)
			) {
				return false;
			}
		}
	}

	return true;
}


// Conversion: eventDefs -> eventInstances -> eventRanges -> eventFootprints -> componentFootprints
// ------------------------------------------------------------------------------------------------
// NOTE: this might seem like repetitive code with the Grid class, however, this code is related to
// constraints whereas the Grid code is related to rendering. Each approach might want to convert
// eventRanges -> eventFootprints in a different way. Regardless, there are opportunities to make
// this more DRY.


/*
Returns false on invalid input.
*/
Calendar.prototype.parseEventDefToInstances = function(eventInput) {
	var eventPeriod = this.eventManager.currentPeriod;
	var eventDef = EventDefParser.parse(eventInput, new EventSource(this));

	if (!eventDef) { // invalid
		return false;
	}

	if (eventPeriod) {
		return eventDef.buildInstances(eventPeriod.unzonedRange);
	}
	else {
		return [];
	}
};


Calendar.prototype.eventRangesToEventFootprints = function(eventRanges) {
	var i;
	var eventFootprints = [];

	for (i = 0; i < eventRanges.length; i++) {
		eventFootprints.push.apply(eventFootprints, // append
			this.eventRangeToEventFootprints(eventRanges[i])
		);
	}

	return eventFootprints;
};


/*
TODO: somehow more DRY with Grid::eventRangeToEventFootprints
*/
Calendar.prototype.eventRangeToEventFootprints = function(eventRange) {
	return [
		new EventFootprint(
			new ComponentFootprint(
				eventRange.unzonedRange,
				eventRange.eventDef.isAllDay()
			),
			eventRange.eventDef,
			eventRange.eventInstance // might not exist
		)
	];
};


/*
Parses footprints directly.
Very similar to EventDateProfile::parse :(
*/
Calendar.prototype.parseFootprints = function(rawInput) {
	var start, end;

	if (rawInput.start) {
		start = this.moment(rawInput.start);

		if (!start.isValid()) {
			start = null;
		}
	}

	if (rawInput.end) {
		end = this.moment(rawInput.end);

		if (!end.isValid()) {
			end = null;
		}
	}

	return [
		new ComponentFootprint(
			new UnzonedRange(start, end),
			(start && !start.hasTime()) || (end && !end.hasTime()) // isAllDay
		)
	];
};


// Footprint Utils
// ----------------------------------------------------------------------------------------


Calendar.prototype.footprintContainsFootprint = function(outerFootprint, innerFootprint) {
	return outerFootprint.unzonedRange.containsRange(innerFootprint.unzonedRange);
};


Calendar.prototype.footprintsIntersect = function(footprint0, footprint1) {
	return footprint0.unzonedRange.intersectsWith(footprint1.unzonedRange);
};

;;

Calendar.mixin({

	// Sources
	// ------------------------------------------------------------------------------------


	getEventSources: function() {
		return this.eventManager.otherSources.slice(); // clone
	},


	getEventSourceById: function(id) {
		return this.eventManager.getSourceById(
			EventSource.normalizeId(id)
		);
	},


	addEventSource: function(sourceInput) {
		var source = EventSourceParser.parse(sourceInput, this);

		if (source) {
			this.eventManager.addSource(source);
		}
	},


	removeEventSources: function(sourceMultiQuery) {
		var eventManager = this.eventManager;
		var sources;
		var i;

		if (sourceMultiQuery == null) {
			this.eventManager.removeAllSources();
		}
		else {
			sources = eventManager.multiQuerySources(sourceMultiQuery);

			eventManager.freeze();

			for (i = 0; i < sources.length; i++) {
				eventManager.removeSource(sources[i]);
			}

			eventManager.thaw();
		}
	},


	removeEventSource: function(sourceQuery) {
		var eventManager = this.eventManager;
		var sources = eventManager.querySources(sourceQuery);
		var i;

		eventManager.freeze();

		for (i = 0; i < sources.length; i++) {
			eventManager.removeSource(sources[i]);
		}

		eventManager.thaw();
	},


	refetchEventSources: function(sourceMultiQuery) {
		var eventManager = this.eventManager;
		var sources = eventManager.multiQuerySources(sourceMultiQuery);
		var i;

		eventManager.freeze();

		for (i = 0; i < sources.length; i++) {
			eventManager.refetchSource(sources[i]);
		}

		eventManager.thaw();
	},


	// Events
	// ------------------------------------------------------------------------------------


	refetchEvents: function() {
		this.eventManager.refetchAllSources();
	},


	renderEvents: function(eventInputs, isSticky) {
		this.eventManager.freeze();

		for (var i = 0; i < eventInputs.length; i++) {
			this.renderEvent(eventInputs[i], isSticky);
		}

		this.eventManager.thaw();
	},


	renderEvent: function(eventInput, isSticky) {
		var eventManager = this.eventManager;
		var eventDef = EventDefParser.parse(
			eventInput,
			eventInput.source || eventManager.stickySource
		);

		if (eventDef) {
			eventManager.addEventDef(eventDef, isSticky);
		}
	},


	// legacyQuery operates on legacy event instance objects
	removeEvents: function(legacyQuery) {
		var eventManager = this.eventManager;
		var eventInstances = eventManager.getEventInstances();
		var legacyInstances;
		var idMap = {};
		var eventDef;
		var i;

		if (legacyQuery == null) { // shortcut for removing all
			eventManager.removeAllEventDefs();
		}
		else {
			legacyInstances = eventInstances.map(function(eventInstance) {
				return eventInstance.toLegacy();
			});

			legacyInstances = filterLegacyEventInstances(legacyInstances, legacyQuery);

			// compute unique IDs
			for (i = 0; i < legacyInstances.length; i++) {
				eventDef = this.eventManager.getEventDefByUid(legacyInstances[i]._id);
				idMap[eventDef.id] = true;
			}

			eventManager.freeze();

			for (i in idMap) { // reuse `i` as an "id"
				eventManager.removeEventDefsById(i);
			}

			eventManager.thaw();
		}
	},


	// legacyQuery operates on legacy event instance objects
	clientEvents: function(legacyQuery) {
		var eventInstances = this.eventManager.getEventInstances();
		var legacyEventInstances = eventInstances.map(function(eventInstance) {
			return eventInstance.toLegacy();
		});

		return filterLegacyEventInstances(legacyEventInstances, legacyQuery);
	},


	updateEvents: function(eventPropsArray) {
		this.eventManager.freeze();

		for (var i = 0; i < eventPropsArray.length; i++) {
			this.updateEvent(eventPropsArray[i]);
		}

		this.eventManager.thaw();
	},


	updateEvent: function(eventProps) {
		var eventDef = this.eventManager.getEventDefByUid(eventProps._id);
		var eventInstance;
		var eventDefMutation;

		if (eventDef instanceof SingleEventDef) {
			eventInstance = eventDef.buildInstance();

			eventDefMutation = EventDefMutation.createFromRawProps(
				eventInstance,
				eventProps, // raw props
				null // largeUnit -- who uses it?
			);

			this.eventManager.mutateEventsWithId(eventDef.id, eventDefMutation); // will release
		}
	}

});


function filterLegacyEventInstances(legacyEventInstances, legacyQuery) {
	if (legacyQuery == null) {
		return legacyEventInstances;
	}
	else if ($.isFunction(legacyQuery)) {
		return legacyEventInstances.filter(legacyQuery);
	}
	else { // an event ID
		legacyQuery += ''; // normalize to string

		return legacyEventInstances.filter(function(legacyEventInstance) {
			// soft comparison because id not be normalized to string
			return legacyEventInstance.id == legacyQuery;
		});
	}
}

;;

Calendar.defaults = {

	titleRangeSeparator: ' \u2013 ', // en dash
	monthYearFormat: 'MMMM YYYY', // required for en. other locales rely on datepicker computable option

	defaultTimedEventDuration: '02:00:00',
	defaultAllDayEventDuration: { days: 1 },
	forceEventDuration: false,
	nextDayThreshold: '09:00:00', // 9am

	// display
	defaultView: 'month',
	aspectRatio: 1.35,
	header: {
		left: 'title',
		center: '',
		right: 'today prev,next'
	},
	weekends: true,
	weekNumbers: false,

	weekNumberTitle: 'W',
	weekNumberCalculation: 'local',
	
	//editable: false,

	//nowIndicator: false,

	scrollTime: '06:00:00',
	minTime: '00:00:00',
	maxTime: '24:00:00',
	showNonCurrentDates: true,
	
	// event ajax
	lazyFetching: true,
	startParam: 'start',
	endParam: 'end',
	timezoneParam: 'timezone',

	timezone: false,

	//allDayDefault: undefined,

	// locale
	isRTL: false,
	buttonText: {
		prev: "prev",
		next: "next",
		prevYear: "prev year",
		nextYear: "next year",
		year: 'year', // TODO: locale files need to specify this
		today: 'today',
		month: 'month',
		week: 'week',
		day: 'day'
	},
	//buttonIcons: null,

	allDayText: 'all-day',
	
	// jquery-ui theming
	theme: false,
	//themeButtonIcons: null,

	//eventResizableFromStart: false,
	dragOpacity: .75,
	dragRevertDuration: 500,
	dragScroll: true,
	
	//selectable: false,
	unselectAuto: true,
	//selectMinDistance: 0,
	
	dropAccept: '*',

	eventOrder: 'title',
	//eventRenderWait: null,

	eventLimit: false,
	eventLimitText: 'more',
	eventLimitClick: 'popover',
	dayPopoverFormat: 'LL',
	
	handleWindowResize: true,
	windowResizeDelay: 100, // milliseconds before an updateSize happens

	longPressDelay: 1000
	
};


Calendar.englishDefaults = { // used by locale.js
	dayPopoverFormat: 'dddd, MMMM D'
};


Calendar.rtlDefaults = { // right-to-left defaults
	header: { // TODO: smarter solution (first/center/last ?)
		left: 'next,prev today',
		center: '',
		right: 'title'
	},
	buttonIcons: {
		prev: 'right-single-arrow',
		next: 'left-single-arrow',
		prevYear: 'right-double-arrow',
		nextYear: 'left-double-arrow'
	},
	themeButtonIcons: {
		prev: 'circle-triangle-e',
		next: 'circle-triangle-w',
		nextYear: 'seek-prev',
		prevYear: 'seek-next'
	}
};

;;

var localeOptionHash = FC.locales = {}; // initialize and expose


// TODO: document the structure and ordering of a FullCalendar locale file


// Initialize jQuery UI datepicker translations while using some of the translations
// Will set this as the default locales for datepicker.
FC.datepickerLocale = function(localeCode, dpLocaleCode, dpOptions) {

	// get the FullCalendar internal option hash for this locale. create if necessary
	var fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});

	// transfer some simple options from datepicker to fc
	fcOptions.isRTL = dpOptions.isRTL;
	fcOptions.weekNumberTitle = dpOptions.weekHeader;

	// compute some more complex options from datepicker
	$.each(dpComputableOptions, function(name, func) {
		fcOptions[name] = func(dpOptions);
	});

	// is jQuery UI Datepicker is on the page?
	if ($.datepicker) {

		// Register the locale data.
		// FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
		// does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
		// Make an alias so the locale can be referenced either way.
		$.datepicker.regional[dpLocaleCode] =
			$.datepicker.regional[localeCode] = // alias
				dpOptions;

		// Alias 'en' to the default locale data. Do this every time.
		$.datepicker.regional.en = $.datepicker.regional[''];

		// Set as Datepicker's global defaults.
		$.datepicker.setDefaults(dpOptions);
	}
};


// Sets FullCalendar-specific translations. Will set the locales as the global default.
FC.locale = function(localeCode, newFcOptions) {
	var fcOptions;
	var momOptions;

	// get the FullCalendar internal option hash for this locale. create if necessary
	fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});

	// provided new options for this locales? merge them in
	if (newFcOptions) {
		fcOptions = localeOptionHash[localeCode] = mergeOptions([ fcOptions, newFcOptions ]);
	}

	// compute locale options that weren't defined.
	// always do this. newFcOptions can be undefined when initializing from i18n file,
	// so no way to tell if this is an initialization or a default-setting.
	momOptions = getMomentLocaleData(localeCode); // will fall back to en
	$.each(momComputableOptions, function(name, func) {
		if (fcOptions[name] == null) {
			fcOptions[name] = func(momOptions, fcOptions);
		}
	});

	// set it as the default locale for FullCalendar
	Calendar.defaults.locale = localeCode;
};


// NOTE: can't guarantee any of these computations will run because not every locale has datepicker
// configs, so make sure there are English fallbacks for these in the defaults file.
var dpComputableOptions = {

	buttonText: function(dpOptions) {
		return {
			// the translations sometimes wrongly contain HTML entities
			prev: stripHtmlEntities(dpOptions.prevText),
			next: stripHtmlEntities(dpOptions.nextText),
			today: stripHtmlEntities(dpOptions.currentText)
		};
	},

	// Produces format strings like "MMMM YYYY" -> "September 2014"
	monthYearFormat: function(dpOptions) {
		return dpOptions.showMonthAfterYear ?
			'YYYY[' + dpOptions.yearSuffix + '] MMMM' :
			'MMMM YYYY[' + dpOptions.yearSuffix + ']';
	}

};

var momComputableOptions = {

	// Produces format strings like "ddd M/D" -> "Fri 9/15"
	dayOfMonthFormat: function(momOptions, fcOptions) {
		var format = momOptions.longDateFormat('l'); // for the format like "M/D/YYYY"

		// strip the year off the edge, as well as other misc non-whitespace chars
		format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, '');

		if (fcOptions.isRTL) {
			format += ' ddd'; // for RTL, add day-of-week to end
		}
		else {
			format = 'ddd ' + format; // for LTR, add day-of-week to beginning
		}
		return format;
	},

	// Produces format strings like "h:mma" -> "6:00pm"
	mediumTimeFormat: function(momOptions) { // can't be called `timeFormat` because collides with option
		return momOptions.longDateFormat('LT')
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h(:mm)a" -> "6pm" / "6:30pm"
	smallTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '(:mm)')
			.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
	extraSmallTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '(:mm)')
			.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
			.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
	},

	// Produces format strings like "ha" / "H" -> "6pm" / "18"
	hourFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(':mm', '')
			.replace(/(\Wmm)$/, '') // like above, but for foreign locales
			.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
	},

	// Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
	noMeridiemTimeFormat: function(momOptions) {
		return momOptions.longDateFormat('LT')
			.replace(/\s*a$/i, ''); // remove trailing AM/PM
	}

};


// options that should be computed off live calendar options (considers override options)
// TODO: best place for this? related to locale?
// TODO: flipping text based on isRTL is a bad idea because the CSS `direction` might want to handle it
var instanceComputableOptions = {

	// Produces format strings for results like "Mo 16"
	smallDayDateFormat: function(options) {
		return options.isRTL ?
			'D dd' :
			'dd D';
	},

	// Produces format strings for results like "Wk 5"
	weekFormat: function(options) {
		return options.isRTL ?
			'w[ ' + options.weekNumberTitle + ']' :
			'[' + options.weekNumberTitle + ' ]w';
	},

	// Produces format strings for results like "Wk5"
	smallWeekFormat: function(options) {
		return options.isRTL ?
			'w[' + options.weekNumberTitle + ']' :
			'[' + options.weekNumberTitle + ']w';
	}

};

// TODO: make these computable properties in optionsModel
function populateInstanceComputableOptions(options) {
	$.each(instanceComputableOptions, function(name, func) {
		if (options[name] == null) {
			options[name] = func(options);
		}
	});
}


// Returns moment's internal locale data. If doesn't exist, returns English.
function getMomentLocaleData(localeCode) {
	return moment.localeData(localeCode) || moment.localeData('en');
}


// Initialize English by forcing computation of moment-derived options.
// Also, sets it as the default.
FC.locale('en', Calendar.englishDefaults);

;;

var UnzonedRange = FC.UnzonedRange = Class.extend({

	startMs: null, // if null, no start constraint
	endMs: null, // if null, no end constraint

	// TODO: move these into footprint.
	// Especially, doesn't make sense for null startMs/endMs.
	isStart: true,
	isEnd: true,

	constructor: function(startInput, endInput) {

		if (moment.isMoment(startInput)) {
			startInput = startInput.clone().stripZone();
		}

		if (moment.isMoment(endInput)) {
			endInput = endInput.clone().stripZone();
		}

		if (startInput) {
			this.startMs = startInput.valueOf();
		}

		if (endInput) {
			this.endMs = endInput.valueOf();
		}
	},

	intersect: function(otherRange) {
		var startMs = this.startMs;
		var endMs = this.endMs;
		var newRange = null;

		if (otherRange.startMs !== null) {
			if (startMs === null) {
				startMs = otherRange.startMs;
			}
			else {
				startMs = Math.max(startMs, otherRange.startMs);
			}
		}

		if (otherRange.endMs !== null) {
			if (endMs === null) {
				endMs = otherRange.endMs;
			}
			else {
				endMs = Math.min(endMs, otherRange.endMs);
			}
		}

		if (startMs === null || endMs === null || startMs < endMs) {
			newRange = new UnzonedRange(startMs, endMs);
			newRange.isStart = this.isStart && startMs === this.startMs;
			newRange.isEnd = this.isEnd && endMs === this.endMs;
		}

		return newRange;
	},


	intersectsWith: function(otherRange) {
		return (this.endMs === null || otherRange.startMs === null || this.endMs > otherRange.startMs) &&
			(this.startMs === null || otherRange.endMs === null || this.startMs < otherRange.endMs);
	},


	containsRange: function(innerRange) {
		return (this.startMs === null || (innerRange.startMs !== null && innerRange.startMs >= this.startMs)) &&
			(this.endMs === null || (innerRange.endMs !== null && innerRange.endMs <= this.endMs));
	},


	// `date` can be a moment, a Date, or a millisecond time.
	containsDate: function(date) {
		var ms = date.valueOf();

		return (this.startMs === null || ms >= this.startMs) &&
			(this.endMs === null || ms < this.endMs);
	},


	// If the given date is not within the given range, move it inside.
	// (If it's past the end, make it one millisecond before the end).
	// `date` can be a moment, a Date, or a millisecond time.
	// Returns a MS-time.
	constrainDate: function(date) {
		var ms = date.valueOf();

		if (this.startMs !== null && ms < this.startMs) {
			ms = this.startMs;
		}

		if (this.endMs !== null && ms >= this.endMs) {
			ms = this.endMs - 1;
		}

		return ms;
	},


	equals: function(otherRange) {
		return this.startMs === otherRange.startMs && this.endMs === otherRange.endMs;
	},


	clone: function() {
		var range = new UnzonedRange(this.startMs, this.endMs);

		range.isStart = this.isStart;
		range.isEnd = this.isEnd;

		return range;
	},


	// Returns an ambig-zoned moment from startMs.
	// BEWARE: returned moment is not localized.
	// Formatting and start-of-week will be default.
	getStart: function() {
		if (this.startMs !== null) {
			return FC.moment.utc(this.startMs).stripZone();
		}
	},

	// Returns an ambig-zoned moment from startMs.
	// BEWARE: returned moment is not localized.
	// Formatting and start-of-week will be default.
	getEnd: function() {
		if (this.endMs !== null) {
			return FC.moment.utc(this.endMs).stripZone();
		}
	}

});


/*
SIDEEFFECT: will mutate eventRanges.
Will return a new array result.
Only works for non-open-ended ranges.
*/
function invertUnzonedRanges(ranges, constraintRange) {
	var invertedRanges = [];
	var startMs = constraintRange.startMs; // the end of the previous range. the start of the new range
	var i;
	var dateRange;

	// ranges need to be in order. required for our date-walking algorithm
	ranges.sort(compareUnzonedRanges);

	for (i = 0; i < ranges.length; i++) {
		dateRange = ranges[i];

		// add the span of time before the event (if there is any)
		if (dateRange.startMs > startMs) { // compare millisecond time (skip any ambig logic)
			invertedRanges.push(
				new UnzonedRange(startMs, dateRange.startMs)
			);
		}

		if (dateRange.endMs > startMs) {
			startMs = dateRange.endMs;
		}
	}

	// add the span of time after the last event (if there is any)
	if (startMs < constraintRange.endMs) { // compare millisecond time (skip any ambig logic)
		invertedRanges.push(
			new UnzonedRange(startMs, constraintRange.endMs)
		);
	}

	return invertedRanges;
}


/*
Only works for non-open-ended ranges.
*/
function compareUnzonedRanges(range1, range2) {
	return range1.startMs - range2.startMs; // earlier ranges go first
}

;;

/*
Meant to be immutable
*/
var ComponentFootprint = FC.ComponentFootprint = Class.extend({

	unzonedRange: null,
	isAllDay: false, // component can choose to ignore this


	constructor: function(unzonedRange, isAllDay) {
		this.unzonedRange = unzonedRange;
		this.isAllDay = isAllDay;
	},


	/*
	Only works for non-open-ended ranges.
	*/
	toLegacy: function(calendar) {
		return {
			start: calendar.msToMoment(this.unzonedRange.startMs, this.isAllDay),
			end: calendar.msToMoment(this.unzonedRange.endMs, this.isAllDay)
		};
	}

});

;;

var EventManager = Class.extend(EmitterMixin, ListenerMixin, {

	currentPeriod: null,

	calendar: null,
	stickySource: null,
	otherSources: null, // does not include sticky source


	constructor: function(calendar) {
		this.calendar = calendar;
		this.stickySource = new ArrayEventSource(calendar);
		this.otherSources = [];
	},


	requestEvents: function(start, end, timezone, force) {
		if (
			force ||
			!this.currentPeriod ||
			!this.currentPeriod.isWithinRange(start, end) ||
			timezone !== this.currentPeriod.timezone
		) {
			this.setPeriod( // will change this.currentPeriod
				new EventPeriod(start, end, timezone)
			);
		}

		return this.currentPeriod.whenReleased();
	},


	// Source Adding/Removing
	// -----------------------------------------------------------------------------------------------------------------


	addSource: function(eventSource) {
		this.otherSources.push(eventSource);

		if (this.currentPeriod) {
			this.currentPeriod.requestSource(eventSource); // might release
		}
	},


	removeSource: function(doomedSource) {
		removeExact(this.otherSources, doomedSource);

		if (this.currentPeriod) {
			this.currentPeriod.purgeSource(doomedSource); // might release
		}
	},


	removeAllSources: function() {
		this.otherSources = [];

		if (this.currentPeriod) {
			this.currentPeriod.purgeAllSources(); // might release
		}
	},


	// Source Refetching
	// -----------------------------------------------------------------------------------------------------------------


	refetchSource: function(eventSource) {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			currentPeriod.freeze();
			currentPeriod.purgeSource(eventSource);
			currentPeriod.requestSource(eventSource);
			currentPeriod.thaw();
		}
	},


	refetchAllSources: function() {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			currentPeriod.freeze();
			currentPeriod.purgeAllSources();
			currentPeriod.requestSources(this.getSources());
			currentPeriod.thaw();
		}
	},


	// Source Querying
	// -----------------------------------------------------------------------------------------------------------------


	getSources: function() {
		return [ this.stickySource ].concat(this.otherSources);
	},


	// like querySources, but accepts multple match criteria (like multiple IDs)
	multiQuerySources: function(matchInputs) {

		// coerce into an array
		if (!matchInputs) {
			matchInputs = [];
		}
		else if (!$.isArray(matchInputs)) {
			matchInputs = [ matchInputs ];
		}

		var matchingSources = [];
		var i;

		// resolve raw inputs to real event source objects
		for (i = 0; i < matchInputs.length; i++) {
			matchingSources.push.apply( // append
				matchingSources,
				this.querySources(matchInputs[i])
			);
		}

		return matchingSources;
	},


	// matchInput can either by a real event source object, an ID, or the function/URL for the source.
	// returns an array of matching source objects.
	querySources: function(matchInput) {
		var sources = this.otherSources;
		var i, source;

		// given a proper event source object
		for (i = 0; i < sources.length; i++) {
			source = sources[i];

			if (source === matchInput) {
				return [ source ];
			}
		}

		// an ID match
		source = this.getSourceById(EventSource.normalizeId(matchInput));
		if (source) {
			return [ source ];
		}

		// parse as an event source
		matchInput = EventSourceParser.parse(matchInput, this.calendar);
		if (matchInput) {

			return $.grep(sources, function(source) {
				return isSourcesEquivalent(matchInput, source);
			});
		}
	},


	/*
	ID assumed to already be normalized
	*/
	getSourceById: function(id) {
		return $.grep(this.otherSources, function(source) {
			return source.id && source.id === id;
		})[0];
	},


	// Event-Period
	// -----------------------------------------------------------------------------------------------------------------


	setPeriod: function(eventPeriod) {
		if (this.currentPeriod) {
			this.unbindPeriod(this.currentPeriod);
			this.currentPeriod = null;
		}

		this.currentPeriod = eventPeriod;
		this.bindPeriod(eventPeriod);

		eventPeriod.requestSources(this.getSources());
	},


	bindPeriod: function(eventPeriod) {
		this.listenTo(eventPeriod, 'release', function(eventsPayload) {
			this.trigger('release', eventsPayload);
		});
	},


	unbindPeriod: function(eventPeriod) {
		this.stopListeningTo(eventPeriod);
	},


	// Event Getting/Adding/Removing
	// -----------------------------------------------------------------------------------------------------------------


	getEventDefByUid: function(uid) {
		if (this.currentPeriod) {
			return this.currentPeriod.getEventDefByUid(uid);
		}
	},


	addEventDef: function(eventDef, isSticky) {
		if (isSticky) {
			this.stickySource.addEventDef(eventDef);
		}

		if (this.currentPeriod) {
			this.currentPeriod.addEventDef(eventDef); // might release
		}
	},


	removeEventDefsById: function(eventId) {
		this.getSources().forEach(function(eventSource) {
			eventSource.removeEventDefsById(eventId);
		});

		if (this.currentPeriod) {
			this.currentPeriod.removeEventDefsById(eventId); // might release
		}
	},


	removeAllEventDefs: function() {
		this.getSources().forEach(function(eventSource) {
			eventSource.removeAllEventDefs();
		});

		if (this.currentPeriod) {
			this.currentPeriod.removeAllEventDefs();
		}
	},


	// Event Mutating
	// -----------------------------------------------------------------------------------------------------------------


	/*
	Returns an undo function.
	*/
	mutateEventsWithId: function(eventDefId, eventDefMutation) {
		var currentPeriod = this.currentPeriod;
		var eventDefs;
		var undoFuncs = [];

		if (currentPeriod) {

			currentPeriod.freeze();

			eventDefs = currentPeriod.getEventDefsById(eventDefId);
			eventDefs.forEach(function(eventDef) {
				// add/remove esp because id might change
				currentPeriod.removeEventDef(eventDef);
				undoFuncs.push(eventDefMutation.mutateSingle(eventDef));
				currentPeriod.addEventDef(eventDef);
			});

			currentPeriod.thaw();

			return function() {
				currentPeriod.freeze();

				for (var i = 0; i < eventDefs.length; i++) {
					currentPeriod.removeEventDef(eventDefs[i]);
					undoFuncs[i]();
					currentPeriod.addEventDef(eventDefs[i]);
				}

				currentPeriod.thaw();
			};
		}

		return function() { };
	},


	/*
	copies and then mutates
	*/
	buildMutatedEventInstanceGroup: function(eventDefId, eventDefMutation) {
		var eventDefs = this.getEventDefsById(eventDefId);
		var i;
		var defCopy;
		var allInstances = [];

		for (i = 0; i < eventDefs.length; i++) {
			defCopy = eventDefs[i].clone();

			if (defCopy instanceof SingleEventDef) {
				eventDefMutation.mutateSingle(defCopy);

				allInstances.push.apply(allInstances, // append
					defCopy.buildInstances()
				);
			}
		}

		return new EventInstanceGroup(allInstances);
	},


	// Freezing
	// -----------------------------------------------------------------------------------------------------------------


	freeze: function() {
		if (this.currentPeriod) {
			this.currentPeriod.freeze();
		}
	},


	thaw: function() {
		if (this.currentPeriod) {
			this.currentPeriod.thaw();
		}
	}

});


// Methods that straight-up query the current EventPeriod for an array of results.
[
	'getEventDefsById',
	'getEventInstances',
	'getEventInstancesWithId',
	'getEventInstancesWithoutId'
].forEach(function(methodName) {

	EventManager.prototype[methodName] = function() {
		var currentPeriod = this.currentPeriod;

		if (currentPeriod) {
			return currentPeriod[methodName].apply(currentPeriod, arguments);
		}

		return [];
	};
});


function isSourcesEquivalent(source0, source1) {
	return source0.getPrimitive() == source1.getPrimitive();
}

;;

var EventPeriod = Class.extend(EmitterMixin, {

	start: null,
	end: null,
	timezone: null,

	unzonedRange: null,

	requestsByUid: null,
	pendingCnt: 0,

	freezeDepth: 0,
	stuntedReleaseCnt: 0,
	releaseCnt: 0,

	eventDefsByUid: null,
	eventDefsById: null,
	eventInstanceGroupsById: null,


	constructor: function(start, end, timezone) {
		this.start = start;
		this.end = end;
		this.timezone = timezone;

		this.unzonedRange = new UnzonedRange(
			start.clone().stripZone(),
			end.clone().stripZone()
		);

		this.requestsByUid = {};
		this.eventDefsByUid = {};
		this.eventDefsById = {};
		this.eventInstanceGroupsById = {};
	},


	isWithinRange: function(start, end) {
		// TODO: use a range util function?
		return !start.isBefore(this.start) && !end.isAfter(this.end);
	},


	// Requesting and Purging
	// -----------------------------------------------------------------------------------------------------------------


	requestSources: function(sources) {
		this.freeze();

		for (var i = 0; i < sources.length; i++) {
			this.requestSource(sources[i]);
		}

		this.thaw();
	},


	requestSource: function(source) {
		var _this = this;
		var request = { source: source, status: 'pending' };

		this.requestsByUid[source.uid] = request;
		this.pendingCnt += 1;

		source.fetch(this.start, this.end, this.timezone).then(function(eventDefs) {
			if (request.status !== 'cancelled') {
				request.status = 'completed';
				request.eventDefs = eventDefs;

				_this.addEventDefs(eventDefs);
				_this.pendingCnt--;
				_this.tryRelease();
			}
		}, function() { // failure
			if (request.status !== 'cancelled') {
				request.status = 'failed';

				_this.pendingCnt--;
				_this.tryRelease();
			}
		});
	},


	purgeSource: function(source) {
		var request = this.requestsByUid[source.uid];

		if (request) {
			delete this.requestsByUid[source.uid];

			if (request.status === 'pending') {
				request.status = 'cancelled';
				this.pendingCnt--;
				this.tryRelease();
			}
			else if (request.status === 'completed') {
				request.eventDefs.forEach(this.removeEventDef.bind(this));
			}
		}
	},


	purgeAllSources: function() {
		var requestsByUid = this.requestsByUid;
		var uid, request;
		var completedCnt = 0;

		for (uid in requestsByUid) {
			request = requestsByUid[uid];

			if (request.status === 'pending') {
				request.status = 'cancelled';
			}
			else if (request.status === 'completed') {
				completedCnt++;
			}
		}

		this.requestsByUid = {};
		this.pendingCnt = 0;

		if (completedCnt) {
			this.removeAllEventDefs(); // might release
		}
	},


	// Event Definitions
	// -----------------------------------------------------------------------------------------------------------------


	getEventDefByUid: function(eventDefUid) {
		return this.eventDefsByUid[eventDefUid];
	},


	getEventDefsById: function(eventDefId) {
		var a = this.eventDefsById[eventDefId];

		if (a) {
			return a.slice(); // clone
		}

		return [];
	},


	addEventDefs: function(eventDefs) {
		for (var i = 0; i < eventDefs.length; i++) {
			this.addEventDef(eventDefs[i]);
		}
	},


	addEventDef: function(eventDef) {
		var eventDefsById = this.eventDefsById;
		var eventDefId = eventDef.id;
		var eventDefs = eventDefsById[eventDefId] || (eventDefsById[eventDefId] = []);
		var eventInstances = eventDef.buildInstances(this.unzonedRange);
		var i;

		eventDefs.push(eventDef);

		this.eventDefsByUid[eventDef.uid] = eventDef;

		for (i = 0; i < eventInstances.length; i++) {
			this.addEventInstance(eventInstances[i], eventDefId);
		}
	},


	removeEventDefsById: function(eventDefId) {
		var _this = this;

		this.getEventDefsById(eventDefId).forEach(function(eventDef) {
			_this.removeEventDef(eventDef);
		});
	},


	removeAllEventDefs: function() {
		var isEmpty = $.isEmptyObject(this.eventDefsByUid);

		this.eventDefsByUid = {};
		this.eventDefsById = {};
		this.eventInstanceGroupsById = {};

		if (!isEmpty) {
			this.tryRelease();
		}
	},


	removeEventDef: function(eventDef) {
		var eventDefsById = this.eventDefsById;
		var eventDefs = eventDefsById[eventDef.id];

		delete this.eventDefsByUid[eventDef.uid];

		if (eventDefs) {
			removeExact(eventDefs, eventDef);

			if (!eventDefs.length) {
				delete eventDefsById[eventDef.id];
			}

			this.removeEventInstancesForDef(eventDef);
		}
	},


	// Event Instances
	// -----------------------------------------------------------------------------------------------------------------


	getEventInstances: function() { // TODO: consider iterator
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstances = [];
		var id;

		for (id in eventInstanceGroupsById) {
			eventInstances.push.apply(eventInstances, // append
				eventInstanceGroupsById[id].eventInstances
			);
		}

		return eventInstances;
	},


	getEventInstancesWithId: function(eventDefId) {
		var eventInstanceGroup = this.eventInstanceGroupsById[eventDefId];

		if (eventInstanceGroup) {
			return eventInstanceGroup.eventInstances.slice(); // clone
		}

		return [];
	},


	getEventInstancesWithoutId: function(eventDefId) { // TODO: consider iterator
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var matchingInstances = [];
		var id;

		for (id in eventInstanceGroupsById) {
			if (id !== eventDefId) {
				matchingInstances.push.apply(matchingInstances, // append
					eventInstanceGroupsById[id].eventInstances
				);
			}
		}

		return matchingInstances;
	},


	addEventInstance: function(eventInstance, eventDefId) {
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstanceGroup = eventInstanceGroupsById[eventDefId] ||
			(eventInstanceGroupsById[eventDefId] = new EventInstanceGroup());

		eventInstanceGroup.eventInstances.push(eventInstance);

		this.tryRelease();
	},


	removeEventInstancesForDef: function(eventDef) {
		var eventInstanceGroupsById = this.eventInstanceGroupsById;
		var eventInstanceGroup = eventInstanceGroupsById[eventDef.id];
		var removeCnt;

		if (eventInstanceGroup) {
			removeCnt = removeMatching(eventInstanceGroup.eventInstances, function(currentEventInstance) {
				return currentEventInstance.def === eventDef;
			});

			if (!eventInstanceGroup.eventInstances.length) {
				delete eventInstanceGroupsById[eventDef.id];
			}

			if (removeCnt) {
				this.tryRelease();
			}
		}
	},


	// Releasing and Freezing
	// -----------------------------------------------------------------------------------------------------------------


	tryRelease: function() {
		if (!this.pendingCnt) {
			if (!this.freezeDepth) {
				this.release();
			}
			else {
				this.stuntedReleaseCnt++;
			}
		}
	},


	release: function() {
		this.releaseCnt++;
		this.trigger('release', this.eventInstanceGroupsById);
	},


	whenReleased: function() {
		var _this = this;

		if (this.releaseCnt) {
			return Promise.resolve(this.eventInstanceGroupsById);
		}
		else {
			return Promise.construct(function(onResolve) {
				_this.one('release', onResolve);
			});
		}
	},


	freeze: function() {
		if (!(this.freezeDepth++)) {
			this.stuntedReleaseCnt = 0;
		}
	},


	thaw: function() {
		if (!(--this.freezeDepth) && this.stuntedReleaseCnt && !this.pendingCnt) {
			this.release();
		}
	}

});

;;

var EventDefParser = {

	parse: function(eventInput, source) {
		if (
			isTimeString(eventInput.start) || moment.isDuration(eventInput.start) ||
			isTimeString(eventInput.end) || moment.isDuration(eventInput.end)
		) {
			return RecurringEventDef.parse(eventInput, source);
		}
		else {
			return SingleEventDef.parse(eventInput, source);
		}
	}

};

;;

var EventDef = FC.EventDef = Class.extend(ParsableModelMixin, {

	source: null, // required

	id: null, // normalized supplied ID
	rawId: null, // unnormalized supplied ID
	uid: null, // internal ID. new ID for every definition

	// NOTE: eventOrder sorting relies on these
	title: null,
	url: null,
	rendering: null,
	constraint: null,
	overlap: null,
	editable: null,
	startEditable: null,
	durationEditable: null,
	color: null,
	backgroundColor: null,
	borderColor: null,
	textColor: null,

	className: null, // an array. TODO: rename to className*s* (API breakage)
	miscProps: null,


	constructor: function(source) {
		this.source = source;
		this.className = [];
		this.miscProps = {};
	},


	isAllDay: function() {
		// subclasses must implement
	},


	buildInstances: function(unzonedRange) {
		// subclasses must implement
	},


	clone: function() {
		var copy = new this.constructor(this.source);

		copy.id = this.id;
		copy.rawId = this.rawId;
		copy.uid = this.uid; // not really unique anymore :(

		EventDef.copyVerbatimStandardProps(this, copy);

		copy.className = this.className; // should clone?
		copy.miscProps = $.extend({}, this.miscProps);

		return copy;
	},


	hasInverseRendering: function() {
		return this.getRendering() === 'inverse-background';
	},


	hasBgRendering: function() {
		var rendering = this.getRendering();

		return rendering === 'inverse-background' || rendering === 'background';
	},


	getRendering: function() {
		if (this.rendering != null) {
			return this.rendering;
		}

		return this.source.rendering;
	},


	getConstraint: function() {
		if (this.constraint != null) {
			return this.constraint;
		}

		if (this.source.constraint != null) {
			return this.source.constraint;
		}

		return this.source.calendar.opt('eventConstraint'); // what about View option?
	},


	getOverlap: function() {
		if (this.overlap != null) {
			return this.overlap;
		}

		if (this.source.overlap != null) {
			return this.source.overlap;
		}

		return this.source.calendar.opt('eventOverlap'); // what about View option?
	},


	isStartExplicitlyEditable: function() {
		if (this.startEditable !== null) {
			return this.startEditable;
		}

		return this.source.startEditable;
	},


	isDurationExplicitlyEditable: function() {
		if (this.durationEditable !== null) {
			return this.durationEditable;
		}

		return this.source.durationEditable;
	},


	isExplicitlyEditable: function() {
		if (this.editable !== null) {
			return this.editable;
		}

		return this.source.editable;
	},


	toLegacy: function() {
		var obj = $.extend({}, this.miscProps);

		obj._id = this.uid;
		obj.source = this.source;
		obj.className = this.className; // should clone?
		obj.allDay = this.isAllDay();

		if (this.rawId != null) {
			obj.id = this.rawId;
		}

		EventDef.copyVerbatimStandardProps(this, obj);

		return obj;
	},


	applyManualRawProps: function(rawProps) {

		if (rawProps.id != null) {
			this.id = EventDef.normalizeId((this.rawId = rawProps.id));
		}
		else {
			this.id = EventDef.generateId();
		}

		if (rawProps._id != null) { // accept this prop, even tho somewhat internal
			this.uid = String(rawProps._id);
		}
		else {
			this.uid = EventDef.generateId();
		}

		// TODO: converge with EventSource
		if ($.isArray(rawProps.className)) {
			this.className = rawProps.className;
		}
		if (typeof rawProps.className === 'string') {
			this.className = rawProps.className.split(/\s+/);
		}

		return true;
	},


	applyOtherRawProps: function(rawProps) {
		this.miscProps = rawProps;
	}

});

// finish initializing the mixin
EventDef.allowRawProps = ParsableModelMixin_allowRawProps;
EventDef.copyVerbatimStandardProps = ParsableModelMixin_copyVerbatimStandardProps;


// IDs
// ---------------------------------------------------------------------------------------------------------------------
// TODO: converge with EventSource


EventDef.uuid = 0;


EventDef.normalizeId = function(id) {
	return String(id);
};


EventDef.generateId = function() {
	return '_fc' + (EventDef.uuid++);
};


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


EventDef.allowRawProps({
	// not automatically assigned (`false`)
	_id: false,
	id: false,
	className: false,
	source: false, // will ignored

	// automatically assigned (`true`)
	title: true,
	url: true,
	rendering: true,
	constraint: true,
	overlap: true,
	editable: true,
	startEditable: true,
	durationEditable: true,
	color: true,
	backgroundColor: true,
	borderColor: true,
	textColor: true
});


EventDef.parse = function(rawInput, source) {
	var def = new this(source);
	var calendarTransform = source.calendar.opt('eventDataTransform');
	var sourceTransform = source.eventDataTransform;

	if (calendarTransform) {
		rawInput = calendarTransform(rawInput);
	}
	if (sourceTransform) {
		rawInput = sourceTransform(rawInput);
	}

	if (def.applyRawProps(rawInput)) {
		return def;
	}

	return false;
};

;;

var SingleEventDef = EventDef.extend({

	dateProfile: null,


	/*
	Will receive start/end params, but will be ignored.
	*/
	buildInstances: function() {
		return [ this.buildInstance() ];
	},


	buildInstance: function() {
		return new EventInstance(
			this, // definition
			this.dateProfile
		);
	},


	isAllDay: function() {
		return this.dateProfile.isAllDay();
	},


	clone: function() {
		var def = EventDef.prototype.clone.call(this);

		def.dateProfile = this.dateProfile;

		return def;
	},


	rezone: function() {
		var calendar = this.source.calendar;
		var dateProfile = this.dateProfile;

		this.dateProfile = new EventDateProfile(
			calendar.moment(dateProfile.start),
			dateProfile.end ? calendar.moment(dateProfile.end) : null,
			calendar
		);
	},


	/*
	NOTE: if super-method fails, should still attempt to apply
	*/
	applyManualRawProps: function(rawProps) {
		var superSuccess = EventDef.prototype.applyManualRawProps.apply(this, arguments);
		var dateProfile = EventDateProfile.parse(rawProps, this.source); // returns null on failure

		if (dateProfile) {
			this.dateProfile = dateProfile;

			// make sure `date` shows up in the legacy event objects as-is
			if (rawProps.date != null) {
				this.miscProps.date = rawProps.date;
			}

			return superSuccess;
		}
		else {
			return false;
		}
	}

});


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


SingleEventDef.allowRawProps({ // false = manually process
	start: false,
	date: false, // alias for 'start'
	end: false,
	allDay: false
});

;;

var RecurringEventDef = EventDef.extend({

	startTime: null, // duration
	endTime: null, // duration, or null
	dowHash: null, // object hash, or null


	isAllDay: function() {
		return !this.startTime && !this.endTime;
	},


	buildInstances: function(unzonedRange) {
		var calendar = this.source.calendar;
		var unzonedDate = unzonedRange.getStart();
		var unzonedEnd = unzonedRange.getEnd();
		var zonedDayStart;
		var instanceStart, instanceEnd;
		var instances = [];

		while (unzonedDate.isBefore(unzonedEnd)) {

			// if everyday, or this particular day-of-week
			if (!this.dowHash || this.dowHash[unzonedDate.day()]) {

				zonedDayStart = calendar.applyTimezone(unzonedDate);
				instanceStart = zonedDayStart.clone();
				instanceEnd = null;

				if (this.startTime) {
					instanceStart.time(this.startTime);
				}
				else {
					instanceStart.stripTime();
				}

				if (this.endTime) {
					instanceEnd = zonedDayStart.clone().time(this.endTime);
				}

				instances.push(
					new EventInstance(
						this, // definition
						new EventDateProfile(instanceStart, instanceEnd, calendar)
					)
				);
			}

			unzonedDate.add(1, 'days');
		}

		return instances;
	},


	setDow: function(dowNumbers) {

		if (!this.dowHash) {
			this.dowHash = {};
		}

		for (var i = 0; i < dowNumbers.length; i++) {
			this.dowHash[dowNumbers[i]] = true;
		}
	},


	clone: function() {
		var def = EventDef.prototype.clone.call(this);

		if (def.startTime) {
			def.startTime = moment.duration(this.startTime);
		}

		if (def.endTime) {
			def.endTime = moment.duration(this.endTime);
		}

		if (this.dowHash) {
			def.dowHash = $.extend({}, this.dowHash);
		}

		return def;
	},


	/*
	NOTE: if super-method fails, should still attempt to apply
	*/
	applyRawProps: function(rawProps) {
		var superSuccess = EventDef.prototype.applyRawProps.apply(this, arguments);

		if (rawProps.start) {
			this.startTime = moment.duration(rawProps.start);
		}

		if (rawProps.end) {
			this.endTime = moment.duration(rawProps.end);
		}

		if (rawProps.dow) {
			this.setDow(rawProps.dow);
		}

		return superSuccess;
	}

});


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


RecurringEventDef.allowRawProps({ // false = manually process
	start: false,
	end: false,
	dow: false
});

;;

var EventInstance = Class.extend({

	def: null, // EventDef
	dateProfile: null, // EventDateProfile


	constructor: function(def, dateProfile) {
		this.def = def;
		this.dateProfile = dateProfile;
	},


	toLegacy: function() {
		var dateProfile = this.dateProfile;
		var obj = this.def.toLegacy();

		obj.start = dateProfile.start.clone();
		obj.end = dateProfile.end ? dateProfile.end.clone() : null;

		return obj;
	}

});

;;

/*
It's expected that there will be at least one EventInstance,
OR that an explicitEventDef is assigned.
*/
var EventInstanceGroup = Class.extend({

	eventInstances: null,
	explicitEventDef: null, // optional


	constructor: function(eventInstances) {
		this.eventInstances = eventInstances || [];
	},


	getAllEventRanges: function() {
		return eventInstancesToEventRanges(this.eventInstances);
	},


	sliceRenderRanges: function(constraintRange) {
		if (this.isInverse()) {
			return this.sliceInverseRenderRanges(constraintRange);
		}
		else {
			return this.sliceNormalRenderRanges(constraintRange);
		}
	},


	sliceNormalRenderRanges: function(constraintRange) {
		var eventInstances = this.eventInstances;
		var i, eventInstance;
		var slicedRange;
		var slicedEventRanges = [];

		for (i = 0; i < eventInstances.length; i++) {
			eventInstance = eventInstances[i];

			slicedRange = eventInstance.dateProfile.unzonedRange.intersect(constraintRange);

			if (slicedRange) {
				slicedEventRanges.push(
					new EventRange(
						slicedRange,
						eventInstance.def,
						eventInstance
					)
				);
			}
		}

		return slicedEventRanges;
	},


	sliceInverseRenderRanges: function(constraintRange) {
		var unzonedRanges = eventInstancesToUnzonedRanges(this.eventInstances);
		var ownerDef = this.getEventDef();

		unzonedRanges = invertUnzonedRanges(unzonedRanges, constraintRange);

		return unzonedRanges.map(function(unzonedRange) {
			return new EventRange(unzonedRange, ownerDef); // don't give an EventDef
		});
	},


	isInverse: function() {
		return this.getEventDef().hasInverseRendering();
	},


	getEventDef: function() {
		return this.explicitEventDef || this.eventInstances[0].def;
	}

});

;;

/*
Meant to be immutable
*/
var EventDateProfile = Class.extend({

	start: null,
	end: null,
	unzonedRange: null,


	constructor: function(start, end, calendar) {
		this.start = start;
		this.end = end || null;
		this.unzonedRange = this.buildUnzonedRange(calendar);
	},


	isAllDay: function() {
		return !(this.start.hasTime() || (this.end && this.end.hasTime()));
	},


	/*
	Needs a Calendar object
	*/
	buildUnzonedRange: function(calendar) {
		var startMs = this.start.clone().stripZone().valueOf();
		var endMs = this.getEnd(calendar).stripZone().valueOf();

		return new UnzonedRange(startMs, endMs);
	},


	/*
	Needs a Calendar object
	*/
	getEnd: function(calendar) {
		return this.end ?
			this.end.clone() :
			// derive the end from the start and allDay. compute allDay if necessary
			calendar.getDefaultEventEnd(
				this.isAllDay(),
				this.start
			);
	}

});


/*
Needs an EventSource object
*/
EventDateProfile.parse = function(rawProps, source) {
	var startInput = rawProps.start || rawProps.date;
	var endInput = rawProps.end;

	if (!startInput) {
		return false;
	}

	var calendar = source.calendar;
	var start = calendar.moment(startInput);
	var end = endInput ? calendar.moment(endInput) : null;
	var forcedAllDay = rawProps.allDay;
	var forceEventDuration = calendar.opt('forceEventDuration');

	if (!start.isValid()) {
		return false;
	}

	if (end && (!end.isValid() || !end.isAfter(start))) {
		end = null;
	}

	if (forcedAllDay == null) {
		forcedAllDay = source.allDayDefault;
		if (forcedAllDay == null) {
			forcedAllDay = calendar.opt('allDayDefault');
		}
	}

	if (forcedAllDay === true) {
		start.stripTime();
		if (end) {
			end.stripTime();
		}
	}
	else if (forcedAllDay === false) {
		if (!start.hasTime()) {
			start.time(0);
		}
		if (end && !end.hasTime()) {
			end.time(0);
		}
	}

	if (!end && forceEventDuration) {
		end = calendar.getDefaultEventEnd(!start.hasTime(), start);
	}

	return new EventDateProfile(start, end, calendar);
};

;;

var EventRange = Class.extend({

	unzonedRange: null,
	eventDef: null,
	eventInstance: null, // optional


	constructor: function(unzonedRange, eventDef, eventInstance) {
		this.unzonedRange = unzonedRange;
		this.eventDef = eventDef;

		if (eventInstance) {
			this.eventInstance = eventInstance;
		}
	}

});

;;

var EventFootprint = FC.EventFootprint = Class.extend({

	componentFootprint: null,
	eventDef: null,
	eventInstance: null, // optional


	constructor: function(componentFootprint, eventDef, eventInstance) {
		this.componentFootprint = componentFootprint;
		this.eventDef = eventDef;

		if (eventInstance) {
			this.eventInstance = eventInstance;
		}
	},


	getEventLegacy: function() {
		return (this.eventInstance || this.eventDef).toLegacy();
	}

});

;;

var EventDefMutation = FC.EventDefMutation = Class.extend({

	// won't ever be empty. will be null instead.
	// callers should use setDateMutation for setting.
	dateMutation: null,

	// hack to get updateEvent/createFromRawProps to work.
	// not undo-able and not considered in isEmpty.
	rawProps: null, // raw (pre-parse-like)


	/*
	eventDef assumed to be a SingleEventDef.
	returns an undo function.
	*/
	mutateSingle: function(eventDef) {
		var origDateProfile;

		if (this.dateMutation) {
			origDateProfile = eventDef.dateProfile;

			eventDef.dateProfile = this.dateMutation.buildNewDateProfile(
				origDateProfile,
				eventDef.source.calendar
			);
		}

		// can't undo
		if (this.rawProps) {
			eventDef.applyRawProps(this.rawProps);
		}

		if (origDateProfile) {
			return function() {
				eventDef.dateProfile = origDateProfile;
			};
		}
		else {
			return function() { };
		}
	},


	setDateMutation: function(dateMutation) {
		if (dateMutation && !dateMutation.isEmpty()) {
			this.dateMutation = dateMutation;
		}
		else {
			this.dateMutation = null;
		}
	},


	isEmpty: function() {
		return !this.dateMutation;
	}

});


EventDefMutation.createFromRawProps = function(eventInstance, newRawProps, largeUnit) {
	var eventDef = eventInstance.def;
	var applicableRawProps = {};
	var propName;
	var newDateProfile;
	var dateMutation;
	var defMutation;

	for (propName in newRawProps) {
		if (
			// ignore object-type custom properties and any date-related properties,
			// as well as any other internal property
			typeof newRawProps[propName] !== 'object' &&
			propName !== 'start' && propName !== 'end' && propName !== 'allDay' &&
			propName !== 'source' && propName !== '_id'
		) {
			applicableRawProps[propName] = newRawProps[propName];
		}
	}

	newDateProfile = EventDateProfile.parse(newRawProps, eventDef.source);

	if (newDateProfile) { // no failure?
		dateMutation = EventDefDateMutation.createFromDiff(
			eventInstance.dateProfile,
			newDateProfile,
			largeUnit
		);
	}

	defMutation = new EventDefMutation();
	defMutation.rawProps = applicableRawProps;

	if (dateMutation) {
		defMutation.dateMutation = dateMutation;
	}

	return defMutation;
};

;;

var EventDefDateMutation = Class.extend({

	clearEnd: false,
	forceTimed: false,
	forceAllDay: false,

	// Durations. if 0-ms duration, will be null instead.
	// Callers should not set this directly.
	dateDelta: null,
	startDelta: null,
	endDelta: null,


	/*
	returns an undo function.
	*/
	buildNewDateProfile: function(eventDateProfile, calendar) {
		var start = eventDateProfile.start.clone();
		var end = null;
		var shouldRezone = false;

		if (!this.clearEnd && eventDateProfile.end) {
			end = eventDateProfile.end.clone();
		}

		if (this.forceTimed) {
			shouldRezone = true;

			if (!start.hasTime()) {
				start.time(0);
			}

			if (end && !end.hasTime()) {
				end.time(0);
			}
		}
		else if (this.forceAllDay) {

			if (start.hasTime()) {
				start.stripTime();
			}

			if (end && end.hasTime()) {
				end.stripTime();
			}
		}

		if (this.dateDelta) {
			shouldRezone = true;

			start.add(this.dateDelta);

			if (end) {
				end.add(this.dateDelta);
			}
		}

		// do this before adding startDelta to start, so we can work off of start
		if (this.endDelta) {
			shouldRezone = true;

			if (!end) {
				end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
			}

			end.add(this.endDelta);
		}

		if (this.startDelta) {
			shouldRezone = true;

			start.add(this.startDelta);
		}

		if (shouldRezone) {
			start = calendar.applyTimezone(start);

			if (end) {
				end = calendar.applyTimezone(end);
			}
		}

		// TODO: okay to access calendar option?
		if (!end && calendar.opt('forceEventDuration')) {
			end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
		}

		return new EventDateProfile(start, end, calendar);
	},


	setDateDelta: function(dateDelta) {
		if (dateDelta && dateDelta.valueOf()) {
			this.dateDelta = dateDelta;
		}
		else {
			this.dateDelta = null;
		}
	},


	setStartDelta: function(startDelta) {
		if (startDelta && startDelta.valueOf()) {
			this.startDelta = startDelta;
		}
		else {
			this.startDelta = null;
		}
	},


	setEndDelta: function(endDelta) {
		if (endDelta && endDelta.valueOf()) {
			this.endDelta = endDelta;
		}
		else {
			this.endDelta = null;
		}
	},


	isEmpty: function() {
		return !this.clearEnd && !this.forceTimed && !this.forceAllDay &&
			!this.dateDelta && !this.startDelta && !this.endDelta;
	}

});


EventDefDateMutation.createFromDiff = function(dateProfile0, dateProfile1, largeUnit) {
	var clearEnd = dateProfile0.end && !dateProfile1.end;
	var forceTimed = dateProfile0.isAllDay() && !dateProfile1.isAllDay();
	var forceAllDay = !dateProfile0.isAllDay() && dateProfile1.isAllDay();
	var dateDelta;
	var endDiff;
	var endDelta;
	var mutation;

	// subtracts the dates in the appropriate way, returning a duration
	function subtractDates(date1, date0) { // date1 - date0
		if (largeUnit) {
			return diffByUnit(date1, date0, largeUnit); // poorly named
		}
		else if (dateProfile1.isAllDay()) {
			return diffDay(date1, date0); // poorly named
		}
		else {
			return diffDayTime(date1, date0); // poorly named
		}
	}

	dateDelta = subtractDates(dateProfile1.start, dateProfile0.start);

	if (dateProfile1.end) {
		// use unzonedRanges because dateProfile0.end might be null
		endDiff = subtractDates(
			dateProfile1.unzonedRange.getEnd(),
			dateProfile0.unzonedRange.getEnd()
		);
		endDelta = endDiff.subtract(dateDelta);
	}

	mutation = new EventDefDateMutation();
	mutation.clearEnd = clearEnd;
	mutation.forceTimed = forceTimed;
	mutation.forceAllDay = forceAllDay;
	mutation.setDateDelta(dateDelta);
	mutation.setEndDelta(endDelta);

	return mutation;
};

;;

function eventDefsToEventInstances(eventDefs, unzonedRange) {
	var eventInstances = [];
	var i;

	for (i = 0; i < eventDefs.length; i++) {
		eventInstances.push.apply(eventInstances, // append
			eventDefs[i].buildInstances(unzonedRange)
		);
	}

	return eventInstances;
}


function eventInstancesToEventRanges(eventInstances) {
	return eventInstances.map(function(eventInstance) {
		return new EventRange(
			eventInstance.dateProfile.unzonedRange,
			eventInstance.def,
			eventInstance
		);
	});
}


function eventInstancesToUnzonedRanges(eventInstances) {
	return eventInstances.map(function(eventInstance) {
		return eventInstance.dateProfile.unzonedRange;
	});
}


function eventFootprintsToComponentFootprints(eventFootprints) {
	return eventFootprints.map(function(eventFootprint) {
		return eventFootprint.componentFootprint;
	});
}

;;

var EventSource = Class.extend(ParsableModelMixin, {

	calendar: null,

	id: null, // can stay null
	uid: null,
	color: null,
	backgroundColor: null,
	borderColor: null,
	textColor: null,
	className: null, // array
	editable: null,
	startEditable: null,
	durationEditable: null,
	rendering: null,
	overlap: null,
	constraint: null,
	allDayDefault: null,
	eventDataTransform: null, // optional function


	constructor: function(calendar) {
		this.calendar = calendar;
		this.className = [];
		this.uid = String(EventSource.uuid++);
	},


	fetch: function(start, end, timezone) {
		// subclasses must implement. must return a promise.
	},


	removeEventDefsById: function(eventDefId) {
		// optional for subclasses to implement
	},


	removeAllEventDefs: function() {
		// optional for subclasses to implement
	},


	/*
	For compairing/matching
	*/
	getPrimitive: function(otherSource) {
		// subclasses must implement
	},


	parseEventDefs: function(rawEventDefs) {
		var i;
		var eventDef;
		var eventDefs = [];

		for (i = 0; i < rawEventDefs.length; i++) {
			eventDef = EventDefParser.parse(
				rawEventDefs[i],
				this // source
			);

			if (eventDef) {
				eventDefs.push(eventDef);
			}
		}

		return eventDefs;
	},


	applyManualRawProps: function(rawProps) {

		if (rawProps.id != null) {
			this.id = EventSource.normalizeId(rawProps.id);
		}

		// TODO: converge with EventDef
		if ($.isArray(rawProps.className)) {
			this.className = rawProps.className;
		}
		else if (typeof rawProps.className === 'string') {
			this.className = rawProps.className.split(/\s+/);
		}

		return true;
	}

});


// finish initializing the mixin
EventSource.allowRawProps = ParsableModelMixin_allowRawProps;


// IDs
// ---------------------------------------------------------------------------------------------------------------------
// TODO: converge with EventDef


EventSource.uuid = 0;


EventSource.normalizeId = function(id) {
	if (id) {
		return String(id);
	}

	return null;
};


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


EventSource.allowRawProps({
	// manually process...
	id: false,
	className: false,

	// automatically transfer...
	color: true,
	backgroundColor: true,
	borderColor: true,
	textColor: true,
	editable: true,
	startEditable: true,
	durationEditable: true,
	rendering: true,
	overlap: true,
	constraint: true,
	allDayDefault: true,
	eventDataTransform: true
});


/*
rawInput can be any data type!
*/
EventSource.parse = function(rawInput, calendar) {
	var source = new this(calendar);

	if (typeof rawInput === 'object') {
		if (source.applyRawProps(rawInput)) {
			return source;
		}
	}

	return false;
};


FC.EventSource = EventSource;

;;

var EventSourceParser = {

	sourceClasses: [],


	registerClass: function(EventSourceClass) {
		this.sourceClasses.unshift(EventSourceClass); // give highest priority
	},


	parse: function(rawInput, calendar) {
		var sourceClasses = this.sourceClasses;
		var i;
		var eventSource;

		for (i = 0; i < sourceClasses.length; i++) {
			eventSource = sourceClasses[i].parse(rawInput, calendar);

			if (eventSource) {
				return eventSource;
			}
		}
	}

};


FC.EventSourceParser = EventSourceParser;

;;

var ArrayEventSource = EventSource.extend({

	rawEventDefs: null, // unparsed
	eventDefs: null,
	currentTimezone: null,


	constructor: function(calendar) {
		EventSource.apply(this, arguments); // super-constructor
		this.eventDefs = []; // for if setRawEventDefs is never called
	},


	setRawEventDefs: function(rawEventDefs) {
		this.rawEventDefs = rawEventDefs;
		this.eventDefs = this.parseEventDefs(rawEventDefs);
	},


	fetch: function(start, end, timezone) {
		var eventDefs = this.eventDefs;
		var i;

		if (
			this.currentTimezone !== null &&
			this.currentTimezone !== timezone
		) {
			for (i = 0; i < eventDefs.length; i++) {
				if (eventDefs[i] instanceof SingleEventDef) {
					eventDefs[i].rezone();
				}
			}
		}

		this.currentTimezone = timezone;

		return Promise.resolve(eventDefs);
	},


	addEventDef: function(eventDef) {
		this.eventDefs.push(eventDef);
	},


	/*
	eventDefId already normalized to a string
	*/
	removeEventDefsById: function(eventDefId) {
		return removeMatching(this.eventDefs, function(eventDef) {
			return eventDef.id === eventDefId;
		});
	},


	removeAllEventDefs: function() {
		this.eventDefs = [];
	},


	getPrimitive: function() {
		return this.rawEventDefs;
	},


	applyManualRawProps: function(rawProps) {
		var superSuccess = EventSource.prototype.applyManualRawProps.apply(this, arguments);

		this.setRawEventDefs(rawProps.events);

		return superSuccess;
	}

});


ArrayEventSource.allowRawProps({
	events: false // don't automatically transfer
});


ArrayEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if ($.isArray(rawInput.events)) { // extended form
		rawProps = rawInput;
	}
	else if ($.isArray(rawInput)) { // short form
		rawProps = { events: rawInput };
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(ArrayEventSource);

FC.ArrayEventSource = ArrayEventSource;

;;

var FuncEventSource = EventSource.extend({

	func: null,


	fetch: function(start, end, timezone) {
		var _this = this;

		this.calendar.pushLoading();

		return Promise.construct(function(onResolve) {
			_this.func.call(
				this.calendar,
				start.clone(),
				end.clone(),
				timezone,
				function(rawEventDefs) {
					_this.calendar.popLoading();

					onResolve(_this.parseEventDefs(rawEventDefs));
				}
			);
		});
	},


	getPrimitive: function() {
		return this.func;
	},


	applyManualRawProps: function(rawProps) {
		var superSuccess = EventSource.prototype.applyManualRawProps.apply(this, arguments);

		this.func = rawProps.events;

		return superSuccess;
	}

});


FuncEventSource.allowRawProps({
	events: false // don't automatically transfer
});


FuncEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if ($.isFunction(rawInput.events)) { // extended form
		rawProps = rawInput;
	}
	else if ($.isFunction(rawInput)) { // short form
		rawProps = { events: rawInput };
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(FuncEventSource);

FC.FuncEventSource = FuncEventSource;

;;

var JsonFeedEventSource = EventSource.extend({

	// these props must all be manually set before calling fetch
	startParam: null,
	endParam: null,
	timezoneParam: null,
	ajaxSettings: null,


	fetch: function(start, end, timezone) {
		var _this = this;
		var ajaxSettings = this.ajaxSettings;
		var onSuccess = ajaxSettings.success;
		var onError = ajaxSettings.error;
		var requestParams = this.buildRequestParams(start, end, timezone);

		// todo: eventually handle the promise's then,
		// don't intercept success/error
		// tho will be a breaking API change

		this.calendar.pushLoading();

		return Promise.construct(function(onResolve, onReject) {
			$.ajax($.extend(
				{}, // avoid mutation
				JsonFeedEventSource.AJAX_DEFAULTS,
				ajaxSettings, // should have a `url`
				{
					data: requestParams,
					success: function(rawEventDefs) {
						var callbackRes;

						_this.calendar.popLoading();

						if (rawEventDefs) {
							callbackRes = applyAll(onSuccess, this, arguments); // redirect `this`

							if ($.isArray(callbackRes)) {
								rawEventDefs = callbackRes;
							}

							onResolve(_this.parseEventDefs(rawEventDefs));
						}
						else {
							onReject();
						}
					},
					error: function() {
						_this.calendar.popLoading();

						applyAll(onError, this, arguments); // redirect `this`
						onReject();
					}
				}
			));
		});
	},


	buildRequestParams: function(start, end, timezone) {
		var calendar = this.calendar;
		var ajaxSettings = this.ajaxSettings;
		var startParam, endParam, timezoneParam;
		var customRequestParams;
		var params = {};

		startParam = this.startParam;
		if (startParam == null) {
			startParam = calendar.opt('startParam');
		}

		endParam = this.endParam;
		if (endParam == null) {
			endParam = calendar.opt('endParam');
		}

		timezoneParam = this.timezoneParam;
		if (timezoneParam == null) {
			timezoneParam = calendar.opt('timezoneParam');
		}

		// retrieve any outbound GET/POST $.ajax data from the options
		if ($.isFunction(ajaxSettings.data)) {
			// supplied as a function that returns a key/value object
			customRequestParams = ajaxSettings.data();
		}
		else {
			// probably supplied as a straight key/value object
			customRequestParams = ajaxSettings.data || {};
		}

		$.extend(params, customRequestParams);

		params[startParam] = start.format();
		params[endParam] = end.format();

		if (timezone && timezone !== 'local') {
			params[timezoneParam] = timezone;
		}

		return params;
	},


	getPrimitive: function() {
		return this.ajaxSettings.url;
	},


	applyOtherRawProps: function(rawProps) {
		EventSource.prototype.applyOtherRawProps.apply(this, arguments);

		this.ajaxSettings = rawProps;
	}

});


JsonFeedEventSource.AJAX_DEFAULTS = {
	dataType: 'json',
	cache: false
};


JsonFeedEventSource.allowRawProps({
	// automatically transfer (true)...
	startParam: true,
	endParam: true,
	timezoneParam: true
});


JsonFeedEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	// normalize raw input
	if (typeof rawInput.url === 'string') { // extended form
		rawProps = rawInput;
	}
	else if (typeof rawInput === 'string') { // short form
		rawProps = { url: rawInput }; // will end up in ajaxSettings
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


EventSourceParser.registerClass(JsonFeedEventSource);

FC.JsonFeedEventSource = JsonFeedEventSource;

;;

var ThemeRegistry = FC.ThemeRegistry = {

	themeClassHash: {},


	register: function(themeName, themeClass) {
		this.themeClassHash[themeName] = themeClass;
	},


	getThemeClass: function(themeSetting) {
		if (!themeSetting) {
			return StandardTheme;
		}
		else if (themeSetting === true) {
			return JqueryUiTheme;
		}
		else {
			return this.themeClassHash[themeSetting];
		}
	}

};

;;

var Theme = FC.Theme = Class.extend({

	classes: {},
	iconClasses: {},
	baseIconClass: '',
	iconOverrideOption: null,
	iconOverrideCustomButtonOption: null,
	iconOverridePrefix: '',


	constructor: function(optionsModel) {
		this.optionsModel = optionsModel;
		this.processIconOverride();
	},


	processIconOverride: function() {
		if (this.iconOverrideOption) {
			this.setIconOverride(
				this.optionsModel.get(this.iconOverrideOption)
			);
		}
	},


	setIconOverride: function(iconOverrideHash) {
		var iconClassesCopy;
		var buttonName;

		if ($.isPlainObject(iconOverrideHash)) {
			iconClassesCopy = $.extend({}, this.iconClasses);

			for (buttonName in iconOverrideHash) {
				iconClassesCopy[buttonName] = this.applyIconOverridePrefix(
					iconOverrideHash[buttonName]
				);
			}

			this.iconClasses = iconClassesCopy;
		}
		else if (iconOverrideHash === false) {
			this.iconClasses = {};
		}
	},


	applyIconOverridePrefix: function(className) {
		var prefix = this.iconOverridePrefix;

		if (prefix && className.indexOf(prefix) !== 0) { // if not already present
			className = prefix + className;
		}

		return className;
	},


	getClass: function(key) {
		return this.classes[key] || '';
	},


	getIconClass: function(buttonName) {
		var className = this.iconClasses[buttonName];

		if (className) {
			return this.baseIconClass + ' ' + className;
		}

		return '';
	},


	getCustomButtonIconClass: function(customButtonProps) {
		var className;

		if (this.iconOverrideCustomButtonOption) {
			className = customButtonProps[this.iconOverrideCustomButtonOption];

			if (className) {
				return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
			}
		}

		return '';
	}

});

;;

var StandardTheme = Theme.extend({

	classes: {
		widget: 'fc-unthemed',
		widgetHeader: 'fc-widget-header',
		widgetContent: 'fc-widget-content',

		buttonGroup: 'fc-button-group',
		button: 'fc-button',
		cornerLeft: 'fc-corner-left',
		cornerRight: 'fc-corner-right',
		stateDefault: 'fc-state-default',
		stateActive: 'fc-state-active',
		stateDisabled: 'fc-state-disabled',
		stateHover: 'fc-state-hover',
		stateDown: 'fc-state-down',

		popoverHeader: 'fc-widget-header',
		popoverContent: 'fc-widget-content',

		// day grid
		headerRow: 'fc-widget-header',
		dayRow: 'fc-widget-content',

		// list view
		listView: 'fc-widget-content'
	},

	baseIconClass: 'fc-icon',
	iconClasses: {
		close: 'fc-icon-x',
		prev: 'fc-icon-left-single-arrow',
		next: 'fc-icon-right-single-arrow',
		prevYear: 'fc-icon-left-double-arrow',
		nextYear: 'fc-icon-right-double-arrow'
	},

	iconOverrideOption: 'buttonIcons',
	iconOverrideCustomButtonOption: 'icon',
	iconOverridePrefix: 'fc-icon-'

});

ThemeRegistry.register('standard', StandardTheme);

;;

var JqueryUiTheme = Theme.extend({

	classes: {
		widget: 'ui-widget',
		widgetHeader: 'ui-widget-header',
		widgetContent: 'ui-widget-content',

		buttonGroup: 'fc-button-group',
		button: 'ui-button',
		cornerLeft: 'ui-corner-left',
		cornerRight: 'ui-corner-right',
		stateDefault: 'ui-state-default',
		stateActive: 'ui-state-active',
		stateDisabled: 'ui-state-disabled',
		stateHover: 'ui-state-hover',
		stateDown: 'ui-state-down',

		today: 'ui-state-highlight',

		popoverHeader: 'ui-widget-header',
		popoverContent: 'ui-widget-content',

		// day grid
		headerRow: 'ui-widget-header',
		dayRow: 'ui-widget-content',

		// list view
		listView: 'ui-widget-content'
	},

	baseIconClass: 'ui-icon',
	iconClasses: {
		close: 'ui-icon-closethick',
		prev: 'ui-icon-circle-triangle-w',
		next: 'ui-icon-circle-triangle-e',
		prevYear: 'ui-icon-seek-prev',
		nextYear: 'ui-icon-seek-next'
	},

	iconOverrideOption: 'themeButtonIcons',
	iconOverrideCustomButtonOption: 'themeIcon',
	iconOverridePrefix: 'ui-icon-'

});

ThemeRegistry.register('jquery-ui', JqueryUiTheme);

;;

var BootstrapTheme = Theme.extend({

	classes: {
		widget: 'fc-bootstrap3',

		tableGrid: 'table-bordered', // avoid `table` class b/c don't want margins. only border color
		tableList: 'table table-striped', // `table` class creates bottom margin but who cares

		buttonGroup: 'btn-group',
		button: 'btn btn-default',
		stateActive: 'active',
		stateDisabled: 'disabled',

		today: 'alert alert-info', // the plain `info` class requires `.table`, too much to ask

		popover: 'panel panel-default',
		popoverHeader: 'panel-heading',
		popoverContent: 'panel-body',

		// day grid
		headerRow: 'panel-default', // avoid `panel` class b/c don't want margins/radius. only border color
		dayRow: 'panel-default', // "

		// list view
		listView: 'panel panel-default'
	},

	baseIconClass: 'glyphicon',
	iconClasses: {
		close: 'glyphicon-remove',
		prev: 'glyphicon-chevron-left',
		next: 'glyphicon-chevron-right',
		prevYear: 'glyphicon-backward',
		nextYear: 'glyphicon-forward'
	},

	iconOverrideOption: 'bootstrapGlyphicons',
	iconOverrideCustomButtonOption: 'bootstrapGlyphicon',
	iconOverridePrefix: 'glyphicon-'

});

ThemeRegistry.register('bootstrap3', BootstrapTheme);

;;

/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

var BasicView = FC.BasicView = View.extend({

	scroller: null,

	dayGridClass: DayGrid, // class the dayGrid will be instantiated from (overridable by subclasses)
	dayGrid: null, // the main subcomponent that does most of the heavy lifting

	dayNumbersVisible: false, // display day numbers on each day cell?
	colWeekNumbersVisible: false, // display week numbers along the side?
	cellWeekNumbersVisible: false, // display week numbers in day cell?

	weekNumberWidth: null, // width of all the week-number cells running down the side

	headContainerEl: null, // div that hold's the dayGrid's rendered date header
	headRowEl: null, // the fake row element of the day-of-week header


	initialize: function() {
		this.dayGrid = this.instantiateDayGrid();
		this.addChild(this.dayGrid);

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	// Generates the DayGrid object this view needs. Draws from this.dayGridClass
	instantiateDayGrid: function() {
		// generate a subclass on the fly with BasicView-specific behavior
		// TODO: cache this subclass
		var subclass = this.dayGridClass.extend(basicDayGridMethods);

		return new subclass(this);
	},


	// Computes the date range that will be rendered.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit) {
		var renderUnzonedRange = View.prototype.buildRenderRange.apply(this, arguments); // an UnzonedRange
		var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, this.isRangeAllDay);
		var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, this.isRangeAllDay);

		// year and month views should be aligned with weeks. this is already done for week
		if (/^(year|month)$/.test(currentRangeUnit)) {
			start.startOf('week');

			// make end-of-week if not already
			if (end.weekday()) {
				end.add(1, 'week').startOf('week'); // exclusively move backwards
			}
		}

		return this.trimHiddenDays(new UnzonedRange(start, end));
	},


	// Renders the view into `this.el`, which should already be assigned
	renderDates: function() {

		this.dayGrid.breakOnWeeks = /year|month|week/.test(this.currentRangeUnit); // do before Grid::setRange
		this.dayGrid.setRange(this.renderUnzonedRange);

		this.dayNumbersVisible = this.dayGrid.rowCnt > 1; // TODO: make grid responsible
		if (this.opt('weekNumbers')) {
			if (this.opt('weekNumbersWithinDays')) {
				this.cellWeekNumbersVisible = true;
				this.colWeekNumbersVisible = false;
			}
			else {
				this.cellWeekNumbersVisible = false;
				this.colWeekNumbersVisible = true;
			};
		}
		this.dayGrid.numbersVisible = this.dayNumbersVisible ||
			this.cellWeekNumbersVisible || this.colWeekNumbersVisible;

		this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());
		this.renderHead();

		this.scroller.render();
		var dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
		var dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);
		this.el.find('.fc-body > tr > td').append(dayGridContainerEl);

		this.dayGrid.setElement(dayGridEl);
		this.dayGrid.renderDates(this.hasRigidRows());
	},


	// render the day-of-week headers
	renderHead: function() {
		this.headContainerEl =
			this.el.find('.fc-head-container')
				.html(this.dayGrid.renderHeadHtml());
		this.headRowEl = this.headContainerEl.find('.fc-row');
	},


	// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
	// always completely kill the dayGrid's rendering.
	unrenderDates: function() {
		this.dayGrid.unrenderDates();
		this.dayGrid.removeElement();
		this.scroller.destroy();
	},


	// Builds the HTML skeleton for the view.
	// The day-grid component will render inside of a container defined by this HTML.
	renderSkeletonHtml: function() {
		var theme = this.calendar.theme;

		return '' +
			'<table class="' + theme.getClass('tableGrid') + '">' +
				'<thead class="fc-head">' +
					'<tr>' +
						'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '"></td>' +
					'</tr>' +
				'</thead>' +
				'<tbody class="fc-body">' +
					'<tr>' +
						'<td class="' + theme.getClass('widgetContent') + '"></td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates an HTML attribute string for setting the width of the week number column, if it is known
	weekNumberStyleAttr: function() {
		if (this.weekNumberWidth !== null) {
			return 'style="width:' + this.weekNumberWidth + 'px"';
		}
		return '';
	},


	// Determines whether each row should have a constant height
	hasRigidRows: function() {
		var eventLimit = this.opt('eventLimit');
		return eventLimit && typeof eventLimit !== 'number';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		if (this.colWeekNumbersVisible) {
			// Make sure all week number cells running down the side have the same width.
			// Record the width for cells created later.
			this.weekNumberWidth = matchCellWidths(
				this.el.find('.fc-week-number')
			);
		}
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit = this.opt('eventLimit');
		var scrollerHeight;
		var scrollbarWidths;

		// reset all heights to be natural
		this.scroller.clear();
		uncompensateScroll(this.headRowEl);

		this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed

		// is the event limit a constant level number?
		if (eventLimit && typeof eventLimit === 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
		}

		// distribute the height to the rows
		// (totalHeight is a "recommended" value if isAuto)
		scrollerHeight = this.computeScrollerHeight(totalHeight);
		this.setGridHeight(scrollerHeight, isAuto);

		// is the event limit dynamically calculated?
		if (eventLimit && typeof eventLimit !== 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
		}

		if (!isAuto) { // should we force dimensions of the scroll container?

			this.scroller.setHeight(scrollerHeight);
			scrollbarWidths = this.scroller.getScrollbarWidths();

			if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

				compensateScroll(this.headRowEl, scrollbarWidths);

				// doing the scrollbar compensation might have created text overflow which created more height. redo
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}

			// guarantees the same scrollbar widths
			this.scroller.lockOverflow(scrollbarWidths);
		}
	},


	// given a desired total height of the view, returns what the height of the scroller should be
	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	// Sets the height of just the DayGrid component in this view
	setGridHeight: function(height, isAuto) {
		if (isAuto) {
			undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
		}
		else {
			distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
		}
	},


	/* Scroll
	------------------------------------------------------------------------------------------------------------------*/


	computeInitialDateScroll: function() {
		return { top: 0 };
	},


	queryDateScroll: function() {
		return { top: this.scroller.getScrollTop() };
	},


	applyDateScroll: function(scroll) {
		if (scroll.top !== undefined) {
			this.scroller.setScrollTop(scroll.top);
		}
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the given events onto the view and populates the segments array
	renderEventsPayload: function(eventsPayload) {
		this.dayGrid.renderEventsPayload(eventsPayload);

		// must compensate for events that overflow the row
		// TODO: how will ChronoComponent handle this?
		this.updateHeight();
	}

});


// Methods that will customize the rendering behavior of the BasicView's dayGrid
var basicDayGridMethods = {


	// Generates the HTML that will go before the day-of week header cells
	renderHeadIntroHtml: function() {
		var view = this.view;

		if (view.colWeekNumbersVisible) {
			return '' +
				'<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(this.opt('weekNumberTitle')) +
					'</span>' +
				'</th>';
		}

		return '';
	},


	// Generates the HTML that will go before content-skeleton cells that display the day/week numbers
	renderNumberIntroHtml: function(row) {
		var view = this.view;
		var weekStart = this.getCellDate(row, 0);

		if (view.colWeekNumbersVisible) {
			return '' +
				'<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
					view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
						{ date: weekStart, type: 'week', forceOff: this.colCnt === 1 },
						weekStart.format('w') // inner HTML
					) +
				'</td>';
		}

		return '';
	},


	// Generates the HTML that goes before the day bg cells for each day-row
	renderBgIntroHtml: function() {
		var view = this.view;

		if (view.colWeekNumbersVisible) {
			return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
				view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	},


	// Generates the HTML that goes before every other type of row generated by DayGrid.
	// Affects helper-skeleton and highlight-skeleton rows.
	renderIntroHtml: function() {
		var view = this.view;

		if (view.colWeekNumbersVisible) {
			return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	}

};

;;

/* A month view with day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/

var MonthView = FC.MonthView = BasicView.extend({


	// Computes the date range that will be rendered.
	buildRenderRange: function() {
		var renderUnzonedRange = BasicView.prototype.buildRenderRange.apply(this, arguments);
		var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, this.isRangeAllDay);
		var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, this.isRangeAllDay);
		var rowCnt;

		// ensure 6 weeks
		if (this.isFixedWeeks()) {
			rowCnt = Math.ceil( // could be partial weeks due to hiddenDays
				end.diff(start, 'weeks', true) // dontRound=true
			);
			end.add(6 - rowCnt, 'weeks');
		}

		return new UnzonedRange(start, end);
	},


	// Overrides the default BasicView behavior to have special multi-week auto-height logic
	setGridHeight: function(height, isAuto) {

		// if auto, make the height of each row the height that it would be if there were 6 weeks
		if (isAuto) {
			height *= this.rowCnt / 6;
		}

		distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
	},


	isFixedWeeks: function() {
		return this.opt('fixedWeekCount');
	},


	isDateInOtherMonth: function(date) {
		return date.month() !== moment.utc(this.currentUnzonedRange.startMs).month(); // TODO: optimize
	}

});

;;

fcViews.basic = {
	'class': BasicView
};

fcViews.basicDay = {
	type: 'basic',
	duration: { days: 1 }
};

fcViews.basicWeek = {
	type: 'basic',
	duration: { weeks: 1 }
};

fcViews.month = {
	'class': MonthView,
	duration: { months: 1 }, // important for prev/next
	defaults: {
		fixedWeekCount: true
	}
};
;;

/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.

var AgendaView = FC.AgendaView = View.extend({

	scroller: null,

	timeGridClass: TimeGrid, // class used to instantiate the timeGrid. subclasses can override
	timeGrid: null, // the main time-grid subcomponent of this view

	dayGridClass: DayGrid, // class used to instantiate the dayGrid. subclasses can override
	dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null

	axisWidth: null, // the width of the time axis running down the side

	headContainerEl: null, // div that hold's the timeGrid's rendered date header
	noScrollRowEls: null, // set of fake row elements that must compensate when scroller has scrollbars

	// when the time-grid isn't tall enough to occupy the given height, we render an <hr> underneath
	bottomRuleEl: null,

	// indicates that minTime/maxTime affects rendering
	usesMinMaxTime: true,


	initialize: function() {
		this.timeGrid = this.instantiateTimeGrid();
		this.addChild(this.timeGrid);

		if (this.opt('allDaySlot')) { // should we display the "all-day" area?
			this.dayGrid = this.instantiateDayGrid(); // the all-day subcomponent of this view
			this.addChild(this.dayGrid);
		}

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	// Instantiates the TimeGrid object this view needs. Draws from this.timeGridClass
	instantiateTimeGrid: function() {
		var subclass = this.timeGridClass.extend(agendaTimeGridMethods);

		return new subclass(this);
	},


	// Instantiates the DayGrid object this view might need. Draws from this.dayGridClass
	instantiateDayGrid: function() {
		var subclass = this.dayGridClass.extend(agendaDayGridMethods);

		return new subclass(this);
	},


	/* Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the view into `this.el`, which has already been assigned
	renderDates: function() {

		this.timeGrid.setRange(this.renderUnzonedRange);

		if (this.dayGrid) {
			this.dayGrid.setRange(this.renderUnzonedRange);
		}

		this.el.addClass('fc-agenda-view').html(this.renderSkeletonHtml());
		this.renderHead();

		this.scroller.render();
		var timeGridWrapEl = this.scroller.el.addClass('fc-time-grid-container');
		var timeGridEl = $('<div class="fc-time-grid" />').appendTo(timeGridWrapEl);
		this.el.find('.fc-body > tr > td').append(timeGridWrapEl);

		this.timeGrid.setElement(timeGridEl);
		this.timeGrid.renderDates();

		// the <hr> that sometimes displays under the time-grid
		this.bottomRuleEl = $('<hr class="fc-divider ' + this.calendar.theme.getClass('widgetHeader') + '"/>')
			.appendTo(this.timeGrid.el); // inject it into the time-grid

		if (this.dayGrid) {
			this.dayGrid.setElement(this.el.find('.fc-day-grid'));
			this.dayGrid.renderDates();

			// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
			this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
		}

		this.noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)'); // fake rows not within the scroller
	},


	// render the day-of-week headers
	renderHead: function() {
		this.headContainerEl =
			this.el.find('.fc-head-container')
				.html(this.timeGrid.renderHeadHtml());
	},


	// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
	// always completely kill each grid's rendering.
	// TODO: move this over to ChronoComponent
	unrenderDates: function() {
		this.timeGrid.unrenderDates();
		this.timeGrid.removeElement();

		if (this.dayGrid) {
			this.dayGrid.unrenderDates();
			this.dayGrid.removeElement();
		}

		this.scroller.destroy();
	},


	// Builds the HTML skeleton for the view.
	// The day-grid and time-grid components will render inside containers defined by this HTML.
	renderSkeletonHtml: function() {
		var theme = this.calendar.theme;

		return '' +
			'<table class="' + theme.getClass('tableGrid') + '">' +
				'<thead class="fc-head">' +
					'<tr>' +
						'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '"></td>' +
					'</tr>' +
				'</thead>' +
				'<tbody class="fc-body">' +
					'<tr>' +
						'<td class="' + theme.getClass('widgetContent') + '">' +
							(this.dayGrid ?
								'<div class="fc-day-grid"/>' +
								'<hr class="fc-divider ' + theme.getClass('widgetHeader') + '"/>' :
								''
								) +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates an HTML attribute string for setting the width of the axis, if it is known
	axisStyleAttr: function() {
		if (this.axisWidth !== null) {
			 return 'style="width:' + this.axisWidth + 'px"';
		}
		return '';
	},


	/* Now Indicator
	------------------------------------------------------------------------------------------------------------------*/


	getNowIndicatorUnit: function() {
		return this.timeGrid.getNowIndicatorUnit();
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	updateSize: function(isResize) {
		this.timeGrid.updateSize(isResize);

		View.prototype.updateSize.call(this, isResize); // call the super-method
	},


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		// make all axis cells line up, and record the width so newly created axis cells will have it
		this.axisWidth = matchCellWidths(this.el.find('.fc-axis'));
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit;
		var scrollerHeight;
		var scrollbarWidths;

		// reset all dimensions back to the original state
		this.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary
		this.scroller.clear(); // sets height to 'auto' and clears overflow
		uncompensateScroll(this.noScrollRowEls);

		// limit number of events in the all-day area
		if (this.dayGrid) {
			this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed

			eventLimit = this.opt('eventLimit');
			if (eventLimit && typeof eventLimit !== 'number') {
				eventLimit = AGENDA_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
			}
			if (eventLimit) {
				this.dayGrid.limitRows(eventLimit);
			}
		}

		if (!isAuto) { // should we force dimensions of the scroll container?

			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.scroller.setHeight(scrollerHeight);
			scrollbarWidths = this.scroller.getScrollbarWidths();

			if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

				// make the all-day and header rows lines up
				compensateScroll(this.noScrollRowEls, scrollbarWidths);

				// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
				// and reapply the desired height to the scroller.
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}

			// guarantees the same scrollbar widths
			this.scroller.lockOverflow(scrollbarWidths);

			// if there's any space below the slats, show the horizontal rule.
			// this won't cause any new overflow, because lockOverflow already called.
			if (this.timeGrid.getTotalSlatHeight() < scrollerHeight) {
				this.bottomRuleEl.show();
			}
		}
	},


	// given a desired total height of the view, returns what the height of the scroller should be
	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	/* Scroll
	------------------------------------------------------------------------------------------------------------------*/


	// Computes the initial pre-configured scroll state prior to allowing the user to change it
	computeInitialDateScroll: function() {
		var scrollTime = moment.duration(this.opt('scrollTime'));
		var top = this.timeGrid.computeTimeTop(scrollTime);

		// zoom can give weird floating-point values. rather scroll a little bit further
		top = Math.ceil(top);

		if (top) {
			top++; // to overcome top border that slots beyond the first have. looks better
		}

		return { top: top };
	},


	queryDateScroll: function() {
		return { top: this.scroller.getScrollTop() };
	},


	applyDateScroll: function(scroll) {
		if (scroll.top !== undefined) {
			this.scroller.setScrollTop(scroll.top);
		}
	},


	/* Hit Areas
	------------------------------------------------------------------------------------------------------------------*/
	// forward all hit-related method calls to the grids (dayGrid might not be defined)


	getHitFootprint: function(hit) {
		// TODO: hit.component is set as a hack to identify where the hit came from
		return hit.component.getHitFootprint(hit);
	},


	getHitEl: function(hit) {
		// TODO: hit.component is set as a hack to identify where the hit came from
		return hit.component.getHitEl(hit);
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders events onto the view and populates the View's segment array
	renderEventsPayload: function(eventsPayload) {
		var dayEventsPayload = {};
		var timedEventsPayload = {};
		var daySegs = [];
		var timedSegs;
		var id, eventInstanceGroup;

		// separate the events into all-day and timed
		for (id in eventsPayload) {
			eventInstanceGroup = eventsPayload[id];

			if (eventInstanceGroup.getEventDef().isAllDay()) {
				dayEventsPayload[id] = eventInstanceGroup;
			}
			else {
				timedEventsPayload[id] = eventInstanceGroup;
			}
		}

		// render the events in the subcomponents
		timedSegs = this.timeGrid.renderEventsPayload(timedEventsPayload);
		if (this.dayGrid) {
			daySegs = this.dayGrid.renderEventsPayload(dayEventsPayload);
		}

		// the all-day area is flexible and might have a lot of events, so shift the height
		// TODO: how will ChronoComponent handle this?
		this.updateHeight();
	},


	/* Dragging (for events and external elements)
	------------------------------------------------------------------------------------------------------------------*/


	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(eventFootprints, seg) {
		if (eventFootprints.length) {
			if (!eventFootprints[0].componentFootprint.isAllDay) {
				return this.timeGrid.renderDrag(eventFootprints, seg);
			}
			else if (this.dayGrid) {
				return this.dayGrid.renderDrag(eventFootprints, seg);
			}
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelectionFootprint: function(componentFootprint) {
		if (!componentFootprint.isAllDay) {
			this.timeGrid.renderSelectionFootprint(componentFootprint);
		}
		else if (this.dayGrid) {
			this.dayGrid.renderSelectionFootprint(componentFootprint);
		}
	}

});


// Methods that will customize the rendering behavior of the AgendaView's timeGrid
// TODO: move into TimeGrid
var agendaTimeGridMethods = {


	// Generates the HTML that will go before the day-of week header cells
	renderHeadIntroHtml: function() {
		var view = this.view;
		var weekStart = view.calendar.msToUtcMoment(this.unzonedRange.startMs, true);
		var weekText;

		if (this.opt('weekNumbers')) {
			weekText = weekStart.format(this.opt('smallWeekFormat'));

			return '' +
				'<th class="fc-axis fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '>' +
					view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
						{ date: weekStart, type: 'week', forceOff: this.colCnt > 1 },
						htmlEscape(weekText) // inner HTML
					) +
				'</th>';
		}
		else {
			return '<th class="fc-axis ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '></th>';
		}
	},


	// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
	renderBgIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '></td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	renderIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
	}

};


// Methods that will customize the rendering behavior of the AgendaView's dayGrid
var agendaDayGridMethods = {


	// Generates the HTML that goes before the all-day cells
	renderBgIntroHtml: function() {
		var view = this.view;

		return '' +
			'<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
				'<span>' + // needed for matchCellWidths
					view.getAllDayHtml() +
				'</span>' +
			'</td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	renderIntroHtml: function() {
		var view = this.view;

		return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
	}

};

;;

var AGENDA_ALL_DAY_EVENT_LIMIT = 5;

// potential nice values for the slot-duration and interval-duration
// from largest to smallest
var AGENDA_STOCK_SUB_DURATIONS = [
	{ hours: 1 },
	{ minutes: 30 },
	{ minutes: 15 },
	{ seconds: 30 },
	{ seconds: 15 }
];

fcViews.agenda = {
	'class': AgendaView,
	defaults: {
		allDaySlot: true,
		slotDuration: '00:30:00',
		slotEventOverlap: true // a bad name. confused with overlap/constraint system
	}
};

fcViews.agendaDay = {
	type: 'agenda',
	duration: { days: 1 }
};

fcViews.agendaWeek = {
	type: 'agenda',
	duration: { weeks: 1 }
};
;;

/*
Responsible for the scroller, and forwarding event-related actions into the "grid"
*/
var ListView = View.extend({

	grid: null,
	scroller: null,

	initialize: function() {
		this.grid = new ListViewGrid(this);
		this.addChild(this.grid);

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},

	renderSkeleton: function() {
		this.el.addClass(
			'fc-list-view ' +
			this.calendar.theme.getClass('listView')
		);

		this.scroller.render();
		this.scroller.el.appendTo(this.el);

		this.grid.setElement(this.scroller.scrollEl);
	},

	unrenderSkeleton: function() {
		this.scroller.destroy(); // will remove the Grid too
	},

	setHeight: function(totalHeight, isAuto) {
		this.scroller.setHeight(this.computeScrollerHeight(totalHeight));
	},

	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},

	renderDates: function() {
		this.grid.setRange(this.renderUnzonedRange); // needs to process range-related options
	},

	isEventDefResizable: function(eventDef) {
		return false;
	},

	isEventDefDraggable: function(eventDef) {
		return false;
	}

});

/*
Responsible for event rendering and user-interaction.
Its "el" is the inner-content of the above view's scroller.
*/
var ListViewGrid = Grid.extend({

	dayDates: null, // localized ambig-time moment array
	dayRanges: null, // UnzonedRange[], of start-end of each day
	segSelector: '.fc-list-item', // which elements accept event actions
	hasDayInteractions: false, // no day selection or day clicking

	rangeUpdated: function() {
		var calendar = this.view.calendar;
		var dayStart = calendar.msToUtcMoment(this.unzonedRange.startMs, true);
		var viewEnd = calendar.msToUtcMoment(this.unzonedRange.endMs, true);
		var dayDates = [];
		var dayRanges = [];

		while (dayStart < viewEnd) {

			dayDates.push(dayStart.clone());

			dayRanges.push(new UnzonedRange(
				dayStart,
				dayStart.clone().add(1, 'day')
			));

			dayStart.add(1, 'day');
		}

		this.dayDates = dayDates;
		this.dayRanges = dayRanges;
	},

	// slices by day
	componentFootprintToSegs: function(footprint) {
		var view = this.view;
		var dayRanges = this.dayRanges;
		var dayIndex;
		var segRange;
		var seg;
		var segs = [];

		for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
			segRange = footprint.unzonedRange.intersect(dayRanges[dayIndex]);

			if (segRange) {
				seg = {
					startMs: segRange.startMs,
					endMs: segRange.endMs,
					isStart: segRange.isStart,
					isEnd: segRange.isEnd,
					dayIndex: dayIndex
				};

				segs.push(seg);

				// detect when footprint won't go fully into the next day,
				// and mutate the latest seg to the be the end.
				if (
					!seg.isEnd && !footprint.isAllDay &&
					footprint.unzonedRange.endMs < dayRanges[dayIndex + 1].startMs + view.nextDayThreshold
				) {
					seg.endMs = footprint.unzonedRange.endMs;
					seg.isEnd = true;
					break;
				}
			}
		}

		return segs;
	},

	// like "4:00am"
	computeEventTimeFormat: function() {
		return this.opt('mediumTimeFormat');
	},

	// for events with a url, the whole <tr> should be clickable,
	// but it's impossible to wrap with an <a> tag. simulate this.
	handleSegClick: function(seg, ev) {
		var url;

		Grid.prototype.handleSegClick.apply(this, arguments); // super. might prevent the default action

		// not clicking on or within an <a> with an href
		if (!$(ev.target).closest('a[href]').length) {
			url = seg.footprint.eventDef.url;

			if (url && !ev.isDefaultPrevented()) { // jsEvent not cancelled in handler
				window.location.href = url; // simulate link click
			}
		}
	},

	// returns list of foreground segs that were actually rendered
	renderFgSegs: function(segs) {
		segs = this.renderFgSegEls(segs); // might filter away hidden events

		if (!segs.length) {
			this.renderEmptyMessage();
		}
		else {
			this.renderSegList(segs);
		}

		return segs;
	},

	renderEmptyMessage: function() {
		this.el.html(
			'<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
			'<div class="fc-list-empty-wrap1">' +
			'<div class="fc-list-empty">' +
				htmlEscape(this.opt('noEventsMessage')) +
			'</div>' +
			'</div>' +
			'</div>'
		);
	},

	// render the event segments in the view
	renderSegList: function(allSegs) {
		var segsByDay = this.groupSegsByDay(allSegs); // sparse array
		var dayIndex;
		var daySegs;
		var i;
		var tableEl = $('<table class="fc-list-table ' + this.view.calendar.theme.getClass('tableList') + '"><tbody/></table>');
		var tbodyEl = tableEl.find('tbody');

		for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
			daySegs = segsByDay[dayIndex];

			if (daySegs) { // sparse array, so might be undefined

				// append a day header
				tbodyEl.append(this.dayHeaderHtml(this.dayDates[dayIndex]));

				this.sortEventSegs(daySegs);

				for (i = 0; i < daySegs.length; i++) {
					tbodyEl.append(daySegs[i].el); // append event row
				}
			}
		}

		this.el.empty().append(tableEl);
	},

	// Returns a sparse array of arrays, segs grouped by their dayIndex
	groupSegsByDay: function(segs) {
		var segsByDay = []; // sparse array
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			(segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
				.push(seg);
		}

		return segsByDay;
	},

	// generates the HTML for the day headers that live amongst the event rows
	dayHeaderHtml: function(dayDate) {
		var view = this.view;
		var mainFormat = this.opt('listDayFormat');
		var altFormat = this.opt('listDayAltFormat');

		return '<tr class="fc-list-heading" data-date="' + dayDate.format('YYYY-MM-DD') + '">' +
			'<td class="' + view.calendar.theme.getClass('widgetHeader') + '" colspan="3">' +
				(mainFormat ?
					view.buildGotoAnchorHtml(
						dayDate,
						{ 'class': 'fc-list-heading-main' },
						htmlEscape(dayDate.format(mainFormat)) // inner HTML
					) :
					'') +
				(altFormat ?
					view.buildGotoAnchorHtml(
						dayDate,
						{ 'class': 'fc-list-heading-alt' },
						htmlEscape(dayDate.format(altFormat)) // inner HTML
					) :
					'') +
			'</td>' +
		'</tr>';
	},

	// generates the HTML for a single event row
	fgSegHtml: function(seg) {
		var view = this.view;
		var calendar = view.calendar;
		var theme = calendar.theme;
		var classes = [ 'fc-list-item' ].concat(this.getSegCustomClasses(seg));
		var bgColor = this.getSegBackgroundColor(seg);
		var eventFootprint = seg.footprint;
		var eventDef = eventFootprint.eventDef;
		var componentFootprint = eventFootprint.componentFootprint;
		var url = eventDef.url;
		var timeHtml;

		if (componentFootprint.isAllDay) {
			timeHtml = view.getAllDayHtml();
		}
		// if the event appears to span more than one day
		else if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
			if (seg.isStart || seg.isEnd) { // outer segment that probably lasts part of the day
				timeHtml = htmlEscape(this._getEventTimeText(
					calendar.msToMoment(seg.startMs),
					calendar.msToMoment(seg.endMs),
					componentFootprint.isAllDay
				));
			}
			else { // inner segment that lasts the whole day
				timeHtml = view.getAllDayHtml();
			}
		}
		else {
			// Display the normal time text for the *event's* times
			timeHtml = htmlEscape(this.getEventTimeText(eventFootprint));
		}

		if (url) {
			classes.push('fc-has-url');
		}

		return '<tr class="' + classes.join(' ') + '">' +
			(this.displayEventTime ?
				'<td class="fc-list-item-time ' + theme.getClass('widgetContent') + '">' +
					(timeHtml || '') +
				'</td>' :
				'') +
			'<td class="fc-list-item-marker ' + theme.getClass('widgetContent') + '">' +
				'<span class="fc-event-dot"' +
				(bgColor ?
					' style="background-color:' + bgColor + '"' :
					'') +
				'></span>' +
			'</td>' +
			'<td class="fc-list-item-title ' + theme.getClass('widgetContent') + '">' +
				'<a' + (url ? ' href="' + htmlEscape(url) + '"' : '') + '>' +
					htmlEscape(eventDef.title || '') +
				'</a>' +
			'</td>' +
		'</tr>';
	}

});

;;

fcViews.list = {
	'class': ListView,
	buttonTextKey: 'list', // what to lookup in locale files
	defaults: {
		buttonText: 'list', // text to display for English
		listDayFormat: 'LL', // like "January 1, 2016"
		noEventsMessage: 'No events to display'
	}
};

fcViews.listDay = {
	type: 'list',
	duration: { days: 1 },
	defaults: {
		listDayFormat: 'dddd' // day-of-week is all we need. full date is probably in header
	}
};

fcViews.listWeek = {
	type: 'list',
	duration: { weeks: 1 },
	defaults: {
		listDayFormat: 'dddd', // day-of-week is more important
		listDayAltFormat: 'LL'
	}
};

fcViews.listMonth = {
	type: 'list',
	duration: { month: 1 },
	defaults: {
		listDayAltFormat: 'dddd' // day-of-week is nice-to-have
	}
};

fcViews.listYear = {
	type: 'list',
	duration: { year: 1 },
	defaults: {
		listDayAltFormat: 'dddd' // day-of-week is nice-to-have
	}
};

;;

return FC; // export for Node/CommonJS
});