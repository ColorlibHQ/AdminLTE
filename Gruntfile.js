'use strict';
module.exports = function (grunt) {
  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
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
          "dist/css/AdminLTE.css": "build/less/AdminLTE.less"
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
          "dist/css/AdminLTE.min.css": "build/less/AdminLTE.less"
        }
      }
    },
    //Uglify task info
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
    }
  });
  // the default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};