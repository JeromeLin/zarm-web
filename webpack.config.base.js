var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {

  output: {
    path: path.join(process.cwd(), 'assets'),
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].[chunkhash:8].min.js',
    publicPath: './'
  },

  module: {
    loaders: [
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer")
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  
  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};

// module.exports = {

//   module: {
//     loaders: [
//       { 
//         test: /\.(js|jsx)$/, 
//         loader: 'babel',
//         exclude: /node_modules/
//       },
//       { 
//         test: /\.scss$/, 
//         loader: ExtractTextPlugin.extract(
//           "style-loader",
//           "css-loader?sourceMap&-minimize!sass-loader"
//         )
//       },
//       {
//         test: /\.css$/, 
//         loader: ExtractTextPlugin.extract(
//           "style-loader",
//           "css-loader?sourceMap&-minimize"
//         )
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
//         loader: 'url-loader?limit=8192'
//       },
//       {
//         test: /\.(eot|ttf|wav|mp3)$/,
//         loader: 'file-loader'
//       }
//     ]
//   },

//   plugins: [
//     new ExtractTextPlugin('[name].min.css')
//   ],
  
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },

//   devtool: 'source-map'
// };
