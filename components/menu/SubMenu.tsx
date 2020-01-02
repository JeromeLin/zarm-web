import React, { Component, Children, cloneElement, CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import dom from '../utils/dom';
import events from '../utils/events';
import { SubMenuProps, ChildProps, Mode } from './PropsType';
import MenuContext from './menu-context';

interface SubMenuState {
  collapsedSubVisible: boolean;
  collapsedSubAnimation: 'up' | 'down' | '';
  openKeys: string[];
}

export class SubMenu extends Component<SubMenuProps, SubMenuState> {
  static isSubMenu = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    title: '',
    level: 1,
    style: {},
    openKeys: [],
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    level: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])),
    title: PropTypes.node,
    openKeys: PropTypes.arrayOf(PropTypes.string),
  };

  subTitle: any;

  sub: any;

  timeout: any;

  constructor(props) {
    super(props);
    const { openKeys } = props;
    this.state = {
      collapsedSubVisible: false,
      collapsedSubAnimation: '',
      openKeys,
    };
  }

  static getDerivedStateFromProps(props: SubMenuProps, state: SubMenuState) {
    const { openKeys, subMenuKey } = props;

    const isOpenNext = openKeys!.indexOf(subMenuKey!) > -1;
    const isOpenNow = state.openKeys.indexOf(subMenuKey!) > -1;

    if (!isOpenNow && isOpenNext) {
      return {
        collapsedSubVisible: true,
        collapsedSubAnimation: 'down',
        openKeys,
      };
    }
    if (isOpenNow && !isOpenNext) {
      return {
        collapsedSubVisible: false,
        collapsedSubAnimation: 'up',
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

  componentDidUpdate(prevProps) {
    const { inlineCollapsed } = this.props;
    if (!inlineCollapsed) {
      this.setSubHeight(prevProps);
    }
  }

  componentWillUnmount() {
    const { inlineCollapsed, mode } = this.props;
    if (inlineCollapsed || mode === Mode.vertical) {
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

    const height = childs.reduce((res, next) => {
      res += (next.offsetHeight + marginBottom);
      return res;
    }, marginBottom / 2);

    return height;
  }

  setSubHeight(prevProps) {
    if (!this.sub) {
      return;
    }
    const { openKeys: lastOpenKeys } = prevProps;
    const { openKeys, subMenuKey } = this.props;

    const keyIndex = openKeys!.indexOf(subMenuKey!);
    const keysLength = openKeys!.length;
    if (keyIndex > -1) {
      if ((keysLength > 1 && keyIndex < keysLength - 1) || keysLength < lastOpenKeys.length) {
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
        this.sub.style.height = 0;
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

  toggleSubMenuOpen = (e) => {
    e.stopPropagation();
    const { subMenuKey } = this.props;

    this.props.toggleOpenKeys!(subMenuKey!);
  };

  onSubAnimationEnd = () => {
    const { subMenuKey, openKeys } = this.props;
    const isOpen = openKeys!.indexOf(subMenuKey!) > -1;
    this.setState({
      collapsedSubVisible: isOpen,
    });
  };

  onClickOutSide = (e: MouseEvent) => {
    const { target } = e;
    const { subMenuKey, openKeys, inlineCollapsed, mode } = this.props;

    if (!inlineCollapsed && mode !== Mode.vertical) return;
    if (this.subTitle.contains(target)) {
      return;
    }
    if (!this.sub.contains(target) && openKeys!.indexOf(subMenuKey!) > -1) {
      this.props.toggleOpenKeys!(subMenuKey!);
    }
  };

  renderChildren() {
    const {
      children, level, prefixCls, subMenuKey,
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
        childProps.index = index;
      } else {
        childProps.itemKey = key || `${subMenuKey}-${level}-${index}`;
        childProps.subMenuKey = key || `${subMenuKey}-${level}-${index}`;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      title, level, mode, style, inlineIndent,
      prefixCls, openKeys, subMenuKey, inlineCollapsed,
    } = this.props;
    const { collapsedSubVisible, collapsedSubAnimation } = this.state;

    const subMenuStyle: CSSProperties = {};
    const childs = this.renderChildren();

    if (mode === Mode.inline && !inlineCollapsed) {
      subMenuStyle.paddingLeft = level! * inlineIndent!;
    }
    if (mode === Mode.vertical || (inlineCollapsed && level !== 1)) {
      subMenuStyle.paddingLeft = inlineIndent;
    }
    const isOpen = openKeys!.indexOf(subMenuKey!) > -1;
    const cls = classnames(`${prefixCls}__submenu`, {
      [`${prefixCls}__submenu--open`]: isOpen,
      [`${prefixCls}__submenu--active`]: this.checkIfActive(childs),
      [`${prefixCls}__submenu--level-${level}`]: level,
    });
    let subStyle: React.CSSProperties = {
      display: 'block',
    };
    let subCls = `${prefixCls}__sub`;
    if (inlineCollapsed || mode === Mode.vertical) {
      subStyle = {
        display: collapsedSubVisible ? 'block' : 'none',
      };
      subCls = classnames(`${prefixCls}`, `${prefixCls}__sub`, {
        [`slide-${collapsedSubAnimation}`]: !!collapsedSubAnimation,
      });
    }

    return (
      <li className={cls} style={style}>
        <div
          ref={(subTitle) => { this.subTitle = subTitle; }}
          onClick={this.toggleSubMenuOpen}
          style={subMenuStyle}
          className={`${prefixCls}__title`}
        >
          {title}
          <i className={`${prefixCls}__arrow`} />
        </div>
        <ul
          ref={(sub) => { this.sub = sub; }}
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
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            toggleOpenKeys={toggleOpenKeys}
          />
        )
      }
    </MenuContext.Consumer>
  );
}
