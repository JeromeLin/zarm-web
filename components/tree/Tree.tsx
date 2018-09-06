import React, { Component, MouseEvent } from 'react';
import TreeNode from './TreeNode';
import PropsType from './PropsType';
import {
  getTreeNodeChildren, convertTreeToData,
  initialTreeData, conductExpandParent,
  conductCheck, arrDel, arrAdd, deepCopy,
} from './utils';

interface StateType {
  checkedKeys?: Array<string>;
  halfCheckedKeys?: Array<string>;
  expandedKeys?: Array<string>;
  treeData: Array<object>;
}

class Tree extends Component<PropsType, StateType> {

  static defaultProps = {
    prefixCls: 'ui-tree',
    checkedKeys: [],
    expandedKeys: [],
  };

  static TreeNode: any;

  state = {
    checkedKeys: [],
    halfCheckedKeys: [],
    expandedKeys: [],
    treeData: [],
  };

  componentWillMount() {
    this.initTreeNodes();
  }

  initTreeNodes = (): void => {
    const { treeData = [], checkedKeys, expandedKeys, defaultExpandAll, children } = this.props;
    let newState = {
      treeData: [] as object[],
      halfCheckedKeys: [] as string[],
      checkedKeys: [] as string[],
      expandedKeys: [] as string[],
    };
    let TreeDataInformationSet = { allExpandDataMap: {}, treeData: [] };
    if (treeData.length > 0) {
      // 深拷贝treeData
      newState.treeData = deepCopy(treeData);
      TreeDataInformationSet = initialTreeData(newState.treeData);
    } else if (children) {
      const treeNodeChildren = getTreeNodeChildren({ children });
      if (treeNodeChildren.length > 0) {
        TreeDataInformationSet = initialTreeData(convertTreeToData(treeNodeChildren));
      }
    }
    const { allExpandDataMap, treeData: initialedTreeData } = TreeDataInformationSet;
    newState.treeData = initialedTreeData;
    // 初始化checkedKeys，更新treeData
    if (checkedKeys && checkedKeys.length > 0) {
      const {
        checkedKeys: finalCheckedKeys, halfCheckedKeys: finalHalfCheckedKeys, treeData: finaltreeDataAfter,
      } = conductCheck(checkedKeys, true, newState.treeData);
      newState.checkedKeys = finalCheckedKeys;
      newState.halfCheckedKeys = finalHalfCheckedKeys;
      newState.treeData = finaltreeDataAfter;
    }

    /*
    初始化expandedKeys
    如果要展开所有结点，则取到所有根结点作为展开结点；
    否则展开传入的展开结点
     */
    if (defaultExpandAll) {
      newState.expandedKeys = conductExpandParent(Object.keys(allExpandDataMap), newState.treeData);
    } else if (expandedKeys && expandedKeys.length > 0) {
      newState.expandedKeys = conductExpandParent(expandedKeys, newState.treeData);
    }
    this.setState(newState);
  }

  onNodeCheck = (node, targetChecked, event: MouseEvent) => {
    const { onCheck } = this.props;
    const { keys } = node.props;
    const { treeData: originalTreeData } = this.state;
    const { checkedKeys: originalCheckedKeys, halfCheckedKeys: originHalfCheckedKeys } = this.state;

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
  }

  onNodeExpand = (node, targetExpanded, event) => {
    let { expandedKeys } = this.state;
    const { onExpand } = this.props;
    const { keys } = node.props;

    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, keys);
    } else {
      expandedKeys = arrDel(expandedKeys, keys);
    }
    this.setState({
      expandedKeys,
    });

    if (onExpand) {
      onExpand({
        expandedKeys,
        node,
        expanded: targetExpanded,
        event,
      });
    }
  }

  renderTreeNodes = (data) => {
    const { prefixCls, canCheck } = this.props;
    const { expandedKeys, checkedKeys, halfCheckedKeys } = this.state;
    return data.map((item, index) => {
      const { keys, title, checkDisabled, children } = item;
      return (
        <TreeNode
          key={index}
          keys={keys}
          title={title}
          canCheck={canCheck}
          checkDisabled={!!checkDisabled}
          prefixCls={prefixCls}
          expanded={(expandedKeys as string[]).indexOf(keys) !== -1}
          checked={(checkedKeys as string[]).indexOf(keys) !== -1}
          halfChecked={(halfCheckedKeys as string[]).indexOf(keys) !== -1}
          isLeaf={!children}
          onNodeCheck={this.onNodeCheck}
          onNodeExpand={this.onNodeExpand}
        >
          {children ? this.renderTreeNodes(children) : null}
        </TreeNode>
      );
    });
  }

  render() {
    const { prefixCls } = this.props;
    const { treeData } = this.state;
    return (
      <ul className={prefixCls}>
        {this.renderTreeNodes(treeData)}
      </ul>
    );
  }
}

export default Tree;
