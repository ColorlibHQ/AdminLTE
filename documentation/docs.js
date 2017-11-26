/*
 * Documentation JS script
 */
$(function () {
  'use strict'

  var $slideToTop = $('<div />')

  $slideToTop.html('<i class="fa fa-chevron-up"></i>')

  $slideToTop.css({
    position          : 'fixed',
    bottom            : '20px',
    right             : '25px',
    width             : '40px',
    height            : '40px',
    color             : '#eee',
    'font-size'       : '',
    'line-height'     : '40px',
    'text-align'      : 'center',
    'background-color': '#222d32',
    cursor            : 'pointer',
    'border-radius'   : '5px',
    'z-index'         : '99999',
    opacity           : '.7',
    'display'         : 'none'
  })

  $slideToTop.on('mouseenter', function () {
    $(this).css('opacity', '1')
  })

  $slideToTop.on('mouseout', function () {
    $(this).css('opacity', '.7')
  })

  $('.wrapper').append($slideToTop)

  $(window).scroll(function () {
    if ($(window).scrollTop() >= 150) {
      if (!$($slideToTop).is(':visible')) {
        $($slideToTop).fadeIn(500)
      }
    } else {
      $($slideToTop).fadeOut(500)
    }
  })

  $($slideToTop).click(function () {
    $('body').animate({
      scrollTop: 0
    }, 500)
  })

  $('.sidebar-menu li:not(.treeview) a').click(function () {
    var $this  = $(this)
    var target = $this.attr('href')
    if (typeof target === 'string') {
      $('body').animate({
        scrollTop: ($(target).offset().top) + 'px'
      }, 500)
    }
  })
  // Skin switcher
  var currentSkin = 'skin-blue'

  $('#layout-skins-list [data-skin]').click(function (e) {
    e.preventDefault()
    var skinName = $(this).data('skin')
    $('body').removeClass(currentSkin)
    $('body').addClass(skinName)
    currentSkin = skinName
  })
})
