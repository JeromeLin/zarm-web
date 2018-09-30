import React, { Component } from 'react';
import classnames from 'classnames';
import Format from '../utils/format';
import Dropdown from '../dropdown';
import Calendar from '../calendar';
import Icon from '../icon';
import Input from '../input';
import PropsType from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

class DatePicker extends Component<PropsType, any> {
  static defaultProps = {
    isDisabled: false,
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    showTime: false,
    allowInput: false,
    onChange: () => {},
    onInputInvalidDate: () => {},
  };

  private unmounted;
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value: Format.date(props.value || props.defaultValue, props.format),
      dropdown: false,
      flag: true,
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

  onDateChange(value, dropdown, isTimeChange = false) {
    if (isTimeChange) { // hack方法 临时解决datetimePicker点击空白区域需要关闭的问题
      this.setState({
        flag: false,
      }, () => {
        setTimeout(() => {
          this.setState({
            flag: true,
          });
        });
      });
    }

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

  onInputDateValue = (e) => {
    let { target: { value } } = e;
    const { format } = this.props;

    value = Format.transform(value, format);

    if (Format.validate(value, format)) {
      if (Format.inrange(value, format)) {
        this.onDateChange(value, false);
      } else {
        this.props.onInputInvalidDate(value);
      }
    }
    this.setState({
      value,
    });
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

    const values = {
      value,
      defaultValue,
    };

    if (!Format.validate(value, format) || !Format.inrange(value, format)) {
      values.value = '';
    }

    return (
      <Calendar
        {...values}
        format={format}
        hasFooter
        min={min}
        max={max}
        showTime={showTime}
        onChange={(value, dropdown, isTimeChange) => this.onDateChange(value, dropdown, isTimeChange)}
      />
    );
  }

  render() {
    const { props } = this;
    const { placeholder, isDisabled, isRadius, size, style, locale, showTime, allowInput } = props;
    const { value, dropdown } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    let valueText = placeholder || locale!.placeholder;
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
        hideOnClick={this.state.flag}
      >
        <span className={cls} style={style}>
          <span
            className="ui-select-selection"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className={textCls}>
              {
                allowInput && !showTime ?
                <Input
                  onChange={this.onInputDateValue}
                  value={value}
                  placeholder={valueText}
                /> :
                valueText
              }
            </span>
            <Icon className="ui-select-icon" type="date"/>
          </span>
        </span>
      </Dropdown>
    );
  }
}

export default LocaleReceiver(DatePicker, 'DatePicker');
