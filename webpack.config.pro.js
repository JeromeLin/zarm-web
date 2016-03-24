
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: {
    index: ['./examples/index.js']
  },

  output: {
    path: path.join(process.cwd(), 'assets'),
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
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/, 
        loader: 'style!css?sourceMap&-minimize!autoprefixer'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(html)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('stylesheet/[name].css', {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      __DEBUG__: true
    }),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
