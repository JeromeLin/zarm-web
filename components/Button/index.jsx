
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Button extends Component {

  render() {
    const props = this.props;
    const { type, theme, size, isBlock, isRadius, isRound, isCircle, isActive, isFocus, isDisabled, className, onClick, children, ...others } = this.props;
    const disabled = ('disabled' in props || isDisabled);

    const classes = classnames({
      'ui-button'        : true,
      'block'            : ('block' in props || isBlock),
      'radius'           : ('radius' in props || isRadius),
      'round'            : ('round' in props || isRound),
      'circle'           : ('circle' in props || isCircle),
      'active'           : ('active' in props || isActive),
      'focus'            : ('focus' in props || isFocus),
      'disabled'         : disabled,
      [`theme-${theme}`] : !!theme,
      [`size-${size}`]   : !!size,
      [className]        : !!className,
    });

    return (
      <button {...others} type={type} className={classes} disabled={disabled} onClick={(e) => !disabled && onClick(e)}>{children}</button>
    );
  }
}

Button.propTypes = {
  type      : PropTypes.string,
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size      : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock   : PropTypes.bool,
  isRadius  : PropTypes.bool,
  isRound   : PropTypes.bool,
  isCircle  : PropTypes.bool,
  isActive  : PropTypes.bool,
  isFocus   : PropTypes.bool,
  isDisabled: PropTypes.bool,
  className : PropTypes.string,
  onClick   : PropTypes.func,
};

Button.defaultProps = {
  type      : 'button',
  theme     : 'default',
  size      : null,
  isBlock   : false,
  isRadius  : false,
  isRound   : false,
  isCircle  : false,
  isActive  : false,
  isFocus   : false,
  isDisabled: false,
  className : null,
  onClick   : () => {},
};

export default Button;