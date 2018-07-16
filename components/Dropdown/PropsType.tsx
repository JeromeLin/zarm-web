type placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
export type trigger = 'click' | 'hover' | 'contextMenu';

interface basicPropsType {
  prefixCls?: string
  visible?: boolean
  overlay?: React.ReactElement<any>
  placement?: placement
  className?: string
  isRadius?: boolean
  style?: React.CSSProperties
  trigger?: trigger
  disabled?: boolean
  zIndex?: number
  notRenderInDisabledMode?: boolean
  onVisibleChange(flag: boolean): void
}

export type propsType = React.HTMLAttributes<any> & basicPropsType

export interface stateType {
  visible?: boolean,
  positionInfo: {
    left: number,
    top: number
  },
  isPending: boolean,
  animationState: string | null
}