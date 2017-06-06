// JavaScript source code
(function () {
  if (typeof angular === 'undefined') {
    return;
  }
  angular.module('bsTable', []).directive('bsTableControl', function () {
    var CONTAINER_SELECTOR = '.bootstrap-table';
    var SCROLLABLE_SELECTOR = '.fixed-table-body';
    var SEARCH_SELECTOR = '.search input';
    var bsTables = {};
    function getBsTable (el) {
      var result;
      $.each(bsTables, function (id, bsTable) {
        if (!bsTable.$el.closest(CONTAINER_SELECTOR).has(el).length) return;
        result = bsTable;
        return true;
      });
      return result;
    }

    $(window).resize(function () {
      $.each(bsTables, function (id, bsTable) {
        bsTable.$el.bootstrapTable('resetView');
      });
    });
    function onScroll () {
      var bsTable = this;
      var state = bsTable.$s.bsTableControl.state;
      bsTable.$s.$applyAsync(function () {
        state.scroll = bsTable.$el.bootstrapTable('getScrollPosition');
      });
    }
    $(document)
      .on('post-header.bs.table', CONTAINER_SELECTOR+' table', function (evt) { // bootstrap-table calls .off('scroll') in initHeader so reattach here
        var bsTable = getBsTable(evt.target);
        if (!bsTable) return;
        bsTable.$el
          .closest(CONTAINER_SELECTOR)
          .find(SCROLLABLE_SELECTOR)
          .on('scroll', onScroll.bind(bsTable));
      })
      .on('sort.bs.table', CONTAINER_SELECTOR+' table', function (evt, sortName, sortOrder) {
        var bsTable = getBsTable(evt.target);
        if (!bsTable) return;
        var state = bsTable.$s.bsTableControl.state;
        bsTable.$s.$applyAsync(function () {
          state.sortName = sortName;
          state.sortOrder = sortOrder;
        });
      })
      .on('page-change.bs.table', CONTAINER_SELECTOR+' table', function (evt, pageNumber, pageSize) {
        var bsTable = getBsTable(evt.target);
        if (!bsTable) return;
        var state = bsTable.$s.bsTableControl.state;
        bsTable.$s.$applyAsync(function () {
          state.pageNumber = pageNumber;
          state.pageSize = pageSize;
        });
      })
      .on('search.bs.table', CONTAINER_SELECTOR+' table', function (evt, searchText) {
        var bsTable = getBsTable(evt.target);
        if (!bsTable) return;
        var state = bsTable.$s.bsTableControl.state;
        bsTable.$s.$applyAsync(function () {
          state.searchText = searchText;
        });
      })
      .on('focus blur', CONTAINER_SELECTOR+' '+SEARCH_SELECTOR, function (evt) {
        var bsTable = getBsTable(evt.target);
        if (!bsTable) return;
        var state = bsTable.$s.bsTableControl.state;
        bsTable.$s.$applyAsync(function () {
          state.searchHasFocus = $(evt.target).is(':focus');
        });
      });

    return {
      restrict: 'EA',
      scope: {bsTableControl: '='},
      link: function ($s, $el) {
        var bsTable = bsTables[$s.$id] = {$s: $s, $el: $el};
        $s.instantiated = false;
        $s.$watch('bsTableControl.options', function (options) {
          if (!options) options = $s.bsTableControl.options = {};
          var state = $s.bsTableControl.state || {};

          if ($s.instantiated) $el.bootstrapTable('destroy');
          $el.bootstrapTable(angular.extend(angular.copy(options), state));
          $s.instantiated = true;

          // Update the UI for state that isn't settable via options
          if ('scroll' in state) $el.bootstrapTable('scrollTo', state.scroll);
          if ('searchHasFocus' in state) $el.closest(CONTAINER_SELECTOR).find(SEARCH_SELECTOR).focus(); // $el gets detached so have to recompute whole chain
        }, true);
        $s.$watch('bsTableControl.state', function (state) {
          if (!state) state = $s.bsTableControl.state = {};
          $el.trigger('directive-updated.bs.table', [state]);
        }, true);
        $s.$on('$destroy', function () {
          delete bsTables[$s.$id];
        });
      }
    };
  })
})();
