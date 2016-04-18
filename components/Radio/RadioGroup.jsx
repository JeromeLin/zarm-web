
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Radio from './Radio';

class RadioGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children),
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
    const props = this.props;

    let children = React.Children.map(props.children, (radio) => {
      return (
        <Radio {...radio.props}
          onChange={(e) => this.onRadioChange(e)}
          checked={this.state.value === radio.props.value}>
        </Radio>
      );
    });

    return (
      <div className="ui-radio-group">
        {children}
      </div>
    );
  }

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
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  onChange: () => {},
};

export default RadioGroup;