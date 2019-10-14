module('Results - Infinite scrolling');

test('loadingMore is triggered even without a scrollbar', function (assert) {
  assert.expect(1);

  var $ = require('jquery');

  var $select = $('<select></select>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');
  var InfiniteScroll = require('select2/dropdown/infiniteScroll');

  var InfiniteScrollResults = Utils.Decorate(Results, InfiniteScroll);

  var results = new InfiniteScrollResults($select, new Options({}));

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  $('#qunit-fixture').append(results.render());

  results.bind(container, $container);

  results.on('query:append', function () {
    assert.ok(true, 'It tried to load more immediately');
  });

  container.trigger('results:all', {
    data: {
      results: [
        {
          id: 'test',
          text: 'Test'
        }
      ],
      pagination: {
        more: true
      }
    }
  });
});

test('loadingMore is not triggered without scrolling', function (assert) {
  assert.expect(0);

  var $ = require('jquery');

  var $select = $('<select></select>');

  var $container = $('<span></span>');
  var container = new MockContainer();

  var Utils = require('select2/utils');
  var Options = require('select2/options');

  var Results = require('select2/results');
  var InfiniteScroll = require('select2/dropdown/infiniteScroll');

  var InfiniteScrollResults = Utils.Decorate(Results, InfiniteScroll);

  var results = new InfiniteScrollResults($select, new Options({}));

  // Fake the data adapter for the `setClasses` method
  results.data = {};
  results.data.current = function (callback) {
    callback([{ id: 'test' }]);
  };

  var $results = results.render();

  $('#qunit-fixture').append($results);
  $results.css('max-height', '100px');

  results.bind(container, $container);

  results.on('query:append', function () {
    assert.ok(false, 'It tried to load more immediately');
  });

  container.trigger('results:all', {
    data: {
      results: [
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        },
        {
          id: 'test',
          text: 'Test'
        }
      ],
      pagination: {
        more: true
      }
    }
  });
});
