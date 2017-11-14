# Contributing to Popper.js

## Report bugs

If you find a bug, please, try to isolate the specific case and provide a fiddle on CodePen or JSFiddle to make it easy to reproduce the problem and help others finding a solution.
You can use [this CodePen](http://codepen.io/FezVrasta/pen/wGqJEz) which already includes Popper.js.

If your issue is not about a bug, please make sure to consider posting on StackOverflow instead.

Feature requests are welcome!

## Setup

Run `yarn` to install the needed dependencies.

Note that `npm` is not supported because this projects makes use of the Yarn workspaces.

## Developing

The repository is a monorepo managed by [Lerna](https://github.com/lerna/lerna), this makes it
possible to manage multiple projects on the same repository.

In our case, the main projects are `popper` and `tooltip`, which are the home of Popper.js and Tooltip.js  
All our packages are stored in the `packages/` folder.


### Adopt an issue

All the issues, if not assigned to someone, can be adopted by anyone. Just make sure to comment on
the issue to let know other users about your intention to work on it.  
Also, remember to comment again in case you end up abandoning the issue.

Each issue has a `DIFFICULTY: *` label to help you pick the one with the difficulty level adapt to you.  
Additionally, check out the `PRIORITY: *` label to see which issues should take precedence over the others.
If possible, prefer issues with an higher priority, but if you want to adopt an issue with lower priority,
it's not a problem!

Issues with `NEEDS: CI test` need a PR that integrates a test in the test suite to reproduce the bug,
this is very useful because it allows other developers to try to fix the bug having a feedback.


### Style conventions

You don't have to worry about code style conventions, [prettier](https://github.com/prettier/prettier)
will automatically format your code once you commit your changes.

### Test

We strive to keep the code coverage as high as possible, but above all, we want to avoid
to introduce or reintroduce bugs in our code base.

For this reason, every time a code change is made, we must make sure that a test is covering
the code we just changed.  
If we fix a bug, we add a test to avoid that this bug pops up again in the future.

To help us with this process, we have a karma + jasmine environment to test Popper.js and Tooltip.js

The tests are located in the `tests/` folder of the two projects. (e.g. `packages/popper/tests/`)


```bash
# You can run all the repositories tests running
yarn test

# or a single project's tests with 
yarn test --scope=popper.js # or tooltip.js
```

If you want to run the tests in watch mode:

```bash
# You can run all the repositories tests running
yarn test:dev

# or a single project's tests with 
yarn test:dev --scope=popper.js # or tooltip.js
```

Do you want to test your changes against all the supported browsers? Feel free to send a PR
and your changes will get automatically tested.


### Build

To create a new release run:

```bash
# to build both projects
yarn build 

# or to build a single project
yarn build --scope=popper.js # or tooltip.js
```

You can also build and watch for changes to automatically refresh the build using the `--watch` option.
