import { LocaleReceiver } from 'zarm';
import defaultLocale from './lang/zh-cn';

const LocaleReceiverWrapper = (componentName: any) => {
  return LocaleReceiver(componentName, defaultLocale as any);
};

export default LocaleReceiverWrapper;
