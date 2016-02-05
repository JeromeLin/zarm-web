
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Form extends Component {

  render () { 
    const { type, className, children } = this.props;

    const cls = classnames({
      'ui-form'           : true,
      ['ui-form-' + type]   : true,
      [className]        : className,
    });

    return (
      <form className={cls}>
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
  type      : 'horizontal',
  className : null,
};

export default Form;