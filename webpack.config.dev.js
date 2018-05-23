const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.mode = 'development';

config.entry = {
  index: [
    'webpack-dev-server/client?http://127.0.0.1:3001',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './sites/index.js',
  ],
};

config.devServer = {
  contentBase: path.join(__dirname, '/dist'),
  publicPath: '/',
  noInfo: false,
  hot: true,
  historyApiFallback: true,
  open: true,
  port: 3001,
};

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'index.css',
  })
);
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(
  new HtmlWebpackPlugin({
    template: './sites/index.html',
  })
);

module.exports = config;
