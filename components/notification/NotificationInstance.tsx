import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

interface Instance {
  key: string;
  [key: string]: any;
}

interface NotificationInstanceFunc {
  close?: object;
  remove?: object;
  [key: string]: any;
}

const NOTIFICATION_GAP = 16;
const notificationInstances: Instance[] = [];
const now = Date.now();
let seed = 0;

function getNotificationKey() {
  return `notification-${now}-${seed++}`;
}

export default function NotificationInstance (props?: any, theme?: string) {
  const className: string = props.isMessage ? '.za-message' : '.za-notification';
  const div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props,
    };
  }

  if (theme) {
    props.theme = theme;
  }

  const key = props.key;
  const instances = document.querySelectorAll(className);
  const lastInstance: any = instances[instances.length - 1];

  props.top = (lastInstance ? (parseInt(lastInstance.style.top, 10) +
    lastInstance.offsetHeight) : 0) + NOTIFICATION_GAP;

  function willUnMount (lastHeight, lastTop) {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    });

    const instancesDom = document.querySelectorAll(className);

    Array.from(instancesDom).forEach((instance: any) => {
      const instanceTop = parseInt(instance.style.top, 10);
      if (instanceTop > lastTop) {
        instance.style.top = `${instanceTop - lastHeight - 16}px`;
      }
    });
  }

  function ref (instance: Instance) {
    if (instance) {
      instance.key = instance.key || key || getNotificationKey();
      notificationInstances.push(instance);
    }
  }

  function remove (key) {
    notificationInstances.forEach((instance: Instance) => {
      if (instance.key === key) {
        instance.onClose();
      }
    });
  }

  ReactDOM.render(<Notification {...props} willUnMount={willUnMount} ref={ref} />, div);
  (NotificationInstance as NotificationInstanceFunc).remove = remove;
}

['primary', 'danger', 'success', 'warning', 'loading'].forEach(theme => {
  NotificationInstance[theme] = (options: object = {}) => {
    NotificationInstance(options, theme);
  };
});
