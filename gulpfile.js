var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var bootlint = require('gulp-bootlint');
var less = require('gulp-less');
var include = require('gulp-include');
var image = require('gulp-image');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-replace');

gulp.task('lessSkin', function () {
  return gulp.src([
      'build/less/skins/skin-blue.less',
      'build/less/skins/skin-black.less',
      'build/less/skins/skin-yellow.less',
      'build/less/skins/skin-green.less',
      'build/less/skins/skin-red.less',
      'build/less/skins/skin-purple.less',
      'build/less/skins/skin-blue-light.less',
      'build/less/skins/skin-black-light.less',
      'build/less/skins/skin-yellow-light.less',
      'build/less/skins/skin-green-light.less',
      'build/less/skins/skin-red-light.less',
      'build/less/skins/skin-purple-light.less',
      'build/less/skins/_all-skins.less'
    ])
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css/skins'));
});

gulp.task('lessMain', function () {
  return gulp.src('build/less/AdminLTE.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('less', ['lessMain', 'lessSkin']);

gulp.task('jshint', function () {
  return gulp.src(['dist/js/app.js', 'dist/js/demo.js', 'dist/js/pages/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function () {
  return gulp.src('dist/css/AdminLTE.css')
    .pipe(csslint('build/less/.csslintrc'));
});

gulp.task('bootlint', function () {
  return gulp.src(['pages/**/*.html', '*.html'])
    .pipe(bootlint({
      disabledIds: ['W005']
    }));
});

gulp.task('lint', ['jshint', 'csslint', 'bootlint']);

gulp.task('include', function () {
  return gulp.src('documentation/build/index.html')
    .pipe(replace(/include "(.+?)"/g, ''))
    .pipe(include('html'))
    .pipe(gulp.dest('documentation/'));
});

gulp.task('uglify', function () {
  return gulp.src('dist/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Optimize images
gulp.task('image', function () {
  gulp.src('build/img/**/*.{png,jpg,gif,svg,jpeg}')
    .pipe(image())
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('watch', function () {
  watch(['build/less/*.less', 'build/less/skins/*.less', 'dist/js/app.js'], batch(function (events, done) {
    gulp.start('less', 'uglify', done);
  }));
});

gulp.task('default', ['watch']);
