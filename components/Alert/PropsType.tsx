export type themeType = 'default' | 'info' | 'success' | 'warning' | 'error';

export default interface PropsType {
  prefixCls?: string;
  theme?: themeType;
  message?: string;
  width?: number | string;
  className?: string;
  visible?: boolean;
  onClose: () => void;
}
