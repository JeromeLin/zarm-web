export default interface PropsType {
  prefixCls?: string;
  style?: object;
  icon?: string;
  shape?: 'circle' | 'square';
  size?: number | 'large' | 'small' | 'default';
  src?: string;
  alt?: string;
  onError: () => boolean;
}
