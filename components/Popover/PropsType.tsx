// tslint:disable-next-line:max-line-length
export type direaction = 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight' | 'leftTop' | 'left' | 'leftBottom';
export type content = (() => React.ReactNode) | string | React.ReactNode;

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  trigger?: 'click' | 'hover';
  mask?: boolean;
  radius?: boolean;
  direction: direaction;
  onMaskClick?: () => void;
  content?: content;
}
