const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.mode = 'development';

config.entry = {
  index: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './sites/index.js'
  ]
};

config.output = {
  path: path.join(__dirname, '/dist'),
  filename: '[name].js',
  publicPath: '/'
};

config.devServer = {
  contentBase: path.join(__dirname, '/dist'),
  noInfo: false,
  hot: true,
  historyApiFallback: true,
  open: true,
  port: 3000,
};

config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
});

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(
  new HtmlWebpackPlugin({
    inject: false,
    template: './sites/index.html',
    filename: 'index.html'
  })
);

module.exports = config;
