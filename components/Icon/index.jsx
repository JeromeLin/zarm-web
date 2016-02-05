
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Icon extends Component {

  render () { 
    const { type, ...others } = this.props;
    const cls = classnames({
      'ui-icon'          : true,
      ['ui-icon-' + type]: type,
    });
    
    return (
      <i className={cls} {...others} />
    );
  }

}

Icon.propTypes = {
  type        : PropTypes.string,
};

Icon.defaultProps = {
  type: 'text',
};

export default Icon;