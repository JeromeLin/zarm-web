import { InputHTMLAttributes, TextareaHTMLAttributes, CSSProperties } from 'react';

export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OtherProps {
  value?: string;
  defaultValue?: string;
  [propName: string]: any;
}

interface BasicPropType {
  prefixCls?: string;
  type?: string;
  size?: size;
  radius?: boolean;
  isRadius?: boolean;
  isDisabled?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  cols?: number;
  style?: CSSProperties;
  placeholder?: string;
  maxLength?: number;
}

type PropType = (InputHTMLAttributes<{}> | TextareaHTMLAttributes<{}>) & BasicPropType;

export default PropType;
