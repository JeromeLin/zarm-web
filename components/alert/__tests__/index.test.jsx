import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../index';

describe('Alert', () => {
  it('renders basic Alert correctly', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Alert
        theme="warning"
        onClose={onClose}
        message="这是一个警告框"
      />
    );
    wrapper.setProps({ visible: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
