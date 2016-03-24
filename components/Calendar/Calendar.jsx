import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Format from '../utils/Format';
import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';

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

    let body;
    switch(panel) {
      case 'year':
        body = <CalendarDateTable value={value} current={current} onDateClick={(value) => this.onDateClick(value)} />;
        break;

      default:
        body = <CalendarDateTable value={value} current={current} onDateClick={(value) => this.onDateClick(value)} />;
    }

    return (
      <div className={cls} {...others}>
        <CalendarHeader
          current={current}
          onChange={(current) => this.setState({current})}
          onChangePanel={(panel) => this.setState({panel})}
        />
        <div className="ui-calendar-body">
          {body}
        </div>
      </div>
    );
  }

  onDateClick(value) {
    this.setState({
      value  : value,
      current: value,
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