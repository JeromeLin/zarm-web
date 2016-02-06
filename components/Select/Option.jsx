
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Option extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render () {
    const props = this.props;
    const { value, checked, isDisabled, className, children, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-select-dropdown': true,
    });

    const inputDisabled = disabled
                        ? 'disabled'
                        : null;

    return <li onClick={(e) => this._onClick(e)} disabled={inputDisabled} {...others}>{value}</li>;
  }

  _onClick(e) {
    this.setState({
      checked: true
    });
    this.props.onChange(e);
  }
}

Option.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Option.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : function () {},
};

export default Option;