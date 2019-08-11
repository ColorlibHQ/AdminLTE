describe("'ticks_tooltip' Option tests", function() {
	var testSlider;
	var mouseEventArguments;

	beforeEach(function() {
		// Set up default set of mouse event arguments
		mouseEventArguments = [
			'mousemove', // type
			true, // canBubble
			true, // cancelable
			document, // view,
			0, // detail
			0, // screenX
			0, // screenY
			undefined, // clientX
			undefined, // clientY,
			false, // ctrlKey
			false, // altKey
			false, // shiftKey
			false, // metaKey,
			0, // button
			null // relatedTarget
		];
	});

	describe("ticks_tooltip states", function() {
        it("should have the tooltip above the last hovered over element", function() {
            testSlider = new Slider(document.getElementById("testSlider1"), {
				ticks: [0, 1, 2, 3, 4, 5, 6],
				ticks_positions: [0, 19, 29, 39, 49, 95, 100],
				step: 1,
				value: 4,
                ticks_tooltip: true,
                orientation: 'horizontal'
			});
			mouseEventArguments[8] = testSlider.sliderElem.offsetTop; // clientY
			var mouse49 = document.createEvent('MouseEvents');
			mouseEventArguments[7] = testSlider.ticks[4].offsetLeft + testSlider.sliderElem.offsetLeft; // clientX
			mouse49.initMouseEvent.apply(mouse49, mouseEventArguments);
			var mouse95 = document.createEvent('MouseEvents');
			mouseEventArguments[7] = testSlider.ticks[5].offsetLeft + testSlider.sliderElem.offsetLeft; // clientX
			mouse95.initMouseEvent.apply(mouse95, mouseEventArguments);
			var mouse100 = document.createEvent('MouseEvents');
			mouseEventArguments[7] = testSlider.ticks[6].offsetLeft + testSlider.sliderElem.offsetLeft; // clientX
			mouse100.initMouseEvent.apply(mouse100, mouseEventArguments);
			var mouseStart = document.createEvent('MouseEvents');
			mouseEventArguments[7] = testSlider.ticks[0].offsetLeft + testSlider.sliderElem.offsetLeft; // clientX
			mouseStart.initMouseEvent.apply(mouseStart, mouseEventArguments);

			//Simulate random movements
			testSlider.mousedown(mouse49);
			testSlider.mousemove(mouse95);
			// FIXME: Use 'mouseup' event type
			testSlider.mouseup(mouse95);
			testSlider.mousedown(mouse49);
			testSlider.mousemove(mouse100);
			testSlider.mousemove(mouse95);
			testSlider.mousemove(mouse95);
			testSlider.mousemove(mouseStart);
            expect(testSlider.tooltip.style.left).toBe("0%");
		});
	});

	describe("Always show the tooltip", function() {
		it("Should always display the tooltip after hovering over a tick", function(done) {
			testSlider = new Slider(document.getElementById("testSlider1"), {
				id: 'mySlider',
				min: 0,
				max: 10,
				step: 1,
				value: 1,
				ticks: [0, 5, 10],
				tooltip: 'always',
				ticks_tooltip: true,
				orientation: 'horizontal'
			});
			var bigOffset = 100000;

			var isTooltipVisible = $('#mySlider').find('.tooltip.tooltip-main').hasClass('in');
			expect(isTooltipVisible).toBe(true);

			var mouseenter = document.createEvent('MouseEvent');
			mouseEventArguments[0] = 'mouseenter';
			mouseEventArguments[7] = 
				testSlider.ticks[1].offsetLeft + testSlider.sliderElem.offsetLeft; // clientX
			mouseenter.initMouseEvent.apply(mouseenter, mouseEventArguments);

			var mouseleave = document.createEvent('MouseEvent');
			mouseEventArguments[0] = 'mouseleave';
			mouseEventArguments[7] = testSlider.sliderElem.offsetLeft + bigOffset;
			mouseleave.initMouseEvent.apply(mouseleave, mouseEventArguments);

			testSlider.ticks[1].addEventListener('mouseleave', function() {
				isTooltipVisible = $('#mySlider').find('.tooltip.tooltip-main').hasClass('in');
				expect(isTooltipVisible).toBe(true);
				done();
			});

			testSlider.ticks[1].dispatchEvent(mouseenter);
			testSlider.ticks[1].dispatchEvent(mouseleave);
		});
	});

	afterEach(function() {
		if(testSlider) {
			if(testSlider instanceof Slider) { testSlider.destroy(); }
			testSlider = null;
		}
	});
});

