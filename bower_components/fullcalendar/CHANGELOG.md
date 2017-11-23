
v3.7.0 (2017-11-13)
-------------------

Bugfixes:
- `render` method does not re-adjust calendar dimension (#3893)
- when custom view navigates completely into hidden weekends, JS error ([scheduler-375])

Other:
- in themes.html demo, fixed broken Bootswatch themes (#3917)
- moved JavaScript codebase over to TypeScript
  (same external API; embedded typedefs coming soon)

[scheduler-375]: https://github.com/fullcalendar/fullcalendar-scheduler/issues/375


v3.6.2 (2017-10-23)
-------------------

Bugfixes:
- Google Calendar event sources not calling `loading` callback (#3884)
- `eventDataTransform` w/ eventConstraint shouldn't be called during event resizing (#3859)
- `navLinks` would go to the previously navigated date (#3869)
- `nowIndicator` arrow would repeatedly render (#3872)
- fc-content-skeleton DOM element would repeatedly render on navigation in agenda view


v3.6.1 (2017-10-11)
-------------------

Bugfixes:
- JSON feed event sources always requesting current page (#3865)
- multi-day events appearing multiple times in more+ popover (#3856)


v3.6.0 (2017-10-10)
-------------------

Features:
- `agendaEventMinHeight` for guaranteeing height (#961, #3788) thx @Stafie
- `columnHeader` can be set to `false` to hide headings (#3438, #3787) thx @caseyjhol
- export all View classes (#2851, #3831)
- `updateEvent`, update complex attributes (#2864)
- Albanian locale (#3847) thx @alensaqe

Bugfixes:
- objects used as non-standard Event properties ignored by `updateEvent` (#3839)
- listDay error if event goes over period (#3843)
- `validDays` with `hiddenDays`, js error when no days active (#3846)
- json feed Event Source object no longer has `url` property (#3845)
- `updateEvent`, allDay to timed, when no end, wrong end date (#3144)
- `removeEvents` by `_id` stopped working (#3828)
- correct `this` context in FuncEventSource (#3848) thx @declspec
- js event not received in unselect callback when selecting another cell (#3832)

Incompatibilities:
- The `viewRender` callback might now be fired AFTER events have been rendered
  to the DOM. However, the eventRender/eventAfterRender/eventAfterAllRender callbacks
  will always be fired after `viewRender`, just as before.
- The internal `Grid` class (accessed via `$.fullCalendar.Grid`) has been removed.
  For monkeypatching, use DayGrid/TimeGrid directly.


v3.5.1 (2017-09-06)
-------------------

- fixed loading trigger not firing (#3810)
- fixed overaggressively fetching events, on option changes (#3820)
- fixed event object `date` property being discarded (tho still parsed) (#3819)
- fixed event object `_id` property being discarded (#3811)


v3.5.0 (2017-08-30)
-------------------

Features:
- Bootstrap 3 theme support (#2334, #3566)
	- via `themeSystem: 'bootstrap3'` (the `theme` option is deprecated)
	- new `bootstrapGlyphicons` option
	- jQuery UI "Cupertino" theme no longer included in zip archive
	- improved theme switcher on demo page (#1436)
	(big thanks to @joankaradimov)
- 25% event rendering performance improvement across the board (#2524)
- console message for unknown method/calendar (#3253)
- Serbian cyrilic/latin (#3656)
- available via Packagist (#2999, #3617)

Bugfixes:
- slot time label invisible when minTime starts out of alignment (#2786)
- bug with inverse-background event rendering when out of range (#3652)
- wrongly disabled prev/next when current date outside of validRange (#3686, #3651)
- updateEvent, error when changing allDay from false to true (#3518)
- updateEvent doesn't support ID changes (#2928)
- Promise then method doesn't forward result (#3744)
- Korean typo (#3693)
- fixed switching from any view to listview, eventAfterRender isn't called (#3751)

Incompatibilities:
- Event Objects obtained from clientEvents or various callbacks are no longer
  references to internally used objects. Rather, they are static object copies.
- `clientEvents` method no longer returns events in same order as received.
  Do not depend on order.


v3.4.0 (2017-04-27)
-------------------

- composer.json for Composer (PHP package manager) (#3617)
- fix toISOString for locales with non-trivial postformatting (#3619)
- fix for nested inverse-background events (#3609)
- Estonian locale (#3600)
- fixed Latvian localization (#3525)
- internal refactor of async systems


v3.3.1 (2017-04-01)
-------------------

Bugfixes:
- stale calendar title when navigate away from then back to the a view (#3604)
- js error when gotoDate immediately after calendar initialization (#3598)
- agenda view scrollbars causes misalignment in jquery 3.2.1 (#3612)
- navigation bug when trying to navigate to a day of another week (#3610)
- dateIncrement not working when duration and dateIncrement have different units


v3.3.0 (2017-03-23)
-------------------

Features:
- `visibleRange` - complete control over view's date range (#2847, #3105, #3245)
- `validRange` - restrict date range (#429)
- `changeView` - pass in a date or visibleRange as second param (#3366)
- `dateIncrement` - customize prev/next jump (#2710)
- `dateAlignment` - custom view alignment, like start-of-week (#3113)
- `dayCount` - force a fixed number-of-days, even with hiddenDays (#2753)
- `showNonCurrentDates` - option to hide day cells for prev/next months (#437)
- can define a defaultView with a duration/visibleRange/dayCount with needing
  to create a custom view in the `views` object. Known as a "Generic View".

Behavior Changes:
- when custom view is specified with duration `{days:7}`,
  it will no longer align with the start of the week. (#2847)
- when `gotoDate` is called on a custom view with a duration of multiple days,
  the view will always shift to begin with the given date. (#3515)

Bugfixes:
- event rendering when excessive `minTime`/`maxTime` (#2530)
- event dragging not shown when excessive `minTime`/`maxTime` (#3055)
- excessive `minTime`/`maxTime` not reflected in event fetching (#3514)
	- when minTime is negative, or maxTime beyond 24 hours, when event data is requested
	  via a function or a feed, the given data params will have time parts.
- external event dragging via touchpunch broken (#3544)
- can't make an immediate new selection after existing selection, with mouse.
  introduced in v3.2.0 (#3558)


v3.2.0 (2017-02-14)
-------------------

Features:
- `selectMinDistance`, threshold before a mouse selection begins (#2428)

Bugfixes:
- iOS 10, unwanted scrolling while dragging events/selection (#3403)
- dayClick triggered when swiping on touch devices (#3332)
- dayClick not functioning on Firefix mobile (#3450)
- title computed incorrectly for views with no weekends (#2884)
- unwanted scrollbars in month-view when non-integer width (#3453, #3444)
- incorrect date formatting for locales with non-standlone month/day names (#3478)
- date formatting, incorrect omission of trailing period for certain locales (#2504, #3486)
- formatRange should collapse same week numbers (#3467)
- Taiwanese locale updated (#3426)
- Finnish noEventsMessage updated (#3476)
- Croatian (hr) buttonText is blank (#3270)
- JSON feed PHP example, date range math bug (#3485)


v3.1.0 (2016-12-05)
-------------------

- experimental support for implicitly batched ("debounced") event rendering (#2938)
	- `eventRenderWait` (off by default)
- new `footer` option, similar to header toolbar (#654, #3299)
- event rendering batch methods (#3351):
	- `renderEvents`
	- `updateEvents`
- more granular touch settings (#3377):
	- `eventLongPressDelay`
	- `selectLongPressDelay`
- eventDestroy not called when removing the popover (#3416, #3419)
- print stylesheet and gcal extension now offered as minified (#3415)
- fc-today in agenda header cells (#3361, #3365)
- height-related options in tandem with other options (#3327, #3384)
- Kazakh locale (#3394)
- Afrikaans locale (#3390)
- internal refactor related to timing of rendering and firing handlers.
  calls to rerender the current date-range and events from within handlers
  might not execute immediately. instead, will execute after handler finishes.


v3.0.1 (2016-09-26)
-------------------

Bugfixes:
- list view rendering event times incorrectly (#3334)
- list view rendering events/days out of order (#3347)
- events with no title rendering as "undefined"
- add .fc scope to table print styles (#3343)
- "display no events" text fix for German (#3354)


v3.0.0 (2016-09-04)
-------------------

Features:
- List View (#560)
	- new views: `listDay`, `listWeek`, `listMonth`, `listYear`, and simply `list`
	- `listDayFormat`
	- `listDayAltFormat`
	- `noEventsMessage`
- Clickable day/week numbers for easier navigation (#424)
	- `navLinks`
	- `navLinkDayClick`
	- `navLinkWeekClick`
- Programmatically allow/disallow user interactions:
	- `eventAllow` (#2740)
	- `selectAllow` (#2511)
- Option to display week numbers in cells (#3024)
	- `weekNumbersWithinDays` (set to `true` to activate)
- When week calc is ISO, default first day-of-week to Monday (#3255)
- Macedonian locale (#2739)
- Malay locale

Breaking Changes:
- IE8 support dropped
- jQuery: minimum support raised to v2.0.0
- MomentJS: minimum support raised to v2.9.0
- `lang` option renamed to `locale`
- dist files have been renamed to be more consistent with MomentJS:
	- `lang/` -> `locale/`
	- `lang-all.js` -> `locale-all.js`
- behavior of moment methods no longer affected by ambiguousness:
	- `isSame`
	- `isBefore`
	- `isAfter`
- View-Option-Hashes no longer supported (deprecated in 2.2.4)
- removed `weekMode` setting
- removed `axisFormat` setting
- DOM structure of month/basic-view day cell numbers changed

Bugfixes:
- `$.fullCalendar.version` incorrect (#3292)

Build System:
- using gulp instead of grunt (faster)
- using npm internally for dependencies instead of bower
- changed repo directory structure


v2.9.1 (2016-07-31)
-------------------

- multiple definitions for businessHours (#2686)
- businessHours for single day doesn't display weekends (#2944)
- height/contentHeight can accept a function or 'parent' for dynamic value (#3271)
- fix +more popover clipped by overflow (#3232)
- fix +more popover positioned incorrectly when scrolled (#3137)
- Norwegian Nynorsk translation (#3246)
- fix isAnimating JS error (#3285)


v2.9.0 (2016-07-10)
-------------------

- Setters for (almost) all options (#564).
  See [docs](http://fullcalendar.io/docs/utilities/dynamic_options/) for more info.
- Travis CI improvements (#3266)


v2.8.0 (2016-06-19)
-------------------

- getEventSources method (#3103, #2433)
- getEventSourceById method (#3223)
- refetchEventSources method (#3103, #1328, #254)
- removeEventSources method (#3165, #948)
- prevent flicker when refetchEvents is called (#3123, #2558)
- fix for removing event sources that share same URL (#3209)
- jQuery 3 support (#3197, #3124)
- Travis CI integration (#3218)
- EditorConfig for promoting consistent code style (#141)
- use en dash when formatting ranges (#3077)
- height:auto always shows scrollbars in month view on FF (#3202)
- new languages:
	- Basque (#2992)
	- Galician (#194)
	- Luxembourgish (#2979)


v2.7.3 (2016-06-02)
-------------------

internal enhancements that plugins can benefit from:
- EventEmitter not correctly working with stopListeningTo
- normalizeEvent hook for manipulating event data


v2.7.2 (2016-05-20)
-------------------

- fixed desktops/laptops with touch support not accepting mouse events for
  dayClick/dragging/resizing (#3154, #3149)
- fixed dayClick incorrectly triggered on touch scroll (#3152)
- fixed touch event dragging wrongfully beginning upon scrolling document (#3160)
- fixed minified JS still contained comments
- UI change: mouse users must hover over an event to reveal its resizers


v2.7.1 (2016-05-01)
-------------------

- dayClick not firing on touch devices (#3138)
- icons for prev/next not working in MS Edge (#2852)
- fix bad languages troubles with firewalls (#3133, #3132)
- update all dev dependencies (#3145, #3010, #2901, #251)
- git-ignore npm debug logs (#3011)
- misc automated test updates (#3139, #3147)
- Google Calendar htmlLink not always defined (#2844)


v2.7.0 (2016-04-23)
-------------------

touch device support (#994):
	- smoother scrolling
	- interactions initiated via "long press":
		- event drag-n-drop
		- event resize
		- time-range selecting
	- `longPressDelay`


v2.6.1 (2016-02-17)
-------------------

- make `nowIndicator` positioning refresh on window resize


v2.6.0 (2016-01-07)
-------------------

- current time indicator (#414)
- bundled with most recent version of moment (2.11.0)
- UMD wrapper around lang files now handles commonjs (#2918)
- fix bug where external event dragging would not respect eventOverlap
- fix bug where external event dropping would not render the whole-day highlight


v2.5.0 (2015-11-30)
-------------------

- internal timezone refactor. fixes #2396, #2900, #2945, #2711
- internal "grid" system refactor. improved API for plugins.


v2.4.0 (2015-08-16)
-------------------

- add new buttons to the header via `customButtons` ([225])
- control stacking order of events via `eventOrder` ([364])
- control frequency of slot text via `slotLabelInterval` ([946])
- `displayEventTime` ([1904])
- `on` and `off` methods ([1910])
- renamed `axisFormat` to `slotLabelFormat`

[225]: https://code.google.com/p/fullcalendar/issues/detail?id=225
[364]: https://code.google.com/p/fullcalendar/issues/detail?id=364
[946]: https://code.google.com/p/fullcalendar/issues/detail?id=946
[1904]: https://code.google.com/p/fullcalendar/issues/detail?id=1904
[1910]: https://code.google.com/p/fullcalendar/issues/detail?id=1910


v2.3.2 (2015-06-14)
-------------------

- minor code adjustment in preparation for plugins


v2.3.1 (2015-03-08)
-------------------

- Fix week view column title for en-gb ([PR220])
- Publish to NPM ([2447])
- Detangle bower from npm package ([PR179])

[PR220]: https://github.com/arshaw/fullcalendar/pull/220
[2447]: https://code.google.com/p/fullcalendar/issues/detail?id=2447
[PR179]: https://github.com/arshaw/fullcalendar/pull/179


v2.3.0 (2015-02-21)
-------------------

- internal refactoring in preparation for other views
- businessHours now renders on whole-days in addition to timed areas
- events in "more" popover not sorted by time ([2385])
- avoid using moment's deprecated zone method ([2443])
- destroying the calendar sometimes causes all window resize handlers to be unbound ([2432])
- multiple calendars on one page, can't accept external elements after navigating ([2433])
- accept external events from jqui sortable ([1698])
- external jqui drop processed before reverting ([1661])
- IE8 fix: month view renders incorrectly ([2428])
- IE8 fix: eventLimit:true wouldn't activate "more" link ([2330])
- IE8 fix: dragging an event with an href
- IE8 fix: invisible element while dragging agenda view events
- IE8 fix: erratic external element dragging

[2385]: https://code.google.com/p/fullcalendar/issues/detail?id=2385
[2443]: https://code.google.com/p/fullcalendar/issues/detail?id=2443
[2432]: https://code.google.com/p/fullcalendar/issues/detail?id=2432
[2433]: https://code.google.com/p/fullcalendar/issues/detail?id=2433
[1698]: https://code.google.com/p/fullcalendar/issues/detail?id=1698
[1661]: https://code.google.com/p/fullcalendar/issues/detail?id=1661
[2428]: https://code.google.com/p/fullcalendar/issues/detail?id=2428
[2330]: https://code.google.com/p/fullcalendar/issues/detail?id=2330


v2.2.7 (2015-02-10)
-------------------

- view.title wasn't defined in viewRender callback ([2407])
- FullCalendar versions >= 2.2.5 brokenness with Moment versions <= 2.8.3 ([2417])
- Support Bokmal Norwegian language specifically ([2427])

[2407]: https://code.google.com/p/fullcalendar/issues/detail?id=2407
[2417]: https://code.google.com/p/fullcalendar/issues/detail?id=2417
[2427]: https://code.google.com/p/fullcalendar/issues/detail?id=2427


v2.2.6 (2015-01-11)
-------------------

- Compatibility with Moment v2.9. Was breaking GCal plugin ([2408])
- View object's `title` property mistakenly omitted ([2407])
- Single-day views with hiddens days could cause prev/next misbehavior ([2406])
- Don't let the current date ever be a hidden day (solves [2395])
- Hebrew locale ([2157])

[2408]: https://code.google.com/p/fullcalendar/issues/detail?id=2408
[2407]: https://code.google.com/p/fullcalendar/issues/detail?id=2407
[2406]: https://code.google.com/p/fullcalendar/issues/detail?id=2406
[2395]: https://code.google.com/p/fullcalendar/issues/detail?id=2395
[2157]: https://code.google.com/p/fullcalendar/issues/detail?id=2157


v2.2.5 (2014-12-30)
-------------------

- `buttonText` specified for custom views via the `views` option
	- bugfix: wrong default value, couldn't override default
	- feature: default value taken from locale


v2.2.4 (2014-12-29)
-------------------

- Arbitrary durations for basic/agenda views with the `views` option ([692])
- Specify view-specific options using the `views` option. fixes [2283]
- Deprecate view-option-hashes
- Formalize and expose View API ([1055])
- updateEvent method, more intuitive behavior. fixes [2194]

[692]: https://code.google.com/p/fullcalendar/issues/detail?id=692
[2283]: https://code.google.com/p/fullcalendar/issues/detail?id=2283
[1055]: https://code.google.com/p/fullcalendar/issues/detail?id=1055
[2194]: https://code.google.com/p/fullcalendar/issues/detail?id=2194


v2.2.3 (2014-11-26)
-------------------

- removeEventSource with Google Calendar object source, would not remove ([2368])
- Events with invalid end dates are still accepted and rendered ([2350], [2237], [2296])
- Bug when rendering business hours and navigating away from original view ([2365])
- Links to Google Calendar events will use current timezone ([2122])
- Google Calendar plugin works with timezone names that have spaces
- Google Calendar plugin accepts person email addresses as calendar IDs
- Internally use numeric sort instead of alphanumeric sort ([2370])

[2368]: https://code.google.com/p/fullcalendar/issues/detail?id=2368
[2350]: https://code.google.com/p/fullcalendar/issues/detail?id=2350
[2237]: https://code.google.com/p/fullcalendar/issues/detail?id=2237
[2296]: https://code.google.com/p/fullcalendar/issues/detail?id=2296
[2365]: https://code.google.com/p/fullcalendar/issues/detail?id=2365
[2122]: https://code.google.com/p/fullcalendar/issues/detail?id=2122
[2370]: https://code.google.com/p/fullcalendar/issues/detail?id=2370


v2.2.2 (2014-11-19)
-------------------

- Fixes to Google Calendar API V3 code
	- wouldn't recognize a lone-string Google Calendar ID if periods before the @ symbol
	- removeEventSource wouldn't work when given a Google Calendar ID


v2.2.1 (2014-11-19)
-------------------

- Migrate Google Calendar plugin to use V3 of the API ([1526])

[1526]: https://code.google.com/p/fullcalendar/issues/detail?id=1526


v2.2.0 (2014-11-14)
-------------------

- Background events. Event object's `rendering` property ([144], [1286])
- `businessHours` option ([144])
- Controlling where events can be dragged/resized and selections can go ([396], [1286], [2253])
	- `eventOverlap`, `selectOverlap`, and similar
	- `eventConstraint`, `selectConstraint`, and similar
- Improvements to dragging and dropping external events ([2004])
	- Associating with real event data. used with `eventReceive`
	- Associating a `duration`
- Performance boost for moment creation
	- Be aware, FullCalendar-specific methods now attached directly to global moment.fn
	- Helps with [issue 2259][2259]
- Reintroduced forgotten `dropAccept` option ([2312])

[144]: https://code.google.com/p/fullcalendar/issues/detail?id=144
[396]: https://code.google.com/p/fullcalendar/issues/detail?id=396
[1286]: https://code.google.com/p/fullcalendar/issues/detail?id=1286
[2004]: https://code.google.com/p/fullcalendar/issues/detail?id=2004
[2253]: https://code.google.com/p/fullcalendar/issues/detail?id=2253
[2259]: https://code.google.com/p/fullcalendar/issues/detail?id=2259
[2312]: https://code.google.com/p/fullcalendar/issues/detail?id=2312


v2.1.1 (2014-08-29)
-------------------

- removeEventSource not working with array ([2203])
- mouseout not triggered after mouseover+updateEvent ([829])
- agenda event's render with no <a> href, not clickable ([2263])

[2203]: https://code.google.com/p/fullcalendar/issues/detail?id=2203
[829]: https://code.google.com/p/fullcalendar/issues/detail?id=829
[2263]: https://code.google.com/p/fullcalendar/issues/detail?id=2263


v2.1.0 (2014-08-25)
-------------------

Large code refactor with better OOP, better code reuse, and more comments.
**No more reliance on jQuery UI** for event dragging, resizing, or anything else.

Significant changes to HTML/CSS skeleton:
- Leverages tables for liquid rendering of days and events. No costly manual repositioning ([809])
- **Backwards-incompatibilities**:
	- **Many classNames have changed. Custom CSS will likely need to be adjusted.**
	- IE7 definitely not supported anymore
	- In `eventRender` callback, `element` will not be attached to DOM yet
	- Events are styled to be one line by default ([1992]). Can be undone through custom CSS,
	  but not recommended (might get gaps [like this][111] in certain situations).

A "more..." link when there are too many events on a day ([304]). Works with month and basic views
as well as the all-day section of the agenda views. New options:
- `eventLimit`. a number or `true`
- `eventLimitClick`. the `"popover`" value will reveal all events in a raised panel (the default)
- `eventLimitText`
- `dayPopoverFormat`

Changes related to height and scrollbars:
- `aspectRatio`/`height`/`contentHeight` values will be honored *no matter what*
	- If too many events causing too much vertical space, scrollbars will be used ([728]).
	  This is default behavior for month view (**backwards-incompatibility**)
	- If too few slots in agenda view, view will stretch to be the correct height ([2196])
- `'auto'` value for `height`/`contentHeight` options. If content is too tall, the view will
  vertically stretch to accomodate and no scrollbars will be used ([521]).
- Tall weeks in month view will borrow height from other weeks ([243])
- Automatically scroll the view then dragging/resizing an event ([1025], [2078])
- New `fixedWeekCount` option to determines the number of weeks in month view
	- Supersedes `weekMode` (**deprecated**). Instead, use a combination of `fixedWeekCount` and
	  one of the height options, possibly with an `'auto'` value

Much nicer, glitch-free rendering of calendar *for printers* ([35]). Things you might not expect:
- Buttons will become hidden
- Agenda views display a flat list of events where the time slots would be

Other issues resolved along the way:
- Space on right side of agenda events configurable through CSS ([204])
- Problem with window resize ([259])
- Events sorting stays consistent across weeks ([510])
- Agenda's columns misaligned on wide screens ([511])
- Run `selectHelper` through `eventRender` callbacks ([629])
- Keyboard access, tabbing ([637])
- Run resizing events through `eventRender` ([714])
- Resize an event to a different day in agenda views ([736])
- Allow selection across days in agenda views ([778])
- Mouseenter delegated event not working on event elements ([936])
- Agenda event dragging, snapping to different columns is erratic ([1101])
- Android browser cuts off Day view at 8 PM with no scroll bar ([1203])
- Don't fire `eventMouseover`/`eventMouseout` while dragging/resizing ([1297])
- Customize the resize handle text ("=") ([1326])
- If agenda event is too short, don't overwrite `.fc-event-time` ([1700])
- Zooming calendar causes events to misalign ([1996])
- Event destroy callback on event removal ([2017])
- Agenda views, when RTL, should have axis on right ([2132])
- Make header buttons more accessibile ([2151])
- daySelectionMousedown should interpret OSX ctrl+click as a right mouse click ([2169])
- Best way to display time text on multi-day events *with times* ([2172])
- Eliminate table use for header layout ([2186])
- Event delegation used for event-related callbacks (like `eventClick`). Speedier.

[35]: https://code.google.com/p/fullcalendar/issues/detail?id=35
[204]: https://code.google.com/p/fullcalendar/issues/detail?id=204
[243]: https://code.google.com/p/fullcalendar/issues/detail?id=243
[259]: https://code.google.com/p/fullcalendar/issues/detail?id=259
[304]: https://code.google.com/p/fullcalendar/issues/detail?id=304
[510]: https://code.google.com/p/fullcalendar/issues/detail?id=510
[511]: https://code.google.com/p/fullcalendar/issues/detail?id=511
[521]: https://code.google.com/p/fullcalendar/issues/detail?id=521
[629]: https://code.google.com/p/fullcalendar/issues/detail?id=629
[637]: https://code.google.com/p/fullcalendar/issues/detail?id=637
[714]: https://code.google.com/p/fullcalendar/issues/detail?id=714
[728]: https://code.google.com/p/fullcalendar/issues/detail?id=728
[736]: https://code.google.com/p/fullcalendar/issues/detail?id=736
[778]: https://code.google.com/p/fullcalendar/issues/detail?id=778
[809]: https://code.google.com/p/fullcalendar/issues/detail?id=809
[936]: https://code.google.com/p/fullcalendar/issues/detail?id=936
[1025]: https://code.google.com/p/fullcalendar/issues/detail?id=1025
[1101]: https://code.google.com/p/fullcalendar/issues/detail?id=1101
[1203]: https://code.google.com/p/fullcalendar/issues/detail?id=1203
[1297]: https://code.google.com/p/fullcalendar/issues/detail?id=1297
[1326]: https://code.google.com/p/fullcalendar/issues/detail?id=1326
[1700]: https://code.google.com/p/fullcalendar/issues/detail?id=1700
[1992]: https://code.google.com/p/fullcalendar/issues/detail?id=1992
[1996]: https://code.google.com/p/fullcalendar/issues/detail?id=1996
[2017]: https://code.google.com/p/fullcalendar/issues/detail?id=2017
[2078]: https://code.google.com/p/fullcalendar/issues/detail?id=2078
[2132]: https://code.google.com/p/fullcalendar/issues/detail?id=2132
[2151]: https://code.google.com/p/fullcalendar/issues/detail?id=2151
[2169]: https://code.google.com/p/fullcalendar/issues/detail?id=2169
[2172]: https://code.google.com/p/fullcalendar/issues/detail?id=2172
[2186]: https://code.google.com/p/fullcalendar/issues/detail?id=2186
[2196]: https://code.google.com/p/fullcalendar/issues/detail?id=2196
[111]: https://code.google.com/p/fullcalendar/issues/detail?id=111


v2.0.3 (2014-08-15)
-------------------

- moment-2.8.1 compatibility ([2221])
- relative path in bower.json ([PR 117])
- upgraded jquery-ui and misc dev dependencies

[2221]: https://code.google.com/p/fullcalendar/issues/detail?id=2221
[PR 117]: https://github.com/arshaw/fullcalendar/pull/177


v2.0.2 (2014-06-24)
-------------------

- bug with persisting addEventSource calls ([2191])
- bug with persisting removeEvents calls with an array source ([2187])
- bug with removeEvents method when called with 0 removes all events ([2082])

[2191]: https://code.google.com/p/fullcalendar/issues/detail?id=2191
[2187]: https://code.google.com/p/fullcalendar/issues/detail?id=2187
[2082]: https://code.google.com/p/fullcalendar/issues/detail?id=2082


v2.0.1 (2014-06-15)
-------------------

- `delta` parameters reintroduced in `eventDrop` and `eventResize` handlers ([2156])
  - **Note**: this changes the argument order for `revertFunc`
- wrongfully triggering a windowResize when resizing an agenda view event ([1116])
- `this` values in event drag-n-drop/resize handlers consistently the DOM node ([1177])
- `displayEventEnd` - v2 workaround to force display of an end time ([2090])
- don't modify passed-in eventSource items ([954])
- destroy method now removes fc-ltr class ([2033])
- weeks of last/next month still visible when weekends are hidden ([2095])
- fixed memory leak when destroying calendar with selectable/droppable ([2137])
- Icelandic language ([2180])
- Bahasa Indonesia language ([PR 172])

[1116]: https://code.google.com/p/fullcalendar/issues/detail?id=1116
[1177]: https://code.google.com/p/fullcalendar/issues/detail?id=1177
[2090]: https://code.google.com/p/fullcalendar/issues/detail?id=2090
[954]: https://code.google.com/p/fullcalendar/issues/detail?id=954
[2033]: https://code.google.com/p/fullcalendar/issues/detail?id=2033
[2095]: https://code.google.com/p/fullcalendar/issues/detail?id=2095
[2137]: https://code.google.com/p/fullcalendar/issues/detail?id=2137
[2156]: https://code.google.com/p/fullcalendar/issues/detail?id=2156
[2180]: https://code.google.com/p/fullcalendar/issues/detail?id=2180
[PR 172]: https://github.com/arshaw/fullcalendar/pull/172


v2.0.0 (2014-06-01)
-------------------

Internationalization support, timezone support, and [MomentJS] integration. Extensive changes, many
of which are backwards incompatible.

[Full list of changes][Upgrading-to-v2] | [Affected Issues][Date-Milestone]

An automated testing framework has been set up ([Karma] + [Jasmine]) and tests have been written
which cover about half of FullCalendar's functionality. Special thanks to @incre-d, @vidbina, and
@sirrocco for the help.

In addition, the main development repo has been repurposed to also include the built distributable
JS/CSS for the project and will serve as the new [Bower] endpoint.

[MomentJS]: http://momentjs.com/
[Upgrading-to-v2]: http://arshaw.com/fullcalendar/wiki/Upgrading-to-v2/
[Date-Milestone]: https://code.google.com/p/fullcalendar/issues/list?can=1&q=milestone%3Ddate
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/
[Bower]: http://bower.io/


v1.6.4 (2013-09-01)
-------------------

- better algorithm for positioning timed agenda events ([1115])
- `slotEventOverlap` option to tweak timed agenda event overlapping ([218])
- selection bug when slot height is customized ([1035])
- supply view argument in `loading` callback ([1018])
- fixed week number not displaying in agenda views ([1951])
- fixed fullCalendar not initializing with no options ([1356])
- NPM's `package.json`, no more warnings or errors ([1762])
- building the bower component should output `bower.json` instead of `component.json` ([PR 125])
- use bower internally for fetching new versions of jQuery and jQuery UI

[1115]: https://code.google.com/p/fullcalendar/issues/detail?id=1115
[218]: https://code.google.com/p/fullcalendar/issues/detail?id=218
[1035]: https://code.google.com/p/fullcalendar/issues/detail?id=1035
[1018]: https://code.google.com/p/fullcalendar/issues/detail?id=1018
[1951]: https://code.google.com/p/fullcalendar/issues/detail?id=1951
[1356]: https://code.google.com/p/fullcalendar/issues/detail?id=1356
[1762]: https://code.google.com/p/fullcalendar/issues/detail?id=1762
[PR 125]: https://github.com/arshaw/fullcalendar/pull/125


v1.6.3 (2013-08-10)
-------------------

- `viewRender` callback ([PR 15])
- `viewDestroy` callback ([PR 15])
- `eventDestroy` callback ([PR 111])
- `handleWindowResize` option ([PR 54])
- `eventStartEditable`/`startEditable` options ([PR 49])
- `eventDurationEditable`/`durationEditable` options ([PR 49])
- specify function for `$.ajax` `data` parameter for JSON event sources ([PR 59])
- fixed bug with agenda event dropping in wrong column ([PR 55])
- easier event element z-index customization ([PR 58])
- classNames on past/future days ([PR 88])
- allow `null`/`undefined` event titles ([PR 84])
- small optimize for agenda event rendering ([PR 56])
- deprecated:
	- `viewDisplay`
	- `disableDragging`
	- `disableResizing`
- bundled with latest jQuery (1.10.2) and jQuery UI (1.10.3)

[PR 15]: https://github.com/arshaw/fullcalendar/pull/15
[PR 111]: https://github.com/arshaw/fullcalendar/pull/111
[PR 54]: https://github.com/arshaw/fullcalendar/pull/54
[PR 49]: https://github.com/arshaw/fullcalendar/pull/49
[PR 59]: https://github.com/arshaw/fullcalendar/pull/59
[PR 55]: https://github.com/arshaw/fullcalendar/pull/55
[PR 58]: https://github.com/arshaw/fullcalendar/pull/58
[PR 88]: https://github.com/arshaw/fullcalendar/pull/88
[PR 84]: https://github.com/arshaw/fullcalendar/pull/84
[PR 56]: https://github.com/arshaw/fullcalendar/pull/56


v1.6.2 (2013-07-18)
-------------------

- `hiddenDays` option ([686])
- bugfix: when `eventRender` returns `false`, incorrect stacking of events ([762])
- bugfix: couldn't change `event.backgroundImage` when calling `updateEvent` (thx @stephenharris)

[686]: https://code.google.com/p/fullcalendar/issues/detail?id=686
[762]: https://code.google.com/p/fullcalendar/issues/detail?id=762


v1.6.1 (2013-04-14)
-------------------

- fixed event inner content overflow bug ([1783])
- fixed table header className bug [1772]
- removed text-shadow on events (better for general use, thx @tkrotoff)

[1783]: https://code.google.com/p/fullcalendar/issues/detail?id=1783
[1772]: https://code.google.com/p/fullcalendar/issues/detail?id=1772


v1.6.0 (2013-03-18)
-------------------

- visual facelift, with bootstrap-inspired buttons and colors
- simplified HTML/CSS for events and buttons
- `dayRender`, for modifying a day cell ([191], thx @althaus)
- week numbers on side of calendar ([295])
	- `weekNumber`
	- `weekNumberCalculation`
	- `weekNumberTitle`
	- `W` formatting variable
- finer snapping granularity for agenda view events ([495], thx @ms-doodle-com)
- `eventAfterAllRender` ([753], thx @pdrakeweb)
- `eventDataTransform` (thx @joeyspo)
- `data-date` attributes on cells (thx @Jae)
- expose `$.fullCalendar.dateFormatters`
- when clicking fast on buttons, prevent text selection
- bundled with latest jQuery (1.9.1) and jQuery UI (1.10.2)
- Grunt/Lumbar build system for internal development
- build for Bower package manager
- build for jQuery plugin site

[191]: https://code.google.com/p/fullcalendar/issues/detail?id=191
[295]: https://code.google.com/p/fullcalendar/issues/detail?id=295
[495]: https://code.google.com/p/fullcalendar/issues/detail?id=495
[753]: https://code.google.com/p/fullcalendar/issues/detail?id=753


v1.5.4 (2012-09-05)
-------------------

- made compatible with jQuery 1.8.* (thx @archaeron)
- bundled with jQuery 1.8.1 and jQuery UI 1.8.23


v1.5.3 (2012-02-06)
-------------------

- fixed dragging issue with jQuery UI 1.8.16 ([1168])
- bundled with jQuery 1.7.1 and jQuery UI 1.8.17

[1168]: https://code.google.com/p/fullcalendar/issues/detail?id=1168


v1.5.2 (2011-08-21)
-------------------

- correctly process UTC "Z" ISO8601 date strings ([750])

[750]: https://code.google.com/p/fullcalendar/issues/detail?id=750


v1.5.1 (2011-04-09)
-------------------

- more flexible ISO8601 date parsing ([814])
- more flexible parsing of UNIX timestamps ([826])
- FullCalendar now buildable from source on a Mac ([795])
- FullCalendar QA'd in FF4 ([883])
- upgraded to jQuery 1.5.2 (which supports IE9) and jQuery UI 1.8.11

[814]: https://code.google.com/p/fullcalendar/issues/detail?id=814
[826]: https://code.google.com/p/fullcalendar/issues/detail?id=826
[795]: https://code.google.com/p/fullcalendar/issues/detail?id=795
[883]: https://code.google.com/p/fullcalendar/issues/detail?id=883


v1.5 (2011-03-19)
-----------------

- slicker default styling for buttons
- reworked a lot of the calendar's HTML and accompanying CSS (solves [327] and [395])
- more printer-friendly (fullcalendar-print.css)
- fullcalendar now inherits styles from jquery-ui themes differently.
  styles for buttons are distinct from styles for calendar cells.
  (solves [299])
- can now color events through FullCalendar options and Event-Object properties ([117])
  THIS IS NOW THE PREFERRED METHOD OF COLORING EVENTS (as opposed to using className and CSS)
	- FullCalendar options:
		- eventColor (changes both background and border)
		- eventBackgroundColor
		- eventBorderColor
		- eventTextColor
	- Event-Object options:
		- color (changes both background and border)
		- backgroundColor
		- borderColor
		- textColor
- can now specify an event source as an *object* with a `url` property (json feed) or
  an `events` property (function or array) with additional properties that will
  be applied to the entire event source:
	- color (changes both background and border)
	- backgroudColor
	- borderColor
	- textColor
	- className
	- editable
	- allDayDefault
	- ignoreTimezone
	- startParam (for a feed)
	- endParam   (for a feed)
	- ANY OF THE JQUERY $.ajax OPTIONS
	  allows for easily changing from GET to POST and sending additional parameters ([386])
	  allows for easily attaching ajax handlers such as `error` ([754])
	  allows for turning caching on ([355])
- Google Calendar feeds are now specified differently:
	- specify a simple string of your feed's URL
	- specify an *object* with a `url` property of your feed's URL.
	  you can include any of the new Event-Source options in this object.
	- the old `$.fullCalendar.gcalFeed` method still works
- no more IE7 SSL popup ([504])
- remove `cacheParam` - use json event source `cache` option instead
- latest jquery/jquery-ui

[327]: https://code.google.com/p/fullcalendar/issues/detail?id=327
[395]: https://code.google.com/p/fullcalendar/issues/detail?id=395
[299]: https://code.google.com/p/fullcalendar/issues/detail?id=299
[117]: https://code.google.com/p/fullcalendar/issues/detail?id=117
[386]: https://code.google.com/p/fullcalendar/issues/detail?id=386
[754]: https://code.google.com/p/fullcalendar/issues/detail?id=754
[355]: https://code.google.com/p/fullcalendar/issues/detail?id=355
[504]: https://code.google.com/p/fullcalendar/issues/detail?id=504


v1.4.11 (2011-02-22)
--------------------

- fixed rerenderEvents bug ([790])
- fixed bug with faulty dragging of events from all-day slot in agenda views
- bundled with jquery 1.5 and jquery-ui 1.8.9

[790]: https://code.google.com/p/fullcalendar/issues/detail?id=790


v1.4.10 (2011-01-02)
--------------------

- fixed bug with resizing event to different week in 5-day month view ([740])
- fixed bug with events not sticking after a removeEvents call ([757])
- fixed bug with underlying parseTime method, and other uses of parseInt ([688])

[740]: https://code.google.com/p/fullcalendar/issues/detail?id=740
[757]: https://code.google.com/p/fullcalendar/issues/detail?id=757
[688]: https://code.google.com/p/fullcalendar/issues/detail?id=688


v1.4.9 (2010-11-16)
-------------------

- new algorithm for vertically stacking events ([111])
- resizing an event to a different week ([306])
- bug: some events not rendered with consecutive calls to addEventSource ([679])

[111]: https://code.google.com/p/fullcalendar/issues/detail?id=111
[306]: https://code.google.com/p/fullcalendar/issues/detail?id=306
[679]: https://code.google.com/p/fullcalendar/issues/detail?id=679


v1.4.8 (2010-10-16)
-------------------

- ignoreTimezone option (set to `false` to process UTC offsets in ISO8601 dates)
- bugfixes
	- event refetching not being called under certain conditions ([417], [554])
	- event refetching being called multiple times under certain conditions ([586], [616])
	- selection cannot be triggered by right mouse button ([558])
	- agenda view left axis sized incorrectly ([465])
	- IE js error when calendar is too narrow ([517])
	- agenda view looks strange when no scrollbars ([235])
	- improved parsing of ISO8601 dates with UTC offsets
- $.fullCalendar.version
- an internal refactor of the code, for easier future development and modularity

[417]: https://code.google.com/p/fullcalendar/issues/detail?id=417
[554]: https://code.google.com/p/fullcalendar/issues/detail?id=554
[586]: https://code.google.com/p/fullcalendar/issues/detail?id=586
[616]: https://code.google.com/p/fullcalendar/issues/detail?id=616
[558]: https://code.google.com/p/fullcalendar/issues/detail?id=558
[465]: https://code.google.com/p/fullcalendar/issues/detail?id=465
[517]: https://code.google.com/p/fullcalendar/issues/detail?id=517
[235]: https://code.google.com/p/fullcalendar/issues/detail?id=235


v1.4.7 (2010-07-05)
-------------------

- "dropping" external objects onto the calendar
	- droppable (boolean, to turn on/off)
	- dropAccept (to filter which events the calendar will accept)
	- drop (trigger)
- selectable options can now be specified with a View Option Hash
- bugfixes
	- dragged & reverted events having wrong time text ([406])
	- bug rendering events that have an endtime with seconds, but no hours/minutes ([477])
	- gotoDate date overflow bug ([429])
	- wrong date reported when clicking on edge of last column in agenda views [412]
- support newlines in event titles
- select/unselect callbacks now passes native js event

[406]: https://code.google.com/p/fullcalendar/issues/detail?id=406
[477]: https://code.google.com/p/fullcalendar/issues/detail?id=477
[429]: https://code.google.com/p/fullcalendar/issues/detail?id=429
[412]: https://code.google.com/p/fullcalendar/issues/detail?id=412


v1.4.6 (2010-05-31)
-------------------

- "selecting" days or timeslots
	- options: selectable, selectHelper, unselectAuto, unselectCancel
	- callbacks: select, unselect
	- methods: select, unselect
- when dragging an event, the highlighting reflects the duration of the event
- code compressing by Google Closure Compiler
- bundled with jQuery 1.4.2 and jQuery UI 1.8.1


v1.4.5 (2010-02-21)
-------------------

- lazyFetching option, which can force the calendar to fetch events on every view/date change
- scroll state of agenda views are preserved when switching back to view
- bugfixes
	- calling methods on an uninitialized fullcalendar throws error
	- IE6/7 bug where an entire view becomes invisible ([320])
	- error when rendering a hidden calendar (in jquery ui tabs for example) in IE ([340])
	- interconnected bugs related to calendar resizing and scrollbars
		- when switching views or clicking prev/next, calendar would "blink" ([333])
		- liquid-width calendar's events shifted (depending on initial height of browser) ([341])
		- more robust underlying algorithm for calendar resizing

[320]: https://code.google.com/p/fullcalendar/issues/detail?id=320
[340]: https://code.google.com/p/fullcalendar/issues/detail?id=340
[333]: https://code.google.com/p/fullcalendar/issues/detail?id=333
[341]: https://code.google.com/p/fullcalendar/issues/detail?id=341


v1.4.4 (2010-02-03)
-------------------

- optimized event rendering in all views (events render in 1/10 the time)
- gotoDate() does not force the calendar to unnecessarily rerender
- render() method now correctly readjusts height


v1.4.3 (2009-12-22)
-------------------

- added destroy method
- Google Calendar event pages respect currentTimezone
- caching now handled by jQuery's ajax	
- protection from setting aspectRatio to zero
- bugfixes
	- parseISO8601 and DST caused certain events to display day before
	- button positioning problem in IE6
	- ajax event source removed after recently being added, events still displayed
	- event not displayed when end is an empty string
	- dynamically setting calendar height when no events have been fetched, throws error


v1.4.2 (2009-12-02)
-------------------

- eventAfterRender trigger
- getDate & getView methods
- height & contentHeight options (explicitly sets the pixel height)
- minTime & maxTime options (restricts shown hours in agenda view)
- getters [for all options] and setters [for height, contentHeight, and aspectRatio ONLY! stay tuned..]
- render method now readjusts calendar's size
- bugfixes
	- lightbox scripts that use iframes (like fancybox)
	- day-of-week classNames were off when firstDay=1
	- guaranteed space on right side of agenda events (even when stacked)
	- accepts ISO8601 dates with a space (instead of 'T')


v1.4.1 (2009-10-31)
-------------------

- can exclude weekends with new 'weekends' option
- gcal feed 'currentTimezone' option
- bugfixes
	- year/month/date option sometimes wouldn't set correctly (depending on current date)
	- daylight savings issue caused agenda views to start at 1am (for BST users)
- cleanup of gcal.js code


v1.4 (2009-10-19)
-----------------

- agendaWeek and agendaDay views
- added some options for agenda views:
	- allDaySlot
	- allDayText
	- firstHour
	- slotMinutes
	- defaultEventMinutes
	- axisFormat
- modified some existing options/triggers to work with agenda views:
	- dragOpacity and timeFormat can now accept a "View Hash" (a new concept)
	- dayClick now has an allDay parameter
	- eventDrop now has an an allDay parameter
	  (this will affect those who use revertFunc, adjust parameter list)
- added 'prevYear' and 'nextYear' for buttons in header
- minor change for theme users, ui-state-hover not applied to active/inactive buttons
- added event-color-changing example in docs
- better defaults for right-to-left themed button icons


v1.3.2 (2009-10-13)
-------------------

- Bugfixes (please upgrade from 1.3.1!)
	- squashed potential infinite loop when addMonths and addDays
	  is called with an invalid date
	- $.fullCalendar.parseDate() now correctly parses IETF format
	- when switching views, the 'today' button sticks inactive, fixed
- gotoDate now can accept a single Date argument
- documentation for changes in 1.3.1 and 1.3.2 now on website


v1.3.1 (2009-09-30)
-------------------

- Important Bugfixes (please upgrade from 1.3!)
	- When current date was late in the month, for long months, and prev/next buttons
	  were clicked in month-view, some months would be skipped/repeated
	- In certain time zones, daylight savings time would cause certain days
	  to be misnumbered in month-view
- Subtle change in way week interval is chosen when switching from month to basicWeek/basicDay view
- Added 'allDayDefault' option
- Added 'changeView' and 'render' methods


v1.3 (2009-09-21)
-----------------

- different 'views': month/basicWeek/basicDay
- more flexible 'header' system for buttons
- themable by jQuery UI themes
- resizable events (require jQuery UI resizable plugin)
- rescoped & rewritten CSS, enhanced default look
- cleaner css & rendering techniques for right-to-left
- reworked options & API to support multiple views / be consistent with jQuery UI
- refactoring of entire codebase
	- broken into different JS & CSS files, assembled w/ build scripts
	- new test suite for new features, uses firebug-lite
- refactored docs
- Options
	- + date
	- + defaultView
	- + aspectRatio
	- + disableResizing
	- + monthNames      (use instead of $.fullCalendar.monthNames)
	- + monthNamesShort (use instead of $.fullCalendar.monthAbbrevs)
	- + dayNames        (use instead of $.fullCalendar.dayNames)
	- + dayNamesShort   (use instead of $.fullCalendar.dayAbbrevs)
	- + theme
	- + buttonText
	- + buttonIcons
	- x draggable           -> editable/disableDragging
	- x fixedWeeks          -> weekMode
	- x abbrevDayHeadings   -> columnFormat
	- x buttons/title       -> header
	- x eventDragOpacity    -> dragOpacity
	- x eventRevertDuration -> dragRevertDuration
	- x weekStart           -> firstDay
	- x rightToLeft         -> isRTL
	- x showTime (use 'allDay' CalEvent property instead)
- Triggered Actions
	- + eventResizeStart
	- + eventResizeStop
	- + eventResize
	- x monthDisplay -> viewDisplay
	- x resize       -> windowResize
	- 'eventDrop' params changed, can revert if ajax cuts out
- CalEvent Properties
	- x showTime  -> allDay
	- x draggable -> editable
	- 'end' is now INCLUSIVE when allDay=true
	- 'url' now produces a real <a> tag, more native clicking/tab behavior
- Methods:
	- + renderEvent
	- x prevMonth         -> prev
	- x nextMonth         -> next
	- x prevYear/nextYear -> moveDate
	- x refresh           -> rerenderEvents/refetchEvents
	- x removeEvent       -> removeEvents
	- x getEventsByID     -> clientEvents
- Utilities:
	- 'formatDate' format string completely changed (inspired by jQuery UI datepicker + datejs)
	- 'formatDates' added to support date-ranges
- Google Calendar Options:
	- x draggable -> editable
- Bugfixes
	- gcal extension fetched 25 results max, now fetches all


v1.2.1 (2009-06-29)
-------------------

- bugfixes
	- allows and corrects invalid end dates for events
	- doesn't throw an error in IE while rendering when display:none
	- fixed 'loading' callback when used w/ multiple addEventSource calls
	- gcal className can now be an array


v1.2 (2009-05-31)
-----------------

- expanded API
	- 'className' CalEvent attribute
	- 'source' CalEvent attribute
	- dynamically get/add/remove/update events of current month
	- locale improvements: change month/day name text
	- better date formatting ($.fullCalendar.formatDate)
	- multiple 'event sources' allowed
		- dynamically add/remove event sources
- options for prevYear and nextYear buttons
- docs have been reworked (include addition of Google Calendar docs)
- changed behavior of parseDate for number strings
  (now interpets as unix timestamp, not MS times)
- bugfixes
	- rightToLeft month start bug
	- off-by-one errors with month formatting commands
	- events from previous months sticking when clicking prev/next quickly
- Google Calendar API changed to work w/ multiple event sources
	- can also provide 'className' and 'draggable' options
- date utilties moved from $ to $.fullCalendar
- more documentation in source code
- minified version of fullcalendar.js
- test suit (available from svn)
- top buttons now use `<button>` w/ an inner `<span>` for better css cusomization
	- thus CSS has changed. IF UPGRADING FROM PREVIOUS VERSIONS,
	  UPGRADE YOUR FULLCALENDAR.CSS FILE


v1.1 (2009-05-10)
-----------------

- Added the following options:
	- weekStart
	- rightToLeft
	- titleFormat
	- timeFormat
	- cacheParam
	- resize
- Fixed rendering bugs
	- Opera 9.25 (events placement & window resizing)
	- IE6 (window resizing)
- Optimized window resizing for ALL browsers
- Events on same day now sorted by start time (but first by timespan)
- Correct z-index when dragging
- Dragging contained in overflow DIV for IE6
- Modified fullcalendar.css
	- for right-to-left support
	- for variable start-of-week
	- for IE6 resizing bug
	- for THEAD and TBODY (in 1.0, just used TBODY, restructured in 1.1)
	- IF UPGRADING FROM FULLCALENDAR 1.0, YOU MUST UPGRADE FULLCALENDAR.CSS
