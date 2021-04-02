require('esbuild').build({
  entryPoints: ['build/ts/index.ts'],
  bundle: true,
  sourcemap: true,
  format: 'iife',
  outfile: 'dist/js/adminlte.js'
}).catch(() => {
  return process.exit(1)
})

//
