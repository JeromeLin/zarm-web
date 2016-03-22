
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Dropdown from '../Dropdown';
import Calendar from '../Calendar';
import Icon from '../Icon';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value   : props.value || props.defaultValue,
      dropdown: false,
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillUnmount() {
    this.unmounted = false;
    this.unbindOuterHandlers();
  }
  
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render () {
    const props = this.props;
    const { placeholder, isDisabled, size, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    let valueText = placeholder,
        hasValue = false;

    if (this.state.value) {
      valueText = this.state.value;
      hasValue = true;
    }

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-open'    : this.state.dropdown,
      'ui-select-disabled': disabled,
      [`size-${size}`]    : !!size,
    });

    const textCls = classnames({
      'ui-select-text'            : true,
      'ui-select-text-placeholder': !hasValue,
    });

    return (
      <span className={cls} {...others}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onClick={(e) => this.onSelectClick(e)}>
          <span className={textCls}>{valueText}</span>
          <span className="ui-select-icon">
            <Icon type="date" />
          </span>
        </span>
        <Dropdown visible={this.state.dropdown}>
          <Calendar onChange={(value) => this.onDateChange(value)} />
        </Dropdown>
      </span>
    );
  }

  onSelectClick(e) {
    e.preventDefault();
    const disabled = 'disabled' in this.props || this.props.isDisabled;
    !disabled && this.setDropdown(!this.state.dropdown);
  }

  onDateChange(value) {
    this.setState({
      value: value,
    }, () => {
      this.setDropdown(false, this.props.onChange(value));
    });
  }

  setDropdown(isOpen, callback) {
    if (!this.unmounted) return;
    
    if (isOpen) {
      this.bindOuterHandlers();
    } else {
      this.unbindOuterHandlers();
    }

    this.setState({
      dropdown: isOpen
    }, () => {
      callback && callback();
    });
  }

  handleKeyup(e) {
    (e.keyCode === 27) && this.setDropdown(false);
  }

  handleOuterClick(e) {
    if (!this.unmounted || isNodeInTree(e.target, ReactDOM.findDOMNode(this))) {
      return false;
    }
    this.setDropdown(false);
  }

  bindOuterHandlers() {
    Events.on(document, 'click', (e) => this.handleOuterClick(e));
    Events.on(document, 'keyup', (e) => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'click', (e) => this.handleOuterClick(e));
    Events.off(document, 'keyup', (e) => this.handleKeyup(e));
  }
}

DatePicker.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

DatePicker.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : function () {},
};

export default DatePicker;