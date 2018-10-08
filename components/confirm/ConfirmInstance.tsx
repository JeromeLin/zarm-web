import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from './Confirm';
const div = document.createElement('div');
let visible = false;
class ConfirmExtension extends Confirm {
  // constructor(props) {
  //   super(props);
  // }

  static defalut(option: any) {
    document.body.appendChild(div);
    let defalutValue = {
      prefixCls: 'ui-confirm',
      message: '',
      width: 270,
      okText: '确定',
      cancelText: '取消',
      locale: {
        confirm: 'Cancel',
        cancel: 'Ok',
      },
      onOk: () => {},
      onCancel: () => {},
    };
    let object;
    if (option) {
      object = Object.assign(defalutValue, option);
    } else {
      object = Object.assign({}, defalutValue);
    }
    ReactDOM.render(
      <Confirm
        width={object.width}
        visible={visible}
        message={object.message}
        cancelText={object.cancelText}
        okText={object.okText}
        locale={object.locale}
        onCancel={() => {
          object.onCancel();
          ConfirmExtension.hide();
        }}
        onOk={object.onOk}
      />,
      div,
    );
  }
  static show(object) {
    visible = true;
    this.defalut(object);
  }
  static hide(callback?: () => void) {
    visible = false;
    if (callback) {
      callback();
    }
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }
}

export default ConfirmExtension;
