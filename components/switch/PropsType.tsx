export default interface PropsType {
  prefixCls?: string;
  size?: 'sm' | null;
  value?: boolean;
  disabled?: boolean;
  defaultValue?: boolean;
  isCheckedText?: string;
  unCheckedText?: string;
  style?: object;
  loading?: boolean;
  onChange: (value: any) => void;
}
