import React, { Component } from 'react';
import classnames from 'classnames';

import Format from '../utils/format';
import { isArray } from '../utils/validate';

import { DateTableProps, dateType } from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

// 生成 [1, 2, 3, ...] 的序列
const getSequence = length => [...Array.from({ length }).keys()];

const CALENDAR_ROW_COUNT =  getSequence(6);
const CALENDAR_COL_COUNT = getSequence(7);

const compareTime = (v1, v2) => new Date(v1) > new Date(v2);

const isEqualTime = (v1, v2) => Format.date(v1, 'yyyy/M/d') === Format.date(v2, 'yyyy/M/d');

class CalendarDateTable extends Component<DateTableProps, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    defaultValue: '',
    value: '',
    min: '',
    max: '',
    onDateClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.current || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      });
    }
  }

  // 渲染星期
  // eslint-disable-next-line
  renderWeek() {
    const weekDays: string[] = [];
    const { prefixCls, locale } = this.props;
    const CALENDAR_WEEK_DAYS = locale.week_days;
    for (let i = 0; i < CALENDAR_COL_COUNT.length; i++) {
      weekDays[i] = CALENDAR_WEEK_DAYS[i];
    }

    return (
      <thead>
        <tr>
          {
            // tslint:disable-next-line:jsx-no-multiline-js
            weekDays.map((week, index) => (
            <th
              // eslint-disable-next-line
              key={`weekdays-${index}`}
              className={`${prefixCls}-column`}
              title={locale.week_days_hints[index]}
            >
              {week}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  // 渲染日期
  renderDate() {
    const dd = new Date(this.state.current);
    const current: dateType = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1,
    };
    const pre: dateType = this.getPreMonth(current);
    const next: dateType = this.getNextMonth(current);

    current.days = this.getDays(current);
    current.firstDayOfWeek = this.getFirstDayOfWeek(current);
    pre.days = this.getDays(pre);

    const dates: JSX.Element[] = [];

    // 当月第一天不在周一时，前面日期用上个月的日期补齐
    for (let i = pre.days; i > pre.days - current.firstDayOfWeek + 1; i--) {
      dates.unshift(
        this.renderDateCell(
          {
            year: pre.year,
            month: pre.month,
            date: i,
          },
          'others',
        ),
      );
    }

    // 当月日期
    for (let j = 1; j <= current.days; j++) {
      dates.push(
        this.renderDateCell({
          year: current.year,
          month: current.month,
          date: j,
        }),
      );
    }

    // 当月最后一天不在周日时，后面日期用下个月的日期补齐
    for (
      let k = 1;
      k <=
      CALENDAR_ROW_COUNT.length * CALENDAR_COL_COUNT.length -
        current.days -
        current.firstDayOfWeek +
        1;
      k++
    ) {
      dates.push(
        this.renderDateCell(
          {
            year: next.year,
            month: next.month,
            date: k,
          },
          'others',
        ),
      );
    }

    const { prefixCls } = this.props;

    return (
      <tbody>
      {
        CALENDAR_ROW_COUNT.map((m) => (
          <tr key={`row-${m}`} role="row">
            {
              CALENDAR_COL_COUNT.map((n) => {
                const index = m * CALENDAR_COL_COUNT.length + n;

                return (
                  <td key={`column-${n}`} className={`${prefixCls}-cell`} role="gridcell">
                    {dates[index]}
                  </td>
                );
              })
            }
          </tr>
        ))
      }
      </tbody>
    );
  }

  // 渲染日期单元
  renderDateCell(day, type?) {
    const {
      value,
      onDateClick,
      min,
      max,
      prefixCls,
      selectedValue,
    } = this.props;

    const fullDay = `${day.year}/${day.month}/${day.date}`;
    const displayDay = `${day.year}-${day.month}-${day.date}`;

    if (min || max) {
      const _min = Format.date(min, 'yyyy/M/d');
      const _max = Format.date(max, 'yyyy/M/d');

      const isSmall = new Date(fullDay) < new Date(_min);
      const isLarge = new Date(fullDay) > new Date(_max);

      if (isSmall || isLarge) {
        return (
          <span
            className={`${prefixCls}-text-disabled ${prefixCls}-text`}
            title={displayDay}
          >
            {day.date}
          </span>
        ) as JSX.Element;
      }
    }

    let isSelected = false;
    let isRange = false;
    if (selectedValue && isArray(selectedValue) && type !== 'others') {
      if (selectedValue.length === 2) {
        isRange = compareTime(fullDay, selectedValue[0]) &&
          compareTime(selectedValue[1], fullDay);
      }

      isSelected = isEqualTime(selectedValue[0], fullDay) ||
        isEqualTime(selectedValue[1], fullDay);
    } else {
      isSelected = isEqualTime(value, fullDay);
    }

    const cls = classnames(`${prefixCls}-text`, {
      [`${prefixCls}-text-others`]: type === 'others',
      [`${prefixCls}-text-selected`]: isSelected,
      [`${prefixCls}-text-range`]: isRange,
      [`${prefixCls}-text-today`]:
        new Date().toLocaleDateString() ===
        new Date(fullDay).toLocaleDateString(),
    });

    return (
      <span
        className={cls}
        title={displayDay}
        onClick={() => onDateClick(fullDay)}
      >
        {day.date}
      </span>
    );
  }

  // 获取第一天的星期
  // eslint-disable-next-line
  getFirstDayOfWeek(current) {
    const date = new Date(`${current.year}/${current.month}/1`);
    let week = date.getDay();
    if (week === 0) {
      week = 7;
    }
    return week;
  }

  // 获取下个月
  // eslint-disable-next-line
  getNextMonth(current) {
    const result: dateType = {};
    if (current.month === 12) {
      result.year = current.year + 1;
      result.month = 1;
    } else {
      result.year = current.year;
      result.month = current.month + 1;
    }
    return result;
  }

  // 获取上个月
  // eslint-disable-next-line
  getPreMonth(current) {
    const result: dateType = {};
    if (current.month === 1) {
      result.year = current.year - 1;
      result.month = 12;
    } else {
      result.year = current.year;
      result.month = current.month - 1;
    }
    return result;
  }

  // 获取指定月份的天数
  // eslint-disable-next-line
  getDays(current) {
    return new Date(current.year, current.month, 0).getDate();
  }

  render() {
    const { visible, prefixCls } = this.props;
    const style = {
      display: visible ? 'none' : 'block',
    };

    return (
      <div style={style}>
        <table className={`${prefixCls}-table`}>
          {this.renderWeek()}
          {this.renderDate()}
        </table>
      </div>
    ) as JSX.Element;
  }
}

export default LocaleReceiver(CalendarDateTable, 'Calendar');
