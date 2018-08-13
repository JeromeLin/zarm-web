import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tab from '../index';

describe('Tab', () => {
  it('renders normal Tab correctly', () => {
    const wrapper = render(
      <div>
        <Tab.Group defaultValue={1}>
          <Tab title="选项卡1">
            <div style={{ padding: 10 }}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab title="选项卡2">
            <div style={{ padding: 10 }}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="选项卡3">
            <div style={{ padding: 10 }}>
              这是选项卡3的文字
            </div>
          </Tab>
        </Tab.Group>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tab correctly with more props', () => {
    const wrapper = render(
      <div>
        <Tab.Group defaultValue={1} isRadius theme="error">
          <Tab title="选项卡1">
            <div style={{ padding: 10 }}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab title="选项卡2">
            <div style={{ padding: 10 }}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="选项卡3">
            <div style={{ padding: 10 }}>
              这是选项卡3的文字
            </div>
          </Tab>
        </Tab.Group>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when receiving new value', () => {
    const wrapper = mount(
      <Tab.Group defaultValue={1}>
        <Tab title="选项卡1">
          <div style={{ padding: 10 }}>
            这是选项卡1的文字
          </div>
        </Tab>
        <Tab title="选项卡2">
          <div style={{ padding: 10 }}>
            这是选项卡2的文字
          </div>
        </Tab>
        <Tab title="选项卡3">
          <div style={{ padding: 10 }}>
            这是选项卡3的文字
          </div>
        </Tab>
      </Tab.Group>
    );

    expect(wrapper.state('value')).toEqual(1);
    wrapper.setProps({ value: 2 });
    expect(wrapper.state('value')).toEqual(2);
  });

  it('behaves correctly when changing tab', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tab.Group defaultValue={1} onChange={onChange}>
        <Tab title="选项卡1">
          <div style={{ padding: 10 }}>
            这是选项卡1的文字
          </div>
        </Tab>
        <Tab title="选项卡2">
          <div style={{ padding: 10 }}>
            这是选项卡2的文字
          </div>
        </Tab>
        <Tab title="选项卡3">
          <div style={{ padding: 10 }}>
            这是选项卡3的文字
          </div>
        </Tab>
      </Tab.Group>
    );

    wrapper.find('.ui-tab-header-item').at(2).simulate('click');
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

