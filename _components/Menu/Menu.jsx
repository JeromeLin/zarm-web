import React, { Component } from 'react';
import classnames from 'classnames';

class Menu extends Component {
  render() {
    const {
      size, className, children, style
    } = this.props;

    const cls = classnames({
      'ui-menu': true,
      [`size-${size}`]: !!size,
      [className]: !!className
    });

    return (
      <ul className={cls} role="menu" style={style}>
        {children}
      </ul>
    );
  }
}

export default Menu;
