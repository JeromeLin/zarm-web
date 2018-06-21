
/* eslint-disable */
export default function (node, tree) {
  while (node) {
    if (node === tree) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
