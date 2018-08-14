import React from 'react';
import ReactDOM from 'react-dom'
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimePicker from '../index';

ReactDOM.createPortal = node => node

describe('TimePicker', () => {
  it('renders normal TimePicker correctly', () => {
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

  it('renders disabled TimePicker correctly', () => {
    const wrapper = render(
      <div>
        <TimePicker
          isDisabled
          isRadius
          style={{ width: 160 }}
        />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

