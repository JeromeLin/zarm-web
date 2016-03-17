
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value   : props.value || props.defaultValue,
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
    const { className, ...others } = props;

    const cls = classnames({
      'ui-calender': true,
      [className]  : !!className,
    });

    let dates = [];
    for (var i = 0; i < 30; i++) {
      dates.push(<td key={i}>{i}</td>);
    }

    return (
      <div className={cls} {...others}>
        <div className="ui-calender-header"></div>
        <div className="ui-calender-body">
          <table>
            <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {dates}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ui-calender-footer">
        </div>
      </div>
    );
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