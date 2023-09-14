/* Support for flat 1D data series.

A 1D flat data series is a data series in the form of a regular 1D array. The
main reason for using a flat data series is that it performs better, consumes
less memory and generates less garbage collection than the regular flot format.

Example:

    plot.setData([[[0,0], [1,1], [2,2], [3,3]]]); // regular flot format
    plot.setData([{flatdata: true, data: [0, 1, 2, 3]}]); // flatdata format

Set series.flatdata to true to enable this plugin.

You can use series.start to specify the starting index of the series (default is 0)
You can use series.step to specify the interval between consecutive indexes of the series (default is 1)
*/

/* global jQuery*/

(function ($) {
    'use strict';

    function process1DRawData(plot, series, data, datapoints) {
        if (series.flatdata === true) {
            var start = series.start || 0;
            var step = typeof series.step === 'number' ? series.step : 1;
            datapoints.pointsize = 2;
            for (var i = 0, j = 0; i < data.length; i++, j += 2) {
                datapoints.points[j] = start + (i * step);
                datapoints.points[j + 1] = data[i];
            }
            if (datapoints.points !== undefined) {
                datapoints.points.length = data.length * 2;
            } else {
                datapoints.points = [];
            }
        }
    }

    $.plot.plugins.push({
        init: function(plot) {
            plot.hooks.processRawData.push(process1DRawData);
        },
        name: 'flatdata',
        version: '0.0.2'
    });
})(jQuery);
