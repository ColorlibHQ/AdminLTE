require([
  'gitbook',
  'jquery'
], function (gitbook, $) {
  var MAX_DESCRIPTION_SIZE = 500
  var state = gitbook.state
  var INDEX_DATA = {}
  var usePushState = (typeof window.history.pushState !== 'undefined')

  // DOM Elements
  var $body = $('body')
  var $bookSearchResults
  var $searchList
  var $searchTitle
  var $searchResultsCount
  var $searchQuery

  // Throttle search
  function throttle (fn, wait) {
    var timeout

    return function () {
      var ctx = this
      var args = arguments
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null
          fn.apply(ctx, args)
        }, wait)
      }
    }
  }

  function displayResults (res) {
    $bookSearchResults = $('#book-search-results')
    $searchList = $bookSearchResults.find('.search-results-list')
    $searchTitle = $bookSearchResults.find('.search-results-title')
    $searchResultsCount = $searchTitle.find('.search-results-count')
    $searchQuery = $searchTitle.find('.search-query')

    $bookSearchResults.addClass('open')

    var noResults = res.count == 0
    $bookSearchResults.toggleClass('no-results', noResults)

    // Clear old results
    $searchList.empty()

    // Display title for research
    $searchResultsCount.text(res.count)
    $searchQuery.text(res.query)

    // Create an <li> element for each result
    res.results.forEach(function (item) {
      var $li = $('<li>', {
        'class': 'search-results-item'
      })

      var $title = $('<h3>')

      var $link = $('<a>', {
        'href': gitbook.state.basePath + '/' + item.url + '?h=' + encodeURIComponent(res.query),
        'text': item.title,
        'data-is-search': 1
      })

      if ($link[0].href.split('?')[0] === window.location.href.split('?')[0]) {
        $link[0].setAttribute('data-need-reload', 1)
      }

      var content = item.body.trim()
      if (content.length > MAX_DESCRIPTION_SIZE) {
        content = content + '...'
      }
      var $content = $('<p>').html(content)

      $link.appendTo($title)
      $title.appendTo($li)
      $content.appendTo($li)
      $li.appendTo($searchList)
    })
    $('.body-inner').scrollTop(0)
  }

  function escapeRegExp (keyword) {
    // escape regexp prevserve word
    return String(keyword).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
  }

  function query (keyword) {
    if (keyword == null || keyword.trim() === '') return
    keyword = keyword.toLowerCase()
    var results = []
    var index = -1
    for (var page in INDEX_DATA) {
      var store = INDEX_DATA[page]
      if (
        ~store.keywords.toLowerCase().indexOf(keyword) ||
        ~(index = store.body.toLowerCase().indexOf(keyword))
      ) {
        results.push({
          url: page,
          title: store.title,
          body: store.body.substr(Math.max(0, index - 50), MAX_DESCRIPTION_SIZE)
                    .replace(/^[^\s,.]+./, '').replace(/(..*)[\s,.].*/, '$1') // prevent break word
                    .replace(new RegExp('(' + escapeRegExp(keyword) + ')', 'gi'), '<span class="search-highlight-keyword">$1</span>')
        })
      }
    }
    displayResults({
      count: results.length,
      query: keyword,
      results: results
    })
  }

  function launchSearch (keyword) {
    // Add class for loading
    $body.addClass('with-search')
    $body.addClass('search-loading')

    function doSearch () {
      query(keyword)
      $body.removeClass('search-loading')
    }

    throttle(doSearch)()
  }

  function closeSearch () {
    $body.removeClass('with-search')
    $('#book-search-results').removeClass('open')
  }

  function bindSearch () {
    // Bind DOM
    var $body = $('body')

    // Launch query based on input content
    function handleUpdate () {
      var $searchInput = $('#book-search-input input')
      var keyword = $searchInput.val()

      if (keyword.length === 0) {
        closeSearch()
      } else {
        launchSearch(keyword)
      }
    }

    $body.on('keyup', '#book-search-input input', function (e) {
      if (e.keyCode === 13) {
        if (usePushState) {
          var uri = updateQueryString('q', $(this).val())
          window.history.pushState({
            path: uri
          }, null, uri)
        }
      }
      handleUpdate()
    })

    // Push to history on blur
    $body.on('blur', '#book-search-input input', function (e) {
      // Update history state
      if (usePushState) {
        var uri = updateQueryString('q', $(this).val())
        window.history.pushState({
          path: uri
        }, null, uri)
      }
    })
  }

  gitbook.events.on('start', function () {
    bindSearch()
    $.getJSON(state.basePath + '/search_plus_index.json').then(function (data) {
      INDEX_DATA = data
      showResult()
      closeSearch()
    })
  })

  // highlight
  var highLightPageInner = function (keyword) {
    $('.page-inner').mark(keyword, {
      'ignoreJoiners': true,
      'acrossElements': true,
      'separateWordSearch': false
    })

    setTimeout(function () {
      var mark = $('mark[data-markjs="true"]')
      if (mark.length) {
        mark[0].scrollIntoView()
      }
    }, 100)
  }

  function showResult () {
    var keyword, type
    if (/\b(q|h)=([^&]+)/.test(window.location.search)) {
      type = RegExp.$1
      keyword = decodeURIComponent(RegExp.$2)
      if (type === 'q') {
        launchSearch(keyword)
      } else {
        highLightPageInner(keyword)
      }
      $('#book-search-input input').val(keyword)
    }
  }

  gitbook.events.on('page.change', showResult)

  function updateQueryString (key, value) {
    value = encodeURIComponent(value)

    var url = window.location.href.replace(/([?&])(?:q|h)=([^&]+)(&|$)/, function (all, pre, value, end) {
      if (end === '&') {
        return pre
      }
      return ''
    })
    var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi')
    var hash

    if (re.test(url)) {
      if (typeof value !== 'undefined' && value !== null) { return url.replace(re, '$1' + key + '=' + value + '$2$3') } else {
        hash = url.split('#')
        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '')
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) { url += '#' + hash[1] }
        return url
      }
    } else {
      if (typeof value !== 'undefined' && value !== null) {
        var separator = url.indexOf('?') !== -1 ? '&' : '?'
        hash = url.split('#')
        url = hash[0] + separator + key + '=' + value
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) { url += '#' + hash[1] }
        return url
      } else { return url }
    }
  }
  window.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('data-need-reload')) {
      setTimeout(function () {
        window.location.reload()
      }, 100)
    }
  }, true)
})
