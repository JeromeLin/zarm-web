
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Menu extends Component {

  render () { 
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'ui-menu'          : true,
      [className]        : !!className,
    });

    return (
      <ul {...others} className={cls} role="menu">
        {children}
      </ul>
    );
  }

}

export default Menu;