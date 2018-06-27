import React, { Component } from 'react';
import { ModalHeaderProps } from './PropsType';
import Icon from '../Icon';

class ModalHeader extends Component<ModalHeaderProps, any> {
  static defaultProps = {
    title: '',
    style: {},
    onClose: () => {},
  };

  render() {
    const { title, onClose, style } = this.props;
    const btnClose = onClose ? (
      <div className="ui-modal-close" onClick={onClose}>
        <Icon type="wrong" />
      </div>
    ) : null;

    return (
      <div className="ui-modal-header" style={style}>
        <div className="ui-modal-title">{title}</div>
        {btnClose}
      </div>
    );
  }
}

export default ModalHeader;
