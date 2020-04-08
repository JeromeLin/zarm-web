import { ReactNode, ButtonHTMLAttributes } from 'react';

export type SwitchSize = 'sm' | 'md';

export default interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>{
  prefixCls?: string;
  size?: SwitchSize;
  checked?: boolean;
  defaultChecked?: boolean;
  checkedText?: ReactNode;
  unCheckedText?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (checked: boolean) => void;
}
