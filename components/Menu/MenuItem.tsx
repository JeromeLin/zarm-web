import React, { Component } from 'react';
import classnames from 'classnames';
import { ItemProps } from './PropsType';
import MenuContext from './menu-context';

class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    checked: false,
    isDisabled: false,
    level: 1,
    style: {},
    onClick: () => {},
    onDoubleClick: () => {},
  };

  handleClick = () => {
    const { itemKey } = this.props;
    this.props.onClick(itemKey);
    this.props.toggleSelectedKeys(itemKey);
  }

  render() {
    const { props } = this;
    const {
      checked, isDisabled, children, prefixCls,
      className, style, onDoubleClick, selectedKeys, itemKey,
    } = props;
    const cls = classnames({
      [`${prefixCls}-item`]: true,
      active: selectedKeys.indexOf(itemKey) > -1,
      [className!]: !!className,
      selected: !!checked,
      disabled: 'disabled' in props || isDisabled,
    });
    return (
      <li
        className={cls}
        role="menuitem"
        style={style}
        onClick={this.handleClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </li>
    );
  }
}

export default (props) => {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <MenuItem
            {...props}
            selectedKeys={menuKeys.selectedKeys}
            toggleSelectedKeys={menuKeys.toggleSelectedKeys}
          />
        )
      }
    </MenuContext.Consumer>
  );
};
