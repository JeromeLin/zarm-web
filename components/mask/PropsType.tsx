export type bgType = 'transparent' | 'light' | 'normal' | 'dark';

export default interface PropsType {
  prefixCls?: string;
  visible: boolean;
  type: bgType;
  style?: object;
  onClose: () => void;
}
