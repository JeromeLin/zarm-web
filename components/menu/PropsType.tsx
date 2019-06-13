export type size = 'xl' | 'lg' | 'sm' | 'xs';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface styleType {
  paddingLeft?: number;
  [propName: string]: any;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface childPropsType {
  prefixCls?: string;
  mode?: 'inline' | 'horizontal';
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  level?: number;
  itemKey?: any;
  subMenuKey?: any;
}

export interface ItemProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  inlineCollapsed?: boolean;
  className?: string;
  style: object;
  selectedKeys: string[];
  level: number;
  mode: 'inline' | 'horizontal';
  inlineIndent: number;
  itemKey: string;
  onClick: (e: React.MouseEvent, itemKey: string) => void;
  toggleSelectedKeys: (itemKey: string) => void;
  toggleSubMenuOpen: (itemKey: string) => void;
  onDoubleClick?: () => void;
}

export interface DividerProps {
  prefixCls?: string;
  className?: string;
  style: object;
}

export interface SubMenuProps {
  prefixCls?: string;
  level: number;
  inlineIndent: number;
  mode: 'inline' | 'horizontal';
  title: string | React.ReactNode;
  inlineCollapsed?: boolean;
  className?: string;
  style: object;
  itemKey?: any;
  subMenuKey: string;
  openKeys: string[];
  toggleOpenKeys: (subMenyKey: string) => void;
}

export default interface PropsType {
  prefixCls?: string;
  size?: size;
  className?: string;
  style?: object;
  mode?: 'inline' | 'horizontal';
  theme?: 'light' | 'dark';
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  openKeys?: string[];
  selectedKeys?: string[];
  onClick?: () => {};
  onOpenChange?: (openKeys: string[]) => {};
}
