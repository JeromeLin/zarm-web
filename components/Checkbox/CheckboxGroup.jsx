
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Checkbox from './Checkbox';

function getCheckedValue(children) {
  let checkedValue = [];
  React.Children.forEach(children, (checkbox) => {
    if (checkbox.props && checkbox.props.checked) {
      checkedValue.push(checkbox.props.value);
    }
  });
  return checkedValue;
}

class CheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || getCheckedValue(nextProps.children)
      });
    }
  }

  render () {    
    const props = this.props;

    const cls = classnames({
      'ui-checkbox-group'   : true,
    });

    let children = React.Children.map(props.children, (checkbox) => {
      const checked = this.state.value.indexOf(checkbox.props.value);
      console.log(this.state.value);
      return (
        <Checkbox {...checkbox.props}
          onChange={(e) => this.onCheckboxChange(e)}
          checked={this.state.value.indexOf(checkbox.props.value) > -1}>
        </Checkbox>
      );
    });

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }

  onCheckboxChange(e) {
    let value = this.state.value;
    value.push(e.target.value);

    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
}

CheckboxGroup.propTypes = {
  value        : PropTypes.arrayOf(PropTypes.string),
  defaultValue : PropTypes.arrayOf(PropTypes.string),
  onChange     : PropTypes.func,
};

CheckboxGroup.defaultProps = {
  onChange     : function () {},
};

export default CheckboxGroup;