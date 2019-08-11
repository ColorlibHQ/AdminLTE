/*
	*************************

	Lock To Ticks Tests

	*************************

    Verify that the when lock_to_ticks is true, the selected values will be snapped to closest tick values


*/
describe("Slider with lock_to_ticks: true tests", function() {

	var testSlider;

	it("Should set `options.lock_to_ticks` to false when `ticks[]` is not set", function() {
		testSlider = $('#testSlider1').slider({
			lock_to_ticks: true
		});

		var lockAttr = testSlider.slider('getAttribute', 'lock_to_ticks');
		expect(lockAttr).toBe(false);
	});

	it("Should set the slider value when `ticks[]` is not set", function() {
		testSlider = $('#testSlider1').slider({
			min: 0,
			max: 10,
			value: 1,
			lock_to_ticks: true
		});

		testSlider.slider('setValue', 5);

		var value = testSlider.slider('getValue');
		expect(value).toBe(5);
	});

	it("Should return a value (after calling `setAttribute()`)", function() {
		testSlider = $('#testSlider1').slider({
			min: 0,
			max: 10,
			value: 1,
			lock_to_ticks: true
		});

		// Try to lock to ticks when there are no ticks[]
		testSlider.slider('setAttribute', 'lock_to_ticks', true);
		testSlider.slider('setValue', 5);

		// Without proper checking, getValue() is going to return NaN in this case
		var value = testSlider.slider('getValue');
		expect(isNaN(value)).toBe(false);
	});

	it("Should snap to closest tick value (single)", function() {
		testSlider = $('#testSlider1').slider({
			value: 1,
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true
		});

		// Set a value that is not a tick
		testSlider.slider('setValue', 102);

		var value = testSlider.slider('getValue');
		expect(value).toBe(50);
	});

	it("Should snap to closest tick value (single, vertical)", function() {
		testSlider = $('#testSlider1').slider({
			value: 1,
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true,
			orientation: 'vertical'
		});

		//selecting values that are not inside tickes
		testSlider.slider('setValue', 102);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var value = testSlider.slider('getValue');
		expect(value).toBe(50);
	});

	it("Should snap to closest tick value (range)", function() {
		testSlider = $("#testSlider1").slider({
			value: [1, 10000],
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true
		});

		//selecting values that are not inside tickes
		testSlider.slider("setValue", [4, 102]);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var values = testSlider.slider("getValue");
		expect(values[0]).toBe(1);
		expect(values[1]).toBe(50);
	});

	it("Should snap to closest tick value (range, vertical)", function() {
		testSlider = $("#testSlider1").slider({
			value: [1, 10000],
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true,
			orientation: 'vertical'
		});

		//selecting values that are not inside tickes
		testSlider.slider("setValue", [4, 102]);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var values = testSlider.slider("getValue");
		expect(values[0]).toBe(1);
		expect(values[1]).toBe(50);
	});

	afterEach(function() {
		if(testSlider) {
			testSlider.slider('destroy');
			testSlider = null;
		}
	});
});

/**
 * The mouse navigation tests are based on the following slider properties:
 * 
 * initial value: 3 or [3, 7]
 * ticks: [0, 3, 5, 7, 10]
 * step: 0.1
 * 
 * When the values are in the range from 0 to 10 and the step is 0.1, every value
 * can be represented as 1% of the range. For example, 5.5 is 55% and 5.6 is 56%. 
 * This makes it easier to test the behaviour of tick locking.
 * 
 * The mouse clicks are based on a percentage that represents where the user clicked
 * on the slider (60% = 6.0). The percentage is then used to calculate the coordinates
 * for the mouse events (mousedown, mousemove, and mouseup).
 * 
 * These tests are setup to test for all combinations of relevant slider configurations:
 * single/range, horizontal/vertical orientation, LTR/RTL, and ordered/reversed.
 * The tests also check that the handles have the correct positioning, which should
 * match the ticks that the handles lock to.
 * 
 * The test data was carefully chosen based on following the test logic below.
 * 
 * The test logic for sliders:
 * - Clicking to the left of the handle should not change its value
 * - Clicking to the left of the handle should change its value and lock to another tick
 * - Ditto for clicking to the right of the handle
 * 
 * For range sliders, the same logic is applied except test both handle1 and handle2.
 */
