
/* eslint-disable */
module.exports = function (node, tree) {
  while (node) {
    if (node === tree) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};
