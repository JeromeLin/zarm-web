import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';

describe('Input', () => {
  it('renders different types of Input correctly', () => {
    const wrapper = render(
      <div>
        <Input type="text" placeholder="请输入" />
        <Input type="textarea" placeholder="请输入" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders different sizes of Input correctly', () => {
    const wrapper = render(
      <div>
        <Input size="xl" placeholder="请输入" />
        <Input size="lg" placeholder="请输入" />
        <Input size="sm" placeholder="请输入" />
        <Input size="xs" placeholder="请输入" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Input with radius correctly', () => {
    const wrapper = render(
      <div>
        <Input radius type="text" placeholder="请输入" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Disabled Input correctly', () => {
    const wrapper = render(
      <div>
        <Input disabled type="text" value="禁用" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with initial value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <div>
        <Input onChange={onChange} value="hey" type="text" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when changing Input value', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Input onChange={onChange} type="text" />
      </div>
    );

    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
