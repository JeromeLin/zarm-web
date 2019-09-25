import { MouseEvent, CSSProperties } from 'react';

export interface GroupProps {
  size?: 'lg' | 'sm' | 'md';
  type?: 'button' | 'normal';
  ghost?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  block?: boolean;
  shape?: 'radius' | 'rect' | 'round';
  disabled?: boolean;
  onChange: (e: MouseEvent) => void;
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
}
export default interface PropsType {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: number | string;
  id?: string;
  shape?: 'radius' | 'rect' | 'round';
  style?: CSSProperties;
  onChange: (e: MouseEvent) => void;
}
