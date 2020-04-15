import { HTMLAttributes, ReactNode } from 'react';

export type DrawerSize = 'lg' | 'md' | 'sm';

export default interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  size?: DrawerSize;
  title?: ReactNode;
  width?: number | string;
  visible?: boolean;
  mask?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
}
