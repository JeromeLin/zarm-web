export type InputSize = 'lg' | 'md' | 'sm';

export type InputShape = 'rect' | 'radius';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export type InputProps = InputCoreProps | TextAreaProps;

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: InputSize;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  compact?: boolean;
}

export interface AutoHeightType {
  minRows?: number;
  maxRows?: number;
}

export interface InputCommonProps {
  prefixCls?: string;
  shape?: InputShape;
  size?: InputSize;
}

export interface InputCoreProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'prefix' | 'onChange'>, InputCommonProps {
  type?: 'text' | 'number' | 'password';
  icon?: string;
  size?: InputSize;
  clearable?: boolean;
  bordered?: boolean | 'underline';
  value?: string | number;
  defaultValue?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaProps extends
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'clearable'>, InputCommonProps {
  type?: 'textarea';
  showLength?: boolean;
  autoHeight?: boolean | AutoHeightType;
  bordered?: boolean;
  value?: string | number;
  defaultValue?: string;
  onChange?: (e?: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
