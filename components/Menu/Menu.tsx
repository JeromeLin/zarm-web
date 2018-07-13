import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import MenuContext, { menuKeys, keysType } from './menu-context';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    mode: 'inline',
    theme: 'light',
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
  };

  static Item;

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

  constructor(props) {
    super(props);
    const { defaultOpenKeys, defaultSelectedKeys } = props;
    this.state = {
      openKeys: defaultOpenKeys,
      selectedKeys: defaultSelectedKeys,
    };
    menuKeys.toggleSelectedKeys = this.toggleSelectedKeys;
  }

  toggleSelectedKeys = (itemKey) => {
    this.setState({
      selectedKeys: [itemKey],
    });
  }

  render() {
    const {
      size, mode, className, children, style, prefixCls,
    } = this.props;

    const { openKeys, selectedKeys } = this.state;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${mode}`]: true,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    const newMenuKeys = {
      ...menuKeys,
      openKeys,
      selectedKeys,
    };

    return (
      <ul role="menu" className={cls} style={style}>
        <MenuContext.Provider value={newMenuKeys}>
          {children}
        </MenuContext.Provider>
      </ul>
    );
  }
}

export default Menu;
