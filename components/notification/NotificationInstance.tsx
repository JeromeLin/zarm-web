import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import { PropsType, Type } from './PropsType';

export interface Instance {
  key: string;
  [key: string]: any;
}

const NOTIFICATION_GAP = 20;
const notificationInstances: Instance[] = [];
let seed = 0;

function getNotificationKey() {
  return `notification-${++seed}`;
}

function NotificationInstance(props?: any, type?: Type) {
  const className: string = '.' + props.prefixCls;
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

  const key = getNotificationKey();
  const instances = document.querySelectorAll(className);
  const lastInstance: any = instances[instances.length - 1];

  props.top = (lastInstance ? (parseInt(lastInstance.style.top, 10)
    + lastInstance.offsetHeight) : 0) + NOTIFICATION_GAP;

  function willUnMount(lastHeight, lastTop) {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    });

    const instancesDom = document.querySelectorAll(className);

    Array.from(instancesDom).forEach((instance: any) => {
      const instanceTop = parseInt(instance.style.top, 10);
      if (instanceTop > lastTop) {
        instance.style.top = `${instanceTop - lastHeight - NOTIFICATION_GAP}px`;
      }
    });
  }

  function ref(instance: Instance) {
    if (instance) {
      instance.key = instance.key || key;
      notificationInstances.push(instance);
    }
  }

  ReactDOM.render(<Notification {...props} willUnMount={willUnMount} ref={ref} />, div);

  return {
    close() {
      closeInstance(key)
    }
  }
}

function closeInstance(key: string) {
  notificationInstances.forEach((instance: Instance) => {
    if (instance.key === key) {
      instance.onClose();
    }
  });
}

const api: any = {
  open(props: PropsType) {
    return NotificationInstance(props);
  }
};

['info', 'error', 'success', 'warning'].forEach((type: Type) => {
  api[type] = (options: object = {}) => {
    return NotificationInstance(options, type);
  };
});

export interface NotificationApi {
  info(props: PropsType): void;
  error(props: PropsType): void;
  success(props: PropsType): void;
  warning(props: PropsType): void;
  open(props: PropsType): void;
}

export default api as NotificationApi;
