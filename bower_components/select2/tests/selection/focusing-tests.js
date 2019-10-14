module('Selection containers - Managing focus');

var SingleSelection = require('select2/selection/single');

var $ = require('jquery');
var Options = require('select2/options');

var options = new Options({});

test('close sets the focus to the selection', function (assert) {
  var $container = $('#qunit-fixture .event-container');
  var container = new MockContainer();
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  selection.bind(container, $container);

  selection.update([{
    id: 'test',
    text: 'test'
  }]);

  $container.append($selection);

  assert.notEqual(
    document.activeElement,
    $selection[0],
    'The selection had focus originally'
  );

  container.trigger('close');

  assert.equal(
    document.activeElement,
    $selection[0],
    'After close, focus must be set to selection'
  );
});
