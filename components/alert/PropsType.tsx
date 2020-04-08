import { Locale } from '../locale-provider/PropsType';

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
  cancelText?: string;
  locale?: Locale['Alert'];
  onClose: () => void;
}
