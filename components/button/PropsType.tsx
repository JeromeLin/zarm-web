import { ButtonHTMLAttributes, MouseEvent, CSSProperties } from 'react';
export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

interface BasicPropsType {
  prefixCls?: string;
  type?: string;
  theme?: theme;
  size?: size;
  isBlock?: boolean;
  block?: boolean;
  isRadius?: boolean;
  radius?: boolean;
  isRound?: boolean;
  round?: boolean;
  isCircle?: boolean;
  circle?: boolean;
  isActive?: boolean;
  active?: boolean;
  isFocus?: boolean;
  focus?: boolean;
  isDisabled?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: (e?: MouseEvent) => void;
  href?: string | undefined;
  target?: string | undefined;
}

type PropsType = ButtonHTMLAttributes<{}> & BasicPropsType;

export default PropsType;
