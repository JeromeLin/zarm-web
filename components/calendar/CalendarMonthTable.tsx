import React, { Component } from 'react';
import classnames from 'classnames';
import { MonthTableProps } from './PropsType';
import i18n from '../locale';

const CALENDAR_ROW_COUNT = 4;
const CALENDAR_COL_COUNT = 3;

class CalendarMonthTable extends Component<MonthTableProps, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    defaultValue: '',
    value: '',
    onMonthClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      });
    }
  }

  render() {
    const { visible, prefixCls } = this.props;
    const style = {
      display: visible ? 'none' : 'block',
    };

    return (
      <div style={style}>
        <table className={`${prefixCls}-table ${prefixCls}-month`}>
          {this.renderMonth()}
        </table>
      </div>
    );
  }

  // 渲染月份
  renderMonth() {
    const dd = new Date(this.state.current);
    const current = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1,
      date: dd.getDate(),
    };

    const months: JSX.Element[] = [];
    for (let i = 1; i <= 12; i++) {
      months.push(
        this.renderMonthCell({
          year: current.year,
          month: i,
          date: current.date,
        }),
      );
    }

    const tabelCell: JSX.Element[] = [];
    const { prefixCls } = this.props;
    for (let m = 0; m < CALENDAR_ROW_COUNT; m++) {
      const tabelRow: JSX.Element[] = [];
      for (let n = 0; n < CALENDAR_COL_COUNT; n++) {
        const index = m * CALENDAR_COL_COUNT + n;
        tabelRow.push(
          <td key={`column-${n}`} className={`${prefixCls}-cell`} role="gridcell">
            {months[index]}
          </td>,
        );
      }
      tabelCell.push(
        <tr key={`row-${m}`} role="row">
          {tabelRow}
        </tr>,
      );
    }

    return <tbody>{tabelCell}</tbody>;
  }

  // 渲染月份单元
  renderMonthCell(day) {
    const { onMonthClick, prefixCls } = this.props;
    const fullDay = `${day.year}/${day.month}/${day.date}`;

    const cls = classnames({
      [`${prefixCls}-text`]: true,
      [`${prefixCls}-text-selected`]: this.state.current === fullDay,
    });

    return (
      <span
        className={cls}
        title={i18n.t(`el.calendar.month${day.month}`)}
        onClick={() => onMonthClick(fullDay)}
      >
        {i18n.t(`el.calendar.month${day.month}`)}
      </span>
    );
  }
}

export default CalendarMonthTable;
