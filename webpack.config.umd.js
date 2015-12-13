var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack.config.base');
var path = require('path');

config.output = {
  library: 'DragonUI',
  libraryTarget: 'umd'
};

config.externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  }
};

module.exports = config;
