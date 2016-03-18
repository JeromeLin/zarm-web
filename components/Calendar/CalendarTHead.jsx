
import React, { Component } from 'react';

const CALENDAR_SHORT_WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'],
      CALENDAR_COL_COUNT = 7;

class CalendarTHead extends Component {

  render() { 
    let weekDays = [];

    for (let i = 0; i < CALENDAR_COL_COUNT; i++) {
      weekDays[i] = CALENDAR_SHORT_WEEK_DAYS[i];
    }

    return (
      <thead>
        <tr>
          {
            weekDays.map((week, index) => {
              return <th key={`weekdays-${index}`} title={`星期${week}`}>{week}</th>;
            })
          }
        </tr>
      </thead>
    );
  }
}

export default CalendarTHead;