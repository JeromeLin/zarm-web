export type triggerType = 'change' | 'blur' | 'none' | '';

type LabelPosition = 'left' | 'right' | '';

export interface ItemProps {
  prefixCls?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  controlCol?: string;
  isRequired?: boolean;
  required?: boolean;
  help?: string;
  rules?: object;
  prop?: string;
}

export default interface PropsType {
  prefixCls?: string;
  type?: 'horizontal' | 'inline';
  model?: object;
  rules?: object;
  labelWidth?: string | number;
  labelPosition?: LabelPosition;
  scrollToError?: boolean;
  onSubmit?: (event: React.SyntheticEvent<HTMLFormElement>) => void;
}
