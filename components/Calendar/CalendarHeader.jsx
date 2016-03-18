
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class CalendarHeader extends Component {

  render() { 
    const { current, onPreMonthClick, onNextMonthClick } = this.props;
    const dd = new Date(current),
          currentMonth = {
            year : dd.getFullYear(),
            month: dd.getMonth() + 1
          };

    return (
      <div className="ui-calendar-header">
        <a href="javascript:;" onClick={onPreMonthClick} className="ui-calendar-header-pre-month-btn" title="上个月"><Icon type="back" /></a>
        <span>
          <a href="javascript:;" className="ui-calendar-header-year-btn">{currentMonth.year}年</a>
          <a href="javascript:;" className="ui-calendar-header-month-btn">{currentMonth.month}月</a>
        </span>
        <a href="javascript:;" onClick={onNextMonthClick} className="ui-calendar-header-next-month-btn" title="下个月"><Icon type="right" /></a>
      </div>
    );
  }

}

export default CalendarHeader;