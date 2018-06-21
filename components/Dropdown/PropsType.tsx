export type size = 'xl' | 'lg' | 'sm' | 'xs';

export default interface PropsType {
  prefixCls?: string;
  visible?: boolean;
  radius?: boolean;
  isRadius?: boolean;
  className?: string;
  style?: object;
  onChange?: () => void;
}
