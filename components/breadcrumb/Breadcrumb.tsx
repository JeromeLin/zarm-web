import React, { Component, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { PropsType } from './PropsType';

class Breadcrumb extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-breadcrumb',
    separator: '/',
  };

  static Item;

  render() {
    const {
      className, separator, children, style, prefixCls, ...restProps
    } = this.props;

    const cls = classnames(prefixCls, className, {
    });

    // eslint-disable-next-line
    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element as ReactElement<any>, {
        separator,
        key: index,
      });
    });

    return (
      <div className={cls} style={style} {...restProps}>
        {items}
      </div>
    );
  }
}

export default Breadcrumb;
