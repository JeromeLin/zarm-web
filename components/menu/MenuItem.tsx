import React, { Component } from 'react';
import classnames from 'classnames';
import { ItemProps, styleType } from './PropsType';
import MenuContext from './menu-context';

class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    isDisabled: false,
    level: 1,
    style: {},
    mode: 'inline',
    inlineIndent: 10,
    onClick: () => { },
    onDoubleClick: () => { },
  };

  handleClick = (e) => {
    const { itemKey } = this.props;
    this.props.onClick(e, itemKey);
    this.props.toggleSelectedKeys(itemKey);
  }

  render() {
    const {
      checked, isDisabled, disabled, children, prefixCls, level, inlineIndent, inlineCollapsed, subMenuKey,
      toggleSelectedKeys, className, style, onDoubleClick, selectedKeys, itemKey, mode,
      ...DOMProps
    } = this.props;

    const cls = classnames(className, {
      [`${prefixCls}-item`]: true,
      active: checked !== undefined ? checked : !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      selected: checked,
      disabled: disabled || isDisabled,
    });
    const itemStyle: styleType = {
      ...style,
    };
    if (mode === 'inline') {
      itemStyle.paddingLeft = level * inlineIndent;
    }
    return (
      <li
        {...DOMProps}
        className={cls}
        role="menuitem"
        style={itemStyle}
        onDoubleClick={onDoubleClick}
        onClick={this.handleClick}
      >
        {children}
      </li>
    );
  }
}

export default function MenuItemConsumer(props) {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <MenuItem
            {...props}
            selectedKeys={menuKeys.selectedKeys}
            toggleSelectedKeys={menuKeys.toggleSelectedKeys}
          />
        )}
    </MenuContext.Consumer>
  );
}
