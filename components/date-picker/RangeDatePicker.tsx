import React, { Component } from 'react';
import classnames from 'classnames';

import Events from '../utils/events';
import Format from '../utils/format';
import LocaleReceiver from '../locale/LocaleReceiver';

import Dropdown from '../dropdown/index';
import RangeCalendar from '../calendar/Calendar';

import Icon from '../icon/index';

import PropsType from './PropsType';

// 比较时间大小
const compareTime = (v1, v2) => new Date(v1) > new Date(v2);

// 获取当前时间 Date 对象
const now = () => new Date();

// 获取原生 Date 对象
const getDate = (v) => v ? new Date(v) : now();

// 获取下月 1 号
const nextMonthFirstDay = (v) => {
  let date = `${v.getFullYear()}/${v.getMonth() + 2}/1`;

  if ((v.getMonth() + 2) > 12) {
    date = `${v.getFullYear() + 1}/1/1`;
  }

  return getDate(date);
};

// 获取日期的年、月、日
const getYearMonthDay = (v) => [v.getFullYear(), v.getMonth(), v.getDate()];

// 判断是否为空对象
const isEmptyArray = (arr) => Array.isArray(arr) && (arr.length === 0 || arr.every(i => !i));

//
const getValueFromSelectedValue = (v = []) => {
  if (isEmptyArray(v)) {
    return [now(), nextMonthFirstDay(now())];
  }

  const [start, end] = v.map(getDate);

  const newEnd = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    ? nextMonthFirstDay(end)
    : end;

  return [start, newEnd];
};

// 空方法
const fn = () => {};

class RangeDatePicker extends Component<PropsType, any> {
  static defaultProps = {
    isRange: false,
    isDisabled: false,
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    value: [],
    onChange: fn,
  };

  private unmounted;

