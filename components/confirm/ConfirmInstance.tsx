import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from './Confirm';
import ConfirmPropsType from './PropsType';

class ConfirmExtension extends Confirm {
  static defaultValue = {
    prefixCls: 'ui-confirm',
    message: '',
    width: 270,
    okText: '确定',
    cancelText: '取消',
    animationDuration: 300,
    locale: {
      confirm: 'Cancel',
      cancel: 'Ok',
    },
  };

  static defalut(
    visible: boolean,
    option: ConfirmPropsType | ConfirmPropsType['message'],
    cancelCallback?: () => void,
  ) {
    let defalutValue = ConfirmExtension.defaultValue;
    let object: ConfirmPropsType;
    if (typeof option === 'string') {
      object = { ...defalutValue, message: option };
    } else if (option) {
      object = { ...defalutValue, ...option };
    } else {
      object = { ...defalutValue };
    }
    const { onCancel, onOk, ...others } = object;
    if (visible === false) {
      setTimeout(() => {
        if (cancelCallback) {
          cancelCallback();
        }
      }, others.animationDuration);
    }
    document.body.appendChild(ConfirmExtension.div);
    return new Promise((resolve) => {
      ReactDOM.render(
        <Confirm
          {...others}
          visible={visible}
          onCancel={() => {
            if (onCancel) {
              onCancel();
            }
            ConfirmExtension.hide();
            resolve(false);
          }}
          onOk={(e) => {
            if (onOk) {
              onOk(e);
            }
            ConfirmExtension.hide();
            resolve(true);
          }}
        />,
        ConfirmExtension.div,
      );
    });
  }
  static show(object: ConfirmPropsType | ConfirmPropsType['message']) {
    ConfirmExtension.currentProps = object;
    return this.defalut(true, object);
  }
  static hide(callback?: () => void) {
    this.defalut(false, ConfirmExtension.currentProps, () => {
      ReactDOM.unmountComponentAtNode(ConfirmExtension.div);
      const parentNode = ConfirmExtension.div.parentNode;
      if (parentNode) {
        parentNode.removeChild(ConfirmExtension.div);
      }
    });
    if (callback) {
      callback();
    }
  }

  private static currentProps: ConfirmPropsType | ConfirmPropsType['message'];
  private static div = document.createElement('div');
}

export default ConfirmExtension;
