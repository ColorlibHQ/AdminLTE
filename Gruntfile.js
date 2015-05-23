'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      less: {
        // If any .less file changes in directory "build/less/" run the "less"-task.
        files: ["build/less/*.less", "build/less/skins/*.less"],
        tasks: ["less"]
      },
      sass: {
        // If any .scss file changes in directory "build/sass/" run the "sass"-task.
        files: ["build/sass/*.scss", "build/sass/skins/*.scss"],
        tasks: ["sass"]
      },
      js: {
        files: ["dist/js/app.js"],
        tasks: ["uglify"]
      }
    },
    // Compiles sass to CSS
    sass: {
      options: {
        sourcemap: 'none',
        compass: false,
        style: 'expanded'
      },
      development: {
        files: {
          // compilation.css  :  source.scss        
          "dist/css/AdminLTE.css": "build/sass/AdminLTE.scss",
          //Non minified skin files
          "dist/css/skins/skin-blue.css": "build/sass/skins/skin-blue.scss",
          "dist/css/skins/skin-black.css": "build/sass/skins/skin-black.scss",
          "dist/css/skins/skin-yellow.css": "build/sass/skins/skin-yellow.scss",
          "dist/css/skins/skin-green.css": "build/sass/skins/skin-green.scss",
          "dist/css/skins/skin-red.css": "build/sass/skins/skin-red.scss",
          "dist/css/skins/skin-purple.css": "build/sass/skins/skin-purple.scss",
          "dist/css/skins/skin-blue-light.css": "build/sass/skins/skin-blue-light.scss",
          "dist/css/skins/skin-black-light.css": "build/sass/skins/skin-black-light.scss",
          "dist/css/skins/skin-yellow-light.css": "build/sass/skins/skin-yellow-light.scss",
          "dist/css/skins/skin-green-light.css": "build/sass/skins/skin-green-light.scss",
          "dist/css/skins/skin-red-light.css": "build/sass/skins/skin-red-light.scss",
          "dist/css/skins/skin-purple-light.css": "build/sass/skins/skin-purple-light.scss",
          "dist/css/skins/_all-skins.css": "build/sass/skins/all-skins.scss"
        }
      },
      // Production compresses version
      production: {
        options: {
          // Whether to compress or not          
          style: 'compressed'
        },
        files: {
          // compilation.css  :  source.scss
          "dist/css/AdminLTE.min.css": "build/sass/AdminLTE.scss",
          // Skins minified
          "dist/css/skins/skin-blue.min.css": "build/sass/skins/skin-blue.scss",
          "dist/css/skins/skin-black.min.css": "build/sass/skins/skin-black.scss",
          "dist/css/skins/skin-yellow.min.css": "build/sass/skins/skin-yellow.scss",
          "dist/css/skins/skin-green.min.css": "build/sass/skins/skin-green.scss",
          "dist/css/skins/skin-red.min.css": "build/sass/skins/skin-red.scss",
          "dist/css/skins/skin-purple.min.css": "build/sass/skins/skin-purple.scss",
          "dist/css/skins/skin-blue-light.min.css": "build/sass/skins/skin-blue-light.scss",
          "dist/css/skins/skin-black-light.min.css": "build/sass/skins/skin-black-light.scss",
          "dist/css/skins/skin-yellow-light.min.css": "build/sass/skins/skin-yellow-light.scss",
          "dist/css/skins/skin-green-light.min.css": "build/sass/skins/skin-green-light.scss",
          "dist/css/skins/skin-red-light.min.css": "build/sass/skins/skin-red-light.scss",
          "dist/css/skins/skin-purple-light.min.css": "build/sass/skins/skin-purple-light.scss",
          "dist/css/skins/_all-skins.min.css": "build/sass/skins/all-skins.scss"
        }
      }
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
          "dist/css/AdminLTE.css": "build/less/AdminLTE.less",
          //Non minified skin files
          "dist/css/skins/skin-blue.css": "build/less/skins/skin-blue.less",
          "dist/css/skins/skin-black.css": "build/less/skins/skin-black.less",
          "dist/css/skins/skin-yellow.css": "build/less/skins/skin-yellow.less",
          "dist/css/skins/skin-green.css": "build/less/skins/skin-green.less",
          "dist/css/skins/skin-red.css": "build/less/skins/skin-red.less",
          "dist/css/skins/skin-purple.css": "build/less/skins/skin-purple.less",
          "dist/css/skins/skin-blue-light.css": "build/less/skins/skin-blue-light.less",
          "dist/css/skins/skin-black-light.css": "build/less/skins/skin-black-light.less",
          "dist/css/skins/skin-yellow-light.css": "build/less/skins/skin-yellow-light.less",
          "dist/css/skins/skin-green-light.css": "build/less/skins/skin-green-light.less",
          "dist/css/skins/skin-red-light.css": "build/less/skins/skin-red-light.less",
          "dist/css/skins/skin-purple-light.css": "build/less/skins/skin-purple-light.less",
          "dist/css/skins/_all-skins.css": "build/less/skins/_all-skins.less"
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
          "dist/css/AdminLTE.min.css": "build/less/AdminLTE.less",
          // Skins minified
          "dist/css/skins/skin-blue.min.css": "build/less/skins/skin-blue.less",
          "dist/css/skins/skin-black.min.css": "build/less/skins/skin-black.less",
          "dist/css/skins/skin-yellow.min.css": "build/less/skins/skin-yellow.less",
          "dist/css/skins/skin-green.min.css": "build/less/skins/skin-green.less",
          "dist/css/skins/skin-red.min.css": "build/less/skins/skin-red.less",
          "dist/css/skins/skin-purple.min.css": "build/less/skins/skin-purple.less",
          "dist/css/skins/skin-blue-light.min.css": "build/less/skins/skin-blue-light.less",
          "dist/css/skins/skin-black-light.min.css": "build/less/skins/skin-black-light.less",
          "dist/css/skins/skin-yellow-light.min.css": "build/less/skins/skin-yellow-light.less",
          "dist/css/skins/skin-green-light.min.css": "build/less/skins/skin-green-light.less",
          "dist/css/skins/skin-red-light.min.css": "build/less/skins/skin-red-light.less",
          "dist/css/skins/skin-purple-light.min.css": "build/less/skins/skin-purple-light.less",
          "dist/css/skins/_all-skins.min.css": "build/less/skins/_all-skins.less"
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
          'dist/js/app.min.js': ['dist/js/app.js']
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
          includePath: 'documentation/build/include'
        }
      }
    },
    cssjanus: {
      build: {
        files: {
          'dist/css/AdminLTE-rtl.css': 'dist/css/AdminLTE.css',
          'dist/css/AdminLTE-rtl.min.css': 'dist/css/AdminLTE.min.css',
          'bootstrap/css/bootstrap-rtl.css': 'bootstrap/css/bootstrap.css',
          'bootstrap/css/bootstrap-rtl.min.css': 'bootstrap/css/bootstrap.min.css'
        }
      }
    }
  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};