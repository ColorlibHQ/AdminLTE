# Raphaël: Cross-browser vector graphics the easy way

Visit the library website for more information: ~~[http://raphaeljs.com](http://raphaeljs.com/)~~ [https://dmitrybaranovskiy.github.io/raphael/](https://dmitrybaranovskiy.github.io/raphael/)

## Quickstart guide

You need to have NPM installed to build the library.

* `git clone https://github.com/DmitryBaranovskiy/raphael.git`
* `yarn install --frozen-lockfile`
* `yarn build-all`

To run tests you need to run `npx bower install` open `dev/test/index.html` in your browser, there's no automated way right now.

## Dependencies

* [eve](https://github.com/adobe-webplatform/eve)

## Distributable

All files are UMD compliant.

You can use:

* `raphael.min.js` (includes `eve` and it's minified)
* `raphael.js` (includes `eve` and it's not minified)
* `raphael.no-deps.js` (doesn't include `eve` it's not minified)
* `raphael.no-deps.min.js`  (doesn't include `eve` it's minified)

## Where to start

Check [Raphael-boilerplate](https://github.com/tomasAlabes/raphael-boilerplate) to see examples of loading.

Raphael can be loaded in a script tag or with AMD:

```js
define([ "path/to/raphael" ], function( Raphael ) {
  console.log( Raphael );
});
```

## Development

Versions will be released as we gather and test new PRs. 
As there are a lot of browsers being supported it might take a while to accept a PR, we will use the feedback from other users too.

You can use the `raphaelTest.html` to try things, you need to start a server in the root dir to start testing things there.
Something like running `python -m SimpleHTTPServer` in the `raphael` directory and hitting `http://localhost:8000/dev/raphaelTest.html` with the browser. You should run `npm run start` before this can work.

## Collaborators

* [tomasAlabes](https://github.com/tomasAlabes)

## Related Projects

* [graphael](https://github.com/DmitryBaranovskiy/g.raphael/tree/master)
* [raphael.boilerplate](https://github.com/tomasAlabes/raphael-boilerplate)
* [backbone.raphael](https://github.com/tomasAlabes/backbone.raphael)
* [mapael](https://github.com/neveldo/jQuery-Mapael)
* [snap](https://github.com/adobe-webplatform/Snap.svg)
* [react-raphael](https://github.com/liuhong1happy/react-raphael)

## Books

* [Learning Raphael JS Vector Graphics](http://shop.oreilly.com/product/9781782169161.do)
* [RaphaelJS](http://shop.oreilly.com/product/0636920029601.do)
* [Instant RaphaelJS Starter](http://shop.oreilly.com/product/9781782169857.do)

## Copyright and license

Copyright © 2008-2013 Dmitry Baranovskiy (`http://dmitrybaranovskiy.github.io/raphael/`)

Copyright © 2008-2013 Sencha Labs (`http://sencha.com`)

Licensed under the **MIT** (`http://dmitrybaranovskiy.github.io/raphael/license.html`) license.
