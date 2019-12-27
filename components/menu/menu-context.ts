import createReactContext, { Context } from 'create-react-context';
import { Mode } from './PropsType';
import { noop } from '../utils';

export interface ContextType {
  mode?: Mode;
  inlineIndent?: number;
  openKeys: string[];
  selectedKeys: string[];
  inlineCollapsed?: boolean;
  toggleSelectedKeys: (itemKey: string) => void;
  toggleOpenKeys: (subMenuKey: string) => void;
}

export const initialContext: ContextType = {
  mode: Mode.inline,
  inlineIndent: 24,
  inlineCollapsed: false,
  openKeys: [],
  selectedKeys: [],
  toggleSelectedKeys: noop,
  toggleOpenKeys: noop,
};

const MenuContext: Context<ContextType> = createReactContext(initialContext);

export default MenuContext;
