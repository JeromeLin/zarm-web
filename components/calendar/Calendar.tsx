import React, { Component } from 'react';
import classnames from 'classnames';
import { FormItemContext } from '../form/createContext';
import Format from '../utils/format';
import { isEmpty } from '../utils';
import Button from '../button';
import TimePicker from '../time-picker';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';
import CalendarMonthTable from './CalendarMonthTable';
import CalendarYearTable from './CalendarYearTable';

import PropsType from './PropsType';

class Calendar extends Component<PropsType, any> {
  static contextType = FormItemContext;

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

  onDateClick(value, isNow = false) {
    const { format, onChange, showTime } = this.props;
    const { timeValue } = this.state;
    const { handleFieldChange } = this.context;
    let dropdownStatus = false;

    if (!isEmpty(this.context)) {
      handleFieldChange();
    }
    if (!showTime) {
      dropdownStatus = false;
    } else {
      dropdownStatus = !isNow;
      if (!isNow) {
        value = `${value} ${timeValue}`;
      }
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

  onConfirmClick(value) {
    const { format, onChange } = this.props;
    const { timeValue } = this.state;
    const valueWithTime = (value && `${value} ${timeValue}`) || '';

    if (onChange) {
      onChange(Format.date(valueWithTime, format), false);
    }
  }

  onTimeChange(timeValue) {
    const { format } = this.props;
    const { value } = this.state;

    if (!value) { // 判断先选择time的情况
      this.setState({ value: String(Format.date(new Date(), format)).split(' ')[0] }, () => {
        this.setValue(value, timeValue);
      });
    } else {
      this.setValue(value, timeValue);
    }
  }

  setValue(value, timeValue) {
    const {
      format,
      onChange,
    } = this.props;

    this.setState({
      timeValue,
      value,
      current: `${value} ${timeValue}`,
    });

    if (onChange) {
      onChange(Format.date(`${value} ${timeValue}`, format), true, true);
    }
  }

  handleChangeHeader = (current) => {
    const { onPanelChange } = this.props;

    if (typeof onPanelChange === 'function') {
      onPanelChange(current);
    }

    this.setState({ current });
  };

  handleChangeYearOrMonth = (current) => {
    const { onPanelChange } = this.props;

    if (typeof onPanelChange === 'function') {
      onPanelChange(current);
    }

    this.setState({
      current,
      panel: 'date',
    });
  };

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

      return locale!.start_date;
    }

    if (isRightCalendar) {
      if (selectedValue[1]) {
        return Format.date(selectedValue[1], 'yyyy-MM-dd');
      }

      return locale!.end_date;
    }

    return Format.date(current, 'yyyy-MM-dd');
  };

  render() {
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
    } = this.props;
    const { current, value, panel, timeValue } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-showTime`]: showTime,
    });

    return (
      <div className={cls} style={style}>
        {
          showTime && (
            <div className="ui-calendar-time-header">
              {this.getDisplayDate()}
              <TimePicker
                placement="bottomRight"
                value={timeValue}
                onChange={(timeValueInner) => {
                  this.onTimeChange(timeValueInner);
                }}
              />
            </div>
          )
        }

        <CalendarHeader
          panel={panel}
          current={current}
          isShowPrev={isShowPrev}
          isShowNext={isShowNext}
          onChange={this.handleChangeHeader}
          onChangePanel={(panelInner) => this.setState({ panel: panelInner })}
        />

        <div className={`${prefixCls}-body`}>
          <CalendarYearTable
            visible={panel !== 'year'}
            value={value}
            current={current}
            onYearClick={this.handleChangeYearOrMonth}
          />

          <CalendarMonthTable
            visible={panel !== 'month'}
            value={value}
            current={current}
            disabledMonth={disabledMonth}
            onMonthClick={this.handleChangeYearOrMonth}
          />

          <CalendarDateTable
            visible={panel !== 'date'}
            value={value}
            current={current}
            min={min}
            max={max}
            selectedValue={selectedValue}
            onDateClick={(calendarValue) => this.onDateClick(calendarValue)}
          />
        </div>
        {
          (hasFooter && panel === 'date') ? (
            <div className={`${prefixCls}-footer`}>
              <span
                onClick={() => this.onDateClick(new Date(), true)}
                className={`${prefixCls}-footer-btn`}
              >
                {showTime ? locale!.now : locale!.today}
              </span>

              <span
                onClick={() => this.onDateClick('', true)}
                className={`${prefixCls}-footer-btn`}
              >
                {locale!.clear}
              </span>

              {
              showTime && (
                <Button
                  theme="primary"
                  size="sm"
                  style={{ float: 'right' }}
                  onClick={() => this.onConfirmClick(value)}
                  className={`${prefixCls}-footer-btn`}
                >
                  {locale!.confirm}
                </Button>
              )
            }
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default LocaleReceiver('Calendar')(Calendar);
