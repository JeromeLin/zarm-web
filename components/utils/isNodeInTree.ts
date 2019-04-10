
/* eslint-disable */
export default function (node: Node, tree: HTMLElement) {
  while (node) {
    if (node === tree) {
      return true;
    }
    if (node.parentNode) {
      node = node.parentNode;
    }
  }
  return false;
}