describe("`lock_to_ticks: true` mouse navigation test cases", function() {
	var initialValue = 3;
	var initialRangeValues = [3, 7];
	var tickValues = [0, 3, 5, 7, 10];
	// Quick lookup from value to index
	var tickIndexes = {0: 0, 3: 1, 5: 2, 7: 3, 10: 4};
	var stepValue = 0.1;

	var orientations = ['horizontal', 'vertical'];
	var reversed = [false, true];
	var sliderTypes = ['single', 'range'];
	var rtl = [false, true];
	var testCases = [];
	var mouseEventArguments;

	function calcMouseEventCoords(sliderElem, orientation, per) {
		var sliderBB = sliderElem.getBoundingClientRect();

		if (orientation === 'horizontal') {
			return {
				clientX: sliderBB.left + (sliderElem.offsetWidth * per / 100),
				clientY: sliderBB.top
			};
		}
		else if (orientation === 'vertical') {
			return {
				clientX: sliderBB.left,
				clientY: sliderBB.top + (sliderElem.offsetHeight * per / 100)
			};
		}
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

	function createMouseEvent(type, clientX, clientY) {
		var mouseEvent = document.createEvent('MouseEvent');
		mouseEventArguments[0] = type;
		mouseEventArguments[7] = clientX;
		mouseEventArguments[8] = clientY;
		mouseEvent.initMouseEvent.apply(mouseEvent, mouseEventArguments);
		return mouseEvent;
	}

	var mouseTestData = {
		single: {
			testData: [{
				willChange: false,
				expectedValue: initialValue,
				percent: 20
			}, {
				willChange: true,
				expectedValue: 0,
				percent: 10
			}, {
				willChange: false,
				expectedValue: initialValue,
				percent: 40
			}, {
				willChange: true,
				expectedValue: 5,
				percent: 45
			}],

			// Modify test data for RTL and reversed situations.
			altTestData: [{
				willChange: false,
				expectedValue: initialValue,
				percent: 80
			}, {
				willChange: true,
				expectedValue: 0,
				percent: 90
			}, {
				willChange: false,
				expectedValue: initialValue,
				percent: 60
			}, {
				willChange: true,
				expectedValue: 5,
				percent: 55
			}],
		},

		range: {
			testData: [{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 20
			}, {
				willChange: true,
				expectedValue: [0, 7],
				percent: 10
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 40
			}, {
				willChange: true,
				expectedValue: [5, 7],
				percent: 45
			},
			// More test data that will affect handle2
			{
				willChange: true,
				expectedValue: [3, 5],
				percent: 60
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 65
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 80
			}, {
				willChange: true,
				expectedValue: [3, 10],
				percent: 90
			}],

			// Modify test data for RTL and reversed situations.
			// Here, the order of the ticks matter when locking a handle to a tick
			// when there are two ticks that are equal in distance to lock to.
			altTestData: [{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 20
			}, {
				willChange: true,
				expectedValue: [3, 10],
				percent: 10
			}, {
				willChange: true,
				expectedValue: [3, 5],
				percent: 40
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 35
			},
			// More test data that will affect handle2
			{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 60
			}, {
				willChange: true,
				expectedValue: [5, 7],
				percent: 55
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 80
			}, {
				willChange: true,
				expectedValue: [0, 7],
				percent: 90
			}],
		}
	};

	sliderTypes.forEach(function(sliderType) {
		orientations.forEach(function(orientation) {
			rtl.forEach(function(isRTL) {
				reversed.forEach(function(isReversed) {
					var isHorizontal = orientation === 'horizontal';
					var isVertical = orientation === 'vertical';
					var isRange = sliderType === 'range';
					var whichData;
					var whichStyle;

					whichData = mouseTestData[sliderType].testData;

					if (isHorizontal) {
						// XOR
						// One or the other needs to be true
						if ((isRTL && !isReversed) || (isReversed && !isRTL)) {
							whichData = mouseTestData[sliderType].altTestData;
						}
					}
					else if (isVertical) {
						if (isReversed) {
							whichData = mouseTestData[sliderType].altTestData;
						}
					}

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
						testData: whichData,
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
			var $handle1;
			var $handle2;
			var sliderId;
			var sliderOptions;
			var $tick1;
			var $tick2;
			var $ticks;

			beforeEach(function() {
				sliderId = testCase.range ? 'myRangeSlider' : 'mySlider';

				sliderOptions = {
					id: sliderId,
					step: testCase.step,
					orientation: testCase.orientation,
					value: testCase.value,
					range: testCase.range,
					lock_to_ticks: true,
					reversed: testCase.reversed,
					rtl: 'auto',
					ticks: tickValues,
				};
			});

			afterEach(function() {
				if ($testSlider) {
					$testSlider.slider('destroy');
					$testSlider = null;
				}
			});

			testCase.testData.forEach(function(testData) {
				it("Should snap to closest tick (percent=" + testData.percent + ", changed=" + testData.willChange + ")", function(done) {
					$testSlider = $('#'+testCase.inputId).slider(sliderOptions);
					var sliderElem = $('#'+sliderId)[0];
					$ticks = $('#'+sliderId).find('.slider-tick');
					$handle1 = $('#'+sliderId).find('.slider-handle:first');
					$handle2 = $('#'+sliderId).find('.slider-handle:last');

					var coords = calcMouseEventCoords(sliderElem, testCase.orientation, testData.percent);

					var checkMouseMove = function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
						if (testCase.range) {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue[0]]);
							$tick2 = $ticks.eq(tickIndexes[testData.expectedValue[1]]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
							expect($handle2.css(testCase.stylePos)).toBe($tick2.css(testCase.stylePos));
						}
						else {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
						}
					};

					var checkMouseUp = function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
						if (testCase.range) {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue[0]]);
							$tick2 = $ticks.eq(tickIndexes[testData.expectedValue[1]]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
							expect($handle2.css(testCase.stylePos)).toBe($tick2.css(testCase.stylePos));
						}
						else {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
						}

						document.removeEventListener('mousemove', checkMouseMove, false);
						document.removeEventListener('mouseup', checkMouseUp, false);
						done();
					};

					sliderElem.addEventListener('mousedown', function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
						// Check position of handles
						if (testCase.range) {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue[0]]);
							$tick2 = $ticks.eq(tickIndexes[testData.expectedValue[1]]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
							expect($handle2.css(testCase.stylePos)).toBe($tick2.css(testCase.stylePos));
						}
						else {
							$tick1 = $ticks.eq(tickIndexes[testData.expectedValue]);
							expect($handle1.css(testCase.stylePos)).toBe($tick1.css(testCase.stylePos));
						}

						document.addEventListener('mousemove', checkMouseMove, false);
						document.addEventListener('mouseup', checkMouseUp, false);
					});

					sliderElem.dispatchEvent(createMouseEvent('mousedown', coords.clientX, coords.clientY));
					document.dispatchEvent(createMouseEvent('mousemove', coords.clientX, coords.clientY));
					document.dispatchEvent(createMouseEvent('mouseup', coords.clientX, coords.clientY));
				});
			});
		});
	});
});

