import React, { Component } from 'react';
import PropsType from './PropsType';

class Loading extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-loading',
    visible: false,
  };

  render() {
    const { visible, children, style, prefixCls } = this.props;
    return (
      <div className={prefixCls} style={style}>
        <div className={`${prefixCls}-spins`} style={{ display: (visible ? 'block' : 'none') }}>
          <span className={`${prefixCls}-spin ${prefixCls}-spin-first`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-second`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-third`} />
        </div>
        <div className={visible ? `${prefixCls}-inner` : ''}>{children}</div>
      </div>
    );
  }
}

export default Loading;
