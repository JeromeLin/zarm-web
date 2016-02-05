
import React, { Component, PropTypes } from 'react';
import Modal from '../Modal';
import Button from '../Button';

class Confirm extends Component {

  render () {
    const { message, okText, cancelText, onOk, onCancel, ...others } = this.props;
    
    return (
      <Modal {...others}>
        <Modal.Body>
          <p style={{textAlign: 'center'}}>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" onClick={onCancel}>{cancelText}</Button>
          <Button size="lg" theme="success" onClick={onOk}>{okText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Confirm.propTypes = {
  message   : PropTypes.string,
  width     : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  okText    : PropTypes.string,
  cancelText: PropTypes.string,
  onOk      : PropTypes.func,
  onCancel  : PropTypes.func,
};

Confirm.defaultProps = {
  message   : '',
  width     : 270,
  okText    : '确定',
  cancelText: '取消',
  onOk      : function () {},
  onCancel  : function () {},
};

export default Confirm;

