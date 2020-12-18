import React, { Component } from 'react';
import Animate from 'rc-animate';
import classnames from 'classnames';
import Checkbox from '../checkbox';
import Icon from '../icon';
import { TreeNodePropsType, TreeContext } from './PropsType';
import animation from './openAnimation';
import { convertNodePropsToEventData } from './utils';

const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';
const ICON_NOOP = 'noop';
const ICONS_TREE = Icon.createFromIconfont('//at.alicdn.com/t/font_1733827_ormtmokxywk.js');

class TreeNode extends Component<TreeNodePropsType, any> {
  static contextType = TreeContext;

  static defaultProps = {
    title: '',
    expanded: false,
    checked: false,
    halfChecked: false,
    selected: false,
    checkDisabled: false,
    selectDisabled: false,
    disabled: false,
    isLeaf: false,
    icon: null,
    children: null,
  };

  isLeaf = () => {
    const { isLeaf } = this.props;
    if (isLeaf) {
      return true;
    }
    return false;
  };

  isSelectable = () => {
    const { selectDisabled } = this.props;
    const {
      context: { selectable },
    } = this;

    if (typeof selectDisabled === 'boolean') {
      return !selectDisabled;
    }
    return selectable;
  };

  isDisabled = () => {
    const { disabled } = this.props;
    const {
      context: { disabled: ParentDisabled },
    } = this;

    if (!disabled && !ParentDisabled) {
      return false;
    }
    return true;
  };

  isCheckable = () => {
    const { checkable } = this.props;
    const {
      context: { checkable: parentCheckable },
    } = this;
    if (checkable !== false && parentCheckable) {
      return true;
    }
    return false;
  };

  getNodeState = () => {
    const { expanded } = this.props;
    let nodeState;
    if (this.isLeaf()) {
      nodeState = ICON_NOOP;
    } else {
      nodeState = expanded ? ICON_OPEN : ICON_CLOSE;
    }
    return nodeState;
  };

  renderSwitcher = () => {
    const { expanded } = this.props;
    const { switcherIcon, showLine, prefixCls } = this.context;

    const switcherState = this.getNodeState();
    const clsIconWrapper = classnames({
      [`${prefixCls}-switcher-icon`]: !showLine,
      [`${prefixCls}-switcher-line-icon`]: showLine,
    });
    return (
      <span
        className={classnames(`${prefixCls}-switcher`, `${prefixCls}-switcher-${switcherState}`)}
        onClick={this.onExpand}
      >
        <span className={clsIconWrapper}>
          {this.renderSwitcherIcon(expanded, switcherIcon, showLine)}
        </span>
      </span>
    );
  };

  renderSwitcherIcon = (expanded, switcherIcon: React.ReactNode | null | undefined, showLine: boolean) => {
    if (this.isLeaf()) {
      return showLine ? <ICONS_TREE type="iconfile" size="sm" /> : null;
    }
    // 只有showLine为true的模式下，可以用switcherIcon修改默认图标
    if (showLine && switcherIcon) {
      return switcherIcon;
    }
    if (showLine) {
      return expanded ? (
        <ICONS_TREE type="iconminus-square" size="sm" />
      ) : (
        <ICONS_TREE type="iconplus-square" size="sm" />
      );
    }
    return <ICONS_TREE type="iconcaret-right" size="sm" />;
  };

  renderCheckbox = () => {
    const { halfChecked, checked, checkDisabled } = this.props;
    const { prefixCls } = this.context;
    if (!this.isCheckable()) {
      return null;
    }
    return (
      <span className={classnames(`${prefixCls}-checkbox`)}>
        <Checkbox
          onClick={(e) => this.onCheck(e)}
          disabled={this.isDisabled() || checkDisabled}
          checked={checked}
          indeterminate={halfChecked}
        />
      </span>
    );
  };

  renderContent = () => {
    const { showIcon, icon: treeIcon, prefixCls } = this.context;
    const { title, icon, selected } = this.props;

    const nodeState = this.getNodeState();
    const nodeIcon = icon || treeIcon;
    const disabled = this.isDisabled();
    const isSelectable = !disabled && this.isSelectable();
    const wrapClass = classnames(
      `${prefixCls}-node-content-wrapper`,
      `${prefixCls}-node-content-wrapper-${nodeState}`,
      { [`${prefixCls}-node-selected`]: isSelectable && selected },
    );
    const iconRender = (showIcon && nodeIcon) ? (<span className={`${prefixCls}-node-content-icon`}>{nodeIcon}</span>) : null;
    return (
      <span
        className={wrapClass}
        title={typeof title === 'string' ? title : ''}
        onClick={this.onSelectorClick}
      >
        {iconRender}
        <span className={`${prefixCls}-title`}>{title}</span>
      </span>
    );
  };

  renderChildren = () => {
    const { prefixCls } = this.context;
    const { children, expanded } = this.props;
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
  };

  onCheck = (e) => {
    const { checkDisabled, checked } = this.props;
    const { onNodeCheck } = this.context;
    if (this.isDisabled() || checkDisabled) {
      return null;
    }
    e.preventDefault();
    const targetChecked = !checked;
    onNodeCheck(convertNodePropsToEventData(this.props), targetChecked, e);
  };

  onExpand = (e) => {
    const { expanded } = this.props;
    const { onNodeExpand } = this.context;
    const targetExpanded = !expanded;
    onNodeExpand(convertNodePropsToEventData(this.props), targetExpanded, e);
  };

  onSelectorClick = (e) => {
    const { selected } = this.props;
    const { onNodeClick, onNodeSelect } = this.context;
    const targetSelected = !selected;
    onNodeClick(e);

    if (this.isSelectable()) {
      if (this.isDisabled()) {
        return;
      }
      e.preventDefault();
      onNodeSelect(convertNodePropsToEventData(this.props), targetSelected, e);
    } else {
      this.onCheck(e);
    }
  };

  render() {
    const { keys, checked } = this.props;
    const { prefixCls } = this.context;
    const disabled = this.isDisabled();
    const selected = this.isSelectable();
    const switcherState = this.getNodeState();

    const cls = classnames(`${prefixCls}-node`,
      `${prefixCls}-treenode-switcher-${switcherState}`, {
        [`${prefixCls}-treenode-disabled`]: disabled,
        [`${prefixCls}-treenode-selected`]: selected,
        [`${prefixCls}-treenode-checked`]: checked,
      });

    return (
      <li data-keys={keys}>
        <div className={cls}>
          {this.renderSwitcher()}
          {this.renderCheckbox()}
          {this.renderContent()}
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}

export default TreeNode;
