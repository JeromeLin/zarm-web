import StackManager from '../notification/StackManager';
import { MessageItemProps, MessageIcon, MessageInstance, MessageOptions } from './PropsType';
import { handleOptions } from '../notification/utils';
import { NotificationPositions } from '../notification/PropsType';
import Message from './Message';

const managerInstance = new StackManager(Message, 'message');

function showMessage(options: MessageOptions, icon?: MessageIcon) {
  const newOptions: MessageItemProps = handleOptions(options);
  if (icon) {
    newOptions.icon = icon;
  }
  if (
    !newOptions.stayTime
    && newOptions.stayTime !== 0
  ) {
    newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 3000;
  }
  newOptions.position = NotificationPositions.topCenter;
  return managerInstance.open(newOptions);
}

const messageInstance: Partial<MessageInstance> = {
  open(options: MessageItemProps) {
    return showMessage(options);
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

['success', 'warning', 'info', 'error', 'loading'].forEach((iconType) => {
  messageInstance[iconType] = (options: MessageOptions) => {
    return showMessage(options, iconType as MessageIcon);
  };
});

export default messageInstance as MessageInstance;
