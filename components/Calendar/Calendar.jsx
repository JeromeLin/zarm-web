
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const DATE_ROW_COUNT = 6,
      DATE_COL_COUNT = 7;

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render () {
    const props = this.props;
    const { className, ...others } = props;
    const { value } = this.state;

    const cls = classnames({
      'ui-calendar': true,
      [className]  : !!className,
    });

    console.log(value)
    let today = new Date(value),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        date = today.getDate(),
        week = today.getDay(),
        number = new Date(year, month, 0).getDate(),
        preYear = year - 1,
        preMonth = (month == 1)
                 ? 12
                 : month - 1,
        preMonthDayNumber = new Date(year, month - 1, 0).getDate();

    today.setDate(1);
    let firstDayWeek = today.getDay();

    // console.log(today, year, month, date, week, number, firstDayWeek, preMonthDayNumber)


    let dates = [];
    for (let i = preMonthDayNumber; i > preMonthDayNumber - firstDayWeek; i--) {
      let current = this.getPreMonth(value);
      current.date = i;
      dates.unshift(this.renderDay(current));
    }

    for (let j = 1; j <= number; j++) {
      let current = {
        year : year,
        month: month,
        date : j,
      }
      dates.push(this.renderDay(current));
    }

    for (let k = 1; k <= DATE_ROW_COUNT * DATE_COL_COUNT  - number - firstDayWeek; k++) {
      let current = this.getNextMonth(value);
      current.date = k;
      dates.push(this.renderDay(current));
    }
    // console.log(dates)

    let tabelCell = [];
    for (let m = 0; m < DATE_ROW_COUNT; m++) {
      let tabelRow = [];
      for (let n = 0; n < DATE_COL_COUNT; n++) {
        let value = m * DATE_COL_COUNT + n;
        tabelRow.push(
          <td key={`column-${n}`} className="ui-calendar-cell" role="gridcell">
            {dates[value]}
          </td>
        );
      }
      tabelCell.push(<tr key={`row-${m}`} role="row">{tabelRow}</tr>);
    }

    return (
      <div className={cls} {...others}>
        <div className="ui-calendar-header"></div>
        <div className="ui-calendar-body">
          <table>
            <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
            </thead>
            <tbody>
              {tabelCell}
            </tbody>
          </table>
        </div>
        <div className="ui-calendar-footer">
        </div>
      </div>
    );
  }

  renderDay(day) {
    const fullDay = `${day.year}-${day.month}-${day.date}`;
    return <span className="ui-calendar-date" title={fullDay} onClick={() => this.onDateClick(fullDay)}>{day.date}</span>;
  }

  onDateClick(date) {
    alert(date);
    // this.setState({
    //   value: date
    // })
  }

  // 获取上个月
  getPreMonth(day) {
    let today = new Date(day),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        date = today.getDate(),
        result = {};

    result.date = date;
    if (month == 1) {
      result.year = year - 1;
      result.month = 12;
    } else {
      result.year = year;
      result.month = month - 1
    }
    return result;
  }

  getNextMonth(day) {
    let today = new Date(day),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        date = today.getDate(),
        result = {};

    result.date = date;
    if (month == 12) {
      result.year = year + 1;
      result.month = 1;
    } else {
      result.year = year;
      result.month = month + 1
    }
    return result;
  }
}

Calendar.propTypes = {
  defaultValue: PropTypes.bool,
  onChange    : PropTypes.func,
};

Calendar.defaultProps = {
  defaultValue: false,
  onChange    : function () {},
};

export default Calendar;