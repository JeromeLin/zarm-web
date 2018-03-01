
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class MenuItem extends Component {

  render () { 
    const props = this.props;
    const { checked, isDisabled, children, ...others } = props;
    
    const cls = classnames({
      'ui-menu-item': true,
      'selected'    : !!checked,
      'disabled'    : ('disabled' in props || isDisabled),
    });

    return (
      <li className={cls} role="menuitem" {...others}>
        {children}
      </li>
    );
  }

}

export default MenuItem;