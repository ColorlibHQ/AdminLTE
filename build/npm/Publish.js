#!/usr/bin/env node

'use strict'

const path = require('path')
const fse = require('fs-extra')
const Plugins = require('./Plugins')

class Publish {
  constructor() {
    this.options = {
      verbose: false
    }

    this.getArguments()
  }

  getArguments() {
    if (process.argv.length > 2) {
      const arg = process.argv[2]
      switch (arg) {
        case '-v':
        case '--verbose': {
          this.options.verbose = true
          break
        }

        default: {
          throw new Error(`Unknown option ${arg}`)
        }
      }
    }
  }

  run() {
    // Publish files
    Plugins.forEach(module => {
      const fseOptions = {
        // Skip copying dot files
        filter(src) {
          return !path.basename(src).startsWith('.')
        }
      }

      try {
        if (fse.existsSync(module.from)) {
          fse.copySync(module.from, module.to, fseOptions)
        } else {
          fse.copySync(module.from.replace('node_modules/', '../'), module.to, fseOptions)
        }

        if (this.options.verbose) {
          console.log(`Copied ${module.from} to ${module.to}`)
        }
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    })
  }
}

(new Publish()).run()
