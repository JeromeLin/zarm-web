import React, { Component } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Format from '../utils/format';
import Dropdown from '../Dropdown';
import Calendar from '../Calendar';
import Icon from '../Icon';
import PropsType from './PropsType';

class DatePicker extends Component<PropsType, any> {
  static defaultProps = {
    isDisabled: false,
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    onChange: () => { },
  };

  private unmounted;
  private select;

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
    this.unbindOuterHandlers();
  }

  onSelectClick(e) {
    e.preventDefault();
    const disabled = 'disabled' in this.props || this.props.isDisabled;
    if (!disabled) {
      this.setDropdown(!this.state.dropdown);
    }
  }

  onDateChange(value) {
    this.setState(
      {
        value,
      },
      () => {
        this.setDropdown(false, () => this.props.onChange(value));
      },
    );
  }

  setDropdown(isOpen, callback?) {
    if (!this.unmounted) {
      return;
    }

    if (isOpen) {
      this.bindOuterHandlers();
    } else {
      this.unbindOuterHandlers();
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

  handleKeyup(e) {
    if (e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  handleOuterClick(e) {
    if (!this.unmounted || isNodeInTree(e.target, this.select)) {
      return;
    }
    this.setDropdown(false);
  }

  bindOuterHandlers() {
    Events.on(document, 'click', e => this.handleOuterClick(e));
    Events.on(document, 'keyup', e => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'click', e => this.handleOuterClick(e));
    Events.off(document, 'keyup', e => this.handleKeyup(e));
  }

  render() {
    const { props } = this;
    const {
      defaultValue,
      placeholder,
      isDisabled,
      isRadius,
      size,
      format,
      min,
      max,
      style,
    } = props;
    const { value, dropdown } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    let valueText = placeholder;
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
        onVisibleChange={(visible) => {
          this.setState({
            dropdown: visible,
          });
        }}
        overlay={<Calendar
          defaultValue={defaultValue}
          value={value}
          format={format}
          hasFooter
          min={min}
          max={max}
          // tslint:disable-next-line:no-shadowed-variable
          onChange={value => this.onDateChange(value)}
        />}
        isRadius={radius}
        visible={dropdown}
      >
        <span className={cls} style={style} ref={(ele) => { this.select = ele; }}>
          <span
            className="ui-select-selection"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={e => this.onSelectClick(e)}
          >
            <span className={textCls}>{valueText}</span>
            <Icon className="ui-select-icon" type="date" />
          </span>
        </span>
      </Dropdown>
    );
  }
}

export default DatePicker;
