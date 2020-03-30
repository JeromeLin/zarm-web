import React, { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '../tooltip';
import { MenuItemProps, MenuMode } from './PropsType';
import MenuContext from './menu-context';
import { noop } from '../utils';
import { FIRST_LEVEL_PADDING } from './SubMenu';

export class MenuItem extends Component<MenuItemProps, any> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    level: 1,
    style: {},
    mode: MenuMode.inline,
    inlineIndent: 12,
    onClick: noop,
    onDoubleClick: noop,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    level: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])),
    mode: PropTypes.oneOf(['inline', 'vertical']),
    inlineIndent: PropTypes.number,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
  };

  handleClick = (e: React.MouseEvent) => {
    const { itemKey, inlineCollapsed, disabled, mode } = this.props;

    if (disabled) return;
    this.props.onClick!(e, itemKey!);
    this.props.toggleSelectedKeys!(itemKey!);
    if (inlineCollapsed || mode === MenuMode.vertical) {
      this.props.toggleSubMenuOpen!('');
    }
  };

  render() {
    const {
      children, prefixCls, level, inlineIndent, title, mode, icon,
      className, style, onDoubleClick, selectedKeys, itemKey, inlineCollapsed,
    } = this.props;

    const cls = classnames(`${prefixCls}-item`, className, {
      [`${prefixCls}-item--level-${level}`]: level,
      [`${prefixCls}-item--active`]: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      [`${prefixCls}-item--disabled`]: 'disabled' in this.props,
    });
    const itemStyle: CSSProperties = {
      ...style,
    };
    if (mode === MenuMode.inline && !inlineCollapsed) {
      if (level === 1) {
        itemStyle.paddingLeft = FIRST_LEVEL_PADDING;
      } else {
        itemStyle.paddingLeft = FIRST_LEVEL_PADDING + level! * inlineIndent! + 4;
      }
    }
    if (mode === MenuMode.vertical || (inlineCollapsed && level !== 1)) {
      itemStyle.paddingLeft = FIRST_LEVEL_PADDING;
    }

    if (!inlineCollapsed) {
      return (
        <li
          className={cls}
          role="menuitem"
          style={itemStyle}
          onClick={this.handleClick}
          onDoubleClick={onDoubleClick}
        >
          {icon}
          {children}
        </li>
      );
    }

    return (
      <li
        className={cls}
        role="menuitem"
        style={itemStyle}
        onClick={this.handleClick}
        onDoubleClick={onDoubleClick}
      >
        <Tooltip
          hasArrow
          content={title}
          direction="right"
        >
          <div>
            {icon}
            {children}
          </div>
        </Tooltip>
      )
      </li>
    );
  }
}

export default function MenuItemConsumer(props: MenuItemProps) {
  return (
    <MenuContext.Consumer>
      {
        ({
          mode, inlineCollapsed, inlineIndent,
          selectedKeys, toggleOpenKeys, toggleSelectedKeys,
        }) => (
          <MenuItem
            {...props}
            mode={mode}
            inlineIndent={inlineIndent}
            inlineCollapsed={inlineCollapsed}
            selectedKeys={selectedKeys}
            toggleSubMenuOpen={toggleOpenKeys}
            toggleSelectedKeys={toggleSelectedKeys}
          />
        )
      }
    </MenuContext.Consumer>
  );
}
