import React, { Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PropsType, { childPropsType } from './PropsType';
import MenuContext, { menuKeys, keysType } from './menu-context';

class Menu extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-menu',
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
    if (
      (nextProps.inlineCollapsed && !this.props.inlineCollapsed)
    ) {
      // this.switchingModeFromInline = true;
      this.inlineOpenKeys = this.state.openKeys;
      this.setState({ openKeys: [] });
    }

    if (
      (!nextProps.inlineCollapsed && this.props.inlineCollapsed)
    ) {
      this.setState({ openKeys: this.inlineOpenKeys });
      this.inlineOpenKeys = [];
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
      const c: ReactElement<any> = child as ReactElement<any>;
      const { key } = child as ReactElement<any>;

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
      [`${prefixCls}-root`]: true,
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
