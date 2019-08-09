import { LocaleReceiver } from 'zarm';

const LocaleReceiverWrapper = (componentName: any) => {
  return LocaleReceiver(componentName);
};

export default LocaleReceiverWrapper;
