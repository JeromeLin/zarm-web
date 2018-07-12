export type size = 'xl' | 'lg' | 'sm' | 'xs';

type placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
export type trigger = 'click' | 'hover' | 'contextMenu';

export interface propsType {
  prefixCls?: string
  visible?: boolean
  overlay?: React.ReactElement<any>
  placement?: placement
  className?: string
  isRadius?: boolean
  style?: React.CSSProperties
  trigger?: trigger
  disabled?: boolean
  onVisibleChange(flag: boolean): void
}


export interface stateType {
  visible?: boolean,
  positionInfo: {
    left: number,
    top: number
  },
  isPending: boolean,
  animationState: string | null
}