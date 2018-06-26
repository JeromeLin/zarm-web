import React, { Component } from 'react';
import PropsType from './PropsType';

class Loading extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-loading',
    visible: false,
  };

  render() {
    const { visible, children, style, prefixCls } = this.props;

    return visible ? (
      <div className={prefixCls} style={style}>
        <div className={`${prefixCls}-spins`}>
          <span className={`${prefixCls}-spin ${prefixCls}-spin-first`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-second`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-third`} />
        </div>
        <div className={`${prefixCls}-inner`}>{children}</div>
      </div>
    ) : (
      children
    );
  }
}

export default Loading;
