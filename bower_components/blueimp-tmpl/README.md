# JavaScript Templates

## Demo
[JavaScript Templates Demo](https://blueimp.github.io/JavaScript-Templates/)

## Description
1KB lightweight, fast & powerful JavaScript templating engine with zero
dependencies. Compatible with server-side environments like Node.js, module
loaders like RequireJS, Browserify or webpack and all web browsers.

## Usage

### Client-side
Include the (minified) JavaScript Templates script in your HTML markup:

```html
<script src="js/tmpl.min.js"></script>
```

Add a script section with type **"text/x-tmpl"**, a unique **id** property and
your template definition as content:

```html
<script type="text/x-tmpl" id="tmpl-demo">
<h3>{%=o.title%}</h3>
<p>Released under the
<a href="{%=o.license.url%}">{%=o.license.name%}</a>.</p>
<h4>Features</h4>
<ul>
{% for (var i=0; i<o.features.length; i++) { %}
    <li>{%=o.features[i]%}</li>
{% } %}
</ul>
</script>
```

**"o"** (the lowercase letter) is a reference to the data parameter of the
template function (see the API section on how to modify this identifier).

In your application code, create a JavaScript object to use as data for the
template:

```js
var data = {
    "title": "JavaScript Templates",
    "license": {
        "name": "MIT license",
        "url": "https://opensource.org/licenses/MIT"
    },
    "features": [
        "lightweight & fast",
        "powerful",
        "zero dependencies"
    ]
};
```

In a real application, this data could be the result of retrieving a
[JSON](http://json.org/) resource.

Render the result by calling the **tmpl()** method with the id of the template
and the data object as arguments:

```js
document.getElementById("result").innerHTML = tmpl("tmpl-demo", data);
```

### Server-side

The following is an example how to use the JavaScript Templates engine on the
server-side with [node.js](http://nodejs.org/).

Create a new directory and add the **tmpl.js** file. Or alternatively, install
the **blueimp-tmpl** package with [npm](https://www.npmjs.org/):

```sh
npm install blueimp-tmpl
```

Add a file **template.html** with the following content:

```html
<!DOCTYPE HTML>
<title>{%=o.title%}</title>
<h3><a href="{%=o.url%}">{%=o.title%}</a></h3>
<h4>Features</h4>
<ul>
{% for (var i=0; i<o.features.length; i++) { %}
    <li>{%=o.features[i]%}</li>
{% } %}
</ul>
```

Add a file **server.js** with the following content:

```js
require("http").createServer(function (req, res) {
    var fs = require("fs"),
        // The tmpl module exports the tmpl() function:
        tmpl = require("./tmpl"),
        // Use the following version if you installed the package with npm:
        // tmpl = require("blueimp-tmpl"),
        // Sample data:
        data = {
            "title": "JavaScript Templates",
            "url": "https://github.com/blueimp/JavaScript-Templates",
            "features": [
                "lightweight & fast",
                "powerful",
                "zero dependencies"
            ]
        };
    // Override the template loading method:
    tmpl.load = function (id) {
        var filename = id + ".html";
        console.log("Loading " + filename);
        return fs.readFileSync(filename, "utf8");
    };
    res.writeHead(200, {"Content-Type": "text/x-tmpl"});
    // Render the content:
    res.end(tmpl("template", data));
}).listen(8080, "localhost");
console.log("Server running at http://localhost:8080/");
```

Run the application with the following command:

```sh
node server.js
```

## Requirements
The JavaScript Templates script has zero dependencies.

## API

### tmpl() function
The **tmpl()** function is added to the global **window** object and can be
called as global function:

```js
var result = tmpl("tmpl-demo", data);
```

The **tmpl()** function can be called with the id of a template, or with a
template string:

```js
var result = tmpl("<h3>{%=o.title%}</h3>", data);
```

If called without second argument, **tmpl()** returns a reusable template
function:

```js
var func = tmpl("<h3>{%=o.title%}</h3>");
document.getElementById("result").innerHTML = func(data);
```

### Templates cache
Templates loaded by id are cached in the map **tmpl.cache**:

```js
var func = tmpl("tmpl-demo"), // Loads and parses the template
    cached = typeof tmpl.cache["tmpl-demo"] === "function", // true
    result = tmpl("tmpl-demo", data); // Uses cached template function

tmpl.cache["tmpl-demo"] = null;
result = tmpl("tmpl-demo", data); // Loads and parses the template again
```

### Output encoding
The method **tmpl.encode** is used to escape HTML special characters in the
template output:

```js
var output = tmpl.encode("<>&\"'\x00"); // Renders "&lt;&gt;&amp;&quot;&#39;"
```

**tmpl.encode** makes use of the regular expression **tmpl.encReg** and the
encoding map **tmpl.encMap** to match and replace special characters, which can
be modified to change the behavior of the output encoding.  
Strings matched by the regular expression, but not found in the encoding map are
removed from the output. This allows for example to automatically trim input
values (removing whitespace from the start and end of the string):

```js
tmpl.encReg = /(^\s+)|(\s+$)|[<>&"'\x00]/g;
var output = tmpl.encode("    Banana!    "); // Renders "Banana" (without whitespace)
```

### Local helper variables
The local variables available inside the templates are the following:

* **o**: The data object given as parameter to the template function
(see the next section on how to modify the parameter name).
* **tmpl**: A reference to the **tmpl** function object.
* **_s**: The string for the rendered result content.
* **_e**: A reference to the **tmpl.encode** method.
* **print**: Helper function to add content to the rendered result string.
* **include**: Helper function to include the return value of a different
template in the result.

To introduce additional local helper variables, the string **tmpl.helper** can
be extended. The following adds a convenience function for *console.log* and a
streaming function, that streams the template rendering result back to the
callback argument
(note the comma at the beginning of each variable declaration):

```js
tmpl.helper += ",log=function(){console.log.apply(console, arguments)}" +
    ",st='',stream=function(cb){var l=st.length;st=_s;cb( _s.slice(l));}";
```

Those new helper functions could be used to stream the template contents to the
console output:

```html
<script type="text/x-tmpl" id="tmpl-demo">
<h3>{%=o.title%}</h3>
{% stream(log); %}
<p>Released under the
<a href="{%=o.license.url%}">{%=o.license.name%}</a>.</p>
{% stream(log); %}
<h4>Features</h4>
<ul>
{% stream(log); %}
{% for (var i=0; i<o.features.length; i++) { %}
    <li>{%=o.features[i]%}</li>
    {% stream(log); %}
{% } %}
</ul>
{% stream(log); %}
</script>
```

### Template function argument
The generated template functions accept one argument, which is the data object
given to the **tmpl(id, data)** function. This argument is available inside the
template definitions as parameter **o** (the lowercase letter).

The argument name can be modified by overriding **tmpl.arg**:

```js
tmpl.arg = "p";

// Renders "<h3>JavaScript Templates</h3>":
var result = tmpl("<h3>{%=p.title%}</h3>", {title: "JavaScript Templates"});
```

### Template parsing
The template contents are matched and replaced using the regular expression
**tmpl.regexp** and the replacement function **tmpl.func**.
The replacement function operates based on the
[parenthesized submatch strings](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).

To use different tags for the template syntax, override **tmpl.regexp** with a
modified regular expression, by exchanging all occurrences of "{%" and "%}",
e.g. with "[%" and "%]":

```js
tmpl.regexp = /([\s'\\])(?!(?:[^[]|\[(?!%))*%\])|(?:\[%(=|#)([\s\S]+?)%\])|(\[%)|(%\])/g;
```

By default, the plugin preserves whitespace
(newlines, carriage returns, tabs and spaces).
To strip unnecessary whitespace, you can override the **tmpl.func** function,
e.g. with the following code:

```js
var originalFunc = tmpl.func;
tmpl.func = function (s, p1, p2, p3, p4, p5, offset, str) {
    if (p1 && /\s/.test(p1)) {
        if (!offset || /\s/.test(str.charAt(offset - 1)) ||
                /^\s+$/g.test(str.slice(offset))) {
            return '';
        }
        return ' ';
    }
    return originalFunc.apply(tmpl, arguments);
};
```

## Templates syntax

### Interpolation
Print variable with HTML special characters escaped:

```html
<h3>{%=o.title%}</h3>
```

Print variable without escaping:

```html
<h3>{%#o.user_id%}</h3>
```

Print output of function calls:

```html
<a href="{%=encodeURI(o.url)%}">Website</a>
```

Use dot notation to print nested properties:

```html
<strong>{%=o.author.name%}</strong>
```

### Evaluation
Use **print(str)** to add escaped content to the output:

```html
<span>Year: {% var d=new Date(); print(d.getFullYear()); %}</span>
```

Use **print(str, true)** to add unescaped content to the output:

```html
<span>{% print("Fast &amp; powerful", true); %}</span>
```

Use **include(str, obj)** to include content from a different template:

```html
<div>
{% include('tmpl-link', {name: "Website", url: "https://example.org"}); %}
</div>
```

**If else condition**:

```html
{% if (o.author.url) { %}
    <a href="{%=encodeURI(o.author.url)%}">{%=o.author.name%}</a>
{% } else { %}
    <em>No author url.</em>
{% } %}
```

**For loop**:

```html
<ul>
{% for (var i=0; i<o.features.length; i++) { %}
    <li>{%=o.features[i]%}</li>
{% } %}
</ul>
```

## Compiled templates
The JavaScript Templates project comes with a compilation script, that allows
you to compile your templates into JavaScript code and combine them with a
minimal Templates runtime into one combined JavaScript file.

The compilation script is built for [node.js](http://nodejs.org/).  
To use it, first install the JavaScript Templates project via
[npm](https://www.npmjs.org/):

```sh
npm install blueimp-tmpl
```

This will put the executable **tmpl.js** into the folder **node_modules/.bin**.
It will also make it available on your PATH if you install the package globally
(by adding the **-g** flag to the install command).

The **tmpl.js** executable accepts the paths to one or multiple template files
as command line arguments and prints the generated JavaScript code to the
console output. The following command line shows you how to store the generated
code in a new JavaScript file that can be included in your project:

```sh
tmpl.js index.html > tmpl.js
```

The files given as command line arguments to **tmpl.js** can either be pure
template files or HTML documents with embedded template script sections.
For the pure template files, the file names (without extension) serve as
template ids.  
The generated file can be included in your project as a replacement for the
original **tmpl.js** runtime. It provides you with the same API and provides a
**tmpl(id, data)** function that accepts the id of one of your templates as
first and a data object as optional second parameter.

## Tests
The JavaScript Templates project comes with
[Unit Tests](https://en.wikipedia.org/wiki/Unit_testing).  
There are two different ways to run the tests:

* Open test/index.html in your browser or
* run `npm test` in the Terminal in the root path of the repository package.

The first one tests the browser integration,
the second one the [node.js](http://nodejs.org/) integration.

## License
The JavaScript Templates script is released under the
[MIT license](https://opensource.org/licenses/MIT).
