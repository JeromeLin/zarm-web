import React, { Component, CSSProperties } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import { ItemProps, Mode } from './PropsType';
import MenuContext from './menu-context';
import { noop } from '../utils';

class MenuItem extends Component<ItemProps, any> {
  static isMenuItem = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    checked: false,
    level: 1,
    style: {},
    mode: 'inline',
    inlineIndent: 10,
    onClick: noop,
    onDoubleClick: noop,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    checked: PropTypes.bool,
    level: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])),
    mode: PropTypes.oneOf(['inline', 'horizontal', 'vertical']),
    inlineIndent: PropTypes.number,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
  };

  handleClick = (e: React.MouseEvent) => {
    const { itemKey, inlineCollapsed, disabled, mode } = this.props;

    if (disabled) return;
    this.props.onClick(e, itemKey);
    this.props.toggleSelectedKeys(itemKey);
    if (inlineCollapsed || mode === 'vertical') {
      this.props.toggleSubMenuOpen('');
    }
  };

  render() {
    const {
      checked, children, prefixCls, level, inlineIndent, title,
      className, style, onDoubleClick, selectedKeys, itemKey, mode, inlineCollapsed,
    } = this.props;

    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--level-${level}`]: level,
      [`${prefixCls}__item--active`]: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      [`${prefixCls}__item--selected`]: !!checked,
      [`${prefixCls}__item--disabled`]: 'disabled' in this.props,
      [className!]: !!className,
    });
    const itemStyle: CSSProperties = {
      ...style,
    };
    if (mode === Mode.inline && !inlineCollapsed) {
      itemStyle.paddingLeft = level * inlineIndent;
    }
    if (mode === Mode.vertical || (inlineCollapsed && level !== 1)) {
      itemStyle.paddingLeft = inlineIndent;
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
            {children}
          </div>
        </Tooltip>
      </li>
    );
  }
}

export default function MenuItemConsumer(props: ItemProps) {
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
