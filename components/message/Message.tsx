import Notification from '../notification';

const defaultOptions = {
  prefixCls: 'zw-message',
  isMessage: true,
  stayTime: 3000,
  type: 'info'
};

function proxy(type: string) {
  return (config?: object | string) => {
    return Notification[type]({
      ...defaultOptions,
      ...typeof config === 'string' ? { message: config } : config,
      type
    });
  };
}

export default {
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  open(options) {
    return Notification.open({ ...defaultOptions, ...options });
  },
};
