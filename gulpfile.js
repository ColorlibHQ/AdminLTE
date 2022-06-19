/* eslint-env node */

const autoprefix = require('autoprefixer')
const browserSync = require('browser-sync').create()
const del = require('del')
const { src, dest, lastRun, watch, series, parallel } = require('gulp')
const cleanCss = require('gulp-clean-css')
const eslint = require('gulp-eslint-new')
const fileinclude = require('gulp-file-include')
const validator = require('gulp-html')
const gulpIf = require('gulp-if')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const gulpStylelint = require('@ronilaukkarinen/gulp-stylelint')
const terser = require('gulp-terser')
const rollup = require('rollup')
const rollupTypescript = require('@rollup/plugin-typescript')
const rtlcss = require('rtlcss')

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
    assets: './dist/assets'
  },
  src: {
    base: './src/',
    html: './src/pages/**/*.html',
    assets: './src/assets/**/*.*',
    partials: './src/partials/**/*.html',
    scss: './src/scss',
    ts: './src/ts'
  },
  temp: {
    base: './.temp/',
    css: './.temp/css',
    js: './.temp/js',
    html: './.temp/pages',
    assets: './.temp/assets'
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

// Lint SCSS
const lintScss = () => src([paths.src.scss + '/**/*.scss'], { since: lastRun(lintScss) })
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ],
      debug: true
    }))

// Compile SCSS
const scss = () => src(paths.src.scss + '/adminlte.scss', { sourcemaps: true })
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.temp.css, { sourcemaps: '.' }))
    .pipe(browserSync.stream())

// Compile SCSS Dark
const scssDark = () => src(paths.src.scss + '/dark/adminlte-dark-addon.scss', { sourcemaps: true })
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.temp.css + '/dark', { sourcemaps: '.' }))
    .pipe(browserSync.stream())

// Lint TS
function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed
}

const lintTs = () => src([paths.src.ts + '/**/*.ts'], { since: lastRun(lintTs) })
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest(paths.src.ts)))
    .pipe(eslint.failAfterError())

// Compile TS
const tsCompile = () =>
  rollup.rollup({
    input: paths.src.ts + '/adminlte.ts',
    output: {
      banner
    },
    plugins: [
      rollupTypescript()
    ]
  }).then(bundle => bundle.write({
    file: paths.temp.js + '/adminlte.js',
    format: 'umd',
    name: 'adminlte',
    sourcemap: true
  }))

const assets = () => src([paths.src.assets])
    .pipe(dest(paths.temp.assets))
    .pipe(browserSync.stream())

const index = () => src([paths.src.base + '*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'development'
      }
    }))
    .pipe(dest(paths.temp.base))
    .pipe(browserSync.stream())

const html = () => src([paths.src.html])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'development'
      }
    }))
    .pipe(dest(paths.temp.html))
    .pipe(browserSync.stream())

const lintHtml = () => src([paths.temp.html + '/**/*.html', paths.temp.base + '*.html'], { since: lastRun(lintHtml) })
    .pipe(validator())

const serve = () => {
  browserSync.init({
    server: paths.temp.base
  })

  watch([paths.src.scss], series(lintScss))
  watch([paths.src.scss + '/**/*.scss', '!' + paths.src.scss + '/bootstrap-dark/**/*.scss', '!' + paths.src.scss + '/dark/**/*.scss'], series(scss))
  watch([paths.src.scss + '/bootstrap-dark/', paths.src.scss + '/dark/'], series(scssDark))
  watch([paths.src.ts], series(lintTs, tsCompile))
  watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], series(html, index, lintHtml))
  watch([paths.src.assets], series(assets))
}

// From here Dist will Start

// Clean
const cleanDist = () => del([paths.dist.base])

const lintDistScss = () => src([paths.src.scss + '/**/*.scss'], ['./.temp/**/*.css'])
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))

// Compile and copy all scss/css
const copyDistCssAll = () => src([paths.src.scss + '/**/*.scss'], {
  base: paths.src.scss,
  sourcemaps: true
})
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssOptions))
    .pipe(dest(paths.dist.css, { sourcemaps: '.' }))

const copyDistCssRtl = () => src(paths.dist.css + '/*.css', { sourcemaps: true })
    .pipe(postcss(postcssRtlOptions))
    .pipe(rename({ suffix: '.rtl' }))
    .pipe(dest(paths.dist.css + '/rtl', { sourcemaps: '.' }))

// Minify CSS
const minifyDistCss = () => src([
  paths.dist.css + '/**/*.css'
], {
  base: paths.dist.css,
  sourcemaps: true
})
    .pipe(cleanCss({ format: { breakWith: 'lf' } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist.css, { sourcemaps: '.' }))

const lintDistTs = () => src([paths.src.ts + '/**/*.ts'])
    .pipe(eslint())
    .pipe(eslint.failAfterError())

// Compile and copy ts/js
const copyDistJs = () =>
  rollup.rollup({
    input: paths.src.ts + '/adminlte.ts',
    output: {
      banner
    },
    plugins: [
      rollupTypescript()
    ]
  }).then(bundle => bundle.write({
    file: paths.dist.js + '/adminlte.js',
    format: 'umd',
    name: 'adminlte',
    sourcemap: true
  }))

// Minify JS
const minifyDistJs = () => src(paths.dist.js + '/adminlte.js', { sourcemaps: true })
    .pipe(terser({ compress: { passes: 2 } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist.js, { sourcemaps: '.' }))

// Copy assets
const copyDistAssets = () => src(paths.src.assets)
    .pipe(dest(paths.dist.assets))

// Copy index
const copyDistHtmlIndex = () => src([paths.src.base + '*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.dist.base))

// Copy Html
const copyDistHtml = () => src([paths.src.html])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.dist.html))

// HTML Lint
// Copy index for Lint
const copyDistHtmlIndexForLint = () => src([paths.src.base + '*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.temp.base))
// Copy Html for Lint
const copyDistHtmlForLint = () => src([paths.src.html])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/partials/',
      context: {
        environment: 'production'
      }
    }))
    .pipe(dest(paths.temp.html))
// Now Lint
const lintDistHtmlCopied = () => src([paths.temp.html + '/**/*.html', paths.temp.base + '*.html'])
    .pipe(validator())

const lintDistHtml = series(copyDistHtmlIndexForLint, copyDistHtmlForLint, lintDistHtmlCopied)

const lint = parallel(
  lintDistScss,
  lintDistTs,
  lintDistHtml
)
exports.lint = lint

const compile = series(
  cleanDist,
  parallel(
    series(copyDistCssAll, copyDistCssRtl, minifyDistCss),
    series(copyDistJs, minifyDistJs),
    copyDistAssets,
    copyDistHtmlIndex,
    copyDistHtml
  )
)
exports.compile = compile

// For Production Release
exports.production = series(lint, compile)

// Default - Only for light mode AdminLTE
exports.default = series(scss, scssDark, tsCompile, html, index, assets, serve)
