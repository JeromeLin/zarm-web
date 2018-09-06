const babelJest = require('babel-jest');
const browsers = require('../config/browserlist');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          browsers,
        },
      },
    ],
    'react',
    'stage-0',
  ],
});
