import React, { Component } from 'react';
import classnames from 'classnames';

class MenuItem extends Component {
  render() {
    const { props } = this;
    const {
      checked, isDisabled, children, onClick, style,
    } = props;

    const cls = classnames({
      'ui-menu-item': true,
      selected: !!checked,
      disabled: 'disabled' in props || isDisabled,
    });

    return (
      <li className={cls} role="menuitem" style={style} onClick={onClick}>
        {children}
      </li>
    );
  }
}

export default MenuItem;
