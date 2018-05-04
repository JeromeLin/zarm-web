import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Panel extends Component {
  render() {
    const { props } = this;
    const {
      isRadius, theme, className, children, style
    } = props;

    const cls = classnames({
      'ui-panel': true,
      radius: 'radius' in props || isRadius,
      [`theme-${theme}`]: !!theme,
      [className]: !!className
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

Panel.propTypes = {
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius: PropTypes.bool
};

Panel.defaultProps = {
  theme: 'default',
  isRadius: false
};

export default Panel;
