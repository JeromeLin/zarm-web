import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from '../index';


describe('DatePicker', () => {
  it('renders normal date-picker correctly', () => {
    const wrapper = shallow(
      <DatePicker value="2018/8/5" />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders normal time date-picker correctly', () => {
    const wrapper = shallow(
      <DatePicker
        showTime
        format="yyyy-MM-dd hh:mm:ss"
      />
    );

    wrapper.setProps({ value: '2018/8/5 00:00:00' });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('renders normal range date-picker correctly', () => {
  //   const wrapper = mount(
  //     <DatePicker
  //       isRange
  //       value={['2018/8/5', '2018/8/6']}
  //     />
  //   );

  //   wrapper.setProps({ value: ['2018/8/5', '2018/8/6'] });

  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('renders normal range time date-picker correctly', () => {
    const wrapper = shallow(
      <DatePicker
        isRange
        showTime
        value={['2018/8/5 00:00:00', '2018/8/6 00:00:00']}
        format="yyyy-MM-dd hh:mm:ss"
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
