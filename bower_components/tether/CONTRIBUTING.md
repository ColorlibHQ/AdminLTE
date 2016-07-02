# Contributing Guide

You will need:

- Node.js/io.js & npm
- Bower
- Gulp


## Getting started

1. Fork the project
2. Clone your forked project by running `git clone git@github.com:{
   YOUR_USERNAME }/tether.git`
3. Run `npm install` to install both node modules and bower components
4. Test that you can build the source by moving/renaming the existing `dist`
   directory and running `npm run build`
5. Assuming everything went well, you should now have a `dist` directory that
   matches the one you moved in step 4


## Writing code!

We use `gulp` to facilitate things like transpilation, minification, etc. so
can you focus on writing relevant code. If there is a fix or feature you would like
to contribute, we ask that you take the following steps:

1. Most of the _editable_ code lives in the `src` directory while built code
   will end up in the `dist` directory upon running `npm run build`.

2. Depending on how big your changes are, bump the version numbers appropriately
   in `bower.json` and `package.json`. We try to follow semver, so a good rule
   of thumb for how to bump the version is:
   - A fix to existing code, perform a patch bump e.g. x.x.0 -> x.x.1
   - New feature, perform a minor bump e.g. x.0.x -> x.1.x
   - Breaking changes such a rewrite, perform a major bump e.g.
     1.x.x -> 2.x.x

   Versioning is hard, so just use good judgement and we'll be more than happy
   to help out.

   __NOTE__: There is a `gulp` task that will automate some of the versioning.
   You can run `gulp version:{type}` where type is `patch|minor|major` to
   update both `bower.json` and `package.json` as well as add the appropriate
   git tag.

3. Provide a thoughtful commit message and push your changes to your fork using
   `git push origin master` (assuming your forked project is using `origin` for
   the remote name and you are on the `master` branch).

4. Open a Pull Request on GitHub with a description of your changes.


## Testing

Work in progress. We are hoping to add some tests, so if you would like to help
us get started, feel free to contact us through the Issues or open a Pull
Request.

