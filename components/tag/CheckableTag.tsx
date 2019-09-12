import React, { Component } from 'react';
import classnames from 'classnames';
import { CheckableTagProps } from './PropsType';

class CheckableTag extends Component<CheckableTagProps, any> {
  static defaultProps = {
    prefixCls: 'zw-tag',
    size: '',
  };

  onClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  };

  render() {
    const {
      prefixCls,
      size,
      shape,
      checked,
      className,
      disabled,
      children,
      style,
    } = this.props;

    const classes = classnames(prefixCls, className, `${prefixCls}--checkable`, {
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={classes} style={style} onClick={() => { !disabled && this.onClick(); }}>
        {children}
      </div>
    );
  }
}

export default CheckableTag;
