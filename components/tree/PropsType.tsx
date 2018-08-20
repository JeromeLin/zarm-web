import { MouseEvent, ReactNode } from 'react';
import TreeNode from './TreeNode';

export default interface PropsType {
  prefixCls?: string;
  treeData?: object[];
  canCheck?: boolean;
  checkedKeys?: string[];
  expandedKeys: string[];
  defaultExpandAll?: boolean;

  onCheck?(
    checkedMap: {
      checkedKeys: Array<string>,
      halfCheckedKeys: Array<string>,
    },
    checkedObj: {
      node: TreeNode,
      checked: boolean,
      event: MouseEvent,
    }): void;

  onExpand?(expandedObj: {
    expandedKeys: Array<string>;
    node: TreeNode;
    expanded: boolean;
    event: MouseEvent;
  }): void;
}

export interface TreeNodePropsType {
  prefixCls?: string;
  title?: string|ReactNode;
  keys: string;
  expanded?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  canCheck?: boolean;
  checkDisabled?: boolean;
  isLeaf?: boolean;

  onNodeExpand?(treeNode: TreeNode, targetExpanded: boolean, event: MouseEvent): void;

  onNodeCheck?(treeNode: TreeNode, targetChecked: boolean, event: MouseEvent): void;
}
