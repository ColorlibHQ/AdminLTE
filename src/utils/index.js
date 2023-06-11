function convertPathToHtml(path) {
  let count = 0
  let htmlPath = ''
  while (path.startsWith('../')) {
    count++
    path = path.slice(3)
  }

  if (count === 2) {
    htmlPath = '.'
  }

  if (count === 3) {
    htmlPath = '..'
  }

  if (count === 4) {
    htmlPath = '../..'
  }

  if (count === 5) {
    htmlPath = '../../..'
  }

  return htmlPath
}

export { convertPathToHtml }
