import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PropsType from './PropsType';

class CheckableTag extends Component<PropsType, any> {
  static defaultProps = {
    theme: '',
    prefixCls: 'zw-tag',
    size: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    theme: PropTypes.string,
    size: PropTypes.oneOf(['', 'large', 'middle', 'small', 'xsmall']),
    shape: PropTypes.oneOf(['', 'rect', 'radius', 'round']),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    ghost: PropTypes.bool,
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
      theme,
      size,
      shape,
      checked,
      className,
      children,
      style,
      title,
    } = this.props;

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--checked`]: checked,
    });

    return (
      <div className={classes} style={style} title={title} onClick={this.onClick}>
        {children}
      </div>
    );
  }
}

export default CheckableTag;
