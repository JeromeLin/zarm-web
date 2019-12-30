import { HTMLAttributes } from 'react';
import PopperProps from 'zarm/lib/popper/PropsType';

export type Trigger = 'click' | 'hover' | 'contextMenu';

export interface PropsType extends PopperProps, HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
  disabled: boolean;
  shape: 'radius' | 'rect';
  onVisibleChange: (visible: boolean) => void;
}
