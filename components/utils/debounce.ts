export default function debounce(func: (...arg: any[]) => any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  let result: any;
  return function debounced(this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = window.setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(this, args);
      }
    } else {
      timeout = window.setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
}
