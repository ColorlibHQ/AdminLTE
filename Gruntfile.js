// AdminLTE Gruntfile

module.exports = function (grunt) {

  'use strict'

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
    ' * AdminLTE v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' * Project website Almsaeed Studio (https://almsaeedstudio.com)\n' +
    ' * Licensed under MIT (https://github.com/almasaeed2010/AdminLTE/blob/master/LICENSE)\n' +
    ' */\n',

    // Watch files for changes and invoke appropriate compiler
    watch: {
      sass: {
        files: ['build/scss/*.scss', 'build/scss/skins/*.scss'],
        tasks: ['sass']
      },
      es6: {
        files: ['build/js/src/*.js'],
        tasks: ['babel']
      },
      js: {
        files: ['dist/js/AdminLTE.js', 'dist/js/app.js'],
        tasks: ['uglify']
      }
    },

    // SASS compiler
    sass: {
      development: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/AdminLTE.css': 'build/scss/AdminLTE.scss'
        }
      },
      production: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/adminlte.min.css': 'build/scss/AdminLTE.scss'
        }
      }
    },

    // Compress the js files.
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      target: {
        files: {
          'dist/js/adminlte.min.js': ['dist/js/adminlte.js'],
          'dist/js/app.min.js': ['dist/js/app.js']
        }
      }
    },

    // Compile ES6
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'build/js/dist/Treeview.js': 'build/js/src/Treeview.js',
          'build/js/dist/PushMenu.js': 'build/js/src/PushMenu.js',
          'build/js/dist/Widget.js': 'build/js/src/Widget.js'
        }
      }
    },

    // Concat compiled JS files
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      adminlte: {
        src: [
          'build/js/dist/Treeview.js',
          'build/js/dist/PushMenu.js',
          'build/js/dist/Widget.js'
        ],
        dest: 'dist/js/adminlte.js'
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

    // Optimize images
    image: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: 'build/img/',
            src: ['**/*.{png,jpg,gif,svg,jpeg}'],
            dest: 'dist/img/'
          }
        ]
      }
    },

    eslint: {
      options: {
        configFile: 'build/js/.eslintrc'
      },
      target: 'build/js/src/*.js'
    },

    // Lint JS code
    jscs: {
      options: {
        config: 'build/js/.jscsrc'
      },
      grunt: {
        src: ['Gruntfile.js']
      },
      core: {
        src: 'js/src/*.js'
      }
      /*app: {
       src: 'dist/js/app.js'
       }*/
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: 'build/scss/.csslintrc'
      },
      dist: [
        'dist/css/AdminLTE.css'
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
    // After compressing the images in the build/img dir, there is no need
    // for them
    clean: {
      build: ['build/img/*']
    }
  })

  // Load all grunt tasks

  // SASS compiler
  grunt.loadNpmTasks('grunt-sass')
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch')
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify')
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes')
  // Optimize images
  grunt.loadNpmTasks('grunt-image')
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean')
  // Lint JS code
  grunt.loadNpmTasks('grunt-jscs')
  // Lint ECMA6 code
  grunt.loadNpmTasks('grunt-eslint')
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint')
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint')
  // Grunt Babel to compile ECMA6 to ECMA5
  grunt.loadNpmTasks('grunt-babel')
  // Concat files
  grunt.loadNpmTasks('grunt-contrib-concat')

  // Linting task
  grunt.registerTask('lint', ['jscs', 'eslint', 'csslint', 'bootlint'])
  // JS Build Task
  grunt.registerTask('build-js', ['babel', 'concat', 'uglify'])

  // The default task (running 'grunt' in console) is 'watch'
  grunt.registerTask('default', ['watch'])
}
