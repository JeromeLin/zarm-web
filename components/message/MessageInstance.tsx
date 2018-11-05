import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

let div = document.createElement('div');
let flage = true;

class MessageExtension extends Message {
  // constructor(props) {
  //   super(props);
  // }
  static default(options) {
    if (!options) {
      options = {
        msg: '请输入提示信息',
        duratation: 200,
        theme: 'info',
      };
    }

    let { msg = '请输入提示信息', duration = 2000, theme, callback } = options;
    if (flage) {
      flage = false;
      let messageArray = [{ m: msg }];
      document.body.appendChild(div);
      ReactDOM.render(
        <Message msg={messageArray} duration={duration} theme={theme} />,
        div,
      );
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        if (callback) {
          callback();
        }
        flage = true;
      }, duration);
    }
  }

  static show(options) {
    this.default(options);
  }
}

export default MessageExtension;
