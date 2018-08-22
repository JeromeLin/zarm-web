import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders normal Checkbox correctly', () => {
    const wrapper = render(
      <Checkbox
        checked
        value="0"
      >
        选择0
      </Checkbox>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled Checkbox correctly', () => {
    const wrapper = render(
      <Checkbox
        checked
        disabled
        value="0"
      >
        选择0
      </Checkbox>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders indeterminate Checkbox correctly', () => {
    const wrapper = render(
      <Checkbox
        indeterminate
        value="0"
      >
        选择0
      </Checkbox>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled CheckboxGroup correctly', () => {
    const wrapper = render(
      <Checkbox.Group>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
        <Checkbox value="d">D</Checkbox>
      </Checkbox.Group>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders CheckboxGroup correctly with defaultValue', () => {
    const wrapper = render(
      <Checkbox.Group defaultValue={['a']}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
        <Checkbox value="d">D</Checkbox>
      </Checkbox.Group>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when clicking on Checkbox', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox
        onChange={onChange}
        value="0"
      >
        选择0
      </Checkbox>
    );

    wrapper.find('input').simulate('change');

    expect(onChange).toHaveBeenCalled();
  });

  it('behaves correctly when clicking on Checkbox', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox
        onChange={onChange}
        value="0"
      >
        选择0
      </Checkbox>
    );

    wrapper.find('input').simulate('change');

    expect(onChange).toHaveBeenCalled();
  });

  it('behaves correctly when checking in CheckboxGroup', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group onChange={onChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
        <Checkbox value="d">D</Checkbox>
      </Checkbox.Group>
    );

    wrapper.find('input').first().simulate('change');

    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('behaves correctly when CheckboxGroup receives new value', () => {
    const wrapper = mount(
      <Checkbox.Group value={[]}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
        <Checkbox value="d">D</Checkbox>
      </Checkbox.Group>
    );

    expect(wrapper.find('.ui-checkbox').first().hasClass('checked')).toBeFalsy();
    wrapper.setProps({ value: ['a'] });
    expect(wrapper.find('.ui-checkbox').first().hasClass('checked')).toBeTruthy();
  });
});
