import { CSSProperties } from 'react';

export type size = 'xl' | 'lg' | 'sm' | 'xs';

export enum Mode {
  inline = 'inline',
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export interface ChildProps {
  prefixCls?: string;
  level?: number;
  itemKey?: any;
  subMenuKey?: any;
  index?: number;
}

export interface ItemProps {
  prefixCls?: string;
  disabled?: boolean;
  title?: string;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  className?: string;
  style?: CSSProperties;
  selectedKeys: string[];
  level?: number;
  mode?: Mode;
  itemKey?: string;
  onClick?: (e: React.MouseEvent, itemKey: string) => void;
  toggleSelectedKeys?: (itemKey: string) => void;
  toggleSubMenuOpen?: (itemKey: string) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
}

export interface DividerProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

export interface ItemGroupProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  level?: number;
  inlineIndent?: number;
  mode?: Mode;
  index?: number;
  title: string;
  subMenuKey?: string;
  inlineCollapsed?: boolean;
}

export interface SubMenuProps {
  prefixCls?: string;
  level?: number;
  inlineIndent?: number;
  mode?: Mode;
  title: React.ReactNode;
  inlineCollapsed?: boolean;
  className?: string;
  style?: CSSProperties;
  itemKey?: any;
  subMenuKey?: string;
  selectedKeys?: string[];
  openKeys?: string[];
  toggleOpenKeys?: (subMenyKey: string) => void;
}

export default interface MenuProps {
  prefixCls?: string;
  size?: size;
  className?: string;
  style?: CSSProperties;
  mode?: Mode;
  theme?: 'light' | 'dark';
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  openKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[]) => void;
  onOpenChange?: (openKeys: string[]) => void;
}
