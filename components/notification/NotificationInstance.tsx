import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

const NOTIFICATION_GAP = 16;

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

  const instances = document.querySelectorAll(className);

  const lastInstance: any = instances[instances.length - 1];

  props.top = (lastInstance ? (parseInt(lastInstance.style.top, 10) +
    lastInstance.offsetHeight) : 0) + NOTIFICATION_GAP;

  const element = React.createElement(Notification, {
    ...props,
    willUnMount (lastHeight, lastTop) {
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
    },
  });

  ReactDOM.render(element, div);
}

['primary', 'danger', 'success', 'warning', 'loading'].forEach(theme => {
  NotificationInstance[theme] = (options: object = {}) => {
    return NotificationInstance(options, theme);
  };
});
