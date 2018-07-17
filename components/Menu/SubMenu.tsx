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

  sub: any;

  toggleSubMenuOpen = (e) => {
    e.stopPropagation();
    const { subMenuKey } = this.props;

    this.props.toggleOpenKeys(subMenuKey);
  }

  renderChildren() {
    const {
      children, level, inlineIndent, mode, prefixCls, subMenuKey,
    } = this.props;
    const childProps: childPropsType = {
      mode,
      level: level + 1,
      inlineIndent,
      prefixCls,
    };
    return Children.map(children, (child, index) => {
      const c: ReactElement<any> = child as ReactElement<any>;
      const type = (c.type as React.ComponentClass<any>).name;
      const key = (child as ReactElement<any>).key;

      if (type === 'SubMenuConsumer') {
        childProps.subMenuKey = key || `${subMenuKey}-submenu-${level}-${index}`;
      } else if (type === 'MenuItemConsumer') {
        childProps.itemKey = key || `${subMenuKey}-menuitem-${level}-${index}`;
      }

      return cloneElement(c, childProps);
    });
  }

  getSubHeight() {
    const childs = [...this.sub.children];

    const height = childs.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);

    return height;
  }

  setSubHeight(prevProps) {
    const { openKeys: lastOpenKeys } = prevProps;
    const { openKeys, subMenuKey } = this.props;

    const keyIndex = openKeys.indexOf(subMenuKey);
    const keysLength = openKeys.length;
    if (keyIndex > -1) {
      if (keysLength > 1 && keyIndex < keysLength - 1 || keysLength < lastOpenKeys.length) {
        // 如果不是最后一级子菜单，或者嵌套的子菜单被收起，当前子菜单高度自适应
        this.sub.style.height = 'auto';
      } else {
        // 否则，设置具体的高度产生过渡动画
        const height = this.getSubHeight();
        this.sub.style.height = height + 'px';
      }
    } else {
      const height = this.getSubHeight();
      this.sub.style.height = height + 'px';

      setTimeout(() => {
        this.sub.style.height = 0;
      }, 0);
    }
  }

  componentDidMount() {
    this.setSubHeight({ openKeys: [] });
  }

  componentDidUpdate(prevProps) {
    this.setSubHeight(prevProps);
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
      open: openKeys.indexOf(subMenuKey) > -1,
    });
    return (
      <li className={cls} style={style}>
        <div
          onClick={this.toggleSubMenuOpen}
          style={subMenuStyle}
          className={`${prefixCls}-submenu-title`}
        >
          {title}
          <i className={`${prefixCls}-submenu-arrow`} />
        </div>
        <ul
          ref={(sub) => { this.sub = sub; }}
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
