import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Form extends Component {
  render() {
    const {
      type, className, children, style
    } = this.props;

    const cls = classnames({
      'ui-form': true,
      [`ui-form-${type}`]: 'type' in this.props,
      [className]: !!className
    });

    return (
      <form className={cls} style={style}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'inline']),
  className: PropTypes.string
};

Form.defaultProps = {
  type: 'horizontal',
  className: null
};

export default Form;
