import React from 'react';
import ReactDOM from 'react-dom';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimePicker from '../index';
import TimeSelect from '../TimeSelect';

// ReactDOM.createPortal = node => node

describe('TimePicker', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('renders normal time-picker correctly', () => {
    const wrapper = render(
      <div>
        <TimePicker />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled time-picker correctly', () => {
    const wrapper = render(
      <div>
        <TimePicker
          isDisabled
        />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled time-select correctly', () => {
    const wrapper = render(
      <TimeSelect
        value="00:00:00"
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders isRadius time-picker correctly', () => {
    const wrapper = render(
      <div>
        <TimePicker
          isRadius
          style={{ width: 160 }}
        />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when item click', () => {
    const onChange = jest.fn();
    const initValue = '00:00:00';
    const wrapper = mount(
      <TimeSelect
        value={initValue}
        onChange={onChange}
      />
    );
    wrapper.find('.ui-option-list').first().simulate('click');

    expect(onChange).toHaveBeenCalledWith(initValue);
  });

  it('behaves correctly when clear button click', () => {
    const wrapper = mount(<TimePicker value="12:33:22" />);
    wrapper.find('.clear-btn').simulate('click');

    expect(wrapper.find('.ui-select-text').text()).toBe('00:00:00');
  });
});

