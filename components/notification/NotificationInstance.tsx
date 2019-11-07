import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import PropsType from './PropsType';

export interface Instance {
  key: string;
  [key: string]: any;
}

const NOTIFICATION_GAP = 12;
const notificationInstances: Instance[] = [];
const now = Date.now();
let seed = 0;

function getNotificationKey() {
  const key = `notification-${now}-${seed += 1}`;
  return key;
}

function NotificationInstance(props?: any, theme?: string) {
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

  const { key } = props;
  const instances = document.querySelectorAll(className);
  const lastInstance: any = instances[instances.length - 1];

  props.top = (
    lastInstance
      ? (parseInt(lastInstance.style.top, 10) + lastInstance.offsetHeight)
      : 0
  ) + NOTIFICATION_GAP;

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
      instance.key = instance.key || key || getNotificationKey();
      notificationInstances.push(instance);
    }
  }

  ReactDOM.render(<Notification {...props} willUnMount={willUnMount} ref={ref} />, div);
}

const api: any = {
  open(props: PropsType) {
    NotificationInstance(props);
  },
  remove(key: string) {
    notificationInstances.forEach((instance: Instance) => {
      if (instance.key === key) {
        instance.onClose();
      }
    });
  },
};

['primary', 'danger', 'success', 'warning', 'loading'].forEach((theme) => {
  api[theme] = (options: object = {}) => {
    NotificationInstance(options, theme);
  };
});

export interface NotificationApi {
  primary(props: PropsType): void;
  danger(props: PropsType): void;
  success(props: PropsType): void;
  warning(props: PropsType): void;
  loading(props: PropsType): void;
  open(props: PropsType): void;
  remove(key: string): void;
}

export default api as NotificationApi;
