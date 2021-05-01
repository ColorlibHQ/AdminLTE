'use strict'

const browserslist = require('browserslist')

function getBuildTargets(targ) {
  const SUPPORTED_BUILD_TARGETS = targ !== 'default' ?
    targ :
    [
      'es',
      'chrome',
      'edge',
      'firefox',
      'ios',
      'node',
      'safari'
    ]
  const sep = ' '
  const supported = b => SUPPORTED_BUILD_TARGETS.some(t => b.startsWith(t + sep)) ? b.replace(sep, '') : undefined

  const getEveryTar = browserslist().map(element => supported(element)).filter(Boolean).reverse()

  let singleTar = ''
  const targets = []
  let i = 0
  for (const tar of getEveryTar) {
    for (const selTar of SUPPORTED_BUILD_TARGETS) {
      if (tar.startsWith(selTar) && !singleTar.startsWith(selTar)) {
        singleTar = tar
        i++
        targets[i] = singleTar
      }
    }
  }

  return targets.filter(Boolean)
}

module.exports.getTarget = targ => {
  return getBuildTargets(targ)
}
