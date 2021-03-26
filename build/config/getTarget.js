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

  const getEveryTar = browserslist().reverse()
  const sep = ' '
  const targets = []
  let singleTar = ''
  let i = 0

  for (const tar of getEveryTar) {
    for (const selTar of SUPPORTED_BUILD_TARGETS) {
      if (tar.startsWith(selTar + sep) && !singleTar.startsWith(selTar)) {
        i++
        singleTar = tar.replace(sep, '')
        targets[i] = singleTar
      }
    }
  }

  return targets.filter(Boolean)
}

module.exports.getTarget = targ => {
  return getBuildTargets(targ)
}
