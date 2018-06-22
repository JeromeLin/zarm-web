export default interface PropsType {
  prefixCls?: string;
  size?: 'sm' | null;
  value?: boolean;
  isDisabled?: boolean;
  defaultValue?: boolean;
  isCheckedText?: string;
  unCheckedText?: string;
  style?: object;
  onChange: (value: any) => void;
}
