
import React, { Component, PropTypes } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';

class Alert extends Component {

  render () {
    const { theme, message, onClose, ...others } = this.props;
    
    let iconType = 'info-round';
    switch(theme) {
      case 'warning':
        iconType = 'warning-round';
        break;
      case 'success':
        iconType = 'check-round';
        break;
      case 'error':
        iconType = 'close-round';
        break;
    }

    return (
      <Modal {...others}>
        <Modal.Body>
          <div className="ui-alert">
            <Icon type={iconType} theme={theme} />
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
  theme   : PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message : PropTypes.string,
  width   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose : PropTypes.func,
};

Alert.defaultProps = {
  theme   : 'info',
  message : '',
  width   : 270,
  onClose : () => {},
};

export default Alert;