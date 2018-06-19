CKEditor 4 - Releases
=====================

## Releases Code

This repository contains the official release versions of [CKEditor](http://ckeditor.com).

There are four versions for each release &mdash; `standard-all`, `basic`, `standard`, and `full`.
They differ in the number of plugins that are compiled into the main `ckeditor.js` file as well as the toolbar configuration.

See the [comparison](http://ckeditor.com/presets) of the `basic`, `standard`, and `full` installation presets for more details.

The `standard-all` build includes all official CKSource plugins with only those from the `standard` installation preset compiled into the `ckeditor.js` file and enabled in the configuration. 

All versions available in this repository were built using [CKBuilder](http://ckeditor.com/builder), so they are optimized and ready to be used in a production environment.

## Documentation

Developer documentation for CKEditor is available online at: <http://docs.ckeditor.com>.

## Installation

### Git clone

To install one of the available releases, just clone this repository and switch to the respective branch (see next section):

	git clone -b <release branch> git://github.com/ckeditor/ckeditor-releases.git
	
### Git submodule

If you are using git for your project and you want to integrate CKEditor, we recommend to add this repository as a
[submodule](http://git-scm.com/book/en/Git-Tools-Submodules).

	git submodule add -b <release branch> git://github.com/ckeditor/ckeditor-releases.git <clone dir>
	git commit -m "Added CKEditor submodule in <clone dir> directory."

### Using Package Managers

See the [Installing CKEditor with Package Managers](http://docs.ckeditor.com/#!/guide/dev_package_managers) article for more details about installing CKEditor with [Bower](http://bower.io/), [Composer](https://getcomposer.org/) and [npm](https://www.npmjs.com/).

## Repository Structure

### Branches

This repository contains the following branches:

  - `master` and `latest` &ndash; the latest release of the `standard-all` preset (including betas).
  - `stable` &ndash; the latest stable release of the `standard-all` preset (non-beta).
  - `A.B.x` (e.g. `4.3.x`) &ndash; the latest release of the `standard-all` preset in the `A.B` branch.
  - `(basic|standard|full)/stable` &ndash; the latest stable release tag point (non-beta).
  - `(basic|standard|full)/latest` &ndash; the latest release tag point (including betas).
  - `(basic|standard|full)/A.B.x` (e.g. `basic/4.0.x`) &ndash; the latest releases in the `A.B` branch.

### Tags

**Since version 4.3.3** this repository uses the following tag naming rules:

  - `x.y.z` &ndash; contains the `standard-all` editor build, e.g. `4.3.3`, `4.4.0` etc.
  - `(basic|standard|full)/x.y.z` &ndash; contains the editor build with a given preset, e.g. `basic/4.3.3`.

The version numbers follow the [Semantic Versioning 2.0.0](http://semver.org/) scheme.

Up to version **4.3.2** the tags were released in the following form `x.y[.z]/(basic|standard|full)`.
For example: `4.0/basic`, `4.0.1/standard`. This convention was changed in CKEditor 4.3.3 to conform to the Semantic Versioning scheme.

## Checking Your Installation

The editor comes with a sample page that can be used to verify if the installation succeeded. Take a look at the `samples` directory.

To test your installation, just call the following page for your website:

	http://<your site>/<CKEditor installation path>/samples/index.html

For example:

	http://www.example.com/ckeditor/samples/index.html

### License

Licensed under the GPL, LGPL, and MPL licenses, at your choice.

Please check the `LICENSE.md` file for more information about the license.