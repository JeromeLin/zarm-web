import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Breadcrumb extends Component {
  render() {
    const {
      className, separator, children, style
    } = this.props;

    const cls = classnames({
      'ui-breadcrumb': true,
      [className]: !!className
    });

    // eslint-disable-next-line
    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        separator,
        key: index
      });
    });

    return (
      <div className={cls} style={style}>
        {items}
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  separator: PropTypes.string,
};

Breadcrumb.defaultProps = {
  separator: '/'
};

export default Breadcrumb;
