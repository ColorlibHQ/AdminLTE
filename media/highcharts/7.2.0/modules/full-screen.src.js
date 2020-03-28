/**
 * @license Highstock JS v7.2.0 (2019-09-03)
 *
 * Advanced Highstock tools
 *
 * (c) 2010-2019 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/full-screen', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'modules/full-screen.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Sebastian Bochann
         *
         *  Full screen for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The FullScreen class.
         * The module allows user to enable full screen mode in StockTools.
         * Based on default solutions in browsers.
         *
         * @private
         * @class
         * @name Highcharts.FullScreen
         *
         * @param {Highcharts.HTMLDOMElement} container
         *        Chart container
         */
        var FullScreen = H.FullScreen = function (container) {
            this.init(container.parentNode);
        };
        FullScreen.prototype = {
            /**
             * Init function
             * @private
             * @param {Highcharts.HTMLDOMElement} container
             *        Chart container's parent
             * @return {void}
             */
            init: function (container) {
                var promise;
                if (container.requestFullscreen) {
                    promise = container.requestFullscreen();
                }
                else if (container.mozRequestFullScreen) {
                    promise = container.mozRequestFullScreen();
                }
                else if (container.webkitRequestFullscreen) {
                    promise = container.webkitRequestFullscreen();
                }
                else if (container.msRequestFullscreen) {
                    promise = container.msRequestFullscreen();
                }
                if (promise) {
                    promise['catch'](function () {
                        alert('Full screen is not supported inside a frame'); // eslint-disable-line no-alert
                    });
                }
            }
        };

    });
    _registerModule(_modules, 'masters/modules/full-screen.src.js', [], function () {


    });
}));