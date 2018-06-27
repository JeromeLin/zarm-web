import React, { Component } from 'react';
import classnames from 'classnames';
import { ItemProps } from './PropsType';

class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    checked: false,
    isDisabled: false,
    onClick: () => {},
    onDoubleClick: () => {},
  };

  render() {
    const { props } = this;
    const {
      checked, isDisabled, children, onClick, style, onDoubleClick,
    } = props;

    const cls = classnames({
      'ui-menu-item': true,
      selected: !!checked,
      disabled: 'disabled' in props || isDisabled,
    });

    return (
      <li
        className={cls}
        role="menuitem"
        style={style}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </li>
    );
  }
}

export default MenuItem;
