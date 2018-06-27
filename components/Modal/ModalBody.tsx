import React, { Component } from 'react';
import { ModalBodyProps } from './PropsType';

class ModalBody extends Component<ModalBodyProps, any> {
  static defaultProps = {
    prefixCls: 'ui-modal',
    height: 'auto',
  };

  render() {
    const { height, children, prefixCls } = this.props;
    const bodyStyle = {
      height,
    };

    return (
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
