Unit tests, written with [QUnit](https://qunitjs.com), are used to
expose bugs for squashing, prevent bugs from respawning, and suppress new
bugs when adding new features and making changes.

# Running the tests

The simplest way to run the tests is to open `tests/tests.html` in your browser.
The test suites will automatically run themselves and present their results.

To run the tests from the command line (after running jshint and jscs, which is
recommended), install Grunt and run the `test` task from anywhere within the
repo:

    $ grunt test

# Adding tests

Tests go in js files in the `tests/suites/` directory tree. QUnit organizes
tests into suites called "modules"; there is one module per js file.  If the
tests you are adding do not fit into an existing module, create a new one at
`tests/suites/<new module>.js`, where `<new module>` is a broad yet
descriptive name for the suite.  If tests have many year-specific cases (ie,
behave differently in leap years vs normal years, or have specific buggy
behavior in a certain year), create the module in a new directory,
`tests/suites/<new module>/<year>.js`, where `<new module>` is the decriptive
name and `<year>` is the four-digit year the tests pertain to.

In order for new tests to be run, they must be imported into `tests/tests.html`.
Find the script includes headed by the html comment `<!-- Test suites -->`, and
add a new one to the list which includes the new js files.
