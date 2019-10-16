import React, { Component, cloneElement, ReactElement, HTMLAttributes } from 'react';
import classnames from 'classnames';

export type BreadcrumbProps = {
  prefixCls?: string;
  separator?: string;
} & HTMLAttributes<HTMLDivElement>;

class Breadcrumb extends Component<BreadcrumbProps, {}> {
  static displayName = 'Breadcrumb';

  static defaultProps = {
    prefixCls: 'zw-breadcrumb',
    separator: '/',
  };

  static Item;

  render() {
    const { prefixCls, className, separator, children, ...restProps } = this.props;
    const cls = classnames(prefixCls, className);

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element as ReactElement<any>, {
        separator,
        key: index,
      });
    });

    return (
      <div className={cls} {...restProps}>
        {items}
      </div>
    );
  }
}

export default Breadcrumb;
