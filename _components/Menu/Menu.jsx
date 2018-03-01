
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Menu extends Component {

  render () { 
    const { size, className, children, ...others } = this.props;

    const cls = classnames({
      'ui-menu'       : true,
      [`size-${size}`]: !!size,
      [className]     : !!className,
    });

    return (
      <ul {...others} className={cls} role="menu">
        {children}
      </ul>
    );
  }

}

export default Menu;