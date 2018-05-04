import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getCheckedValue(props.children)
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children)
      });
    }
  }

  render() {
    const { props } = this;

    let children = React.Children.map(props.children, radio => (
      <Radio
        {...radio.props}
        onChange={e => this.onRadioChange(e)}
        checked={this.state.value == radio.props.value} // eslint-disable-line
      />
    ));

    return <div className="ui-radio-group">{children}</div>;
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (radio) => {
      if (radio.props && radio.props.checked) {
        checkedValue = radio.props.value;
      }
    });
    return checkedValue;
  }

  onRadioChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }
}

RadioGroup.propTypes = {
  onChange: PropTypes.func
};

RadioGroup.defaultProps = {
  onChange: () => {}
};

export default RadioGroup;
