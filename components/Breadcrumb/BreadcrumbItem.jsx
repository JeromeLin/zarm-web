
import React, { Component } from 'react';
import classnames from 'classnames';

class BreadcrumbItem extends Component {

  render () { 
    const { className, href, separator, children, ...others } = this.props;

    const cls = classnames({
      [className]: !!className,
    });

    const text = ('href' in this.props)
               ? <a className="ui-breadcrumb-link" href={href}>{children}</a>
               : <span className="ui-breadcrumb-link">{children}</span>;
               
    return (
      <span {...others} className={cls}>
        {text}
        <span className="ui-breadcrumb-separator">{separator}</span>
      </span>
    );
  }

}

export default BreadcrumbItem;