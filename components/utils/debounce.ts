export default function debounce(func: (...arg: any[]) => any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  let result: any;
  return function debounced(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
}
