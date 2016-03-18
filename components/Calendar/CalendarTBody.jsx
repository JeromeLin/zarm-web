
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CALENDAR_ROW_COUNT = 6,
      CALENDAR_COL_COUNT = 7;

class CalendarTBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || new Date(),
      value  : props.value
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
    let dd = new Date(this.state.current),
        current = {
          year : dd.getFullYear(),
          month: dd.getMonth() + 1
        },
        pre = this.getPreMonth(current),
        next = this.getNextMonth(current);

    current.days = this.getDays(current);
    current.firstDayOfWeek = this.getFirstDayOfWeek(current);
    pre.days = this.getDays(pre);

    let dates = [];

    // 当月第一天不在周一时，前面日期用上个月的日期补齐
    for (let i = pre.days; i > pre.days - current.firstDayOfWeek; i--) {
      dates.unshift(this.renderDate({
        year : pre.year,
        month: pre.month,
        date : i
      }, 'othermonth'));
    }

    // 当月日期
    for (let j = 1; j <= current.days; j++) {
      dates.push(this.renderDate({
        year : current.year,
        month: current.month,
        date : j
      }));
    }

    // 当月最后一天不在周日时，后面日期用下个月的日期补齐
    for (let k = 1; k <= CALENDAR_ROW_COUNT * CALENDAR_COL_COUNT  - current.days - current.firstDayOfWeek; k++) {
      dates.push(this.renderDate({
        year : next.year,
        month: next.month,
        date : k
      }, 'othermonth'));
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

  // 渲染日期
  renderDate(day, type) {
    const { value, onDateClick } = this.props;
    const fullDay = `${day.year}-${day.month}-${day.date}`;
    const cls = classnames({
      'ui-calendar-date'           : true,
      'ui-calendar-date-othermonth': type === 'othermonth',
      'ui-calendar-date-selected'  : value === fullDay,
      'ui-calendar-date-today'     : new Date().toLocaleDateString() === new Date(fullDay).toLocaleDateString(),
    });
    return <span className={cls} title={fullDay} onClick={() => onDateClick(fullDay)}>{day.date}</span>;
  }

  // 获取第一天的星期
  getFirstDayOfWeek(current) {
    let date = new Date(`${current.year}-${current.month}-1`);
    return date.getDay();
  }

  // 获取下个月
  getNextMonth(current) {
    let result = {};
    if (current.month == 12) {
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
    if (current.month == 1) {
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
    const number = new Date(current.year, current.month, 0).getDate();
    return number;
  }
}

export default CalendarTBody;