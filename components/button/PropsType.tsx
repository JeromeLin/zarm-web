import { ButtonHTMLAttributes, MouseEvent, CSSProperties } from 'react';

export type theme = 'default' | 'primary' | 'danger';
export type size = 'xl' | 'lg' | 'sm' | 'xs';
export type shape = 'circle' | 'round' | 'rect' | 'radius';
export type buttonType = 'button' | 'submit' | 'reset';

export default interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  prefixCls?: string;
  htmlType?: buttonType;
  theme?: theme;
  size?: size;
  block?: boolean;
  shape?: shape;
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
  fRef?: any;
}

export interface ButtonGroupProps {
  size?: size;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}
