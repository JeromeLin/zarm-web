import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

const { Tab } = Tabs;

describe('Tabs', () => {
  it('renders line tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="line">
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
  it('renders tabs size correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="line" size="sm">
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
        <Tabs type="line" size="md">
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
        <Tabs type="line" size="lg">
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
  it('renders line horizontal scroll tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="line" direction="horizontal" defaultValue={0}>
          {
            [...Array(40).keys()].map((item, index) => (
              <Tab key={index.toString()} title={`Tab${index + 1}`} style={{ padding: 10 }}>
                这是选项卡{index + 1}的文字
              </Tab>
            ))
          }
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('renders line vertical scroll tabs correctly', () => {
    const wrapper = render(
      <div>
        <Tabs type="line" closable direction="vertical" defaultValue={0} style={{ height: '192px' }}>
          {
            [...Array(40).keys()].map((item, index) => (
              <Tab key={index.toString()} title={`Tab${index + 1}`}>
                这是选项卡{index + 1}的文字
              </Tab>
            ))
          }
        </Tabs>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
