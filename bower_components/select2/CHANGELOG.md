# Change Log

## 4.0.4

### New features / Improvements
- Make tag matching case insensitive [https://github.com/select2/select2/commit/cb9a90457867ffb14c7b1550bb67e872e0a5c2dd, https://github.com/select2/select2/commit/1167bace78cd3b1a918c1b04f3bac54674eab62b]
- Support selecting options with blank or `0` option values [https://github.com/select2/select2/commit/16b4840c0e2df0461998e3b464ee0a546173950d, https://github.com/select2/select2/commit/0358ee528765157234643d289bce6b8ca5889c72]

### Bug fixes
- Fix issue with entire form losing focus when tabbing away from a Select2 control (#4419)
- Fix UMD support for CommonJS [https://github.com/select2/select2/commit/45a877345482956021161203ac789c25f40a7d5e]

### Documentation
- Github Pages documentation has been deprecated, replaced with https://github.com/select2/docs
- Add django-autocomplete-light to integrations [https://github.com/select2/select2/pull/4597]
- Correct typo in options page [https://github.com/select2/select2/pull/4389]
- Correct misspelling in AJAX query parameters example [https://github.com/select2/select2/pull/4435]
- "highlight" should be "focus" in focus example [https://github.com/select2/select2/pull/4441]
- Correct misspelling in `<select>` serialization example [https://github.com/select2/select2/pull/4538]
- Correct typos in documentation [https://github.com/select2/select2/pull/4663]

### Translations
- Add `errorLoading` Hungarian translation [https://github.com/select2/select2/commit/7d1d13352321e21670ff1c6cba7413aa264fd57a]
- Add `errorLoading` German translation [https://github.com/select2/select2/commit/4df965219ea4c39147fde9335bc260840465933a]
- Add Slovene language [https://github.com/select2/select2/commit/8e6422c570a87da8d89c45daf0d253695a943c84]
- Add `errorLoading` Galician translation [https://github.com/select2/select2/commit/8fcc6202c37f4e06d951342bf142a3b906b6b8e3]
- Add `errorLoading` Thai translation [https://github.com/select2/select2/commit/625fc78ee616baedf64aa37357403b4b72c7363c]
- Add `searching` and `errorLoading` Finnish translations [https://github.com/select2/select2/pull/4730]
- Add `errorLoading` Turkish translation [https://github.com/select2/select2/commit/fd4a0825315c7055347726d5818c999279f96ff8, https://github.com/select2/select2/commit/751b36767f9f28b9de9428d5e8035c9a404915d9]
- Add Armenian language [https://github.com/select2/select2/commit/f6fa52dcc02341df1523f50348f2effc54ee2911]

## 4.0.3

This is the third bugfix release of Select2 4.0.0. It builds upon the [second bugfix release](https://github.com/select2/select2/releases/tag/4.0.2) and fixes many common issues.

### New features / Improvements
- The old `dropdownAutoWidth` option now properly works [https://github.com/select2/select2/commit/fe26b083eb830836061de1458e483782cefef424]
- A `focus` event on the original `<select>` is now handled [https://github.com/select2/select2/commit/31e7a1d4c52ed7477769fcad5d15166ae3c9b4d0]
- Adding and removing options now refreshes the selection automatically [https://github.com/select2/select2/commit/ea79a197e0ffe55aa600eed6d18cbd1c804c3176]

### Bug fixes
- `select2('option')` no longer mutate the arguments when working on multiple elements [https://github.com/select2/select2/commit/c2c1aeef31c95c6df5545c900a4e1782d712497c]
- Better detect aborted requests [https://github.com/select2/select2/commit/cfb66f5e4f71a56c46a6890c5dde4b7f24f11fa8]
- New options are now properly created during tokenization [https://github.com/select2/select2/commit/3b8cd2e36990e695e4cb4b966c8658e7ca1574dc]
- Fix positioning bug with non-static parents for the dropdown [https://github.com/select2/select2/pull/4267]
- Infinite scrolling no longer resets the keyboard focus [https://github.com/select2/select2/commit/e897d008a672da262ba84cee2a144578696ada29, https://github.com/select2/select2/commit/9f581285d88128b29a01fc1e5fd2d445d610b553]
- `selectOnClose` now works properly with `closeOnSelect` [https://github.com/select2/select2/commit/481c43883e23874e9c35879d173eb8cc5b994b12]
- Apply `ajax.delay` to empty search terms as well [https://github.com/select2/select2/commit/4b9e02f02211248be25ac4c16d4635cf38237bb9]

### Documentation
- Added example for attaching event listeners [https://github.com/select2/select2/commit/84d6b5d840f7f4e6b7a2fb3f08424bf5495c876d]
- Correct link to the [Select2 Bootstrap Theme](https://github.com/select2/select2-bootstrap-theme) [https://github.com/select2/select2/pull/4318]
- Added example for using a `<label>` [https://github.com/select2/select2/commit/3bc7f4ac78b58eff8cd17b3273596638c3c9c5c1]
- Add documentation for `ajax.url` [https://github.com/select2/select2/commit/5a831afb9a7d46e8f20aec21164cfbfd182024de]
- Added favicon [https://github.com/select2/select2/pull/4379]

### Translations
- Add Khmer translation [https://github.com/select2/select2/pull/4246]
- Added Norwegian bokmaal for `errorLoading` [https://github.com/select2/select2/pull/4259]
- Fixed pluralization in Lithuanian translation [https://github.com/select2/select2/commit/5b5eddd183c87bf43165b3a98e03eabe10e9fa58]
- Add French translation for `errorLoading` [https://github.com/select2/select2/commit/b1ea28bb7d8c02b3b352f558031ccfc8041122eb]
- Add Greek translation [https://github.com/select2/select2/pull/4139]

## 4.0.2

This is the second bugfix release of Select2 4.0.0. It builds upon the [first release candidate of Select2 4.0.2](https://github.com/select2/select2/releases/tag/4.0.2-rc.1) with some minor improvements.

### New features / Improvements

- Added `insertTag` option to control the placement of the `tags` option [https://github.com/select2/select2/pull/4008]
- Added handler for AJAX errors [https://github.com/select2/select2/issues/3501]
- Added insertTag to control the tag position [https://github.com/select2/select2/pull/4008]

### Bug fixes

- Fixed positioning issues with static dropdown parents [https://github.com/select2/select2/issues/3970]
- Fixed existing selections not always being respected with array data [https://github.com/select2/select2/issues/3990]
- Sanitize automatically generated ids so CSS identifiers can be used [https://github.com/select2/select2/issues/3618]
- Recursively apply defaults so AJAX defaults can be set [https://github.com/select2/select2/commit/983cd8e765c5345bfe7d3bdcc3b0c882a35461ca]
- No need to recalculate the top of the dropdown twice [https://github.com/select2/select2/pull/4155]

### Documentation

- Updated Bootstrap and Font Awesome dependencies [https://github.com/select2/select2/commit/a5e539b509778eabeb8ce79e191b3ee1e81f6deb, https://github.com/select2/select2/commit/81a4a68b113e0d3e0fb1d0f8b1c33ae1b48ba04f, https://github.com/select2/select2/commit/6369f5f173fb81ec692213782945cc737e248da5]
- Use Jekyll's highlighting instead of prettify [https://github.com/select2/select2/commit/54441e6a22be3969dd934ccb769f5d7dde684bfb, https://github.com/select2/select2/commit/74387b98632c75b06d15d83ad5359b9daf0f5dcb, https://github.com/select2/select2/commit/a126b53b4c90fac33b5d855894647cd8bcac3558, https://github.com/select2/select2/commit/75163d67cb80e4279965a97e9eeda5b171806085]
- Corrected responsive width example to properly show it working [https://github.com/select2/select2/commit/63d531a9c0ab51f05327492a56f3245777762b45]
- Replaced protocol-relative URLs with HTTPS protocol [https://github.com/select2/select2/pull/4127]
- Code snippets for mapping `id` and `text` [https://github.com/select2/select2/issues/4086]
- Document how to trigger `change` just for Select2 [https://github.com/select2/select2/issues/3620]
- Added notes about DOM events [https://github.com/select2/select2/commit/37dbe059fce4578b46b7561e6243b7fdc63ac002]

### Translations
- Correct Romanian translation [https://github.com/select2/select2/commit/72d905f9e026d49e7c600f37a1ce742c404654d7]

## 4.0.1

This is the first bugfix release of Select2 4.0.0. It builds upon the [first release candidate of Select2 4.0.1](https://github.com/select2/select2/releases/tag/4.0.1-rc.1) with some minor improvements.

### New features / improvements
- The option container is now passed in as the second argument when templating selections using `templateResult` [https://github.com/select2/select2/commit/dc516e7073605723be59bc727b96a3b3dea1ae5a]
- The option container is now passed in as the second argument when templating selections using `templateSelection` [https://github.com/select2/select2/pull/3324]
- You can immediately start typing to search when tabbing into a multiple select [https://github.com/select2/select2/commit/02cca7baa7b78e73cdcf393172ee3a54be387167, https://github.com/select2/select2/commit/79cdcc0956e242c1ce642bbaa93e538c54f4be0]
- All parameters passed in for AJAX requests are now set as query string parameters by default [https://github.com/select2/select2/issues/3548]

### Bug fixes
- The search box will now be properly sized after removing a selection [https://github.com/select2/select2/commit/5f80c5d9f81f3c5398c3e6e3e84fd6c67c8873f1]
- Dropdown results will now be spoken by screen readers [https://github.com/select2/select2/commit/9fae3d74e373fc646da4e39a0c2ab11efa808c3f]
- Options are now properly cloned when initializing multiple instances at once [https://github.com/select2/select2/commit/3c8366e8769233a6b20ade934fe629279e7be6ff]
- `selectOnClose` and now be used with `closeOnSelect` without getting a stack overflow [https://github.com/select2/select2/commit/393ca4cf7f7f7097d3a994bda3dbf195e945eba1]
- Fixed positioning with non-static parents [https://github.com/select2/select2/commit/c9216b4b966653dd63a67e815b47899ef5325298]
- Fixed bug where multiple selects with placeholders were buggy in IE [https://github.com/select2/select2/issues/3300]
- Fixed bug where AJAX selects could not be initialized with array data [https://github.com/select2/select2/pull/3375]
- `:all:` is now correctly removed when used in `containerCss` and `dropdownCss` options [https://github.com/select2/select2/pull/3464]
- Fixed bug where the multiple select search box would appear on the left in RTL mode [https://github.com/select2/select2/pull/3502]
- Change ALT + UP to close the dropdown instead of opening it [https://github.com/select2/select2/commit/d2346cc33186c2a00fa2dad29e8e559c42bfea00]
- Fix focus issue with the multiple select search box when the `change` event was triggered [https://github.com/select2/select2/commit/698fe7b9e187e182f679aa679eb8b0ecb64a846b, https://github.com/select2/select2/commit/88503d2c67dc7f4fb9395a17f17edfe4948cf738, https://github.com/select2/select2/commit/dd2990adead92593a2dffff6ae004ea8b647d130]
- Fix bug in `ArrayAdapter` where the existing `<option>` data would be used instead of the array data [https://github.com/select2/select2/pull/3565]
- Remove random call to `$dropdownContainer.width()` in the `AttachBody` decorator [https://github.com/select2/select2/pull/3654]
- Fix memory leak in `AttachBody` decorator [https://github.com/select2/select2/commit/671f5a2ce21005090e0b69059799cd3dd1fbbf84]
- Selections can no longer be removed when Select2 is in a disabled state [https://github.com/select2/select2/commit/68d068f1d2c7722d011d285a291d1f974bf09772, https://github.com/select2/select2/commit/7d8f86cbf85ebd2179195ff6a2a7a1c5dcb9da58]
- Remove redundant `open` event trigger [https://github.com/select2/select2/pull/3507]
- Correct references to `this` in `ajax.data` and `ajax.url` callback functions [https://github.com/select2/select2/issues/3361]
- Apply select2('option') calls on all elements [https://github.com/select2/select2/pull/3495]

### Design

- Fixed original `<select>` not always being hidden correctly in some cases [https://github.com/select2/select2/pull/3301]
- Fix potential issue with Bootstrap's gradients in Internet Explorer [https://github.com/select2/select2/pull/3307]
- Improve compatibility with Zurb Foundation [https://github.com/select2/select2/pull/3290]
- Remove padding on mobile safari search field in multiple selects [https://github.com/select2/select2/pull/3605]
- Fix the clear button appearing beneath long text [https://github.com/select2/select2/issues/3306]
- Migrate the CSS classes for the "Loading more results" message to BEM [https://github.com/select2/select2/issues/3889]
- Fix inline search not displaying properly in Safari [https://github.com/select2/select2/issues/3459]

### Documentation

- New documentation theme designed by @fk [https://github.com/select2/select2/pull/3376, https://github.com/select2/select2/pull/3467, https://github.com/select2/select2/pull/3488]
- Update ajax example to reflect pagination [https://github.com/select2/select2/pull/3357]
- Fix incorrect option name in `maxiumSelectionLength` example [https://github.com/select2/select2/pull/3454]
- Fix typos in the disabled mode/results examples [https://github.com/select2/select2/pull/3665]
- Fix `Option` parameters in the 4.0 announcement [https://github.com/select2/select2/pull/3547]
- Fix invalid JSON in the tags example within the 4.0 announcement [https://github.com/select2/select2/pull/3637]

### Translations
- Added Cyrillic variant of the Serbian language [https://github.com/select2/select2/pull/3943]
- Corrected Thai "no results found" translation [https://github.com/select2/select2/pull/3782]
- Swapped the `inputTooLong` and `inputTooShort` messages in the Galician translation [https://github.com/select2/select2/pull/3291]
- Fix improper grammar in Dutch translation [https://github.com/select2/select2/pull/3692]
- Add Japanese translation [https://github.com/select2/select2/pull/3477]
- Polish translation: Fixed typo in maximum selected message [https://github.com/select2/select2/pull/3587]
- Add Malay translation [https://github.com/select2/select2/pull/3635]
- Add `errorLoading` for Indonesian translation [https://github.com/select2/select2/pull/3635]
- Correct grammar issues in Hebrew translation [https://github.com/select2/select2/pull/3911]
- Add `errorLoading` for Danish translation [https://github.com/select2/select2/pull/3870]
- Add Arabic translation [https://github.com/select2/select2/pull/3859]

## 4.0.0


This builds upon [the second release candidate](https://github.com/select2/select2/tree/4.0.0-rc.2), **so review all previous release notes** before upgrading from previous versions of Select2.

### Supported environments
- jQuery 1.7.2+
- Modern browsers (Chrome, Firefox, Safari)
- Internet Explorer 8+

### New features
- Fully compatible with AMD and UMD based loaders.
- Advanced plugin system that [uses custom adapters](https://select2.org/advanced/adapters-and-decorators).
- Full support for `jQuery.noConflict`.
- A `<select>` is the recommended element and [can be used for all options](https://select2.org/upgrading/migrating-from-35#no-more-hidden-input-tags).  There is limited backwards-compatible support for the `<input>` element in [full builds](https://select2.org/getting-started/builds-and-modules).
- [Declarative configuration through `data-*` attributes](https://select2.org/configuration/data-attributes)
- Easy to configure theme system and new default theme
- You can use more specific locales (like `en-US`) and Select2 will be able to determine what translation files to load.

### Breaking changes
- Select2 now uses the MIT license
- [The full build](https://select2.org/getting-started/builds-and-modules) of Select2 no longer includes jQuery - You must include jQuery separately on your page.
- Select2 will prevent the inner scrolling of modals (and other scrollable containers) when it is open to prevent the UI from breaking. [Read more at the commit.](https://github.com/select2/select2/commit/003d6053a9fff587c688008397e7d5824463fe99)
- jQuery is no longer listed as a dependency in the `bower.json`/`component.json` files.
- [`<select>` has replaced `<input type="hidden" />`](https://select2.org/upgrading/migrating-from-35#no-more-hidden-input-tags) for **all options** (_including remote data_)
- The [`matcher` has been revamped](https://select2.org/upgrading/migrating-from-35#advanced-matching-of-searches) to include full context, a compatibility module (`select2/compat/matcher`) has been created
- The [display always reflects the order](https://select2.org/upgrading/migrating-from-35#display-reflects-the-actual-order-of-the-values) data is sent to the server
- The click mask is no longer the default (again). You can get back the old functionality by wrapping your `selectionAdapter` with the `ClickMask` (`select2/selection/clickMask`) decorator.
- Select2 no longer stops the propagation of events happening within the dropdown and selection. You can use the `StopPropagation` modules available in the [full builds](https://select2.org/getting-started/builds-and-modules) to prevent this. [https://github.com/select2/select2/commit/8f8140e3b00c5d5bb232455137c4c633d7da4275]
- The enter key no longer toggles the state of multiple select items in the results, but instead will only select them. Use CTRL + Space instead to toggle the state. [https://github.com/select2/select2/commit/017c20109471fa5b835603faf5dc37f7c2c2ea45]
- Warnings will now be triggered in the developer console if Select2 detects an unsupported configuration.

#### Options

- The default value of the `width` option has been changed from `style` to `resolve`.
- The `copy` value for the `width` option has been renamed to `style`.

##### Renamed
- `formatSelection` -> `templateSelection`
- `formatResult` -> `templateResult`
- `sortResults` -> `sorter`
- `createSearchChoice` -> `createTag`
- `selectOnBlur` -> `selectOnClose`
- `ajax.jsonpCallback` -> `ajax.jsonp`
- `ajax.results` -> `ajax.processResults`
- `tags: [array,of,data]` -> `data: [array,of,data], tags: true`
- `placeholderOption` has been replaced by `placeholder.id` (`placeholder` -> `placeholder.text`)

##### [Internationalization](https://select2.org/i18n)
- `formatNoMatches` -> `language.noMatches`
- `formatSearching` -> `language.searching`
- `formatInputTooShort` -> `language.inputTooShort`
- `formatInputTooLong` -> `language.inputTooLong`
- `formatAjaxError` -> `language.errorLoading`
- `formatLoading` -> `language.loadingMore`
- `formatSelectionTooBig` -> `language.maximumSelected`

##### Deprecated/Removed
- `initSelection` - This is [no longer needed](https://select2.org/upgrading/migrating-from-35#removed-the-requirement-of-initselection) with `<select>` tags.  Limited backwards compatibility in the [full build](https://select2.org/getting-started/builds-and-modules).
- `id` - Data objects should now always have `id` and `text` attributes that are strings, use [`$.map`](https://api.jquery.com/jquery.map/) when migrating
- `query` - Use a [custom data adapter](https://select2.org/upgrading/migrating-from-35#custom-data-adapters-instead-of-query) instead.  Limited backwards compatibility in the [full build](https://select2.org/getting-started/builds-and-modules).
- `ajax.params` - All parameters passed to `ajax` will be passed to the AJAX data transport function

#### Methods

##### Renamed
- `.select2("val", [value])` -> `.val([value])`
- `.select2("enable", !disabled)` -> `.prop("disabled", disabled)`

##### Removed
- `.select2("onSortStart")` and `.select2("onSortEnd")` - A custom [selection adapter](https://select2.org/advanced/default-adapters/selection) should be created instead
- `.select2("data", data)` - Create the `<option>` tags for the objects that you would like to set, and set the `.val` to select them
- `.select2("readonly")` - There is [no way to make a `<select>` element read-only](http://stackoverflow.com/q/368813/359284), disable it instead

#### Events

##### New
- `select2:closing` is triggered before the dropdown is closed
- `select2:select` is triggered when an option is selected

##### Renamed
- `select2-close` is now `select2:close`
- `select2-open` is now `select2:open`
- `select2-opening` is now `select2:opening`
- `select2-selecting` is now `select2:selecting`
- `select2-removed` is now `select2:unselect`
- `select2-removing` is now `select2:unselecting`

##### Removed
- `select2-clearing` has been removed in favor of `select2:unselecting`
- `select2-highlight`
- `select2-loaded`
- `select2-focus` - Use the native `focus` event instead
- `select2-blur` - Use the native `blur` event instead
- All extra properties from the `change` event were removed
  - `val` can be retrieved with `$element.val()` instead
  - `added` can be retrieved by listening to `select2:select`
  - `removed` can be retrieved by listening to `select2:unselect`
