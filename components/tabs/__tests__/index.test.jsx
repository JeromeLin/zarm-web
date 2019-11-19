import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

const { Tab } = Tabs;

describe('Tabs', () => {
  it('renders line tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs>
          <Tab title="Tab1">
            <div style={{ padding: 10 }}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="Tab2">
            <div style={{ padding: 10 }}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="Tab3">
            <div style={{ padding: 10 }}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title="Tab4">
            <div style={{ padding: 10 }}>
              这是选项卡4的文字
            </div>
          </Tab>
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('renders card tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="card">
          <Tab title="Tab1">
            <div style={{ padding: 10 }}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="Tab2">
            <div style={{ padding: 10 }}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="Tab3">
            <div style={{ padding: 10 }}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title="Tab4">
            <div style={{ padding: 10 }}>
              这是选项卡4的文字
            </div>
          </Tab>
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('renders noborder-card tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="noborder-card">
          <Tab title="Tab1">
            <div style={{ padding: 10 }}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="Tab2">
            <div style={{ padding: 10 }}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="Tab3">
            <div style={{ padding: 10 }}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title="Tab4">
            <div style={{ padding: 10 }}>
              这是选项卡4的文字
            </div>
          </Tab>
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
