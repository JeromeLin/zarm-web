import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';

class Confirm extends Component {
  render() {
    const {
      message,
      okText,
      cancelText,
      onOk,
      width,
      visible,
      style,
      onCancel,
    } = this.props;

    return (
      <Modal width={width} visible={visible} style={style}>
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

Confirm.propTypes = {
  message: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Confirm.defaultProps = {
  message: '',
  width: 270,
  okText: '确定',
  cancelText: '取消',
  onOk: () => {},
  onCancel: () => {},
};

export default Confirm;
