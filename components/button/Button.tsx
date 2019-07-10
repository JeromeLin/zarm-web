import React, { Component, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import ButtonProps, { ButtonType } from './PropsType';
import Icon from '../icon';
import ButtonGroup from './ButtonGroup';

interface ButtonPropsIF extends ButtonProps {
  htmlType: ButtonType;
}


interface ButtonIF {
  anchor: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps;
  button: ButtonHTMLAttributes<HTMLButtonElement> & ButtonPropsIF;
}

function isAnchorProps(props: any):
  props is AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps {
  return {}.hasOwnProperty.call(props, 'href');
}

// function isButtonProps(props: Button['props']): props is (Readonly<ButtonIF['button']> & Readonly<{ children?: ReactNode; }>) {
//   return !{}.hasOwnProperty.call(props, 'href');
// }


class Button<T extends 'button' | 'anchor' = 'button'> extends Component<ButtonIF[T]> {
  static Group = ButtonGroup;

  static defaultProps = {
    prefixCls: 'zw-button',
    theme: 'default',
    shape: 'radius',
    ghost: false,
    size: null,
    loading: false,
    disabled: false,
    block: false,
    htmlType: 'button',
  };

  onClick = (e: any) => {
    const { disabled, loading, onClick } = this.props;
    if (disabled === true || loading === true) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  renderAnchor(props: Readonly<ButtonIF['anchor'] & { children?: ReactNode }>, classes: string, textContent: ReactNode) {
    const {
      prefixCls,
      htmlType,
      type,
      size,
      block,
      shape,
      disabled,
      ghost,
      loading,
      className,
      onClick,
      children,
      theme,
      active,
      ...restAnchorProps
    } = props;
    return (
      <a
        {...restAnchorProps}
        className={classes}
        onClick={this.onClick}
      >
        {textContent}
      </a>
    );
  }

  renderButton(props: Readonly<ButtonIF['button']> & Readonly<{ children?: ReactNode }>, classes: string, textContent: ReactNode) {
    const {
      prefixCls,
      htmlType,
      type,
      size,
      block,
      shape,
      ghost,
      loading,
      className,
      onClick,
      children,
      theme,
      active,
      ...restButtonProps
    } = props;
    return (
      <button
        {...restButtonProps}
        type={htmlType}
        className={classes}
        onClick={this.onClick}
      >
        {textContent}
      </button>
    );
  }

  render() {
    const {
      prefixCls,
      size,
      block,
      shape,
      disabled,
      ghost,
      loading,
      className,
      theme,
      active,
      focus,
      children,
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
    });

    const textContent = loading
      ? (
        <React.Fragment>
          <Icon type="loading" className="rotate360" />
          &nbsp;&nbsp;
          {children}
        </React.Fragment>
      )
      : children;

    const allProps = this.props as any;
    if (isAnchorProps(allProps)) {
      return this.renderAnchor(allProps, classes, textContent);
    }
    return this.renderButton(allProps, classes, textContent);
  }
}

export default Button;
