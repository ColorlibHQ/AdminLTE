'use strict'

module.exports = {
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: [
    require('autoprefixer')({
      cascade: false
    })
  ]
}
