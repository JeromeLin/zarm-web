import React from 'react';

export type keysType = {
  openKeys: string[],
  selectedKeys: string[],
  toggleSelectedKeys?: (itemKey: string) => void;
  toggleOpenKeys?: (level: number, subMenuKey: string) => void;
};

export const menuKeys: keysType = {
  openKeys: [],
  selectedKeys: [],
  toggleSelectedKeys: () => {},
  toggleOpenKeys: () => {},
};

const MenuContext = React.createContext(menuKeys);

export default MenuContext;
