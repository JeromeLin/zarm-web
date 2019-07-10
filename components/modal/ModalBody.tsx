import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ModalBodyProps } from './PropsType';

interface PropsType extends ModalBodyProps, HTMLAttributes<HTMLDivElement> { }

class ModalBody extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
    height: 'auto',
  };

  render() {
    const { height, children, prefixCls, className, style, ...others } = this.props;
    const bodyStyle = {
      ...style,
      height,
    };

    const cls = classnames({
      [`${prefixCls}-body`]: true,
      [className!]: !!className,
    });

    return (
      <div {...others} className={cls} style={bodyStyle}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
