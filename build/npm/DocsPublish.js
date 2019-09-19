const Plugins = require('./DocsPlugins')
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
        fse.copySync(module.from, module.to)

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
