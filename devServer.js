const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const dir = __dirname + '/examples';

new WebpackDevServer(webpack(config), {
  contentBase: dir,
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  noInfo: false,
  historyApiFallback: true
}).listen(3000, function(err, result) {
  if (err) {
    console.log(err); // eslint-disable-line
  }
  console.log('Listening at localhost:3000'); // eslint-disable-line
});
