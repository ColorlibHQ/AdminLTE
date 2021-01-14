'use strict'

module.exports = {
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: [
    require('postcss-scrollbar')({
      edgeAutohide: true
    }),
    require('autoprefixer')({
      cascade: false
    })
  ]
}
