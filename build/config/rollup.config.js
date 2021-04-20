'use strict'

const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

const pkg = require('../../package')
const year = new Date().getFullYear()
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`

module.exports = {
  input: 'build/ts/AdminLTE.ts',
  output: {
    banner,
    file: 'dist/js/adminlte.js',
    format: 'umd',
    name: 'adminlte'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
      // Include the helpers in the bundle, at most one copy of each
      babelHelpers: 'bundled'
    }),
    nodeResolve(),
    typescript()
  ]
}
