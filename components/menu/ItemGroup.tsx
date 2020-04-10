import React, { Component, ReactElement, cloneElement, Children, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MenuItemGroupProps, ChildProps, MenuMode } from './PropsType';
import MenuContext from './menu-context';
import { FIRST_LEVEL_PADDING } from './SubMenu';

class ItemGroup extends Component<MenuItemGroupProps> {
  static isItemGroup = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: MenuMode.inline,
    level: 1,
    groupIndex: 0,
    inlineIndent: 12,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    level: PropTypes.number,
    mode: PropTypes.oneOf(['inline', 'vertical']),
    inlineIndent: PropTypes.number,
    groupIndex: PropTypes.number,
  };

  renderChildren() {
    const { children, level, subMenuKey, groupIndex, prefixCls } = this.props;
    const childProps: ChildProps = {
      level,
      prefixCls,
    };
    return Children.map(children, (child, index) => {
      const c = child as ReactElement;
      const { key } = c;

      const suffix = `group-${groupIndex}-${index}`;
      if (level === 1) {
        const childKey = key || `0-${suffix}`;
        childProps.itemKey = childProps.subMenuKey = childKey;
      } else {
        const childKey = key || `${subMenuKey}-${level}-${suffix}`;
        childProps.itemKey = childProps.subMenuKey = childKey;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const {
      prefixCls, title, inlineIndent, level, mode, inlineCollapsed, className, style,
    } = this.props;

    const groupTitleStyle: CSSProperties = {};
    if (mode === MenuMode.inline && !inlineCollapsed) {
      groupTitleStyle.paddingLeft = FIRST_LEVEL_PADDING + level! * inlineIndent! - 8;
    }
    if (mode === MenuMode.vertical || inlineCollapsed) {
      groupTitleStyle.paddingLeft = FIRST_LEVEL_PADDING - inlineIndent!;
    }

    const cls = classnames(
      `${prefixCls}-item-group`,
      { [className!]: !!className },
    );
    return (
      <li className={cls} style={style}>
        <div
          style={groupTitleStyle}
          className={`${cls}__title`}
        >
          {title}
        </div>
        <ul className={`${cls}__list`}>
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}

export default function ItemGroupConsumer(props: MenuItemGroupProps) {
  return (
    <MenuContext.Consumer>
      {
        ({
          mode, inlineCollapsed, inlineIndent,
        }) => (
          <ItemGroup
            {...props}
            mode={mode}
            inlineIndent={inlineIndent}
            inlineCollapsed={inlineCollapsed}
          />
        )
      }
    </MenuContext.Consumer>
  );
}
