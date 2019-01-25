import { CSSProperties } from 'react';

export type triggerType = 'change' | 'blur' | 'none';

export interface ItemProps {
  prefixCls?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  controlCol?: string;
  isRequired?: boolean;
  className?: string;
  help?: string;
  style?: CSSProperties;
  rules?: object;
  prop?: string;
}

export default interface PropsType {
  prefixCls?: string;
  type?: 'horizontal' | 'inline';
  className?: string;
  style?: CSSProperties;
  model?: object;
  rules?: object;
  labelWidth?: string | number;
  labelPosition?: string;
}
