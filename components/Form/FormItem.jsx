
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class FormItem extends Component {

  render () {
    const props = this.props;
    const { id, label, className, children } = props;

    const cls = classnames({
      'ui-form-item'     : true,
      [className]        : className,
    });

    return (
      <div className={cls}>
        {this._renderLabel()}
        {children}
      </div>
    );
  }

  _getId() {
    return this.props.children.props && this.props.children.props.id;
  }

  _renderLabel() {
    const { id, label } = this.props;

    return label ? (
      <label htmlFor={id || this._getId()} style={{width: '30%'}}>
        {label}
      </label>
    ) : null;
  }
}

FormItem.propTypes = {
  className : PropTypes.string,
};

FormItem.defaultProps = {
  className : null,
};

export default FormItem;