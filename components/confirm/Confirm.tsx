import React, { Component } from 'react';
import Modal from '../modal';
import Button from '../button';
import Icon from '../icon';
import PropsType from './PropsType';

class Confirm extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-confirm',
    message: '',
    width: 270,
    onOk: () => {},
    onCancel: () => {},
  };

  render() {
    const {
      prefixCls,
      message,
      okText,
      cancelText,
      onOk,
      width,
      visible,
      onCancel,
      locale,
    } = this.props;
    return (
      <Modal width={width} visible={visible}>
        <Modal.Body>
          <div className={prefixCls}>
            <Icon type="question-round" />
            <span>{message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}>{cancelText || locale!.cancel}</Button>
          <Button theme="success" onClick={onOk}>
            {okText || locale!.confirm}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Confirm;
