export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';

export default interface PropsType {
  prefixCls?: string;
  type?: string;
  theme?: theme;
  style?: object;
  className?: string;
}
