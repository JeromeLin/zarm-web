import React, { Component } from 'react';
import classnames from 'classnames';
import Format from '../utils/format';
import Dropdown from '../dropdown';
import Calendar from '../calendar';
import Icon from '../icon';
import PropsType from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

class DatePicker extends Component<PropsType, any> {
  static defaultProps = {
    isDisabled: false,
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    showTime: false,
    onChange: () => {},
  };

  private unmounted;
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value: Format.date(props.value || props.defaultValue, props.format),
      dropdown: false,
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Format.date(nextProps.value, this.props.format),
      });
    }
  }

  componentWillUnmount() {
    this.unmounted = false;
  }

  onDateChange(value, dropdown) {
    this.setState(
      {
        value,
        dropdown,
      },
      () => {
        this.setDropdown(dropdown, () => this.props.onChange(value));
      },
    );
  }

  setDropdown(isOpen, callback?) {
    if (!this.unmounted) {
      return;
    }

    this.setState(
      {
        dropdown: isOpen,
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  }

  renderOverlay () {
    const { defaultValue, min, max, showTime, format } = this.props;
    const { value } = this.state;

    return (
      <Calendar
        defaultValue={defaultValue}
        value={value}
        format={format}
        hasFooter
        min={min}
        max={max}
        showTime={showTime}
        onChange={(value, dropdown) => this.onDateChange(value, dropdown)}
      />
    );
  }

  render() {
    const { props } = this;
    const { placeholder, isDisabled, isRadius, size, style, showTime, locale } = props;
    const { value, dropdown } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    let valueText = placeholder || locale.placeholder;
    let hasValue = false;

    if (value) {
      valueText = value;
      hasValue = true;
    }

    const cls = classnames('ui-select', {
      'ui-select-open': dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });

    const textCls = classnames('ui-select-text', {
      'ui-select-text-placeholder': !hasValue,
    });

    return (
      <Dropdown
        onVisibleChange={visible => {
          if (disabled) {
            return;
          }
          this.setState({
            dropdown: visible,
          });
        }}
        overlay={this.renderOverlay()}
        isRadius={radius}
        visible={dropdown}
        hideOnClick={!showTime}
      >
        <span className={cls} style={style}>
          <span
            className="ui-select-selection"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className={textCls}>{valueText}</span>
            <Icon className="ui-select-icon" type="date"/>
          </span>
        </span>
      </Dropdown>
    );
  }
}

export default LocaleReceiver(DatePicker, 'DatePicker');
