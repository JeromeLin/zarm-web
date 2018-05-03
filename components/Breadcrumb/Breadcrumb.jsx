
import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';

class Breadcrumb extends Component {

  render () { 
    const { className, separator, children, ...others } = this.props;

    const cls = classnames({
      'ui-breadcrumb'    : true,
      [className]        : !!className,
    });

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        separator,
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

Breadcrumb.propTypes = {
  // separator     : PropTypes.string,
};

Breadcrumb.defaultProps = {
  separator     : '/',
};

export default Breadcrumb;