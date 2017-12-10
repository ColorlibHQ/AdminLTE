/*
 * JavaScript Templates Demo
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global tmpl */

;(function () {
  'use strict'

  var templateInput = document.getElementById('template')
  var dataInput = document.getElementById('data')
  var resultNode = document.getElementById('result')
  var templateDemoNode = document.getElementById('tmpl-demo')
  var templateDataNode = document.getElementById('tmpl-data')

  function renderError (title, error) {
    resultNode.innerHTML = tmpl(
      'tmpl-error',
      {title: title, error: error}
    )
  }

  function render (event) {
    event.preventDefault()
    var data
    try {
      data = JSON.parse(dataInput.value)
    } catch (e) {
      renderError('JSON parsing failed', e)
      return
    }
    try {
      resultNode.innerHTML = tmpl(
        templateInput.value,
        data
      )
    } catch (e) {
      renderError('Template rendering failed', e)
    }
  }

  function empty (node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild)
    }
  }

  function init (event) {
    if (event) {
      event.preventDefault()
    }
    templateInput.value = templateDemoNode.innerHTML.trim()
    dataInput.value = templateDataNode.innerHTML.trim()
    empty(resultNode)
  }

  document.getElementById('render').addEventListener('click', render)
  document.getElementById('reset').addEventListener('click', init)

  init()
}())
