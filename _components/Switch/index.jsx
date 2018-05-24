import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
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
    const { props } = this;
    const {
      size, isCheckedText, unCheckedText, isDisabled, style
    } = props;
    const { value } = this.state;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-switch': true,
      checked: value,
      disabled,
      [`size-${size}`]: !!size
    });

    return (
      <span
        className={cls}
        onClick={() => !disabled && this._onClick()}
        style={style}
      >
        <span className="ui-switch-inner">
          {value ? isCheckedText : unCheckedText}
        </span>
      </span>
    );
  }

  _onClick() {
    const value = !this.state.value;
    this.setState({
      value
    });
    this.props.onChange(value);
  }
}

Switch.propTypes = {
  size: PropTypes.oneOf(['sm']),
  value: PropTypes.bool,
  defaultValue: PropTypes.bool,
  isCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange: PropTypes.func
};

Switch.defaultProps = {
  size: null,
  value: false,
  defaultValue: false,
  isCheckedText: '',
  unCheckedText: '',
  onChange: () => {}
};

export default Switch;
