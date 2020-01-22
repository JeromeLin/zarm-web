import StackManager from './StackManager';
import Notification from './Notification';
import { ItemPropsType, IconType, NotificationAPI, APIPropsType } from './PropsType';
import { handleOptions } from './utils';

const managerInstance = new StackManager(Notification, 'notification');

function showNotification(options: APIPropsType, icon?: IconType) {
  const newOptions: ItemPropsType = handleOptions(options);
  if (icon) {
    newOptions.icon = icon;
  }
  return managerInstance.open(newOptions);
}

const notificationApi: Partial<NotificationAPI> = {
  open(props: ItemPropsType) {
    return showNotification(props);
  },
  close(key) {
    managerInstance.close(key);
  },
  closeAll() {
    managerInstance.closeAll();
  },
  destroy() {
    managerInstance.destroy();
  },
};

['success', 'warning', 'info', 'error'].forEach((iconType) => {
  notificationApi[iconType] = (options: APIPropsType) => {
    return showNotification(options, iconType as IconType);
  };
});

export default notificationApi as NotificationAPI;
