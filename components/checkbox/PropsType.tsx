export interface GroupProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  style?: object;
  disabled?: boolean;
  onChange: (e: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
  style?: object;
  id?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  indeterminate?: boolean;
  onChange: (e: any) => void;
}
