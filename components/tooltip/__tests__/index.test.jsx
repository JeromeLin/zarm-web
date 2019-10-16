import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';

describe('Tooltip', () => {
  it('renders normal Tooltip correctly', () => {
    const wrapper = render(
      <Tooltip content="我是Tooltip内容">
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check `onVisibleChange` prop', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Tooltip content="hello" trigger="click" onVisibleChange={onVisibleChange}>
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    const div = wrapper.find('#hello');
    div.simulate('click');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);

    div.simulate('click');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  });

  it('check `visible` prop', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Tooltip content="hello" trigger="click" onVisibleChange={onVisibleChange}>
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    wrapper.setProps({ visible: true });
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    wrapper.setProps({ visible: false });
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
  });
});
