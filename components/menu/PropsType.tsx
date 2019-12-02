import ItemGroup from './ItemGroup';
import MenuItem from './MenuItem';

export type size = 'xl' | 'lg' | 'sm' | 'xs';


// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface childPropsType {
  prefixCls?: string;
  mode?: 'inline' | 'horizontal';
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  level?: number;
  itemKey?: any;
  subMenuKey?: any;
  index?: number;
}

export interface ItemProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  title?: string;
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

export interface ItemGroupProps {
  prefixCls?: string;
  level: number;
  inlineIndent: number;
  children: React.ReactElement<ItemGroup | typeof MenuItem>[];
  mode: 'inline' | 'horizontal';
  index: number;
  title: string;
  subMenuKey: string;
  inlineCollapsed?: boolean;
}

export interface SubMenuProps {
  prefixCls?: string;
  level: number;
  inlineIndent: number;
  children: React.ReactElement<ItemGroup | typeof MenuItem>[];
  mode: 'inline' | 'horizontal';
  title: React.ReactNode;
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
  children: React.ReactElement<ItemGroup | typeof MenuItem>[];
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
