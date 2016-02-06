
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Option from './Option';
import Icon from '../Icon';

function getCheckedValue(children) {
  let checkedValue = null;
  React.Children.forEach(children, (option) => {
    if (option.props && option.props.checked) {
      checkedValue = option.props.value;
    }
  });
  return checkedValue;
}

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value   : props.value || props.defaultValue || getCheckedValue(props.children),
      dropdown: true,
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
    const { value, isDisabled, ...others } = props;

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-disabled': ('disabled' in props || isDisabled),
    });

    const dropdownCls = classnames({
      'ui-select-dropdown'       : true,
      'ui-select-dropdown-hidden': this.state.dropdown,
    });

    let children = React.Children.map(props.children, (option) => {
      return (
        <Option {...option.props}
          onChange={(e) => this.onOptionChange(e)}
          checked={this.state.value === option.props.value}>
        </Option>
      );
    });

    return (
      <span className="ui-select" {...others} onClick={() => this.onSelectClick()}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">
          <span className="ui-select-text">{value}</span>
          <span className="ui-select-arrow">
            <Icon type="unfold" />
          </span>
        </span>
        <div className={dropdownCls}>
          <ul>
            {children}
          </ul>
        </div>
      </span>
    );
  }

  onSelectClick() {
    this.setState({
      dropdown: !this.state.dropdown,
    });
  }

  onOptionChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }
}

Select.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Select.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : function () {},
};

export default Select;