/*!
 * FullCalendar v2.3.1 Stylesheet
 * Docs & License: http://fullcalendar.io/
 * (c) 2015 Adam Shaw
 */


.fc {
	direction: ltr;
	text-align: left;
}

.fc-rtl {
	text-align: right;
}

body .fc { /* extra precedence to overcome jqui */
	font-size: 1em;
}


/* Colors
--------------------------------------------------------------------------------------------------*/

.fc-unthemed th,
.fc-unthemed td,
.fc-unthemed thead,
.fc-unthemed tbody,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-row,
.fc-unthemed .fc-popover {
	border-color: #ddd;
}

.fc-unthemed .fc-popover {
	background-color: #fff;
}

.fc-unthemed .fc-divider,
.fc-unthemed .fc-popover .fc-header {
	background: #eee;
}

.fc-unthemed .fc-popover .fc-header .fc-close {
	color: #666;
}

.fc-unthemed .fc-today {
	background: #fcf8e3;
}

.fc-highlight { /* when user is selecting cells */
	background: #bce8f1;
	opacity: .3;
	filter: alpha(opacity=30); /* for IE */
}

.fc-bgevent { /* default look for background events */
	background: rgb(143, 223, 130);
	opacity: .3;
	filter: alpha(opacity=30); /* for IE */
}

.fc-nonbusiness { /* default look for non-business-hours areas */
	/* will inherit .fc-bgevent's styles */
	background: #d7d7d7;
}


/* Icons (inline elements with styled text that mock arrow icons)
--------------------------------------------------------------------------------------------------*/

.fc-icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	line-height: 1em;
	font-size: 1em;
	text-align: center;
	overflow: hidden;
	font-family: "Courier New", Courier, monospace;
}

/*
Acceptable font-family overrides for individual icons:
	"Arial", sans-serif
	"Times New Roman", serif

NOTE: use percentage font sizes or else old IE chokes
*/

.fc-icon:after {
	position: relative;
	margin: 0 -1em; /* ensures character will be centered, regardless of width */
}

.fc-icon-left-single-arrow:after {
	content: "\02039";
	font-weight: bold;
	font-size: 200%;
	top: -7%;
	left: 3%;
}

.fc-icon-right-single-arrow:after {
	content: "\0203A";
	font-weight: bold;
	font-size: 200%;
	top: -7%;
	left: -3%;
}

.fc-icon-left-double-arrow:after {
	content: "\000AB";
	font-size: 160%;
	top: -7%;
}

.fc-icon-right-double-arrow:after {
	content: "\000BB";
	font-size: 160%;
	top: -7%;
}

.fc-icon-left-triangle:after {
	content: "\25C4";
	font-size: 125%;
	top: 3%;
	left: -2%;
}

.fc-icon-right-triangle:after {
	content: "\25BA";
	font-size: 125%;
	top: 3%;
	left: 2%;
}

.fc-icon-down-triangle:after {
	content: "\25BC";
	font-size: 125%;
	top: 2%;
}

.fc-icon-x:after {
	content: "\000D7";
	font-size: 200%;
	top: 6%;
}


/* Buttons (styled <button> tags, normalized to work cross-browser)
--------------------------------------------------------------------------------------------------*/

.fc button {
	/* force height to include the border and padding */
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;

	/* dimensions */
	margin: 0;
	height: 2.1em;
	padding: 0 .6em;

	/* text & cursor */
	font-size: 1em; /* normalize */
	white-space: nowrap;
	cursor: pointer;
}

/* Firefox has an annoying inner border */
.fc button::-moz-focus-inner { margin: 0; padding: 0; }
	
.fc-state-default { /* non-theme */
	border: 1px solid;
}

