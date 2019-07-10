import React, { Component, HTMLProps } from 'react';
import classnames from 'classnames';
import { ModalHeaderProps } from './PropsType';
import Icon from '../icon';

interface PropsType extends ModalHeaderProps, HTMLProps<HTMLDivElement> { }

class ModalHeader extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
  };

  render() {
    const { onClose, prefixCls, className, children, ...others } = this.props;
    const btnClose = onClose ? (
      <div className={`${prefixCls}-close`} onClick={onClose}>
        <Icon type="wrong" />
      </div>
    ) : null;

    const cls = classnames({
      [`${prefixCls}-header`]: true,
      [className!]: !!className,
    });

    return (
      <div {...others} className={cls}>
        <div className={`${prefixCls}-title`}>{children}</div>
        {btnClose}
      </div>
    );
  }
}

export default ModalHeader;
