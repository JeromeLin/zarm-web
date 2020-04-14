import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalBodyProps } from './PropsType';

class ModalBody extends Component<ModalBodyProps, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
  };

  render() {
    const { children, prefixCls, className, style } = this.props;
    const bodyStyle = { ...style };
    const cls = classnames(`${prefixCls}__body`, className);
    return (
      <div className={cls} style={bodyStyle}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
