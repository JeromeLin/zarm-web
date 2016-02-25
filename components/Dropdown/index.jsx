
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Dropdown extends Component {

  render () { 
    const { visible, className, children, ...others } = this.props;
    const cls = classnames({
      'ui-dropdown'       : true,
      'ui-dropdown-hidden': !visible,
      [className]         : !!className
    });
    
    return <div {...others} className={cls}>{children}</div>;
  }
  
}

export default Dropdown;