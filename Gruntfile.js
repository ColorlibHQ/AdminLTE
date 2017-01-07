// AdminLTE Gruntfile
module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    srcdir: 'build/',
    dstdir: '../../public/',
    watch: {
      // If any .less file changes in directory "build/less/" run the "less"-task.
      files: ["<%= srcdir %>less/*.less", "<%= srcdir %>less/skins/*.less", "<%= dstdir %>js/app.js"],
      tasks: ["less", "uglify"]
    },
    // "less"-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less: {
      // Development not compressed
      development: {
        options: {
          // Whether to compress or not
          compress: false
        },
        files: {
          // compilation.css  :  source.less
          "<%= dstdir %>css/AdminLTE.css": "<%= srcdir %>less/AdminLTE.less",
          //Non minified skin files
          "<%= dstdir %>css/skins/skin-blue.css": "<%= srcdir %>less/skins/skin-blue.less",
          "<%= dstdir %>css/skins/skin-black.css": "<%= srcdir %>less/skins/skin-black.less",
          "<%= dstdir %>css/skins/skin-yellow.css": "<%= srcdir %>less/skins/skin-yellow.less",
          "<%= dstdir %>css/skins/skin-green.css": "<%= srcdir %>less/skins/skin-green.less",
          "<%= dstdir %>css/skins/skin-red.css": "<%= srcdir %>less/skins/skin-red.less",
          "<%= dstdir %>css/skins/skin-purple.css": "<%= srcdir %>less/skins/skin-purple.less",
          "<%= dstdir %>css/skins/skin-blue-light.css": "<%= srcdir %>less/skins/skin-blue-light.less",
          "<%= dstdir %>css/skins/skin-black-light.css": "<%= srcdir %>less/skins/skin-black-light.less",
          "<%= dstdir %>css/skins/skin-yellow-light.css": "<%= srcdir %>less/skins/skin-yellow-light.less",
          "<%= dstdir %>css/skins/skin-green-light.css": "<%= srcdir %>less/skins/skin-green-light.less",
          "<%= dstdir %>css/skins/skin-red-light.css": "<%= srcdir %>less/skins/skin-red-light.less",
          "<%= dstdir %>css/skins/skin-purple-light.css": "<%= srcdir %>less/skins/skin-purple-light.less",
          "<%= dstdir %>css/skins/_all-skins.css": "<%= srcdir %>less/skins/_all-skins.less"
        }
      },
      // Production compresses version
      production: {
        options: {
          // Whether to compress or not
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "<%= dstdir %>css/AdminLTE.min.css": "<%= srcdir %>less/AdminLTE.less",
          // Skins minified
          "<%= dstdir %>css/skins/skin-blue.min.css": "<%= srcdir %>less/skins/skin-blue.less",
          "<%= dstdir %>css/skins/skin-black.min.css": "<%= srcdir %>less/skins/skin-black.less",
          "<%= dstdir %>css/skins/skin-yellow.min.css": "<%= srcdir %>less/skins/skin-yellow.less",
          "<%= dstdir %>css/skins/skin-green.min.css": "<%= srcdir %>less/skins/skin-green.less",
          "<%= dstdir %>css/skins/skin-red.min.css": "<%= srcdir %>less/skins/skin-red.less",
          "<%= dstdir %>css/skins/skin-purple.min.css": "<%= srcdir %>less/skins/skin-purple.less",
          "<%= dstdir %>css/skins/skin-blue-light.min.css": "<%= srcdir %>less/skins/skin-blue-light.less",
          "<%= dstdir %>css/skins/skin-black-light.min.css": "<%= srcdir %>less/skins/skin-black-light.less",
          "<%= dstdir %>css/skins/skin-yellow-light.min.css": "<%= srcdir %>less/skins/skin-yellow-light.less",
          "<%= dstdir %>css/skins/skin-green-light.min.css": "<%= srcdir %>less/skins/skin-green-light.less",
          "<%= dstdir %>css/skins/skin-red-light.min.css": "<%= srcdir %>less/skins/skin-red-light.less",
          "<%= dstdir %>css/skins/skin-purple-light.min.css": "<%= srcdir %>less/skins/skin-purple-light.less",
          "<%= dstdir %>css/skins/_all-skins.min.css": "<%= srcdir %>less/skins/_all-skins.less"
        }
      }
    },
    // Uglify task info. Compress the js files.
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      my_target: {
        files: {
          '<%= dstdir %>js/app.min.js': ['<%= dstdir %>js/app.js']
        }
      }
    },
    // Build the documentation files
    includes: {
      build: {
        src: ['*.html'], // Source files
        dest: 'documentation/', // Destination directory
        flatten: true,
        cwd: 'documentation/build',
        options: {
          silent: true,
          includePath: 'documentation/<%= srcdir %>include'
        }
      }
    },

    // Optimize images
    image: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= srcdir %>img/',
          src: ['**/*.{png,jpg,gif,svg,jpeg}'],
          dest: '<%= dstdir %>img/'
        }]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: {
        src: '<%= dstdir %>js/app.js'
      },
      demo: {
        src: '<%= dstdir %>js/demo.js'
      },
      pages: {
        src: '<%= dstdir %>js/pages/*.js'
      }
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: '<%= srcdir %>less/.csslintrc'
      },
      dist: [
        '<%= dstdir %>css/AdminLTE.css',
      ]
    },

    // Validate Bootstrap HTML
    bootlint: {
      options: {
        relaxerror: ['W005']
      },
      files: ['pages/**/*.html', '*.html']
    },

    // Delete images in build directory
    // After compressing the images in the <%= srcdir %>img dir, there is no need
    // for them
    clean: {
      build: ["<%= srcdir %>img/*"]
    }
  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes');
  // Optimize images
  grunt.loadNpmTasks('grunt-image');
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint');

  // Linting task
  grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint']);

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
