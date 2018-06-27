// tslint:disable-next-line:max-line-length
export type direction = 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight' | 'leftTop' | 'left' | 'leftBottom';
export type content = (() => React.ReactNode) | string | React.ReactNode;

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  trigger?: 'click' | 'hover';
  mask?: boolean;
  visible?: boolean;
  radius?: boolean;
  direction: direction;
  onMaskClick?: () => void;
  content?: content;
}
