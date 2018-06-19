# Contributing

## Support

The issue tracker is not the place for support requests. If you get stuck with bootstrap-colorpicker, it's very likely
that the fine folks at [StackOverflow](http://stackoverflow.com/) will be able to help you; simply describe the problem
you're having and provide them a link to the repo (so they know what code you're using).


## Issues
For feature requests, suggestions or ideas, add `[SUGGESTION]` before the title of the issue, for anything else follow
the following guidelines.

### Steps to submit an issue
- Try to reproduce your problem in a separated environment, like in JSFiddle,
  [here is a template for it](http://jsfiddle.net/itsjavi/0vopxm13/), that you can fork in the same page.
  It already includes the required JS and CSS files.
- Before posting your issue, consider adding this information:
  * Expected behaviour: what should happen?
  * Actual behaviour: what happens instead?
  * Your context: Where it happens? In which browser and version (if applicable)?
  * Plugin version (and/or commit reference).
  * jQuery version you use and list of all other plugins/scripts you are using with this one and may cause some conflict.
  * A link to your JSFiddle (or similar tool) demo where you reproduced the problem (if applicable).

## Pull Requests

Patches and new features are welcome!

- Prerequisites: having `node`, `npm`, `bower` and `grunt` installed in your machine.
- After a fresh clone for your fork, you need to run `npm install && bower install` inside the project's root folder.
- For checking your changes in the browser you can execute `node serve` and navigate to http://localhost:5000/
- Before any commit run always `grunt` inside the project's root folder, to update the dist files
  (never modify them manually).
- Do not change the plugin coding style.
- Check that the index.html demos aren't broken (modify if necessary).
- Test your code at least in Chrome, Firefox and IE >= 10 / Edge.
- Any new feature should come with updated docs if applicable (a demonstration).
- Generate the `/dist` files executing `grunt` before your Pull Request.
- Push to your fork and submit the pull request.
