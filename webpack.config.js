const webpack           = require('webpack')
const path              = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Plugins           = require('./Plugins')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass       = new ExtractTextPlugin({
  filename: '[name].css',
  disable : false
})

module.exports = [{
  entry: {
    adminlte: './build/js/AdminLTE.js'
  },

  output: {
    path      : path.resolve(__dirname, 'dist/js'),
    filename  : '[name].js',
    publicPath: '.'
  },

  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: '/node_modules/',
        use    : {
          loader : 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  plugins: []
}, {
  entry: {
    adminlte: './build/scss/AdminLTE.scss'
  },

  output: {
    path      : path.resolve(__dirname, 'dist/css'),
    filename  : '[name].css',
    publicPath: '.'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use : extractSass.extract({
          use     : [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    extractSass
  ]
}]

if (process.env.NODE_ENV === 'production') {
  module.exports[0].plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: true,
      compress : {
        warnings: false
      }
    })
  )

  module.exports[0].plugins.push(
    new CopyWebpackPlugin(Plugins)
  )

  module.exports.map(module => {
    module.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    )
  })
}