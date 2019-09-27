import { CSSProperties } from 'react';

export type Size = 'sm' | 'md';

export default interface SwitchProps {
  prefixCls?: string;
  size?: Size;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  onChange?: (value: boolean) => void;
}
