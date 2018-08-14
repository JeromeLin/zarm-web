export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface IProps {
  prefixCls?: string;
  className?: string;
  style?: object;
}
export default interface PropsType {
  prefixCls?: string;
  theme?: theme;
  radius?: boolean;
  isRadius?: boolean;
  className?: string;
  style?: object;
}
