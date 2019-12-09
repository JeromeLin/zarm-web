import React, { Component } from 'react';
import ActivityIndicator from 'zarm/lib/activity-indicator';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import ButtonProps from './PropsType';
import ButtonGroup from './ButtonGroup';

class Button extends Component<ButtonProps> {
  static Group: typeof ButtonGroup;

  static defaultProps = {
    prefixCls: 'zw-button',
    htmlType: 'button',
    theme: 'default',
    shape: 'radius',
    icon: '',
    ghost: false,
    size: null,
    loading: false,
    onClick: () => {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    theme: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'round', 'rect', 'radius']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    icon: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    ghost: PropTypes.bool,
  };

  render() {
    const {
      prefixCls, htmlType = 'button', type, size, block, shape, active, focus, disabled, ghost,
      loading, className, onClick, children, style, theme, href, target, icon, ...others
    } = this.props;

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--focus`]: focus,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--loading`]: loading,
      [`${prefixCls}--ghost`]: ghost,
      [`${prefixCls}--icon-only`]: !children && children !== 0 && icon,
      [`${prefixCls}--link`]: href && target,
    });

    const child = children ? <span>{children}</span> : null;
    const textContent = loading
      ? (
        <>
          <ActivityIndicator prefixCls="zw-activity-indicator" />
          <span>{children}</span>
        </>
      )
      : child;
    const iconNode = icon ? <Icon type={icon} /> : null;

    return (
      href
        ? (
          <a
            className={classes}
            href={disabled ? undefined : href}
            style={style}
            target={target}
            {...others}
            onClick={(e) => (!disabled && !loading) && onClick!(e)}
          >
            {textContent}
          </a>
        )
        : (
          <button
            type={htmlType}
            className={classes}
            style={style}
            disabled={disabled}
            onClick={(e) => (!disabled && !loading) && onClick!(e)}
            {...others}
          >
            {iconNode}
            {textContent}
          </button>
        )
    );
  }
}

export default Button;
