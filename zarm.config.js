const path = require('path');
const { name, version } = require('./package.json');

module.exports = {
  entries: {
    index: {
      entry: ['./site/index.js'],
      template: './site/index.html',
      favicon: './site/favicon.ico',
    },
    index_umd: {
      template: './site/index_umd.html',
      inject: false,
    },
  },
  resolve: {
    alias: {
      'zarm-web': path.join(process.cwd(), 'components'),
      '@': path.join(process.cwd(), '/'),
      '@site': path.join(process.cwd(), 'site'),
    },
  },
  banner: `
    ${name} v${version}

    Github: https://github.com/ZhonganTechENG/${name}

    Copyright (c) 2013-present, ZhonganTech, Inc.

    This source code is licensed under the MIT license found in the
    LICENSE file in the root directory of this source tree.
  `,
  setBabelOptions: (options) => {
    options.plugins.push([
      'prismjs',
      {
        languages: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'scss', 'markup', 'bash'],
        theme: 'default',
        css: true,
      },
    ]);
  },
  setRules: (rules) => {
    rules.push({
      test: /\.md$/,
      use: ['raw-loader'],
    });
  },
};
