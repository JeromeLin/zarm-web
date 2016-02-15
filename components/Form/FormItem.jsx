
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class FormItem extends Component {

  render () {
    const props = this.props;
    const { id, label, help, className, children } = props;

    const cls = classnames({
      'ui-form-item'      : true,
      [className]         : !!className,
    });

    return (
      <div className={cls}>
        {this._renderLabel()}
        <div className="ui-form-item-control" style={{width: '70%'}}>
          {children}
          <div className="ui-form-explain">{help}</div>
        </div>
      </div>
    );
  }

  _getId() {
    return this.props.children.props && this.props.children.props.id;
  }

  _renderLabel() {
    const { id, label } = this.props;

    return label ? (
      <label htmlFor={id || this._getId()} style={{width: '25%'}}>
        {label}
      </label>
    ) : null;
  }
}

export default FormItem;