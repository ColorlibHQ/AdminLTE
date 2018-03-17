const Plugins = require('./Plugins')
const copydir = require('copy-dir')

class Publish {
  constructor() {
    this.options = {
      verbose: false
    }

    this.getArguments()
  }

  getArguments() {
    if (process.argv.length > 2) {
      let arg = process.argv[2]
      switch (arg) {
        case '-v':
        case '--verbose':
          this.options.verbose = true
          break
        default:
          throw new Error(`Unknown option ${arg}`)
      }
    }
  }

  run() {
    // Publish files
    Plugins.forEach((module) => {
      copydir(module.from, module.to, (stat, filepath, filename) => {
        if (this.options.verbose) {
          console.log(`Copied ${filename} from ${module.from} to ${module.to}`)
        }
        return true
      }, error => {
        if (error) {
          console.error(`Error: ${error}`)
        }
      })
    })
  }
}

(new Publish()).run()
