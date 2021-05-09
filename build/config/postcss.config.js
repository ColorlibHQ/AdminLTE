'use strict'

module.exports = ctx => {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: {
      autoprefixer: {
        cascade: false
      },
      rtlcss: ctx.env === 'RTL' ? {} : false
    }
  }
}
