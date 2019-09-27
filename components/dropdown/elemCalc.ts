export function getOffsetElem(elem: HTMLElement) {
  let parentElem = elem.parentNode;
  while (parentElem) {
    if (parentElem instanceof HTMLElement) {
      if (parentElem.style.position === 'fixed'
        || window.getComputedStyle(parentElem).position === 'fixed'
        || parentElem === document.body) {
        return parentElem;
      }
      parentElem = parentElem.parentNode;
    } else {
      break;
    }
  }
  return document.body;
}

// 获取元素坐标
export function getElemPosition(elem: HTMLElement, relativeElem: HTMLElement = document.body) {
  let parentElem = elem.parentElement;
  let offsetParentElem = elem.offsetParent;
  const position: { top: number; left: number } = {
    top: elem.offsetTop,
    left: elem.offsetLeft,
  };
  while (relativeElem.contains(parentElem!)) {
    if (parentElem instanceof HTMLElement) {
      if (relativeElem === parentElem) {
        return position;
      }
      if (offsetParentElem === parentElem) {
        position.top += parentElem.offsetTop;
        position.left += parentElem.offsetLeft;
        offsetParentElem = parentElem.offsetParent;
      }
      position.top -= parentElem.scrollTop;
      position.left -= parentElem.scrollLeft;
      parentElem = parentElem.parentElement;
    }
  }
  return position;
}