import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Button extends Component {
  render() {
    const { props } = this;
    const {
      type,
      theme,
      size,
      isBlock,
      isRadius,
      isRound,
      isCircle,
      isActive,
      isFocus,
      isDisabled,
      isLoading,
      className,
      onClick,
      children,
      style,
    } = props;
    const disabled = 'disabled' in props || isDisabled;

    const classes = classnames({
      'ui-button': true,
      block: 'block' in props || isBlock,
      radius: 'radius' in props || isRadius,
      round: 'round' in props || isRound,
      circle: 'circle' in props || isCircle,
      active: 'active' in props || isActive,
      focus: 'focus' in props || isFocus,
      disabled,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className]: !!className,
    });

    const textContent =
      'loading' in props || isLoading ? (
        <span>
          <Icon type="loading" className="rotate360" /> {children}
        </span>
      ) : (
        children
      );
    return (
      <button
        type={type}
        className={classes}
        style={style}
        disabled={disabled}
        onClick={e => !disabled && onClick(e)}
      >
        {textContent}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock: PropTypes.bool,
  isRadius: PropTypes.bool,
  isRound: PropTypes.bool,
  isCircle: PropTypes.bool,
  isActive: PropTypes.bool,
  isFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  theme: 'default',
  size: null,
  isBlock: false,
  isRadius: false,
  isRound: false,
  isCircle: false,
  isActive: false,
  isFocus: false,
  isDisabled: false,
  isLoading: false,
  className: null,
  style: {},
  onClick: () => {},
};

export default Button;
