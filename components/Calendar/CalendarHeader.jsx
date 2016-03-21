
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class CalendarHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panel: props.panel || 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('panel' in nextProps) {
      this.setState({
        panel: nextProps.panel
      });
    }
  }

  render() { 
    const { current } = this.props;
    const { panel } = this.state;
    const dd = new Date(current),
          currentMonth = {
            year : dd.getFullYear(),
            month: dd.getMonth() + 1
          };

    switch (panel) {
      case 'year':
        return this.renderYearSelect(currentMonth);

      case 'month':
        return this.renderDateSelect(currentMonth);

      default:
        return this.renderDateSelect(currentMonth);
    }
  }

  renderDateSelect(current) {
    return (
      <div className="ui-calendar-header">
        <a href="javascript:;" onClick={() => this.onMonthClick(current, 'pre')} className="ui-calendar-header-pre-btn" title="上个月"><Icon type="back" /></a>
        <span>
          <a href="javascript:;" className="ui-calendar-header-btn" onClick={() => this.onChangePanel('year')}>{current.year}年</a>
          <a href="javascript:;" className="ui-calendar-header-btn">{current.month}月</a>
        </span>
        <a href="javascript:;" onClick={() => this.onMonthClick(current, 'next')} className="ui-calendar-header-next-btn" title="下个月"><Icon type="right" /></a>
      </div>
    )
  }

  renderYearSelect(current) {
    const beforeYear = parseInt(current.year / 10) * 10;

    return (
      <div className="ui-calendar-header">
        <a href="javascript:;" onClick={() => this.onYearClick(current, 'pre')} className="ui-calendar-header-pre-btn" title="上个年代"><Icon type="back" /></a>
        <span>
          <a href="javascript:;" className="ui-calendar-header-year-btn">{beforeYear} - {beforeYear + 9}</a>
        </span>
        <a href="javascript:;" onClick={() => this.onYearClick(current, 'next')} className="ui-calendar-header-next-btn" title="下个年代"><Icon type="right" /></a>
      </div>
    )
  }

  // 切换界面
  onChangePanel(panel) {
    return; //没做好，先隐藏此功能
    this.setState({panel}, this.props.onChangePanel(panel));
  }

  // 切换年代
  onYearClick(current, type) {
    let newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 10;
    } else {
      newYear.year = current.year + 10;
    }
    const currentString = `${newYear.year}-${newYear.month}-1`;

    this.props.onChange(currentString);
  }

  // 切换月份
  onMonthClick(current, type) {
    let newMonth = (type === 'pre')
                 ? this.getPreMonth(current)
                 : this.getNextMonth(current);
    const currentString = `${newMonth.year}-${newMonth.month}-1`;

    this.props.onChange(currentString);
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
}

export default CalendarHeader;