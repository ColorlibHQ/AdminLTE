const Plugins = require('./Plugins')
const fse     = require('fs-extra')

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
      try {
        if (fse.existsSync(module.from)) {
          fse.copySync(module.from, module.to)
        } else {
          fse.copySync(module.from.replace('node_modules/', '../'), module.to)
        }

        if (this.options.verbose) {
          console.log(`Copied ${module.from} to ${module.to}`)
        }
      } catch (err) {
        console.error(`Error: ${err}`)
      }
    })
  }
}

(new Publish()).run()
