import React, { Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PropsType, { childPropsType } from './PropsType';
import MenuContext, { menuKeys, keysType } from './menu-context';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
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

  static SubMenu;
  static Item;
  static Divider;

  static getDerivedStateFromProps(props) {
    const state = {} as keysType;
    if ('openKeys' in props) {
      state.openKeys = props.openKeys;
    }
    if ('selectedKeys' in props) {
      state.selectedKeys = props.selectedKeys;
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
    const { children, inlineIndent, inlineCollapsed, mode } = this.props;
    const { siderCollapsed } = this.context;

    const childProps: childPropsType = {
      mode,
      inlineIndent,
      inlineCollapsed: inlineCollapsed || siderCollapsed,
    };
    return Children.map(children, (child, index) => {
      const c: ReactElement<any> = child as ReactElement<any>;
      const key = (child as ReactElement<any>).key;

      childProps.subMenuKey = key || `0-${index}`;
      childProps.itemKey = key || `0-${index}`;
      return cloneElement(c, childProps);
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
      [`${prefixCls}-${theme}`]: true,
      [`${prefixCls}-${mode}`]: true,
      [`${prefixCls}-collapsed`]: !!siderCollapsed || !!inlineCollapsed,
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
