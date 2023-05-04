function convertPathToHtml(path) {
  let htmlpath = ''
  while (path.startsWith('../')) {
    path = path.slice(3)
    if (htmlpath.length < 2) {
      htmlpath += '.'
    }
    else {
      htmlpath += '/..'
    }
  }
  return htmlpath
}

export { convertPathToHtml }
