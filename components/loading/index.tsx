import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Loading extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-loading',
    visible: false,
  };

  componentWillUnmount(): void {
    this.enableScroll();
  }

  getStyle(): {} {
    const { fullscreen, visible } = this.props;
    if (fullscreen) {
      this.disableScroll();
      return {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999,
      };
    }

    this.enableScroll();
    return visible ? { position: 'relative' } : {};
  }

  documentBody = () => {
    return document.body;
  };

  disableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.setProperty('overflow', 'hidden');
    }
  }

  enableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.removeProperty('overflow');
    }
  }

  render() {
    const { visible, children, style, prefixCls, text, className, size } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${size}`]: size,
    });
    const textCls = size === 'sm' ? {
      display: 'inline',
    } : {};

    return (
      <div className={cls} style={this.getStyle()}>
        {
          !!visible && (
            <div className={`${prefixCls}__mask`}>
              <div className={`${prefixCls}__spin`} style={style}>
                <svg className={`${prefixCls}__svg`} viewBox="25 25 50 50">
                  <circle cx="50" cy="50" r="20" fill="none" stroke='#E6E6E6' />
                  <circle className={`${prefixCls}__path`} cx="50" cy="50" r="20" fill="none" />
                </svg>
                { text && (<div className={`${prefixCls}__text`} style={textCls}>{text}</div>) }
              </div>
            </div>
          )
        }
        {children}
      </div>
    );
  }
}

export default Loading;
