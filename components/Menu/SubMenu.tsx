import React, { Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { SubMenuProps, styleType, childPropsType } from './PropsType';
import MenuContext from './menu-context';

class SubMenu extends Component<SubMenuProps, any> {
  static defaultProps = {
    prefixCls: 'ui-menu',
    title: '',
    level: 1,
    style: {},
    openKeys: [],
  };

  toggleSubMenuOpen = (e) => {
    e.stopPropagation();
    const { level, subMenuKey } = this.props;

    this.props.toggleOpenKeys(level, subMenuKey);
  }

  renderChildren() {
    const { children, level, inlineIndent, mode } = this.props;
    const childProps: childPropsType = {
      mode,
      level: level + 1,
      inlineIndent,
    };
    return Children.map(children, (child) => {
      const c: ReactElement<any> = child as ReactElement<any>;
      const type = (c.type as React.ComponentClass<any>).name;
      const key = (child as ReactElement<any>).key;

      if (type === 'SubMenuConsumer') {
        childProps.subMenuKey = key;
      } else if (type === 'MenuItemConsumer') {
        childProps.itemKey = key;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      title, level, mode, style, inlineIndent,
      prefixCls, openKeys, subMenuKey,
    } = this.props;

    const subMenuStyle: styleType = {};
    if (mode === 'inline') {
      subMenuStyle.paddingLeft = level * inlineIndent;
    }
    const cls = classnames(`${prefixCls}-submenu`, {
      [`${prefixCls}-submenu-open`]: openKeys.indexOf(subMenuKey) > -1,
    });
    return (
      <li className={cls} style={style}>
        <div
          onClick={this.toggleSubMenuOpen}
          style={subMenuStyle}
          className={`${prefixCls}-submenu-title`}
        >
          {title}
        </div>
        <ul
          className={`${prefixCls}-submenu-sub`}
        >
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}

export default function SubMenuConsumer(props) {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <SubMenu
            {...props}
            openKeys={menuKeys.openKeys}
            toggleOpenKeys={menuKeys.toggleOpenKeys}
          />
        )}
    </MenuContext.Consumer>
  );
}
