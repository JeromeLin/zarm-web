import React, { ReactElement, ReactNode } from 'react';
import TreeNode from './TreeNode';

// 判断当前对象是否是object类型
function isPlainObject(obj) {
  if (Object.prototype.toString.call(obj).toLowerCase() !== '[object object]') {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  return proto.constructor && proto.constructor === Object;
}

// 深拷贝对象
export function deepCopy(data) {
  if (Array.isArray(data)) {
    return data.map((elem) => {
      return deepCopy(elem);
    });
  }
  if (!isPlainObject(data)) {
    return data;
  }
  return Object.keys(data).reduce((prev, key) => {
    const value = data[key];
    prev[key] = deepCopy(value);
    return prev;
  }, {});
}

/**
 * 对数组删除一个指定的值
 * @param list {Array} 要处理的数组
 * @param value 要删除的值
 * @returns {Array} 返回的新数组
 */
export function arrDel(list, value) {
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

/**
 * 对数组添加一个指定的值
 * @param list {Array} 要处理的数组
 * @param value 要添加的值
 * @returns {Array} 返回的新数组
 */
export function arrAdd(list, value) {
  const clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

/**
 * 对当前节点过滤出所属TreeNode类型的节点
 * @param node {object} 要处理的节点对象
 * @returns {Array} 返回过滤完的节点
 */
export const getTreeNodeChildren = (node: { children?: ReactNode }): Array<ReactElement<TreeNode>> => {
  const { children } = node;
  return React.Children.toArray(children).filter((item) => {
    if (item && ((item as ReactElement<any>).type === TreeNode)) {
      return true;
    }
  }).map(item => (item as ReactElement<TreeNode>));
};

/**
 * 将React的TreeNode节点全部转化为普通的树形结构的object
 * @param node {object} 要处理的节点对象
 * @returns {Array} 返回过滤完的节点
 */
export function convertTreeToData(treeNode): Array<object> {
  if (treeNode && treeNode.length !== 0) {
    return React.Children.toArray(treeNode).map((node: ReactElement<any>) => {
      const { children, ...props } = node.props;
      const obj = { ...props };
      if (children) {
        const treeNodeChildren = getTreeNodeChildren({ children });
        if (treeNodeChildren.length > 0) {
          obj.children = convertTreeToData(treeNodeChildren);
        }
      }
      return obj;
    });
  }
  return [];
}

// 判断当前节点是否是禁用状态
export function isCheckDisabled(node) {
  const { checkDisabled = false } = node;
  return checkDisabled;
}

/**
 * 根据keys来获取对应的node
 * @param keys {string} 要获取的结点的keys
 * @param treeData {array} 整个树结点
 */
function getNodeFromKey(keys, treeData: Array<object>) {
  return keys.split('-').reduce((node, keySplit, index) => {
    if (!node || node.length === 0) {
      return null;
    }
    return (index === 0) ? node[keySplit] : (node.children || [])[keySplit];
  }, treeData);
}

/**
 * 根据选中状态变化的结点的keys数组，经过父级以及子级层层遍历判断，得到最终选中结点的数组以及更新状态属性后的treeData
 * @param keysList {array} 状态变化的结点keys数组
 * @param isChecked {boolean} 目标变化状态（是否选中）
 * @param treeData {array} 整个树结点数组
 * @param originCheckedStateMap 原有所有选中结点的keys数组(包含全选中、未全选状态的节点数组)
 * @returns {checkedKeys, halfCheckedKeys, treeData}
 */
export function conductCheck(
  keysList,
  isChecked,
  treeData: Array<object>,
  originCheckedStateMap?: {
    checkedKeys: Array<string>,
    halfCheckedKeys: Array<string>,
  },
): { checkedKeys: Array<string>, halfCheckedKeys: Array<string>, treeData: Array<object> } {
  const checkedKeys: object = {};
  const halfCheckedKeys: object = {};
  const finalCheckedKeysList: Array<string> = [];
  const finalHalfCheckedKeysList: Array<string> = [];

  if (originCheckedStateMap) {
    // 将当前已选中的node Keys同步到checkedKeys
    (originCheckedStateMap.checkedKeys || []).forEach((keys) => {
      checkedKeys[keys] = true;
    });

    // 将当前已选中的node Keys同步到checkedKeys
    (originCheckedStateMap.halfCheckedKeys || []).forEach((keys) => {
      halfCheckedKeys[keys] = true;
    });
  }

  function conductUp(node) {
    const { parent } = node;

    if (!parent || isCheckDisabled(parent)) {
      return;
    }
    resetNodeCheckedState(parent, isChecked, 'up');
    /*
      以下两种情况，更新结点状态，并且递归往上继续查询且更新父结点
      如果当前操作为选中，并且当前选中的个数只有一个；
      如果前操作为选空，并且目前子结点已经全空。
    */
    if ((isChecked && parent.checkedCount === 1) || (!isChecked && parent.checkedCount === 0)) {
      conductUp(parent);
    }
  }

  /**
   * 更新传入节点的所有父节点的选中状态
   * @param node 节点
   */
  function setParentNodeCheckedState(node) {
    const { parent } = node;
    if (!parent || isCheckDisabled(parent)) {
      return;
    }
    const { validNotesLen, checkedNotesLen, halfCheckedNotesLen } = getChildrenNodesLen(parent);
    if (checkedNotesLen === 0 && halfCheckedNotesLen === 0) {
      checkedKeys[parent.keys] = false;
      halfCheckedKeys[parent.keys] = false;
    } else if (validNotesLen === checkedNotesLen) {
      checkedKeys[parent.keys] = true;
      halfCheckedKeys[parent.keys] = false;
    } else {
      halfCheckedKeys[parent.keys] = true;
      checkedKeys[parent.keys] = false;
    }
    setParentNodeCheckedState(parent);
  }

  /**
   * 分别获取所传入节点的有效节点（未禁用），选中状态以及半选中状态的节点
   * @param node 传入节点
   * @returns {validNotesLen: number; checkedNotesLen: number; halfCheckedNotesLen: number}
   */
  function getChildrenNodesLen(node) {
    const resObj = { validNotesLen: 0, checkedNotesLen: 0, halfCheckedNotesLen: 0 };
    let validNotes = [];
    if (node && node.children) {
      validNotes = node.children.filter(item => !isCheckDisabled(item));
      resObj.validNotesLen = validNotes.length;
      resObj.halfCheckedNotesLen = validNotes.filter((item: { keys: string }) => halfCheckedKeys[item.keys]).length;
      resObj.checkedNotesLen = validNotes.filter((item: { keys: string }) => checkedKeys[item.keys]).length;
    }
    return resObj;
  }

  function conductDown(node) {
    if (isCheckDisabled(node)) {
      return;
    }
    const { children, keys } = node;
    checkedKeys[keys] = isChecked;
    halfCheckedKeys[keys] = false;
    resetNodeCheckedState(node, isChecked, 'down');
    if (children) {
      children.filter(child => !isCheckDisabled(child)).forEach((_node) => {
        conductDown(_node);
      });
    }
  }

  (keysList || []).forEach((keys) => {
    const node = getNodeFromKey(keys, treeData);
    if (!node) {
      console.warn(`keys为${keys}的结点不存在！`);
      return;
    }

    // 更新当前选中节点的状态
    checkedKeys[keys] = isChecked;
    halfCheckedKeys[keys] = false;

    if (isCheckDisabled(node)) {
      return;
    }
    // 根据当前节点向上且向下更新所有父节点以及子节点的选中状态
    conductUp(node);
    setParentNodeCheckedState(node);
    conductDown(node);
  });

  Object.keys(checkedKeys).forEach((keys: string) => {
    if (checkedKeys[keys]) {
      finalCheckedKeysList.push(keys);
    }
  });

  Object.keys(halfCheckedKeys).forEach((keys: string) => {
    if (halfCheckedKeys[keys]) {
      finalHalfCheckedKeysList.push(keys);
    }
  });

  return {
    checkedKeys: finalCheckedKeysList,
    halfCheckedKeys: finalHalfCheckedKeysList,
    treeData,
  };
}

/** 根据当前传入结点的选中状态，更新当前结点的已选中节点的总数
 * @param node {object} 当前传入结点
 * @param isChecked {bool} 目标变化是否选中
 * @param conductDirection {string} 当前是向上还是向下关系的更新
 */
function resetNodeCheckedState(node, isChecked, conductDirection) {
  if (conductDirection === 'up') {
    isChecked ? (node.checkedCount += 1) : (node.checkedCount -= 1);
  } else {
    const nodeLength = (node.children || []).filter(child => !isCheckDisabled(child)).length;
    isChecked ? (node.checkedCount = nodeLength) : (node.checkedCount = 0);
  }
}

/** 根据传入的展开结点keys的数组，初始化最终要展开的相关所有父结点
 * @param keysList {Array} 要展开的结点list数组
 * @param treeData {object} 当前树形结构的map对象
 */
export function conductExpandParent(keysList, treeData) {
  const expandedKeys = {};

  function conductUp(node) {
    if (expandedKeys[node.keys]) {
      return;
    }
    const { parent, keys } = node;
    expandedKeys[keys] = true;

    if (parent) {
      conductUp(parent);
    }
  }

  (keysList || []).forEach((keys) => {
    const node = getNodeFromKey(keys, treeData);
    if (!node) {
      console.warn(`keys为${keys}的展开结点不存在！`);
      return;
    }
    conductUp(node);
  });

  return Object.keys(expandedKeys);
}

/** 初始化treeNode树（挂载结点parent关系以及checkCount）
 * @param treeData {object} 当前树形结构的map对象
 */
export function initialTreeData(treeData) {
  let allExpandDataMap = {};
  let finalTreeData;

  function loop(node, parentNode) {

    return node.map((_node) => {
      const { children, keys } = _node;
      _node.parent = parentNode;
      _node.checkedCount = 0;
      if (children && children.length > 0) {
        allExpandDataMap[keys] = _node;
        _node.children = loop(children, _node);
      }
      return _node;
    });
  }

  finalTreeData = loop(treeData, null);

  return {
    allExpandDataMap,
    treeData: finalTreeData,
  };
}
