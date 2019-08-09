Select2
=======
[![Build Status][travis-ci-image]][travis-ci-status]
[![cdnjs](https://img.shields.io/cdnjs/v/select2.svg)][cdnjs]
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/select2/badge)][jsdelivr]

Select2 is a jQuery-based replacement for select boxes. It supports searching,
remote data sets, and pagination of results.

To get started, checkout examples and documentation at
https://select2.org/

Use cases
---------
* Enhancing native selects with search.
* Enhancing native selects with a better multi-select interface.
* Loading data from JavaScript: easily load items via AJAX and have them
  searchable.
* Nesting optgroups: native selects only support one level of nesting. Select2
  does not have this restriction.
* Tagging: ability to add new items on the fly.
* Working with large, remote datasets: ability to partially load a dataset based
  on the search term.
* Paging of large datasets: easy support for loading more pages when the results
  are scrolled to the end.
* Templating: support for custom rendering of results and selections.

Browser compatibility
---------------------
* IE 8+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

Usage
-----
You can source Select2 directly from a CDN like [JSDliver][jsdelivr] or
[CDNJS][cdnjs], [download it from this GitHub repo][releases], or use one of
the integrations below.

Integrations
------------
Third party developers have created plugins for platforms which allow Select2 to be integrated more natively and quickly. For many platforms, additional plugins are not required because Select2 acts as a standard `<select>` box.

Plugins

* [Django]
  - [django-autocomplete-light]
  - [django-easy-select2]
  - [django-select2]
* [Drupal] - [drupal-select2]
* [Meteor] - [meteor-select2]
* [Ruby on Rails][ruby-on-rails] - [select2-rails]
* [Wicket] - [wicketstuff-select2]
* [Yii 2][yii2] - [yii2-widget-select2]
* [Angularjs][angularjs] - [mdr-angular-select2]

Themes

- [Bootstrap 3][bootstrap3] - [select2-bootstrap-theme]
- [Bootstrap 4][bootstrap4] - [select2-bootstrap4-theme]
- [Flat UI][flat-ui] - [select2-flat-theme]
- [Metro UI][metro-ui] - [select2-metro]

Missing an integration? Modify this `README` and make a pull request back here to Select2 on GitHub.

Internationalization (i18n)
---------------------------
Select2 supports multiple languages by simply including the right language JS
file (`dist/js/i18n/it.js`, `dist/js/i18n/nl.js`, etc.) after
`dist/js/select2.js`.

Missing a language? Just copy `src/js/select2/i18n/en.js`, translate it, and
make a pull request back to Select2 here on GitHub.

Documentation
-------------
The documentation for Select2 is available
[through GitHub Pages][documentation] and is located within the [separate `select2/docs` repository][documentation-repository].

Community
---------
You can find out about the different ways to get in touch with the Select2
community at the [Select2 community page][community].

Copyright and license
---------------------
The license is available within the repository in the [LICENSE][license] file.

[cdnjs]: http://www.cdnjs.com/libraries/select2
[community]: https://select2.org/getting-help
[documentation]: https://select2.org
[documentation-repository]: https://github.com/select2/docs
[freenode]: https://freenode.net/
[jsdelivr]: https://www.jsdelivr.com/package/npm/select2
[license]: LICENSE.md
[releases]: https://github.com/select2/select2/releases
[travis-ci-image]: https://img.shields.io/travis/select2/select2/master.svg
[travis-ci-status]: https://travis-ci.org/select2/select2

[angularjs]: https://angularjs.org/
[bootstrap3]: https://getbootstrap.com/
[bootstrap4]: https://getbootstrap.com/
[django]: https://www.djangoproject.com/
[django-autocomplete-light]: https://github.com/yourlabs/django-autocomplete-light
[django-easy-select2]: https://github.com/asyncee/django-easy-select2
[django-select2]: https://github.com/applegrew/django-select2
[drupal]: https://www.drupal.org/
[drupal-select2]: https://www.drupal.org/project/select2
[flat-ui]: http://designmodo.github.io/Flat-UI/
[mdr-angular-select2]: https://github.com/modulr/mdr-angular-select2
[meteor]: https://www.meteor.com/
[meteor-select2]: https://github.com/nate-strauser/meteor-select2
[metro-ui]: http://metroui.org.ua/
[select2-metro]: http://metroui.org.ua/select2.html
[ruby-on-rails]: http://rubyonrails.org/
[select2-bootstrap-theme]: https://github.com/select2/select2-bootstrap-theme
[select2-bootstrap4-theme]: https://github.com/ttskch/select2-bootstrap4-theme
[select2-flat-theme]: https://github.com/techhysahil/select2-Flat_Theme
[select2-rails]: https://github.com/argerim/select2-rails
[vue.js]: http://vuejs.org/
[select2-vue]: http://vuejs.org/examples/select2.html
[wicket]: https://wicket.apache.org/
[wicketstuff-select2]: https://github.com/wicketstuff/core/tree/master/select2-parent
[yii2]: http://www.yiiframework.com/
[yii2-widget-select2]: https://github.com/kartik-v/yii2-widget-select2
