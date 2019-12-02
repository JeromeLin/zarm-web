import React, { Component, Children, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PropsType, { childPropsType } from './PropsType';
import MenuContext, { menuKeys, KeysType } from './menu-context';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
import ItemGroup from './ItemGroup';
import Divider from './Divider';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: 'inline',
    theme: 'light',
    inlineIndent: 24,
    inlineCollapsed: false,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
  };

  static contextTypes = {
    siderCollapsed: PropTypes.bool,
  };

  static SubMenu = SubMenu;

  static Item = MenuItem;

  static Divider = Divider;

  static ItemGroup = ItemGroup;

  menuKeys: any;

  inlineOpenKeys: string[] = [];

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

  componentWillReceiveProps(nextProps) {
    const { inlineCollapsed } = this.props;
    const { openKeys } = this.state;
    if (
      (nextProps.inlineCollapsed && !inlineCollapsed)
    ) {
      // this.switchingModeFromInline = true;
      this.inlineOpenKeys = openKeys;
      this.setState({ openKeys: [] });
    }

    if (
      (!nextProps.inlineCollapsed && inlineCollapsed)
    ) {
      this.setState({ openKeys: this.inlineOpenKeys });
      this.inlineOpenKeys = [];
    }
    if (nextProps.openKeys) {
      this.setState({
        openKeys: nextProps.openKeys,
      });
    }
    if (nextProps.selectedKeys) {
      this.setState({ selectedKeys: nextProps.selectedKeys });
    }
  }

  toggleSelectedKeys = (itemKey) => {
    if (!('selectedKeys' in this.props)) {
      this.setState({
        selectedKeys: [itemKey],
      });
    }
  };

  toggleOpenKeys = (subMenuKey) => {
    const { openKeys } = this.state;
    const { onOpenChange, inlineCollapsed } = this.props;
    const newOpenKeys = [...openKeys];

    const keyIndex = openKeys.indexOf(subMenuKey);
    if (keyIndex > -1) {
      newOpenKeys.splice(keyIndex, 1);
    } else {
      newOpenKeys.push(subMenuKey);
    }
    if (inlineCollapsed && subMenuKey === '') { // inlineCollapsed状态点击item关闭所有的submenu
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
    const { children, inlineIndent, inlineCollapsed, mode } = this.props;
    const { siderCollapsed } = this.context;

    const childProps: childPropsType = {
      mode,
      inlineIndent,
      inlineCollapsed: inlineCollapsed || siderCollapsed,
    };
    return Children.map(children, (child, index) => {
      const { key } = child;

      if (Object.keys(child.type).indexOf('isItemGroup') > -1) {
        childProps.index = index;
      } else {
        childProps.subMenuKey = key || `0-${index}`;
        childProps.itemKey = key || `0-${index}`;
      }

      return cloneElement(child, childProps);
    });
  }

  render() {
    const {
      size, theme, mode, className, style, prefixCls, inlineCollapsed,
    } = this.props;
    const { siderCollapsed } = this.context;

    const { openKeys, selectedKeys } = this.state;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}--root`]: true,
      [`${prefixCls}--${theme}`]: true,
      [`${prefixCls}--${mode}`]: true,
      [`${prefixCls}--collapsed`]: !!siderCollapsed || !!inlineCollapsed,
      [`${prefixCls}--${size}`]: !!size,
      [className!]: !!className,
    });

    const newMenuKeys: KeysType = {
      ...this.menuKeys,
      openKeys,
      selectedKeys,
      inlineCollapsed,
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
