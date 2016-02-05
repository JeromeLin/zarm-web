
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: {
    index: [
      'webpack-dev-server/client?http://127.0.0.1:3000',
      'webpack/hot/only-dev-server',
      './examples/index.js'
    ],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].[chunkhash:8].min.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      { 
        test: /\.scss$/, 
        loader: 'style!css?sourceMap&-minimize!autoprefixer!sass?sourceMap'
      },
      { 
        test: /\.css$/, 
        loader: 'style!css?sourceMap&-minimize!autoprefixer'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      __DEBUG__: true
    })
  ],
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map'
};
