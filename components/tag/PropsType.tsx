import { ReactNode } from 'react';
export type themeType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export default interface PropsType {
  prefixCls?: string;
  theme?: themeType;
  size?: size;
  radius?: boolean;
  round?: boolean;
  active?: boolean;
  focus?: boolean;
  isRadius?: boolean;
  isRound?: boolean;
  isCircle?: boolean;
  isActive?: boolean;
  isFocus?: boolean;
  isDisabled?: boolean;
  disabled?: boolean;
  className?: ReactNode;
  style?: object;
  title?: string;
  onClose: (e) => void;
}
