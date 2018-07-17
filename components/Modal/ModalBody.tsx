import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalBodyProps } from './PropsType';

class ModalBody extends Component<ModalBodyProps, any> {
  static defaultProps = {
    prefixCls: 'ui-modal',
    height: 'auto',
    style: {},
  };

  render() {
    const { height, children, prefixCls, className, style } = this.props;
    const bodyStyle = {
      ...style,
      height,
    };

    const cls = classnames({
      [`${prefixCls}-body`]: true,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={bodyStyle}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
