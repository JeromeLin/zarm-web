import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalFooterProps } from './PropsType';

class ModalFooter extends Component<ModalFooterProps, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
  };

  render() {
    const { children, prefixCls, className, ...otherProps } = this.props;

    const cls = classnames({
      [`${prefixCls}__footer`]: true,
      [className!]: !!className,
    });

    return (
      <div className={cls} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
