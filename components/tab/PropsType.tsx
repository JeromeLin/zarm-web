
export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface GroupProps {
  prefixCls?: string;
  theme?: theme;
  value?: string;
  defaultValue?: string;
  radius?: boolean;
  isRadius?: boolean;
  className?: string;
  style?: object;
  onChange: (value: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  selected?: boolean;
  title?: string;
  className?: string;
  style?: object;
}
