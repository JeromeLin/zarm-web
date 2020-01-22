import StackManager from '../notification/StackManager';
import { ItemPropsType, IconType, NotificationAPI, APIPropsType, APIReturn, Positions } from '../notification/PropsType';
import { handleOptions } from '../notification/utils';
import Message from './Message';

interface MessageAPI extends NotificationAPI {
  loading(props: APIPropsType): APIReturn;
}

const managerInstance = new StackManager(Message, 'message');

function showMessage(options: APIPropsType, icon?: IconType) {
  const newOptions: ItemPropsType = handleOptions(options);
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
  return managerInstance.open(newOptions)
}

const messageApi: Partial<MessageAPI> = {
  open(options: ItemPropsType) {
    return showMessage(options);
  },
  close(key) {
    managerInstance.close(key)
  },
  closeAll() {
    managerInstance.closeAll()
  },
  destroy() {
    managerInstance.destroy()
  }
};

['success', 'warning', 'info', 'error', 'loading'].forEach(iconType => {
  messageApi[iconType] = (options: APIPropsType) => {
    return showMessage(options, iconType as IconType);
  };
});

export default messageApi as MessageAPI;
