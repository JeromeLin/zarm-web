const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

export interface NodeType {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

const computedStyleCache: { [key: string]: NodeType } = {};
let hiddenTextarea: HTMLTextAreaElement;

export function calculateNodeStyling(node: HTMLElement, useCache = false) {
  const nodeRef = (node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name')) as string;

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  const style = window.getComputedStyle(node);

  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');

  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));

  const sizingStyle = SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ';',
  );

  const nodeInfo: NodeType = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}

export default function calculateNodeHeight(
  uiTextNode: HTMLTextAreaElement,
  useCache = false,
  minRows: number | null = null,
  maxRows: number | null = null,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap') as string);
  } else {
    hiddenTextarea.removeAttribute('wrap');
  }

  const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateNodeStyling(
    uiTextNode,
    useCache,
  );

  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

  let minHeight = Number.MIN_SAFE_INTEGER;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  let height = hiddenTextarea.scrollHeight;
  let overflowY: any;

  if (boxSizing === 'border-box') {
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    height -= paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = ' ';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight, overflowY };
}
