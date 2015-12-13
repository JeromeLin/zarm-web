
import React, { Component, PropTypes } from 'react';
import Modal from '../Modal';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';

class Alert extends Component {

  render () {
    const { message, onClose, ...others } = this.props;
    
    return (
      <Modal {...others}>
        <ModalBody>
          <p style={{textAlign: 'center'}}>{message}</p>
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={onClose}>关闭</button>
        </ModalFooter>
      </Modal>
    );
  }
}

Alert.propTypes = {
  message : PropTypes.string,
  width   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose : PropTypes.func,
};

Alert.defaultProps = {
  message : '',
  width   : 270,
  onClose : function () {},
};

export default Alert;

