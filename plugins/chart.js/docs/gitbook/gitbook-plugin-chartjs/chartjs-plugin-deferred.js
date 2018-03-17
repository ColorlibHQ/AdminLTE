/*!
 * chartjs-plugin-deferred
 * http://chartjs.org/
 * Version: 0.2.0
 *
 * Copyright 2016 Simon Brunel
 * Released under the MIT license
 * https://github.com/chartjs/chartjs-plugin-deferred/blob/master/LICENSE.md
 */
/* global window: false */
'use strict';

(function() {

	var Chart = window.Chart;
	var helpers = Chart.helpers;
	var STUB_KEY = '_chartjs_deferred';
	var MODEL_KEY = '_deferred_model';

	/**
	 * Plugin based on discussion from Chart.js issue #2745.
	 * @see https://github.com/chartjs/Chart.js/issues/2745
	 */
	Chart.Deferred = Chart.Deferred || {};
	Chart.Deferred.defaults = {
		enabled: true,
		xOffset: 0,
		yOffset: 0,
		delay: 0
	};

	// DOM implementation
	// @TODO move it in Chart.js: src/core/core.platform.js
	Chart.platform = helpers.extend(Chart.platform || {}, {
		defer: function(fn, delay, scope) {
			var callback = function() {
				fn.call(scope);
			};
			if (!delay) {
				helpers.requestAnimFrame.call(window, callback);
			} else {
				window.setTimeout(callback, delay);
			}
		}
	});

	function computeOffset(value, base) {
		var number = parseInt(value, 10);
		if (isNaN(number)) {
			return 0;
		} else if (typeof value === 'string' && value.indexOf('%') !== -1) {
			return number / 100 * base;
		}
		return number;
	}

	function chartInViewport(instance) {
		var model = instance[MODEL_KEY];
		var canvas = instance.chart.canvas;

		// http://stackoverflow.com/a/21696585
		if (canvas.offsetParent === null) {
			return false;
		}

		var rect = canvas.getBoundingClientRect();
		var dy = computeOffset(model.yOffset || 0, rect.height);
		var dx = computeOffset(model.xOffset || 0, rect.width);

		return rect.right - dx >= 0
			&& rect.bottom - dy >= 0
			&& rect.left + dx <= window.innerWidth
			&& rect.top + dy <= window.innerHeight;
	}

	function buildDeferredModel(instance) {
		var defaults = Chart.Deferred.defaults;
		var options = instance.options.deferred;
		var getValue = helpers.getValueOrDefault;

		if (options === undefined) {
			options = {};
		} else if (typeof options === 'boolean') {
			// accepting { options: { deferred: true } }
			options = {enabled: options};
		}

		return {
			enabled: getValue(options.enabled, defaults.enabled),
			xOffset: getValue(options.xOffset, defaults.xOffset),
			yOffset: getValue(options.yOffset, defaults.yOffset),
			delay: getValue(options.delay, defaults.delay),
			appeared: false,
			delayed: false,
			loaded: false,
			elements: []
		};
	}

	function onScroll(event) {
		var node = event.target;
		var stub = node[STUB_KEY];
		if (stub.ticking) {
			return;
		}

		stub.ticking = true;
		Chart.platform.defer(function() {
			var instances = stub.instances.slice();
			var ilen = instances.length;
			var instance, i;

			for (i=0; i<ilen; ++i) {
				instance = instances[i];
				if (chartInViewport(instance)) {
					unwatch(instance); // eslint-disable-line
					instance[MODEL_KEY].appeared = true;
					instance.update();
				}
			}

			stub.ticking = false;
		});
	}

	function isScrollable(node) {
		var type = node.nodeType;
		if (type === Node.ELEMENT_NODE) {
			var overflowX = helpers.getStyle(node, 'overflow-x');
			var overflowY = helpers.getStyle(node, 'overflow-y');
			return overflowX === 'auto' || overflowX === 'scroll'
				|| overflowY === 'auto' || overflowY === 'scroll';
		}

		return node.nodeType === Node.DOCUMENT_NODE;
	}

	function watch(instance) {
		var canvas = instance.chart.canvas;
		var parent = canvas.parentElement;
		var stub, instances;

		while (parent) {
			if (isScrollable(parent)) {
				stub = parent[STUB_KEY] || (parent[STUB_KEY] = {});
				instances = stub.instances || (stub.instances = []);
				if (instances.length === 0) {
					parent.addEventListener('scroll', onScroll, {passive: true});
				}

				instances.push(instance);
				instance[MODEL_KEY].elements.push(parent);
			}

			parent = parent.parentElement || parent.ownerDocument;
		}
	}

	function unwatch(instance) {
		instance[MODEL_KEY].elements.forEach(function(element) {
			var instances = element[STUB_KEY].instances;
			instances.splice(instances.indexOf(instance), 1);
			if (!instances.length) {
				helpers.removeEvent(element, 'scroll', onScroll);
				delete element[STUB_KEY];
			}
		});

		instance[MODEL_KEY].elements = [];
	}

	Chart.plugins.register({
		beforeInit: function(instance) {
			var model = instance[MODEL_KEY] = buildDeferredModel(instance);
			if (model.enabled) {
				watch(instance);
			}
		},

		beforeDatasetsUpdate: function(instance) {
			var model = instance[MODEL_KEY];
			if (!model.enabled) {
				return true;
			}

			if (!model.loaded) {
				if (!model.appeared && !chartInViewport(instance)) {
					// cancel the datasets update
					return false;
				}

				model.appeared = true;
				model.loaded = true;
				unwatch(instance);

				if (model.delay > 0) {
					model.delayed = true;
					Chart.platform.defer(function() {
						model.delayed = false;
						instance.update();
					}, model.delay);

					return false;
				}
			}

			if (model.delayed) {
				// in case of delayed update, ensure to block external requests, such
				// as interacting with the legend label, or direct calls to update()
				return false;
			}
		}
	});

}());
