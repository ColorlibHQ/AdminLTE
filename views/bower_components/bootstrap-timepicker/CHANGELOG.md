# Changelog

All notable changes will be documented in this file.  This project
sort of conforms to Semantic Versioning. Since we're still pre-1.0,
it's like the Wild West up in here!

## Unreleased
### Added (not started)
- Still planning out how to include i18n data and functionality.

### Deprecated (not started)
- Incorrect usage of the word "meridian" will be deprecated. It should
  be "meridiem".
- `showWidgetOnAddonClick`'s current behavior is not intuitive. Clicking
  the input addon should _toggle_ the widget instead of showing it.

## 0.5.2 - 2016-01-02
### Added
- Tabbing out of the timepicker widget will now close it.
- You can specify your own icon classes. See docs for the option.

### Changed
- Cleaned up `package.json` and `bower.json` files. The npm/bower package
  should be cleaner now.
- `timepicker.less` now lives in the `css/` directory of the package.
- bootstrap-timepicker now uses the latest minor releases for jQuery 2 and
  Bootstrap 3

### Fixed
- Fixed bad interaction between `setTime("12:00 AM")` and `showMeridian`
- Various documentation issues were fixed.

## 0.5.1 - 2015-08-06
### Changed
- Critical fix (#279) for bootstrap initialization. If you happened to
  list your timepicker's classes in an order other than "input-group
  bootstrap-timepicker", you'd be out of luck. Now we use jQuery's
  `hasClass` method correctly. Yay!

## 0.5 - 2015-07-31
### Changed
- Bootstrap 3 support. No more Bootstrap 2 support.
- setTime sets time better
- more tests, and they exercise Bootstrap 3 support!
- snapToStep is a new option, off by default, which snaps times to the
  nearest step or overflows to 0 if it would otherwise snap to 60 or
  more.
- explicitMode is a new option, off by default, which lets you leave
  out colons when typing times.
- shift+tab now correctly moves the cursor to the previously
  highlighted unit, and blurs the timepicker when expected.
- We have cut out significant amounts of old cruft from the
  repository.
- Minified/Uglified code is no longer kept in the repo. Please
  download a release tarball or zip file to get the compiled and
  minified CSS and Javascript files.
