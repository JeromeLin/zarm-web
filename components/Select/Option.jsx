import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu';

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render() {
    const props = this.props;
    const { children, ...others } = props;

    return (
      <Menu.Item {...others} onClick={e => props.onChange(e)}>
        {children}
      </Menu.Item>
    );
  }
}

Option.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func
};

Option.defaultProps = {
  defaultChecked: false,
  isDisabled: false,
  onChange: () => {}
};

export default Option;
