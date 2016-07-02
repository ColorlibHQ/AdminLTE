// Build the documentation files
'use strict';

module.exports = function (grunt) {
  return {
    build: {
      src: ['*.html'], // Source files
      dest: 'documentation/', // Destination directory
      flatten: true,
      cwd: 'documentation/build',
      options: {
        silent: true,
        includePath: 'documentation/build/include'
      }
    }
  };
};
