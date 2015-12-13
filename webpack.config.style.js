
var webpack = require('webpack');
var config = require('./webpack.config.base');
var path = require('path');

config.entry = {
  style: ['./styles/importCss.js']
};

config.output = {
  path: path.join(process.cwd(), 'dist'),
  filename: '[name].js'
};

module.exports = config;