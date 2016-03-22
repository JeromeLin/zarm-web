import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || props.defaultValue || new Date(),
      value  : props.value || props.defaultValue,
      panel  : 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
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
    const { onChange } = this.props;
    onChange && onChange(value);
  }
}

Calendar.propTypes = {
  onChange: PropTypes.func,
};

Calendar.defaultProps = {
  onChange: function () {},
};

export default Calendar;