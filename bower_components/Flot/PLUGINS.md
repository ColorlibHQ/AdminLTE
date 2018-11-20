## Writing plugins ##

All you need to do to make a new plugin is creating an init function
and a set of options (if needed), stuffing it into an object and
putting it in the $.plot.plugins array. For example:

```js
function myCoolPluginInit(plot) {
    plot.coolstring = "Hello!";
};

$.plot.plugins.push({ init: myCoolPluginInit, options: { ... } });

// if $.plot is called, it will return a plot object with the
// attribute "coolstring"
```

Now, given that the plugin might run in many different places, it's
a good idea to avoid leaking names. The usual trick here is wrap the
above lines in an anonymous function which is called immediately, like
this: (function () { inner code ... })(). To make it even more robust
in case $ is not bound to jQuery but some other Javascript library, we
can write it as

```js
(function ($) {
    // plugin definition
    // ...
})(jQuery);
```

There's a complete example below, but you should also check out the
plugins bundled with Flot.


## Complete example ##
  
Here is a simple debug plugin which alerts each of the series in the
plot. It has a single option that control whether it is enabled and
how much info to output:

```js
(function ($) {
    function init(plot) {
        var debugLevel = 1;

        function checkDebugEnabled(plot, options) {
            if (options.debug) {
                debugLevel = options.debug;
                plot.hooks.processDatapoints.push(alertSeries);
            }
        }

        function alertSeries(plot, series, datapoints) {
            var msg = "series " + series.label;
            if (debugLevel > 1) {
                msg += " with " + series.data.length + " points";
                alert(msg);
            }
        }

        plot.hooks.processOptions.push(checkDebugEnabled);
    }

    var options = { debug: 0 };
      
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "simpledebug",
        version: "0.1"
    });
})(jQuery);
```

We also define "name" and "version". It's not used by Flot, but might
be helpful for other plugins in resolving dependencies.
  
Put the above in a file named "jquery.flot.debug.js", include it in an
HTML page and then it can be used with:

```js
    $.plot($("#placeholder"), [...], { debug: 2 });
```

This simple plugin illustrates a couple of points:

 - It uses the anonymous function trick to avoid name pollution.
 - It can be enabled/disabled through an option.
 - Variables in the init function can be used to store plot-specific
   state between the hooks.

The two last points are important because there may be multiple plots
on the same page, and you'd want to make sure they are not mixed up.


## Shutting down a plugin ##

Each plot object has a shutdown hook which is run when plot.shutdown()
is called. This usually mostly happens in case another plot is made on
top of an existing one.

The purpose of the hook is to give you a chance to unbind any event
handlers you've registered and remove any extra DOM things you've
inserted.

The problem with event handlers is that you can have registered a
handler which is run in some point in the future, e.g. with
setTimeout(). Meanwhile, the plot may have been shutdown and removed,
but because your event handler is still referencing it, it can't be
garbage collected yet, and worse, if your handler eventually runs, it
may overwrite stuff on a completely different plot.

 
## Some hints on the options ##
   
Plugins should always support appropriate options to enable/disable
them because the plugin user may have several plots on the same page
where only one should use the plugin. In most cases it's probably a
good idea if the plugin is turned off rather than on per default, just
like most of the powerful features in Flot.

If the plugin needs options that are specific to each series, like the
points or lines options in core Flot, you can put them in "series" in
the options object, e.g.

```js
var options = {
    series: {
        downsample: {
            algorithm: null,
            maxpoints: 1000
        }
    }
}
```

Then they will be copied by Flot into each series, providing default
values in case none are specified.

Think hard and long about naming the options. These names are going to
be public API, and code is going to depend on them if the plugin is
successful.
