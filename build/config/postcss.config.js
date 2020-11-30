'use strict'

module.exports = () => {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: {
      autoprefixer: {
        cascade: false
      }
    }
  }
}
