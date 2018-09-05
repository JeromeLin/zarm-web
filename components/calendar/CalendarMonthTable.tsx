import React, { Component } from 'react';
import classnames from 'classnames';
import { MonthTableProps } from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

const CALENDAR_ROW_COUNT = 4;
const CALENDAR_COL_COUNT = 3;

const fn = () => {};

class CalendarMonthTable extends Component<MonthTableProps, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    defaultValue: '',
    current: '',
    onMonthClick: fn,
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

  // 渲染月份单元
  renderMonthCell(day) {
    const {
      onMonthClick,
      prefixCls,
      disabledMonth,
      locale,
    } = this.props;

    const fullDay = `${day.year}/${day.month}/${day.date}`;

    const isDisabled = disabledMonth ? !disabledMonth(fullDay) : false;

    const cls = classnames({
      [`${prefixCls}-text`]: true,
      [`${prefixCls}-text-disabled`]: isDisabled,
      [`${prefixCls}-text-selected`]: this.state.current === fullDay,
    });

    const onClick = () => onMonthClick(fullDay);

    return (
      <span
        className={cls}
        title={locale[`month${day.month}`]}
        onClick={(isDisabled && fn) || onClick}
      >
        {locale[`month${day.month}`]}
      </span>
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
}

export default LocaleReceiver(CalendarMonthTable, 'Calendar');
