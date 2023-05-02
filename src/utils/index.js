function convertPathToHtml(path) {
  let count = 0
  while (path.startsWith('../')) {
    count++
    path = path.slice(3)
  }

  if (count === 1) {
    return '.'
  }

  if (count === 2) {
    return '..'
  }

  if (count === 3) {
    return '../..'
  }

  if (count === 4) {
    return '../../..'
  }

  return ''
}

export { convertPathToHtml }
