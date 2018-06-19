/*!
 * FullCalendar v3.8.2
 * Docs & License: https://fullcalendar.io/
 * (c) 2018 Adam Shaw
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["FullCalendar"] = factory(require("moment"), require("jquery"));
	else
		root["FullCalendar"] = factory(root["moment"], root["jQuery"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 236);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

/*
derived from:
https://github.com/Microsoft/tslib/blob/v1.6.0/tslib.js

only include the helpers we need, to keep down filesize
*/
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p]; };
exports.__extends = function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
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
exports.compensateScroll = compensateScroll;
// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
    rowEls.css({
        'margin-left': '',
        'margin-right': '',
        'border-left-width': '',
        'border-right-width': ''
    });
}
exports.uncompensateScroll = uncompensateScroll;
// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
    $('body').addClass('fc-not-allowed');
}
exports.disableCursor = disableCursor;
// Returns the mouse cursor to its original look
function enableCursor() {
    $('body').removeClass('fc-not-allowed');
}
exports.enableCursor = enableCursor;
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
    els.each(function (i, el) {
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
    $(flexEls).each(function (i, el) {
        var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
        var naturalOffset = flexOffsets[i];
        var naturalHeight = flexHeights[i];
        var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding
        if (naturalOffset < minOffset) {
            $(el).height(newHeight);
        }
    });
}
exports.distributeHeight = distributeHeight;
// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
    els.height('');
}
exports.undistributeHeight = undistributeHeight;
// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
    var maxInnerWidth = 0;
    els.find('> *').each(function (i, innerEl) {
        var innerWidth = $(innerEl).outerWidth();
        if (innerWidth > maxInnerWidth) {
            maxInnerWidth = innerWidth;
        }
    });
    maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance
    els.width(maxInnerWidth);
    return maxInnerWidth;
}
exports.matchCellWidths = matchCellWidths;
// Given one element that resides inside another,
// Subtracts the height of the inner element from the outer element.
function subtractInnerElHeight(outerEl, innerEl) {
    var both = outerEl.add(innerEl);
    var diff;
    // effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
    both.css({
        position: 'relative',
        left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
    });
    diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
    both.css({ position: '', left: '' }); // undo hack
    return diff;
}
exports.subtractInnerElHeight = subtractInnerElHeight;
/* Element Geom Utilities
----------------------------------------------------------------------------------------------------------------------*/
// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
    var position = el.css('position');
    var scrollParent = el.parents().filter(function () {
        var parent = $(this);
        return (/(auto|scroll)/).test(parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x'));
    }).eq(0);
    return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}
exports.getScrollParent = getScrollParent;
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
exports.getOuterRect = getOuterRect;
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
        right: left + el[0].clientWidth,
        top: top,
        bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
    };
}
exports.getClientRect = getClientRect;
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
exports.getContentRect = getContentRect;
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
    if (getIsLeftRtlScrollbars() && el.css('direction') === 'rtl') {
        widths.left = leftRightWidth;
    }
    else {
        widths.right = leftRightWidth;
    }
    return widths;
}
exports.getScrollbarWidths = getScrollbarWidths;
// The scrollbar width computations in getScrollbarWidths are sometimes flawed when it comes to
// retina displays, rounding, and IE11. Massage them into a usable value.
function sanitizeScrollbarWidth(width) {
    width = Math.max(0, width); // no negatives
    width = Math.round(width);
    return width;
}
// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side
var _isLeftRtlScrollbars = null;
function getIsLeftRtlScrollbars() {
    if (_isLeftRtlScrollbars === null) {
        _isLeftRtlScrollbars = computeIsLeftRtlScrollbars();
    }
    return _isLeftRtlScrollbars;
}
function computeIsLeftRtlScrollbars() {
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
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.which === 1 && !ev.ctrlKey;
}
exports.isPrimaryMouseButton = isPrimaryMouseButton;
function getEvX(ev) {
    var touches = ev.originalEvent.touches;
    // on mobile FF, pageX for touch events is present, but incorrect,
    // so, look at touch coordinates first.
    if (touches && touches.length) {
        return touches[0].pageX;
    }
    return ev.pageX;
}
exports.getEvX = getEvX;
function getEvY(ev) {
    var touches = ev.originalEvent.touches;
    // on mobile FF, pageX for touch events is present, but incorrect,
    // so, look at touch coordinates first.
    if (touches && touches.length) {
        return touches[0].pageY;
    }
    return ev.pageY;
}
exports.getEvY = getEvY;
function getEvIsTouch(ev) {
    return /^touch/.test(ev.type);
}
exports.getEvIsTouch = getEvIsTouch;
function preventSelection(el) {
    el.addClass('fc-unselectable')
        .on('selectstart', preventDefault);
}
exports.preventSelection = preventSelection;
function allowSelection(el) {
    el.removeClass('fc-unselectable')
        .off('selectstart', preventDefault);
}
exports.allowSelection = allowSelection;
// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
    ev.preventDefault();
}
exports.preventDefault = preventDefault;
/* General Geometry Utils
----------------------------------------------------------------------------------------------------------------------*/
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
exports.intersectRects = intersectRects;
// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
    return {
        left: Math.min(Math.max(point.left, rect.left), rect.right),
        top: Math.min(Math.max(point.top, rect.top), rect.bottom)
    };
}
exports.constrainPoint = constrainPoint;
// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
    return {
        left: (rect.left + rect.right) / 2,
        top: (rect.top + rect.bottom) / 2
    };
}
exports.getRectCenter = getRectCenter;
// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
    return {
        left: point1.left - point2.left,
        top: point1.top - point2.top
    };
}
exports.diffPoints = diffPoints;
/* Object Ordering by Field
----------------------------------------------------------------------------------------------------------------------*/
function parseFieldSpecs(input) {
    var specs = [];
    var tokens = [];
    var i;
    var token;
    if (typeof input === 'string') {
        tokens = input.split(/\s*,\s*/);
    }
    else if (typeof input === 'function') {
        tokens = [input];
    }
    else if ($.isArray(input)) {
        tokens = input;
    }
    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (typeof token === 'string') {
            specs.push(token.charAt(0) === '-' ?
                { field: token.substring(1), order: -1 } :
                { field: token, order: 1 });
        }
        else if (typeof token === 'function') {
            specs.push({ func: token });
        }
    }
    return specs;
}
exports.parseFieldSpecs = parseFieldSpecs;
function compareByFieldSpecs(obj1, obj2, fieldSpecs, obj1fallback, obj2fallback) {
    var i;
    var cmp;
    for (i = 0; i < fieldSpecs.length; i++) {
        cmp = compareByFieldSpec(obj1, obj2, fieldSpecs[i], obj1fallback, obj2fallback);
        if (cmp) {
            return cmp;
        }
    }
    return 0;
}
exports.compareByFieldSpecs = compareByFieldSpecs;
function compareByFieldSpec(obj1, obj2, fieldSpec, obj1fallback, obj2fallback) {
    if (fieldSpec.func) {
        return fieldSpec.func(obj1, obj2);
    }
    var val1 = obj1[fieldSpec.field];
    var val2 = obj2[fieldSpec.field];
    if (val1 == null && obj1fallback) {
        val1 = obj1fallback[fieldSpec.field];
    }
    if (val2 == null && obj2fallback) {
        val2 = obj2fallback[fieldSpec.field];
    }
    return flexibleCompare(val1, val2) * (fieldSpec.order || 1);
}
exports.compareByFieldSpec = compareByFieldSpec;
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
exports.flexibleCompare = flexibleCompare;
/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/
exports.dayIDs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
exports.unitsDesc = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']; // descending
// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function diffDayTime(a, b) {
    return moment.duration({
        days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
        ms: a.time() - b.time() // time-of-day from day start. disregards timezone
    });
}
exports.diffDayTime = diffDayTime;
// Diffs the two moments via their start-of-day (regardless of timezone). Produces whole-day durations.
function diffDay(a, b) {
    return moment.duration({
        days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
    });
}
exports.diffDay = diffDay;
// Diffs two moments, producing a duration, made of a whole-unit-increment of the given unit. Uses rounding.
function diffByUnit(a, b, unit) {
    return moment.duration(Math.round(a.diff(b, unit, true)), // returnFloat=true
    unit);
}
exports.diffByUnit = diffByUnit;
// Computes the unit name of the largest whole-unit period of time.
// For example, 48 hours will be "days" whereas 49 hours will be "hours".
// Accepts start/end, a range object, or an original duration object.
function computeGreatestUnit(start, end) {
    var i;
    var unit;
    var val;
    for (i = 0; i < exports.unitsDesc.length; i++) {
        unit = exports.unitsDesc[i];
        val = computeRangeAs(unit, start, end);
        if (val >= 1 && isInt(val)) {
            break;
        }
    }
    return unit; // will be "milliseconds" if nothing else matches
}
exports.computeGreatestUnit = computeGreatestUnit;
// like computeGreatestUnit, but has special abilities to interpret the source input for clues
function computeDurationGreatestUnit(duration, durationInput) {
    var unit = computeGreatestUnit(duration);
    // prevent days:7 from being interpreted as a week
    if (unit === 'week' && typeof durationInput === 'object' && durationInput.days) {
        unit = 'day';
    }
    return unit;
}
exports.computeDurationGreatestUnit = computeDurationGreatestUnit;
// Computes the number of units (like "hours") in the given range.
// Range can be a {start,end} object, separate start/end args, or a Duration.
// Results are based on Moment's .as() and .diff() methods, so results can depend on internal handling
// of month-diffing logic (which tends to vary from version to version).
function computeRangeAs(unit, start, end) {
    if (end != null) {
        return end.diff(start, unit, true);
    }
    else if (moment.isDuration(start)) {
        return start.as(unit);
    }
    else {
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
exports.divideRangeByDuration = divideRangeByDuration;
// Intelligently divides one duration by another
function divideDurationByDuration(dur1, dur2) {
    var months1;
    var months2;
    if (durationHasTime(dur1) || durationHasTime(dur2)) {
        return dur1 / dur2;
    }
    months1 = dur1.asMonths();
    months2 = dur2.asMonths();
    if (Math.abs(months1) >= 1 && isInt(months1) &&
        Math.abs(months2) >= 1 && isInt(months2)) {
        return months1 / months2;
    }
    return dur1.asDays() / dur2.asDays();
}
exports.divideDurationByDuration = divideDurationByDuration;
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
exports.multiplyDuration = multiplyDuration;
// Returns a boolean about whether the given duration has any time parts (hours/minutes/seconds/ms)
function durationHasTime(dur) {
    return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
}
exports.durationHasTime = durationHasTime;
function isNativeDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}
exports.isNativeDate = isNativeDate;
// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
    return typeof str === 'string' &&
        /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}
exports.isTimeString = isTimeString;
/* Logging and Debug
----------------------------------------------------------------------------------------------------------------------*/
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var console = window.console;
    if (console && console.log) {
        return console.log.apply(console, args);
    }
}
exports.log = log;
function warn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var console = window.console;
    if (console && console.warn) {
        return console.warn.apply(console, args);
    }
    else {
        return log.apply(null, args);
    }
}
exports.warn = warn;
/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/
var hasOwnPropMethod = {}.hasOwnProperty;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
    var dest = {};
    var i;
    var name;
    var complexObjs;
    var j;
    var val;
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
            if (!(name in dest)) {
                dest[name] = props[name];
            }
        }
    }
    return dest;
}
exports.mergeProps = mergeProps;
function copyOwnProps(src, dest) {
    for (var name_1 in src) {
        if (hasOwnProp(src, name_1)) {
            dest[name_1] = src[name_1];
        }
    }
}
exports.copyOwnProps = copyOwnProps;
function hasOwnProp(obj, name) {
    return hasOwnPropMethod.call(obj, name);
}
exports.hasOwnProp = hasOwnProp;
function applyAll(functions, thisObj, args) {
    if ($.isFunction(functions)) {
        functions = [functions];
    }
    if (functions) {
        var i = void 0;
        var ret = void 0;
        for (i = 0; i < functions.length; i++) {
            ret = functions[i].apply(thisObj, args) || ret;
        }
        return ret;
    }
}
exports.applyAll = applyAll;
function removeMatching(array, testFunc) {
    var removeCnt = 0;
    var i = 0;
    while (i < array.length) {
        if (testFunc(array[i])) {
            array.splice(i, 1);
            removeCnt++;
        }
        else {
            i++;
        }
    }
    return removeCnt;
}
exports.removeMatching = removeMatching;
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
exports.removeExact = removeExact;
function isArraysEqual(a0, a1) {
    var len = a0.length;
    var i;
    if (len == null || len !== a1.length) {
        return false;
    }
    for (i = 0; i < len; i++) {
        if (a0[i] !== a1[i]) {
            return false;
        }
    }
    return true;
}
exports.isArraysEqual = isArraysEqual;
function firstDefined() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
}
exports.firstDefined = firstDefined;
function htmlEscape(s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />');
}
exports.htmlEscape = htmlEscape;
function stripHtmlEntities(text) {
    return text.replace(/&.*?;/g, '');
}
exports.stripHtmlEntities = stripHtmlEntities;
// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
    var statements = [];
    $.each(cssProps, function (name, val) {
        if (val != null) {
            statements.push(name + ':' + val);
        }
    });
    return statements.join(';');
}
exports.cssToStr = cssToStr;
// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
    var parts = [];
    $.each(attrs, function (name, val) {
        if (val != null) {
            parts.push(name + '="' + htmlEscape(val) + '"');
        }
    });
    return parts.join(' ');
}
exports.attrsToStr = attrsToStr;
function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitaliseFirstLetter = capitaliseFirstLetter;
function compareNumbers(a, b) {
    return a - b;
}
exports.compareNumbers = compareNumbers;
function isInt(n) {
    return n % 1 === 0;
}
exports.isInt = isInt;
// Returns a method bound to the given object context.
// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
// different contexts as identical when binding/unbinding events.
function proxy(obj, methodName) {
    var method = obj[methodName];
    return function () {
        return method.apply(obj, arguments);
    };
}
exports.proxy = proxy;
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    var args;
    var context;
    var timestamp;
    var result;
    var later = function () {
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
    return function () {
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
exports.debounce = debounce;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var moment_ext_1 = __webpack_require__(10);
var UnzonedRange = /** @class */ (function () {
    function UnzonedRange(startInput, endInput) {
        // TODO: move these into footprint.
        // Especially, doesn't make sense for null startMs/endMs.
        this.isStart = true;
        this.isEnd = true;
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
    }
    /*
    SIDEEFFECT: will mutate eventRanges.
    Will return a new array result.
    Only works for non-open-ended ranges.
    */
    UnzonedRange.invertRanges = function (ranges, constraintRange) {
        var invertedRanges = [];
        var startMs = constraintRange.startMs; // the end of the previous range. the start of the new range
        var i;
        var dateRange;
        // ranges need to be in order. required for our date-walking algorithm
        ranges.sort(compareUnzonedRanges);
        for (i = 0; i < ranges.length; i++) {
            dateRange = ranges[i];
            // add the span of time before the event (if there is any)
            if (dateRange.startMs > startMs) {
                invertedRanges.push(new UnzonedRange(startMs, dateRange.startMs));
            }
            if (dateRange.endMs > startMs) {
                startMs = dateRange.endMs;
            }
        }
        // add the span of time after the last event (if there is any)
        if (startMs < constraintRange.endMs) {
            invertedRanges.push(new UnzonedRange(startMs, constraintRange.endMs));
        }
        return invertedRanges;
    };
    UnzonedRange.prototype.intersect = function (otherRange) {
        var startMs = this.startMs;
        var endMs = this.endMs;
        var newRange = null;
        if (otherRange.startMs != null) {
            if (startMs == null) {
                startMs = otherRange.startMs;
            }
            else {
                startMs = Math.max(startMs, otherRange.startMs);
            }
        }
        if (otherRange.endMs != null) {
            if (endMs == null) {
                endMs = otherRange.endMs;
            }
            else {
                endMs = Math.min(endMs, otherRange.endMs);
            }
        }
        if (startMs == null || endMs == null || startMs < endMs) {
            newRange = new UnzonedRange(startMs, endMs);
            newRange.isStart = this.isStart && startMs === this.startMs;
            newRange.isEnd = this.isEnd && endMs === this.endMs;
        }
        return newRange;
    };
    UnzonedRange.prototype.intersectsWith = function (otherRange) {
        return (this.endMs == null || otherRange.startMs == null || this.endMs > otherRange.startMs) &&
            (this.startMs == null || otherRange.endMs == null || this.startMs < otherRange.endMs);
    };
    UnzonedRange.prototype.containsRange = function (innerRange) {
        return (this.startMs == null || (innerRange.startMs != null && innerRange.startMs >= this.startMs)) &&
            (this.endMs == null || (innerRange.endMs != null && innerRange.endMs <= this.endMs));
    };
    // `date` can be a moment, a Date, or a millisecond time.
    UnzonedRange.prototype.containsDate = function (date) {
        var ms = date.valueOf();
        return (this.startMs == null || ms >= this.startMs) &&
            (this.endMs == null || ms < this.endMs);
    };
    // If the given date is not within the given range, move it inside.
    // (If it's past the end, make it one millisecond before the end).
    // `date` can be a moment, a Date, or a millisecond time.
    // Returns a MS-time.
    UnzonedRange.prototype.constrainDate = function (date) {
        var ms = date.valueOf();
        if (this.startMs != null && ms < this.startMs) {
            ms = this.startMs;
        }
        if (this.endMs != null && ms >= this.endMs) {
            ms = this.endMs - 1;
        }
        return ms;
    };
    UnzonedRange.prototype.equals = function (otherRange) {
        return this.startMs === otherRange.startMs && this.endMs === otherRange.endMs;
    };
    UnzonedRange.prototype.clone = function () {
        var range = new UnzonedRange(this.startMs, this.endMs);
        range.isStart = this.isStart;
        range.isEnd = this.isEnd;
        return range;
    };
    // Returns an ambig-zoned moment from startMs.
    // BEWARE: returned moment is not localized.
    // Formatting and start-of-week will be default.
    UnzonedRange.prototype.getStart = function () {
        if (this.startMs != null) {
            return moment_ext_1.default.utc(this.startMs).stripZone();
        }
        return null;
    };
    // Returns an ambig-zoned moment from startMs.
    // BEWARE: returned moment is not localized.
    // Formatting and start-of-week will be default.
    UnzonedRange.prototype.getEnd = function () {
        if (this.endMs != null) {
            return moment_ext_1.default.utc(this.endMs).stripZone();
        }
        return null;
    };
    UnzonedRange.prototype.as = function (unit) {
        return moment.utc(this.endMs).diff(moment.utc(this.startMs), unit, true);
    };
    return UnzonedRange;
}());
exports.default = UnzonedRange;
/*
Only works for non-open-ended ranges.
*/
function compareUnzonedRanges(range1, range2) {
    return range1.startMs - range2.startMs; // earlier ranges go first
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var ParsableModelMixin_1 = __webpack_require__(208);
var Class_1 = __webpack_require__(32);
var EventDefParser_1 = __webpack_require__(49);
var EventSource = /** @class */ (function (_super) {
    tslib_1.__extends(EventSource, _super);
    // can we do away with calendar? at least for the abstract?
    // useful for buildEventDef
    function EventSource(calendar) {
        var _this = _super.call(this) || this;
        _this.calendar = calendar;
        _this.className = [];
        _this.uid = String(EventSource.uuid++);
        return _this;
    }
    /*
    rawInput can be any data type!
    */
    EventSource.parse = function (rawInput, calendar) {
        var source = new this(calendar);
        if (typeof rawInput === 'object') {
            if (source.applyProps(rawInput)) {
                return source;
            }
        }
        return false;
    };
    EventSource.normalizeId = function (id) {
        if (id) {
            return String(id);
        }
        return null;
    };
    EventSource.prototype.fetch = function (start, end, timezone) {
        // subclasses must implement. must return a promise.
    };
    EventSource.prototype.removeEventDefsById = function (eventDefId) {
        // optional for subclasses to implement
    };
    EventSource.prototype.removeAllEventDefs = function () {
        // optional for subclasses to implement
    };
    /*
    For compairing/matching
    */
    EventSource.prototype.getPrimitive = function (otherSource) {
        // subclasses must implement
    };
    EventSource.prototype.parseEventDefs = function (rawEventDefs) {
        var i;
        var eventDef;
        var eventDefs = [];
        for (i = 0; i < rawEventDefs.length; i++) {
            eventDef = this.parseEventDef(rawEventDefs[i]);
            if (eventDef) {
                eventDefs.push(eventDef);
            }
        }
        return eventDefs;
    };
    EventSource.prototype.parseEventDef = function (rawInput) {
        var calendarTransform = this.calendar.opt('eventDataTransform');
        var sourceTransform = this.eventDataTransform;
        if (calendarTransform) {
            rawInput = calendarTransform(rawInput, this.calendar);
        }
        if (sourceTransform) {
            rawInput = sourceTransform(rawInput, this.calendar);
        }
        return EventDefParser_1.default.parse(rawInput, this);
    };
    EventSource.prototype.applyManualStandardProps = function (rawProps) {
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
    };
    EventSource.uuid = 0;
    EventSource.defineStandardProps = ParsableModelMixin_1.default.defineStandardProps;
    EventSource.copyVerbatimStandardProps = ParsableModelMixin_1.default.copyVerbatimStandardProps;
    return EventSource;
}(Class_1.default));
exports.default = EventSource;
ParsableModelMixin_1.default.mixInto(EventSource);
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
EventSource.defineStandardProps({
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
Utility methods for easily listening to events on another object,
and more importantly, easily unlistening from them.

USAGE:
  import { default as ListenerMixin, ListenerInterface } from './ListenerMixin'
in class:
  listenTo: ListenerInterface['listenTo']
  stopListeningTo: ListenerInterface['stopListeningTo']
after class:
  ListenerMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Mixin_1 = __webpack_require__(14);
var guid = 0;
var ListenerMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ListenerMixin, _super);
    function ListenerMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    ListenerMixin.prototype.listenTo = function (other, arg, callback) {
        if (typeof arg === 'object') {
            for (var eventName in arg) {
                if (arg.hasOwnProperty(eventName)) {
                    this.listenTo(other, eventName, arg[eventName]);
                }
            }
        }
        else if (typeof arg === 'string') {
            other.on(arg + '.' + this.getListenerNamespace(), // use event namespacing to identify this object
            $.proxy(callback, this) // always use `this` context
            // the usually-undesired jQuery guid behavior doesn't matter,
            // because we always unbind via namespace
            );
        }
    };
    /*
    Causes the current object to stop listening to events on the `other` object.
    `eventName` is optional. If omitted, will stop listening to ALL events on `other`.
    */
    ListenerMixin.prototype.stopListeningTo = function (other, eventName) {
        other.off((eventName || '') + '.' + this.getListenerNamespace());
    };
    /*
    Returns a string, unique to this object, to be used for event namespacing
    */
    ListenerMixin.prototype.getListenerNamespace = function () {
        if (this.listenerId == null) {
            this.listenerId = guid++;
        }
        return '_listener' + this.listenerId;
    };
    return ListenerMixin;
}(Mixin_1.default));
exports.default = ListenerMixin;


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
exports.newMomentProto = newMomentProto;
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
exports.oldMomentProto = oldMomentProto;
// tell momentjs to transfer these properties upon clone
var momentProperties = moment.momentProperties;
momentProperties.push('_fullCalendar');
momentProperties.push('_ambigTime');
momentProperties.push('_ambigZone');
/*
Call this if you want Moment's original format method to be used
*/
function oldMomentFormat(mom, formatStr) {
    return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}
exports.oldMomentFormat = oldMomentFormat;
// Creating
// -------------------------------------------------------------------------------------------------
// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
var momentExt = function () {
    return makeMoment(arguments);
};
exports.default = momentExt;
// Sames as momentExt, but forces the resulting moment to be in the UTC timezone.
momentExt.utc = function () {
    var mom = makeMoment(arguments, true);
    // Force it into UTC because makeMoment doesn't guarantee it
    // (if given a pre-existing moment for example)
    if (mom.hasTime()) {
        mom.utc();
    }
    return mom;
};
// Same as momentExt, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
momentExt.parseZone = function () {
    return makeMoment(arguments, true, true);
};
// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
    if (parseAsUTC === void 0) { parseAsUTC = false; }
    if (parseZone === void 0) { parseZone = false; }
    var input = args[0];
    var isSingleString = args.length === 1 && typeof input === 'string';
    var isAmbigTime;
    var isAmbigZone;
    var ambigMatch;
    var mom;
    if (moment.isMoment(input) || util_1.isNativeDate(input) || input === undefined) {
        mom = moment.apply(null, args);
    }
    else {
        isAmbigTime = false;
        isAmbigZone = false;
        if (isSingleString) {
            if (ambigDateOfMonthRegex.test(input)) {
                // accept strings like '2014-05', but convert to the first of the month
                input += '-01';
                args = [input]; // for when we pass it on to moment's constructor
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
        else if (parseZone) {
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
newMomentProto.week = newMomentProto.weeks = function (input) {
    var weekCalc = this._locale._fullCalendar_weekCalc;
    if (input == null && typeof weekCalc === 'function') {
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
newMomentProto.time = function (time) {
    // Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
    // `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
    if (!this._fullCalendar) {
        return oldMomentProto.time.apply(this, arguments);
    }
    if (time == null) {
        return moment.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
    }
    else {
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
newMomentProto.stripTime = function () {
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
newMomentProto.hasTime = function () {
    return !this._ambigTime;
};
// Timezone
// -------------------------------------------------------------------------------------------------
// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function () {
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
newMomentProto.hasZone = function () {
    return !this._ambigZone;
};
// implicitly marks a zone
newMomentProto.local = function (keepLocalTime) {
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
newMomentProto.utc = function (keepLocalTime) {
    oldMomentProto.utc.call(this, keepLocalTime);
    // ensure non-ambiguous
    // this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
    this._ambigTime = false;
    this._ambigZone = false;
    return this;
};
// implicitly marks a zone (will probably get called upon .utc() and .local())
newMomentProto.utcOffset = function (tzo) {
    if (tzo != null) {
        // these assignments needs to happen before the original zone method is called.
        // I forget why, something to do with a browser crash.
        this._ambigTime = false;
        this._ambigZone = false;
    }
    return oldMomentProto.utcOffset.apply(this, arguments);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
USAGE:
  import { default as EmitterMixin, EmitterInterface } from './EmitterMixin'
in class:
  on: EmitterInterface['on']
  one: EmitterInterface['one']
  off: EmitterInterface['off']
  trigger: EmitterInterface['trigger']
  triggerWith: EmitterInterface['triggerWith']
  hasHandlers: EmitterInterface['hasHandlers']
after class:
  EmitterMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Mixin_1 = __webpack_require__(14);
var EmitterMixin = /** @class */ (function (_super) {
    tslib_1.__extends(EmitterMixin, _super);
    function EmitterMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // jQuery-ification via $(this) allows a non-DOM object to have
    // the same event handling capabilities (including namespaces).
    EmitterMixin.prototype.on = function (types, handler) {
        $(this).on(types, this._prepareIntercept(handler));
        return this; // for chaining
    };
    EmitterMixin.prototype.one = function (types, handler) {
        $(this).one(types, this._prepareIntercept(handler));
        return this; // for chaining
    };
    EmitterMixin.prototype._prepareIntercept = function (handler) {
        // handlers are always called with an "event" object as their first param.
        // sneak the `this` context and arguments into the extra parameter object
        // and forward them on to the original handler.
        var intercept = function (ev, extra) {
            return handler.apply(extra.context || this, extra.args || []);
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
    };
    EmitterMixin.prototype.off = function (types, handler) {
        $(this).off(types, handler);
        return this; // for chaining
    };
    EmitterMixin.prototype.trigger = function (types) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // pass in "extra" info to the intercept
        $(this).triggerHandler(types, { args: args });
        return this; // for chaining
    };
    EmitterMixin.prototype.triggerWith = function (types, context, args) {
        // `triggerHandler` is less reliant on the DOM compared to `trigger`.
        // pass in "extra" info to the intercept.
        $(this).triggerHandler(types, { context: context, args: args });
        return this; // for chaining
    };
    EmitterMixin.prototype.hasHandlers = function (type) {
        var hash = $._data(this, 'events'); // http://blog.jquery.com/2012/08/09/jquery-1-8-released/
        return hash && hash[type] && hash[type].length > 0;
    };
    return EmitterMixin;
}(Mixin_1.default));
exports.default = EmitterMixin;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/*
Meant to be immutable
*/
var ComponentFootprint = /** @class */ (function () {
    function ComponentFootprint(unzonedRange, isAllDay) {
        this.isAllDay = false; // component can choose to ignore this
        this.unzonedRange = unzonedRange;
        this.isAllDay = isAllDay;
    }
    /*
    Only works for non-open-ended ranges.
    */
    ComponentFootprint.prototype.toLegacy = function (calendar) {
        return {
            start: calendar.msToMoment(this.unzonedRange.startMs, this.isAllDay),
            end: calendar.msToMoment(this.unzonedRange.endMs, this.isAllDay)
        };
    };
    return ComponentFootprint;
}());
exports.default = ComponentFootprint;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var EventDef_1 = __webpack_require__(33);
var EventInstance_1 = __webpack_require__(209);
var EventDateProfile_1 = __webpack_require__(17);
var SingleEventDef = /** @class */ (function (_super) {
    tslib_1.__extends(SingleEventDef, _super);
    function SingleEventDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    Will receive start/end params, but will be ignored.
    */
    SingleEventDef.prototype.buildInstances = function () {
        return [this.buildInstance()];
    };
    SingleEventDef.prototype.buildInstance = function () {
        return new EventInstance_1.default(this, // definition
        this.dateProfile);
    };
    SingleEventDef.prototype.isAllDay = function () {
        return this.dateProfile.isAllDay();
    };
    SingleEventDef.prototype.clone = function () {
        var def = _super.prototype.clone.call(this);
        def.dateProfile = this.dateProfile;
        return def;
    };
    SingleEventDef.prototype.rezone = function () {
        var calendar = this.source.calendar;
        var dateProfile = this.dateProfile;
        this.dateProfile = new EventDateProfile_1.default(calendar.moment(dateProfile.start), dateProfile.end ? calendar.moment(dateProfile.end) : null, calendar);
    };
    /*
    NOTE: if super-method fails, should still attempt to apply
    */
    SingleEventDef.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        var dateProfile = EventDateProfile_1.default.parse(rawProps, this.source); // returns null on failure
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
    };
    return SingleEventDef;
}(EventDef_1.default));
exports.default = SingleEventDef;
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
SingleEventDef.defineStandardProps({
    start: false,
    date: false,
    end: false,
    allDay: false
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Mixin = /** @class */ (function () {
    function Mixin() {
    }
    Mixin.mixInto = function (destClass) {
        var _this = this;
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            if (!destClass.prototype[name]) {
                destClass.prototype[name] = _this.prototype[name];
            }
        });
    };
    /*
    will override existing methods
    TODO: remove! not used anymore
    */
    Mixin.mixOver = function (destClass) {
        var _this = this;
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            destClass.prototype[name] = _this.prototype[name];
        });
    };
    return Mixin;
}());
exports.default = Mixin;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Interaction = /** @class */ (function () {
    function Interaction(component) {
        this.view = component._getView();
        this.component = component;
    }
    Interaction.prototype.opt = function (name) {
        return this.view.opt(name);
    };
    Interaction.prototype.end = function () {
        // subclasses can implement
    };
    return Interaction;
}());
exports.default = Interaction;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = '3.8.2';
// When introducing internal API incompatibilities (where fullcalendar plugins would break),
// the minor version of the calendar should be upped (ex: 2.7.2 -> 2.8.0)
// and the below integer should be incremented.
exports.internalApiVersion = 12;
var util_1 = __webpack_require__(4);
exports.applyAll = util_1.applyAll;
exports.debounce = util_1.debounce;
exports.isInt = util_1.isInt;
exports.htmlEscape = util_1.htmlEscape;
exports.cssToStr = util_1.cssToStr;
exports.proxy = util_1.proxy;
exports.capitaliseFirstLetter = util_1.capitaliseFirstLetter;
exports.getOuterRect = util_1.getOuterRect;
exports.getClientRect = util_1.getClientRect;
exports.getContentRect = util_1.getContentRect;
exports.getScrollbarWidths = util_1.getScrollbarWidths;
exports.preventDefault = util_1.preventDefault;
exports.parseFieldSpecs = util_1.parseFieldSpecs;
exports.compareByFieldSpecs = util_1.compareByFieldSpecs;
exports.compareByFieldSpec = util_1.compareByFieldSpec;
exports.flexibleCompare = util_1.flexibleCompare;
exports.computeGreatestUnit = util_1.computeGreatestUnit;
exports.divideRangeByDuration = util_1.divideRangeByDuration;
exports.divideDurationByDuration = util_1.divideDurationByDuration;
exports.multiplyDuration = util_1.multiplyDuration;
exports.durationHasTime = util_1.durationHasTime;
exports.log = util_1.log;
exports.warn = util_1.warn;
exports.removeExact = util_1.removeExact;
exports.intersectRects = util_1.intersectRects;
var date_formatting_1 = __webpack_require__(47);
exports.formatDate = date_formatting_1.formatDate;
exports.formatRange = date_formatting_1.formatRange;
exports.queryMostGranularFormatUnit = date_formatting_1.queryMostGranularFormatUnit;
var locale_1 = __webpack_require__(30);
exports.datepickerLocale = locale_1.datepickerLocale;
exports.locale = locale_1.locale;
var moment_ext_1 = __webpack_require__(10);
exports.moment = moment_ext_1.default;
var EmitterMixin_1 = __webpack_require__(11);
exports.EmitterMixin = EmitterMixin_1.default;
var ListenerMixin_1 = __webpack_require__(7);
exports.ListenerMixin = ListenerMixin_1.default;
var Model_1 = __webpack_require__(48);
exports.Model = Model_1.default;
var Constraints_1 = __webpack_require__(207);
exports.Constraints = Constraints_1.default;
var UnzonedRange_1 = __webpack_require__(5);
exports.UnzonedRange = UnzonedRange_1.default;
var ComponentFootprint_1 = __webpack_require__(12);
exports.ComponentFootprint = ComponentFootprint_1.default;
var BusinessHourGenerator_1 = __webpack_require__(212);
exports.BusinessHourGenerator = BusinessHourGenerator_1.default;
var EventDef_1 = __webpack_require__(33);
exports.EventDef = EventDef_1.default;
var EventDefMutation_1 = __webpack_require__(36);
exports.EventDefMutation = EventDefMutation_1.default;
var EventSourceParser_1 = __webpack_require__(37);
exports.EventSourceParser = EventSourceParser_1.default;
var EventSource_1 = __webpack_require__(6);
exports.EventSource = EventSource_1.default;
var ThemeRegistry_1 = __webpack_require__(51);
exports.defineThemeSystem = ThemeRegistry_1.defineThemeSystem;
var EventInstanceGroup_1 = __webpack_require__(18);
exports.EventInstanceGroup = EventInstanceGroup_1.default;
var ArrayEventSource_1 = __webpack_require__(52);
exports.ArrayEventSource = ArrayEventSource_1.default;
var FuncEventSource_1 = __webpack_require__(215);
exports.FuncEventSource = FuncEventSource_1.default;
var JsonFeedEventSource_1 = __webpack_require__(216);
exports.JsonFeedEventSource = JsonFeedEventSource_1.default;
var EventFootprint_1 = __webpack_require__(35);
exports.EventFootprint = EventFootprint_1.default;
var Class_1 = __webpack_require__(32);
exports.Class = Class_1.default;
var Mixin_1 = __webpack_require__(14);
exports.Mixin = Mixin_1.default;
var CoordCache_1 = __webpack_require__(53);
exports.CoordCache = CoordCache_1.default;
var DragListener_1 = __webpack_require__(54);
exports.DragListener = DragListener_1.default;
var Promise_1 = __webpack_require__(19);
exports.Promise = Promise_1.default;
var TaskQueue_1 = __webpack_require__(217);
exports.TaskQueue = TaskQueue_1.default;
var RenderQueue_1 = __webpack_require__(218);
exports.RenderQueue = RenderQueue_1.default;
var Scroller_1 = __webpack_require__(39);
exports.Scroller = Scroller_1.default;
var Theme_1 = __webpack_require__(38);
exports.Theme = Theme_1.default;
var DateComponent_1 = __webpack_require__(219);
exports.DateComponent = DateComponent_1.default;
var InteractiveDateComponent_1 = __webpack_require__(40);
exports.InteractiveDateComponent = InteractiveDateComponent_1.default;
var Calendar_1 = __webpack_require__(220);
exports.Calendar = Calendar_1.default;
var View_1 = __webpack_require__(41);
exports.View = View_1.default;
var ViewRegistry_1 = __webpack_require__(21);
exports.defineView = ViewRegistry_1.defineView;
exports.getViewConfig = ViewRegistry_1.getViewConfig;
var DayTableMixin_1 = __webpack_require__(55);
exports.DayTableMixin = DayTableMixin_1.default;
var BusinessHourRenderer_1 = __webpack_require__(56);
exports.BusinessHourRenderer = BusinessHourRenderer_1.default;
var EventRenderer_1 = __webpack_require__(42);
exports.EventRenderer = EventRenderer_1.default;
var FillRenderer_1 = __webpack_require__(57);
exports.FillRenderer = FillRenderer_1.default;
var HelperRenderer_1 = __webpack_require__(58);
exports.HelperRenderer = HelperRenderer_1.default;
var ExternalDropping_1 = __webpack_require__(222);
exports.ExternalDropping = ExternalDropping_1.default;
var EventResizing_1 = __webpack_require__(223);
exports.EventResizing = EventResizing_1.default;
var EventPointing_1 = __webpack_require__(59);
exports.EventPointing = EventPointing_1.default;
var EventDragging_1 = __webpack_require__(224);
exports.EventDragging = EventDragging_1.default;
var DateSelecting_1 = __webpack_require__(225);
exports.DateSelecting = DateSelecting_1.default;
var StandardInteractionsMixin_1 = __webpack_require__(60);
exports.StandardInteractionsMixin = StandardInteractionsMixin_1.default;
var AgendaView_1 = __webpack_require__(226);
exports.AgendaView = AgendaView_1.default;
var TimeGrid_1 = __webpack_require__(227);
exports.TimeGrid = TimeGrid_1.default;
var DayGrid_1 = __webpack_require__(61);
exports.DayGrid = DayGrid_1.default;
var BasicView_1 = __webpack_require__(62);
exports.BasicView = BasicView_1.default;
var MonthView_1 = __webpack_require__(229);
exports.MonthView = MonthView_1.default;
var ListView_1 = __webpack_require__(230);
exports.ListView = ListView_1.default;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
/*
Meant to be immutable
*/
var EventDateProfile = /** @class */ (function () {
    function EventDateProfile(start, end, calendar) {
        this.start = start;
        this.end = end || null;
        this.unzonedRange = this.buildUnzonedRange(calendar);
    }
    /*
    Needs an EventSource object
    */
    EventDateProfile.parse = function (rawProps, source) {
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
    EventDateProfile.isStandardProp = function (propName) {
        return propName === 'start' || propName === 'date' || propName === 'end' || propName === 'allDay';
    };
    EventDateProfile.prototype.isAllDay = function () {
        return !(this.start.hasTime() || (this.end && this.end.hasTime()));
    };
    /*
    Needs a Calendar object
    */
    EventDateProfile.prototype.buildUnzonedRange = function (calendar) {
        var startMs = this.start.clone().stripZone().valueOf();
        var endMs = this.getEnd(calendar).stripZone().valueOf();
        return new UnzonedRange_1.default(startMs, endMs);
    };
    /*
    Needs a Calendar object
    */
    EventDateProfile.prototype.getEnd = function (calendar) {
        return this.end ?
            this.end.clone() :
            // derive the end from the start and allDay. compute allDay if necessary
            calendar.getDefaultEventEnd(this.isAllDay(), this.start);
    };
    return EventDateProfile;
}());
exports.default = EventDateProfile;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
var util_1 = __webpack_require__(34);
var EventRange_1 = __webpack_require__(211);
/*
It's expected that there will be at least one EventInstance,
OR that an explicitEventDef is assigned.
*/
var EventInstanceGroup = /** @class */ (function () {
    function EventInstanceGroup(eventInstances) {
        this.eventInstances = eventInstances || [];
    }
    EventInstanceGroup.prototype.getAllEventRanges = function (constraintRange) {
        if (constraintRange) {
            return this.sliceNormalRenderRanges(constraintRange);
        }
        else {
            return this.eventInstances.map(util_1.eventInstanceToEventRange);
        }
    };
    EventInstanceGroup.prototype.sliceRenderRanges = function (constraintRange) {
        if (this.isInverse()) {
            return this.sliceInverseRenderRanges(constraintRange);
        }
        else {
            return this.sliceNormalRenderRanges(constraintRange);
        }
    };
    EventInstanceGroup.prototype.sliceNormalRenderRanges = function (constraintRange) {
        var eventInstances = this.eventInstances;
        var i;
        var eventInstance;
        var slicedRange;
        var slicedEventRanges = [];
        for (i = 0; i < eventInstances.length; i++) {
            eventInstance = eventInstances[i];
            slicedRange = eventInstance.dateProfile.unzonedRange.intersect(constraintRange);
            if (slicedRange) {
                slicedEventRanges.push(new EventRange_1.default(slicedRange, eventInstance.def, eventInstance));
            }
        }
        return slicedEventRanges;
    };
    EventInstanceGroup.prototype.sliceInverseRenderRanges = function (constraintRange) {
        var unzonedRanges = this.eventInstances.map(util_1.eventInstanceToUnzonedRange);
        var ownerDef = this.getEventDef();
        unzonedRanges = UnzonedRange_1.default.invertRanges(unzonedRanges, constraintRange);
        return unzonedRanges.map(function (unzonedRange) {
            return new EventRange_1.default(unzonedRange, ownerDef); // don't give an EventInstance
        });
    };
    EventInstanceGroup.prototype.isInverse = function () {
        return this.getEventDef().hasInverseRendering();
    };
    EventInstanceGroup.prototype.getEventDef = function () {
        return this.explicitEventDef || this.eventInstances[0].def;
    };
    return EventInstanceGroup;
}());
exports.default = EventInstanceGroup;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var PromiseStub = {
    construct: function (executor) {
        var deferred = $.Deferred();
        var promise = deferred.promise();
        if (typeof executor === 'function') {
            executor(function (val) {
                deferred.resolve(val);
                attachImmediatelyResolvingThen(promise, val);
            }, function () {
                deferred.reject();
                attachImmediatelyRejectingThen(promise);
            });
        }
        return promise;
    },
    resolve: function (val) {
        var deferred = $.Deferred().resolve(val);
        var promise = deferred.promise();
        attachImmediatelyResolvingThen(promise, val);
        return promise;
    },
    reject: function () {
        var deferred = $.Deferred().reject();
        var promise = deferred.promise();
        attachImmediatelyRejectingThen(promise);
        return promise;
    }
};
exports.default = PromiseStub;
function attachImmediatelyResolvingThen(promise, val) {
    promise.then = function (onResolve) {
        if (typeof onResolve === 'function') {
            return PromiseStub.resolve(onResolve(val));
        }
        return promise;
    };
}
function attachImmediatelyRejectingThen(promise) {
    promise.then = function (onResolve, onReject) {
        if (typeof onReject === 'function') {
            onReject();
        }
        return promise;
    };
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var exportHooks = __webpack_require__(16);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
exportHooks.touchMouseIgnoreWait = 500;
var globalEmitter = null;
var neededCount = 0;
/*
Listens to document and window-level user-interaction events, like touch events and mouse events,
and fires these events as-is to whoever is observing a GlobalEmitter.
Best when used as a singleton via GlobalEmitter.get()

Normalizes mouse/touch events. For examples:
- ignores the the simulated mouse events that happen after a quick tap: mousemove+mousedown+mouseup+click
- compensates for various buggy scenarios where a touchend does not fire
*/
var GlobalEmitter = /** @class */ (function () {
    function GlobalEmitter() {
        this.isTouching = false;
        this.mouseIgnoreDepth = 0;
    }
    // gets the singleton
    GlobalEmitter.get = function () {
        if (!globalEmitter) {
            globalEmitter = new GlobalEmitter();
            globalEmitter.bind();
        }
        return globalEmitter;
    };
    // called when an object knows it will need a GlobalEmitter in the near future.
    GlobalEmitter.needed = function () {
        GlobalEmitter.get(); // ensures globalEmitter
        neededCount++;
    };
    // called when the object that originally called needed() doesn't need a GlobalEmitter anymore.
    GlobalEmitter.unneeded = function () {
        neededCount--;
        if (!neededCount) {
            globalEmitter.unbind();
            globalEmitter = null;
        }
    };
    GlobalEmitter.prototype.bind = function () {
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
        window.addEventListener('touchmove', this.handleTouchMoveProxy = function (ev) {
            _this.handleTouchMove($.Event(ev));
        }, { passive: false } // allows preventDefault()
        );
        // attach a handler to get called when ANY scroll action happens on the page.
        // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
        // http://stackoverflow.com/a/32954565/96342
        window.addEventListener('scroll', this.handleScrollProxy = function (ev) {
            _this.handleScroll($.Event(ev));
        }, true // useCapture
        );
    };
    GlobalEmitter.prototype.unbind = function () {
        this.stopListeningTo($(document));
        window.removeEventListener('touchmove', this.handleTouchMoveProxy);
        window.removeEventListener('scroll', this.handleScrollProxy, true // useCapture
        );
    };
    // Touch Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleTouchStart = function (ev) {
        // if a previous touch interaction never ended with a touchend, then implicitly end it,
        // but since a new touch interaction is about to begin, don't start the mouse ignore period.
        this.stopTouch(ev, true); // skipMouseIgnore=true
        this.isTouching = true;
        this.trigger('touchstart', ev);
    };
    GlobalEmitter.prototype.handleTouchMove = function (ev) {
        if (this.isTouching) {
            this.trigger('touchmove', ev);
        }
    };
    GlobalEmitter.prototype.handleTouchCancel = function (ev) {
        if (this.isTouching) {
            this.trigger('touchcancel', ev);
            // Have touchcancel fire an artificial touchend. That way, handlers won't need to listen to both.
            // If touchend fires later, it won't have any effect b/c isTouching will be false.
            this.stopTouch(ev);
        }
    };
    GlobalEmitter.prototype.handleTouchEnd = function (ev) {
        this.stopTouch(ev);
    };
    // Mouse Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleMouseDown = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mousedown', ev);
        }
    };
    GlobalEmitter.prototype.handleMouseMove = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mousemove', ev);
        }
    };
    GlobalEmitter.prototype.handleMouseUp = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mouseup', ev);
        }
    };
    GlobalEmitter.prototype.handleClick = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('click', ev);
        }
    };
    // Misc Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleSelectStart = function (ev) {
        this.trigger('selectstart', ev);
    };
    GlobalEmitter.prototype.handleContextMenu = function (ev) {
        this.trigger('contextmenu', ev);
    };
    GlobalEmitter.prototype.handleScroll = function (ev) {
        this.trigger('scroll', ev);
    };
    // Utils
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.stopTouch = function (ev, skipMouseIgnore) {
        if (skipMouseIgnore === void 0) { skipMouseIgnore = false; }
        if (this.isTouching) {
            this.isTouching = false;
            this.trigger('touchend', ev);
            if (!skipMouseIgnore) {
                this.startTouchMouseIgnore();
            }
        }
    };
    GlobalEmitter.prototype.startTouchMouseIgnore = function () {
        var _this = this;
        var wait = exportHooks.touchMouseIgnoreWait;
        if (wait) {
            this.mouseIgnoreDepth++;
            setTimeout(function () {
                _this.mouseIgnoreDepth--;
            }, wait);
        }
    };
    GlobalEmitter.prototype.shouldIgnoreMouse = function () {
        return this.isTouching || Boolean(this.mouseIgnoreDepth);
    };
    return GlobalEmitter;
}());
exports.default = GlobalEmitter;
ListenerMixin_1.default.mixInto(GlobalEmitter);
EmitterMixin_1.default.mixInto(GlobalEmitter);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var exportHooks = __webpack_require__(16);
exports.viewHash = {};
exportHooks.views = exports.viewHash;
function defineView(viewName, viewConfig) {
    exports.viewHash[viewName] = viewConfig;
}
exports.defineView = defineView;
function getViewConfig(viewName) {
    return exports.viewHash[viewName];
}
exports.getViewConfig = getViewConfig;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var DragListener_1 = __webpack_require__(54);
/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
------------------------------------------------------------------------------------------------------------------------
options:
- subjectEl
- subjectCenter
*/
var HitDragListener = /** @class */ (function (_super) {
    tslib_1.__extends(HitDragListener, _super);
    function HitDragListener(component, options) {
        var _this = _super.call(this, options) || this;
        _this.component = component;
        return _this;
    }
    // Called when drag listening starts (but a real drag has not necessarily began).
    // ev might be undefined if dragging was started manually.
    HitDragListener.prototype.handleInteractionStart = function (ev) {
        var subjectEl = this.subjectEl;
        var subjectRect;
        var origPoint;
        var point;
        this.component.hitsNeeded();
        this.computeScrollBounds(); // for autoscroll
        if (ev) {
            origPoint = { left: util_1.getEvX(ev), top: util_1.getEvY(ev) };
            point = origPoint;
            // constrain the point to bounds of the element being dragged
            if (subjectEl) {
                subjectRect = util_1.getOuterRect(subjectEl); // used for centering as well
                point = util_1.constrainPoint(point, subjectRect);
            }
            this.origHit = this.queryHit(point.left, point.top);
            // treat the center of the subject as the collision point?
            if (subjectEl && this.options.subjectCenter) {
                // only consider the area the subject overlaps the hit. best for large subjects.
                // TODO: skip this if hit didn't supply left/right/top/bottom
                if (this.origHit) {
                    subjectRect = util_1.intersectRects(this.origHit, subjectRect) ||
                        subjectRect; // in case there is no intersection
                }
                point = util_1.getRectCenter(subjectRect);
            }
            this.coordAdjust = util_1.diffPoints(point, origPoint); // point - origPoint
        }
        else {
            this.origHit = null;
            this.coordAdjust = null;
        }
        // call the super-method. do it after origHit has been computed
        _super.prototype.handleInteractionStart.call(this, ev);
    };
    // Called when the actual drag has started
    HitDragListener.prototype.handleDragStart = function (ev) {
        var hit;
        _super.prototype.handleDragStart.call(this, ev);
        // might be different from this.origHit if the min-distance is large
        hit = this.queryHit(util_1.getEvX(ev), util_1.getEvY(ev));
        // report the initial hit the mouse is over
        // especially important if no min-distance and drag starts immediately
        if (hit) {
            this.handleHitOver(hit);
        }
    };
    // Called when the drag moves
    HitDragListener.prototype.handleDrag = function (dx, dy, ev) {
        var hit;
        _super.prototype.handleDrag.call(this, dx, dy, ev);
        hit = this.queryHit(util_1.getEvX(ev), util_1.getEvY(ev));
        if (!isHitsEqual(hit, this.hit)) {
            if (this.hit) {
                this.handleHitOut();
            }
            if (hit) {
                this.handleHitOver(hit);
            }
        }
    };
    // Called when dragging has been stopped
    HitDragListener.prototype.handleDragEnd = function (ev) {
        this.handleHitDone();
        _super.prototype.handleDragEnd.call(this, ev);
    };
    // Called when a the mouse has just moved over a new hit
    HitDragListener.prototype.handleHitOver = function (hit) {
        var isOrig = isHitsEqual(hit, this.origHit);
        this.hit = hit;
        this.trigger('hitOver', this.hit, isOrig, this.origHit);
    };
    // Called when the mouse has just moved out of a hit
    HitDragListener.prototype.handleHitOut = function () {
        if (this.hit) {
            this.trigger('hitOut', this.hit);
            this.handleHitDone();
            this.hit = null;
        }
    };
    // Called after a hitOut. Also called before a dragStop
    HitDragListener.prototype.handleHitDone = function () {
        if (this.hit) {
            this.trigger('hitDone', this.hit);
        }
    };
    // Called when the interaction ends, whether there was a real drag or not
    HitDragListener.prototype.handleInteractionEnd = function (ev, isCancelled) {
        _super.prototype.handleInteractionEnd.call(this, ev, isCancelled);
        this.origHit = null;
        this.hit = null;
        this.component.hitsNotNeeded();
    };
    // Called when scrolling has stopped, whether through auto scroll, or the user scrolling
    HitDragListener.prototype.handleScrollEnd = function () {
        _super.prototype.handleScrollEnd.call(this);
        // hits' absolute positions will be in new places after a user's scroll.
        // HACK for recomputing.
        if (this.isDragging) {
            this.component.releaseHits();
            this.component.prepareHits();
        }
    };
    // Gets the hit underneath the coordinates for the given mouse event
    HitDragListener.prototype.queryHit = function (left, top) {
        if (this.coordAdjust) {
            left += this.coordAdjust.left;
            top += this.coordAdjust.top;
        }
        return this.component.queryHit(left, top);
    };
    return HitDragListener;
}(DragListener_1.default));
exports.default = HitDragListener;
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


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var exportHooks = __webpack_require__(16);
var options_1 = __webpack_require__(31);
var util_1 = __webpack_require__(4);
exports.localeOptionHash = {};
exportHooks.locales = exports.localeOptionHash;
// NOTE: can't guarantee any of these computations will run because not every locale has datepicker
// configs, so make sure there are English fallbacks for these in the defaults file.
var dpComputableOptions = {
    buttonText: function (dpOptions) {
        return {
            // the translations sometimes wrongly contain HTML entities
            prev: util_1.stripHtmlEntities(dpOptions.prevText),
            next: util_1.stripHtmlEntities(dpOptions.nextText),
            today: util_1.stripHtmlEntities(dpOptions.currentText)
        };
    },
    // Produces format strings like "MMMM YYYY" -> "September 2014"
    monthYearFormat: function (dpOptions) {
        return dpOptions.showMonthAfterYear ?
            'YYYY[' + dpOptions.yearSuffix + '] MMMM' :
            'MMMM YYYY[' + dpOptions.yearSuffix + ']';
    }
};
var momComputableOptions = {
    // Produces format strings like "ddd M/D" -> "Fri 9/15"
    dayOfMonthFormat: function (momOptions, fcOptions) {
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
    mediumTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h(:mm)a" -> "6pm" / "6:30pm"
    smallTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '(:mm)')
            .replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
    extraSmallTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '(:mm)')
            .replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
            .replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
    },
    // Produces format strings like "ha" / "H" -> "6pm" / "18"
    hourFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '')
            .replace(/(\Wmm)$/, '') // like above, but for foreign locales
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
    noMeridiemTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(/\s*a$/i, ''); // remove trailing AM/PM
    }
};
// options that should be computed off live calendar options (considers override options)
// TODO: best place for this? related to locale?
// TODO: flipping text based on isRTL is a bad idea because the CSS `direction` might want to handle it
var instanceComputableOptions = {
    // Produces format strings for results like "Mo 16"
    smallDayDateFormat: function (options) {
        return options.isRTL ?
            'D dd' :
            'dd D';
    },
    // Produces format strings for results like "Wk 5"
    weekFormat: function (options) {
        return options.isRTL ?
            'w[ ' + options.weekNumberTitle + ']' :
            '[' + options.weekNumberTitle + ' ]w';
    },
    // Produces format strings for results like "Wk5"
    smallWeekFormat: function (options) {
        return options.isRTL ?
            'w[' + options.weekNumberTitle + ']' :
            '[' + options.weekNumberTitle + ']w';
    }
};
// TODO: make these computable properties in optionsManager
function populateInstanceComputableOptions(options) {
    $.each(instanceComputableOptions, function (name, func) {
        if (options[name] == null) {
            options[name] = func(options);
        }
    });
}
exports.populateInstanceComputableOptions = populateInstanceComputableOptions;
// Initialize jQuery UI datepicker translations while using some of the translations
// Will set this as the default locales for datepicker.
function datepickerLocale(localeCode, dpLocaleCode, dpOptions) {
    // get the FullCalendar internal option hash for this locale. create if necessary
    var fcOptions = exports.localeOptionHash[localeCode] || (exports.localeOptionHash[localeCode] = {});
    // transfer some simple options from datepicker to fc
    fcOptions.isRTL = dpOptions.isRTL;
    fcOptions.weekNumberTitle = dpOptions.weekHeader;
    // compute some more complex options from datepicker
    $.each(dpComputableOptions, function (name, func) {
        fcOptions[name] = func(dpOptions);
    });
    var jqDatePicker = $.datepicker;
    // is jQuery UI Datepicker is on the page?
    if (jqDatePicker) {
        // Register the locale data.
        // FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
        // does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
        // Make an alias so the locale can be referenced either way.
        jqDatePicker.regional[dpLocaleCode] =
            jqDatePicker.regional[localeCode] = // alias
                dpOptions;
        // Alias 'en' to the default locale data. Do this every time.
        jqDatePicker.regional.en = jqDatePicker.regional[''];
        // Set as Datepicker's global defaults.
        jqDatePicker.setDefaults(dpOptions);
    }
}
exports.datepickerLocale = datepickerLocale;
// Sets FullCalendar-specific translations. Will set the locales as the global default.
function locale(localeCode, newFcOptions) {
    var fcOptions;
    var momOptions;
    // get the FullCalendar internal option hash for this locale. create if necessary
    fcOptions = exports.localeOptionHash[localeCode] || (exports.localeOptionHash[localeCode] = {});
    // provided new options for this locales? merge them in
    if (newFcOptions) {
        fcOptions = exports.localeOptionHash[localeCode] = options_1.mergeOptions([fcOptions, newFcOptions]);
    }
    // compute locale options that weren't defined.
    // always do this. newFcOptions can be undefined when initializing from i18n file,
    // so no way to tell if this is an initialization or a default-setting.
    momOptions = getMomentLocaleData(localeCode); // will fall back to en
    $.each(momComputableOptions, function (name, func) {
        if (fcOptions[name] == null) {
            fcOptions[name] = (func)(momOptions, fcOptions);
        }
    });
    // set it as the default locale for FullCalendar
    options_1.globalDefaults.locale = localeCode;
}
exports.locale = locale;
// Returns moment's internal locale data. If doesn't exist, returns English.
function getMomentLocaleData(localeCode) {
    return moment.localeData(localeCode) || moment.localeData('en');
}
exports.getMomentLocaleData = getMomentLocaleData;
// Initialize English by forcing computation of moment-derived options.
// Also, sets it as the default.
locale('en', options_1.englishDefaults);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
exports.globalDefaults = {
    titleRangeSeparator: ' \u2013 ',
    monthYearFormat: 'MMMM YYYY',
    defaultTimedEventDuration: '02:00:00',
    defaultAllDayEventDuration: { days: 1 },
    forceEventDuration: false,
    nextDayThreshold: '09:00:00',
    // display
    columnHeader: true,
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
    // editable: false,
    // nowIndicator: false,
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
    // allDayDefault: undefined,
    // locale
    locale: null,
    isRTL: false,
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'year',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
    },
    // buttonIcons: null,
    allDayText: 'all-day',
    // allows setting a min-height to the event segment to prevent short events overlapping each other
    agendaEventMinHeight: 0,
    // jquery-ui theming
    theme: false,
    // themeButtonIcons: null,
    // eventResizableFromStart: false,
    dragOpacity: .75,
    dragRevertDuration: 500,
    dragScroll: true,
    // selectable: false,
    unselectAuto: true,
    // selectMinDistance: 0,
    dropAccept: '*',
    eventOrder: 'title',
    // eventRenderWait: null,
    eventLimit: false,
    eventLimitText: 'more',
    eventLimitClick: 'popover',
    dayPopoverFormat: 'LL',
    handleWindowResize: true,
    windowResizeDelay: 100,
    longPressDelay: 1000
};
exports.englishDefaults = {
    dayPopoverFormat: 'dddd, MMMM D'
};
exports.rtlDefaults = {
    header: {
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
var complexOptions = [
    'header',
    'footer',
    'buttonText',
    'buttonIcons',
    'themeButtonIcons'
];
// Merges an array of option objects into a single object
function mergeOptions(optionObjs) {
    return util_1.mergeProps(optionObjs, complexOptions);
}
exports.mergeOptions = mergeOptions;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
// Class that all other classes will inherit from
var Class = /** @class */ (function () {
    function Class() {
    }
    // Called on a class to create a subclass.
    // LIMITATION: cannot provide a constructor!
    Class.extend = function (members) {
        var SubClass = /** @class */ (function (_super) {
            tslib_1.__extends(SubClass, _super);
            function SubClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SubClass;
        }(this));
        util_1.copyOwnProps(members, SubClass.prototype);
        return SubClass;
    };
    // Adds new member variables/methods to the class's prototype.
    // Can be called with another class, or a plain object hash containing new members.
    Class.mixin = function (members) {
        util_1.copyOwnProps(members, this.prototype);
    };
    return Class;
}());
exports.default = Class;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var ParsableModelMixin_1 = __webpack_require__(208);
var EventDef = /** @class */ (function () {
    function EventDef(source) {
        this.source = source;
        this.className = [];
        this.miscProps = {};
    }
    EventDef.parse = function (rawInput, source) {
        var def = new this(source);
        if (def.applyProps(rawInput)) {
            return def;
        }
        return false;
    };
    EventDef.normalizeId = function (id) {
        return String(id);
    };
    EventDef.generateId = function () {
        return '_fc' + (EventDef.uuid++);
    };
    EventDef.prototype.clone = function () {
        var copy = new this.constructor(this.source);
        copy.id = this.id;
        copy.rawId = this.rawId;
        copy.uid = this.uid; // not really unique anymore :(
        EventDef.copyVerbatimStandardProps(this, copy);
        copy.className = this.className.slice(); // copy
        copy.miscProps = $.extend({}, this.miscProps);
        return copy;
    };
    EventDef.prototype.hasInverseRendering = function () {
        return this.getRendering() === 'inverse-background';
    };
    EventDef.prototype.hasBgRendering = function () {
        var rendering = this.getRendering();
        return rendering === 'inverse-background' || rendering === 'background';
    };
    EventDef.prototype.getRendering = function () {
        if (this.rendering != null) {
            return this.rendering;
        }
        return this.source.rendering;
    };
    EventDef.prototype.getConstraint = function () {
        if (this.constraint != null) {
            return this.constraint;
        }
        if (this.source.constraint != null) {
            return this.source.constraint;
        }
        return this.source.calendar.opt('eventConstraint'); // what about View option?
    };
    EventDef.prototype.getOverlap = function () {
        if (this.overlap != null) {
            return this.overlap;
        }
        if (this.source.overlap != null) {
            return this.source.overlap;
        }
        return this.source.calendar.opt('eventOverlap'); // what about View option?
    };
    EventDef.prototype.isStartExplicitlyEditable = function () {
        if (this.startEditable != null) {
            return this.startEditable;
        }
        return this.source.startEditable;
    };
    EventDef.prototype.isDurationExplicitlyEditable = function () {
        if (this.durationEditable != null) {
            return this.durationEditable;
        }
        return this.source.durationEditable;
    };
    EventDef.prototype.isExplicitlyEditable = function () {
        if (this.editable != null) {
            return this.editable;
        }
        return this.source.editable;
    };
    EventDef.prototype.toLegacy = function () {
        var obj = $.extend({}, this.miscProps);
        obj._id = this.uid;
        obj.source = this.source;
        obj.className = this.className.slice(); // copy
        obj.allDay = this.isAllDay();
        if (this.rawId != null) {
            obj.id = this.rawId;
        }
        EventDef.copyVerbatimStandardProps(this, obj);
        return obj;
    };
    EventDef.prototype.applyManualStandardProps = function (rawProps) {
        if (rawProps.id != null) {
            this.id = EventDef.normalizeId((this.rawId = rawProps.id));
        }
        else {
            this.id = EventDef.generateId();
        }
        if (rawProps._id != null) {
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
    };
    EventDef.prototype.applyMiscProps = function (rawProps) {
        $.extend(this.miscProps, rawProps);
    };
    EventDef.uuid = 0;
    EventDef.defineStandardProps = ParsableModelMixin_1.default.defineStandardProps;
    EventDef.copyVerbatimStandardProps = ParsableModelMixin_1.default.copyVerbatimStandardProps;
    return EventDef;
}());
exports.default = EventDef;
ParsableModelMixin_1.default.mixInto(EventDef);
EventDef.defineStandardProps({
    // not automatically assigned (`false`)
    _id: false,
    id: false,
    className: false,
    source: false,
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


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventRange_1 = __webpack_require__(211);
var EventFootprint_1 = __webpack_require__(35);
var ComponentFootprint_1 = __webpack_require__(12);
function eventDefsToEventInstances(eventDefs, unzonedRange) {
    var eventInstances = [];
    var i;
    for (i = 0; i < eventDefs.length; i++) {
        eventInstances.push.apply(eventInstances, // append
        eventDefs[i].buildInstances(unzonedRange));
    }
    return eventInstances;
}
exports.eventDefsToEventInstances = eventDefsToEventInstances;
function eventInstanceToEventRange(eventInstance) {
    return new EventRange_1.default(eventInstance.dateProfile.unzonedRange, eventInstance.def, eventInstance);
}
exports.eventInstanceToEventRange = eventInstanceToEventRange;
function eventRangeToEventFootprint(eventRange) {
    return new EventFootprint_1.default(new ComponentFootprint_1.default(eventRange.unzonedRange, eventRange.eventDef.isAllDay()), eventRange.eventDef, eventRange.eventInstance // might not exist
    );
}
exports.eventRangeToEventFootprint = eventRangeToEventFootprint;
function eventInstanceToUnzonedRange(eventInstance) {
    return eventInstance.dateProfile.unzonedRange;
}
exports.eventInstanceToUnzonedRange = eventInstanceToUnzonedRange;
function eventFootprintToComponentFootprint(eventFootprint) {
    return eventFootprint.componentFootprint;
}
exports.eventFootprintToComponentFootprint = eventFootprintToComponentFootprint;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventFootprint = /** @class */ (function () {
    function EventFootprint(componentFootprint, eventDef, eventInstance) {
        this.componentFootprint = componentFootprint;
        this.eventDef = eventDef;
        if (eventInstance) {
            this.eventInstance = eventInstance;
        }
    }
    EventFootprint.prototype.getEventLegacy = function () {
        return (this.eventInstance || this.eventDef).toLegacy();
    };
    return EventFootprint;
}());
exports.default = EventFootprint;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
var EventDateProfile_1 = __webpack_require__(17);
var EventDef_1 = __webpack_require__(33);
var EventDefDateMutation_1 = __webpack_require__(50);
var SingleEventDef_1 = __webpack_require__(13);
var EventDefMutation = /** @class */ (function () {
    function EventDefMutation() {
    }
    EventDefMutation.createFromRawProps = function (eventInstance, rawProps, largeUnit) {
        var eventDef = eventInstance.def;
        var dateProps = {};
        var standardProps = {};
        var miscProps = {};
        var verbatimStandardProps = {};
        var eventDefId = null;
        var className = null;
        var propName;
        var dateProfile;
        var dateMutation;
        var defMutation;
        for (propName in rawProps) {
            if (EventDateProfile_1.default.isStandardProp(propName)) {
                dateProps[propName] = rawProps[propName];
            }
            else if (eventDef.isStandardProp(propName)) {
                standardProps[propName] = rawProps[propName];
            }
            else if (eventDef.miscProps[propName] !== rawProps[propName]) {
                miscProps[propName] = rawProps[propName];
            }
        }
        dateProfile = EventDateProfile_1.default.parse(dateProps, eventDef.source);
        if (dateProfile) {
            dateMutation = EventDefDateMutation_1.default.createFromDiff(eventInstance.dateProfile, dateProfile, largeUnit);
        }
        if (standardProps.id !== eventDef.id) {
            eventDefId = standardProps.id; // only apply if there's a change
        }
        if (!util_1.isArraysEqual(standardProps.className, eventDef.className)) {
            className = standardProps.className; // only apply if there's a change
        }
        EventDef_1.default.copyVerbatimStandardProps(standardProps, // src
        verbatimStandardProps // dest
        );
        defMutation = new EventDefMutation();
        defMutation.eventDefId = eventDefId;
        defMutation.className = className;
        defMutation.verbatimStandardProps = verbatimStandardProps;
        defMutation.miscProps = miscProps;
        if (dateMutation) {
            defMutation.dateMutation = dateMutation;
        }
        return defMutation;
    };
    /*
    eventDef assumed to be a SingleEventDef.
    returns an undo function.
    */
    EventDefMutation.prototype.mutateSingle = function (eventDef) {
        var origDateProfile;
        if (this.dateMutation) {
            origDateProfile = eventDef.dateProfile;
            eventDef.dateProfile = this.dateMutation.buildNewDateProfile(origDateProfile, eventDef.source.calendar);
        }
        // can't undo
        // TODO: more DRY with EventDef::applyManualStandardProps
        if (this.eventDefId != null) {
            eventDef.id = EventDef_1.default.normalizeId((eventDef.rawId = this.eventDefId));
        }
        // can't undo
        // TODO: more DRY with EventDef::applyManualStandardProps
        if (this.className) {
            eventDef.className = this.className;
        }
        // can't undo
        if (this.verbatimStandardProps) {
            SingleEventDef_1.default.copyVerbatimStandardProps(this.verbatimStandardProps, // src
            eventDef // dest
            );
        }
        // can't undo
        if (this.miscProps) {
            eventDef.applyMiscProps(this.miscProps);
        }
        if (origDateProfile) {
            return function () {
                eventDef.dateProfile = origDateProfile;
            };
        }
        else {
            return function () { };
        }
    };
    EventDefMutation.prototype.setDateMutation = function (dateMutation) {
        if (dateMutation && !dateMutation.isEmpty()) {
            this.dateMutation = dateMutation;
        }
        else {
            this.dateMutation = null;
        }
    };
    EventDefMutation.prototype.isEmpty = function () {
        return !this.dateMutation;
    };
    return EventDefMutation;
}());
exports.default = EventDefMutation;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sourceClasses: [],
    registerClass: function (EventSourceClass) {
        this.sourceClasses.unshift(EventSourceClass); // give highest priority
    },
    parse: function (rawInput, calendar) {
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


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var Theme = /** @class */ (function () {
    function Theme(optionsManager) {
        this.optionsManager = optionsManager;
        this.processIconOverride();
    }
    Theme.prototype.processIconOverride = function () {
        if (this.iconOverrideOption) {
            this.setIconOverride(this.optionsManager.get(this.iconOverrideOption));
        }
    };
    Theme.prototype.setIconOverride = function (iconOverrideHash) {
        var iconClassesCopy;
        var buttonName;
        if ($.isPlainObject(iconOverrideHash)) {
            iconClassesCopy = $.extend({}, this.iconClasses);
            for (buttonName in iconOverrideHash) {
                iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName]);
            }
            this.iconClasses = iconClassesCopy;
        }
        else if (iconOverrideHash === false) {
            this.iconClasses = {};
        }
    };
    Theme.prototype.applyIconOverridePrefix = function (className) {
        var prefix = this.iconOverridePrefix;
        if (prefix && className.indexOf(prefix) !== 0) {
            className = prefix + className;
        }
        return className;
    };
    Theme.prototype.getClass = function (key) {
        return this.classes[key] || '';
    };
    Theme.prototype.getIconClass = function (buttonName) {
        var className = this.iconClasses[buttonName];
        if (className) {
            return this.baseIconClass + ' ' + className;
        }
        return '';
    };
    Theme.prototype.getCustomButtonIconClass = function (customButtonProps) {
        var className;
        if (this.iconOverrideCustomButtonOption) {
            className = customButtonProps[this.iconOverrideCustomButtonOption];
            if (className) {
                return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
            }
        }
        return '';
    };
    return Theme;
}());
exports.default = Theme;
Theme.prototype.classes = {};
Theme.prototype.iconClasses = {};
Theme.prototype.baseIconClass = '';
Theme.prototype.iconOverridePrefix = '';


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Class_1 = __webpack_require__(32);
/*
Embodies a div that has potential scrollbars
*/
var Scroller = /** @class */ (function (_super) {
    tslib_1.__extends(Scroller, _super);
    function Scroller(options) {
        var _this = _super.call(this) || this;
        options = options || {};
        _this.overflowX = options.overflowX || options.overflow || 'auto';
        _this.overflowY = options.overflowY || options.overflow || 'auto';
        return _this;
    }
    Scroller.prototype.render = function () {
        this.el = this.renderEl();
        this.applyOverflow();
    };
    Scroller.prototype.renderEl = function () {
        return (this.scrollEl = $('<div class="fc-scroller"></div>'));
    };
    // sets to natural height, unlocks overflow
    Scroller.prototype.clear = function () {
        this.setHeight('auto');
        this.applyOverflow();
    };
    Scroller.prototype.destroy = function () {
        this.el.remove();
    };
    // Overflow
    // -----------------------------------------------------------------------------------------------------------------
    Scroller.prototype.applyOverflow = function () {
        this.scrollEl.css({
            'overflow-x': this.overflowX,
            'overflow-y': this.overflowY
        });
    };
    // Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
    // Useful for preserving scrollbar widths regardless of future resizes.
    // Can pass in scrollbarWidths for optimization.
    Scroller.prototype.lockOverflow = function (scrollbarWidths) {
        var overflowX = this.overflowX;
        var overflowY = this.overflowY;
        scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();
        if (overflowX === 'auto') {
            overflowX = (scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
                // OR scrolling pane with massless scrollbars?
                this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth) ? 'scroll' : 'hidden';
        }
        if (overflowY === 'auto') {
            overflowY = (scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
                // OR scrolling pane with massless scrollbars?
                this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight) ? 'scroll' : 'hidden';
        }
        this.scrollEl.css({ 'overflow-x': overflowX, 'overflow-y': overflowY });
    };
    // Getters / Setters
    // -----------------------------------------------------------------------------------------------------------------
    Scroller.prototype.setHeight = function (height) {
        this.scrollEl.height(height);
    };
    Scroller.prototype.getScrollTop = function () {
        return this.scrollEl.scrollTop();
    };
    Scroller.prototype.setScrollTop = function (top) {
        this.scrollEl.scrollTop(top);
    };
    Scroller.prototype.getClientWidth = function () {
        return this.scrollEl[0].clientWidth;
    };
    Scroller.prototype.getClientHeight = function () {
        return this.scrollEl[0].clientHeight;
    };
    Scroller.prototype.getScrollbarWidths = function () {
        return util_1.getScrollbarWidths(this.scrollEl);
    };
    return Scroller;
}(Class_1.default));
exports.default = Scroller;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var DateComponent_1 = __webpack_require__(219);
var GlobalEmitter_1 = __webpack_require__(20);
var InteractiveDateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InteractiveDateComponent, _super);
    function InteractiveDateComponent(_view, _options) {
        var _this = _super.call(this, _view, _options) || this;
        // self-config, overridable by subclasses
        _this.segSelector = '.fc-event-container > *'; // what constitutes an event element?
        if (_this.dateSelectingClass) {
            _this.dateClicking = new _this.dateClickingClass(_this);
        }
        if (_this.dateSelectingClass) {
            _this.dateSelecting = new _this.dateSelectingClass(_this);
        }
        if (_this.eventPointingClass) {
            _this.eventPointing = new _this.eventPointingClass(_this);
        }
        if (_this.eventDraggingClass && _this.eventPointing) {
            _this.eventDragging = new _this.eventDraggingClass(_this, _this.eventPointing);
        }
        if (_this.eventResizingClass && _this.eventPointing) {
            _this.eventResizing = new _this.eventResizingClass(_this, _this.eventPointing);
        }
        if (_this.externalDroppingClass) {
            _this.externalDropping = new _this.externalDroppingClass(_this);
        }
        return _this;
    }
    // Sets the container element that the view should render inside of, does global DOM-related initializations,
    // and renders all the non-date-related content inside.
    InteractiveDateComponent.prototype.setElement = function (el) {
        _super.prototype.setElement.call(this, el);
        if (this.dateClicking) {
            this.dateClicking.bindToEl(el);
        }
        if (this.dateSelecting) {
            this.dateSelecting.bindToEl(el);
        }
        this.bindAllSegHandlersToEl(el);
    };
    InteractiveDateComponent.prototype.removeElement = function () {
        this.endInteractions();
        _super.prototype.removeElement.call(this);
    };
    InteractiveDateComponent.prototype.executeEventUnrender = function () {
        this.endInteractions();
        _super.prototype.executeEventUnrender.call(this);
    };
    InteractiveDateComponent.prototype.bindGlobalHandlers = function () {
        _super.prototype.bindGlobalHandlers.call(this);
        if (this.externalDropping) {
            this.externalDropping.bindToDocument();
        }
    };
    InteractiveDateComponent.prototype.unbindGlobalHandlers = function () {
        _super.prototype.unbindGlobalHandlers.call(this);
        if (this.externalDropping) {
            this.externalDropping.unbindFromDocument();
        }
    };
    InteractiveDateComponent.prototype.bindDateHandlerToEl = function (el, name, handler) {
        var _this = this;
        // attach a handler to the grid's root element.
        // jQuery will take care of unregistering them when removeElement gets called.
        this.el.on(name, function (ev) {
            if (!$(ev.target).is(_this.segSelector + ':not(.fc-helper),' + // directly on an event element
                _this.segSelector + ':not(.fc-helper) *,' + // within an event element
                '.fc-more,' + // a "more.." link
                'a[data-goto]' // a clickable nav link
            )) {
                return handler.call(_this, ev);
            }
        });
    };
    InteractiveDateComponent.prototype.bindAllSegHandlersToEl = function (el) {
        [
            this.eventPointing,
            this.eventDragging,
            this.eventResizing
        ].forEach(function (eventInteraction) {
            if (eventInteraction) {
                eventInteraction.bindToEl(el);
            }
        });
    };
    InteractiveDateComponent.prototype.bindSegHandlerToEl = function (el, name, handler) {
        var _this = this;
        el.on(name, this.segSelector, function (ev) {
            var segEl = $(ev.currentTarget);
            if (!segEl.is('.fc-helper')) {
                var seg = segEl.data('fc-seg'); // grab segment data. put there by View::renderEventsPayload
                if (seg && !_this.shouldIgnoreEventPointing()) {
                    return handler.call(_this, seg, ev); // context will be the Grid
                }
            }
        });
    };
    InteractiveDateComponent.prototype.shouldIgnoreMouse = function () {
        // HACK
        // This will still work even though bindDateHandlerToEl doesn't use GlobalEmitter.
        return GlobalEmitter_1.default.get().shouldIgnoreMouse();
    };
    InteractiveDateComponent.prototype.shouldIgnoreTouch = function () {
        var view = this._getView();
        // On iOS (and Android?) when a new selection is initiated overtop another selection,
        // the touchend never fires because the elements gets removed mid-touch-interaction (my theory).
        // HACK: simply don't allow this to happen.
        // ALSO: prevent selection when an *event* is already raised.
        return view.isSelected || view.selectedEvent;
    };
    InteractiveDateComponent.prototype.shouldIgnoreEventPointing = function () {
        // only call the handlers if there is not a drag/resize in progress
        return (this.eventDragging && this.eventDragging.isDragging) ||
            (this.eventResizing && this.eventResizing.isResizing);
    };
    InteractiveDateComponent.prototype.canStartSelection = function (seg, ev) {
        return util_1.getEvIsTouch(ev) &&
            !this.canStartResize(seg, ev) &&
            (this.isEventDefDraggable(seg.footprint.eventDef) ||
                this.isEventDefResizable(seg.footprint.eventDef));
    };
    InteractiveDateComponent.prototype.canStartDrag = function (seg, ev) {
        return !this.canStartResize(seg, ev) &&
            this.isEventDefDraggable(seg.footprint.eventDef);
    };
    InteractiveDateComponent.prototype.canStartResize = function (seg, ev) {
        var view = this._getView();
        var eventDef = seg.footprint.eventDef;
        return (!util_1.getEvIsTouch(ev) || view.isEventDefSelected(eventDef)) &&
            this.isEventDefResizable(eventDef) &&
            $(ev.target).is('.fc-resizer');
    };
    // Kills all in-progress dragging.
    // Useful for when public API methods that result in re-rendering are invoked during a drag.
    // Also useful for when touch devices misbehave and don't fire their touchend.
    InteractiveDateComponent.prototype.endInteractions = function () {
        [
            this.dateClicking,
            this.dateSelecting,
            this.eventPointing,
            this.eventDragging,
            this.eventResizing
        ].forEach(function (interaction) {
            if (interaction) {
                interaction.end();
            }
        });
    };
    // Event Drag-n-Drop
    // ---------------------------------------------------------------------------------------------------------------
    // Computes if the given event is allowed to be dragged by the user
    InteractiveDateComponent.prototype.isEventDefDraggable = function (eventDef) {
        return this.isEventDefStartEditable(eventDef);
    };
    InteractiveDateComponent.prototype.isEventDefStartEditable = function (eventDef) {
        var isEditable = eventDef.isStartExplicitlyEditable();
        if (isEditable == null) {
            isEditable = this.opt('eventStartEditable');
            if (isEditable == null) {
                isEditable = this.isEventDefGenerallyEditable(eventDef);
            }
        }
        return isEditable;
    };
    InteractiveDateComponent.prototype.isEventDefGenerallyEditable = function (eventDef) {
        var isEditable = eventDef.isExplicitlyEditable();
        if (isEditable == null) {
            isEditable = this.opt('editable');
        }
        return isEditable;
    };
    // Event Resizing
    // ---------------------------------------------------------------------------------------------------------------
    // Computes if the given event is allowed to be resized from its starting edge
    InteractiveDateComponent.prototype.isEventDefResizableFromStart = function (eventDef) {
        return this.opt('eventResizableFromStart') && this.isEventDefResizable(eventDef);
    };
    // Computes if the given event is allowed to be resized from its ending edge
    InteractiveDateComponent.prototype.isEventDefResizableFromEnd = function (eventDef) {
        return this.isEventDefResizable(eventDef);
    };
    // Computes if the given event is allowed to be resized by the user at all
    InteractiveDateComponent.prototype.isEventDefResizable = function (eventDef) {
        var isResizable = eventDef.isDurationExplicitlyEditable();
        if (isResizable == null) {
            isResizable = this.opt('eventDurationEditable');
            if (isResizable == null) {
                isResizable = this.isEventDefGenerallyEditable(eventDef);
            }
        }
        return isResizable;
    };
    // Event Mutation / Constraints
    // ---------------------------------------------------------------------------------------------------------------
    // Diffs the two dates, returning a duration, based on granularity of the grid
    // TODO: port isTimeScale into this system?
    InteractiveDateComponent.prototype.diffDates = function (a, b) {
        if (this.largeUnit) {
            return util_1.diffByUnit(a, b, this.largeUnit);
        }
        else {
            return util_1.diffDayTime(a, b);
        }
    };
    // is it allowed, in relation to the view's validRange?
    // NOTE: very similar to isExternalInstanceGroupAllowed
    InteractiveDateComponent.prototype.isEventInstanceGroupAllowed = function (eventInstanceGroup) {
        var view = this._getView();
        var dateProfile = this.dateProfile;
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            // TODO: just use getAllEventRanges directly
            if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
                return false;
            }
        }
        return view.calendar.constraints.isEventInstanceGroupAllowed(eventInstanceGroup);
    };
    // NOTE: very similar to isEventInstanceGroupAllowed
    // when it's a completely anonymous external drag, no event.
    InteractiveDateComponent.prototype.isExternalInstanceGroupAllowed = function (eventInstanceGroup) {
        var view = this._getView();
        var dateProfile = this.dateProfile;
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
                return false;
            }
        }
        for (i = 0; i < eventFootprints.length; i++) {
            // treat it as a selection
            // TODO: pass in eventInstanceGroup instead
            //  because we don't want calendar's constraint system to depend on a component's
            //  determination of footprints.
            if (!view.calendar.constraints.isSelectionFootprintAllowed(eventFootprints[i].componentFootprint)) {
                return false;
            }
        }
        return true;
    };
    return InteractiveDateComponent;
}(DateComponent_1.default));
exports.default = InteractiveDateComponent;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var RenderQueue_1 = __webpack_require__(218);
var DateProfileGenerator_1 = __webpack_require__(221);
var InteractiveDateComponent_1 = __webpack_require__(40);
var GlobalEmitter_1 = __webpack_require__(20);
var UnzonedRange_1 = __webpack_require__(5);
/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View(calendar, viewSpec) {
        var _this = _super.call(this, null, viewSpec.options) || this;
        _this.batchRenderDepth = 0;
        _this.isSelected = false; // boolean whether a range of time is user-selected or not
        _this.calendar = calendar;
        _this.viewSpec = viewSpec;
        // shortcuts
        _this.type = viewSpec.type;
        // .name is deprecated
        _this.name = _this.type;
        _this.initRenderQueue();
        _this.initHiddenDays();
        _this.dateProfileGenerator = new _this.dateProfileGeneratorClass(_this);
        _this.bindBaseRenderHandlers();
        _this.eventOrderSpecs = util_1.parseFieldSpecs(_this.opt('eventOrder'));
        // legacy
        if (_this['initialize']) {
            _this['initialize']();
        }
        return _this;
    }
    View.prototype._getView = function () {
        return this;
    };
    // Retrieves an option with the given name
    View.prototype.opt = function (name) {
        return this.options[name];
    };
    /* Render Queue
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.initRenderQueue = function () {
        this.renderQueue = new RenderQueue_1.default({
            event: this.opt('eventRenderWait')
        });
        this.renderQueue.on('start', this.onRenderQueueStart.bind(this));
        this.renderQueue.on('stop', this.onRenderQueueStop.bind(this));
        this.on('before:change', this.startBatchRender);
        this.on('change', this.stopBatchRender);
    };
    View.prototype.onRenderQueueStart = function () {
        this.calendar.freezeContentHeight();
        this.addScroll(this.queryScroll());
    };
    View.prototype.onRenderQueueStop = function () {
        if (this.calendar.updateViewSize()) {
            this.popScroll();
        }
        this.calendar.thawContentHeight();
    };
    View.prototype.startBatchRender = function () {
        if (!(this.batchRenderDepth++)) {
            this.renderQueue.pause();
        }
    };
    View.prototype.stopBatchRender = function () {
        if (!(--this.batchRenderDepth)) {
            this.renderQueue.resume();
        }
    };
    View.prototype.requestRender = function (func, namespace, actionType) {
        this.renderQueue.queue(func, namespace, actionType);
    };
    // given func will auto-bind to `this`
    View.prototype.whenSizeUpdated = function (func) {
        if (this.renderQueue.isRunning) {
            this.renderQueue.one('stop', func.bind(this));
        }
        else {
            func.call(this);
        }
    };
    /* Title and Date Formatting
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes what the title at the top of the calendar should be for this view
    View.prototype.computeTitle = function (dateProfile) {
        var unzonedRange;
        // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
        if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
            unzonedRange = dateProfile.currentUnzonedRange;
        }
        else {
            unzonedRange = dateProfile.activeUnzonedRange;
        }
        return this.formatRange({
            start: this.calendar.msToMoment(unzonedRange.startMs, dateProfile.isRangeAllDay),
            end: this.calendar.msToMoment(unzonedRange.endMs, dateProfile.isRangeAllDay)
        }, dateProfile.isRangeAllDay, this.opt('titleFormat') || this.computeTitleFormat(dateProfile), this.opt('titleRangeSeparator'));
    };
    // Generates the format string that should be used to generate the title for the current date range.
    // Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
    View.prototype.computeTitleFormat = function (dateProfile) {
        var currentRangeUnit = dateProfile.currentRangeUnit;
        if (currentRangeUnit === 'year') {
            return 'YYYY';
        }
        else if (currentRangeUnit === 'month') {
            return this.opt('monthYearFormat'); // like "September 2014"
        }
        else if (dateProfile.currentUnzonedRange.as('days') > 1) {
            return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
        }
        else {
            return 'LL'; // one day. longer, like "September 9 2014"
        }
    };
    // Date Setting/Unsetting
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.setDate = function (date) {
        var currentDateProfile = this.get('dateProfile');
        var newDateProfile = this.dateProfileGenerator.build(date, undefined, true); // forceToValid=true
        if (!currentDateProfile ||
            !currentDateProfile.activeUnzonedRange.equals(newDateProfile.activeUnzonedRange)) {
            this.set('dateProfile', newDateProfile);
        }
    };
    View.prototype.unsetDate = function () {
        this.unset('dateProfile');
    };
    // Event Data
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.fetchInitialEvents = function (dateProfile) {
        var calendar = this.calendar;
        var forceAllDay = dateProfile.isRangeAllDay && !this.usesMinMaxTime;
        return calendar.requestEvents(calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, forceAllDay), calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, forceAllDay));
    };
    View.prototype.bindEventChanges = function () {
        this.listenTo(this.calendar, 'eventsReset', this.resetEvents); // TODO: make this a real event
    };
    View.prototype.unbindEventChanges = function () {
        this.stopListeningTo(this.calendar, 'eventsReset');
    };
    View.prototype.setEvents = function (eventsPayload) {
        this.set('currentEvents', eventsPayload);
        this.set('hasEvents', true);
    };
    View.prototype.unsetEvents = function () {
        this.unset('currentEvents');
        this.unset('hasEvents');
    };
    View.prototype.resetEvents = function (eventsPayload) {
        this.startBatchRender();
        this.unsetEvents();
        this.setEvents(eventsPayload);
        this.stopBatchRender();
    };
    // Date High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestDateRender = function (dateProfile) {
        var _this = this;
        this.requestRender(function () {
            _this.executeDateRender(dateProfile);
        }, 'date', 'init');
    };
    View.prototype.requestDateUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.executeDateUnrender();
        }, 'date', 'destroy');
    };
    // if dateProfile not specified, uses current
    View.prototype.executeDateRender = function (dateProfile) {
        _super.prototype.executeDateRender.call(this, dateProfile);
        if (this['render']) {
            this['render'](); // TODO: deprecate
        }
        this.trigger('datesRendered');
        this.addScroll({ isDateInit: true });
        this.startNowIndicator(); // shouldn't render yet because updateSize will be called soon
    };
    View.prototype.executeDateUnrender = function () {
        this.unselect();
        this.stopNowIndicator();
        this.trigger('before:datesUnrendered');
        if (this['destroy']) {
            this['destroy'](); // TODO: deprecate
        }
        _super.prototype.executeDateUnrender.call(this);
    };
    // "Base" rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.bindBaseRenderHandlers = function () {
        var _this = this;
        this.on('datesRendered', function () {
            _this.whenSizeUpdated(_this.triggerViewRender);
        });
        this.on('before:datesUnrendered', function () {
            _this.triggerViewDestroy();
        });
    };
    View.prototype.triggerViewRender = function () {
        this.publiclyTrigger('viewRender', {
            context: this,
            args: [this, this.el]
        });
    };
    View.prototype.triggerViewDestroy = function () {
        this.publiclyTrigger('viewDestroy', {
            context: this,
            args: [this, this.el]
        });
    };
    // Event High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestEventsRender = function (eventsPayload) {
        var _this = this;
        this.requestRender(function () {
            _this.executeEventRender(eventsPayload);
            _this.whenSizeUpdated(_this.triggerAfterEventsRendered);
        }, 'event', 'init');
    };
    View.prototype.requestEventsUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.triggerBeforeEventsDestroyed();
            _this.executeEventUnrender();
        }, 'event', 'destroy');
    };
    // Business Hour High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestBusinessHoursRender = function (businessHourGenerator) {
        var _this = this;
        this.requestRender(function () {
            _this.renderBusinessHours(businessHourGenerator);
        }, 'businessHours', 'init');
    };
    View.prototype.requestBusinessHoursUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.unrenderBusinessHours();
        }, 'businessHours', 'destroy');
    };
    // Misc view rendering utils
    // -----------------------------------------------------------------------------------------------------------------
    // Binds DOM handlers to elements that reside outside the view container, such as the document
    View.prototype.bindGlobalHandlers = function () {
        _super.prototype.bindGlobalHandlers.call(this);
        this.listenTo(GlobalEmitter_1.default.get(), {
            touchstart: this.processUnselect,
            mousedown: this.handleDocumentMousedown
        });
    };
    // Unbinds DOM handlers from elements that reside outside the view container
    View.prototype.unbindGlobalHandlers = function () {
        _super.prototype.unbindGlobalHandlers.call(this);
        this.stopListeningTo(GlobalEmitter_1.default.get());
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    // Immediately render the current time indicator and begins re-rendering it at an interval,
    // which is defined by this.getNowIndicatorUnit().
    // TODO: somehow do this for the current whole day's background too
    View.prototype.startNowIndicator = function () {
        var _this = this;
        var unit;
        var update;
        var delay; // ms wait value
        if (this.opt('nowIndicator')) {
            unit = this.getNowIndicatorUnit();
            if (unit) {
                update = util_1.proxy(this, 'updateNowIndicator'); // bind to `this`
                this.initialNowDate = this.calendar.getNow();
                this.initialNowQueriedMs = new Date().valueOf();
                // wait until the beginning of the next interval
                delay = this.initialNowDate.clone().startOf(unit).add(1, unit).valueOf() - this.initialNowDate.valueOf();
                this.nowIndicatorTimeoutID = setTimeout(function () {
                    _this.nowIndicatorTimeoutID = null;
                    update();
                    delay = +moment.duration(1, unit);
                    delay = Math.max(100, delay); // prevent too frequent
                    _this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
                }, delay);
            }
            // rendering will be initiated in updateSize
        }
    };
    // rerenders the now indicator, computing the new current time from the amount of time that has passed
    // since the initial getNow call.
    View.prototype.updateNowIndicator = function () {
        if (this.isDatesRendered &&
            this.initialNowDate // activated before?
        ) {
            this.unrenderNowIndicator(); // won't unrender if unnecessary
            this.renderNowIndicator(this.initialNowDate.clone().add(new Date().valueOf() - this.initialNowQueriedMs) // add ms
            );
            this.isNowIndicatorRendered = true;
        }
    };
    // Immediately unrenders the view's current time indicator and stops any re-rendering timers.
    // Won't cause side effects if indicator isn't rendered.
    View.prototype.stopNowIndicator = function () {
        if (this.isNowIndicatorRendered) {
            if (this.nowIndicatorTimeoutID) {
                clearTimeout(this.nowIndicatorTimeoutID);
                this.nowIndicatorTimeoutID = null;
            }
            if (this.nowIndicatorIntervalID) {
                clearInterval(this.nowIndicatorIntervalID);
                this.nowIndicatorIntervalID = null;
            }
            this.unrenderNowIndicator();
            this.isNowIndicatorRendered = false;
        }
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        if (this['setHeight']) {
            this['setHeight'](totalHeight, isAuto);
        }
        else {
            _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        }
        this.updateNowIndicator();
    };
    /* Scroller
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.addScroll = function (scroll) {
        var queuedScroll = this.queuedScroll || (this.queuedScroll = {});
        $.extend(queuedScroll, scroll);
    };
    View.prototype.popScroll = function () {
        this.applyQueuedScroll();
        this.queuedScroll = null;
    };
    View.prototype.applyQueuedScroll = function () {
        if (this.queuedScroll) {
            this.applyScroll(this.queuedScroll);
        }
    };
    View.prototype.queryScroll = function () {
        var scroll = {};
        if (this.isDatesRendered) {
            $.extend(scroll, this.queryDateScroll());
        }
        return scroll;
    };
    View.prototype.applyScroll = function (scroll) {
        if (scroll.isDateInit && this.isDatesRendered) {
            $.extend(scroll, this.computeInitialDateScroll());
        }
        if (this.isDatesRendered) {
            this.applyDateScroll(scroll);
        }
    };
    View.prototype.computeInitialDateScroll = function () {
        return {}; // subclasses must implement
    };
    View.prototype.queryDateScroll = function () {
        return {}; // subclasses must implement
    };
    View.prototype.applyDateScroll = function (scroll) {
        // subclasses must implement
    };
    /* Event Drag-n-Drop
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.reportEventDrop = function (eventInstance, eventMutation, el, ev) {
        var eventManager = this.calendar.eventManager;
        var undoFunc = eventManager.mutateEventsWithId(eventInstance.def.id, eventMutation);
        var dateMutation = eventMutation.dateMutation;
        // update the EventInstance, for handlers
        if (dateMutation) {
            eventInstance.dateProfile = dateMutation.buildNewDateProfile(eventInstance.dateProfile, this.calendar);
        }
        this.triggerEventDrop(eventInstance, 
        // a drop doesn't necessarily mean a date mutation (ex: resource change)
        (dateMutation && dateMutation.dateDelta) || moment.duration(), undoFunc, el, ev);
    };
    // Triggers event-drop handlers that have subscribed via the API
    View.prototype.triggerEventDrop = function (eventInstance, dateDelta, undoFunc, el, ev) {
        this.publiclyTrigger('eventDrop', {
            context: el[0],
            args: [
                eventInstance.toLegacy(),
                dateDelta,
                undoFunc,
                ev,
                {},
                this
            ]
        });
    };
    /* External Element Drag-n-Drop
    ------------------------------------------------------------------------------------------------------------------*/
    // Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
    // `meta` is the parsed data that has been embedded into the dragging event.
    // `dropLocation` is an object that contains the new zoned start/end/allDay values for the event.
    View.prototype.reportExternalDrop = function (singleEventDef, isEvent, isSticky, el, ev, ui) {
        if (isEvent) {
            this.calendar.eventManager.addEventDef(singleEventDef, isSticky);
        }
        this.triggerExternalDrop(singleEventDef, isEvent, el, ev, ui);
    };
    // Triggers external-drop handlers that have subscribed via the API
    View.prototype.triggerExternalDrop = function (singleEventDef, isEvent, el, ev, ui) {
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
    };
    /* Event Resizing
    ------------------------------------------------------------------------------------------------------------------*/
    // Must be called when an event in the view has been resized to a new length
    View.prototype.reportEventResize = function (eventInstance, eventMutation, el, ev) {
        var eventManager = this.calendar.eventManager;
        var undoFunc = eventManager.mutateEventsWithId(eventInstance.def.id, eventMutation);
        // update the EventInstance, for handlers
        eventInstance.dateProfile = eventMutation.dateMutation.buildNewDateProfile(eventInstance.dateProfile, this.calendar);
        this.triggerEventResize(eventInstance, eventMutation.dateMutation.endDelta, undoFunc, el, ev);
    };
    // Triggers event-resize handlers that have subscribed via the API
    View.prototype.triggerEventResize = function (eventInstance, durationDelta, undoFunc, el, ev) {
        this.publiclyTrigger('eventResize', {
            context: el[0],
            args: [
                eventInstance.toLegacy(),
                durationDelta,
                undoFunc,
                ev,
                {},
                this
            ]
        });
    };
    /* Selection (time range)
    ------------------------------------------------------------------------------------------------------------------*/
    // Selects a date span on the view. `start` and `end` are both Moments.
    // `ev` is the native mouse event that begin the interaction.
    View.prototype.select = function (footprint, ev) {
        this.unselect(ev);
        this.renderSelectionFootprint(footprint);
        this.reportSelection(footprint, ev);
    };
    View.prototype.renderSelectionFootprint = function (footprint) {
        if (this['renderSelection']) {
            this['renderSelection'](footprint.toLegacy(this.calendar));
        }
        else {
            _super.prototype.renderSelectionFootprint.call(this, footprint);
        }
    };
    // Called when a new selection is made. Updates internal state and triggers handlers.
    View.prototype.reportSelection = function (footprint, ev) {
        this.isSelected = true;
        this.triggerSelect(footprint, ev);
    };
    // Triggers handlers to 'select'
    View.prototype.triggerSelect = function (footprint, ev) {
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
    };
    // Undoes a selection. updates in the internal state and triggers handlers.
    // `ev` is the native mouse event that began the interaction.
    View.prototype.unselect = function (ev) {
        if (this.isSelected) {
            this.isSelected = false;
            if (this['destroySelection']) {
                this['destroySelection'](); // TODO: deprecate
            }
            this.unrenderSelection();
            this.publiclyTrigger('unselect', {
                context: this,
                args: [ev, this]
            });
        }
    };
    /* Event Selection
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.selectEventInstance = function (eventInstance) {
        if (!this.selectedEventInstance ||
            this.selectedEventInstance !== eventInstance) {
            this.unselectEventInstance();
            this.getEventSegs().forEach(function (seg) {
                if (seg.footprint.eventInstance === eventInstance &&
                    seg.el // necessary?
                ) {
                    seg.el.addClass('fc-selected');
                }
            });
            this.selectedEventInstance = eventInstance;
        }
    };
    View.prototype.unselectEventInstance = function () {
        if (this.selectedEventInstance) {
            this.getEventSegs().forEach(function (seg) {
                if (seg.el) {
                    seg.el.removeClass('fc-selected');
                }
            });
            this.selectedEventInstance = null;
        }
    };
    View.prototype.isEventDefSelected = function (eventDef) {
        // event references might change on refetchEvents(), while selectedEventInstance doesn't,
        // so compare IDs
        return this.selectedEventInstance && this.selectedEventInstance.def.id === eventDef.id;
    };
    /* Mouse / Touch Unselecting (time range & event unselection)
    ------------------------------------------------------------------------------------------------------------------*/
    // TODO: move consistently to down/start or up/end?
    // TODO: don't kill previous selection if touch scrolling
    View.prototype.handleDocumentMousedown = function (ev) {
        if (util_1.isPrimaryMouseButton(ev)) {
            this.processUnselect(ev);
        }
    };
    View.prototype.processUnselect = function (ev) {
        this.processRangeUnselect(ev);
        this.processEventUnselect(ev);
    };
    View.prototype.processRangeUnselect = function (ev) {
        var ignore;
        // is there a time-range selection?
        if (this.isSelected && this.opt('unselectAuto')) {
            // only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
            ignore = this.opt('unselectCancel');
            if (!ignore || !$(ev.target).closest(ignore).length) {
                this.unselect(ev);
            }
        }
    };
    View.prototype.processEventUnselect = function (ev) {
        if (this.selectedEventInstance) {
            if (!$(ev.target).closest('.fc-selected').length) {
                this.unselectEventInstance();
            }
        }
    };
    /* Triggers
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.triggerBaseRendered = function () {
        this.publiclyTrigger('viewRender', {
            context: this,
            args: [this, this.el]
        });
    };
    View.prototype.triggerBaseUnrendered = function () {
        this.publiclyTrigger('viewDestroy', {
            context: this,
            args: [this, this.el]
        });
    };
    // Triggers handlers to 'dayClick'
    // Span has start/end of the clicked area. Only the start is useful.
    View.prototype.triggerDayClick = function (footprint, dayEl, ev) {
        var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?
        this.publiclyTrigger('dayClick', {
            context: dayEl,
            args: [dateProfile.start, ev, this]
        });
    };
    /* Date Utils
    ------------------------------------------------------------------------------------------------------------------*/
    // For DateComponent::getDayClasses
    View.prototype.isDateInOtherMonth = function (date, dateProfile) {
        return false;
    };
    // Arguments after name will be forwarded to a hypothetical function value
    // WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
    // Always clone your objects if you fear mutation.
    View.prototype.getUnzonedRangeOption = function (name) {
        var val = this.opt(name);
        if (typeof val === 'function') {
            val = val.apply(null, Array.prototype.slice.call(arguments, 1));
        }
        if (val) {
            return this.calendar.parseUnzonedRange(val);
        }
    };
    /* Hidden Days
    ------------------------------------------------------------------------------------------------------------------*/
    // Initializes internal variables related to calculating hidden days-of-week
    View.prototype.initHiddenDays = function () {
        var hiddenDays = this.opt('hiddenDays') || []; // array of day-of-week indices that are hidden
        var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
        var dayCnt = 0;
        var i;
        if (this.opt('weekends') === false) {
            hiddenDays.push(0, 6); // 0=sunday, 6=saturday
        }
        for (i = 0; i < 7; i++) {
            if (!(isHiddenDayHash[i] = $.inArray(i, hiddenDays) !== -1)) {
                dayCnt++;
            }
        }
        if (!dayCnt) {
            throw new Error('invalid hiddenDays'); // all days were hidden? bad.
        }
        this.isHiddenDayHash = isHiddenDayHash;
    };
    // Remove days from the beginning and end of the range that are computed as hidden.
    // If the whole range is trimmed off, returns null
    View.prototype.trimHiddenDays = function (inputUnzonedRange) {
        var start = inputUnzonedRange.getStart();
        var end = inputUnzonedRange.getEnd();
        if (start) {
            start = this.skipHiddenDays(start);
        }
        if (end) {
            end = this.skipHiddenDays(end, -1, true);
        }
        if (start === null || end === null || start < end) {
            return new UnzonedRange_1.default(start, end);
        }
        return null;
    };
    // Is the current day hidden?
    // `day` is a day-of-week index (0-6), or a Moment
    View.prototype.isHiddenDay = function (day) {
        if (moment.isMoment(day)) {
            day = day.day();
        }
        return this.isHiddenDayHash[day];
    };
    // Incrementing the current day until it is no longer a hidden day, returning a copy.
    // DOES NOT CONSIDER validUnzonedRange!
    // If the initial value of `date` is not a hidden day, don't do anything.
    // Pass `isExclusive` as `true` if you are dealing with an end date.
    // `inc` defaults to `1` (increment one day forward each time)
    View.prototype.skipHiddenDays = function (date, inc, isExclusive) {
        if (inc === void 0) { inc = 1; }
        if (isExclusive === void 0) { isExclusive = false; }
        var out = date.clone();
        while (this.isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]) {
            out.add(inc, 'days');
        }
        return out;
    };
    return View;
}(InteractiveDateComponent_1.default));
exports.default = View;
View.prototype.usesMinMaxTime = false;
View.prototype.dateProfileGeneratorClass = DateProfileGenerator_1.default;
View.watch('displayingDates', ['isInDom', 'dateProfile'], function (deps) {
    this.requestDateRender(deps.dateProfile);
}, function () {
    this.requestDateUnrender();
});
View.watch('displayingBusinessHours', ['displayingDates', 'businessHourGenerator'], function (deps) {
    this.requestBusinessHoursRender(deps.businessHourGenerator);
}, function () {
    this.requestBusinessHoursUnrender();
});
View.watch('initialEvents', ['dateProfile'], function (deps) {
    return this.fetchInitialEvents(deps.dateProfile);
});
View.watch('bindingEvents', ['initialEvents'], function (deps) {
    this.setEvents(deps.initialEvents);
    this.bindEventChanges();
}, function () {
    this.unbindEventChanges();
    this.unsetEvents();
});
View.watch('displayingEvents', ['displayingDates', 'hasEvents'], function () {
    this.requestEventsRender(this.get('currentEvents'));
}, function () {
    this.requestEventsUnrender();
});
View.watch('title', ['dateProfile'], function (deps) {
    return (this.title = this.computeTitle(deps.dateProfile)); // assign to View for legacy reasons
});
View.watch('legacyDateProps', ['dateProfile'], function (deps) {
    var calendar = this.calendar;
    var dateProfile = deps.dateProfile;
    // DEPRECATED, but we need to keep it updated...
    this.start = calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, dateProfile.isRangeAllDay);
    this.end = calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, dateProfile.isRangeAllDay);
    this.intervalStart = calendar.msToMoment(dateProfile.currentUnzonedRange.startMs, dateProfile.isRangeAllDay);
    this.intervalEnd = calendar.msToMoment(dateProfile.currentUnzonedRange.endMs, dateProfile.isRangeAllDay);
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var EventRenderer = /** @class */ (function () {
    function EventRenderer(component, fillRenderer) {
        this.view = component._getView();
        this.component = component;
        this.fillRenderer = fillRenderer;
    }
    EventRenderer.prototype.opt = function (name) {
        return this.view.opt(name);
    };
    // Updates values that rely on options and also relate to range
    EventRenderer.prototype.rangeUpdated = function () {
        var displayEventTime;
        var displayEventEnd;
        this.eventTimeFormat =
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
    };
    EventRenderer.prototype.render = function (eventsPayload) {
        var dateProfile = this.component._getDateProfile();
        var eventDefId;
        var instanceGroup;
        var eventRanges;
        var bgRanges = [];
        var fgRanges = [];
        for (eventDefId in eventsPayload) {
            instanceGroup = eventsPayload[eventDefId];
            eventRanges = instanceGroup.sliceRenderRanges(dateProfile.activeUnzonedRange);
            if (instanceGroup.getEventDef().hasBgRendering()) {
                bgRanges.push.apply(bgRanges, eventRanges);
            }
            else {
                fgRanges.push.apply(fgRanges, eventRanges);
            }
        }
        this.renderBgRanges(bgRanges);
        this.renderFgRanges(fgRanges);
    };
    EventRenderer.prototype.unrender = function () {
        this.unrenderBgRanges();
        this.unrenderFgRanges();
    };
    EventRenderer.prototype.renderFgRanges = function (eventRanges) {
        var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        // render an `.el` on each seg
        // returns a subset of the segs. segs that were actually rendered
        segs = this.renderFgSegEls(segs);
        if (this.renderFgSegs(segs) !== false) {
            this.fgSegs = segs;
        }
    };
    EventRenderer.prototype.unrenderFgRanges = function () {
        this.unrenderFgSegs(this.fgSegs || []);
        this.fgSegs = null;
    };
    EventRenderer.prototype.renderBgRanges = function (eventRanges) {
        var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        if (this.renderBgSegs(segs) !== false) {
            this.bgSegs = segs;
        }
    };
    EventRenderer.prototype.unrenderBgRanges = function () {
        this.unrenderBgSegs();
        this.bgSegs = null;
    };
    EventRenderer.prototype.getSegs = function () {
        return (this.bgSegs || []).concat(this.fgSegs || []);
    };
    // Renders foreground event segments onto the grid
    EventRenderer.prototype.renderFgSegs = function (segs) {
        // subclasses must implement
        // segs already has rendered els, and has been filtered.
        return false; // signal failure if not implemented
    };
    // Unrenders all currently rendered foreground segments
    EventRenderer.prototype.unrenderFgSegs = function (segs) {
        // subclasses must implement
    };
    EventRenderer.prototype.renderBgSegs = function (segs) {
        var _this = this;
        if (this.fillRenderer) {
            this.fillRenderer.renderSegs('bgEvent', segs, {
                getClasses: function (seg) {
                    return _this.getBgClasses(seg.footprint.eventDef);
                },
                getCss: function (seg) {
                    return {
                        'background-color': _this.getBgColor(seg.footprint.eventDef)
                    };
                },
                filterEl: function (seg, el) {
                    return _this.filterEventRenderEl(seg.footprint, el);
                }
            });
        }
        else {
            return false; // signal failure if no fillRenderer
        }
    };
    EventRenderer.prototype.unrenderBgSegs = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('bgEvent');
        }
    };
    // Renders and assigns an `el` property for each foreground event segment.
    // Only returns segments that successfully rendered.
    EventRenderer.prototype.renderFgSegEls = function (segs, disableResizing) {
        var _this = this;
        if (disableResizing === void 0) { disableResizing = false; }
        var hasEventRenderHandlers = this.view.hasPublicHandlers('eventRender');
        var html = '';
        var renderedSegs = [];
        var i;
        if (segs.length) {
            // build a large concatenation of event segment HTML
            for (i = 0; i < segs.length; i++) {
                this.beforeFgSegHtml(segs[i]);
                html += this.fgSegHtml(segs[i], disableResizing);
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
            $(html).each(function (i, node) {
                var seg = segs[i];
                var el = $(node);
                if (hasEventRenderHandlers) {
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
    };
    EventRenderer.prototype.beforeFgSegHtml = function (seg) {
    };
    // Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
    EventRenderer.prototype.fgSegHtml = function (seg, disableResizing) {
        // subclasses should implement
    };
    // Generic utility for generating the HTML classNames for an event segment's element
    EventRenderer.prototype.getSegClasses = function (seg, isDraggable, isResizable) {
        var classes = [
            'fc-event',
            seg.isStart ? 'fc-start' : 'fc-not-start',
            seg.isEnd ? 'fc-end' : 'fc-not-end'
        ].concat(this.getClasses(seg.footprint.eventDef));
        if (isDraggable) {
            classes.push('fc-draggable');
        }
        if (isResizable) {
            classes.push('fc-resizable');
        }
        // event is currently selected? attach a className.
        if (this.view.isEventDefSelected(seg.footprint.eventDef)) {
            classes.push('fc-selected');
        }
        return classes;
    };
    // Given an event and the default element used for rendering, returns the element that should actually be used.
    // Basically runs events and elements through the eventRender hook.
    EventRenderer.prototype.filterEventRenderEl = function (eventFootprint, el) {
        var legacy = eventFootprint.getEventLegacy();
        var custom = this.view.publiclyTrigger('eventRender', {
            context: legacy,
            args: [legacy, el, this.view]
        });
        if (custom === false) {
            el = null;
        }
        else if (custom && custom !== true) {
            el = $(custom);
        }
        return el;
    };
    // Compute the text that should be displayed on an event's element.
    // `range` can be the Event object itself, or something range-like, with at least a `start`.
    // If event times are disabled, or the event has no time, will return a blank string.
    // If not specified, formatStr will default to the eventTimeFormat setting,
    // and displayEnd will default to the displayEventEnd setting.
    EventRenderer.prototype.getTimeText = function (eventFootprint, formatStr, displayEnd) {
        return this._getTimeText(eventFootprint.eventInstance.dateProfile.start, eventFootprint.eventInstance.dateProfile.end, eventFootprint.componentFootprint.isAllDay, formatStr, displayEnd);
    };
    EventRenderer.prototype._getTimeText = function (start, end, isAllDay, formatStr, displayEnd) {
        if (formatStr == null) {
            formatStr = this.eventTimeFormat;
        }
        if (displayEnd == null) {
            displayEnd = this.displayEventEnd;
        }
        if (this.displayEventTime && !isAllDay) {
            if (displayEnd && end) {
                return this.view.formatRange({ start: start, end: end }, false, // allDay
                formatStr);
            }
            else {
                return start.format(formatStr);
            }
        }
        return '';
    };
    EventRenderer.prototype.computeEventTimeFormat = function () {
        return this.opt('smallTimeFormat');
    };
    EventRenderer.prototype.computeDisplayEventTime = function () {
        return true;
    };
    EventRenderer.prototype.computeDisplayEventEnd = function () {
        return true;
    };
    EventRenderer.prototype.getBgClasses = function (eventDef) {
        var classNames = this.getClasses(eventDef);
        classNames.push('fc-bgevent');
        return classNames;
    };
    EventRenderer.prototype.getClasses = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var classNames = [];
        for (i = 0; i < objs.length; i++) {
            classNames.push.apply(// append
            classNames, objs[i].eventClassName || objs[i].className || []);
        }
        return classNames;
    };
    // Utility for generating event skin-related CSS properties
    EventRenderer.prototype.getSkinCss = function (eventDef) {
        return {
            'background-color': this.getBgColor(eventDef),
            'border-color': this.getBorderColor(eventDef),
            color: this.getTextColor(eventDef)
        };
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getBgColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventBackgroundColor || objs[i].eventColor ||
                objs[i].backgroundColor || objs[i].color;
        }
        if (!val) {
            val = this.opt('eventBackgroundColor') || this.opt('eventColor');
        }
        return val;
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getBorderColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventBorderColor || objs[i].eventColor ||
                objs[i].borderColor || objs[i].color;
        }
        if (!val) {
            val = this.opt('eventBorderColor') || this.opt('eventColor');
        }
        return val;
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getTextColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventTextColor ||
                objs[i].textColor;
        }
        if (!val) {
            val = this.opt('eventTextColor');
        }
        return val;
    };
    EventRenderer.prototype.getStylingObjs = function (eventDef) {
        var objs = this.getFallbackStylingObjs(eventDef);
        objs.unshift(eventDef);
        return objs;
    };
    EventRenderer.prototype.getFallbackStylingObjs = function (eventDef) {
        return [eventDef.source];
    };
    EventRenderer.prototype.sortEventSegs = function (segs) {
        segs.sort(util_1.proxy(this, 'compareEventSegs'));
    };
    // A cmp function for determining which segments should take visual priority
    EventRenderer.prototype.compareEventSegs = function (seg1, seg2) {
        var f1 = seg1.footprint;
        var f2 = seg2.footprint;
        var cf1 = f1.componentFootprint;
        var cf2 = f2.componentFootprint;
        var r1 = cf1.unzonedRange;
        var r2 = cf2.unzonedRange;
        return r1.startMs - r2.startMs || // earlier events go first
            (r2.endMs - r2.startMs) - (r1.endMs - r1.startMs) || // tie? longer events go first
            cf2.isAllDay - cf1.isAllDay || // tie? put all-day events first (booleans cast to 0/1)
            util_1.compareByFieldSpecs(f1.eventDef, f2.eventDef, this.view.eventOrderSpecs, f1.eventDef.miscProps, f2.eventDef.miscProps);
    };
    return EventRenderer;
}());
exports.default = EventRenderer;


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment_ext_1 = __webpack_require__(10);
// Plugin
// -------------------------------------------------------------------------------------------------
moment_ext_1.newMomentProto.format = function () {
    if (this._fullCalendar && arguments[0]) {
        return formatDate(this, arguments[0]); // our extended formatting
    }
    if (this._ambigTime) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
    }
    if (this._ambigZone) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
    }
    if (this._fullCalendar) {
        // moment.format() doesn't ensure english, but we want to.
        return moment_ext_1.oldMomentFormat(englishMoment(this));
    }
    return moment_ext_1.oldMomentProto.format.apply(this, arguments);
};
moment_ext_1.newMomentProto.toISOString = function () {
    if (this._ambigTime) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
    }
    if (this._ambigZone) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
    }
    if (this._fullCalendar) {
        // depending on browser, moment might not output english. ensure english.
        // https://github.com/moment/moment/blob/2.18.1/src/lib/moment/format.js#L22
        return moment_ext_1.oldMomentProto.toISOString.apply(englishMoment(this), arguments);
    }
    return moment_ext_1.oldMomentProto.toISOString.apply(this, arguments);
};
function englishMoment(mom) {
    if (mom.locale() !== 'en') {
        return mom.clone().locale('en');
    }
    return mom;
}
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
    t: function (date) {
        return moment_ext_1.oldMomentFormat(date, 'a').charAt(0);
    },
    T: function (date) {
        return moment_ext_1.oldMomentFormat(date, 'A').charAt(0);
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
    W: { value: 3, unit: 'week' },
    w: { value: 3, unit: 'week' },
    D: { value: 4, unit: 'day' },
    d: { value: 4, unit: 'day' } // day of week
};
// Single Date Formatting
// ---------------------------------------------------------------------------------------------------------------------
/*
Formats `date` with a Moment formatting string, but allow our non-zero areas and special token
*/
function formatDate(date, formatStr) {
    return renderFakeFormatString(getParsedFormatString(formatStr).fakeFormatString, date);
}
exports.formatDate = formatDate;
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
    date1 = moment_ext_1.default.parseZone(date1);
    date2 = moment_ext_1.default.parseZone(date2);
    localeData = date1.localeData();
    // Expand localized format strings, like "LL" -> "MMMM D YYYY".
    // BTW, this is not important for `formatDate` because it is impossible to put custom tokens
    // or non-zero areas in Moment's localized format strings.
    formatStr = localeData.longDateFormat(formatStr) || formatStr;
    return renderParsedFormat(getParsedFormatString(formatStr), date1, date2, separator || ' - ', isRTL);
}
exports.formatRange = formatRange;
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
    for (leftI = 0; leftI < sameUnits.length && (!sameUnits[leftI] || unzonedDate1.isSame(unzonedDate2, sameUnits[leftI])); leftI++) {
        leftStr += renderedParts1[leftI];
    }
    // Similarly, start at the rightmost side of the formatting string and move left
    for (rightI = sameUnits.length - 1; rightI > leftI && (!sameUnits[rightI] || unzonedDate1.isSame(unzonedDate2, sameUnits[rightI])); rightI--) {
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
    return processMaybeMarkers(leftStr + middleStr + rightStr);
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
        if (match[1]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[1]));
        }
        else if (match[2]) {
            chunks.push({ maybe: chunkFormatString(match[2]) });
        }
        else if (match[3]) {
            chunks.push({ token: match[3] });
        }
        else if (match[5]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[5]));
        }
    }
    return chunks;
}
/*
Potentially splits a literal-text string into multiple parts. For special cases.
*/
function splitStringLiteral(s) {
    if (s === '. ') {
        return ['.', ' ']; // for locales with periods bound to the end of each year/month/date
    }
    else {
        return [s];
    }
}
/*
Given chunks parsed from a real format string, generate a fake (aka "intermediate") format string with special control
characters that will eventually be given to moment for formatting, and then post-processed.
*/
function buildFakeFormatString(chunks) {
    var parts = [];
    var i;
    var chunk;
    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        if (typeof chunk === 'string') {
            parts.push('[' + chunk + ']');
        }
        else if (chunk.token) {
            if (chunk.token in specialTokens) {
                parts.push(SPECIAL_TOKEN_MARKER + // useful during post-processing
                    '[' + chunk.token + ']' // preserve as literal text
                );
            }
            else {
                parts.push(chunk.token); // unprotected text implies a format string
            }
        }
        else if (chunk.maybe) {
            parts.push(MAYBE_MARKER + // useful during post-processing
                buildFakeFormatString(chunk.maybe) +
                MAYBE_MARKER);
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
    var i;
    var chunk;
    var tokenInfo;
    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        if (chunk.token) {
            tokenInfo = largeTokenMap[chunk.token.charAt(0)];
            units.push(tokenInfo ? tokenInfo.unit : 'second'); // default to a very strict same-second
        }
        else if (chunk.maybe) {
            units.push.apply(units, // append
            buildSameUnits(chunk.maybe));
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
    return processMaybeMarkers(renderFakeFormatStringParts(fakeFormatString, date).join(''));
}
/*
Formats a date into parts that will have been post-processed, EXCEPT for the "maybe" markers.
*/
function renderFakeFormatStringParts(fakeFormatString, date) {
    var parts = [];
    var fakeRender = moment_ext_1.oldMomentFormat(date, fakeFormatString);
    var fakeParts = fakeRender.split(PART_SEPARATOR);
    var i;
    var fakePart;
    for (i = 0; i < fakeParts.length; i++) {
        fakePart = fakeParts[i];
        if (fakePart.charAt(0) === SPECIAL_TOKEN_MARKER) {
            parts.push(
            // the literal string IS the token's name.
            // call special token's registered function.
            specialTokens[fakePart.substring(1)](date));
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
    return s.replace(MAYBE_REGEXP, function (m0, m1) {
        if (m1.match(/[1-9]/)) {
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
    var i;
    var chunk;
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
}
exports.queryMostGranularFormatUnit = queryMostGranularFormatUnit;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Class_1 = __webpack_require__(32);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
var Model = /** @class */ (function (_super) {
    tslib_1.__extends(Model, _super);
    function Model() {
        var _this = _super.call(this) || this;
        _this._watchers = {};
        _this._props = {};
        _this.applyGlobalWatchers();
        _this.constructed();
        return _this;
    }
    Model.watch = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // subclasses should make a masked-copy of the superclass's map
        // TODO: write test
        if (!this.prototype.hasOwnProperty('_globalWatchArgs')) {
            this.prototype._globalWatchArgs = Object.create(this.prototype._globalWatchArgs);
        }
        this.prototype._globalWatchArgs[name] = args;
    };
    Model.prototype.constructed = function () {
        // useful for monkeypatching. TODO: BaseClass?
    };
    Model.prototype.applyGlobalWatchers = function () {
        var map = this._globalWatchArgs;
        var name;
        for (name in map) {
            this.watch.apply(this, [name].concat(map[name]));
        }
    };
    Model.prototype.has = function (name) {
        return name in this._props;
    };
    Model.prototype.get = function (name) {
        if (name === undefined) {
            return this._props;
        }
        return this._props[name];
    };
    Model.prototype.set = function (name, val) {
        var newProps;
        if (typeof name === 'string') {
            newProps = {};
            newProps[name] = val === undefined ? null : val;
        }
        else {
            newProps = name;
        }
        this.setProps(newProps);
    };
    Model.prototype.reset = function (newProps) {
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
    };
    Model.prototype.unset = function (name) {
        var newProps = {};
        var names;
        var i;
        if (typeof name === 'string') {
            names = [name];
        }
        else {
            names = name;
        }
        for (i = 0; i < names.length; i++) {
            newProps[names[i]] = undefined;
        }
        this.setProps(newProps);
    };
    Model.prototype.setProps = function (newProps) {
        var changedProps = {};
        var changedCnt = 0;
        var name;
        var val;
        for (name in newProps) {
            val = newProps[name];
            // a change in value?
            // if an object, don't check equality, because might have been mutated internally.
            // TODO: eventually enforce immutability.
            if (typeof val === 'object' ||
                val !== this._props[name]) {
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
    };
    Model.prototype.watch = function (name, depList, startFunc, stopFunc) {
        var _this = this;
        this.unwatch(name);
        this._watchers[name] = this._watchDeps(depList, function (deps) {
            var res = startFunc.call(_this, deps);
            if (res && res.then) {
                _this.unset(name); // put in an unset state while resolving
                res.then(function (val) {
                    _this.set(name, val);
                });
            }
            else {
                _this.set(name, res);
            }
        }, function (deps) {
            _this.unset(name);
            if (stopFunc) {
                stopFunc.call(_this, deps);
            }
        });
    };
    Model.prototype.unwatch = function (name) {
        var watcher = this._watchers[name];
        if (watcher) {
            delete this._watchers[name];
            watcher.teardown();
        }
    };
    Model.prototype._watchDeps = function (depList, startFunc, stopFunc) {
        var _this = this;
        var queuedChangeCnt = 0;
        var depCnt = depList.length;
        var satisfyCnt = 0;
        var values = {}; // what's passed as the `deps` arguments
        var bindTuples = []; // array of [ eventName, handlerFunc ] arrays
        var isCallingStop = false;
        var onBeforeDepChange = function (depName, val, isOptional) {
            queuedChangeCnt++;
            if (queuedChangeCnt === 1) {
                if (satisfyCnt === depCnt) {
                    isCallingStop = true;
                    stopFunc(values);
                    isCallingStop = false;
                }
            }
        };
        var onDepChange = function (depName, val, isOptional) {
            if (val === undefined) {
                // required dependency that was previously set?
                if (!isOptional && values[depName] !== undefined) {
                    satisfyCnt--;
                }
                delete values[depName];
            }
            else {
                // required dependency that was previously unset?
                if (!isOptional && values[depName] === undefined) {
                    satisfyCnt++;
                }
                values[depName] = val;
            }
            queuedChangeCnt--;
            if (!queuedChangeCnt) {
                // now finally satisfied or satisfied all along?
                if (satisfyCnt === depCnt) {
                    // if the stopFunc initiated another value change, ignore it.
                    // it will be processed by another change event anyway.
                    if (!isCallingStop) {
                        startFunc(values);
                    }
                }
            }
        };
        // intercept for .on() that remembers handlers
        var bind = function (eventName, handler) {
            _this.on(eventName, handler);
            bindTuples.push([eventName, handler]);
        };
        // listen to dependency changes
        depList.forEach(function (depName) {
            var isOptional = false;
            if (depName.charAt(0) === '?') {
                depName = depName.substring(1);
                isOptional = true;
            }
            bind('before:change:' + depName, function (val) {
                onBeforeDepChange(depName, val, isOptional);
            });
            bind('change:' + depName, function (val) {
                onDepChange(depName, val, isOptional);
            });
        });
        // process current dependency values
        depList.forEach(function (depName) {
            var isOptional = false;
            if (depName.charAt(0) === '?') {
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
            teardown: function () {
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
            flash: function () {
                if (satisfyCnt === depCnt) {
                    stopFunc();
                    startFunc(values);
                }
            }
        };
    };
    Model.prototype.flash = function (name) {
        var watcher = this._watchers[name];
        if (watcher) {
            watcher.flash();
        }
    };
    return Model;
}(Class_1.default));
exports.default = Model;
Model.prototype._globalWatchArgs = {}; // mutation protection in Model.watch
EmitterMixin_1.default.mixInto(Model);
ListenerMixin_1.default.mixInto(Model);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var SingleEventDef_1 = __webpack_require__(13);
var RecurringEventDef_1 = __webpack_require__(210);
exports.default = {
    parse: function (eventInput, source) {
        if (util_1.isTimeString(eventInput.start) || moment.isDuration(eventInput.start) ||
            util_1.isTimeString(eventInput.end) || moment.isDuration(eventInput.end)) {
            return RecurringEventDef_1.default.parse(eventInput, source);
        }
        else {
            return SingleEventDef_1.default.parse(eventInput, source);
        }
    }
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
var EventDateProfile_1 = __webpack_require__(17);
var EventDefDateMutation = /** @class */ (function () {
    function EventDefDateMutation() {
        this.clearEnd = false;
        this.forceTimed = false;
        this.forceAllDay = false;
    }
    EventDefDateMutation.createFromDiff = function (dateProfile0, dateProfile1, largeUnit) {
        var clearEnd = dateProfile0.end && !dateProfile1.end;
        var forceTimed = dateProfile0.isAllDay() && !dateProfile1.isAllDay();
        var forceAllDay = !dateProfile0.isAllDay() && dateProfile1.isAllDay();
        var dateDelta;
        var endDiff;
        var endDelta;
        var mutation;
        // subtracts the dates in the appropriate way, returning a duration
        function subtractDates(date1, date0) {
            if (largeUnit) {
                return util_1.diffByUnit(date1, date0, largeUnit); // poorly named
            }
            else if (dateProfile1.isAllDay()) {
                return util_1.diffDay(date1, date0); // poorly named
            }
            else {
                return util_1.diffDayTime(date1, date0); // poorly named
            }
        }
        dateDelta = subtractDates(dateProfile1.start, dateProfile0.start);
        if (dateProfile1.end) {
            // use unzonedRanges because dateProfile0.end might be null
            endDiff = subtractDates(dateProfile1.unzonedRange.getEnd(), dateProfile0.unzonedRange.getEnd());
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
    /*
    returns an undo function.
    */
    EventDefDateMutation.prototype.buildNewDateProfile = function (eventDateProfile, calendar) {
        var start = eventDateProfile.start.clone();
        var end = null;
        var shouldRezone = false;
        if (eventDateProfile.end && !this.clearEnd) {
            end = eventDateProfile.end.clone();
        }
        else if (this.endDelta && !end) {
            end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
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
        return new EventDateProfile_1.default(start, end, calendar);
    };
    EventDefDateMutation.prototype.setDateDelta = function (dateDelta) {
        if (dateDelta && dateDelta.valueOf()) {
            this.dateDelta = dateDelta;
        }
        else {
            this.dateDelta = null;
        }
    };
    EventDefDateMutation.prototype.setStartDelta = function (startDelta) {
        if (startDelta && startDelta.valueOf()) {
            this.startDelta = startDelta;
        }
        else {
            this.startDelta = null;
        }
    };
    EventDefDateMutation.prototype.setEndDelta = function (endDelta) {
        if (endDelta && endDelta.valueOf()) {
            this.endDelta = endDelta;
        }
        else {
            this.endDelta = null;
        }
    };
    EventDefDateMutation.prototype.isEmpty = function () {
        return !this.clearEnd && !this.forceTimed && !this.forceAllDay &&
            !this.dateDelta && !this.startDelta && !this.endDelta;
    };
    return EventDefDateMutation;
}());
exports.default = EventDefDateMutation;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var StandardTheme_1 = __webpack_require__(213);
var JqueryUiTheme_1 = __webpack_require__(214);
var themeClassHash = {};
function defineThemeSystem(themeName, themeClass) {
    themeClassHash[themeName] = themeClass;
}
exports.defineThemeSystem = defineThemeSystem;
function getThemeSystemClass(themeSetting) {
    if (!themeSetting) {
        return StandardTheme_1.default;
    }
    else if (themeSetting === true) {
        return JqueryUiTheme_1.default;
    }
    else {
        return themeClassHash[themeSetting];
    }
}
exports.getThemeSystemClass = getThemeSystemClass;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Promise_1 = __webpack_require__(19);
var EventSource_1 = __webpack_require__(6);
var SingleEventDef_1 = __webpack_require__(13);
var ArrayEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayEventSource, _super);
    function ArrayEventSource(calendar) {
        var _this = _super.call(this, calendar) || this;
        _this.eventDefs = []; // for if setRawEventDefs is never called
        return _this;
    }
    ArrayEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if ($.isArray(rawInput.events)) {
            rawProps = rawInput;
        }
        else if ($.isArray(rawInput)) {
            rawProps = { events: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    ArrayEventSource.prototype.setRawEventDefs = function (rawEventDefs) {
        this.rawEventDefs = rawEventDefs;
        this.eventDefs = this.parseEventDefs(rawEventDefs);
    };
    ArrayEventSource.prototype.fetch = function (start, end, timezone) {
        var eventDefs = this.eventDefs;
        var i;
        if (this.currentTimezone != null &&
            this.currentTimezone !== timezone) {
            for (i = 0; i < eventDefs.length; i++) {
                if (eventDefs[i] instanceof SingleEventDef_1.default) {
                    eventDefs[i].rezone();
                }
            }
        }
        this.currentTimezone = timezone;
        return Promise_1.default.resolve(eventDefs);
    };
    ArrayEventSource.prototype.addEventDef = function (eventDef) {
        this.eventDefs.push(eventDef);
    };
    /*
    eventDefId already normalized to a string
    */
    ArrayEventSource.prototype.removeEventDefsById = function (eventDefId) {
        return util_1.removeMatching(this.eventDefs, function (eventDef) {
            return eventDef.id === eventDefId;
        });
    };
    ArrayEventSource.prototype.removeAllEventDefs = function () {
        this.eventDefs = [];
    };
    ArrayEventSource.prototype.getPrimitive = function () {
        return this.rawEventDefs;
    };
    ArrayEventSource.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        this.setRawEventDefs(rawProps.events);
        return superSuccess;
    };
    return ArrayEventSource;
}(EventSource_1.default));
exports.default = ArrayEventSource;
ArrayEventSource.defineStandardProps({
    events: false // don't automatically transfer
});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
/*
A cache for the left/right/top/bottom/width/height values for one or more elements.
Works with both offset (from topleft document) and position (from offsetParent).

options:
- els
- isHorizontal
- isVertical
*/
var CoordCache = /** @class */ (function () {
    function CoordCache(options) {
        this.isHorizontal = false; // whether to query for left/right/width
        this.isVertical = false; // whether to query for top/bottom/height
        this.els = $(options.els);
        this.isHorizontal = options.isHorizontal;
        this.isVertical = options.isVertical;
        this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
    }
    // Queries the els for coordinates and stores them.
    // Call this method before using and of the get* methods below.
    CoordCache.prototype.build = function () {
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
    };
    // Destroys all internal data about coordinates, freeing memory
    CoordCache.prototype.clear = function () {
        this.origin = null;
        this.boundingRect = null;
        this.lefts = null;
        this.rights = null;
        this.tops = null;
        this.bottoms = null;
    };
    // When called, if coord caches aren't built, builds them
    CoordCache.prototype.ensureBuilt = function () {
        if (!this.origin) {
            this.build();
        }
    };
    // Populates the left/right internal coordinate arrays
    CoordCache.prototype.buildElHorizontals = function () {
        var lefts = [];
        var rights = [];
        this.els.each(function (i, node) {
            var el = $(node);
            var left = el.offset().left;
            var width = el.outerWidth();
            lefts.push(left);
            rights.push(left + width);
        });
        this.lefts = lefts;
        this.rights = rights;
    };
    // Populates the top/bottom internal coordinate arrays
    CoordCache.prototype.buildElVerticals = function () {
        var tops = [];
        var bottoms = [];
        this.els.each(function (i, node) {
            var el = $(node);
            var top = el.offset().top;
            var height = el.outerHeight();
            tops.push(top);
            bottoms.push(top + height);
        });
        this.tops = tops;
        this.bottoms = bottoms;
    };
    // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
    // If no intersection is made, returns undefined.
    CoordCache.prototype.getHorizontalIndex = function (leftOffset) {
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
    };
    // Given a top offset (from document top), returns the index of the el that it vertically intersects.
    // If no intersection is made, returns undefined.
    CoordCache.prototype.getVerticalIndex = function (topOffset) {
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
    };
    // Gets the left offset (from document left) of the element at the given index
    CoordCache.prototype.getLeftOffset = function (leftIndex) {
        this.ensureBuilt();
        return this.lefts[leftIndex];
    };
    // Gets the left position (from offsetParent left) of the element at the given index
    CoordCache.prototype.getLeftPosition = function (leftIndex) {
        this.ensureBuilt();
        return this.lefts[leftIndex] - this.origin.left;
    };
    // Gets the right offset (from document left) of the element at the given index.
    // This value is NOT relative to the document's right edge, like the CSS concept of "right" would be.
    CoordCache.prototype.getRightOffset = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex];
    };
    // Gets the right position (from offsetParent left) of the element at the given index.
    // This value is NOT relative to the offsetParent's right edge, like the CSS concept of "right" would be.
    CoordCache.prototype.getRightPosition = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex] - this.origin.left;
    };
    // Gets the width of the element at the given index
    CoordCache.prototype.getWidth = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex] - this.lefts[leftIndex];
    };
    // Gets the top offset (from document top) of the element at the given index
    CoordCache.prototype.getTopOffset = function (topIndex) {
        this.ensureBuilt();
        return this.tops[topIndex];
    };
    // Gets the top position (from offsetParent top) of the element at the given position
    CoordCache.prototype.getTopPosition = function (topIndex) {
        this.ensureBuilt();
        return this.tops[topIndex] - this.origin.top;
    };
    // Gets the bottom offset (from the document top) of the element at the given index.
    // This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
    CoordCache.prototype.getBottomOffset = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex];
    };
    // Gets the bottom position (from the offsetParent top) of the element at the given index.
    // This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
    CoordCache.prototype.getBottomPosition = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex] - this.origin.top;
    };
    // Gets the height of the element at the given index
    CoordCache.prototype.getHeight = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex] - this.tops[topIndex];
    };
    // Bounding Rect
    // TODO: decouple this from CoordCache
    // Compute and return what the elements' bounding rectangle is, from the user's perspective.
    // Right now, only returns a rectangle if constrained by an overflow:scroll element.
    // Returns null if there are no elements
    CoordCache.prototype.queryBoundingRect = function () {
        var scrollParentEl;
        if (this.els.length > 0) {
            scrollParentEl = util_1.getScrollParent(this.els.eq(0));
            if (!scrollParentEl.is(document)) {
                return util_1.getClientRect(scrollParentEl);
            }
        }
        return null;
    };
    CoordCache.prototype.isPointInBounds = function (leftOffset, topOffset) {
        return this.isLeftInBounds(leftOffset) && this.isTopInBounds(topOffset);
    };
    CoordCache.prototype.isLeftInBounds = function (leftOffset) {
        return !this.boundingRect || (leftOffset >= this.boundingRect.left && leftOffset < this.boundingRect.right);
    };
    CoordCache.prototype.isTopInBounds = function (topOffset) {
        return !this.boundingRect || (topOffset >= this.boundingRect.top && topOffset < this.boundingRect.bottom);
    };
    return CoordCache;
}());
exports.default = CoordCache;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ListenerMixin_1 = __webpack_require__(7);
var GlobalEmitter_1 = __webpack_require__(20);
/* Tracks a drag's mouse movement, firing various handlers
----------------------------------------------------------------------------------------------------------------------*/
// TODO: use Emitter
var DragListener = /** @class */ (function () {
    function DragListener(options) {
        this.isInteracting = false;
        this.isDistanceSurpassed = false;
        this.isDelayEnded = false;
        this.isDragging = false;
        this.isTouch = false;
        this.isGeneric = false; // initiated by 'dragstart' (jqui)
        this.shouldCancelTouchScroll = true;
        this.scrollAlwaysKills = false;
        this.isAutoScroll = false;
        // defaults
        this.scrollSensitivity = 30; // pixels from edge for scrolling to start
        this.scrollSpeed = 200; // pixels per second, at maximum speed
        this.scrollIntervalMs = 50; // millisecond wait between scroll increment
        this.options = options || {};
    }
    // Interaction (high-level)
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.startInteraction = function (ev, extraOptions) {
        if (extraOptions === void 0) { extraOptions = {}; }
        if (ev.type === 'mousedown') {
            if (GlobalEmitter_1.default.get().shouldIgnoreMouse()) {
                return;
            }
            else if (!util_1.isPrimaryMouseButton(ev)) {
                return;
            }
            else {
                ev.preventDefault(); // prevents native selection in most browsers
            }
        }
        if (!this.isInteracting) {
            // process options
            this.delay = util_1.firstDefined(extraOptions.delay, this.options.delay, 0);
            this.minDistance = util_1.firstDefined(extraOptions.distance, this.options.distance, 0);
            this.subjectEl = this.options.subjectEl;
            util_1.preventSelection($('body'));
            this.isInteracting = true;
            this.isTouch = util_1.getEvIsTouch(ev);
            this.isGeneric = ev.type === 'dragstart';
            this.isDelayEnded = false;
            this.isDistanceSurpassed = false;
            this.originX = util_1.getEvX(ev);
            this.originY = util_1.getEvY(ev);
            this.scrollEl = util_1.getScrollParent($(ev.target));
            this.bindHandlers();
            this.initAutoScroll();
            this.handleInteractionStart(ev);
            this.startDelay(ev);
            if (!this.minDistance) {
                this.handleDistanceSurpassed(ev);
            }
        }
    };
    DragListener.prototype.handleInteractionStart = function (ev) {
        this.trigger('interactionStart', ev);
    };
    DragListener.prototype.endInteraction = function (ev, isCancelled) {
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
            util_1.allowSelection($('body'));
        }
    };
    DragListener.prototype.handleInteractionEnd = function (ev, isCancelled) {
        this.trigger('interactionEnd', ev, isCancelled || false);
    };
    // Binding To DOM
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.bindHandlers = function () {
        // some browsers (Safari in iOS 10) don't allow preventDefault on touch events that are bound after touchstart,
        // so listen to the GlobalEmitter singleton, which is always bound, instead of the document directly.
        var globalEmitter = GlobalEmitter_1.default.get();
        if (this.isGeneric) {
            this.listenTo($(document), {
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
            selectstart: util_1.preventDefault,
            contextmenu: util_1.preventDefault // long taps would open menu on Chrome dev tools
        });
    };
    DragListener.prototype.unbindHandlers = function () {
        this.stopListeningTo(GlobalEmitter_1.default.get());
        this.stopListeningTo($(document)); // for isGeneric
    };
    // Drag (high-level)
    // -----------------------------------------------------------------------------------------------------------------
    // extraOptions ignored if drag already started
    DragListener.prototype.startDrag = function (ev, extraOptions) {
        this.startInteraction(ev, extraOptions); // ensure interaction began
        if (!this.isDragging) {
            this.isDragging = true;
            this.handleDragStart(ev);
        }
    };
    DragListener.prototype.handleDragStart = function (ev) {
        this.trigger('dragStart', ev);
    };
    DragListener.prototype.handleMove = function (ev) {
        var dx = util_1.getEvX(ev) - this.originX;
        var dy = util_1.getEvY(ev) - this.originY;
        var minDistance = this.minDistance;
        var distanceSq; // current distance from the origin, squared
        if (!this.isDistanceSurpassed) {
            distanceSq = dx * dx + dy * dy;
            if (distanceSq >= minDistance * minDistance) {
                this.handleDistanceSurpassed(ev);
            }
        }
        if (this.isDragging) {
            this.handleDrag(dx, dy, ev);
        }
    };
    // Called while the mouse is being moved and when we know a legitimate drag is taking place
    DragListener.prototype.handleDrag = function (dx, dy, ev) {
        this.trigger('drag', dx, dy, ev);
        this.updateAutoScroll(ev); // will possibly cause scrolling
    };
    DragListener.prototype.endDrag = function (ev) {
        if (this.isDragging) {
            this.isDragging = false;
            this.handleDragEnd(ev);
        }
    };
    DragListener.prototype.handleDragEnd = function (ev) {
        this.trigger('dragEnd', ev);
    };
    // Delay
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.startDelay = function (initialEv) {
        var _this = this;
        if (this.delay) {
            this.delayTimeoutId = setTimeout(function () {
                _this.handleDelayEnd(initialEv);
            }, this.delay);
        }
        else {
            this.handleDelayEnd(initialEv);
        }
    };
    DragListener.prototype.handleDelayEnd = function (initialEv) {
        this.isDelayEnded = true;
        if (this.isDistanceSurpassed) {
            this.startDrag(initialEv);
        }
    };
    // Distance
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleDistanceSurpassed = function (ev) {
        this.isDistanceSurpassed = true;
        if (this.isDelayEnded) {
            this.startDrag(ev);
        }
    };
    // Mouse / Touch
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleTouchMove = function (ev) {
        // prevent inertia and touchmove-scrolling while dragging
        if (this.isDragging && this.shouldCancelTouchScroll) {
            ev.preventDefault();
        }
        this.handleMove(ev);
    };
    DragListener.prototype.handleMouseMove = function (ev) {
        this.handleMove(ev);
    };
    // Scrolling (unrelated to auto-scroll)
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleTouchScroll = function (ev) {
        // if the drag is being initiated by touch, but a scroll happens before
        // the drag-initiating delay is over, cancel the drag
        if (!this.isDragging || this.scrollAlwaysKills) {
            this.endInteraction(ev, true); // isCancelled=true
        }
    };
    // Utils
    // -----------------------------------------------------------------------------------------------------------------
    // Triggers a callback. Calls a function in the option hash of the same name.
    // Arguments beyond the first `name` are forwarded on.
    DragListener.prototype.trigger = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.options[name]) {
            this.options[name].apply(this, args);
        }
        // makes _methods callable by event name. TODO: kill this
        if (this['_' + name]) {
            this['_' + name].apply(this, args);
        }
    };
    // Auto-scroll
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.initAutoScroll = function () {
        var scrollEl = this.scrollEl;
        this.isAutoScroll =
            this.options.scroll &&
                scrollEl &&
                !scrollEl.is(window) &&
                !scrollEl.is(document);
        if (this.isAutoScroll) {
            // debounce makes sure rapid calls don't happen
            this.listenTo(scrollEl, 'scroll', util_1.debounce(this.handleDebouncedScroll, 100));
        }
    };
    DragListener.prototype.destroyAutoScroll = function () {
        this.endAutoScroll(); // kill any animation loop
        // remove the scroll handler if there is a scrollEl
        if (this.isAutoScroll) {
            this.stopListeningTo(this.scrollEl, 'scroll'); // will probably get removed by unbindHandlers too :(
        }
    };
    // Computes and stores the bounding rectangle of scrollEl
    DragListener.prototype.computeScrollBounds = function () {
        if (this.isAutoScroll) {
            this.scrollBounds = util_1.getOuterRect(this.scrollEl);
            // TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
        }
    };
    // Called when the dragging is in progress and scrolling should be updated
    DragListener.prototype.updateAutoScroll = function (ev) {
        var sensitivity = this.scrollSensitivity;
        var bounds = this.scrollBounds;
        var topCloseness;
        var bottomCloseness;
        var leftCloseness;
        var rightCloseness;
        var topVel = 0;
        var leftVel = 0;
        if (bounds) {
            // compute closeness to edges. valid range is from 0.0 - 1.0
            topCloseness = (sensitivity - (util_1.getEvY(ev) - bounds.top)) / sensitivity;
            bottomCloseness = (sensitivity - (bounds.bottom - util_1.getEvY(ev))) / sensitivity;
            leftCloseness = (sensitivity - (util_1.getEvX(ev) - bounds.left)) / sensitivity;
            rightCloseness = (sensitivity - (bounds.right - util_1.getEvX(ev))) / sensitivity;
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
    };
    // Sets the speed-of-scrolling for the scrollEl
    DragListener.prototype.setScrollVel = function (topVel, leftVel) {
        this.scrollTopVel = topVel;
        this.scrollLeftVel = leftVel;
        this.constrainScrollVel(); // massages into realistic values
        // if there is non-zero velocity, and an animation loop hasn't already started, then START
        if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
            this.scrollIntervalId = setInterval(util_1.proxy(this, 'scrollIntervalFunc'), // scope to `this`
            this.scrollIntervalMs);
        }
    };
    // Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
    DragListener.prototype.constrainScrollVel = function () {
        var el = this.scrollEl;
        if (this.scrollTopVel < 0) {
            if (el.scrollTop() <= 0) {
                this.scrollTopVel = 0;
            }
        }
        else if (this.scrollTopVel > 0) {
            if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) {
                this.scrollTopVel = 0;
            }
        }
        if (this.scrollLeftVel < 0) {
            if (el.scrollLeft() <= 0) {
                this.scrollLeftVel = 0;
            }
        }
        else if (this.scrollLeftVel > 0) {
            if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) {
                this.scrollLeftVel = 0;
            }
        }
    };
    // This function gets called during every iteration of the scrolling animation loop
    DragListener.prototype.scrollIntervalFunc = function () {
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
    };
    // Kills any existing scrolling animation loop
    DragListener.prototype.endAutoScroll = function () {
        if (this.scrollIntervalId) {
            clearInterval(this.scrollIntervalId);
            this.scrollIntervalId = null;
            this.handleScrollEnd();
        }
    };
    // Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
    DragListener.prototype.handleDebouncedScroll = function () {
        // recompute all coordinates, but *only* if this is *not* part of our scrolling animation
        if (!this.scrollIntervalId) {
            this.handleScrollEnd();
        }
    };
    DragListener.prototype.handleScrollEnd = function () {
        // Called when scrolling has stopped, whether through auto scroll, or the user scrolling
    };
    return DragListener;
}());
exports.default = DragListener;
ListenerMixin_1.default.mixInto(DragListener);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var Mixin_1 = __webpack_require__(14);
/*
A set of rendering and date-related methods for a visual component comprised of one or more rows of day columns.
Prerequisite: the object being mixed into needs to be a *Grid*
*/
var DayTableMixin = /** @class */ (function (_super) {
    tslib_1.__extends(DayTableMixin, _super);
    function DayTableMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Populates internal variables used for date calculation and rendering
    DayTableMixin.prototype.updateDayTable = function () {
        var t = this;
        var view = t.view;
        var calendar = view.calendar;
        var date = calendar.msToUtcMoment(t.dateProfile.renderUnzonedRange.startMs, true);
        var end = calendar.msToUtcMoment(t.dateProfile.renderUnzonedRange.endMs, true);
        var dayIndex = -1;
        var dayIndices = [];
        var dayDates = [];
        var daysPerRow;
        var firstDay;
        var rowCnt;
        while (date.isBefore(end)) {
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
                if (dayDates[daysPerRow].day() === firstDay) {
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
    };
    // Computes and assigned the colCnt property and updates any options that may be computed from it
    DayTableMixin.prototype.updateDayTableCols = function () {
        this.colCnt = this.computeColCnt();
        this.colHeadFormat =
            this.opt('columnHeaderFormat') ||
                this.opt('columnFormat') || // deprecated
                this.computeColHeadFormat();
    };
    // Determines how many columns there should be in the table
    DayTableMixin.prototype.computeColCnt = function () {
        return this.daysPerRow;
    };
    // Computes the ambiguously-timed moment for the given cell
    DayTableMixin.prototype.getCellDate = function (row, col) {
        return this.dayDates[this.getCellDayIndex(row, col)].clone();
    };
    // Computes the ambiguously-timed date range for the given cell
    DayTableMixin.prototype.getCellRange = function (row, col) {
        var start = this.getCellDate(row, col);
        var end = start.clone().add(1, 'days');
        return { start: start, end: end };
    };
    // Returns the number of day cells, chronologically, from the first of the grid (0-based)
    DayTableMixin.prototype.getCellDayIndex = function (row, col) {
        return row * this.daysPerRow + this.getColDayIndex(col);
    };
    // Returns the numner of day cells, chronologically, from the first cell in *any given row*
    DayTableMixin.prototype.getColDayIndex = function (col) {
        if (this.isRTL) {
            return this.colCnt - 1 - col;
        }
        else {
            return col;
        }
    };
    // Given a date, returns its chronolocial cell-index from the first cell of the grid.
    // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
    // If before the first offset, returns a negative number.
    // If after the last offset, returns an offset past the last cell offset.
    // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
    DayTableMixin.prototype.getDateDayIndex = function (date) {
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
    };
    /* Options
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes a default column header formatting string if `colFormat` is not explicitly defined
    DayTableMixin.prototype.computeColHeadFormat = function () {
        // if more than one week row, or if there are a lot of columns with not much space,
        // put just the day numbers will be in each cell
        if (this.rowCnt > 1 || this.colCnt > 10) {
            return 'ddd'; // "Sat"
        }
        else if (this.colCnt > 1) {
            return this.opt('dayOfMonthFormat'); // "Sat 12/10"
        }
        else {
            return 'dddd'; // "Saturday"
        }
    };
    /* Slicing
    ------------------------------------------------------------------------------------------------------------------*/
    // Slices up a date range into a segment for every week-row it intersects with
    DayTableMixin.prototype.sliceRangeByRow = function (unzonedRange) {
        var daysPerRow = this.daysPerRow;
        var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
        var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
        var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
        var segs = [];
        var row;
        var rowFirst;
        var rowLast; // inclusive day-index range for current row
        var segFirst;
        var segLast; // inclusive day-index range for segment
        for (row = 0; row < this.rowCnt; row++) {
            rowFirst = row * daysPerRow;
            rowLast = rowFirst + daysPerRow - 1;
            // intersect segment's offset range with the row's
            segFirst = Math.max(rangeFirst, rowFirst);
            segLast = Math.min(rangeLast, rowLast);
            // deal with in-between indices
            segFirst = Math.ceil(segFirst); // in-between starts round to next cell
            segLast = Math.floor(segLast); // in-between ends round to prev cell
            if (segFirst <= segLast) {
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
    };
    // Slices up a date range into a segment for every day-cell it intersects with.
    // TODO: make more DRY with sliceRangeByRow somehow.
    DayTableMixin.prototype.sliceRangeByDay = function (unzonedRange) {
        var daysPerRow = this.daysPerRow;
        var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
        var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
        var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
        var segs = [];
        var row;
        var rowFirst;
        var rowLast; // inclusive day-index range for current row
        var i;
        var segFirst;
        var segLast; // inclusive day-index range for segment
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
                if (segFirst <= segLast) {
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
    };
    /* Header Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderHeadHtml = function () {
        var theme = this.view.calendar.theme;
        return '' +
            '<div class="fc-row ' + theme.getClass('headerRow') + '">' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            '<thead>' +
            this.renderHeadTrHtml() +
            '</thead>' +
            '</table>' +
            '</div>';
    };
    DayTableMixin.prototype.renderHeadIntroHtml = function () {
        return this.renderIntroHtml(); // fall back to generic
    };
    DayTableMixin.prototype.renderHeadTrHtml = function () {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderHeadIntroHtml()) +
            this.renderHeadDateCellsHtml() +
            (this.isRTL ? this.renderHeadIntroHtml() : '') +
            '</tr>';
    };
    DayTableMixin.prototype.renderHeadDateCellsHtml = function () {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(0, col);
            htmls.push(this.renderHeadDateCellHtml(date));
        }
        return htmls.join('');
    };
    // TODO: when internalApiVersion, accept an object for HTML attributes
    // (colspan should be no different)
    DayTableMixin.prototype.renderHeadDateCellHtml = function (date, colspan, otherAttrs) {
        var t = this;
        var view = t.view;
        var isDateValid = t.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var classNames = [
            'fc-day-header',
            view.calendar.theme.getClass('widgetHeader')
        ];
        var innerHtml;
        if (typeof t.opt('columnHeaderHtml') === 'function') {
            innerHtml = t.opt('columnHeaderHtml')(date);
        }
        else if (typeof t.opt('columnHeaderText') === 'function') {
            innerHtml = util_1.htmlEscape(t.opt('columnHeaderText')(date));
        }
        else {
            innerHtml = util_1.htmlEscape(date.format(t.colHeadFormat));
        }
        // if only one row of days, the classNames on the header can represent the specific days beneath
        if (t.rowCnt === 1) {
            classNames = classNames.concat(
            // includes the day-of-week class
            // noThemeHighlight=true (don't highlight the header)
            t.getDayClasses(date, true));
        }
        else {
            classNames.push('fc-' + util_1.dayIDs[date.day()]); // only add the day-of-week class
        }
        return '' +
            '<th class="' + classNames.join(' ') + '"' +
            ((isDateValid && t.rowCnt) === 1 ?
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
                view.buildGotoAnchorHtml({ date: date, forceOff: t.rowCnt > 1 || t.colCnt === 1 }, innerHtml) :
                // if not valid, display text, but no link
                innerHtml) +
            '</th>';
    };
    /* Background Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderBgTrHtml = function (row) {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderBgIntroHtml(row)) +
            this.renderBgCellsHtml(row) +
            (this.isRTL ? this.renderBgIntroHtml(row) : '') +
            '</tr>';
    };
    DayTableMixin.prototype.renderBgIntroHtml = function (row) {
        return this.renderIntroHtml(); // fall back to generic
    };
    DayTableMixin.prototype.renderBgCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(row, col);
            htmls.push(this.renderBgCellHtml(date));
        }
        return htmls.join('');
    };
    DayTableMixin.prototype.renderBgCellHtml = function (date, otherAttrs) {
        var t = this;
        var view = t.view;
        var isDateValid = t.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var classes = t.getDayClasses(date);
        classes.unshift('fc-day', view.calendar.theme.getClass('widgetContent'));
        return '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + date.format('YYYY-MM-DD') + '"' : // if date has a time, won't format it
                '') +
            (otherAttrs ?
                ' ' + otherAttrs :
                '') +
            '></td>';
    };
    /* Generic
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderIntroHtml = function () {
        // Generates the default HTML intro for any row. User classes should override
    };
    // TODO: a generic method for dealing with <tr>, RTL, intro
    // when increment internalApiVersion
    // wrapTr (scheduler)
    /* Utils
    ------------------------------------------------------------------------------------------------------------------*/
    // Applies the generic "intro" and "outro" HTML to the given cells.
    // Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
    DayTableMixin.prototype.bookendCells = function (trEl) {
        var introHtml = this.renderIntroHtml();
        if (introHtml) {
            if (this.isRTL) {
                trEl.append(introHtml);
            }
            else {
                trEl.prepend(introHtml);
            }
        }
    };
    return DayTableMixin;
}(Mixin_1.default));
exports.default = DayTableMixin;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var BusinessHourRenderer = /** @class */ (function () {
    /*
    component implements:
      - eventRangesToEventFootprints
      - eventFootprintsToSegs
    */
    function BusinessHourRenderer(component, fillRenderer) {
        this.component = component;
        this.fillRenderer = fillRenderer;
    }
    BusinessHourRenderer.prototype.render = function (businessHourGenerator) {
        var component = this.component;
        var unzonedRange = component._getDateProfile().activeUnzonedRange;
        var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(component.hasAllDayBusinessHours, unzonedRange);
        var eventFootprints = eventInstanceGroup ?
            component.eventRangesToEventFootprints(eventInstanceGroup.sliceRenderRanges(unzonedRange)) :
            [];
        this.renderEventFootprints(eventFootprints);
    };
    BusinessHourRenderer.prototype.renderEventFootprints = function (eventFootprints) {
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        this.renderSegs(segs);
        this.segs = segs;
    };
    BusinessHourRenderer.prototype.renderSegs = function (segs) {
        if (this.fillRenderer) {
            this.fillRenderer.renderSegs('businessHours', segs, {
                getClasses: function (seg) {
                    return ['fc-nonbusiness', 'fc-bgevent'];
                }
            });
        }
    };
    BusinessHourRenderer.prototype.unrender = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('businessHours');
        }
        this.segs = null;
    };
    BusinessHourRenderer.prototype.getSegs = function () {
        return this.segs || [];
    };
    return BusinessHourRenderer;
}());
exports.default = BusinessHourRenderer;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var FillRenderer = /** @class */ (function () {
    function FillRenderer(component) {
        this.fillSegTag = 'div';
        this.component = component;
        this.elsByFill = {};
    }
    FillRenderer.prototype.renderFootprint = function (type, componentFootprint, props) {
        this.renderSegs(type, this.component.componentFootprintToSegs(componentFootprint), props);
    };
    FillRenderer.prototype.renderSegs = function (type, segs, props) {
        var els;
        segs = this.buildSegEls(type, segs, props); // assignes `.el` to each seg. returns successfully rendered segs
        els = this.attachSegEls(type, segs);
        if (els) {
            this.reportEls(type, els);
        }
        return segs;
    };
    // Unrenders a specific type of fill that is currently rendered on the grid
    FillRenderer.prototype.unrender = function (type) {
        var el = this.elsByFill[type];
        if (el) {
            el.remove();
            delete this.elsByFill[type];
        }
    };
    // Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
    // Only returns segments that successfully rendered.
    FillRenderer.prototype.buildSegEls = function (type, segs, props) {
        var _this = this;
        var html = '';
        var renderedSegs = [];
        var i;
        if (segs.length) {
            // build a large concatenation of segment HTML
            for (i = 0; i < segs.length; i++) {
                html += this.buildSegHtml(type, segs[i], props);
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment.
            $(html).each(function (i, node) {
                var seg = segs[i];
                var el = $(node);
                // allow custom filter methods per-type
                if (props.filterEl) {
                    el = props.filterEl(seg, el);
                }
                if (el) {
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
    };
    // Builds the HTML needed for one fill segment. Generic enough to work with different types.
    FillRenderer.prototype.buildSegHtml = function (type, seg, props) {
        // custom hooks per-type
        var classes = props.getClasses ? props.getClasses(seg) : [];
        var css = util_1.cssToStr(props.getCss ? props.getCss(seg) : {});
        return '<' + this.fillSegTag +
            (classes.length ? ' class="' + classes.join(' ') + '"' : '') +
            (css ? ' style="' + css + '"' : '') +
            ' />';
    };
    // Should return wrapping DOM structure
    FillRenderer.prototype.attachSegEls = function (type, segs) {
        // subclasses must implement
    };
    FillRenderer.prototype.reportEls = function (type, nodes) {
        if (this.elsByFill[type]) {
            this.elsByFill[type] = this.elsByFill[type].add(nodes);
        }
        else {
            this.elsByFill[type] = $(nodes);
        }
    };
    return FillRenderer;
}());
exports.default = FillRenderer;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventDef_1 = __webpack_require__(13);
var EventFootprint_1 = __webpack_require__(35);
var EventSource_1 = __webpack_require__(6);
var HelperRenderer = /** @class */ (function () {
    function HelperRenderer(component, eventRenderer) {
        this.view = component._getView();
        this.component = component;
        this.eventRenderer = eventRenderer;
    }
    HelperRenderer.prototype.renderComponentFootprint = function (componentFootprint) {
        this.renderEventFootprints([
            this.fabricateEventFootprint(componentFootprint)
        ]);
    };
    HelperRenderer.prototype.renderEventDraggingFootprints = function (eventFootprints, sourceSeg, isTouch) {
        this.renderEventFootprints(eventFootprints, sourceSeg, 'fc-dragging', isTouch ? null : this.view.opt('dragOpacity'));
    };
    HelperRenderer.prototype.renderEventResizingFootprints = function (eventFootprints, sourceSeg, isTouch) {
        this.renderEventFootprints(eventFootprints, sourceSeg, 'fc-resizing');
    };
    HelperRenderer.prototype.renderEventFootprints = function (eventFootprints, sourceSeg, extraClassNames, opacity) {
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        var classNames = 'fc-helper ' + (extraClassNames || '');
        var i;
        // assigns each seg's el and returns a subset of segs that were rendered
        segs = this.eventRenderer.renderFgSegEls(segs);
        for (i = 0; i < segs.length; i++) {
            segs[i].el.addClass(classNames);
        }
        if (opacity != null) {
            for (i = 0; i < segs.length; i++) {
                segs[i].el.css('opacity', opacity);
            }
        }
        this.helperEls = this.renderSegs(segs, sourceSeg);
    };
    /*
    Must return all mock event elements
    */
    HelperRenderer.prototype.renderSegs = function (segs, sourceSeg) {
        // Subclasses must implement
    };
    HelperRenderer.prototype.unrender = function () {
        if (this.helperEls) {
            this.helperEls.remove();
            this.helperEls = null;
        }
    };
    HelperRenderer.prototype.fabricateEventFootprint = function (componentFootprint) {
        var calendar = this.view.calendar;
        var eventDateProfile = calendar.footprintToDateProfile(componentFootprint);
        var dummyEvent = new SingleEventDef_1.default(new EventSource_1.default(calendar));
        var dummyInstance;
        dummyEvent.dateProfile = eventDateProfile;
        dummyInstance = dummyEvent.buildInstance();
        return new EventFootprint_1.default(componentFootprint, dummyEvent, dummyInstance);
    };
    return HelperRenderer;
}());
exports.default = HelperRenderer;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var GlobalEmitter_1 = __webpack_require__(20);
var Interaction_1 = __webpack_require__(15);
var EventPointing = /** @class */ (function (_super) {
    tslib_1.__extends(EventPointing, _super);
    function EventPointing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    component must implement:
      - publiclyTrigger
    */
    EventPointing.prototype.bindToEl = function (el) {
        var component = this.component;
        component.bindSegHandlerToEl(el, 'click', this.handleClick.bind(this));
        component.bindSegHandlerToEl(el, 'mouseenter', this.handleMouseover.bind(this));
        component.bindSegHandlerToEl(el, 'mouseleave', this.handleMouseout.bind(this));
    };
    EventPointing.prototype.handleClick = function (seg, ev) {
        var res = this.component.publiclyTrigger('eventClick', {
            context: seg.el[0],
            args: [seg.footprint.getEventLegacy(), ev, this.view]
        });
        if (res === false) {
            ev.preventDefault();
        }
    };
    // Updates internal state and triggers handlers for when an event element is moused over
    EventPointing.prototype.handleMouseover = function (seg, ev) {
        if (!GlobalEmitter_1.default.get().shouldIgnoreMouse() &&
            !this.mousedOverSeg) {
            this.mousedOverSeg = seg;
            // TODO: move to EventSelecting's responsibility
            if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
                seg.el.addClass('fc-allow-mouse-resize');
            }
            this.component.publiclyTrigger('eventMouseover', {
                context: seg.el[0],
                args: [seg.footprint.getEventLegacy(), ev, this.view]
            });
        }
    };
    // Updates internal state and triggers handlers for when an event element is moused out.
    // Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
    EventPointing.prototype.handleMouseout = function (seg, ev) {
        if (this.mousedOverSeg) {
            this.mousedOverSeg = null;
            // TODO: move to EventSelecting's responsibility
            if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
                seg.el.removeClass('fc-allow-mouse-resize');
            }
            this.component.publiclyTrigger('eventMouseout', {
                context: seg.el[0],
                args: [
                    seg.footprint.getEventLegacy(),
                    ev || {},
                    this.view
                ]
            });
        }
    };
    EventPointing.prototype.end = function () {
        if (this.mousedOverSeg) {
            this.handleMouseout(this.mousedOverSeg);
        }
    };
    return EventPointing;
}(Interaction_1.default));
exports.default = EventPointing;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Mixin_1 = __webpack_require__(14);
var DateClicking_1 = __webpack_require__(245);
var DateSelecting_1 = __webpack_require__(225);
var EventPointing_1 = __webpack_require__(59);
var EventDragging_1 = __webpack_require__(224);
var EventResizing_1 = __webpack_require__(223);
var ExternalDropping_1 = __webpack_require__(222);
var StandardInteractionsMixin = /** @class */ (function (_super) {
    tslib_1.__extends(StandardInteractionsMixin, _super);
    function StandardInteractionsMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StandardInteractionsMixin;
}(Mixin_1.default));
exports.default = StandardInteractionsMixin;
StandardInteractionsMixin.prototype.dateClickingClass = DateClicking_1.default;
StandardInteractionsMixin.prototype.dateSelectingClass = DateSelecting_1.default;
StandardInteractionsMixin.prototype.eventPointingClass = EventPointing_1.default;
StandardInteractionsMixin.prototype.eventDraggingClass = EventDragging_1.default;
StandardInteractionsMixin.prototype.eventResizingClass = EventResizing_1.default;
StandardInteractionsMixin.prototype.externalDroppingClass = ExternalDropping_1.default;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var CoordCache_1 = __webpack_require__(53);
var Popover_1 = __webpack_require__(249);
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var EventFootprint_1 = __webpack_require__(35);
var BusinessHourRenderer_1 = __webpack_require__(56);
var StandardInteractionsMixin_1 = __webpack_require__(60);
var InteractiveDateComponent_1 = __webpack_require__(40);
var DayTableMixin_1 = __webpack_require__(55);
var DayGridEventRenderer_1 = __webpack_require__(250);
var DayGridHelperRenderer_1 = __webpack_require__(251);
var DayGridFillRenderer_1 = __webpack_require__(252);
/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/
var DayGrid = /** @class */ (function (_super) {
    tslib_1.__extends(DayGrid, _super);
    function DayGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.cellWeekNumbersVisible = false; // display week numbers in day cell?
        _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
        // isRigid determines whether the individual rows should ignore the contents and be a constant height.
        // Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
        _this.isRigid = false;
        _this.hasAllDayBusinessHours = true;
        return _this;
    }
    // Slices up the given span (unzoned start/end with other misc data) into an array of segments
    DayGrid.prototype.componentFootprintToSegs = function (componentFootprint) {
        var segs = this.sliceRangeByRow(componentFootprint.unzonedRange);
        var i;
        var seg;
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
    };
    /* Date Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderDates = function (dateProfile) {
        this.dateProfile = dateProfile;
        this.updateDayTable();
        this.renderGrid();
    };
    DayGrid.prototype.unrenderDates = function () {
        this.removeSegPopover();
    };
    // Renders the rows and columns into the component's `this.el`, which should already be assigned.
    DayGrid.prototype.renderGrid = function () {
        var view = this.view;
        var rowCnt = this.rowCnt;
        var colCnt = this.colCnt;
        var html = '';
        var row;
        var col;
        if (this.headContainerEl) {
            this.headContainerEl.html(this.renderHeadHtml());
        }
        for (row = 0; row < rowCnt; row++) {
            html += this.renderDayRowHtml(row, this.isRigid);
        }
        this.el.html(html);
        this.rowEls = this.el.find('.fc-row');
        this.cellEls = this.el.find('.fc-day, .fc-disabled-day');
        this.rowCoordCache = new CoordCache_1.default({
            els: this.rowEls,
            isVertical: true
        });
        this.colCoordCache = new CoordCache_1.default({
            els: this.cellEls.slice(0, this.colCnt),
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
    };
    // Generates the HTML for a single row, which is a div that wraps a table.
    // `row` is the row number.
    DayGrid.prototype.renderDayRowHtml = function (row, isRigid) {
        var theme = this.view.calendar.theme;
        var classes = ['fc-row', 'fc-week', theme.getClass('dayRow')];
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
            (this.getIsNumbersVisible() ?
                '<thead>' +
                    this.renderNumberTrHtml(row) +
                    '</thead>' :
                '') +
            '</table>' +
            '</div>' +
            '</div>';
    };
    DayGrid.prototype.getIsNumbersVisible = function () {
        return this.getIsDayNumbersVisible() || this.cellWeekNumbersVisible;
    };
    DayGrid.prototype.getIsDayNumbersVisible = function () {
        return this.rowCnt > 1;
    };
    /* Grid Number Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderNumberTrHtml = function (row) {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderNumberIntroHtml(row)) +
            this.renderNumberCellsHtml(row) +
            (this.isRTL ? this.renderNumberIntroHtml(row) : '') +
            '</tr>';
    };
    DayGrid.prototype.renderNumberIntroHtml = function (row) {
        return this.renderIntroHtml();
    };
    DayGrid.prototype.renderNumberCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(row, col);
            htmls.push(this.renderNumberCellHtml(date));
        }
        return htmls.join('');
    };
    // Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
    // The number row will only exist if either day numbers or week numbers are turned on.
    DayGrid.prototype.renderNumberCellHtml = function (date) {
        var view = this.view;
        var html = '';
        var isDateValid = this.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
        var classes;
        var weekCalcFirstDoW;
        if (!isDayNumberVisible && !this.cellWeekNumbersVisible) {
            // no numbers in day cell (week number must be along the side)
            return '<td/>'; //  will create an empty space above events :(
        }
        classes = this.getDayClasses(date);
        classes.unshift('fc-day-top');
        if (this.cellWeekNumbersVisible) {
            // To determine the day of week number change under ISO, we cannot
            // rely on moment.js methods such as firstDayOfWeek() or weekday(),
            // because they rely on the locale's dow (possibly overridden by
            // our firstDay option), which may not be Monday. We cannot change
            // dow, because that would affect the calendar start day as well.
            if (date._locale._fullCalendar_weekCalc === 'ISO') {
                weekCalcFirstDoW = 1; // Monday by ISO 8601 definition
            }
            else {
                weekCalcFirstDoW = date._locale.firstDayOfWeek();
            }
        }
        html += '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + date.format() + '"' :
                '') +
            '>';
        if (this.cellWeekNumbersVisible && (date.day() === weekCalcFirstDoW)) {
            html += view.buildGotoAnchorHtml({ date: date, type: 'week' }, { 'class': 'fc-week-number' }, date.format('w') // inner HTML
            );
        }
        if (isDayNumberVisible) {
            html += view.buildGotoAnchorHtml(date, { 'class': 'fc-day-number' }, date.format('D') // inner HTML
            );
        }
        html += '</td>';
        return html;
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.prepareHits = function () {
        this.colCoordCache.build();
        this.rowCoordCache.build();
        this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
    };
    DayGrid.prototype.releaseHits = function () {
        this.colCoordCache.clear();
        this.rowCoordCache.clear();
    };
    DayGrid.prototype.queryHit = function (leftOffset, topOffset) {
        if (this.colCoordCache.isLeftInBounds(leftOffset) && this.rowCoordCache.isTopInBounds(topOffset)) {
            var col = this.colCoordCache.getHorizontalIndex(leftOffset);
            var row = this.rowCoordCache.getVerticalIndex(topOffset);
            if (row != null && col != null) {
                return this.getCellHit(row, col);
            }
        }
    };
    DayGrid.prototype.getHitFootprint = function (hit) {
        var range = this.getCellRange(hit.row, hit.col);
        return new ComponentFootprint_1.default(new UnzonedRange_1.default(range.start, range.end), true // all-day?
        );
    };
    DayGrid.prototype.getHitEl = function (hit) {
        return this.getCellEl(hit.row, hit.col);
    };
    /* Cell System
    ------------------------------------------------------------------------------------------------------------------*/
    // FYI: the first column is the leftmost column, regardless of date
    DayGrid.prototype.getCellHit = function (row, col) {
        return {
            row: row,
            col: col,
            component: this,
            left: this.colCoordCache.getLeftOffset(col),
            right: this.colCoordCache.getRightOffset(col),
            top: this.rowCoordCache.getTopOffset(row),
            bottom: this.rowCoordCache.getBottomOffset(row)
        };
    };
    DayGrid.prototype.getCellEl = function (row, col) {
        return this.cellEls.eq(row * this.colCnt + col);
    };
    /* Event Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    // Unrenders all events currently rendered on the grid
    DayGrid.prototype.executeEventUnrender = function () {
        this.removeSegPopover(); // removes the "more.." events popover
        _super.prototype.executeEventUnrender.call(this);
    };
    // Retrieves all rendered segment objects currently rendered on the grid
    DayGrid.prototype.getOwnEventSegs = function () {
        // append the segments from the "more..." popover
        return _super.prototype.getOwnEventSegs.call(this).concat(this.popoverSegs || []);
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event or external element being dragged.
    // `eventLocation` has zoned start and end (optional)
    DayGrid.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            this.renderHighlight(eventFootprints[i].componentFootprint);
        }
        // render drags from OTHER components as helpers
        if (eventFootprints.length && seg && seg.component !== this) {
            this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);
            return true; // signal helpers rendered
        }
    };
    // Unrenders any visual indication of a hovering event
    DayGrid.prototype.unrenderDrag = function () {
        this.unrenderHighlight();
        this.helperRenderer.unrender();
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event being resized
    DayGrid.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            this.renderHighlight(eventFootprints[i].componentFootprint);
        }
        this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
    };
    // Unrenders a visual indication of an event being resized
    DayGrid.prototype.unrenderEventResize = function () {
        this.unrenderHighlight();
        this.helperRenderer.unrender();
    };
    /* More+ Link Popover
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.removeSegPopover = function () {
        if (this.segPopover) {
            this.segPopover.hide(); // in handler, will call segPopover's removeElement
        }
    };
    // Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
    // `levelLimit` can be false (don't limit), a number, or true (should be computed).
    DayGrid.prototype.limitRows = function (levelLimit) {
        var rowStructs = this.eventRenderer.rowStructs || [];
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
    };
    // Computes the number of levels a row will accomodate without going outside its bounds.
    // Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
    // `row` is the row number.
    DayGrid.prototype.computeRowLevelLimit = function (row) {
        var rowEl = this.rowEls.eq(row); // the containing "fake" row div
        var rowHeight = rowEl.height(); // TODO: cache somehow?
        var trEls = this.eventRenderer.rowStructs[row].tbodyEl.children();
        var i;
        var trEl;
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
    };
    // Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
    // `row` is the row number.
    // `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
    DayGrid.prototype.limitRow = function (row, levelLimit) {
        var _this = this;
        var rowStruct = this.eventRenderer.rowStructs[row];
        var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
        var col = 0; // col #, left-to-right (not chronologically)
        var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
        var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
        var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
        var i;
        var seg;
        var segsBelow; // array of segment objects below `seg` in the current `col`
        var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
        var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
        var td;
        var rowspan;
        var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
        var j;
        var moreTd;
        var moreWrap;
        var moreLink;
        // Iterates through empty level cells and places "more" links inside if need be
        var emptyCellsUntil = function (endCol) {
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
        };
        if (levelLimit && levelLimit < rowStruct.segLevels.length) {
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
                if (totalSegsBelow) {
                    td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
                    rowspan = td.attr('rowspan') || 1;
                    segMoreNodes = [];
                    // make a replacement <td> for each column the segment occupies. will be one for each colspan
                    for (j = 0; j < colSegsBelow.length; j++) {
                        moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
                        segsBelow = colSegsBelow[j];
                        moreLink = this.renderMoreLink(row, seg.leftCol + j, [seg].concat(segsBelow) // count seg as hidden too
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
    };
    // Reveals all levels and removes all "more"-related elements for a grid's row.
    // `row` is a row number.
    DayGrid.prototype.unlimitRow = function (row) {
        var rowStruct = this.eventRenderer.rowStructs[row];
        if (rowStruct.moreEls) {
            rowStruct.moreEls.remove();
            rowStruct.moreEls = null;
        }
        if (rowStruct.limitedEls) {
            rowStruct.limitedEls.removeClass('fc-limited');
            rowStruct.limitedEls = null;
        }
    };
    // Renders an <a> element that represents hidden event element for a cell.
    // Responsible for attaching click handler as well.
    DayGrid.prototype.renderMoreLink = function (row, col, hiddenSegs) {
        var _this = this;
        var view = this.view;
        return $('<a class="fc-more"/>')
            .text(this.getMoreLinkText(hiddenSegs.length))
            .on('click', function (ev) {
            var clickOption = _this.opt('eventLimitClick');
            var date = _this.getCellDate(row, col);
            var moreEl = $(ev.currentTarget);
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
            else if (typeof clickOption === 'string') {
                view.calendar.zoomTo(date, clickOption);
            }
        });
    };
    // Reveals the popover that displays all events within a cell
    DayGrid.prototype.showSegPopover = function (row, col, moreLink, segs) {
        var _this = this;
        var view = this.view;
        var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
        var topEl; // the element we want to match the top coordinate of
        var options;
        if (this.rowCnt === 1) {
            topEl = view.el; // will cause the popover to cover any sort of header
        }
        else {
            topEl = this.rowEls.eq(row); // will align with top of row
        }
        options = {
            className: 'fc-more-popover ' + view.calendar.theme.getClass('popover'),
            content: this.renderSegPopoverContent(row, col, segs),
            parentEl: view.el,
            top: topEl.offset().top,
            autoHide: true,
            viewportConstrain: this.opt('popoverViewportConstrain'),
            hide: function () {
                // kill everything when the popover is hidden
                // notify events to be removed
                if (_this.popoverSegs) {
                    _this.triggerBeforeEventSegsDestroyed(_this.popoverSegs);
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
        this.segPopover = new Popover_1.default(options);
        this.segPopover.show();
        // the popover doesn't live within the grid's container element, and thus won't get the event
        // delegated-handlers for free. attach event-related handlers to the popover.
        this.bindAllSegHandlersToEl(this.segPopover.el);
        this.triggerAfterEventSegsRendered(segs);
    };
    // Builds the inner DOM contents of the segment popover
    DayGrid.prototype.renderSegPopoverContent = function (row, col, segs) {
        var view = this.view;
        var theme = view.calendar.theme;
        var title = this.getCellDate(row, col).format(this.opt('dayPopoverFormat'));
        var content = $('<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
            '<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
            '<span class="fc-title">' +
            util_1.htmlEscape(title) +
            '</span>' +
            '<div class="fc-clear"/>' +
            '</div>' +
            '<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
            '<div class="fc-event-container"></div>' +
            '</div>');
        var segContainer = content.find('.fc-event-container');
        var i;
        // render each seg's `el` and only return the visible segs
        segs = this.eventRenderer.renderFgSegEls(segs, true); // disableResizing=true
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
    };
    // Given the events within an array of segment objects, reslice them to be in a single day
    DayGrid.prototype.resliceDaySegs = function (segs, dayDate) {
        var dayStart = dayDate.clone();
        var dayEnd = dayStart.clone().add(1, 'days');
        var dayRange = new UnzonedRange_1.default(dayStart, dayEnd);
        var newSegs = [];
        var i;
        var seg;
        var slicedRange;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            slicedRange = seg.footprint.componentFootprint.unzonedRange.intersect(dayRange);
            if (slicedRange) {
                newSegs.push($.extend({}, seg, {
                    footprint: new EventFootprint_1.default(new ComponentFootprint_1.default(slicedRange, seg.footprint.componentFootprint.isAllDay), seg.footprint.eventDef, seg.footprint.eventInstance),
                    isStart: seg.isStart && slicedRange.isStart,
                    isEnd: seg.isEnd && slicedRange.isEnd
                }));
            }
        }
        // force an order because eventsToSegs doesn't guarantee one
        // TODO: research if still needed
        this.eventRenderer.sortEventSegs(newSegs);
        return newSegs;
    };
    // Generates the text that should be inside a "more" link, given the number of events it represents
    DayGrid.prototype.getMoreLinkText = function (num) {
        var opt = this.opt('eventLimitText');
        if (typeof opt === 'function') {
            return opt(num);
        }
        else {
            return '+' + num + ' ' + opt;
        }
    };
    // Returns segments within a given cell.
    // If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
    DayGrid.prototype.getCellSegs = function (row, col, startLevel) {
        var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
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
    };
    return DayGrid;
}(InteractiveDateComponent_1.default));
exports.default = DayGrid;
DayGrid.prototype.eventRendererClass = DayGridEventRenderer_1.default;
DayGrid.prototype.businessHourRendererClass = BusinessHourRenderer_1.default;
DayGrid.prototype.helperRendererClass = DayGridHelperRenderer_1.default;
DayGrid.prototype.fillRendererClass = DayGridFillRenderer_1.default;
StandardInteractionsMixin_1.default.mixInto(DayGrid);
DayTableMixin_1.default.mixInto(DayGrid);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Scroller_1 = __webpack_require__(39);
var View_1 = __webpack_require__(41);
var BasicViewDateProfileGenerator_1 = __webpack_require__(228);
var DayGrid_1 = __webpack_require__(61);
/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
var BasicView = /** @class */ (function (_super) {
    tslib_1.__extends(BasicView, _super);
    function BasicView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.dayGrid = _this.instantiateDayGrid();
        _this.dayGrid.isRigid = _this.hasRigidRows();
        if (_this.opt('weekNumbers')) {
            if (_this.opt('weekNumbersWithinDays')) {
                _this.dayGrid.cellWeekNumbersVisible = true;
                _this.dayGrid.colWeekNumbersVisible = false;
            }
            else {
                _this.dayGrid.cellWeekNumbersVisible = false;
                _this.dayGrid.colWeekNumbersVisible = true;
            }
        }
        _this.addChild(_this.dayGrid);
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }
    // Generates the DayGrid object this view needs. Draws from this.dayGridClass
    BasicView.prototype.instantiateDayGrid = function () {
        // generate a subclass on the fly with BasicView-specific behavior
        // TODO: cache this subclass
        var subclass = makeDayGridSubclass(this.dayGridClass);
        return new subclass(this);
    };
    BasicView.prototype.executeDateRender = function (dateProfile) {
        this.dayGrid.breakOnWeeks = /year|month|week/.test(dateProfile.currentRangeUnit);
        _super.prototype.executeDateRender.call(this, dateProfile);
    };
    BasicView.prototype.renderSkeleton = function () {
        var dayGridContainerEl;
        var dayGridEl;
        this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());
        this.scroller.render();
        dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
        dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);
        this.el.find('.fc-body > tr > td').append(dayGridContainerEl);
        this.dayGrid.headContainerEl = this.el.find('.fc-head-container');
        this.dayGrid.setElement(dayGridEl);
    };
    BasicView.prototype.unrenderSkeleton = function () {
        this.dayGrid.removeElement();
        this.scroller.destroy();
    };
    // Builds the HTML skeleton for the view.
    // The day-grid component will render inside of a container defined by this HTML.
    BasicView.prototype.renderSkeletonHtml = function () {
        var theme = this.calendar.theme;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (this.opt('columnHeader') ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '"></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    // Generates an HTML attribute string for setting the width of the week number column, if it is known
    BasicView.prototype.weekNumberStyleAttr = function () {
        if (this.weekNumberWidth != null) {
            return 'style="width:' + this.weekNumberWidth + 'px"';
        }
        return '';
    };
    // Determines whether each row should have a constant height
    BasicView.prototype.hasRigidRows = function () {
        var eventLimit = this.opt('eventLimit');
        return eventLimit && typeof eventLimit !== 'number';
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    // Refreshes the horizontal dimensions of the view
    BasicView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        var eventLimit = this.opt('eventLimit');
        var headRowEl = this.dayGrid.headContainerEl.find('.fc-row');
        var scrollerHeight;
        var scrollbarWidths;
        // hack to give the view some height prior to dayGrid's columns being rendered
        // TODO: separate setting height from scroller VS dayGrid.
        if (!this.dayGrid.rowEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(totalHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        if (this.dayGrid.colWeekNumbersVisible) {
            // Make sure all week number cells running down the side have the same width.
            // Record the width for cells created later.
            this.weekNumberWidth = util_1.matchCellWidths(this.el.find('.fc-week-number'));
        }
        // reset all heights to be natural
        this.scroller.clear();
        util_1.uncompensateScroll(headRowEl);
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
        if (!isAuto) {
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) {
                util_1.compensateScroll(headRowEl, scrollbarWidths);
                // doing the scrollbar compensation might have created text overflow which created more height. redo
                scrollerHeight = this.computeScrollerHeight(totalHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths);
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    BasicView.prototype.computeScrollerHeight = function (totalHeight) {
        return totalHeight -
            util_1.subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    // Sets the height of just the DayGrid component in this view
    BasicView.prototype.setGridHeight = function (height, isAuto) {
        if (isAuto) {
            util_1.undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
        }
        else {
            util_1.distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
        }
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    BasicView.prototype.computeInitialDateScroll = function () {
        return { top: 0 };
    };
    BasicView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    BasicView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    return BasicView;
}(View_1.default));
exports.default = BasicView;
BasicView.prototype.dateProfileGeneratorClass = BasicViewDateProfileGenerator_1.default;
BasicView.prototype.dayGridClass = DayGrid_1.default;
// customize the rendering behavior of BasicView's dayGrid
function makeDayGridSubclass(SuperClass) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(SubClass, _super);
        function SubClass() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.colWeekNumbersVisible = false; // display week numbers along the side?
            return _this;
        }
        // Generates the HTML that will go before the day-of week header cells
        SubClass.prototype.renderHeadIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '' +
                    '<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
                    '<span>' + // needed for matchCellWidths
                    util_1.htmlEscape(this.opt('weekNumberTitle')) +
                    '</span>' +
                    '</th>';
            }
            return '';
        };
        // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
        SubClass.prototype.renderNumberIntroHtml = function (row) {
            var view = this.view;
            var weekStart = this.getCellDate(row, 0);
            if (this.colWeekNumbersVisible) {
                return '' +
                    '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
                    view.buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                    { date: weekStart, type: 'week', forceOff: this.colCnt === 1 }, weekStart.format('w') // inner HTML
                    ) +
                    '</td>';
            }
            return '';
        };
        // Generates the HTML that goes before the day bg cells for each day-row
        SubClass.prototype.renderBgIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
                    view.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        // Generates the HTML that goes before every other type of row generated by DayGrid.
        // Affects helper-skeleton and highlight-skeleton rows.
        SubClass.prototype.renderIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        SubClass.prototype.getIsNumbersVisible = function () {
            return DayGrid_1.default.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible;
        };
        return SubClass;
    }(SuperClass));
}


/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var EventDefParser_1 = __webpack_require__(49);
var EventSource_1 = __webpack_require__(6);
var util_1 = __webpack_require__(34);
var Constraints = /** @class */ (function () {
    function Constraints(eventManager, _calendar) {
        this.eventManager = eventManager;
        this._calendar = _calendar;
    }
    Constraints.prototype.opt = function (name) {
        return this._calendar.opt(name);
    };
    /*
    determines if eventInstanceGroup is allowed,
    in relation to other EVENTS and business hours.
    */
    Constraints.prototype.isEventInstanceGroupAllowed = function (eventInstanceGroup) {
        var eventDef = eventInstanceGroup.getEventDef();
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        var peerEventInstances = this.getPeerEventInstances(eventDef);
        var peerEventRanges = peerEventInstances.map(util_1.eventInstanceToEventRange);
        var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
        var constraintVal = eventDef.getConstraint();
        var overlapVal = eventDef.getOverlap();
        var eventAllowFunc = this.opt('eventAllow');
        for (i = 0; i < eventFootprints.length; i++) {
            if (!this.isFootprintAllowed(eventFootprints[i].componentFootprint, peerEventFootprints, constraintVal, overlapVal, eventFootprints[i].eventInstance)) {
                return false;
            }
        }
        if (eventAllowFunc) {
            for (i = 0; i < eventFootprints.length; i++) {
                if (eventAllowFunc(eventFootprints[i].componentFootprint.toLegacy(this._calendar), eventFootprints[i].getEventLegacy()) === false) {
                    return false;
                }
            }
        }
        return true;
    };
    Constraints.prototype.getPeerEventInstances = function (eventDef) {
        return this.eventManager.getEventInstancesWithoutId(eventDef.id);
    };
    Constraints.prototype.isSelectionFootprintAllowed = function (componentFootprint) {
        var peerEventInstances = this.eventManager.getEventInstances();
        var peerEventRanges = peerEventInstances.map(util_1.eventInstanceToEventRange);
        var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
        var selectAllowFunc;
        if (this.isFootprintAllowed(componentFootprint, peerEventFootprints, this.opt('selectConstraint'), this.opt('selectOverlap'))) {
            selectAllowFunc = this.opt('selectAllow');
            if (selectAllowFunc) {
                return selectAllowFunc(componentFootprint.toLegacy(this._calendar)) !== false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    Constraints.prototype.isFootprintAllowed = function (componentFootprint, peerEventFootprints, constraintVal, overlapVal, subjectEventInstance // optional
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
    Constraints.prototype.isFootprintWithinConstraints = function (componentFootprint, constraintFootprints) {
        var i;
        for (i = 0; i < constraintFootprints.length; i++) {
            if (this.footprintContainsFootprint(constraintFootprints[i], componentFootprint)) {
                return true;
            }
        }
        return false;
    };
    Constraints.prototype.constraintValToFootprints = function (constraintVal, isAllDay) {
        var eventInstances;
        if (constraintVal === 'businessHours') {
            return this.buildCurrentBusinessFootprints(isAllDay);
        }
        else if (typeof constraintVal === 'object') {
            eventInstances = this.parseEventDefToInstances(constraintVal); // handles recurring events
            if (!eventInstances) {
                return this.parseFootprints(constraintVal);
            }
            else {
                return this.eventInstancesToFootprints(eventInstances);
            }
        }
        else if (constraintVal != null) {
            eventInstances = this.eventManager.getEventInstancesWithId(constraintVal);
            return this.eventInstancesToFootprints(eventInstances);
        }
    };
    // returns ComponentFootprint[]
    // uses current view's range
    Constraints.prototype.buildCurrentBusinessFootprints = function (isAllDay) {
        var view = this._calendar.view;
        var businessHourGenerator = view.get('businessHourGenerator');
        var unzonedRange = view.dateProfile.activeUnzonedRange;
        var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(isAllDay, unzonedRange);
        if (eventInstanceGroup) {
            return this.eventInstancesToFootprints(eventInstanceGroup.eventInstances);
        }
        else {
            return [];
        }
    };
    // conversion util
    Constraints.prototype.eventInstancesToFootprints = function (eventInstances) {
        var eventRanges = eventInstances.map(util_1.eventInstanceToEventRange);
        var eventFootprints = this.eventRangesToEventFootprints(eventRanges);
        return eventFootprints.map(util_1.eventFootprintToComponentFootprint);
    };
    // Overlap
    // ------------------------------------------------------------------------------------------------
    Constraints.prototype.collectOverlapEventFootprints = function (peerEventFootprints, targetFootprint) {
        var overlapEventFootprints = [];
        var i;
        for (i = 0; i < peerEventFootprints.length; i++) {
            if (this.footprintsIntersect(targetFootprint, peerEventFootprints[i].componentFootprint)) {
                overlapEventFootprints.push(peerEventFootprints[i]);
            }
        }
        return overlapEventFootprints;
    };
    // Conversion: eventDefs -> eventInstances -> eventRanges -> eventFootprints -> componentFootprints
    // ------------------------------------------------------------------------------------------------
    // NOTE: this might seem like repetitive code with the Grid class, however, this code is related to
    // constraints whereas the Grid code is related to rendering. Each approach might want to convert
    // eventRanges -> eventFootprints in a different way. Regardless, there are opportunities to make
    // this more DRY.
    /*
    Returns false on invalid input.
    */
    Constraints.prototype.parseEventDefToInstances = function (eventInput) {
        var eventManager = this.eventManager;
        var eventDef = EventDefParser_1.default.parse(eventInput, new EventSource_1.default(this._calendar));
        if (!eventDef) {
            return false;
        }
        return eventDef.buildInstances(eventManager.currentPeriod.unzonedRange);
    };
    Constraints.prototype.eventRangesToEventFootprints = function (eventRanges) {
        var i;
        var eventFootprints = [];
        for (i = 0; i < eventRanges.length; i++) {
            eventFootprints.push.apply(// footprints
            eventFootprints, this.eventRangeToEventFootprints(eventRanges[i]));
        }
        return eventFootprints;
    };
    Constraints.prototype.eventRangeToEventFootprints = function (eventRange) {
        return [util_1.eventRangeToEventFootprint(eventRange)];
    };
    /*
    Parses footprints directly.
    Very similar to EventDateProfile::parse :(
    */
    Constraints.prototype.parseFootprints = function (rawInput) {
        var start;
        var end;
        if (rawInput.start) {
            start = this._calendar.moment(rawInput.start);
            if (!start.isValid()) {
                start = null;
            }
        }
        if (rawInput.end) {
            end = this._calendar.moment(rawInput.end);
            if (!end.isValid()) {
                end = null;
            }
        }
        return [
            new ComponentFootprint_1.default(new UnzonedRange_1.default(start, end), (start && !start.hasTime()) || (end && !end.hasTime()) // isAllDay
            )
        ];
    };
    // Footprint Utils
    // ----------------------------------------------------------------------------------------
    Constraints.prototype.footprintContainsFootprint = function (outerFootprint, innerFootprint) {
        return outerFootprint.unzonedRange.containsRange(innerFootprint.unzonedRange);
    };
    Constraints.prototype.footprintsIntersect = function (footprint0, footprint1) {
        return footprint0.unzonedRange.intersectsWith(footprint1.unzonedRange);
    };
    return Constraints;
}());
exports.default = Constraints;
// optional subjectEventInstance
function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
    var i;
    for (i = 0; i < overlapEventFootprints.length; i++) {
        if (!overlapFunc(overlapEventFootprints[i].eventInstance.toLegacy(), subjectEventInstance ? subjectEventInstance.toLegacy() : null)) {
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
            if (!overlapVal(overlapEventInstance.toLegacy(), subjectLegacyInstance)) {
                return false;
            }
        }
    }
    return true;
}


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

/*
USAGE:
  import { default as ParsableModelMixin, ParsableModelInterface } from './ParsableModelMixin'
in class:
  applyProps: ParsableModelInterface['applyProps']
  applyManualStandardProps: ParsableModelInterface['applyManualStandardProps']
  applyMiscProps: ParsableModelInterface['applyMiscProps']
  isStandardProp: ParsableModelInterface['isStandardProp']
  static defineStandardProps = ParsableModelMixin.defineStandardProps
  static copyVerbatimStandardProps = ParsableModelMixin.copyVerbatimStandardProps
after class:
  ParsableModelMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var Mixin_1 = __webpack_require__(14);
var ParsableModelMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ParsableModelMixin, _super);
    function ParsableModelMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParsableModelMixin.defineStandardProps = function (propDefs) {
        var proto = this.prototype;
        if (!proto.hasOwnProperty('standardPropMap')) {
            proto.standardPropMap = Object.create(proto.standardPropMap);
        }
        util_1.copyOwnProps(propDefs, proto.standardPropMap);
    };
    ParsableModelMixin.copyVerbatimStandardProps = function (src, dest) {
        var map = this.prototype.standardPropMap;
        var propName;
        for (propName in map) {
            if (src[propName] != null && // in the src object?
                map[propName] === true // false means "copy verbatim"
            ) {
                dest[propName] = src[propName];
            }
        }
    };
    /*
    Returns true/false for success.
    Meant to be only called ONCE, at object creation.
    */
    ParsableModelMixin.prototype.applyProps = function (rawProps) {
        var standardPropMap = this.standardPropMap;
        var manualProps = {};
        var miscProps = {};
        var propName;
        for (propName in rawProps) {
            if (standardPropMap[propName] === true) {
                this[propName] = rawProps[propName];
            }
            else if (standardPropMap[propName] === false) {
                manualProps[propName] = rawProps[propName];
            }
            else {
                miscProps[propName] = rawProps[propName];
            }
        }
        this.applyMiscProps(miscProps);
        return this.applyManualStandardProps(manualProps);
    };
    /*
    If subclasses override, they must call this supermethod and return the boolean response.
    Meant to be only called ONCE, at object creation.
    */
    ParsableModelMixin.prototype.applyManualStandardProps = function (rawProps) {
        return true;
    };
    /*
    Can be called even after initial object creation.
    */
    ParsableModelMixin.prototype.applyMiscProps = function (rawProps) {
        // subclasses can implement
    };
    /*
    TODO: why is this a method when defineStandardProps is static
    */
    ParsableModelMixin.prototype.isStandardProp = function (propName) {
        return propName in this.standardPropMap;
    };
    return ParsableModelMixin;
}(Mixin_1.default));
exports.default = ParsableModelMixin;
ParsableModelMixin.prototype.standardPropMap = {}; // will be cloned by defineStandardProps


/***/ }),
/* 209 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventInstance = /** @class */ (function () {
    function EventInstance(def, dateProfile) {
        this.def = def;
        this.dateProfile = dateProfile;
    }
    EventInstance.prototype.toLegacy = function () {
        var dateProfile = this.dateProfile;
        var obj = this.def.toLegacy();
        obj.start = dateProfile.start.clone();
        obj.end = dateProfile.end ? dateProfile.end.clone() : null;
        return obj;
    };
    return EventInstance;
}());
exports.default = EventInstance;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var EventDef_1 = __webpack_require__(33);
var EventInstance_1 = __webpack_require__(209);
var EventDateProfile_1 = __webpack_require__(17);
var RecurringEventDef = /** @class */ (function (_super) {
    tslib_1.__extends(RecurringEventDef, _super);
    function RecurringEventDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecurringEventDef.prototype.isAllDay = function () {
        return !this.startTime && !this.endTime;
    };
    RecurringEventDef.prototype.buildInstances = function (unzonedRange) {
        var calendar = this.source.calendar;
        var unzonedDate = unzonedRange.getStart();
        var unzonedEnd = unzonedRange.getEnd();
        var zonedDayStart;
        var instanceStart;
        var instanceEnd;
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
                instances.push(new EventInstance_1.default(this, // definition
                new EventDateProfile_1.default(instanceStart, instanceEnd, calendar)));
            }
            unzonedDate.add(1, 'days');
        }
        return instances;
    };
    RecurringEventDef.prototype.setDow = function (dowNumbers) {
        if (!this.dowHash) {
            this.dowHash = {};
        }
        for (var i = 0; i < dowNumbers.length; i++) {
            this.dowHash[dowNumbers[i]] = true;
        }
    };
    RecurringEventDef.prototype.clone = function () {
        var def = _super.prototype.clone.call(this);
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
    };
    return RecurringEventDef;
}(EventDef_1.default));
exports.default = RecurringEventDef;
/*
HACK to work with TypeScript mixins
NOTE: if super-method fails, should still attempt to apply
*/
RecurringEventDef.prototype.applyProps = function (rawProps) {
    var superSuccess = EventDef_1.default.prototype.applyProps.call(this, rawProps);
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
};
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
RecurringEventDef.defineStandardProps({
    start: false,
    end: false,
    dow: false
});


/***/ }),
/* 211 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventRange = /** @class */ (function () {
    function EventRange(unzonedRange, eventDef, eventInstance) {
        this.unzonedRange = unzonedRange;
        this.eventDef = eventDef;
        if (eventInstance) {
            this.eventInstance = eventInstance;
        }
    }
    return EventRange;
}());
exports.default = EventRange;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(34);
var EventInstanceGroup_1 = __webpack_require__(18);
var RecurringEventDef_1 = __webpack_require__(210);
var EventSource_1 = __webpack_require__(6);
var BUSINESS_HOUR_EVENT_DEFAULTS = {
    start: '09:00',
    end: '17:00',
    dow: [1, 2, 3, 4, 5],
    rendering: 'inverse-background'
    // classNames are defined in businessHoursSegClasses
};
var BusinessHourGenerator = /** @class */ (function () {
    function BusinessHourGenerator(rawComplexDef, calendar) {
        this.rawComplexDef = rawComplexDef;
        this.calendar = calendar;
    }
    BusinessHourGenerator.prototype.buildEventInstanceGroup = function (isAllDay, unzonedRange) {
        var eventDefs = this.buildEventDefs(isAllDay);
        var eventInstanceGroup;
        if (eventDefs.length) {
            eventInstanceGroup = new EventInstanceGroup_1.default(util_1.eventDefsToEventInstances(eventDefs, unzonedRange));
            // so that inverse-background rendering can happen even when no eventRanges in view
            eventInstanceGroup.explicitEventDef = eventDefs[0];
            return eventInstanceGroup;
        }
    };
    BusinessHourGenerator.prototype.buildEventDefs = function (isAllDay) {
        var rawComplexDef = this.rawComplexDef;
        var rawDefs = [];
        var requireDow = false;
        var i;
        var defs = [];
        if (rawComplexDef === true) {
            rawDefs = [{}]; // will get BUSINESS_HOUR_EVENT_DEFAULTS verbatim
        }
        else if ($.isPlainObject(rawComplexDef)) {
            rawDefs = [rawComplexDef];
        }
        else if ($.isArray(rawComplexDef)) {
            rawDefs = rawComplexDef;
            requireDow = true; // every sub-definition NEEDS a day-of-week
        }
        for (i = 0; i < rawDefs.length; i++) {
            if (!requireDow || rawDefs[i].dow) {
                defs.push(this.buildEventDef(isAllDay, rawDefs[i]));
            }
        }
        return defs;
    };
    BusinessHourGenerator.prototype.buildEventDef = function (isAllDay, rawDef) {
        var fullRawDef = $.extend({}, BUSINESS_HOUR_EVENT_DEFAULTS, rawDef);
        if (isAllDay) {
            fullRawDef.start = null;
            fullRawDef.end = null;
        }
        return RecurringEventDef_1.default.parse(fullRawDef, new EventSource_1.default(this.calendar) // dummy source
        );
    };
    return BusinessHourGenerator;
}());
exports.default = BusinessHourGenerator;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Theme_1 = __webpack_require__(38);
var StandardTheme = /** @class */ (function (_super) {
    tslib_1.__extends(StandardTheme, _super);
    function StandardTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StandardTheme;
}(Theme_1.default));
exports.default = StandardTheme;
StandardTheme.prototype.classes = {
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
};
StandardTheme.prototype.baseIconClass = 'fc-icon';
StandardTheme.prototype.iconClasses = {
    close: 'fc-icon-x',
    prev: 'fc-icon-left-single-arrow',
    next: 'fc-icon-right-single-arrow',
    prevYear: 'fc-icon-left-double-arrow',
    nextYear: 'fc-icon-right-double-arrow'
};
StandardTheme.prototype.iconOverrideOption = 'buttonIcons';
StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon';
StandardTheme.prototype.iconOverridePrefix = 'fc-icon-';


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Theme_1 = __webpack_require__(38);
var JqueryUiTheme = /** @class */ (function (_super) {
    tslib_1.__extends(JqueryUiTheme, _super);
    function JqueryUiTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JqueryUiTheme;
}(Theme_1.default));
exports.default = JqueryUiTheme;
JqueryUiTheme.prototype.classes = {
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
};
JqueryUiTheme.prototype.baseIconClass = 'ui-icon';
JqueryUiTheme.prototype.iconClasses = {
    close: 'ui-icon-closethick',
    prev: 'ui-icon-circle-triangle-w',
    next: 'ui-icon-circle-triangle-e',
    prevYear: 'ui-icon-seek-prev',
    nextYear: 'ui-icon-seek-next'
};
JqueryUiTheme.prototype.iconOverrideOption = 'themeButtonIcons';
JqueryUiTheme.prototype.iconOverrideCustomButtonOption = 'themeIcon';
JqueryUiTheme.prototype.iconOverridePrefix = 'ui-icon-';


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Promise_1 = __webpack_require__(19);
var EventSource_1 = __webpack_require__(6);
var FuncEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(FuncEventSource, _super);
    function FuncEventSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FuncEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if ($.isFunction(rawInput.events)) {
            rawProps = rawInput;
        }
        else if ($.isFunction(rawInput)) {
            rawProps = { events: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    FuncEventSource.prototype.fetch = function (start, end, timezone) {
        var _this = this;
        this.calendar.pushLoading();
        return Promise_1.default.construct(function (onResolve) {
            _this.func.call(_this.calendar, start.clone(), end.clone(), timezone, function (rawEventDefs) {
                _this.calendar.popLoading();
                onResolve(_this.parseEventDefs(rawEventDefs));
            });
        });
    };
    FuncEventSource.prototype.getPrimitive = function () {
        return this.func;
    };
    FuncEventSource.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        this.func = rawProps.events;
        return superSuccess;
    };
    return FuncEventSource;
}(EventSource_1.default));
exports.default = FuncEventSource;
FuncEventSource.defineStandardProps({
    events: false // don't automatically transfer
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Promise_1 = __webpack_require__(19);
var EventSource_1 = __webpack_require__(6);
var JsonFeedEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(JsonFeedEventSource, _super);
    function JsonFeedEventSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonFeedEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if (typeof rawInput.url === 'string') {
            rawProps = rawInput;
        }
        else if (typeof rawInput === 'string') {
            rawProps = { url: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    JsonFeedEventSource.prototype.fetch = function (start, end, timezone) {
        var _this = this;
        var ajaxSettings = this.ajaxSettings;
        var onSuccess = ajaxSettings.success;
        var onError = ajaxSettings.error;
        var requestParams = this.buildRequestParams(start, end, timezone);
        // todo: eventually handle the promise's then,
        // don't intercept success/error
        // tho will be a breaking API change
        this.calendar.pushLoading();
        return Promise_1.default.construct(function (onResolve, onReject) {
            $.ajax($.extend({}, // destination
            JsonFeedEventSource.AJAX_DEFAULTS, ajaxSettings, {
                url: _this.url,
                data: requestParams,
                success: function (rawEventDefs, status, xhr) {
                    var callbackRes;
                    _this.calendar.popLoading();
                    if (rawEventDefs) {
                        callbackRes = util_1.applyAll(onSuccess, _this, [rawEventDefs, status, xhr]); // redirect `this`
                        if ($.isArray(callbackRes)) {
                            rawEventDefs = callbackRes;
                        }
                        onResolve(_this.parseEventDefs(rawEventDefs));
                    }
                    else {
                        onReject();
                    }
                },
                error: function (xhr, statusText, errorThrown) {
                    _this.calendar.popLoading();
                    util_1.applyAll(onError, _this, [xhr, statusText, errorThrown]); // redirect `this`
                    onReject();
                }
            }));
        });
    };
    JsonFeedEventSource.prototype.buildRequestParams = function (start, end, timezone) {
        var calendar = this.calendar;
        var ajaxSettings = this.ajaxSettings;
        var startParam;
        var endParam;
        var timezoneParam;
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
    };
    JsonFeedEventSource.prototype.getPrimitive = function () {
        return this.url;
    };
    JsonFeedEventSource.prototype.applyMiscProps = function (rawProps) {
        this.ajaxSettings = rawProps;
    };
    JsonFeedEventSource.AJAX_DEFAULTS = {
        dataType: 'json',
        cache: false
    };
    return JsonFeedEventSource;
}(EventSource_1.default));
exports.default = JsonFeedEventSource;
JsonFeedEventSource.defineStandardProps({
    // automatically transfer (true)...
    url: true,
    startParam: true,
    endParam: true,
    timezoneParam: true
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var EmitterMixin_1 = __webpack_require__(11);
var TaskQueue = /** @class */ (function () {
    function TaskQueue() {
        this.q = [];
        this.isPaused = false;
        this.isRunning = false;
    }
    TaskQueue.prototype.queue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.q.push.apply(this.q, args); // append
        this.tryStart();
    };
    TaskQueue.prototype.pause = function () {
        this.isPaused = true;
    };
    TaskQueue.prototype.resume = function () {
        this.isPaused = false;
        this.tryStart();
    };
    TaskQueue.prototype.getIsIdle = function () {
        return !this.isRunning && !this.isPaused;
    };
    TaskQueue.prototype.tryStart = function () {
        if (!this.isRunning && this.canRunNext()) {
            this.isRunning = true;
            this.trigger('start');
            this.runRemaining();
        }
    };
    TaskQueue.prototype.canRunNext = function () {
        return !this.isPaused && this.q.length;
    };
    TaskQueue.prototype.runRemaining = function () {
        var _this = this;
        var task;
        var res;
        do {
            task = this.q.shift(); // always freshly reference q. might have been reassigned.
            res = this.runTask(task);
            if (res && res.then) {
                res.then(function () {
                    if (_this.canRunNext()) {
                        _this.runRemaining();
                    }
                });
                return; // prevent marking as stopped
            }
        } while (this.canRunNext());
        this.trigger('stop'); // not really a 'stop' ... more of a 'drained'
        this.isRunning = false;
        // if 'stop' handler added more tasks.... TODO: write test for this
        this.tryStart();
    };
    TaskQueue.prototype.runTask = function (task) {
        return task(); // task *is* the function, but subclasses can change the format of a task
    };
    return TaskQueue;
}());
exports.default = TaskQueue;
EmitterMixin_1.default.mixInto(TaskQueue);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var TaskQueue_1 = __webpack_require__(217);
var RenderQueue = /** @class */ (function (_super) {
    tslib_1.__extends(RenderQueue, _super);
    function RenderQueue(waitsByNamespace) {
        var _this = _super.call(this) || this;
        _this.waitsByNamespace = waitsByNamespace || {};
        return _this;
    }
    RenderQueue.prototype.queue = function (taskFunc, namespace, type) {
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
        if (this.compoundTask(task)) {
            if (!this.waitNamespace && waitMs != null) {
                this.startWait(namespace, waitMs);
            }
            else {
                this.tryStart();
            }
        }
    };
    RenderQueue.prototype.startWait = function (namespace, waitMs) {
        this.waitNamespace = namespace;
        this.spawnWait(waitMs);
    };
    RenderQueue.prototype.delayWait = function (waitMs) {
        clearTimeout(this.waitId);
        this.spawnWait(waitMs);
    };
    RenderQueue.prototype.spawnWait = function (waitMs) {
        var _this = this;
        this.waitId = setTimeout(function () {
            _this.waitNamespace = null;
            _this.tryStart();
        }, waitMs);
    };
    RenderQueue.prototype.clearWait = function () {
        if (this.waitNamespace) {
            clearTimeout(this.waitId);
            this.waitId = null;
            this.waitNamespace = null;
        }
    };
    RenderQueue.prototype.canRunNext = function () {
        if (!_super.prototype.canRunNext.call(this)) {
            return false;
        }
        // waiting for a certain namespace to stop receiving tasks?
        if (this.waitNamespace) {
            var q = this.q;
            // if there was a different namespace task in the meantime,
            // that forces all previously-waiting tasks to suddenly execute.
            // TODO: find a way to do this in constant time.
            for (var i = 0; i < q.length; i++) {
                if (q[i].namespace !== this.waitNamespace) {
                    return true; // allow execution
                }
            }
            return false;
        }
        return true;
    };
    RenderQueue.prototype.runTask = function (task) {
        task.func();
    };
    RenderQueue.prototype.compoundTask = function (newTask) {
        var q = this.q;
        var shouldAppend = true;
        var i;
        var task;
        if (newTask.namespace && newTask.type === 'destroy') {
            // remove all init/add/remove ops with same namespace, regardless of order
            for (i = q.length - 1; i >= 0; i--) {
                task = q[i];
                switch (task.type) {
                    case 'init':
                        shouldAppend = false;
                    // the latest destroy is cancelled out by not doing the init
                    /* falls through */
                    case 'add':
                    /* falls through */
                    case 'remove':
                        q.splice(i, 1); // remove task
                }
            }
        }
        if (shouldAppend) {
            q.push(newTask);
        }
        return shouldAppend;
    };
    return RenderQueue;
}(TaskQueue_1.default));
exports.default = RenderQueue;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var moment_ext_1 = __webpack_require__(10);
var date_formatting_1 = __webpack_require__(47);
var Component_1 = __webpack_require__(237);
var util_2 = __webpack_require__(34);
var DateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateComponent, _super);
    function DateComponent(_view, _options) {
        var _this = _super.call(this) || this;
        _this.isRTL = false; // frequently accessed options
        _this.hitsNeededDepth = 0; // necessary because multiple callers might need the same hits
        _this.hasAllDayBusinessHours = false; // TODO: unify with largeUnit and isTimeScale?
        _this.isDatesRendered = false;
        // hack to set options prior to the this.opt calls
        if (_view) {
            _this['view'] = _view;
        }
        if (_options) {
            _this['options'] = _options;
        }
        _this.uid = String(DateComponent.guid++);
        _this.childrenByUid = {};
        _this.nextDayThreshold = moment.duration(_this.opt('nextDayThreshold'));
        _this.isRTL = _this.opt('isRTL');
        if (_this.fillRendererClass) {
            _this.fillRenderer = new _this.fillRendererClass(_this);
        }
        if (_this.eventRendererClass) {
            _this.eventRenderer = new _this.eventRendererClass(_this, _this.fillRenderer);
        }
        if (_this.helperRendererClass && _this.eventRenderer) {
            _this.helperRenderer = new _this.helperRendererClass(_this, _this.eventRenderer);
        }
        if (_this.businessHourRendererClass && _this.fillRenderer) {
            _this.businessHourRenderer = new _this.businessHourRendererClass(_this, _this.fillRenderer);
        }
        return _this;
    }
    DateComponent.prototype.addChild = function (child) {
        if (!this.childrenByUid[child.uid]) {
            this.childrenByUid[child.uid] = child;
            return true;
        }
        return false;
    };
    DateComponent.prototype.removeChild = function (child) {
        if (this.childrenByUid[child.uid]) {
            delete this.childrenByUid[child.uid];
            return true;
        }
        return false;
    };
    // TODO: only do if isInDom?
    // TODO: make part of Component, along with children/batch-render system?
    DateComponent.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        this.callChildren('updateSize', arguments);
    };
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.opt = function (name) {
        return this._getView().opt(name); // default implementation
    };
    DateComponent.prototype.publiclyTrigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var calendar = this._getCalendar();
        return calendar.publiclyTrigger.apply(calendar, args);
    };
    DateComponent.prototype.hasPublicHandlers = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var calendar = this._getCalendar();
        return calendar.hasPublicHandlers.apply(calendar, args);
    };
    // Date
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.executeDateRender = function (dateProfile) {
        this.dateProfile = dateProfile; // for rendering
        this.renderDates(dateProfile);
        this.isDatesRendered = true;
        this.callChildren('executeDateRender', arguments);
    };
    DateComponent.prototype.executeDateUnrender = function () {
        this.callChildren('executeDateUnrender', arguments);
        this.dateProfile = null;
        this.unrenderDates();
        this.isDatesRendered = false;
    };
    // date-cell content only
    DateComponent.prototype.renderDates = function (dateProfile) {
        // subclasses should implement
    };
    // date-cell content only
    DateComponent.prototype.unrenderDates = function () {
        // subclasses should override
    };
    // Now-Indicator
    // -----------------------------------------------------------------------------------------------------------------
    // Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
    // should be refreshed. If something falsy is returned, no time indicator is rendered at all.
    DateComponent.prototype.getNowIndicatorUnit = function () {
        // subclasses should implement
    };
    // Renders a current time indicator at the given datetime
    DateComponent.prototype.renderNowIndicator = function (date) {
        this.callChildren('renderNowIndicator', arguments);
    };
    // Undoes the rendering actions from renderNowIndicator
    DateComponent.prototype.unrenderNowIndicator = function () {
        this.callChildren('unrenderNowIndicator', arguments);
    };
    // Business Hours
    // ---------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.renderBusinessHours = function (businessHourGenerator) {
        if (this.businessHourRenderer) {
            this.businessHourRenderer.render(businessHourGenerator);
        }
        this.callChildren('renderBusinessHours', arguments);
    };
    // Unrenders previously-rendered business-hours
    DateComponent.prototype.unrenderBusinessHours = function () {
        this.callChildren('unrenderBusinessHours', arguments);
        if (this.businessHourRenderer) {
            this.businessHourRenderer.unrender();
        }
    };
    // Event Displaying
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.executeEventRender = function (eventsPayload) {
        if (this.eventRenderer) {
            this.eventRenderer.rangeUpdated(); // poorly named now
            this.eventRenderer.render(eventsPayload);
        }
        else if (this['renderEvents']) {
            this['renderEvents'](convertEventsPayloadToLegacyArray(eventsPayload));
        }
        this.callChildren('executeEventRender', arguments);
    };
    DateComponent.prototype.executeEventUnrender = function () {
        this.callChildren('executeEventUnrender', arguments);
        if (this.eventRenderer) {
            this.eventRenderer.unrender();
        }
        else if (this['destroyEvents']) {
            this['destroyEvents']();
        }
    };
    DateComponent.prototype.getBusinessHourSegs = function () {
        var segs = this.getOwnBusinessHourSegs();
        this.iterChildren(function (child) {
            segs.push.apply(segs, child.getBusinessHourSegs());
        });
        return segs;
    };
    DateComponent.prototype.getOwnBusinessHourSegs = function () {
        if (this.businessHourRenderer) {
            return this.businessHourRenderer.getSegs();
        }
        return [];
    };
    DateComponent.prototype.getEventSegs = function () {
        var segs = this.getOwnEventSegs();
        this.iterChildren(function (child) {
            segs.push.apply(segs, child.getEventSegs());
        });
        return segs;
    };
    DateComponent.prototype.getOwnEventSegs = function () {
        if (this.eventRenderer) {
            return this.eventRenderer.getSegs();
        }
        return [];
    };
    // Event Rendering Triggering
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.triggerAfterEventsRendered = function () {
        this.triggerAfterEventSegsRendered(this.getEventSegs());
        this.publiclyTrigger('eventAfterAllRender', {
            context: this,
            args: [this]
        });
    };
    DateComponent.prototype.triggerAfterEventSegsRendered = function (segs) {
        var _this = this;
        // an optimization, because getEventLegacy is expensive
        if (this.hasPublicHandlers('eventAfterRender')) {
            segs.forEach(function (seg) {
                var legacy;
                if (seg.el) {
                    legacy = seg.footprint.getEventLegacy();
                    _this.publiclyTrigger('eventAfterRender', {
                        context: legacy,
                        args: [legacy, seg.el, _this]
                    });
                }
            });
        }
    };
    DateComponent.prototype.triggerBeforeEventsDestroyed = function () {
        this.triggerBeforeEventSegsDestroyed(this.getEventSegs());
    };
    DateComponent.prototype.triggerBeforeEventSegsDestroyed = function (segs) {
        var _this = this;
        if (this.hasPublicHandlers('eventDestroy')) {
            segs.forEach(function (seg) {
                var legacy;
                if (seg.el) {
                    legacy = seg.footprint.getEventLegacy();
                    _this.publiclyTrigger('eventDestroy', {
                        context: legacy,
                        args: [legacy, seg.el, _this]
                    });
                }
            });
        }
    };
    // Event Rendering Utils
    // -----------------------------------------------------------------------------------------------------------------
    // Hides all rendered event segments linked to the given event
    // RECURSIVE with subcomponents
    DateComponent.prototype.showEventsWithId = function (eventDefId) {
        this.getEventSegs().forEach(function (seg) {
            if (seg.footprint.eventDef.id === eventDefId &&
                seg.el // necessary?
            ) {
                seg.el.css('visibility', '');
            }
        });
        this.callChildren('showEventsWithId', arguments);
    };
    // Shows all rendered event segments linked to the given event
    // RECURSIVE with subcomponents
    DateComponent.prototype.hideEventsWithId = function (eventDefId) {
        this.getEventSegs().forEach(function (seg) {
            if (seg.footprint.eventDef.id === eventDefId &&
                seg.el // necessary?
            ) {
                seg.el.css('visibility', 'hidden');
            }
        });
        this.callChildren('hideEventsWithId', arguments);
    };
    // Drag-n-Drop Rendering (for both events and external elements)
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of a event or external-element drag over the given drop zone.
    // If an external-element, seg will be `null`.
    // Must return elements used for any mock events.
    DateComponent.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var renderedHelper = false;
        this.iterChildren(function (child) {
            if (child.renderDrag(eventFootprints, seg, isTouch)) {
                renderedHelper = true;
            }
        });
        return renderedHelper;
    };
    // Unrenders a visual indication of an event or external-element being dragged.
    DateComponent.prototype.unrenderDrag = function () {
        this.callChildren('unrenderDrag', arguments);
    };
    // Event Resizing
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of an event being resized.
    DateComponent.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        this.callChildren('renderEventResize', arguments);
    };
    // Unrenders a visual indication of an event being resized.
    DateComponent.prototype.unrenderEventResize = function () {
        this.callChildren('unrenderEventResize', arguments);
    };
    // Selection
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of the selection
    // TODO: rename to `renderSelection` after legacy is gone
    DateComponent.prototype.renderSelectionFootprint = function (componentFootprint) {
        this.renderHighlight(componentFootprint);
        this.callChildren('renderSelectionFootprint', arguments);
    };
    // Unrenders a visual indication of selection
    DateComponent.prototype.unrenderSelection = function () {
        this.unrenderHighlight();
        this.callChildren('unrenderSelection', arguments);
    };
    // Highlight
    // ---------------------------------------------------------------------------------------------------------------
    // Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
    DateComponent.prototype.renderHighlight = function (componentFootprint) {
        if (this.fillRenderer) {
            this.fillRenderer.renderFootprint('highlight', componentFootprint, {
                getClasses: function () {
                    return ['fc-highlight'];
                }
            });
        }
        this.callChildren('renderHighlight', arguments);
    };
    // Unrenders the emphasis on a date range
    DateComponent.prototype.unrenderHighlight = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('highlight');
        }
        this.callChildren('unrenderHighlight', arguments);
    };
    // Hit Areas
    // ---------------------------------------------------------------------------------------------------------------
    // just because all DateComponents support this interface
    // doesn't mean they need to have their own internal coord system. they can defer to sub-components.
    DateComponent.prototype.hitsNeeded = function () {
        if (!(this.hitsNeededDepth++)) {
            this.prepareHits();
        }
        this.callChildren('hitsNeeded', arguments);
    };
    DateComponent.prototype.hitsNotNeeded = function () {
        if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
            this.releaseHits();
        }
        this.callChildren('hitsNotNeeded', arguments);
    };
    DateComponent.prototype.prepareHits = function () {
        // subclasses can implement
    };
    DateComponent.prototype.releaseHits = function () {
        // subclasses can implement
    };
    // Given coordinates from the topleft of the document, return data about the date-related area underneath.
    // Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
    // Must have a `grid` property, a reference to this current grid. TODO: avoid this
    // The returned object will be processed by getHitFootprint and getHitEl.
    DateComponent.prototype.queryHit = function (leftOffset, topOffset) {
        var childrenByUid = this.childrenByUid;
        var uid;
        var hit;
        for (uid in childrenByUid) {
            hit = childrenByUid[uid].queryHit(leftOffset, topOffset);
            if (hit) {
                break;
            }
        }
        return hit;
    };
    DateComponent.prototype.getSafeHitFootprint = function (hit) {
        var footprint = this.getHitFootprint(hit);
        if (!this.dateProfile.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
            return null;
        }
        return footprint;
    };
    DateComponent.prototype.getHitFootprint = function (hit) {
        // what about being abstract!?
    };
    // Given position-level information about a date-related area within the grid,
    // should return a jQuery element that best represents it. passed to dayClick callback.
    DateComponent.prototype.getHitEl = function (hit) {
        // what about being abstract!?
    };
    /* Converting eventRange -> eventFootprint
    ------------------------------------------------------------------------------------------------------------------*/
    DateComponent.prototype.eventRangesToEventFootprints = function (eventRanges) {
        var eventFootprints = [];
        var i;
        for (i = 0; i < eventRanges.length; i++) {
            eventFootprints.push.apply(// append
            eventFootprints, this.eventRangeToEventFootprints(eventRanges[i]));
        }
        return eventFootprints;
    };
    DateComponent.prototype.eventRangeToEventFootprints = function (eventRange) {
        return [util_2.eventRangeToEventFootprint(eventRange)];
    };
    /* Converting componentFootprint/eventFootprint -> segs
    ------------------------------------------------------------------------------------------------------------------*/
    DateComponent.prototype.eventFootprintsToSegs = function (eventFootprints) {
        var segs = [];
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            segs.push.apply(segs, this.eventFootprintToSegs(eventFootprints[i]));
        }
        return segs;
    };
    // Given an event's span (unzoned start/end and other misc data), and the event itself,
    // slices into segments and attaches event-derived properties to them.
    // eventSpan - { start, end, isStart, isEnd, otherthings... }
    DateComponent.prototype.eventFootprintToSegs = function (eventFootprint) {
        var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
        var segs;
        var i;
        var seg;
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
    };
    DateComponent.prototype.componentFootprintToSegs = function (componentFootprint) {
        return [];
    };
    // Utils
    // ---------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.callChildren = function (methodName, args) {
        this.iterChildren(function (child) {
            child[methodName].apply(child, args);
        });
    };
    DateComponent.prototype.iterChildren = function (func) {
        var childrenByUid = this.childrenByUid;
        var uid;
        for (uid in childrenByUid) {
            func(childrenByUid[uid]);
        }
    };
    DateComponent.prototype._getCalendar = function () {
        var t = this;
        return t.calendar || t.view.calendar;
    };
    DateComponent.prototype._getView = function () {
        return this.view;
    };
    DateComponent.prototype._getDateProfile = function () {
        return this._getView().get('dateProfile');
    };
    // Generates HTML for an anchor to another view into the calendar.
    // Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
    // `gotoOptions` can either be a moment input, or an object with the form:
    // { date, type, forceOff }
    // `type` is a view-type like "day" or "week". default value is "day".
    // `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
    DateComponent.prototype.buildGotoAnchorHtml = function (gotoOptions, attrs, innerHtml) {
        var date;
        var type;
        var forceOff;
        var finalOptions;
        if ($.isPlainObject(gotoOptions)) {
            date = gotoOptions.date;
            type = gotoOptions.type;
            forceOff = gotoOptions.forceOff;
        }
        else {
            date = gotoOptions; // a single moment input
        }
        date = moment_ext_1.default(date); // if a string, parse it
        finalOptions = {
            date: date.format('YYYY-MM-DD'),
            type: type || 'day'
        };
        if (typeof attrs === 'string') {
            innerHtml = attrs;
            attrs = null;
        }
        attrs = attrs ? ' ' + util_1.attrsToStr(attrs) : ''; // will have a leading space
        innerHtml = innerHtml || '';
        if (!forceOff && this.opt('navLinks')) {
            return '<a' + attrs +
                ' data-goto="' + util_1.htmlEscape(JSON.stringify(finalOptions)) + '">' +
                innerHtml +
                '</a>';
        }
        else {
            return '<span' + attrs + '>' +
                innerHtml +
                '</span>';
        }
    };
    DateComponent.prototype.getAllDayHtml = function () {
        return this.opt('allDayHtml') || util_1.htmlEscape(this.opt('allDayText'));
    };
    // Computes HTML classNames for a single-day element
    DateComponent.prototype.getDayClasses = function (date, noThemeHighlight) {
        var view = this._getView();
        var classes = [];
        var today;
        if (!this.dateProfile.activeUnzonedRange.containsDate(date)) {
            classes.push('fc-disabled-day'); // TODO: jQuery UI theme?
        }
        else {
            classes.push('fc-' + util_1.dayIDs[date.day()]);
            if (view.isDateInOtherMonth(date, this.dateProfile)) {
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
    };
    // Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
    // Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
    // The timezones of the dates within `range` will be respected.
    DateComponent.prototype.formatRange = function (range, isAllDay, formatStr, separator) {
        var end = range.end;
        if (isAllDay) {
            end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
        }
        return date_formatting_1.formatRange(range.start, end, formatStr, separator, this.isRTL);
    };
    // Compute the number of the give units in the "current" range.
    // Will return a floating-point number. Won't round.
    DateComponent.prototype.currentRangeAs = function (unit) {
        return this._getDateProfile().currentUnzonedRange.as(unit);
    };
    // Returns the date range of the full days the given range visually appears to occupy.
    // Returns a plain object with start/end, NOT an UnzonedRange!
    DateComponent.prototype.computeDayRange = function (unzonedRange) {
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
    };
    // Does the given range visually appear to occupy more than one day?
    DateComponent.prototype.isMultiDayRange = function (unzonedRange) {
        var dayRange = this.computeDayRange(unzonedRange);
        return dayRange.end.diff(dayRange.start, 'days') > 1;
    };
    DateComponent.guid = 0; // TODO: better system for this?
    return DateComponent;
}(Component_1.default));
exports.default = DateComponent;
// legacy
function convertEventsPayloadToLegacyArray(eventsPayload) {
    var eventDefId;
    var eventInstances;
    var legacyEvents = [];
    var i;
    for (eventDefId in eventsPayload) {
        eventInstances = eventsPayload[eventDefId].eventInstances;
        for (i = 0; i < eventInstances.length; i++) {
            legacyEvents.push(eventInstances[i].toLegacy());
        }
    }
    return legacyEvents;
}


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var options_1 = __webpack_require__(31);
var Iterator_1 = __webpack_require__(238);
var GlobalEmitter_1 = __webpack_require__(20);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
var Toolbar_1 = __webpack_require__(239);
var OptionsManager_1 = __webpack_require__(240);
var ViewSpecManager_1 = __webpack_require__(241);
var Constraints_1 = __webpack_require__(207);
var locale_1 = __webpack_require__(30);
var moment_ext_1 = __webpack_require__(10);
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var EventDateProfile_1 = __webpack_require__(17);
var EventManager_1 = __webpack_require__(242);
var BusinessHourGenerator_1 = __webpack_require__(212);
var EventSourceParser_1 = __webpack_require__(37);
var EventDefParser_1 = __webpack_require__(49);
var SingleEventDef_1 = __webpack_require__(13);
var EventDefMutation_1 = __webpack_require__(36);
var EventSource_1 = __webpack_require__(6);
var ThemeRegistry_1 = __webpack_require__(51);
var Calendar = /** @class */ (function () {
    function Calendar(el, overrides) {
        this.loadingLevel = 0; // number of simultaneous loading tasks
        this.ignoreUpdateViewSize = 0;
        this.freezeContentHeightDepth = 0;
        // declare the current calendar instance relies on GlobalEmitter. needed for garbage collection.
        // unneeded() is called in destroy.
        GlobalEmitter_1.default.needed();
        this.el = el;
        this.viewsByType = {};
        this.optionsManager = new OptionsManager_1.default(this, overrides);
        this.viewSpecManager = new ViewSpecManager_1.default(this.optionsManager, this);
        this.initMomentInternals(); // needs to happen after options hash initialized
        this.initCurrentDate();
        this.initEventManager();
        this.constraints = new Constraints_1.default(this.eventManager, this);
        this.constructed();
    }
    Calendar.prototype.constructed = function () {
        // useful for monkeypatching. used?
    };
    Calendar.prototype.getView = function () {
        return this.view;
    };
    Calendar.prototype.publiclyTrigger = function (name, triggerInfo) {
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
    };
    Calendar.prototype.hasPublicHandlers = function (name) {
        return this.hasHandlers(name) ||
            this.opt(name); // handler specified in options
    };
    // Options Public API
    // -----------------------------------------------------------------------------------------------------------------
    // public getter/setter
    Calendar.prototype.option = function (name, value) {
        var newOptionHash;
        if (typeof name === 'string') {
            if (value === undefined) {
                return this.optionsManager.get(name);
            }
            else {
                newOptionHash = {};
                newOptionHash[name] = value;
                this.optionsManager.add(newOptionHash);
            }
        }
        else if (typeof name === 'object') {
            this.optionsManager.add(name);
        }
    };
    // private getter
    Calendar.prototype.opt = function (name) {
        return this.optionsManager.get(name);
    };
    // View
    // -----------------------------------------------------------------------------------------------------------------
    // Given a view name for a custom view or a standard view, creates a ready-to-go View object
    Calendar.prototype.instantiateView = function (viewType) {
        var spec = this.viewSpecManager.getViewSpec(viewType);
        if (!spec) {
            throw new Error("View type \"" + viewType + "\" is not valid");
        }
        return new spec['class'](this, spec);
    };
    // Returns a boolean about whether the view is okay to instantiate at some point
    Calendar.prototype.isValidViewType = function (viewType) {
        return Boolean(this.viewSpecManager.getViewSpec(viewType));
    };
    Calendar.prototype.changeView = function (viewName, dateOrRange) {
        if (dateOrRange) {
            if (dateOrRange.start && dateOrRange.end) {
                this.optionsManager.recordOverrides({
                    visibleRange: dateOrRange
                });
            }
            else {
                this.currentDate = this.moment(dateOrRange).stripZone(); // just like gotoDate
            }
        }
        this.renderView(viewName);
    };
    // Forces navigation to a view for the given date.
    // `viewType` can be a specific view name or a generic one like "week" or "day".
    Calendar.prototype.zoomTo = function (newDate, viewType) {
        var spec;
        viewType = viewType || 'day'; // day is default zoom
        spec = this.viewSpecManager.getViewSpec(viewType) ||
            this.viewSpecManager.getUnitViewSpec(viewType);
        this.currentDate = newDate.clone();
        this.renderView(spec ? spec.type : null);
    };
    // Current Date
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.initCurrentDate = function () {
        var defaultDateInput = this.opt('defaultDate');
        // compute the initial ambig-timezone date
        if (defaultDateInput != null) {
            this.currentDate = this.moment(defaultDateInput).stripZone();
        }
        else {
            this.currentDate = this.getNow(); // getNow already returns unzoned
        }
    };
    Calendar.prototype.prev = function () {
        var view = this.view;
        var prevInfo = view.dateProfileGenerator.buildPrev(view.get('dateProfile'));
        if (prevInfo.isValid) {
            this.currentDate = prevInfo.date;
            this.renderView();
        }
    };
    Calendar.prototype.next = function () {
        var view = this.view;
        var nextInfo = view.dateProfileGenerator.buildNext(view.get('dateProfile'));
        if (nextInfo.isValid) {
            this.currentDate = nextInfo.date;
            this.renderView();
        }
    };
    Calendar.prototype.prevYear = function () {
        this.currentDate.add(-1, 'years');
        this.renderView();
    };
    Calendar.prototype.nextYear = function () {
        this.currentDate.add(1, 'years');
        this.renderView();
    };
    Calendar.prototype.today = function () {
        this.currentDate = this.getNow(); // should deny like prev/next?
        this.renderView();
    };
    Calendar.prototype.gotoDate = function (zonedDateInput) {
        this.currentDate = this.moment(zonedDateInput).stripZone();
        this.renderView();
    };
    Calendar.prototype.incrementDate = function (delta) {
        this.currentDate.add(moment.duration(delta));
        this.renderView();
    };
    // for external API
    Calendar.prototype.getDate = function () {
        return this.applyTimezone(this.currentDate); // infuse the calendar's timezone
    };
    // Loading Triggering
    // -----------------------------------------------------------------------------------------------------------------
    // Should be called when any type of async data fetching begins
    Calendar.prototype.pushLoading = function () {
        if (!(this.loadingLevel++)) {
            this.publiclyTrigger('loading', [true, this.view]);
        }
    };
    // Should be called when any type of async data fetching completes
    Calendar.prototype.popLoading = function () {
        if (!(--this.loadingLevel)) {
            this.publiclyTrigger('loading', [false, this.view]);
        }
    };
    // High-level Rendering
    // -----------------------------------------------------------------------------------
    Calendar.prototype.render = function () {
        if (!this.contentEl) {
            this.initialRender();
        }
        else if (this.elementVisible()) {
            // mainly for the public API
            this.calcSize();
            this.updateViewSize();
        }
    };
    Calendar.prototype.initialRender = function () {
        var _this = this;
        var el = this.el;
        el.addClass('fc');
        // event delegation for nav links
        el.on('click.fc', 'a[data-goto]', function (ev) {
            var anchorEl = $(ev.currentTarget);
            var gotoOptions = anchorEl.data('goto'); // will automatically parse JSON
            var date = _this.moment(gotoOptions.date);
            var viewType = gotoOptions.type;
            // property like "navLinkDayClick". might be a string or a function
            var customAction = _this.view.opt('navLink' + util_1.capitaliseFirstLetter(viewType) + 'Click');
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
        this.optionsManager.watch('settingTheme', ['?theme', '?themeSystem'], function (opts) {
            var themeClass = ThemeRegistry_1.getThemeSystemClass(opts.themeSystem || opts.theme);
            var theme = new themeClass(_this.optionsManager);
            var widgetClass = theme.getClass('widget');
            _this.theme = theme;
            if (widgetClass) {
                el.addClass(widgetClass);
            }
        }, function () {
            var widgetClass = _this.theme.getClass('widget');
            _this.theme = null;
            if (widgetClass) {
                el.removeClass(widgetClass);
            }
        });
        this.optionsManager.watch('settingBusinessHourGenerator', ['?businessHours'], function (deps) {
            _this.businessHourGenerator = new BusinessHourGenerator_1.default(deps.businessHours, _this);
            if (_this.view) {
                _this.view.set('businessHourGenerator', _this.businessHourGenerator);
            }
        }, function () {
            _this.businessHourGenerator = null;
        });
        // called immediately, and upon option change.
        // HACK: locale often affects isRTL, so we explicitly listen to that too.
        this.optionsManager.watch('applyingDirClasses', ['?isRTL', '?locale'], function (opts) {
            el.toggleClass('fc-ltr', !opts.isRTL);
            el.toggleClass('fc-rtl', opts.isRTL);
        });
        this.contentEl = $("<div class='fc-view-container'/>").prependTo(el);
        this.initToolbars();
        this.renderHeader();
        this.renderFooter();
        this.renderView(this.opt('defaultView'));
        if (this.opt('handleWindowResize')) {
            $(window).resize(this.windowResizeProxy = util_1.debounce(// prevents rapid calls
            this.windowResize.bind(this), this.opt('windowResizeDelay')));
        }
    };
    Calendar.prototype.destroy = function () {
        if (this.view) {
            this.clearView();
        }
        this.toolbarsManager.proxyCall('removeElement');
        this.contentEl.remove();
        this.el.removeClass('fc fc-ltr fc-rtl');
        // removes theme-related root className
        this.optionsManager.unwatch('settingTheme');
        this.optionsManager.unwatch('settingBusinessHourGenerator');
        this.el.off('.fc'); // unbind nav link handlers
        if (this.windowResizeProxy) {
            $(window).unbind('resize', this.windowResizeProxy);
            this.windowResizeProxy = null;
        }
        GlobalEmitter_1.default.unneeded();
    };
    Calendar.prototype.elementVisible = function () {
        return this.el.is(':visible');
    };
    // Render Queue
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.bindViewHandlers = function (view) {
        var _this = this;
        view.watch('titleForCalendar', ['title'], function (deps) {
            if (view === _this.view) {
                _this.setToolbarsTitle(deps.title);
            }
        });
        view.watch('dateProfileForCalendar', ['dateProfile'], function (deps) {
            if (view === _this.view) {
                _this.currentDate = deps.dateProfile.date; // might have been constrained by view dates
                _this.updateToolbarButtons(deps.dateProfile);
            }
        });
    };
    Calendar.prototype.unbindViewHandlers = function (view) {
        view.unwatch('titleForCalendar');
        view.unwatch('dateProfileForCalendar');
    };
    // View Rendering
    // -----------------------------------------------------------------------------------
    // Renders a view because of a date change, view-type change, or for the first time.
    // If not given a viewType, keep the current view but render different dates.
    // Accepts an optional scroll state to restore to.
    Calendar.prototype.renderView = function (viewType) {
        var oldView = this.view;
        var newView;
        this.freezeContentHeight();
        if (oldView && viewType && oldView.type !== viewType) {
            this.clearView();
        }
        // if viewType changed, or the view was never created, create a fresh view
        if (!this.view && viewType) {
            newView = this.view =
                this.viewsByType[viewType] ||
                    (this.viewsByType[viewType] = this.instantiateView(viewType));
            this.bindViewHandlers(newView);
            newView.startBatchRender(); // so that setElement+setDate rendering are joined
            newView.setElement($("<div class='fc-view fc-" + viewType + "-view' />").appendTo(this.contentEl));
            this.toolbarsManager.proxyCall('activateButton', viewType);
        }
        if (this.view) {
            // prevent unnecessary change firing
            if (this.view.get('businessHourGenerator') !== this.businessHourGenerator) {
                this.view.set('businessHourGenerator', this.businessHourGenerator);
            }
            this.view.setDate(this.currentDate);
            if (newView) {
                newView.stopBatchRender();
            }
        }
        this.thawContentHeight();
    };
    // Unrenders the current view and reflects this change in the Header.
    // Unregsiters the `view`, but does not remove from viewByType hash.
    Calendar.prototype.clearView = function () {
        var currentView = this.view;
        this.toolbarsManager.proxyCall('deactivateButton', currentView.type);
        this.unbindViewHandlers(currentView);
        currentView.removeElement();
        currentView.unsetDate(); // so bindViewHandlers doesn't fire with old values next time
        this.view = null;
    };
    // Destroys the view, including the view object. Then, re-instantiates it and renders it.
    // Maintains the same scroll state.
    // TODO: maintain any other user-manipulated state.
    Calendar.prototype.reinitView = function () {
        var oldView = this.view;
        var scroll = oldView.queryScroll(); // wouldn't be so complicated if Calendar owned the scroll
        this.freezeContentHeight();
        this.clearView();
        this.calcSize();
        this.renderView(oldView.type); // needs the type to freshly render
        this.view.applyScroll(scroll);
        this.thawContentHeight();
    };
    // Resizing
    // -----------------------------------------------------------------------------------
    Calendar.prototype.getSuggestedViewHeight = function () {
        if (this.suggestedViewHeight == null) {
            this.calcSize();
        }
        return this.suggestedViewHeight;
    };
    Calendar.prototype.isHeightAuto = function () {
        return this.opt('contentHeight') === 'auto' || this.opt('height') === 'auto';
    };
    Calendar.prototype.updateViewSize = function (isResize) {
        if (isResize === void 0) { isResize = false; }
        var view = this.view;
        var scroll;
        if (!this.ignoreUpdateViewSize && view) {
            if (isResize) {
                this.calcSize();
                scroll = view.queryScroll();
            }
            this.ignoreUpdateViewSize++;
            view.updateSize(this.getSuggestedViewHeight(), this.isHeightAuto(), isResize);
            this.ignoreUpdateViewSize--;
            if (isResize) {
                view.applyScroll(scroll);
            }
            return true; // signal success
        }
    };
    Calendar.prototype.calcSize = function () {
        if (this.elementVisible()) {
            this._calcSize();
        }
    };
    Calendar.prototype._calcSize = function () {
        var contentHeightInput = this.opt('contentHeight');
        var heightInput = this.opt('height');
        if (typeof contentHeightInput === 'number') {
            this.suggestedViewHeight = contentHeightInput;
        }
        else if (typeof contentHeightInput === 'function') {
            this.suggestedViewHeight = contentHeightInput();
        }
        else if (typeof heightInput === 'number') {
            this.suggestedViewHeight = heightInput - this.queryToolbarsHeight();
        }
        else if (typeof heightInput === 'function') {
            this.suggestedViewHeight = heightInput() - this.queryToolbarsHeight();
        }
        else if (heightInput === 'parent') {
            this.suggestedViewHeight = this.el.parent().height() - this.queryToolbarsHeight();
        }
        else {
            this.suggestedViewHeight = Math.round(this.contentEl.width() /
                Math.max(this.opt('aspectRatio'), .5));
        }
    };
    Calendar.prototype.windowResize = function (ev) {
        if (
        // the purpose: so we don't process jqui "resize" events that have bubbled up
        // cast to any because .target, which is Element, can't be compared to window for some reason.
        ev.target === window &&
            this.view &&
            this.view.isDatesRendered) {
            if (this.updateViewSize(true)) {
                this.publiclyTrigger('windowResize', [this.view]);
            }
        }
    };
    /* Height "Freezing"
    -----------------------------------------------------------------------------*/
    Calendar.prototype.freezeContentHeight = function () {
        if (!(this.freezeContentHeightDepth++)) {
            this.forceFreezeContentHeight();
        }
    };
    Calendar.prototype.forceFreezeContentHeight = function () {
        this.contentEl.css({
            width: '100%',
            height: this.contentEl.height(),
            overflow: 'hidden'
        });
    };
    Calendar.prototype.thawContentHeight = function () {
        this.freezeContentHeightDepth--;
        // always bring back to natural height
        this.contentEl.css({
            width: '',
            height: '',
            overflow: ''
        });
        // but if there are future thaws, re-freeze
        if (this.freezeContentHeightDepth) {
            this.forceFreezeContentHeight();
        }
    };
    // Toolbar
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.initToolbars = function () {
        this.header = new Toolbar_1.default(this, this.computeHeaderOptions());
        this.footer = new Toolbar_1.default(this, this.computeFooterOptions());
        this.toolbarsManager = new Iterator_1.default([this.header, this.footer]);
    };
    Calendar.prototype.computeHeaderOptions = function () {
        return {
            extraClasses: 'fc-header-toolbar',
            layout: this.opt('header')
        };
    };
    Calendar.prototype.computeFooterOptions = function () {
        return {
            extraClasses: 'fc-footer-toolbar',
            layout: this.opt('footer')
        };
    };
    // can be called repeatedly and Header will rerender
    Calendar.prototype.renderHeader = function () {
        var header = this.header;
        header.setToolbarOptions(this.computeHeaderOptions());
        header.render();
        if (header.el) {
            this.el.prepend(header.el);
        }
    };
    // can be called repeatedly and Footer will rerender
    Calendar.prototype.renderFooter = function () {
        var footer = this.footer;
        footer.setToolbarOptions(this.computeFooterOptions());
        footer.render();
        if (footer.el) {
            this.el.append(footer.el);
        }
    };
    Calendar.prototype.setToolbarsTitle = function (title) {
        this.toolbarsManager.proxyCall('updateTitle', title);
    };
    Calendar.prototype.updateToolbarButtons = function (dateProfile) {
        var now = this.getNow();
        var view = this.view;
        var todayInfo = view.dateProfileGenerator.build(now);
        var prevInfo = view.dateProfileGenerator.buildPrev(view.get('dateProfile'));
        var nextInfo = view.dateProfileGenerator.buildNext(view.get('dateProfile'));
        this.toolbarsManager.proxyCall((todayInfo.isValid && !dateProfile.currentUnzonedRange.containsDate(now)) ?
            'enableButton' :
            'disableButton', 'today');
        this.toolbarsManager.proxyCall(prevInfo.isValid ?
            'enableButton' :
            'disableButton', 'prev');
        this.toolbarsManager.proxyCall(nextInfo.isValid ?
            'enableButton' :
            'disableButton', 'next');
    };
    Calendar.prototype.queryToolbarsHeight = function () {
        return this.toolbarsManager.items.reduce(function (accumulator, toolbar) {
            var toolbarHeight = toolbar.el ? toolbar.el.outerHeight(true) : 0; // includes margin
            return accumulator + toolbarHeight;
        }, 0);
    };
    // Selection
    // -----------------------------------------------------------------------------------------------------------------
    // this public method receives start/end dates in any format, with any timezone
    Calendar.prototype.select = function (zonedStartInput, zonedEndInput) {
        this.view.select(this.buildSelectFootprint.apply(this, arguments));
    };
    Calendar.prototype.unselect = function () {
        if (this.view) {
            this.view.unselect();
        }
    };
    // Given arguments to the select method in the API, returns a span (unzoned start/end and other info)
    Calendar.prototype.buildSelectFootprint = function (zonedStartInput, zonedEndInput) {
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
        return new ComponentFootprint_1.default(new UnzonedRange_1.default(start, end), !start.hasTime());
    };
    // Date Utils
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.initMomentInternals = function () {
        var _this = this;
        this.defaultAllDayEventDuration = moment.duration(this.opt('defaultAllDayEventDuration'));
        this.defaultTimedEventDuration = moment.duration(this.opt('defaultTimedEventDuration'));
        // Called immediately, and when any of the options change.
        // Happens before any internal objects rebuild or rerender, because this is very core.
        this.optionsManager.watch('buildingMomentLocale', [
            '?locale', '?monthNames', '?monthNamesShort', '?dayNames', '?dayNamesShort',
            '?firstDay', '?weekNumberCalculation'
        ], function (opts) {
            var weekNumberCalculation = opts.weekNumberCalculation;
            var firstDay = opts.firstDay;
            var _week;
            // normalize
            if (weekNumberCalculation === 'iso') {
                weekNumberCalculation = 'ISO'; // normalize
            }
            var localeData = Object.create(// make a cheap copy
            locale_1.getMomentLocaleData(opts.locale) // will fall back to en
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
            if (weekNumberCalculation === 'ISO' ||
                weekNumberCalculation === 'local' ||
                typeof weekNumberCalculation === 'function') {
                localeData._fullCalendar_weekCalc = weekNumberCalculation; // moment-ext will know what to do with it
            }
            _this.localeData = localeData;
            // If the internal current date object already exists, move to new locale.
            // We do NOT need to do this technique for event dates, because this happens when converting to "segments".
            if (_this.currentDate) {
                _this.localizeMoment(_this.currentDate); // sets to localeData
            }
        });
    };
    // Builds a moment using the settings of the current calendar: timezone and locale.
    // Accepts anything the vanilla moment() constructor accepts.
    Calendar.prototype.moment = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var mom;
        if (this.opt('timezone') === 'local') {
            mom = moment_ext_1.default.apply(null, args);
            // Force the moment to be local, because momentExt doesn't guarantee it.
            if (mom.hasTime()) {
                mom.local();
            }
        }
        else if (this.opt('timezone') === 'UTC') {
            mom = moment_ext_1.default.utc.apply(null, args); // process as UTC
        }
        else {
            mom = moment_ext_1.default.parseZone.apply(null, args); // let the input decide the zone
        }
        this.localizeMoment(mom); // TODO
        return mom;
    };
    Calendar.prototype.msToMoment = function (ms, forceAllDay) {
        var mom = moment_ext_1.default.utc(ms); // TODO: optimize by using Date.UTC
        if (forceAllDay) {
            mom.stripTime();
        }
        else {
            mom = this.applyTimezone(mom); // may or may not apply locale
        }
        this.localizeMoment(mom);
        return mom;
    };
    Calendar.prototype.msToUtcMoment = function (ms, forceAllDay) {
        var mom = moment_ext_1.default.utc(ms); // TODO: optimize by using Date.UTC
        if (forceAllDay) {
            mom.stripTime();
        }
        this.localizeMoment(mom);
        return mom;
    };
    // Updates the given moment's locale settings to the current calendar locale settings.
    Calendar.prototype.localizeMoment = function (mom) {
        mom._locale = this.localeData;
    };
    // Returns a boolean about whether or not the calendar knows how to calculate
    // the timezone offset of arbitrary dates in the current timezone.
    Calendar.prototype.getIsAmbigTimezone = function () {
        return this.opt('timezone') !== 'local' && this.opt('timezone') !== 'UTC';
    };
    // Returns a copy of the given date in the current timezone. Has no effect on dates without times.
    Calendar.prototype.applyTimezone = function (date) {
        if (!date.hasTime()) {
            return date.clone();
        }
        var zonedDate = this.moment(date.toArray());
        var timeAdjust = date.time().asMilliseconds() - zonedDate.time().asMilliseconds();
        var adjustedZonedDate;
        // Safari sometimes has problems with this coersion when near DST. Adjust if necessary. (bug #2396)
        if (timeAdjust) {
            adjustedZonedDate = zonedDate.clone().add(timeAdjust); // add milliseconds
            if (date.time().asMilliseconds() - adjustedZonedDate.time().asMilliseconds() === 0) {
                zonedDate = adjustedZonedDate;
            }
        }
        return zonedDate;
    };
    /*
    Assumes the footprint is non-open-ended.
    */
    Calendar.prototype.footprintToDateProfile = function (componentFootprint, ignoreEnd) {
        if (ignoreEnd === void 0) { ignoreEnd = false; }
        var start = moment_ext_1.default.utc(componentFootprint.unzonedRange.startMs);
        var end;
        if (!ignoreEnd) {
            end = moment_ext_1.default.utc(componentFootprint.unzonedRange.endMs);
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
        return new EventDateProfile_1.default(start, end, this);
    };
    // Returns a moment for the current date, as defined by the client's computer or from the `now` option.
    // Will return an moment with an ambiguous timezone.
    Calendar.prototype.getNow = function () {
        var now = this.opt('now');
        if (typeof now === 'function') {
            now = now();
        }
        return this.moment(now).stripZone();
    };
    // Produces a human-readable string for the given duration.
    // Side-effect: changes the locale of the given duration.
    Calendar.prototype.humanizeDuration = function (duration) {
        return duration.locale(this.opt('locale')).humanize();
    };
    // will return `null` if invalid range
    Calendar.prototype.parseUnzonedRange = function (rangeInput) {
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
        return new UnzonedRange_1.default(start, end);
    };
    // Event-Date Utilities
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.initEventManager = function () {
        var _this = this;
        var eventManager = new EventManager_1.default(this);
        var rawSources = this.opt('eventSources') || [];
        var singleRawSource = this.opt('events');
        this.eventManager = eventManager;
        if (singleRawSource) {
            rawSources.unshift(singleRawSource);
        }
        eventManager.on('release', function (eventsPayload) {
            _this.trigger('eventsReset', eventsPayload);
        });
        eventManager.freeze();
        rawSources.forEach(function (rawSource) {
            var source = EventSourceParser_1.default.parse(rawSource, _this);
            if (source) {
                eventManager.addSource(source);
            }
        });
        eventManager.thaw();
    };
    Calendar.prototype.requestEvents = function (start, end) {
        return this.eventManager.requestEvents(start, end, this.opt('timezone'), !this.opt('lazyFetching'));
    };
    // Get an event's normalized end date. If not present, calculate it from the defaults.
    Calendar.prototype.getEventEnd = function (event) {
        if (event.end) {
            return event.end.clone();
        }
        else {
            return this.getDefaultEventEnd(event.allDay, event.start);
        }
    };
    // Given an event's allDay status and start date, return what its fallback end date should be.
    // TODO: rename to computeDefaultEventEnd
    Calendar.prototype.getDefaultEventEnd = function (allDay, zonedStart) {
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
    };
    // Public Events API
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.rerenderEvents = function () {
        this.view.flash('displayingEvents');
    };
    Calendar.prototype.refetchEvents = function () {
        this.eventManager.refetchAllSources();
    };
    Calendar.prototype.renderEvents = function (eventInputs, isSticky) {
        this.eventManager.freeze();
        for (var i = 0; i < eventInputs.length; i++) {
            this.renderEvent(eventInputs[i], isSticky);
        }
        this.eventManager.thaw();
    };
    Calendar.prototype.renderEvent = function (eventInput, isSticky) {
        if (isSticky === void 0) { isSticky = false; }
        var eventManager = this.eventManager;
        var eventDef = EventDefParser_1.default.parse(eventInput, eventInput.source || eventManager.stickySource);
        if (eventDef) {
            eventManager.addEventDef(eventDef, isSticky);
        }
    };
    // legacyQuery operates on legacy event instance objects
    Calendar.prototype.removeEvents = function (legacyQuery) {
        var eventManager = this.eventManager;
        var legacyInstances = [];
        var idMap = {};
        var eventDef;
        var i;
        if (legacyQuery == null) {
            eventManager.removeAllEventDefs(); // persist=true
        }
        else {
            eventManager.getEventInstances().forEach(function (eventInstance) {
                legacyInstances.push(eventInstance.toLegacy());
            });
            legacyInstances = filterLegacyEventInstances(legacyInstances, legacyQuery);
            // compute unique IDs
            for (i = 0; i < legacyInstances.length; i++) {
                eventDef = this.eventManager.getEventDefByUid(legacyInstances[i]._id);
                idMap[eventDef.id] = true;
            }
            eventManager.freeze();
            for (i in idMap) {
                eventManager.removeEventDefsById(i); // persist=true
            }
            eventManager.thaw();
        }
    };
    // legacyQuery operates on legacy event instance objects
    Calendar.prototype.clientEvents = function (legacyQuery) {
        var legacyEventInstances = [];
        this.eventManager.getEventInstances().forEach(function (eventInstance) {
            legacyEventInstances.push(eventInstance.toLegacy());
        });
        return filterLegacyEventInstances(legacyEventInstances, legacyQuery);
    };
    Calendar.prototype.updateEvents = function (eventPropsArray) {
        this.eventManager.freeze();
        for (var i = 0; i < eventPropsArray.length; i++) {
            this.updateEvent(eventPropsArray[i]);
        }
        this.eventManager.thaw();
    };
    Calendar.prototype.updateEvent = function (eventProps) {
        var eventDef = this.eventManager.getEventDefByUid(eventProps._id);
        var eventInstance;
        var eventDefMutation;
        if (eventDef instanceof SingleEventDef_1.default) {
            eventInstance = eventDef.buildInstance();
            eventDefMutation = EventDefMutation_1.default.createFromRawProps(eventInstance, eventProps, // raw props
            null // largeUnit -- who uses it?
            );
            this.eventManager.mutateEventsWithId(eventDef.id, eventDefMutation); // will release
        }
    };
    // Public Event Sources API
    // ------------------------------------------------------------------------------------
    Calendar.prototype.getEventSources = function () {
        return this.eventManager.otherSources.slice(); // clone
    };
    Calendar.prototype.getEventSourceById = function (id) {
        return this.eventManager.getSourceById(EventSource_1.default.normalizeId(id));
    };
    Calendar.prototype.addEventSource = function (sourceInput) {
        var source = EventSourceParser_1.default.parse(sourceInput, this);
        if (source) {
            this.eventManager.addSource(source);
        }
    };
    Calendar.prototype.removeEventSources = function (sourceMultiQuery) {
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
    };
    Calendar.prototype.removeEventSource = function (sourceQuery) {
        var eventManager = this.eventManager;
        var sources = eventManager.querySources(sourceQuery);
        var i;
        eventManager.freeze();
        for (i = 0; i < sources.length; i++) {
            eventManager.removeSource(sources[i]);
        }
        eventManager.thaw();
    };
    Calendar.prototype.refetchEventSources = function (sourceMultiQuery) {
        var eventManager = this.eventManager;
        var sources = eventManager.multiQuerySources(sourceMultiQuery);
        var i;
        eventManager.freeze();
        for (i = 0; i < sources.length; i++) {
            eventManager.refetchSource(sources[i]);
        }
        eventManager.thaw();
    };
    // not for internal use. use options module directly instead.
    Calendar.defaults = options_1.globalDefaults;
    Calendar.englishDefaults = options_1.englishDefaults;
    Calendar.rtlDefaults = options_1.rtlDefaults;
    return Calendar;
}());
exports.default = Calendar;
EmitterMixin_1.default.mixInto(Calendar);
ListenerMixin_1.default.mixInto(Calendar);
function filterLegacyEventInstances(legacyEventInstances, legacyQuery) {
    if (legacyQuery == null) {
        return legacyEventInstances;
    }
    else if ($.isFunction(legacyQuery)) {
        return legacyEventInstances.filter(legacyQuery);
    }
    else {
        legacyQuery += ''; // normalize to string
        return legacyEventInstances.filter(function (legacyEventInstance) {
            // soft comparison because id not be normalized to string
            // tslint:disable-next-line
            return legacyEventInstance.id == legacyQuery ||
                legacyEventInstance._id === legacyQuery; // can specify internal id, but must exactly match
        });
    }
}


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var UnzonedRange_1 = __webpack_require__(5);
var DateProfileGenerator = /** @class */ (function () {
    function DateProfileGenerator(_view) {
        this._view = _view;
    }
    DateProfileGenerator.prototype.opt = function (name) {
        return this._view.opt(name);
    };
    DateProfileGenerator.prototype.trimHiddenDays = function (unzonedRange) {
        return this._view.trimHiddenDays(unzonedRange);
    };
    DateProfileGenerator.prototype.msToUtcMoment = function (ms, forceAllDay) {
        return this._view.calendar.msToUtcMoment(ms, forceAllDay);
    };
    /* Date Range Computation
    ------------------------------------------------------------------------------------------------------------------*/
    // Builds a structure with info about what the dates/ranges will be for the "prev" view.
    DateProfileGenerator.prototype.buildPrev = function (currentDateProfile) {
        var prevDate = currentDateProfile.date.clone()
            .startOf(currentDateProfile.currentRangeUnit)
            .subtract(currentDateProfile.dateIncrement);
        return this.build(prevDate, -1);
    };
    // Builds a structure with info about what the dates/ranges will be for the "next" view.
    DateProfileGenerator.prototype.buildNext = function (currentDateProfile) {
        var nextDate = currentDateProfile.date.clone()
            .startOf(currentDateProfile.currentRangeUnit)
            .add(currentDateProfile.dateIncrement);
        return this.build(nextDate, 1);
    };
    // Builds a structure holding dates/ranges for rendering around the given date.
    // Optional direction param indicates whether the date is being incremented/decremented
    // from its previous value. decremented = -1, incremented = 1 (default).
    DateProfileGenerator.prototype.build = function (date, direction, forceToValid) {
        if (forceToValid === void 0) { forceToValid = false; }
        var isDateAllDay = !date.hasTime();
        var validUnzonedRange;
        var minTime = null;
        var maxTime = null;
        var currentInfo;
        var isRangeAllDay;
        var renderUnzonedRange;
        var activeUnzonedRange;
        var isValid;
        validUnzonedRange = this.buildValidRange();
        validUnzonedRange = this.trimHiddenDays(validUnzonedRange);
        if (forceToValid) {
            date = this.msToUtcMoment(validUnzonedRange.constrainDate(date), // returns MS
            isDateAllDay);
        }
        currentInfo = this.buildCurrentRangeInfo(date, direction);
        isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
        renderUnzonedRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.unzonedRange), currentInfo.unit, isRangeAllDay);
        renderUnzonedRange = this.trimHiddenDays(renderUnzonedRange);
        activeUnzonedRange = renderUnzonedRange.clone();
        if (!this.opt('showNonCurrentDates')) {
            activeUnzonedRange = activeUnzonedRange.intersect(currentInfo.unzonedRange);
        }
        minTime = moment.duration(this.opt('minTime'));
        maxTime = moment.duration(this.opt('maxTime'));
        activeUnzonedRange = this.adjustActiveRange(activeUnzonedRange, minTime, maxTime);
        activeUnzonedRange = activeUnzonedRange.intersect(validUnzonedRange); // might return null
        if (activeUnzonedRange) {
            date = this.msToUtcMoment(activeUnzonedRange.constrainDate(date), // returns MS
            isDateAllDay);
        }
        // it's invalid if the originally requested date is not contained,
        // or if the range is completely outside of the valid range.
        isValid = currentInfo.unzonedRange.intersectsWith(validUnzonedRange);
        return {
            // constraint for where prev/next operations can go and where events can be dragged/resized to.
            // an object with optional start and end properties.
            validUnzonedRange: validUnzonedRange,
            // range the view is formally responsible for.
            // for example, a month view might have 1st-31st, excluding padded dates
            currentUnzonedRange: currentInfo.unzonedRange,
            // name of largest unit being displayed, like "month" or "week"
            currentRangeUnit: currentInfo.unit,
            isRangeAllDay: isRangeAllDay,
            // dates that display events and accept drag-n-drop
            // will be `null` if no dates accept events
            activeUnzonedRange: activeUnzonedRange,
            // date range with a rendered skeleton
            // includes not-active days that need some sort of DOM
            renderUnzonedRange: renderUnzonedRange,
            // Duration object that denotes the first visible time of any given day
            minTime: minTime,
            // Duration object that denotes the exclusive visible end time of any given day
            maxTime: maxTime,
            isValid: isValid,
            date: date,
            // how far the current date will move for a prev/next operation
            dateIncrement: this.buildDateIncrement(currentInfo.duration)
            // pass a fallback (might be null) ^
        };
    };
    // Builds an object with optional start/end properties.
    // Indicates the minimum/maximum dates to display.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildValidRange = function () {
        return this._view.getUnzonedRangeOption('validRange', this._view.calendar.getNow()) ||
            new UnzonedRange_1.default(); // completely open-ended
    };
    // Builds a structure with info about the "current" range, the range that is
    // highlighted as being the current month for example.
    // See build() for a description of `direction`.
    // Guaranteed to have `range` and `unit` properties. `duration` is optional.
    // TODO: accept a MS-time instead of a moment `date`?
    DateProfileGenerator.prototype.buildCurrentRangeInfo = function (date, direction) {
        var viewSpec = this._view.viewSpec;
        var duration = null;
        var unit = null;
        var unzonedRange = null;
        var dayCount;
        if (viewSpec.duration) {
            duration = viewSpec.duration;
            unit = viewSpec.durationUnit;
            unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
        }
        else if ((dayCount = this.opt('dayCount'))) {
            unit = 'day';
            unzonedRange = this.buildRangeFromDayCount(date, direction, dayCount);
        }
        else if ((unzonedRange = this.buildCustomVisibleRange(date))) {
            unit = util_1.computeGreatestUnit(unzonedRange.getStart(), unzonedRange.getEnd());
        }
        else {
            duration = this.getFallbackDuration();
            unit = util_1.computeGreatestUnit(duration);
            unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
        }
        return { duration: duration, unit: unit, unzonedRange: unzonedRange };
    };
    DateProfileGenerator.prototype.getFallbackDuration = function () {
        return moment.duration({ days: 1 });
    };
    // Returns a new activeUnzonedRange to have time values (un-ambiguate)
    // minTime or maxTime causes the range to expand.
    DateProfileGenerator.prototype.adjustActiveRange = function (unzonedRange, minTime, maxTime) {
        var start = unzonedRange.getStart();
        var end = unzonedRange.getEnd();
        if (this._view.usesMinMaxTime) {
            if (minTime < 0) {
                start.time(0).add(minTime);
            }
            if (maxTime > 24 * 60 * 60 * 1000) {
                end.time(maxTime - (24 * 60 * 60 * 1000));
            }
        }
        return new UnzonedRange_1.default(start, end);
    };
    // Builds the "current" range when it is specified as an explicit duration.
    // `unit` is the already-computed computeGreatestUnit value of duration.
    // TODO: accept a MS-time instead of a moment `date`?
    DateProfileGenerator.prototype.buildRangeFromDuration = function (date, direction, duration, unit) {
        var alignment = this.opt('dateAlignment');
        var dateIncrementInput;
        var dateIncrementDuration;
        var start;
        var end;
        var res;
        // compute what the alignment should be
        if (!alignment) {
            dateIncrementInput = this.opt('dateIncrement');
            if (dateIncrementInput) {
                dateIncrementDuration = moment.duration(dateIncrementInput);
                // use the smaller of the two units
                if (dateIncrementDuration < duration) {
                    alignment = util_1.computeDurationGreatestUnit(dateIncrementDuration, dateIncrementInput);
                }
                else {
                    alignment = unit;
                }
            }
            else {
                alignment = unit;
            }
        }
        // if the view displays a single day or smaller
        if (duration.as('days') <= 1) {
            if (this._view.isHiddenDay(start)) {
                start = this._view.skipHiddenDays(start, direction);
                start.startOf('day');
            }
        }
        function computeRes() {
            start = date.clone().startOf(alignment);
            end = start.clone().add(duration);
            res = new UnzonedRange_1.default(start, end);
        }
        computeRes();
        // if range is completely enveloped by hidden days, go past the hidden days
        if (!this.trimHiddenDays(res)) {
            date = this._view.skipHiddenDays(date, direction);
            computeRes();
        }
        return res;
    };
    // Builds the "current" range when a dayCount is specified.
    // TODO: accept a MS-time instead of a moment `date`?
    DateProfileGenerator.prototype.buildRangeFromDayCount = function (date, direction, dayCount) {
        var customAlignment = this.opt('dateAlignment');
        var runningCount = 0;
        var start = date.clone();
        var end;
        if (customAlignment) {
            start.startOf(customAlignment);
        }
        start.startOf('day');
        start = this._view.skipHiddenDays(start, direction);
        end = start.clone();
        do {
            end.add(1, 'day');
            if (!this._view.isHiddenDay(end)) {
                runningCount++;
            }
        } while (runningCount < dayCount);
        return new UnzonedRange_1.default(start, end);
    };
    // Builds a normalized range object for the "visible" range,
    // which is a way to define the currentUnzonedRange and activeUnzonedRange at the same time.
    // TODO: accept a MS-time instead of a moment `date`?
    DateProfileGenerator.prototype.buildCustomVisibleRange = function (date) {
        var visibleUnzonedRange = this._view.getUnzonedRangeOption('visibleRange', this._view.calendar.applyTimezone(date) // correct zone. also generates new obj that avoids mutations
        );
        if (visibleUnzonedRange && (visibleUnzonedRange.startMs == null || visibleUnzonedRange.endMs == null)) {
            return null;
        }
        return visibleUnzonedRange;
    };
    // Computes the range that will represent the element/cells for *rendering*,
    // but which may have voided days/times.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildRenderRange = function (currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
        return currentUnzonedRange.clone();
    };
    // Compute the duration value that should be added/substracted to the current date
    // when a prev/next operation happens.
    DateProfileGenerator.prototype.buildDateIncrement = function (fallback) {
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
    };
    return DateProfileGenerator;
}());
exports.default = DateProfileGenerator;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var exportHooks = __webpack_require__(16);
var util_1 = __webpack_require__(4);
var moment_ext_1 = __webpack_require__(10);
var ListenerMixin_1 = __webpack_require__(7);
var HitDragListener_1 = __webpack_require__(22);
var SingleEventDef_1 = __webpack_require__(13);
var EventInstanceGroup_1 = __webpack_require__(18);
var EventSource_1 = __webpack_require__(6);
var Interaction_1 = __webpack_require__(15);
var ExternalDropping = /** @class */ (function (_super) {
    tslib_1.__extends(ExternalDropping, _super);
    function ExternalDropping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDragging = false; // jqui-dragging an external element? boolean
        return _this;
    }
    /*
    component impements:
      - eventRangesToEventFootprints
      - isEventInstanceGroupAllowed
      - isExternalInstanceGroupAllowed
      - renderDrag
      - unrenderDrag
    */
    ExternalDropping.prototype.end = function () {
        if (this.dragListener) {
            this.dragListener.endInteraction();
        }
    };
    ExternalDropping.prototype.bindToDocument = function () {
        this.listenTo($(document), {
            dragstart: this.handleDragStart,
            sortstart: this.handleDragStart // jqui
        });
    };
    ExternalDropping.prototype.unbindFromDocument = function () {
        this.stopListeningTo($(document));
    };
    // Called when a jQuery UI drag is initiated anywhere in the DOM
    ExternalDropping.prototype.handleDragStart = function (ev, ui) {
        var el;
        var accept;
        if (this.opt('droppable')) {
            el = $((ui ? ui.item : null) || ev.target);
            // Test that the dragged element passes the dropAccept selector or filter function.
            // FYI, the default is "*" (matches all)
            accept = this.opt('dropAccept');
            if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
                if (!this.isDragging) {
                    this.listenToExternalDrag(el, ev, ui);
                }
            }
        }
    };
    // Called when a jQuery UI drag starts and it needs to be monitored for dropping
    ExternalDropping.prototype.listenToExternalDrag = function (el, ev, ui) {
        var _this = this;
        var component = this.component;
        var view = this.view;
        var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
        var singleEventDef; // a null value signals an unsuccessful drag
        // listener that tracks mouse movement over date-associated pixel regions
        var dragListener = this.dragListener = new HitDragListener_1.default(component, {
            interactionStart: function () {
                _this.isDragging = true;
            },
            hitOver: function (hit) {
                var isAllowed = true;
                var hitFootprint = hit.component.getSafeHitFootprint(hit); // hit might not belong to this grid
                var mutatedEventInstanceGroup;
                if (hitFootprint) {
                    singleEventDef = _this.computeExternalDrop(hitFootprint, meta);
                    if (singleEventDef) {
                        mutatedEventInstanceGroup = new EventInstanceGroup_1.default(singleEventDef.buildInstances());
                        isAllowed = meta.eventProps ? // isEvent?
                            component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup) :
                            component.isExternalInstanceGroupAllowed(mutatedEventInstanceGroup);
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
                    util_1.disableCursor();
                }
                if (singleEventDef) {
                    component.renderDrag(// called without a seg parameter
                    component.eventRangesToEventFootprints(mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, view.calendar)));
                }
            },
            hitOut: function () {
                singleEventDef = null; // signal unsuccessful
            },
            hitDone: function () {
                util_1.enableCursor();
                component.unrenderDrag();
            },
            interactionEnd: function (ev) {
                if (singleEventDef) {
                    view.reportExternalDrop(singleEventDef, Boolean(meta.eventProps), // isEvent
                    Boolean(meta.stick), // isSticky
                    el, ev, ui);
                }
                _this.isDragging = false;
                _this.dragListener = null;
            }
        });
        dragListener.startDrag(ev); // start listening immediately
    };
    // Given a hit to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
    // returns the zoned start/end dates for the event that would result from the hypothetical drop. end might be null.
    // Returning a null value signals an invalid drop hit.
    // DOES NOT consider overlap/constraint.
    // Assumes both footprints are non-open-ended.
    ExternalDropping.prototype.computeExternalDrop = function (componentFootprint, meta) {
        var calendar = this.view.calendar;
        var start = moment_ext_1.default.utc(componentFootprint.unzonedRange.startMs).stripZone();
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
        eventDef = SingleEventDef_1.default.parse($.extend({}, meta.eventProps, {
            start: start,
            end: end
        }), new EventSource_1.default(calendar));
        return eventDef;
    };
    return ExternalDropping;
}(Interaction_1.default));
exports.default = ExternalDropping;
ListenerMixin_1.default.mixInto(ExternalDropping);
/* External-Dragging-Element Data
----------------------------------------------------------------------------------------------------------------------*/
// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
exportHooks.dataAttrPrefix = '';
// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
    var prefix = exportHooks.dataAttrPrefix;
    var eventProps; // properties for creating the event, not related to date/time
    var startTime; // a Duration
    var duration;
    var stick;
    if (prefix) {
        prefix += '-';
    }
    eventProps = el.data(prefix + 'event') || null;
    if (eventProps) {
        if (typeof eventProps === 'object') {
            eventProps = $.extend({}, eventProps); // make a copy
        }
        else {
            eventProps = {};
        }
        // pluck special-cased date/time properties
        startTime = eventProps.start;
        if (startTime == null) {
            startTime = eventProps.time;
        } // accept 'time' as well
        duration = eventProps.duration;
        stick = eventProps.stick;
        delete eventProps.start;
        delete eventProps.time;
        delete eventProps.duration;
        delete eventProps.stick;
    }
    // fallback to standalone attribute values for each of the date/time properties
    if (startTime == null) {
        startTime = el.data(prefix + 'start');
    }
    if (startTime == null) {
        startTime = el.data(prefix + 'time');
    } // accept 'time' as well
    if (duration == null) {
        duration = el.data(prefix + 'duration');
    }
    if (stick == null) {
        stick = el.data(prefix + 'stick');
    }
    // massage into correct data types
    startTime = startTime != null ? moment.duration(startTime) : null;
    duration = duration != null ? moment.duration(duration) : null;
    stick = Boolean(stick);
    return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var EventDefMutation_1 = __webpack_require__(36);
var EventDefDateMutation_1 = __webpack_require__(50);
var HitDragListener_1 = __webpack_require__(22);
var Interaction_1 = __webpack_require__(15);
var EventResizing = /** @class */ (function (_super) {
    tslib_1.__extends(EventResizing, _super);
    /*
    component impements:
      - bindSegHandlerToEl
      - publiclyTrigger
      - diffDates
      - eventRangesToEventFootprints
      - isEventInstanceGroupAllowed
      - getSafeHitFootprint
    */
    function EventResizing(component, eventPointing) {
        var _this = _super.call(this, component) || this;
        _this.isResizing = false;
        _this.eventPointing = eventPointing;
        return _this;
    }
    EventResizing.prototype.end = function () {
        if (this.dragListener) {
            this.dragListener.endInteraction();
        }
    };
    EventResizing.prototype.bindToEl = function (el) {
        var component = this.component;
        component.bindSegHandlerToEl(el, 'mousedown', this.handleMouseDown.bind(this));
        component.bindSegHandlerToEl(el, 'touchstart', this.handleTouchStart.bind(this));
    };
    EventResizing.prototype.handleMouseDown = function (seg, ev) {
        if (this.component.canStartResize(seg, ev)) {
            this.buildDragListener(seg, $(ev.target).is('.fc-start-resizer'))
                .startInteraction(ev, { distance: 5 });
        }
    };
    EventResizing.prototype.handleTouchStart = function (seg, ev) {
        if (this.component.canStartResize(seg, ev)) {
            this.buildDragListener(seg, $(ev.target).is('.fc-start-resizer'))
                .startInteraction(ev);
        }
    };
    // Creates a listener that tracks the user as they resize an event segment.
    // Generic enough to work with any type of Grid.
    EventResizing.prototype.buildDragListener = function (seg, isStart) {
        var _this = this;
        var component = this.component;
        var view = this.view;
        var calendar = view.calendar;
        var eventManager = calendar.eventManager;
        var el = seg.el;
        var eventDef = seg.footprint.eventDef;
        var eventInstance = seg.footprint.eventInstance;
        var isDragging;
        var resizeMutation; // zoned event date properties. falsy if invalid resize
        // Tracks mouse movement over the *grid's* coordinate map
        var dragListener = this.dragListener = new HitDragListener_1.default(component, {
            scroll: this.opt('dragScroll'),
            subjectEl: el,
            interactionStart: function () {
                isDragging = false;
            },
            dragStart: function (ev) {
                isDragging = true;
                // ensure a mouseout on the manipulated event has been reported
                _this.eventPointing.handleMouseout(seg, ev);
                _this.segResizeStart(seg, ev);
            },
            hitOver: function (hit, isOrig, origHit) {
                var isAllowed = true;
                var origHitFootprint = component.getSafeHitFootprint(origHit);
                var hitFootprint = component.getSafeHitFootprint(hit);
                var mutatedEventInstanceGroup;
                if (origHitFootprint && hitFootprint) {
                    resizeMutation = isStart ?
                        _this.computeEventStartResizeMutation(origHitFootprint, hitFootprint, seg.footprint) :
                        _this.computeEventEndResizeMutation(origHitFootprint, hitFootprint, seg.footprint);
                    if (resizeMutation) {
                        mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(eventDef.id, resizeMutation);
                        isAllowed = component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
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
                    util_1.disableCursor();
                }
                else if (resizeMutation.isEmpty()) {
                    // no change. (FYI, event dates might have zones)
                    resizeMutation = null;
                }
                if (resizeMutation) {
                    view.hideEventsWithId(seg.footprint.eventDef.id);
                    view.renderEventResize(component.eventRangesToEventFootprints(mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, calendar)), seg);
                }
            },
            hitOut: function () {
                resizeMutation = null;
            },
            hitDone: function () {
                view.unrenderEventResize(seg);
                view.showEventsWithId(seg.footprint.eventDef.id);
                util_1.enableCursor();
            },
            interactionEnd: function (ev) {
                if (isDragging) {
                    _this.segResizeStop(seg, ev);
                }
                if (resizeMutation) {
                    // no need to re-show original, will rerender all anyways. esp important if eventRenderWait
                    view.reportEventResize(eventInstance, resizeMutation, el, ev);
                }
                _this.dragListener = null;
            }
        });
        return dragListener;
    };
    // Called before event segment resizing starts
    EventResizing.prototype.segResizeStart = function (seg, ev) {
        this.isResizing = true;
        this.component.publiclyTrigger('eventResizeStart', {
            context: seg.el[0],
            args: [
                seg.footprint.getEventLegacy(),
                ev,
                {},
                this.view
            ]
        });
    };
    // Called after event segment resizing stops
    EventResizing.prototype.segResizeStop = function (seg, ev) {
        this.isResizing = false;
        this.component.publiclyTrigger('eventResizeStop', {
            context: seg.el[0],
            args: [
                seg.footprint.getEventLegacy(),
                ev,
                {},
                this.view
            ]
        });
    };
    // Returns new date-information for an event segment being resized from its start
    EventResizing.prototype.computeEventStartResizeMutation = function (startFootprint, endFootprint, origEventFootprint) {
        var origRange = origEventFootprint.componentFootprint.unzonedRange;
        var startDelta = this.component.diffDates(endFootprint.unzonedRange.getStart(), startFootprint.unzonedRange.getStart());
        var dateMutation;
        var eventDefMutation;
        if (origRange.getStart().add(startDelta) < origRange.getEnd()) {
            dateMutation = new EventDefDateMutation_1.default();
            dateMutation.setStartDelta(startDelta);
            eventDefMutation = new EventDefMutation_1.default();
            eventDefMutation.setDateMutation(dateMutation);
            return eventDefMutation;
        }
        return false;
    };
    // Returns new date-information for an event segment being resized from its end
    EventResizing.prototype.computeEventEndResizeMutation = function (startFootprint, endFootprint, origEventFootprint) {
        var origRange = origEventFootprint.componentFootprint.unzonedRange;
        var endDelta = this.component.diffDates(endFootprint.unzonedRange.getEnd(), startFootprint.unzonedRange.getEnd());
        var dateMutation;
        var eventDefMutation;
        if (origRange.getEnd().add(endDelta) > origRange.getStart()) {
            dateMutation = new EventDefDateMutation_1.default();
            dateMutation.setEndDelta(endDelta);
            eventDefMutation = new EventDefMutation_1.default();
            eventDefMutation.setDateMutation(dateMutation);
            return eventDefMutation;
        }
        return false;
    };
    return EventResizing;
}(Interaction_1.default));
exports.default = EventResizing;


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var EventDefMutation_1 = __webpack_require__(36);
var EventDefDateMutation_1 = __webpack_require__(50);
var DragListener_1 = __webpack_require__(54);
var HitDragListener_1 = __webpack_require__(22);
var MouseFollower_1 = __webpack_require__(244);
var Interaction_1 = __webpack_require__(15);
var EventDragging = /** @class */ (function (_super) {
    tslib_1.__extends(EventDragging, _super);
    /*
    component implements:
      - bindSegHandlerToEl
      - publiclyTrigger
      - diffDates
      - eventRangesToEventFootprints
      - isEventInstanceGroupAllowed
    */
    function EventDragging(component, eventPointing) {
        var _this = _super.call(this, component) || this;
        _this.isDragging = false;
        _this.eventPointing = eventPointing;
        return _this;
    }
    EventDragging.prototype.end = function () {
        if (this.dragListener) {
            this.dragListener.endInteraction();
        }
    };
    EventDragging.prototype.getSelectionDelay = function () {
        var delay = this.opt('eventLongPressDelay');
        if (delay == null) {
            delay = this.opt('longPressDelay'); // fallback
        }
        return delay;
    };
    EventDragging.prototype.bindToEl = function (el) {
        var component = this.component;
        component.bindSegHandlerToEl(el, 'mousedown', this.handleMousedown.bind(this));
        component.bindSegHandlerToEl(el, 'touchstart', this.handleTouchStart.bind(this));
    };
    EventDragging.prototype.handleMousedown = function (seg, ev) {
        if (!this.component.shouldIgnoreMouse() &&
            this.component.canStartDrag(seg, ev)) {
            this.buildDragListener(seg).startInteraction(ev, { distance: 5 });
        }
    };
    EventDragging.prototype.handleTouchStart = function (seg, ev) {
        var component = this.component;
        var settings = {
            delay: this.view.isEventDefSelected(seg.footprint.eventDef) ? // already selected?
                0 : this.getSelectionDelay()
        };
        if (component.canStartDrag(seg, ev)) {
            this.buildDragListener(seg).startInteraction(ev, settings);
        }
        else if (component.canStartSelection(seg, ev)) {
            this.buildSelectListener(seg).startInteraction(ev, settings);
        }
    };
    // seg isn't draggable, but let's use a generic DragListener
    // simply for the delay, so it can be selected.
    // Has side effect of setting/unsetting `dragListener`
    EventDragging.prototype.buildSelectListener = function (seg) {
        var _this = this;
        var view = this.view;
        var eventDef = seg.footprint.eventDef;
        var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
        if (this.dragListener) {
            return this.dragListener;
        }
        var dragListener = this.dragListener = new DragListener_1.default({
            dragStart: function (ev) {
                if (dragListener.isTouch &&
                    !view.isEventDefSelected(eventDef) &&
                    eventInstance) {
                    // if not previously selected, will fire after a delay. then, select the event
                    view.selectEventInstance(eventInstance);
                }
            },
            interactionEnd: function (ev) {
                _this.dragListener = null;
            }
        });
        return dragListener;
    };
    // Builds a listener that will track user-dragging on an event segment.
    // Generic enough to work with any type of Grid.
    // Has side effect of setting/unsetting `dragListener`
    EventDragging.prototype.buildDragListener = function (seg) {
        var _this = this;
        var component = this.component;
        var view = this.view;
        var calendar = view.calendar;
        var eventManager = calendar.eventManager;
        var el = seg.el;
        var eventDef = seg.footprint.eventDef;
        var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
        var isDragging;
        var mouseFollower; // A clone of the original element that will move with the mouse
        var eventDefMutation;
        if (this.dragListener) {
            return this.dragListener;
        }
        // Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
        // of the view.
        var dragListener = this.dragListener = new HitDragListener_1.default(view, {
            scroll: this.opt('dragScroll'),
            subjectEl: el,
            subjectCenter: true,
            interactionStart: function (ev) {
                seg.component = component; // for renderDrag
                isDragging = false;
                mouseFollower = new MouseFollower_1.default(seg.el, {
                    additionalClass: 'fc-dragging',
                    parentEl: view.el,
                    opacity: dragListener.isTouch ? null : _this.opt('dragOpacity'),
                    revertDuration: _this.opt('dragRevertDuration'),
                    zIndex: 2 // one above the .fc-view
                });
                mouseFollower.hide(); // don't show until we know this is a real drag
                mouseFollower.start(ev);
            },
            dragStart: function (ev) {
                if (dragListener.isTouch &&
                    !view.isEventDefSelected(eventDef) &&
                    eventInstance) {
                    // if not previously selected, will fire after a delay. then, select the event
                    view.selectEventInstance(eventInstance);
                }
                isDragging = true;
                // ensure a mouseout on the manipulated event has been reported
                _this.eventPointing.handleMouseout(seg, ev);
                _this.segDragStart(seg, ev);
                view.hideEventsWithId(seg.footprint.eventDef.id);
            },
            hitOver: function (hit, isOrig, origHit) {
                var isAllowed = true;
                var origFootprint;
                var footprint;
                var mutatedEventInstanceGroup;
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
                        mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(eventDef.id, eventDefMutation);
                        isAllowed = component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
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
                    util_1.disableCursor();
                }
                // if a valid drop location, have the subclass render a visual indication
                if (eventDefMutation &&
                    view.renderDrag(// truthy if rendered something
                    component.eventRangesToEventFootprints(mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, calendar)), seg, dragListener.isTouch)) {
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
            hitOut: function () {
                view.unrenderDrag(seg); // unrender whatever was done in renderDrag
                mouseFollower.show(); // show in case we are moving out of all hits
                eventDefMutation = null;
            },
            hitDone: function () {
                util_1.enableCursor();
            },
            interactionEnd: function (ev) {
                delete seg.component; // prevent side effects
                // do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
                mouseFollower.stop(!eventDefMutation, function () {
                    if (isDragging) {
                        view.unrenderDrag(seg);
                        _this.segDragStop(seg, ev);
                    }
                    view.showEventsWithId(seg.footprint.eventDef.id);
                    if (eventDefMutation) {
                        // no need to re-show original, will rerender all anyways. esp important if eventRenderWait
                        view.reportEventDrop(eventInstance, eventDefMutation, el, ev);
                    }
                });
                _this.dragListener = null;
            }
        });
        return dragListener;
    };
    // Called before event segment dragging starts
    EventDragging.prototype.segDragStart = function (seg, ev) {
        this.isDragging = true;
        this.component.publiclyTrigger('eventDragStart', {
            context: seg.el[0],
            args: [
                seg.footprint.getEventLegacy(),
                ev,
                {},
                this.view
            ]
        });
    };
    // Called after event segment dragging stops
    EventDragging.prototype.segDragStop = function (seg, ev) {
        this.isDragging = false;
        this.component.publiclyTrigger('eventDragStop', {
            context: seg.el[0],
            args: [
                seg.footprint.getEventLegacy(),
                ev,
                {},
                this.view
            ]
        });
    };
    // DOES NOT consider overlap/constraint
    EventDragging.prototype.computeEventDropMutation = function (startFootprint, endFootprint, eventDef) {
        var eventDefMutation = new EventDefMutation_1.default();
        eventDefMutation.setDateMutation(this.computeEventDateMutation(startFootprint, endFootprint));
        return eventDefMutation;
    };
    EventDragging.prototype.computeEventDateMutation = function (startFootprint, endFootprint) {
        var date0 = startFootprint.unzonedRange.getStart();
        var date1 = endFootprint.unzonedRange.getStart();
        var clearEnd = false;
        var forceTimed = false;
        var forceAllDay = false;
        var dateDelta;
        var dateMutation;
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
        dateDelta = this.component.diffDates(date1, date0);
        dateMutation = new EventDefDateMutation_1.default();
        dateMutation.clearEnd = clearEnd;
        dateMutation.forceTimed = forceTimed;
        dateMutation.forceAllDay = forceAllDay;
        dateMutation.setDateDelta(dateDelta);
        return dateMutation;
    };
    return EventDragging;
}(Interaction_1.default));
exports.default = EventDragging;


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var HitDragListener_1 = __webpack_require__(22);
var ComponentFootprint_1 = __webpack_require__(12);
var UnzonedRange_1 = __webpack_require__(5);
var Interaction_1 = __webpack_require__(15);
var DateSelecting = /** @class */ (function (_super) {
    tslib_1.__extends(DateSelecting, _super);
    /*
    component must implement:
      - bindDateHandlerToEl
      - getSafeHitFootprint
      - renderHighlight
      - unrenderHighlight
    */
    function DateSelecting(component) {
        var _this = _super.call(this, component) || this;
        _this.dragListener = _this.buildDragListener();
        return _this;
    }
    DateSelecting.prototype.end = function () {
        this.dragListener.endInteraction();
    };
    DateSelecting.prototype.getDelay = function () {
        var delay = this.opt('selectLongPressDelay');
        if (delay == null) {
            delay = this.opt('longPressDelay'); // fallback
        }
        return delay;
    };
    DateSelecting.prototype.bindToEl = function (el) {
        var _this = this;
        var component = this.component;
        var dragListener = this.dragListener;
        component.bindDateHandlerToEl(el, 'mousedown', function (ev) {
            if (_this.opt('selectable') && !component.shouldIgnoreMouse()) {
                dragListener.startInteraction(ev, {
                    distance: _this.opt('selectMinDistance')
                });
            }
        });
        component.bindDateHandlerToEl(el, 'touchstart', function (ev) {
            if (_this.opt('selectable') && !component.shouldIgnoreTouch()) {
                dragListener.startInteraction(ev, {
                    delay: _this.getDelay()
                });
            }
        });
        util_1.preventSelection(el);
    };
    // Creates a listener that tracks the user's drag across day elements, for day selecting.
    DateSelecting.prototype.buildDragListener = function () {
        var _this = this;
        var component = this.component;
        var selectionFootprint; // null if invalid selection
        var dragListener = new HitDragListener_1.default(component, {
            scroll: this.opt('dragScroll'),
            interactionStart: function () {
                selectionFootprint = null;
            },
            dragStart: function (ev) {
                _this.view.unselect(ev); // since we could be rendering a new selection, we want to clear any old one
            },
            hitOver: function (hit, isOrig, origHit) {
                var origHitFootprint;
                var hitFootprint;
                if (origHit) {
                    origHitFootprint = component.getSafeHitFootprint(origHit);
                    hitFootprint = component.getSafeHitFootprint(hit);
                    if (origHitFootprint && hitFootprint) {
                        selectionFootprint = _this.computeSelection(origHitFootprint, hitFootprint);
                    }
                    else {
                        selectionFootprint = null;
                    }
                    if (selectionFootprint) {
                        component.renderSelectionFootprint(selectionFootprint);
                    }
                    else if (selectionFootprint === false) {
                        util_1.disableCursor();
                    }
                }
            },
            hitOut: function () {
                selectionFootprint = null;
                component.unrenderSelection();
            },
            hitDone: function () {
                util_1.enableCursor();
            },
            interactionEnd: function (ev, isCancelled) {
                if (!isCancelled && selectionFootprint) {
                    // the selection will already have been rendered. just report it
                    _this.view.reportSelection(selectionFootprint, ev);
                }
            }
        });
        return dragListener;
    };
    // Given the first and last date-spans of a selection, returns another date-span object.
    // Subclasses can override and provide additional data in the span object. Will be passed to renderSelectionFootprint().
    // Will return false if the selection is invalid and this should be indicated to the user.
    // Will return null/undefined if a selection invalid but no error should be reported.
    DateSelecting.prototype.computeSelection = function (footprint0, footprint1) {
        var wholeFootprint = this.computeSelectionFootprint(footprint0, footprint1);
        if (wholeFootprint && !this.isSelectionFootprintAllowed(wholeFootprint)) {
            return false;
        }
        return wholeFootprint;
    };
    // Given two spans, must return the combination of the two.
    // TODO: do this separation of concerns (combining VS validation) for event dnd/resize too.
    // Assumes both footprints are non-open-ended.
    DateSelecting.prototype.computeSelectionFootprint = function (footprint0, footprint1) {
        var ms = [
            footprint0.unzonedRange.startMs,
            footprint0.unzonedRange.endMs,
            footprint1.unzonedRange.startMs,
            footprint1.unzonedRange.endMs
        ];
        ms.sort(util_1.compareNumbers);
        return new ComponentFootprint_1.default(new UnzonedRange_1.default(ms[0], ms[3]), footprint0.isAllDay);
    };
    DateSelecting.prototype.isSelectionFootprintAllowed = function (componentFootprint) {
        return this.component.dateProfile.validUnzonedRange.containsRange(componentFootprint.unzonedRange) &&
            this.view.calendar.constraints.isSelectionFootprintAllowed(componentFootprint);
    };
    return DateSelecting;
}(Interaction_1.default));
exports.default = DateSelecting;


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Scroller_1 = __webpack_require__(39);
var View_1 = __webpack_require__(41);
var TimeGrid_1 = __webpack_require__(227);
var DayGrid_1 = __webpack_require__(61);
var AGENDA_ALL_DAY_EVENT_LIMIT = 5;
var agendaTimeGridMethods;
var agendaDayGridMethods;
/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.
var AgendaView = /** @class */ (function (_super) {
    tslib_1.__extends(AgendaView, _super);
    function AgendaView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.usesMinMaxTime = true; // indicates that minTime/maxTime affects rendering
        _this.timeGrid = _this.instantiateTimeGrid();
        _this.addChild(_this.timeGrid);
        if (_this.opt('allDaySlot')) {
            _this.dayGrid = _this.instantiateDayGrid(); // the all-day subcomponent of this view
            _this.addChild(_this.dayGrid);
        }
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }
    // Instantiates the TimeGrid object this view needs. Draws from this.timeGridClass
    AgendaView.prototype.instantiateTimeGrid = function () {
        var timeGrid = new this.timeGridClass(this);
        util_1.copyOwnProps(agendaTimeGridMethods, timeGrid);
        return timeGrid;
    };
    // Instantiates the DayGrid object this view might need. Draws from this.dayGridClass
    AgendaView.prototype.instantiateDayGrid = function () {
        var dayGrid = new this.dayGridClass(this);
        util_1.copyOwnProps(agendaDayGridMethods, dayGrid);
        return dayGrid;
    };
    /* Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    AgendaView.prototype.renderSkeleton = function () {
        var timeGridWrapEl;
        var timeGridEl;
        this.el.addClass('fc-agenda-view').html(this.renderSkeletonHtml());
        this.scroller.render();
        timeGridWrapEl = this.scroller.el.addClass('fc-time-grid-container');
        timeGridEl = $('<div class="fc-time-grid" />').appendTo(timeGridWrapEl);
        this.el.find('.fc-body > tr > td').append(timeGridWrapEl);
        this.timeGrid.headContainerEl = this.el.find('.fc-head-container');
        this.timeGrid.setElement(timeGridEl);
        if (this.dayGrid) {
            this.dayGrid.setElement(this.el.find('.fc-day-grid'));
            // have the day-grid extend it's coordinate area over the <hr> dividing the two grids
            this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
        }
    };
    AgendaView.prototype.unrenderSkeleton = function () {
        this.timeGrid.removeElement();
        if (this.dayGrid) {
            this.dayGrid.removeElement();
        }
        this.scroller.destroy();
    };
    // Builds the HTML skeleton for the view.
    // The day-grid and time-grid components will render inside containers defined by this HTML.
    AgendaView.prototype.renderSkeletonHtml = function () {
        var theme = this.calendar.theme;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (this.opt('columnHeader') ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '">' +
            (this.dayGrid ?
                '<div class="fc-day-grid"/>' +
                    '<hr class="fc-divider ' + theme.getClass('widgetHeader') + '"/>' :
                '') +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    // Generates an HTML attribute string for setting the width of the axis, if it is known
    AgendaView.prototype.axisStyleAttr = function () {
        if (this.axisWidth != null) {
            return 'style="width:' + this.axisWidth + 'px"';
        }
        return '';
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    AgendaView.prototype.getNowIndicatorUnit = function () {
        return this.timeGrid.getNowIndicatorUnit();
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    // Adjusts the vertical dimensions of the view to the specified values
    AgendaView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        var eventLimit;
        var scrollerHeight;
        var scrollbarWidths;
        _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        // make all axis cells line up, and record the width so newly created axis cells will have it
        this.axisWidth = util_1.matchCellWidths(this.el.find('.fc-axis'));
        // hack to give the view some height prior to timeGrid's columns being rendered
        // TODO: separate setting height from scroller VS timeGrid.
        if (!this.timeGrid.colEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(totalHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        // set of fake row elements that must compensate when scroller has scrollbars
        var noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)');
        // reset all dimensions back to the original state
        this.timeGrid.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary
        this.scroller.clear(); // sets height to 'auto' and clears overflow
        util_1.uncompensateScroll(noScrollRowEls);
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
        if (!isAuto) {
            scrollerHeight = this.computeScrollerHeight(totalHeight);
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) {
                // make the all-day and header rows lines up
                util_1.compensateScroll(noScrollRowEls, scrollbarWidths);
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
                this.timeGrid.bottomRuleEl.show();
            }
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    AgendaView.prototype.computeScrollerHeight = function (totalHeight) {
        return totalHeight -
            util_1.subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes the initial pre-configured scroll state prior to allowing the user to change it
    AgendaView.prototype.computeInitialDateScroll = function () {
        var scrollTime = moment.duration(this.opt('scrollTime'));
        var top = this.timeGrid.computeTimeTop(scrollTime);
        // zoom can give weird floating-point values. rather scroll a little bit further
        top = Math.ceil(top);
        if (top) {
            top++; // to overcome top border that slots beyond the first have. looks better
        }
        return { top: top };
    };
    AgendaView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    AgendaView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    /* Hit Areas
    ------------------------------------------------------------------------------------------------------------------*/
    // forward all hit-related method calls to the grids (dayGrid might not be defined)
    AgendaView.prototype.getHitFootprint = function (hit) {
        // TODO: hit.component is set as a hack to identify where the hit came from
        return hit.component.getHitFootprint(hit);
    };
    AgendaView.prototype.getHitEl = function (hit) {
        // TODO: hit.component is set as a hack to identify where the hit came from
        return hit.component.getHitEl(hit);
    };
    /* Event Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    AgendaView.prototype.executeEventRender = function (eventsPayload) {
        var dayEventsPayload = {};
        var timedEventsPayload = {};
        var id;
        var eventInstanceGroup;
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
        this.timeGrid.executeEventRender(timedEventsPayload);
        if (this.dayGrid) {
            this.dayGrid.executeEventRender(dayEventsPayload);
        }
    };
    /* Dragging/Resizing Routing
    ------------------------------------------------------------------------------------------------------------------*/
    // A returned value of `true` signals that a mock "helper" event has been rendered.
    AgendaView.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var groups = groupEventFootprintsByAllDay(eventFootprints);
        var renderedHelper = false;
        renderedHelper = this.timeGrid.renderDrag(groups.timed, seg, isTouch);
        if (this.dayGrid) {
            renderedHelper = this.dayGrid.renderDrag(groups.allDay, seg, isTouch) || renderedHelper;
        }
        return renderedHelper;
    };
    AgendaView.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        var groups = groupEventFootprintsByAllDay(eventFootprints);
        this.timeGrid.renderEventResize(groups.timed, seg, isTouch);
        if (this.dayGrid) {
            this.dayGrid.renderEventResize(groups.allDay, seg, isTouch);
        }
    };
    /* Selection
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of a selection
    AgendaView.prototype.renderSelectionFootprint = function (componentFootprint) {
        if (!componentFootprint.isAllDay) {
            this.timeGrid.renderSelectionFootprint(componentFootprint);
        }
        else if (this.dayGrid) {
            this.dayGrid.renderSelectionFootprint(componentFootprint);
        }
    };
    return AgendaView;
}(View_1.default));
exports.default = AgendaView;
AgendaView.prototype.timeGridClass = TimeGrid_1.default;
AgendaView.prototype.dayGridClass = DayGrid_1.default;
// Will customize the rendering behavior of the AgendaView's timeGrid
agendaTimeGridMethods = {
    // Generates the HTML that will go before the day-of week header cells
    renderHeadIntroHtml: function () {
        var view = this.view;
        var calendar = view.calendar;
        var weekStart = calendar.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, true);
        var weekText;
        if (this.opt('weekNumbers')) {
            weekText = weekStart.format(this.opt('smallWeekFormat'));
            return '' +
                '<th class="fc-axis fc-week-number ' + calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '>' +
                view.buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                { date: weekStart, type: 'week', forceOff: this.colCnt > 1 }, util_1.htmlEscape(weekText) // inner HTML
                ) +
                '</th>';
        }
        else {
            return '<th class="fc-axis ' + calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '></th>';
        }
    },
    // Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
    renderBgIntroHtml: function () {
        var view = this.view;
        return '<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '></td>';
    },
    // Generates the HTML that goes before all other types of cells.
    // Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
    renderIntroHtml: function () {
        var view = this.view;
        return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
    }
};
// Will customize the rendering behavior of the AgendaView's dayGrid
agendaDayGridMethods = {
    // Generates the HTML that goes before the all-day cells
    renderBgIntroHtml: function () {
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
    renderIntroHtml: function () {
        var view = this.view;
        return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
    }
};
function groupEventFootprintsByAllDay(eventFootprints) {
    var allDay = [];
    var timed = [];
    var i;
    for (i = 0; i < eventFootprints.length; i++) {
        if (eventFootprints[i].componentFootprint.isAllDay) {
            allDay.push(eventFootprints[i]);
        }
        else {
            timed.push(eventFootprints[i]);
        }
    }
    return { allDay: allDay, timed: timed };
}


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var InteractiveDateComponent_1 = __webpack_require__(40);
var BusinessHourRenderer_1 = __webpack_require__(56);
var StandardInteractionsMixin_1 = __webpack_require__(60);
var DayTableMixin_1 = __webpack_require__(55);
var CoordCache_1 = __webpack_require__(53);
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var TimeGridEventRenderer_1 = __webpack_require__(246);
var TimeGridHelperRenderer_1 = __webpack_require__(247);
var TimeGridFillRenderer_1 = __webpack_require__(248);
/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
// We mixin DayTable, even though there is only a single row of days
// potential nice values for the slot-duration and interval-duration
// from largest to smallest
var AGENDA_STOCK_SUB_DURATIONS = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 }
];
var TimeGrid = /** @class */ (function (_super) {
    tslib_1.__extends(TimeGrid, _super);
    function TimeGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.processOptions();
        return _this;
    }
    // Slices up the given span (unzoned start/end with other misc data) into an array of segments
    TimeGrid.prototype.componentFootprintToSegs = function (componentFootprint) {
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
    };
    /* Date Handling
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.sliceRangeByTimes = function (unzonedRange) {
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
    };
    /* Options
    ------------------------------------------------------------------------------------------------------------------*/
    // Parses various options into properties of this object
    TimeGrid.prototype.processOptions = function () {
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
    };
    // Computes an automatic value for slotLabelInterval
    TimeGrid.prototype.computeLabelInterval = function (slotDuration) {
        var i;
        var labelInterval;
        var slotsPerLabel;
        // find the smallest stock label interval that results in more than one slots-per-label
        for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
            labelInterval = moment.duration(AGENDA_STOCK_SUB_DURATIONS[i]);
            slotsPerLabel = util_1.divideDurationByDuration(labelInterval, slotDuration);
            if (util_1.isInt(slotsPerLabel) && slotsPerLabel > 1) {
                return labelInterval;
            }
        }
        return moment.duration(slotDuration); // fall back. clone
    };
    /* Date Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.renderDates = function (dateProfile) {
        this.dateProfile = dateProfile;
        this.updateDayTable();
        this.renderSlats();
        this.renderColumns();
    };
    TimeGrid.prototype.unrenderDates = function () {
        // this.unrenderSlats(); // don't need this because repeated .html() calls clear
        this.unrenderColumns();
    };
    TimeGrid.prototype.renderSkeleton = function () {
        var theme = this.view.calendar.theme;
        this.el.html('<div class="fc-bg"></div>' +
            '<div class="fc-slats"></div>' +
            '<hr class="fc-divider ' + theme.getClass('widgetHeader') + '" style="display:none" />');
        this.bottomRuleEl = this.el.find('hr');
    };
    TimeGrid.prototype.renderSlats = function () {
        var theme = this.view.calendar.theme;
        this.slatContainerEl = this.el.find('> .fc-slats')
            .html(// avoids needing ::unrenderSlats()
        '<table class="' + theme.getClass('tableGrid') + '">' +
            this.renderSlatRowHtml() +
            '</table>');
        this.slatEls = this.slatContainerEl.find('tr');
        this.slatCoordCache = new CoordCache_1.default({
            els: this.slatEls,
            isVertical: true
        });
    };
    // Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
    TimeGrid.prototype.renderSlatRowHtml = function () {
        var view = this.view;
        var calendar = view.calendar;
        var theme = calendar.theme;
        var isRTL = this.isRTL;
        var dateProfile = this.dateProfile;
        var html = '';
        var slotTime = moment.duration(+dateProfile.minTime); // wish there was .clone() for durations
        var slotIterator = moment.duration(0);
        var slotDate; // will be on the view's first day, but we only care about its time
        var isLabeled;
        var axisHtml;
        // Calculate the time for each slot
        while (slotTime < dateProfile.maxTime) {
            slotDate = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.startMs).time(slotTime);
            isLabeled = util_1.isInt(util_1.divideDurationByDuration(slotIterator, this.labelInterval));
            axisHtml =
                '<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
                    (isLabeled ?
                        '<span>' + // for matchCellWidths
                            util_1.htmlEscape(slotDate.format(this.labelFormat)) +
                            '</span>' :
                        '') +
                    '</td>';
            html +=
                '<tr data-time="' + slotDate.format('HH:mm:ss') + '"' +
                    (isLabeled ? '' : ' class="fc-minor"') +
                    '>' +
                    (!isRTL ? axisHtml : '') +
                    '<td class="' + theme.getClass('widgetContent') + '"/>' +
                    (isRTL ? axisHtml : '') +
                    '</tr>';
            slotTime.add(this.slotDuration);
            slotIterator.add(this.slotDuration);
        }
        return html;
    };
    TimeGrid.prototype.renderColumns = function () {
        var dateProfile = this.dateProfile;
        var theme = this.view.calendar.theme;
        this.dayRanges = this.dayDates.map(function (dayDate) {
            return new UnzonedRange_1.default(dayDate.clone().add(dateProfile.minTime), dayDate.clone().add(dateProfile.maxTime));
        });
        if (this.headContainerEl) {
            this.headContainerEl.html(this.renderHeadHtml());
        }
        this.el.find('> .fc-bg').html('<table class="' + theme.getClass('tableGrid') + '">' +
            this.renderBgTrHtml(0) + // row=0
            '</table>');
        this.colEls = this.el.find('.fc-day, .fc-disabled-day');
        this.colCoordCache = new CoordCache_1.default({
            els: this.colEls,
            isHorizontal: true
        });
        this.renderContentSkeleton();
    };
    TimeGrid.prototype.unrenderColumns = function () {
        this.unrenderContentSkeleton();
    };
    /* Content Skeleton
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders the DOM that the view's content will live in
    TimeGrid.prototype.renderContentSkeleton = function () {
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
        skeletonEl = this.contentSkeletonEl = $('<div class="fc-content-skeleton">' +
            '<table>' +
            '<tr>' + cellHtml + '</tr>' +
            '</table>' +
            '</div>');
        this.colContainerEls = skeletonEl.find('.fc-content-col');
        this.helperContainerEls = skeletonEl.find('.fc-helper-container');
        this.fgContainerEls = skeletonEl.find('.fc-event-container:not(.fc-helper-container)');
        this.bgContainerEls = skeletonEl.find('.fc-bgevent-container');
        this.highlightContainerEls = skeletonEl.find('.fc-highlight-container');
        this.businessContainerEls = skeletonEl.find('.fc-business-container');
        this.bookendCells(skeletonEl.find('tr')); // TODO: do this on string level
        this.el.append(skeletonEl);
    };
    TimeGrid.prototype.unrenderContentSkeleton = function () {
        if (this.contentSkeletonEl) {
            this.contentSkeletonEl.remove();
            this.contentSkeletonEl = null;
            this.colContainerEls = null;
            this.helperContainerEls = null;
            this.fgContainerEls = null;
            this.bgContainerEls = null;
            this.highlightContainerEls = null;
            this.businessContainerEls = null;
        }
    };
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
    TimeGrid.prototype.groupSegsByCol = function (segs) {
        var segsByCol = [];
        var i;
        for (i = 0; i < this.colCnt; i++) {
            segsByCol.push([]);
        }
        for (i = 0; i < segs.length; i++) {
            segsByCol[segs[i].col].push(segs[i]);
        }
        return segsByCol;
    };
    // Given segments grouped by column, insert the segments' elements into a parallel array of container
    // elements, each living within a column.
    TimeGrid.prototype.attachSegsByCol = function (segsByCol, containerEls) {
        var col;
        var segs;
        var i;
        for (col = 0; col < this.colCnt; col++) {
            segs = segsByCol[col];
            for (i = 0; i < segs.length; i++) {
                containerEls.eq(col).append(segs[i].el);
            }
        }
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.getNowIndicatorUnit = function () {
        return 'minute'; // will refresh on the minute
    };
    TimeGrid.prototype.renderNowIndicator = function (date) {
        // HACK: if date columns not ready for some reason (scheduler)
        if (!this.colContainerEls) {
            return;
        }
        // seg system might be overkill, but it handles scenario where line needs to be rendered
        //  more than once because of columns with the same date (resources columns for example)
        var segs = this.componentFootprintToSegs(new ComponentFootprint_1.default(new UnzonedRange_1.default(date, date.valueOf() + 1), // protect against null range
        false // all-day
        ));
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
        if (segs.length > 0) {
            nodes.push($('<div class="fc-now-indicator fc-now-indicator-arrow"></div>')
                .css('top', top)
                .appendTo(this.el.find('.fc-content-skeleton'))[0]);
        }
        this.nowIndicatorEls = $(nodes);
    };
    TimeGrid.prototype.unrenderNowIndicator = function () {
        if (this.nowIndicatorEls) {
            this.nowIndicatorEls.remove();
            this.nowIndicatorEls = null;
        }
    };
    /* Coordinates
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        this.slatCoordCache.build();
        if (isResize) {
            this.updateSegVerticals([].concat(this.eventRenderer.getSegs(), this.businessSegs || []));
        }
    };
    TimeGrid.prototype.getTotalSlatHeight = function () {
        return this.slatContainerEl.outerHeight();
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given date.
    // `ms` can be a millisecond UTC time OR a UTC moment.
    // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
    TimeGrid.prototype.computeDateTop = function (ms, startOfDayDate) {
        return this.computeTimeTop(moment.duration(ms - startOfDayDate.clone().stripTime()));
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
    TimeGrid.prototype.computeTimeTop = function (time) {
        var len = this.slatEls.length;
        var dateProfile = this.dateProfile;
        var slatCoverage = (time - dateProfile.minTime) / this.slotDuration; // floating-point value of # of slots covered
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
    };
    // Refreshes the CSS top/bottom coordinates for each segment element.
    // Works when called after initial render, after a window resize/zoom for example.
    TimeGrid.prototype.updateSegVerticals = function (segs) {
        this.computeSegVerticals(segs);
        this.assignSegVerticals(segs);
    };
    // For each segment in an array, computes and assigns its top and bottom properties
    TimeGrid.prototype.computeSegVerticals = function (segs) {
        var eventMinHeight = this.opt('agendaEventMinHeight');
        var i;
        var seg;
        var dayDate;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            dayDate = this.dayDates[seg.dayIndex];
            seg.top = this.computeDateTop(seg.startMs, dayDate);
            seg.bottom = Math.max(seg.top + eventMinHeight, this.computeDateTop(seg.endMs, dayDate));
        }
    };
    // Given segments that already have their top/bottom properties computed, applies those values to
    // the segments' elements.
    TimeGrid.prototype.assignSegVerticals = function (segs) {
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            seg.el.css(this.generateSegVerticalCss(seg));
        }
    };
    // Generates an object with CSS properties for the top/bottom coordinates of a segment element
    TimeGrid.prototype.generateSegVerticalCss = function (seg) {
        return {
            top: seg.top,
            bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
        };
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.prepareHits = function () {
        this.colCoordCache.build();
        this.slatCoordCache.build();
    };
    TimeGrid.prototype.releaseHits = function () {
        this.colCoordCache.clear();
        // NOTE: don't clear slatCoordCache because we rely on it for computeTimeTop
    };
    TimeGrid.prototype.queryHit = function (leftOffset, topOffset) {
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
                    component: this,
                    left: colCoordCache.getLeftOffset(colIndex),
                    right: colCoordCache.getRightOffset(colIndex),
                    top: snapTop,
                    bottom: snapBottom
                };
            }
        }
    };
    TimeGrid.prototype.getHitFootprint = function (hit) {
        var start = this.getCellDate(0, hit.col); // row=0
        var time = this.computeSnapTime(hit.snap); // pass in the snap-index
        var end;
        start.time(time);
        end = start.clone().add(this.snapDuration);
        return new ComponentFootprint_1.default(new UnzonedRange_1.default(start, end), false // all-day?
        );
    };
    // Given a row number of the grid, representing a "snap", returns a time (Duration) from its start-of-day
    TimeGrid.prototype.computeSnapTime = function (snapIndex) {
        return moment.duration(this.dateProfile.minTime + this.snapDuration * snapIndex);
    };
    TimeGrid.prototype.getHitEl = function (hit) {
        return this.colEls.eq(hit.col);
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event being dragged over the specified date(s).
    // A returned value of `true` signals that a mock "helper" event has been rendered.
    TimeGrid.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var i;
        if (seg) {
            if (eventFootprints.length) {
                this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);
                // signal that a helper has been rendered
                return true;
            }
        }
        else {
            for (i = 0; i < eventFootprints.length; i++) {
                this.renderHighlight(eventFootprints[i].componentFootprint);
            }
        }
    };
    // Unrenders any visual indication of an event being dragged
    TimeGrid.prototype.unrenderDrag = function () {
        this.unrenderHighlight();
        this.helperRenderer.unrender();
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event being resized
    TimeGrid.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
    };
    // Unrenders any visual indication of an event being resized
    TimeGrid.prototype.unrenderEventResize = function () {
        this.helperRenderer.unrender();
    };
    /* Selection
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
    TimeGrid.prototype.renderSelectionFootprint = function (componentFootprint) {
        if (this.opt('selectHelper')) {
            this.helperRenderer.renderComponentFootprint(componentFootprint);
        }
        else {
            this.renderHighlight(componentFootprint);
        }
    };
    // Unrenders any visual indication of a selection
    TimeGrid.prototype.unrenderSelection = function () {
        this.helperRenderer.unrender();
        this.unrenderHighlight();
    };
    return TimeGrid;
}(InteractiveDateComponent_1.default));
exports.default = TimeGrid;
TimeGrid.prototype.eventRendererClass = TimeGridEventRenderer_1.default;
TimeGrid.prototype.businessHourRendererClass = BusinessHourRenderer_1.default;
TimeGrid.prototype.helperRendererClass = TimeGridHelperRenderer_1.default;
TimeGrid.prototype.fillRendererClass = TimeGridFillRenderer_1.default;
StandardInteractionsMixin_1.default.mixInto(TimeGrid);
DayTableMixin_1.default.mixInto(TimeGrid);


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var UnzonedRange_1 = __webpack_require__(5);
var DateProfileGenerator_1 = __webpack_require__(221);
var BasicViewDateProfileGenerator = /** @class */ (function (_super) {
    tslib_1.__extends(BasicViewDateProfileGenerator, _super);
    function BasicViewDateProfileGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Computes the date range that will be rendered.
    BasicViewDateProfileGenerator.prototype.buildRenderRange = function (currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
        var renderUnzonedRange = _super.prototype.buildRenderRange.call(this, currentUnzonedRange, currentRangeUnit, isRangeAllDay); // an UnzonedRange
        var start = this.msToUtcMoment(renderUnzonedRange.startMs, isRangeAllDay);
        var end = this.msToUtcMoment(renderUnzonedRange.endMs, isRangeAllDay);
        // year and month views should be aligned with weeks. this is already done for week
        if (/^(year|month)$/.test(currentRangeUnit)) {
            start.startOf('week');
            // make end-of-week if not already
            if (end.weekday()) {
                end.add(1, 'week').startOf('week'); // exclusively move backwards
            }
        }
        return new UnzonedRange_1.default(start, end);
    };
    return BasicViewDateProfileGenerator;
}(DateProfileGenerator_1.default));
exports.default = BasicViewDateProfileGenerator;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var BasicView_1 = __webpack_require__(62);
var MonthViewDateProfileGenerator_1 = __webpack_require__(253);
/* A month view with day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/
var MonthView = /** @class */ (function (_super) {
    tslib_1.__extends(MonthView, _super);
    function MonthView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Overrides the default BasicView behavior to have special multi-week auto-height logic
    MonthView.prototype.setGridHeight = function (height, isAuto) {
        // if auto, make the height of each row the height that it would be if there were 6 weeks
        if (isAuto) {
            height *= this.dayGrid.rowCnt / 6;
        }
        util_1.distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
    };
    MonthView.prototype.isDateInOtherMonth = function (date, dateProfile) {
        return date.month() !== moment.utc(dateProfile.currentUnzonedRange.startMs).month(); // TODO: optimize
    };
    return MonthView;
}(BasicView_1.default));
exports.default = MonthView;
MonthView.prototype.dateProfileGeneratorClass = MonthViewDateProfileGenerator_1.default;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var UnzonedRange_1 = __webpack_require__(5);
var View_1 = __webpack_require__(41);
var Scroller_1 = __webpack_require__(39);
var ListEventRenderer_1 = __webpack_require__(254);
var ListEventPointing_1 = __webpack_require__(255);
/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/
var ListView = /** @class */ (function (_super) {
    tslib_1.__extends(ListView, _super);
    function ListView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.segSelector = '.fc-list-item'; // which elements accept event actions
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }
    ListView.prototype.renderSkeleton = function () {
        this.el.addClass('fc-list-view ' +
            this.calendar.theme.getClass('listView'));
        this.scroller.render();
        this.scroller.el.appendTo(this.el);
        this.contentEl = this.scroller.scrollEl; // shortcut
    };
    ListView.prototype.unrenderSkeleton = function () {
        this.scroller.destroy(); // will remove the Grid too
    };
    ListView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        this.scroller.setHeight(this.computeScrollerHeight(totalHeight));
    };
    ListView.prototype.computeScrollerHeight = function (totalHeight) {
        return totalHeight -
            util_1.subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    ListView.prototype.renderDates = function (dateProfile) {
        var calendar = this.calendar;
        var dayStart = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.startMs, true);
        var viewEnd = calendar.msToUtcMoment(dateProfile.renderUnzonedRange.endMs, true);
        var dayDates = [];
        var dayRanges = [];
        while (dayStart < viewEnd) {
            dayDates.push(dayStart.clone());
            dayRanges.push(new UnzonedRange_1.default(dayStart, dayStart.clone().add(1, 'day')));
            dayStart.add(1, 'day');
        }
        this.dayDates = dayDates;
        this.dayRanges = dayRanges;
        // all real rendering happens in EventRenderer
    };
    // slices by day
    ListView.prototype.componentFootprintToSegs = function (footprint) {
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
                if (!seg.isEnd && !footprint.isAllDay &&
                    dayIndex + 1 < dayRanges.length &&
                    footprint.unzonedRange.endMs < dayRanges[dayIndex + 1].startMs + this.nextDayThreshold) {
                    seg.endMs = footprint.unzonedRange.endMs;
                    seg.isEnd = true;
                    break;
                }
            }
        }
        return segs;
    };
    ListView.prototype.renderEmptyMessage = function () {
        this.contentEl.html('<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
            '<div class="fc-list-empty-wrap1">' +
            '<div class="fc-list-empty">' +
            util_1.htmlEscape(this.opt('noEventsMessage')) +
            '</div>' +
            '</div>' +
            '</div>');
    };
    // render the event segments in the view
    ListView.prototype.renderSegList = function (allSegs) {
        var segsByDay = this.groupSegsByDay(allSegs); // sparse array
        var dayIndex;
        var daySegs;
        var i;
        var tableEl = $('<table class="fc-list-table ' + this.calendar.theme.getClass('tableList') + '"><tbody/></table>');
        var tbodyEl = tableEl.find('tbody');
        for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
            daySegs = segsByDay[dayIndex];
            if (daySegs) {
                // append a day header
                tbodyEl.append(this.dayHeaderHtml(this.dayDates[dayIndex]));
                this.eventRenderer.sortEventSegs(daySegs);
                for (i = 0; i < daySegs.length; i++) {
                    tbodyEl.append(daySegs[i].el); // append event row
                }
            }
        }
        this.contentEl.empty().append(tableEl);
    };
    // Returns a sparse array of arrays, segs grouped by their dayIndex
    ListView.prototype.groupSegsByDay = function (segs) {
        var segsByDay = []; // sparse array
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
                .push(seg);
        }
        return segsByDay;
    };
    // generates the HTML for the day headers that live amongst the event rows
    ListView.prototype.dayHeaderHtml = function (dayDate) {
        var mainFormat = this.opt('listDayFormat');
        var altFormat = this.opt('listDayAltFormat');
        return '<tr class="fc-list-heading" data-date="' + dayDate.format('YYYY-MM-DD') + '">' +
            '<td class="' + this.calendar.theme.getClass('widgetHeader') + '" colspan="3">' +
            (mainFormat ?
                this.buildGotoAnchorHtml(dayDate, { 'class': 'fc-list-heading-main' }, util_1.htmlEscape(dayDate.format(mainFormat)) // inner HTML
                ) :
                '') +
            (altFormat ?
                this.buildGotoAnchorHtml(dayDate, { 'class': 'fc-list-heading-alt' }, util_1.htmlEscape(dayDate.format(altFormat)) // inner HTML
                ) :
                '') +
            '</td>' +
            '</tr>';
    };
    return ListView;
}(View_1.default));
exports.default = ListView;
ListView.prototype.eventRendererClass = ListEventRenderer_1.default;
ListView.prototype.eventPointingClass = ListEventPointing_1.default;


/***/ }),
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(3);
var exportHooks = __webpack_require__(16);
var util_1 = __webpack_require__(4);
var Calendar_1 = __webpack_require__(220);
// for intentional side-effects
__webpack_require__(10);
__webpack_require__(47);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
$.fullCalendar = exportHooks;
$.fn.fullCalendar = function (options) {
    var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
    var res = this; // what this function will return (this jQuery object by default)
    this.each(function (i, _element) {
        var element = $(_element);
        var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
        var singleRes; // the returned value of this single method call
        // a method call
        if (typeof options === 'string') {
            if (options === 'getCalendar') {
                if (!i) {
                    res = calendar;
                }
            }
            else if (options === 'destroy') {
                if (calendar) {
                    calendar.destroy();
                    element.removeData('fullCalendar');
                }
            }
            else if (!calendar) {
                util_1.warn('Attempting to call a FullCalendar method on an element with no calendar.');
            }
            else if ($.isFunction(calendar[options])) {
                singleRes = calendar[options].apply(calendar, args);
                if (!i) {
                    res = singleRes; // record the first method call result
                }
                if (options === 'destroy') {
                    element.removeData('fullCalendar');
                }
            }
            else {
                util_1.warn("'" + options + "' is an unknown FullCalendar method.");
            }
        }
        else if (!calendar) {
            calendar = new Calendar_1.default(element, options);
            element.data('fullCalendar', calendar);
            calendar.render();
        }
    });
    return res;
};
module.exports = exportHooks;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Model_1 = __webpack_require__(48);
var Component = /** @class */ (function (_super) {
    tslib_1.__extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.setElement = function (el) {
        this.el = el;
        this.bindGlobalHandlers();
        this.renderSkeleton();
        this.set('isInDom', true);
    };
    Component.prototype.removeElement = function () {
        this.unset('isInDom');
        this.unrenderSkeleton();
        this.unbindGlobalHandlers();
        this.el.remove();
        // NOTE: don't null-out this.el in case the View was destroyed within an API callback.
        // We don't null-out the View's other jQuery element references upon destroy,
        //  so we shouldn't kill this.el either.
    };
    Component.prototype.bindGlobalHandlers = function () {
        // subclasses can override
    };
    Component.prototype.unbindGlobalHandlers = function () {
        // subclasses can override
    };
    /*
    NOTE: Can't have a `render` method. Read the deprecation notice in View::executeDateRender
    */
    // Renders the basic structure of the view before any content is rendered
    Component.prototype.renderSkeleton = function () {
        // subclasses should implement
    };
    // Unrenders the basic structure of the view
    Component.prototype.unrenderSkeleton = function () {
        // subclasses should implement
    };
    return Component;
}(Model_1.default));
exports.default = Component;


/***/ }),
/* 238 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = /** @class */ (function () {
    function Iterator(items) {
        this.items = items || [];
    }
    /* Calls a method on every item passing the arguments through */
    Iterator.prototype.proxyCall = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var results = [];
        this.items.forEach(function (item) {
            results.push(item[methodName].apply(item, args));
        });
        return results;
    };
    return Iterator;
}());
exports.default = Iterator;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
/* Toolbar with buttons and title
----------------------------------------------------------------------------------------------------------------------*/
var Toolbar = /** @class */ (function () {
    function Toolbar(calendar, toolbarOptions) {
        this.el = null; // mirrors local `el`
        this.viewsWithButtons = [];
        this.calendar = calendar;
        this.toolbarOptions = toolbarOptions;
    }
    // method to update toolbar-specific options, not calendar-wide options
    Toolbar.prototype.setToolbarOptions = function (newToolbarOptions) {
        this.toolbarOptions = newToolbarOptions;
    };
    // can be called repeatedly and will rerender
    Toolbar.prototype.render = function () {
        var sections = this.toolbarOptions.layout;
        var el = this.el;
        if (sections) {
            if (!el) {
                el = this.el = $("<div class='fc-toolbar " + this.toolbarOptions.extraClasses + "'/>");
            }
            else {
                el.empty();
            }
            el.append(this.renderSection('left'))
                .append(this.renderSection('right'))
                .append(this.renderSection('center'))
                .append('<div class="fc-clear"/>');
        }
        else {
            this.removeElement();
        }
    };
    Toolbar.prototype.removeElement = function () {
        if (this.el) {
            this.el.remove();
            this.el = null;
        }
    };
    Toolbar.prototype.renderSection = function (position) {
        var _this = this;
        var calendar = this.calendar;
        var theme = calendar.theme;
        var optionsManager = calendar.optionsManager;
        var viewSpecManager = calendar.viewSpecManager;
        var sectionEl = $('<div class="fc-' + position + '"/>');
        var buttonStr = this.toolbarOptions.layout[position];
        var calendarCustomButtons = optionsManager.get('customButtons') || {};
        var calendarButtonTextOverrides = optionsManager.overrides.buttonText || {};
        var calendarButtonText = optionsManager.get('buttonText') || {};
        if (buttonStr) {
            $.each(buttonStr.split(' '), function (i, buttonGroupStr) {
                var groupChildren = $();
                var isOnlyButtons = true;
                var groupEl;
                $.each(buttonGroupStr.split(','), function (j, buttonName) {
                    var customButtonProps;
                    var viewSpec;
                    var buttonClick;
                    var buttonIcon; // only one of these will be set
                    var buttonText; // "
                    var buttonInnerHtml;
                    var buttonClasses;
                    var buttonEl;
                    var buttonAriaAttr;
                    if (buttonName === 'title') {
                        groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
                        isOnlyButtons = false;
                    }
                    else {
                        if ((customButtonProps = calendarCustomButtons[buttonName])) {
                            buttonClick = function (ev) {
                                if (customButtonProps.click) {
                                    customButtonProps.click.call(buttonEl[0], ev);
                                }
                            };
                            (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = customButtonProps.text);
                        }
                        else if ((viewSpec = viewSpecManager.getViewSpec(buttonName))) {
                            _this.viewsWithButtons.push(buttonName);
                            buttonClick = function () {
                                calendar.changeView(buttonName);
                            };
                            (buttonText = viewSpec.buttonTextOverride) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = viewSpec.buttonTextDefault);
                        }
                        else if (calendar[buttonName]) {
                            buttonClick = function () {
                                calendar[buttonName]();
                            };
                            (buttonText = calendarButtonTextOverrides[buttonName]) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = calendarButtonText[buttonName]);
                            //            ^ everything else is considered default
                        }
                        if (buttonClick) {
                            buttonClasses = [
                                'fc-' + buttonName + '-button',
                                theme.getClass('button'),
                                theme.getClass('stateDefault')
                            ];
                            if (buttonText) {
                                buttonInnerHtml = util_1.htmlEscape(buttonText);
                                buttonAriaAttr = '';
                            }
                            else if (buttonIcon) {
                                buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
                                buttonAriaAttr = ' aria-label="' + buttonName + '"';
                            }
                            buttonEl = $(// type="button" so that it doesn't submit a form
                            '<button type="button" class="' + buttonClasses.join(' ') + '"' +
                                buttonAriaAttr +
                                '>' + buttonInnerHtml + '</button>')
                                .click(function (ev) {
                                // don't process clicks for disabled buttons
                                if (!buttonEl.hasClass(theme.getClass('stateDisabled'))) {
                                    buttonClick(ev);
                                    // after the click action, if the button becomes the "active" tab, or disabled,
                                    // it should never have a hover class, so remove it now.
                                    if (buttonEl.hasClass(theme.getClass('stateActive')) ||
                                        buttonEl.hasClass(theme.getClass('stateDisabled'))) {
                                        buttonEl.removeClass(theme.getClass('stateHover'));
                                    }
                                }
                            })
                                .mousedown(function () {
                                // the *down* effect (mouse pressed in).
                                // only on buttons that are not the "active" tab, or disabled
                                buttonEl
                                    .not('.' + theme.getClass('stateActive'))
                                    .not('.' + theme.getClass('stateDisabled'))
                                    .addClass(theme.getClass('stateDown'));
                            })
                                .mouseup(function () {
                                // undo the *down* effect
                                buttonEl.removeClass(theme.getClass('stateDown'));
                            })
                                .hover(function () {
                                // the *hover* effect.
                                // only on buttons that are not the "active" tab, or disabled
                                buttonEl
                                    .not('.' + theme.getClass('stateActive'))
                                    .not('.' + theme.getClass('stateDisabled'))
                                    .addClass(theme.getClass('stateHover'));
                            }, function () {
                                // undo the *hover* effect
                                buttonEl
                                    .removeClass(theme.getClass('stateHover'))
                                    .removeClass(theme.getClass('stateDown')); // if mouseleave happens before mouseup
                            });
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
    };
    Toolbar.prototype.updateTitle = function (text) {
        if (this.el) {
            this.el.find('h2').text(text);
        }
    };
    Toolbar.prototype.activateButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .addClass(this.calendar.theme.getClass('stateActive'));
        }
    };
    Toolbar.prototype.deactivateButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .removeClass(this.calendar.theme.getClass('stateActive'));
        }
    };
    Toolbar.prototype.disableButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .prop('disabled', true)
                .addClass(this.calendar.theme.getClass('stateDisabled'));
        }
    };
    Toolbar.prototype.enableButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .prop('disabled', false)
                .removeClass(this.calendar.theme.getClass('stateDisabled'));
        }
    };
    Toolbar.prototype.getViewsWithButtons = function () {
        return this.viewsWithButtons;
    };
    return Toolbar;
}());
exports.default = Toolbar;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var options_1 = __webpack_require__(31);
var locale_1 = __webpack_require__(30);
var Model_1 = __webpack_require__(48);
var OptionsManager = /** @class */ (function (_super) {
    tslib_1.__extends(OptionsManager, _super);
    function OptionsManager(_calendar, overrides) {
        var _this = _super.call(this) || this;
        _this._calendar = _calendar;
        _this.overrides = $.extend({}, overrides); // make a copy
        _this.dynamicOverrides = {};
        _this.compute();
        return _this;
    }
    OptionsManager.prototype.add = function (newOptionHash) {
        var optionCnt = 0;
        var optionName;
        this.recordOverrides(newOptionHash); // will trigger this model's watchers
        for (optionName in newOptionHash) {
            optionCnt++;
        }
        // special-case handling of single option change.
        // if only one option change, `optionName` will be its name.
        if (optionCnt === 1) {
            if (optionName === 'height' || optionName === 'contentHeight' || optionName === 'aspectRatio') {
                this._calendar.updateViewSize(true); // isResize=true
                return;
            }
            else if (optionName === 'defaultDate') {
                return; // can't change date this way. use gotoDate instead
            }
            else if (optionName === 'businessHours') {
                return; // this model already reacts to this
            }
            else if (/^(event|select)(Overlap|Constraint|Allow)$/.test(optionName)) {
                return; // doesn't affect rendering. only interactions.
            }
            else if (optionName === 'timezone') {
                this._calendar.view.flash('initialEvents');
                return;
            }
        }
        // catch-all. rerender the header and footer and rebuild/rerender the current view
        this._calendar.renderHeader();
        this._calendar.renderFooter();
        // even non-current views will be affected by this option change. do before rerender
        // TODO: detangle
        this._calendar.viewsByType = {};
        this._calendar.reinitView();
    };
    // Computes the flattened options hash for the calendar and assigns to `this.options`.
    // Assumes this.overrides and this.dynamicOverrides have already been initialized.
    OptionsManager.prototype.compute = function () {
        var locale;
        var localeDefaults;
        var isRTL;
        var dirDefaults;
        var rawOptions;
        locale = util_1.firstDefined(// explicit locale option given?
        this.dynamicOverrides.locale, this.overrides.locale);
        localeDefaults = locale_1.localeOptionHash[locale];
        if (!localeDefaults) {
            locale = options_1.globalDefaults.locale;
            localeDefaults = locale_1.localeOptionHash[locale] || {};
        }
        isRTL = util_1.firstDefined(// based on options computed so far, is direction RTL?
        this.dynamicOverrides.isRTL, this.overrides.isRTL, localeDefaults.isRTL, options_1.globalDefaults.isRTL);
        dirDefaults = isRTL ? options_1.rtlDefaults : {};
        this.dirDefaults = dirDefaults;
        this.localeDefaults = localeDefaults;
        rawOptions = options_1.mergeOptions([
            options_1.globalDefaults,
            dirDefaults,
            localeDefaults,
            this.overrides,
            this.dynamicOverrides
        ]);
        locale_1.populateInstanceComputableOptions(rawOptions); // fill in gaps with computed options
        this.reset(rawOptions);
    };
    // stores the new options internally, but does not rerender anything.
    OptionsManager.prototype.recordOverrides = function (newOptionHash) {
        var optionName;
        for (optionName in newOptionHash) {
            this.dynamicOverrides[optionName] = newOptionHash[optionName];
        }
        this._calendar.viewSpecManager.clearCache(); // the dynamic override invalidates the options in this cache, so just clear it
        this.compute(); // this.options needs to be recomputed after the dynamic override
    };
    return OptionsManager;
}(Model_1.default));
exports.default = OptionsManager;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
var ViewRegistry_1 = __webpack_require__(21);
var util_1 = __webpack_require__(4);
var options_1 = __webpack_require__(31);
var locale_1 = __webpack_require__(30);
var ViewSpecManager = /** @class */ (function () {
    function ViewSpecManager(optionsManager, _calendar) {
        this.optionsManager = optionsManager;
        this._calendar = _calendar;
        this.clearCache();
    }
    ViewSpecManager.prototype.clearCache = function () {
        this.viewSpecCache = {};
    };
    // Gets information about how to create a view. Will use a cache.
    ViewSpecManager.prototype.getViewSpec = function (viewType) {
        var cache = this.viewSpecCache;
        return cache[viewType] || (cache[viewType] = this.buildViewSpec(viewType));
    };
    // Given a duration singular unit, like "week" or "day", finds a matching view spec.
    // Preference is given to views that have corresponding buttons.
    ViewSpecManager.prototype.getUnitViewSpec = function (unit) {
        var viewTypes;
        var i;
        var spec;
        if ($.inArray(unit, util_1.unitsDesc) !== -1) {
            // put views that have buttons first. there will be duplicates, but oh well
            viewTypes = this._calendar.header.getViewsWithButtons(); // TODO: include footer as well?
            $.each(ViewRegistry_1.viewHash, function (viewType) {
                viewTypes.push(viewType);
            });
            for (i = 0; i < viewTypes.length; i++) {
                spec = this.getViewSpec(viewTypes[i]);
                if (spec) {
                    if (spec.singleUnit === unit) {
                        return spec;
                    }
                }
            }
        }
    };
    // Builds an object with information on how to create a given view
    ViewSpecManager.prototype.buildViewSpec = function (requestedViewType) {
        var viewOverrides = this.optionsManager.overrides.views || {};
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
            spec = ViewRegistry_1.viewHash[viewType];
            overrides = viewOverrides[viewType];
            viewType = null; // clear. might repopulate for another iteration
            if (typeof spec === 'function') {
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
        spec = util_1.mergeProps(specChain);
        spec.type = requestedViewType;
        if (!spec['class']) {
            return false;
        }
        // fall back to top-level `duration` option
        durationInput = durationInput ||
            this.optionsManager.dynamicOverrides.duration ||
            this.optionsManager.overrides.duration;
        if (durationInput) {
            duration = moment.duration(durationInput);
            if (duration.valueOf()) {
                unit = util_1.computeDurationGreatestUnit(duration, durationInput);
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
        spec.defaults = options_1.mergeOptions(defaultsChain);
        spec.overrides = options_1.mergeOptions(overridesChain);
        this.buildViewSpecOptions(spec);
        this.buildViewSpecButtonText(spec, requestedViewType);
        return spec;
    };
    // Builds and assigns a view spec's options object from its already-assigned defaults and overrides
    ViewSpecManager.prototype.buildViewSpecOptions = function (spec) {
        var optionsManager = this.optionsManager;
        spec.options = options_1.mergeOptions([
            options_1.globalDefaults,
            spec.defaults,
            optionsManager.dirDefaults,
            optionsManager.localeDefaults,
            optionsManager.overrides,
            spec.overrides,
            optionsManager.dynamicOverrides // dynamically set via setter. highest precedence
        ]);
        locale_1.populateInstanceComputableOptions(spec.options);
    };
    // Computes and assigns a view spec's buttonText-related options
    ViewSpecManager.prototype.buildViewSpecButtonText = function (spec, requestedViewType) {
        var optionsManager = this.optionsManager;
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
            queryButtonText(optionsManager.dynamicOverrides) ||
                queryButtonText(optionsManager.overrides) || // constructor-specified buttonText lookup hash takes precedence
                spec.overrides.buttonText; // `buttonText` for view-specific options is a string
        // highest to lowest priority. mirrors buildViewSpecOptions
        spec.buttonTextDefault =
            queryButtonText(optionsManager.localeDefaults) ||
                queryButtonText(optionsManager.dirDefaults) ||
                spec.defaults.buttonText || // a single string. from ViewSubclass.defaults
                queryButtonText(options_1.globalDefaults) ||
                (spec.duration ? this._calendar.humanizeDuration(spec.duration) : null) || // like "3 days"
                requestedViewType; // fall back to given view name
    };
    return ViewSpecManager;
}());
exports.default = ViewSpecManager;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var EventPeriod_1 = __webpack_require__(243);
var ArrayEventSource_1 = __webpack_require__(52);
var EventSource_1 = __webpack_require__(6);
var EventSourceParser_1 = __webpack_require__(37);
var SingleEventDef_1 = __webpack_require__(13);
var EventInstanceGroup_1 = __webpack_require__(18);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
var EventManager = /** @class */ (function () {
    function EventManager(calendar) {
        this.calendar = calendar;
        this.stickySource = new ArrayEventSource_1.default(calendar);
        this.otherSources = [];
    }
    EventManager.prototype.requestEvents = function (start, end, timezone, force) {
        if (force ||
            !this.currentPeriod ||
            !this.currentPeriod.isWithinRange(start, end) ||
            timezone !== this.currentPeriod.timezone) {
            this.setPeriod(// will change this.currentPeriod
            new EventPeriod_1.default(start, end, timezone));
        }
        return this.currentPeriod.whenReleased();
    };
    // Source Adding/Removing
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.addSource = function (eventSource) {
        this.otherSources.push(eventSource);
        if (this.currentPeriod) {
            this.currentPeriod.requestSource(eventSource); // might release
        }
    };
    EventManager.prototype.removeSource = function (doomedSource) {
        util_1.removeExact(this.otherSources, doomedSource);
        if (this.currentPeriod) {
            this.currentPeriod.purgeSource(doomedSource); // might release
        }
    };
    EventManager.prototype.removeAllSources = function () {
        this.otherSources = [];
        if (this.currentPeriod) {
            this.currentPeriod.purgeAllSources(); // might release
        }
    };
    // Source Refetching
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.refetchSource = function (eventSource) {
        var currentPeriod = this.currentPeriod;
        if (currentPeriod) {
            currentPeriod.freeze();
            currentPeriod.purgeSource(eventSource);
            currentPeriod.requestSource(eventSource);
            currentPeriod.thaw();
        }
    };
    EventManager.prototype.refetchAllSources = function () {
        var currentPeriod = this.currentPeriod;
        if (currentPeriod) {
            currentPeriod.freeze();
            currentPeriod.purgeAllSources();
            currentPeriod.requestSources(this.getSources());
            currentPeriod.thaw();
        }
    };
    // Source Querying
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.getSources = function () {
        return [this.stickySource].concat(this.otherSources);
    };
    // like querySources, but accepts multple match criteria (like multiple IDs)
    EventManager.prototype.multiQuerySources = function (matchInputs) {
        // coerce into an array
        if (!matchInputs) {
            matchInputs = [];
        }
        else if (!$.isArray(matchInputs)) {
            matchInputs = [matchInputs];
        }
        var matchingSources = [];
        var i;
        // resolve raw inputs to real event source objects
        for (i = 0; i < matchInputs.length; i++) {
            matchingSources.push.apply(// append
            matchingSources, this.querySources(matchInputs[i]));
        }
        return matchingSources;
    };
    // matchInput can either by a real event source object, an ID, or the function/URL for the source.
    // returns an array of matching source objects.
    EventManager.prototype.querySources = function (matchInput) {
        var sources = this.otherSources;
        var i;
        var source;
        // given a proper event source object
        for (i = 0; i < sources.length; i++) {
            source = sources[i];
            if (source === matchInput) {
                return [source];
            }
        }
        // an ID match
        source = this.getSourceById(EventSource_1.default.normalizeId(matchInput));
        if (source) {
            return [source];
        }
        // parse as an event source
        matchInput = EventSourceParser_1.default.parse(matchInput, this.calendar);
        if (matchInput) {
            return $.grep(sources, function (source) {
                return isSourcesEquivalent(matchInput, source);
            });
        }
    };
    /*
    ID assumed to already be normalized
    */
    EventManager.prototype.getSourceById = function (id) {
        return $.grep(this.otherSources, function (source) {
            return source.id && source.id === id;
        })[0];
    };
    // Event-Period
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.setPeriod = function (eventPeriod) {
        if (this.currentPeriod) {
            this.unbindPeriod(this.currentPeriod);
            this.currentPeriod = null;
        }
        this.currentPeriod = eventPeriod;
        this.bindPeriod(eventPeriod);
        eventPeriod.requestSources(this.getSources());
    };
    EventManager.prototype.bindPeriod = function (eventPeriod) {
        this.listenTo(eventPeriod, 'release', function (eventsPayload) {
            this.trigger('release', eventsPayload);
        });
    };
    EventManager.prototype.unbindPeriod = function (eventPeriod) {
        this.stopListeningTo(eventPeriod);
    };
    // Event Getting/Adding/Removing
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.getEventDefByUid = function (uid) {
        if (this.currentPeriod) {
            return this.currentPeriod.getEventDefByUid(uid);
        }
    };
    EventManager.prototype.addEventDef = function (eventDef, isSticky) {
        if (isSticky) {
            this.stickySource.addEventDef(eventDef);
        }
        if (this.currentPeriod) {
            this.currentPeriod.addEventDef(eventDef); // might release
        }
    };
    EventManager.prototype.removeEventDefsById = function (eventId) {
        this.getSources().forEach(function (eventSource) {
            eventSource.removeEventDefsById(eventId);
        });
        if (this.currentPeriod) {
            this.currentPeriod.removeEventDefsById(eventId); // might release
        }
    };
    EventManager.prototype.removeAllEventDefs = function () {
        this.getSources().forEach(function (eventSource) {
            eventSource.removeAllEventDefs();
        });
        if (this.currentPeriod) {
            this.currentPeriod.removeAllEventDefs();
        }
    };
    // Event Mutating
    // -----------------------------------------------------------------------------------------------------------------
    /*
    Returns an undo function.
    */
    EventManager.prototype.mutateEventsWithId = function (eventDefId, eventDefMutation) {
        var currentPeriod = this.currentPeriod;
        var eventDefs;
        var undoFuncs = [];
        if (currentPeriod) {
            currentPeriod.freeze();
            eventDefs = currentPeriod.getEventDefsById(eventDefId);
            eventDefs.forEach(function (eventDef) {
                // add/remove esp because id might change
                currentPeriod.removeEventDef(eventDef);
                undoFuncs.push(eventDefMutation.mutateSingle(eventDef));
                currentPeriod.addEventDef(eventDef);
            });
            currentPeriod.thaw();
            return function () {
                currentPeriod.freeze();
                for (var i = 0; i < eventDefs.length; i++) {
                    currentPeriod.removeEventDef(eventDefs[i]);
                    undoFuncs[i]();
                    currentPeriod.addEventDef(eventDefs[i]);
                }
                currentPeriod.thaw();
            };
        }
        return function () { };
    };
    /*
    copies and then mutates
    */
    EventManager.prototype.buildMutatedEventInstanceGroup = function (eventDefId, eventDefMutation) {
        var eventDefs = this.getEventDefsById(eventDefId);
        var i;
        var defCopy;
        var allInstances = [];
        for (i = 0; i < eventDefs.length; i++) {
            defCopy = eventDefs[i].clone();
            if (defCopy instanceof SingleEventDef_1.default) {
                eventDefMutation.mutateSingle(defCopy);
                allInstances.push.apply(allInstances, // append
                defCopy.buildInstances());
            }
        }
        return new EventInstanceGroup_1.default(allInstances);
    };
    // Freezing
    // -----------------------------------------------------------------------------------------------------------------
    EventManager.prototype.freeze = function () {
        if (this.currentPeriod) {
            this.currentPeriod.freeze();
        }
    };
    EventManager.prototype.thaw = function () {
        if (this.currentPeriod) {
            this.currentPeriod.thaw();
        }
    };
    // methods that simply forward to EventPeriod
    EventManager.prototype.getEventDefsById = function (eventDefId) {
        return this.currentPeriod.getEventDefsById(eventDefId);
    };
    EventManager.prototype.getEventInstances = function () {
        return this.currentPeriod.getEventInstances();
    };
    EventManager.prototype.getEventInstancesWithId = function (eventDefId) {
        return this.currentPeriod.getEventInstancesWithId(eventDefId);
    };
    EventManager.prototype.getEventInstancesWithoutId = function (eventDefId) {
        return this.currentPeriod.getEventInstancesWithoutId(eventDefId);
    };
    return EventManager;
}());
exports.default = EventManager;
EmitterMixin_1.default.mixInto(EventManager);
ListenerMixin_1.default.mixInto(EventManager);
function isSourcesEquivalent(source0, source1) {
    return source0.getPrimitive() === source1.getPrimitive();
}


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Promise_1 = __webpack_require__(19);
var EmitterMixin_1 = __webpack_require__(11);
var UnzonedRange_1 = __webpack_require__(5);
var EventInstanceGroup_1 = __webpack_require__(18);
var EventPeriod = /** @class */ (function () {
    function EventPeriod(start, end, timezone) {
        this.pendingCnt = 0;
        this.freezeDepth = 0;
        this.stuntedReleaseCnt = 0;
        this.releaseCnt = 0;
        this.start = start;
        this.end = end;
        this.timezone = timezone;
        this.unzonedRange = new UnzonedRange_1.default(start.clone().stripZone(), end.clone().stripZone());
        this.requestsByUid = {};
        this.eventDefsByUid = {};
        this.eventDefsById = {};
        this.eventInstanceGroupsById = {};
    }
    EventPeriod.prototype.isWithinRange = function (start, end) {
        // TODO: use a range util function?
        return !start.isBefore(this.start) && !end.isAfter(this.end);
    };
    // Requesting and Purging
    // -----------------------------------------------------------------------------------------------------------------
    EventPeriod.prototype.requestSources = function (sources) {
        this.freeze();
        for (var i = 0; i < sources.length; i++) {
            this.requestSource(sources[i]);
        }
        this.thaw();
    };
    EventPeriod.prototype.requestSource = function (source) {
        var _this = this;
        var request = { source: source, status: 'pending', eventDefs: null };
        this.requestsByUid[source.uid] = request;
        this.pendingCnt += 1;
        source.fetch(this.start, this.end, this.timezone).then(function (eventDefs) {
            if (request.status !== 'cancelled') {
                request.status = 'completed';
                request.eventDefs = eventDefs;
                _this.addEventDefs(eventDefs);
                _this.pendingCnt--;
                _this.tryRelease();
            }
        }, function () {
            if (request.status !== 'cancelled') {
                request.status = 'failed';
                _this.pendingCnt--;
                _this.tryRelease();
            }
        });
    };
    EventPeriod.prototype.purgeSource = function (source) {
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
    };
    EventPeriod.prototype.purgeAllSources = function () {
        var requestsByUid = this.requestsByUid;
        var uid;
        var request;
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
    };
    // Event Definitions
    // -----------------------------------------------------------------------------------------------------------------
    EventPeriod.prototype.getEventDefByUid = function (eventDefUid) {
        return this.eventDefsByUid[eventDefUid];
    };
    EventPeriod.prototype.getEventDefsById = function (eventDefId) {
        var a = this.eventDefsById[eventDefId];
        if (a) {
            return a.slice(); // clone
        }
        return [];
    };
    EventPeriod.prototype.addEventDefs = function (eventDefs) {
        for (var i = 0; i < eventDefs.length; i++) {
            this.addEventDef(eventDefs[i]);
        }
    };
    EventPeriod.prototype.addEventDef = function (eventDef) {
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
    };
    EventPeriod.prototype.removeEventDefsById = function (eventDefId) {
        var _this = this;
        this.getEventDefsById(eventDefId).forEach(function (eventDef) {
            _this.removeEventDef(eventDef);
        });
    };
    EventPeriod.prototype.removeAllEventDefs = function () {
        var isEmpty = $.isEmptyObject(this.eventDefsByUid);
        this.eventDefsByUid = {};
        this.eventDefsById = {};
        this.eventInstanceGroupsById = {};
        if (!isEmpty) {
            this.tryRelease();
        }
    };
    EventPeriod.prototype.removeEventDef = function (eventDef) {
        var eventDefsById = this.eventDefsById;
        var eventDefs = eventDefsById[eventDef.id];
        delete this.eventDefsByUid[eventDef.uid];
        if (eventDefs) {
            util_1.removeExact(eventDefs, eventDef);
            if (!eventDefs.length) {
                delete eventDefsById[eventDef.id];
            }
            this.removeEventInstancesForDef(eventDef);
        }
    };
    // Event Instances
    // -----------------------------------------------------------------------------------------------------------------
    EventPeriod.prototype.getEventInstances = function () {
        var eventInstanceGroupsById = this.eventInstanceGroupsById;
        var eventInstances = [];
        var id;
        for (id in eventInstanceGroupsById) {
            eventInstances.push.apply(eventInstances, // append
            eventInstanceGroupsById[id].eventInstances);
        }
        return eventInstances;
    };
    EventPeriod.prototype.getEventInstancesWithId = function (eventDefId) {
        var eventInstanceGroup = this.eventInstanceGroupsById[eventDefId];
        if (eventInstanceGroup) {
            return eventInstanceGroup.eventInstances.slice(); // clone
        }
        return [];
    };
    EventPeriod.prototype.getEventInstancesWithoutId = function (eventDefId) {
        var eventInstanceGroupsById = this.eventInstanceGroupsById;
        var matchingInstances = [];
        var id;
        for (id in eventInstanceGroupsById) {
            if (id !== eventDefId) {
                matchingInstances.push.apply(matchingInstances, // append
                eventInstanceGroupsById[id].eventInstances);
            }
        }
        return matchingInstances;
    };
    EventPeriod.prototype.addEventInstance = function (eventInstance, eventDefId) {
        var eventInstanceGroupsById = this.eventInstanceGroupsById;
        var eventInstanceGroup = eventInstanceGroupsById[eventDefId] ||
            (eventInstanceGroupsById[eventDefId] = new EventInstanceGroup_1.default());
        eventInstanceGroup.eventInstances.push(eventInstance);
        this.tryRelease();
    };
    EventPeriod.prototype.removeEventInstancesForDef = function (eventDef) {
        var eventInstanceGroupsById = this.eventInstanceGroupsById;
        var eventInstanceGroup = eventInstanceGroupsById[eventDef.id];
        var removeCnt;
        if (eventInstanceGroup) {
            removeCnt = util_1.removeMatching(eventInstanceGroup.eventInstances, function (currentEventInstance) {
                return currentEventInstance.def === eventDef;
            });
            if (!eventInstanceGroup.eventInstances.length) {
                delete eventInstanceGroupsById[eventDef.id];
            }
            if (removeCnt) {
                this.tryRelease();
            }
        }
    };
    // Releasing and Freezing
    // -----------------------------------------------------------------------------------------------------------------
    EventPeriod.prototype.tryRelease = function () {
        if (!this.pendingCnt) {
            if (!this.freezeDepth) {
                this.release();
            }
            else {
                this.stuntedReleaseCnt++;
            }
        }
    };
    EventPeriod.prototype.release = function () {
        this.releaseCnt++;
        this.trigger('release', this.eventInstanceGroupsById);
    };
    EventPeriod.prototype.whenReleased = function () {
        var _this = this;
        if (this.releaseCnt) {
            return Promise_1.default.resolve(this.eventInstanceGroupsById);
        }
        else {
            return Promise_1.default.construct(function (onResolve) {
                _this.one('release', onResolve);
            });
        }
    };
    EventPeriod.prototype.freeze = function () {
        if (!(this.freezeDepth++)) {
            this.stuntedReleaseCnt = 0;
        }
    };
    EventPeriod.prototype.thaw = function () {
        if (!(--this.freezeDepth) && this.stuntedReleaseCnt && !this.pendingCnt) {
            this.release();
        }
    };
    return EventPeriod;
}());
exports.default = EventPeriod;
EmitterMixin_1.default.mixInto(EventPeriod);


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ListenerMixin_1 = __webpack_require__(7);
/* Creates a clone of an element and lets it track the mouse as it moves
----------------------------------------------------------------------------------------------------------------------*/
var MouseFollower = /** @class */ (function () {
    function MouseFollower(sourceEl, options) {
        this.isFollowing = false;
        this.isHidden = false;
        this.isAnimating = false; // doing the revert animation?
        this.options = options = options || {};
        this.sourceEl = sourceEl;
        this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
    }
    // Causes the element to start following the mouse
    MouseFollower.prototype.start = function (ev) {
        if (!this.isFollowing) {
            this.isFollowing = true;
            this.y0 = util_1.getEvY(ev);
            this.x0 = util_1.getEvX(ev);
            this.topDelta = 0;
            this.leftDelta = 0;
            if (!this.isHidden) {
                this.updatePosition();
            }
            if (util_1.getEvIsTouch(ev)) {
                this.listenTo($(document), 'touchmove', this.handleMove);
            }
            else {
                this.listenTo($(document), 'mousemove', this.handleMove);
            }
        }
    };
    // Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
    // `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
    MouseFollower.prototype.stop = function (shouldRevert, callback) {
        var _this = this;
        var revertDuration = this.options.revertDuration;
        var complete = function () {
            _this.isAnimating = false;
            _this.removeElement();
            _this.top0 = _this.left0 = null; // reset state for future updatePosition calls
            if (callback) {
                callback();
            }
        };
        if (this.isFollowing && !this.isAnimating) {
            this.isFollowing = false;
            this.stopListeningTo($(document));
            if (shouldRevert && revertDuration && !this.isHidden) {
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
    };
    // Gets the tracking element. Create it if necessary
    MouseFollower.prototype.getEl = function () {
        var el = this.el;
        if (!el) {
            el = this.el = this.sourceEl.clone()
                .addClass(this.options.additionalClass || '')
                .css({
                position: 'absolute',
                visibility: '',
                display: this.isHidden ? 'none' : '',
                margin: 0,
                right: 'auto',
                bottom: 'auto',
                width: this.sourceEl.width(),
                height: this.sourceEl.height(),
                opacity: this.options.opacity || '',
                zIndex: this.options.zIndex
            });
            // we don't want long taps or any mouse interaction causing selection/menus.
            // would use preventSelection(), but that prevents selectstart, causing problems.
            el.addClass('fc-unselectable');
            el.appendTo(this.parentEl);
        }
        return el;
    };
    // Removes the tracking element if it has already been created
    MouseFollower.prototype.removeElement = function () {
        if (this.el) {
            this.el.remove();
            this.el = null;
        }
    };
    // Update the CSS position of the tracking element
    MouseFollower.prototype.updatePosition = function () {
        var sourceOffset;
        var origin;
        this.getEl(); // ensure this.el
        // make sure origin info was computed
        if (this.top0 == null) {
            sourceOffset = this.sourceEl.offset();
            origin = this.el.offsetParent().offset();
            this.top0 = sourceOffset.top - origin.top;
            this.left0 = sourceOffset.left - origin.left;
        }
        this.el.css({
            top: this.top0 + this.topDelta,
            left: this.left0 + this.leftDelta
        });
    };
    // Gets called when the user moves the mouse
    MouseFollower.prototype.handleMove = function (ev) {
        this.topDelta = util_1.getEvY(ev) - this.y0;
        this.leftDelta = util_1.getEvX(ev) - this.x0;
        if (!this.isHidden) {
            this.updatePosition();
        }
    };
    // Temporarily makes the tracking element invisible. Can be called before following starts
    MouseFollower.prototype.hide = function () {
        if (!this.isHidden) {
            this.isHidden = true;
            if (this.el) {
                this.el.hide();
            }
        }
    };
    // Show the tracking element after it has been temporarily hidden
    MouseFollower.prototype.show = function () {
        if (this.isHidden) {
            this.isHidden = false;
            this.updatePosition();
            this.getEl().show();
        }
    };
    return MouseFollower;
}());
exports.default = MouseFollower;
ListenerMixin_1.default.mixInto(MouseFollower);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var HitDragListener_1 = __webpack_require__(22);
var Interaction_1 = __webpack_require__(15);
var DateClicking = /** @class */ (function (_super) {
    tslib_1.__extends(DateClicking, _super);
    /*
    component must implement:
      - bindDateHandlerToEl
      - getSafeHitFootprint
      - getHitEl
    */
    function DateClicking(component) {
        var _this = _super.call(this, component) || this;
        _this.dragListener = _this.buildDragListener();
        return _this;
    }
    DateClicking.prototype.end = function () {
        this.dragListener.endInteraction();
    };
    DateClicking.prototype.bindToEl = function (el) {
        var component = this.component;
        var dragListener = this.dragListener;
        component.bindDateHandlerToEl(el, 'mousedown', function (ev) {
            if (!component.shouldIgnoreMouse()) {
                dragListener.startInteraction(ev);
            }
        });
        component.bindDateHandlerToEl(el, 'touchstart', function (ev) {
            if (!component.shouldIgnoreTouch()) {
                dragListener.startInteraction(ev);
            }
        });
    };
    // Creates a listener that tracks the user's drag across day elements, for day clicking.
    DateClicking.prototype.buildDragListener = function () {
        var _this = this;
        var component = this.component;
        var dayClickHit; // null if invalid dayClick
        var dragListener = new HitDragListener_1.default(component, {
            scroll: this.opt('dragScroll'),
            interactionStart: function () {
                dayClickHit = dragListener.origHit;
            },
            hitOver: function (hit, isOrig, origHit) {
                // if user dragged to another cell at any point, it can no longer be a dayClick
                if (!isOrig) {
                    dayClickHit = null;
                }
            },
            hitOut: function () {
                dayClickHit = null;
            },
            interactionEnd: function (ev, isCancelled) {
                var componentFootprint;
                if (!isCancelled && dayClickHit) {
                    componentFootprint = component.getSafeHitFootprint(dayClickHit);
                    if (componentFootprint) {
                        _this.view.triggerDayClick(componentFootprint, component.getHitEl(dayClickHit), ev);
                    }
                }
            }
        });
        // because dragListener won't be called with any time delay, "dragging" will begin immediately,
        // which will kill any touchmoving/scrolling. Prevent this.
        dragListener.shouldCancelTouchScroll = false;
        dragListener.scrollAlwaysKills = true;
        return dragListener;
    };
    return DateClicking;
}(Interaction_1.default));
exports.default = DateClicking;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var EventRenderer_1 = __webpack_require__(42);
/*
Only handles foreground segs.
Does not own rendering. Use for low-level util methods by TimeGrid.
*/
var TimeGridEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeGridEventRenderer, _super);
    function TimeGridEventRenderer(timeGrid, fillRenderer) {
        var _this = _super.call(this, timeGrid, fillRenderer) || this;
        _this.timeGrid = timeGrid;
        return _this;
    }
    TimeGridEventRenderer.prototype.renderFgSegs = function (segs) {
        this.renderFgSegsIntoContainers(segs, this.timeGrid.fgContainerEls);
    };
    // Given an array of foreground segments, render a DOM element for each, computes position,
    // and attaches to the column inner-container elements.
    TimeGridEventRenderer.prototype.renderFgSegsIntoContainers = function (segs, containerEls) {
        var segsByCol;
        var col;
        segsByCol = this.timeGrid.groupSegsByCol(segs);
        for (col = 0; col < this.timeGrid.colCnt; col++) {
            this.updateFgSegCoords(segsByCol[col]);
        }
        this.timeGrid.attachSegsByCol(segsByCol, containerEls);
    };
    TimeGridEventRenderer.prototype.unrenderFgSegs = function () {
        if (this.fgSegs) {
            this.fgSegs.forEach(function (seg) {
                seg.el.remove();
            });
        }
    };
    // Computes a default event time formatting string if `timeFormat` is not explicitly defined
    TimeGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return this.opt('noMeridiemTimeFormat'); // like "6:30" (no AM/PM)
    };
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    TimeGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return true;
    };
    // Renders the HTML for a single event segment's default rendering
    TimeGridEventRenderer.prototype.fgSegHtml = function (seg, disableResizing) {
        var view = this.view;
        var calendar = view.calendar;
        var componentFootprint = seg.footprint.componentFootprint;
        var isAllDay = componentFootprint.isAllDay;
        var eventDef = seg.footprint.eventDef;
        var isDraggable = view.isEventDefDraggable(eventDef);
        var isResizableFromStart = !disableResizing && seg.isStart && view.isEventDefResizableFromStart(eventDef);
        var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
        var skinCss = util_1.cssToStr(this.getSkinCss(eventDef));
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
                timeText = this._getTimeText(zonedStart, zonedEnd, isAllDay);
                fullTimeText = this._getTimeText(zonedStart, zonedEnd, isAllDay, 'LT');
                startTimeText = this._getTimeText(zonedStart, zonedEnd, isAllDay, null, false); // displayEnd=false
            }
        }
        else {
            // Display the normal time text for the *event's* times
            timeText = this.getTimeText(seg.footprint);
            fullTimeText = this.getTimeText(seg.footprint, 'LT');
            startTimeText = this.getTimeText(seg.footprint, null, false); // displayEnd=false
        }
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url ?
                ' href="' + util_1.htmlEscape(eventDef.url) + '"' :
                '') +
            (skinCss ?
                ' style="' + skinCss + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (timeText ?
                '<div class="fc-time"' +
                    ' data-start="' + util_1.htmlEscape(startTimeText) + '"' +
                    ' data-full="' + util_1.htmlEscape(fullTimeText) + '"' +
                    '>' +
                    '<span>' + util_1.htmlEscape(timeText) + '</span>' +
                    '</div>' :
                '') +
            (eventDef.title ?
                '<div class="fc-title">' +
                    util_1.htmlEscape(eventDef.title) +
                    '</div>' :
                '') +
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
                '') +
            '</a>';
    };
    // Given segments that are assumed to all live in the *same column*,
    // compute their verical/horizontal coordinates and assign to their elements.
    TimeGridEventRenderer.prototype.updateFgSegCoords = function (segs) {
        this.timeGrid.computeSegVerticals(segs); // horizontals relies on this
        this.computeFgSegHorizontals(segs); // compute horizontal coordinates, z-index's, and reorder the array
        this.timeGrid.assignSegVerticals(segs);
        this.assignFgSegHorizontals(segs);
    };
    // Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
    // NOTE: Also reorders the given array by date!
    TimeGridEventRenderer.prototype.computeFgSegHorizontals = function (segs) {
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
    };
    // Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
    // from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
    // seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
    //
    // The segment might be part of a "series", which means consecutive segments with the same pressure
    // who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
    // segments behind this one in the current series, and `seriesBackwardCoord` is the starting
    // coordinate of the first segment in the series.
    TimeGridEventRenderer.prototype.computeFgSegForwardBack = function (seg, seriesBackwardPressure, seriesBackwardCoord) {
        var forwardSegs = seg.forwardSegs;
        var i;
        if (seg.forwardCoord === undefined) {
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
            for (i = 0; i < forwardSegs.length; i++) {
                this.computeFgSegForwardBack(forwardSegs[i], 0, seg.forwardCoord);
            }
        }
    };
    TimeGridEventRenderer.prototype.sortForwardSegs = function (forwardSegs) {
        forwardSegs.sort(util_1.proxy(this, 'compareForwardSegs'));
    };
    // A cmp function for determining which forward segment to rely on more when computing coordinates.
    TimeGridEventRenderer.prototype.compareForwardSegs = function (seg1, seg2) {
        // put higher-pressure first
        return seg2.forwardPressure - seg1.forwardPressure ||
            // put segments that are closer to initial edge first (and favor ones with no coords yet)
            (seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
            // do normal sorting...
            this.compareEventSegs(seg1, seg2);
    };
    // Given foreground event segments that have already had their position coordinates computed,
    // assigns position-related CSS values to their elements.
    TimeGridEventRenderer.prototype.assignFgSegHorizontals = function (segs) {
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            seg.el.css(this.generateFgSegHorizontalCss(seg));
            // if the height is short, add a className for alternate styling
            if (seg.bottom - seg.top < 30) {
                seg.el.addClass('fc-short');
            }
        }
    };
    // Generates an object with CSS properties/values that should be applied to an event segment element.
    // Contains important positioning-related properties that should be applied to any event element, customized or not.
    TimeGridEventRenderer.prototype.generateFgSegHorizontalCss = function (seg) {
        var shouldOverlap = this.opt('slotEventOverlap');
        var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
        var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
        var props = this.timeGrid.generateSegVerticalCss(seg); // get top/bottom first
        var isRTL = this.timeGrid.isRTL;
        var left; // amount of space from left edge, a fraction of the total width
        var right; // amount of space from right edge, a fraction of the total width
        if (shouldOverlap) {
            // double the width, but don't go beyond the maximum forward coordinate (1.0)
            forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
        }
        if (isRTL) {
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
            props[isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
        }
        return props;
    };
    return TimeGridEventRenderer;
}(EventRenderer_1.default));
exports.default = TimeGridEventRenderer;
// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
    var levels = [];
    var i;
    var seg;
    var j;
    for (i = 0; i < segs.length; i++) {
        seg = segs[i];
        // go through all the levels and stop on the first level where there are no collisions
        for (j = 0; j < levels.length; j++) {
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
    var i;
    var level;
    var j;
    var seg;
    var k;
    for (i = 0; i < levels.length; i++) {
        level = levels[i];
        for (j = 0; j < level.length; j++) {
            seg = level[j];
            seg.forwardSegs = [];
            for (k = i + 1; k < levels.length; k++) {
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
    var i;
    var forwardSeg;
    if (seg.forwardPressure === undefined) {
        for (i = 0; i < forwardSegs.length; i++) {
            forwardSeg = forwardSegs[i];
            // figure out the child's maximum forward path
            computeSlotSegPressures(forwardSeg);
            // either use the existing maximum, or use the child's forward pressure
            // plus one (for the forwardSeg itself)
            forwardPressure = Math.max(forwardPressure, 1 + forwardSeg.forwardPressure);
        }
        seg.forwardPressure = forwardPressure;
    }
}
// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
    if (results === void 0) { results = []; }
    for (var i = 0; i < otherSegs.length; i++) {
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


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var HelperRenderer_1 = __webpack_require__(58);
var TimeGridHelperRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeGridHelperRenderer, _super);
    function TimeGridHelperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeGridHelperRenderer.prototype.renderSegs = function (segs, sourceSeg) {
        var helperNodes = [];
        var i;
        var seg;
        var sourceEl;
        // TODO: not good to call eventRenderer this way
        this.eventRenderer.renderFgSegsIntoContainers(segs, this.component.helperContainerEls);
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
            helperNodes.push(seg.el[0]);
        }
        return $(helperNodes); // must return the elements rendered
    };
    return TimeGridHelperRenderer;
}(HelperRenderer_1.default));
exports.default = TimeGridHelperRenderer;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var FillRenderer_1 = __webpack_require__(57);
var TimeGridFillRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeGridFillRenderer, _super);
    function TimeGridFillRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeGridFillRenderer.prototype.attachSegEls = function (type, segs) {
        var timeGrid = this.component;
        var containerEls;
        // TODO: more efficient lookup
        if (type === 'bgEvent') {
            containerEls = timeGrid.bgContainerEls;
        }
        else if (type === 'businessHours') {
            containerEls = timeGrid.businessContainerEls;
        }
        else if (type === 'highlight') {
            containerEls = timeGrid.highlightContainerEls;
        }
        timeGrid.updateSegVerticals(segs);
        timeGrid.attachSegsByCol(timeGrid.groupSegsByCol(segs), containerEls);
        return segs.map(function (seg) {
            return seg.el[0];
        });
    };
    return TimeGridFillRenderer;
}(FillRenderer_1.default));
exports.default = TimeGridFillRenderer;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ListenerMixin_1 = __webpack_require__(7);
var Popover = /** @class */ (function () {
    function Popover(options) {
        this.isHidden = true;
        this.margin = 10; // the space required between the popover and the edges of the scroll container
        this.options = options || {};
    }
    // Shows the popover on the specified position. Renders it if not already
    Popover.prototype.show = function () {
        if (this.isHidden) {
            if (!this.el) {
                this.render();
            }
            this.el.show();
            this.position();
            this.isHidden = false;
            this.trigger('show');
        }
    };
    // Hides the popover, through CSS, but does not remove it from the DOM
    Popover.prototype.hide = function () {
        if (!this.isHidden) {
            this.el.hide();
            this.isHidden = true;
            this.trigger('hide');
        }
    };
    // Creates `this.el` and renders content inside of it
    Popover.prototype.render = function () {
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
        this.el.on('click', '.fc-close', function () {
            _this.hide();
        });
        if (options.autoHide) {
            this.listenTo($(document), 'mousedown', this.documentMousedown);
        }
    };
    // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
    Popover.prototype.documentMousedown = function (ev) {
        // only hide the popover if the click happened outside the popover
        if (this.el && !$(ev.target).closest(this.el).length) {
            this.hide();
        }
    };
    // Hides and unregisters any handlers
    Popover.prototype.removeElement = function () {
        this.hide();
        if (this.el) {
            this.el.remove();
            this.el = null;
        }
        this.stopListeningTo($(document), 'mousedown');
    };
    // Positions the popover optimally, using the top/left/right options
    Popover.prototype.position = function () {
        var options = this.options;
        var origin = this.el.offsetParent().offset();
        var width = this.el.outerWidth();
        var height = this.el.outerHeight();
        var windowEl = $(window);
        var viewportEl = util_1.getScrollParent(this.el);
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
        if (viewportEl.is(window) || viewportEl.is(document)) {
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
    };
    // Triggers a callback. Calls a function in the option hash of the same name.
    // Arguments beyond the first `name` are forwarded on.
    // TODO: better code reuse for this. Repeat code
    Popover.prototype.trigger = function (name) {
        if (this.options[name]) {
            this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
    return Popover;
}());
exports.default = Popover;
ListenerMixin_1.default.mixInto(Popover);


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var EventRenderer_1 = __webpack_require__(42);
/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/
var DayGridEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DayGridEventRenderer, _super);
    function DayGridEventRenderer(dayGrid, fillRenderer) {
        var _this = _super.call(this, dayGrid, fillRenderer) || this;
        _this.dayGrid = dayGrid;
        return _this;
    }
    DayGridEventRenderer.prototype.renderBgRanges = function (eventRanges) {
        // don't render timed background events
        eventRanges = $.grep(eventRanges, function (eventRange) {
            return eventRange.eventDef.isAllDay();
        });
        _super.prototype.renderBgRanges.call(this, eventRanges);
    };
    // Renders the given foreground event segments onto the grid
    DayGridEventRenderer.prototype.renderFgSegs = function (segs) {
        var rowStructs = this.rowStructs = this.renderSegRows(segs);
        // append to each row's content skeleton
        this.dayGrid.rowEls.each(function (i, rowNode) {
            $(rowNode).find('.fc-content-skeleton > table').append(rowStructs[i].tbodyEl);
        });
    };
    // Unrenders all currently rendered foreground event segments
    DayGridEventRenderer.prototype.unrenderFgSegs = function () {
        var rowStructs = this.rowStructs || [];
        var rowStruct;
        while ((rowStruct = rowStructs.pop())) {
            rowStruct.tbodyEl.remove();
        }
        this.rowStructs = null;
    };
    // Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
    // Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
    // PRECONDITION: each segment shoud already have a rendered and assigned `.el`
    DayGridEventRenderer.prototype.renderSegRows = function (segs) {
        var rowStructs = [];
        var segRows;
        var row;
        segRows = this.groupSegRows(segs); // group into nested arrays
        // iterate each row of segment groupings
        for (row = 0; row < segRows.length; row++) {
            rowStructs.push(this.renderSegRow(row, segRows[row]));
        }
        return rowStructs;
    };
    // Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
    // the segments. Returns object with a bunch of internal data about how the render was calculated.
    // NOTE: modifies rowSegs
    DayGridEventRenderer.prototype.renderSegRow = function (row, rowSegs) {
        var colCnt = this.dayGrid.colCnt;
        var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
        var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
        var tbody = $('<tbody/>');
        var segMatrix = []; // lookup for which segments are rendered into which level+col cells
        var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
        var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
        var i;
        var levelSegs;
        var col;
        var tr;
        var j;
        var seg;
        var td;
        // populates empty cells from the current column (`col`) to `endCol`
        function emptyCellsUntil(endCol) {
            while (col < endCol) {
                // try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
                td = (loneCellMatrix[i - 1] || [])[col];
                if (td) {
                    td.attr('rowspan', parseInt(td.attr('rowspan') || 1, 10) + 1);
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
        for (i = 0; i < levelCnt; i++) {
            levelSegs = segLevels[i];
            col = 0;
            tr = $('<tr/>');
            segMatrix.push([]);
            cellMatrix.push([]);
            loneCellMatrix.push([]);
            // levelCnt might be 1 even though there are no actual levels. protect against this.
            // this single empty row is useful for styling.
            if (levelSegs) {
                for (j = 0; j < levelSegs.length; j++) {
                    seg = levelSegs[j];
                    emptyCellsUntil(seg.leftCol);
                    // create a container that occupies or more columns. append the event element.
                    td = $('<td class="fc-event-container"/>').append(seg.el);
                    if (seg.leftCol !== seg.rightCol) {
                        td.attr('colspan', seg.rightCol - seg.leftCol + 1);
                    }
                    else {
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
            this.dayGrid.bookendCells(tr);
            tbody.append(tr);
        }
        return {
            row: row,
            tbodyEl: tbody,
            cellMatrix: cellMatrix,
            segMatrix: segMatrix,
            segLevels: segLevels,
            segs: rowSegs
        };
    };
    // Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
    // NOTE: modifies segs
    DayGridEventRenderer.prototype.buildSegLevels = function (segs) {
        var levels = [];
        var i;
        var seg;
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
    };
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
    DayGridEventRenderer.prototype.groupSegRows = function (segs) {
        var segRows = [];
        var i;
        for (i = 0; i < this.dayGrid.rowCnt; i++) {
            segRows.push([]);
        }
        for (i = 0; i < segs.length; i++) {
            segRows[segs[i].row].push(segs[i]);
        }
        return segRows;
    };
    // Computes a default event time formatting string if `timeFormat` is not explicitly defined
    DayGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return this.opt('extraSmallTimeFormat'); // like "6p" or "6:30p"
    };
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    DayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return this.dayGrid.colCnt === 1; // we'll likely have space if there's only one day
    };
    // Builds the HTML to be used for the default element for an individual segment
    DayGridEventRenderer.prototype.fgSegHtml = function (seg, disableResizing) {
        var view = this.view;
        var eventDef = seg.footprint.eventDef;
        var isAllDay = seg.footprint.componentFootprint.isAllDay;
        var isDraggable = view.isEventDefDraggable(eventDef);
        var isResizableFromStart = !disableResizing && isAllDay &&
            seg.isStart && view.isEventDefResizableFromStart(eventDef);
        var isResizableFromEnd = !disableResizing && isAllDay &&
            seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
        var skinCss = util_1.cssToStr(this.getSkinCss(eventDef));
        var timeHtml = '';
        var timeText;
        var titleHtml;
        classes.unshift('fc-day-grid-event', 'fc-h-event');
        // Only display a timed events time if it is the starting segment
        if (seg.isStart) {
            timeText = this.getTimeText(seg.footprint);
            if (timeText) {
                timeHtml = '<span class="fc-time">' + util_1.htmlEscape(timeText) + '</span>';
            }
        }
        titleHtml =
            '<span class="fc-title">' +
                (util_1.htmlEscape(eventDef.title || '') || '&nbsp;') + // we always want one line of height
                '</span>';
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url ?
                ' href="' + util_1.htmlEscape(eventDef.url) + '"' :
                '') +
            (skinCss ?
                ' style="' + skinCss + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (this.dayGrid.isRTL ?
                titleHtml + ' ' + timeHtml : // put a natural space in between
                timeHtml + ' ' + titleHtml //
            ) +
            '</div>' +
            (isResizableFromStart ?
                '<div class="fc-resizer fc-start-resizer" />' :
                '') +
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer" />' :
                '') +
            '</a>';
    };
    return DayGridEventRenderer;
}(EventRenderer_1.default));
exports.default = DayGridEventRenderer;
// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
    var i;
    var otherSeg;
    for (i = 0; i < otherSegs.length; i++) {
        otherSeg = otherSegs[i];
        if (otherSeg.leftCol <= seg.rightCol &&
            otherSeg.rightCol >= seg.leftCol) {
            return true;
        }
    }
    return false;
}
// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
    return a.leftCol - b.leftCol;
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var HelperRenderer_1 = __webpack_require__(58);
var DayGridHelperRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DayGridHelperRenderer, _super);
    function DayGridHelperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
    DayGridHelperRenderer.prototype.renderSegs = function (segs, sourceSeg) {
        var helperNodes = [];
        var rowStructs;
        // TODO: not good to call eventRenderer this way
        rowStructs = this.eventRenderer.renderSegRows(segs);
        // inject each new event skeleton into each associated row
        this.component.rowEls.each(function (row, rowNode) {
            var rowEl = $(rowNode); // the .fc-row
            var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
            var skeletonTopEl;
            var skeletonTop;
            // If there is an original segment, match the top position. Otherwise, put it at the row's top level
            if (sourceSeg && sourceSeg.row === row) {
                skeletonTop = sourceSeg.el.position().top;
            }
            else {
                skeletonTopEl = rowEl.find('.fc-content-skeleton tbody');
                if (!skeletonTopEl.length) {
                    skeletonTopEl = rowEl.find('.fc-content-skeleton table');
                }
                skeletonTop = skeletonTopEl.position().top;
            }
            skeletonEl.css('top', skeletonTop)
                .find('table')
                .append(rowStructs[row].tbodyEl);
            rowEl.append(skeletonEl);
            helperNodes.push(skeletonEl[0]);
        });
        return $(helperNodes); // must return the elements rendered
    };
    return DayGridHelperRenderer;
}(HelperRenderer_1.default));
exports.default = DayGridHelperRenderer;


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var FillRenderer_1 = __webpack_require__(57);
var DayGridFillRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DayGridFillRenderer, _super);
    function DayGridFillRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fillSegTag = 'td'; // override the default tag name
        return _this;
    }
    DayGridFillRenderer.prototype.attachSegEls = function (type, segs) {
        var nodes = [];
        var i;
        var seg;
        var skeletonEl;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            skeletonEl = this.renderFillRow(type, seg);
            this.component.rowEls.eq(seg.row).append(skeletonEl);
            nodes.push(skeletonEl[0]);
        }
        return nodes;
    };
    // Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
    DayGridFillRenderer.prototype.renderFillRow = function (type, seg) {
        var colCnt = this.component.colCnt;
        var startCol = seg.leftCol;
        var endCol = seg.rightCol + 1;
        var className;
        var skeletonEl;
        var trEl;
        if (type === 'businessHours') {
            className = 'bgevent';
        }
        else {
            className = type.toLowerCase();
        }
        skeletonEl = $('<div class="fc-' + className + '-skeleton">' +
            '<table><tr/></table>' +
            '</div>');
        trEl = skeletonEl.find('tr');
        if (startCol > 0) {
            trEl.append('<td colspan="' + startCol + '"/>');
        }
        trEl.append(seg.el.attr('colspan', endCol - startCol));
        if (endCol < colCnt) {
            trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
        }
        this.component.bookendCells(trEl);
        return skeletonEl;
    };
    return DayGridFillRenderer;
}(FillRenderer_1.default));
exports.default = DayGridFillRenderer;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var BasicViewDateProfileGenerator_1 = __webpack_require__(228);
var UnzonedRange_1 = __webpack_require__(5);
var MonthViewDateProfileGenerator = /** @class */ (function (_super) {
    tslib_1.__extends(MonthViewDateProfileGenerator, _super);
    function MonthViewDateProfileGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Computes the date range that will be rendered.
    MonthViewDateProfileGenerator.prototype.buildRenderRange = function (currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
        var renderUnzonedRange = _super.prototype.buildRenderRange.call(this, currentUnzonedRange, currentRangeUnit, isRangeAllDay);
        var start = this.msToUtcMoment(renderUnzonedRange.startMs, isRangeAllDay);
        var end = this.msToUtcMoment(renderUnzonedRange.endMs, isRangeAllDay);
        var rowCnt;
        // ensure 6 weeks
        if (this.opt('fixedWeekCount')) {
            rowCnt = Math.ceil(// could be partial weeks due to hiddenDays
            end.diff(start, 'weeks', true) // dontRound=true
            );
            end.add(6 - rowCnt, 'weeks');
        }
        return new UnzonedRange_1.default(start, end);
    };
    return MonthViewDateProfileGenerator;
}(BasicViewDateProfileGenerator_1.default));
exports.default = MonthViewDateProfileGenerator;


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var EventRenderer_1 = __webpack_require__(42);
var ListEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ListEventRenderer, _super);
    function ListEventRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListEventRenderer.prototype.renderFgSegs = function (segs) {
        if (!segs.length) {
            this.component.renderEmptyMessage();
        }
        else {
            this.component.renderSegList(segs);
        }
    };
    // generates the HTML for a single event row
    ListEventRenderer.prototype.fgSegHtml = function (seg) {
        var view = this.view;
        var calendar = view.calendar;
        var theme = calendar.theme;
        var eventFootprint = seg.footprint;
        var eventDef = eventFootprint.eventDef;
        var componentFootprint = eventFootprint.componentFootprint;
        var url = eventDef.url;
        var classes = ['fc-list-item'].concat(this.getClasses(eventDef));
        var bgColor = this.getBgColor(eventDef);
        var timeHtml;
        if (componentFootprint.isAllDay) {
            timeHtml = view.getAllDayHtml();
        }
        else if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
            if (seg.isStart || seg.isEnd) {
                timeHtml = util_1.htmlEscape(this._getTimeText(calendar.msToMoment(seg.startMs), calendar.msToMoment(seg.endMs), componentFootprint.isAllDay));
            }
            else {
                timeHtml = view.getAllDayHtml();
            }
        }
        else {
            // Display the normal time text for the *event's* times
            timeHtml = util_1.htmlEscape(this.getTimeText(eventFootprint));
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
            '<a' + (url ? ' href="' + util_1.htmlEscape(url) + '"' : '') + '>' +
            util_1.htmlEscape(eventDef.title || '') +
            '</a>' +
            '</td>' +
            '</tr>';
    };
    // like "4:00am"
    ListEventRenderer.prototype.computeEventTimeFormat = function () {
        return this.opt('mediumTimeFormat');
    };
    return ListEventRenderer;
}(EventRenderer_1.default));
exports.default = ListEventRenderer;


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var EventPointing_1 = __webpack_require__(59);
var ListEventPointing = /** @class */ (function (_super) {
    tslib_1.__extends(ListEventPointing, _super);
    function ListEventPointing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // for events with a url, the whole <tr> should be clickable,
    // but it's impossible to wrap with an <a> tag. simulate this.
    ListEventPointing.prototype.handleClick = function (seg, ev) {
        var url;
        _super.prototype.handleClick.call(this, seg, ev); // might prevent the default action
        // not clicking on or within an <a> with an href
        if (!$(ev.target).closest('a[href]').length) {
            url = seg.footprint.eventDef.url;
            if (url && !ev.isDefaultPrevented()) {
                window.location.href = url; // simulate link click
            }
        }
    };
    return ListEventPointing;
}(EventPointing_1.default));
exports.default = ListEventPointing;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventSourceParser_1 = __webpack_require__(37);
var ArrayEventSource_1 = __webpack_require__(52);
var FuncEventSource_1 = __webpack_require__(215);
var JsonFeedEventSource_1 = __webpack_require__(216);
EventSourceParser_1.default.registerClass(ArrayEventSource_1.default);
EventSourceParser_1.default.registerClass(FuncEventSource_1.default);
EventSourceParser_1.default.registerClass(JsonFeedEventSource_1.default);


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ThemeRegistry_1 = __webpack_require__(51);
var StandardTheme_1 = __webpack_require__(213);
var JqueryUiTheme_1 = __webpack_require__(214);
var BootstrapTheme_1 = __webpack_require__(258);
ThemeRegistry_1.defineThemeSystem('standard', StandardTheme_1.default);
ThemeRegistry_1.defineThemeSystem('jquery-ui', JqueryUiTheme_1.default);
ThemeRegistry_1.defineThemeSystem('bootstrap3', BootstrapTheme_1.default);


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Theme_1 = __webpack_require__(38);
var BootstrapTheme = /** @class */ (function (_super) {
    tslib_1.__extends(BootstrapTheme, _super);
    function BootstrapTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BootstrapTheme;
}(Theme_1.default));
exports.default = BootstrapTheme;
BootstrapTheme.prototype.classes = {
    widget: 'fc-bootstrap3',
    tableGrid: 'table-bordered',
    tableList: 'table table-striped',
    buttonGroup: 'btn-group',
    button: 'btn btn-default',
    stateActive: 'active',
    stateDisabled: 'disabled',
    today: 'alert alert-info',
    popover: 'panel panel-default',
    popoverHeader: 'panel-heading',
    popoverContent: 'panel-body',
    // day grid
    headerRow: 'panel-default',
    dayRow: 'panel-default',
    // list view
    listView: 'panel panel-default'
};
BootstrapTheme.prototype.baseIconClass = 'glyphicon';
BootstrapTheme.prototype.iconClasses = {
    close: 'glyphicon-remove',
    prev: 'glyphicon-chevron-left',
    next: 'glyphicon-chevron-right',
    prevYear: 'glyphicon-backward',
    nextYear: 'glyphicon-forward'
};
BootstrapTheme.prototype.iconOverrideOption = 'bootstrapGlyphicons';
BootstrapTheme.prototype.iconOverrideCustomButtonOption = 'bootstrapGlyphicon';
BootstrapTheme.prototype.iconOverridePrefix = 'glyphicon-';


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ViewRegistry_1 = __webpack_require__(21);
var BasicView_1 = __webpack_require__(62);
var MonthView_1 = __webpack_require__(229);
ViewRegistry_1.defineView('basic', {
    'class': BasicView_1.default
});
ViewRegistry_1.defineView('basicDay', {
    type: 'basic',
    duration: { days: 1 }
});
ViewRegistry_1.defineView('basicWeek', {
    type: 'basic',
    duration: { weeks: 1 }
});
ViewRegistry_1.defineView('month', {
    'class': MonthView_1.default,
    duration: { months: 1 },
    defaults: {
        fixedWeekCount: true
    }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ViewRegistry_1 = __webpack_require__(21);
var AgendaView_1 = __webpack_require__(226);
ViewRegistry_1.defineView('agenda', {
    'class': AgendaView_1.default,
    defaults: {
        allDaySlot: true,
        slotDuration: '00:30:00',
        slotEventOverlap: true // a bad name. confused with overlap/constraint system
    }
});
ViewRegistry_1.defineView('agendaDay', {
    type: 'agenda',
    duration: { days: 1 }
});
ViewRegistry_1.defineView('agendaWeek', {
    type: 'agenda',
    duration: { weeks: 1 }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ViewRegistry_1 = __webpack_require__(21);
var ListView_1 = __webpack_require__(230);
ViewRegistry_1.defineView('list', {
    'class': ListView_1.default,
    buttonTextKey: 'list',
    defaults: {
        buttonText: 'list',
        listDayFormat: 'LL',
        noEventsMessage: 'No events to display'
    }
});
ViewRegistry_1.defineView('listDay', {
    type: 'list',
    duration: { days: 1 },
    defaults: {
        listDayFormat: 'dddd' // day-of-week is all we need. full date is probably in header
    }
});
ViewRegistry_1.defineView('listWeek', {
    type: 'list',
    duration: { weeks: 1 },
    defaults: {
        listDayFormat: 'dddd',
        listDayAltFormat: 'LL'
    }
});
ViewRegistry_1.defineView('listMonth', {
    type: 'list',
    duration: { month: 1 },
    defaults: {
        listDayAltFormat: 'dddd' // day-of-week is nice-to-have
    }
});
ViewRegistry_1.defineView('listYear', {
    type: 'list',
    duration: { year: 1 },
    defaults: {
        listDayAltFormat: 'dddd' // day-of-week is nice-to-have
    }
});


/***/ }),
/* 262 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });


/***/ })
/******/ ]);
});