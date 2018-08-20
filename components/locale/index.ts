/* eslint-disable */
import format from './format';
import zh from './lang/zh-CN';
import en from './lang/en';

let _lang = zh;

function use(lang) {
  _lang = lang;
}

function t(path, options?) {
  const array = path.split('.');
  let current = _lang;

  for (let i = 0, j = array.length; i < j; i++) {
    let property = array[i];
    let value = current[property];
    if (i === j - 1) {
      if (typeof value === 'string') {
        return format(value, options);
      }
      return value;
    }
    if (!value) {
      return '';
    }
    current = value;
  }
  return '';
}

export default {
  use,
  t,
  en,
  zh,
};
