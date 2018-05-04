import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Format from '../utils/format';
import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';
import CalendarMonthTable from './CalendarMonthTable';
import CalendarYearTable from './CalendarYearTable';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: Format.date(
        props.value || props.defaultValue || new Date(),
        'yyyy/M/d'
      ),
      value: Format.date(props.value || props.defaultValue, 'yyyy/M/d'),
      panel: 'date'
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Format.date(nextProps.value, 'yyyy/M/d'),
        current: Format.date(
          nextProps.value || nextProps.defaultValue || new Date(),
          'yyyy/M/d'
        ),
        panel: 'date'
      });
    }
  }

  render() {
    const { props } = this;
    const {
      className, hasFooter, min, max, style
    } = props;
    const { current, value, panel } = this.state;

    const cls = classnames({
      'ui-calendar': true,
      [className]: !!className
    });

    return (
      <div className={cls} style={style}>
        <CalendarHeader
          panel={panel}
          current={current}
          onChange={current => this.setState({ current })}
          onChangePanel={panel => this.setState({ panel })}
        />
        <div className="ui-calendar-body">
          <CalendarYearTable
            visible={panel !== 'year'}
            value={value}
            current={current}
            onYearClick={value => this.onYearClick(value)}
          />

          <CalendarMonthTable
            visible={panel !== 'month'}
            value={value}
            current={current}
            onMonthClick={value => this.onMonthClick(value)}
          />

          <CalendarDateTable
            visible={panel !== 'date'}
            value={value}
            current={current}
            min={min}
            max={max}
            onDateClick={value => this.onDateClick(value)}
          />
        </div>
        {hasFooter ? (
          <div className="ui-calendar-footer">
            <a
              href="javascript:;"
              onClick={() => this.onDateClick(new Date())}
              className="ui-calendar-footer-btn"
            >
              今天
            </a>

            <a
              href="javascript:;"
              onClick={() => this.onDateClick('')}
              className="ui-calendar-footer-btn"
            >
              清除
            </a>
          </div>
        ) : null}
      </div>
    );
  }

  onYearClick(value) {
    this.setState({
      current: value,
      panel: 'date'
    });
  }

  onMonthClick(value) {
    this.setState({
      current: value,
      panel: 'date'
    });
  }

  onDateClick(value) {
    this.setState({
      value,
      current: value
    });
    const { format, onChange } = this.props;
    onChange && onChange(Format.date(value, format));
  }
}

Calendar.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string
};

Calendar.defaultProps = {
  format: 'yyyy-MM-dd',
  min: '',
  max: '',
  onChange: () => {}
};

export default Calendar;
