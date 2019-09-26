export default interface PropsType {
  prefixCls?: string;
  size?: 'sm' | null;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  isCheckedText?: string;
  unCheckedText?: string;
  className?: string;
  loading?: boolean;
  onChange: (value: boolean) => void;
}
