import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Drawer from '../index';

describe('Drawer', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const afterClose = jest.fn();
    const wrapper = mount(
      <Drawer
        direction="bottom"
        onMaskClick={onMaskClick}
        afterClose={afterClose}
      >
        foo
      </Drawer>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible change false', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Drawer visible>foo</Drawer>,
    );
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.unmount();
  });
});
