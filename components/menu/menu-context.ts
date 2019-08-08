import React from 'react';

export interface KeysType {
  openKeys: string[];
  selectedKeys: string[];
  toggleSelectedKeys?: (itemKey: string) => void;
  toggleOpenKeys?: (subMenuKey: string) => void;
  inlineCollapsed?: boolean;
}

export const menuKeys: KeysType = {
  openKeys: [],
  selectedKeys: [],
  toggleSelectedKeys: () => {},
  toggleOpenKeys: () => {},
};

const MenuContext = React.createContext(menuKeys);

export default MenuContext;
