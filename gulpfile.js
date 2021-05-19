/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

const browserSync = require('browser-sync').create()
const del = require('del')
const esbuild = require('esbuild')
const { src, dest, lastRun, watch, series, parallel } = require('gulp')
const cleanCss = require('gulp-clean-css')
const eslint = require('gulp-eslint7')
const fileinclude = require('gulp-file-include')
const npmDist = require('gulp-npm-dist')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const gulpStylelint = require('gulp-stylelint')
const wait = require('gulp-wait')

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

function postcssOptions() {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: [
      require('autoprefixer')({
        cascade: false
      })
    ]
  }
}

function postcssRtlOptions() {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: [
      require('autoprefixer')({
        cascade: false
      }),
      require('rtlcss')({})
    ]
  }
}

// Compile SCSS
const scss = () => {
  return src(paths.src.scss + '/adminlte.scss')
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.temp.css))
    .pipe(browserSync.stream())
}

// Lint SCSS
const lintScss = () => {
  return src([paths.src.scss + '/**/*.scss'], { since: lastRun(lintScss) })
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ],
      debug: true
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

  watch([paths.src.scss], series(lintScss, scss))
  watch([paths.src.ts], series(lintTs, ts))
  watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], series(html, index))
  watch([paths.src.assets], series(assets))
  watch([paths.src.vendor], series(vendor))
}

// Minify CSS
const minifyDistCss = () => {
  return src([
    paths.dist.css + '/**/*.css'
  ], { base: paths.dist.css })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCss({ format: { breakWith: 'lf' } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css))
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
const cleanDist = () => {
  return del([paths.dist.base])
}

// Compile and copy all scss/css
const copyDistCssAll = () => {
  return src([
    paths.src.scss + '/adminlte.scss',
    paths.src.scss + '/dark/*.scss'
  ], { base: paths.src.scss })
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css))
}

const copyDistCssRtl = () => {
  return src(paths.dist.css + '/**/*.css')
    .pipe(wait(500))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss(postcssRtlOptions))
    .pipe(rename({ suffix: '.rtl' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css + '/rtl'))
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

exports.build = series(lintScss, lintTs, cleanDist, copyDistCssAll, copyDistCssRtl, minifyDistCss, copyDistJs, minifyDistJs, copyDistHtml, copyDistHtmlIndex, copyDistAssets, copyDistVendor)

// Default
exports.default = series(parallel(lintScss, scss, lintTs, ts, html, index, assets, vendor), serve)
