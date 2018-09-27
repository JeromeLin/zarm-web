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
  locale: { clear: string, confirm: string };
  localeCode: string;
  dropdownStyle?: React.CSSProperties;
  placement?: placement;
  onChange?: (value: any) => void;
}

class TimePicker extends Component<TimePickerProps, any> {
  static defaultProps = {
    onChange: () => {},
  };

  private unmounted: boolean;
  private dropdownEl: React.ReactNode;

  constructor (props) {
    super(props);
    const value = props.value || props.defaultValue;
    this.unmounted = false;
    this.state = {
      value,
      dropdown: false,
    };
  }

  componentDidMount () {
    this.unmounted = true;
  }

  componentWillReceiveProps (nextProps: TimePickerProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  onDateChange (value) {
    if (value.indexOf('undefined') > -1) { return; }
    this.setState({
      value,
    }, () => {
      this.setDropdown(!!value, this.props.onChange);
    });
  }

  setDropdown (isOpen, callback?) {
    if (!this.unmounted) { return; }

    this.setState({
      dropdown: isOpen,
    }, () => {
      if (callback) {
        callback(this.state.value);
      }
    });
  }

  isNodeInTree (node, tree) {
    while (node) {
      if (node === tree) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }

  onVisibleChange = visible => {
    this.setState({
      dropdown: visible,
    });
  }

  onConfirmBtn () {
    this.setDropdown(false, this.props.onChange);
  }

  render () {
    const {
      defaultValue, placeholder, isDisabled, isRadius, size, locale,
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
      'ui-select': true,
      'ui-time-select-wrapper': true,
      'ui-select-open': dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });
    const textCls = classnames({
      'ui-select-text': true,
      'ui-select-text-placeholder': !hasValue,
    });

    const overlay = (
      <Fragment>
        <TimeSelect
          value={valueText}
          onChange={(value) => this.onDateChange(value)}
        />
        <div className="ui-select-bottom">
          <a className="clear-btn" href="javascript:;" onClick={() => this.onDateChange('')}>
            {locale.clear}
          </a>
          <a className="confirm-btn" href="javascript:;" onClick={() => this.onConfirmBtn()}>
            {locale.confirm}
          </a>
        </div>
      </Fragment>
    );

    return (
      <div className={cls} style={this.props.style} {...others}>
        <Dropdown
          ref={el => this.dropdownEl = el}
          visible={dropdown}
          disabled={disabled}
          style={{ width: 240, ...dropdownStyle }}
          zIndex={2020}
          onVisibleChange={this.onVisibleChange}
          overlay={overlay}
          placement={placement}
        >
          <div
            className="ui-select-selection"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className={textCls}>{valueText}</span>
            <Icon className="ui-time-select-icon" type="time-circle"/>
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default LocaleReceiver(TimePicker, 'TimePicker');
