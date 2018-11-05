export type size = 'xl' | 'lg' | 'sm' | 'xs';

export default interface PropsType {
  prefixCls?: string;
  format?: string;
  min?: string;
  max?: string;
  value?: string | string[];
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  radius?: boolean;
  isDisabled?: boolean;
  isRadius?: boolean;
  isRange?: boolean;
  size?: size;
  className?: string;
  style?: object;
  locale?: { [props: string]: string };
  showTime?: boolean;
  allowInput?: boolean;
  onChange: (value: any) => void;
  onInputInvalidDate: (value: any) => void;
}
