import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popconfirm from '../index';
import Button from '../../button';

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

describe('PopConfirm', () => {
  it('renders PopConfirm correctly', () => {
    const wrapper = render(
      <div>
        <Popconfirm content="确认删除吗" direction="top">
          <Button>Delete</Button>
        </Popconfirm>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check `onVisibleChange` prop', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Popconfirm content="hello" trigger="click" onVisibleChange={onVisibleChange}>
        <div id="hello">Hello world!</div>
      </Popconfirm>,
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

  it('check onOk function is call', () => {
    const ok = jest.fn();
    const wrapper = mount(
      <Popconfirm content="hello" trigger="click" onOk={ok}>
        <div id="hello">Hello world!</div>
      </Popconfirm>,
    );
    const hello = wrapper.find('#hello');
    hello.simulate('click');
    const div = wrapper.find('.zw-button--primary');
    div.simulate('click');

    expect(ok.mock.calls.length).toBe(1);
  });

  it('check onCancel function is call', () => {
    const onCancel = jest.fn();
    const wrapper = mount(
      <Popconfirm content="hello" trigger="click" onCancel={onCancel}>
        <div id="hello">Hello world!</div>
      </Popconfirm>,
    );
    const hello = wrapper.find('#hello');
    hello.simulate('click');
    const div = wrapper.find('.zw-button--default');
    div.simulate('click');

    expect(onCancel.mock.calls.length).toBe(1);
  });
});
