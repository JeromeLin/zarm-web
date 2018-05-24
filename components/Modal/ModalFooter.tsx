import React, { Component } from 'react';
import { ModalFooterProps } from './PropsType';

class ModalFooter extends Component<ModalFooterProps, any> {
  static defaultProps = {
    prefixCls: 'ui-modal',
    style: {},
  };

  render() {
    const { children, style, prefixCls } = this.props;

    return (
      <div className={`${prefixCls}-footer`} style={style}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
