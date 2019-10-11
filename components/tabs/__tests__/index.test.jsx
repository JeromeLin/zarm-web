import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

const { Tab } = Tabs;

describe('Tabs', () => {
  it('renders normal Tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs defaultValue={1}>
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
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tab correctly with more props', () => {
    const wrapper = render(
      <div>
        <Tabs defaultValue={1} isRadius theme="error">
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
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when receiving new value', () => {
    const wrapper = mount(
      <Tabs defaultValue={1}>
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
      </Tabs>,
    );

    expect(wrapper.state('value')).toEqual(1);
    wrapper.setProps({ value: 2 });
    expect(wrapper.state('value')).toEqual(2);
  });

  it('behaves correctly when changing tab', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tabs defaultValue={1} onChange={onChange}>
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
      </Tabs>,
    );

    wrapper.find('.ui-tab-header-item').at(2).simulate('click');
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
