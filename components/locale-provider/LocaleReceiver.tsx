import LocaleReceiver from 'zarm/es/locale-receiver';
import defaultLocale from './lang/zh-cn';

const LocaleReceiverWrapper = (componentName: any) => {
  return LocaleReceiver(componentName, defaultLocale as any);
};

export default LocaleReceiverWrapper;
