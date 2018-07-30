import { ChangeEvent, CSSProperties } from 'react';

export interface GroupProps {
  value?: string;
  defaultValue?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default interface PropsType {
  prefixCls?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
