import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../icon';

class Avatar extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-avatar',
    icon: '',
    shape: 'circle',
    size: 'default',
    src: '',
    alt: '',
    onError: () => false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadError: false,
    };
  }

  _onError() {
    this.setState({ loadError: true });
    this.props.onError();
  }

  render() {
    const {
      prefixCls,
      style,
      size,
      shape,
      icon,
      src,
      alt,
      children,
    } = this.props;
    const { loadError } = this.state;

    const largeSize = (size === 'large');
    const smallSize = (size === 'small');
    const circle = (shape === 'circle');
    const hasIcon = (icon && icon.trim() !== '');
    const hasImage = (src && src.trim() !== '');
    const hasString = (typeof children === 'string');
    const strLength = (typeof children === 'string' && children.length) || 0;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-lg`]: largeSize,
      [`${prefixCls}-sm`]: smallSize,
      [`${prefixCls}-circle`]: circle,
      [`${prefixCls}-square`]: !circle,
      [`${prefixCls}-icon`]: hasIcon,
      [`${prefixCls}-image`]: hasImage && !loadError,
      [`${prefixCls}-string`]: hasString || (hasImage && loadError),
    });

    const inlineStyle = (typeof size === 'number') ? {
      ...style,
       width: size,
       height: size,
       lineHeight: size + 'px',
       fontSize: size / 2 + 'px',
      } : { ...style };

    const spanStyle = {
      position: 'absolute' as 'absolute',
      transform: 'scale(' + (1 - 0.1 * strLength ) + ')',
      left: 'calc(50% - ' + 4.5 * strLength + 'px )',
      };

    return (
        <span
          style={inlineStyle}
          className={cls}
        >
        {hasImage && !loadError && <img src={src} alt={alt} onError={() => this._onError()}/>}
        {!hasImage && hasIcon && <Icon type={icon}/>}
        {(!hasImage || hasImage && loadError) && !hasIcon && hasString &&  <span style={spanStyle}>{children}</span>}
        </span>
    );
  }
}

export default Avatar;
