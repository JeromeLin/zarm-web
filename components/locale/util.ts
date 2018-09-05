/* eslint-disable */
import format from './format';
import zh from './lang/zh-cn';

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

export function qs(name, url?) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default {
  use,
  t,
};
