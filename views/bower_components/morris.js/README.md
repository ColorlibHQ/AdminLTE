# Morris.js - pretty time-series line graphs

[![Build Status](https://secure.travis-ci.org/morrisjs/morris.js.png?branch=master)](http://travis-ci.org/morrisjs/morris.js)

Morris.js is the library that powers the graphs on http://howmanyleft.co.uk/.
It's a very simple API for drawing line, bar, area and donut charts.

Cheers!

\- Olly (olly@oesmith.co.uk)

## Contributors wanted

I'm unfortunately not able to actively support Morris.js any more. I keep an eye
on the issues, but I rarely have the time to fix bugs or review pull requests.

If you're interested in actively contributing to Morris.js, please contact me on
the email address above.

## Requirements

- [jQuery](http://jquery.com/) (>= 1.7 recommended, but it'll probably work with
  older versions)
- [Raphael.js](http://raphaeljs.com/) (>= 2.0)

## Usage

See [the website](http://morrisjs.github.com/morris.js/).

## Development

Very daring.

Fork, hack, possibly even add some tests, then send a pull request :)

Remember that Morris.js is a coffeescript project. Please make your changes in
the `.coffee` files, not in the compiled javascript files in the root directory
of the project.

### Developer quick-start

You'll need [node.js](https://nodejs.org).  I recommend using
[nvm](https://github.com/creationix/nvm) for installing node in
development environments.

With node installed, install [grunt](https://github.com/cowboy/grunt) using
`npm install -g grunt-cli`, and then the rest of the test/build dependencies
with `npm install` in the morris.js project folder.

Once you're all set up, you can compile, minify and run the tests using `grunt`.

Note: I'm experimenting with using perceptual diffs to catch rendering
regressions. Due to font rendering differences between platforms, the pdiff
tests currently *only* pass on OS X.

## Changelog

### 0.5.1 - 15th June 2014

- Fix touch event handling.
- Fix stacked=false in bar chart [#275](https://github.com/morrisjs/morris.js/issues/275)
- Configurable vertical segments [#297](https://github.com/morrisjs/morris.js/issues/297)
- Deprecate continuousLine option.

### 0.5.0 - 19th March 2014

- Update grunt dependency [#288](https://github.com/morrisjs/morris.js/issues/228)
- Donut segment color config in data objects [#281](https://github.com/morrisjs/morris.js/issues/281)
- Customisable line widths and point drawing [#272](https://github.com/morrisjs/morris.js/issues/272)
- Bugfix for @options.smooth [#266](https://github.com/morrisjs/morris.js/issues/266)
- Option to disable axes individually [#253](https://github.com/morrisjs/morris.js/issues/253)
- Range selection [#252](https://github.com/morrisjs/morris.js/issues/252)
- Week format for x-labels [#250](https://github.com/morrisjs/morris.js/issues/250)
- Update developer quickstart instructions [#243](https://github.com/morrisjs/morris.js/issues/243)
- Experimenting with perceptual diffs.
- Add original data row to hover callback [#264](https://github.com/morrisjs/morris.js/issues/264)
- setData method for donut charts [#211](https://github.com/morrisjs/morris.js/issues/211)
- Automatic resizing [#111](https://github.com/morrisjs/morris.js/issues/111)
- Fix travis builds [#298](https://github.com/morrisjs/morris.js/issues/298)
- Option for rounded corners on bar charts [#305](https://github.com/morrisjs/morris.js/issues/305)
- Option to set padding for X axis labels [#306](https://github.com/morrisjs/morris.js/issues/306)
- Use local javascript for examples.
- Events on non-time series [#314](https://github.com/morrisjs/morris.js/issues/314)

### 0.4.3 - 12th May 2013

- Fix flickering hover box [#186](https://github.com/morrisjs/morris.js/issues/186)
- xLabelAngle option (diagonal labels!!) [#239](https://github.com/morrisjs/morris.js/issues/239)
- Fix area chart fill bug [#190](https://github.com/morrisjs/morris.js/issues/190)
- Make event handlers chainable
- gridTextFamily and gridTextWeight options
- Fix hovers with setData [#213](https://github.com/morrisjs/morris.js/issues/213)
- Fix hideHover behaviour [#236](https://github.com/morrisjs/morris.js/issues/236)

### 0.4.2 - 14th April 2013

- Fix DST handling [#191](https://github.com/morrisjs/morris.js/issues/191)
- Parse data values from strings in Morris.Donut [#189](https://github.com/morrisjs/morris.js/issues/189)
- Non-cumulative area charts [#199](https://github.com/morrisjs/morris.js/issues/199)
- Round Y-axis labels to significant numbers [#162](https://github.com/morrisjs/morris.js/162)
- Customising default hover content [#179](https://github.com/morrisjs/morris.js/179)

### 0.4.1 - 8th February 2013

- Fix goal and event rendering. [#181](https://github.com/morrisjs/morris.js/issues/181)
- Don't break when empty data is passed to setData [#142](https://github.com/morrisjs/morris.js/issues/142)
- labelColor option for donuts [#159](https://github.com/morrisjs/morris.js/issues/159)

### 0.4.0 - 26th January 2013

- Goals and events [#103](https://github.com/morrisjs/morris.js/issues/103).
- Bower package manager metadata.
- More flexible formatters [#107](https://github.com/morrisjs/morris.js/issues/107).
- Color callbacks.
- Decade intervals for time-axis labels.
- Non-continous line tweaks [#116](https://github.com/morrisjs/morris.js/issues/116).
- Stacked bars [#120](https://github.com/morrisjs/morris.js/issues/120).
- HTML hover [#134](https://github.com/morrisjs/morris.js/issues/134).
- yLabelFormat [#139](https://github.com/morrisjs/morris.js/issues/139).
- Disable axes [#114](https://github.com/morrisjs/morris.js/issues/114).

### 0.3.3 - 1st November 2012

- **Bar charts!** [#101](https://github.com/morrisjs/morris.js/issues/101).

### 0.3.2 - 28th October 2012

- **Area charts!** [#47](https://github.com/morrisjs/morris.js/issues/47).
- Some major refactoring and test suite improvements.
- Set smooth parameter per series [#91](https://github.com/morrisjs/morris.js/issues/91).
- Custom dateFormat for string x-values [#90](https://github.com/morrisjs/morris.js/issues/90).

### 0.3.1 - 13th October 2012

- Add `formatter` option for customising value labels in donuts [#75](https://github.com/morrisjs/morris.js/issues/75).
- Cycle `lineColors` on line charts to avoid running out of colours [#78](https://github.com/morrisjs/morris.js/issues/78).
- Add method to select donut segments. [#79](https://github.com/morrisjs/morris.js/issues/79).
- Don't go negative on yMin when all y values are zero. [#80](https://github.com/morrisjs/morris.js/issues/80).
- Don't sort data when parseTime is false [#83](https://github.com/morrisjs/morris.js/issues/83).
- Customise styling for points. [#87](https://github.com/morrisjs/morris.js/issues/87).

### 0.3.0 - 15th September 2012

- Donut charts!
- Bugfix: ymin/ymax bug [#71](https://github.com/morrisjs/morris.js/issues/71).
- Bugfix: infinite loop when data indicates horizontal line [#66](https://github.com/morrisjs/morris.js/issues/66).

### 0.2.10 - 26th June 2012

- Support for decimal labels on y-axis [#58](https://github.com/morrisjs/morris.js/issues/58).
- Better axis label clipping [#63](https://github.com/morrisjs/morris.js/issues/63).
- Redraw graphs with updated data using `setData` method [#64](https://github.com/morrisjs/morris.js/issues/64).
- Bugfix: series with zero or one non-null values [#65](https://github.com/morrisjs/morris.js/issues/65).

### 0.2.9 - 15th May 2012

- Bugfix: Fix zero-value regression
- Bugfix: Don't modify user-supplied data

### 0.2.8 - 10th May 2012

- Customising x-axis labels with `xLabelFormat` option
- Only use timezones when timezone info is specified
- Fix old IE bugs (mostly in examples!)
- Added `preunits` and `postunits` options
- Better non-continuous series data support

### 0.2.7 - 2nd April 2012

- Added `xLabels` option
- Refactored x-axis labelling
- Better ISO date support
- Fix bug with single value in non time-series graphs

### 0.2.6 - 18th March 2012

- Partial series support (see `null` y-values in `examples/quarters.html`)
- `parseTime` option bugfix for non-time-series data

### 0.2.5 - 15th March 2012

- Raw millisecond timestamp support (with `dateFormat` option)
- YYYY-MM-DD HH:MM[:SS[.SSS]] date support
- Decimal number labels

### 0.2.4 - 8th March 2012

- Negative y-values support
- `ymin` option
- `units` options

### 0.2.3 - 6th Mar 2012

- jQuery no-conflict compatibility
- Support ISO week-number dates
- Optionally hide hover on mouseout (`hideHover`)
- Optionally skip parsing dates, treating X values as an equally-spaced series (`parseTime`)

### 0.2.2 - 29th Feb 2012

- Bugfix: mouseover error when options.data.length == 2
- Automatically sort options.data

### 0.2.1 - 28th Feb 2012

- Accept a DOM element *or* an ID in `options.element`
- Add `smooth` option
- Bugfix: clone `@default`
- Add `ymax` option

## License

Copyright (c) 2012-2014, Olly Smith
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
