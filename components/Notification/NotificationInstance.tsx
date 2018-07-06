import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

const className: string = '.ui-notification';
const NOTIFICATION_GAP = 16;

export default function NotificationInstance (props: any, type: string) {
  const div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props,
    };
  }

  if (type) {
    props.type = type;
  }

  const instances = document.querySelectorAll(className);

  const lastInstance: any = instances[instances.length - 1];

  props.top = (lastInstance ? (parseInt(lastInstance.style.top, 10) +
    lastInstance.offsetHeight) : 0) + NOTIFICATION_GAP;

  const element = React.createElement(Notification, {
    ...props,
    willUnMount () {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  });

  ReactDOM.render(element, div);
}

// 注册单例方法
['info', 'error', 'success', 'warning'].forEach(type => {
  NotificationInstance[type] = (options: object = {}) => {
    return NotificationInstance(options, type);
  };
});
