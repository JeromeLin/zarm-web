
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Format from '../utils/Format';
import Dropdown from '../Dropdown';
import Calendar from '../Calendar';
import Icon from '../Icon';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value   : Format.date(props.value || props.defaultValue, props.format),
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
        value: Format.date(nextProps.value, this.props.format),
      });
    }
  }

  render () {
    const props = this.props;
    const { defaultValue, placeholder, isDisabled, isRadius, size, format, ...others } = props;
    const { value, dropdown } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    let valueText = placeholder,
        hasValue = false;

    if (value) {
      valueText = value;
      hasValue = true;
    }

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-open'    : dropdown,
      'disabled'          : disabled,
      'radius'            : radius,
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
          <Icon className="ui-select-icon" type="date" />
        </span>
        <Dropdown isRadius={radius} visible={dropdown}>
          <Calendar defaultValue={defaultValue} value={value} format={format} hasFooter={true} onChange={(value) => this.onDateChange(value)} />
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
  isDisabled    : PropTypes.bool,
  format        : PropTypes.string,
  onChange      : PropTypes.func,
};

DatePicker.defaultProps = {
  isDisabled    : false,
  format        : 'yyyy-MM-dd',
  onChange      : () => {},
};

export default DatePicker;