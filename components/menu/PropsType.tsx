import { CSSProperties } from 'react';

export enum MenuMode {
  inline = 'inline',
  vertical = 'vertical'
}

export enum MenuTheme {
  light = 'light',
  dark = 'dark'
}

export interface ChildProps {
  prefixCls?: string;
  level?: number;
  itemKey?: any;
  subMenuKey?: any;
  groupIndex?: number;
}

export interface MenuItemProps {
  prefixCls?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  className?: string;
  style?: CSSProperties;
  selectedKeys: string[];
  level?: number;
  mode?: MenuMode;
  itemKey?: string;
  onClick?: (e: React.MouseEvent, itemKey: string) => void;
  toggleSelectedKeys?: (itemKey: string) => void;
  toggleSubMenuOpen?: (itemKey: string) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
}

export interface MenuDividerProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

export interface MenuItemGroupProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  level?: number;
  inlineIndent?: number;
  mode?: MenuMode;
  groupIndex?: number;
  title: string;
  subMenuKey?: string;
  inlineCollapsed?: boolean;
}

export interface SubMenuProps {
  prefixCls?: string;
  level?: number;
  inlineIndent?: number;
  mode?: MenuMode;
  icon?: React.ReactNode;
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
  className?: string;
  style?: CSSProperties;
  mode?: MenuMode;
  theme?: MenuTheme;
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  openKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[]) => void;
  onOpenChange?: (openKeys: string[]) => void;
}
