import React, { Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType, { childPropsType } from './PropsType';
import MenuContext, { menuKeys, keysType } from './menu-context';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    mode: 'inline',
    theme: 'light',
    inlineIndent: 24,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
  };

  static SubMenu;
  static Item;
  static Divider;

  static getDerivedStateFromProps(props) {
    const state = {} as keysType;
    if ('openKeys' in props) {
      state.openKeys = props.openKeys;
    }
    if ('selectedKeys' in props) {
      state.selectedKeys = props.selecedKeys;
    }

    return Object.keys(state).length > 0 ? state : null;
  }

  menuKeys: any;

  constructor(props) {
    super(props);
    const { defaultOpenKeys, defaultSelectedKeys } = props;
    this.state = {
      openKeys: defaultOpenKeys,
      selectedKeys: defaultSelectedKeys,
    };
    // 每个实例都有自己的menuKeys，如果都指向一个menuKeys引用会有问题
    this.menuKeys = { ...menuKeys };
    this.menuKeys.toggleSelectedKeys = this.toggleSelectedKeys;
    this.menuKeys.toggleOpenKeys = this.toggleOpenKeys;
  }

  toggleSelectedKeys = (itemKey) => {
    if (!('selectedKeys' in this.props)) {
      this.setState({
        selectedKeys: [itemKey],
      });
    }
  }

  toggleOpenKeys = (subMenuKey) => {
    const { openKeys } = this.state;
    const { onOpenChange } = this.props;
    const newOpenKeys = [...openKeys];

    const keyIndex = openKeys.indexOf(subMenuKey);
    if (keyIndex > -1) {
      newOpenKeys.splice(keyIndex, 1);
    } else {
      newOpenKeys.push(subMenuKey);
    }

    if (onOpenChange) {
      onOpenChange(newOpenKeys);
    }
    if (!('openKeys' in this.props)) {
      this.setState({
        openKeys: newOpenKeys,
      });
    }
  }

  renderChildren() {
    const { children, inlineIndent, mode } = this.props;

    const childProps: childPropsType = {
      mode,
      inlineIndent,
    };
    return Children.map(children, (child, index) => {
      const c: ReactElement<any> = child as ReactElement<any>;
      const type = (c.type as React.ComponentClass<any>).name;
      const key = (child as ReactElement<any>).key;
      if (type === 'SubMenuConsumer') {
        childProps.subMenuKey = key || `submenu-0-${index}`;
      } else if (type === 'MenuItemConsumer') {
        childProps.itemKey = key || `menuitem-0-${index}`;
      }
      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      size, theme, mode, className, style, prefixCls,
    } = this.props;

    const { openKeys, selectedKeys } = this.state;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${theme}`]: true,
      [`${prefixCls}-${mode}`]: true,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    const newMenuKeys: keysType = {
      ...this.menuKeys,
      openKeys,
      selectedKeys,
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
