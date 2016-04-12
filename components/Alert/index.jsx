
import React, { Component, PropTypes } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';

class Alert extends Component {

  render () {
    const { message, onClose, ...others } = this.props;
    
    return (
      <Modal {...others}>
        <Modal.Body>
          <div className="ui-alert">
            <Icon type="info-round" />
            <span>{message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>关闭</Button>
        </Modal.Footer>
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