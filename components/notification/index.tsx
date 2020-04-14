import StackManager from './StackManager';
import Notification from './Notification';
import { NotificationProps, NotificationIcon, NotificationInstance } from './PropsType';
import { handleOptions } from './utils';

const managerInstance = new StackManager(Notification, 'notification');

function showNotification(options: NotificationProps, icon?: NotificationIcon) {
  const newOptions = handleOptions(options);
  if (icon) {
    newOptions.icon = icon;
  }
  return managerInstance.open(newOptions);
}

const notificationInstance: Partial<NotificationInstance> = {
  open(props: NotificationProps) {
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
  notificationInstance[iconType] = (options: NotificationProps) => {
    return showNotification(options, iconType as NotificationIcon);
  };
});

export default notificationInstance as NotificationInstance;
