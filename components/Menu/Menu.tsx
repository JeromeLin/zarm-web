import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
  };

  static Item;

  render() {
    const {
      size, className, children, style, prefixCls,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    return (
      <ul className={cls} role="menu" style={style}>
        {children}
      </ul>
    );
  }
}

export default Menu;
