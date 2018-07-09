import React from 'react';
import ReactDOM from 'react-dom';
import rafObj from '../utils/rAF';
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
    willUnMount (lastHeight, lastTop) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);

      rafObj.rAF(() => {
        const instancesDom = document.querySelectorAll(className);

        Array.from(instancesDom).forEach((instance: any) => {
          const instanceTop = parseInt(instance.style.top, 10);
          if (instanceTop > lastTop) {
            instance.style.top = `${instanceTop - lastHeight - 16}px`;
          }
        });
      });
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
