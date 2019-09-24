import { CSSProperties, ReactNode } from 'react';

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  handlePortalUnmount?: () => void;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  closable?: boolean;
  // animationDuration?: number;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  mask?: boolean;
  visible?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
}
