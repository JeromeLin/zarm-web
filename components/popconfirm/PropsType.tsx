import { Locale } from '../locale-provider/PropsType';

export type PopconfirmDirection = 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight' | 'leftTop' | 'left' | 'leftBottom';

export default interface PopconfirmProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  trigger: 'click' | 'hover' | 'focus' | 'manual' | 'contextMenu';
  direction: PopconfirmDirection;
  onCancel: () => void;
  onOk: () => void;
  okText?: string;
  cancelText?: string;
  locale?: Locale['Popconfirm'];
  content: React.ReactNode;
  icon?: React.ReactNode;
}
