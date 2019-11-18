export type InputSize = 'lg' | 'md' | 'sm';

export type InputShape = 'rect' | 'radius';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export type InputProps = InputCoreProps | TextAreaProps;

export interface InputCommonProps {
  prefixCls?: string;
  className?: string;
  shape?: InputShape;
  width?: number | string;
  size?: InputSize;
  style?: React.CSSProperties;
}

export interface InputCoreProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'prefix' | 'onChange'>, InputCommonProps {
  type: 'text' | 'number' | 'password';
  icon?: string;
  size?: InputSize;
  clearable?: boolean;
  bordered?: boolean | 'underline';
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  inline?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaProps extends
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'clearable'>, InputCommonProps {
  type: 'textarea';
  showLength?: boolean;
  autoSize?: boolean;
  value?: string;
  defaultValue?: string;
  bordered?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
