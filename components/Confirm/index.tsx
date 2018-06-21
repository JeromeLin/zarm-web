import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';
import PropsType from './PropsType';

class Confirm extends Component<PropsType, any> {

  static defaultProps = {
    message: '',
    width: 270,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {},
    onCancel: () => {},
  };

  render() {
    const {
      message,
      okText,
      cancelText,
      onOk,
      width,
      visible,
      onCancel,
    } = this.props;

    return (
      <Modal width={width} visible={visible}>
        <Modal.Body>
          <div className="ui-confirm">
            <Icon type="question-round" />
            <span>{message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button theme="success" onClick={onOk}>
            {okText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Confirm;
