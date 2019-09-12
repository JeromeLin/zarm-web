import React, { PureComponent, MouseEvent } from 'react';
import classnames from 'classnames';
import Color from 'color';
import Icon from '../icon';
import { TagProps } from './PropsType';
import CheckableTag from './CheckableTag';

const presetColors = ['green', 'blue', 'orange', 'red'];

class Tag extends PureComponent<TagProps, any> {
  static CheckableTag = CheckableTag;

  static defaultProps = {
    prefixCls: 'zw-tag',
    color: '',
    size: 'md',
    shape: 'radius',
    bordered: true,
  };

  getColorStyle() {
    const { color, bordered } = this.props;
    return !bordered ? {
      backgroundColor: color,
      borderColor: color,
      color: '#fff',
    } : {
      color,
      borderColor: Color(color).alpha(0.3),
      backgroundColor: Color(color).alpha(0.05),
    };
  }

  isPresetColor = () => {
    const { color } = this.props;
    return !!color && presetColors.indexOf(color) > -1;
  };

  getStyle = () => {
    const { style, color, bordered } = this.props;
    const customStyle = color && !this.isPresetColor() ? this.getColorStyle() : {};
    let borderStyle = {};

    if (!bordered && color) {
      borderStyle = {
        color: '#fff',
        border: 'hidden',
      };
    }

    return {
      ...customStyle,
      ...borderStyle,
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
      bordered,
      ...other
    } = this.props;
    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${color}`]: this.isPresetColor(),
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--unborder`]: !bordered,
    });

    const closeIcon = closable ? (
      <Icon
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
