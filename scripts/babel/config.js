module.exports = {
  presets: [
    ['@babel/env', {
      modules: false,
    }],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', { corejs: 2 }],
  ],
};
