import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../Icon';

class Alert extends Component {
  render() {
    const {
      theme, message, onClose, width, className, visible,
    } = this.props;

    let iconType = 'info-round';
    switch (theme) {
      case 'warning':
        iconType = 'warning-round';
        break;
      case 'success':
        iconType = 'right-round';
        break;
      case 'error':
        iconType = 'wrong-round';
        break;
      default:
        break;
    }

    return (
      <Modal
        width={width}
        className={className}
        visible={visible}
      >
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
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  theme: 'info',
  message: '',
  width: 270,
  className: '',
  onClose: () => {},
};

export default Alert;
