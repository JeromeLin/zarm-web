
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as Events from '../utils/events';
import Option from './Option';
import Dropdown from '../Dropdown';
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
    const { placeholder, isDisabled, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    let valueText = placeholder,
        hasValue = false;

    let children = React.Children.map(props.children, (option, index) => {
      if (this.state.value == option.props.value) {
        valueText = option.props.children;
        hasValue = true;
      }

      return (
        <Option
          {...option.props}
          onChange={(e) => this.onOptionChange(e, option.props, index)}
          checked={this.state.value === option.props.value} />
      );
    });

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-open'    : this.state.dropdown,
      'ui-select-disabled': disabled,
    });

    const textCls = classnames({
      'ui-select-text'            : true,
      'ui-select-text-placeholder': !hasValue,
    });

    return (
      <span className={cls} {...others}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onClick={(e) => !disabled && this.onSelectClick(e)}>
          <span className={textCls}>{valueText}</span>
          <span className="ui-select-arrow">
            <Icon type="unfold" />
          </span>
        </span>
        <Dropdown visible={this.state.dropdown} style={{position: 'absolute', left: 0, top: 36}}>
          <Menu>
            {children}
          </Menu>
        </Dropdown>
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
    console.log('close');

    this.setState({
      dropdown: false,
    });
    Events.off(document, 'click', () => this.onClose());
  }

  onSelectClick(e) {
    console.log('open');
    
    this.setState({
      dropdown: !this.state.dropdown,
    });
    Events.on(document, 'click', () => this.onClose());
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