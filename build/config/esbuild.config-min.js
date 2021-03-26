'use strict'

const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['dist/js/adminlte.js'],
  bundle: false,
  minify: true,
  sourcemap: true,
  outfile: 'dist/js/adminlte.min.js'
}).catch(error => console.error(error))

