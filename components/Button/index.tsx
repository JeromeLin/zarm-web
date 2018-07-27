import React, { Component } from 'react';
import classnames from 'classnames';
import ButtonProps from './PropsType';
import Icon from '../Icon';

class Button extends Component<ButtonProps, any> {
  static defaultProps = {
    prefixCls: 'ui-button',
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

  render() {
    const { props } = this;
    const {
      prefixCls,
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
      // tslint:disable-next-line:trailing-comma
      ...others
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const loading = 'loading' in props || isLoading;
    const classes = classnames({
      [prefixCls!]: true,
      block: 'block' in props || isBlock,
      radius: 'radius' in props || isRadius,
      round: 'round' in props || isRound,
      circle: 'circle' in props || isCircle,
      active: 'active' in props || isActive,
      focus: 'focus' in props || isFocus,
      disabled,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    let textContent =
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
        onClick={e => (!disabled && !loading) && onClick(e)}
        {...others}
      >
        {textContent}
      </button>
    );
  }
}

export default Button;
