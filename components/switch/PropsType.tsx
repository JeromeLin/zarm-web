export default interface SwitchProps {
  prefixCls?: string;
  size?: 'sm' | null;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  loading?: boolean;
  onChange: (value: boolean) => void;
}
