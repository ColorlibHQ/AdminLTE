#!/usr/bin/env node
/*
 * JavaScript Templates Compiler
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

;(function () {
  'use strict'
  var path = require('path')
  var tmpl = require(path.join(__dirname, 'tmpl.js'))
  var fs = require('fs')
  // Retrieve the content of the minimal runtime:
  var runtime = fs.readFileSync(path.join(__dirname, 'runtime.js'), 'utf8')
  // A regular expression to parse templates from script tags in a HTML page:
  var regexp = /<script( id="([\w-]+)")? type="text\/x-tmpl"( id="([\w-]+)")?>([\s\S]+?)<\/script>/gi
  // A regular expression to match the helper function names:
  var helperRegexp = new RegExp(
    tmpl.helper.match(/\w+(?=\s*=\s*function\s*\()/g).join('\\s*\\(|') +
      '\\s*\\('
  )
  // A list to store the function bodies:
  var list = []
  var code
  // Extend the Templating engine with a print method for the generated functions:
  tmpl.print = function (str) {
    // Only add helper functions if they are used inside of the template:
    var helper = helperRegexp.test(str) ? tmpl.helper : ''
    var body = str.replace(tmpl.regexp, tmpl.func)
    if (helper || /_e\s*\(/.test(body)) {
      helper = '_e=tmpl.encode' + helper + ','
    }
    return (
      'function(' +
      tmpl.arg +
      ',tmpl){' +
      ('var ' + helper + "_s='" + body + "';return _s;")
        .split("_s+='';")
        .join('') +
      '}'
    )
  }
  // Loop through the command line arguments:
  process.argv.forEach(function (file, index) {
    var listLength = list.length
    var stats
    var content
    var result
    var id
    // Skip the first two arguments, which are "node" and the script:
    if (index > 1) {
      stats = fs.statSync(file)
      if (!stats.isFile()) {
        console.error(file + ' is not a file.')
        return
      }
      content = fs.readFileSync(file, 'utf8')
      while (true) {
        // Find templates in script tags:
        result = regexp.exec(content)
        if (!result) {
          break
        }
        id = result[2] || result[4]
        list.push("'" + id + "':" + tmpl.print(result[5]))
      }
      if (listLength === list.length) {
        // No template script tags found, use the complete content:
        id = path.basename(file, path.extname(file))
        list.push("'" + id + "':" + tmpl.print(content))
      }
    }
  })
  if (!list.length) {
    console.error('Missing input file.')
    return
  }
  // Combine the generated functions as cache of the minimal runtime:
  code = runtime.replace('{}', '{' + list.join(',') + '}')
  // Print the resulting code to the console output:
  console.log(code)
})()
