"use strict";

const webpack = require("webpack");
const fs = require("fs");

module.exports = function (env) {
  
  let externals = [];
  
  if (env && env.noDeps) {
    console.log('Building version without deps');
    externals.push("eve");
  }
  
  return {
    entry: './dev/raphael.amd.js',
    output: {
      path: __dirname,
      filename: "raphael.js",
      libraryTarget: "umd",
      library: "Raphael"
    },
    
    externals: externals,
    
    plugins: [
      new webpack.BannerPlugin({
        banner: fs.readFileSync('./dev/banner.txt', 'utf8'),
        raw: true,
        entryOnly: true
      })
    ],
    resolve: {
      alias: {
        "eve": "eve-raphael/eve"
      }
    }
  };
  
};