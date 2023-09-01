const typescript = require('@rollup/plugin-typescript')
const pkg = require('../../package.json')

const year = new Date().getFullYear()
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`

module.exports = {
  input: 'src/ts/adminlte.ts',
  output: {
    file: 'dist/js/adminlte.js',
    format: 'umd',
    banner,
    name: 'adminlte'
  },
  plugins: [typescript()]
}
