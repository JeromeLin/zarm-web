import { HTMLAttributes, CSSProperties } from 'react';

export interface GroupProps {
  prefixCls?: string;
  value?: string[] | number[];
  defaultValue?: string[] | number[];
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange: (checkedValue: Array<string | number | boolean>) => void;
}

export default interface PropsType extends HTMLAttributes<HTMLInputElement> {
  prefixCls?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  indeterminate?: boolean;
  onChange: (event) => void;
}
