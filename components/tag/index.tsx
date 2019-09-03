import React, { Component, MouseEvent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon';
import PropsType from './PropsType';
import CheckableTag from './CheckableTag';

const Style = {
  iconStyle: { marginLeft: '8px', cursor: 'pointer' },
};
const presetColors = ['green', 'blue', 'orange', 'red', 'gray'];

class Tag extends Component<PropsType, any> {
  static CheckableTag = CheckableTag;

  static defaultProps = {
    color: '',
    prefixCls: 'zw-tag',
    size: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(['', 'large', 'middle', 'small', 'xsmall']),
    shape: PropTypes.oneOf(['', 'rect', 'radius', 'round']),
  };

  isPresetColor = () => {
    const { color } = this.props;
    return !!color && presetColors.indexOf(color) > -1;
  };

  getStyle = () => {
    const { style, color } = this.props;
    // style权重高于定义color
    const customStyle = color && !this.isPresetColor() ? {
      backgroundColor: color,
      color: '#fff',
    } : {};
    return {
      ...customStyle,
      ...style,
    };
  };

  render() {
    const {
      prefixCls,
      color,
      size,
      shape,
      className,
      onClose,
      closable,
      children,
      ...other
    } = this.props;
    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${color}`]: this.isPresetColor(),
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${shape}`]: shape,
    });

    const closeIcon = closable ? (
      <Icon
        style={Style.iconStyle}
        type="wrong"
        onClick={(e: MouseEvent) => { onClose && onClose(e); }}
      />
    ) : null;
    return (
      <div {...other} className={classes} style={this.getStyle()}>
        { children }
        { closeIcon }
      </div>
    );
  }
}

export default Tag;
