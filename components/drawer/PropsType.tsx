import { CSSProperties, ReactNode } from 'react';

export default interface PropsType {
  prefixCls?: string;
  handlePortalUnmount?: () => void;
  closable?: boolean;
  width?: number | string;
  mask?: boolean;
  visible?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
  maskover?: boolean;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  size?: 'large' | 'normal' | 'small';
}

export interface StateType {
  width?: number | string;
  layer?: number;
  top?: number;
  left?: number;
  totallayers?: number;
  btnstyle?: CSSProperties;
}
