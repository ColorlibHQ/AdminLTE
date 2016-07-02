(function() {
  var OUTPUT_HTML, SETUP_JS, activate, deactivate, getOutput, init, run, setupBlock, tethers, uniqueId;

  uniqueId = Tether.Utils.uniqueId;

  SETUP_JS = "yellowBox = $('.yellow-box', $output);\ngreenBox = $('.green-box', $output);\nscrollBox = $('.scroll-box', $output);";

  OUTPUT_HTML = function(key) {
    return "<div class=\"scroll-box\">\n  <div class=\"scroll-content\">\n    <div class=\"yellow-box\" data-example=\"" + key + "\"></div>\n    <div class=\"green-box\" data-example=\"" + key + "\"></div>\n  </div>\n</div>";
  };

  tethers = {};

  getOutput = function($block) {
    var key;
    key = $block.data('example');
    if (key && typeof key === 'string') {
      return $("output[data-example='" + key + "']");
    } else {
      return $block.parents('pre').nextAll('output').first();
    }
  };

  run = function(key) {
    var $block, $output, code;
    if (typeof key === 'string') {
      $block = $("code[data-example='" + key + "']");
    } else {
      $block = key;
    }
    key = $block.attr('data-example');
    $output = getOutput($block);
    code = $block.text();
    code = SETUP_JS + code;
    window.$output = $output;
    return tethers[key] = eval(code);
  };

  setupBlock = function($block) {
    var $output, $scrollBox, $scrollContent, key;
    key = $block.data('example');
    $output = getOutput($block);
    if (!key) {
      key = uniqueId();
      $block.attr('data-example', key);
      $output.attr('data-example', key);
      $output.find('.tether-element').attr('data-example', key);
    }
    $output.html(OUTPUT_HTML(key));
    $scrollBox = $output.find('.scroll-box');
    $scrollContent = $scrollBox.find('.scroll-content');
    $scrollBox.scrollTop(parseInt($scrollContent.css('height')) / 2 - $scrollBox.height() / 2);
    $scrollBox.scrollLeft(parseInt($scrollContent.css('width')) / 2 - $scrollBox.width() / 2);
    setTimeout(function() {
      return $scrollBox.on('scroll', function() {
        return $output.addClass('scrolled');
      });
    });
    $scrollBox.css('height', "" + ($block.parent().outerHeight()) + "px");
    if ($output.attr('deactivated') == null) {
      return run($block);
    }
  };

  $(document.body).on('click', function(e) {
    if ($(e.target).is('output[deactivated]')) {
      activate($(e.target));
      return false;
    } else if ($(e.target).is('output[activated]')) {
      deactivate($(e.target));
      return false;
    }
  });

  activate = function($output) {
    var $block, key;
    $block = $output.prev().find('code');
    run($block);
    $output.find('.tether-element').show();
    key = $output.data('example');
    $(tethers[key].element).show();
    tethers[key].enable();
    $output.removeAttr('deactivated');
    return $output.attr('activated', true);
  };

  deactivate = function($output) {
    var $block, $el, key;
    $block = $output.prev().find('code');
    key = $output.data('example');
    tethers[key].disable();
    $el = $(tethers[key].element);
    $el.detach();
    $output.find('.scroll-content').append($el);
    $el.hide();
    $output.removeAttr('activated');
    return $output.attr('deactivated', true);
  };

  init = function() {
    var $blocks, block, _i, _len, _results;
    $blocks = $('code[data-example]');
    _results = [];
    for (_i = 0, _len = $blocks.length; _i < _len; _i++) {
      block = $blocks[_i];
      _results.push(setupBlock($(block)));
    }
    return _results;
  };

  window.EXECUTR_OPTIONS = {
    codeSelector: 'code[executable]'
  };

  $(init);

}).call(this);
