import React, { Component } from 'react';
import Modal from '../modal';
import Button from '../button';
import Icon from '../icon';
import AlertProps from './PropsType';

class Alert extends Component<AlertProps, any> {
  static defaultProps = {
    prefixCls: 'ui-alert',
    theme: 'info',
    message: '',
    width: 270,
    className: '',
    hideIcon: false,
    closable: true,
    // closeText: '关闭',
    onClose: () => {},
  };

  render() {
    const {
      theme, message, closable, closeText, onClose, width,
      className, visible, prefixCls, hideIcon, locale,
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
          <div className={prefixCls}>
            {!hideIcon && <Icon type={iconType} theme={theme} />}
            <span>{message}</span>
          </div>
        </Modal.Body>
        {
          closable && (
            <Modal.Footer>
              <Button onClick={onClose}>{closeText || locale!.close}</Button>
            </Modal.Footer>
          )
        }
      </Modal>
    );
  }
}

export default Alert;
