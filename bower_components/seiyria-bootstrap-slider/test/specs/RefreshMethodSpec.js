describe("refresh() Method Tests", function() {
  var testSlider;
  var $testSlider;
  var options;
  var initialValue, initialRangeValue;
  var newValue, newRangeValue;

  beforeEach(function() {
    initialValue = 5;
    initialRangeValue = [4, 5];
    newValue = 7;
    newRangeValue = [7, 10];

    options = {
      id: 'mySlider',
      min: 0,
      max: 10,
      step: 1,
      value: initialValue
    };
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.destroy();
      testSlider = null;
    }
    if ($testSlider) {
      $testSlider.slider('destroy');
      $testSlider = null;
    }
  });

  it("does not convert a non-range slider into a range slider when invoked", function() {
  	// Initialize non-range slider
  	testSlider = new Slider("#testSlider1", {
      min: 0,
      max: 10,
      value: 5
    });

    // Assert that slider is non-range slider
    var initialValue = testSlider.getValue();
    var sliderIsRangeValue = initialValue instanceof Array;

    expect(sliderIsRangeValue).toBeFalsy();

    // Invoke refresh() method
    testSlider.refresh();

    // Assert that slider remains a non-range slider
    var afterRefreshValue = testSlider.getValue();
    sliderIsRangeValue = afterRefreshValue instanceof Array;

    expect(sliderIsRangeValue).toBeFalsy();
  });

  it("should reset slider to its default value on refresh", function() {
    // Initialize non-range slider
    testSlider = new Slider('#testSlider1', options);

    testSlider.setValue(newValue, true, true);
    testSlider.refresh();

    expect(testSlider.getValue()).toBe(initialValue);
  });

  it("should maintain its current value on refresh", function() {
    // Initialize non-range slider
    testSlider = new Slider('#testSlider1', options);

    testSlider.setValue(newValue, true, true);
    testSlider.refresh({ useCurrentValue: true });

    expect(testSlider.getValue()).toBe(newValue);
  });

  it("should reset slider to its default value on refresh (jQuery)", function() {
    // Initialize non-range slider
    $testSlider = $('#testSlider1').slider(options);

    $testSlider.slider('setValue', newValue, true, true);
    $testSlider.slider('refresh');

    expect($testSlider.slider('getValue')).toBe(initialValue);
  });

  it("should maintain its current value on refresh (jQuery)", function() {
    // Initialize non-range slider
    $testSlider = $('#testSlider1').slider(options);

    $testSlider.slider('setValue', newValue, true, true);
    $testSlider.slider('refresh', { useCurrentValue: true });

    expect($testSlider.slider('getValue')).toBe(newValue);
  });

  it("should reset slider to its default value on refresh (range)", function() {
    // Initialize range slider
    options.value = initialRangeValue;
    options.range = true;
    testSlider = new Slider('#testSlider1', options);

    testSlider.setValue(newRangeValue, true, true);
    testSlider.refresh();

    expect(testSlider.getValue()).toBe(initialRangeValue);
  });

  it("should maintain its current value on refresh (range)", function() {
    // Initialize range slider
    options.value = initialRangeValue;
    options.range = true;
    testSlider = new Slider('#testSlider1', options);

    testSlider.setValue(newRangeValue, true, true);
    testSlider.refresh({ useCurrentValue: true });

    expect(testSlider.getValue()).toBe(newRangeValue);
  });

}); // End of spec