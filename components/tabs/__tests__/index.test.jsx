import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

const { Tab } = Tabs;

const data = [{
  closable: false,
  title: 'Tab1',
}, {
  closable: true,
  title: 'Tab2',
}, {
  closable: false,
  title: 'Tab3',
}, {
  closable: false,
  title: 'Tab4',
}, {
  closable: false,
  title: 'Tab5',
}];

const setup = (obj = {}) => {
  const props = {
    direction: 'horizontal',
    defaultValue: 0,
    prefixCls: 'zw-tabs',
    type: 'line',
    size: 'md',
    onChange: jest.fn(),
    onTabClose: jest.fn(),
    animated: true,
    onPrevClick: jest.fn(),
    onNextClick: jest.fn(),
  };
  const newProps = { ...props, ...obj };
  const wrapper = mount(
    <Tabs {...newProps} style={{ width: 200 }}>
      {
        data.map((item, index) => (
          <Tab key={index.toString()} title={item.title} style={{ padding: 10 }} disabled={item.disabled} closable={item.closable}>
            这是选项卡{index}的文字
          </Tab>
        ))
      }
    </Tabs>,
  );
  return {
    props,
    wrapper,
  };
};

describe('Tabs', () => {
  const { wrapper, props } = setup();
  const { wrapper: controlledWrapper, props: controlledProps } = setup({
    value: 3,
  });
  it('tabs renders correctly', () => {
    expect(wrapper.find('.zw-tabs').exists());
  });
  it('tabs change correctly', () => {
    wrapper.find('.zw-tabs__header__item').last().simulate('click');
    expect(props.onChange).toBeCalled();
  });
  it('tabs arrow renders correctly', () => {
    expect(wrapper.find('.zw-tabs__header__arrow').exists());
  });
  it('controlled tabs render correctly', () => {
    controlledWrapper.setProps({ value: 4 });
    wrapper.update();
    expect(controlledWrapper.find('.zw-tabs__header__item').last().hasClass('zw-tabs__header__item--active'));
  });
});
