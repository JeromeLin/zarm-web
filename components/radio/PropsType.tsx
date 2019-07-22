import { MouseEvent, CSSProperties } from 'react';
export interface GroupProps {
  prefixCls?: string;
  value?: boolean;
  defaultValue?: boolean;
  size?: 'lg' | 'sm' | 'md';
  shape?: 'radius' | 'rect' | 'round';
  block?: boolean;
  ghost?: boolean;
  style?: CSSProperties;
  onChange: (e: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
  id?: string;
  style?: CSSProperties;
  onChange: (e: MouseEvent) => void;
}
