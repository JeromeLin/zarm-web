import { ButtonHTMLAttributes, MouseEvent,CSSProperties } from 'react';
export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

interface BasicPropsType {
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
  style?: CSSProperties;
  onClick: (e?: MouseEvent) => void;
}

type PropsType = ButtonHTMLAttributes<{}> & BasicPropsType;

export default PropsType;
