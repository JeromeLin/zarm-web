import React, { Component } from 'react';
import classnames from 'classnames';
// import Tooltip from '../tooltip';
import { ItemProps, styleType } from './PropsType';
import MenuContext from './menu-context';
import { noop } from '../utils';

class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    checked: false,
    isDisabled: false,
    level: 1,
    style: {},
    mode: 'inline',
    inlineIndent: 10,
    onClick: noop,
    onDoubleClick: noop,
  };

  handleClick = (e) => {
    const { itemKey, inlineCollapsed, disabled } = this.props;

    if (disabled) return;
    this.props.onClick(e, itemKey);
    this.props.toggleSelectedKeys(itemKey);
    if (inlineCollapsed) {
      this.props.toggleSubMenuOpen('');
    }
  };

  render() {
    const {
      checked, isDisabled, children, prefixCls, level, inlineIndent,
      className, style, onDoubleClick, selectedKeys, itemKey, mode, inlineCollapsed,
    } = this.props;

    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--level${level}`]: level,
      [`${prefixCls}__item--active`]: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      [`${prefixCls}__item--selected`]: !!checked,
      [`${prefixCls}__item--disabled`]: 'disabled' in this.props || isDisabled,
      [className!]: !!className,
    });
    const itemStyle: styleType = {
      ...style,
    };
    if (mode === 'inline' && !inlineCollapsed) {
      itemStyle.paddingLeft = level * inlineIndent;
    }
    return (
      <li
        className={cls}
        role="menuitem"
        style={itemStyle}
        onClick={this.handleClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </li>
    );
    // return (
    //   <Tooltip
    //     hasArrow
    //     content={(level === 1 && inlineCollapsed) ? children : ''}
    //     direction="right"
    //     className="za-menu-item__tooltip"
    //   >
    //     <li
    //       className={cls}
    //       role="menuitem"
    //       style={itemStyle}
    //       onClick={this.handleClick}
    //       onDoubleClick={onDoubleClick}
    //     >
    //       {children}
    //     </li>
    //   </Tooltip>
    // );
  }
}

export default function MenuItemConsumer(props) {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <MenuItem
            {...props}
            inlineCollapsed={menuKeys.inlineCollapsed}
            selectedKeys={menuKeys.selectedKeys}
            toggleSubMenuOpen={menuKeys.toggleOpenKeys}
            toggleSelectedKeys={menuKeys.toggleSelectedKeys}
          />
        )
      }
    </MenuContext.Consumer>
  );
}
