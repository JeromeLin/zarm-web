
import React, { Component, PropTypes } from 'react';

class Menu extends Component {

  render () { 
    const { children, ...others } = this.props;

    return (
      <ul className="ui-menu" {...others} role="menu">
        {children}
      </ul>
    );
  }

}

export default Menu;