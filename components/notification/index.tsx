import StackManager from './StackManager';
import Notification from './Notification';
import { NotificationItemProps, NotificationIcon, NotificationInstance, NotificationOptions } from './PropsType';
import { handleOptions } from './utils';

const managerInstance = new StackManager(Notification, 'notification');

function showNotification(options: NotificationOptions, icon?: NotificationIcon) {
  const newOptions: NotificationItemProps = handleOptions(options);
  if (icon) {
    newOptions.icon = icon;
  }
  return managerInstance.open(newOptions);
}

const notificationInstance: Partial<NotificationInstance> = {
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
  notificationInstance[iconType] = (options: NotificationOptions) => {
    return showNotification(options, iconType as NotificationIcon);
  };
});

export default notificationInstance as NotificationInstance;
