/* eslint-disable */
let lastTime = 0;
const vendors = ['webkit', 'moz'];
let rAF;
let cAF;

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  rAF = window[`${vendors[x]}RequestAnimationFrame`];
  cAF = window[`${vendors[x]}CancelAnimationFrame`] ||    // Webkit中此取消方法的名字变了
        window[`${vendors[x]}CancelRequestAnimationFrame`];
}

if (!rAF) {
  rAF = (callback) => {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cAF) {
  cAF = (id) => {
    clearTimeout(id);
  };
}

export default {
  rAF,
  cAF,
};
