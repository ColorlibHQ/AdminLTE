'use strict';
module.exports = function (grunt) {
  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-includes');
  
  grunt.initConfig({
    watch: {
      // if any .less file changes in directory "build/less/" run the "less"-task.
      files: ["build/less/*.less", "build/less/skins/*.less", "dist/js/app.js"],
      tasks: ["less", "uglify"]
    },
    // "less"-task configuration
    //this task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less: {
      //Development not compressed
      development: {
        options: {
          //Wether to compress or not
          compress: false
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/AdminLTE.css": "build/less/AdminLTE.less",
          "dist/css/skins/skin-blue.css": "build/less/skins/skin-blue.less",
          "dist/css/skins/skin-black.css": "build/less/skins/skin-black.less",
          "dist/css/skins/skin-yellow.css": "build/less/skins/skin-yellow.less",
          "dist/css/skins/skin-green.css": "build/less/skins/skin-green.less",
          "dist/css/skins/skin-red.css": "build/less/skins/skin-red.less",
          "dist/css/skins/skin-purple.css": "build/less/skins/skin-purple.less",
          "dist/css/skins/_all-skins.css": "build/less/skins/_all-skins.less"
        }
      },
      //production compresses version
      production: {
        options: {
          //Wether to compress or not          
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "dist/css/AdminLTE.min.css": "build/less/AdminLTE.less",
          "dist/css/skins/skin-blue.min.css": "build/less/skins/skin-blue.less",
          "dist/css/skins/skin-black.min.css": "build/less/skins/skin-black.less",
          "dist/css/skins/skin-yellow.min.css": "build/less/skins/skin-yellow.less",
          "dist/css/skins/skin-green.min.css": "build/less/skins/skin-green.less",
          "dist/css/skins/skin-red.min.css": "build/less/skins/skin-red.less",
          "dist/css/skins/skin-purple.min.css": "build/less/skins/skin-purple.less",
          "dist/css/skins/_all-skins.min.css": "build/less/skins/_all-skins.less"
        }
      }
    },
    //Uglify task info. Compress the js files.
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
    //Build the documentation files
    includes: {
      build: {
        src: ['*.html'], // Source files 
        dest: 'documentation/', // Destination directory 
        flatten: true,
        cwd: 'documentation/build',
        options: {
          silent: true,
          includePath: 'documentation/build/include'
          //banner: '<!-- I am a banner <% includes.files.dest %> -->'
        }
      }
    }
  });
  // the default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
