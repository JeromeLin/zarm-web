import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Radio from '../index';

describe('Radio', () => {
  it('renders normal Radio correctly', () => {
    const wrapper = render(
      <div>
        <Radio
          value="a"
        >
          选择
        </Radio>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled Radio correctly', () => {
    const wrapper = render(
      <div>
        <Radio
          disabled
          value="a"
        >
          选择
        </Radio>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders checked Radio correctly', () => {
    const wrapper = render(
      <div>
        <Radio
          checked
        >
          选择
        </Radio>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Radio Group correctly', () => {
    const wrapper = render(
      <Radio.Group
        value="a"
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </Radio.Group>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when changing radio status', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio
        value="a"
        onChange={onChange}
      >
        选择
      </Radio>
    );

    wrapper.find('.ui-radio-input').simulate('change');
    expect(onChange).toBeCalled();
  });

  it('behaves correctly when choosing from Radio Group', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio.Group
        value="a"
        onChange={onChange}
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </Radio.Group>
    );

    wrapper.find('.ui-radio-input').first().simulate('change');
    expect(onChange).toBeCalled();
  });
});

