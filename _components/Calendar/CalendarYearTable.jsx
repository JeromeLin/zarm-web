
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CALENDAR_ROW_COUNT = 4,
      CALENDAR_COL_COUNT = 3;

class CalendarYearTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || new Date(),
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
        <table className="ui-calendar-table ui-calendar-year">
          {this.renderYear()}
        </table>
      </div>
    );
  }

  // 渲染年份
  renderYear() {
    let dd = new Date(this.state.current),
        current = {
          year : dd.getFullYear(),
          month: dd.getMonth() + 1,
          date : dd.getDate(),
        };

    let years = [];

    // 当月日期
    const firstYear = parseInt(current.year / 10) * 10 - 1,
          lastYear = firstYear + 11;

    for (let i = firstYear; i <= lastYear; i++) {
      let type = (i == firstYear || i == lastYear)
               ? 'others'
               : null;

      years.push(this.renderYearCell({
        year : i,
        month: current.month,
        date : current.date,
      }, type));
    }

    let tabelCell = [];
    for (let m = 0; m < CALENDAR_ROW_COUNT; m++) {
      let tabelRow = [];
      for (let n = 0; n < CALENDAR_COL_COUNT; n++) {
        let index = m * CALENDAR_COL_COUNT + n;
        tabelRow.push(
          <td key={`column-${n}`} className="ui-calendar-cell" role="gridcell">
            {years[index]}
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

  // 渲染年份单元
  renderYearCell(day, type) {
    const { onYearClick } = this.props,
          fullDay = `${day.year}/${day.month}/${day.date}`;

    const cls = classnames({
      'ui-calendar-text'         : true,
      'ui-calendar-text-others'  : type === 'others',
      'ui-calendar-text-selected': this.state.current === fullDay,
    });
    
    return <span className={cls} title={day.year} onClick={() => onYearClick(fullDay)}>{day.year}</span>;
  }
}

CalendarYearTable.propTypes = {
  defaultValue: PropTypes.string,
  value       : PropTypes.string,
  onYearClick : PropTypes.func,
};

CalendarYearTable.defaultProps = {
  defaultValue: '',
  value       : '',
  onYearClick : () => {},
};

export default CalendarYearTable;