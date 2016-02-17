
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as Events from '../utils/events';
import Option from './Option';
import Menu from '../Menu';
import Icon from '../Icon';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value   : props.value || props.defaultValue || this.getCheckedValue(props.children),
      dropdown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children)
      });
    }
  }

  render () {
    const props = this.props;
    const { isDisabled, ...others } = props;

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-open'    : this.state.dropdown,
      'ui-select-disabled': ('disabled' in props || isDisabled),
    });

    const dropdownCls = classnames({
      'ui-select-dropdown'       : true,
      'ui-select-dropdown-hidden': !this.state.dropdown,
    });

    let valueText;

    let children = React.Children.map(props.children, (option, index) => {
      if (this.state.value == option.props.value) {
        valueText = option.props.children;
      }

      return (
        <Option
          {...option.props}
          onChange={(e) => this.onOptionChange(e, option.props, index)}
          checked={this.state.value === option.props.value} />
      );
    });

    return (
      <span className={cls} {...others}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onClick={(e) => this.onSelectClick(e)}>
          <span className="ui-select-text">{valueText}</span>
          <span className="ui-select-arrow">
            <Icon type="unfold" />
          </span>
        </span>
        <div className={dropdownCls}>
          <Menu>
            {children}
          </Menu>
        </div>
      </span>
    );
  }

  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (option) => {
      if (option.props && option.props.checked) {
        checkedValue = option.props.value;
      }
    });
    return checkedValue;
  }

  onClose() {
    this.setState({
      dropdown: false,
    });

    Events.off(document.body, 'click', () => this.onClose());
  }

  onSelectClick(e) {
    e.preventDefault();

    this.setState({
      dropdown: !this.state.dropdown,
    });

    Events.on(document.body, 'click', () => this.onClose());
  }

  onOptionChange(e, props, index) {
    e.preventDefault();
    if (this.state.value === props.value) return;

    this.setState({
      value: props.value,
    });

    const selected = {
      index: index,
      value: props.value,
      text : props.children,
    }

    this.props.onChange(selected);
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