import createReactContext, { Context } from 'create-react-context';

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

const MenuContext: Context<KeysType> = createReactContext(menuKeys);

export default MenuContext;
