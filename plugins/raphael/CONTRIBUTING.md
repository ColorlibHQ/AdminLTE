## Want to contribute?

All changes in code must go to `raphael.core`, `raphael.svg` or `raphael.vml`.
The rest are generated files, generated after running `npm run build`.

To run tests you need to open `dev/test/index.html` in your browser, there's no automated way right now.

After changing the core/vml/svg files, execute `npm run build` to generate all versions, make a commit and you are ready to make a pull request!
Remember that if you want to add a functionality it must be present in the vml and svg versions, **no svg-only features will be accepted.**

## Found an issue?

First search for similar issues to make sure you don't repeat an existing one.

Then please create a fiddle ([jsfiddle](http://jsfiddle.net/SSJJT/)) recreating the bug so we can find out what the problem is more easily (or be a hero and find it yourself and send a pull request!). You can also use the [raphael playground](http://raphaeljs.com/playground.html) to reproduce your issues.

Remember to add all the info that can be useful such as

* error details
* steps to reproduce
* browser and its version
* any suggestion of what do you think the problem could be