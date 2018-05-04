import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends Component {
  render() {
    const {
      type, theme, className, style
    } = this.props;
    const cls = classnames({
      'ui-icon': true,
      [`ui-icon-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className]: !!className
    });

    return <i className={cls} style={style} />;
  }
}

Icon.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  style: PropTypes.objectOf(PropTypes.any)
};

Icon.defaultProps = {
  type: '',
  theme: 'default',
  style: {}
};

export default Icon;
