import React, { Component, MouseEvent } from 'react';
import Modal from '../modal';
import Button from '../button';
import Icon from '../icon';
import PropsType from './PropsType';

const Style = {
  hide: { display: 'none' },
};

class Confirm extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-confirm',
    message: '',
    width: 270,
    okText: '确定',
    cancelText: '取消',
  };

  ButtonRef = React.createRef();

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onOk = (e: MouseEvent) => {
    if (this.props.onOk) {
      this.props.onOk(e);
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (this.props.onOk) {
        this.props.onOk(e);
      }
    }
  };

  render() {
    const {
      prefixCls,
      message,
      okText,
      cancelText,
      width,
      visible,
      animationDuration,
    } = this.props;
    return (
      <Modal width={width} visible={visible} animationDuration={animationDuration} onKeyPress={this.onKeyPress}>
        <Modal.Header onClose={this.onCancel} style={Style.hide} />
        <Modal.Body>
          <div className={prefixCls}>
            <Icon type="question-round" />
            <span>{message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCancel}>{cancelText}</Button>
          <Button theme="primary" onClick={this.onOk}>{okText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Confirm;
