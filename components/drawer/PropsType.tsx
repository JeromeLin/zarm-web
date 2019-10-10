import { CSSProperties, ReactNode } from 'react';

export default interface PropsType {
  prefixCls?: string;
  handlePortalUnmount?: () => void;
  closable?: boolean;
  width?: number | string;
  // style?: CSSProperties;
  mask?: boolean;
  visible?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
  maskover?: boolean;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  size?: 'lg' | 'normal' | 'sm';
}

export interface StateType {
  layer?: number;
  top?: number;
  left?: number;
  totallayers?: number;
  btnstyle: CSSProperties;
}
