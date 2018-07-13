export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface ItemProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  className?: string;
  style?: object;
  selectedKeys: string[];
  level?: number;
  itemKey: string;
  onClick: (itemKey: string) => void;
  toggleSelectedKeys: (itemKey: string) => void;
  onDoubleClick?: () => void;
}

export interface SubMenuProps {
  level?: number;
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
  inlineIndent: number;
  openKeys: string[];
  selectedKeys: string[];
  onClick: () => {};
  onOpenChange: () => {};
}
