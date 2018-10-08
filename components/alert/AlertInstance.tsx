import React from 'react';
import Alert from './Alert';
import ReactDOM from 'react-dom';
let div = document.createElement('div');
let visible = false;

class AlertExtension extends Alert {
  static defalut(option: any) {
    document.body.appendChild(div);
    let defalutValue = {
      width: 270,
      message: 'hello world',
      closeText: '关闭',
      hideIcon: false,
      theme: 'info',
      closable: true,
      onClose: () => {},
    };
    let object;
    if (option) {
      object = Object.assign(defalutValue, option);
    } else {
      object = Object.assign({}, defalutValue);
    }
    ReactDOM.render(
      <Alert
        width={object.width}
        visible={visible}
        message={object.message}
        closeText={object.closeText}
        hideIcon={object.hideIcon}
        onClose={() => {
          object.onClose();
          AlertExtension.hide();
        }}
        closable={object.closable}
        theme={object.theme}
        locale={{
          close: 'close',
        }}
      />,
      div,
    );
  }
  static show(object) {
    visible = true;
    this.defalut(object);
  }
  static hide() {
    visible = false;
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }
}

export default AlertExtension;