/**
 * The keyboard navigation tests are based on the following slider properties:
 * 
 * initial value: 3 or [3, 7]
 * ticks: [0, 3, 5, 7, 10]
 * step: 0.1
 * 
 * See description for mouse navigation tests for explanation for test setup values.
 * 
 * These tests are setup to test for all combinations of relevant slider configurations:
 * single/range, horizontal/vertical orientation, LTR/RTL, natural keys navigation,
 * ordered/reversed, and all key presses (left, up, right, down).
 * 
 * The test data is fairly straightforward and passes most configurations except for
 * special cases when using natural key navigation. For these cases, the test data
 * had to be 'inverted'. For example, the test data had to be inverted when the
 * slider has a horizontal orientation with either RTL or reversed option set (but not both).
 * 
 * The test logic for sliders:
 * - Key to the left should change the value and lock to the tick to the left
 * - Key to the right should change the value and lock to the tick to the right
 * 
 * For range sliders, the same logic is applied except test both handle1 and handle2.
 */
describe("`lock_to_ticks: true` keyboard navigation test cases", function() {
	var initialValue = 3;
	var initialRangeValues = [3, 7];
	var tickValues = [0, 3, 5, 7, 10];
	var stepValue = 0.1;
	var keyData = {
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	var keys = ['left', 'up', 'right', 'down'];
	var orientations = ['horizontal', 'vertical'];
	var reversed = [false, true];
	var naturalKeys = [false, true];
	var ranged = [false, true];
	var rtl = [false, true];
	var rangeHandles = ['handle1', 'handle2'];
	var testCases = [];

	orientations.forEach(function(orientation) {
		ranged.forEach(function(isRange) {
			rtl.forEach(function(isRTL) {
				naturalKeys.forEach(function(isNatural) {
					reversed.forEach(function(isReversed) {
						testCases.push({
							value: isRange ? initialRangeValues : initialValue,
							step: stepValue,
							range: isRange,
							orientation: orientation,
							reversed: isReversed,
							rtl: 'auto',
							natural_arrow_keys: isNatural,
							isRTL: isRTL,
							inputId: isRTL ? 'rtlSlider' : 'testSlider1',
						});
					});
				});
			});
		});
	});

	testCases.forEach(function(testCase) {
		var handles = testCase.range ? rangeHandles : ['handle1'];

		describe("orientation=" + testCase.orientation + ", range=" + testCase.range + ", rtl=" + testCase.isRTL +
			", natural_arrow_keys=" + testCase.natural_arrow_keys +
			", reversed=" + testCase.reversed, function() {
			var $testSlider;
			var $handle;
			var keyboardEvent;
			var sliderId;
			var sliderOptions;

			beforeEach(function() {
				sliderId = testCase.range ? 'myRangeSlider' : 'mySlider';

				sliderOptions = {
					id: sliderId,
					step: testCase.step,
					orientation: testCase.orientation,
					value: testCase.value,
					range: testCase.range,
					lock_to_ticks: true,
					reversed: testCase.reversed,
					rtl: 'auto',
					natural_arrow_keys: testCase.natural_arrow_keys,
					ticks: tickValues,
				};

				// Create keyboard event
				keyboardEvent = document.createEvent('Event');
				keyboardEvent.initEvent('keydown', true, true);
			});

			afterEach(function() {
				keyboardEvent = null;
				if ($testSlider) {
					$testSlider.slider('destroy');
					$testSlider = null;
				}
			});

			handles.forEach(function(handleKey) {
				keys.forEach(function(key) {
					var isHorizontal = testCase.orientation === 'horizontal';
					var isVertical = testCase.orientation === 'vertical';
					var isRange = testCase.range;
					var isRTL = testCase.isRTL;
					var isReversed = testCase.reversed;
					var isNatural = testCase.natural_arrow_keys;

					var testData = {
						keyCode: keyData[key],
						handle1: {
							expectedValue: null
						},
						handle2: {
							expectedValue: null
						}
					};

					if (isRange) {
						// If initial value is [3, 7] Then
						// These expected values will pass 96/128 tests (32 failures)
						if (key === 'left' || key === 'down') {
							testData.handle1.expectedValue = [0, 7];
							testData.handle2.expectedValue = [3, 5];
						}
						else if (key === 'right' || key === 'up') {
							testData.handle1.expectedValue = [5, 7];
							testData.handle2.expectedValue = [3, 10];
						}

						// Special cases when using natural keys
						if (isNatural) {
							if ((isHorizontal && isReversed && !isRTL) ||
								(isHorizontal && isRTL && !isReversed) ||
								(isVertical && !isReversed))
							{
								if (key === 'left' || key === 'down') {
									testData.handle1.expectedValue = [5, 7];
									testData.handle2.expectedValue = [3, 10];
								}
								else if (key === 'right' || key === 'up') {
									testData.handle1.expectedValue = [0, 7];
									testData.handle2.expectedValue = [3, 5];
								}
							}
						}
					}
					else {
						// If initial value is 3 Then
						// These expected values will pass 48/64 tests (16 failures)
						if (key === 'left' || key === 'down') {
							testData.handle1.expectedValue = 0;
						}
						else if (key === 'right' || key === 'up') {
							testData.handle1.expectedValue = 5;
						}

						// Special cases when using natural keys
						if (isNatural) {
							// XOR
							// One or the other needs to be true
							if ((isHorizontal && isReversed && !isRTL) ||
								(isHorizontal && isRTL && !isReversed) ||
								(isVertical && !isReversed))
							{
								if (key === 'left' || key === 'down') {
									testData.handle1.expectedValue = 5;
								}
								else if (key === 'right' || key === 'up') {
									testData.handle1.expectedValue = 0;
								}
							}
						}
					}

					it("Should lock to tick (" + handleKey + ", key=" + key + ")", function(done) {
						$testSlider = $('#'+testCase.inputId).slider(sliderOptions);

						$handle = $('#'+sliderId).find('.slider-handle:' + (handleKey === 'handle1' ? 'first' : 'last'));

						$handle.on('keydown', function() {
							var value = $testSlider.slider('getValue');
							expect(value).toEqual(testData[handleKey].expectedValue);
							done();
						});

						keyboardEvent.keyCode = keyboardEvent.which = testData.keyCode;
						$handle[0].dispatchEvent(keyboardEvent);
					});
				});
			});
		});
	});
});