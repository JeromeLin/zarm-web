
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Form extends Component {

  render () { 
    const { type, className, children, ...others } = this.props;

    const cls = classnames({
      'ui-form'          : true,
      'row'              : true,
      [`ui-form-${type}`]: ('type' in this.props),
      [className]        : !!className,
    });

    return (
      <form className={cls} {...others}>
        {children}
      </form>
    );
  }

}

Form.propTypes = {
  type      : PropTypes.oneOf(['horizontal', 'inline']),
  className : PropTypes.string,
};

Form.defaultProps = {
  className : null,
};

export default Form;