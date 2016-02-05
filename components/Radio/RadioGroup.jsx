
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Radio from './Radio';

function getCheckedValue(children) {
  let checkedValue = null;
  React.Children.forEach(children, (radio) => {
    if (radio.props && radio.props.checked) {
      checkedValue = radio.props.value;
    }
  });
  return checkedValue;
}

class RadioGroup extends Component {

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
      'ui-radio-group'   : true,
    });

    let children = React.Children.map(props.children, (radio) => {
      return <Radio
        {...radio.props}
        onChange={(e) => this.onRadioChange(e)}
        checked={this.state.value === radio.props.value}
      />
    });

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }

  onRadioChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }
}

RadioGroup.propTypes = {
  value        : PropTypes.string,
  defaultValue : PropTypes.string,
  onChange     : PropTypes.func,
};

RadioGroup.defaultProps = {
  onChange     : function () {},
};

export default RadioGroup;