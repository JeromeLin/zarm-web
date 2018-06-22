export type theme = 'success' | 'warning' | 'error' | 'validating' | 'default';

export interface ItemProps {
  prefixCls?: string;
  theme?: theme;
  id?: string;
  label?: string;
  labelCol?: string;
  controlCol?: string;
  isRequired?: boolean;
  className?: string;
  help?: string;
  style?: object;
}

export default interface PropsType {
  prefixCls?: string;
  type?: 'horizontal' | 'inline';
  className?: string;
  style?: object;
}
