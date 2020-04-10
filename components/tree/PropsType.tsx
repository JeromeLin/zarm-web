import { MouseEvent, ReactNode, createContext, Context } from 'react';
import TreeNode from './TreeNode';

type TreeCheckEventHandler = (
  checkedMap: {
    checkedKeys: Array<string>;
    halfCheckedKeys: Array<string>;
  },
  checkedObj: {
    node: TreeNode;
    checked: boolean;
    event: MouseEvent;
  }) => void;

type TreeExpandEventHandler = (
  expandedKeys: Array<string>,
  expandedObj: {
    node: TreeNode;
    expanded: boolean;
    event: MouseEvent;
  }) => void;

type TreeSelectEventHandler = (
  selectedKeys: Array<string>,
  selectedObj: {
    node: EventDataNode;
    selected: boolean;
    event: MouseEvent;
  }) => void;
type TreeNodeExpandEventHandler = (treeNode: EventDataNode, targetExpanded: boolean, event: MouseEvent) => void;
type TreeNodeCheckEventHandler = (treeNode: EventDataNode, targetChecked: boolean, event: MouseEvent) => void;
type TreeNodeSelectEventHandler = (treeNode: EventDataNode, targetSelected: boolean, event: MouseEvent) => void;
type TreeNodeClickEventHandler = (event: MouseEvent) => void;

export interface PropsType {
  prefixCls?: string;
  treeData?: object[];
  checkable?: boolean;
  checkedKeys?: string[];
  expandedKeys?: string[];
  defaultExpandAll?: boolean;
  autoExpandParent?: boolean;
  selectedKeys?: string[];
  selectable?: boolean;
  multiple?: boolean;
  disabled?: boolean; // 禁掉树
  showIcon?: boolean;
  icon?: ReactNode;
  showLine?: boolean;
  className?: string;
  switcherIcon?: ReactNode;
  children?: ReactNode;

  onCheck: TreeCheckEventHandler;
  onExpand: TreeExpandEventHandler;
  onSelect: TreeSelectEventHandler;
  onClick?: TreeNodeClickEventHandler;
}

export interface TreeNodePropsType {
  title?: string|ReactNode;
  keys: string;
  expanded?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  checkDisabled?: boolean;
  selectDisabled?: boolean;
  disabled?: boolean; // 禁掉响应
  isLeaf?: boolean;
  selected?: boolean;
  checkable?: boolean;
  icon?: ReactNode;
  children?: React.ReactNode;
}

export type EventDataNode = Omit<TreeNodePropsType, 'children'>;

export interface TreeContextProps {
  prefixCls?: string;
  checkable?: boolean;
  selectable?: boolean;
  disabled?: boolean; // 禁掉树
  showIcon?: boolean;
  icon: ReactNode;
  showLine?: boolean;
  switcherIcon?: ReactNode;
  children?: React.ReactNode;

  onNodeExpand: TreeNodeExpandEventHandler;
  onNodeCheck: TreeNodeCheckEventHandler;
  onNodeSelect: TreeNodeSelectEventHandler;
  onNodeClick: TreeNodeClickEventHandler;
}

export const TreeContext: Context<TreeContextProps | null> = createContext(null);
