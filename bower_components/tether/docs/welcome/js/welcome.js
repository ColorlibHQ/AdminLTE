(function() {
  var init, isMobile, setupBrowserDemo, setupHero, _Drop;

  _Drop = Drop.createContext({
    classPrefix: 'tether'
  });

  isMobile = $(window).width() < 567;

  init = function() {
    setupHero();
    return setupBrowserDemo();
  };

  setupHero = function() {
    var $target, finalDropState, frameLengthMS, frames, openAllDrops, openIndex, openNextDrop, position, positions, _i, _len;
    $target = $('.tether-target-demo');
    positions = ['top left', 'left top', 'left middle', 'left bottom', 'bottom left', 'bottom center', 'bottom right', 'right bottom', 'right middle', 'right top', 'top right', 'top center'];
    if (isMobile) {
      positions = ['top left', 'bottom left', 'bottom right', 'top right'];
    }
    window.drops = {};
    for (_i = 0, _len = positions.length; _i < _len; _i++) {
      position = positions[_i];
      drops[position] = new _Drop({
        target: $target[0],
        classes: 'tether-theme-arrows-dark',
        position: position,
        constrainToWindow: false,
        openOn: '',
        content: '<div style="height: 50px; width: 50px"></div>'
      });
    }
    openIndex = 0;
    frames = 0;
    frameLengthMS = 10;
    openAllDrops = function() {
      var drop, _results;
      _results = [];
      for (position in drops) {
        drop = drops[position];
        _results.push(drop.open());
      }
      return _results;
    };
    openNextDrop = function() {
      var drop;
      for (position in drops) {
        drop = drops[position];
        drop.close();
      }
      drops[positions[openIndex]].open();
      drops[positions[(openIndex + 6) % positions.length]].open();
      openIndex = (openIndex + 1) % positions.length;
      if (frames > 5) {
        finalDropState();
        return;
      }
      frames += 1;
      return setTimeout(openNextDrop, frameLengthMS * frames);
    };
    finalDropState = function() {
      $(drops['top left'].dropContent).html('Marrying DOM elements for life.');
      $(drops['bottom right'].dropContent).html('<a class="button" href="http://github.com/HubSpot/tether">★ On Github</a>');
      drops['top left'].open();
      return drops['bottom right'].open();
    };
    if (true || isMobile) {
      drops['top left'].open();
      drops['top left'].tether.position();
      drops['bottom right'].open();
      drops['bottom right'].tether.position();
      return finalDropState();
    } else {
      return openNextDrop();
    }
  };

  setupBrowserDemo = function() {
    var $browserContents, $browserDemo, $iframe, $sections, $startPoint, $stopPoint, scrollInterval, scrollTop, scrollTopDirection, setSection;
    $browserDemo = $('.browser-demo.showcase');
    $startPoint = $('.browser-demo-start-point');
    $stopPoint = $('.browser-demo-stop-point');
    $iframe = $('.browser-window iframe');
    $browserContents = $('.browser-content .browser-demo-inner');
    $sections = $('.browser-demo-section');
    $('body').append("<style>\n    table.showcase.browser-demo.fixed-bottom {\n        top: " + $sections.length + "00%\n    }\n</style>");
    $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(window).scrollTop();
      if ($startPoint.position().top < scrollTop && scrollTop + window.innerHeight < $stopPoint.position().top) {
        $browserDemo.removeClass('fixed-bottom');
        $browserDemo.addClass('fixed');
        return $sections.each(function() {
          var $section;
          $section = $(this);
          if (($section.position().top < scrollTop && scrollTop < $section.position().top + $section.outerHeight())) {
            setSection($section.data('section'));
          }
          return true;
        });
      } else {
        $browserDemo.removeAttr('data-section');
        $browserDemo.removeClass('fixed');
        if (scrollTop + window.innerHeight > $stopPoint.position().top) {
          return $browserDemo.addClass('fixed-bottom');
        } else {
          return $browserDemo.removeClass('fixed-bottom');
        }
      }
    });
    $iframe.load(function() {
      var $items, iframeWindow;
      iframeWindow = $iframe[0].contentWindow;
      $items = $iframe.contents().find('.item');
      return $items.each(function(i) {
        var $item, drop, _iframeWindowDrop;
        $item = $(this);
        _iframeWindowDrop = iframeWindow.Drop.createContext({
          classPrefix: 'tether'
        });
        drop = new _iframeWindowDrop({
          target: $item[0],
          classes: 'tether-theme-arrows-dark',
          position: 'right top',
          constrainToWindow: true,
          openOn: 'click',
          content: '<ul>\n    <li>Action&nbsp;1</li>\n    <li>Action&nbsp;2</li>\n    <li>Action&nbsp;3</li>\n</ul>'
        });
        return $item.data('drop', drop);
      });
    });
    scrollInterval = void 0;
    scrollTop = 0;
    scrollTopDirection = 1;
    return setSection = function(section) {
      var closeAllItems, openExampleItem, scrollLeftSection, stopScrollingLeftSection;
      $browserDemo.attr('data-section', section);
      $('.section-copy').removeClass('active');
      $(".section-copy[data-section=\"" + section + "\"]").addClass('active');
      openExampleItem = function() {
        if (isMobile) {
          return $iframe.contents().find('.item:first').data().drop.open();
        } else {
          return $iframe.contents().find('.item:eq(2)').data().drop.open();
        }
      };
      closeAllItems = function() {
        return $iframe.contents().find('.item').each(function() {
          return $(this).data().drop.close() || true;
        });
      };
      scrollLeftSection = function() {
        return scrollInterval = setInterval(function() {
          $iframe.contents().find('.left').scrollTop(scrollTop);
          scrollTop += scrollTopDirection;
          if (scrollTop > 50) {
            scrollTopDirection = -1;
          }
          if (scrollTop < 0) {
            return scrollTopDirection = 1;
          }
        }, 30);
      };
      stopScrollingLeftSection = function() {
        return clearInterval(scrollInterval);
      };
      switch (section) {
        case 'what':
          closeAllItems();
          openExampleItem();
          return stopScrollingLeftSection();
        case 'how':
          closeAllItems();
          openExampleItem();
          stopScrollingLeftSection();
          return scrollLeftSection();
        case 'why':
          closeAllItems();
          openExampleItem();
          stopScrollingLeftSection();
          return scrollLeftSection();
        case 'outro':
          closeAllItems();
          openExampleItem();
          return stopScrollingLeftSection();
      }
    };
  };

  init();

}).call(this);
