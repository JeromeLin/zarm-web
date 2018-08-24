export type size = 'xl' | 'lg' | 'sm' | 'xs';

export default interface PropsType {
  prefixCls?: string;
  format?: string;
  min?: string;
  max?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  radius?: boolean;
  isDisabled?: boolean;
  isRadius?: boolean;
  size?: size;
  className?: string;
  style?: object;
  locale: { placeholder: string };
  showTime?: boolean;
  onChange: (value: any) => void;
}
