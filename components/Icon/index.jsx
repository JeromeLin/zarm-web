
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Icon extends Component {

  render () { 
    const { type, className, ...others } = this.props;
    const cls = classnames({
      'ui-icon'          : true,
      [`ui-icon-${type}`]: !!type,
      [className]        : !!className
    });
    
    return (
      <i className={cls} {...others} />
    );
  }

}

Icon.propTypes = {
  type: PropTypes.string,
};

Icon.defaultProps = {
  type: '',
};

export default Icon;