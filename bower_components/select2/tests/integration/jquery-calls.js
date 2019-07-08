module('select2(val)');

var Utils = require('select2/utils');

test('multiple elements with arguments works', function (assert) {
  var $ = require('jquery');
  require('jquery.select2');

  var $first = $(
    '<select>' +
      '<option>1</option>' +
      '<option>2</option>' +
    '</select>'
  );
  var $second = $first.clone();

  var $both = $first.add($second);
  $both.select2();

  $both.select2('val', '2');

  assert.equal(
    $first.val(),
    '2',
    'The call should change the value on the first element'
  );
  assert.equal(
    $second.val(),
    '2',
    'The call should also change the value on the second element'
  );
});

test('initializes when jQuery $.data contains' +
  ' cyclic reference', function (assert) {
  var $ = require('jquery');
  require('jquery.select2');

  var $select = $(
    '<select>' +
      '<option>One</option>' +
      '<option>Two</option>' +
      '<option value="3" selected>Three</option>' +
    '</select>'
  );

  // Add a circular reference object using jQuery.
  var recursiveObject = {};

  recursiveObject.same =  recursiveObject;

  $select.data('same', recursiveObject);

  $select.select2();

  assert.equal(
    $select.val(),
    '3',
    'The option value should be pulled correctly'
  );
});

test('$element.data returns instance and options correctly', 
  function (assert) {
  var $ = require('jquery');
  require('jquery.select2');

  var $select = $(
  '<select>' +
    '<option value="1">One</option>' +
    '<option value="2">Two</option>' +
    '<option value="3" selected>Three</option>' +
  '</select>'
  );
  
  // Initialize.
  $select.select2({maximumSelectionLength: 2, multiple: true});
  
  assert.equal(
    $select.val(),
    '3',
    'Only 1 option should be pulled.'
  );

  // Try to resolve instance via .data('select2').
  var $instance = $select.data('select2'); 
  assert.ok($instance);
  assert.ok($instance.options);

  // Ensure $select.data('select2') is the same instance 
  // created by .select2()   
  assert.equal($instance, Utils.GetData($instance.$element[0], 
               'select2'));
   
  // Ensure initialized property matches.
  assert.equal($instance.options.options.maximumSelectionLength,
               2);
});