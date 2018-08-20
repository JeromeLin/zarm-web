export default interface PropsType {
  prefixCls?: string;
  style?: object;
  hasSider?: boolean;
  className?: string;
}

export interface SiderPropsType extends PropsType {
  collapsible?: boolean;
  collapsed?: boolean;
  collapsedWidth?: number;
  trigger?: string | React.ReactNode;
  width?: number | string;
  onCollapse?: (collapsed: boolean) => void;
}
