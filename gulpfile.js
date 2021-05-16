/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

// const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()
const cleanCss = require('gulp-clean-css')
const del = require('del')
const gulp = require('gulp')
const npmDist = require('gulp-npm-dist')
const sass = require('gulp-sass')
const wait = require('gulp-wait')
const postcss = require('gulp-postcss')
// const rtlcss = require('rtlcss')
const sourcemaps = require('gulp-sourcemaps')
const fileinclude = require('gulp-file-include')

// Define paths

const paths = {
  dist: {
    base: './dist/',
    css: './dist/css',
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
    node_modules: './node_modules/',
    vendor: './vendor'
  },
  temp: {
    base: './.temp/',
    css: './.temp/css',
    html: './.temp/pages',
    assets: './.temp/assets',
    vendor: './.temp/vendor'
  }
}

function postcssCallback() {
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

// Compile SCSS
gulp.task('scss', () => {
  return gulp.src(paths.src.scss + '/adminlte.scss')
      .pipe(wait(500))
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError))
      .pipe(postcss(postcssCallback))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.temp.css))
      .pipe(browserSync.stream())
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

gulp.task('serve', gulp.series('scss', 'html', 'index', 'assets', 'vendor', () => {
  browserSync.init({
    server: paths.temp.base
  })

  gulp.watch([paths.src.scss + '/**/*.scss', paths.src.scss + '/adminlte.scss'], gulp.series('scss'))
  gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'))
  gulp.watch([paths.src.assets], gulp.series('assets'))
  gulp.watch([paths.src.vendor], gulp.series('vendor'))
}))

// Minify CSS
gulp.task('minify:css', () => {
  return gulp.src([
    paths.dist.css + '/adminlte.css'
  ])
  .pipe(cleanCss())
  .pipe(gulp.dest(paths.dist.css))
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
      .pipe(sass({
        outputStyle: 'expanded',
        includePaths: ['./node_modules/']
      }).on('error', sass.logError))
      .pipe(postcss(postcssCallback))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.css))
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

gulp.task('build', gulp.series('clean:dist', 'copy:dist:css', 'copy:dist:html', 'copy:dist:html:index', 'copy:dist:assets', 'copy:dist:vendor'))

// Default
gulp.task('default', gulp.series('serve'))
