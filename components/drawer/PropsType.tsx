import { ReactNode } from 'react';

export type DrawerSize = 'lg' | 'md' | 'sm';

export default interface PropsType {
  prefixCls?: string;
  size?: DrawerSize;
  visible?: boolean;
  title?: ReactNode;
  width?: number | string;
  mask?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
}
