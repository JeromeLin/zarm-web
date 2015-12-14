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
        test: /\.(png|jpg)$/, 
        loader: 'url?limit=8192' 
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
