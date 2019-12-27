import React, { Component, ReactElement, cloneElement, Children, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { ItemGroupProps, ChildProps, Mode } from './PropsType';
import MenuContext from './menu-context';

class ItemGroup extends Component<ItemGroupProps> {
  static isItemGroup = true;

  static defaultProps = {
    prefixCls: 'zw-menu',
    mode: 'inline',
    level: 1,
    index: 0,
    inlineIndent: 24,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    level: PropTypes.number,
    mode: PropTypes.oneOf(['inline', 'horizontal', 'vertical']),
    inlineIndent: PropTypes.number,
    index: PropTypes.number,
  };

  renderChildren() {
    const {
      children, level, prefixCls, subMenuKey, index,
    } = this.props;
    const childProps: ChildProps = {
      level,
      prefixCls,
    };
    return Children.map(children, (child, idx) => {
      const c = child as ReactElement;
      const { key } = c;

      if (level === 1) {
        childProps.subMenuKey = key || `0-group${index}-${idx}`;
        childProps.itemKey = key || `0-group${index}-${idx}`;
      } else {
        childProps.itemKey = key || `${subMenuKey}-${level}-group${index}-${idx}`;
        childProps.subMenuKey = key || `${subMenuKey}-${level}-group${index}-${idx}`;
      }

      return cloneElement(c, childProps);
    });
  }

  render() {
    const { prefixCls, title, inlineIndent, level, mode, inlineCollapsed } = this.props;

    const groupTitleStyle: CSSProperties = {};
    if (mode === Mode.inline && !inlineCollapsed) {
      groupTitleStyle.paddingLeft = (level - 1) * inlineIndent + inlineIndent / 2;
    }
    if (mode === Mode.vertical || inlineCollapsed) {
      groupTitleStyle.paddingLeft = inlineIndent / 2;
    }

    const cls = `${prefixCls}__itemgroup`;
    return (
      <li className={cls}>
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
