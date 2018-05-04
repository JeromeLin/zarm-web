import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Mask extends Component {
  render() {
    const {
      visible, type, onClose, style
    } = this.props;
    const markCls = classnames({
      'ui-mask': true,
      transparent: type === 'transparent',
      light: type === 'light',
      dark: type === 'dark'
    });

    return visible ? (
      <div className={markCls} onClick={onClose} style={style} />
    ) : null;
  }
}

Mask.propTypes = {
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['transparent', 'light', 'normal', 'dark']),
  onClose: PropTypes.func
};

Mask.defaultProps = {
  visible: false,
  type: 'normal',
  onClose: () => {}
};

export default Mask;
