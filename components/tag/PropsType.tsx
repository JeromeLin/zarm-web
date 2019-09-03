import { ReactNode } from 'react';

export type themeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type size = 'xl' | 'lg' | 'sm' | 'xs';
export type shapeType = 'radius' | 'round' | 'rect';
export default interface PropsType {
  prefixCls?: string;
  theme?: themeType;
  size?: size;
  shape: shapeType;
  color?: string;
  closable?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: ReactNode;
  chidlen?: ReactNode;
  style?: object;
  onClick: (e) => void;
  onClose: (e) => void;
  onChange: (e) => void;
}
