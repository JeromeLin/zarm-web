import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends Component {
  render() {
    const {
      type, theme, className, style, onClick
    } = this.props;
    const cls = classnames({
      'ui-icon': true,
      [`ui-icon-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className]: !!className
    });

    return <i className={cls} style={style} onClick={onClick} />;
  }
}

Icon.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  style: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  type: '',
  theme: 'default',
  style: {},
  onClick: () => {},
};

export default Icon;
