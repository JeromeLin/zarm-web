import React, { Component, Children, cloneElement, CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import dom from '../utils/dom';
import events from '../utils/events';
import { SubMenuProps, ChildProps, MenuMode } from './PropsType';
import MenuContext from './menu-context';

enum SubAnimation {
  UP = 'up',
  DOWN = 'down',
  None = ''
}
export const FIRST_LEVEL_PADDING = 20;
export const getMenuPadding = (level = 1, inlineIndent?: number) => {
  if (level === 1) {
    return FIRST_LEVEL_PADDING;
  }
  return FIRST_LEVEL_PADDING + level * inlineIndent! + 4;
};

interface SubMenuState {
  collapsedSubVisible: boolean;
  collapsedSubAnimation: SubAnimation;
  openKeys: string[];
}

export class SubMenu extends Component<SubMenuProps, SubMenuState> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    title: '',
    level: 1,
    style: {},
    openKeys: [],
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.node,
    level: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])),
    openKeys: PropTypes.arrayOf(PropTypes.string),
  };

  subTitle: HTMLDivElement;

  sub: HTMLUListElement;

  constructor(props: SubMenuProps) {
    super(props);
    const { openKeys } = props;
    this.state = {
      collapsedSubVisible: false,
      collapsedSubAnimation: SubAnimation.None,
      openKeys: openKeys!,
    };
  }

  static getDerivedStateFromProps(props: SubMenuProps, state: SubMenuState) {
    const { openKeys, subMenuKey } = props;

    const isOpenNext = openKeys!.indexOf(subMenuKey!) > -1;
    const isOpenNow = state.openKeys.indexOf(subMenuKey!) > -1;

    if (!isOpenNow && isOpenNext) {
      return {
        collapsedSubVisible: true,
        collapsedSubAnimation: SubAnimation.DOWN,
        openKeys,
      };
    }
    if (isOpenNow && !isOpenNext) {
      return {
        collapsedSubVisible: false,
        collapsedSubAnimation: SubAnimation.UP,
        openKeys,
      };
    }

    return null;
  }

  componentDidMount() {
    const { openKeys, inlineCollapsed } = this.props;
    if (openKeys!.length > 0) {
      if (!inlineCollapsed) {
        this.setSubHeight({ openKeys: [] });
      }
    }
    events.on(document, 'click', this.onClickOutSide);
  }

  componentDidUpdate(prevProps: SubMenuProps) {
    const { inlineCollapsed } = this.props;
    if (!inlineCollapsed) {
      this.setSubHeight(prevProps);
    }
  }

  componentWillUnmount() {
    const { inlineCollapsed, mode } = this.props;
    if (inlineCollapsed || mode === MenuMode.vertical) {
      events.off(document, 'click', this.onClickOutSide);
    }
  }

  getSubHeight() {
    if (!this.sub) {
      return;
    }
    const childs = [...this.sub.children];
    let marginBottom = 0;

    if (childs[0]) {
      marginBottom = parseFloat(dom.getStyleComputedProperty(childs[0], 'marginBottom'));
    }

    const height = childs.reduce((res, next: HTMLLIElement) => {
      res += (next.offsetHeight + marginBottom);
      return res;
    }, marginBottom / 2);

    return height;
  }

  setSubHeight(prevProps: { openKeys?: string[] }) {
    if (!this.sub) {
      return;
    }
    const { openKeys: lastOpenKeys } = prevProps;
    const { openKeys, subMenuKey } = this.props;

    const keyIndex = openKeys!.indexOf(subMenuKey!);
    const keysLength = openKeys!.length;
    if (keyIndex > -1) {
      if ((keysLength > 1 && keyIndex < keysLength - 1)
        || keysLength < lastOpenKeys!.length) {
        // 如果不是最后一级子菜单，或者嵌套的子菜单被收起，当前子菜单高度自适应
        this.sub.style.height = 'auto';
      } else {
        // 否则，设置具体的高度产生过渡动画
        const height = this.getSubHeight();
        this.sub.style.height = `${height}px`;
      }
    } else {
      const height = this.getSubHeight();
      this.sub.style.height = `${height}px`;

      setTimeout(() => {
        this.sub.style.height = '0';
      }, 0);
    }
  }

  checkIfActive = (childs: React.ReactElement[]): boolean => {
    const { selectedKeys, subMenuKey } = this.props;
    if (!selectedKeys || !selectedKeys.length) return false;
    return childs.some(() => {
      if (selectedKeys[0].startsWith(subMenuKey!)) {
        return true;
      }
      return false;
    });
  };

  toggleSubMenuOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { subMenuKey } = this.props;

    this.props.toggleOpenKeys!(subMenuKey!);
  };

  onSubAnimationEnd = () => {
    const { subMenuKey, openKeys } = this.props;
    this.setState({
      collapsedSubVisible: openKeys!.indexOf(subMenuKey!) > -1,
    });
  };

  onClickOutSide = (e: MouseEvent) => {
    const { target } = e;
    const { subMenuKey, openKeys, inlineCollapsed, mode } = this.props;

    if (!inlineCollapsed && mode !== MenuMode.vertical) return;
    if (this.subTitle.contains(target as Node)) {
      return;
    }
    if (!this.sub.contains(target as Node) && openKeys!.indexOf(subMenuKey!) > -1) {
      this.props.toggleOpenKeys!(subMenuKey!);
    }
  };

  renderChildren() {
    const {
      children, level, subMenuKey, prefixCls,
    } = this.props;
    const childProps: ChildProps = {
      level: level! + 1,
      prefixCls,
    };
    return Children.map(children, (child, index) => {
      const c = child as ReactElement;
      const { key } = c;
      if (Object.keys(c.type).indexOf('isItemGroup') > -1) {
        childProps.subMenuKey = subMenuKey;
        childProps.groupIndex = index;
      } else {
        const childKey = key || `${subMenuKey}-${level}-${index}`;
        childProps.itemKey = childProps.subMenuKey = childKey;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      title, level, mode, style, inlineIndent, icon,
      prefixCls, openKeys, subMenuKey, inlineCollapsed,
    } = this.props;
    const { collapsedSubVisible, collapsedSubAnimation } = this.state;

    const subMenuStyle: CSSProperties = {};
    const childs = this.renderChildren();

    if (mode === MenuMode.inline && !inlineCollapsed) {
      if (level === 1 && !icon) {
        subMenuStyle.paddingLeft = getMenuPadding(level + 1, inlineIndent);
      } else {
        subMenuStyle.paddingLeft = getMenuPadding(level, inlineIndent);
      }
    }
    if (mode === MenuMode.vertical || (inlineCollapsed && level !== 1)) {
      subMenuStyle.paddingLeft = getMenuPadding();
    }
    const isActive = this.checkIfActive(childs);
    const isOpen = openKeys!.indexOf(subMenuKey!) > -1;
    const cls = classnames(`${prefixCls}-submenu`, {
      [`${prefixCls}-submenu--open`]: isOpen,
      [`${prefixCls}-submenu--active`]: isActive,
      [`${prefixCls}-submenu--level-${level}`]: level,
    });
    const titleCls = classnames(`${prefixCls}-submenu__title`, {
      [`${prefixCls}-submenu__title-first`]: isActive,
      [`${prefixCls}-submenu__title-open`]: isOpen,
      [`${prefixCls}-submenu__title-level-1`]: level === 1,
    });
    let subStyle: CSSProperties = {
      display: 'block',
    };
    let subCls = `${prefixCls}-submenu__sub`;
    if (inlineCollapsed || mode === MenuMode.vertical) {
      subStyle = {
        display: collapsedSubVisible ? 'block' : 'none',
      };
      subCls = classnames(`${prefixCls}`, `${prefixCls}-submenu__sub`, {
        [`slide-${collapsedSubAnimation}`]: !!collapsedSubAnimation,
      });
    }

    return (
      <li className={cls} style={style}>
        <div
          ref={(subTitle) => { this.subTitle = subTitle!; }}
          onClick={this.toggleSubMenuOpen}
          style={subMenuStyle}
          className={titleCls}
        >
          {
            !inlineCollapsed || level! > 1
              ? (
                <span>
                  {icon}
                  {title}
                </span>
              )
              : (
                <Tooltip
                  hasArrow
                  content={title}
                  visible={!isOpen}
                  direction="right"
                >
                  <span>
                    {icon}
                    {title}
                  </span>
                </Tooltip>
              )
          }
          <i className={`${prefixCls}-submenu__arrow`} />
        </div>
        <ul
          ref={(sub) => { this.sub = sub!; }}
          className={subCls}
          style={subStyle}
          onAnimationEnd={this.onSubAnimationEnd}
        >
          {childs}
        </ul>
      </li>
    );
  }
}

export default function SubMenuConsumer(props: SubMenuProps) {
  return (
    <MenuContext.Consumer>
      {
        ({
          mode, inlineCollapsed, inlineIndent,
          selectedKeys, openKeys, toggleOpenKeys,
        }) => (
          <SubMenu
            {...props}
            mode={mode}
            inlineIndent={inlineIndent}
            inlineCollapsed={inlineCollapsed}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            toggleOpenKeys={toggleOpenKeys}
          />
        )
      }
    </MenuContext.Consumer>
  );
}
