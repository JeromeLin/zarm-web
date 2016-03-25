import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Format from '../utils/Format';
import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';
import CalendarMonthTable from './CalendarMonthTable';
import CalendarYearTable from './CalendarYearTable';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: Format.date(props.value, 'yyyy/M/d') || Format.date(props.defaultValue, 'yyyy/M/d') || new Date(),
      value  : Format.date(props.value, 'yyyy/M/d') || Format.date(props.defaultValue, 'yyyy/M/d'),
      panel  : 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value  : Format.date(nextProps.value, 'yyyy/M/d'),
        current: Format.date(nextProps.value, 'yyyy/M/d'),
      });
    }
  }

  render () {
    const props = this.props;
    const { className, onChange, ...others } = props;
    const { current, value, panel } = this.state;

    const cls = classnames({
      'ui-calendar': true,
      [className]  : !!className,
    });

    return (
      <div className={cls} {...others}>
        <CalendarHeader
          panel={panel}
          current={current}
          onChange={(current) => this.setState({current})}
          onChangePanel={(panel) => this.setState({panel})}
        />
        <div className="ui-calendar-body">
          <CalendarYearTable visible={panel !== 'year'} value={value} current={current} onYearClick={(value) => this.onYearClick(value)} />
          <CalendarMonthTable visible={panel !== 'month'} value={value} current={current} onMonthClick={(value) => this.onMonthClick(value)} />
          <CalendarDateTable visible={panel !== 'date'} value={value} current={current} onDateClick={(value) => this.onDateClick(value)} />
        </div>
      </div>
    );
  }

  onYearClick(value) {
    this.setState({
      current: value,
      panel  : 'date'
    });
  }

  onMonthClick(value) {
    this.setState({
      current: value,
      panel  : 'date'
    });
  }

  onDateClick(value) {
    this.setState({
      value  : value,
      current: value
    });
    const { format, onChange } = this.props;
    onChange && onChange(Format.date(value, format));
  }
}

Calendar.propTypes = {
  format  : PropTypes.string,
  onChange: PropTypes.func,
};

Calendar.defaultProps = {
  format  : 'yyyy-MM-dd',
  onChange: function () {},
};

export default Calendar;