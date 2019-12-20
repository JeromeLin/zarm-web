import { CSSProperties } from 'react';

export type SwitchSize = 'sm' | 'md';

export default interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  onChange?: (value: boolean) => void;
}
