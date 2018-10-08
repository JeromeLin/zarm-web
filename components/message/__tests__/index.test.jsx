import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Message from '../index';

describe('Message', () => {
  it('renders message correctly', () => {
    const wrapper = mount(
      <Message
        msg={[
          {
            m: '提交成功',
          },
        ]}
        theme="info"
        duration={5000}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
