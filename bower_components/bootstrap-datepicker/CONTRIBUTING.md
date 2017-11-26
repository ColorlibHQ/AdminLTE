# Contributing

## Support requests

The issue tracker is not the place for support requests.  If you get stuck with bootstrap-datepicker, it's very likely that the fine folks at [StackOverflow](http://stackoverflow.com/) will be able to help you; simply describe the problem you're having and provide them a link to the repo (so they know what code you're using).  Another option is to post to the [bootstrap-datepicker google group](https://groups.google.com/group/bootstrap-datepicker).

## Issues

If you've found a bug in bootstrap-datepicker, we want to know about it!  However, please keep the following in mind:

* This is not the bootstrap-datepicker from [eyecon.ro](http://www.eyecon.ro/bootstrap-datepicker/).  Stefan provided the initial code for bootstrap-datepicker, but this repo is divergent from his codebase.  Please make sure you're using either the latest tagged version or the latest master from https://github.com/uxsolutions/bootstrap-datepicker/.
* A working example of the bug you've found is *much* easier to work with than a  description alone.  If possible, please provide a link to a demonstration of the bug, perhaps using http://jsfiddle.net/ .
  * CDN-backed assets can be found at http://bsdp-assets.blackcherry.us/ .  These should be used *only* for building test cases, as they may be removed or changed at any time.
* Finally, it's possible someone else has already reported the same bug you have.  Please search the issue tracker for similar issues before posting your own.  Thanks!

## Pull Requests

Patches welcome!

For all cases, you should have your own fork of the repo.

To submit a pull request for a **new feature**:

1. Run the tests.  Every pull request for a new feature should have an accompanying unit test and docs changes.  See the `README.md` in the `tests/` and `docs/` directories for details.
2. Create a new branch off of the `master` branch for your feature.  This is particularly helpful when you want to submit multiple pull requests.
3. Add a test (or multiple tests) for your feature.  Again, see `tests/README.md`.
4. Add your new feature, making the test pass.
5. Push to your fork and submit the pull request!

To submit a **bug fix**:

1. Create a new branch off of the `master` branch.
2. Add a test that demonstrates the bug.
3. Make the test pass.
4. Push to your fork and submit the pull request!

To submit a **documentation fix**:

1. Create a new branch off of the `master` branch.
2. Add your documentation fixes (no tests required).
3. Push to your fork and submit the pull request!
