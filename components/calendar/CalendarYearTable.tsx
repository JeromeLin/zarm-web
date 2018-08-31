import React, { Component } from 'react';
import classnames from 'classnames';
import { YearTableProps } from './PropsType';

const CALENDAR_ROW_COUNT = 4;
const CALENDAR_COL_COUNT = 3;

class CalendarYearTable extends Component<YearTableProps, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    defaultValue: '',
    current: '',
    onYearClick: () => {},
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

  render() {
    const { visible, prefixCls } = this.props;
    const style = {
      display: visible ? 'none' : 'block',
    };

    return (
      <div style={style}>
        <table className={`${prefixCls}-table ${prefixCls}-year`}>
          {this.renderYear()}
        </table>
      </div>
    );
  }

  // 渲染年份
  renderYear() {
    const dd = new Date(this.state.current);
    const current = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1,
      date: dd.getDate(),
    };

    const years: JSX.Element[] = [];

    // 当月日期
    const firstYear = parseInt(String(current.year / 10), 10) * 10 - 1;
    const lastYear = firstYear + 11;

    for (let i = firstYear; i <= lastYear; i++) {
      const type = i === firstYear || i === lastYear ? 'others' : null;

      years.push(
        this.renderYearCell(
          {
            year: i,
            month: current.month,
            date: current.date,
          },
          type,
        ),
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
            {years[index]}
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

  // 渲染年份单元
  renderYearCell(day, type) {
    const { onYearClick, prefixCls } = this.props;
    const fullDay = `${day.year}/${day.month}/${day.date}`;

    const cls = classnames({
      [`${prefixCls}-text`]: true,
      [`${prefixCls}-text-others`]: type === 'others',
      [`${prefixCls}-text-selected`]: this.state.current === fullDay,
    });

    return (
      <span
        className={cls}
        title={day.year}
        onClick={() => onYearClick(fullDay)}
      >
        {day.year}
      </span>
    );
  }
}

export default CalendarYearTable;
