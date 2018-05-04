import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Format from '../utils/format';

const CALENDAR_ROW_COUNT = 6;
const CALENDAR_COL_COUNT = 7;
const CALENDAR_WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

class CalendarDateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current
      });
    }
  }

  render() {
    const { visible } = this.props;
    const style = {
      display: visible ? 'none' : 'block'
    };

    return (
      <div style={style}>
        <table className="ui-calendar-table">
          {this.renderWeek()}
          {this.renderDate()}
        </table>
      </div>
    );
  }

  // 渲染星期
  renderWeek() {
    let weekDays = [];

    for (let i = 0; i < CALENDAR_COL_COUNT; i++) {
      weekDays[i] = CALENDAR_WEEK_DAYS[i];
    }

    return (
      <thead>
        <tr>
          {
            weekDays.map((week, index) => {
              return <th key={`weekdays-${index}`} className="ui-calendar-column" title={`星期${week}`}>{week}</th>;
            })
          }
        </tr>
      </thead>
    );
  }

  // 渲染日期
  renderDate() {
    let dd = new Date(this.state.current);
    let current = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1
    };
    let pre = this.getPreMonth(current);
    let next = this.getNextMonth(current);

    current.days = this.getDays(current);
    current.firstDayOfWeek = this.getFirstDayOfWeek(current);
    pre.days = this.getDays(pre);

    let dates = [];

    // 当月第一天不在周一时，前面日期用上个月的日期补齐
    for (let i = pre.days; i > pre.days - current.firstDayOfWeek + 1; i--) {
      dates.unshift(this.renderDateCell({
        year: pre.year,
        month: pre.month,
        date: i
      }, 'others'));
    }

    // 当月日期
    for (let j = 1; j <= current.days; j++) {
      dates.push(this.renderDateCell({
        year: current.year,
        month: current.month,
        date: j
      }));
    }

    // 当月最后一天不在周日时，后面日期用下个月的日期补齐
    for (let k = 1; k <= CALENDAR_ROW_COUNT * CALENDAR_COL_COUNT - current.days - current.firstDayOfWeek + 1; k++) {
      dates.push(this.renderDateCell({
        year: next.year,
        month: next.month,
        date: k
      }, 'others'));
    }

    let tabelCell = [];
    for (let m = 0; m < CALENDAR_ROW_COUNT; m++) {
      let tabelRow = [];
      for (let n = 0; n < CALENDAR_COL_COUNT; n++) {
        let index = m * CALENDAR_COL_COUNT + n;
        tabelRow.push(
          <td key={`column-${n}`} className="ui-calendar-cell" role="gridcell">
            {dates[index]}
          </td>
        );
      }
      tabelCell.push(<tr key={`row-${m}`} role="row">{tabelRow}</tr>);
    }

    return (
      <tbody>
        {tabelCell}
      </tbody>
    );
  }

  // 渲染日期单元
  renderDateCell(day, type) {
    const {
      value,
      onDateClick,
      min,
      max,
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
            className="ui-calendar-text-disabled ui-calendar-text"
            title={displayDay}>
          {day.date}
        </span>
        );
      }
    }

    const cls = classnames('ui-calendar-text', {
      'ui-calendar-text-others': type === 'others',
      'ui-calendar-text-selected': value === fullDay,
      'ui-calendar-text-today': new Date().toLocaleDateString() === new Date(fullDay).toLocaleDateString(),
    });

    return (
      <span
        className={cls}
        title={displayDay}
        onClick={() => onDateClick(fullDay)}>
        {day.date}
      </span>
    );
  }

  // 获取第一天的星期
  getFirstDayOfWeek(current) {
    let date = new Date(`${current.year}/${current.month}/1`);
    let week = date.getDay();
    if (week === 0) {
      week = 7;
    }
    return week;
  }

  // 获取下个月
  getNextMonth(current) {
    let result = {};
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
  getPreMonth(current) {
    let result = {};
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
  getDays(current) {
    return new Date(current.year, current.month, 0).getDate();
  }

}

CalendarDateTable.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onDateClick: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
};

CalendarDateTable.defaultProps = {
  defaultValue: '',
  value: '',
  min: '',
  max: '',
  onDateClick: () => {
  },
};

export default CalendarDateTable;
