export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OptionProps {
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  style?: object;
  onChange: (e: any) => void;
  onDoubleClick?: () => void;
}

export interface IDisableProps {
  isDisabled: boolean | undefined;
  disabled?: boolean;
}

export interface MultipleProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  isRadius?: boolean;
  size?: size;
  style?: object;
  onChange: (value: any, row: object) => () => void;
  onDoubleClick?: () => void;
}

export default interface PropsType {
  prefixCls?: string;
  value?: string | number;
  defaultValue?: string | number;
  size?: size;
  className?: string;
  style?: object;
  radius?: boolean;
  isRadius?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  search?: boolean;
  isSearch?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (e: any) => void;
  onSearchChange?: (e: any) => void;
}
