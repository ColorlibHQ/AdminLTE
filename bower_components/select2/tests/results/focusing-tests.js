module('Results - highlighting results');

test('results:all with no data skips results:focus', function (assert) {
  assert.expect(0);

  var $ = require('jquery');

  var $select = $('<select></select>');
  var $parent = $('<div></div>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  $parent.appendTo($('#qunit-fixture'));
  $select.appendTo($parent);

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');

  var results = new Results($select, new Options({}));

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  results.render();

  results.bind(container, $container);

  results.on('results:focus', function (params) {
    assert.ok(false, 'The results:focus event was triggered');
  });

  container.trigger('results:all', {
    data: {
      results: []
    }
  });
});

test('results:all triggers results:focus on the first item', function (assert) {
  assert.expect(2);

  var $ = require('jquery');

  var $select = $('<select></select>');
  var $parent = $('<div></div>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  $parent.appendTo($('#qunit-fixture'));
  $select.appendTo($parent);

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');

  var results = new Results($select, new Options({}));

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  results.render();

  results.bind(container, $container);

  results.on('results:focus', function (params) {
    assert.equal(params.data.id, 'test');
    assert.equal(params.data.text, 'Test');
  });

  container.trigger('results:all', {
    data: {
      results: [
        {
          id: 'test',
          text: 'Test'
        }
      ]
    }
  });
});

test('results:append does not trigger results:focus', function (assert) {
  assert.expect(0);

  var $ = require('jquery');

  var $select = $('<select></select>');
  var $parent = $('<div></div>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  $parent.appendTo($('#qunit-fixture'));
  $select.appendTo($parent);

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');

  var results = new Results($select, new Options({}));

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  results.render();

  results.bind(container, $container);

  results.on('results:focus', function () {
    assert.ok(false, 'The results:focus event was triggered');
  });

  container.trigger('results:append', {
    data: {
      results: [
        {
          id: 'test',
          text: 'Test'
        }
      ]
    }
  });
});

test('scrollAfterSelect triggers results:focus', function (assert) {
  assert.expect(3);

  var $ = require('jquery');

  var $select = $('<select></select>');
  var $parent = $('<div></div>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  $parent.appendTo($('#qunit-fixture'));
  $select.appendTo($parent);

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');

  var options = new Options({ scrollAfterSelect: true });
  var results = new Results($select, options);

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  results.render();

  results.bind(container, $container);

  // check that default for scrollAfterSelect is true
  assert.equal(options.get('scrollAfterSelect'), true);

  results.append({
    results: [
      {
        id: 'test',
        text: 'Test'
      }
    ]
  });

  results.on('results:focus', function (params) {
    assert.equal(params.data.id, 'test');
    assert.equal(params.data.text, 'Test');
  });

  container.trigger('select', {});
});

test('!scrollAfterSelect does not trigger results:focus', function (assert) {
  assert.expect(1);

  var $ = require('jquery');

  var $select = $('<select></select>');
  var $parent = $('<div></div>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  $parent.appendTo($('#qunit-fixture'));
  $select.appendTo($parent);

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');

  var options = new Options({ scrollAfterSelect: false });
  var results = new Results($select, options);

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  results.render();

  results.bind(container, $container);

  // check that default for scrollAfterSelect is false
  assert.equal(options.get('scrollAfterSelect'), false);

  results.append({
    results: [
      {
        id: 'test',
        text: 'Test'
      }
    ]
  });

  results.on('results:focus', function () {
    assert.ok(false, 'The results:focus event was triggered');
  });

  container.trigger('select', {});
});
