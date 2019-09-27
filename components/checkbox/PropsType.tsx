import { HTMLAttributes, CSSProperties } from 'react';

export interface CheckboxGroupProps {
  prefixCls?: string;
  value?: string[] | number[];
  defaultValue?: string[] | number[];
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (checkedValue: Array<string | number>) => void;
}

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  prefixCls?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (event) => void;
}
