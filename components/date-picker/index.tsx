import React, { Component } from 'react';

import DatePicker from './DatePicker';
import RangeDatePicker from './RangeDatePicker';

import PropsType from './PropsType';

class DatePickerWrapper extends Component<PropsType, any> {
  static defaultProps = {
    isRange: false,
  };

  render() {
    const { isRange } = this.props;

    if (isRange) {
      return (
        <RangeDatePicker {...this.props} />
      );
    }

    return (
      <DatePicker {...this.props} />
    );
  }
}

export default DatePickerWrapper;
