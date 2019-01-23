export default function debounce (func, wait, immediate) {
  let timeout;
  let result;
  return function debounced () {
    const context = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
}
