'use strict';

module.exports = function (grunt) {
  return {
    options: {
      relaxerror: ['W005']
    },
    files: ['pages/**/*.html', '*.html']
  };
};
