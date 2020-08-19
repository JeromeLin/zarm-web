import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from '../index';

const { Option } = Select;

describe('Select', () => {
  const fakeTimers = () => {
    performance.timing = () => {};
  };
  fakeTimers();

  it('Select', () => {
    const wrapper = mount(
      <Select>
        <Option value="a">我是A</Option>
        <Option value="b">我是B</Option>
      </Select>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('toggleOpen Select', () => {
    const wrapper = mount(
      <Select>
        <Option value="a">我是A</Option>
        <Option value="b">我是B</Option>
      </Select>,
    );
    wrapper.find('.zw-tag-input-box').simulate('mousedown');
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

  // it('should show search icon when search is open', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(
  //     <Select multiple search defaultValue={['jack', 'lucy']}>
  //       <Option value="jack">Jack</Option>
  //       <Option value="lucy">Lucy</Option>
  //       <Option value="lily">Lily</Option>
  //       <Option value="john">John</Option>
  //       <Option value="honey">Honey</Option>
  //     </Select>,
  //   );
  //   wrapper.find('.zw-tag-input-box').simulate('click');
  //   wrapper.find('.zw-option__list').first().simulate('click');
  //   expect(onChange).toHaveBeenCalled();
  // });

  // it('should clear input filter after select', () => {
  //     const wrapper = mount(
  //       <Select mode={mode} showSearch>
  //         <Option value="11">11</Option>
  //         <Option value="12">12</Option>
  //         <Option value="22">22</Option>
  //       </Select>,
  //     );
  //     const input = wrapper.find('input');
  //     input.simulate('change', {
  //       target: {
  //         value: '1',
  //       },
  //     });

  //     expect(wrapper.find('.rc-select').hasClass('rc-select-open')).toBeTruthy();
  //     expect(wrapper.find('input').props().value).toBe('1');
  //     wrapper
  //       .find('.rc-select-item-option')
  //       .first()
  //       .simulate('click');
  //     expect(wrapper.find('input').props().value).toBe('');
  //   });
  // }
});
