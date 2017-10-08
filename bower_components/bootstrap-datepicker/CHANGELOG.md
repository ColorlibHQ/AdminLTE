Changelog
=========

1.7.1
-----

## Bugfixes
 * 	Revert "move `jquery` to `peerDependencies` from `dependencies`"

1.7.0
-----

## Features
 * Adding dateCells option (#1723)
 * Added keepEmptyValues option (#1558 + #1901)
 * added "changeViewMode" event; also adds the current `viewMode` to events (#1953)
 * adds `updateViewDate` option (#1982)
 * Added hiding week day names functionality (#2087)
 * Allow customizing day cell value (#2043)

## Bugfixes
 * originalEvent object needs preventDefault fn (#1824)
 * Fix jQuery selector from premature selection of span element in inline/embedded calendar's month selection (#1859 + #1886)
 * Use date arithmetic to allow dates with times other than 00:00:00 (#1483)
 * Multiple general fixes (#1883 + #1893)
 * Visibility fix for nav arrows (#1916)
 * Do not trigger change or changeDate on initialization (#1912)
 * Fix: Close datepicker on touchstart (#1924)
 * Fix data-date-dates-disabled attribute to accept a comma-separated list (#1946)
 * Fix maxViewMode and navigation switch click (#1951)
 * Add support jQuery 3. Bootstrap 2 still available (composer.json) (#1958)
 * fix(parseDate) use insensitive regex to support +15d with capslock (#1910)
 * Refactoring timedelta aliases (dateAliases) (#1965)
 * Fix RTL layout (#1973)
 * Remove listen `changeDate` after destroy DateRangePicker (#1968)
 * add tests for setDatesDisabled function (#1983)
 * resolves bug on days when DST is added. (#2009)
 * XHTML fixes (#1998)
 * update grunt and other dev-dependencies (#2111)
 * Use display:table-cell instead of display:block for today, clear and title (#2121)
 * moved assumeNearbyYear to correct location (#2140)
 * move `jquery` to `peerDependencies` from `dependencies` (#2163)
 * Use default arrow values (#2176)

## Locales
### New
 * en-ZA (#1798)
 * en-ZNZ (#1799)
 * en-IE (#1800)
 * ar-tn (#1863)
 * Added Sinhala (si) locale (#2025)
 * Occitan locale (#2024 + #2026) 
 * [l10n]Add breton translation (#2028)
 * Added Tajik language (#2117)
 * Add Uzbek latin and cyrill locales (#2152)
 * add Bengali (Bangla) language (#2171)
 * Added Hindi locale (#2199)

### Bugfix
 * km/kh (#1812)
 * Capital letters in Polish translation (#1890)
 * Add missing monthsTitle in cs (#1900)
 * Update bootstrap-datepicker.da.js (#1936)
 * Fix typo in month name (#2040)
 * Added missing basque language properties (#2066)
 * Added weekStart to slovenian translation (#2067)
 * add monthsTitle for ru (#2092)
 * Change danish (da) date format to match the rest of the locales (#2048)
 * Fix Tamil Language file with proper locale code (#2141)
 * Revert strange changes, +monthsTitle (#2153)
 * updated Tajik (cyrillic) translation file (#2167)
 * Romanian uses dd/mm/yyyy format for dates (#2173)
 * Missing latvian translation (#2204)

## Docs
 * Fix typo in index.rst (#1882)
 * Update CDNjs info in README.md (#1933)
 * [Doc] Keyboard navigation is not supported for embedded / inline type (#2002)
 * Removed reference to stefan petre (#2031)
 * Improve defaultViewDate documentation (#2052)
 * Add notes about multiple dates and examples for update method (#2060)
 * Add Code Of Conduct (#2095)
 * Update install instructions on README.md (#2160)

1.6.2 - 1.6.3 - 1.6.4
---------------------

Bugfix

 * Backported jquery 3 fix from #1958

1.6.1
-----
Bugfixes

 * add specific class for disabled dates back (Fixes #1785)
 * [fix] Allow keyboard navigation for non-input fields (Fixes: #874)
 * fix kazakh mothShort
 * Fix bug when clicking on a day that is highlighted today in the next month
 * dates read out are 12am UTC
 * Fix show by component (with disabled attribute)

1.6.0
-----
Features

 * Changes nonpunctuation to accept unicode characters
 * Add "assumeNearbyYear" option
 * Decade and century picking
 * Added timedelta aliases. (Fixes #785)
 * add getter methods for date limits
 * Replace arrow entities for glyphicon + template + libs snippets (Fixes: #610 #833 #1007)
 * added class .disabled to dow header
 * Rename "remove" to "destroy" and create alias
 
Bugfix

 * Month/year view keyboard navigation
 * fix changeMonth, changeYear not triggered when selecting day from prev/next month
 * Fix default arrows for BS2 and screenshots (for docs)
 * Extend beforeShowMonth event functionality to work like beforeShowDay and beforeShowYear
 
Locale changes

 * Correct date format for ko locale
 * Add en-AU (Australian English) locale
 
Repository

 * Add CSS sourcemap
 * [BS3 Less] Remove unused variables and cleanup
 * Added timezone aware tests
 * remove .idea-folder from npm

1.5.1
-----

Bugfixes
 * Fix calculation for new position when datepicker goes offscreen when inside a container (Fixes: #1619)
 * Fix datepicker title not centered when displaying calendar weeks (Fixes: #1625)
 * Fixing looping when calling dp inside change event (Fixes: #1628)
 * Add scrollTop to position if container is not body (Fixes: #1616)
 * Use document scrollTop instead of body scrollTop when using the body container
 * Fix focus for disabled week days (Fixes: #1365, #1187, #1648)
 * Fixes enableOnReadOnly bug when datepicker is of type component
 
Translations
 * Added missing translations for slovak translation. (Fixes: #1521)
 * Added missing date format for norwegian (nb) locale (Fixes #1690)
 * Armenian translation short names
 * adding Today translation, default date format for the lithuanian translation
 
Docs
 * Document data-api on container
 * Added docs for the different stylesheet files. (Fixes #1459)
 
Repository
 * Enable travis container builds for faster builds

1.5.0
-----

Features
 * Added down key as datepicker show trigger
 * immediateUpdates option (updates input when a year or month is selected)
 * Highlight days of week
 * maxViewMode option
 * Include "main" property in package.json
 * Require.js support. (Fixes: #280)
 * Allow overriding `$.fn.show` and `$.fn.hide` (Fixes: #1424)
 * Adding border-radius variable for LESS (Fixes: #1429)
 * Add support for dropdown border variables
 * Add the posibility to have a title on the picker (Fixes: #1410)
 * Implement `beforeShowYear` (Fixes: #1226)
 * Add commonjs support
 * Trigger 'hide' event when clicking outside datepicker
 * Add css-classes for range-start and range-end
 * Update hover effect for "buttons" (matches  Bootstrap 3.3.5 mixin)
 * Custom formatting options

Bugfixes:
 * Scrolling on mobile device closes datepicker
 * Use $.on() instead $.bind()
 * Fixed right-click and edit-menu paste 
 * Ported prototype fix for Prototype Compability
 * Fixed issue with startview year
 * Fixed padding inconsistency with twitter bootstrap 3
 * prevents the click event from bubbling to any user defined click handlers
 * Added padding for .datepicker-dropdown
 * Fixes the issue with a date change firing mulitple change events
 * removed hard dependency on bootstrap (because of twbs-sass package)
 * Clearing the date should reset to defaultViewDate
 * Datepicker orientation mix up - top = bottom and bottom = top 
 * Fix cursor thead styles
 * Fix date-reset issue when navigating to next with invalid date
 * Using orientation:auto but date picker still appears above, cut off, when there plenty of space below. 
 * lots of orientation fixes

Locale changes:
 * Remove unused eighth element on week arrays )
 * Add Esperanto translation
 * Better Polish language date shortcuts translation and default date format
 * lowercase danish translation
 * Add Mongolian localization
 * update Hungarian translation

Docs:
 * added day to end-date to avoid confusion about example
 * added setDatesDisabled method to documentation



1.4.0
-----

Features:
 * implemented beforeShowMonth option
 * Added option to disable touch keyboard input
 * All datepicker methods are chainable
 * Added a datesDisable option
 * Added option to prevent date picker to show when input field receives focus
 * adding option to define the container the datepicker will be appended to
 * Backported some placement fixes for the container option
 * Option default view date
 * Add toggleActive option
 * Added clear method
 * Added version property to datepicker object
 * Added option to not show datepicker on readonly field

Bugfixes:
 * Removed blank space before the previous button when calendarWeeks is true;
 * Fixed date deselection with single date picker
 * Added case-neutral matching for text months
 * Changed input-daterange to full width for bs3
 * Fix placement for RTL languages
 * fix for range picker when next date is before previous date
 * Fix for moving box on first selection
 * Do not show datepicker for readonly inputs
 * Fix getUTCDate when datepicker has no selected date
 * Only a linked today button should trigger the changeDate event
 * Fixed bug with keyboard navigation when startdate/enddate was defined
 * Right align calendar on right window edge conflict
 * On "ENTER" keydown on picker, prevent the closest form to be submitted too
 * fixed bower.json twitte bootstrap dependency
 * Replaced named entities with decimal entities
 * assigning plugin to a local variable to fix bug in noConflict

Repo changes:
 * Added empty ignore option in bower.json.
 * Added .editorconfig
 * Reworked grunt tasks

Translations:
 * Fix translation of French months
 * Update cambodia translations
 * added clear and weekStart to turkish translation
 * Days/months should start lowercase in dutch
 * Month/daynames should be lowercase in french
 * Add 'clear' and 'format' to Ukrainian locale
 * Added Montenegrin locale

Docs:
 * added example for inputs option
 * added missing documentation for embedded mode
 * Add additional documentaion to update method

1.3.1
-----

Repo changes:
* Automated screenshots have been added to the docs. These probably need to be documented so that contributors can add them when appropriate.
* Grunt support
* Missing description and keywords for Packagist
* Composer: Include translation files into deployment dir
* Add package name and version to npm package.json

Bugfixes:
* Remove font-family declaration for datepicker 
* Don't deselect date unless datepicker is multidate
* Removed comment from compiled CSS.
* Don't clear input after typing date and hitting Enter when keyboard nav is disabled
* Fixing the ui displaying 'undefined nan' when typing dates in Firefox & IE 
* Reset tooltip to a default empty value 
* Fix colspan if calendarWeeks & clearBtn are true 
* Removed fixed width and height in large and small group addon
* z-index calculation should not stop at first element
* Fix IE8 bug with Array#splice with one argument 

Documentation:
* ghpages: jQuery js not being loaded when using HTTPS
* Adds clearBtn option to sandbox page
* Minor fixes (typo's, links,...)

Locale changes

Updated languages:
* Clear translation in czech
* Dutch translation
* Swedish translation
* Japanese translation
* Ukrainian translation fixes
* Add spanish clear, week start and format
* Added galician clear, week start and format
* Added missing clear localization value for polish translation
* Add clear zh-CN translation
* Fixed Albanian translation typo's
* Add missing clear and format localization value for Russian translation
* Updated Serbian translation
* Fixed Ukrainian iso code to uk instead of ua 
* Updated greek translation
* Update Catalan and Spanish localizations
* Added missing armenian translations

New languages:
* Basque
* Khmer (Cambodia)
* Bosnian
* British english
* Armenian
* Faroese
* Swiss Italian and Swiss French

1.3.0
-----

New features:
* Bootstrap 3 support.  Added build files `build/build_standalone3.less` and `build/build3.less`, and source files `less/datepicker3.less` and `css/datepicker3.css` (built from `build_standalone3.less`).
* Multi-date functionality.  This required rethinking several areas of the picker:
    * The internals have been modified to be completely multidate-centric.
    * Attributes and methods availabel on events have changed, but the old attributes and functions will still work.
    * Keyboard navigation has been revamped, as it didn't work at all properly with multidate selection.
    * The picker now explicitly supports "no selected date".

Non-API changes:
* Keyboard navigation has been changed.  See `docs/keyboard.rst`.
* Empty pickers in a range picker setup will be populated with the first date selected by the user to make finding the next date easier.

Bug squashed:
* Jan 1, 1970 is now highlighted when selected
* `touchstart` added to document-bound picker-closing events (alongside `mousedown`)
* Fixed a display bug with component add-on icons being vertically higher than they should have been.
* Input is refocused after clicking the picker.
* `changeDate` event is triggered when `setDate` is called.

Locale changes:
* Added Ukrainian, Belgium-Dutch, Welsh, Galician, Vietnamese, and Azerbaijani
* `clear` for German, Danish, Italian, and Romanian
* Fixed `weekStart` and `format` for Norwegian
* `weekStart` and `format` for Georgian
* Tweaks for Latvian, French, Vietnamese, Swedish, and Croatian
* De-duplicated Ukrainian files from `uk` and `ua` to just `ua`

Repository changes:
* Documentation has been moved from the base `README.md` file to the `docs/` folder, and been re-written to use sphinx docs.  The docs are now viewable online at http://bootstrap-datepicker.readthedocs.org/.  The [gh-pages](http://eternicode.github.io/bootstrap-datepicker/) branch has been reduced to the sandbox demo.
* Changed the js file header to point at repo/demo/docs urls instead of eyecon.ro
* The css files are now the output of the standalone build scripts instead of `build/build.less` etc.
* `composer.json` now supports component-installer
* Added [JSHint](http://www.jshint.com/docs/) and [JSCS](https://github.com/mdevils/node-jscs) configurations


1.2.0
-----

New features:
* Google Closure Compiler Compatibility
* Smart orientation by default, and explicit picker orientation with the `orientation` option
* Text inside the picker is no longer user-selectable
* Packagist/Composer support (I think...)
* No longer depends on glyphicons for arrows
* `clearDate` event added, fired when the date is cleared

Bug squashed:
* `noConflict` fixed
* Fix for large years causing an infinite loop in date parsing
* Fixed cases where `changeYear` and `changeMonth` events were not being triggered
* `component.js` moved to `bower.js`
* Falsey values for `startDate` and `endDate` translate to `-Infinity` and `Infinity`, respectively (effectively, falsey values mean "no bounds")
* Fixed `autoclose` for non-input, non-component elements
* Fixed 50% param in `mix()` less function -- expands compatibility with less compilers
* Fixed `update` method to update the selected date
* `beforeShowDay` was getting UTC dates, now it gets local dates (all dates that developers are given should be in local time, not UTC).
* `startDate` and `endDate` were a bit confused when given `new Date()` -- they would not allow today to be selected (the range should be inclusive), they would change whether it was selectable based on local time, etc.  These quirks should be fixed now.  They both also now expect local dates (which will then be time-zeroed and converted to UTC).
* Fixed selected date not being automatically constrained to the specified range when `setStartDate` and `setEndDate` were called.
* No longer uses jQuery's `.size()` (deprecated in favor of `.length`)
* `changeDate` triggered during manual user input
* `change` event fired when input value changed, it wasn't in some cases

Locale changes:
* Added Arabic, Norwegian, Georgian
* `clear` for French
* `today` and `clear` for Bahasa
* `today` and `clear` for Portuguese (both `pt` and `pt-BR`)
* `format` for Turkish
* `format` and `weekStart` for Swedish
* `format` and `weekStart` for Simplified Chinese; `today`, `format`, and `weekStart` for Traditional Chinese
* Fixed typo in Serbian latin (`rs-latin`)
* More appropriate use of Traditional Chinese habit in `zh-TW`


1.1.3
 ----------
 
 Clicking the clear button now triggers the input's `change` and datepicker's `changeDate` events.
 Fixed a bug that broke the event-attached `format` function.
 
 
1.1.2
----------

Botched release, no change from 1.1.1


1.1.1
----------

Fixes a bug when setting startDate or endDate during initialization.


1.1.0
----------

New features:
* Date range picker.
* Data API / noConflict.
* `getDate` and `setDate` methods.
* `format` method for events; this allows you to easily format the `date` associated with the event.
* New options:
  * `beforeShowDay` option: a dev-provided function that can enable/disable dates, add css classes, and add tooltips.
  * `clearBtn`, a button for resetting the picker.

Internal changes:
* Cleaner and more reliable method for extracting options from all potential sources (defaults, locale overrides, data-attrs, and instantiation options, in that order).  This also populates `$.fn.datepicker.defaults` with the default values, and uses this hash as the actual source of defaults, meaning you can globally change the default value for a given option.

Bugs squashed:
* Resolved a conflict with bootstrap's native `.switch` class.
* Fixed a bug with components where they would be stuck with a stale value when editing the value manually.
* The `date` attributes on events are now local dates instead of internal UTC dates.
* Separate `Date` objects for internal selected and view date references.
* Clicking multiple times inside inputs no longer hides the picker.

Minor improvements:
* Better text color for highlighted "today" date.
* Last year in decade view now marked as "new" instead of "old".
* Formats now properly handle trailing separators.

Locale changes:
* Added Albanian, Estonian, and Macedonian
* Added `weekStart` for Russian
* Added `weekStart` and `format` for Finnish

Potentially backward-incompatible changes:
* Options revamp:
  * This fixes bugs in the correlation of some data-attrs to their associated option names.  If you use `data-date-weekstart`, `data-date-startdate`, or `data-date-enddate`, you should update these to `data-date-week-start`, `data-date-start-date`, or `data-date-end-date`, respectively.
  * All options for datepicker are now properties on the datepicker's `o` property; options are no longer stored on the Datepicker instance itself.  If you have code that accesses options stored on the datepicker instance (eg, `datepicker.format`), you will need to update it to access those options via the `o` property (eg, `datepicker.o.format`).  "Raw" options are available via the `_o` property.

1.0.2
----------

Small optimizations release

* Reduced the number of times `update` is called on initialization.
* Datepicker now detaches the picker dropdown when it is hidden, and appends it when shown.  This removes the picker from the DOM when it is not in use.
* No longer listens to document/window events unless picker is visible.

v1.0.1
------

* Support for [Bower](http://twitter.github.com/bower/)
* Component pickers are now aligned under the input, not the add-on element.
* Japanese locale now has "today" and "format".
* "remove" method removes `.data().date` if the datepicker is on a non-input.
* Events on initialized elements are no longer blocked from bubbling up the DOM (jQuery.live et al can now catch the events).
* Component triggers now include `.btn` in addition to `.add-on`.
* Updates to README contents.

v1.0.0
------

Initial release:

* format option
* weekStart option
* calendarWeeks option
* startDate / endDate options
* daysOfWeekDisabled option
* autoclose option
* startView / mnViewMode options
* todayBtn / todayHighlight options
* keyboardNavigation option
* language option
* forceParse option
