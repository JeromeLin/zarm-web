export interface GroupProps {
  prefixCls?: string;
  value?: boolean;
  defaultValue?: boolean;
  size?: 'lg' | 'sm';
  onChange: (e: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
  onChange: (e: any) => void;
}
