import React, { Component } from 'react';
import classnames from 'classnames';
import ButtonProps from './PropsType';
import Icon from '../icon';

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
    onClick: () => { },
  };

  render () {
    const { props } = this;
    const {
      prefixCls,
      type,
      theme,
      size,
      isBlock,
      block,
      isRadius,
      radius,
      isRound,
      round,
      isCircle,
      circle,
      isActive,
      active,
      isFocus,
      focus,
      isDisabled,
      disabled,
      isLoading,
      loading,
      className,
      onClick,
      children,
      style,
      href,
      target,
      ...others
    } = props;

    const radiusStatus = radius || isRadius;
    const blockStatus = block || isBlock;
    const roundStatus = round || isRound;
    const circleStatus = circle || isRound;
    const activeStatus = active || isActive;
    const focusStatus = focus || isFocus;
    const disabledStatus = disabled || isDisabled;
    const loadingStatus = loading || isLoading;

    const classes = classnames({
      [prefixCls!]: true,
      block: blockStatus,
      radius: radiusStatus,
      round: roundStatus,
      circle: circleStatus,
      active: activeStatus,
      focus: focusStatus,
      disabled: disabledStatus,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    let textContent =
      loadingStatus ? (
        <span>
          <Icon type="loading" className="rotate360"/> {children}
        </span>
      ) : (
        children
      );

    return (
      href
        ? <a
          className={classes}
          href={href}
          target={target}
          {...others}
          onClick={e => (!disabledStatus && !loadingStatus) && onClick(e)}
        >
          {textContent}
        </a>
        : (
          <button
            type={type}
            className={classes}
            style={style}
            disabled={disabledStatus}
            onClick={e => (!disabledStatus && !loadingStatus) && onClick(e)}
            {...others}
          >
            {textContent}
          </button>
        )
    );
  }
}

export default Button;
