import React, { Component } from 'react';
import classnames from 'classnames';
import TreeNode from './TreeNode';
import { PropsType, TreeContext } from './PropsType';

import {
  getTreeNodeChildren, convertTreeToData,
  initialTreeData, conductExpandParent,
  conductCheck, arrDel, arrAdd, calcSelectedKeys,
} from './utils';

interface StateType {
  checkedKeys: Array<string>;
  selectedKeys: Array<string>;
  halfCheckedKeys?: Array<string>;
  expandedKeys: Array<string>;
  treeData: Array<object>;
  prevProps?: PropsType;
}

class Tree extends Component<PropsType, StateType> {
  static defaultProps = {
    prefixCls: 'zw-tree',
    checkedKeys: [],
    selectedKeys: [],
    expandedKeys: [],
    treeData: [],
    disabled: false,
    checkable: false,
    defaultExpandAll: false,
    autoExpandParent: true,
    multiple: false,
    selectable: true,
    showLine: false,
    showIcon: true,
  };

  static TreeNode: any;

  state: StateType = {
    checkedKeys: [],
    halfCheckedKeys: [],
    expandedKeys: [],
    treeData: [],
    selectedKeys: [],
  };

  static getDerivedStateFromProps(nextProps: Tree['props'], prevState: StateType) {
    const { prevProps } = prevState;
    const newState: Partial<StateType> = {
      prevProps: nextProps,
    };
    function needUpdate(key: string) {
      return (!prevProps && key in nextProps) || (prevProps && prevProps[key] !== nextProps[key]);
    }
    let treeData: TreeNode[] = [];
    let TreeDataInformationSet = { allExpandDataMap: {}, treeData: [] };
    if (needUpdate('treeData')) {
      ({ treeData } = nextProps);
      TreeDataInformationSet = initialTreeData(treeData);
      treeData = TreeDataInformationSet.treeData;
    } else if (needUpdate('children')) {
      const treeNodeChildren = getTreeNodeChildren({ children: nextProps.children });
      if (treeNodeChildren.length > 0) {
        TreeDataInformationSet = initialTreeData(convertTreeToData(treeNodeChildren));
      }
      treeData = TreeDataInformationSet.treeData;
    }
    if (treeData && treeData.length) {
      newState.treeData = treeData;
      // newState.treeData = deepCopy(treeData);
    }
    const currentTreeData = newState.treeData || prevState.treeData;
    // 初始化checkedKeys，更新treeData
    if (needUpdate('checkedKeys')) {
      const {
        checkedKeys: finalCheckedKeys, halfCheckedKeys: finalHalfCheckedKeys, treeData: finaltreeDataAfter,
      } = conductCheck(nextProps.checkedKeys, true, currentTreeData);
      newState.checkedKeys = finalCheckedKeys;
      newState.halfCheckedKeys = finalHalfCheckedKeys;
      newState.treeData = finaltreeDataAfter;
    }

    // selected
    if (nextProps.selectable) {
      if (needUpdate('selectedKeys')) {
        newState.selectedKeys = calcSelectedKeys(nextProps.selectedKeys, nextProps);
      }
    }
    /*
    初始化expandedKeys
    如果要展开所有结点，则取到所有根结点作为展开结点；
    否则展开传入的展开结点
     */
    if (!prevProps && nextProps.defaultExpandAll) {
      newState.expandedKeys = conductExpandParent(Object.keys(TreeDataInformationSet.allExpandDataMap), currentTreeData);
    } else if (needUpdate('expandedKeys') || (prevProps && needUpdate('autoExpandParent'))) {
      newState.expandedKeys = nextProps.autoExpandParent ? conductExpandParent(nextProps.expandedKeys, currentTreeData) : nextProps.expandedKeys;
    }
    return newState;
  }

  onNodeCheck = (node, targetChecked, event) => {
    const { onCheck } = this.props;
    const { keys } = node;
    const { treeData: originalTreeData } = this.state;
    const { checkedKeys: originalCheckedKeys = [], halfCheckedKeys: originHalfCheckedKeys = [] } = this.state;

    const { checkedKeys, halfCheckedKeys, treeData } = conductCheck([keys], targetChecked, originalTreeData, {
      checkedKeys: originalCheckedKeys, halfCheckedKeys: originHalfCheckedKeys,
    });
    const checkedMap = { checkedKeys, halfCheckedKeys };
    this.setState({
      checkedKeys,
      halfCheckedKeys,
      treeData,
    });

    if (onCheck) {
      onCheck(checkedMap, {
        node,
        checked: targetChecked,
        event,
      });
    }
  };

  onNodeExpand = (node, targetExpanded, event) => {
    let { expandedKeys = [] } = this.state;
    const { onExpand } = this.props;
    const { keys } = node;
    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, keys);
    } else {
      expandedKeys = arrDel(expandedKeys, keys);
    }

    this.setState({
      expandedKeys,
    });

    if (onExpand) {
      onExpand(
        expandedKeys, {
          node,
          expanded: targetExpanded,
          event,
        },
      );
    }
  };

  onNodeSelect = (node, targetSelected, event) => {
    let { selectedKeys = [] } = this.state;
    const { onSelect, multiple } = this.props;
    const { keys } = node;

    if (!targetSelected) {
      selectedKeys = arrDel(selectedKeys, keys);
    } else if (!multiple) {
      selectedKeys = [keys];
    } else {
      selectedKeys = arrAdd(selectedKeys, keys);
    }
    this.setState({
      selectedKeys,
    });

    if (onSelect) {
      onSelect(selectedKeys, {
        selected: targetSelected,
        node,
        event,
      });
    }
  };

  onNodeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  renderTreeNodes = (data) => {
    const { expandedKeys, checkedKeys, halfCheckedKeys, selectedKeys } = this.state;
    return data.map((item) => {
      const { keys, title, checkDisabled, selectDisabled, children, icon, disabled, checkable } = item;
      return (
        <TreeNode
          key={keys}
          keys={keys}
          title={title}
          checkable={checkable}
          checkDisabled={checkDisabled}
          selectDisabled={selectDisabled}
          disabled={disabled}
          expanded={(expandedKeys as string[]).indexOf(keys) !== -1}
          checked={(checkedKeys as string[]).indexOf(keys) !== -1}
          halfChecked={(halfCheckedKeys as string[]).indexOf(keys) !== -1}
          selected={(selectedKeys as string[]).indexOf(keys) !== -1}
          isLeaf={!children}
          icon={icon}
        >
          {children ? this.renderTreeNodes(children) : null}
        </TreeNode>
      );
    });
  };

  render() {
    const { prefixCls, className, showLine, checkable, selectable, disabled, showIcon, icon, switcherIcon } = this.props;
    const { treeData } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-show-line`]: showLine,
    });
    return (
      <TreeContext.Provider
        value={{
          prefixCls,
          checkable,
          selectable,
          disabled,
          showIcon,
          icon,
          showLine,
          switcherIcon,
          onNodeCheck: this.onNodeCheck,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeClick: this.onNodeClick,
        }}
      >
        <ul className={cls}>
          {this.renderTreeNodes(treeData)}
        </ul>
      </TreeContext.Provider>
    );
  }
}

export default Tree;
