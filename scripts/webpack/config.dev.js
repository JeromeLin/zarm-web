const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.base');

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';

config.entry = {
  index: [
    'react-hot-loader/patch',
    './examples/index.js',
  ],
};

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: 'stylesheet/[name].css',
    chunkFilename: 'stylesheet/[id].css',
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.s?css$/,
        chunks: 'all',
        minChunks: 5,
        enforce: true,
      },
    },
  }),
  new webpack.optimize.RuntimeChunkPlugin({
    name: 'manifest',
  })
);

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['manifest', key],
  }));
});

config.devServer = {
  host: '0.0.0.0',
  port: 3001,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
};

config.resolve.alias = {
  'dragon-ui': process.cwd(),
};

module.exports = config;
