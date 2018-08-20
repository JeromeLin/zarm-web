
// tslint:disable-next-line:max-line-length
export type direction = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export default interface PropsType {
  prefixCls?: string;
  direction: direction;
  trigger: 'hover' | 'click';
  title?: string;
  tipStyle?: object;
  className?: string;
  style?: object;
  onClose: () => void;
}
