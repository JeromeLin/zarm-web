import React, { Component } from 'react';
import Checkbox from '../checkbox';
import Animate from 'rc-animate';
import classnames from 'classnames';
import { TreeNodePropsType } from './PropsType';
import animation from './openAnimation';
import { isCheckDisabled } from './utils';

const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';
const ICON_NOOP = 'noop';

class TreeNode extends Component<TreeNodePropsType, any> {

  static defaultProps = {
    prefixCls: 'ui-tree',
    title: '',
  };

  isLeaf = () => {
    const { isLeaf } = this.props;
    if (isLeaf) {
      return true;
    }
    return false;
  }

  getNodeState = () => {
    const { expanded } = this.props;
    let nodeState;
    if (this.isLeaf()) {
      nodeState = ICON_NOOP;
    } else {
      nodeState = expanded ? ICON_OPEN : ICON_CLOSE;
    }
    return nodeState;
  }

  renderSwitcher = () => {
    const { prefixCls } = this.props;

    const switcherState = this.getNodeState();

    return (
      <span
        className={classnames(`${prefixCls}-switcher`, `${prefixCls}-switcher-${switcherState}`)}
        onClick={this.onExpand}
      />
    );
  }

  renderCheckbox = () => {
    const { checkDisabled, canCheck, checked, prefixCls, halfChecked } = this.props;
    const isHalfChecked = checkDisabled ? false : halfChecked;
    if (!canCheck) {
      return null;
    }
    return (
      <span className={classnames(`${prefixCls}-checkbox`)}>
        <Checkbox
          onChange={(e) => this.onCheck(e)}
          isDisabled={checkDisabled}
          checked={checked || isHalfChecked}
          indeterminate={isHalfChecked}
        />
      </span>
    );
  }

  renderContent = () => {
    const { prefixCls, title } = this.props;

    const nodeState = this.getNodeState();

    const wrapClass = `${prefixCls}-node-content-wrapper ${prefixCls}-node-content-wrapper-${nodeState}`;

    return (
      <span
        className={wrapClass}
        title={typeof title === 'string' ? title : ''}
      >
        <span className={`${prefixCls}-title`}>{title}</span>
      </span>
    );
  }

  renderChildren = () => {
    const { children, expanded, prefixCls = '' } = this.props;
    if (this.isLeaf()) {
      return null;
    }

    let $children;
    if (expanded) {
      $children = (
        <ul
          className={classnames(`${prefixCls}-child-tree`, expanded && `${prefixCls}-child-tree-open`)}
          data-expanded={expanded}
        >
          {children}
        </ul>
      );
    }

    const animateProps = { animation: {} };
    if (typeof animation === 'object') {
      animateProps.animation = { ...animation };
    }
    return (
      <Animate
        {...animateProps}
        showProp="data-expanded"
      >
        {$children}
      </Animate>
    );
  }

  onCheck = (e) => {
    const { checked, onNodeCheck } = this.props;
    const targetChecked = !checked;
    if (!isCheckDisabled(this) && onNodeCheck) {
      onNodeCheck(this, targetChecked, e);
    }
  }

  onExpand = (e) => {
    const { expanded, onNodeExpand } = this.props;
    const targetExpanded = !expanded;
    if (onNodeExpand) {
      onNodeExpand(this, targetExpanded, e);
    }
  }

  render() {
    const { keys } = this.props;
    return (
      <li data-keys={keys}>
        {this.renderSwitcher()}
        {this.renderCheckbox()}
        {this.renderContent()}
        {this.renderChildren()}
      </li>
    );
  }
}

export default TreeNode;
