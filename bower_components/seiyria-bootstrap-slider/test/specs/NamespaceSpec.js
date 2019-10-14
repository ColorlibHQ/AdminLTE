describe("Namespace Tests", function() {
  var sourceJS = "temp/bootstrap-slider.js";
  var defaultNamespace = 'slider';
  var alternateNamespace = 'bootstrapSlider';

  it("should always set the plugin namespace to 'bootstrapSlider'", function(done) {
    $.getScript(sourceJS, function() {
      expect($.fn.bootstrapSlider).toBeDefined();
      done();   
    });
  });

  it("should set the plugin namespace to 'slider' if the namespace is available", function(done) {
    $.getScript(sourceJS, function() {
      expect($.fn.slider).toBeDefined();
      done();
    });
  });

  it("should print a console warning if the 'slider' namespace is already bound", function(done) {
    $.fn.slider = function() {};
    spyOn(window.console, "warn");

    $.getScript(sourceJS, function() {
      var expectedWarningMessage = "bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.";
      expect(window.console.warn).toHaveBeenCalledWith(expectedWarningMessage);
      done();
    });
  });

  it("Should not create instance when 'slider' namespace is in use", function(done) {
    $.fn.slider = function() {};  // Overwrite temporarily

    $.getScript(sourceJS, function() {
      var $testSlider = $('#testSlider1').bootstrapSlider();

      var sliderInst = $testSlider.data(defaultNamespace);
      expect(sliderInst).toBeUndefined();

      $testSlider.bootstrapSlider('destroy');

      done();
    });
  });

  it("Should create instance associated with the alternate 'bootstrapSlider' namespace", function(done) {
    $.fn.slider = function() {};

    $.getScript(sourceJS, function() {
      var $testSlider = $('#testSlider1').bootstrapSlider();

      var sliderInst = $testSlider.data(alternateNamespace);
      expect(sliderInst).toBeTruthy();

      $testSlider.bootstrapSlider('destroy');

      done();
    });
  });

  afterEach(function(done) {
    /*
      Set the namespaces back to undefined and reload slider
      So that namespace is returned to $.fn.slider
    */
    $.fn.bootstrapSlider = undefined;
    $.fn.slider = undefined;

    $.getScript(sourceJS, function() {
      done();
    });
  });

});