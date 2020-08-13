import React from 'react';
import { render, shallow, mount, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Modal from '../index';

const timer = function (t) {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle(true);
    }, t);
  });
};

jest.mock('react-dom', () => ({
  createPortal: (node) => node,
  render: (node) => node,
}));

describe('Modal', () => {
  it('renders basic Modal correctly', () => {
    const wrapper = render(
      <Modal title="标题">
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders customized Modal correctly', () => {
    const wrapper = render(
      <Modal
        radius
        visible
        animationType="fade"
        shape="rect"
        animationDuration={500}
      >
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders closable Modal correctly', () => {
    const wrapper = render(
      <Modal
        title="标题"
        onCancel={() => { }}
      >
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('triggers onClose callback correctly when clicks on closable icon', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal
        visible
        title="标题"
        onCancel={onClose}
      >
        我是一个模态框
      </Modal>,
    );
    wrapper.find('.zw-modal__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('show modal correctly when visible change', async () => {
    const wrapper = shallow(
      <Modal
        visible={false}
        title="你好"
      >
        我是一个模态框
      </Modal>,
    );
    wrapper.setProps({ visible: true });
    await timer(100);
    wrapper.setProps({ visible: false });
    await timer(100);
    wrapper.setProps({ visible: true });
    expect(wrapper.find('.zw-modal')).toHaveLength(1);
    await timer(100);
    expect(wrapper.find('.zw-modal')).toHaveLength(1);
  });

  it('trigger onKeyPress correctly', async () => {
    const onKeyPress = jest.fn();
    const wrapper = mount(
      <Modal
        visible
        title="标题"
        onKeyPress={onKeyPress}
      >
        我是一个模态框
      </Modal>,
    );
    const f = wrapper.find('.zw-modal__content');
    f.simulate('keypress', { key: 'Enter', keyCode: 13, which: 13 });
    expect(onKeyPress).toHaveBeenCalled();
  });

  it('trigger onKeyDown correctly', async () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <Modal
        visible
        title="标题"
        onKeyDown={onKeyDown}
      >
        我是一个模态框
      </Modal>,
    );
    const f = wrapper.find('.zw-modal__content');
    f.simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('trigger onOk correctly', async () => {
    const onOk = jest.fn();
    const onKeyPress = jest.fn();
    const wrapper = mount(
      <Modal
        visible={false}
        title="标题"
        onOk={onOk}
        disableEnterKeyDown={false}
        onKeyPress={onKeyPress}
      >
        我是一个模态框
      </Modal>,
    );
    wrapper.setProps({ visible: true });
    await timer(100);
    const f = wrapper.find('.zw-modal__content');
    f.simulate('keypress', { nativeEvent: { keyCode: 13 } });
    expect(onKeyPress).toHaveBeenCalled();
    expect(onOk).toHaveBeenCalled();
  });

  it('triggers onCancel callback correctly when press esc button', async () => {
    const onCancel = jest.fn();
    const wrapper = mount(
      <Modal
        visible={false}
        title="标题"
        mask
        onCancel={onCancel}
      >
        我是一个模态框
      </Modal>,
    );
    wrapper.setProps({ visible: true });
    await timer(100);
    wrapper.find('.zw-modal__content').simulate('keydown', { nativeEvent: { keyCode: 27 } });
    expect(onCancel).toHaveBeenCalled();
  });
});

describe('Modal static method', () => {
  it('trigger Modal.confirm correctly', () => {
    const { hide, then, catch: catchFn } = Modal.confirm({
      content: '删除无法恢复哦',
      title: '确认删除吗',
      theme: 'warning',
    });
    expect(typeof hide).toEqual('function');
    expect(typeof catchFn).toEqual('function');
    expect(typeof then).toEqual('function');
  });
});
