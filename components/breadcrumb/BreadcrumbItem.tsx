import React, { Component } from 'react';
import classnames from 'classnames';
import { ItemPropsType } from './PropsType';

class BreadcrumbItem extends Component<ItemPropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-breadcrumb-item',
    separator: '/',
  };

  render() {
    const {
      className, href, separator, children, style, prefixCls,
    } = this.props;

    const cls = classnames(prefixCls, className, {
    });

    const text = 'href' in this.props ? (
      <a className={`${prefixCls}__link`} href={href}>
        {children}
      </a>
    ) : (
      <span className={`${prefixCls}__content`}>{children}</span>
    );

    return (
      <span className={cls} style={style}>
        {text}
        <span className={`${prefixCls}__separator`}>{separator}</span>
      </span>
    );
  }
}

export default BreadcrumbItem;
