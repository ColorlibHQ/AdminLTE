/* Flot plugin that adds some extra symbols for plotting points.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

The symbols are accessed as strings through the standard symbol options:

    series: {
        points: {
            symbol: "square" // or "diamond", "triangle", "cross", "plus", "ellipse", "rectangle"
        }
    }

*/

(function ($) {
    // we normalize the area of each symbol so it is approximately the
    // same as a circle of the given radius

    var square = function (ctx, x, y, radius, shadow) {
            // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
            var size = radius * Math.sqrt(Math.PI) / 2;
            ctx.rect(x - size, y - size, size + size, size + size);
        },
        rectangle = function (ctx, x, y, radius, shadow) {
            // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
            var size = radius * Math.sqrt(Math.PI) / 2;
            ctx.rect(x - size, y - size, size + size, size + size);
        },
        diamond = function (ctx, x, y, radius, shadow) {
            // pi * r^2 = 2s^2  =>  s = r * sqrt(pi/2)
            var size = radius * Math.sqrt(Math.PI / 2);
            ctx.moveTo(x - size, y);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x - size, y);
            ctx.lineTo(x, y - size);
        },
        triangle = function (ctx, x, y, radius, shadow) {
            // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
            var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
            var height = size * Math.sin(Math.PI / 3);
            ctx.moveTo(x - size / 2, y + height / 2);
            ctx.lineTo(x + size / 2, y + height / 2);
            if (!shadow) {
                ctx.lineTo(x, y - height / 2);
                ctx.lineTo(x - size / 2, y + height / 2);
                ctx.lineTo(x + size / 2, y + height / 2);
            }
        },
        cross = function (ctx, x, y, radius, shadow) {
            // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
            var size = radius * Math.sqrt(Math.PI) / 2;
            ctx.moveTo(x - size, y - size);
            ctx.lineTo(x + size, y + size);
            ctx.moveTo(x - size, y + size);
            ctx.lineTo(x + size, y - size);
        },
        ellipse = function(ctx, x, y, radius, shadow, fill) {
            if (!shadow) {
                ctx.moveTo(x + radius, y);
                ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            }
        },
        plus = function (ctx, x, y, radius, shadow) {
            var size = radius * Math.sqrt(Math.PI / 2);
            ctx.moveTo(x - size, y);
            ctx.lineTo(x + size, y);
            ctx.moveTo(x, y + size);
            ctx.lineTo(x, y - size);
        },
        handlers = {
            square: square,
            rectangle: rectangle,
            diamond: diamond,
            triangle: triangle,
            cross: cross,
            ellipse: ellipse,
            plus: plus
        };

    square.fill = true;
    rectangle.fill = true;
    diamond.fill = true;
    triangle.fill = true;
    ellipse.fill = true;

    function init(plot) {
        plot.drawSymbol = handlers;
    }

    $.plot.plugins.push({
        init: init,
        name: 'symbols',
        version: '1.0'
    });
})(jQuery);
