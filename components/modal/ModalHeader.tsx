import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalHeaderProps } from './PropsType';
import Icon from '../icon';

class ModalHeader extends Component<ModalHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'zw-modal',
    closable: true,
  };

  render() {
    const { children, closable, onCancel, prefixCls, className, style } = this.props;
    const btnClose = closable ? (
      <div className={`${prefixCls}-close`} onClick={onCancel}>
        <Icon type="wrong" />
      </div>
    ) : null;

    const cls = classnames({
      [`${prefixCls}-header`]: true,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        <div className={`${prefixCls}-title`}>{children}</div>
        {btnClose}
      </div>
    );
  }
}

export default ModalHeader;
