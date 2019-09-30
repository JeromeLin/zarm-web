import React, { Component, HTMLAttributes, CSSProperties } from 'react';
import classnames from 'classnames';
import { PropsType, StateType } from './PropsType';

class Avatar extends Component<PropsType & HTMLAttributes<HTMLSpanElement>, StateType> {
  static defaultProps: PropsType = {
    prefixCls: 'zw-avatar',
    shape: 'circle',
    src: '',
    size: 'md',
    alt: '',
  };

  private avatarChildrenNode: HTMLElement;

  private avatarWrapperNode: HTMLElement;

  state: StateType = {
    childrenScale: 1,
  };


  componentDidMount() {
    this.setChildrenScale();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props !== prevProps) {
      this.setChildrenScale();
    }
  }

  setChildrenScale = () => {
    if (!this.avatarChildrenNode || !this.avatarWrapperNode) {
      return;
    }
    const avatarChildrenWidth = this.avatarChildrenNode.offsetWidth;
    const avatarWrapperWidth = this.avatarWrapperNode.offsetWidth;
    if (!avatarChildrenWidth || !avatarWrapperWidth) {
      return;
    }
    const childrenScale = (avatarWrapperWidth - 8) / avatarChildrenWidth;
    this.setState({
      childrenScale: (childrenScale < 1)
        ? childrenScale
        : 1,
    });
  };

  render() {
    const {
      prefixCls,
      style,
      size,
      shape,
      src,
      alt,
      children,
      className,
      ...others
    } = this.props;
    const { childrenScale } = this.state;

    const hasFontSizeStyle = (style && style.fontSize);
    const hasImage = (src && src.trim() !== '');
    const hasString = (typeof children === 'string');

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: className,
      [`${prefixCls}--${size}`]: typeof size === 'string' && size,
      [`${prefixCls}--${shape}`]: true,
    });

    const clsImage = classnames({ [`${prefixCls}--image`]: hasImage });
    const clsString = classnames({ [`${prefixCls}--string`]: hasString || hasImage });
    const childrenTransformStr = `scale(${childrenScale}) translateX(-50%)`;
    const spanStyle: CSSProperties = hasFontSizeStyle
      ? {} : {
        transform: childrenTransformStr,
        WebkitTransform: childrenTransformStr,
        msTransform: childrenTransformStr,
      };

    return (
      <span
        style={style}
        className={cls}
        {...others}
        ref={(node: HTMLElement) => {
          this.avatarWrapperNode = node;
        }}
      >
        {hasImage && <img src={src} alt={alt} className={clsImage} />}
        {(!hasImage) && hasString && (
          <span
            className={clsString}
            style={spanStyle}
            ref={(node: HTMLElement) => {
              this.avatarChildrenNode = node;
            }}
          >
            {children}
          </span>
        )}
      </span>
    );
  }
}

export default Avatar;
