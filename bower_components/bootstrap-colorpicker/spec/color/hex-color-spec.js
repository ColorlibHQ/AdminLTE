var Color = require("../../src/js/colorpicker-color.js");

it("should return color in raw format", function(){
  var color = new Color('aabbcc');
  expect(color.toHex(true)).toEqual("#aabbcc");
});

it("should return color formatted", function(){
  var color = new Color('aabbcc');
  expect(color.toHex()).toEqual("aabbcc");
});
