'use strict'

const esbuild = require('esbuild')
const browserslist = require('browserslist')
const { resolveToEsbuildTarget } = require('esbuild-plugin-browserslist')

const pkg = require('../../package')
const year = new Date().getFullYear()
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`

const target = resolveToEsbuildTarget(
  browserslist('defaults', {
    printUnknownTargets: false
  })
)

esbuild.build({
  entryPoints: ['build/ts/AdminLTE.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  banner: {
    js: banner
  },
  target,
  outfile: 'dist/js/adminlte.js'
}).catch(error => console.error(error))

