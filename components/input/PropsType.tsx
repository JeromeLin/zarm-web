import {
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ChangeEvent,
} from 'react';

export type InputSize = 'lg' | 'md' | 'sm';

export type InputShape = 'rect' | 'radius' | 'round';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export type InputProps = InputCoreProps | TextAreaProps;

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: InputSize;
  shape?: InputShape;
  style?: CSSProperties;
  prefixCls?: string;
  compact?: boolean;
  children?: ReactNode;
}

export interface InputAutoHeightType {
  minRows?: number;
  maxRows?: number;
}

export interface InputCommonProps {
  prefixCls?: string;
  shape?: InputShape;
  size?: InputSize;
}

export interface InputCoreProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'prefix' | 'onChange'>,
    InputCommonProps {
  type?: 'text' | 'number' | 'password';
  icon?: string;
  size?: InputSize;
  clearable?: boolean;
  bordered?: boolean | 'underline';
  value?: string | number;
  defaultValue?: string;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'clearable'>,
    InputCommonProps {
  type?: 'textarea';
  showLength?: boolean;
  autoHeight?: boolean | InputAutoHeightType;
  bordered?: boolean;
  value?: string | number;
  defaultValue?: string;
  onChange?: (e?: ChangeEvent<HTMLTextAreaElement>) => void;
}
