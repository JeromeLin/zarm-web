// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // output: {
  //   path: path.resolve(__dirname, 'assets'),
  //   filename: 'js/[name].[hash:8].js',
  //   chunkFilename: 'js/[name].[chunkhash:8].min.js',
  //   publicPath: '/'
  // },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
          'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[hash:8].[ext]',
          },
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(html)$/,
        use: 'html-loader'
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './style/index.css',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};
