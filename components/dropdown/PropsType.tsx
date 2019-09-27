import { ReactNode, HTMLAttributes } from 'react';

export type Direction = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomScreen' | 'topScreen';
export type Trigger = 'click' | 'hover' | 'contextMenu';

export interface BasicPropsType {
  prefixCls: string;
  visible?: boolean;
  content?: ReactNode;
  direction: Direction;
  triggerBoxProps: HTMLAttributes<HTMLDivElement>;
  trigger: Trigger;
  disabled?: boolean;
  zIndex: number;
  hideOnClick: boolean;
  notRenderInDisabledMode?: boolean;
  onVisibleChange(flag: boolean): void;
  getPopupContainer?(): HTMLElement;
  width: string | number;
}

export type PropsType = React.HTMLAttributes<HTMLDivElement> & BasicPropsType;

export interface StateType {
  visible?: boolean;
  positionInfo: {
    left: number;
    top: number;
  };
  animationState: string | null;
}
