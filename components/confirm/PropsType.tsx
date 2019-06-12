import { MouseEvent } from 'react';

export default interface PropsType {
  prefixCls?: string;
  message?: string;
  visible?: boolean;
  width?: number | string;
  okText?: string;
  cancelText?: string;
  animationDuration?: number;
  locale?: {
    confirm: string;
    cancel: string;
  };
  onOk?: (e: MouseEvent | KeyboardEvent) => void;
  onCancel?: () => void;
}
