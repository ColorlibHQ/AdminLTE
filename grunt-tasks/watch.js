// Watch files for changes and invoke appropriate compiler
'use strict';

module.exports = function (grunt) {
  return {
    sass: {
      files: ['build/scss/*.scss', 'build/scss/skins/*.scss'],
      tasks: ['sass']
    },
    es6: {
      files: ['build/js/src/*.js'],
      tasks: ['concat', 'babel', 'uglify']
    },
    js: {
      files: ['dist/js/adminlte.js', 'dist/js/app.js'],
      tasks: ['uglify']
    }
  };
};
