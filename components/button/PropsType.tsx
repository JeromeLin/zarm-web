import { CSSProperties } from 'react';

export type Theme = 'default' | 'primary' | 'danger';
export type Size = 'xl' | 'lg' | 'sm' | 'xs';
export type Shape = 'circle' | 'round' | 'rect' | 'radius';
export type ButtonType = 'button' | 'submit' | 'reset';

export default interface ButtonPropsType {
  prefixCls: string;
  htmlType?: ButtonType;
  theme: Theme;
  size: Size | null;
  block: boolean;
  shape: Shape;
  disabled: boolean;
  loading: boolean;
  ghost: boolean;
  focus?: boolean;
  active?: boolean;
}

export interface ButtonGroupProps {
  size?: Size;
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
}
