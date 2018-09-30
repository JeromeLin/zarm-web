// tslint:disable-next-line:max-line-length
export type direction = 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight' | 'leftTop' | 'left' | 'leftBottom';

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  visible: boolean;
  trigger: 'click' | 'hover';
  direction: direction;
  onCancel: () => void;
  onOk: () => void;
  okText?: string;
  cancelText?: string;
  locale?: { [propName: string]: any };
  content: React.ReactNode;
}
