import React, { Component, AnchorHTMLAttributes, HTMLAttributes, MouseEvent } from 'react';
import classnames from 'classnames';

interface BaseBreadcrumbItemProps {
  prefixCls?: string;
  separator?: string;
  onClick?: (event: MouseEvent) => void;
}

export type AnchorBreadcrumbItemProps = BaseBreadcrumbItemProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

export type SpanBreadcrumbItemProps = BaseBreadcrumbItemProps & Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>;

export type BreadcrumbItemProps = Partial<AnchorBreadcrumbItemProps & SpanBreadcrumbItemProps>;

class BreadcrumbItem extends Component<BreadcrumbItemProps, {}> {
  static displayName = 'BreadcrumbItem';

  static defaultProps = {
    prefixCls: 'zw-breadcrumb-item',
    separator: '/',
  };

  render() {
    const { className, separator, children, style, prefixCls, ...restProps } = this.props;
    const { href, ...AnchorRestProps } = restProps as AnchorBreadcrumbItemProps;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--link`]: 'href' in this.props,
    });

    const text = 'href' in this.props
      ? <a className={`${prefixCls}__content`} href={href} {...AnchorRestProps}>{children}</a>
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
