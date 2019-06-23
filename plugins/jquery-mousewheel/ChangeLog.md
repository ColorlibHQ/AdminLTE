# Mouse Wheel ChangeLog

## 3.1.13

* Update copyright notice and license to remove years
* Create the correct compressed version
* Remove the obsolete jQuery Plugin Registry file

## 3.1.12

* Fix possible 0 value for line height when in delta mode 1

## 3.1.11

* Fix version number for package managers...

## 3.1.10

* Fix issue with calculating line height when using older versions of jQuery
* Add offsetX/Y normalization with setting to turn it off
* Cleans up data on teardown

## 3.1.9

* Fix bower.json file
* Updated how the deltas are adjusted for older mousewheel based events that have deltas that are factors of 120.
* Add $.event.special.mousewheel.settings.adjustOldDeltas (defaults to true) to turn off adjusting of old deltas that are factors of 120. You'd turn this off if you want to be as close to native scrolling as possible.

## 3.1.8

* Even better handling of older browsers that use a wheelDelta based on 120
* And fix version reported by `$.event.special.mousewheel`

## 3.1.7

* Better handle the `deltaMode` values 1 (lines) and 2 (pages)
* Attempt to better handle older browsers that use a wheelDelta based on 120

## 3.1.6

* Deprecating `delta`, `deltaX`, and `deltaY` event handler arguments
* Update actual event object with normalized `deltaX `and `deltaY` values (`event.deltaX`, `event.deltaY`)
* Add `deltaFactor` to the event object (`event.deltaFactor`)
* Handle `> 0` but `< 1` deltas better
* Do not fire the event if `deltaX` and `deltaY` are `0`
* Better handle different devices that give different `lowestDelta` values
* Add `$.event.special.mousewheel.version`
* Some clean up

## 3.1.5

* Bad release because I did not update the new `$.event.special.mousewheel.version`

## 3.1.4

* Always set the `deltaY`
* Add back in the `deltaX` and `deltaY` support for older Firefox versions

## 3.1.3

* Include `MozMousePixelScroll` in the to fix list to avoid inconsistent behavior in older Firefox

## 3.1.2

* Include grunt utilities for development purposes (jshint and uglify)
* Include support for browserify
* Some basic cleaning up

## 3.1.1

* Fix rounding issue with deltas less than zero


## 3.1.0

* Fix Firefox 17+ issues by using new wheel event
* Normalize delta values
* Adds horizontal support for IE 9+ by using new wheel event
* Support AMD loaders


## 3.0.6

* Fix issue with delta being 0 in Firefox


## 3.0.5

* jQuery 1.7 compatibility


## 3.0.4

* Fix IE issue


## 3.0.3

* Added `deltaX` and `deltaY` for horizontal scrolling support (Thanks to Seamus Leahy)


## 3.0.2

* Fixed delta being opposite value in latest Opera
* No longer fix `pageX`, `pageY` for older Mozilla browsers
* Removed browser detection
* Cleaned up the code


## 3.0.1

* Bad release... creating a new release due to plugins.jquery.com issue :(


## 3.0

* Uses new special events API in jQuery 1.2.2+
* You can now treat `mousewheel` as a normal event and use `.bind`, `.unbind` and `.trigger`
* Using jQuery.data API for expandos


## 2.2

* Fixed `pageX`, `pageY`, `clientX` and `clientY` event properties for Mozilla based browsers


## 2.1.1

* Updated to work with jQuery 1.1.3
* Used one instead of bind to do unload event for clean up


## 2.1

* Fixed an issue with the unload handler


## 2.0

* Major reduction in code size and complexity (internals have change a whole lot)


## 1.0

* Fixed Opera issue
* Fixed an issue with children elements that also have a mousewheel handler
* Added ability to handle multiple handlers
