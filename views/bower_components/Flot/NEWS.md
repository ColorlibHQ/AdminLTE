## Flot 0.8.3 ##

### Changes ###

- Updated example code to avoid encouraging unnecessary re-plots.
  (patch by soenter, pull request #1221)

### Bug fixes ###

 - Added a work-around to disable the allocation of extra space for first and
   last axis ticks, allowing plots to span the full width of their container.
   A proper solution for this bug will be implemented in the 0.9 release.
   (reported by Josh Pigford and andig, issue #1212, pull request #1290)

 - Fixed a regression introduced in 0.8.1, where the last tick label would
   sometimes wrap rather than extending the plot's offset to create space.
   (reported by Elite Gamer, issue #1283)

 - Fixed a regression introduced in 0.8.2, where the resize plugin would use
   unexpectedly high amounts of CPU even when idle.
   (reported by tommie, issue #1277, pull request #1289)

 - Fixed the selection example to work with jQuery 1.9.x and later.
   (reported by EGLadona and dmfalke, issue #1250, pull request #1285)

 - Added a detach shim to fix support for jQuery versions earlier than 1.4.x.
   (reported by ngavard, issue #1240, pull request #1286)

 - Fixed a rare 'Uncaught TypeError' when using the resize plugin in IE 7/8.
   (reported by tleish, issue #1265, pull request #1289)

 - Fixed zoom constraints to apply only in the direction of the zoom.
   (patch by Neil Katin, issue #1204, pull request #1205)

 - Markings lines are no longer blurry when drawn on pixel boundaries.
   (reported by btccointicker and Rouillard, issue #1210)

 - Don't discard original pie data-series values when combining slices.
   (patch by Phil Tsarik, pull request #1238)

 - Fixed broken auto-scale behavior when using deprecated [x|y]2axis options.
   (reported by jorese, issue #1228, pull request #1284)

 - Exposed the dateGenerator function on the plot object, as it used to be
   before time-mode was moved into a separate plugin.
   (patch by Paolo Valleri, pull request #1028)


## Flot 0.8.2 ##

### Changes ###

 - Added a plot.destroy method as a way to free memory when emptying the plot
   placeholder and then re-using it for some other purpose.
   (patch by Thodoris Greasidis, issue #1129, pull request #1130)

 - Added a table of contents and PLUGINS link to the API documentation.
   (patches by Brian Peiris, pull requests #1064 and #1127)

 - Added Ruby code examples for time conversion.
   (patch by Mike Połtyn, pull request #1182)

 - Minor improvements to API.md and README.md.
   (patches by Patrik Ragnarsson, pull requests #1085 and #1086)

 - Updated inlined jQuery Resize to the latest version to fix errors.
   (reported by Matthew Sabol and sloker, issues #997 ad #1081)

### Bug fixes ###

 - Fixed an unexpected change in behavior that resulted in duplicate tick
   labels when using a plugin, like flot-tickrotor, that overrode tick labels.
   (patch by Mark Cote, pull request #1091)

 - Fixed a regression from 0.7 where axis labels were given the wrong width,
   causing them to overlap at certain scales and ignore the labelWidth option.
   (patch by Benjamin Gram, pull request #1177)

 - Fixed a bug where the second axis in an xaxes/yaxes array incorrectly had
   its 'innermost' property set to false or undefined, even if it was on the
   other side of the plot from the first axis. This resulted in the axis bar
   being visible when it shouldn't have been, which was especially obvious
   when the grid had a left/right border width of zero.
   (reported by Teq1, fix researched by ryleyb, issue #1056)

 - Fixed an error when using a placeholder that has no font-size property.
   (patch by Craig Oldford, pull request #1135)

 - Fixed a regression from 0.7 where nulls at the end of a series were ignored
   for purposes of determing the range of the x-axis.
   (reported by Munsifali Rashid, issue #1095)

 - If a font size is provided, base the default lineHeight on that size rather
   that the font size of the plot placeholder, which may be very different.
   (reported by Daniel Hoffmann Bernardes, issue #1131, pull request #1199)

 - Fix broken highlighting for right-aligned bars.
   (reported by BeWiBu and Mihai Stanciu, issues #975 and #1093, with further
   assistance by Eric Byers, pull request #1120)

 - Prevent white circles from sometimes showing up inside of pie charts.
   (reported by Pierre Dubois and Jack Klink, issues #1128 and #1073)

 - Label formatting no longer breaks when a page contains multiple pie charts.
   (reported by Brend Wanders, issue #1055)

 - When using multiple axes on opposite sides of the plot, the innermost axis
   coming later in the list no longer has its bar drawn incorrectly.
   (reported by ryleyb, issue #1056)

 - When removing series labels and redrawing the plot, the legend now updates
   correctly even when using an external container.
   (patch by Luis Silva, issue #1159, pull request #1160)

 - The pie plugin no longer ignores the value of the left offset option.
   (reported by melanker, issue #1136)

 - Fixed a regression from 0.7, where extra padding was added unnecessarily to
   sides of the plot where there was no last tick label.
   (reported by sknob001, issue #1048, pull request #1200)

 - Fixed incorrect tooltip behavior in the interacting example.
   (patch by cleroux, issue #686, pull request #1074)

 - Fixed an error in CSS color extraction with elements outside the DOM.
   (patch by execjosh, pull request #1084)

 - Fixed :not selector error when using jQuery without Sizzle.
   (patch by Anthony Ryan, pull request #1180)

 - Worked around a browser issue that caused bars to appear un-filled.
   (reported by irbian, issue #915)

## Flot 0.8.1 ##

### Bug fixes ###

 - Fixed a regression in the time plugin, introduced in 0.8, that caused dates
   to align to the minute rather than to the highest appropriate unit. This
   caused many x-axes in 0.8 to have different ticks than they did in 0.7.
   (reported by Tom Sheppard, patch by Daniel Shapiro, issue #1017, pull
   request #1023)

 - Fixed a regression in text rendering, introduced in 0.8, that caused axis
   labels with the same text as another label on the same axis to disappear.
   More generally, it's again possible to have the same text in two locations.
   (issue #1032)

 - Fixed a regression in text rendering, introduced in 0.8, where axis labels
   were no longer assigned an explicit width, and their text could not wrap.
   (reported by sabregreen, issue #1019)

 - Fixed a regression in the pie plugin, introduced in 0.8, that prevented it
   from accepting data in the format '[[x, y]]'.
   (patch by Nicolas Morel, pull request #1024)

 - The 'zero' series option and 'autoscale' format option are no longer
   ignored when the series contains a null value.
   (reported by Daniel Shapiro, issue #1033)

 - Avoid triggering the time-mode plugin exception when there are zero series.
   (reported by Daniel Rothig, patch by Mark Raymond, issue #1016)

 - When a custom color palette has fewer colors than the default palette, Flot
   no longer fills out the colors with the remainder of the default.
   (patch by goorpy, issue #1031, pull request #1034)

 - Fixed missing update for bar highlights after a zoom or other redraw.
   (reported by Paolo Valleri, issue #1030)

 - Fixed compatibility with jQuery versions earlier than 1.7.
   (patch by Lee Willis, issue #1027, pull request #1027)

 - The mouse wheel no longer scrolls the page when using the navigate plugin.
   (patch by vird, pull request #1020)

 - Fixed missing semicolons in the core library.
   (reported by Michal Zglinski)


## Flot 0.8.0 ##

### API changes ###

Support for time series has been moved into a plugin, jquery.flot.time.js.
This results in less code if time series are not used. The functionality
remains the same (plus timezone support, as described below); however, the
plugin must be included if axis.mode is set to "time".

When the axis mode is "time", the axis option "timezone" can be set to null,
"browser", or a particular timezone (e.g. "America/New_York") to control how
the dates are displayed. If null, the dates are displayed as UTC. If
"browser", the dates are displayed in the time zone of the user's browser.

Date/time formatting has changed and now follows a proper subset of the
standard strftime specifiers, plus one nonstandard specifier for quarters.
Additionally, if a strftime function is found in the Date object's prototype,
it will be used instead of the built-in formatter.

Axis tick labels now use the class 'flot-tick-label' instead of 'tickLabel'.
The text containers  for each axis now use the classes 'flot-[x|y]-axis' and
'flot-[x|y]#-axis' instead of '[x|y]Axis' and '[x|y]#Axis'. For compatibility
with Flot 0.7 and earlier text will continue to use the old classes as well,
but they are considered deprecated and will be removed in a future version.

In previous versions the axis 'color' option was used to set the color of tick
marks and their label text. It now controls the color of the axis line, which
previously could not be changed separately, and continues to act as a default
for the tick-mark color.  The color of tick label text is now set either by
overriding the 'flot-tick-label' CSS rule or via the axis 'font' option.

A new plugin, jquery.flot.canvas.js, allows axis tick labels to be rendered
directly to the canvas, rather than using HTML elements. This feature can be
toggled with a simple option, making it easy to create interactive plots in the
browser using HTML, then re-render them to canvas for export as an image.

The plugin tries to remain as faithful as possible to the original HTML render,
and goes so far as to automatically extract styles from CSS, to avoid having to
provide a separate set of styles when rendering to canvas. Due to limitations
of the canvas text API, the plugin cannot reproduce certain features, including
HTML markup embedded in labels, and advanced text styles such as 'em' units.

The plugin requires support for canvas text, which may not be present in some
older browsers, even if they support the canvas tag itself. To use the plugin
with these browsers try using a shim such as canvas-text or FlashCanvas.

The base and overlay canvas are now using the CSS classes "flot-base" and
"flot-overlay" to prevent accidental clashes (issue 540).

### Changes ###

 - Addition of nonstandard %q specifier to date/time formatting. (patch
   by risicle, issue 49)

 - Date/time formatting follows proper subset of strftime specifiers, and
   support added for Date.prototype.strftime, if found. (patch by Mark Cote,
   issues 419 and 558)

 - Fixed display of year ticks. (patch by Mark Cote, issue 195)

 - Support for time series moved to plugin. (patch by Mark Cote)

 - Display time series in different time zones. (patch by Knut Forkalsrud,
   issue 141)

 - Added a canvas plugin to enable rendering axis tick labels to the canvas.
   (sponsored by YCharts.com, implementation by Ole Laursen and David Schnur)

 - Support for setting the interval between redraws of the overlay canvas with
   redrawOverlayInterval. (suggested in issue 185)

 - Support for multiple thresholds in thresholds plugin. (patch by Arnaud
   Bellec, issue 523)

 - Support for plotting categories/textual data directly with new categories
   plugin.

 - Tick generators now get the whole axis rather than just min/max.

 - Added processOffset and drawBackground hooks. (suggested in issue 639)

 - Added a grid "margin" option to set the space between the canvas edge and
   the grid.

 - Prevent the pie example page from generating single-slice pies. (patch by
   Shane Reustle)

 - In addition to "left" and "center", bars now recognize "right" as an
   alignment option. (patch by Michael Mayer, issue 520)

 - Switched from toFixed to a much faster default tickFormatter. (patch by
   Clemens Stolle)

 - Added to a more helpful error when using a time-mode axis without including
   the flot.time plugin. (patch by Yael Elmatad)

 - Added a legend "sorted" option to control sorting of legend entries
   independent of their series order. (patch by Tom Cleaveland)

 - Added a series "highlightColor" option to control the color of the
   translucent overlay that identifies the dataset when the mouse hovers over
   it. (patch by Eric Wendelin and Nate Abele, issues 168 and 299)

 - Added a plugin jquery.flot.errorbars, with an accompanying example, that
   adds the ability to plot error bars, commonly used in many kinds of
   statistical data visualizations. (patch by Rui Pereira, issue 215)

 - The legend now omits entries whose labelFormatter returns null.  (patch by
   Tom Cleaveland, Christopher Lambert, and Simon Strandgaard)

 - Added support for high pixel density (retina) displays, resulting in much
   crisper charts on such devices. (patch by Olivier Guerriat, additional
   fixes by Julien Thomas, maimairel, and Lau Bech Lauritzen)

 - Added the ability to control pie shadow position and alpha via a new pie
   'shadow' option. (patch by Julien Thomas, pull request #78)

 - Added the ability to set width and color for individual sides of the grid.
   (patch by Ara Anjargolian, additional fixes by Karl Swedberg, pull requests #855
   and #880)

 - The selection plugin's getSelection now returns null when the selection
   has been cleared. (patch by Nick Campbell, pull request #852)

 - Added a new option called 'zero' to bars and filled lines series, to control
   whether the y-axis minimum is scaled to fit the data or set to zero.
   (patch by David Schnur, issues #316, #529, and #856, pull request #911)

 - The plot function is now also a jQuery chainable property.
   (patch by David Schnur, issues #734 and #816, pull request #953)

 - When only a single pie slice is beneath the combine threshold it is no longer
   replaced by an 'other' slice. (suggested by Devin Bayer, issue #638)

 - Added lineJoin and minSize options to the selection plugin to control the
   corner style and minimum size of the selection, respectively.
   (patch by Ruth Linehan, pull request #963)

### Bug fixes ###

 - Fix problem with null values and pie plugin. (patch by gcruxifix,
   issue 500)

 - Fix problem with threshold plugin and bars. (based on patch by
   kaarlenkaski, issue 348)

 - Fix axis box calculations so the boxes include the outermost part of the
   labels too.

 - Fix problem with event clicking and hovering in IE 8 by updating Excanvas
   and removing previous work-around. (test case by Ara Anjargolian)

 - Fix issues with blurry 1px border when some measures aren't integer.
   (reported by Ara Anjargolian)

 - Fix bug with formats in the data processor. (reported by Peter Hull,
   issue 534)

 - Prevent i from being declared global in extractRange. (reported by
   Alexander Obukhov, issue 627)

 - Throw errors in a more cross-browser-compatible manner. (patch by
   Eddie Kay)

 - Prevent pie slice outlines from being drawn when the stroke width is zero.
   (reported by Chris Minett, issue 585)

 - Updated the navigate plugin's inline copy of jquery.mousewheel to fix
   Webkit zoom problems. (reported by Hau Nguyen, issue 685)

 - Axis labels no longer appear as decimals rather than integers in certain
   cases. (patch by Clemens Stolle, issue 541)

 - Automatic color generation no longer produces only whites and blacks when
   there are many series. (patch by David Schnur and Tom Cleaveland)

 - Fixed an error when custom tick labels weren't provided as strings. (patch
   by Shad Downey)

 - Prevented the local insertSteps and fmt variables from becoming global.
   (first reported by Marc Bennewitz and Szymon Barglowski, patch by Nick
   Campbell, issues #825 and #831, pull request #851)

 - Prevented several threshold plugin variables from becoming global. (patch
   by Lasse Dahl Ebert)

 - Fixed various jQuery 1.8 compatibility issues. (issues #814 and #819,
   pull request #877)

 - Pie charts with a slice equal to or approaching 100% of the pie no longer
   appear invisible. (patch by David Schnur, issues #444, #658, #726, #824
   and #850, pull request #879)

 - Prevented several local variables from becoming global. (patch by aaa707)

 - Ensure that the overlay and primary canvases remain aligned. (issue #670,
   pull request #901)

 - Added support for jQuery 1.9 by removing and replacing uses of $.browser.
   (analysis and patch by Anthony Ryan, pull request #905)

 - Pie charts no longer disappear when redrawn during a resize or update.
   (reported by Julien Bec, issue #656, pull request #910)

 - Avoided floating-point precision errors when calculating pie percentages.
   (patch by James Ward, pull request #918)

 - Fixed compatibility with jQuery 1.2.6, which has no 'mouseleave' shortcut.
   (reported by Bevan, original pull request #920, replaced by direct patch)

 - Fixed sub-pixel rendering issues with crosshair and selection lines.
   (patches by alanayoub and Daniel Shapiro, pull requests #17 and #925)

 - Fixed rendering issues when using the threshold plugin with several series.
   (patch by Ivan Novikov, pull request #934)

 - Pie charts no longer disappear when redrawn after calling setData().
   (reported by zengge1984 and pareeohnos, issues #810 and #945)

 - Added a work-around for the problem where points with a lineWidth of zero
   still showed up with a visible line. (reported by SalvoSav, issue #842,
   patch by Jamie Hamel-Smith, pull request #937)

 - Pie charts now accept values in string form, like other plot types.
   (reported by laerdal.no, issue #534)

 - Avoid rounding errors in the threshold plugin.
   (reported by jerikojerk, issue #895)

 - Fixed an error when using the navigate plugin with jQuery 1.9.x or later.
   (reported by Paolo Valleri, issue #964)

 - Fixed inconsistencies between the highlight and unhighlight functions.
   (reported by djamshed, issue #987)

 - Fixed recalculation of tickSize and tickDecimals on calls to setupGrid.
   (patch by thecountofzero, pull request #861, issues #860, #1000)


## Flot 0.7 ##

### API changes ###

Multiple axes support. Code using dual axes should be changed from using
x2axis/y2axis in the options to using an array (although backwards-
compatibility hooks are in place). For instance,

```js
{
    xaxis: { ... }, x2axis: { ... },
    yaxis: { ... }, y2axis: { ... }
}
```

becomes

```js
{
    xaxes: [ { ... }, { ... } ],
    yaxes: [ { ... }, { ... } ]
}
```

Note that if you're just using one axis, continue to use the xaxis/yaxis
directly (it now sets the default settings for the arrays). Plugins touching
the axes must be ported to take the extra axes into account, check the source
to see some examples.

A related change is that the visibility of axes is now auto-detected. So if
you were relying on an axis to show up even without any data in the chart, you
now need to set the axis "show" option explicitly.

"tickColor" on the grid options is now deprecated in favour of a corresponding
option on the axes, so:

```js
{ grid: { tickColor: "#000" }}
```

becomes

```js
{ xaxis: { tickColor: "#000"}, yaxis: { tickColor: "#000"} }
```

But if you just configure a base color Flot will now autogenerate a tick color
by adding transparency. Backwards-compatibility hooks are in place.

Final note: now that IE 9 is coming out with canvas support, you may want to
adapt the excanvas include to skip loading it in IE 9 (the examples have been
adapted thanks to Ryley Breiddal). An alternative to excanvas using Flash has
also surfaced, if your graphs are slow in IE, you may want to give it a spin:

    http://code.google.com/p/flashcanvas/

### Changes ###

 - Support for specifying a bottom for each point for line charts when filling
   them, this means that an arbitrary bottom can be used instead of just the x
   axis. (based on patches patiently provided by Roman V. Prikhodchenko)

 - New fillbetween plugin that can compute a bottom for a series from another
   series, useful for filling areas between lines.

   See new example percentiles.html for a use case.

 - More predictable handling of gaps for the stacking plugin, now all
   undefined ranges are skipped.

 - Stacking plugin can stack horizontal bar charts.

 - Navigate plugin now redraws the plot while panning instead of only after
   the fact. (raised by lastthemy, issue 235)

   Can be disabled by setting the pan.frameRate option to null.

 - Date formatter now accepts %0m and %0d to get a zero-padded month or day.
   (issue raised by Maximillian Dornseif)

 - Revamped internals to support an unlimited number of axes, not just dual.
   (sponsored by Flight Data Services, www.flightdataservices.com)

 - New setting on axes, "tickLength", to control the size of ticks or turn
   them off without turning off the labels.

 - Axis labels are now put in container divs with classes, for instance labels
   in the x axes can be reached via ".xAxis .tickLabel".

 - Support for setting the color of an axis. (sponsored by Flight Data
   Services, www.flightdataservices.com)

 - Tick color is now auto-generated as the base color with some transparency,
   unless you override it.

 - Support for aligning ticks in the axes with "alignTicksWithAxis" to ensure
   that they appear next to each other rather than in between, at the expense
   of possibly awkward tick steps. (sponsored by Flight Data Services,
   www.flightdataservices.com)

 - Support for customizing the point type through a callback when plotting
   points and new symbol plugin with some predefined point types. (sponsored
   by Utility Data Corporation)

 - Resize plugin for automatically redrawing when the placeholder changes
   size, e.g. on window resizes. (sponsored by Novus Partners)

   A resize() method has been added to plot object facilitate this.

 - Support Infinity/-Infinity for plotting asymptotes by hacking it into
   +/-Number.MAX_VALUE. (reported by rabaea.mircea)

 - Support for restricting navigate plugin to not pan/zoom an axis. (based on
   patch by kkaefer)

 - Support for providing the drag cursor for the navigate plugin as an option.
   (based on patch by Kelly T. Moore)

 - Options for controlling whether an axis is shown or not (suggestion by Timo
   Tuominen) and whether to reserve space for it even if it isn't shown.

 - New attribute $.plot.version with the Flot version as a string.

 - The version comment is now included in the minified jquery.flot.min.js.

 - New options.grid.minBorderMargin for adjusting the minimum margin provided
   around the border (based on patch by corani, issue 188).

 - Refactor replot behaviour so Flot tries to reuse the existing canvas,
   adding shutdown() methods to the plot. (based on patch by Ryley Breiddal,
   issue 269)
   
   This prevents a memory leak in Chrome and hopefully makes replotting faster
   for those who are using $.plot instead of .setData()/.draw(). Also update
   jQuery to 1.5.1 to prevent IE leaks fixed in jQuery.

 - New real-time line chart example.

 - New hooks: drawSeries, shutdown.

### Bug fixes ###

 - Fixed problem with findNearbyItem and bars on top of each other. (reported
   by ragingchikn, issue 242)

 - Fixed problem with ticks and the border. (based on patch from
   ultimatehustler69, issue 236)

 - Fixed problem with plugins adding options to the series objects.

 - Fixed a problem introduced in 0.6 with specifying a gradient with:

   ```{brightness: x, opacity: y }```

 - Don't use $.browser.msie, check for getContext on the created canvas element
   instead and try to use excanvas if it's not found.

   Fixes IE 9 compatibility.

 - highlight(s, index) was looking up the point in the original s.data instead
   of in the computed datapoints array, which breaks with plugins that modify
   the datapoints, such as the stacking plugin. (reported by curlypaul924,
   issue 316)

 - More robust handling of axis from data passed in from getData(). (reported)
   by Morgan)

 - Fixed problem with turning off bar outline. (fix by Jordi Castells,
   issue 253)

 - Check the selection passed into setSelection in the selection
   plugin, to guard against errors when synchronizing plots (fix by Lau
   Bech Lauritzen).

 - Fix bug in crosshair code with mouseout resetting the crosshair even
   if it is locked (fix by Lau Bech Lauritzen and Banko Adam).

 - Fix bug with points plotting using line width from lines rather than
   points.

 - Fix bug with passing non-array 0 data (for plugins that don't expect
   arrays, patch by vpapp1).

 - Fix errors in JSON in examples so they work with jQuery 1.4.2
   (fix reported by honestbleeps, issue 357).

 - Fix bug with tooltip in interacting.html, this makes the tooltip
   much smoother (fix by bdkahn). Fix related bug inside highlighting
   handler in Flot.

 - Use closure trick to make inline colorhelpers plugin respect
   jQuery.noConflict(true), renaming the global jQuery object (reported
   by Nick Stielau).

 - Listen for mouseleave events and fire a plothover event with empty
   item when it occurs to drop highlights when the mouse leaves the
   plot (reported by by outspirit).

 - Fix bug with using aboveData with a background (reported by
   amitayd).

 - Fix possible excanvas leak (report and suggested fix by tom9729).

 - Fix bug with backwards compatibility for shadowSize = 0 (report and
   suggested fix by aspinak).

 - Adapt examples to skip loading excanvas (fix by Ryley Breiddal).

 - Fix bug that prevent a simple f(x) = -x transform from working
   correctly (fix by Mike, issue 263).

 - Fix bug in restoring cursor in navigate plugin (reported by Matteo
   Gattanini, issue 395).

 - Fix bug in picking items when transform/inverseTransform is in use
   (reported by Ofri Raviv, and patches and analysis by Jan and Tom
   Paton, issue 334 and 467).

 - Fix problem with unaligned ticks and hover/click events caused by
   padding on the placeholder by hardcoding the placeholder padding to
   0 (reported by adityadineshsaxena, Matt Sommer, Daniel Atos and some
   other people, issue 301).

 - Update colorhelpers plugin to avoid dying when trying to parse an
   invalid string (reported by cadavor, issue 483).



## Flot 0.6 ##

### API changes ###

Selection support has been moved to a plugin. Thus if you're passing
selection: { mode: something }, you MUST include the file
jquery.flot.selection.js after jquery.flot.js. This reduces the size of
base Flot and makes it easier to customize the selection as well as
improving code clarity. The change is based on a patch from andershol.

In the global options specified in the $.plot command, "lines", "points",
"bars" and "shadowSize" have been moved to a sub-object called "series":

```js
$.plot(placeholder, data, { lines: { show: true }})
```

should be changed to

```js
  $.plot(placeholder, data, { series: { lines: { show: true }}})
```

All future series-specific options will go into this sub-object to
simplify plugin writing. Backward-compatibility code is in place, so
old code should not break.

"plothover" no longer provides the original data point, but instead a
normalized one, since there may be no corresponding original point.

Due to a bug in previous versions of jQuery, you now need at least
jQuery 1.2.6. But if you can, try jQuery 1.3.2 as it got some improvements
in event handling speed.

## Changes ##

 - Added support for disabling interactivity for specific data series.
   (request from Ronald Schouten and Steve Upton)

 - Flot now calls $() on the placeholder and optional legend container passed
   in so you can specify DOM elements or CSS expressions to make it easier to
   use Flot with libraries like Prototype or Mootools or through raw JSON from
   Ajax responses.

 - A new "plotselecting" event is now emitted while the user is making a
   selection.

 - The "plothover" event is now emitted immediately instead of at most 10
   times per second, you'll have to put in a setTimeout yourself if you're
   doing something really expensive on this event.

 - The built-in date formatter can now be accessed as $.plot.formatDate(...)
   (suggestion by Matt Manela) and even replaced.

 - Added "borderColor" option to the grid. (patches from Amaury Chamayou and
   Mike R. Williamson)

 - Added support for gradient backgrounds for the grid. (based on patch from
   Amaury Chamayou, issue 90)

   The "setting options" example provides a demonstration.

 - Gradient bars. (suggestion by stefpet)
  
 - Added a "plotunselected" event which is triggered when the selection is
   removed, see "selection" example. (suggestion by Meda Ugo)

 - The option legend.margin can now specify horizontal and vertical margins
   independently. (suggestion by someone who's annoyed)

 - Data passed into Flot is now copied to a new canonical format to enable
   further processing before it hits the drawing routines. As a side-effect,
   this should make Flot more robust in the face of bad data. (issue 112)

 - Step-wise charting: line charts have a new option "steps" that when set to
   true connects the points with horizontal/vertical steps instead of diagonal
   lines.

 - The legend labelFormatter now passes the series in addition to just the
   label. (suggestion by Vincent Lemeltier)

 - Horizontal bars (based on patch by Jason LeBrun).

 - Support for partial bars by specifying a third coordinate, i.e. they don't
   have to start from the axis. This can be used to make stacked bars.

 - New option to disable the (grid.show).

 - Added pointOffset method for converting a point in data space to an offset
   within the placeholder.
  
 - Plugin system: register an init method in the $.flot.plugins array to get
   started, see PLUGINS.txt for details on how to write plugins (it's easy).
   There are also some extra methods to enable access to internal state.

 - Hooks: you can register functions that are called while Flot is crunching
   the data and doing the plot. This can be used to modify Flot without
   changing the source, useful for writing plugins. Some hooks are defined,
   more are likely to come.
  
 - Threshold plugin: you can set a threshold and a color, and the data points
   below that threshold will then get the color. Useful for marking data
   below 0, for instance.

 - Stack plugin: you can specify a stack key for each series to have them
   summed. This is useful for drawing additive/cumulative graphs with bars and
   (currently unfilled) lines.

 - Crosshairs plugin: trace the mouse position on the axes, enable with
   crosshair: { mode: "x"} (see the new tracking example for a use).

 - Image plugin: plot prerendered images.

 - Navigation plugin for panning and zooming a plot.

 - More configurable grid.

 - Axis transformation support, useful for non-linear plots, e.g. log axes and
   compressed time axes (like omitting weekends).

 - Support for twelve-hour date formatting (patch by Forrest Aldridge).

 - The color parsing code in Flot has been cleaned up and split out so it's
   now available as a separate jQuery plugin. It's included inline in the Flot
   source to make dependency managing easier. This also makes it really easy
   to use the color helpers in Flot plugins.

## Bug fixes ##

 - Fixed two corner-case bugs when drawing filled curves. (report and analysis
   by Joshua Varner)

 - Fix auto-adjustment code when setting min to 0 for an axis where the
   dataset is completely flat on that axis. (report by chovy)

 - Fixed a bug with passing in data from getData to setData when the secondary
   axes are used. (reported by nperelman, issue 65)

 - Fixed so that it is possible to turn lines off when no other chart type is
   shown (based on problem reported by Glenn Vanderburg), and fixed so that
   setting lineWidth to 0 also hides the shadow. (based on problem reported by
   Sergio Nunes)

 - Updated mousemove position expression to the latest from jQuery. (reported
   by meyuchas)

 - Use CSS borders instead of background in legend. (issues 25 and 45)

 - Explicitly convert axis min/max to numbers.

 - Fixed a bug with drawing marking lines with different colors. (reported by
   Khurram)

 - Fixed a bug with returning y2 values in the selection event. (fix by
   exists, issue 75)

 - Only set position relative on placeholder if it hasn't already a position
   different from static. (reported by kyberneticist, issue 95)

 - Don't round markings to prevent sub-pixel problems. (reported by
   Dan Lipsitt)

 - Make the grid border act similarly to a regular CSS border, i.e. prevent
   it from overlapping the plot itself. This also fixes a problem with anti-
   aliasing when the width is 1 pixel. (reported by Anthony Ettinger)

 - Imported version 3 of excanvas and fixed two issues with the newer version.
   Hopefully, this will make Flot work with IE8. (nudge by Fabien Menager,
   further analysis by Booink, issue 133)

 - Changed the shadow code for lines to hopefully look a bit better with
   vertical lines.

 - Round tick positions to avoid possible problems with fractions. (suggestion
   by Fred, issue 130)

 - Made the heuristic for determining how many ticks to aim for a bit smarter.

 - Fix for uneven axis margins (report and patch by Paul Kienzle) and snapping
   to ticks. (report and patch by lifthrasiir)

 - Fixed bug with slicing in findNearbyItems. (patch by zollman)

 - Make heuristic for x axis label widths more dynamic. (patch by
   rickinhethuis)

 - Make sure points on top take precedence when finding nearby points when
   hovering. (reported by didroe, issue 224)



## Flot 0.5 ##

Timestamps are now in UTC. Also "selected" event -> becomes "plotselected"
with new data, the parameters for setSelection are now different (but
backwards compatibility hooks are in place), coloredAreas becomes markings
with a new interface (but backwards compatibility hooks are in place).

### API changes ###

Timestamps in time mode are now displayed according to UTC instead of the time
zone of the visitor. This affects the way the timestamps should be input;
you'll probably have to offset the timestamps according to your local time
zone. It also affects any custom date handling code (which basically now
should use the equivalent UTC date mehods, e.g. .setUTCMonth() instead of
.setMonth().

Markings, previously coloredAreas, are now specified as ranges on the axes,
like ```{ xaxis: { from: 0, to: 10 }}```. Furthermore with markings you can
now draw horizontal/vertical lines by setting from and to to the same
coordinate. (idea from line support patch by by Ryan Funduk)

Interactivity: added a new "plothover" event and this and the "plotclick"
event now returns the closest data item (based on patch by /david, patch by
Mark Byers for bar support). See the revamped "interacting with the data"
example for some hints on what you can do.

Highlighting: you can now highlight points and datapoints are autohighlighted
when you hover over them (if hovering is turned on).

Support for dual axis has been added (based on patch by someone who's annoyed
and /david). For each data series you can specify which axes it belongs to,
and there are two more axes, x2axis and y2axis, to customize. This affects the
"selected" event which has been renamed to "plotselected" and spews out
```{ xaxis: { from: -10, to: 20 } ... },``` setSelection in which the
parameters are on a new form (backwards compatible hooks are in place so old
code shouldn't break) and markings (formerly coloredAreas).

## Changes ##

 - Added support for specifying the size of tick labels (axis.labelWidth,
   axis.labelHeight). Useful for specifying a max label size to keep multiple
   plots aligned.

 - The "fill" option can now be a number that specifies the opacity of the
   fill.

 - You can now specify a coordinate as null (like [2, null]) and Flot will
   take the other coordinate into account when scaling the axes. (based on
   patch by joebno)

 - New option for bars "align". Set it to "center" to center the bars on the
   value they represent.

 - setSelection now takes a second parameter which you can use to prevent the
   method from firing the "plotselected" handler. 

 - Improved the handling of axis auto-scaling with bars. 

## Bug fixes ##

 - Fixed a bug in calculating spacing around the plot. (reported by
   timothytoe)

 - Fixed a bug in finding max values for all-negative data sets.
 
 - Prevent the possibility of eternal looping in tick calculations.

 - Fixed a bug when borderWidth is set to 0. (reported by Rob/sanchothefat)

 - Fixed a bug with drawing bars extending below 0. (reported by James Hewitt,
   patch by Ryan Funduk).

 - Fixed a bug with line widths of bars. (reported by MikeM)

 - Fixed a bug with 'nw' and 'sw' legend positions.

 - Fixed a bug with multi-line x-axis tick labels. (reported by Luca Ciano,
   IE-fix help by Savage Zhang)

 - Using the "container" option in legend now overwrites the container element
   instead of just appending to it, fixing the infinite legend bug. (reported
   by several people, fix by Brad Dewey)



## Flot 0.4 ##

### API changes ###

Deprecated axis.noTicks in favor of just specifying the number as axis.ticks.
So ```xaxis: { noTicks: 10 }``` becomes ```xaxis: { ticks: 10 }```.

Time series support. Specify axis.mode: "time", put in Javascript timestamps
as data, and Flot will automatically spit out sensible ticks. Take a look at
the two new examples. The format can be customized with axis.timeformat and
axis.monthNames, or if that fails with axis.tickFormatter.

Support for colored background areas via grid.coloredAreas. Specify an array
of { x1, y1, x2, y2 } objects or a function that returns these given
{ xmin, xmax, ymin, ymax }.

More members on the plot object (report by Chris Davies and others).
"getData" for inspecting the assigned settings on data series (e.g. color) and
"setData", "setupGrid" and "draw" for updating the contents without a total
replot.

The default number of ticks to aim for is now dependent on the size of the
plot in pixels. Support for customizing tick interval sizes directly with
axis.minTickSize and axis.tickSize.

Cleaned up the automatic axis scaling algorithm and fixed how it interacts
with ticks. Also fixed a couple of tick-related corner case bugs (one reported
by mainstreetmark, another reported by timothytoe).

The option axis.tickFormatter now takes a function with two parameters, the
second parameter is an optional object with information about the axis. It has
min, max, tickDecimals, tickSize.

## Changes ##

 - Added support for segmented lines. (based on patch from Michael MacDonald)

 - Added support for ignoring null and bad values. (suggestion from Nick
   Konidaris and joshwaihi)

 - Added support for changing the border width. (thanks to joebno and safoo)

 - Label colors can be changed via CSS by selecting the tickLabel class.

## Bug fixes ##

 - Fixed a bug in handling single-item bar series. (reported by Emil Filipov)

 - Fixed erratic behaviour when interacting with the plot with IE 7. (reported
   by Lau Bech Lauritzen).

 - Prevent IE/Safari text selection when selecting stuff on the canvas.



## Flot 0.3 ##

This is mostly a quick-fix release because jquery.js wasn't included in the
previous zip/tarball.

## Changes ##

 - Include jquery.js in the zip/tarball.

 - Support clicking on the plot. Turn it on with grid: { clickable: true },
   then you get a "plotclick" event on the graph placeholder with the position
   in units of the plot.

## Bug fixes ##

 - Fixed a bug in dealing with data where min = max. (thanks to Michael
   Messinides)



## Flot 0.2 ##

The API should now be fully documented.

### API changes ###

Moved labelMargin option to grid from x/yaxis.

## Changes ##

 - Added support for putting a background behind the default legend. The
   default is the partly transparent background color. Added backgroundColor
   and backgroundOpacity to the legend options to control this.

 - The ticks options can now be a callback function that takes one parameter,
   an object with the attributes min and max. The function should return a
   ticks array.

 - Added labelFormatter option in legend, useful for turning the legend
   labels into links.

 - Reduced the size of the code. (patch by Guy Fraser)



## Flot 0.1 ##

First public release.
