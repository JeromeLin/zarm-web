const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config.base');

config.mode = 'production';

config.entry = {
  index: ['./sites/index.js'],
};

// github gh-pages dir http://xxxx.com/dragon-ui/
config.output = {
  path: path.resolve(__dirname, 'assets'),
  filename: 'js/[name].[hash:8].js',
  chunkFilename: 'js/[name].[chunkhash:8].min.js',
  publicPath: './',
};

config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
};

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash:8].css',
  })
);
config.plugins.push(
  new HtmlWebpackPlugin({
    template: './sites/index.html',
  })
);

module.exports = config;