/**
 * The mouse navigation tests are based on the following slider properties:
 *
 * initial value: 3 or [3, 7]
 * ticks: [0, 3, 5, 7, 10]
 * step: 1
 *
 * When the `ticks_tooltip` option is set to `true`, hovering over the ticks or handles
 * should show the tooltip above it with the value of the tick/handle.
 *
 * The test logic for sliders:
 * 1. Hover over the 1st tick
 * 2. Check if the tooltip is positioned correctly (left, top, right)
 * 3. Check if the tooltip should be showing
 * 4. Check if the tooltip contains the correct value
 * 5. Check if the slider value(s) haven't changed
 *
 */
describe("`ticks_tooltip: true` mouse navigation test cases", function() {
	var initialValue = 3;
	var initialRangeValues = [3, 7];
	var tickValues = [0, 3, 5, 7, 10];
	var stepValue = 1;

	var orientations = ['horizontal', 'vertical'];
	var reversed = [false, true];
	var sliderTypes = ['single', 'range'];
	var rtl = [false, true];
	var testCases = [];
	var mouseEventArguments;

	function calcMouseEventCoords(element) {
		var elementBB = element.getBoundingClientRect();

		return {
			clientX: elementBB.left,
			clientY: elementBB.top
		};
	}

	function createMouseEvent(type, clientX, clientY) {
		var mouseEvent = document.createEvent('MouseEvent');
		mouseEventArguments[0] = type;
		mouseEventArguments[7] = clientX;
		mouseEventArguments[8] = clientY;
		mouseEvent.initMouseEvent.apply(mouseEvent, mouseEventArguments);
		return mouseEvent;
	}

	beforeEach(function() {
		// Set up default set of mouse event arguments
		mouseEventArguments = [
			'mousemove', // type
			true, // canBubble
			true, // cancelable
			document, // view,
			0, // detail
			0, // screenX
			0, // screenY
			undefined, // clientX
			undefined, // clientY,
			false, // ctrlKey
			false, // altKey
			false, // shiftKey
			false, // metaKey,
			0, // button
			null // relatedTarget
		];
	});

	sliderTypes.forEach(function(sliderType) {
		orientations.forEach(function(orientation) {
			rtl.forEach(function(isRTL) {
				reversed.forEach(function(isReversed) {
					var isHorizontal = orientation === 'horizontal';
					var isVertical = orientation === 'vertical';
					var isRange = sliderType === 'range';
					var whichStyle;

					if (isHorizontal) {
						if (isRTL) {
							whichStyle = 'right';
						}
						else {
							whichStyle = 'left';
						}
					}
					else if (isVertical) {
						whichStyle = 'top';
					}

					testCases.push({
						value: isRange ? initialRangeValues : initialValue,
						step: stepValue,
						range: isRange,
						orientation: orientation,
						reversed: isReversed,
						rtl: 'auto',
						isRTL: isRTL,
						inputId: isRTL ? 'rtlSlider' : 'testSlider1',
						expectedValue: isRange ? initialRangeValues : initialValue,
						stylePos: whichStyle
					});
				});
			});
		});
	});

	testCases.forEach(function(testCase) {
		describe("range=" + testCase.range + ", orientation=" + testCase.orientation +
			", rtl=" + testCase.isRTL + ", reversed=" + testCase.reversed, function() {
			var $testSlider;
			var sliderElem;
			var $handle1;
			var $handle2;
			var $ticks;
			var sliderId;
			var sliderOptions;
			var $tooltip;
			var $tooltipInner;
			var lastTickIndex;
			var mouseEventType = 'mouseenter';

			beforeEach(function() {
				sliderId = testCase.range ? 'myRangeSlider' : 'mySlider';

				sliderOptions = {
					id: sliderId,
					step: testCase.step,
					orientation: testCase.orientation,
					value: testCase.value,
					range: testCase.range,
					reversed: testCase.reversed,
					rtl: 'auto',
					ticks: tickValues,
					ticks_tooltip: true
				};

				$testSlider = $('#'+testCase.inputId).slider(sliderOptions);
				sliderElem = $('#'+sliderId)[0];
				$ticks = $(sliderElem).find('.slider-tick');
				$handle1 = $(sliderElem).find('.slider-handle:first');
				$handle2 = $(sliderElem).find('.slider-handle:last');
				$tooltip = $(sliderElem).find('.tooltip.tooltip-main');
				$tooltipInner = $tooltip.find('.tooltip-inner');
				lastTickIndex = sliderOptions.ticks.length - 1;
			});

			afterEach(function() {
				// Clean up any associated event listeners
				$ticks = null;
				$handle1 = null;
				$handle2 = null;

				if ($testSlider) {
					$testSlider.slider('destroy');
					$testSlider = null;
				}
			});

			it("Should position the tooltip correctly", function(done) {
				$ticks.each(function(index, tickElem) {
					var coords = calcMouseEventCoords(tickElem);

					var tickCallback = function() {
						// Check position
						expect($tooltip.css(testCase.stylePos)).toBe($(this).css(testCase.stylePos));

						if (index === lastTickIndex) {
							done();
						}
					};

					// Set up listener and dispatch event
					this.addEventListener(mouseEventType, tickCallback, false);
					this.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
				});
			});

			it("Should show the tooltip", function(done) {
				$ticks.each(function(index, tickElem) {
					var coords = calcMouseEventCoords(tickElem);

					var tickCallback = function() {
						// Check that tooltip shows
						expect($tooltip.hasClass('in')).toBe(true);

						if (index === lastTickIndex) {
							done();
						}
					};

					this.addEventListener(mouseEventType, tickCallback, false);
					this.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
				});
			});

			it("Should not show the tooltip", function(done) {
				var bigOffset = 100000;

				$ticks.each(function(index, tickElem) {
					var coords = calcMouseEventCoords(tickElem);

					var tickCallback = function() {
						// Check that tooltip shows
						expect($tooltip.hasClass('in')).toBe(false);

						if (index === lastTickIndex) {
							done();
						}
					};

					this.addEventListener('mouseleave', tickCallback, false);
					this.dispatchEvent(createMouseEvent('mouseleave', coords.clientX + bigOffset, coords.clientY));
				});
			});

			it("Should contain the correct value for the tooltip", function(done) {
				$ticks.each(function(index, tickElem) {
					var coords = calcMouseEventCoords(tickElem);

					var tickCallback = function() {
						// Check value of tooltip
						expect($tooltipInner.text()).toBe(''+sliderOptions.ticks[index]);

						if (index === lastTickIndex) {
							done();
						}
					};

					this.addEventListener(mouseEventType, tickCallback, false);
					this.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
				});
			});

			it("Should not modify the value(s) of the slider when displaying the tooltip", function(done) {
				$ticks.each(function(index, tickElem) {
					var coords = calcMouseEventCoords(tickElem);

					var tickCallback = function() {
						var value = $testSlider.slider('getValue');

						// Check value of slider
						expect(value).toEqual(testCase.expectedValue);

						if (index === lastTickIndex) {
							done();
						}
					};

					this.addEventListener(mouseEventType, tickCallback, false);
					this.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
				});
			});

			describe("Test position and values of the tooltip when hovering over the handle(s)", function() {

				if (testCase.range) {
					it("Should position for the tooltip correctly (range)", function(done) {
						var handleElems = [$handle1[0], $handle2[0]];

						$.each(handleElems, function(index, handleElem) {
							var coords = calcMouseEventCoords(handleElem, testCase.orientation);

							var handleCallback = function() {
								// Check position
								expect($tooltip.css(testCase.stylePos)).toBe($(handleElem).css(testCase.stylePos));

								if (index === 1) {
									done();
								}
							};

							handleElem.addEventListener(mouseEventType, handleCallback, false);
							handleElem.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
						});
					});

					it("Should contain the correct values for the tooltip (range)", function(done) {
						var handleElems = [$handle1[0], $handle2[0]];

						$.each(handleElems, function(index, handleElem) {
							var coords = calcMouseEventCoords(handleElem, testCase.orientation);

							var handleCallback = function() {
								// Check value of tooltip
								expect($tooltipInner.text()).toBe(''+testCase.expectedValue[index]);

								if (index === 1) {
									done();
								}
							};

							handleElem.addEventListener(mouseEventType, handleCallback, false);
							handleElem.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
						});
					});

				}
				else {
					it("Should position for the tooltip correctly (single)", function(done) {
						var handleElem = $handle1[0];

						var coords = calcMouseEventCoords(handleElem, testCase.orientation);

						var handleCallback = function() {
							// Check position
							expect($tooltip.css(testCase.stylePos)).toBe($(handleElem).css(testCase.stylePos));
							done();
						};

						handleElem.addEventListener(mouseEventType, handleCallback, false);
						handleElem.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
					});

					it("Should contain the correct value for the tooltip (single)", function(done) {
						var handleElem = $handle1[0];

						var coords = calcMouseEventCoords(handleElem, testCase.orientation);

						var handleCallback = function() {
							// Check value of tooltip
							expect($tooltipInner.text()).toBe(''+testCase.expectedValue);
							done();
						};

						handleElem.addEventListener(mouseEventType, handleCallback, false);
						handleElem.dispatchEvent(createMouseEvent(mouseEventType, coords.clientX, coords.clientY));
					});
				}
			});
		});
	});
});