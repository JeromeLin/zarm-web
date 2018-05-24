export type theme = 'default'|  'info'|  'success'|  'warning'|  'error';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export default interface PropsType {
  prefixCls?: string;
  type?: string;
  theme?: theme;
  size?: size;
  isBlock?: boolean;
  isRadius?: boolean;
  isRound?: boolean;
  isCircle?: boolean;
  isActive?: boolean;
  isFocus?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: object;
  onClick: (e?: any) => void;
}
