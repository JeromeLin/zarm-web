
import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';

class Breadcrumb extends Component {

  render () { 
    const { className, separator, children, ...others } = this.props;

    const cls = classnames({
      'ui-breadcrumb'    : true,
      [className]        : !!className,
    });

    const itemSeparator = ('separator' in this.props) ? separator : null;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        itemSeparator,
        key: index,
      });
    });

    return (
      <div {...others} className={cls}>
        {items}
      </div>
    );
  }

}

export default Breadcrumb;