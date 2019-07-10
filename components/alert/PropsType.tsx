import zhCn from '../locale/lang/zh-cn';

export type themeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export default interface PropsType {
  prefixCls?: string;
  theme?: themeType;
  message?: string;
  width?: number | string;
  className?: string;
  visible?: boolean;
  hideIcon?: boolean;
  closable?: boolean;
  closeText?: string;
  locale: typeof zhCn.Alert;
  onClose: () => void;
}
