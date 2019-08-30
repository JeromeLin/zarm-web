import { ReactNode } from 'react';

export type themeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type size = 'xl' | 'lg' | 'sm' | 'xs';
export type shapeType = 'radius' | 'round' | 'circle' | 'rect';
export default interface PropsType {
  prefixCls?: string;
  theme?: themeType;
  size?: size;
  shape: shapeType;
  ghost?: boolean;
  radius?: boolean;
  round?: boolean;
  active?: boolean;
  focus?: boolean;
  closable?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: ReactNode;
  style?: object;
  title?: string;
  onClick: (e) => void;
  onClose: (e) => void;
  onChange: (e) => void;
}
