function convertPathToHtml(path) {
  let htmlpath = ''
  while (path.startsWith('../')) {
    path = path.slice(3)
    htmlpath += htmlpath.length < 2 ? '.' : '/..'
  }

  return htmlpath
}

export { convertPathToHtml }
