
var webpack = require('webpack');
var config = require('./webpack.config.base');
var path = require('path');

config.entry = {
  'dragon-ui.style': ['./styles/importCss.js']
};

config.output = {
  path: path.join(process.cwd(), 'dist'),
  filename: '[name].min.js'
};

module.exports = config;