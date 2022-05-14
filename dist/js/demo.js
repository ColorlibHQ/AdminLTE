/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */

/* eslint-disable camelcase */

(function ($) {
  'use strict'

  setTimeout(function () {
    if (window.___browserSync___ === undefined && Number(localStorage.getItem('AdminLTE:Demo:MessageShowed')) < Date.now()) {
      localStorage.setItem('AdminLTE:Demo:MessageShowed', (Date.now()) + (15 * 60 * 1000))
      // eslint-disable-next-line no-alert
      alert('You load AdminLTE\'s "demo.js", \nthis file is only created for testing purposes!')
    }
  }, 1000)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function createSkinBlock(colors, callback, noneSelected) {
    var $block = $('<select />', {
      class: noneSelected ? 'custom-select mb-3 border-0' : 'custom-select mb-3 text-light border-0 ' + colors[0].replace(/accent-|navbar-/, 'bg-')
    })

    if (noneSelected) {
      var $default = $('<option />', {
        text: 'None Selected'
      })

      $block.append($default)
    }

    colors.forEach(function (color) {
      var $color = $('<option />', {
        class: (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-'),
        text: capitalizeFirstLetter((typeof color === 'object' ? color.join(' ') : color).replace(/navbar-|accent-|bg-/, '').replace('-', ' '))
      })

      $block.append($color)
    })
    if (callback) {
      $block.on('change', callback)
    }

    return $block
  }

  var $sidebar = $('.control-sidebar')
  var $container = $('<div />', {
    class: 'p-3 control-sidebar-content'
  })

  $sidebar.append($container)

  // Checkboxes

  $container.append(
    '<h5>Customize AdminLTE</h5><hr class="mb-2"/>'
  )

  var $dark_mode_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('darkMode') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('dark-mode')
      localStorage.setItem('darkMode', true)
    } else {
      $('body').removeClass('dark-mode')
      localStorage.removeItem('darkMode')
    }
  })
  var $dark_mode_container = $('<div />', { class: 'mb-4' }).append($dark_mode_checkbox).append('<span>Dark Mode</span>')
  $container.append($dark_mode_container)

  $container.append('<h6>Header Options</h6>')
  var $header_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('layoutNavbarFixed') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('layout-navbar-fixed')
      localStorage.setItem('layoutNavbarFixed', true)
    } else {
      $('body').removeClass('layout-navbar-fixed')
      localStorage.removeItem('layoutNavbarFixed')
    }
  })
  var $header_fixed_container = $('<div />', { class: 'mb-1' }).append($header_fixed_checkbox).append('<span>Fixed</span>')
  $container.append($header_fixed_container)

  var $dropdown_legacy_offset_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('dropdownLegacyOffset') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('dropdown-legacy')
      localStorage.setItem('dropdownLegacyOffset', true)
    } else {
      $('.main-header').removeClass('dropdown-legacy')
      localStorage.removeItem('dropdownLegacyOffset')
    }
  })
  var $dropdown_legacy_offset_container = $('<div />', { class: 'mb-1' }).append($dropdown_legacy_offset_checkbox).append('<span>Dropdown Legacy Offset</span>')
  $container.append($dropdown_legacy_offset_container)

  var $no_border_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('noBorder') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('border-bottom-0')
      localStorage.setItem('noBorder', true)
    } else {
      $('.main-header').removeClass('border-bottom-0')
      localStorage.removeItem('noBorder')
    }
  })
  var $no_border_container = $('<div />', { class: 'mb-4' }).append($no_border_checkbox).append('<span>No border</span>')
  $container.append($no_border_container)

  $container.append('<h6>Sidebar Options</h6>')

  var $sidebar_collapsed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('sidebarCollapsed') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-collapse')
      $(window).trigger('resize')
      localStorage.setItem('sidebarCollapsed', true)
    } else {
      $('body').removeClass('sidebar-collapse')
      $(window).trigger('resize')
      localStorage.removeItem('sidebarCollapsed')
    }
  })
  var $sidebar_collapsed_container = $('<div />', { class: 'mb-1' }).append($sidebar_collapsed_checkbox).append('<span>Collapsed</span>')
  $container.append($sidebar_collapsed_container)

  $(document).on('collapsed.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', true)
  })
  $(document).on('shown.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', false)
  })

  var $sidebar_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('layoutFixed') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('layout-fixed')
      $(window).trigger('resize')
      localStorage.setItem('layoutFixed', true)
    } else {
      $('body').removeClass('layout-fixed')
      $(window).trigger('resize')
      localStorage.removeItem('layoutFixed')
    }
  })
  var $sidebar_fixed_container = $('<div />', { class: 'mb-1' }).append($sidebar_fixed_checkbox).append('<span>Fixed</span>')
  $container.append($sidebar_fixed_container)

  var $sidebar_mini_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('sidebarMini') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini')
      localStorage.setItem('sidebarMini', true)
    } else {
      $('body').removeClass('sidebar-mini')
      localStorage.removeItem('sidebarMini')
    }
  })
  var $sidebar_mini_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_checkbox).append('<span>Sidebar Mini</span>')
  $container.append($sidebar_mini_container)

  var $sidebar_mini_md_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('sidebarMiniMD') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini-md')
      localStorage.setItem('sidebarMiniMD', true)
    } else {
      $('body').removeClass('sidebar-mini-md')
      localStorage.removeItem('sidebarMiniMD')
    }
  })
  var $sidebar_mini_md_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_md_checkbox).append('<span>Sidebar Mini MD</span>')
  $container.append($sidebar_mini_md_container)

  var $sidebar_mini_xs_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('sidebarMiniXS') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini-xs')
      localStorage.setItem('sidebarMiniXS', true)
    } else {
      $('body').removeClass('sidebar-mini-xs')
      localStorage.removeItem('sidebarMiniXS')
    }
  })
  var $sidebar_mini_xs_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_xs_checkbox).append('<span>Sidebar Mini XS</span>')
  $container.append($sidebar_mini_xs_container)

  var $flat_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navFlat') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-flat')
      localStorage.setItem('navFlat', true)
    } else {
      $('.nav-sidebar').removeClass('nav-flat')
      localStorage.removeItem('navFlat')
    }
  })
  var $flat_sidebar_container = $('<div />', { class: 'mb-1' }).append($flat_sidebar_checkbox).append('<span>Nav Flat Style</span>')
  $container.append($flat_sidebar_container)

  var $legacy_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navLegacy') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-legacy')
      localStorage.setItem('navLegacy', true)
    } else {
      $('.nav-sidebar').removeClass('nav-legacy')
      localStorage.removeItem('navLegacy')
    }
  })
  var $legacy_sidebar_container = $('<div />', { class: 'mb-1' }).append($legacy_sidebar_checkbox).append('<span>Nav Legacy Style</span>')
  $container.append($legacy_sidebar_container)

  var $compact_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navCompact') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-compact')
      localStorage.setItem('navCompact', true)
    } else {
      $('.nav-sidebar').removeClass('nav-compact')
      localStorage.removeItem('navCompact')
    }
  })
  var $compact_sidebar_container = $('<div />', { class: 'mb-1' }).append($compact_sidebar_checkbox).append('<span>Nav Compact</span>')
  $container.append($compact_sidebar_container)

  var $child_indent_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navChildIndent') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-child-indent')
      localStorage.setItem('navChildIndent', true)
    } else {
      $('.nav-sidebar').removeClass('nav-child-indent')
      localStorage.removeItem('navChildIndent')
    }
  })
  var $child_indent_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span>Nav Child Indent</span>')
  $container.append($child_indent_sidebar_container)

  var $child_hide_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navChildHide') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-collapse-hide-child')
      localStorage.setItem('navChildHide', true)
    } else {
      $('.nav-sidebar').removeClass('nav-collapse-hide-child')
      localStorage.removeItem('navChildHide')
    }
  })
  var $child_hide_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_hide_sidebar_checkbox).append('<span>Nav Child Hide on Collapse</span>')
  $container.append($child_hide_sidebar_container)

  var $no_expand_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('navNoExpand') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-sidebar').addClass('sidebar-no-expand')
      localStorage.setItem('navNoExpand', true)
    } else {
      $('.main-sidebar').removeClass('sidebar-no-expand')
      localStorage.removeItem('navNoExpand')
    }
  })
  var $no_expand_sidebar_container = $('<div />', { class: 'mb-4' }).append($no_expand_sidebar_checkbox).append('<span>Disable Hover/Focus Auto-Expand</span>')
  $container.append($no_expand_sidebar_container)

  $container.append('<h6>Footer Options</h6>')
  var $footer_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('layoutFooterFixed') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('layout-footer-fixed')
      localStorage.setItem('layoutFooterFixed', true)
    } else {
      $('body').removeClass('layout-footer-fixed')
      localStorage.removeItem('layoutFooterFixed')
    }
  })
  var $footer_fixed_container = $('<div />', { class: 'mb-4' }).append($footer_fixed_checkbox).append('<span>Fixed</span>')
  $container.append($footer_fixed_container)

  $container.append('<h6>Small Text Options</h6>')

  var $text_sm_body_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('textSmBody') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('text-sm')
      localStorage.setItem('textSmBody', true)
    } else {
      $('body').removeClass('text-sm')
      localStorage.removeItem('textSmBody')
    }
  })
  var $text_sm_body_container = $('<div />', { class: 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body</span>')
  $container.append($text_sm_body_container)

  var $text_sm_header_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('textSmHeader') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('text-sm')
      localStorage.setItem('textSmHeader', true)
    } else {
      $('.main-header').removeClass('text-sm')
      localStorage.removeItem('textSmHeader')
    }
  })
  var $text_sm_header_container = $('<div />', { class: 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navbar</span>')
  $container.append($text_sm_header_container)

  var $text_sm_brand_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('textSmBrand') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.brand-link').addClass('text-sm')
      localStorage.setItem('textSmBrand', true)
    } else {
      $('.brand-link').removeClass('text-sm')
      localStorage.removeItem('textSmBrand')
    }
  })
  var $text_sm_brand_container = $('<div />', { class: 'mb-1' }).append($text_sm_brand_checkbox).append('<span>Brand</span>')
  $container.append($text_sm_brand_container)

  var $text_sm_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('textSmSidebar') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('text-sm')
      localStorage.setItem('textSmSidebar', true)
    } else {
      $('.nav-sidebar').removeClass('text-sm')
      localStorage.removeItem('textSmSidebar')
    }
  })
  var $text_sm_sidebar_container = $('<div />', { class: 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar Nav</span>')
  $container.append($text_sm_sidebar_container)

  var $text_sm_footer_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: localStorage.getItem('textSmFooter') ?? false,
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-footer').addClass('text-sm')
      localStorage.setItem('textSmFooter', true)
    } else {
      $('.main-footer').removeClass('text-sm')
      localStorage.removeItem('textSmFooter')
    }
  })
  var $text_sm_footer_container = $('<div />', { class: 'mb-4' }).append($text_sm_footer_checkbox).append('<span>Footer</span>')
  $container.append($text_sm_footer_container)

  // Color Arrays

  var navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray'
  ]

  var navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange'
  ]

  var sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
  ]

  var accent_colors = [
    'accent-primary',
    'accent-warning',
    'accent-info',
    'accent-danger',
    'accent-success',
    'accent-indigo',
    'accent-lightblue',
    'accent-navy',
    'accent-purple',
    'accent-fuchsia',
    'accent-pink',
    'accent-maroon',
    'accent-orange',
    'accent-lime',
    'accent-teal',
    'accent-olive'
  ]

  var sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
  ]

  // Navbar Variants

  $container.append('<h6>Navbar Variants</h6>')

  var $navbar_variants = $('<div />', {
    class: 'd-flex'
  })
  var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)
  var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $main_header = $('.main-header')
    $main_header.removeClass('navbar-dark').removeClass('navbar-light')
    navbar_all_colors.forEach(function (color) {
      $main_header.removeClass(color)
    })

    $(this).removeClass().addClass('custom-select mb-3 text-light border-0 ')

    if (navbar_dark_skins.indexOf(color) > -1) {
      $main_header.addClass('navbar-dark')
      $(this).addClass(color).addClass('text-light')
    } else {
      $main_header.addClass('navbar-light')
      $(this).addClass(color)
    }

    $main_header.addClass(color)
    localStorage.setItem('navbarVariant', color)
  })

  var active_navbar_color = localStorage.getItem('navbarVariant') || null
  $('.main-header')[0].classList.forEach(function (className) {
    if (navbar_all_colors.indexOf(className) > -1 && active_navbar_color === null) {
      active_navbar_color = className.replace('navbar-', 'bg-')
    }
  })

  $navbar_variants_colors.find('option.' + active_navbar_color).prop('selected', true)
  $navbar_variants_colors.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_navbar_color)

  $navbar_variants.append($navbar_variants_colors)
  $container.append($navbar_variants)

  // Sidebar Colors

  $container.append('<h6>Accent Color Variants</h6>')

  var $accent_variants = $('<div />', {
    class: 'd-flex'
  })
  var $accent_variants_colors = createSkinBlock(accent_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $body = $('body')
    accent_colors.forEach(function (skin) {
      $body.removeClass(skin)
    })

    var accent_color_class = color.replace('bg-', 'accent-')

    $body.addClass(accent_color_class)
    localStorage.setItem('AccentColorVariants', color)
  }, true)

  var active_accent_color = localStorage.getItem('AccentColorVariants') || null
  $('body')[0].classList.forEach(function (className) {
    if (accent_colors.indexOf(className) > -1 && active_accent_color === null) {
      active_accent_color = className
    }
  })

  $accent_variants_colors.find('option.' + active_accent_color).prop('selected', true)
  $accent_variants_colors.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_accent_color)

  $accent_variants.append($accent_variants_colors)
  $container.append($accent_variants)

  $container.append('<h6>Dark Sidebar Variants</h6>')
  var $sidebar_variants_dark = $('<div />', {
    class: 'd-flex'
  })
  $container.append($sidebar_variants_dark)
  var $sidebar_dark_variants = createSkinBlock(sidebar_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
    var $sidebar = $('.main-sidebar')
    sidebar_skins.forEach(function (skin) {
      $sidebar.removeClass(skin)
      $sidebar_light_variants.removeClass(skin.replace('sidebar-dark-', 'bg-')).removeClass('text-light')
    })

    $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

    $sidebar_light_variants.find('option').prop('selected', false)
    $sidebar.addClass(sidebar_class)
    $('.sidebar').removeClass('os-theme-dark').addClass('os-theme-light')
    localStorage.setItem('DarkSidebarVariants', color)
  }, true)
  $container.append($sidebar_dark_variants)

  var active_sidebar_dark_color = localStorage.getItem('DarkSidebarVariants') || null
  $('.main-sidebar')[0].classList.forEach(function (className) {
    var color = className.replace('sidebar-dark-', 'bg-')
    if (sidebar_colors.indexOf(color) > -1 && active_sidebar_dark_color === null) {
      active_sidebar_dark_color = color
    }
  })

  $sidebar_dark_variants.find('option.' + active_sidebar_dark_color).prop('selected', true)
  $sidebar_dark_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_dark_color)

  $container.append('<h6>Light Sidebar Variants</h6>')
  var $sidebar_variants_light = $('<div />', {
    class: 'd-flex'
  })
  $container.append($sidebar_variants_light)
  var $sidebar_light_variants = createSkinBlock(sidebar_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
    var $sidebar = $('.main-sidebar')
    sidebar_skins.forEach(function (skin) {
      $sidebar.removeClass(skin)
      $sidebar_dark_variants.removeClass(skin.replace('sidebar-light-', 'bg-')).removeClass('text-light')
    })

    $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

    $sidebar_dark_variants.find('option').prop('selected', false)
    $sidebar.addClass(sidebar_class)
    $('.sidebar').removeClass('os-theme-light').addClass('os-theme-dark')
    localStorage.setItem('LightSidebarVariants', sidebar_class)
  }, true)
  $container.append($sidebar_light_variants)

  var active_sidebar_light_color = localStorage.getItem('LightSidebarVariants') || null
  $('.main-sidebar')[0].classList.forEach(function (className) {
    var color = className.replace('sidebar-light-', 'bg-')
    if (sidebar_colors.indexOf(color) > -1 && active_sidebar_light_color === null) {
      active_sidebar_light_color = color
    }
  })

  if (active_sidebar_light_color !== null) {
    $sidebar_light_variants.find('option.' + active_sidebar_light_color).prop('selected', true)
    $sidebar_light_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_light_color)
  }

  // Logo Skin

  $container.append('<h6>Brand Logo Variants</h6>')
  var $logo_variants = $('<div />', {
    class: 'd-flex'
  })

  var $brand_variants = createSkinBlock(navbar_all_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $logo = $('.brand-link').removeClass().addClass('brand-link text-sm')

    navbar_all_colors.forEach(function (skin) {
      $logo.removeClass(skin)
    })

    if (color === 'bg-light' || color === 'bg-white') {
      $logo.addClass('text-black')
    } else {
      $logo.removeClass('text-black')
    }

    if (color) {
      $(this).removeClass().addClass('custom-select mb-3 border-0').addClass(color).addClass(color !== 'navbar-light' && color !== 'navbar-white' ? 'text-light' : '')
    } else {
      $(this).removeClass().addClass('custom-select mb-3 border-0')
    }

    $logo.addClass(color)
    localStorage.setItem('logoSkin', color)
  }, true)

  var active_brand_color = localStorage.getItem('logoSkin') || null
  $('.brand-link')[0].classList.forEach(function (className) {
    if (navbar_all_colors.indexOf(className) > -1 && active_brand_color === null) {
      active_brand_color = className
    }
  })

  $brand_variants.find('option.' + active_brand_color).prop('selected', true)
  $brand_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_brand_color)

  $logo_variants.append($brand_variants)
  $container.append($logo_variants)

  // Load the app personalize
  const appPersonalize = {
    configure: function() {
        this.darkMode();
        this.layoutNavbarFixed();
        this.dropdownLegacyOffset();
        this.noBorder();
        this.sidebarCollapse();
        this.layoutFixed();
        this.sidebarMini();
        this.sidebarMiniMD();
        this.sidebarMiniXS();
        this.navFlat();
        this.navLegacy();
        this.navCompact();
        this.navChildIndent();
        this.navChildHide();
        this.navNoExpand();
        this.layoutFooterFixed();
        this.textSmBody();
        this.textSmHeader();
        this.textSmBrand();
        this.textSmSidebar();
        this.textSmFooter();
        this.navbarVariant();
        this.AccentColorVariants();
        this.DarkSidebarVariants();
        this.LightSidebarVariants();
        this.logoSkin();
    },
    darkMode: function () {
        if (localStorage.getItem('darkMode') === 'true') {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
    },
    layoutNavbarFixed: function () {
        if (localStorage.getItem('layoutNavbarFixed') === 'true') {
            $('body').addClass('layout-navbar-fixed');
        } else {
            $('body').removeClass('layout-navbar-fixed');
        }
    },
    dropdownLegacyOffset: function () {
        if (localStorage.getItem('dropdownLegacyOffset') === 'true') {
            $('.main-header').addClass('dropdown-legacy-offset');
        } else {
            $('.main-header').removeClass('dropdown-legacy-offset');
        }
    },
    noBorder: function () {
        if (localStorage.getItem('noBorder') === 'true') {
            $('.main-header').addClass('no-border');
        } else {
            $('.main-header').removeClass('no-border');
        }
    },
    sidebarCollapse: function () {
        if (localStorage.getItem('sidebarCollapse') === 'true') {
            $('body').addClass('sidebar-collapse');
        } else {
            $('body').removeClass('sidebar-collapse');
        }
    },
    layoutFixed: function () {
        if (localStorage.getItem('layoutFixed') === 'true') {
            $('body').addClass('layout-fixed');
        } else {
            $('body').removeClass('layout-fixed');
        }
    },
    sidebarMini: function () {
        if (localStorage.getItem('sidebarMini') === 'true') {
            $('body').addClass('sidebar-mini');
        } else {
            $('body').removeClass('sidebar-mini');
        }
    },
    sidebarMiniMD: function () {
        if (localStorage.getItem('sidebarMiniMD') === 'true') {
            $('body').addClass('sidebar-mini-md');
        } else {
            $('body').removeClass('sidebar-mini-md');
        }
    },
    sidebarMiniXS: function () {
        if (localStorage.getItem('sidebarMiniXS') === 'true') {
            $('body').addClass('sidebar-mini-xs');
        } else {
            $('body').removeClass('sidebar-mini-xs');
        }
    },
    navFlat: function () {
        if (localStorage.getItem('navFlat') === 'true') {
            $('.nav-sidebar').addClass('nav-flat');
        } else {
            $('.nav-sidebar').removeClass('nav-flat');
        }
    },
    navLegacy: function () {
        if (localStorage.getItem('navLegacy') === 'true') {
            $('.nav-sidebar').addClass('nav-legacy');
        } else {
            $('.nav-sidebar').removeClass('nav-legacy');
        }
    },
    navCompact: function () {
        if (localStorage.getItem('navCompact') === 'true') {
            $('.nav-sidebar').addClass('nav-compact');
        } else {
            $('.nav-sidebar').removeClass('nav-compact');
        }
    },
    navChildIndent: function () {
        if (localStorage.getItem('navChildIndent') === 'true') {
            $('.nav-sidebar').addClass('nav-child-indent');
        } else {
            $('.nav-sidebar').removeClass('nav-child-indent');
        }
    },
    navChildHide: function () {
        if (localStorage.getItem('navChildHide') === 'true') {
            $('.nav-sidebar').addClass('nav-collapse-hide-child');
        } else {
            $('.nav-sidebar').removeClass('nav-collapse-hide-child');
        }
    },
    navNoExpand: function () {
        if (localStorage.getItem('navNoExpand') === 'true') {
            $('.main-sidebar').addClass('sidebar-no-expand');
        } else {
            $('.main-sidebar').removeClass('sidebar-no-expand');
        }
    },
    layoutFooterFixed: function () {
        if (localStorage.getItem('layoutFooterFixed') === 'true') {
            $('body').addClass('layout-footer-fixed');
        } else {
            $('body').removeClass('layout-footer-fixed');
        }
    },
    textSmBody: function () {
        if (localStorage.getItem('textSmBody') === 'true') {
            $('body').addClass('text-sm');
        } else {
            $('body').removeClass('text-sm');
        }
    },
    textSmHeader: function () {
        if (localStorage.getItem('textSmHeader') === 'true') {
            $('.main-header').addClass('text-sm');
        } else {
            $('.main-header').removeClass('text-sm');
        }
    },
    textSmBrand: function () {
        if (localStorage.getItem('textSmBrand') === 'true') {
            $('.brand-link').addClass('text-sm');
        } else {
            $('.brand-link').removeClass('text-sm');
        }
    },
    textSmSidebar: function () {
        if (localStorage.getItem('textSmSidebar') === 'true') {
            $('.nav-sidebar').addClass('text-sm');
        } else {
            $('.nav-sidebar').removeClass('text-sm');
        }
    },
    textSmFooter: function () {
        if (localStorage.getItem('textSmFooter') === 'true') {
            $('.main-footer').addClass('text-sm');
        } else {
            $('.main-footer').removeClass('text-sm');
        }
    },
    navbarVariant: function () {
        var color = localStorage.getItem('navbarVariant');
        if (color != null) {
            $('.main-header').addClass(color);
        }
    },
    AccentColorVariants: function () {
        var color = localStorage.getItem('AccentColorVariants');
        if (color != null) {
            var accent_color_class = color.replace('bg-', 'accent-')
            $('body').addClass(accent_color_class);
        }
    },
    DarkSidebarVariants: function () {
        var color = localStorage.getItem('DarkSidebarVariants');
        if (color != null) {
            var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
            $('.main-sidebar').addClass(sidebar_class);
        }
    },
    LightSidebarVariants: function () {
        var color = localStorage.getItem('LightSidebarVariants');
        if (color != null) {
            var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
            $('.main-sidebar').addClass(sidebar_class);
        }
    },
    logoSkin: function () {
        var color = localStorage.getItem('logoSkin');
        if (color != null) {
            $('.brand-link').addClass(color);
        }
    }
};

appPersonalize.configure();
})(jQuery)
