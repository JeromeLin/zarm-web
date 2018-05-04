import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckboxGroup extends Component {
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

    let children = React.Children.map(props.children, checkbox => (
      <Checkbox
        {...checkbox.props}
        onChange={e => this.onCheckboxChange(e)}
        checked={!!(this.state.value.indexOf(checkbox.props.value) > -1)}
      />
    ));

    return <div className="ui-checkbox-group">{children}</div>;
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    let checkedValue = [];
    React.Children.forEach(children, (checkbox) => {
      if (checkbox.props && checkbox.props.checked) {
        checkedValue.push(checkbox.props.value);
      }
    });
    return checkedValue;
  }

  onCheckboxChange(e) {
    let { value } = this.state;
    let index = value.indexOf(e.target.value);

    if (index < 0) {
      value.push(e.target.value);
    } else {
      value.splice(index, 1);
    }

    this.setState({
      value
    });
    this.props.onChange(value);
  }
}

CheckboxGroup.propTypes = {
  onChange: PropTypes.func
};

CheckboxGroup.defaultProps = {
  onChange: () => {}
};

export default CheckboxGroup;
