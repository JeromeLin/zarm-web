import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ModalFooterProps } from './PropsType';

interface PropsType extends ModalFooterProps, HTMLAttributes<HTMLDivElement> { }

class ModalFooter extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
  };

  render() {
    const { children, prefixCls, className, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}-footer`]: true,
      [className!]: !!className,
    });

    return (
      <div {...others} className={cls}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
