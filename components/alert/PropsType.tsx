import { ReactNode } from 'react';

export type type = 'info' | 'success' | 'warning' | 'error';

export default interface PropsType {
  prefixCls?: string;
  type?: type;
  title?: string;
  description?: string;
  className?: string;
  style?: object;
  width?: number;
  icon?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  closeText?: string | ReactNode;
  preventHide?: boolean;
  onClick: (object?: object) => void;
  onClose: () => void;
  afterClose: () => void;
}
