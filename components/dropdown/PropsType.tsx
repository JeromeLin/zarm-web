import { HTMLAttributes } from 'react';
import { PopperProps } from 'zarm/es/popper';

export type DropdownShape = 'rect' | 'radius';
export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

export interface DropdownProps
  extends Omit<PopperProps, 'children'>,
    HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
  disabled: boolean;
  shape: DropdownShape;
  onVisibleChange: (visible: boolean) => void;
}
