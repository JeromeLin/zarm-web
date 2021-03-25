const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('zarm-web.css')
  .hasFile('zarm-web.min.css')
  .hasFile('zarm-web.js')
  .hasFile('zarm-web.min.js');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `dist` directory is valid.'));
