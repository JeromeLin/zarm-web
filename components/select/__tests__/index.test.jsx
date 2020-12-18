import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from '../index';

const { Option } = Select;

describe('Select', () => {
  it('Select', () => {
    const wrapper = render(
      <Select>
        <Option value="a">我是A</Option>
        <Option value="b">我是B</Option>
      </Select>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render defaultValue correctly ', () => {
    const wrapper = mount(
      <Select defaultValue="lily">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="lily">Lily</Option>
      </Select>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Select disabled', () => {
    const wrapper = mount(
      <Select disabled>
        <Option value="a">我是A</Option>
        <Option value="b">我是B</Option>
      </Select>,
    );

    wrapper.find('.zw-tag-input-box').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('multiple Select init value', () => {
    const wrapper = mount(
      <Select multiple defaultValue={['jack', 'lucy']}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="lily">Lily</Option>
        <Option value="john">John</Option>
        <Option value="honey">Honey</Option>
      </Select>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
