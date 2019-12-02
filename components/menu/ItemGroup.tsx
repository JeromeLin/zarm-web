import React, { Component, cloneElement, Children, CSSProperties } from 'react';
import { ItemGroupProps, childPropsType } from './PropsType';

class ItemGroup extends Component<ItemGroupProps> {
  static isItemGroup = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: 'inline',
    level: 1,
    index: 0,
  };

  renderChildren() {
    const {
      children, level, inlineIndent, mode, prefixCls, subMenuKey, index,
    } = this.props;
    const childProps: childPropsType = {
      mode,
      level,
      inlineIndent,
      prefixCls,
    };
    return Children.map(children, (child, idx) => {
      const { key } = child;

      if (level === 1) {
        childProps.subMenuKey = key || `0-group${index}-${idx}`;
        childProps.itemKey = key || `0-group${index}-${idx}`;
      } else {
        childProps.itemKey = key || `${subMenuKey}-${level}-group${index}-${idx}`;
        childProps.subMenuKey = key || `${subMenuKey}-${level}-group${index}-${idx}`;
      }

      return cloneElement(child, childProps);
    });
  }

  render() {
    const { prefixCls, title, inlineIndent, level, mode, inlineCollapsed } = this.props;

    const groupTitleStyle: CSSProperties = {};
    if (mode === 'inline' && !inlineCollapsed) {
      groupTitleStyle.paddingLeft = (level - 1) * inlineIndent + inlineIndent / 2;
    }

    const cls = `${prefixCls}__itemgroup`;
    return (
      <li className={cls}>
        <div
          style={groupTitleStyle}
          className={`${cls}__title`}
        >
          {title}
        </div>
        <ul className={`${cls}__list`}>
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}

export default ItemGroup;
