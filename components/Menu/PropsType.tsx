import { MouseEvent } from 'react';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface ItemProps {
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  style?: object;
  onClick?: (e: MouseEvent) => void;
  onDoubleClick?: () => void;
}

export default interface PropsType {
  prefixCls?: string;
  size?: size;
  className?: string;
  style?: object;
}
