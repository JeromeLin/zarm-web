var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pkg = require('./package');

module.exports = {

  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel',
        exclude: /node_modules/
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?sourceMap&-minimize!sass-loader"
        )
      },
      {
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?sourceMap&-minimize"
        )
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
    new ExtractTextPlugin('[name].min.css')
  ],
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map'
};
