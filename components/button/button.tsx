import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonProps from './PropsType';
import Icon from '../icon';

class Button extends Component<ButtonProps, any> {
  static Group;
  static defaultProps = {
    prefixCls: 'za-button',
    htmlType: 'button',
    theme: 'default',
    shape: 'radius',
    ghost: false,
    size: null,
    block: false,
    onClick: () => {},
  };
  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'round', 'rect', 'radius']),
    size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool,
  };

  render () {
    const {
      prefixCls, htmlType, type, size, block, shape, active, focus, disabled, ghost,
      loading, className, onClick, children, style, theme, href, target, icon, ...others
    } = this.props;

    const classes = classnames({
      'is-block': block,
      'is-rect': shape === 'rect',
      'is-radius': shape === 'radius',
      'is-round': shape === 'round',
      'is-circle': shape === 'circle',
      'is-active': active,
      'is-focus': focus,
      'is-disabled': disabled,
      'is-loading': loading,
      'is-ghost': ghost,
      'has-icon': icon,
      [`${prefixCls}`]: true,
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--${size}`]: size,
      [className!]: className,
    });

    const textContent =
      loading ? (
        <React.Fragment>
          <Icon type="loading" className="rotate360"/>&nbsp;&nbsp;{children}
        </React.Fragment>
      ) : (
        children
      );

    return (
      href
        ? <a
          className={classes}
          href={href}
          style={style}
          target={target}
          {...others}
          onClick={e => (!disabled && !loading) && onClick!(e)}
        >
          {textContent}
        </a>
        : (
          <button
            type={htmlType}
            className={classes}
            style={style}
            disabled={disabled}
            onClick={e => (!disabled && !loading) && onClick!(e)}
            {...others}
          >
            {textContent}
          </button>
        )
    );
  }
}

export default Button;
