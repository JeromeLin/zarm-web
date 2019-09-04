import { LiHTMLAttributes } from 'react';

export type size = 'xl' | 'lg' | 'sm' | 'xs';

export type styleType = {
  paddingLeft?: number,
  [propName: string]: any,
};

export type childPropsType = {
  prefixCls?: string,
  mode?: 'inline' | 'horizontal',
  inlineIndent?: number,
  inlineCollapsed?: boolean,
  level?: number;
  itemKey?: any;
  subMenuKey?: any;
};

interface ItemPropsBasicProp {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  className?: string;
  style: object;
  selectedKeys: string[];
  level: number;
  mode: 'inline' | 'horizontal';
  inlineIndent: number;
  inlineCollapsed: boolean;
  subMenuKey: string;
  itemKey: string;
  onClick: (e: React.MouseEvent, itemKey: string) => void;
  toggleSelectedKeys: (itemKey: string) => void;
  onDoubleClick?: () => void;
}

type Omit<A, B> = Pick<A, Exclude<keyof A, B>>;
type Merge<A, B> = Omit<A, keyof B> & B;

export type ItemProps = Merge<LiHTMLAttributes<HTMLLIElement>, ItemPropsBasicProp>;

export type DividerProps = {
  prefixCls?: string,
  className?: string;
  style: object;
};

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
