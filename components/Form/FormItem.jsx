
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class FormItem extends Component {

  render () {
    const props = this.props;
    const { id, label, help, status, className, children } = props;

    const cls = classnames({
      'ui-form-item': true,
      [className]   : !!className,
    });

    const controlCls = classnames({
      'ui-form-item-control': true,
      'has-error'           : (status == 'error'),
    });

    return (
      <div className={cls}>
        {this._renderLabel()}
        <div className={controlCls} style={{width: '75%'}}>
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

FormItem.propTypes = {
  status: PropTypes.oneOf(['success', 'warning', 'error', 'validating']),
};

// FormItem.defaultProps = {
// };

export default FormItem;