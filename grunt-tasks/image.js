'use strict';

module.exports = function (grunt) {
	return {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'build/img/',
        src: ['**/*.{png,jpg,gif,svg,jpeg}'],
        dest: 'dist/img/'
      }]
    }
  };
};
