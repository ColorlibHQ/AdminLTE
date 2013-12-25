## Frequently asked questions ##

#### How much data can Flot cope with? ####

Flot will happily draw everything you send to it so the answer
depends on the browser. The excanvas emulation used for IE (built with
VML) makes IE by far the slowest browser so be sure to test with that
if IE users are in your target group (for large plots in IE, you can
also check out Flashcanvas which may be faster).

1000 points is not a problem, but as soon as you start having more
points than the pixel width, you should probably start thinking about
downsampling/aggregation as this is near the resolution limit of the
chart anyway. If you downsample server-side, you also save bandwidth.


#### Flot isn't working when I'm using JSON data as source! ####

Actually, Flot loves JSON data, you just got the format wrong.
Double check that you're not inputting strings instead of numbers,
like [["0", "-2.13"], ["5", "4.3"]]. This is most common mistake, and
the error might not show up immediately because Javascript can do some
conversion automatically.


#### Can I export the graph? ####

You can grab the image rendered by the canvas element used by Flot
as a PNG or JPEG (remember to set a background). Note that it won't
include anything not drawn in the canvas (such as the legend). And it
doesn't work with excanvas which uses VML, but you could try
Flashcanvas.


#### The bars are all tiny in time mode? ####

It's not really possible to determine the bar width automatically.
So you have to set the width with the barWidth option which is NOT in
pixels, but in the units of the x axis (or the y axis for horizontal
bars). For time mode that's milliseconds so the default value of 1
makes the bars 1 millisecond wide.


#### Can I use Flot with libraries like Mootools or Prototype? ####

Yes, Flot supports it out of the box and it's easy! Just use jQuery
instead of $, e.g. call jQuery.plot instead of $.plot and use
jQuery(something) instead of $(something). As a convenience, you can
put in a DOM element for the graph placeholder where the examples and
the API documentation are using jQuery objects.

Depending on how you include jQuery, you may have to add one line of
code to prevent jQuery from overwriting functions from the other
libraries, see the documentation in jQuery ("Using jQuery with other
libraries") for details.


#### Flot doesn't work with [insert name of Javascript UI framework]! ####

Flot is using standard HTML to make charts. If this is not working,
it's probably because the framework you're using is doing something
weird with the DOM or with the CSS that is interfering with Flot.

A common problem is that there's display:none on a container until the
user does something. Many tab widgets work this way, and there's
nothing wrong with it - you just can't call Flot inside a display:none
container as explained in the README so you need to hold off the Flot
call until the container is actually displayed (or use
visibility:hidden instead of display:none or move the container
off-screen).

If you find there's a specific thing we can do to Flot to help, feel
free to submit a bug report. Otherwise, you're welcome to ask for help
on the forum/mailing list, but please don't submit a bug report to
Flot.
