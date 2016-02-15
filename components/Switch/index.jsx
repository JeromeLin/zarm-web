
import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: !!nextProps.value
      });
    }
  }

  render() {
    const { size, isCheckedText, unCheckedText, ...others } = this.props;
    const { value } = this.state;

    const cls = classnames({
      'ui-switch'        : true,
      ['size-' + size]   : size,
      'ui-switch-checked': value,
    });

    return (
      <span className={cls} onClick={() => this._onClick()} {...others}>
        <span className="ui-switch-inner">{ value ? isCheckedText : unCheckedText }</span>
      </span>
    );
  }

  _onClick() {
    const value = !this.state.value;
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
}

Switch.propTypes = {
  size         : PropTypes.oneOf(['sm']),
  value        : PropTypes.bool,
  defaultValue : PropTypes.bool,
  isCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange     : PropTypes.func,
};

Switch.defaultProps = {
  size         : null,
  defaultValue : false,
  isCheckedText: '',
  unCheckedText: '',
  onChange     : function () {},
};

export default Switch;