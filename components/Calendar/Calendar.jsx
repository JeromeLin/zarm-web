
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CalendarHeader from './CalendarHeader';
import CalendarTHead from './CalendarTHead';
import CalendarTBody from './CalendarTBody';

const DATE_ROW_COUNT = 6,
      DATE_COL_COUNT = 7;

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || props.defaultValue || new Date(),
      value  : props.value || props.defaultValue || new Date(),
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
    const { className, onDateClick, ...others } = props;
    const { current, value } = this.state;

    const cls = classnames({
      'ui-calendar': true,
      [className]  : !!className,
    });

    return (
      <div className={cls} {...others}>
        <CalendarHeader
          current={current}
          onPreMonthClick={() => this.onMonthClick('pre')}
          onNextMonthClick={() => this.onMonthClick('next')}
        />
        <div className="ui-calendar-body">
          <table>
            <CalendarTHead />
            <CalendarTBody value={value} current={current} onDateClick={(value) => onDateClick && this.onDateClick(value)} />
          </table>
        </div>
      </div>
    );
  }

  onDateClick(value) {
    this.setState({value});
    this.props.onDateClick(value);
  }

  onMonthClick(type) {
    let dd = new Date(this.state.current),
        thisMonth = {
          year : dd.getFullYear(),
          month: dd.getMonth() + 1
        },
        newMonth = (type === 'pre')
                 ? this.getPreMonth(thisMonth)
                 : this.getNextMonth(thisMonth),
        current = `${newMonth.year}-${newMonth.month}-1`;
    this.setState({current});
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

Calendar.propTypes = {
  defaultValue: PropTypes.bool,
  onChange    : PropTypes.func,
};

Calendar.defaultProps = {
  defaultValue: false,
  onChange    : function () {},
};

export default Calendar;