.fc-state-default.fc-corner-left { /* non-theme */
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.fc-state-default.fc-corner-right { /* non-theme */
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

/* icons in buttons */

.fc button .fc-icon { /* non-theme */
	position: relative;
	top: -0.05em; /* seems to be a good adjustment across browsers */
	margin: 0 .2em;
	vertical-align: middle;
}
	
/*
  button states
  borrowed from twitter bootstrap (http://twitter.github.com/bootstrap/)
*/

.fc-state-default {
	background-color: #f5f5f5;
	background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
	background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
	background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
	background-repeat: repeat-x;
	border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
	color: #333;
	text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fc-state-hover,
.fc-state-down,
.fc-state-active,
.fc-state-disabled {
	color: #333333;
	background-color: #e6e6e6;
}

.fc-state-hover {
	color: #333333;
	text-decoration: none;
	background-position: 0 -15px;
	-webkit-transition: background-position 0.1s linear;
	   -moz-transition: background-position 0.1s linear;
	     -o-transition: background-position 0.1s linear;
	        transition: background-position 0.1s linear;
}

.fc-state-down,
.fc-state-active {
	background-color: #cccccc;
	background-image: none;
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fc-state-disabled {
	cursor: default;
	background-image: none;
	opacity: 0.65;
	filter: alpha(opacity=65);
	box-shadow: none;
}


/* Buttons Groups
--------------------------------------------------------------------------------------------------*/

.fc-button-group {
	display: inline-block;
}

/*
every button that is not first in a button group should scootch over one pixel and cover the
previous button's border...
*/

.fc .fc-button-group > * { /* extra precedence b/c buttons have margin set to zero */
	float: left;
	margin: 0 0 0 -1px;
}

.fc .fc-button-group > :first-child { /* same */
	margin-left: 0;
}


/* Popover
--------------------------------------------------------------------------------------------------*/

.fc-popover {
	position: absolute;
	box-shadow: 0 2px 6px rgba(0,0,0,.15);
}

.fc-popover .fc-header { /* TODO: be more consistent with fc-head/fc-body */
	padding: 2px 4px;
}

.fc-popover .fc-header .fc-title {
	margin: 0 2px;
}

.fc-popover .fc-header .fc-close {
	cursor: pointer;
}

.fc-ltr .fc-popover .fc-header .fc-title,
.fc-rtl .fc-popover .fc-header .fc-close {
	float: left;
}

.fc-rtl .fc-popover .fc-header .fc-title,
.fc-ltr .fc-popover .fc-header .fc-close {
	float: right;
}

/* unthemed */

.fc-unthemed .fc-popover {
	border-width: 1px;
	border-style: solid;
}

.fc-unthemed .fc-popover .fc-header .fc-close {
	font-size: .9em;
	margin-top: 2px;
}

/* jqui themed */

.fc-popover > .ui-widget-header + .ui-widget-content {
	border-top: 0; /* where they meet, let the header have the border */
}


/* Misc Reusable Components
--------------------------------------------------------------------------------------------------*/

.fc-divider {
	border-style: solid;
	border-width: 1px;
}

hr.fc-divider {
	height: 0;
	margin: 0;
	padding: 0 0 2px; /* height is unreliable across browsers, so use padding */
	border-width: 1px 0;
}

.fc-clear {
	clear: both;
}

.fc-bg,
.fc-bgevent-skeleton,
.fc-highlight-skeleton,
.fc-helper-skeleton {
	/* these element should always cling to top-left/right corners */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.fc-bg {
	bottom: 0; /* strech bg to bottom edge */
}

.fc-bg table {
	height: 100%; /* strech bg to bottom edge */
}


/* Tables
--------------------------------------------------------------------------------------------------*/

.fc table {
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	border-spacing: 0;
	font-size: 1em; /* normalize cross-browser */
}

.fc th {
	text-align: center;
}

.fc th,
.fc td {
	border-style: solid;
	border-width: 1px;
	padding: 0;
	vertical-align: top;
}

.fc td.fc-today {
	border-style: double; /* overcome neighboring borders */
}


/* Fake Table Rows
--------------------------------------------------------------------------------------------------*/

.fc .fc-row { /* extra precedence to overcome themes w/ .ui-widget-content forcing a 1px border */
	/* no visible border by default. but make available if need be (scrollbar width compensation) */
	border-style: solid;
	border-width: 0;
}

.fc-row table {
	/* don't put left/right border on anything within a fake row.
	   the outer tbody will worry about this */
	border-left: 0 hidden transparent;
	border-right: 0 hidden transparent;

	/* no bottom borders on rows */
	border-bottom: 0 hidden transparent; 
}

.fc-row:first-child table {
	border-top: 0 hidden transparent; /* no top border on first row */
}


/* Day Row (used within the header and the DayGrid)
--------------------------------------------------------------------------------------------------*/

.fc-row {
	position: relative;
}

.fc-row .fc-bg {
	z-index: 1;
}

/* highlighting cells & background event skeleton */

.fc-row .fc-bgevent-skeleton,
.fc-row .fc-highlight-skeleton {
	bottom: 0; /* stretch skeleton to bottom of row */
}

.fc-row .fc-bgevent-skeleton table,
.fc-row .fc-highlight-skeleton table {
	height: 100%; /* stretch skeleton to bottom of row */
}

.fc-row .fc-highlight-skeleton td,
.fc-row .fc-bgevent-skeleton td {
	border-color: transparent;
}

.fc-row .fc-bgevent-skeleton {
	z-index: 2;

}

.fc-row .fc-highlight-skeleton {
	z-index: 3;
}

/*
row content (which contains day/week numbers and events) as well as "helper" (which contains
temporary rendered events).
*/

.fc-row .fc-content-skeleton {
	position: relative;
	z-index: 4;
	padding-bottom: 2px; /* matches the space above the events */
}

.fc-row .fc-helper-skeleton {
	z-index: 5;
}

.fc-row .fc-content-skeleton td,
.fc-row .fc-helper-skeleton td {
	/* see-through to the background below */
	background: none; /* in case <td>s are globally styled */
	border-color: transparent;

	/* don't put a border between events and/or the day number */
	border-bottom: 0;
}

.fc-row .fc-content-skeleton tbody td, /* cells with events inside (so NOT the day number cell) */
.fc-row .fc-helper-skeleton tbody td {
	/* don't put a border between event cells */
	border-top: 0;
}


/* Scrolling Container
--------------------------------------------------------------------------------------------------*/

.fc-scroller { /* this class goes on elements for guaranteed vertical scrollbars */
	overflow-y: scroll;
	overflow-x: hidden;
}

.fc-scroller > * { /* we expect an immediate inner element */
	position: relative; /* re-scope all positions */
	width: 100%; /* hack to force re-sizing this inner element when scrollbars appear/disappear */
	overflow: hidden; /* don't let negative margins or absolute positioning create further scroll */
}


/* Global Event Styles
--------------------------------------------------------------------------------------------------*/

.fc-event {
	position: relative; /* for resize handle and other inner positioning */
	display: block; /* make the <a> tag block */
	font-size: .85em;
	line-height: 1.3;
	border-radius: 3px;
	border: 1px solid #3a87ad; /* default BORDER color */
	background-color: #3a87ad; /* default BACKGROUND color */
	font-weight: normal; /* undo jqui's ui-widget-header bold */
}

/* overpower some of bootstrap's and jqui's styles on <a> tags */
.fc-event,
.fc-event:hover,
.ui-widget .fc-event {
	color: #fff; /* default TEXT color */
	text-decoration: none; /* if <a> has an href */
}

.fc-event[href],
.fc-event.fc-draggable {
	cursor: pointer; /* give events with links and draggable events a hand mouse pointer */
}

.fc-not-allowed, /* causes a "warning" cursor. applied on body */
.fc-not-allowed .fc-event { /* to override an event's custom cursor */
	cursor: not-allowed;
}

.fc-event .fc-bg { /* the generic .fc-bg already does position */
	z-index: 1;
	background: #fff;
	opacity: .25;
	filter: alpha(opacity=25); /* for IE */
}

.fc-event .fc-content {
	position: relative;
	z-index: 2;
}

.fc-event .fc-resizer {
	position: absolute;
	z-index: 3;
}


/* Horizontal Events
--------------------------------------------------------------------------------------------------*/

/* events that are continuing to/from another week. kill rounded corners and butt up against edge */

.fc-ltr .fc-h-event.fc-not-start,
.fc-rtl .fc-h-event.fc-not-end {
	margin-left: 0;
	border-left-width: 0;
	padding-left: 1px; /* replace the border with padding */
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.fc-ltr .fc-h-event.fc-not-end,
.fc-rtl .fc-h-event.fc-not-start {
	margin-right: 0;
	border-right-width: 0;
	padding-right: 1px; /* replace the border with padding */
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

/* resizer */

.fc-h-event .fc-resizer { /* positioned it to overcome the event's borders */
	top: -1px;
	bottom: -1px;
	left: -1px;
	right: -1px;
	width: 5px;
}

/* left resizer  */
.fc-ltr .fc-h-event .fc-start-resizer,
.fc-ltr .fc-h-event .fc-start-resizer:before,
.fc-ltr .fc-h-event .fc-start-resizer:after,
.fc-rtl .fc-h-event .fc-end-resizer,
.fc-rtl .fc-h-event .fc-end-resizer:before,
.fc-rtl .fc-h-event .fc-end-resizer:after {
	right: auto; /* ignore the right and only use the left */
	cursor: w-resize;
}

/* right resizer */
.fc-ltr .fc-h-event .fc-end-resizer,
.fc-ltr .fc-h-event .fc-end-resizer:before,
.fc-ltr .fc-h-event .fc-end-resizer:after,
.fc-rtl .fc-h-event .fc-start-resizer,
.fc-rtl .fc-h-event .fc-start-resizer:before,
.fc-rtl .fc-h-event .fc-start-resizer:after {
	left: auto; /* ignore the left and only use the right */
	cursor: e-resize;
}


/* DayGrid events
----------------------------------------------------------------------------------------------------
We use the full "fc-day-grid-event" class instead of using descendants because the event won't
be a descendant of the grid when it is being dragged.
*/

.fc-day-grid-event {
	margin: 1px 2px 0; /* spacing between events and edges */
	padding: 0 1px;
}


.fc-day-grid-event .fc-content { /* force events to be one-line tall */
	white-space: nowrap;
	overflow: hidden;
}

.fc-day-grid-event .fc-time {
	font-weight: bold;
}

.fc-day-grid-event .fc-resizer { /* enlarge the default hit area */
	left: -3px;
	right: -3px;
	width: 7px;
}


/* Event Limiting
--------------------------------------------------------------------------------------------------*/

/* "more" link that represents hidden events */

a.fc-more {
	margin: 1px 3px;
	font-size: .85em;
	cursor: pointer;
	text-decoration: none;
}

a.fc-more:hover {
	text-decoration: underline;
}

.fc-limited { /* rows and cells that are hidden because of a "more" link */
	display: none;
}

/* popover that appears when "more" link is clicked */

.fc-day-grid .fc-row {
	z-index: 1; /* make the "more" popover one higher than this */
}

.fc-more-popover {
	z-index: 2;
	width: 220px;
}

.fc-more-popover .fc-event-container {
	padding: 10px;
}

/* Toolbar
--------------------------------------------------------------------------------------------------*/

.fc-toolbar {
	text-align: center;
	margin-bottom: 1em;
}

.fc-toolbar .fc-left {
	float: left;
}

.fc-toolbar .fc-right {
	float: right;
}

.fc-toolbar .fc-center {
	display: inline-block;
}

/* the things within each left/right/center section */
.fc .fc-toolbar > * > * { /* extra precedence to override button border margins */
	float: left;
	margin-left: .75em;
}

/* the first thing within each left/center/right section */
.fc .fc-toolbar > * > :first-child { /* extra precedence to override button border margins */
	margin-left: 0;
}
	
/* title text */

.fc-toolbar h2 {
	margin: 0;
}

/* button layering (for border precedence) */

.fc-toolbar button {
	position: relative;
}

.fc-toolbar .fc-state-hover,
.fc-toolbar .ui-state-hover {
	z-index: 2;
}
	
.fc-toolbar .fc-state-down {
	z-index: 3;
}

.fc-toolbar .fc-state-active,
.fc-toolbar .ui-state-active {
	z-index: 4;
}

.fc-toolbar button:focus {
	z-index: 5;
}


/* View Structure
--------------------------------------------------------------------------------------------------*/

/* undo twitter bootstrap's box-sizing rules. normalizes positioning techniques */
/* don't do this for the toolbar because we'll want bootstrap to style those buttons as some pt */
.fc-view-container *,
.fc-view-container *:before,
.fc-view-container *:after {
	-webkit-box-sizing: content-box;
	   -moz-box-sizing: content-box;
	        box-sizing: content-box;
}

.fc-view, /* scope positioning and z-index's for everything within the view */
.fc-view > table { /* so dragged elements can be above the view's main element */
	position: relative;
	z-index: 1;
}

/* BasicView
--------------------------------------------------------------------------------------------------*/

/* day row structure */

.fc-basicWeek-view .fc-content-skeleton,
.fc-basicDay-view .fc-content-skeleton {
	/* we are sure there are no day numbers in these views, so... */
	padding-top: 1px; /* add a pixel to make sure there are 2px padding above events */
	padding-bottom: 1em; /* ensure a space at bottom of cell for user selecting/clicking */
}

.fc-basic-view .fc-body .fc-row {
	min-height: 4em; /* ensure that all rows are at least this tall */
}

/* a "rigid" row will take up a constant amount of height because content-skeleton is absolute */

.fc-row.fc-rigid {
	overflow: hidden;
}

.fc-row.fc-rigid .fc-content-skeleton {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

/* week and day number styling */

.fc-basic-view .fc-week-number,
.fc-basic-view .fc-day-number {
	padding: 0 2px;
}

.fc-basic-view td.fc-week-number span,
.fc-basic-view td.fc-day-number {
	padding-top: 2px;
	padding-bottom: 2px;
}

.fc-basic-view .fc-week-number {
	text-align: center;
}

.fc-basic-view .fc-week-number span {
	/* work around the way we do column resizing and ensure a minimum width */
	display: inline-block;
	min-width: 1.25em;
}

.fc-ltr .fc-basic-view .fc-day-number {
	text-align: right;
}

.fc-rtl .fc-basic-view .fc-day-number {
	text-align: left;
}

.fc-day-number.fc-other-month {
	opacity: 0.3;
	filter: alpha(opacity=30); /* for IE */
	/* opacity with small font can sometimes look too faded
	   might want to set the 'color' property instead
	   making day-numbers bold also fixes the problem */
}

/* AgendaView all-day area
--------------------------------------------------------------------------------------------------*/

.fc-agenda-view .fc-day-grid {
	position: relative;
	z-index: 2; /* so the "more.." popover will be over the time grid */
}

.fc-agenda-view .fc-day-grid .fc-row {
	min-height: 3em; /* all-day section will never get shorter than this */
}

.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton {
	padding-top: 1px; /* add a pixel to make sure there are 2px padding above events */
	padding-bottom: 1em; /* give space underneath events for clicking/selecting days */
}


/* TimeGrid axis running down the side (for both the all-day area and the slot area)
--------------------------------------------------------------------------------------------------*/

.fc .fc-axis { /* .fc to overcome default cell styles */
	vertical-align: middle;
	padding: 0 4px;
	white-space: nowrap;
}

.fc-ltr .fc-axis {
	text-align: right;
}

.fc-rtl .fc-axis {
	text-align: left;
}

.ui-widget td.fc-axis {
	font-weight: normal; /* overcome jqui theme making it bold */
}


/* TimeGrid Structure
--------------------------------------------------------------------------------------------------*/

.fc-time-grid-container, /* so scroll container's z-index is below all-day */
.fc-time-grid { /* so slats/bg/content/etc positions get scoped within here */
	position: relative;
	z-index: 1;
}

.fc-time-grid {
	min-height: 100%; /* so if height setting is 'auto', .fc-bg stretches to fill height */
}

.fc-time-grid table { /* don't put outer borders on slats/bg/content/etc */
	border: 0 hidden transparent;
}

.fc-time-grid > .fc-bg {
	z-index: 1;
}

.fc-time-grid .fc-slats,
.fc-time-grid > hr { /* the <hr> AgendaView injects when grid is shorter than scroller */
	position: relative;
	z-index: 2;
}

.fc-time-grid .fc-bgevent-skeleton,
.fc-time-grid .fc-content-skeleton {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.fc-time-grid .fc-bgevent-skeleton {
	z-index: 3;
}

.fc-time-grid .fc-highlight-skeleton {
	z-index: 4;
}

.fc-time-grid .fc-content-skeleton {
	z-index: 5;
}

.fc-time-grid .fc-helper-skeleton {
	z-index: 6;
}


/* TimeGrid Slats (lines that run horizontally)
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-slats td {
	height: 1.5em;
	border-bottom: 0; /* each cell is responsible for its top border */
}

.fc-time-grid .fc-slats .fc-minor td {
	border-top-style: dotted;
}

.fc-time-grid .fc-slats .ui-widget-content { /* for jqui theme */
	background: none; /* see through to fc-bg */
}


/* TimeGrid Highlighting Slots
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-highlight-container { /* a div within a cell within the fc-highlight-skeleton */
	position: relative; /* scopes the left/right of the fc-highlight to be in the column */
}

.fc-time-grid .fc-highlight {
	position: absolute;
	left: 0;
	right: 0;
	/* top and bottom will be in by JS */
}


/* TimeGrid Event Containment
--------------------------------------------------------------------------------------------------*/

.fc-time-grid .fc-event-container, /* a div within a cell within the fc-content-skeleton */
.fc-time-grid .fc-bgevent-container { /* a div within a cell within the fc-bgevent-skeleton */
	position: relative;
}

.fc-ltr .fc-time-grid .fc-event-container { /* space on the sides of events for LTR (default) */
	margin: 0 2.5% 0 2px;
}

.fc-rtl .fc-time-grid .fc-event-container { /* space on the sides of events for RTL */
	margin: 0 2px 0 2.5%;
}

.fc-time-grid .fc-event,
.fc-time-grid .fc-bgevent {
	position: absolute;
	z-index: 1; /* scope inner z-index's */
}

.fc-time-grid .fc-bgevent {
	/* background events always span full width */
	left: 0;
	right: 0;
}


/* Generic Vertical Event
--------------------------------------------------------------------------------------------------*/

.fc-v-event.fc-not-start { /* events that are continuing from another day */
	/* replace space made by the top border with padding */
	border-top-width: 0;
	padding-top: 1px;

	/* remove top rounded corners */
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.fc-v-event.fc-not-end {
	/* replace space made by the top border with padding */
	border-bottom-width: 0;
	padding-bottom: 1px;

	/* remove bottom rounded corners */
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}


/* TimeGrid Event Styling
----------------------------------------------------------------------------------------------------
We use the full "fc-time-grid-event" class instead of using descendants because the event won't
be a descendant of the grid when it is being dragged.
*/

.fc-time-grid-event {
	overflow: hidden; /* don't let the bg flow over rounded corners */
}

.fc-time-grid-event .fc-time,
.fc-time-grid-event .fc-title {
	padding: 0 1px;
}

.fc-time-grid-event .fc-time {
	font-size: .85em;
	white-space: nowrap;
}

/* short mode, where time and title are on the same line */

.fc-time-grid-event.fc-short .fc-content {
	/* don't wrap to second line (now that contents will be inline) */
	white-space: nowrap;
}

.fc-time-grid-event.fc-short .fc-time,
.fc-time-grid-event.fc-short .fc-title {
	/* put the time and title on the same line */
	display: inline-block;
	vertical-align: top;
}

.fc-time-grid-event.fc-short .fc-time span {
	display: none; /* don't display the full time text... */
}

.fc-time-grid-event.fc-short .fc-time:before {
	content: attr(data-start); /* ...instead, display only the start time */
}

.fc-time-grid-event.fc-short .fc-time:after {
	content: "\000A0-\000A0"; /* seperate with a dash, wrapped in nbsp's */
}

.fc-time-grid-event.fc-short .fc-title {
	font-size: .85em; /* make the title text the same size as the time */
	padding: 0; /* undo padding from above */
}

/* resizer */

.fc-time-grid-event .fc-resizer {
	left: 0;
	right: 0;
	bottom: 0;
	height: 8px;
	overflow: hidden;
	line-height: 8px;
	font-size: 11px;
	font-family: monospace;
	text-align: center;
	cursor: s-resize;
}

.fc-time-grid-event .fc-resizer:after {
	content: "=";
}
