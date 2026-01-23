import typescript from '@rollup/plugin-typescript'
import pkg from '../../package.json' with { type: 'json' }

const year = new Date().getFullYear()
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`

export default {
  input: 'src/ts/adminlte.ts',
  output: {
    file: 'dist/js/adminlte.js',
    format: 'umd',
    banner,
    name: 'adminlte'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true
    })
  ]
}
