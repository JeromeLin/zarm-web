import { HTMLAttributes, CSSProperties, ChangeEventHandler } from 'react';

export interface CheckboxGroupProps {
  prefixCls?: string;
  value?: string[] | number[];
  defaultValue?: string[] | number[];
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (values: Array<string | number>) => void;
}

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  prefixCls?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
