import React, { Component } from 'react';
import classnames from 'classnames';
import { ItemPropsType } from './PropsType';

class BreadcrumbItem extends Component<ItemPropsType, any> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const {
      className, href, separator, children, style,
    } = this.props;

    const cls = classnames({
      [className!]: !!className,
    });

    const text =
      'href' in this.props ? (
        <a className="ui-breadcrumb-link" href={href}>
          {children}
        </a>
      ) : (
        <span className="ui-breadcrumb-link">{children}</span>
      );

    return (
      <span className={cls} style={style}>
        {text}
        <span className="ui-breadcrumb-separator">{separator}</span>
      </span>
    );
  }
}

export default BreadcrumbItem;
