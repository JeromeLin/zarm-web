const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require('./config.deploy');

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';
config.output.filename = 'js/[name].js';
config.output.publicPath = '/';
config.optimization.minimize = false;
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './site/index_umd.html',
    filename: 'index_umd.html',
    inject: false,
  }),
);

// hot-loader
Object.keys(config.entry).forEach((key) => {
  config.entry[key].unshift('react-hot-loader/patch');
});
config.module.rules[0].use[0].options.plugins.push('react-hot-loader/babel');

config.devServer = {
  host: 'localhost',
  port: 3001,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
  progress: true,
  open: true,
};

module.exports = config;
