export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OtherProps {
  value?: string;
  defaultValue?: string;
  [propName: string]: any;
}

export default interface PropsType {
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
  style?: object;
  placeholder?: string;
  maxLength?: number;
  [propName: string]: any;
}
