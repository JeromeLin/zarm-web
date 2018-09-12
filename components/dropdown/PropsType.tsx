type placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
export type trigger = 'click' | 'hover' | 'contextMenu';

interface BasicPropsType {
  prefixCls?: string;
  visible?: boolean;
  overlay?: React.ReactElement<any>;
  placement?: placement;
  className?: string;
  radius?: boolean;
  isRadius?: boolean;
  triggerBoxStyle?: React.CSSProperties;
  trigger?: trigger;
  disabled?: boolean;
  zIndex?: number;
  hideOnClick?: boolean;
  notRenderInDisabledMode?: boolean;
  onVisibleChange(flag: boolean): void;
  getPopupContainer?(): HTMLElement;
}

export type propsType = React.HTMLAttributes<any> & BasicPropsType;

export interface StateType {
  visible?: boolean;
  positionInfo: {
    left: number;
    top: number;
  };
  isPending: boolean;
  animationState: string | null;
}
