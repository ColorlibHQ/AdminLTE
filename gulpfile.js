/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

const autoprefix = require('autoprefixer')
const browserSync = require('browser-sync').create()
const del = require('del')
const esbuild = require('esbuild')
const { src, dest, lastRun, watch, series } = require('gulp')
const cleanCss = require('gulp-clean-css')
const dependents = require('gulp-dependents')
const eslint = require('gulp-eslint7')
const fileinclude = require('gulp-file-include')
const npmDist = require('gulp-npm-dist')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const gulpStylelint = require('gulp-stylelint')
const rtlcss = require('rtlcss')

sass.compiler = require('sass')

const pkg = require('./package')
const year = new Date().getFullYear()
const banner = `/*!
 * AdminLTE v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */`

// Define paths

const paths = {
  dist: {
    base: './dist/',
    css: './dist/css',
    js: './dist/js',
    html: './dist/pages',
    assets: './dist/assets',
    img: './dist/assets/img',
    vendor: './dist/vendor'
  },
  base: {
    base: './',
    node: './node_modules'
  },
  src: {
    base: './src/',
    css: './src/css',
    html: './src/pages/**/*.html',
    assets: './src/assets/**/*.*',
    partials: './src/partials/**/*.html',
    scss: './src/scss',
    ts: './src/ts',
    node_modules: './node_modules/',
    vendor: './vendor'
  },
  temp: {
    base: './.temp/',
    css: './.temp/css',
    js: './.temp/js',
    html: './.temp/pages',
    assets: './.temp/assets',
    vendor: './.temp/vendor'
  }
}

const sassOptions = {
  outputStyle: 'expanded',
  includePaths: ['./node_modules/']
}

const postcssOptions = [
  autoprefix({ cascade: false })
]

const postcssRtlOptions = [
  autoprefix({ cascade: false }),
  rtlcss({})
]

// From here Dev mode will Start

// Compile SCSS
const scss = () => {
  return src(paths.src.scss + '/adminlte.scss', { sourcemaps: true })
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.temp.css, { sourcemaps: '.' }))
    .pipe(browserSync.stream())
}

/**
 * Use superScss to build css along with Dark mode
 */

const superScss = () => {
  return src(paths.src.scss + '/**/*.scss', {
    since: lastRun(scss),
    sourcemaps: true
  })
    .pipe(dependents())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.temp.css, { sourcemaps: '.' }))
    .pipe(browserSync.stream())
}

// Lint SCSS
const lintScss = () => {
  return src([paths.src.scss + '/**/*.scss'], { since: lastRun(lintScss) })
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
}

const ts = () => {
  return esbuild.build({
    entryPoints: [paths.src.ts + '/adminlte.ts'],
    banner: {
      js: banner
    },
    bundle: true,
    format: 'iife',
    sourcemap: true,
    target: ['chrome60'],
    outfile: paths.temp.js + '/adminlte.js'
  }).catch(
    error => console.error(error)
  )
}

// Lint TS
const lintTs = () => {
  return src([paths.src.ts + '/**/*.ts'], { since: lastRun(lintTs) })
    .pipe(eslint())
    .pipe(eslint.format())
}

const index = () => {
  return src([paths.src.base + '*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'development'
      }
    }))
    .pipe(dest(paths.temp.base))
    .pipe(browserSync.stream())
}

const html = () => {
  return src([paths.src.html])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'development'
      }
    }))
    .pipe(dest(paths.temp.html))
    .pipe(browserSync.stream())
}

const assets = () => {
  return src([paths.src.assets])
    .pipe(dest(paths.temp.assets))
    .pipe(browserSync.stream())
}

const vendor = () => {
  return src(npmDist({ copyUnminified: true }), { base: paths.src.node_modules })
    .pipe(dest(paths.temp.vendor))
}

const serve = () => {
  browserSync.init({
    server: paths.temp.base
  })

  watch([paths.src.scss], { delay: 500 }, series(lintScss, scss))
  watch([paths.src.ts], series(lintTs, ts))
  watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], series(html, index))
  watch([paths.src.assets], series(assets))
  watch([paths.src.vendor], series(vendor))
}

const superServe = () => {
  browserSync.init({
    server: paths.temp.base
  })

  watch([paths.src.scss], { delay: 500 }, series(lintScss, superScss))
  watch([paths.src.ts], series(lintTs, ts))
  watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], series(html, index))
  watch([paths.src.assets], series(assets))
  watch([paths.src.vendor], series(vendor))
}

// From here Dist will Start

// Minify CSS
const minifyDistCss = () => {
  return src([
    paths.dist.css + '/**/*.css'
  ], {
    base: paths.dist.css,
    sourcemaps: true
  })
    .pipe(cleanCss({ format: { breakWith: 'lf' } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist.css, { sourcemaps: '.' }))
}

// Minify JS
const minifyDistJs = () => {
  return esbuild.build({
    entryPoints: [paths.dist.js + '/adminlte.js'],
    format: 'iife',
    minify: true,
    sourcemap: true,
    target: ['chrome60'],
    outfile: paths.dist.js + '/adminlte.min.js'
  }).catch(
    error => console.error(error)
  )
}

// Copy assets
const copyDistAssets = () => {
  return src(paths.src.assets)
    .pipe(dest(paths.dist.assets))
}

// Clean
const cleanDist = () => del([paths.dist.base])

// Compile and copy all scss/css
const copyDistCssAll = () => {
  return src([paths.src.scss + '/**/*.scss'], {
    base: paths.src.scss,
    sourcemaps: true
  })
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.dist.css, { sourcemaps: '.' }))
}

const copyDistCssRtl = () => {
  return src(paths.dist.css + '/*.css', { sourcemaps: true })
    .pipe(postcss(postcssRtlOptions))
    .pipe(rename({ suffix: '.rtl' }))
    .pipe(dest(paths.dist.css + '/rtl', { sourcemaps: '.' }))
}

// Compile and copy ts/js
const copyDistJs = () => {
  return esbuild.build({
    entryPoints: [paths.src.ts + '/adminlte.ts'],
    banner: {
      js: banner
    },
    bundle: true,
    format: 'iife',
    sourcemap: true,
    target: ['chrome60'],
    outfile: paths.dist.js + '/adminlte.js'
  }).catch(
    error => console.error(error)
  )
}

// Copy Html
const copyDistHtml = () => {
  return src([paths.src.html])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.dist.html))
}

// Copy index
const copyDistHtmlIndex = () => {
  return src([paths.src.base + '*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.dist.base))
}

// Copy node_modules to vendor
const copyDistVendor = () => {
  return src(npmDist({ copyUnminified: true }), { base: paths.src.node_modules })
    .pipe(dest(paths.dist.vendor))
}

// To Dist Before release
exports.build = series(lintScss, lintTs, cleanDist, copyDistCssAll, copyDistCssRtl, minifyDistCss, copyDistJs, minifyDistJs, copyDistHtml, copyDistHtmlIndex, copyDistAssets, copyDistVendor)

// Default - Only for light mode AdminLTE
exports.default = series(scss, ts, html, index, assets, vendor, serve)

// Super Dev mode for Dark anf Light mode
exports.super = series(superScss, ts, html, index, assets, vendor, superServe)
