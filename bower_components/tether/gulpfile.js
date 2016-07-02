var del         = require('del');
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var bump        = require('gulp-bump');
var concat      = require('gulp-concat');
var header      = require('gulp-header');
var minify      = require('gulp-minify-css');
var plumber     = require('gulp-plumber');
var prefixer    = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var umd         = require('gulp-wrap-umd');

// Variables
var distDir = './dist';
var pkg = require('./package.json');
var banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');
var umdOptions = {
  exports: 'Tether',
  namespace: 'Tether'
};


// Clean
gulp.task('clean', function() {
  del.sync([distDir]);
});


// Javascript
gulp.task('js', function() {
  gulp.src([
    './src/js/utils.js',
    './src/js/tether.js',
    './src/js/constraint.js',
    './src/js/abutment.js',
    './src/js/shift.js'
  ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('tether.js'))
    .pipe(umd(umdOptions))
    .pipe(header(banner))

    // Original
    .pipe(gulp.dest(distDir + '/js'))

    // Minified
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distDir + '/js'));
});


// CSS
gulp.task('css', function() {
  gulp.src('./src/css/**/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefixer())

    // Original
    .pipe(gulp.dest(distDir + '/css'))

    // Minified
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distDir + '/css'));
});


// Version bump
var VERSIONS = ['patch', 'minor', 'major'];
for (var i = 0; i < VERSIONS.length; ++i){
  (function(version) {
    gulp.task('version:' + version, function() {
      gulp.src(['package.json', 'bower.json', 'component.json'])
        .pipe(bump({type: version}))
        .pipe(gulp.dest('.'));
    });
  })(VERSIONS[i]);
}


// Watch
gulp.task('watch', ['js', 'css'], function() {
  gulp.watch('./src/js/**/*', ['js']);
  gulp.watch('./src/css/**/*', ['css']);
});


// Defaults
gulp.task('build', ['js', 'css']);
gulp.task('default', ['build']);

