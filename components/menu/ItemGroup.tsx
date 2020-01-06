import React, { Component, ReactElement, cloneElement, Children, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ItemGroupProps, ChildProps, Mode } from './PropsType';
import MenuContext from './menu-context';

class ItemGroup extends Component<ItemGroupProps> {
  static isItemGroup = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: Mode.inline,
    level: 1,
    groupIndex: 0,
    inlineIndent: 24,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    level: PropTypes.number,
    mode: PropTypes.oneOf(['inline', 'vertical']),
    inlineIndent: PropTypes.number,
    groupIndex: PropTypes.number,
  };

  renderChildren() {
    const { children, level, prefixCls, subMenuKey, groupIndex } = this.props;
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
    if (mode === Mode.inline && !inlineCollapsed) {
      groupTitleStyle.paddingLeft = (level! - 1) * inlineIndent! + inlineIndent! / 2;
    }
    if (mode === Mode.vertical || inlineCollapsed) {
      groupTitleStyle.paddingLeft = inlineIndent! / 2;
    }

    const cls = classnames({
      [`${prefixCls}__itemgroup`]: true,
      [className!]: !!className,
    });
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

export default function ItemGroupConsumer(props: ItemGroupProps) {
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
