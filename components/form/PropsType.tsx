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
}

export default interface PropsType {
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
