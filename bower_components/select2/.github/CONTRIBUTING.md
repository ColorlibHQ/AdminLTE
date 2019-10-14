# Guidelines for Getting Help with Select2

**Before** you open a new issue, you must **read these guidelines.**  If it is evident from your issue that you failed to research your question properly, **your issue may be closed** without being answered.

## Troubleshooting

There are some common problems that developers may encounter when using working with Select2 for the first time.  **If you are new to Select2**, please consult the [common problems](https://select2.org/troubleshooting/common-problems) section of the documentation first.

If you don't find what you're looking for there, then please check the the [forums](https://forums.select2.org), [Stack Overflow](https://stackoverflow.com/questions/tagged/jquery-select2) and [existing issues](https://github.com/select2/select2/issues?utf8=%E2%9C%93&q=is%3Aissue), both opened and closed.  Your question may have already been asked and answered before!

## Asking for Help

In general, the Github issue tracker should **only** be used for **bug reports** and **feature requests**.  If you're just having trouble getting something to work, you should ask in the [forums](https://forums.select2.org) or on [Stack Overflow](https://stackoverflow.com) instead. 

### Rules for all community platforms

1. Be polite, civil and respectful.  Select2 is built and maintained entirely by volunteers.
2. If you are not conversationally proficient in English, **do not just post a machine translation** (e.g. Google Translate). Post in your native language, so that others who speak your language can help. You may post a machine translation below it for the general community to decipher.
3. Any code snippets should be formatted using [Markdown code fences](https://learn.userfrosting.com/troubleshooting/getting-help#use-markdown-to-format-blocks-of-code) and properly indented. Poorly formatted code is difficult to read and reflects badly on you as a programmer.
4. Check what you write for spelling and grammar issues. If you want others to take the time to read your question carefully, you must write your question carefully.
5. When possible create and link to a [minimal, complete, and verifiable](https://stackoverflow.com/help/mcve) example by cloning our [JSBin template](http://jsbin.com/goqagokoye/edit?html,js,output). Code dumps, zip files, etc are NOT acceptable.
6. Include relevant screenshots or animations, if possible. Drag your screenshots directly into the forums or issue tracker text box. They will automatically be uploaded and the Markdown to display them will be generated.  Avoid third-party image hosts, or links which require extra clicks to view the image (except IRC, where this is unavoidable).

### Stack Overflow

Tag your question with the `jquery-select2` tag, and optionally with tags relevant to other technologies involved, such as `jquery` or another client-side framework.  You should also mention the version of Select2 that you are using.

### GitHub Issue Tracker

We really appreciate clear bug reports that _consistently_ show an issue _within Select2_.  If you are reporting a bug, you **must** follow these steps:

1. Make sure that your issue is a bug or feature request.  General usage and troubleshooting questions should be directed to the [forums](https://forums.select2.org) or [Stack Overflow](https://stackoverflow.com/questions/tagged/jquery-select2).  Issues asking for general support WILL BE CLOSED automatically.
2. Search the current issues, both open and closed, for a similar issue. If the bug is still present but the relevant issue has been closed, you may ask us to reopen the issue. Duplicate issues will be closed automatically.
3. Make sure that you are using the latest stable version of Select2 (see the [release history](https://github.com/select2/select2/releases)). Old minor/patch versions will not be supported.
4. State the steps needed to reproduce the problem.
5. Report any errors in detail.  Vague issues like "it doesn't work when I do this" are not helpful.  Show that you have put some effort into identifying the cause of the error.  Check your [browser console](https://learn.userfrosting.com/troubleshooting/debugging#client-side-debugging) for any Javascript error messages.
6. Mention your version of Select2, as well as the browser(s) and operating system(s) in which the problem occurs.

Requesting features in Select2
------------------------------
Select2 is a large library that carries with it a lot of functionality. Because
of this, many feature requests will not be implemented in the core library.

Before starting work on a major feature for Select2, **post to the [forums](https://forums.select2.org) first** or you may risk spending a considerable amount of
time on something which the project developers are not interested in bringing
into the project.

# Contributing to Select2

Select2 is made up of multiple submodules that all come together to make the
standard and extended builds that are available to users. The build system uses
Node.js to manage and compile the submodules, all of which is done using the
Grunt build system.

### Installing development dependencies

Select2 can be built and developed on any system which supports Node.js. You can download Node.js at
[their website][nodejs].

All other required Node.js packages can be installed using [npm][npm], which comes bundled alongside Node.js.

```bash
cd /path/to/select2/repo
npm install
```

You may need to install `libsass` on your system if it is not already available in order to build the SASS files which generate the CSS for themes and the main component.

### Building the Select2 component

Select2 uses the [Grunt][grunt] build task system and defines a few custom
tasks for common routines. One of them is the `compile` task, which compiles
the JavaScript and CSS and produces the final files.

```bash
cd /path/to/select2/repo
grunt compile
```

You can also generate the minified versions (`.min.js` files) by executing the
`minify` task after compiling.

```bash
cd /path/to/select2/repo
grunt minify
```

### Running tests

Select2 uses the QUnit test system to test individual components.

```bash
cd /path/to/selct2/repo
grunt test
```

### Setting up the documentation repo

The documentation for Select2 is maintained in a [separate repository](https://github.com/select2/docs). Select2.org is built with the flat-file CMS [Grav](http://getgrav.org), using their [RTFM skeleton](https://github.com/getgrav/grav-skeleton-rtfm-site#rtfm-skeleton).

The documentation files themselves are written in Markdown, and can be found in the `pages/` subdirectory. You can submit pull requests to the `develop` branch of the repo.

If you'd like to set up a local instance of the entire documentation website, you must first have a web server (Nginx, Apache, etc) and PHP installed locally. Then, follow these steps:

#### Step 1 - Install Grav

This application uses the [Grav](https://learn.getgrav.org/) CMS.  This repository does not contain a full Grav installation - rather, it just contains the contents of Grav's `user` directory, which is where all of our content, themes, and assets live.  This was done as per the [recommendation on Grav's blog](https://getgrav.org/blog/developing-with-github-part-2), to make it easier to deploy changes to the live server.

To install this website on your computer, first [install grav core](https://getgrav.org/downloads) in a project folder called `select2-docs` under your webserver's document root folder. Then, find the `user` folder inside of your project folder.  Delete the contents of the `user` folder and clone this repository directly into the user folder.

When you're done it might look something like this:

```
htdocs/
└── select2-docs/
   ├── assets/
   ├── ...
   ├── user/
       ├── .git
       ├── accounts/
       ├── assets/
       ├── config/
       └── ...
   └── ...

```

#### Step 2

Grav needs your webserver to be able to write to certain directories.  Make sure that `backup/`, `cache/`, `images/`, `logs/`, and `tmp/` are all writeable by the user account under which your webserver runs.

#### Step 3

Visit the local installation in your browser!  For example, [http://localhost/select2-docs](http://localhost/select2-docs).

### Submitting a pull request

We use GitHub's pull request system for submitting patches. Here are some
guidelines to follow when creating the pull request for your fix.

1. Make sure to create a ticket for your pull request. This will serve as the
bug ticket, and any discussion about the bug will take place there. Your pull
request will be focused on the specific changes that fix the bug.
2. Make sure to reference the ticket you are fixing within your pull request.
This will allow us to close off the ticket once we merge the pull request, or
follow up on the ticket if there are any related blocking issues.
3. Explain why the specific change was made. Not everyone who is reviewing your
pull request will be familiar with the problem it is fixing.
4. Run your tests first. If your tests aren't passing, the pull request won't
be able to be merged. If you're breaking existing tests, make sure that you
aren't causing any breaking changes.
5. Only include source changes (`src/`). Do not make changes directly to files in the `dist`
directory.

By following these steps, you will make it easier for your pull request to be
reviewed and eventually merged.

Triaging issues and pull requests
---------------------------------
Anyone can help the project maintainers triage issues and review pull requests.

### Handling new issues

Select2 regularly receives new issues which need to be tested and organized.

When a new issue that comes in that is similar to another existing issue, it
should be checked to make sure it is not a duplicate.  Duplicates issues should
be marked by replying to the issue with "Duplicate of #[issue number]" where
`[issue number]` is the url or issue number for the existing issue.  This will
allow the project maintainers to quickly close off additional issues and keep
the discussion focused within a single issue.

If you can test issues that are reported to Select2 that contain test cases and
confirm under what conditions bugs happen, that will allow others to identify
what causes a bug quicker.

### Reviewing pull requests

It is very common for pull requests to be opened for issues that contain a clear
solution to the problem.  These pull requests should be rigorously reviewed by
the community before being accepted.  If you are not sure about a piece of
submitted code, or know of a better way to do something, do not hesitate to make
a comment on the pull request.

### Reviving old tickets

If you come across tickets which have not been updated for a while, you are encouraged to revive them. If you do, please include more information in your comment on the issue. Common bugs and feature requests are more likely to be fixed, whether it is by the community or the
developers, so keeping tickets up to date is encouraged.

Licensing
---------

It should also be made clear that **all code contributed to Select** must be
licensable under the [MIT license][licensing].  Code that cannot be released
under this license **cannot be accepted** into the project.

[grunt]: http://gruntjs.com/
[isolated-case]: http://css-tricks.com/6263-reduced-test-cases/
[issue-search]: https://github.com/select2/select2/search?q=&type=Issues
[issue-tracker]: https://github.com/select2/select2/issues
[licensing]: https://github.com/select2/select2/blob/master/LICENSE.md
[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/
