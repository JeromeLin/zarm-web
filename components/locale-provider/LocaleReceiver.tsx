import LocaleReceiver from 'zarm/lib/locale-receiver';
import defaultLocale from './locale/zh_CN';

const LocaleReceiverWrapper = (componentName: any) => {
  return LocaleReceiver(componentName, defaultLocale as any);
};

export default LocaleReceiverWrapper;
