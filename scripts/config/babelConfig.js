const browserlist = require('./browserlist');

module.exports = {
  presets: [
    ['env', {
      modules: false,
      targets: {
        browsers: browserlist,
      },
    }],
    'react',
    'stage-0',
  ],
  plugins: [
    'transform-runtime',
  ],
};
