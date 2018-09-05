import React, { Component } from 'react';
import classnames from 'classnames';

import Format from '../utils/format';

import Button from '../button';
import TimePicker from '../time-picker';
import LocaleReceiver from '../locale/LocaleReceiver';

import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';
import CalendarMonthTable from './CalendarMonthTable';
import CalendarYearTable from './CalendarYearTable';

import PropsType from './PropsType';

class Calendar extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    isShowPrev: true,
    isShowNext: true,
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      current: Format.date(
        props.current || props.value || props.defaultValue || new Date(),
        'yyyy/M/d',
      ),
      value: Format.date(props.value || props.defaultValue, props.format),
      panel: 'date',

      showTime: false,
      timeValue: '00:00:00',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Format.date(nextProps.value, 'yyyy/M/d'),
        current: Format.date(
          nextProps.current || nextProps.value || nextProps.defaultValue || new Date(),
          'yyyy/M/d',
        ),
        panel: 'date',
      });
    }
  }

  handleChangeHeader = (current) => {
    const { onPanelChange } = this.props;

    if (typeof onPanelChange === 'function') {
      onPanelChange(current);
    }

    this.setState({ current });
  }

  handleChangeYearOrMonth = (current) => {
    const { onPanelChange } = this.props;

    if (typeof onPanelChange === 'function') {
      onPanelChange(current);
    }

    this.setState({
      current,
      panel: 'date',
    });
  }

  onDateClick (value, isNow = false) {
    const { format, onChange, showTime } = this.props;
    let dropdownStatus = false;

    if (!showTime) {
      dropdownStatus = false;
    } else {
      dropdownStatus = !isNow;
      isNow ? value = value : value = `${value} ${this.state.timeValue}`;
    }

    this.setState({
      value,
      current: value,
      timeValue: showTime && value && String(Format.date(value, format)).split(' ')[1],
    });

    if (onChange) {
      onChange(Format.date(value, format), dropdownStatus);
    }
  }

  onConfirmClick (value) {
    const valueWithTime = (value && `${value} ${this.state.timeValue}`) || '';
    const { format, onChange } = this.props;

    if (onChange) {
      onChange(Format.date(valueWithTime, format), false);
    }
  }

  onTimeChange (timeValue) {
    const { format } = this.props;
    const { value } = this.state;

    if (!value) { // 判断先选择time的情况
      this.setState({ value: String(Format.date(new Date(), format)).split(' ')[0] } , () => {
        this.setValue(this.state.value, timeValue);
      });
    } else {
      this.setValue(value, timeValue);
    }
  }

  setValue (value, timeValue) {
    const {
      format,
      onChange,
    } = this.props;

    this.setState({
      timeValue,
      value: value,
      current: `${value} ${timeValue}`,
    });

    if (onChange) {
      onChange(Format.date(`${value} ${timeValue}`, format), true, true);
    }
  }

  getDisplayDate = () => {
    const {
      selectedValue = [],
      isLeftCalendar,
      isRightCalendar,
      locale,
    } = this.props;

    const { current } = this.state;

    if (isLeftCalendar) {
      if (selectedValue[0]) {
        return Format.date(selectedValue[0], 'yyyy-MM-dd');
      }

      return locale.start_date;
    }

    if (isRightCalendar) {
      if (selectedValue[1]) {
        return Format.date(selectedValue[1], 'yyyy-MM-dd');
      }

      return locale.end_date;
    }

    return Format.date(current, 'yyyy-MM-dd');
  }

  render() {
    const { props } = this;
    const {
      className,
      hasFooter,
      min,
      max,
      style,
      prefixCls,
      locale,
      showTime,
      isShowPrev,
      isShowNext,
      selectedValue,
      disabledMonth,
    } = props;

    const { current, value, panel } = this.state;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
      [`${prefixCls}-showTime`]: !!showTime,
    });

    return (
      <div className={cls} style={style}>
        {
          showTime &&
          <div className="ui-calendar-time-header">
            {
              this.getDisplayDate()
            }

            <TimePicker
              placement="bottomRight"
              value={this.state.timeValue}
              onChange={(value) => {
                this.onTimeChange(value);
              }}
            />
          </div>
        }

        <CalendarHeader
          panel={panel}
          current={current}
          isShowPrev={isShowPrev}
          isShowNext={isShowNext}
          // tslint:disable-next-line:no-shadowed-variable
          onChange={this.handleChangeHeader}
          // tslint:disable-next-line:no-shadowed-variable
          onChangePanel={panel => this.setState({ panel })}
        />

        <div className={`${prefixCls}-body`}>
          <CalendarYearTable
            visible={panel !== 'year'}
            value={value}
            current={current}
            // tslint:disable-next-line:no-shadowed-variable
            onYearClick={this.handleChangeYearOrMonth}
          />

          <CalendarMonthTable
            visible={panel !== 'month'}
            value={value}
            current={current}
            disabledMonth={disabledMonth}
            // tslint:disable-next-line:no-shadowed-variable
            onMonthClick={this.handleChangeYearOrMonth}
          />

          <CalendarDateTable
            visible={panel !== 'date'}
            value={value}
            current={current}
            min={min}
            max={max}
            selectedValue={selectedValue}
            // tslint:disable-next-line:no-shadowed-variable
            onDateClick={value => this.onDateClick(value)}
          />
        </div>
        {
          // tslint:disable-next-line:jsx-no-multiline-js
          (hasFooter && panel === 'date') ? (
          <div className={`${prefixCls}-footer`}>
            <a
              href="javascript:;"
              onClick={() => this.onDateClick(new Date(), true)}
              className={`${prefixCls}-footer-btn`}
            >
              {showTime ? locale.now : locale.today}
            </a>

            <a
              href="javascript:;"
              onClick={() => this.onDateClick('', true)}
              className={`${prefixCls}-footer-btn`}
            >
              {locale.clear}
            </a>

            {
              showTime && (
                <Button
                  radius
                  theme="info"
                  size="xs"
                  style={{ float: 'right' }}
                  onClick={() => this.onConfirmClick(value)}
                  className={`${prefixCls}-footer-btn`}
                >
                  {locale.confirm}
                </Button>
              )
            }
          </div>
        ) : null}
      </div>
    );
  }
}

export default LocaleReceiver(Calendar, 'Calendar');
