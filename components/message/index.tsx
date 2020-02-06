import StackManager from '../notification/StackManager';
import { MessageItemProps, MessageIcon, MessageAPI, MessageAPIProps } from './PropsType';
import { handleOptions } from '../notification/utils';
import { Positions } from '../notification/enums';

import Message from './Message';

const managerInstance = new StackManager(Message, 'message');

function showMessage(options: MessageAPIProps, icon?: MessageIcon) {
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
  newOptions.position = Positions.topCenter;
  return managerInstance.open(newOptions);
}

const messageApi: Partial<MessageAPI> = {
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
  messageApi[iconType] = (options: MessageAPIProps) => {
    return showMessage(options, iconType as MessageIcon);
  };
});

export default messageApi as MessageAPI;
