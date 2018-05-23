import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu';

class Option extends Component {
  render() {
    const { props } = this;
    const {
      children, checked, disabled, isDisabled,
    } = props;

    const disableProps = {
      isDisabled,
    };
    if (disabled) {
      disableProps.disabled = true;
    }
    return (
      <Menu.Item
        checked={checked}
        {...disableProps}
        onClick={e => props.onChange(e)}
      >
        {children}
      </Menu.Item>
    );
  }
}

Option.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Option.defaultProps = {
  defaultChecked: false,
  isDisabled: false,
  onChange: () => {},
};

export default Option;
