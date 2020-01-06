import React, { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '../tooltip';
import { ItemProps, Mode } from './PropsType';
import MenuContext from './menu-context';
import { noop } from '../utils';

export class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'zw-menu',
    level: 1,
    style: {},
    mode: Mode.inline,
    inlineIndent: 24,
    onClick: noop,
    onDoubleClick: noop,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
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
    this.props.onClick!(e, itemKey!);
    this.props.toggleSelectedKeys!(itemKey!);
    if (inlineCollapsed || mode === Mode.vertical) {
      this.props.toggleSubMenuOpen!('');
    }
  };

  render() {
    const {
      children, prefixCls, level, inlineIndent, title, mode,
      className, style, onDoubleClick, selectedKeys, itemKey, inlineCollapsed,
    } = this.props;

    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--level-${level}`]: level,
      [`${prefixCls}__item--active`]: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      [`${prefixCls}__item--disabled`]: 'disabled' in this.props,
      [className!]: !!className,
    });
    const itemStyle: CSSProperties = {
      ...style,
    };
    if (mode === Mode.inline && !inlineCollapsed) {
      itemStyle.paddingLeft = level! * inlineIndent!;
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
