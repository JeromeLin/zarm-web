import { CSSProperties, SyntheticEvent } from 'react';

export type triggerType = 'change' | 'blur' | 'none';

export interface ItemProps {
  prefixCls?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  controlCol?: string;
  className?: string;
  help?: string;
  style?: CSSProperties;
  rules?: object;
  prop?: string;
  required?: boolean;
}

export default interface PropsType {
  type?: string;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  model?: object;
  rules?: object;
  labelWidth?: string | number;
  labelPosition?: string;
  scrollToError?: boolean;
  onSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void;
}
