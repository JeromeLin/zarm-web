
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Mask extends Component {

  render () { 
    const { type, onClose } = this.props;
    const markCls = classnames({
      "ui-mask"     : true,
      "transparent" : type === 'transparent',
      "light"       : type === 'light',
      "dark"        : type === 'dark',
    })

    return (
      <div className={markCls} onClick={onClose}></div>
    );
  }

}

Mask.propTypes = {
  type    : PropTypes.oneOf(['transparent', 'light', 'normal', 'dark']),
  onClose : PropTypes.func,
};

Mask.defaultProps = {
  type    : 'normal',
  onClose : function () {},
};

export default Mask;