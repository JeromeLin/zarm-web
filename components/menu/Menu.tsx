import React, { Component, Children, cloneElement, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuProps, { ChildProps, MenuMode } from './PropsType';
import MenuContext, { initialContext, ContextType } from './menu-context';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
import ItemGroup from './ItemGroup';
import Divider from './Divider';
import { noop } from '../utils';

interface MenuState {
  inlineCollapsed?: boolean;
  openKeys: string[];
  inlineOpenKeys: string[];
  selectedKeys: string[];
}

class Menu extends Component<MenuProps, MenuState> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: MenuMode.inline,
    theme: 'light',
    inlineIndent: 24,
    inlineCollapsed: false,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
    onSelect: noop,
    onOpenChange: noop,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    mode: PropTypes.oneOf(['inline', 'vertical']),
    theme: PropTypes.oneOf(['light', 'dark']),
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    inlineIndent: PropTypes.number,
    inlineCollapsed: PropTypes.bool,
    onSelect: PropTypes.func,
    onOpenChange: PropTypes.func,
  };

  static SubMenu = SubMenu;

  static Item = MenuItem;

  static Divider = Divider;

  static ItemGroup = ItemGroup;

  constructor(props: MenuProps) {
    super(props);
    const { defaultOpenKeys, defaultSelectedKeys, inlineCollapsed } = props;
    this.state = {
      inlineCollapsed,
      inlineOpenKeys: [],
      openKeys: defaultOpenKeys!,
      selectedKeys: defaultSelectedKeys!,
    };
  }

  static getDerivedStateFromProps(props: MenuProps, state: MenuState) {
    const derivedState: MenuState = {} as any;

    const { openKeys, selectedKeys, inlineCollapsed } = props;

    if (inlineCollapsed && !state.inlineCollapsed) {
      derivedState.inlineCollapsed = true;
      derivedState.inlineOpenKeys = state.openKeys;
      derivedState.openKeys = [];
    }
    if (!inlineCollapsed && state.inlineCollapsed) {
      derivedState.inlineCollapsed = false;
      derivedState.openKeys = state.inlineOpenKeys;
      derivedState.inlineOpenKeys = [];
    }
    if (openKeys) {
      derivedState.openKeys = openKeys;
    }
    if (selectedKeys) {
      derivedState.selectedKeys = selectedKeys;
    }
    return derivedState;
  }

  toggleSelectedKeys = (itemKey: string) => {
    const { onSelect } = this.props;
    if (!('selectedKeys' in this.props)) {
      this.setState({
        selectedKeys: [itemKey],
      });
    }
    if (onSelect) {
      onSelect([itemKey]);
    }
  };

  toggleOpenKeys = (subMenuKey: string) => {
    const { openKeys } = this.state;
    const { onOpenChange, inlineCollapsed, mode } = this.props;
    const newOpenKeys = [...openKeys];

    const keyIndex = openKeys.indexOf(subMenuKey);
    if (keyIndex > -1) {
      newOpenKeys.splice(keyIndex, 1);
    } else {
      newOpenKeys.push(subMenuKey);
    }
    if ((inlineCollapsed || mode === MenuMode.vertical) && subMenuKey === '') {
      // inlineCollapsed状态点击item关闭所有的submenu
      newOpenKeys.length = 0;
    }

    if (onOpenChange) {
      onOpenChange(newOpenKeys);
    }
    if (!('openKeys' in this.props)) {
      this.setState({
        openKeys: newOpenKeys,
      });
    }
  };

  renderChildren() {
    const { children, prefixCls } = this.props;

    const childProps: ChildProps = {
      prefixCls,
    };
    return Children.map(children, (child, index) => {
      const c = child as ReactElement;
      const { key } = c;

      if (Object.keys(c.type).indexOf('isItemGroup') > -1) {
        childProps.groupIndex = index;
      } else {
        const childKey = key || `0-${index}`;
        childProps.itemKey = childProps.subMenuKey = childKey;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      theme, mode, className, style, prefixCls, inlineIndent, inlineCollapsed,
    } = this.props;

    const { openKeys, selectedKeys } = this.state;
    const cls = classnames(
      [prefixCls, `${prefixCls}--${theme}`, `${prefixCls}--${mode}`],
      {
        [`${prefixCls}--collapsed`]: !!inlineCollapsed,
        [className!]: !!className,
      },
    );

    const newMenuKeys: ContextType = {
      ...initialContext,
      mode,
      inlineIndent,
      openKeys,
      selectedKeys,
      inlineCollapsed,
      toggleOpenKeys: this.toggleOpenKeys,
      toggleSelectedKeys: this.toggleSelectedKeys,
    };

    return (
      <ul role="menu" className={cls} style={style}>
        <MenuContext.Provider value={newMenuKeys}>
          {this.renderChildren()}
        </MenuContext.Provider>
      </ul>
    );
  }
}

export default Menu;
