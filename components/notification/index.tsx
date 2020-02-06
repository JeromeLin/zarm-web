import StackManager from './StackManager';
import Notification from './Notification';
import { NotificationItemProps, NotificationIcon, NotificationAPI, NotificationAPIProps } from './PropsType';
import { handleOptions } from './utils';

const managerInstance = new StackManager(Notification, 'notification');

function showNotification(options: NotificationAPIProps, icon?: NotificationIcon) {
  const newOptions: NotificationItemProps = handleOptions(options);
  if (icon) {
    newOptions.icon = icon;
  }
  return managerInstance.open(newOptions);
}

const notificationApi: Partial<NotificationAPI> = {
  open(props: NotificationItemProps) {
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
  notificationApi[iconType] = (options: NotificationAPIProps) => {
    return showNotification(options, iconType as NotificationIcon);
  };
});

export default notificationApi as NotificationAPI;
