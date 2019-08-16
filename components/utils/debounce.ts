export default function debounce(func: (...arg: any[]) => any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  let result: any;
  return function debounced(this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(this, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
}
