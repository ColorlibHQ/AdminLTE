/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

const browserSync = require('browser-sync').create()
const cleanCss = require('gulp-clean-css')
const del = require('del')
const gulp = require('gulp')
const npmDist = require('gulp-npm-dist')
const sass = require('gulp-sass')
const wait = require('gulp-wait')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const fileinclude = require('gulp-file-include')
const esbuild = require('esbuild')

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
gulp.task('scss', () => {
  return gulp.src(paths.src.scss + '/adminlte.scss')
      .pipe(wait(500))
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(postcss(postcssOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.temp.css))
      .pipe(browserSync.stream())
})

gulp.task('ts', () => {
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
})

gulp.task('index', () => {
  return gulp.src([paths.src.base + '*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/partials/',
        context: {
          environment: 'development'
        }
      }))
      .pipe(gulp.dest(paths.temp.base))
      .pipe(browserSync.stream())
})

gulp.task('html', () => {
  return gulp.src([paths.src.html])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/partials/',
        context: {
          environment: 'development'
        }
      }))
      .pipe(gulp.dest(paths.temp.html))
      .pipe(browserSync.stream())
})

gulp.task('assets', () => {
  return gulp.src([paths.src.assets])
      .pipe(gulp.dest(paths.temp.assets))
      .pipe(browserSync.stream())
})

gulp.task('vendor', () => {
  return gulp.src(npmDist(), { base: paths.src.node_modules })
    .pipe(gulp.dest(paths.temp.vendor))
})

gulp.task('serve', gulp.series('scss', 'ts', 'html', 'index', 'assets', 'vendor', () => {
  browserSync.init({
    server: paths.temp.base
  })

  gulp.watch([paths.src.scss], gulp.series('scss'))
  gulp.watch([paths.src.ts], gulp.series('ts'))
  gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'))
  gulp.watch([paths.src.assets], gulp.series('assets'))
  gulp.watch([paths.src.vendor], gulp.series('vendor'))
}))

// Minify CSS
gulp.task('minify:dist:css', () => {
  return gulp.src([
    paths.dist.css + '/**/*.css'
  ], { base: paths.dist.css })
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(cleanCss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist.css))
})

// Minify JS
gulp.task('minify:dist:js', () => {
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
})

// Copy assets
gulp.task('copy:dist:assets', () => {
  return gulp.src(paths.src.assets)
      .pipe(gulp.dest(paths.dist.assets))
})

// Clean
gulp.task('clean:dist', () => {
  return del([paths.dist.base])
})

// Compile and copy scss/css
gulp.task('copy:dist:css', () => {
  return gulp.src([paths.src.scss + '/adminlte.scss'])
      .pipe(wait(500))
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(postcss(postcssOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.css))
})

gulp.task('copy:dist:css:dark', () => {
  return gulp.src([paths.src.scss + '/dark/*.scss'])
      .pipe(wait(500))
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(postcss(postcssOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.css + '/dark'))
})

gulp.task('copy:dist:css:rtl', () => {
  return gulp.src([
    paths.dist.css + '/*.css',
    paths.dist.css + '/dark/*.css'
  ])
      .pipe(wait(500))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(postcss(postcssRtlOptions))
      .pipe(rename({ suffix: '.rtl' }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.css + '/rtl'))
})

// Compile and copy ts/js
gulp.task('copy:dist:js', () => {
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
})

// Copy Html
gulp.task('copy:dist:html', () => {
  return gulp.src([paths.src.html])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/partials/',
        context: {
          environment: 'production'
        }
      }))
      .pipe(gulp.dest(paths.dist.html))
})

// Copy index
gulp.task('copy:dist:html:index', () => {
  return gulp.src([paths.src.base + '*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/partials/',
        context: {
          environment: 'production'
        }
      }))
      .pipe(gulp.dest(paths.dist.base))
})

// Copy node_modules to vendor
gulp.task('copy:dist:vendor', () => {
  return gulp.src(npmDist(), { base: paths.src.node_modules })
    .pipe(gulp.dest(paths.dist.vendor))
})

gulp.task('build', gulp.series('clean:dist', 'copy:dist:css', 'copy:dist:css:dark', 'copy:dist:css:rtl', 'minify:dist:css', 'copy:dist:js', 'minify:dist:js', 'copy:dist:html', 'copy:dist:html:index', 'copy:dist:assets', 'copy:dist:vendor'))

// Default
gulp.task('default', gulp.series('serve'))
