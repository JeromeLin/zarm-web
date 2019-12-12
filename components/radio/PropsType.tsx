import { MouseEvent, CSSProperties } from 'react';

export type RadioSize = 'lg' | 'sm' | 'md';
export type RadioShape = 'radius' | 'rect' | 'round';
export type RadioType = 'button' | 'normal';

export interface RadioGroupProps {
  size?: RadioSize;
  type?: RadioType;
  shape?: RadioShape;
  style?: CSSProperties;
  onChange: (e: MouseEvent) => void;
  ghost?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  block?: boolean;
  disabled?: boolean;
  className?: string;
  prefixCls?: string;
}
export default interface PropsType {
  shape?: RadioShape;
  style?: CSSProperties;
  type?: RadioType;
  onChange: (e: MouseEvent) => void;
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: number | string;
  id?: string;
}
