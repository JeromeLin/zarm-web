import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../Modal';
import Button from '../Button';

export interface ConfirmProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Confirm extends PureComponent<ConfirmProps, {}> {

  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    message: '',
    okText: '确定',
    cancelText: '取消',
    width: 400,
  };

  // static show = (props) => {
  //   ReactDOM.render(<Confirm {...props} visible />, window.zarmConfirm);
  // }

  // static hide = () => {
  //   ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
  // }

  render() {
    const { prefixCls, className, title, message, okText, cancelText, onOk, onCancel, ...others } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <Modal className={cls} {...others}>
        <Modal.Header title={title} />
        <Modal.Body className={`${prefixCls}-body`}>
          {message}
        </Modal.Body>
        <Modal.Footer className={`${prefixCls}-footer`}>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button theme="primary" onClick={onOk}>{okText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// if (!window.zarmConfirm) {
//   window.zarmConfirm = document.createElement('div');
//   document.body.appendChild(window.zarmConfirm);
// }

// ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
