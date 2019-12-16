import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  it('renders normal Switch correctly', () => {
    const wrapper = render(
      <div>
        <Switch />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Switch correctly with more props', () => {
    const wrapper = render(
      <div>
        <Switch disabled size="sm" />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when receving new value', () => {
    const wrapper = mount(
      <Switch defaultChecked={false} />,
    );

    expect(wrapper.find('.zw-switch').hasClass('zw-switch--checked')).toBeFalsy();
    wrapper.find('.zw-switch').simulate('click');
    expect(wrapper.find('.zw-switch').hasClass('zw-switch--checked')).toBeTruthy();
  });

  it('behaves correctly when toggling status', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Switch defaultChecked={false} onChange={onChange} />,
    );

    const wrapperOpen = mount(
      <Switch defaultChecked={false} onChange={onChange} />,
    );

    wrapper.find('.zw-switch').simulate('click');
    expect(onChange).toHaveBeenCalledWith(true);

    wrapperOpen.find('.zw-switch').simulate('click');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('switch with loading status', () => {
    const wrapper = mount(
      <Switch defaultChecked />,
    );
    expect(wrapper.exists('.zw-switch--loading')).toEqual(false);
    wrapper.setProps({ loading: true });
    expect(wrapper.exists('.zw-switch--loading')).toEqual(true);
  });
});
