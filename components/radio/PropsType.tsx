export interface GroupProps {
  prefixCls?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange: (e: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange: (e: any) => void;
}
