import { ButtonHTMLAttributes, MouseEvent, CSSProperties } from 'react';

export type Theme = 'default' | 'primary' | 'danger';
export type Size = 'xl' | 'lg' | 'sm' | 'xs';
export type Shape = 'circle' | 'round' | 'rect' | 'radius';
export type ButtonType = 'button' | 'submit' | 'reset';

export default interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  prefixCls?: string;
  htmlType?: ButtonType;
  theme?: Theme;
  size?: Size;
  block?: boolean;
  shape?: Shape;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ghost?: boolean;
  style?: CSSProperties;
  onClick?: (e: MouseEvent) => void;
  href?: string | undefined;
  target?: string | undefined;
}

export interface ButtonGroupProps {
  size?: Size;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}
