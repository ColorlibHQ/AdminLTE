function convertPathToHtml(path) {
  let htmlpath = ''
  while (path.startsWith('../')) {
    path = path.slice(3)
    htmlpath.length < 2 ? htmlpath += '.' : htmlpath += '/..'
  }
  
  return htmlpath
}

export { convertPathToHtml }
