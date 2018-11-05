import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Confirm from '../index';

describe('Confirm', () => {
  it('renders basic Confirm correctly', () => {
    const onOk = jest.fn();
    const onCancel = jest.fn();
    const wrapper = mount(
      <Confirm onOk={onOk} onCancel={onCancel} message="确认删除吗？" />
    );
    wrapper.setProps({ visible: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
