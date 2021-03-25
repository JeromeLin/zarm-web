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
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders different sizes of Input correctly', () => {
    const wrapper = render(
      <div>
        <Input size="lg" placeholder="请输入" />
        <Input size="md" placeholder="请输入" />
        <Input size="sm" placeholder="请输入" />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Input with radius correctly', () => {
    const wrapper = render(
      <div>
        <Input shape="radius" type="text" placeholder="请输入" />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Disabled Input correctly', () => {
    const wrapper = render(
      <div>
        <Input disabled type="text" value="禁用" />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with initial value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <div>
        <Input onChange={onChange} value="hey" type="text" />
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when changing Input value', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Input onChange={onChange} type="text" />
      </div>,
    );

    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });

  it('should trigger clear event correctly when click clear icon', () => {
    let argumentEventObject;
    let argumentEventObjectValue;
    const onChange = (e) => {
      argumentEventObject = e;
      argumentEventObjectValue = e.target.value;
    };
    const wrapper = mount(<Input clearable value="111" onChange={onChange} />);
    wrapper.find('.zw-input__clear-icon').at(0).simulate('click');
    expect(argumentEventObject.type).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(wrapper.find('input').at(0).getDOMNode().value).toBe('111');
  });

  // it('should focus input after clear', () => {
  //   const wrapper = mount(<Input clearable defaultValue="111" />);
  //   wrapper
  //     .find('.zw-input__clear-icon')
  //     .at(0)
  //     .simulate('click');
  //   expect(document.activeElement).toBe(
  //     wrapper
  //       .find('input')
  //       .at(0)
  //       .getDOMNode(),
  //   );
  // });

  it('should not support clearable when it is disabled', () => {
    const wrapper = mount(<Input clearable defaultValue="111" disabled />);
    expect(wrapper.find('.zw-input__clear-icon').length).toBe(0);
  });
});
