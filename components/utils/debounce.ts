export default function debounce(func: (...arg: any[]) => any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  let result: any;
  return function debounced(this: any, ...args: any[]) {
    const context = this;
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
