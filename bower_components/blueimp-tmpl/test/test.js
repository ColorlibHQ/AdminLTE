/*
 * JavaScript Templates Test
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global beforeEach, afterEach, describe, it */

;(function (context, expect, tmpl) {
  'use strict'

  if (context.require === undefined) {
    // Override the template loading method:
    tmpl.load = function (id) {
      switch (id) {
        case 'template':
          return '{%=o.value%}'
      }
    }
  }

  var data

  beforeEach(function () {
    // Initialize the sample data:
    data = {
      value: 'value',
      nullValue: null,
      falseValue: false,
      zeroValue: 0,
      special: '<>&"\'\x00',
      list: [1, 2, 3, 4, 5],
      func: function () {
        return this.value
      },
      deep: {
        value: 'value'
      }
    }
  })

  afterEach(function () {
    // Purge the template cache:
    tmpl.cache = {}
  })

  describe('Template loading', function () {
    it('String template', function () {
      expect(tmpl('{%=o.value%}', data)).to.equal('value')
    })

    it('Load template by id', function () {
      expect(tmpl('template', data)).to.equal('value')
    })

    it('Retun function when called without data parameter', function () {
      expect(tmpl('{%=o.value%}')(data)).to.equal('value')
    })

    it('Cache templates loaded by id', function () {
      tmpl('template')
      expect(tmpl.cache.template).to.be.a('function')
    })
  })

  describe('Interpolation', function () {
    it('Escape HTML special characters with {%=o.prop%}', function () {
      expect(tmpl('{%=o.special%}', data)).to.equal('&lt;&gt;&amp;&quot;&#39;')
    })

    it('Allow HTML special characters with {%#o.prop%}', function () {
      expect(tmpl('{%#o.special%}', data)).to.equal('<>&"\'\x00')
    })

    it('Function call', function () {
      expect(tmpl('{%=o.func()%}', data)).to.equal('value')
    })

    it('Dot notation', function () {
      expect(tmpl('{%=o.deep.value%}', data)).to.equal('value')
    })

    it('Handle single quotes', function () {
      expect(tmpl("'single quotes'{%=\": '\"%}", data)).to.equal(
        "'single quotes': &#39;"
      )
    })

    it('Handle double quotes', function () {
      expect(tmpl('"double quotes"{%=": \\""%}', data)).to.equal(
        '"double quotes": &quot;'
      )
    })

    it('Handle backslashes', function () {
      expect(tmpl('\\backslashes\\{%=": \\\\"%}', data)).to.equal(
        '\\backslashes\\: \\'
      )
    })

    it('Interpolate escaped falsy values except undefined or null', function () {
      expect(
        tmpl(
          '{%=o.undefinedValue%}' +
            '{%=o.nullValue%}' +
            '{%=o.falseValue%}' +
            '{%=o.zeroValue%}',
          data
        )
      ).to.equal('false0')
    })

    it('Interpolate unescaped falsy values except undefined or null', function () {
      expect(
        tmpl(
          '{%#o.undefinedValue%}' +
            '{%#o.nullValue%}' +
            '{%#o.falseValue%}' +
            '{%#o.zeroValue%}',
          data
        )
      ).to.equal('false0')
    })

    it('Preserve whitespace', function () {
      expect(tmpl('\n\r\t{%=o.value%}  \n\r\t{%=o.value%}  ', data)).to.equal(
        '\n\r\tvalue  \n\r\tvalue  '
      )
    })
  })

  describe('Evaluation', function () {
    it('Escape HTML special characters with print(data)', function () {
      expect(tmpl('{% print(o.special); %}', data)).to.equal(
        '&lt;&gt;&amp;&quot;&#39;'
      )
    })

    it('Allow HTML special characters with print(data, true)', function () {
      expect(tmpl('{% print(o.special, true); %}', data)).to.equal('<>&"\'\x00')
    })

    it('Print out escaped falsy values except undefined or null', function () {
      expect(
        tmpl(
          '{% print(o.undefinedValue); %}' +
            '{% print(o.nullValue); %}' +
            '{% print(o.falseValue); %}' +
            '{% print(o.zeroValue); %}',
          data
        )
      ).to.equal('false0')
    })

    it('Print out unescaped falsy values except undefined or null', function () {
      expect(
        tmpl(
          '{% print(o.undefinedValue, true); %}' +
            '{% print(o.nullValue, true); %}' +
            '{% print(o.falseValue, true); %}' +
            '{% print(o.zeroValue, true); %}',
          data
        )
      ).to.equal('false0')
    })

    it('Include template', function () {
      expect(
        tmpl('{% include("template", {value: "value"}); %}', data)
      ).to.equal('value')
    })

    it('If condition', function () {
      expect(
        tmpl('{% if (o.value) { %}true{% } else { %}false{% } %}', data)
      ).to.equal('true')
    })

    it('Else condition', function () {
      expect(
        tmpl(
          '{% if (o.undefinedValue) { %}false{% } else { %}true{% } %}',
          data
        )
      ).to.equal('true')
    })

    it('For loop', function () {
      expect(
        tmpl(
          '{% for (var i=0; i<o.list.length; i++) { %}' +
            '{%=o.list[i]%}{% } %}',
          data
        )
      ).to.equal('12345')
    })

    it('For loop print call', function () {
      expect(
        tmpl(
          '{% for (var i=0; i<o.list.length; i++) {' + 'print(o.list[i]);} %}',
          data
        )
      ).to.equal('12345')
    })

    it('For loop include template', function () {
      expect(
        tmpl(
          '{% for (var i=0; i<o.list.length; i++) {' +
            'include("template", {value: o.list[i]});} %}',
          data
        ).replace(/[\r\n]/g, '')
      ).to.equal('12345')
    })

    it('Modulo operator', function () {
      expect(
        tmpl(
          '{% if (o.list.length % 5 === 0) { %}5 list items{% } %}',
          data
        ).replace(/[\r\n]/g, '')
      ).to.equal('5 list items')
    })
  })
})(
  this,
  (this.chai || require('chai')).expect,
  this.tmpl || require('../js/tmpl')
)
