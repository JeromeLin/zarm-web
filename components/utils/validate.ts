// eslint-disable-next-line import/prefer-default-export
export const isArray = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};
