import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

describe('Tooltip', () => {
  it('renders normal Tooltip correctly', () => {
    const wrapper = render(
      <Tooltip content="我是Tooltip内容">
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check `onVisibleChange` prop', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Tooltip content="hello" trigger="click" onVisibleChange={onVisibleChange}>
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    const div = wrapper.find('#hello');
    div.simulate('click');
    setTimeout(() => {
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    });

    div.simulate('click');
    setTimeout(() => {
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
    });
  });

  it('check `visible` prop', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Tooltip content="hello" trigger="manual" onVisibleChange={onVisibleChange}>
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    wrapper.setProps({ visible: true });
    setTimeout(() => {
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    });
  });
});
