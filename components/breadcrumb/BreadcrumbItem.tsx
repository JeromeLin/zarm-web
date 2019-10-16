import React, { Component, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface BaseBreadcrumbItemProps {
  prefixCls?: string;
  separator?: string;
}

export type AnchorBreadcrumbItemProps = BaseBreadcrumbItemProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export type SpanBreadcrumbItemProps = BaseBreadcrumbItemProps & HTMLAttributes<HTMLSpanElement>;

export type BreadcrumbItemProps = AnchorBreadcrumbItemProps | SpanBreadcrumbItemProps;

class BreadcrumbItem extends Component<BreadcrumbItemProps, {}> {
  static displayName = 'BreadcrumbItem';

  static defaultProps = {
    prefixCls: 'zw-breadcrumb-item',
    separator: '/',
  };

  render() {
    const { className, separator, children, style, prefixCls, ...restProps } = this.props;
    const { href, ...AnchorRestProps } = restProps as AnchorBreadcrumbItemProps;

    const cls = classnames(prefixCls, className);

    const text = 'href' in this.props
      ? <a className={`${prefixCls}__link`} href={href} {...AnchorRestProps}>{children}</a>
      : <span className={`${prefixCls}__content`} {...restProps}>{children}</span>;

    return (
      <span className={cls} style={style}>
        {text}
        <span className={`${prefixCls}__separator`}>{separator}</span>
      </span>
    );
  }
}

export default BreadcrumbItem;
