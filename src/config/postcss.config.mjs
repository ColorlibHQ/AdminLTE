const postcssConfig = {
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: {
    'rtlcss': {},
    'autoprefixer': {
      cascade: false
    }
  }
}

export default postcssConfig
