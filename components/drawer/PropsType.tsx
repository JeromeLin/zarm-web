import { ReactNode } from 'react';

export type DrawerSize = 'lg' | 'md' | 'sm';

export default interface PropsType {
  prefixCls?: string;
  closable?: boolean;
  width?: number | string;
  mask?: boolean;
  visible?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  size?: DrawerSize;
}
