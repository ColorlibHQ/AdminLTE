module('Results - option');

var $ = require('jquery');

var Options = require('select2/options');

var Results = require('select2/results');

test('disabled property on option is respected - enabled', function (assert) {
  var results = new Results($('<select></select>'), new Options({}));

  var $option = $('<option></option>');
  var option = results.option({
    element: $option[0]
  });

  assert.notEqual(option.getAttribute('aria-disabled'), 'true');
});

test('disabled property on option is respected - disabled', function (assert) {
  var results = new Results($('<select></select>'), new Options({}));

  var $option = $('<option disabled></option>');
  var option = results.option({
    element: $option[0]
  });

  assert.equal(option.getAttribute('aria-disabled'), 'true');
});

test('disabled property on enabled optgroup is respected', function (assert) {
  var results = new Results($('<select></select>'), new Options({}));

  var $option = $('<optgroup></optgroup>');
  var option = results.option({
    element: $option[0]
  });

  assert.notEqual(option.getAttribute('aria-disabled'), 'true');
});

test('disabled property on disabled optgroup is respected', function (assert) {
  var results = new Results($('<select></select>'), new Options({}));

  var $option = $('<optgroup disabled></optgroup>');
  var option = results.option({
    element: $option[0]
  });

  assert.equal(option.getAttribute('aria-disabled'), 'true');
});

test('option in disabled optgroup is disabled', function (assert) {
  var results = new Results($('<select></select>'), new Options({}));

  var $option = $('<optgroup disabled><option></option></optgroup>')
    .find('option');
  var option = results.option({
    element: $option[0]
  });

  assert.equal(option.getAttribute('aria-disabled'), 'true');
});