  constructor(props) {
    super(props);

    this.unmounted = false;

    this.state = {
      selectedValue: props.value.map(getDate),
      current: getValueFromSelectedValue(props.value),
      isShowDropdown: false,
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        selectedValue: nextProps.value.map(getDate),
        current: getValueFromSelectedValue(nextProps.value),
      });
    }
  }

  componentWillUnmount() {
    this.unmounted = false;

    this.unbindOuterHandlers();
  }

  onSelectClick = (e) => {
    e.preventDefault();

    const disabled = 'disabled' in this.props || this.props.isDisabled;

    if (!disabled) {
      this.setDropdown(!this.state.isShowDropdown);
    }
  }

  handleLeftPanelChange = (v) => {
    const current = [...this.state.current];

    current[0] = v;

    this.setState({
      current,
    });
  }

  handleRightPanelChange = (v) => {
    const current = [...this.state.current];

    current[1] = v;

    this.setState({
      current,
    });
  }

  handleLeftDateChange = (v, _dropdown, isTime) => {
    const { selectedValue } = this.state;

    const start = getDate(v);
    const end = getDate(selectedValue[1]);

    // 同年同月，表示一个月选了两个日期
    if (!(start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear())) {
      this.handleLeftPanelChange(v);
    }

    this.handleDateChange(v, isTime, true);
  }

  handleRightDateChange = (v, _dropdown, isTime) => {
    const { selectedValue } = this.state;

    const start = getDate(selectedValue[0]);
    const end = getDate(v);

    // 同年同月，表示一个月选了两个日期
    if (!(start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear())) {
      this.handleRightPanelChange(v);
    }

    this.handleDateChange(v, isTime, false);
  }

  handleDateChange = (v, isTime, isLeft) => {
    const { selectedValue } = this.state;

    if (isTime) {
      if (isLeft) {
        this.setState({
          selectedValue: [v, selectedValue[1]],
        });
      } else {
        this.setState({
          selectedValue: [selectedValue[0], v],
        });
      }

      return;
    }

    if (selectedValue.length === 1) {
      if (compareTime(selectedValue[0], v)) {
        this.setState(
          {
            selectedValue: [v, selectedValue[0]],
          },
          () => this.handleCloseDropDownAndChangeDate(),
        );
      } else {
        this.setState(
          {
            selectedValue: [selectedValue[0], v],
          },
          () => this.handleCloseDropDownAndChangeDate(),
        );
      }
    } else {
      this.setState({
        selectedValue: [v],
      });
    }
  }

  handleCloseDropDown = () => {
    this.setDropdown(false);

    this.props.onChange([]);
  }

  handleConfirm = () => {
    this.handleCloseDropDownAndChangeDate(true);
  }

  handleCloseDropDownAndChangeDate: (isConfirm?: boolean) => void = (isConfirm) => {
    const {
      showTime,
      onChange,
      format,
    } = this.props;

    const {
      selectedValue,
    } = this.state;

    if (isConfirm || !showTime) {
      this.setDropdown(
        false,
        () => onChange(selectedValue.map((v) => Format.date(v, format))),
      );
    }
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
        isShowDropdown: isOpen,
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  }

  handleKeyup = (e) => {
    if (e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  bindOuterHandlers() {
    Events.on(document, 'keyup', this.handleKeyup);
  }

  unbindOuterHandlers() {
    Events.off(document, 'keyup', this.handleKeyup);
  }

  handleDropDownVisibleChange = (visible) => {
    const { props } = this;
    const {
      isDisabled,
    } = props;

    const disabled = 'disabled' in props || isDisabled;

    if (disabled) {
      return;
    }

    this.setState({
      isShowDropdown: visible,
    });
  }

  disabledStartMonth = (month) => {
    const { current, selectedValue } = this.state;

    const end = getDate(current[1] || selectedValue[1] || nextMonthFirstDay(now()));

    const [endYear, endMonth] = getYearMonthDay(end);

    const [_year, _month] = getYearMonthDay(getDate(month));

    if (_year < endYear) {
      return true;
    } else if (_year === endYear) {
      return _month < endMonth;
    } else {
      return false;
    }
  }

  disabledEndMonth = (month) => {
    const { current, selectedValue } = this.state;

    const start = getDate(current[0] || selectedValue[0]);

    const [startYear, startMonth] = getYearMonthDay(start);

    const [_year, _month] = getYearMonthDay(getDate(month));

    if (_year > startYear) {
      return true;
    }

    if (_year === startYear) {
      return _month > startMonth;
    }

    return false;
  }

  getStartDate = () => {
    const { current } = this.state;

    return getDate(current[0]);
  }

  getEndDate = () => {
    const { current } = this.state;

    const [start, end] = current.map(getDate);

    // 当结束时间不存在时，结束时间初始值为开始时间月份加 1
    return getDate(end || nextMonthFirstDay(start));
  }

  renderPlaceholder = () => {
    const { props } = this;
    const {
      placeholder,
      isDisabled,
      isRadius,
      size,
      style,
      value = [],
      locale,
    } = props;

    const { isShowDropdown } = this.state;

    let valueText = placeholder || locale!.placeholder;
    let hasValue = false;

    if (value.length) {
      if (typeof value !== 'string') {
        valueText = value.join(' —— ');
      }
      hasValue = true;
    }

    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = classnames('ui-select', {
      'ui-select-open': isShowDropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });

    const textCls = classnames('ui-select-text', {
      'ui-select-text-placeholder': !hasValue,
    });

    return (
      <span className={cls} style={style}>
        <span
          className="ui-select-selection"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.onSelectClick}
        >
          <span className={textCls}>{valueText}</span>
          <Icon className="ui-select-icon" type="date"/>
        </span>
      </span>
    );
  }

  render() {
    const { props } = this;
    const {
      defaultValue,
      isRadius,
      format,
      min,
      max,
      showTime,
      locale,
    } = props;

    const {
      selectedValue,
      current,
      isShowDropdown,
    } = this.state;

    const radius = 'radius' in props || isRadius;

    const startDate = this.getStartDate();
    const endDate = this.getEndDate();

    // 开始时间月份加 1 且 年份与结束时间相同时，不允许点击左日历月份加 1，不允许右日历月份减 1
    const isAllowJumpMonth = !((startDate.getMonth() + 1) === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear());

    const compRangeCalendar =
      (
        <React.Fragment>
          <div style={{ float: 'left', width: '50%' }}>
            <RangeCalendar
              isLeftCalendar
              defaultValue={defaultValue}
              selectedValue={selectedValue}
              current={current[0] || startDate}
              value={selectedValue[0] || current[0]}
              format={format}
              min={min}
              max={max}
              showTime={showTime}
              isShowPrev
              isShowNext={isAllowJumpMonth}
              disabledMonth={this.disabledStartMonth}
              onPanelChange={this.handleLeftPanelChange}
              onChange={this.handleLeftDateChange}
            />
          </div>

          <div style={{ float: 'right', width: '50%' }}>
            <RangeCalendar
              isRightCalendar
              defaultValue={defaultValue}
              selectedValue={selectedValue}
              current={current[1] || endDate}
              value={selectedValue[1] || current[1]}
              format={format}
              min={min}
              max={max}
              showTime={showTime}
              isShowPrev={isAllowJumpMonth}
              isShowNext
              disabledMonth={this.disabledEndMonth}
              onPanelChange={this.handleRightPanelChange}
              onChange={this.handleRightDateChange}
            />
          </div>
        </React.Fragment>
      );

    const timeFooter = (
      <div className="ui-range-date-picker-footer">
        <a
          className="ui-range-date-picker-footer-btn"
          href="javascript:;"
          onClick={this.handleCloseDropDown}
        >
          {locale!.clear}
        </a>

        <a
          href="javascript:;"
          onClick={this.handleConfirm}
        >
          {locale!.confirm}
        </a>
      </div>
    );

    const rangeDatePickerStyle = classnames('ui-range-date-picker', {
      'ui-range-date-time-picker': showTime,
    });

    const rangeDatePicker =
      (
        <div className={rangeDatePickerStyle}>
          <div className="ui-range-date-picker-table">
            {
              compRangeCalendar
            }
          </div>

          {
            showTime &&
            timeFooter
          }
        </div>
      );

    return (
      <Dropdown
        onVisibleChange={this.handleDropDownVisibleChange}
        overlay={rangeDatePicker}
        isRadius={radius}
        visible={isShowDropdown}
        hideOnClick={!showTime}
      >
        {this.renderPlaceholder()}
      </Dropdown>
    );
  }
}

export default LocaleReceiver(RangeDatePicker, 'Calendar');
