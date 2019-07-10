type AnyFn = (...args: any[]) => any;

const throttle = (func: AnyFn, delay: number) => {
  let timer: number;
  let startTime = Date.now();

  return function decorateFn(this: any, ...args: any[]) {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(this, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};

export default throttle;
