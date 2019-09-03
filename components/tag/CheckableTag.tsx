import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PropsType from './PropsType';

class CheckableTag extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-tag',
    size: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['', 'large', 'middle', 'small', 'xsmall']),
    shape: PropTypes.oneOf(['', 'rect', 'radius', 'round']),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
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

    const classes = classnames(prefixCls, className, {
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
