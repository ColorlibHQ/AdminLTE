// Watch files for changes and invoke appropriate compiler
'use strict';

module.exports = function (grunt) {
  return {
    sass: {
      files: ['build/scss/*.scss', 'build/scss/skins/*.scss'],
      tasks: ['sass', 'notify:watch']
    },
    es6 : {
      files: ['build/js/src/*.js'],
      tasks: ['concat', 'babel', 'uglify', 'notify:watch']
    },
    js  : {
      files: ['dist/js/adminlte.js'],
      tasks: ['uglify', 'notify:watch']
    }
  };
};
