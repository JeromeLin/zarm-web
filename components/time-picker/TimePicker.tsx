import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import Dropdown from '../dropdown';
import Icon from '../icon';
import TimeSelect from './TimeSelect';
import LocaleReceiver from '../locale/LocaleReceiver';

type placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

export interface TimePickerProps {
  value?: any;
  defaultValue?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRadius?: string;
  size?: any;
  style?: React.CSSProperties;
  locale?: { clear: string; confirm: string };
  localeCode?: string;
  dropdownStyle?: React.CSSProperties;
  placement?: placement;
  onChange?: (value: any) => void;
}

class TimePicker extends Component<TimePickerProps, any> {
  static defaultProps = {
    onChange: () => {},
    isRadius: true,
  };

  private unmounted: boolean;

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    this.unmounted = false;
    this.state = {
      value,
      dropdown: false,
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps: TimePickerProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  onDateChange(value) {
    const { onChange } = this.props;
    if (value.indexOf('undefined') > -1) { return; }
    this.setState({
      value,
    }, () => {
      this.setDropdown(!!value, onChange);
    });
  }

  onVisibleChange = (visible) => {
    this.setState({
      dropdown: visible,
    });
  };

  onConfirmBtn() {
    const { onChange } = this.props;
    this.setDropdown(false, onChange);
  }

  setDropdown(isOpen, callback?) {
    if (!this.unmounted) { return; }
    const { value } = this.state;
    this.setState({
      dropdown: isOpen,
    }, () => {
      if (callback) {
        callback(value);
      }
    });
  }

  render() {
    const {
      defaultValue, placeholder, isDisabled, isRadius, size, locale, style,
      localeCode, dropdownStyle, placement, onChange, ...others
    } = this.props;
    const { value, dropdown } = this.state;
    const disabled = 'disabled' in this.props || isDisabled;
    const radius = 'radius' in this.props || isRadius;

    let valueText = placeholder || '00:00:00';
    let hasValue = false;

    if (value) {
      valueText = value;
      hasValue = true;
    }

    const cls = classnames({
      'za-select': true,
      'za-time__select-wrapper': true,
      'za-select--open': dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });
    const textCls = classnames({
      'za-select__text': true,
      'za-select__text-placeholder': !hasValue,
    });

    const overlay = (
      <Fragment>
        <TimeSelect
          value={valueText}
          onChange={value1 => this.onDateChange(value1)}
        />
        <div className="za-select__bottom">
          <span className="clear-btn" onClick={() => this.onDateChange('')}>
            {locale!.clear}
          </span>
          <span className="confirm-btn" onClick={() => this.onConfirmBtn()}>
            {locale!.confirm}
          </span>
        </div>
      </Fragment>
    );

    return (
      <div className={cls} style={style} {...others}>
        <Dropdown
          visible={dropdown}
          disabled={disabled}
          style={{ width: 240, ...dropdownStyle }}
          zIndex={2020}
          onVisibleChange={this.onVisibleChange}
          overlay={overlay}
          placement={placement}
        >
          <div
            className="za-select__selection"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className={textCls}>{valueText}</span>
            <Icon className="za-time__select-icon" type="time-circle" />
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default LocaleReceiver('TimePicker')(TimePicker);
