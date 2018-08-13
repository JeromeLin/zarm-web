import React, { Component } from 'react';
import classnames from 'classnames';
import { ModalHeaderProps } from './PropsType';
import Icon from '../icon';

class ModalHeader extends Component<ModalHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'ui-modal',
    title: '',
    style: {},
    onClose: () => {},
  };

  render() {
    const { title, onClose, prefixCls, className, style } = this.props;
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
      <div className={cls} style={style}>
        <div className={`${prefixCls}-title`}>{title}</div>
        {btnClose}
      </div>
    );
  }
}

export default ModalHeader;
