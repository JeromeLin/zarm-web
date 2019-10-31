import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Color from 'color';
import Icon from '../icon';
import { TagProps } from './PropsType';
import CheckableTag from './CheckableTag';

const presetColors = ['green', 'blue', 'orange', 'red'];

class Tag extends PureComponent<TagProps, {}> {
  static displayName = 'Tag';

  static CheckableTag = CheckableTag;

  static defaultProps = {
    prefixCls: 'zw-tag',
    bordered: true,
  };

  getColorStyle() {
    const { color, bordered } = this.props;
    return !bordered
      ? {
        backgroundColor: color,
        borderColor: color,
        color: '#fff',
      }
      : {
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
    const { style, color } = this.props;
    const customStyle = color && !this.isPresetColor() ? this.getColorStyle() : {};

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
      bordered,
      ...other
    } = this.props;

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${color}`]: this.isPresetColor(),
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--unborder`]: !bordered,
    });

    const closeIcon = closable && (
      <Icon
        type="wrong"
        onClick={(e) => { onClose && onClose(e); }}
      />
    );

    return (
      <div {...other} className={classes} style={this.getStyle()}>
        {children}
        {closeIcon}
      </div>
    );
  }
}

export default Tag;
