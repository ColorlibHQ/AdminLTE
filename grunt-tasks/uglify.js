'use strict';

module.exports = function (grunt) {
  return {
    options: {
      mangle: true,
      preserveComments: 'some'
    },
    my_target: {
      files: {
        'dist/js/app.min.js': ['dist/js/app.js']
      }
    }
  };
};
