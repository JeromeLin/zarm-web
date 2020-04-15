import { HTMLAttributes } from 'react';
import PopperProps from 'zarm/lib/popper/PropsType';

export type DropdownShape = 'rect' | 'radius';
export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

export interface DropdownProps extends PopperProps, HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
  disabled: boolean;
  shape: DropdownShape;
  onVisibleChange: (visible: boolean) => void;
}
